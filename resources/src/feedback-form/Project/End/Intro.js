import React from 'react';
import {useHistory} from 'react-router-dom';

import finish from '../../../img/finish.svg';

const Intro = () => {
  const history = useHistory();
  return (
    <>
      <header>
        <h1>Welcome to your Co-operative College course!</h1>
        <div className='line'></div>
      </header>
      <img src={finish} className='flag' alt='A flag with the word End' />
      <h2 className='purple'>You did it - you completed the Ad(venture) course!</h2>
      <div className='panel'>
        <section>
          <h2>Final Session</h2>
          <p>
            It would be really useful to hear about your experiences such as what you liked and
            disliked about the course. This will help us improve the course for future groups.
          </p>
        </section>
      </div>
      <div className='panel'>
        <section>
          <p>
            Please be as open and honest as possible. It is OK to criticise parts of the course that
            you disliked!
          </p>
        </section>
      </div>
      <div className='button-row'>
        <button className='button' onClick={() => history.push('final-session')}>
          Next
        </button>
      </div>
    </>
  );
};

export default Intro;
