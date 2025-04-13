import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/images/hero-bg.png";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const ApplicationFormStripe = () => {
  const stripe = useStripe();
  const elements = useElements();

  // Default values
  const [postalCode, setPostalCode] = useState("600001"); // Default: Chennai pin
  const [testDate, setTestDate] = useState(""); // Default handled below
  const [aadharNumber, setAadharNumber] = useState("123456789012");
  const [dob, setDob] = useState("2000-01-01");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const allCategories = [
    "LMV",
    "MCWG",
    "HMV",
    "MCWOG",
    "LMV-TR",
    "E-Rickshaw",
    "Tractor",
  ];
  const categoryFee = 500;
  const totalAmount = selectedCategories.length * categoryFee;
  
  const today = new Date();
  const minTestDate = new Date(today);
  minTestDate.setDate(today.getDate() + 3);
  const minTestDateStr = minTestDate.toISOString().split("T")[0];

  const maxDob = new Date();
  maxDob.setFullYear(today.getFullYear() - 18);
  const maxDobStr = maxDob.toISOString().split("T")[0];

  // Set default test date on initial load (useEffect can also be used here)
  useEffect(() => {
    if (!testDate) {
      setTestDate(minTestDateStr);
    }
  }, [testDate, minTestDateStr]);


  const moveCategory = (cat, toSelected) => {
    if (toSelected) {
      setSelectedCategories([...selectedCategories, cat]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    }
  };

  const handleStripeSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded. Please try again later.");
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card Element not found. Please try again later.");
      return;
    }
    
    if (
      !testDate ||
      !aadharNumber ||
      !dob ||
      !bloodGroup ||
      !postalCode ||
      selectedCategories.length === 0
    ) {
      setError("All fields including at least one vehicle category are required.");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to apply.");
        setIsLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/payments/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          currency: "INR",
          postalCode,
          name: aadharNumber,
          addressLine1: "123 Default St",
          city: "Chennai",
          categories: selectedCategories,
        }),
      });

      if (!res.ok) throw new Error("Failed to create payment intent");

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: aadharNumber,  // or actual customer name
            address: {
              line1: "123 Default St",
              city: "Chennai",
              postal_code: postalCode,
              country: "IN"
            }
          }
        }
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        navigate("/card-success", {
          state: {
            amount: totalAmount, // amount in rupees (150000 paise)
            testDate,
            aadharNumber,
            dob,
            bloodGroup,
            postalCode,
            categories:selectedCategories,
            token
          }
        });

        const response = await fetch("http://localhost:5000/api/applications/apply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            amount: totalAmount,
            testDate,
            aadharNumber,
            dob,
            bloodGroup,
            postalCode,
            categories: selectedCategories,
            paymentStatus: result.paymentIntent.status,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Application submitted successfully!");
          setPostalCode("600001");
          setTestDate(minTestDateStr);
          setAadharNumber("123456789012");
          setDob("2000-01-01");
          setBloodGroup("O+");
          setSelectedCategories([]);
          navigate("/user-home");
        } else {
          setError(data.message);
        }
      }
    } catch (err) {
      console.error("General Error:", err);
      setError("Payment failed. Please try again.");
      setIsLoading(false);
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
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Apply for Driving License
        </h2>

        <form onSubmit={handleStripeSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Personal Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Aadhar Number:</label>
              <input
                type="text"
                pattern="\d{12}"
                title="Enter exactly 12 digits"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                required
                placeholder="Enter 12-digit Aadhar"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Date of Birth:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                max={maxDobStr}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Blood Group:</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md"
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
              <label className="block text-gray-700 font-medium mb-2">Choose Test Date:</label>
              <input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                min={minTestDateStr}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Postal Code:</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                placeholder="Enter 6-digit PIN"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Right Side: Category + Payment */}
          <div className="space-y-4">
            {/* Category Selection */}
            <div className="p-4 border rounded-md">
              <label className="block text-gray-700 font-medium mb-2">Vehicle Category (₹500 each):</label>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) =>
                  selectedCategories.includes(cat) ? (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => moveCategory(cat, false)}
                      className="bg-green-200 px-3 py-1 rounded-full hover:bg-green-300"
                    >
                      {cat} &times;
                    </button>
                  ) : (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => moveCategory(cat, true)}
                      className="bg-blue-200 px-3 py-1 rounded-full hover:bg-blue-300"
                    >
                      {cat} +
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Total Amount */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Total Amount:</label>
              <p className="text-lg font-bold text-blue-600 mb-6">₹{totalAmount}</p>
            </div>

            {/* Card Payment */}
            <div className="p-4 border rounded-md">
              <CardElement options={{ hidePostalCode: true }} className="p-2 border rounded-md" />
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-2 rounded-md ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Submit Application"}
              </button>
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ApplicationFormStripe;
