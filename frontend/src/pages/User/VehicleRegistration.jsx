import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from '../../assets/images/hero-bg.png';

const VehicleRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Owner Details
    ownerName: "Ish Jaiswal",
    ownerEmail: "ish@gmail.com",
    ownerAddress: "123 Hazratganj, Lucknow, UP",
    ownerAadhar: "1234-5678-9012",

    // Vehicle Details
    vehicleManufacturer: "Toyota",
    vehicleModel: "Corolla",
    vehicleType: "Sedan",
    fuelType: "Petrol",
    engineNumber: "MAE6T5942658",
    chassisNumber: "A32ME665544",

    // Registration Details
    registrationNumber: "UP32AB9934",
    registrationStartDate: "2024-03-01",
    registrationEndDate: "2034-03-01",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents page reload
    //Check if user is login or not using token
    if (!localStorage.getItem("token")) {
      alert("You must be logged in to register a vehicle.");
      navigate("/login");
      return false;
    }
    try {
      const response = await fetch("http://localhost:5000/api/vehicles/registerVehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Vehicle registered successfully!"); // Shows alert only on success
        navigate("/user-home");
      } else {
        alert("Error: " + data.message); // Shows error if backend fails
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server.");
    }
  };
  
  return (
    <section style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="form-container mx-auto p-6 rounded-lg shadow-md">
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
            <label className="block text-sm font-medium">Type (Sedan/SUV):</label>
            <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
            <label className="block text-sm font-medium">Registration Start Date:</label>
            <input type="date" name="registrationStartDate" value={formData.registrationStartDate} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium">Registration End Date:</label>
            <input type="date" name="registrationEndDate" value={formData.registrationEndDate} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
      
          <button type="submit" className="col-span-full w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Register</button>
        </form>
    </div>
  </section>
  );
};

export default VehicleRegistration;
