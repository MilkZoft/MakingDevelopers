import env from './env';
import fs from 'fs';
import yaml from 'js-yaml';

/**
 * Returns the selected environment configuration
 *
 * @param {string} environment Forcing the environment
 * @returns {object} Config
 */
export default function getConfig(environment) {
  const config = yaml.safeLoad(
    fs.readFileSync(`${__dirname}/../config/config.yml`, 'utf-8')
  );

  return environment && config[environment] || config[env().name] || {};
}
