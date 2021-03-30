import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import Intro from './Intro';
import FinalSession from './FinalSession';
import MyJourney from '../MyJourney';
import Complete from '../Complete';

function End() {
  let {path} = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/intro`}>
        <Intro />
      </Route>
      <Route path={`${path}/final-session`}>
        <FinalSession />
      </Route>
      <Route path={`${path}/my-journey`}>
        <MyJourney />
      </Route>
      <Route path={`${path}/complete`}>
        <Complete />
      </Route>
      <Redirect to={`${path}/intro`} />
    </Switch>
  );
}

export default End;
