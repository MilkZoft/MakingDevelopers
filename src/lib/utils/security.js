// NPM Dependencies
import crypto from 'crypto';

// Local Dependencies
import { isDefined } from './is';

// Configuration
import { $security } from './../config';

// Secret Salt
const salt = $security().secret;

/**
 * Encrypt a string with sha1 & md5
 *
 * @param {string} str String
 * @returns {string} Encrypted sha1 string
 */
export function encrypt(str) {
  return sha1(md5(str));
}

/**
 * Encrypt a string with md5
 *
 * @param {string} str String
 * @returns {string} Encrypted md5 string
 */
export function md5(str) {
  if (isDefined(str)) {
    return crypto
      .createHash('md5')
      .update(`${salt}${str.toString()}`)
      .digest('hex');
  }

  return false;
}

/**
 * Encrypt a string with sha1
 *
 * @param {string} str String
 * @returns {string} Encrypted sha1 string
 */
export function sha1(str) {
  if (isDefined(str)) {
    return crypto
      .createHash('sha1')
      .update(`${salt}${str.toString()}`)
      .digest('hex');
  }

  return false;
}
