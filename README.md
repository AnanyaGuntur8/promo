# Birthday Website (Static)

This is a static HTML/CSS/JS site. Email sending is handled by EmailJS (no backend).

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Configure EmailJS

1. Create an EmailJS account and add an Email Service (Gmail works).
2. Create an Email Template with these variables:
   - `to_email`
   - `subject`
   - `message`
   - `from_name`
   - `reply_to`
3. Copy these values from EmailJS:
   - Public Key
   - Service ID
   - Template ID
4. Paste them into `script.js`:
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`

## Deploy

Deploy as a static site (Render Static Site, GitHub Pages, Netlify, Vercel static, etc.).
