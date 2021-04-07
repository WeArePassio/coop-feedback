import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import Intro from './Intro';
import MyJourney from '../MyJourney';
import AboutMe from './AboutMe';
import Complete from '../../Complete';
import start from '../../../img/start.svg';

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
        <MyJourney type='beginning' />
      </Route>
      <Route path={`${path}/complete`}>
        <Complete
          flagImg={start}
          text='Thank you for taking the time to answer these questions. We will ask you to rate these topics again at the end of your journey so you can see how the course has helped you to improve. We hope you enjoy your time with the Co-operative College!'
        />
      </Route>
      <Redirect to={`${path}/intro`} />
    </Switch>
  );
}

export default Beginning;
