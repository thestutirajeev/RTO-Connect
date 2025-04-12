import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact/displayfeedbacks")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setFeedbacks(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setFeedbacks([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
  }, []);

  return (
    <div className="space-y-2">
      {feedbacks.map((feedback) => (
        <div
          key={feedback._id}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm"
        >
          {/* Stars */}
          <div className="flex items-center mb-1">
            {Array.from({ length: 5 }, (_, index) => (
              <AiFillStar
                key={index}
                className={`w-4 h-4 ${
                  index < feedback.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Feedback Text */}
          <p className="text-sm text-gray-700 italic mb-1">
            “{feedback.comment}”
          </p>

          {/* User */}
          <p className="text-xs text-gray-500">👤 {feedback.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
