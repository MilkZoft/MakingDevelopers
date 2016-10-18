// Utils
import { getParamsFromUrl } from './utils/url';

// Configuration
import { $languages } from './config';

/**
 * Returns languages like string: 'es|en'
 *
 * @returns {string} languages
 */
export function availableLanguages() {
  return $languages().list.join('|');
}

/**
 * Returns default language
 *
 * @returns {string} Default language
 */
export function defaultLanguage() {
  return $languages().default;
}

/**
 * Returns current language on the URL
 *
 * @param {string} url Current Url
 * @returns {string} Current language (en)
 */
export function getCurrentLanguage(url) {
  const params = getParamsFromUrl(url);

  return isLanguage(params[0]) ? params[0] : defaultLanguage();
}

/**
 * Returns current language as path on the URL
 *
 * @param {string} url Current Url
 * @returns {string} Current language path (/en)
 */
export function getLanguagePath(url) {
  const params = getParamsFromUrl(url);

  return isLanguage(params[0]) ? `/${params[0]}` : '';
}

/**
 * Checks if a given string is a valid language
 *
 * @param {string} lang Language
 * @returns {boolean} Returns true if is a valid language
 */
export function isLanguage(lang) {
  const currentLanguage = $languages().list.filter(language => {
    return language === lang;
  });

  return currentLanguage.length > 0;
}

/**
 * Loads a language json file
 *
 * @param {string} language Language
 * @returns {object} Language json
 */
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
