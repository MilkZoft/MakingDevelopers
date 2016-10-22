// Configuration
import { $languages } from '../config';
import { exists } from './object';

/**
 * Validates if a given variable is an Array
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is array
 */
export function isArray(variable) {
  return variable instanceof Array;
}

/**
 * Validates if a given number is a valid day (01 to 31)
 *
 * @param {number} day Day
 * @returns {boolean} True if is a valid day
 */
export function isDay(day) {
  return isDefined(day) && isNumber(day) && day > 0 && day <= 31;
}

/**
 * Validates if a given variable is defined
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is defined
 */
export function isDefined(variable) {
  return typeof variable !== 'undefined' && variable !== null;
}

/**
 * Validates if a given variable is a function
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is function
 */
export function isFunction(variable) {
  return typeof variable === 'function';
}

/**
 * Validates if a given number is a valid hour (00 to 24)
 *
 * @param {number} hour Hour
 * @returns {boolean} True if is a valid hour
 */
export function isHour(hour) {
  return isDefined(hour) && hour.length === 2 && isNumber(hour) && hour <= 24;
}

/**
 * Validates if a given string is a valid json
 *
 * @param {mixed} str JSON String
 * @returns {boolean} True if is valid json
 */
export function isJson(str) {
  if (str === null) {
    return false;
  }

  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}

export function isLanguage(language) {
  return exists(language, $languages().list);
}

/**
 * Validates if a given number is a valid minute (00 to 60)
 *
 * @param {number} minute Minute
 * @returns {boolean} True if is a valid minute
 */
export function isMinute(minute) {
  return isDefined(minute) && minute.length === 2 && isNumber(minute) && minute <= 60;
}

/**
 * Validates if a given number is a valid month (01 to 12)
 *
 * @param {number} month Month
 * @returns {boolean} True if is a valid month
 */
export function isMonth(month) {
  return isDefined(month) && isNumber(month) && month > 0 && month <= 12;
}

/**
 * Validates if a given variable is a number
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is number
 */
export function isNumber(variable) {
  return !isNaN(variable);
}

/**
 * Validates if a given variable is an object
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is object
 */
export function isObject(variable) {
  return typeof variable === 'object';
}

/**
 * Validates if a given number is a valid second (00 to 60)
 *
 * @param {number} second Second
 * @returns {boolean} True if is a valid second
 */
export function isSecond(second) {
  return isDefined(second) && isNumber(second) && second > 0 && second <= 60;
}

/**
 * Validates if a given variable is a string
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is string
 */
export function isString(variable) {
  return typeof variable === 'string';
}

/**
 * Validates if a given variable is undefined
 *
 * @param {mixed} variable Variable
 * @returns {boolean} True if is undefined
 */
export function isUndefined(variable) {
  return typeof variable === 'undefined' || variable === null;
}

/**
 * Validates if a given number is a valid year (0001 to current year)
 *
 * @param {number} year Year
 * @returns {boolean} True if is a valid year
 */
export function isYear(year) {
  return isDefined(year) && year.length === 4 && isNumber(year);
}
