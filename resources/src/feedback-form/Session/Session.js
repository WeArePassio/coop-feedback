import React, {useEffect} from 'react';
import {Route, Switch, useRouteMatch, useParams, useHistory} from 'react-router-dom';

import {SessionProvider, useSession} from './SessionProvider';
import SessionFeedback from './SessionFeedback';
import Submissions from './Submissions';
import Complete from '../Complete';
import StoreTokenAndRedirect from './StoreTokenAndRedirect';

import '../../session.css';

const Session = () => {
  let {path} = useRouteMatch();
  return (
    <SessionProvider>
      <Switch>
        <Route exact path={`${path}/feedback`}>
          <SessionFeedback />
        </Route>
        <Route exact path={`${path}/complete`}>
          <Complete text='Thank you for taking the time to answer these questions.' />
        </Route>
        <Route exact path={`${path}/submissions`}>
          <Submissions />
        </Route>
        <Route path={`${path}/submissions/:code`}>
          <StoreTokenAndRedirect to={`${path}/submissions`} />
        </Route>
        <Route path={`${path}/:code`}>
          <StoreTokenAndRedirect to={`${path}/feedback`} />
        </Route>
      </Switch>
    </SessionProvider>
  );
};

export default Session;
