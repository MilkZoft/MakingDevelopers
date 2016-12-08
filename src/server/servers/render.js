// Dependencies
import 'babel-polyfill';
import Helmet from 'react-helmet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';
import userAgent from 'useragent';
import userAgentIsBrowser from 'user-agent-is-browser';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

// Components
import Html from './Html';

// Factories
import storeFactory from '../../storeFactory';
import routesFactory from '../../routesFactory';

// Helpers
import { asyncQueryServer } from '../../lib/queryServer';

// Config
import { $appName } from '../../lib/config';

const getDevice = req => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const isBrowser = userAgentIsBrowser(req.headers['user-agent']);
  const agent = userAgent.parse(req.headers['user-agent']);
  const host = `${protocol}://${req.headers.host}`;

  return {
    isBrowser,
    agent,
    host
  };
};

const getInitialState = (req) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const isBrowser = userAgentIsBrowser(req.headers['user-agent']);
  const agent = userAgent.parse(req.headers['user-agent']);
  const __ = req.res.locals.__;

  return {
    config: {
      appName: $appName()
    },
    language: {
      __
    },
    device: {
      host: `${protocol}://${req.headers.host}`,
      isBrowser,
      agent
    }
  };
};

const renderApp = (store, renderProps) => {
  const appHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  return { appHtml, helmet: Helmet.rewind() };
};

const getScriptHtml = (state, headers, hostname, vendorJsFilename, appJsFilename) =>
  `
    <script>
      window.__INITIAL_STATE__ = ${serialize(state)};
    </script>
    <script src="${appJsFilename}"></script>
  `;

const renderPage = (store, renderProps, req) => {
  const state = store.getState();
  const { headers, hostname } = req;
  const { appHtml, helmet } = renderApp(store, renderProps);
  const vendorJsFilename = 'vendor.js';
  const appCssFilename = 'css/style.css';
  const appJsFilename = 'bundle.js';
  const scriptsHtml = getScriptHtml(state, headers, hostname, vendorJsFilename, appJsFilename);
  const baseUrl = req.res.locals.baseUrl;

  const docHtml = ReactDOMServer.renderToStaticMarkup(
    <Html
      appCssFilename={appCssFilename}
      baseUrl={baseUrl}
      bodyHtml={`<div id="app">${appHtml}</div>${scriptsHtml}`}
      helmet={helmet}
    />
  );

  return `<!DOCTYPE html>${docHtml}`;
};

export default function render(req, res, next) {
  const initialState = getInitialState(req);
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = storeFactory({
    initialState,
    platformMiddleware: [routerMiddleware(memoryHistory)]
  });
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = routesFactory(store.getState);
  const location = req.url;

  match({ history, routes, location }, async (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);

      return;
    }

    if (error) {
      next(error);
      return;
    }

    try {
      const { isBrowser } = getDevice(req);

      if (!isBrowser) {
        await asyncQueryServer(() => renderApp(store, renderProps));
      }

      const html = await renderPage(store, renderProps, req);
      const status = renderProps.routes.some(route => route.path === '*') ? 404 : 200;

      res.status(status).send(html);
    } catch (e) {
      return next(e);
    }
  });
}
