import React from 'react';
import './SprintGameStatistics.scss';
import { useSelector } from 'react-redux';

function SprintGameStatistics({ setSprintState, sprintState }) {
  const { sprintTruelyAnswers, sprintFalsyAnswers, sprintPoints } = useSelector(
    (state) => state.sprintGameStats,
  );

  const restartGameHandler = () => {
    setSprintState({ ...sprintState, isTimeOver: false, settingsMenu: true });
  };

  return (
    <div className="sprint-game-statistics">
      <h2 className="sprint-game-statistics__title">Статистика</h2>
      <h2>{`Total poinst: ${sprintPoints}`}</h2>
      <div className="sprint-game-statistics__log">
        <div className="truely-answers-log answers-log">
          <h3 className="truely-answers-log__title">Правильные ответы:</h3>
          <div className="answers-log__content">
            {sprintTruelyAnswers.map((el, i) => (
              <div key={i}>
                <span>{`${el.word} `}</span>
                <span>{`${el.transcription} `}</span>
                <span>{`${el.wordTranslate}`}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="falsy-answers-log answers-log">
          <h3 className="falsy-answers-log__title">Неправильные ответы:</h3>
          <div className="answers-log__content">
            {sprintFalsyAnswers.map((el, i) => (
              <div key={i}>
                <span>{`${el.word} `}</span>
                <span>{`${el.transcription} `}</span>
                <span>{`${el.wordTranslate}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="spring-game-statistics__buttons">
        <button
          className="spring-game-statistics__buttons_restart-game button"
          onClick={restartGameHandler}>
          Новая игра
        </button>
        <button
          className="spring-game-statistics__buttons_get-back button"
          onClick={() => alert('прикрутить выход из игры')}>
          Выход
        </button>
      </div>
    </div>
  );
}

export default SprintGameStatistics;
