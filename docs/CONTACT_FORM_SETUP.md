# Contact Form & Analytics Setup Guide

This guide will help you configure the production-ready contact form and analytics for your portfolio website.

## 📧 Contact Form - EmailJS Setup

The contact form uses **EmailJS** to send emails directly from the client-side without needing a backend server. This is secure, reliable, and free for up to 200 emails/month.

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. Go to [https://dashboard.emailjs.com/admin](https://dashboard.emailjs.com/admin)
2. Click **"Add New Service"**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Click "Gmail" and connect your Google account
   - **Outlook**: Click "Outlook" and connect your Microsoft account
   - **Other**: Use custom SMTP settings
4. Click **"Create Service"**
5. **Copy the Service ID** (looks like `service_xxxxxxx`)

### Step 3: Create Email Template

1. Go to **"Email Templates"** tab
2. Click **"Create New Template"**
3. Use this template configuration:

**Template Name:** `Portfolio Contact Form`

**Subject:** `New Contact Form Message from {{from_name}}`

**Content:**
```
Hello {{to_name}},

You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent via Portfolio Contact Form
```

4. Click **"Save"**
5. **Copy the Template ID** (looks like `template_xxxxxxx`)

### Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** section
3. **Copy your Public Key** (looks like a long string)

### Step 5: Configure Environment Variables

1. Open `.env.local` in your project root
2. Replace the placeholder values with your actual keys:

```env
# EmailJS Configuration (for contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx    # From Step 2
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx  # From Step 3
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key    # From Step 4
```

3. **Save the file**

### Step 6: Test the Contact Form

#### Local Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:9002](http://localhost:9002)

3. Navigate to the **Contact** section

4. Fill out the form with test data:
   - **Name:** Your Name
   - **Email:** your.test@email.com
   - **Message:** Test message from local development

5. Click **"Send Message"**

6. You should see:
   - ✅ Success toast: "Message Sent Successfully! 🎉"
   - Form fields cleared automatically
   - Email received in your inbox within 1-2 minutes

#### Production Testing

1. Deploy your site to Vercel/Netlify
2. Add the same environment variables in your hosting platform:
   - Vercel: Go to **Settings → Environment Variables**
   - Netlify: Go to **Site settings → Environment variables**
3. Test the form on your live site

### Troubleshooting

**❌ "EmailJS configuration missing" error**
- Check that all three environment variables are set in `.env.local`
- Make sure variable names start with `NEXT_PUBLIC_`
- Restart your development server after adding variables

**❌ "Failed to Send Message" error**
- Verify your Service ID, Template ID, and Public Key are correct
- Check EmailJS dashboard for error logs
- Ensure your email service is connected and active
- Check if you've exceeded the free tier limit (200 emails/month)

**❌ Not receiving emails**
- Check your spam/junk folder
- Verify the email address in your EmailJS service settings
- Check EmailJS dashboard → Logs to see if emails are being sent

**🛡️ Security Features**
- ✅ Honeypot field to prevent spam bots
- ✅ Input validation and sanitization
- ✅ Rate limiting via EmailJS
- ✅ Email address validation
- ✅ Character limits on inputs

---

## 📊 Analytics - Vercel Analytics Setup

The portfolio includes **Vercel Analytics** for privacy-friendly website tracking.

### Automatic Setup (If deployed on Vercel)

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Analytics** tab
3. Click **"Enable Analytics"**
4. That's it! Analytics will start tracking automatically

### Manual Setup (If deployed elsewhere)

Analytics is already integrated in the code. It will automatically work once deployed to Vercel. For other platforms, Vercel Analytics won't collect data (which is fine - it's optional).

### What Analytics Tracks

- Page views
- Unique visitors
- Top pages
- Referral sources
- Device types (mobile/desktop)
- Geographic locations

**Privacy:** Vercel Analytics is GDPR-compliant and doesn't use cookies or track personal information.

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] EmailJS account created and verified
- [ ] Email service connected (Gmail/Outlook)
- [ ] Email template created with correct variables
- [ ] Environment variables added to `.env.local`
- [ ] Contact form tested locally
- [ ] Environment variables added to hosting platform
- [ ] Contact form tested on production
- [ ] Vercel Analytics enabled (if on Vercel)
- [ ] Email notifications confirmed working

---

## 📝 Environment Variables Reference

```env
# Required for Contact Form
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here

# No additional variables needed for Vercel Analytics
# It works automatically when deployed on Vercel
```

---

## 💡 Tips & Best Practices

1. **Email Deliverability:**
   - Use a professional email address for receiving messages
   - Add your domain to EmailJS allowed domains in production
   - Monitor your EmailJS quota (200 free emails/month)

2. **Spam Protection:**
   - The form includes a honeypot field (invisible to users)
   - Bots that fill this field will be silently rejected
   - Consider adding reCAPTCHA if you get too much spam

3. **User Experience:**
   - Form fields are disabled while sending to prevent double submissions
   - Clear success/error messages shown to users
   - Form automatically clears after successful submission
   - "Email Me Directly" button as a fallback option

4. **Monitoring:**
   - Check EmailJS dashboard regularly for delivery status
   - Monitor Vercel Analytics for form submission patterns
   - Set up email forwarding rules if needed

---

## 🆘 Support

- **EmailJS Issues:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **Vercel Analytics:** [https://vercel.com/docs/analytics](https://vercel.com/docs/analytics)
- **Next.js Env Variables:** [https://nextjs.org/docs/basic-features/environment-variables](https://nextjs.org/docs/basic-features/environment-variables)

---

## 🎉 You're All Set!

Your portfolio now has:
- ✅ Production-ready contact form with real email delivery
- ✅ Spam protection via honeypot
- ✅ Professional email templates
- ✅ Privacy-friendly analytics
- ✅ Excellent user experience

Every message submitted through your contact form will be delivered to your email inbox reliably! 🚀
