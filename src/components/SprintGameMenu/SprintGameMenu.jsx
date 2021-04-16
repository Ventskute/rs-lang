import React from "react";
import "./SprintGameMenu.scss";
import SprintGame from "./SprintGame/SprintGame";
import SprintGameStatistics from "./SprintGameStatistics/SprintGameStatistics";
import video from "../../assets/images/background-video6.mp4";
import { useParams } from "react-router";
import Difficulty from "../Difficulty/Difficulty";
import { useFullScreen } from "../../utils/games/useFullScreen";
import GameStats from "../GameStats/GameStats";

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
  const [finalWinStreak, setFinalWinStreak] = React.useState(0);

  const refToGameRoot = useFullScreen();

  const { settingsMenu, levelSettings, pageSettings, isTimeOver } = sprintState;

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
  const restartGameHandler = () => {
    setSprintState({ ...sprintState, isTimeOver: false, settingsMenu: true });
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
            <SprintGame
              sprintState={sprintState}
              setSprintState={setSprintState}
              finalWinStreak={finalWinStreak}
              setFinalWinStreak={setFinalWinStreak}
            />
          )}
          {isTimeOver && (
            <>
              <GameStats
                wrongAnswers={sprintState.falsyAnswers}
                rightAnswers={sprintState.truelyAnswers}
                rightAnswersStreak={finalWinStreak}
              />
              <div className="spring-game-statistics__buttons">
                <button
                  className="spring-game-statistics__buttons_restart-game button"
                  onClick={restartGameHandler}
                >
                  Новая игра
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SprintGameMenu;
