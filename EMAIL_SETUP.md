# How to Set Up Email Notifications for Contact Form

Follow these steps to receive form submissions via email using EmailJS (free service):

## Step 1: Sign Up for EmailJS

1. Go to https://www.emailjs.com/
2. Click "Sign Up" (it's free)
3. Create an account with your email

## Step 2: Add Email Service

1. After logging in, go to **"Email Services"** in the left menu
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended if you use Gmail)
   - **Outlook** (if you use Outlook/Hotmail)
   - **Custom SMTP** (for other email providers)
4. Follow the setup instructions:
   - For Gmail: You'll need to enable "Less secure app access" or use App Password
   - For Outlook: Similar setup process
5. Once connected, you'll see a **Service ID** (like `service_abc123`)
   - **Copy this Service ID** - you'll need it!

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the left menu
2. Click **"Create New Template"**
3. Use this template:

**Template Name:** Contact Form

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
You have a new message from your portfolio contact form!

From: {{from_name}}
Email: {{from_email}}
Reply-To: {{reply_to}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. Click **"Save"**
5. You'll see a **Template ID** (like `template_xyz789`)
   - **Copy this Template ID** - you'll need it!

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in the left menu
2. Find **"Public Key"** (looks like `abcdefghijklmnop`)
   - **Copy this Public Key** - you'll need it!

## Step 5: Update Your Code

Open `script.js` and find these lines (around line 8-10):

```javascript
emailjs.init('YOUR_PUBLIC_KEY');
```

Replace `YOUR_PUBLIC_KEY` with your actual Public Key from Step 4.

Then find these lines (around line 204-206):

```javascript
await emailjs.send(
    'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
    'YOUR_TEMPLATE_ID',     // Replace with your EmailJS Template ID
```

Replace:
- `YOUR_SERVICE_ID` with your Service ID from Step 2
- `YOUR_TEMPLATE_ID` with your Template ID from Step 3

## Step 6: Test It!

1. Save `script.js`
2. Refresh your browser
3. Fill out the contact form
4. Submit it
5. Check your email inbox!

## Quick Reference - What to Replace:

In `script.js`, replace these 3 values:

1. **Line ~9:** `'YOUR_PUBLIC_KEY'` → Your Public Key
2. **Line ~204:** `'YOUR_SERVICE_ID'` → Your Service ID  
3. **Line ~205:** `'YOUR_TEMPLATE_ID'` → Your Template ID

## Troubleshooting

- **"EmailJS not configured" error**: Make sure you replaced all 3 values in script.js
- **Email not received**: Check spam folder, verify email service is connected in EmailJS dashboard
- **Still not working**: Make sure you saved script.js and did a hard refresh (Ctrl+F5)

---

**Need help?** EmailJS has great documentation at https://www.emailjs.com/docs/

