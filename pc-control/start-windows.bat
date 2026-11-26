@echo off
cd /d "%~dp0"
if not exist .venv python -m venv .venv
rem Installs anything new in requirements.txt (quick when nothing changed).
.venv\Scripts\python -m pip install -q --disable-pip-version-check -r requirements.txt
.venv\Scripts\python app.py
pause
