import { isDefined, isLanguage } from './is';

/**
 * Return all the params from the url (splits slashes)
 *
 * @param {string} params Url Params with slashes (/es/blog/post-title)
 * @returns {array} Params as array
 */
export function getParamsFromUrl(params) {
  params = params.split('/');
  params.shift();

  return params;
}

export function getCurrentApp(params, dashboard) {
  const urlParams = getParamsFromUrl(params);

  if (dashboard) {
    return isLanguage(urlParams[0]) && isDefined(urlParams[2]) ? urlParams[2] : urlParams[1];
  }

  return isLanguage(urlParams[0]) ? urlParams[1] : urlParams[0];
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
