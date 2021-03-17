import React from 'react';

import start from '../img/start.svg';
import RatingRow from './RatingRow';

const MyJourney = () => {
  return (
    <>
      <img src={start} className='flag' alt='A flag with the word Start' />
      <div className='panel'>
        <section>
          <h2>My Journey</h2>
          <p>
            In this section we have a list of things we would like you to rate the questions under
            the different headings. Be as honest as you can as we will ask these questions at the
            end of the project so the college and you can see where you have improved.
          </p>
        </section>
      </div>

      <table className='rating-table'>
        <thead>
          <tr>
            <th>1. Confidence</th>
            <th>Very Difficult</th>
            <th>Difficult</th>
            <th>Not Sure</th>
            <th>Easy</th>
            <th>Very Easy</th>
          </tr>
        </thead>
        <tbody>
          <RatingRow question='How confident do you feel in general?' question_id='general' />
          <RatingRow
            question='How easy do you find it to try new things?'
            question_id='new-things'
          />
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <p>
                Do you have any extra comments or pictures you would like to share on the topic of
                confidence?
              </p>
              <textarea placeholder='Type here...'></textarea>
            </td>
          </tr>
        </tfoot>
      </table>

      <div className='button-row'>
        <button onClick={() => (window.location.href = '/my-journey-2')}>Next</button>
      </div>
    </>
  );
};

export default MyJourney;
