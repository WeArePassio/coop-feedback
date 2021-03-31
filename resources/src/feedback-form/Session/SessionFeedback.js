import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import RatingRadio from '../RatingRadio';

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

const COOP_VALUES = [
  'Democracy',
  'Self-help',
  'Self-responsibility',
  'Equality',
  'Equality',
  'Solidarity',
  'Openness',
  'Honesty',
  'Social responsibility',
];

const SessionFeedback = () => {
  const history = useHistory();
  const [enjoyRating, setEnjoyRating] = useState();
  const [enjoyedMost, setEnjoyedMost] = useState();
  const [values, setValues] = useState([]);
  return (
    <>
      <header>
        <h1>Your Session is Finished!</h1>
        <div className='line'></div>
      </header>
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
      <div className='panel'>
        <label htmlFor='enjoy-rating'>How much did you enjoy today’s session?</label>
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
              />
              <RatingRadio
                question_id='enjoy-rating'
                radioValue={2}
                icon={rating2}
                iconChecked={rating2Checked}
                value={enjoyRating}
                setValue={setEnjoyRating}
              />
              <RatingRadio
                question_id='enjoy-rating'
                radioValue={3}
                icon={rating3}
                iconChecked={rating3Checked}
                value={enjoyRating}
                setValue={setEnjoyRating}
              />
              <RatingRadio
                question_id='enjoy-rating'
                radioValue={4}
                icon={rating4}
                iconChecked={rating4Checked}
                value={enjoyRating}
                setValue={setEnjoyRating}
              />
              <RatingRadio
                question_id='enjoy-rating'
                radioValue={5}
                icon={rating5}
                iconChecked={rating5Checked}
                value={enjoyRating}
                setValue={setEnjoyRating}
              />
            </tr>
          </tbody>
        </table>
        <label htmlFor='enjoyed-most'>What did you enjoy most about today’s session?</label>
        <textarea
          placeholder='Type here...'
          type='text'
          name='enjoyed-most'
          id='enjoyed-most'
          value={enjoyedMost ?? ''}
          onChange={(event) => setEnjoyedMost(event.target.value)}></textarea>
      </div>
      <div className='panel'>
        <label htmlFor='values'>What co-operative values did you learn from todays session?</label>
        {COOP_VALUES.map((coopValue, index) => (
          <div key={`value-${index}`}>
            {coopValue}
            <input type='checkbox' />
          </div>
        ))}
      </div>
      <div className='button-row'>
        <button onClick={() => history.push('complete')}>Finish</button>
      </div>
    </>
  );
};

export default SessionFeedback;
