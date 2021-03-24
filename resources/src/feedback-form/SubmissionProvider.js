import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';

export const SubmissionContext = createContext();
const SubmissionProvider = ({children}) => {
  const [ratings, setResponses] = useState({});
  const [name, setName] = useState();
  const [whoAmI, setWhoAmI] = useState();
  const [whyAmIHere, setWhyAmIHere] = useState();

  const setResponse = (themeId, questionId, value) => {
    const newResponses = {...ratings};
    if (!Object.keys(newResponses).includes(`${themeId}`)) {
      newResponses[themeId] = {};
    }
    newResponses[themeId][questionId] = value;
    setResponses(newResponses);
  };

  const submitSubmission = async () => {
    const questionRatings = Object.values(ratings)
      .reduce(
        (accumulator, themeRatings) => [
          ...accumulator,
          Object.entries(themeRatings).map(([question_id, rating]) => ({question_id, rating})),
        ],
        []
      )
      .flat();
    const response = await axios.post('/api/submissions', {
      name,
      who_am_i: whoAmI,
      why_am_i_here: whyAmIHere,
      question_ratings: questionRatings,
    });
  };

  return (
    <SubmissionContext.Provider
      value={{
        name,
        setName,
        whoAmI,
        setWhoAmI,
        whyAmIHere,
        setWhyAmIHere,
        ratings,
        setResponse,
        submitSubmission,
      }}>
      {children}
    </SubmissionContext.Provider>
  );
};

const useSubmission = () => useContext(SubmissionContext);

export {SubmissionProvider, useSubmission};
