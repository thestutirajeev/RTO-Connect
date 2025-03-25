import React, { useState, useEffect } from "react";
import creta from "../assets/images/vehicleListImage/creta.png";
import fortuner from "../assets/images/vehicleListImage/fortuner.png";
import hondacity from "../assets/images/vehicleListImage/hondacity.png";
import swift from "../assets/images/vehicleListImage/swift.png";
import thar from "../assets/images/vehicleListImage/thar.png";
const VehicleList = () => {
    // Sample vehicle data
    const vehicleData = [
        {
            "ownerName": "Stuti Rajeev",
            "registrationNumber": "TN01AB1234",
            "vehicleManufacturer": "Toyota",
            "vehicleModel": "Thar",
            "fuelType": "Petrol",
            "registrationEndDate": "2025-08-15",
            "image": thar,
        },
        {
            "ownerName": "Ish Jaiswal",
            "registrationNumber": "TN01CD5678",
            "vehicleManufacturer": "Hyundai",
            "vehicleModel": "Fortuner",
            "fuelType": "Diesel",
            "registrationEndDate": "2024-12-10",
            "image": fortuner,
        },
        {
            "ownerName": "Barsha Routh",
            "registrationNumber": "TN02EF9012",
            "vehicleManufacturer": "Tata",
            "vehicleModel": "Honda City",
            "fuelType": "Electric",
            "registrationEndDate": "2026-03-25",
            "image": hondacity
        },
        {
            "ownerName": "Ram Charan",
            "registrationNumber": "TN03GH3456",
            "vehicleManufacturer": "Honda",
            "vehicleModel": "Swift",
            "fuelType": "Petrol",
            "registrationEndDate": "2025-11-30",
            "image": swift
        },
        {
            "ownerName": "Kamal Nayan",
            "registrationNumber": "TN04IJ7890",
            "vehicleManufacturer": "Mahindra",
            "vehicleModel": "Creta",
            "fuelType": "Diesel",
            "registrationEndDate": "2023-06-15",
            "image": creta
        }
    ];

    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [fuelType, setFuelType] = useState("");

    // Initialize vehicle data
    useEffect(() => {
        setVehicles(vehicleData);
        setFilteredVehicles(vehicleData);
    }, []);

    // Function to filter vehicles
    useEffect(() => {
        let filtered = vehicles.filter((vehicle) =>
            vehicle.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (fuelType) {
            filtered = filtered.filter((vehicle) => vehicle.fuelType === fuelType);
        }

        setFilteredVehicles(filtered);
    }, [searchQuery, fuelType, vehicles]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-8">
            <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 drop-shadow-lg">
                Vehicle Management Dashboard
            </h1>

            {/* Search & Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
                <input
                    type="text"
                    placeholder="Search by Owner Name or Reg No."
                    className="p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                >
                    <option value="">All Fuel Types</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                </select>
            </div>

            {/* Vehicle List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle, index) => (
                        <div
                            key={index}
                            className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex items-center p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
                        >
                            <img
                                src={vehicle.image}
                                alt={vehicle.vehicleModel}
                                className="w-48 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                            />
                            <div className="ml-6">
                                <h2 className="text-2xl font-bold text-gray-900 drop-shadow-sm">
                                    {vehicle.vehicleManufacturer} {vehicle.vehicleModel}
                                </h2>
                                <p className="text-gray-700">
                                    👤 Owner: <span className="font-medium">{vehicle.ownerName}</span>
                                </p>
                                <p className="text-gray-700">⛽ Fuel: {vehicle.fuelType}</p>
                                <p className="text-gray-700">
                                    🔖 Reg No: <span className="font-semibold">{vehicle.registrationNumber}</span>
                                </p>
                                <p className="text-gray-700">
                                    📅 Valid Till:{" "}
                                    <span className="font-semibold text-green-600">
                                        {new Date(vehicle.registrationEndDate).toLocaleDateString()}
                                    </span>
                                </p>
                                <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition duration-300">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-700 text-lg">No vehicles found.</p>
                )}
            </div>
        </div>
    );
};

export default VehicleList;