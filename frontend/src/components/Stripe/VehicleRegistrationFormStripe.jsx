import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import heroBg from '../../assets/images/hero-bg.png';
import vehicleGif from '../../assets/images/vehicles.gif';
import { useAlert } from "../Alerts/AlertManager.jsx";

// Vehicle types with registration fees
const vehicleTypes = [
  { type: 'Sedan', fee: 5000 },
  { type: 'SUV', fee: 7500 },
  { type: 'Motorcycle', fee: 2000 },
  { type: 'Truck', fee: 10000 },
  { type: 'Bus', fee: 15000 },
];

const VehicleRegistrationFormStripe = () => {
  const { showAlert } = useAlert();

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const vehicleTypes = [
    { type: 'Sedan', fee: 5000 },
    { type: 'SUV', fee: 7500 },
    { type: 'Hatchback', fee: 3500},
  ];
  const [formData, setFormData] = useState({
    ownerName: "Ish Jaiswal",
    ownerEmail: "ish@gmail.com",
    ownerAddress: "123 Hazratganj, Lucknow, UP",
    postalCode: "206016",
    ownerAadhar: "1234-5678-9012",
    vehicleManufacturer: "Toyota",
    vehicleModel: "Corolla",
    vehicleType: "Sedan",
    fuelType: "Petrol",
    engineNumber: "MAE6T5942658",
    chassisNumber: "A32ME665544",
    registrationNumber: "UP32AB9934",
    registrationFee: 5000, // Initial fee for Sedan
  });

  useEffect(() => {
    const selected = vehicleTypes.find(vt => vt.type === formData.vehicleType);
    if (selected) {
      setFormData(prev => ({ ...prev, registrationFee: selected.fee }));
    }
  }, [formData.vehicleType]);


  // Set registration dates on component mount
  useEffect(() => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setFullYear(today.getFullYear() + 10);

    setFormData(prev => ({
      ...prev,
      registrationStartDate: today.toISOString().split('T')[0],
      registrationEndDate: endDate.toISOString().split('T')[0]
    }));
  }, []);

  // Update fee when vehicle type changes
  useEffect(() => {
    const selected = vehicleTypes.find(vt => vt.type === formData.vehicleType);
    if (selected) {
      setFormData(prev => ({ ...prev, registrationFee: selected.fee }));
    }
  }, [formData.vehicleType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    
    if (!localStorage.getItem("token")) {
      showAlert("failure", "You must be logged in to register a vehicle.");
      navigate("/login");
      return;
    }

    if (!stripe || !elements) {
      setError("Stripe is not initialized");
      return;
    }

    setIsLoading(true);

    try {
      // Create payment intent
      const paymentRes = await fetch("http://localhost:5000/api/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          amount: formData.registrationFee * 100, // Convert to paise
          currency: "INR",
          postalCode: formData.postalCode,
          name: formData.ownerAadhar,
          addressLine1: "123 Default St",
          city: "Chennai",
          vehicleType: formData.vehicleType,
        }),
      });

      if (!paymentRes.ok) throw new Error("Payment initialization failed");

      const { clientSecret } = await paymentRes.json();

      // Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.ownerName,
            address: {
              line1: formData.address || "123 Default St",
              city: "Lucknow",
              postal_code: formData.postalCode,
              country: "IN"
            }
          }
        }
      });

      if (stripeError) throw stripeError;

      // Submit vehicle registration after successful payment
      const registrationRes = await fetch("http://localhost:5000/api/vehicles/registerVehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          ...formData,
          paymentId: paymentIntent.id
        }),
      });

      if (!registrationRes.ok) throw new Error("Vehicle registration failed");

      navigate("/card-success", {
        state: {
          amount: formData.registrationFee,
          vehicleDetails: formData,
          paymentId: paymentIntent.id
        }
      });

    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Payment failed. Please try again.");
    } finally {
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
      className="px-5 xl:px-0 py-10"
    >
      <h2 className="text-2xl font-bold text-center text-primaryColor">
        Vehicle Registration
      </h2>
      <div className="max-w-[1170px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        {/* Vehicles GIF Section */}
        <div className="hidden lg:block lg:col-span-3 bg-primaryColor rounded-l-lg">
          <figure className="h-full">
            <img
              src={vehicleGif}
              alt="Vehicles"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </figure>
        </div>
  
        {/* Form Section */}
        <div className="lg:col-span-9 bg-white rounded-r-lg p-6 shadow-md">
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-sm"
          >
            {/* Owner Details */}
            <h3 className="text-lg font-medium col-span-full text-headingColor">
              Owner Details
            </h3>
            <div>
              <label className="block font-medium">Owner Name:</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div>
              <label className="block font-medium">Email:</label>
              <input
                type="email"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div>
              <label className="block font-medium">Address:</label>
              <input
                type="text"
                name="ownerAddress"
                value={formData.ownerAddress}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div>
              <label className="block font-medium">Postal Code:</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div>
              <label className="block font-medium">Aadhar Number:</label>
              <input
                type="text"
                name="ownerAadhar"
                value={formData.ownerAadhar}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
  
            {/* Vehicle Details */}
            <h3 className="text-lg font-medium col-span-full text-headingColor">
              Vehicle Details
            </h3>
            <div>
              <label className="block font-medium">Manufacturer:</label>
              <input
                type="text"
                name="vehicleManufacturer"
                value={formData.vehicleManufacturer}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div>
              <label className="block font-medium">Model:</label>
              <input
                type="text"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div>
              <label className="block font-medium">Vehicle Type:</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              >
                {vehicleTypes.map((vehicle) => (
                  <option key={vehicle.type} value={vehicle.type}>
                    {vehicle.type} (₹{vehicle.fee})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Fuel Type:</label>
              <input
                type="text"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div>
              <label className="block font-medium">Engine Number:</label>
              <input
                type="text"
                name="engineNumber"
                value={formData.engineNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div>
              <label className="block font-medium">Chassis Number:</label>
              <input
                type="text"
                name="chassisNumber"
                value={formData.chassisNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
  
            {/* Registration Details */}
            <h3 className="text-lg font-medium col-span-full text-headingColor">
              Registration Details
            </h3>
            <div>
              <label className="block font-medium">Registration Number:</label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div>
              <label className="block font-medium">Start Date:</label>
              <input
                type="date"
                value={formData.registrationStartDate}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium">End Date:</label>
              <input
                type="date"
                value={formData.registrationEndDate}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
  
            {/* Payment Section */}
            <div className="col-span-full space-y-4">
              <label className="block text-md font-semibold">
                Total Fee: ₹{formData.registrationFee}
              </label>
              <CardElement
                options={{
                  hidePostalCode: true,
                  style: {
                    base: {
                      fontSize: "14px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-primaryColor text-white rounded hover:bg-primaryColor/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing Payment..." : "Pay & Register Vehicle"}
              </button>
              {error && (
                <p className="text-center text-red-500">{error}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VehicleRegistrationFormStripe;