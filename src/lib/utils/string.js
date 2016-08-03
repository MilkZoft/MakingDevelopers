// Local Dependencies
import { isDefined } from './is';

/**
 * Cleans a string from special characters
 *
 * @param {string} str String
 * @returns {string} Cleaned string.
 */
export function clean(str) {
  if (isDefined(str)) {
    return removeHTML(str).replace(/[`ª´·¨Ç~¿!#$%^&*()|+\-=?;'",<>\{\}\[\]\\]/gi, '');
  }

  return false;
}

/**
 * Escapes a string
 *
 * @param {string} str String
 * @returns {string} Escaped string.
 */
export function escapeString(str) {
  if (isDefined(str)) {
    return str
      .replace(/'/g, '\\\'')
      .replace(/"/g, '\\\\"')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  return false;
}

/**
 * Generates a random code
 *
 * @param {number} max Max Size
 * @param {string} charset Custom charset
 * @returns {string} Cleaned string.
 */
export function randomCode(max, charset) {
  let randomCode = '';
  let randomPoz;

  max = max || 12;
  charset = charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < max; i++) {
    randomPoz = Math.floor(Math.random() * charset.length);
    randomCode += charSet.substring(randomPoz, randomPoz + 1);
  }

  return randomCode;
}

/**
 * Removes HTML from string
 *
 * @param {string} str String
 * @returns {string} Cleaned string.
 */
export function removeHTML(str) {
  if (isDefined(str)) {
    return str.replace(/(<([^>]+)>)/ig, '');
  }

  return false;
}
