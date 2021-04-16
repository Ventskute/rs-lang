import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./SprintGame.scss";
import SprintTimer from "../SprintTimer/SprintTimer";
import { useDispatch, useSelector } from "react-redux";
import audioCorrect from "../../../assets/audio/correctAnswer.mp3";
import audioWrong from "../../../assets/audio/WrongAnswer.mp3";
import {
  pointsLogic,
  getRandomTranslationWordIndex,
  getTruelyTranslationIndex,
} from "../../../utils/games/sprint";
import { getWords } from "../../../utils/api";
import { submitGameResult, submitRightAnswer, submitWrongAnswer } from "../../../utils/api/api";
import FullScreenButton from "../../FullScreenButton/FullScreenButton";

function SprintGame({
  dictionaryWords = [],
  setSprintState,
  sprintState,
  finalWinStreak,
  setFinalWinStreak,
}) {
  const [answerAnimation, setAnswerAnimation] = React.useState(null);
  const [isRandomTranslation, setIsRandomTranslation] = React.useState(0);
  const [sprintGameState, setSprintGameState] = React.useState({
    words: dictionaryWords.length ? dictionaryWords : null,
    pointsPerWord: 10,
    randomTranslationWordIndex: 0,
    currentWordIndex: 0,
    pointsStrick: 0,
    maxPointsStrick: 0,
  });
  const [winStreak, setWinStreak] = useState(0);
  const { user } = useSelector((state) => state);
  const audiosArr = [new Audio(audioCorrect), new Audio(audioWrong)];
  const dispatch = useDispatch();
  const {
    words,
    randomTranslationWordIndex,
    currentWordIndex,
    pointsStrick,
    maxPointsStrick,
  } = sprintGameState;
  const { truelyAnswers, falsyAnswers, levelSettings, pageSettings, currPoints } = sprintState;
  const buttonsArr = [true, false];

  const strickClass = classNames({
    "strick-block__strick-point": true,
    x2Strick: pointsStrick >= 3,
    x3Strick: pointsStrick >= 6,
    x4Strick: pointsStrick >= 9,
    x5Strick: pointsStrick >= 12,
  });

  React.useEffect(() => {
    (words && words.length - 1 <= currentWordIndex) ||
      (!dictionaryWords.length &&
        getWords(levelSettings - 1, pageSettings - 1).then((words) =>
          setSprintGameState({ ...sprintGameState, words: words })
        ));
  }, [pageSettings]);

  React.useEffect(() => {
    if (answerAnimation) {
      audiosArr[0].play();
    } else if (answerAnimation === false) {
      audiosArr[1].play();
    }
    if (answerAnimation || answerAnimation == false) {
      setTimeout(() => {
        setAnswerAnimation(null);
      }, 500);
    }
  }, [answerAnimation]);

  React.useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

  const handleUserKeyPress = React.useCallback(({ key }) => {
    if (key > 0 && key <= 2) {
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

  const setAnswersStore = () => {
    dispatch({
      type: "SET_SPRINT_ANSWERS",
      payload: {
        falsy: falsyAnswers,
        truely: truelyAnswers,
        points: currPoints,
        maxPointsStrick: maxPointsStrick,
      },
    });
  };

  const getRandom = () => {
    const randomTranslation = Math.floor(Math.random() * Math.floor(2));
    setIsRandomTranslation(randomTranslation);
  };

  const onClickAnswer = (boolean) => {
    const points = pointsLogic(randomTranslationWordIndex, currentWordIndex, boolean, pointsStrick);

    getRandom();

    const randomTranslationIndex = isRandomTranslation
      ? getRandomTranslationWordIndex(words.length - 1)
      : getTruelyTranslationIndex(currentWordIndex);

    setSprintGameState({
      ...sprintGameState,
      currentWordIndex: currentWordIndex < 19 ? currentWordIndex + 1 : 0,
      randomTranslationWordIndex: randomTranslationIndex,
      pointsStrick: points[1],
      maxPointsStrick: points[1] > maxPointsStrick ? points[1] : maxPointsStrick,
      pointsPerWord:
        points[1] < 3 ? 10 : points[1] < 6 ? 20 : points[1] < 9 ? 30 : points[1] < 12 ? 40 : 50,
    });

    // if (user) {
    if (points[0]) {
      setWinStreak((streak) => {
        const currStreak = streak + 1;
        setFinalWinStreak((finalStreak) => {
          const streak = currStreak > finalStreak ? winStreak : finalStreak;
          return streak;
        });
        return currStreak;
      });
      user && submitRightAnswer(user.userId, words[currentWordIndex].id);
    }
    if (!points[0]) {
      setFinalWinStreak((finalStreak) => {
        const streak = winStreak > finalStreak ? winStreak : finalStreak;
        setWinStreak(0);
        return streak;
      });
      user && submitWrongAnswer(user.userId, words[currentWordIndex].id);
    }
    // }

    setSprintState({
      ...sprintState,
      currPoints: sprintState.currPoints + (points[0] * sprintGameState.pointsPerWord) / 10,
      truelyAnswers: points[0] ? [...truelyAnswers, words[currentWordIndex]] : truelyAnswers,
      falsyAnswers: !points[0] ? [...falsyAnswers, words[currentWordIndex]] : falsyAnswers,
      levelSettings:
        pageSettings == 30 && currentWordIndex === words.length - 1 && levelSettings < 6
          ? levelSettings + 1
          : pageSettings == 30 && currentWordIndex === words.length - 1 && levelSettings === 6
          ? 1
          : levelSettings,
      pageSettings:
        currentWordIndex >= words.length - 2 && pageSettings < 30
          ? pageSettings + 1
          : currentWordIndex >= words.length - 2 && pageSettings == 30
          ? 1
          : pageSettings,
    });
    setAnswerAnimation(points[0] == 10 ? true : false);
  };

  useEffect(() => {
    setAnswersStore();
    if (sprintState.isTimeOver) {
      user &&
        submitGameResult(
          user.userId,
          "sprint",
          finalWinStreak,
          sprintState.truelyAnswers.length,
          sprintState.falsyAnswers.length
        );
      setSprintState((state) => {
        return { ...state, startGameTotal: false };
      });
    }
  }, [sprintState]);

  return (
    <div className="sprint-game">
      {answerAnimation === null ? (
        ""
      ) : (
        <div className="result">
          {" "}
          <div className="result-response" style={{ color: answerAnimation ? "green" : "red" }}>
            {answerAnimation ? "True" : "False"}
          </div>
        </div>
      )}
      <SprintTimer
        setSprintState={setSprintState}
        sprintState={sprintState}
        sprintGameState={sprintGameState}
      />
      <h2>{`Current points: ${sprintState.currPoints}`}</h2>
      <h2>{`Points per word: ${sprintGameState.pointsPerWord}`}</h2>
      <div className="sprint-game__strick-block strick-block">
        {Array(pointsStrick <= 12 ? pointsStrick : 12)
          .fill(null)
          .map((el, i) => (
            <div className={strickClass} key={i}></div>
          ))}
      </div>
      <div className="sprint-game__words-block words-block">
        <div className="words-block__eng-word">{words && words[currentWordIndex].word}</div>
        <h2>?</h2>
        <div className="words-block__rus-word">
          {words && words[randomTranslationWordIndex].wordTranslate}
        </div>
      </div>
      <div className="sprint-game__button-block button-block">
        {buttonsArr.map((el, i) => (
          <button
            className={`button-block__${el} button`}
            name={`${el}`}
            key={i}
            onClick={() => onClickAnswer(el)}
            data-key={i + 1}
          >
            {`${i + 1}. ${el}`}
          </button>
        ))}
      </div>
      <FullScreenButton />
    </div>
  );
}

export default SprintGame;
