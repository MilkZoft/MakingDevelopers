// Dependencies
import fs from 'fs';
import yaml from 'js-yaml';

// Helpers
import env from './env';

/**
 * Config container
 */
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

export function $appName(env) {
  return $config(env).appName;
}

export function $dashboard(env) {
  return $config(env).dashboard;
}

/**
 * Returns baseUrl node
 *
 * @param {string} env Forcing environment
 * @returns {string} baseUrl
 */
export function $baseUrl(env) {
  return $config(env).baseUrl;
}

/**
 * Returns db node
 *
 * @param {string} env Forcing environment
 * @returns {object} db
 */
export function $db(env) {
  return $config(env).db;
}

/**
 * Returns html node
 *
 * @param {string} env Forcing environment
 * @returns {object} html
 */
export function $html(env) {
  return $config(env).html;
}

/**
 * Returns languages node
 *
 * @param {string} env Forcing environment
 * @returns {object} languages
 */
export function $languages(env) {
  return $config(env).languages;
}

/**
 * Returns security node
 *
 * @param {string} env Forcing environment
 * @returns {object} security
 */
export function $security(env) {
  return $config(env).security;
}

/**
 * Returns serverPort node
 *
 * @param {string} env Forcing environment
 * @returns {number} serverPort
 */
export function $serverPort(env) {
  return $config(env).serverPort;
}

/**
 * Returns session node
 *
 * @param {string} env Forcing environment
 * @returns {object} session
 */
export function $session(env) {
  return $config(env).session;
}

/**
 * Returns views node
 *
 * @param {string} env Forcing environment
 * @returns {object} views
 */
export function $views(env) {
  return $config(env).views;
}

/**
 * Returns social node
 *
 * @param {string} env Forcing environment
 * @returns {object} social
 */
export function $social(env) {
  return $config(env).social;
}

export function $webpack(env) {
  return $config(env).webpack;
}
