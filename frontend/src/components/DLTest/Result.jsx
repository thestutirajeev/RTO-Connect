import React from "react";

const Result = ({ score, total }) => {
  return (
    <div className="result text-center">
      <h2 className="text-2xl font-bold text-green-600">Your Score: {score} / {total}</h2>
      <p className="text-gray-600 mt-2">{score >= total / 2 ? "Good job! 🎉" : "Try again! 🚦"}</p>
    </div>
  );
};

export default Result;