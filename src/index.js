import 'babel-polyfill';
import Bluebird from 'bluebird';
import React from 'react';
import createEngine from 'redux-storage-engine-localstorage';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import routesFactory from './routesFactory';
import storeFactory from './storeFactory';

const app = document.querySelector('#app');

window.Promise = Bluebird;
Bluebird.config({ warnings: false });

window.addEventListener('unhandledrejection', error => {
  if (process.env.NODE_ENV === 'production') {
    error.preventDefault();
  } else {
    error.preventDefault();
    /* eslint no-console: 0 */
    console.warn('Unhandled promise rejection warning. You can fix it or ignore it.');
  }
});

const store = storeFactory({
  createEngine,
  initialState: window.__INITIAL_STATE__,
  platformMiddleware: [routerMiddleware(browserHistory)]
});
const history = syncHistoryWithStore(browserHistory, store);
const routes = routesFactory(store.getState);

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  app
);
