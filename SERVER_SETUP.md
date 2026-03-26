# How to Run Your Portfolio on a Local Server

FormSubmit requires a web server to work. Here are easy ways to run one:

## Option 1: Python (Easiest - Already Installed on Most Systems)

### Windows:
1. Open PowerShell or Command Prompt in your portfolio folder
2. Type: `python -m http.server 8000`
3. Open browser and go to: `http://localhost:8000`

### Mac/Linux:
1. Open Terminal in your portfolio folder
2. Type: `python3 -m http.server 8000`
3. Open browser and go to: `http://localhost:8000`

## Option 2: Node.js (If You Have It)

1. Install a simple server: `npm install -g http-server`
2. In your portfolio folder, type: `http-server`
3. Open browser and go to: `http://localhost:8080`

## Option 3: VS Code Live Server (Best for Development)

1. Install VS Code if you don't have it
2. Install "Live Server" extension
3. Right-click on `index.html`
4. Click "Open with Live Server"

## Option 4: Use EmailJS Instead (Works with file://)

If you don't want to run a server, set up EmailJS:
- See `EMAIL_SETUP.md` for instructions
- EmailJS works even when opening HTML files directly

## Quick Test

After starting a server:
1. Go to `http://localhost:8000` (or the port shown)
2. Fill out the contact form
3. Submit it
4. Check your email!

---

**Note:** For production (when you deploy online), FormSubmit will work automatically because your site will be on a real web server.

