import React, {useState, useEffect} from 'react';

import start from '../img/start.svg';
import RatingRow from './RatingRow';
import {useQuestions} from './QuestionsProvider';

const MyJourney = () => {
  const [themeIndex, setThemeIndex] = useState(0);
  const {questionThemes, fetchQuestions} = useQuestions();
  const [responses, setResponses] = useState();
  useEffect(() => {
    fetchQuestions();
  }, []);
  const theme = questionThemes ? questionThemes[themeIndex] : undefined;
  const questions = theme ? theme.questions : [];
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

      {theme && (
        <table className='rating-table'>
          <thead>
            <tr>
              <th>{`${themeIndex + 1}. ${theme.title}`}</th>
              <th>Very Difficult</th>
              <th>Difficult</th>
              <th>Not Sure</th>
              <th>Easy</th>
              <th>Very Easy</th>
            </tr>
          </thead>
          <tbody>
            {questions &&
              questions.map(({id, title}) => (
                <RatingRow
                  key={id}
                  question={title}
                  question_id={`question-${id}`}
                  value={responses?.[theme.id]?.[id]}
                  setValue={(value) => {
                    const newResponses = {...responses};
                    if (!Object.keys(newResponses).includes(`${theme.id}`)) {
                      newResponses[theme.id] = {};
                    }
                    newResponses[theme.id][id] = value;
                    setResponses(newResponses);
                  }}
                />
              ))}
          </tbody>
        </table>
      )}
      <div className='panel'>
        <p>
          Do you have any extra comments or pictures you would like to share on the topic of
          confidence?
        </p>
        <textarea placeholder='Type here...'></textarea>
      </div>

      <div className='button-row'>
        <button
          onClick={() => {
            setThemeIndex(themeIndex + 1);
          }}>
          Next
        </button>
      </div>
    </>
  );
};

export default MyJourney;
