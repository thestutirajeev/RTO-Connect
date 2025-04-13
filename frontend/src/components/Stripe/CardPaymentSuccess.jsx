import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CardPaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    amount,
    testDate,
    aadharNumber,
    dob,
    bloodGroup,
    postalCode,
    token
  } = location.state || {};

  const [countdown, setCountdown] = useState(15); // State for countdown timer

  useEffect(() => {
    // Submit application data to the backend
    const submitApplication = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/applications/apply", {
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
            postalCode,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          console.error("Application Error:", data.message);
        }
      } catch (error) {
        console.error("Error submitting application:", error.message);
      }
    };

    submitApplication();

    // Countdown logic
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, testDate, aadharNumber, dob, bloodGroup, postalCode, token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Successful</h1>
        <p className="text-lg">Payment Mode: <strong>Card</strong></p>
        <p className="text-lg">Amount Paid: ₹{amount}</p>
        <p className="mt-6 text-gray-700">
          You will be redirected to your dashboard in <strong>{countdown} seconds</strong>.
        </p>
      </div>
    </div>
  );
};

export default CardPaymentSuccess;
