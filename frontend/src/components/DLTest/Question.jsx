import React from "react";

const Question = ({ data, selectedOption, setSelectedOption, onNext,timeLeft }) => {
  return (
    <div className="question-box text-center">
      <h3 className="text-xl font-semibold mb-4">{data.question}</h3>

      {/* Timer Display */}
      <div className="text-red-500 font-bold text-lg mb-2">⏳ {timeLeft}s left</div>

      <ul className="space-y-2">
        {data.options.map((option, index) => (
          <li
            key={index}
            onClick={() => setSelectedOption(option)}
            className={selectedOption === option ? "selected" : ""}
          >
            {option}
          </li>
        ))}
      </ul>
      <button onClick={onNext} disabled={!selectedOption}
      className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400">
        Next
      </button>
    </div>
  );
};

export default Question;