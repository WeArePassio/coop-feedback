import React from 'react';

import '../../progress.css';

import {useProject} from './ProjectProvider';

const Progress = ({stage}) => {
  const {questionThemes} = useProject();
  const numStages = (questionThemes ?? []).length + 2;
  const stages = Array(numStages).fill(0);
  // If stage isn't propped in, assume we're on the final stage
  const currentStage = stage ?? numStages;
  const progressPercent = currentStage >= numStages ? 100 : (currentStage / (numStages - 1)) * 100;
  return (
    <div className='progress'>
      <div className='progress-line-bg' />
      <div
        className='progress-line'
        style={{
          right: `${100 - progressPercent}%`,
        }}
      />
      {stages.map((_, index) => (
        <div
          key={`stage-${index}`}
          className={`
        stage
        ${index < currentStage ? 'completed' : ''}
        ${index === currentStage ? 'current' : ''}
        ${index > currentStage ? 'empty' : ''}
        `}>
          {index < currentStage && <span>✔</span>}
        </div>
      ))}
    </div>
  );
};

export default Progress;
