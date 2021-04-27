import React from 'react';
import {Redirect, Route, Switch, Link} from 'react-router-dom';

import coopLogo from '../img/coop-logo.svg';
import Links from './Links';
import Session from './Session/Session';
import Project from './Project/Project';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <h2>Generate Links</h2>
      <div>
        - <Link to='/links'>Generate Links for a Cohort (forms + view submissions)</Link>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <header>
        <Link to='/' className='authenticated-banner'>
          <img src={coopLogo} alt='' />
        </Link>
      </header>
      <main>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/links'>
            <Links />
          </Route>
          <Route path='/project'>
            <Project />
          </Route>
          <Route path='/session'>
            <Session />
          </Route>
          <Redirect to='/' />
        </Switch>
      </main>
    </>
  );
}

export default App;
