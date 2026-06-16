const app = document.getElementById("app");
const logoImage = document.getElementById("logoImage");
const gifImage = document.getElementById("gifImage");
const message = document.getElementById("message");
const hint = document.getElementById("hint");
const emailForm = document.getElementById("emailForm");
const emailInput = document.getElementById("emailInput");
const sendButton = emailForm.querySelector("button[type='submit']");
const startAudio = document.getElementById("startAudio");
const gifAudio = document.getElementById("gifAudio");

// EmailJS setup (from your EmailJS dashboard)
const EMAILJS_PUBLIC_KEY = "HT0o6jTV_gkbv3n2-";
const EMAILJS_SERVICE_ID = "service_kigtmth";
const EMAILJS_TEMPLATE_ID = "template_sp8eohk";

// Update this if you want a longer/shorter GIF play time.
const GIF_DURATION_MS = 9000;
// Delay before the GIF starts after the click.
const START_DELAY_MS = 2500;

let started = false;

app.addEventListener("click", () => {
  if (started) return;
  started = true;

  hint.classList.add("hidden");
  logoImage.classList.add("hidden");
  // Play the "starting" sound immediately on click.
  safePlay(startAudio, true);

  // After a short delay, start the GIF + its audio.
  window.setTimeout(() => {
    gifImage.classList.remove("hidden");

    // Restart GIF from frame 1.
    gifImage.src = "";
    gifImage.src = "gif.gif";

    // Stop the starting sound and switch to revolution.
    safeStop(startAudio);
    safePlay(gifAudio, true);

    window.setTimeout(showFinalScreen, GIF_DURATION_MS);
  }, START_DELAY_MS);
});

emailForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const to = emailInput.value.trim();
  if (!to) return;

  sendButton.disabled = true;
  sendButton.textContent = "Sending...";

  try {
    if (!window.emailjs) {
      throw new Error("Email service not loaded. Please refresh and try again.");
    }
    if (
      EMAILJS_PUBLIC_KEY.startsWith("YOUR_") ||
      EMAILJS_SERVICE_ID.startsWith("YOUR_") ||
      EMAILJS_TEMPLATE_ID.startsWith("YOUR_")
    ) {
      throw new Error("EmailJS is not configured yet (service/template/public key).");
    }

    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: to,
      subject: "SECRET MESSAGE!!",
      message: `Hi ALOOSABZI,
I met you more this year and honestly i love how insane i can be and just simply annoy you all day long. TBH youre rlly chill, semi nonchalant and really fun to hang out with. Im glad youre my friend and thanks for being someone i can rely on. I cant wait to make more crazy side quests memories. Im still rooting for you (esp since ur gonna get me a bmw tysm) and i know ur gonna do amazing (no nazar) I hope all your dreams come true (im not tryna be cringy stfu) and HAPPY BIRTHDAY ONCE AGAIN!!

best,
rat.`,
      from_name: "Ananya",
      reply_to: "ananya.guntur@gmail.com",
    });

    sendButton.textContent = "Sent!";
  } catch (error) {
    sendButton.textContent = "Try Again";
    window.alert(error.message || "Failed to send email.");
  } finally {
    sendButton.disabled = false;
  }
});

function showFinalScreen() {
  gifImage.classList.add("fade-out");
  app.classList.add("final-state");

  // Fade the audio out during the GIF -> black transition.
  fadeOutAudio(gifAudio, 1700);

  window.setTimeout(() => {
    gifImage.classList.add("hidden");
    message.classList.remove("hidden");
    requestAnimationFrame(() => {
      message.classList.add("show");
    });

    // Show the email UI after the neon sign appears.
    window.setTimeout(() => {
      emailForm.classList.remove("hidden");
      requestAnimationFrame(() => {
        emailForm.classList.add("show");
      });
      emailInput.focus();
    }, 950);
  }, 1700);
}

function safePlay(el, restart = false) {
  if (!el) return;
  try {
    if (restart) el.currentTime = 0;
    el.volume = 1;
    el.play().catch(() => {});
  } catch (_) {}
}

function safeStop(el) {
  if (!el) return;
  try {
    el.pause();
    el.currentTime = 0;
  } catch (_) {}
}

function fadeOutAudio(el, durationMs) {
  if (!el || el.paused) return;
  const startVol = el.volume ?? 1;
  const start = performance.now();

  function step(now) {
    const t = Math.min(1, (now - start) / durationMs);
    el.volume = Math.max(0, startVol * (1 - t));
    if (t < 1) requestAnimationFrame(step);
    else {
      safeStop(el);
    }
  }

  requestAnimationFrame(step);
}
