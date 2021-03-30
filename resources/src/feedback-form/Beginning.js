import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import Intro from './Intro';
import MyJourney from './MyJourney';
import AboutMe from './AboutMe';
import Complete from './Complete';

function Beginning() {
  let {path} = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/intro`}>
        <Intro />
      </Route>
      <Route path={`${path}/about-me`}>
        <AboutMe />
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

export default Beginning;
