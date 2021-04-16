import React from "react";
import "./GameStats.scss";

const GameStats = ({ rightAnswers, wrongAnswers, rightAnswersStreak }) => {
  return (
    <div className="game-stats">
      <div className="game-stats_words">
        <div className="game-stats_words-column">
          <p>Правильные ответы:</p>
          <ul>
            {rightAnswers.map((answer, i) => (
              <li key={i}>{answer.word}</li>
            ))}
          </ul>
        </div>
        <div className="game-stats_words-column">
          <p>Неправильные ответы:</p>
          {wrongAnswers.map((answer, i) => (
            <div key={i}>{answer.word}</div>
          ))}
        </div>
      </div>
      <div className="game-stats_streak">
        <p>Наибольшая серия правильных ответов: <span>{rightAnswersStreak}</span></p>
      </div>
    </div>
  );
};

export default GameStats;
