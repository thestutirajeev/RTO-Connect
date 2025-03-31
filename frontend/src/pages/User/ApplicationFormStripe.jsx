import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/images/hero-bg.png";

import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

const ApplicationFormStripe = () => {
  //Stripe
  const stripe = useStripe();
  const elements = useElements();

  const [testDate, setTestDate] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Calculate the minimum test date (3 days later from today)
  const today = new Date();
  const minTestDate = new Date(today);
  minTestDate.setDate(today.getDate() + 3);
  const minTestDateStr = minTestDate.toISOString().split("T")[0];

  // Calculate the maximum DOB (must be at least 18 years old)
  const maxDob = new Date();
  maxDob.setFullYear(today.getFullYear() - 18);
  const maxDobStr = maxDob.toISOString().split("T")[0];

  const handleStripeSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!stripe || !elements) {
      setError("Stripe.js has not yet loaded. Please try again later.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card Element not found. Please try again later.");
      return;
    }

    if (!testDate || !aadharNumber || !dob || !bloodGroup) {
      setError("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to apply.");
        return;
      }

      // Step 1: Create Stripe Payment Intent
      const res = await fetch(
        "http://localhost:5000/api/payments/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 5000, currency: "INR" }), // ₹50
        }
      );
      if (!res.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await res.json();

      // Step 2: Confirm Card Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        return;
      } else if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful!");

        // Step 3: Submit Application Form
        const response = await fetch(
          "http://localhost:5000/api/applications/apply",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({ testDate, aadharNumber, dob, bloodGroup }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          alert("Application submitted successfully!");
          navigate("/user-home");
        } else {
          setError(data.message);
        }
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
    }
  };
  return (
      <section
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Apply for Driving License
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleStripeSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Aadhar Number:
              </label>
              <input
                type="text"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date of Birth:
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                max={maxDobStr}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Blood Group:
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Choose Test Date:
              </label>
              <input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                min={minTestDateStr}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Stripe Payment */}
            <div className="p-4 border rounded-md shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">
                Card Details:
              </label>
              <CardElement className="p-2 border rounded-md" />
            </div>

            <button
              type="submit"
              disabled={!stripe}
              className={`w-full text-white px-4 py-2 rounded-md ${
                stripe
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Pay & Apply
            </button>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </section>
  );
};

export default ApplicationFormStripe;
