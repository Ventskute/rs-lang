import React from 'react';
import './SprintGame.scss';
import SprintTimer from '../SprintTimer/SprintTimer';

function SprintGame() {
  const [sprintGameState, setSprintGameState] = React.useState({
    pointsPerWord: 10,
    currPoints: 0,
  });

  fetch(`https://<your-app-name>.herokuapp.com/words?page=2&group=0`)
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
        <div className="words-block__eng-word"></div>
        <div className="words-block__rus-word"></div>
      </div>
      <div className="sprint-game__button-block button-block"></div>
      <button className="button-block__true">true</button>
      <button className="button-block__false">false</button>
    </div>
  );
}

export default SprintGame;
