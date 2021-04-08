import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import './index.css';

// Opt-in to Webpack hot module replacement
if (module.hot) module.hot.accept();

ReactDOM.render(
  // React.createElement('div', null, `Complete Guide to Webpack Configuration for React`),
  <App />,
  document.getElementById('app'),
);
