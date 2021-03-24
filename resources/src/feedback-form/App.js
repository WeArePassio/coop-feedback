import React from 'react';
import {Redirect, Route, Switch, Link} from 'react-router-dom';

import {QuestionsProvider} from './QuestionsProvider';
import {SubmissionProvider} from './SubmissionProvider';
import coopLogo from '../img/coop-logo.svg';
import Intro from './Intro';
import MyJourney from './MyJourney';
import AboutMe from './AboutMe';
import Complete from './Complete';
import Submissions from './Submissions';

function App() {
  return (
    <QuestionsProvider>
      <SubmissionProvider>
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
            <Route path='/complete'>
              <Complete />
            </Route>
            <Route path='/submissions'>
              <Submissions />
            </Route>
            <Redirect to='/intro' />
          </Switch>
        </main>
      </SubmissionProvider>
    </QuestionsProvider>
  );
}

export default App;
