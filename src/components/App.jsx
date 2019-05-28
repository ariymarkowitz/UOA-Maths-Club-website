import React from 'react';
import Particles from 'react-particles-js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Presentation from './presentation/Presentation';
import Attendance from './presentation/Attendance';
import FrontPage from './presentation/FrontPage';
import MathsPuzzle from './MathsPuzzle/MathsPuzzle';
import Editor from './PuzzleEditor/Editor';
import particleSettings from '../settings/particles.yaml';
import '../styles/index.css';
import MathsPuzzleSolution from './MathsPuzzle/MathsPuzzleSolution';

function App() {
  return (
    <BrowserRouter forceRefresh={false}>
      <div className="fullsize">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Presentation
                background={<Particles params={particleSettings} />}
                parallax={0.05}
                pages={[
                  ['front-page', <FrontPage />],
                  ['attendance', <Attendance />],
                  ['solution', <MathsPuzzleSolution />],
                  ['puzzles', <MathsPuzzle />]
                ]}
              />
            )}
          />
          <Route exact path="/edit" render={() => <Editor />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
