import React, { useEffect, useState, useRef } from 'react';
import Particles from 'react-particles-js';
import {
  BrowserRouter, Route, Switch, withRouter
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import particleSettings from '../settings/particles.yaml';
import '../styles/index.css';
import Attendance from './Attendance';
import Main from './Main';
import MathsPuzzle from './MathsPuzzle/MathsPuzzle';
import Editor from './PuzzleEditor/Editor';

const mod = n => x => ((x % n) + n) % n;

function App() {
  const [pages, setPages] = useState(['/', '/attendance', '/puzzle']);
  const [page, setPage] = useState(pages.findIndex(p => p === window.location.pathname));
  const [pageReq, _setPageReq] = useState(page);

  const router = useRef();

  const reqPage = (req) => {
    if (req !== pageReq) _setPageReq(req);
  };
  const reqPrevPage = () => reqPage(page - 1 |> mod(pages.length));
  const reqNextPage = () => reqPage(page + 1 |> mod(pages.length));

  // Handle changes in `pages`
  useEffect(() => {
    if (page >= pages.length) reqPage(page.length - 1);
  }, [pages]);

  // Change page using the arrow keys
  useEffect(() => {
    function keyDown(e) {
      if (e.key === 'ArrowLeft') reqPrevPage();
      else if (e.key === 'ArrowRight') reqNextPage();
    }

    document.addEventListener('keydown', keyDown);

    return () => document.removeEventListener('keydown', keyDown);
  }, [pages, page]);

  // Go to another page
  useEffect(() => {
    if (pageReq !== page) {
      router.current.history.replace(pages[pageReq]);
      setPage(pageReq);
    }
  }, [pageReq]);

  return (
    <BrowserRouter ref={router} forceRefresh={false}>
      <Particles
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
        params={particleSettings}
      />
      <Switch>
        <Route exact path="/edit">
          <Editor />
        </Route>
        <Route
          render={({ location }) => {
            const { pathname } = location;
            return (
              <TransitionGroup>
                <CSSTransition
                  key={pathname}
                  classNames="page"
                  timeout={{
                    enter: 700,
                    exit: 700
                  }}
                >
                  <Route
                    location={location}
                    render={() => (
                      <Switch>
                        <Route exact path="/">
                          <Main />
                        </Route>
                        <Route exact path="/attendance">
                          <Attendance />
                        </Route>
                        <Route exact path="/puzzle">
                          <MathsPuzzle />
                        </Route>
                        <Route>Error 404</Route>
                      </Switch>
                    )}
                  />
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
