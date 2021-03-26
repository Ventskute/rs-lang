import React from 'react';
import './SprintGameStatistics.scss';

function SprintGameStatistics({ setSprintState, sprintState }) {
  const { truelyAnswers, falsyAnswers } = sprintState;
  console.log(sprintState);
  return (
    <div>
        <div>Statistics</div>
      <div>{JSON.stringify(truelyAnswers)}</div>
      <div>{JSON.stringify(falsyAnswers)}</div>
    </div>
  );
}

export default SprintGameStatistics;
