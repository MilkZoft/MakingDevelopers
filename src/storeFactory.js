import createLogger from 'redux-logger';
import isomorphicFetch from 'isomorphic-fetch';
import promiseMiddleware from 'redux-promise-middleware';
import shortid from 'shortid';
import storageDebounce from 'redux-storage-decorator-debounce';
import storageFilter from 'redux-storage-decorator-filter';

import appReducer from './reducers/AppReducer';
import { applyMiddleware, compose, createStore } from 'redux';
import { createMiddleware as createStorageMiddleware } from 'redux-storage';

// Config
import { $appName } from '../../lib/config';

const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function' ? action({ ...deps, dispatch, getState }) : action);
const isProduction = process.env.NODE_ENV === 'production';
const isBrowser = process.env.IS_BROWSER;
const enableLogger = !isProduction && isBrowser;
const enableDevToolsExtension = !isProduction && isBrowser && window.devToolsExtension;

export default function storeFactory(options) {
  const {
    createEngine,
    initialState,
    platformDeps = {},
    platformMiddleware = []
  } = options;

  const engineKey = `redux-storage:${$appName()}`;
  const engine = createEngine && createEngine(engineKey);

  const middleware = [
    ...platformMiddleware,
    injectMiddleware({
      ...platformDeps,
      engine,
      fetch: isomorphicFetch,
      getUid: () => shortid.generate(),
      now: () => Date.now()
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    })
  ];

  if (engine) {
    let decoratedEngine = storageFilter(engine);

    decoratedEngine = storageDebounce(decoratedEngine, 300);

    middleware.push(createStorageMiddleware(decoratedEngine));
  }

  if (enableLogger) {
    const logger = createLogger({
      collapsed: true,
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    });

    middleware.push(logger);
  }

  const resetOnLogout = reducer => (state, action) => {
    return reducer(state, action);
  };

  const createStoreWithMiddleware = enableDevToolsExtension
    ? compose(applyMiddleware(...middleware), window.devToolsExtension())
    : applyMiddleware(...middleware);

  const store = createStoreWithMiddleware(createStore)(
    resetOnLogout(appReducer),
    initialState
  );

  if (module.hot) {
    module.hot.accept('./reducers/AppReducer', () => {
      const nextAppReducer = require('./reducers/AppReducer');
      store.replaceReducer(resetOnLogout(nextAppReducer));
    });
  }

  return store;
}
