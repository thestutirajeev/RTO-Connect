import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import heroBg from '../../assets/images/hero-bg.png';
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
    <section style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="form-container mx-auto p-6 rounded-lg shadow-md bg-white">
        <h2 className="text-4xl font-bold text-center mb-4">Vehicle Registration</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {/* Owner Details */}
          <h3 className="text-xl font-semibold col-span-full">Owner Details</h3>
          <div>
            <label className="block text-sm font-medium">Owner Name:</label>
            <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email:</label>
            <input type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Address:</label>
            <input type="text" name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Postal Code:</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Aadhar Number:</label>
            <input type="text" name="ownerAadhar" value={formData.ownerAadhar} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
      
          {/* Vehicle Details */}
          <h3 className="text-xl font-semibold col-span-full">Vehicle Details</h3>
          <div>
            <label className="block text-sm font-medium">Manufacturer:</label>
            <input type="text" name="vehicleManufacturer" value={formData.vehicleManufacturer} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Model:</label>
            <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Vehicle Type:</label>
            <select 
              name="vehicleType" 
              value={formData.vehicleType} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {vehicleTypes.map((vehicle) => (
                <option key={vehicle.type} value={vehicle.type}>
                  {vehicle.type} (₹{vehicle.fee})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Fuel Type:</label>
            <input type="text" name="fuelType" value={formData.fuelType} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Engine Number:</label>
            <input type="text" name="engineNumber" value={formData.engineNumber} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Chassis Number:</label>
            <input type="text" name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Registration Details */}
          <h3 className="text-xl font-semibold col-span-full">Registration Details</h3>
          <div>
            <label className="block text-sm font-medium">Registration Number:</label>
            <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Start Date:</label>
            <input type="date" value={formData.registrationStartDate} readOnly
                   className="w-full p-2 border rounded bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium">End Date:</label>
            <input type="date" value={formData.registrationEndDate} readOnly
                   className="w-full p-2 border rounded bg-gray-100" />
          </div>

          {/* Payment Section */}
          <div className="col-span-full space-y-4">
            <div className="p-4 border rounded">
              <label className="block text-lg font-semibold mb-4">
                Total Fee: ₹{formData.registrationFee}
              </label>
              <CardElement 
                options={{
                  hidePostalCode: true ,
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': { color: '#aab7c4' }
                    },
                    invalid: { color: '#9e2146' }
                  }
                }}
                className="p-3 border rounded"
              />
            </div>

            <button type="submit" disabled={isLoading}
                    className="col-span-full w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                             disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? 'Processing Payment...' : 'Pay & Register Vehicle'}
            </button>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default VehicleRegistrationFormStripe;