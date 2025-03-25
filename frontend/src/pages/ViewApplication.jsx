import { useEffect, useState } from "react";

const ViewApplication = () => {
  const [applications, setApplications] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/applications", {
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
      const response = await fetch(`http://localhost:5000/api/admin/applications/${id}`, {
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
    <div>
  <h2 className="text-3xl font-bold mb-6 text-center">Applications</h2>
  {applications.length === 0 ? (
    <p className="text-gray-500 text-center">No applications found</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map((app) => (
        <div
          key={app._id}
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
        >
          <p>
            <span className="font-semibold">Name:</span> {app.userId?.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {app.userId?.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {app.userId?.role}
          </p>
          <p>
            <span className="font-semibold">Application Date:</span>{" "}
            {new Date(app.applicationDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Test Date:</span>{" "}
            {new Date(app.testDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Aadhar:</span> {app.aadharNumber}
          </p>
          <p>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {new Date(app.dob).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Blood Group:</span> {app.bloodGroup}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {app.status}
          </p>
          {app.status === "Pending" && (
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleStatusChange(app._id, "Approved")}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange(app._id, "Rejected")}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Reject
              </button>
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
