import React, { useEffect, useState } from "react";
import Question from "../../components/DLTest/Question";
import Result from "../../components/DLTest/Result";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/images/hero-bg.png";

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const DLTest = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [started, setStarted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to take the test.");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const random10 = shuffleArray(data).slice(0, 10);
        setQuestions(random10);
      });
  }, []);

  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (!isAnswered) {
      setIsAnswered(true);
      setTimeout(() => handleNext(), 2000);
    }
  }, [timeLeft, started, finished, isAnswered]);

  const handleOptionClick = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentIndex].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(15);
    } else {
      setFinished(true);
    }
  };

  const handleRetake = () => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const random10 = shuffleArray(data).slice(0, 10);
        setQuestions(random10);
        setCurrentIndex(0);
        setSelectedOption(null);
        setScore(0);
        setFinished(false);
        setStarted(false);
        setTimeLeft(15);
        setIsAnswered(false);
      });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white shadow-xl p-8 rounded-2xl w-[90%] sm:w-[500px] text-center">
        {!started ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              Driving License Test
            </h2>
            <p className="text-gray-700 mb-4 text-left">
              Please read the instructions before starting:
              <ul className="list-disc pl-5 mt-2 text-left text-sm">
                <li>Total Questions: 10</li>
                <li>Time per question: 15 seconds</li>
                <li>Cannot go back after answering</li>
              </ul>
            </p>
            <button
              onClick={() => setStarted(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Start Test
            </button>
          </div>
        ) : finished ? (
          <Result score={score} total={questions.length} onRetry={handleRetake} />
        ) : questions.length > 0 ? (
          <div>
            <div className="mb-3 text-sm text-gray-500">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {questions[currentIndex].question}
            </h3>

            <div className="space-y-2">
              {questions[currentIndex].options.map((option, index) => {
                const isCorrect = option === questions[currentIndex].answer;
                const isSelected = option === selectedOption;
                const optionClass = isAnswered
                  ? isCorrect
                    ? "bg-green-100 border-green-500 text-green-700"
                    : isSelected
                    ? "bg-red-100 border-red-500 text-red-700"
                    : "bg-gray-100 border-gray-300"
                  : "bg-white border-gray-300 hover:bg-blue-50";

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={isAnswered}
                    className={`w-full text-left px-4 py-2 border rounded-xl transition ${optionClass}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Time Left:{" "}
              <span className="font-semibold text-red-600">{timeLeft}s</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 font-medium animate-pulse">
            Loading questions...
          </p>
        )}
      </div>
    </div>
  );
};

export default DLTest;
