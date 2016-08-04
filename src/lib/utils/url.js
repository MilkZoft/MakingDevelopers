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
