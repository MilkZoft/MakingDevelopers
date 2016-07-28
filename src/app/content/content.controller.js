import express from 'express';

import $config from '../../lib/config';
import contentModel from './content.model';
import utils from '../../lib/utils';

const router = express.Router();
const availableLanguages = $config().languages.list.join('|');

/**
 * Content
 */
router.get(`/:language(${availableLanguages}).json`, (req, res) => {
  contentModel.getContent({
    language: req.params.language
  }, (content) => {
    if (content) {
      res.send(utils.Object.buildContentJson(content));
    } else {
      res.redirect('/');
    }
  });
});

router.get(`/:language(${availableLanguages})`, (req, res) => {
  contentModel.getContent({
    language: req.params.language
  }, (content) => {
    if (content) {
      res.send(utils.Object.buildContentJson(content, true));
    } else {
      res.redirect('/');
    }
  });
});

export default router;
