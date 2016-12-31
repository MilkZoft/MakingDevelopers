// Dependencies
import express from 'express';

// Servers
import backendServer from './backendServer';
import frontendServer from './frontendServer';

// Starting express application
const app = express();

frontendServer(app);
backendServer(app);
