import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

import StoreTokenAndRedirect from '../StoreTokenAndRedirect';
import Intro from './Intro';
import AboutMe from './AboutMe';
import SkillsAndKnowledge from '../SkillsAndKnowledge';
import MyJourney from '../MyJourney';
import Complete from '../../Complete';
import start from '../../../img/start.svg';

function Beginning() {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/intro`}>
        <Intro />
      </Route>
      <Route exact path={`${path}/about-me`}>
        <AboutMe />
      </Route>
      <Route exact path={`${path}/skills-knowledge`}>
        <SkillsAndKnowledge />
      </Route>
      <Route exact path={`${path}/my-journey`}>
        <MyJourney type='beginning' />
      </Route>
      <Route exact path={`${path}/complete`}>
        <Complete
          flagImg={start}
          text='Thank you for taking the time to answer these questions. We will ask you to rate these topics again at the end of your journey so you can see how the course has helped you to improve. We hope you enjoy your time with the Co-operative College!'
        />
      </Route>
      <Route path={`${path}/:code`}>
        <StoreTokenAndRedirect to={`${path}/intro`} />
      </Route>
    </Switch>
  );
}

export default Beginning;
