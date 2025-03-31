import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplicationStatus = () => {
    const navigate = useNavigate();
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
    }
   }, []);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
        try {
          const userId = localStorage.getItem("userId"); // Get userId from local storage
          console.log("User ID:", userId); // Debugging line
          if (!userId) {
            navigate("/login");
            return;
          }      
          const response = await fetch(`http://localhost:5000/api/applications/myapplications/${userId}`, { // 🔥 Pass userId in URL
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch applications");
          }
          const data = await response.json();
          setApplications(data); // No need to reverse() as backend is already sorting newest first
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
    };
      
    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Driving License Application Status</h2>

      {loading && <p>Loading applications...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Application Date</th>
                <th className="border p-2">Test Date</th>
                <th className="border p-2">Aadhar Number</th>
                <th className="border p-2">Blood Group</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-100">
                  <td className="border p-2">{new Date(app.applicationDate).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(app.testDate).toLocaleDateString()}</td>
                  <td className="border p-2">{app.aadharNumber}</td>
                  <td className="border p-2">{app.bloodGroup}</td>
                  <td
                    className={`border p-2 font-bold ${
                      app.status === "Approved"
                        ? "text-green-600"
                        : app.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {app.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;
