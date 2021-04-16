import React from "react";
import Header from "../Header/Header";
import AnswerOption from "./AnswerOption/AnswerOption";
import Card from "../Card/Card";

import "./AudioChallenge.scss";
import { Button } from 'react-bootstrap';
import FullScreenButton from "../FullScreenButton/FullScreenButton";

const AudioChallenge = ({ handleAns, gameState, goNextWord, play }) => {
  const idkBtn = (
    <Button
      variant="primary"
      onClick={() => handleAns("answer, that can't be right)))) nice crutch")}
    >
      Не знаю
    </Button>
  );
  const nextBtn = (
    <Button variant="primary" onClick={() => goNextWord()}>
      Дальше
    </Button>
  );
  const speakerBtn = (className) => (
    <Button variant="primary" onClick={() => play()}>
      <img
        className={className}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Speaker_Icon_gray.svg/1200px-Speaker_Icon_gray.svg.png"
        alt="repeat audio"
      />
    </Button>
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
      <div className="game game-audio">
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
      <FullScreenButton />
    </>
  );
};

export default AudioChallenge;
