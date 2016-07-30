import env from './env';
import fs from 'fs';
import yaml from 'js-yaml';

let config;

/**
 * Returns the selected environment configuration
 *
 * @param {string} environment Forcing environment
 * @returns {object} Config
 */
export function $config(environment) {
  if (!config) {
    config = yaml.safeLoad(
      fs.readFileSync(`${__dirname}/../config/config.yml`, 'utf-8')
    );
  }

  return environment && config[environment] || config[env().name] || {};
}

export function $serverPort(env) {
  return $config(env).serverPort;
}

export function $baseUrl(env) {
  return $config(env).baseUrl;
}

export function $html(env) {
  return $config(env).html;
}

export function $languages(env) {
  return $config(env).languages;
}

export function $session(env) {
  return $config(env).session;
}

export function $security(env) {
  return $config(env).security;
}

export function $views(env) {
  return $config(env).views;
}

export function $db(env) {
  return $config(env).db;
}

export function $social(env) {
  return $config(env).social;
}
