import React from 'react';
import './SprintGameStatistics.scss';
import { useSelector } from 'react-redux';

function SprintGameStatistics({ setSprintState, sprintState }) {
  const { sprintTruelyAnswers, sprintFalsyAnswers, sprintPoints } = useSelector((state) => state);

  const restartGameHandler = () => {
    setSprintState({ ...sprintState, isTimeOver: false, settingsMenu: true });
  };

  return (
    <div className="sprint-game-statistics">
      <h2>Statistics</h2>
      <h2>{`Total poinst: ${sprintPoints}`}</h2>
      <div className="sprint-game-statistics__log">
        <div>
          <h3>Truely answers:</h3>
          {sprintTruelyAnswers.map((el, i) => (
            <div key={i}>
              <span>{`${el.word} `}</span>
              <span>{`${el.transcription} `}</span>
              <span>{`${el.wordTranslate}`}</span>
            </div>
          ))}
        </div>
        <div>
          <h3>Falsy answers:</h3>
          {sprintFalsyAnswers.map((el, i) => (
            <div key={i}>
              <span>{`${el.word} `}</span>
              <span>{`${el.transcription} `}</span>
              <span>{`${el.wordTranslate}`}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="spring-game-statistics__buttons">
        <button
          className="spring-game-statistics__buttons_restart-game"
          onClick={restartGameHandler}>
          Restart Game
        </button>
        <button
          className="spring-game-statistics__buttons_get-back"
          onClick={() => console.log('прикрутить выход из игры')}>
          Exit
        </button>
      </div>
    </div>
  );
}

export default SprintGameStatistics;
