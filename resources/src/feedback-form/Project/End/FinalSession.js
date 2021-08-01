import React from 'react';
import {useHistory} from 'react-router-dom';

import Progress from '../Progress';
import {useProject} from '../ProjectProvider';

const FinalSession = () => {
  const history = useHistory();
  const {
    name,
    setName,
    improveProject,
    setImproveProject,
    favouriteActivities,
    setfavouriteActivities,
    questionThemes,
  } = useProject();

  const handleNext = () => {
    if (!name) {
      alert('Please enter a Name');
      return;
    }
    history.push('skills-knowledge');
  };

  return (
    <>
      <Progress stage={0} numStages={(questionThemes?.length ?? 0) + 2} />
      <div className='panel'>
        <section>
          <h2>You did it - you completed the course!</h2>
          <p>
            It would be really useful to hear about your experiences such as what you liked and
            disliked about the course. This will help us improve the course for future groups.
          </p>
          <p>
            Please be as open and honest as possible. It is OK to criticise parts of the course that
            you disliked!
          </p>
        </section>
      </div>

      <label htmlFor='name'>Name *</label>
      <input
        type='text'
        name='name'
        id='name'
        value={name ?? ''}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor='improve-project'>
        We want to make sure we are running projects which you enjoy and learn from, please write
        down any comments on how we can improve this project
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
        <button className='button' onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default FinalSession;
