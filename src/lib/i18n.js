import { $languages } from './config';
import { getParamsFromUrl } from './utils/url';

export function availableLanguages() {
  return $languages().list.join('|');
}

export function defaultLanguage() {
  return $languages().default;
}

export function getCurrentLanguage(url) {
  const params = getParamsFromUrl(url);

  return isLanguage(params[0]) ? params[0] : defaultLanguage();
}

export function getLanguagePath(url) {
  const params = getParamsFromUrl(url);

  return isLanguage(params[0]) ? `/${params[0]}` : '';
}

export function isLanguage(lang) {
  const currentLanguage = $languages().list.filter(language => {
    return language === lang;
  });

  return currentLanguage.length > 0;
}

export function loadLanguage(language) {
  let content;

  if (isLanguage(language)) {
    try {
      content = require(`../content/i18n/${language}`);
    } catch (e) {
      content = require(`../content/i18n/${defaultLanguage()}`);
    }
  } else {
    content = require(`../content/i18n/${defaultLanguage()}`);
  }

  return content;
}
