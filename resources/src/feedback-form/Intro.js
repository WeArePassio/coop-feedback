import React from 'react';
import {useHistory} from 'react-router-dom';

import start from '../img/start.svg';
import Progress from './Progress';

const Intro = () => {
  const history = useHistory();
  return (
    <>
      <header>
        <h1>Welcome to your Co-operative College course!</h1>
        <div className='line'></div>
      </header>
      <img src={start} className='flag' alt='A flag with the word Start' />
      <Progress stage={0} numStages={5} />
      <div className='panel'>
        <section>
          <h2>Introduction Session</h2>
          <p>
            This is the start of your journey on your course with the Co-operative college! We’d
            like you to take a bit of time in this first session to think about what is important to
            you and what you would like to get from the project.
          </p>
        </section>
      </div>
      <div className='panel'>
        <section>
          <p>
            We would also like you to think about some different skills that you may have or would
            like to improve on. In the question about skills, please be as honest as you can and do
            not worry about selecting that you’d like to imrpove - that is what the course is for.
          </p>
        </section>
      </div>
      <div className='button-row'>
        <button onClick={() => history.push('about-me')}>Next</button>
      </div>
    </>
  );
};

export default Intro;
