import { $api, $baseUrl } from '../config';

export function apiFetch(endpoint, options) {
  const getPromise = async () => {
    try {
      const response = await fetch(apiEndpoint(endpoint), apiOptions(options));

      return response.json();
    } catch (e) {
      throw e;
    }
  };

  return getPromise();
}

export function apiEndpoint(endpoint) {
  if ($api().enable) {
    return `${$api().url}${endpoint}`;
  }

  return `${$baseUrl()}/content/data/${endpoint}.json`;
}

export function apiOptions(options = {}) {
  const {
    method = 'GET',
    headers = {
      'Content-Type': 'application/json'
    },
    body = false
  } = options;

  const newOptions = {
    method,
    headers
  };

  if (body) {
    newOptions.body = body;
  }

  return newOptions;
}
