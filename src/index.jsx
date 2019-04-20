import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';

ReactDOM.render(<App />, document.getElementById('react-container'));

if (module.hot) {
  module.hot.accept();
}
