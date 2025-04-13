import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import VehicleRegistrationFormStripe from "../../components/Stripe/VehicleRegistrationFormStripe";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const VehicleRegistration = () => {
  return (
    <Elements stripe={stripePromise}>
      <VehicleRegistrationFormStripe />
    </Elements>
  );
};

export default VehicleRegistration;