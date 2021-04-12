import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';

import RatingRow from './RatingRow';
import RatingRowMobile from './RatingRowMobile';
import Progress from './Progress';
import {useProject} from './ProjectProvider';

import '../../rating.css';

const MyJourney = ({type}) => {
  const topOfTableRef = useRef(null);
  const history = useHistory();
  const [themeIndex, setThemeIndex] = useState(0);
  const {
    ratings,
    setResponse,
    comments,
    setComment,
    submitSubmission,
    questionThemes,
  } = useProject();

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
      <Progress stage={1 + themeIndex} numStages={questionThemes.length + 2} />
      <div className='panel'>
        <section>
          <h2>Your skills and knowledge</h2>
          <p>
            Please rate the following questions. Be as honest as you can so we can see if the
            project helps improve skills that are important to you.
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
