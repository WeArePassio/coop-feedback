import React, {createContext, useContext, useState} from 'react';
// import axios from 'axios';

export const SubmissionContext = createContext();
const SubmissionProvider = ({children}) => {
  const [responses, setResponses] = useState({});

  const setResponse = (themeId, questionId, value) => {
    const newResponses = {...responses};
    if (!Object.keys(newResponses).includes(`${themeId}`)) {
      newResponses[themeId] = {};
    }
    newResponses[themeId][questionId] = value;
    setResponses(newResponses);
  };

  return (
    <SubmissionContext.Provider value={{responses, setResponse}}>
      {children}
    </SubmissionContext.Provider>
  );
};

const useSubmission = () => useContext(SubmissionContext);

export {SubmissionProvider, useSubmission};
