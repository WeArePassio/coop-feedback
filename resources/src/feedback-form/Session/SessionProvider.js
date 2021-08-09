import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';

export const COOP_VALUES = {
  democracy: 'Democracy',
  self_help: 'Self-help',
  self_responsibility: 'Self-responsibility',
  equality: 'Equality',
  equity: 'Equity',
  solidarity: 'Solidarity',
  openness: 'Openness',
  honesty: 'Honesty',
  social_responsibility: 'Social responsibility',
  caring_for_others: 'Caring for others',
};

export const SessionContext = createContext();

const SessionProvider = ({children}) => {
  const [cohortToken, setCohortToken] = useState();
  const [enjoyRating, setEnjoyRating] = useState();
  const [enjoyedMost, setEnjoyedMost] = useState();
  const [coopValues, setCoopValues] = useState(
    Object.fromEntries(
      Object.entries(COOP_VALUES).map(([key, value]) => [key, {name: value, value: false}])
    )
  );
  const [changes, setChanges] = useState();
  const [otherTopics, setOtherTopics] = useState();
  const [submissions, setSubmissions] = useState([]);

  const submitSubmission = async () => {
    const response = await axios.post('/api/session/submissions/', {
      cohort_token: cohortToken,
      enjoyment_rating: enjoyRating,
      enjoyed_most: enjoyedMost,
      changes: changes,
      other_topics: otherTopics,
      democracy: coopValues.democracy.value,
      self_help: coopValues.self_help.value,
      self_responsibility: coopValues.self_responsibility.value,
      equality: coopValues.equality.value,
      equity: coopValues.equity.value,
      solidarity: coopValues.solidarity.value,
      openness: coopValues.openness.value,
      honesty: coopValues.honesty.value,
      social_responsibility: coopValues.social_responsibility.value,
      caring_for_others: coopValues.caring_for_others.value,
    });
  };

  const fetchSubmissions = async () => {
    const response = await axios.get(`/api/session/submissions/${cohortToken}`);
    setSubmissions(response.data);
  };

  const exportSubmissions = async () => {
    window.open(`/api/session/submissions/${cohortToken}/export`, '_blank');
  };

  return (
    <SessionContext.Provider
      value={{
        cohortToken,
        setCohortToken,
        enjoyRating,
        setEnjoyRating,
        enjoyedMost,
        setEnjoyedMost,
        coopValues,
        setCoopValues,
        changes,
        setChanges,
        otherTopics,
        setOtherTopics,
        submitSubmission,
        fetchSubmissions,
        submissions,
        exportSubmissions,
      }}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext);

export {SessionProvider, useSession};
