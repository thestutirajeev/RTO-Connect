const express = require("express");
const router = express.Router();
require("dotenv").config();

const Stripe = require("stripe");
//Stripe Payment Integration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Create Payment Intent for Stripe
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, aadharNumber, name, addressLine1, city, postalCode } = req.body;

    // Validate required fields
    if (!postalCode || !name || !addressLine1 || !city) {
      return res.status(400).json({ error: 'All shipping details are required.' });
    }

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description: "Driving License Application Fee - RTO Connect",
      metadata: {
        aadharNumber: aadharNumber || "not provided",
        platform: "RTO Connect",
      },
      shipping: {
        name: name,
        address: {
          line1: addressLine1,
          city: city,
          postal_code: postalCode,
          country: "IN",  // Ensure the country is set to India
        },
      },
    });

    // Return the client secret to the frontend
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Handle Stripe-specific errors more gracefully
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ error: 'Card error: ' + error.message });
    }
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
