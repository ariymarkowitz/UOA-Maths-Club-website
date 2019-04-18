import React from 'react';
import Particles from 'react-particles-js';
import particleSettings from '../src/settings/particles.json';
import Reveal from '../src/components/Reveal';
import Slides from '../src/components/slides/Slides';

export default function App() {
  return (
    <Reveal
      backgroundElement={
        <Particles
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute'
          }}
          params={particleSettings}
        />
      }
    >
      <Slides.Main />
      <Slides.Attendance />
      <Slides.MathPuzzle />
    </Reveal>
  );
}
