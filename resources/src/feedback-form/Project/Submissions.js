import React, {useEffect, useState} from 'react';

import {useProject} from './ProjectProvider';

import SubmissionHeader from '../SubmissionHeader';
import ParticipantFilter from './ParticipantFilter';

import expandDark from '../../img/expand-dark.svg';
import collapseDark from '../../img/collapse-dark.svg';
import expandPurple from '../../img/expand-purple.svg';
import collapsePurple from '../../img/collapse-purple.svg';
import download from '../../img/download.svg';

import rating1 from '../../img/rating-1.svg';
import rating2 from '../../img/rating-2.svg';
import rating3 from '../../img/rating-3.svg';
import rating4 from '../../img/rating-4.svg';
import rating5 from '../../img/rating-5.svg';

const RATING_ICONS = [rating1, rating2, rating3, rating4, rating5];

const ResponsesAccordion = ({headerText, bodyContent}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <>
      <div className='section-accordion-header'>
        <h3>{headerText}</h3>
        <button className='accordion-button' onClick={() => setIsExpanded(!isExpanded)}>
          <img
            src={isExpanded ? collapsePurple : expandPurple}
            alt={isExpanded ? 'collapse' : 'expand'}
          />
        </button>
      </div>
      <div className='divider purple' />
      {isExpanded && (
        <div className='section-accordion-body'>
          {bodyContent ? bodyContent : <h5>No responses</h5>}
        </div>
      )}
    </>
  );
};

const SectionAccordion = ({headerContent, bodyContent}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <>
      <div className='submission-section-header section-accordion-header'>
        {headerContent}
        <button className='accordion-button' onClick={() => setIsExpanded(!isExpanded)}>
          <img
            src={isExpanded ? collapseDark : expandDark}
            alt={isExpanded ? 'collapse' : 'expand'}
          />
        </button>
      </div>
      {isExpanded && <div className='section-accordion-body'>{bodyContent}</div>}
    </>
  );
};

const Submissions = () => {
  const {
    submissions,
    questionThemes,
    fetchQuestions,
    fetchSubmissions,
    exportSubmissions,
  } = useProject();
  const [filterNames, setFilterNames] = useState([]);

  useEffect(() => {
    const init = async () => {
      await fetchQuestions();
      await fetchSubmissions();
    };
    init();
  }, []);

  const filteredSubmissions =
    filterNames.length > 0
      ? submissions.filter((submission) =>
          filterNames.map((name) => name.toLowerCase()).includes(submission.name.toLowerCase())
        )
      : submissions;

  const gainResponses = [];
  const interestResponses = [];
  const aboutMeImages = [];
  const improveProjectResponses = [];
  const favouriteActivitiesResponses = [];

  const submissionsByName = {};

  filteredSubmissions.forEach((submission) => {
    if (submission.submission_type === `App\\Models\\BeginningFeedbackSubmission`) {
      if (submission.submission.gain) {
        gainResponses.push(submission.submission.gain);
      }
      if (submission.submission.interest) {
        interestResponses.push(submission.submission.interest);
      }
      if (submission.submission.image) {
        aboutMeImages.push(submission.submission.image);
      }
    } else {
      if (submission.submission.improve_project) {
        improveProjectResponses.push(submission.submission.improve_project);
      }
      if (submission.submission.favourite_activities) {
        favouriteActivitiesResponses.push(submission.submission.favourite_activities);
      }
    }
    const type =
      submission.submission_type === `App\\Models\\BeginningFeedbackSubmission`
        ? 'before'
        : 'after';
    const name = submission.name.toLowerCase();
    if (!submissionsByName[name]) {
      submissionsByName[name] = {
        [type]: submission,
      };
    } else {
      submissionsByName[name][type] = submission;
    }
  });
  const submissionsWithMatches = Object.fromEntries(
    Object.entries(submissionsByName).filter(
      ([name, submissions]) => Object.keys(submissions).length === 2
    )
  );

  // For each theme question, we need the counts for each rating
  const questionThemeRatingCounts = {};
  const themeTextResponses = {};

  // For each theme, compute each matched student's total before/after score
  // so we can work out what % of students were more confident about that theme
  const themeRatingTotal = {};

  if (questionThemes && filteredSubmissions.length > 0) {
    questionThemes.forEach((theme) => {
      questionThemeRatingCounts[theme.id] = {};
      themeTextResponses[theme.id] = {
        before: [],
        after: [],
      };
      theme.questions.forEach((question) => {
        const before = [0, 0, 0, 0, 0];
        const after = [0, 0, 0, 0, 0];
        filteredSubmissions.forEach((submission) => {
          const rating = submission.project_feedback_ratings.find(
            (rating) => rating.question_id === question.id
          );
          if (rating) {
            if (submission.submission_type === `App\\Models\\BeginningFeedbackSubmission`) {
              before[rating.rating - 1] += 1;
            } else {
              after[rating.rating - 1] += 1;
            }
          }
        });

        let numImproved = Object.values(submissionsWithMatches).filter(({before, after}) => {
          const beforeRating = before.project_feedback_ratings.find(
            (rating) => rating.question_id === question.id
          );
          const afterRating = after.project_feedback_ratings.find(
            (rating) => rating.question_id === question.id
          );
          return (afterRating.rating ?? 0) >= (beforeRating.rating ?? 0);
        }).length;

        // Work out average rating for each question, to closest integer
        questionThemeRatingCounts[theme.id][question.id] = {
          before,
          beforeAverage: Math.round(
            (1 * before[0] + 2 * before[1] + 3 * before[2] + 4 * before[3] + 5 * before[4]) /
              before.reduce((accumulator, currentValue) => accumulator + currentValue)
          ),
          after,
          afterAverage: Math.round(
            (1 * after[0] + 2 * after[1] + 3 * after[2] + 4 * after[3] + 5 * after[4]) /
              after.reduce((accumulator, currentValue) => accumulator + currentValue)
          ),
          percentImproved: (numImproved * 100) / Object.keys(submissionsWithMatches).length,
        };
      });
    });
    filteredSubmissions.forEach((submission) => {
      submission.project_feedback_comments.forEach((comment) => {
        if (submission.submission_type === `App\\Models\\BeginningFeedbackSubmission`) {
          themeTextResponses[comment.question_theme_id].before.push(comment.text);
        } else {
          themeTextResponses[comment.question_theme_id].after.push(comment.text);
        }
      });
    });
  }

  return (
    <>
      <h1>Submissions</h1>
      <div className='submissions-controls'>
        <div>
          <button onClick={exportSubmissions} className='button'>
            Export submissions
          </button>
        </div>
        <ParticipantFilter
          submissions={submissions}
          filterNames={filterNames}
          onChangeParticipantFilter={setFilterNames}
        />
      </div>
      {filteredSubmissions.length === 0 ? (
        <h2>No Submissions</h2>
      ) : (
        <>
          <SubmissionHeader text='Project Feedback' />
          <SectionAccordion
            headerContent={<h3>Start of Project</h3>}
            bodyContent={
              <div className='submission-session'>
                <ResponsesAccordion
                  headerText='What would you like to gain from the project?'
                  bodyContent={
                    gainResponses.length > 0
                      ? gainResponses.map((text, index) => (
                          <div key={index} className='submission-text-response before'>
                            {text}
                          </div>
                        ))
                      : null
                  }
                />
                <ResponsesAccordion
                  headerText='What interests you about the project?'
                  bodyContent={
                    interestResponses.length > 0
                      ? interestResponses.map((text, index) => (
                          <div key={index} className='submission-text-response before'>
                            {text}
                          </div>
                        ))
                      : null
                  }
                />
                <ResponsesAccordion
                  headerText='About Me'
                  bodyContent={
                    aboutMeImages.length > 0 ? (
                      <div className='images-container'>
                        {aboutMeImages.map((image, index) => (
                          <div className='image-container' key={index}>
                            <img src={image} className='about-me-image' alt='' />
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                              <div>Image {index + 1}</div>
                              <button
                                className='download-button'
                                onClick={() => {
                                  window.open(image);
                                }}>
                                <img src={download} alt='download' />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
                />
              </div>
            }
          />
          <SectionAccordion
            headerContent={<h3>End of Project</h3>}
            bodyContent={
              <div className='submission-session'>
                <ResponsesAccordion
                  headerText='We want to make sure we are running projects which you enjoy and learn from, please write down any comments on how we can improve this project. '
                  bodyContent={
                    improveProjectResponses.length > 0
                      ? improveProjectResponses.map((text, index) => (
                          <div key={index} className='submission-text-response after'>
                            {text}
                          </div>
                        ))
                      : null
                  }
                />
                <ResponsesAccordion
                  headerText='What were your favourite activities on the project?'
                  bodyContent={
                    favouriteActivitiesResponses.length > 0
                      ? favouriteActivitiesResponses.map((text, index) => (
                          <div key={index} className='submission-text-response after'>
                            {text}
                          </div>
                        ))
                      : null
                  }
                />
              </div>
            }
          />
          <div className='ratings-key'>
            <h3 className='ratings-key-heading'>Key</h3>
            <div className='ratings-key-item'>
              <div className='submission-rating-cell before'>0</div>
              <div>Before Project</div>
            </div>
            <div className='ratings-key-item'>
              <div className='submission-rating-cell after'>0</div>
              <div>After Project</div>
            </div>
          </div>

          {Object.keys(questionThemeRatingCounts).length > 0 &&
            questionThemes.map((theme, themeIndex) => (
              <SectionAccordion
                key={`theme-${themeIndex}`}
                headerContent={<h3>{`${themeIndex + 1}. ${theme.title}`}</h3>}
                bodyContent={
                  <div className='submission-session'>
                    <table className='rating-table submission-table'>
                      <thead>
                        <tr>
                          <th></th>
                          {RATING_ICONS.map((icon, iconIndex) => (
                            <th key={iconIndex}>
                              <img src={icon} alt='' style={{width: 24, height: 24}} />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {theme.questions.map((question, questionIndex) => (
                          <React.Fragment key={`question-${questionIndex}`}>
                            <tr>
                              <td className='bold'>{question.title}</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>
                                Average before:{' '}
                                <span className='bold'>
                                  {questionThemeRatingCounts[theme.id][question.id].beforeAverage}
                                </span>
                              </td>
                              {questionThemeRatingCounts[theme.id][question.id].before.map(
                                (beforeCount, countIndex) => (
                                  <td key={countIndex}>
                                    <div className='submission-rating-cell before'>
                                      {beforeCount}
                                    </div>
                                  </td>
                                )
                              )}
                            </tr>
                            <tr className='question-row-border-bottom'>
                              <td>
                                <div>
                                  Average after:{' '}
                                  <span className='bold'>
                                    {questionThemeRatingCounts[theme.id][question.id].afterAverage}
                                  </span>
                                </div>
                                <div>
                                  Percent of students improved:{` `}
                                  <span className='bold'>
                                    {`${
                                      questionThemeRatingCounts[theme.id][question.id]
                                        .percentImproved
                                    }%`}
                                  </span>
                                </div>
                              </td>
                              {questionThemeRatingCounts[theme.id][question.id].after.map(
                                (afterCount, countIndex) => {
                                  return (
                                    <td key={countIndex}>
                                      <div className='submission-rating-cell after'>
                                        {afterCount}
                                      </div>
                                    </td>
                                  );
                                }
                              )}
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                    <ResponsesAccordion
                      headerText={`Do you have any extra comments or pictures you would like to share on the topic of ${theme.title}?`}
                      bodyContent={
                        <>
                          <h4>BEFORE</h4>
                          {themeTextResponses[theme.id].before.map((text, textIndex) => (
                            <div key={textIndex} className='submission-text-response before'>
                              {text}
                            </div>
                          ))}
                          <h4>AFTER</h4>
                          {themeTextResponses[theme.id].after.map((text, textIndex) => (
                            <div key={textIndex} className='submission-text-response after'>
                              {text}
                            </div>
                          ))}
                        </>
                      }
                    />
                  </div>
                }
              />
            ))}
        </>
      )}
    </>
  );
};

export default Submissions;
