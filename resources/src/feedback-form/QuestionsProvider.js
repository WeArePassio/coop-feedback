import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';

export const QuestionsContext = createContext();
const QuestionsProvider = ({children}) => {
  const [questionThemes, setQuestionThemes] = useState();

  const fetchQuestions = async () => {
    const response = await axios.get('/api/questions');
    setQuestionThemes(response.data);
  };

  return (
    <QuestionsContext.Provider value={{questionThemes, fetchQuestions}}>
      {children}
    </QuestionsContext.Provider>
  );
};

const useQuestions = () => useContext(QuestionsContext);

export {QuestionsProvider, useQuestions};
