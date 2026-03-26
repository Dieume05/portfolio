# How to Set Up Contact Form Email Notifications

Your contact form needs to be configured to actually send emails. Here are two options:

## Option 1: EmailJS (Recommended - Free & Easy)

1. **Sign up for EmailJS** (free):
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. **Set up Email Service**:
   - Go to "Email Services" in your dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create Email Template**:
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template:
     ```
     From: {{from_name}} <{{from_email}}>
     Reply-To: {{reply_to}}
     
     Subject: New Contact Form Message
     
     Name: {{from_name}}
     Email: {{from_email}}
     
     Message:
     {{message}}
     ```

4. **Get Your Keys**:
   - Go to "Account" → "General"
   - Copy your "Public Key"
   - Copy your "Service ID" (from Email Services)
   - Copy your "Template ID" (from Email Templates)

5. **Update script.js**:
   - Open `script.js`
   - Find line ~200 where it says:
     ```javascript
     'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
     'YOUR_TEMPLATE_ID',     // Replace with your EmailJS Template ID
     'YOUR_PUBLIC_KEY'       // Replace with your EmailJS Public Key
     ```
   - Replace these with your actual IDs

## Option 2: Formspree (Alternative - Also Free)

1. **Sign up for Formspree**:
   - Go to https://formspree.io/
   - Sign up for a free account

2. **Create a Form**:
   - Click "New Form"
   - Copy your form endpoint URL

3. **Update index.html**:
   - Find the `<form>` tag (around line 287)
   - Add `action="YOUR_FORMSPREE_URL"` and `method="POST"`
   - Example: `<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">`

4. **Update script.js**:
   - Replace the form submission code with:
   ```javascript
   const formData = new FormData(contactForm);
   const response = await fetch(contactForm.action, {
       method: 'POST',
       body: formData,
       headers: {
           'Accept': 'application/json'
       }
   });
   ```

## Option 3: Quick Fix - Use WhatsApp Directly

If you want a quick solution without setup, you can modify the form to redirect to WhatsApp:

1. Update the form submission in `script.js` to:
```javascript
const whatsappMessage = `Hi! My name is ${name}. ${message}`;
const whatsappUrl = `https://wa.me/243974295693?text=${encodeURIComponent(whatsappMessage)}`;
window.open(whatsappUrl, '_blank');
```

---

**Note**: The form currently uses a fallback that opens your email client. For a better experience, set up EmailJS or Formspree.

