import React from 'react';
import {Redirect, Route, Switch, Link} from 'react-router-dom';

import coopLogo from '../img/coop-logo.svg';
import Session from './Session/Session';
import Project from './Project/Project';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <p>
        (This screen will not exist when the tool is being used for real, it just makes testing
        easier!)
      </p>
      <div>
        <h2>Project</h2>
        <div>
          - <Link to='/project/beginning'>Beginning of Project - Feedback</Link>
        </div>
        <div>
          - <Link to='/project/end'>End of Project - Feedback</Link>
        </div>
        <div>
          - <Link to='/project/submissions'>View All Submissions</Link>
        </div>
      </div>
      <div>
        <h2>Session</h2>
        <div>
          - <Link to='/session'>Session - Feedback</Link>
        </div>
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
