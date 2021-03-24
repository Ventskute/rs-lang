import React from 'react';
import './SprintGame.scss';

function SprintGame() {
  const [sprintGameState, setSprintGameState] = React.useState({
    strokeDasharray: `50 2`,
    strokeDashoffset: 100,
    timer: 60,
    radius: 42,
  });
  return (
    <div>
      <div className="sprint-timer">
        <svg className="progress-ring" width="120" height="120">
          <text style={{ backgroundColor: '#fbc97e', color: '#fbc97e' }} x="35%" y="55%">
            {sprintGameState.timer}{' '}
          </text>
          <circle
            strokeDasharray={sprintGameState.strokeDasharray}
            strokeDashoffset={sprintGameState.strokeDashoffset}
            stroke="#fbc97e"
            strokeWidth="4"
            cx="60"
            cy="60"
            r="42"
            fill="transparent"
            transformorigin="center"
            transition="strokeDashoffset 0.3s"
          />
        </svg>
      </div>
    </div>
  );
}

export default SprintGame;
