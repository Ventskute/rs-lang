import React from "react";
import "./Difficulty.scss";

const Difficulty = ({ setDifficulty }) => {
  const difficulties = [
    "очень просто",
    "просто",
    "несложно",
    "сложновато",
    "сложно",
    "очень сложно",
  ];
  const handleClick = (diffId) => {
    setDifficulty(diffId);
  };
  return (
    <div className="difficulty">
      <h2 className="difficulty--title">Выберите сложность</h2>
      {difficulties.map((difficulty, i) => (
        <button className="difficulty_btn" onClick={() => handleClick(i)} key={i}>
          {difficulty}
        </button>
      ))}
    </div>
  );
};

export default Difficulty;
