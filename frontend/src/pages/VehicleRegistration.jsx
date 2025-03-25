import React, { use, useState } from "react";
import "../styles/formstyle.css";
import { useNavigate } from "react-router-dom";

const VehicleRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Owner Details
    ownerName: "Ramesh K Singh",
    ownerEmail: "ramesh@gmail.com",
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
    <div className="form-container">
      <h2>Vehicle Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Owner Details */}
        <h3>Owner Details</h3>
        <label>Owner Name:</label>
        <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required />
        <br />
        
        <label>Email:</label>
        <input type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleChange} required />
        <br />
        
        <label>Address:</label>
        <input type="text" name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} required />
        <br />
        
        <label>Aadhar Number:</label>
        <input type="text" name="ownerAadhar" value={formData.ownerAadhar} onChange={handleChange} required />
        <br />
  
        {/* Vehicle Details */}
        <h3>Vehicle Details</h3>
        <label>Manufacturer:</label>
        <input type="text" name="vehicleManufacturer" value={formData.vehicleManufacturer} onChange={handleChange} required />
        <br />
  
        <label>Model:</label>
        <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} required />
        <br />
  
        <label>Type (Sedan/SUV):</label>
        <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required />
        <br />
  
        <label>Fuel Type:</label>
        <input type="text" name="fuelType" value={formData.fuelType} onChange={handleChange} required />
        <br />
  
        <label>Engine Number:</label>
        <input type="text" name="engineNumber" value={formData.engineNumber} onChange={handleChange} required />
        <br />
  
        <label>Chassis Number:</label>
        <input type="text" name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} required />
        <br />
  
        {/* Registration Details */}
        <h3>Registration Details</h3>
        <label>Registration Number:</label>
        <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
        <br />
  
        <label>Registration Start Date:</label>
        <input type="date" name="registrationStartDate" value={formData.registrationStartDate} onChange={handleChange} required />
        <br />
  
        <label>Registration End Date:</label>
        <input type="date" name="registrationEndDate" value={formData.registrationEndDate} onChange={handleChange} required />
        <br />
  
        <button type="submit">Register Vehicle</button>
      </form>
    </div>
  );
  
};

export default VehicleRegistration;
