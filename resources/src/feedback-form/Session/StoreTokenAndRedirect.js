import React, {useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';

import {useSession} from './SessionProvider';

const StoreTokenAndRedirect = ({to}) => {
  const params = useParams();
  const history = useHistory();
  const {setCohortToken} = useSession();
  // We can't call a setState from a component render,
  // so we use a useEffect
  useEffect(() => {
    setCohortToken(params.code);
    history.push(to);
  }, []);
  return null;
};

export default StoreTokenAndRedirect;
