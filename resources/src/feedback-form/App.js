import React from 'react';
import {Redirect, Route, Switch, Link} from 'react-router-dom';

import coopLogo from '../img/coop-logo.svg';
import Beginning from './Beginning/Beginning';
import End from './End/End';
import {QuestionsProvider} from './QuestionsProvider';
import {SubmissionProvider} from './SubmissionProvider';
import Submissions from './Submissions';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <div>
        - <Link to='/beginning'>Beginning</Link>
      </div>
      <div>
        - <Link to='/end'>End</Link>
      </div>
      <div>
        - <Link to='/submissions'>Submissions</Link>
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
        <QuestionsProvider>
          <SubmissionProvider>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/beginning'>
                <Beginning />
              </Route>
              <Route path='/end'>
                <End />
              </Route>
              <Route path='/submissions'>
                <SubmissionProvider>
                  <Submissions />
                </SubmissionProvider>
              </Route>
              <Redirect to='/' />
            </Switch>
          </SubmissionProvider>
        </QuestionsProvider>
      </main>
    </>
  );
}

export default App;
