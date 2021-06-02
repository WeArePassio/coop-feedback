import React from 'react';
import {useHistory} from 'react-router-dom';

import {useSession} from './SessionProvider';
import RatingRadio from '../Project/RatingRadio';
import rating1 from '../../img/rating-1.svg';
import rating1Checked from '../../img/rating-1-checked.svg';
import rating2 from '../../img/rating-2.svg';
import rating2Checked from '../../img/rating-2-checked.svg';
import rating3 from '../../img/rating-3.svg';
import rating3Checked from '../../img/rating-3-checked.svg';
import rating4 from '../../img/rating-4.svg';
import rating4Checked from '../../img/rating-4-checked.svg';
import rating5 from '../../img/rating-5.svg';
import rating5Checked from '../../img/rating-5-checked.svg';

import speechBubble from '../../img/speech-bubble.svg';
import question2Graphic from '../../img/reflection-2-graphic.svg';
import question3Graphic from '../../img/reflection-3-graphic.svg';
import question4Graphic from '../../img/reflection-4-graphic.svg';
import question5Graphic from '../../img/reflection-5-graphic.svg';

const SessionFeedback = () => {
  const history = useHistory();
  const {
    enjoyRating,
    setEnjoyRating,
    enjoyedMost,
    setEnjoyedMost,
    coopValues,
    setCoopValues,
    changes,
    setChanges,
    otherTopics,
    setOtherTopics,
    submitSubmission,
  } = useSession();

  const handleNext = async () => {
    await submitSubmission();
    history.push('complete');
  };

  return (
    <>
      <header>
        <h1 className='center-aligned' style={{marginBottom: 12}}>
          Your Session is Finished!
        </h1>
        <div className='line'></div>
      </header>
      <div className='panel row' style={{margin: '80px 0 64px 0'}}>
        <section>
          <h2 className='purple'>Tell us what you think...</h2>
          <p>
            Now you have finished your session with your class mates, we would like to know how you
            found everything today.
          </p>
          <p className='bold'>
            All responses are anonymous so we would like you to be as open and honest as possible.
            We welcome constructive criticism to improve the course.
          </p>
        </section>
        <img className='tell-us-what-you-think-icon' src={speechBubble} />
      </div>
      <div className='row session-question'>
        <div className='session-question-number'>1</div>
        <div className='session-question-content'>
          <label htmlFor='enjoy-rating'>How did you feel about today’s session?</label>
          <table>
            <tbody>
              <tr>
                <RatingRadio
                  question_id='enjoy-rating'
                  radioValue={1}
                  icon={rating1}
                  iconChecked={rating1Checked}
                  value={enjoyRating}
                  setValue={setEnjoyRating}
                  labelText='Very unhappy'
                />
                <RatingRadio
                  question_id='enjoy-rating'
                  radioValue={2}
                  icon={rating2}
                  iconChecked={rating2Checked}
                  value={enjoyRating}
                  setValue={setEnjoyRating}
                  labelText='Unhappy'
                />
                <RatingRadio
                  question_id='enjoy-rating'
                  radioValue={3}
                  icon={rating3}
                  iconChecked={rating3Checked}
                  value={enjoyRating}
                  setValue={setEnjoyRating}
                  labelText='Okay'
                />
                <RatingRadio
                  question_id='enjoy-rating'
                  radioValue={4}
                  icon={rating4}
                  iconChecked={rating4Checked}
                  value={enjoyRating}
                  setValue={setEnjoyRating}
                  labelText='Happy'
                />
                <RatingRadio
                  question_id='enjoy-rating'
                  radioValue={5}
                  icon={rating5}
                  iconChecked={rating5Checked}
                  value={enjoyRating}
                  setValue={setEnjoyRating}
                  labelText='Very happy'
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='row session-question'>
        <div className='session-question-number'>2</div>
        <div className='session-question-content text'>
          <label htmlFor='enjoyed-most'>
            What did you <span className='bold'>enjoy most</span> about today’s session? e.g the
            activities, talking to other young people, being asked questions
          </label>
          <textarea
            placeholder='Type here...'
            type='text'
            name='enjoyed-most'
            id='enjoyed-most'
            value={enjoyedMost ?? ''}
            onChange={(event) => setEnjoyedMost(event.target.value)}></textarea>
        </div>
        <img className='tell-us-what-you-think-icon' src={question2Graphic} />
      </div>

      <div className='row session-question'>
        <div className='session-question-number'>3</div>
        <div className='session-question-content text'>
          <label htmlFor='changes'>
            How could today's session be <span className='bold'>improved</span>?
          </label>
          <textarea
            placeholder='Type here...'
            type='text'
            name='changes'
            id='changes'
            value={changes ?? ''}
            onChange={(event) => setChanges(event.target.value)}></textarea>
        </div>
        <img className='tell-us-what-you-think-icon' src={question3Graphic} />
      </div>

      <div className='row session-question'>
        <div className='session-question-number'>4</div>
        <div className='session-question-content'>
          <label htmlFor='values'>
            What <span className='bold'>co-operative values</span> did you use in today's session?
          </label>
          {Object.entries(coopValues).map(([key, {name, value}]) => (
            <div key={`value-${key}`} className='checkbox-container'>
              <input
                type='checkbox'
                id={key}
                name={key}
                checked={value ?? false}
                onChange={(event) => {
                  setCoopValues({
                    ...coopValues,
                    [key]: {...coopValues[key], value: event.target.checked},
                  });
                }}
              />
              <label htmlFor={key} className='regular'>
                {name}
              </label>
            </div>
          ))}
        </div>
        <img className='tell-us-what-you-think-icon' src={question4Graphic} />
      </div>

      <div className='row session-question'>
        <div className='session-question-number'>5</div>
        <div className='session-question-content text'>
          <label htmlFor='other-topics'>
            What <span className='bold'>other topics</span> would you like to discuss in future
            sessions?
          </label>
          <textarea
            placeholder='Type here...'
            type='text'
            name='other-topics'
            id='other-topics'
            value={otherTopics ?? ''}
            onChange={(event) => setOtherTopics(event.target.value)}></textarea>
        </div>
        <img className='tell-us-what-you-think-icon' src={question5Graphic} />
      </div>

      <div className='button-row'>
        <button className='button' onClick={handleNext}>
          Finish
        </button>
      </div>
    </>
  );
};

export default SessionFeedback;
