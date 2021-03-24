import React from 'react';
import {useHistory} from 'react-router-dom';

import Progress from './Progress';

const AboutMe = () => {
  const history = useHistory();
  return (
    <>
      <Progress stage={1} numStages={5} />
      <div className='panel'>
        <section>
          <h2>About Me</h2>
          <h3>Who am I? Why am I here?</h3>
          <p>
            In this section space has been provided for you to write, draw or stick in things that
            explain who you are and what you hope to get from the project. This helps us make sure
            you benefit from and enjoy the project.
          </p>
        </section>
      </div>

      <label htmlFor='name'>Name</label>
      <input type='text' name='name' id='name' />

      <label htmlFor='who-am-i'>Who am I? Where am I from? What is important to me?</label>
      <textarea placeholder='Type here...' type='text' name='who-am-i' id='who-am-i'></textarea>

      <label htmlFor='why-am-i-here'>
        Why am I here and what would I like to get from the project?
      </label>
      <textarea
        placeholder='Type here...'
        type='text'
        name='why-am-i-here'
        id='why-am-i-here'></textarea>

      <h3>About Me</h3>
      <p>
        Use this section to upload a photo of a drawing or doodle or any pictures that represent you
        and who you are.
      </p>

      <div className='button-row'>
        <button onClick={() => history.push('/my-journey')}>Next</button>
      </div>
    </>
  );
};

export default AboutMe;
