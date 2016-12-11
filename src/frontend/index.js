// Dependencies
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';

// Routes
import routes from './routes';

// Redux
import configureStore from './store/configureStore';

// Configuring redux store
const store = configureStore();

// App container (div.id)
const app = document.querySelector('#App');

// Rendering the app
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  app
);
