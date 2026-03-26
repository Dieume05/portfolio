# Quick EmailJS Setup - 5 Minutes

EmailJS works even when opening HTML files directly (no server needed!)

## Step 1: Sign Up (Free)
1. Go to https://www.emailjs.com/
2. Click "Sign Up" (it's free)
3. Create account with your email

## Step 2: Add Email Service
1. Click "Email Services" in left menu
2. Click "Add New Service"
3. Choose "Gmail" (since you use Gmail)
4. Click "Connect Account"
5. Sign in with your Gmail (dieumdieum31@gmail.com)
6. Copy the **Service ID** (looks like `service_abc123`)

## Step 3: Create Template
1. Click "Email Templates" in left menu
2. Click "Create New Template"
3. Use these settings:

**Template Name:** Portfolio Contact

**Subject:** New Message from {{from_name}}

**Content:**
```
You have a new message from your portfolio!

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

4. Click "Save"
5. Copy the **Template ID** (looks like `template_xyz789`)

## Step 4: Get Public Key
1. Click "Account" → "General"
2. Find "Public Key"
3. Copy it (looks like `abcdefghijklmnop`)

## Step 5: Update script.js

Open `script.js` and find these 3 places to update:

### Location 1 (around line 9):
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
```
Replace `YOUR_PUBLIC_KEY` with your Public Key from Step 4

### Location 2 (around line 212):
```javascript
'YOUR_SERVICE_ID',
```
Replace `YOUR_SERVICE_ID` with your Service ID from Step 2

### Location 3 (around line 213):
```javascript
'YOUR_TEMPLATE_ID',
```
Replace `YOUR_TEMPLATE_ID` with your Template ID from Step 3

## Step 6: Test!
1. Save script.js
2. Refresh browser (even opening HTML directly works!)
3. Fill out form
4. Submit
5. Check your email!

---

**That's it!** EmailJS works with file:// protocol, so no server needed.

