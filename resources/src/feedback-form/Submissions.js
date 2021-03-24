import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {useQuestions} from './QuestionsProvider';

const Submissions = () => {
  const {questionThemes, fetchQuestions} = useQuestions();
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    const init = async () => {
      await fetchQuestions();
      const response = await axios.get('/api/submissions');
      setSubmissions(response.data);
    };
    init();
  }, []);

  return (
    <>
      <h1>Submissions</h1>
      {submissions.map(
        (
          {
            created_at,
            name,
            who_am_i,
            why_am_i_here,
            beginning_feedback_ratings,
            beginning_feedback_comments,
          },
          index
        ) => (
          <div key={`submission-${index}`}>
            <h2>
              {name} ({new Date(created_at).toDateString()})
            </h2>
            <label>Who am I?</label>
            <p>{who_am_i}</p>
            <label>Why am I Here?</label>
            <p>{why_am_i_here}</p>
            {questionThemes.map((theme, themeIndex) => (
              <div key={`theme-${themeIndex}`}>
                <h3>{theme.title}</h3>
                <table className='rating-table submission-table'>
                  <tbody>
                    {theme.questions.map((question, questionIndex) => (
                      <tr key={`question-${questionIndex}`}>
                        <td>{question.title}</td>
                        <td>
                          {beginning_feedback_ratings.find(
                            (rating) => rating.question_id === question.id
                          )?.rating ?? ''}
                          /5
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={2}>
                        <span style={{fontWeight: 'bold'}}>Comments: </span>
                        {beginning_feedback_comments.find(
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
      )}
    </>
  );
};

export default Submissions;
