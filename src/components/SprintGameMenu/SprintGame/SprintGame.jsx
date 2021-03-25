import React from 'react';
import './SprintGame.scss';
import SprintTimer from '../SprintTimer/SprintTimer';

function SprintGame({ levelSettings, pageSettings }) {
  const [isRandomTranslation, setIsRandomTranslation] = React.useState(0);
  const [sprintGameState, setSprintGameState] = React.useState({
    words: null,
    pointsPerWord: 10,
    currPoints: 0,
    randomTranslationWordIndex: 0,
    currentWordIndex: 0,
  });

  const { words, randomTranslationWordIndex, currentWordIndex } = sprintGameState;

  React.useEffect(() => {
    const getWords = fetch(`http://localhost:3000/words?page=3&group=0`)
      .then((res) => res.json())
      .then((words) => setSprintGameState({ ...sprintGameState, words: words }));
  }, []);
  React.useEffect(() => {
    console.log(sprintGameState.currentWordIndex, '1st');
    console.log(isRandomTranslation);
    console.log(randomTranslationWordIndex);
  },[sprintGameState])

  const getRandom = () => {
    const randomTranslation = Math.floor(Math.random() * Math.floor(2));
    setIsRandomTranslation(randomTranslation);
    // return randomTranslation;
  };

  const getRandomTranslationWordIndex = () => {
    const randomTranslationIndex = Math.floor(Math.random() * Math.floor(20));
    return randomTranslationIndex;
    // setSprintGameState({ ...sprintGameState, randomTranslationWordIndex: randomTranslationIndex });
  };

  const getTruelyTranslationIndex = () => {
    const truelyTranslationIndex = currentWordIndex < 19 ? currentWordIndex + 1 : 0;
    return truelyTranslationIndex;
    // setSprintGameState({ ...sprintGameState, randomTranslationWordIndex: truelyTranslationIndex });
  };

  const getCurrentWord = (isWordTranslate, index) => {
    const currentWord = words[index][isWordTranslate];
    return currentWord;
  };

  const onClickTrue = (boolean) => {
    // const isRandomTranslation = getRandom();
    // const { name } = e.target;
    let plusPoints = 0;
    if (isRandomTranslation) {
      if (boolean) {
        plusPoints = 0;
      } else {
        plusPoints = 10;
      }
    } else {
      if (boolean) {
        plusPoints = 10;
      } else {
        plusPoints = 0;
      }
    }
    getRandom();
    const randomTranslationIndex = isRandomTranslation
      ? getRandomTranslationWordIndex()
      : getTruelyTranslationIndex();

    setSprintGameState({
      ...sprintGameState,
      currentWordIndex: currentWordIndex < 19 ? currentWordIndex + 1 : 0,
      randomTranslationWordIndex: randomTranslationIndex,
      currPoints: sprintGameState.currPoints + plusPoints,
    });

    
  };

  return (
    <div className="sprint-game">
      <SprintTimer />
      <h2>{`Points per word: ${sprintGameState.pointsPerWord}`}</h2>
      <div>{sprintGameState.currPoints}</div>
      <div className="sprint-game__strick-block strick-block">
        <div className="strick-block__strick-point"></div>
        <div className="strick-block__strick-point"></div>
        <div className="strick-block__strick-point"></div>
      </div>
      <div className="sprint-game__words-block words-block">
        <div className="words-block__eng-word">
          {words && getCurrentWord('word', currentWordIndex)}
        </div>
        <div className="words-block__rus-word">
          {words && getCurrentWord('wordTranslate', randomTranslationWordIndex)}
        </div>
      </div>
      <div className="sprint-game__button-block button-block"></div>
      <button className="button-block__true" name={'true'} onClick={() => onClickTrue(true)}>
        true
      </button>
      <button className="button-block__false" name={'false'} onClick={() => onClickTrue(false)}>
        false
      </button>
    </div>
  );
}

export default SprintGame;
