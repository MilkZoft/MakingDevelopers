import { $api } from '../config';

export function apiEndpoint(endpoint) {
  return `${$api().url}${endpoint}`;
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
