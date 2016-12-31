// Dependencies
import 'babel-polyfill';
import Bluebird from 'bluebird';
import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

// Routes
import routes from './frontend/routes';

// Redux
import configureStore from './frontend/configureStore';

// Bluebird configuration
window.Promise = Bluebird;
Bluebird.config({ warnings: false });

window.addEventListener('unhandledrejection', error => {
  if (process.env.NODE_ENV === 'production') {
    error.preventDefault();
  } else {
    error.preventDefault();
    console.warn('Unhandled promise rejection warning.'); // eslint-disable-line no-console
  }
});

// Configuring redux store
const store = configureStore({
  initialState: window.initialState
});

// App container (div.id)
const app = document.querySelector('#App');

// Rendering the app
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  app
);
