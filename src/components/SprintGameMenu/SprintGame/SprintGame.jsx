import React from 'react';
import classNames from 'classnames';
import './SprintGame.scss';
import SprintTimer from '../SprintTimer/SprintTimer';
import {
  pointsLogic,
  getRandomTranslationWordIndex,
  getTruelyTranslationIndex,
  getCurrentWord,
} from './gameLogic';

function SprintGame({ levelSettings, pageSettings }) {
  const [isRandomTranslation, setIsRandomTranslation] = React.useState(0);
  const [sprintGameState, setSprintGameState] = React.useState({
    isTimeOver: false,
    words: null,
    pointsPerWord: 10,
    currPoints: 0,
    randomTranslationWordIndex: 0,
    currentWordIndex: 0,
    pointsStrick: 0,
    truelyAnswers: [],
    falsyAnswers: [],
  });
  const {
    isTimeOver,
    words,
    randomTranslationWordIndex,
    currentWordIndex,
    pointsStrick,
    truelyAnswers,
    falsyAnswers,
  } = sprintGameState;

  const buttonsArr = [true, false];

  const strickClass = classNames({
    'strick-block__strick-point': true,
    x2Strick: pointsStrick >= 3,
    x3Strick: pointsStrick >= 6,
    x4Strick: pointsStrick >= 9,
    x5Strick: pointsStrick >= 12,
  });

  React.useEffect(() => {
    const getWords = fetch(`http://localhost:3000/words?page=3&group=0`)
      .then((res) => res.json())
      .then((words) => setSprintGameState({ ...sprintGameState, words: words }));
  }, []);

  //________Не забыть удалить по готовности_____________
  React.useEffect(() => {
    console.log(sprintGameState.currentWordIndex, 'word eng');
    console.log(randomTranslationWordIndex, 'word rus');
    console.log(pointsStrick, 'strick');
    console.log(truelyAnswers, 'truely answers');
    console.log(falsyAnswers, 'falsy answers');
    console.log(isTimeOver, 'isTimeOver');
  }, [sprintGameState]);
  //______________________________________________________

  const getRandom = () => {
    const randomTranslation = Math.floor(Math.random() * Math.floor(2));
    setIsRandomTranslation(randomTranslation);
  };

  const onClickAnswer = (boolean) => {
    const points = pointsLogic(randomTranslationWordIndex, currentWordIndex, boolean, pointsStrick);
    getRandom();
    const randomTranslationIndex = isRandomTranslation
      ? getRandomTranslationWordIndex()
      : getTruelyTranslationIndex(currentWordIndex);

    setSprintGameState({
      ...sprintGameState,
      currentWordIndex: currentWordIndex < 19 ? currentWordIndex + 1 : 0,
      randomTranslationWordIndex: randomTranslationIndex,
      pointsStrick: points[1],
      currPoints: sprintGameState.currPoints + (points[0] * sprintGameState.pointsPerWord) / 10,
      pointsPerWord:
        points[1] < 3 ? 10 : points[1] < 6 ? 20 : points[1] < 9 ? 30 : points[1] < 12 ? 40 : 50,
      truelyAnswers: points[0] ? [...truelyAnswers, words[currentWordIndex]] : truelyAnswers,
      falsyAnswers: !points[0] ? [...falsyAnswers, words[currentWordIndex]] : falsyAnswers,
    });
  };

  return (
    <div className="sprint-game">
      <SprintTimer sprintGameState={sprintGameState} setSprintGameState={setSprintGameState} />
      <h2>{`Points per word: ${sprintGameState.pointsPerWord}`}</h2>
      <h2>{`Current points: ${sprintGameState.currPoints}`}</h2>
      <div className="sprint-game__strick-block strick-block">
        {Array(pointsStrick <= 12 ? pointsStrick : 12)
          .fill(null)
          .map((el, i) => (
            <div className={strickClass} key={i}></div>
          ))}
      </div>
      <div className="sprint-game__words-block words-block">
        <div className="words-block__eng-word">
          {words && getCurrentWord(words, 'word', currentWordIndex)}
        </div>
        <div className="words-block__rus-word">
          {words && getCurrentWord(words, 'wordTranslate', randomTranslationWordIndex)}
        </div>
      </div>
      <div className="sprint-game__button-block button-block">
        {buttonsArr.map((el, i) => (
          <button
            className={`button-block__${el}`}
            name={`${el}`}
            key={i}
            onClick={() => onClickAnswer(el)}>
            {`${el}`}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SprintGame;
