# PC Control

A password-protected web dashboard to control your PC from your phone or any
browser on the same Wi-Fi.

| Feature | What it does |
|---|---|
| **System** | Live CPU, memory, disk, network speed, battery, uptime |
| **Power** | Lock, sleep, sign out, restart, shut down, cancel a pending shutdown |
| **Screens** | Watch one screen or all of them side by side, live or as a screenshot |
| **Cameras** | Every plugged-in camera, each with its own live view. A camera is only on while you're watching it. |
| **Microphone** | Listen live to any microphone on the PC (about half a second behind) |
| **Devices** | What's plugged in: screens, cameras, mics and speakers, keyboards and mice, controllers, drives, phones, printers, USB |
| **Processes** | See what's using memory and end a program |
| **Wake-on-LAN** | Turn on *another* PC on the network |

Works on Windows, Linux and macOS.

## Install and run

You need [Python 3.10+](https://www.python.org/downloads/) (on Windows, tick
"Add Python to PATH" during install).

- **Windows:** double-click `start-windows.bat`
- **Linux / macOS:** `./start.sh`

The first run installs everything and prints your **password** and the
address to open, something like:

```
  First run. Your dashboard password is:  x7Kp2-QmZr9a
PC Control running. Open on your phone:  http://192.168.1.20:8765
```

Open that address on your phone (same Wi-Fi) and sign in.

- Pick your own password: `python app.py --set-password` (signs out every device)
- Or set it before the first run: `PC_DASH_PASSWORD=yourpassword`
- Settings (port, which camera, saved Wake-on-LAN PCs) are in `config.json`,
  created on first run. It's in `.gitignore` because it holds your password hash.

### Windows notes
- The first time, Windows Firewall asks whether to allow Python on networks:
  allow it on **Private** networks only.
- Ending some programs needs admin rights: right-click `start-windows.bat` →
  *Run as administrator*.
- Start it automatically: press `Win + R`, type `shell:startup`, and put a
  shortcut to `start-windows.bat` in that folder.

### Hear the PC's own sound
The microphone panel plays microphones only. To hear what the PC itself is
playing, on Windows enable **Stereo Mix**: Sound settings → *More sound
settings* → *Recording* tab → right-click → *Show disabled devices* → enable
*Stereo Mix*. It then appears in the microphone list. Not every sound card
has it.

## "Start my PC" — how turning it on works

A PC that is off can't run a website, so it can't turn itself on. Turning it
on needs a **second device that is always on** in your home (a Raspberry Pi,
an old laptop, a NAS…) to send a Wake-on-LAN "magic packet":

1. **Enable Wake-on-LAN on the PC you want to wake**
   - In the BIOS/UEFI: turn on *Wake on LAN* / *Power On By PCI-E*.
   - Windows: Device Manager → your network adapter → Properties →
     *Power Management*: tick *Allow this device to wake the computer*;
     *Advanced*: set *Wake on Magic Packet* to Enabled.
   - Turn off Windows *Fast startup* (Control Panel → Power Options →
     Choose what the power buttons do).
   - Use an **Ethernet cable**: Wake-on-LAN rarely works over Wi-Fi.
2. **Find its MAC address**: run `ipconfig /all` and copy the
   *Physical Address* of the Ethernet adapter (e.g. `AA-BB-CC-DD-EE-FF`).
3. **Run PC Control on the always-on device**, and add the PC to `config.json`:
   ```json
   "wake_targets": [{"name": "Gaming PC", "mac": "AA:BB:CC:DD:EE:FF"}]
   ```
   A *Wake Gaming PC* button then appears in the dashboard.
   Without the dashboard: `python wake.py AA:BB:CC:DD:EE:FF`

## Security — read this

This app can shut down your PC and turn on its camera, so:

- **Keep it on your home network.** Don't port-forward it on your router;
  it isn't built to face the internet (plain HTTP, no HTTPS).
- **To use it from outside your home**, install
  [Tailscale](https://tailscale.com/) on the PC and your phone, and open the
  PC's Tailscale address instead. That keeps it private and encrypted.
- Use a strong password. Five wrong attempts lock that device out for 10 minutes.
