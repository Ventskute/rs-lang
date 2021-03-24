import React from 'react';
import './SprintGameMenu.scss';

import SprintGame from "./SprintGame/SprintGame";

function SprintGameMenu() {
  const [sprintState, setSprintState] = React.useState({
    settingsMenu: true,
    startGameTotal: false,
    startGameLearned: false,
    levelSettings: 1,
    pageSettings: 1,
  });

  const changeSettingsHandler = (e) => {
    const { name, value } = e.target;
    setSprintState({ ...sprintState, [name]: value });
    console.log(sprintState);
  };

  const startGameHandler = () => {
    setSprintState({ ...sprintState, settingsMenu: false, startGameTotal: true });
  };
  return (
    <>
      {sprintState.settingsMenu && (
        <div className="sprint-game__menu">
          <h2>Sprint Game</h2>
          <p>
            Choose the right translations of the English words into Russian. Use the "left" and
            "right" arrow buttons
          </p>
          <div className="sprint-game__menu_settings">
            <p>Level</p>
            <input
              type="text"
              name="levelSettings"
              value={sprintState.levelSettings}
              onChange={changeSettingsHandler}
            />
            <p>Page</p>
            <input
              type="text"
              name="pageSettings"
              value={sprintState.pageSettings}
              onChange={changeSettingsHandler}
            />
          </div>
          <div className="sprint-game__menu_buttons">
            <button className="button-start-total" onClick={startGameHandler}>
              Total Words
            </button>
            <button className="button-start-learned" onClick={startGameHandler}>
              Learned Words
            </button>
          </div>
        </div>
      )}
      {sprintState.startGameTotal && <SprintGame />}
    </>
  );
}

export default SprintGameMenu;
