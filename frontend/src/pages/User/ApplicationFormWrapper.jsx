import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ApplicationFormStripe from "./ApplicationFormStripe";  // Your actual form component

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // Use your Stripe key

const ApplicationFormWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <ApplicationFormStripe />
    </Elements>
  );
};

export default ApplicationFormWrapper;
