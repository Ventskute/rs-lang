import React from "react";
import "./SprintGameMenu.scss";
import SprintGame from "./SprintGame/SprintGame";
import SprintGameStatistics from "./SprintGameStatistics/SprintGameStatistics";
import video from "../../assets/images/background-video6.mp4";
import { useParams } from "react-router";
import Difficulty from "../Difficulty/Difficulty";
import { useFullScreen } from "../../utils/games/useFullScreen";

function SprintGameMenu() {
  const { group, page } = useParams();
  const [sprintState, setSprintState] = React.useState({
    isTimeOver: false,
    settingsMenu: true,
    startGameTotal: false,
    startGameLearned: false,
    levelSettings: +group + 1 || null,
    pageSettings: +page + 1 || 1,
    difficultyMenu: false,
    currPoints: 0,
    truelyAnswers: [],
    falsyAnswers: [],
  });

  const refToGameRoot = useFullScreen();

  const { settingsMenu, levelSettings, pageSettings, isTimeOver } = sprintState;

  const changeSettingsHandler = (e) => {
    const { name, value } = e.target;

    setSprintState({ ...sprintState, [name]: Number(value) });
  };

  const setDifficulty = (diff) =>
    setSprintState((state) => ({
      ...state,
      levelSettings: diff + 1,
      difficultyMenu: false,
      startGameTotal: true,
    }));

  const startGameHandler = () => {
    setSprintState((state) => {
      const difficultyMenu = !Boolean(state.levelSettings);
      const startGameTotal = Boolean(state.levelSettings);
      return { ...state, settingsMenu: false, difficultyMenu, startGameTotal };
    });
  };
  return (
    <>
      <div className="sprint" ref={refToGameRoot}>
        <video className="background-video" loop autoPlay>
          <source src={video} type="video/mp4" />
        </video>
        <div className="game-content">
          {settingsMenu && (
            <div className="sprint-game__menu">
              <h1 className="sprint-game__menu_title">Игра Спринт</h1>
              <p className="sprint-game__menu_subtitle">
                {" "}
                В игре необходимо ответить, верен ли перевод слова на русский язык.
              </p>
              <div className="sprint-game__menu_buttons">
                <button className="button-start-total button" onClick={startGameHandler}>
                  Начать игру
                </button>
              </div>
            </div>
          )}
          {sprintState.difficultyMenu && <Difficulty setDifficulty={setDifficulty} />}
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
