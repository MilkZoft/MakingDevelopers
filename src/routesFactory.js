// Dependencies
import React from 'react';
import { IndexRoute, Route } from 'react-router';

// Components
import App from './components/App';
import Blog from './components/Blog';
import Home from './components/Home';
import Page404 from './components/Page404';

export default function routesFactory(getState) {
  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={Blog} path="blog" />
      <Route component={Page404} path="*" />
    </Route>
  );
}
