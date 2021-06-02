import React from 'react';
import {useHistory} from 'react-router-dom';

import Progress from './Progress';
import {useProject} from './ProjectProvider';

const SkillsAndKnowledge = () => {
  const {questionThemes} = useProject();
  const history = useHistory();
  return (
    <>
      <Progress stage={1} numStages={(questionThemes?.length ?? 0) + 2} />
      <div className='panel'>
        <section>
          <h2>Your skills and knowledge</h2>
          <p>
            Please rate the following questions. Be as honest as you can so we can see if the
            project helps improve skills that are important to you.
          </p>
        </section>
      </div>
      <div className='button-row'>
        <button className='button' onClick={() => history.push('my-journey')}>
          Next
        </button>
      </div>
    </>
  );
};

export default SkillsAndKnowledge;
