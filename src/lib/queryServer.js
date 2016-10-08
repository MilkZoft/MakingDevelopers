import * as actions from '../actions/ServerActions';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import invariant from 'invariant';

const paramsToPayload = ({ path, params, success, error }) => ({ path, params, success, error });
const paramsToPayloadString = params => JSON.stringify(paramsToPayload(params));

let serverFetching = false;
let serverFetchingPromises = null;

export default function queryServer(Wrapped, mapPropsToParams) {
  return class FetchQuery extends Component {
    static contextTypes = {
      store: PropTypes.object // Redux store.
    };

    componentWillMount() {
      if (!serverFetching) {
        return;
      }

      this.fetch();
    }

    componentDidMount() {
      this.fetch();
    }

    componentDidUpdate(prevProps) {
      const prevParams = paramsToPayloadString(mapPropsToParams(prevProps));
      const params = paramsToPayloadString(mapPropsToParams(this.props));
      // Detect only params change is must to avoid loops.
      if (prevParams === params) {
        return;
      }

      this.fetch();
    }

    dispatch(props, callback) {
      const params = mapPropsToParams(props);

      if (!params.path) {
        return;
      }

      this.context.store.dispatch(({ fetch }) => {
        invariant(typeof params.path === 'string', 'Expected the path to be a string.');

        const ref = () => fetch(params.path, params.options).then(response => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }

          return response.json();
        })
        .then(response => {
          if (params.success) {
            params.success(response);
          }

          return response;
        });

        return {
          type: callback(ref, params),
          payload: paramsToPayload(params)
        };
      });
    }

    fetch() {
      this.dispatch(this.props, ref => {
        if (serverFetching) {
          serverFetchingPromises.push(ref());
        } else {
          ref();
        }

        return actions.SERVER_ON_QUERY;
      });
    }

    render() {
      return <Wrapped {...this.props} />;
    }
  };
}

export const asyncQueryServer = renderAppCallback => {
  /* eslint no-unsafe-finally: 0 */
  serverFetching = true;
  serverFetchingPromises = [];

  try {
    renderAppCallback();
  } catch (e) {
    /* eslint no-console: 0 */
    console.log(e);
  } finally {
    serverFetching = false;
    const promises = serverFetchingPromises.map(promise => promise.reflect());
    serverFetchingPromises = null;
    return Promise.all(promises);
  }
};
