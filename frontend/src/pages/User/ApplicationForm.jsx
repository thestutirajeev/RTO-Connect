import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/images/hero-bg.png";

const ApplicationForm = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const checkTestStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setStatusMessage("❌ You must be logged in to check eligibility.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/applications/check-test-status",
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        setShowOverlay(false); // Hide overlay if eligible
      } else {
        setStatusMessage(`⚠️ ${data.message}`);
      }
    } catch (error) {
      console.error("Error checking test status:", error);
      setStatusMessage("❌ Something went wrong. Please try again.");
    }
  };

  const [testDate, setTestDate] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [error, setError] = useState(null);

  // Calculate the minimum test date (3 days later from today)
  const today = new Date();
  const minTestDate = new Date(today);
  minTestDate.setDate(today.getDate() + 3);
  const minTestDateStr = minTestDate.toISOString().split("T")[0];

  // Calculate the maximum DOB (must be at least 18 years old)
  const maxDob = new Date();
  maxDob.setFullYear(today.getFullYear() - 18);
  const maxDobStr = maxDob.toISOString().split("T")[0];

  const handleRazorpaySubmit = async (e) => {
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

      // Step 1: Create Razorpay Order
      const res = await fetch(
        "http://localhost:5000/api/payments/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 50000 }), // ₹500 in paise
        }
      );

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.message || "Failed to create order");
      }

      // Step 2: Initialize Razorpay Payment
      const options = {
        key: "your_key_id", // Replace with Razorpay Key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: "RTO Connect",
        description: "Driving License Application Fee",
        order_id: orderData.id,
        handler: async function (response) {
          // Step 3: Verify Payment on Backend
          const verifyRes = await fetch(
            "http://localhost:5000/api/payments/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyRes.ok) {
            alert("Payment successful!");

            // Step 4: Submit Application After Payment Success
            const applicationRes = await fetch(
              "http://localhost:5000/api/applications/apply",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify({
                  testDate,
                  aadharNumber,
                  dob,
                  bloodGroup,
                }),
              }
            );

            const applicationData = await applicationRes.json();
            if (applicationRes.ok) {
              alert("Application submitted successfully!");
              navigate("/user-home");
            } else {
              setError(applicationData.message);
            }
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setError("Payment initiation failed.");
    }
  };
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

      const response = await fetch(
        "http://localhost:5000/api/applications/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ testDate, aadharNumber, dob, bloodGroup }),
        }
      );

      const data = await respocnse.json();
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
    <section
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you eligible for DL Application?
            </h2>
            <button
              onClick={checkTestStatus}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Check
            </button>
            {statusMessage && (
              <p className="mt-3 text-red-500 text-sm">{statusMessage}</p>
            )}
            {statusMessage.includes("Please take the test again") && (
              <button
                className="w-full mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                onClick={() => navigate("/dl-test")}
              >
                Take Test
              </button>
            )}
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Apply for Driving License
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Aadhar Number:
            </label>
            <input
              type="text"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date of Birth:
            </label>
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
            <label className="block text-gray-700 font-medium mb-2">
              Blood Group:
            </label>
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
            <label className="block text-gray-700 font-medium mb-2">
              Choose Test Date:
            </label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              min={minTestDateStr}
              pattern="\d{12}" 
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
    </section>
  );
};

export default ApplicationForm;
