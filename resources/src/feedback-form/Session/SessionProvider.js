import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';

const COOP_VALUES = {
  democracy: 'Democracy',
  self_help: 'Self-help',
  self_responsibility: 'Self-responsibility',
  equality: 'Equality',
  equity: 'Equity',
  solidarity: 'Solidarity',
  openness: 'Openness',
  honesty: 'Honesty',
  social_responsibility: 'Social responsibility',
};

export const SessionContext = createContext();

const SessionProvider = ({children}) => {
  const [enjoyRating, setEnjoyRating] = useState();
  const [enjoyedMost, setEnjoyedMost] = useState();
  const [coopValues, setCoopValues] = useState(
    Object.fromEntries(
      Object.entries(COOP_VALUES).map(([key, value]) => [key, {name: value, value: false}])
    )
  );
  const [submissions, setSubmissions] = useState([]);

  const submitSubmission = async () => {
    const response = await axios.post('/api/session/submissions/', {
      enjoyment_rating: enjoyRating,
      enjoyed_most: enjoyedMost,
      democracy: coopValues.democracy.value,
      self_help: coopValues.self_help.value,
      self_responsibility: coopValues.self_responsibility.value,
      equality: coopValues.equality.value,
      equity: coopValues.equity.value,
      solidarity: coopValues.solidarity.value,
      openness: coopValues.openness.value,
      honesty: coopValues.honesty.value,
      social_responsibility: coopValues.social_responsibility.value,
    });
  };

  const fetchSubmissions = async () => {
    const response = await axios.get('/api/session/submissions');
    setSubmissions(response.data);
  };

  return (
    <SessionContext.Provider
      value={{
        enjoyRating,
        setEnjoyRating,
        enjoyedMost,
        setEnjoyedMost,
        coopValues,
        setCoopValues,
        submitSubmission,
        fetchSubmissions,
        submissions,
      }}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext);

export {SessionProvider, useSession};
