import { useState } from "react";

const VehicleForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        regNumber: "",
        ownerName: "",
        chassisNumber: "",
        engineNumber: "",
        model: "",
        year: "",
        vehicleType: "",
        fuelType: "",
        emissionLevel: "",
        insuranceExpiry: "", // ✅ Added this field
        pollutionValid: false, // Checkbox for Pollution Certificate
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // ✅ Passes the updated formData to EligibilityCheck
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 border rounded-lg bg-gray-100 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Vehicle Fitness Check</h2>

            <label className="block mb-2">Registration No:</label>
            <input type="text" name="regNumber" value={formData.regNumber} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />

            <label className="block mb-2">Owner Name:</label>
            <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />

            <label className="block mb-2">Chassis Number:</label>
            <input type="text" name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />

            <label className="block mb-2">Engine Number:</label>
            <input type="text" name="engineNumber" value={formData.engineNumber} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />

            <label className="block mb-2">Model:</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />

            <label className="block mb-2">Manufactured Year:</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />

            <label className="block mb-2">Vehicle Type:</label>
            <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full p-2 border rounded mb-3">
                <option value="">Select Type</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Truck">Truck</option>
            </select>

            <label className="block mb-2">Fuel Type:</label>
            <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="w-full p-2 border rounded mb-3">
                <option value="">Select Fuel</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
            </select>

            <label className="block mb-2">Emission Level:</label>
            <select name="emissionLevel" value={formData.emissionLevel} onChange={handleChange} className="w-full p-2 border rounded mb-3">
                <option value="">Select Emission Level</option>
                <option value="BS-IV">BS-IV</option>
                <option value="BS-VI">BS-VI</option>
            </select>

            <label className="block mb-2">Insurance Expiry Date:</label>
            <input type="date" name="insuranceExpiry" value={formData.insuranceExpiry} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />

            <label className="block mb-2">Pollution Certificate Valid:</label>
            <input type="checkbox" name="pollutionValid" checked={formData.pollutionValid} onChange={handleChange} className="mr-2" /> Yes
            <br />

            <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                Check Eligibility
            </button>
        </form>
    );
};

export default VehicleForm;