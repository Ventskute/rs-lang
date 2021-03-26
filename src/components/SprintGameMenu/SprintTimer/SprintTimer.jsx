import React from 'react';
import './SprintTimer.scss';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function SprintTimer({ setSprintState, sprintState, sprintGameState }) {
  function onCompleteHandler() {
    console.log('time is over!!!');
    console.log(sprintState, 'sprintstate')
    setSprintState({ ...sprintState, isTimeOver: true, });
    console.log(sprintGameState, 'sprintGameState')
  }
  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        duration={15}
        colors={[
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ]}
        size={50}
        strokeWidth={5}
        onComplete={onCompleteHandler}>
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default SprintTimer;
