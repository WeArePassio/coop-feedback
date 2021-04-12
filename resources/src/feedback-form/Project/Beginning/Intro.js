import React from 'react';
import {useHistory} from 'react-router-dom';

import start from '../../../img/start.svg';

const Intro = () => {
  const history = useHistory();
  return (
    <>
      <header>
        <h1>Welcome to your Co-operative College course!</h1>
        <div className='line'></div>
      </header>
      <img src={start} className='flag' alt='A flag with the word Start' />
      <div className='panel'>
        <section>
          <h2>Introduction Session</h2>
          <p>
            We would like to ask some questions to learn more more about you and what you would like
            to gain from the course.
          </p>
        </section>
      </div>
      <div className='panel'>
        <section>
          <p>Please be as honest as possible.</p>
          <p>
            Your answers will help us tailor the course to your interests and understand what is
            important to you.
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
