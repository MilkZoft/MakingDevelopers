import express from 'express';

import { getContent } from './content.model';
import { availableLanguages } from '../../lib/i18n';
import { buildContentJson } from '../../lib/utils/object';

const router = express.Router();

/**
 * Content
 */
router.get(`/:language(${availableLanguages()}).json`, (req, res) => {
  getContent({
    language: req.params.language
  }, (content) => {
    if (content) {
      res.send(buildContentJson(content));
    } else {
      res.redirect('/');
    }
  });
});

router.get(`/:language(${availableLanguages()})`, (req, res) => {
  getContent({
    language: req.params.language
  }, (content) => {
    if (content) {
      res.send(buildContentJson(content, true));
    } else {
      res.redirect('/');
    }
  });
});

export default router;
