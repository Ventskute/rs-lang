import React from 'react';
import './SprintGameMenu.scss';
import { checkInputForm } from '../../utils/games/sprint';
import SprintGame from './SprintGame/SprintGame';
import SprintGameStatistics from './SprintGameStatistics/SprintGameStatistics';
import video from '../../assets/images/background-video6.mp4';

function SprintGameMenu() {
  const [sprintState, setSprintState] = React.useState({
    isTimeOver: false,
    settingsMenu: true,
    startGameTotal: false,
    startGameLearned: false,
    levelSettings: 1,
    pageSettings: 1,
    currPoints: 0,
    truelyAnswers: [],
    falsyAnswers: [],
  });

  const { settingsMenu, levelSettings, pageSettings, isTimeOver } = sprintState;

  const changeSettingsHandler = (e) => {
    const { name, value } = e.target;
    setSprintState({ ...sprintState, [name]: value });
    console.log(sprintState);
  };

  const startGameHandler = () => {
    const { isValid, errors } = checkInputForm(sprintState);
    if (isValid) {
      setSprintState({ ...sprintState, settingsMenu: false, startGameTotal: true });
    } else {
      console.log(errors);
    }
  };
  return (
    <>
      <div id="video-bg-sprint">
        <video id="background-video" loop autoPlay>
          <source src={video} type="video/mp4" />
        </video>
        <div className="game-content">
          {settingsMenu && (
            <div className="sprint-game__menu">
              <h1 className="sprint-game__menu_title">Игра Спринт</h1>
              <p className="sprint-game__menu_subtitle">
                Выберите уровень сложности (1-6) и страницу слов (1-30)
              </p>
              <h3>Правила игры : </h3>
              <p className="sprint-game__menu_subtitle">
                {' '}
                В игре необходимо ответить, верен ли перевод слова на русский язык.
              </p>

              <div className="sprint-game__menu_settings">
                <p className="input__label">Уровень</p>
                <input
                  className="input menu_settings__input"
                  type="text"
                  name="levelSettings"
                  value={levelSettings}
                  onChange={changeSettingsHandler}
                />
                <p className="input__label">Страница</p>
                <input
                  className="input menu_settings__input"
                  type="text"
                  name="pageSettings"
                  value={pageSettings}
                  onChange={changeSettingsHandler}
                />
              </div>
              <div className="sprint-game__menu_buttons">
                <button className="button-start-total button" onClick={startGameHandler}>
                  Общие слова
                </button>
                <button className="button-start-learned button" onClick={startGameHandler}>
                  Изученные слова
                </button>
              </div>
            </div>
          )}
          {sprintState.startGameTotal && (
            <SprintGame sprintState={sprintState} setSprintState={setSprintState} />
          )}
          {isTimeOver && (
            <SprintGameStatistics setSprintState={setSprintState} sprintState={sprintState} />
          )}
        </div>
      </div>
    </>
  );
}

export default SprintGameMenu;
