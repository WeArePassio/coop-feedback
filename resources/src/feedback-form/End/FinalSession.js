import React from 'react';
import {useHistory} from 'react-router-dom';

import Progress from '../Progress';
import {useSubmission} from '../SubmissionProvider';

const FinalSession = () => {
  const history = useHistory();
  const {
    name,
    setName,
    improveProject,
    setImproveProject,
    favouriteActivities,
    setfavouriteActivities,
  } = useSubmission();
  return (
    <>
      <Progress stage={1} numStages={5} />
      <div className='panel'>
        <section>
          <h2>Final Session</h2>
          <p>
            So that we can imrpove sessions for future groups, we would really like to hear about
            your experiences on the project.
          </p>
        </section>
      </div>

      <label htmlFor='name'>Name</label>
      <input
        type='text'
        name='name'
        id='name'
        value={name ?? ''}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor='improve-project'>
        We want to make sure we are running projects which you enjoy and learn from, please write
        down any comments on how we can improve this project;
      </label>
      <textarea
        placeholder='Type here...'
        type='text'
        name='improve-project'
        id='improve-project'
        value={improveProject ?? ''}
        onChange={(event) => setImproveProject(event.target.value)}></textarea>

      <label htmlFor='favourite-activities'>
        What were your favourite activities on the project?
      </label>
      <textarea
        placeholder='Type here...'
        type='text'
        name='favourite-activities'
        id='favourite-activities'
        value={favouriteActivities ?? ''}
        onChange={(event) => setfavouriteActivities(event.target.value)}></textarea>

      <div className='button-row'>
        <button onClick={() => history.push('my-journey')}>Next</button>
      </div>
    </>
  );
};

export default FinalSession;
