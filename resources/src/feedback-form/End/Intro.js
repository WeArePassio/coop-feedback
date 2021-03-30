import React from 'react';
import {useHistory} from 'react-router-dom';

import end from '../../img/start.svg';
import Progress from '.././Progress';

const Intro = () => {
  const history = useHistory();
  return (
    <>
      <header>
        <h1>Welcome to your Co-operative College course!</h1>
        <div className='line'></div>
      </header>
      <img src={end} className='flag' alt='A flag with the word End' />
      <Progress stage={0} numStages={5} />
      <h2>You did it - you completed the Ad(venture) course!</h2>
      <div className='panel'>
        <section>
          <h2>Final Session</h2>
          <p>
            So that we can improve sessions for future groups, we would really like to hear about
            your experiences on the project.
          </p>
        </section>
      </div>
      <div className='panel'>
        <section>
          <p>
            We want you to be as open and honest as you can so. We want to remind you that it is
            okay to criticise parts of the course you didn’t like so we can learn what parts of the
            course we can improve.
          </p>
        </section>
      </div>
      <div className='panel'>
        <section>
          <p>
            Please also tell us what you enjoyed - it is great to hear your positive experiences!
          </p>
        </section>
      </div>
      <div className='button-row'>
        <button onClick={() => history.push('final-session')}>Next</button>
      </div>
    </>
  );
};

export default Intro;
