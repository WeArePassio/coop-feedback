import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

export const QuestionsContext = createContext();
const QuestionsProvider = ({children}) => {
  return <QuestionsContext.Provider value={{}}>{children}</QuestionsContext.Provider>;
};

const useQuestions = () => useContext(QuestionsContext);

export {QuestionsProvider, useQuestions};
