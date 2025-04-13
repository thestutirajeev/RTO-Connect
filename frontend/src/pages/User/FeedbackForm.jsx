import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../components/Alerts/AlertManager.jsx';
import feedbackGif from '../../assets/images/feedback.gif';
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
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Feedback GIF Section */}
          <div className="hidden lg:block rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={feedbackGif} alt="Feedback" className="w-full rounded-l-lg" />
            </figure>
          </div>
  
          {/* Feedback Form Section */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              We value your <span className="text-primaryColor">Feedback</span>
            </h3>
            <form onSubmit={handleSubmitReview}>
              {/* Rating Section */}
              <div className="mb-5">
                <h3 className="text-headingColor text-[18px] leading-6 font-semibold mb-3">
                  How would you rate your RTO Connect experience?*
                </h3>
                <div className="flex gap-2">
                  {[...Array(5).keys()].map((_, index) => {
                    index += 1;
                    return (
                      <button
                        key={index}
                        type="button"
                        className={`transition-colors duration-200 text-[26px] ${
                          index <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
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
              <div className="mb-5">
                <textarea
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  rows="5"
                  placeholder="Tell us how RTO Connect helped you..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
              </div>
  
              {/* Submit Button */}
              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;
