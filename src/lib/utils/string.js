// Utils
import { isDefined, isString, isObject } from './is';
import { forEach } from './object';

export function capitalize(str) {
  return str && str[0].toUpperCase() + str.slice(1);
}

/**
 * Cleans a string from special characters
 *
 * @param {string} str String
 * @returns {string} Cleaned string.
 */
export function clean(str) {
  if (isDefined(str)) {
    return removeHTML(str).replace(/[`ª´·¨Ç~¿!#$%^&*()|+\=?;'",<>\{\}\[\]\\]/gi, '');
  }

  return false;
}

export function sanitize(data) {
  const sanitizedData = {};

  if (isString(data)) {
    return clean(data);
  } else if (isObject(data)) {
    forEach(data, (key) => {
      sanitizedData[key] = clean(data[key]);
    });
  }

  return sanitizedData;
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

export function addSlashes(str, doubleQuotesAlso) {
  if (isDefined(str)) {
    if (doubleQuotesAlso) {
      return str
        .replace(/'/g, '\\\'')
        .replace(/"/g, '\\\\"');
    }

    return str.replace(/'/g, '\\\'');
  }

  return false;
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

export function camelCase(str) {
  return str.replace(/^([A-Z])|[\s-_](\w)/g, (match, p1, p2, offset) => {
    if (p2) {
      return p2.toUpperCase();
    }

    return p1.toLowerCase();
  });
}
