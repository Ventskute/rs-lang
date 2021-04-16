import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Savanna.scss";

import SavannaStatistics from "./SavannaStatistics/SavannaStatistics";
import Drop from "./Drop/Drop";
import LivesCounter from "./LivesCounter/LivesCounter";
import { getRand } from "../../utils/games/getRand";
import { shuffle } from "../../utils/games/arrShuffle";
import {
  getWords,
  submitGameResult,
  submitRightAnswer,
  submitWrongAnswer,
} from "../../utils/api/api";
import Difficulty from "../Difficulty/Difficulty";
import { useFullScreen } from "../../utils/games/useFullScreen";
import GameStats from "../GameStats/GameStats";
import FullScreenButton from "../FullScreenButton/FullScreenButton";

let interval;
let randomWords = [];
let crutch = false;

export default function Savanna() {
  const { user } = useSelector((state) => state);
  const [words, setWords] = useState([]);
  const [randomAnswers, setRandomAnswers] = useState([]);
  const [word, setWord] = useState();
  const [livesCount, setLivesCount] = useState(5);
  let { group, page } = useParams();
  const [difficultyLevel, setDifficultyLevel] = useState(group);
  const [wordPosition, setWordPosition] = useState(0);
  const [dropSize, setDropSize] = useState(100);
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [winStreak, setWinStreak] = useState(0);
  const [finalWinStreak, setFinalWinStreak] = useState(0);
  const refToGameRoot = useFullScreen();

  function isGameOver() {
    return randomWords.length == 0 && rightAnswers.length + wrongAnswers.length == words.length;
  }

  function nextWord(words) {
    clearInterval(interval);
    if (!isGameOver() || (isGameOver() && isExactPage())) {
      setWordPosition(0);
      let word;
      if (randomWords.length == 0 && rightAnswers.length == 0 && wrongAnswers.length == 0) {
        randomWords = shuffle(words);
      }

      word = randomWords.pop();
      setWord(word);

      setRandomAnswers(getRandomAnswers(word.wordTranslate, words));
      interval = setInterval(() => {
        setWordPosition((wordPosition) => {
          if (wordPosition < 70) {
            return wordPosition + 0.05;
          }

          setLivesCount((livesCount) => {
            wrongAnswers.push(word);
            setWrongAnswers(wrongAnswers);
            if (livesCount - 1 > 0) {
              nextWord(words);
              return livesCount - 1;
            }
            return 0;
          });
          clearInterval(interval);
        });
      }, 1);
    } else {
      setLivesCount(0);
    }
  }

  const handleUserKeyPress = useCallback(({ key }) => {
    if (key > 0 && key <= 4) {
      var wordElement = document.querySelectorAll(`[data-key='${key}']`)[0];
      if (wordElement) {
        wordElement.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          })
        );
      }
    }
  }, []);

  const isWords = () => Boolean(words[0]);
  useEffect(() => {
    difficultyLevel &&
      getWords(difficultyLevel, page || getRand()).then((words) => {
        setWords(words);
        if (isWords()) {
          nextWord(words);
        }
      });

    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [difficultyLevel, page]);

  function isExactPage() {
    return group && page;
  }

  useEffect(() => {
    if (isWords()) {
      nextWord(words);
    }
  }, [words]);

  const setDifficulty = (diff) => {
    setDifficultyLevel(diff + 1);
  };

  const handleClick = (answer, word) => {
    if (answer === word.wordTranslate) {
      user && submitRightAnswer(user.userId, word.id);
      rightAnswers.push(word);
      setRightAnswers(rightAnswers);
      setWinStreak((winStreak) => winStreak + 1);
      setDropSize(dropSize + 10);
      nextWord(words);
      return;
    }
    user && submitWrongAnswer(user.userId, word.id);
    wrongAnswers.push(word);
    setWrongAnswers(wrongAnswers);
    setFinalWinStreak((finalWinStreak) => {
      const streak = winStreak > finalWinStreak ? winStreak : finalWinStreak;
      setWinStreak(0);
      return streak;
    });
    setLivesCount(livesCount - 1);
    nextWord(words);
  };

  let gameField = "";
  let livesCounter = <LivesCounter livesCount={livesCount} />;
  if (isGameOver() || livesCount == 0) {
    if (user && finalWinStreak > 0) {
      clearInterval(interval);
      !crutch &&
        submitGameResult(
          user.userId,
          "savanna",
          finalWinStreak,
          rightAnswers.length,
          wrongAnswers.length
        );
      crutch = true;
    }
    gameField = (
      <GameStats
        rightAnswers={rightAnswers}
        wrongAnswers={wrongAnswers}
        rightAnswersStreak={finalWinStreak}
      />
    );
    livesCounter = "";
  } else if (word) {
    gameField = (
      <>
        <div className="word" style={{ top: wordPosition + "%" }}>
          <p>{word.word}</p>
        </div>
        <ul className="words-list">
          {randomAnswers.map((answer, i) => {
            return (
              <li onClick={() => handleClick(answer, word)} key={i} data-key={i + 1}>
                <button>
                  {i + 1}. {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  return (
    <div className="savanna game" ref={refToGameRoot}>
      {!difficultyLevel && <Difficulty setDifficulty={setDifficulty} />}
      {difficultyLevel && livesCounter}
      {difficultyLevel && gameField}
      {difficultyLevel && <Drop dropSize={dropSize} />}
      <FullScreenButton />
    </div>
  );
}

function getRandomAnswers(answer, words) {
  let answers = [answer];
  do {
    const rand = Math.floor(Math.random() * words.length);
    let t = answers.filter((v) => {
      return v === words[rand].wordTranslate;
    });
    if (t.length == 0) {
      answers.push(words[rand].wordTranslate);
    }
  } while (answers.length < 4);

  return shuffle(answers);
}
