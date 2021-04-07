import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

export const ProjectContext = createContext();
const ProjectProvider = ({children}) => {
  const [questionThemes, setQuestionThemes] = useState();
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [name, setName] = useState();
  const [whoAmI, setWhoAmI] = useState();
  const [whyAmIHere, setWhyAmIHere] = useState();
  const [improveProject, setImproveProject] = useState();
  const [favouriteActivities, setfavouriteActivities] = useState();

  const [submissions, setSubmissions] = useState([]);

  const fetchQuestions = async () => {
    const response = await axios.get('/api/project/questions');
    setQuestionThemes(response.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

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

  const submitSubmission = async (type) => {
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
    const response = await axios.post(`/api/project/submissions/${type}`, {
      name,
      who_am_i: whoAmI,
      why_am_i_here: whyAmIHere,
      improve_project: improveProject,
      favourite_activities: favouriteActivities,
      question_ratings: questionRatings,
      theme_comments: themeComments,
    });
  };

  const fetchSubmissions = async () => {
    const response = await axios.get('/api/project/submissions');
    setSubmissions(response.data);
  };

  return (
    <ProjectContext.Provider
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
        questionThemes,
        fetchQuestions,
        ratings,
        setResponse,
        comments,
        setComment,
        submitSubmission,
        fetchSubmissions,
        submissions,
      }}>
      {children}
    </ProjectContext.Provider>
  );
};

const useProject = () => useContext(ProjectContext);

export {ProjectProvider, useProject};
