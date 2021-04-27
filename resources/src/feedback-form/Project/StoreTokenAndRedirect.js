import React, {useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';

import {useProject} from './ProjectProvider';

const StoreTokenAndRedirect = ({to}) => {
  const params = useParams();
  const history = useHistory();
  const {setCohortToken} = useProject();
  useEffect(() => {
    // We can't call a setState from a component render,
    // so we use a useEffect
    setCohortToken(params.code);
    history.push(to);
  }, []);
  return null;
};

export default StoreTokenAndRedirect;
