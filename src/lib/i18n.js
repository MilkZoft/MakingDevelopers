import $config from './config';
import _ from 'lodash';
import utils from './utils';

export default {
  getCurrentLanguage: getCurrentLanguage,
  getLanguagePath: getLanguagePath,
  load: load
};

function getCurrentLanguage(url) {
  const params = utils.Url.getParamsFromUrl(url);

  return _.includes($config().languages.list, params[0])
    ? params[0]
    : $config().languages.default;
}

function getLanguagePath(url) {
  const params = utils.Url.getParamsFromUrl(url);

  return _.includes($config().languages.list, params[0])
    ? `/${params[0]}`
    : '';
}

function load(language) {
  let content;

  if (_.includes($config().languages.list, language)) {
    try {
      content = require(`../content/i18n/${language}`);
    } catch (e) {
      content = require(`../content/i18n/${$config().languages.default}`);
    }
  } else {
    content = require(`../content/i18n/${$config().languages.default}`);
  }

  return content;
}
