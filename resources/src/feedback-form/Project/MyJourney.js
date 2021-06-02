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
      <Progress stage={2 + themeIndex} numStages={questionThemes.length + 2} />
      <div ref={topOfTableRef} />
      <h2>{`${themeIndex + 1}. ${theme.title}`}</h2>
      <div className='divider purple' />
      <h3>{theme.question_theme_metric.heading}</h3>
      {theme && (
        <>
          <table className='rating-table rating-table-mobile'>
            <thead>
              <tr>
                <th colSpan={5}></th>
              </tr>
              <tr>
                <th>{theme.question_theme_metric.label1}</th>
                <th>{theme.question_theme_metric.label2}</th>
                <th>{theme.question_theme_metric.label3}</th>
                <th>{theme.question_theme_metric.label4}</th>
                <th>{theme.question_theme_metric.label5}</th>
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
                <th></th>
                <th>{theme.question_theme_metric.label1}</th>
                <th>{theme.question_theme_metric.label2}</th>
                <th>{theme.question_theme_metric.label3}</th>
                <th>{theme.question_theme_metric.label4}</th>
                <th>{theme.question_theme_metric.label5}</th>
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
              {`Extra comments you would like to share on the topic of
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
            className='button'
            style={{marginRight: 'auto'}}
            onClick={() => {
              setThemeIndex(themeIndex - 1);
            }}>
            Previous
          </button>
        )}
        <button className='button' onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default MyJourney;
