import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

import StoreTokenAndRedirect from '../StoreTokenAndRedirect';
import Intro from './Intro';
import FinalSession from './FinalSession';
import MyJourney from '../MyJourney';
import Complete from '../../Complete';
import finish from '../../../img/finish.svg';

function End() {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/intro`}>
        <Intro />
      </Route>
      <Route exact path={`${path}/final-session`}>
        <FinalSession />
      </Route>
      <Route exact path={`${path}/my-journey`}>
        <MyJourney type='end' />
      </Route>
      <Route exact path={`${path}/complete`}>
        <Complete
          flagImg={finish}
          text='Thank you for taking the time to answer these questions. We hope that you learned a lot during your time on this Co-operative College course.'
        />
      </Route>
      <Route path={`${path}/:code`}>
        <StoreTokenAndRedirect to={`${path}/intro`} />
      </Route>
    </Switch>
  );
}

export default End;
