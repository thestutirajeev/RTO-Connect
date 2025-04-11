import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import heroBg from "../../assets/images/hero-bg.png";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact/displayfeedbacks") 
      .then((res) => {
        if(Array.isArray(res.data)) {
            setFeedbacks(res.data);
        }
        else {
            console.error("Unexpected response format:", res.data);
            setFeedbacks([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
  }, []);

  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
style={{
  backgroundImage: `url(${heroBg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}}>
  {feedbacks.map((feedback) => (
    <div
      key={feedback._id}
      className="border border-gray-300 rounded-lg p-5 bg-gray-50 shadow-sm hover:shadow-md transition duration-300"
    >
      {/* Stars */}
      <div className="flex items-center mb-2">
        {Array.from({ length: 5 }, (_, index) => (
          <AiFillStar
            key={index}
            className={`w-5 h-5 ${
              index < feedback.rating
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Feedback Text */}
      <p className="text-gray-700 text-[16px] italic mb-2">
        “{feedback.comment}”
      </p>

      {/* User & Date */}
      <div className="text-sm text-gray-500 flex justify-between">
        <span>👤 User: {feedback.name}</span>
      </div>
    </div>
  ))}
</div>
  );
};

export default FeedbackList;
// This component fetches and displays user feedback reviews with star ratings and user IDs.