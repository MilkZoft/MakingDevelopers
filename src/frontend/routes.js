// Dependencies
import React from 'react';
import { IndexRoute, Route } from 'react-router';

// Components
import App from './components/App';
import About from './components/About';
import Courses from './components/Courses';
import Home from './components/Home';
import Page404 from './components/Page404';

export default (
  <Route component={App} path="/">
    <IndexRoute component={Home} />

    <Route component={About} path="about" />
    <Route component={Courses} path="courses" />
    <Route component={Page404} path="*" />
  </Route>
);
