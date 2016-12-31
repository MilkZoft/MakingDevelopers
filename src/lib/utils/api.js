// Dependencies
import queryString from 'query-string';

// Config
import { $api, $baseUrl } from '../config';

export function apiFetch(endpoint, options, query = false) {
  let qs;

  if (query) {
    qs = queryString.stringify(query);
  }

  const getPromise = async () => {
    try {
      const response = await fetch(apiEndpoint(endpoint, qs), apiOptions(options));
      return response.json();
    } catch (e) {
      throw e;
    }
  };

  return getPromise();
}

export function apiEndpoint(endpoint, qs) {
  let query = '';

  if (qs) {
    query = `?${qs}`;
  }

  if ($api().enable) {
    return `${$api().url}${endpoint}${query}`;
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
