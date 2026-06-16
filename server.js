const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

const SECRET_SUBJECT = "SECRET MESSAGE!!";
const SECRET_BODY = `Hi ALOOSABZI,
I met you more this year and honestly i love how insane i can be and just simply annoy you all day long. TBH youre rlly chill, semi nonchalant and really fun to hang out with. Im glad youre my friend and thanks for being someone i can rely on. I cant wait to make more crazy side quests memories. Im still rooting for you (esp since ur gonna get me a bmw tysm) and i know ur gonna do amazing (no nazar) I hope all your dreams come true (im not tryna be cringy stfu) and HAPPY BIRTHDAY ONCE AGAIN!!

best,
rat.`;

app.use(express.json());
app.use(express.static(__dirname));

app.post("/send-email", async (req, res) => {
  const { to } = req.body || {};
  if (!to || typeof to !== "string") {
    return res.status(400).json({ ok: false, error: "Valid recipient email is required." });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailAppPassword) {
    return res.status(500).json({
      ok: false,
      error: "Missing GMAIL_USER or GMAIL_APP_PASSWORD in .env.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      // Use explicit Gmail SMTP settings (more reliable than `service: "gmail"`).
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: gmailUser,
      to,
      subject: SECRET_SUBJECT,
      text: SECRET_BODY,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return res.status(500).json({
      ok: false,
      error:
        (error && error.response) ||
        (error && error.message) ||
        "Failed to send email. Check Gmail app password setup.",
      details: String(error && error.message ? error.message : error),
    });
  }
});

// Express 5 no longer accepts "*" as a route string.
// This keeps the site working for "/" and any other path.
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
