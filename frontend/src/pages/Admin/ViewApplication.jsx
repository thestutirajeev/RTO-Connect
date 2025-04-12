import { useEffect, useState } from "react";
import heroBg from '../../assets/images/hero-bg.png';
const ViewApplication = () => {
  // In your component:
  const [expandedAppId, setExpandedAppId] = useState(null);

  const toggleDetails = (id) => {
    setExpandedAppId((prevId) => (prevId === id ? null : id));
  };
  const [applications, setApplications] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/applications/fetchapplications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add auth token
          },
        });

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/updateapplicationstatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      });

      const updatedApp = await response.json();
      if (response.ok) {
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app))
        );
      } else {
        throw new Error(updatedApp.message || "Failed to update status");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      {applications.length === 0 ? (
        <p className="text-gray-500 text-center text-sm">No applications found</p>
      ) : (
        <div className="space-y-2">
          {applications.map((app) => (
            <div
              key={app._id}
              className="border border-gray-300 rounded-md shadow-sm text-sm"
            >
              {/* Header */}
              <div
                className="flex flex-wrap justify-between items-center bg-gray-100 px-3 py-2 cursor-pointer text-xs"
                onClick={() => toggleDetails(app._id)}
              >
                <span className="font-medium">{app.userId?.name}</span>
                <span className="text-gray-600">{app.userId?.email}</span>
                <span>
                  {app.status === "Approved" ? (
                    <span className="text-green-500 font-semibold">Approved</span>
                  ) : app.status === "Rejected" ? (
                    <span className="text-red-500 font-semibold">Rejected</span>
                  ) : (
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(app._id, "Approved");
                        }}
                        className="bg-green-500 text-white px-2 py-0.5 rounded text-xs hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(app._id, "Rejected");
                        }}
                        className="bg-red-500 text-white px-2 py-0.5 rounded text-xs hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </span>
                <span className="ml-2">
                  {expandedAppId === app._id ? (
                    <button>&#9650;</button> // Up arrow
                  ) : (
                    <button>&#9660;</button> // Down arrow
                  )}
                </span>
              </div>
  
              {/* Expanded Details */}
              {expandedAppId === app._id && (
                <div className="px-3 py-2 bg-white text-xs space-y-1">
                  <div className="flex flex-wrap gap-x-4">
                    <p><b>Application:</b> {new Date(app.applicationDate).toLocaleDateString()}</p>
                    <p><b>Test:</b> {new Date(app.testDate).toLocaleDateString()}</p>
                    <p><b>DOB:</b> {new Date(app.dob).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-wrap gap-x-4">
                    <p><b>Aadhar:</b> {app.aadharNumber}</p>
                    <p><b>Blood:</b> {app.bloodGroup}</p>
                    <p><b>Role:</b> {app.userId?.role}</p>
                  </div>
                  <p><b>Status:</b> {app.status}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default ViewApplication;
