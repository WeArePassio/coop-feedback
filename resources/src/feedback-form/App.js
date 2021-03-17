import React from 'react';
import {Redirect, Route, Switch, Link} from 'react-router-dom';

import coopLogo from '../img/coop-logo.svg';
import Intro from './Intro';
import MyJourney from './MyJourney';
import AboutMe from './AboutMe';

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
          <Route path='/intro'>
            <Intro />
          </Route>
          <Route path='/about-me'>
            <AboutMe />
          </Route>
          <Route path='/my-journey'>
            <MyJourney />
          </Route>
          <Redirect to='/intro' />
        </Switch>
      </main>
    </>
  );
}

export default App;
