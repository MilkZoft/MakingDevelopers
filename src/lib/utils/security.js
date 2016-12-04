// Dependencies
import crypto from 'crypto';

// Utils
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

/**
 * Generates a random code
 *
 * @param {number} max Max Size
 * @param {string} charset Custom charset
 * @returns {string} Cleaned string.
 */
export function randomCode(max, charset) {
  let randomCode = '';
  let randomPoz;

  max = max || 12;
  charset = charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < max; i++) {
    randomPoz = Math.floor(Math.random() * charset.length);
    randomCode += charset.substring(randomPoz, randomPoz + 1);
  }

  return randomCode;
}
