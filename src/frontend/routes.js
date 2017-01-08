// Dependencies
import React from 'react';
import { IndexRoute, Route } from 'react-router';

// Components
import App from './containers/App';
import Blog from './containers/Blog';
import Home from './containers/Home';
import Page404 from './containers/Page404';

export default (
  <Route component={App} path="/">
    {/* Index */}
    <IndexRoute component={Home} />
    <Route component={Home} path="/en" />
    <Route component={Home} path="/es" />

    {/* Blog Routes */}
    <Route component={Blog} path="/blog" />
    <Route component={Blog} path="/blog/:year/:month/:day/:slug" />
    <Route component={Blog} path="/:language/blog" />
    <Route component={Blog} path="/:language/blog/:year/:month/:day/:slug" />

    {/* 404 Error */}
    <Route component={Page404} path="*" />
  </Route>
);
