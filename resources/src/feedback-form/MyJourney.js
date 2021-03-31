import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';

import RatingRow from './RatingRow';
import RatingRowMobile from './RatingRowMobile';
import Progress from './Progress';
import {useQuestions} from './QuestionsProvider';
import {useSubmission} from './SubmissionProvider';

import '../rating.css';

const MyJourney = ({type}) => {
  const topOfTableRef = useRef(null);
  const history = useHistory();
  const [themeIndex, setThemeIndex] = useState(0);
  const {questionThemes} = useQuestions();
  const {ratings, setResponse, comments, setComment, submitSubmission} = useSubmission();

  useEffect(() => {
    topOfTableRef.current.scrollIntoView({behaviour: 'smooth'});
  }, [themeIndex]);

  const theme = questionThemes ? questionThemes[themeIndex] : undefined;
  const questions = theme ? theme.questions : [];

  const handleNext = async () => {
    if (themeIndex < questionThemes.length - 1) {
      setThemeIndex(themeIndex + 1);
    } else {
      await submitSubmission(type);
      history.push('complete');
    }
  };

  return (
    <>
      <Progress stage={1 + themeIndex} />
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

      <div ref={topOfTableRef} />

      {theme && (
        <>
          <table className='rating-table rating-table-mobile'>
            <thead>
              <tr>
                <th colSpan={5}>{`${themeIndex + 1}. ${theme.title}`}</th>
              </tr>
              <tr>
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
                  <RatingRowMobile
                    key={id}
                    question={title}
                    question_id={`question-${id}`}
                    value={ratings?.[theme.id]?.[id]}
                    setValue={(value) => {
                      setResponse(theme.id, id, value);
                    }}
                  />
                ))}
            </tbody>
          </table>
          <table className='rating-table rating-table-desktop'>
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
                    value={ratings?.[theme.id]?.[id]}
                    setValue={(value) => {
                      setResponse(theme.id, id, value);
                    }}
                  />
                ))}
            </tbody>
          </table>
          <div className='panel'>
            <p>
              {`Do you have any extra comments or pictures you would like to share on the topic of
              ${theme.title}?`}
            </p>
            <textarea
              placeholder='Type here...'
              value={comments?.[theme.id] ?? ''}
              onChange={(event) => {
                setComment(theme.id, event.target.value);
              }}></textarea>
          </div>
        </>
      )}

      <div className='button-row'>
        {themeIndex > 0 && (
          <button
            style={{marginRight: 'auto'}}
            onClick={() => {
              setThemeIndex(themeIndex - 1);
            }}>
            Previous
          </button>
        )}
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
};

export default MyJourney;
