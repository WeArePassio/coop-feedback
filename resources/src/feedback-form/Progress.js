import React from 'react';

import '../progress.css';

const Progress = ({numStages, stage}) => {
  const stages = Array(numStages).fill(0);
  const progressPercent = stage === numStages ? 100 : (stage / (numStages - 1)) * 100;
  return (
    <div className='progress'>
      <div
        className='progress-line'
        style={{
          right: `${100 - progressPercent}%`,
        }}
      />
      {stages.map((_, index) => {
        const isComplete = index < stage;
        const isCurrent = index === stage;
        const isEmpty = index > stage;
        return (
          <div
            key={`stage-${index}`}
            className={`
        stage
        ${isComplete ? 'completed' : ''}
        ${isCurrent ? 'current' : ''}
        ${isEmpty ? 'empty' : ''}
        `}>
            {isComplete && <span>✔</span>}
          </div>
        );
      })}
    </div>
  );
};

export default Progress;
