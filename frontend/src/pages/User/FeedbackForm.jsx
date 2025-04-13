import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../components/Alerts/AlertManager.jsx';
const FeedbackForm = () => {
  const { showAlert } = useAlert();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      showAlert("failure", "Please login to submit feedback!");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/contact/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          noOfStars: rating,
          feedback: reviewText,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showAlert("success", "Feedback submitted successfully!");
        setRating(0);
        setHover(0);
        setReviewText("");
        navigate("/");
      } else {
        showAlert("failure", data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      showAlert("failure", "Error submitting feedback");
    }
  };

  return (
    <form 
  onSubmit={handleSubmitReview} 
  className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200"
>
  {/* Rating Section */}
  <div>
    <h3 className="text-heading text-[18px] leading-6 font-semibold mb-3 text-gray-800">
      How would you rate your RTO Connect experience?*
    </h3>

    <div className="flex gap-2 mb-4">
      {[...Array(5).keys()].map((_, index) => {
        index += 1;
        return (
          <button 
            key={index}
            type="button"
            className={`transition-colors duration-200 text-[26px] ${
              index <= (hover || rating)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(0)}
            onDoubleClick={() => {
              setHover(0);
              setRating(0);
            }}
          >
            <AiFillStar />
          </button>
        );
      })}
    </div>
  </div>

  {/* Textarea Section */}
  <div className="mt-6">
    <h3 className="text-heading text-[18px] leading-6 font-semibold mb-3 text-gray-800">
      Share your feedback or suggestions*
    </h3>

    <textarea
      className="border border-gray-300 focus:ring-2 focus:ring-primaryColor focus:outline-none w-full px-4 py-3 rounded-md shadow-sm text-gray-700 placeholder:text-gray-400 transition-all"
      rows="5"
      placeholder="Tell us how RTO Connect helped you..."
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
    ></textarea>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="btn mt-6 bg-primaryColor hover:bg-primaryColor/90 text-white px-6 py-2 rounded-md shadow-md transition-all duration-300"
  >
    Submit Feedback
  </button>
</form>

  );
};

export default FeedbackForm;
