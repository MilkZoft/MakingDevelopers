// Dependencies
import 'babel-polyfill';
import Bluebird from 'bluebird';
import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

// Routes
import routes from './routes';

// Redux
import configureStore from './store/configureStore';

// Bluebird configuration
window.Promise = Bluebird;
Bluebird.config({ warnings: false });

window.addEventListener('unhandledrejection', error => {
  if (process.env.NODE_ENV === 'production') {
    error.preventDefault();
  } else {
    error.preventDefault();
    /* eslint-disable no-console */
    console.warn('Unhandled promise rejection warning. You can fix it or ignore it.');
    /* eslint-enable no-console */
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
