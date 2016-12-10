// Dependencies
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';

// Routes
import routes from './routes';

// App container (div.id)
const app = document.querySelector('#App');

// Rendering the app
render(<Router history={browserHistory} routes={routes} />, app);
