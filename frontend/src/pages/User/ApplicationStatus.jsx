import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import statusGif from "../../assets/images/status.gif"; // Import the status GIF

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
        const userId = localStorage.getItem("userId");
        if (!userId) {
          navigate("/login");
          return;
        }
        const response = await fetch(
          `http://localhost:5000/api/applications/myapplications/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Status GIF Section */}
          <div className="hidden lg:block lg:col-span-4 bg-primaryColor rounded-l-lg">
            <figure className="h-full">
              <img
                src={statusGif}
                alt="Status"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </figure>
          </div>

          {/* Application Status Details Section */}
          <div className="lg:col-span-8 bg-white rounded-r-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-headingColor">
              Driving License Application Status
            </h2>

            {loading && <p>Loading applications...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {applications.length === 0 ? (
              <p>No applications found.</p>
            ) : (
              <div className="overflow-y-auto h-[400px]">
                {applications.map((app) => (
                  <div
                    key={app._id}
                    className="border-b border-gray-300 mb-4 pb-4 last:border-b-0"
                  >
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {/* License Number */}
                      <p className="font-medium text-headingColor">License No:</p>
                      <p className="text-gray-600">
                        {app._id.toUpperCase()}
                      </p>

                      <p className="font-medium text-headingColor">Application Date:</p>
                      <p className="text-gray-600">
                        {new Date(app.applicationDate).toLocaleDateString()}
                      </p>

                      <p className="font-medium text-headingColor">Test Date:</p>
                      <p className="text-gray-600">
                        {new Date(app.testDate).toLocaleDateString()}
                      </p>

                      <p className="font-medium text-headingColor">Aadhar Number:</p>
                      <p className="text-gray-600">{app.aadharNumber}</p>

                      <p className="font-medium text-headingColor">Blood Group:</p>
                      <p className="text-gray-600">{app.bloodGroup}</p>

                      <p className="font-medium text-headingColor">Status:</p>
                      <p
                        className={`font-bold ${
                          app.status === "Approved"
                            ? "text-green-600"
                            : app.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {app.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationStatus;