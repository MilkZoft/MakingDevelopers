// Dependencies
import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import invariant from 'invariant';

// Constants
const SERVER_ON_QUERY = 'SERVER_ON_QUERY';
const paramsToPayload = ({ path, params, success, error }) => ({ path, params, success, error });
const paramsToPayloadString = params => JSON.stringify(paramsToPayload(params));

let serverFetching = false;
let serverFetchingPromises = null;

export default function httpBackend(Wrapped, mapsPropsToParams) {
  return class FetchQuery extends Component {
    static contextTypes = {
      store: PropTypes.object
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
      const prevParams = paramsToPayloadString(mapsPropsToParams(prevProps));
      const params = paramsToPayloadString(mapsPropsToParams(this.props));

      if (prevParams === params) {
        return;
      }

      this.fetch();
    }

    dispatch(props, callback) {
      const params = mapsPropsToParams(props);

      if (!params.path) {
        return;
      }

      this.context.store.dispatch(({ fetch }) => {
        invariant(typeof param.path === 'string', 'Expected the path to be a string.');

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
          serverFetchingPromise.push(ref());
        } else {
          ref();
        }

        return SERVER_ON_QUERY;
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
  serverFetchingPromise = [];

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
