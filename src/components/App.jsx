import React from 'react';
import Particles from 'react-particles-js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Presentation from './presentation/Presentation';
import Attendance from './presentation/Attendance';
import FrontPage from './presentation/FrontPage';
import Editor from './PuzzleEditor/Editor';
import particleSettings from '../settings/particles.yaml';
import '../styles/index.css';

function App() {
  return (
    <BrowserRouter forceRefresh={false}>
      <Particles
        className="background"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
        params={particleSettings}
      />
      <div className="fullsize">
        <Switch>
          <Route exact path="/edit" render={() => <Editor />} />
          <Route
            exact
            path="/"
            render={() => (
              <Presentation
                pages={[['front-page', <FrontPage />], ['attendance', <Attendance />]]}
              />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
