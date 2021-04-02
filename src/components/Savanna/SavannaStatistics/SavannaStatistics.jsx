import React from "react";
import Savanna from "../Savanna";

import "./SavannaStatistics.scss";
const SavannaStatisticsTitles = {
  POINT: "Количество очков",
  RIGHT: "Правильные ответы",
  WRONG: "Неправильные ответы",
  NEWGame: "Новая игра",
};

export default function SavannaStatistics(props) {
  return (
    <div className="game-over">
      <div className="point">
        <p>
          {SavannaStatisticsTitles.POINT}: {props.rightAnswers.length}
        </p>
        <button
          className="new btn btn-info"
          onClick={() => {
            document.location.reload();
          }}
        >
          {SavannaStatisticsTitles.NEWGame}
        </button>
      </div>
      <div className="answers">
        <ul>
          <li>{SavannaStatisticsTitles.RIGHT}</li>
          {props.rightAnswers.map((word, index) => {
            return <li key={index + word.word}>{word.word}</li>;
          })}
        </ul>
        <ul>
          <li>{SavannaStatisticsTitles.WRONG}</li>
          {props.wrongAnswers.map((word, index) => {
            return <li key={index + word.word}>{word.word}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
