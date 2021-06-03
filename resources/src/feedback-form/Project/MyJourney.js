import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';

// import RatingRow from './RatingRow';
// import RatingRowMobile from './RatingRowMobile';
import RatingRowGrid from './RatingRowGrid';
import Progress from './Progress';
import {useProject} from './ProjectProvider';

import ratingGraphic1 from '../../img/rating-graphic-1.svg';
import ratingGraphic2 from '../../img/rating-graphic-2.svg';
import ratingGraphic3 from '../../img/rating-graphic-3.svg';
import ratingGraphic4 from '../../img/rating-graphic-4.svg';
import ratingGraphic5 from '../../img/rating-graphic-5.svg';

import '../../rating.css';

const headerGraphics = {
  1: ratingGraphic1,
  2: ratingGraphic2,
  3: ratingGraphic3,
  4: ratingGraphic4,
  5: ratingGraphic5,
};

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
      <div className='rating-theme'>
        <div className='rating-theme-number'>{themeIndex + 1}</div>
        <h3 className='rating-theme-title purple bold'>{theme.title}</h3>
        <img src={headerGraphics[themeIndex + 1]} />
      </div>
      <div className='divider purple' />
      <h3>{theme.question_theme_metric.heading}</h3>
      {theme && (
        <>
          {/* <table className='rating-table rating-table-mobile'>
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
          </table> */}

          <div className='grid-container'>
            <div className='grid-row grid-row-header'>
              <div className='grid-cell'></div>
              <div className='grid-cell'>{theme.question_theme_metric.label1}</div>
              <div className='grid-cell'>{theme.question_theme_metric.label2}</div>
              <div className='grid-cell'>{theme.question_theme_metric.label3}</div>
              <div className='grid-cell'>{theme.question_theme_metric.label4}</div>
              <div className='grid-cell'>{theme.question_theme_metric.label5}</div>
            </div>
            {questions &&
              questions.map(({id, title}) => (
                <RatingRowGrid
                  key={id}
                  question={title}
                  question_id={`question-${id}`}
                  value={ratings?.[theme.id]?.[id]}
                  setValue={(value) => {
                    setResponse(theme.id, id, value);
                  }}
                />
              ))}
          </div>

          <div className='panel'>
            <p>
              {`Extra comments on the topic of
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
