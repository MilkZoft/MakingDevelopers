// Dependencies
import express from 'express';

// Helpers
import { availableLanguages } from '../../lib/i18n';

// Utils
import { buildContentJson } from '../../lib/utils/object';

// Model
import { getContent } from './content.model';

// Express Router
const Router = express.Router();

/**
 * Returns content in JSon
 */
Router.get(`/:language(${availableLanguages()}).json`, (req, res) => {
  getContent({
    language: req.params.language
  }, (content) => {
    if (content) {
      return res.send(buildContentJson(content));
    } else {
      return res.redirect('/');
    }
  });
});

/**
 * Returns content in dot object notation
 */
Router.get(`/:language(${availableLanguages()})`, (req, res) => {
  getContent({
    language: req.params.language
  }, (content) => {
    if (content) {
      return res.send(buildContentJson(content, true));
    } else {
      return res.redirect('/');
    }
  });
});

export default Router;
