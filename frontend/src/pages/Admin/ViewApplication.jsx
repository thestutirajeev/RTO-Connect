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
    <div style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="min-h-screen p-10 bg-gradient-to-b from-gray-100 to-gray-300">
    <h2 className="text-3xl font-bold mb-6 text-center">Applications</h2>
    {applications.length === 0 ? (
      <p className="text-gray-500 text-center">No applications found</p>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-sm"
          >
            <div
              className="flex justify-between items-center bg-gray-100 p-4 cursor-pointer"
              onClick={() => toggleDetails(app._id)}
            >
              <span className="font-semibold">{app.userId?.name}</span>
              <span>{app.userId?.email}</span>
              <span>
                {app.status === "Approved" ? (
                  <span className="text-green-500 font-semibold">Approved</span>
                ) : app.status === "Rejected" ? (
                  <span className="text-red-500 font-semibold">Rejected</span>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(app._id, "Approved");
                      }}
                      className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(app._id, "Rejected");
                      }}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
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
            {expandedAppId === app._id && (
              <div className="p-4 bg-white">
                <p>
                  <span className="font-semibold">Application Date:</span>{" "}
                  {new Date(app.applicationDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Role:</span> {app.userId?.role}
                </p>
                <p>
                  <span className="font-semibold">Test Date:</span>{" "}
                  {new Date(app.testDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Aadhar:</span>{" "}
                  {app.aadharNumber}
                </p>
                <p>
                  <span className="font-semibold">Date of Birth:</span>{" "}
                  {new Date(app.dob).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Blood Group:</span>{" "}
                  {app.bloodGroup}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {app.status}
                </p>
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
