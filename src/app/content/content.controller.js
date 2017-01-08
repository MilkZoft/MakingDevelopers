// Dependencies
import express from 'express';

// Helpers
import { availableLanguages } from '../../lib/i18n';

// Utils
import { forEach, buildContentJson } from '../../lib/utils/object';

// Model
import { getContent } from './getContent.model';

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
 * Returns content in SQL
 */
Router.get('/content.sql', (req, res) => {
  res.profileAllowed(connectedUser => {
    getContent(false, (content) => {
      if (content) {
        let table = '';
        table += 'DROP TABLE IF EXISTS content; \n';
        table += 'CREATE TABLE content ( \n';
        table += '  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT, \n';
        table += '  name varchar(255) DEFAULT NULL, \n';
        table += '  value text NOT NULL, \n';
        table += '  language varchar(2) NOT NULL DEFAULT \'en\', \n';
        table += '  state varchar(25) NOT NULL DEFAULT \'Active\', \n';
        table += '  PRIMARY KEY (id) \n';
        table += ') ENGINE=InnoDB DEFAULT CHARSET=utf8; \n\n';

        let sql = `${table}INSERT INTO content (id, name, value, language, state) VALUES \n`;

        let id = 1;

        forEach(content, node => {
          sql += `(${id++}, '${node.name.trim()}', '${node.value}', '${node.language}', '${node.state}'), \n`;
        });

        return res.send(`${sql.slice(0, -3)};`);
      } else {
        return res.redirect('/');
      }
    });
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
