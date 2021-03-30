import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';

export const SubmissionContext = createContext();
const SubmissionProvider = ({children}) => {
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [name, setName] = useState();
  const [whoAmI, setWhoAmI] = useState();
  const [whyAmIHere, setWhyAmIHere] = useState();
  const [improveProject, setImproveProject] = useState();
  const [favouriteActivities, setfavouriteActivities] = useState();

  const setResponse = (themeId, questionId, value) => {
    const newResponses = {...ratings};
    if (!Object.keys(newResponses).includes(`${themeId}`)) {
      newResponses[themeId] = {};
    }
    newResponses[themeId][questionId] = value;
    setRatings(newResponses);
  };

  const setComment = (themeId, text) => {
    setComments({
      ...comments,
      [themeId]: text,
    });
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
    const themeComments = Object.entries(comments).map(([question_theme_id, text]) => ({
      question_theme_id,
      text,
    }));
    const response = await axios.post('/api/submissions', {
      name,
      who_am_i: whoAmI,
      why_am_i_here: whyAmIHere,
      question_ratings: questionRatings,
      theme_comments: themeComments,
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
        improveProject,
        setImproveProject,
        favouriteActivities,
        setfavouriteActivities,
        ratings,
        setResponse,
        comments,
        setComment,
        submitSubmission,
      }}>
      {children}
    </SubmissionContext.Provider>
  );
};

const useSubmission = () => useContext(SubmissionContext);

export {SubmissionProvider, useSubmission};
