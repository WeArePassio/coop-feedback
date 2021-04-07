import React, {useEffect} from 'react';

import {useProject} from './ProjectProvider';

const Submissions = () => {
  const {submissions, questionThemes, fetchQuestions, fetchSubmissions} = useProject();

  useEffect(() => {
    const init = async () => {
      await fetchQuestions();
      await fetchSubmissions();
    };
    init();
  }, []);

  return (
    <>
      <h1>Submissions</h1>
      {submissions.length === 0 ? (
        <h2>No Submissions</h2>
      ) : (
        submissions.map(
          (
            {
              created_at,
              name,
              submission_type,
              submission,
              project_feedback_ratings,
              project_feedback_comments,
            },
            index
          ) => (
            <div key={`submission-${index}`}>
              <h2>
                {name} ({new Date(created_at).toDateString()})
              </h2>
              {submission_type === `App\\Models\\BeginningFeedbackSubmission` ? (
                <>
                  <label>Who am I?</label>
                  <p>{submission.who_am_i}</p>
                  <label>Why am I Here?</label>
                  <p>{submission.why_am_i_here}</p>
                </>
              ) : (
                <>
                  <label>How to Improve Project?</label>
                  <p>{submission.improve_project}</p>
                  <label>Favourite Activities</label>
                  <p>{submission.favourite_activities}</p>
                </>
              )}
              {questionThemes.map((theme, themeIndex) => (
                <div key={`theme-${themeIndex}`}>
                  <h3>{theme.title}</h3>
                  <table className='rating-table submission-table'>
                    <tbody>
                      {theme.questions.map((question, questionIndex) => (
                        <tr key={`question-${questionIndex}`}>
                          <td>{question.title}</td>
                          <td>
                            {project_feedback_ratings.find(
                              (rating) => rating.question_id === question.id
                            )?.rating ?? ''}
                            /5
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={2}>
                          <span style={{fontWeight: 'bold'}}>Comments: </span>
                          {project_feedback_comments.find(
                            (comment) => comment.question_theme_id === theme.id
                          )?.text ?? ''}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )
        )
      )}
    </>
  );
};

export default Submissions;
