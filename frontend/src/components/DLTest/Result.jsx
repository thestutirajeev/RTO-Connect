import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Result = ({ score, total }) => {
  const navigate = useNavigate();
  const scorePercentage = (score / total) * 100;
  const [isSubmitted, setIsSubmitted] = useState(false); // Prevent multiple submissions

  //Use Effect to navigate to home page after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate("/user-home");
    }, 5000);
  }, []);
 
  const handleSubmit = async () => {
    if (isSubmitted) return; // Prevent duplicate requests

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("You must be logged in to apply.");
      return;
    }

    if (scorePercentage >= 60) {
      console.log("Test passed. Storing result in DB...");
      setIsSubmitted(true); // Prevent re-submission

      try {
        const response = await fetch("http://localhost:5000/api/applications/savetestresult", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ scorePercentage }),
        });

        const data = await response.json();
        console.log("Result stored:", data);
      } catch (error) {
        console.error("Error saving result:", error);
      }
    }
  };

  return (
    <div className="result flex flex-col items-center justify-center min-h-screen bg-gray-50" >
  <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
    <h2
      className={`text-3xl font-extrabold mb-4 text-center ${
        scorePercentage >= 60 ? "text-green-500" : "text-red-500"
      }`}
    >
      {scorePercentage >= 60 ? "You Passed! 🎉" : "You Failed! 🚦"}
    </h2>
    <p className="text-lg text-gray-700 mb-6 text-center">
      Score: {scorePercentage.toFixed(2)}%
    </p>

    {scorePercentage >= 60 && !isSubmitted && (
      <button
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition-all"
        onClick={handleSubmit}
      >
        Save Result
      </button>
    )}
  </div>
</div>
  );
};

export default Result;
