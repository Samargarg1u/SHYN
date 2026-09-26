const express = require("express");
const path = require("path");
const crypto = require("crypto");
const Razorpay = require("razorpay");
require("dotenv").config();

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
app.use(express.static(__dirname));

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
      receipt: `AS_${Date.now()}`,
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

    // In a production store, save the verified order to a database here.
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

app.listen(PORT, () => {
  console.log(`AS Collection is running at http://localhost:${PORT}`);
});
