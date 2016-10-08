import App from './components/app/App';
import Blog from './components/blog/Blog';

import React from 'react';
import { IndexRoute, Route } from 'react-router';

export default function routesFactory(getState) {
  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={Blog} path="blog" />
      {/* <Route component={Page404} path="*" /> */}
    </Route>
  );
}
