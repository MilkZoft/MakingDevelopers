// Dependencies
import isomorphicFetch from 'isomorphic-fetch';
import promiseMiddleware from 'redux-promise-middleware';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createStore, applyMiddleware } from 'redux';

// Reducers
import rootReducer from './reducers';

const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

export default function configureStore(options) {
  const { initialState = {} } = options;

  const middleware = [
    injectMiddleware({
      fetch: isomorphicFetch
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    }),
    reduxImmutableStateInvariant()
  ];

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
}
