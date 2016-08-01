export function getParamsFromUrl(params) {
  params = params.split('/');
  params.shift();

  return params;
}
