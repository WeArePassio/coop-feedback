import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import StoreTokenAndRedirect from './StoreTokenAndRedirect';
import {ProjectProvider} from './ProjectProvider';
import Beginning from './Beginning/Beginning';
import End from './End/End';
import Submissions from './Submissions';

function Project() {
  let {path} = useRouteMatch();
  return (
    <ProjectProvider>
      <Switch>
        <Route path={`${path}/beginning`}>
          <Beginning />
        </Route>
        <Route path={`${path}/end`}>
          <End />
        </Route>
        <Route exact path={`${path}/submissions`}>
          <Submissions />
        </Route>
        <Route path={`${path}/submissions/:code`}>
          <StoreTokenAndRedirect to={`${path}/submissions`} />
        </Route>
        <Redirect to={`${path}/beginning`} />
      </Switch>
    </ProjectProvider>
  );
}

export default Project;
