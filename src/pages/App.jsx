import React from 'react';
import Particles from 'react-particles-js';
import Reveal from '../components/Reveal';
import particleSettings from '../settings/particles.yaml';
import Slides from '../components/slides/Slides';

const App = () => (
  <Reveal
    backgroundElement={(
      <Particles
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        params={particleSettings}
      />
    )}
  >
    <Slides.Main />
    <Slides.Attendance />
    <Slides.MathPuzzle />
  </Reveal>
);

export default App;
