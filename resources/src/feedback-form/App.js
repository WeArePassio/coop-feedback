import React from 'react';

import '../normalize.css';
import '../app.css';
import coopLogo from '../img/coop-logo.svg';
import Intro from './Intro';
import MyJourney from './MyJourney';
import AboutMe from './AboutMe';

function App() {
  return (
    <>
      <header>
        <img src={coopLogo} alt='' />
      </header>
      <Intro />
      <AboutMe />
      <MyJourney />
    </>
  );
}

export default App;
