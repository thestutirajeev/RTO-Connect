import React, { useEffect, useState } from "react";
import Question from "../../components/DLTest/Question";
import Result from "../../components/DLTest/Result";
import { useNavigate } from "react-router-dom";
import heroBg from '../../assets/images/hero-bg.png';

const DLTest = () => {
  // Check if user is logged in
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to take the test.");
      navigate("/login");
    }
  }, []);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); // ⏳ 15-second timer

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNext(); // Auto move to next question if time runs out
    }
  }, [timeLeft]);

  const handleNext = () => {
    if (selectedOption === questions[currentIndex].answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(15); // Reset timer
    } else {
      setFinished(true);
    }
  };

  return (
    <div
  className="quiz-container flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
  style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
  <div className="bg-white shadow-xl p-8 rounded-2xl w-96 max-w-full text-center">
    {finished ? (
      <Result score={score} total={questions.length} />
    ) : questions.length > 0 ? (
      <Question
        data={questions[currentIndex]}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        onNext={handleNext}
        timeLeft={timeLeft} // ⏳ Pass timer to Question component
      />
    ) : (
      <p className="text-gray-700 font-medium">Loading questions...</p>
    )}
  </div>
</div>
  );
};

export default DLTest;