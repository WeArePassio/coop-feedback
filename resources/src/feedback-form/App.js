import React from 'react';
import {Redirect, Route, Switch, Link} from 'react-router-dom';

import coopLogo from '../img/coop-logo.svg';
import Links from './Links';
import Session from './Session/Session';
import Project from './Project/Project';

const Home = () => {
  return (
    <>
      <h1>Co-operative College</h1>
      <h2>About the Feedback Tool</h2>
      <p>
        This tool was co-designed with coaches and students to provide an easy way for students to
        submit feedback after sessions, and for the Co-operative College to use this feedback to
        improve projects.
      </p>

      <p>
        It allows coaches from Co-operative College to generate unique links for each cohort, which
        are used by:
        <ul>
          <li>Students: to leave feedback at the start and end of the project </li>
          <li>
            Students: to leave feedback at the end of each session, for the duration of the project{' '}
          </li>
          <li>
            Coaches: to view all feedback submitted, and compare submissions from the start/end of
            the project
          </li>
        </ul>
      </p>

      <h2>Generate Links (for coaches)</h2>
      <div>
        - <Link to='/links'>Generate Links for your Project Cohort</Link>
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
