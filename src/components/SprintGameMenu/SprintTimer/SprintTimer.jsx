import React from 'react';
import './SprintTimer.scss';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function SprintTimer({ setSprintState, sprintState }) {
  function onCompleteHandler() {
    setSprintState({
      ...sprintState,
      startGameTotal: false,
      isTimeOver: true,
    });
  }
  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        duration={30}
        colors={[
          ['#fbc97e', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ]}
        size={150}
        strokeWidth={10}
        onComplete={() => onCompleteHandler()}>
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default SprintTimer;
