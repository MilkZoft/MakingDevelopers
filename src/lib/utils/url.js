// Configuration
import { $app } from '../config';

// Utils
import { isDefined, isLanguage, isString } from './is';
import { exists } from './object';

/**
 * Return all the params from the url (splits slashes)
 *
 * @param {string} url Url Params with slashes (/es/blog/post-title)
 * @returns {array} Params as array
 */
export function getParamsFromUrl(url) {
  if (isString(url)) {
    const params = url.split('/');
    params.shift();

    return params;
  }

  return false;
}

export function getCurrentApp(url, dashboard) {
  const urlParams = getParamsFromUrl(url);
  const allowedApps = $app().allowed;

  if (dashboard) {
    return isLanguage(urlParams[0]) && isDefined(urlParams[2]) ? urlParams[2] : urlParams[1];
  }

  const currentApp = isLanguage(urlParams[0]) ? urlParams[1] : urlParams[0];

  return exists(currentApp, allowedApps) ? currentApp : $app().default;
}

export function getValueFromParam(param) {
  const value = param.replace('/', '');

  return value;
}

export function getPaginationPageFromParam(params) {
  return isDefined(params.action) && params.action === 'page' && isDefined(params[0])
    ? getValueFromParam(params[0])
    : 0;
}
