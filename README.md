# Birthday Website

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your env file:

```bash
cp .env.example .env
```

3. In `.env`, set:
- `GMAIL_USER=ananya.guntur@gmail.com`
- `GMAIL_APP_PASSWORD=<your Gmail app password>`

4. Run:

```bash
npm start
```

Open `http://localhost:8000`.

## Note

For Gmail SMTP, you must create an App Password in your Google account (2FA required).
