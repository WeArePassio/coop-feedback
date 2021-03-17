import React, {useState} from 'react';

import start from '../img/start.svg';
import RatingRow from './RatingRow';

const MyJourney = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'How confident do you feel in general?',
      value: undefined,
    },
    {
      id: 2,
      title: 'How easy do you find it to try new things?',
      value: undefined,
    },
  ]);
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
          {questions.map(({id, title, value}) => (
            <RatingRow
              key={id}
              question={title}
              question_id={`question-${id}`}
              value={value}
              setValue={(value) => {
                const newQuestions = [...questions];
                newQuestions.find((question) => question.id === id).value = value;
                setQuestions(newQuestions);
              }}
            />
          ))}
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
