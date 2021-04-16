import React from "react";

const GameStats = ({ rightAnswers, wrongAnswers, rightAnswersStreak }) => {
  return (
    <div className="game-stats">
      <div className="game-stats_words">
        <div className="game-stats_words-column">
          <p>right answers</p>
          {rightAnswers.map((answer, i) => (
            <div key={i}>{answer.word}</div>
          ))}
        </div>
        <div className="game-stats_words-column">
          <p>wrong answers</p>
          {wrongAnswers.map((answer, i) => (
            <div key={i}>{answer.word}</div>
          ))}
        </div>
      </div>
      <div className="game-stats_streak">
        <p>right answers streak</p>
        {rightAnswersStreak}
      </div>
    </div>
  );
};

export default GameStats;
