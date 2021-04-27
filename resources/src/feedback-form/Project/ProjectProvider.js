import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

export const ProjectContext = createContext();
const ProjectProvider = ({children}) => {
  const [cohortToken, setCohortToken] = useState();
  const [questionThemes, setQuestionThemes] = useState();
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [name, setName] = useState();
  const [whoAmI, setWhoAmI] = useState();
  const [whyAmIHere, setWhyAmIHere] = useState();
  const [improveProject, setImproveProject] = useState();
  const [favouriteActivities, setfavouriteActivities] = useState();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState();

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
    // The "beginning" submission includes an image, so we use multipart/form-data for this request
    const formData = new FormData();
    formData.append('cohort_token', cohortToken);
    if (image) {
      formData.append('image', file);
    }
    if (name) {
      formData.append('name', name);
    }
    if (whoAmI) {
      formData.append('who_am_i', whoAmI);
    }
    if (whyAmIHere) {
      formData.append('why_am_i_here', whyAmIHere);
    }
    if (improveProject) {
      formData.append('improve_project', improveProject);
    }
    if (favouriteActivities) {
      formData.append('favourite_activities', favouriteActivities);
    }
    formData.append('question_ratings', JSON.stringify(questionRatings));
    formData.append('theme_comments', JSON.stringify(themeComments));
    const response = await axios.post(`/api/project/submissions/${type}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const fetchSubmissions = async () => {
    const response = await axios.get(`/api/project/submissions/${cohortToken}`);
    setSubmissions(response.data);
  };

  return (
    <ProjectContext.Provider
      value={{
        cohortToken,
        setCohortToken,
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
        image,
        setImage,
        file,
        setFile,
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
