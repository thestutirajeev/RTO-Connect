const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
require("dotenv").config();

const Stripe = require("stripe");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Replace with your Razorpay Secret
});

// Create an order for payment Razorpay sends this to your frontend
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // Amount in paise (₹500 = 50000)
    
    const options = {
      amount,
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

// Verify Payment Signature (Webhook or Frontend Callback) Razorpay sends this to your backend
router.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", razorpay.key_secret) // Use your Razorpay Key Secret
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    res.json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ message: "Payment verification failed" });
  }
});


//Stripe Payment Integration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent for Stripe
// Replace "your_publishable_key" in loadStripe() with your Stripe Publishable Key (from Stripe Dashboard).
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
