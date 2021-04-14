import React, {useEffect} from 'react';

import {useProject} from './ProjectProvider';

import SubmissionHeader from '../SubmissionHeader';

const Submissions = () => {
  const {submissions, questionThemes, fetchQuestions, fetchSubmissions} = useProject();

  useEffect(() => {
    const init = async () => {
      await fetchQuestions();
      await fetchSubmissions();
    };
    init();
  }, []);

  const whoAmIResponses = [];
  const whyAmIHereResponses = [];
  const aboutMeImages = [];
  const improveProjectResponses = [];
  const favouriteActivitiesResponses = [];
  submissions.forEach((submission) => {
    if (submission.submission_type === `App\\Models\\BeginningFeedbackSubmission`) {
      whoAmIResponses.push(submission.submission.who_am_i);
      whyAmIHereResponses.push(submission.submission.why_am_i_here);
      if (submission.submission.image) {
        aboutMeImages.push(submission.submission.image);
      }
    } else {
      improveProjectResponses.push(submission.submission.improve_project);
      favouriteActivitiesResponses.push(submission.submission.favourite_activities);
    }
  });

  return (
    <>
      <h1>Submissions</h1>
      {submissions.length === 0 ? (
        <h2>No Submissions</h2>
      ) : (
        <>
          <SubmissionHeader text='[TODO: Project Name]' />
          <div className='submission-session'>
            <h3>Who am I? Where am I from? What is important to me?</h3>
            {whoAmIResponses.map((text, index) => (
              <div key={index} className='submission-text-response'>
                {text}
              </div>
            ))}
            <div className='divider' />
            <h3>Why am I here and what would I like to get from the project?</h3>
            {whyAmIHereResponses.map((text, index) => (
              <div key={index} className='submission-text-response'>
                {text}
              </div>
            ))}
            <div className='divider' />
            <h3>About Me</h3>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {aboutMeImages.map((image, index) => (
                <div style={{width: 150}} key={index}>
                  <img src={image} style={{width: 120, height: 120, backgroundColor: 'white'}} />
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>Image {index + 1}</div>
                    <div>Download</div>
                  </div>
                </div>
              ))}
            </div>
            <div className='divider' />
            <h3>
              We want to make sure we are running projects which you enjoy and learn from, please
              write down any comments on how we can improve this project.
            </h3>
            {improveProjectResponses.map((text, index) => (
              <div key={index} className='submission-text-response'>
                {text}
              </div>
            ))}
            <div className='divider' />
            <h3>What were your favourite activities on the project?</h3>
            {favouriteActivitiesResponses.map((text, index) => (
              <div key={index} className='submission-text-response'>
                {text}
              </div>
            ))}
            <div className='divider' />
          </div>
        </>
      )}
    </>
  );
};

export default Submissions;
