// NPM Dependencies
import dateFormat from 'date-format';

/**
 * Returns current day in 'dd' format
 *
 * @returns {string} Current day in 'dd' format
 */
export function day() {
  return dateFormat('dd', new Date());
}

/**
 * Returns current day in 'MM' format
 *
 * @returns {string} Current month in 'MM' format
 */
export function month() {
  return dateFormat('MM', new Date());
}

/**
 * Returns current date
 *
 * @returns {string} Datetime
 */
export function now() {
  return dateFormat(new Date());
}

/**
 * Returns current year in 'yyyy' format
 *
 * @returns {string} Current year in 'yyyy' format
 */
export function year() {
  return dateFormat('yyyy', new Date());
}
