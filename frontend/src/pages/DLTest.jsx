import React, { useEffect, useState } from "react";
import Question from "../components/DLTest/Question";
import Result from "../components/DLTest/Result";

const DLTest = () => {
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
    <div className="quiz-container bg-white shadow-lg p-6 rounded-xl w-96">
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
        <p className="text-center">Loading questions...</p>
      )}
    </div>
  );
};

export default DLTest;