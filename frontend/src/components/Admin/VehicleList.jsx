import { useEffect, useState } from "react";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpired, setFilterExpired] = useState(false);
  const [expandedVehicleId, setExpandedVehicleId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/vehicles/vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  const today = new Date();

  const toggleExpand = (id) => {
    setExpandedVehicleId(prev => (prev === id ? null : id));
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const regEndDate = new Date(vehicle.registrationEndDate);
    if (filterExpired && regEndDate >= today) return false;

    return Object.values(vehicle)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-2 text-sm">
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border p-1 w-full mb-2 text-xs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🔘 Filter */}
      <button
        onClick={() => setFilterExpired(!filterExpired)}
        className={`px-2 py-1 rounded text-xs mb-2 ${filterExpired ? "bg-red-500 text-white" : "bg-gray-200"}`}
      >
        {filterExpired ? "Show All" : "Show Expired"}
      </button>

      {/* 🚗 Vehicle List */}
      <div className="space-y-2 max-h-[320px] overflow-y-auto no-scrollbar">
        {filteredVehicles.map((vehicle) => {
          const isExpired = new Date(vehicle.registrationEndDate) < today;
          const isExpanded = expandedVehicleId === vehicle._id;

          return (
            <div key={vehicle._id} className="border rounded bg-white shadow-sm text-xs">
              <div
                className="flex justify-between items-start p-2 cursor-pointer bg-gray-100"
                onClick={() => toggleExpand(vehicle._id)}
              >
<div className="flex flex-wrap gap-x-4 text-xs">
  <p><b>Reg. No:</b> {vehicle.registrationNumber}</p>
  <p><b>Vehicle:</b> {vehicle.vehicleManufacturer} {vehicle.vehicleModel}</p>
  <p>
    <b>End Date:</b>{" "}
    <span className={isExpired ? "text-red-500" : "text-green-600"}>
      {new Date(vehicle.registrationEndDate).toLocaleDateString()}
    </span>
  </p>
</div>

                <span className="ml-2">{isExpanded ? "▲" : "▼"}</span>
              </div>

              {isExpanded && (
                <div className="px-2 pb-2">
                  <p><b>Owner:</b> {vehicle.ownerName}</p>
                  <p><b>Email:</b> {vehicle.ownerEmail}</p>
                  <p><b>Type:</b> {vehicle.vehicleType}</p>
                  <p><b>Fuel:</b> {vehicle.fuelType}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleList;
