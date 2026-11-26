"""Turn on a PC over the network (Wake-on-LAN). No install needed.

Usage:  python wake.py AA:BB:CC:DD:EE:FF
"""
import socket
import sys

if len(sys.argv) != 2:
    sys.exit(__doc__)
mac = bytes.fromhex(sys.argv[1].replace(":", "").replace("-", ""))
if len(mac) != 6:
    sys.exit("That doesn't look like a MAC address.")
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
    s.sendto(b"\xff" * 6 + mac * 16, ("255.255.255.255", 9))
print("Magic packet sent.")
