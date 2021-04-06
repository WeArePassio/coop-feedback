import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import {SessionProvider} from './SessionProvider';
import SessionFeedback from './SessionFeedback';
import Submissions from './Submissions';
import Complete from '../Complete';

const Session = () => {
  let {path} = useRouteMatch();
  return (
    <SessionProvider>
      <Switch>
        <Route exact path={`${path}/feedback`}>
          <SessionFeedback />
        </Route>
        <Route path={`${path}/complete`}>
          <Complete text='Thank you for taking the time to answer these questions. We will ask you to rate these topics again at the end of your journey so you can see how the course has helped you to improve. We hope you enjoy your time with the Co-operative College!' />
        </Route>
        <Route path={`${path}/submissions`}>
          <Submissions />
        </Route>
        <Redirect to={`${path}/feedback`} />
      </Switch>
    </SessionProvider>
  );
};

export default Session;
