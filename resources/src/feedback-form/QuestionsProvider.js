import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';

export const QuestionsContext = createContext();
const QuestionsProvider = ({children}) => {
  const [questionThemes, setQuestionThemes] = useState();
  const [responses, setResponses] = useState({});

  const fetchQuestions = async () => {
    const response = await axios.get('/api/questions');
    setQuestionThemes(response.data);
  };

  const setResponse = (themeId, questionId, value) => {
    const newResponses = {...responses};
    if (!Object.keys(newResponses).includes(`${themeId}`)) {
      newResponses[themeId] = {};
    }
    newResponses[themeId][questionId] = value;
    setResponses(newResponses);
  };

  return (
    <QuestionsContext.Provider value={{questionThemes, fetchQuestions, responses, setResponse}}>
      {children}
    </QuestionsContext.Provider>
  );
};

const useQuestions = () => useContext(QuestionsContext);

export {QuestionsProvider, useQuestions};
