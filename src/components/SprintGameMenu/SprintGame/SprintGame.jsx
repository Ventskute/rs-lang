import React from 'react';
import classNames from 'classnames';
import './SprintGame.scss';
import SprintTimer from '../SprintTimer/SprintTimer';
import { useDispatch } from 'react-redux';
import {
  pointsLogic,
  getRandomTranslationWordIndex,
  getTruelyTranslationIndex,
  getCurrentWord,
} from '../gameLogic';

function SprintGame({ setSprintState, sprintState }) {
  const [isRandomTranslation, setIsRandomTranslation] = React.useState(0);
  const [sprintGameState, setSprintGameState] = React.useState({
    words: null,
    pointsPerWord: 10,
    randomTranslationWordIndex: 0,
    currentWordIndex: 0,
    pointsStrick: 0,
  });

  const dispatch = useDispatch();
  const { words, randomTranslationWordIndex, currentWordIndex, pointsStrick } = sprintGameState;
  const { truelyAnswers, falsyAnswers, levelSettings, pageSettings, currPoints } = sprintState;
  const buttonsArr = [true, false];

  const strickClass = classNames({
    'strick-block__strick-point': true,
    x2Strick: pointsStrick >= 3,
    x3Strick: pointsStrick >= 6,
    x4Strick: pointsStrick >= 9,
    x5Strick: pointsStrick >= 12,
  });

  React.useEffect(() => {
    fetch(`http://localhost:3000/words?page=${pageSettings - 1}&group=${levelSettings - 1}`)
      .then((res) => res.json())
      .then((words) => setSprintGameState({ ...sprintGameState, words: words }));
  }, []);

  React.useEffect(() => {
    console.log(sprintGameState.currentWordIndex, 'word eng');
    console.log(randomTranslationWordIndex, 'word rus');
    console.log(pointsStrick, 'strick');
    setAnswersStore();
  }, [sprintState]);

  const setAnswersStore = () => {
    dispatch({
      type: 'SET_SPRINT_ANSWERS',
      payload: { falsy: falsyAnswers, truely: truelyAnswers, points: currPoints },
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
      ? getRandomTranslationWordIndex()
      : getTruelyTranslationIndex(currentWordIndex);

    setSprintGameState({
      ...sprintGameState,
      currentWordIndex: currentWordIndex < 19 ? currentWordIndex + 1 : 0,
      randomTranslationWordIndex: randomTranslationIndex,
      pointsStrick: points[1],
      pointsPerWord:
        points[1] < 3 ? 10 : points[1] < 6 ? 20 : points[1] < 9 ? 30 : points[1] < 12 ? 40 : 50,
    });

    setSprintState({
      ...sprintState,
      currPoints: sprintState.currPoints + (points[0] * sprintGameState.pointsPerWord) / 10,
      truelyAnswers: points[0] ? [...truelyAnswers, words[currentWordIndex]] : truelyAnswers,
      falsyAnswers: !points[0] ? [...falsyAnswers, words[currentWordIndex]] : falsyAnswers,
    });
  };

  return (
    <div className="sprint-game">
      <SprintTimer
        setSprintState={setSprintState}
        sprintState={sprintState}
        sprintGameState={sprintGameState}
      />
      <h2>{`Points per word: ${sprintGameState.pointsPerWord}`}</h2>
      <h2>{`Current points: ${sprintState.currPoints}`}</h2>
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
