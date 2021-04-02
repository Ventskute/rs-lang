import React, { useState } from "react";
import Header from "../Header/Header";
import { BASE_URL } from "../../utils/api/api";
import AnswerOption from "./AnswerOption/AnswerOption";

import "./AudioChallenge.scss";

const AudioChallenge = ({ handleAns, gameState, goNextWord, play }) => {
  const idkBtn = (
    <button
      className="game-btn"
      onClick={() => handleAns("answer, that can't be right)))) nice crutch")}
    >
      не знаю
    </button>
  );
  const nextBtn = (
    <button className="game-btn" onClick={() => goNextWord()}>
      -{">"}
    </button>
  );
  const speakerBtn = (className) => (
    <button className={className} onClick={() => play()}>
      <img
        className={className}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Speaker_Icon_gray.svg/1200px-Speaker_Icon_gray.svg.png"
        alt="repeat audio"
      />
    </button>
  );
  const rightAnswer = (
    <div className="right-answer">
      <div className="right-answer__word">
        {speakerBtn("speaker-btn--mini")}
        <h3>{gameState.word.word}</h3>
      </div>
      <img className="right-answer__img" src={BASE_URL + gameState.word.image} alt="pic" />
    </div>
  );
  return (
    <>
      <Header />
      <button className="close-btn">x</button>
      {/* <button className="mute-btn">mute</button> */}
      <div className="game">
        {gameState.userAnswer ? rightAnswer : speakerBtn("speaker-btn")}
        <div className="answers">
          {gameState.ansOptions.map((ans, i) => (
            <AnswerOption
              word={ans}
              key={i}
              userAnswer={gameState.userAnswer}
              i={i}
              handleAns={handleAns}
              answer={gameState.word.wordTranslate}
            />
          ))}
        </div>
        {gameState.userAnswer ? nextBtn : idkBtn}
      </div>
    </>
  );
};

export default AudioChallenge;
