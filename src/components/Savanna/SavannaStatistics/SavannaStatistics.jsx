import React from "react";
import Savanna from "../Savanna";

import "./SavannaStatistics.scss";
const SavannaStatisticsTitles = {
  POINT: "Points",
  RIGHT: "Right answers",
  WRONG: "Wrong answers",
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
          New Game
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
