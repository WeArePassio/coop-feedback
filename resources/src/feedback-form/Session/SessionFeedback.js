import React from 'react';
import {useHistory} from 'react-router-dom';

const SessionFeedback = () => {
  const history = useHistory();
  return (
    <>
      <header>
        <h1>Your Session is Finished!</h1>
        <div className='line'></div>
      </header>
      {/* <img src={tick} className='flag' alt='' /> */}
      <div className='panel'>
        <section>
          <p>
            Now you have finished your session with your class mates, we would like to know how you
            found everything today.
          </p>
          <p>
            All responses are anonymous so we would like you to be as open and honest as possible.
            We welcome constructive criticism to imrpove the course.
          </p>
        </section>
      </div>
      <div className='button-row'>
        <button onClick={() => history.push('complete')}>Finish</button>
      </div>
    </>
  );
};

export default SessionFeedback;
