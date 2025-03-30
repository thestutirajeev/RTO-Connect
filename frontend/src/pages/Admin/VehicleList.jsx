import { useEffect, useState } from "react";
import heroBg from '../../assets/images/hero-bg.png';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpired, setFilterExpired] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  const today = new Date();

  // 🔍 Filter logic
  const filteredVehicles = vehicles.filter((vehicle) => {
    // Convert registrationEndDate to Date object
    const regEndDate = new Date(vehicle.registrationEndDate);

    // If filtering expired vehicles
    if (filterExpired && regEndDate >= today) return false;

    // Match search term with any attribute
    return Object.values(vehicle)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <h2 className="text-2xl font-bold mb-4">Vehicle List</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by any attribute..."
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🚦 Filter Buttons */}
      <div className="mb-4">
        <button
          onClick={() => setFilterExpired(!filterExpired)}
          className={`px-4 py-2 rounded ${filterExpired ? "bg-red-600 text-white" : "bg-gray-300"}`}
        >
          {filterExpired ? "Show All Vehicles" : "Show Expired Registrations"}
        </button>
      </div>

      {/* 🚗 Vehicle Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Owner</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Vehicle</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Fuel</th>
              <th className="border p-2">Reg. Number</th>
              <th className="border p-2">Reg. End Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle._id} className="hover:bg-gray-100">
                <td className="border p-2">{vehicle.ownerName}</td>
                <td className="border p-2">{vehicle.ownerEmail}</td>
                <td className="border p-2">{vehicle.vehicleManufacturer} {vehicle.vehicleModel}</td>
                <td className="border p-2">{vehicle.vehicleType}</td>
                <td className="border p-2">{vehicle.fuelType}</td>
                <td className="border p-2">{vehicle.registrationNumber}</td>
                <td className={`border p-2 ${new Date(vehicle.registrationEndDate) < today ? "text-red-600" : ""}`}>
                  {new Date(vehicle.registrationEndDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleList;
