import React from "react";
import "./Difficulty.scss";

const Difficulty = ({ setDifficulty }) => {
  const difficulties = ["very easy", "easy", "easier medium", "harder medium", "hard", "very hard"];
  const handleClick = (diffId) => {
    setDifficulty(diffId);
  };
  return (
    <div className="difficulty">
      <h2 className="difficulty--title">Select Difficulty</h2>
      {difficulties.map((difficulty, i) => (
        <button className="difficulty_btn" onClick={() => handleClick(i)} key={i}>
          {difficulty}
        </button>
      ))}
    </div>
  );
};

export default Difficulty;
