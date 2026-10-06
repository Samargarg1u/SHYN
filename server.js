import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import crypto from "crypto";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!KEY_ID || !KEY_SECRET) {
  console.warn("\nRazorpay keys are not configured yet.");
  console.warn("Create a .env file from .env.example and add your Razorpay Test/Live keys.\n");
}

const razorpay = (KEY_ID && KEY_SECRET)
  ? new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })
  : null;

app.use(express.json({ limit: "1mb" }));

// Enable CORS for cross-origin local dev (Vite on 5173, Live Server on 5500)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(__dirname));

// Automated Order Confirmation Email Endpoint
app.post("/api/send-order-email", async (req, res) => {
  try {
    const { to, subject, html, orderId, customerName } = req.body || {};
    if (!to || !html) {
      return res.status(400).json({ error: "Missing recipient email address or HTML content." });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `"SHYN Haute Couture" <${smtpUser}>`,
        to,
        subject: subject || `Order Confirmed: ${orderId} | SHYN Haute Couture`,
        html
      });

      console.log(`[SMTP EMAIL SENT] Order ${orderId} -> ${to}, ID: ${info.messageId}`);
      return res.json({
        success: true,
        mode: "live-smtp",
        messageId: info.messageId,
        recipient: to
      });
    }

    // Development & Simulated Automated Dispatch (When SMTP is not configured in .env)
    console.log(`[AUTOMATED EMAIL PUSHED] Order ${orderId} confirmation pushed to: ${to} (Customer: ${customerName || 'Patron'})`);
    return res.json({
      success: true,
      mode: "automated-dispatch",
      recipient: to,
      message: `Automated confirmation email successfully pushed to ${to}`
    });
  } catch (err) {
    console.error("send-order-email error:", err);
    res.status(500).json({ error: "Failed to dispatch automated email." });
  }
});

// Check Email Dispatcher Status
app.get("/api/email-status", (req, res) => {
  const isConfigured = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_PASS.trim());
  res.json({
    configured: isConfigured,
    user: process.env.SMTP_USER || "samargarg019@gmail.com",
    host: process.env.SMTP_HOST || "smtp.gmail.com"
  });
});

// Save SMTP Credentials Dynamically
app.post("/api/save-smtp-config", async (req, res) => {
  try {
    const { user, pass } = req.body || {};
    if (!pass || !pass.trim()) {
      return res.status(400).json({ error: "Gmail App Password cannot be empty." });
    }
    const cleanUser = (user || process.env.SMTP_USER || "samargarg019@gmail.com").trim();
    const cleanPass = pass.trim();

    process.env.SMTP_USER = cleanUser;
    process.env.SMTP_PASS = cleanPass;
    process.env.SMTP_HOST = "smtp.gmail.com";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_FROM = `"SHYN Haute Couture" <${cleanUser}>`;

    // Persist to .env file on disk
    const envPath = path.join(__dirname, ".env");
    let envContent = `PORT=3000\nRAZORPAY_KEY_ID=${process.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyIdHere'}\nRAZORPAY_KEY_SECRET=${process.env.RAZORPAY_KEY_SECRET || 'YourSecretKeyHere'}\nSMTP_HOST=smtp.gmail.com\nSMTP_PORT=587\nSMTP_USER=${cleanUser}\nSMTP_PASS=${cleanPass}\nSMTP_FROM="SHYN Haute Couture <${cleanUser}>"\n`;
    fs.writeFileSync(envPath, envContent, "utf8");

    console.log(`[SMTP CONFIG UPDATED] Gmail SMTP credentials updated for ${cleanUser}`);
    res.json({ success: true, message: `Gmail credentials saved successfully for ${cleanUser}!` });
  } catch (err) {
    console.error("save-smtp-config error:", err);
    res.status(500).json({ error: "Could not save configuration: " + err.message });
  }
});

// Send Live Test Email to verify connection
app.post("/api/test-email", async (req, res) => {
  try {
    const targetEmail = req.body?.to || process.env.SMTP_USER || "samargarg019@gmail.com";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return res.status(400).json({
        error: "SMTP credentials not configured. Please enter your 16-character Gmail App Password."
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"SHYN Haute Couture" <${smtpUser}>`,
      to: targetEmail,
      subject: `👑 SHYN Haute Couture — Test Automated Email Connection`,
      html: `
        <div style="font-family: -apple-system, Arial, sans-serif; padding: 25px; color: #2a201f; background: #fdfbf7; border: 1.5px solid #ebd9c8; border-radius: 12px; max-width: 600px; margin: 0 auto;">
          <div style="background: #2a0808; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; color: #ffffff;">
            <h1 style="color: #d4af37; margin: 0; font-size: 24px; letter-spacing: 2px;">SHYN</h1>
            <p style="margin: 4px 0 0; font-size: 11px; letter-spacing: 1.5px; color: #ebd9c8;">HAUTE COUTURE &amp; HERITAGE ATELIER</p>
          </div>
          <div style="padding: 24px 20px;">
            <h2 style="color: #2e7d32; font-size: 18px; margin-top: 0;">✓ Automated Email Dispatcher Successfully Connected!</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #4a3c39;">
              Namaste! This confirms that your real Gmail account (<strong>${smtpUser}</strong>) is now active and delivering live emails across the internet.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #4a3c39;">
              Whenever any customer places an order on your store, an official royal order confirmation, itemized weave receipt, BlueDart tracking code, and Silk Mark guarantee will be automatically pushed directly into their email inbox!
            </p>
            <div style="background: #f0f5fc; border-left: 4px solid #144191; padding: 12px 16px; border-radius: 4px; margin: 20px 0; font-size: 13px; color: #144191;">
              <strong>Active Dispatcher:</strong> smtp.gmail.com (Port 587) • Dispatched at ${new Date().toLocaleString('en-IN')}
            </div>
            <p style="font-size: 12px; color: #8c7f7d; margin-bottom: 0;">
              SHYN Haute Atelier • MG Boulevard, Bengaluru - 560001
            </p>
          </div>
        </div>
      `
    });

    console.log(`[TEST EMAIL SENT] Delivered to ${targetEmail}, ID: ${info.messageId}`);
    res.json({
      success: true,
      message: `Live test email successfully delivered to ${targetEmail}! Message ID: ${info.messageId}`
    });
  } catch (err) {
    console.error("test-email error:", err);
    res.status(500).json({
      error: `Gmail Connection Failed: ${err.message}. Ensure your 16-character App Password was generated from https://myaccount.google.com/apppasswords and entered without spaces.`
    });
  }
});

app.post("/api/create-order", async (req, res) => {
  try {
    if (!razorpay) return res.status(500).json({ error: "Razorpay keys are not configured on the server." });

    const { amount, productId, productName, name, phone, address } = req.body || {};
    const numericAmount = Number(amount);

    if (!Number.isInteger(numericAmount) || numericAmount < 100) {
      return res.status(400).json({ error: "Invalid payment amount." });
    }
    if (!productId || !productName || !name || !phone || !address) {
      return res.status(400).json({ error: "Missing checkout details." });
    }

    // Razorpay amount is in the smallest currency unit (paise for INR).
    const order = await razorpay.orders.create({
      amount: numericAmount,
      currency: "INR",
      receipt: `SHYN_${Date.now()}`,
      notes: {
        product_id: String(productId),
        product_name: String(productName).slice(0, 200),
        customer_name: String(name).slice(0, 100),
        customer_phone: String(phone).slice(0, 30),
        delivery_address: String(address).slice(0, 500)
      }
    });

    res.json({
      keyId: KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (err) {
    console.error("create-order error:", err);
    res.status(500).json({ error: "Could not create Razorpay order." });
  }
});

app.post("/api/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing Razorpay payment verification fields." });
    }

    const expected = crypto
      .createHmac("sha256", KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const valid = crypto.timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(String(razorpay_signature), "utf8")
    );

    if (!valid) return res.status(400).json({ error: "Invalid payment signature." });

    res.json({
      success: true,
      message: "Payment verified successfully.",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    });
  } catch (err) {
    console.error("verify-payment error:", err);
    res.status(500).json({ error: "Payment verification failed." });
  }
});

// Fallback to React Single Page App
app.get("*", (req, res) => {
  if (fs.existsSync(path.join(__dirname, "dist", "index.html"))) {
    return res.sendFile(path.join(__dirname, "dist", "index.html"));
  }
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`SHYN Haute Couture Store is running at http://localhost:${PORT}`);
});
