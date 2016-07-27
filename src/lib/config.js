import env from './env';
import fs from 'fs';
import yaml from 'js-yaml';

/**
 * Returns the selected environment configuration
 *
 * @returns {object} Config object
 */
export default function getConfig() {
  const config = yaml.safeLoad(
    fs.readFileSync(`${__dirname}/../config/config.yml`, 'utf-8')
  );

  return config[env().name] || {};
}
