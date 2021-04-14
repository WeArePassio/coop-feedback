import React, {useEffect, useState} from 'react';

import {useProject} from './ProjectProvider';

import expandDark from '../../img/expand-dark.svg';
import collapseDark from '../../img/collapse-dark.svg';
import expandPurple from '../../img/expand-purple.svg';
import collapsePurple from '../../img/collapse-purple.svg';

import SubmissionHeader from '../SubmissionHeader';

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
      <div className='divider' />
      {isExpanded && <div className='section-accordion-body'>{bodyContent}</div>}
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
  const {submissions, questionThemes, fetchQuestions, fetchSubmissions} = useProject();

  useEffect(() => {
    const init = async () => {
      await fetchQuestions();
      await fetchSubmissions();
    };
    init();
  }, []);

  const whoAmIResponses = [];
  const whyAmIHereResponses = [];
  const aboutMeImages = [];
  const improveProjectResponses = [];
  const favouriteActivitiesResponses = [];
  submissions.forEach((submission) => {
    if (submission.submission_type === `App\\Models\\BeginningFeedbackSubmission`) {
      whoAmIResponses.push(submission.submission.who_am_i);
      whyAmIHereResponses.push(submission.submission.why_am_i_here);
      if (submission.submission.image) {
        aboutMeImages.push(submission.submission.image);
      }
    } else {
      improveProjectResponses.push(submission.submission.improve_project);
      favouriteActivitiesResponses.push(submission.submission.favourite_activities);
    }
  });

  // For each theme question, we need the counts for each rating
  const questionThemeRatingCounts = {};
  const themeTextResponses = {};

  if (questionThemes && submissions.length > 0) {
    questionThemes.forEach((theme) => {
      questionThemeRatingCounts[theme.id] = {};
      themeTextResponses[theme.id] = {
        before: [],
        after: [],
      };
      theme.questions.forEach((question) => {
        const before = [0, 0, 0, 0, 0];
        const after = [0, 0, 0, 0, 0];
        submissions.forEach((submission) => {
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
        // TODO  - work out average rating for each question, to closest integer
        questionThemeRatingCounts[theme.id][question.id] = {
          before,
          beforeAverage: Math.round(
            (1 * before[0] + 2 * before[1] + 3 * before[2] + 4 * before[3] + 5 * before[4]) / 5
          ),
          after,
          afterAverage: Math.round(
            (1 * after[0] + 2 * after[1] + 3 * after[2] + 4 * after[3] + 5 * after[4]) / 5
          ),
        };
      });
    });
    submissions.forEach((submission) => {
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
      {submissions.length === 0 ? (
        <h2>No Submissions</h2>
      ) : (
        <>
          <SubmissionHeader text='[TODO: Project Name]' />
          <SectionAccordion
            headerContent={<h3>Start of Project</h3>}
            bodyContent={
              <div className='submission-session'>
                <ResponsesAccordion
                  headerText='Who am I? Where am I from? What is important to me?'
                  bodyContent={whoAmIResponses.map((text, index) => (
                    <div key={index} className='submission-text-response before'>
                      {text}
                    </div>
                  ))}
                />
                <ResponsesAccordion
                  headerText='Why am I here and what would I like to get from the project?'
                  bodyContent={whyAmIHereResponses.map((text, index) => (
                    <div key={index} className='submission-text-response before'>
                      {text}
                    </div>
                  ))}
                />
                <ResponsesAccordion
                  headerText='About Me'
                  bodyContent={
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                      {aboutMeImages.map((image, index) => (
                        <div style={{width: 150}} key={index}>
                          <img
                            src={image}
                            style={{width: 120, height: 120, backgroundColor: 'white'}}
                            alt=''
                          />
                          <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>Image {index + 1}</div>
                            <div>Download</div>
                          </div>
                        </div>
                      ))}
                    </div>
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
                  bodyContent={improveProjectResponses.map((text, index) => (
                    <div key={index} className='submission-text-response after'>
                      {text}
                    </div>
                  ))}
                />
                <ResponsesAccordion
                  headerText='What were your favourite activities on the project?'
                  bodyContent={favouriteActivitiesResponses.map((text, index) => (
                    <div key={index} className='submission-text-response after'>
                      {text}
                    </div>
                  ))}
                />
              </div>
            }
          />
          {Object.keys(questionThemeRatingCounts).length > 0 &&
            questionThemes.map((theme, themeIndex) => (
              <SectionAccordion
                key={`theme-${themeIndex}`}
                headerContent={<h3>{`${themeIndex + 1}. ${theme.title}`}</h3>}
                bodyContent={
                  <div className='submission-session'>
                    <table className='rating-table submission-table'>
                      <tbody>
                        {theme.questions.map((question, questionIndex) => (
                          <>
                            <tr key={`question-${questionIndex}-before`}>
                              <td>{question.title} (before) </td>
                              {questionThemeRatingCounts[theme.id][question.id].before.map(
                                (count, countIndex) => (
                                  <td key={countIndex}>
                                    <div
                                      className={`submission-rating-cell before ${
                                        questionThemeRatingCounts[theme.id][question.id]
                                          .beforeAverage ===
                                        countIndex + 1
                                          ? 'is-average'
                                          : ''
                                      }`}>
                                      {count}
                                    </div>
                                  </td>
                                )
                              )}
                            </tr>
                            <tr key={`question-${questionIndex}-after`}>
                              <td>(after)</td>
                              {questionThemeRatingCounts[theme.id][question.id].after.map(
                                (count, countIndex) => (
                                  <td key={countIndex}>
                                    <div
                                      className={`submission-rating-cell after ${
                                        questionThemeRatingCounts[theme.id][question.id]
                                          .afterAverage ===
                                        countIndex + 1
                                          ? 'is-average'
                                          : ''
                                      }`}>
                                      {count}
                                    </div>
                                  </td>
                                )
                              )}
                            </tr>
                          </>
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
