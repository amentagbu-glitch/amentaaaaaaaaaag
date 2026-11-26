"""PC Control: a password-protected dashboard to control this computer
from any browser on your local network (phone, laptop, tablet).

Run:  python app.py
Then open the address it prints, e.g. http://192.168.1.20:8765
"""

import json
import os
import platform
import secrets
import socket
import subprocess
import threading
import time
from functools import wraps
from pathlib import Path

import psutil
from flask import (Flask, Response, abort, jsonify, redirect, render_template,
                   request, session, url_for)
from werkzeug.security import check_password_hash, generate_password_hash

BASE = Path(__file__).resolve().parent
CONFIG_FILE = BASE / "config.json"
SYSTEM = platform.system()  # "Windows", "Linux" or "Darwin"


# ---------------------------------------------------------------- config ---
def load_config():
    if CONFIG_FILE.exists():
        return json.loads(CONFIG_FILE.read_text())

    password = os.environ.get("PC_DASH_PASSWORD") or secrets.token_urlsafe(9)
    cfg = {
        "password_hash": generate_password_hash(password),
        "secret_key": secrets.token_hex(32),
        "port": 8765,
        "camera_index": 0,
        "wake_targets": [],  # [{"name": "Gaming PC", "mac": "AA:BB:CC:DD:EE:FF"}]
    }
    CONFIG_FILE.write_text(json.dumps(cfg, indent=2))
    print("\n" + "=" * 60)
    print(f"  First run. Your dashboard password is:  {password}")
    print("  (Change it any time with:  python app.py --set-password)")
    print("=" * 60 + "\n")
    return cfg


CFG = load_config()
app = Flask(__name__)
app.secret_key = CFG["secret_key"]
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Strict",
    PERMANENT_SESSION_LIFETIME=60 * 60 * 12,
)


# ------------------------------------------------------------------ auth ---
_failed = {}  # ip -> (count, first_fail_time)


def login_required(view):
    @wraps(view)
    def wrapper(*args, **kwargs):
        if not session.get("ok"):
            if request.path.startswith("/api/") or request.path.endswith(".jpg") \
                    or request.path.endswith(".mjpg"):
                abort(401)
            return redirect(url_for("login"))
        # Blocks cross-site form posts: browsers can't add this header cross-origin.
        if request.method == "POST" and request.headers.get("X-Requested-With") != "pc-control":
            abort(403)
        return view(*args, **kwargs)
    return wrapper


@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        ip = request.remote_addr
        count, since = _failed.get(ip, (0, time.time()))
        if time.time() - since > 600:
            count, since = 0, time.time()
        if count >= 5:
            error = "Too many attempts. Wait 10 minutes."
        elif check_password_hash(CFG["password_hash"], request.form.get("password", "")):
            _failed.pop(ip, None)
            session.clear()
            session["ok"] = True
            session.permanent = True
            return redirect(url_for("index"))
        else:
            _failed[ip] = (count + 1, since)
            error = "Wrong password."
            time.sleep(1)
    return render_template("login.html", error=error)


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


@app.route("/")
@login_required
def index():
    return render_template("index.html", hostname=socket.gethostname(), system=SYSTEM,
                           wake_targets=CFG.get("wake_targets", []))


# ----------------------------------------------------------------- stats ---
@app.route("/api/stats")
@login_required
def stats():
    vm = psutil.virtual_memory()
    disk_root = "C:\\" if SYSTEM == "Windows" else "/"
    du = psutil.disk_usage(disk_root)
    net = psutil.net_io_counters()
    battery = psutil.sensors_battery() if hasattr(psutil, "sensors_battery") else None
    return jsonify(
        cpu=psutil.cpu_percent(interval=None),
        cpu_count=psutil.cpu_count(),
        ram_used=vm.used, ram_total=vm.total, ram_percent=vm.percent,
        disk_used=du.used, disk_total=du.total, disk_percent=du.percent,
        net_sent=net.bytes_sent, net_recv=net.bytes_recv,
        uptime=time.time() - psutil.boot_time(),
        battery=None if battery is None else {
            "percent": battery.percent, "plugged": battery.power_plugged},
    )


@app.route("/api/processes")
@login_required
def processes():
    procs = []
    for p in psutil.process_iter(["pid", "name", "memory_info", "cpu_percent"]):
        try:
            procs.append({"pid": p.info["pid"], "name": p.info["name"] or "?",
                          "mem": p.info["memory_info"].rss if p.info["memory_info"] else 0,
                          "cpu": p.info["cpu_percent"] or 0})
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass
    procs.sort(key=lambda x: x["mem"], reverse=True)
    return jsonify(procs[:40])


@app.route("/api/processes/<int:pid>/kill", methods=["POST"])
@login_required
def kill_process(pid):
    if pid == os.getpid():
        return jsonify(ok=False, error="That's the dashboard itself."), 400
    try:
        psutil.Process(pid).terminate()
        return jsonify(ok=True)
    except psutil.NoSuchProcess:
        return jsonify(ok=False, error="Process already gone."), 404
    except psutil.AccessDenied:
        return jsonify(ok=False, error="Access denied (run the dashboard as admin)."), 403


# ----------------------------------------------------------------- power ---
POWER = {
    "Windows": {
        "shutdown": ["shutdown", "/s", "/t", "10"],
        "restart": ["shutdown", "/r", "/t", "10"],
        "cancel": ["shutdown", "/a"],
        "sleep": ["rundll32.exe", "powrprof.dll,SetSuspendState", "0,1,0"],
        "lock": ["rundll32.exe", "user32.dll,LockWorkStation"],
        "logout": ["shutdown", "/l"],
    },
    "Linux": {
        "shutdown": ["shutdown", "-h", "+0"],
        "restart": ["shutdown", "-r", "+0"],
        "cancel": ["shutdown", "-c"],
        "sleep": ["systemctl", "suspend"],
        "lock": ["loginctl", "lock-sessions"],
        "logout": ["loginctl", "terminate-user", os.environ.get("USER", "")],
    },
    "Darwin": {
        "shutdown": ["osascript", "-e", 'tell app "System Events" to shut down'],
        "restart": ["osascript", "-e", 'tell app "System Events" to restart'],
        "sleep": ["pmset", "sleepnow"],
        "lock": ["pmset", "displaysleepnow"],
        "logout": ["osascript", "-e", 'tell app "System Events" to log out'],
    },
}


@app.route("/api/power/<action>", methods=["POST"])
@login_required
def power(action):
    cmd = POWER.get(SYSTEM, {}).get(action)
    if not cmd:
        return jsonify(ok=False, error=f"'{action}' isn't supported on {SYSTEM}."), 400
    try:
        subprocess.Popen(cmd)
        return jsonify(ok=True)
    except Exception as e:  # noqa: BLE001
        return jsonify(ok=False, error=str(e)), 500


# ---------------------------------------------------------- wake-on-lan ---
def send_magic_packet(mac):
    try:
        mac_bytes = bytes.fromhex(mac.replace(":", "").replace("-", ""))
    except ValueError:
        mac_bytes = b""
    if len(mac_bytes) != 6:
        raise ValueError("That doesn't look like a MAC address. Example: AA:BB:CC:DD:EE:FF")
    packet = b"\xff" * 6 + mac_bytes * 16
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        s.sendto(packet, ("255.255.255.255", 9))


@app.route("/api/wake", methods=["POST"])
@login_required
def wake():
    mac = (request.get_json(silent=True) or {}).get("mac", "")
    try:
        send_magic_packet(mac)
        return jsonify(ok=True)
    except ValueError as e:
        return jsonify(ok=False, error=str(e)), 400


# ------------------------------------------------------- screen + camera ---
@app.route("/screen.jpg")
@login_required
def screenshot():
    import cv2
    import mss
    import numpy as np

    try:
        with mss.mss() as sct:
            img = np.array(sct.grab(sct.monitors[0]))[:, :, :3]  # BGRA -> BGR
    except Exception:  # noqa: BLE001 - no display, locked screen, etc.
        abort(503)
    h, w = img.shape[:2]
    scale = min(1.0, 1600 / max(h, w))
    if scale < 1:
        img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
    _, jpg = cv2.imencode(".jpg", img, [cv2.IMWRITE_JPEG_QUALITY, 70])
    return Response(jpg.tobytes(), mimetype="image/jpeg",
                    headers={"Cache-Control": "no-store"})


_camera_lock = threading.Lock()


@app.route("/camera.mjpg")
@login_required
def camera():
    import cv2

    if not _camera_lock.acquire(blocking=False):
        abort(409)  # someone is already watching

    cap = cv2.VideoCapture(CFG.get("camera_index", 0))
    if not cap.isOpened():
        cap.release()
        _camera_lock.release()
        abort(503)  # no webcam found

    def frames():
        try:
            while True:
                ok, frame = cap.read()
                if not ok:
                    break
                ok, jpg = cv2.imencode(".jpg", frame, [cv2.IMWRITE_JPEG_QUALITY, 70])
                if ok:
                    yield (b"--frame\r\nContent-Type: image/jpeg\r\n\r\n"
                           + jpg.tobytes() + b"\r\n")
                time.sleep(0.05)
        finally:
            cap.release()  # camera turns off as soon as you close the view
            _camera_lock.release()

    return Response(frames(), mimetype="multipart/x-mixed-replace; boundary=frame",
                    headers={"Cache-Control": "no-store"})


# ------------------------------------------------------------------ main ---
def local_ip():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        try:
            s.connect(("10.255.255.255", 1))
            return s.getsockname()[0]
        except OSError:
            return "127.0.0.1"


if __name__ == "__main__":
    import sys
    from getpass import getpass

    if "--set-password" in sys.argv:
        pw = getpass("New password: ")
        if len(pw) < 6:
            sys.exit("Use at least 6 characters.")
        CFG["password_hash"] = generate_password_hash(pw)
        CFG["secret_key"] = secrets.token_hex(32)  # logs out every device
        CONFIG_FILE.write_text(json.dumps(CFG, indent=2))
        sys.exit("Password changed.")

    port = CFG.get("port", 8765)
    print(f"PC Control running. Open on your phone:  http://{local_ip()}:{port}")
    app.run(host="0.0.0.0", port=port, threaded=True)
