import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import promiseMiddleware from 'redux-promise-middleware';
// import isomorphicFetch from 'isomorphic-fetch';

export default function configureStore(options) {
  const { initialState = {} } = options;

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      reduxImmutableStateInvariant(),
      promiseMiddleware({
        promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
      })
    )
  );
}
