import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const [testDate, setTestDate] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Calculate the minimum test date (3 days later from today)
  const today = new Date();
  const minTestDate = new Date(today);
  minTestDate.setDate(today.getDate() + 3);
  const minTestDateStr = minTestDate.toISOString().split("T")[0];

  // Calculate the maximum DOB (must be at least 18 years old)
  const maxDob = new Date();
  maxDob.setFullYear(today.getFullYear() - 18);
  const maxDobStr = maxDob.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!testDate || !aadharNumber || !dob || !bloodGroup) {
      setError("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to apply.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/applications/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ testDate, aadharNumber, dob, bloodGroup }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Application submitted successfully!");
        navigate("/user-home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error submitting application. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Apply for Driving License</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-gray-700 font-medium mb-2">Aadhar Number:</label>
            <input
                type="text"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
            </div>

            <div>
            <label className="block text-gray-700 font-medium mb-2">Date of Birth:</label>
            <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                max={maxDobStr}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
            </div>

            <div>
            <label className="block text-gray-700 font-medium mb-2">Blood Group:</label>
            <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
            </select>
            </div>

            <div>
            <label className="block text-gray-700 font-medium mb-2">Choose Test Date:</label>
            <input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                min={minTestDateStr}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
            </div>

            <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
            Submit Application
            </button>
        </form>
    </div>
  );
};

export default ApplicationForm;
