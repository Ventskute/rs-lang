import React from "react";
import Header from "../Header/Header";
import AnswerOption from "./AnswerOption/AnswerOption";
import Card from "../Card/Card";

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
  const {
    word,
    image,
    textExample,
    transcription,
    wordTranslate,
    textMeaning,
    textMeaningTranslate,
    textExampleTranslate,
    audio,
    audioExample,
    audioMeaning,
  } = gameState.word;
  const rightAnswer = (
    <Card
      word={word}
      image={image}
      textExample={textExample}
      transcription={transcription}
      wordTranslate={wordTranslate}
      textMeaning={textMeaning}
      textMeaningTranslate={textMeaningTranslate}
      textExampleTranslate={textExampleTranslate}
      audio={audio}
      audioExample={audioExample}
      audioMeaning={audioMeaning}
    />
  );

  return (
    <>
      <Header />
      <button className="close-btn">x</button>
      <div className="game">
        {!gameState.userAnswer && speakerBtn("speaker-btn")}
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
        {gameState.userAnswer && rightAnswer}
      </div>
    </>
  );
};

export default AudioChallenge;
