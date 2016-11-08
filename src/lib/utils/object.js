// Dependencies
import dot from 'dot-object';

// Utils
import { isArray, isDefined, isObject } from './is';

export function content(contentKey, __) {
  return pick(contentKey, __);
}

/**
 * Returns a JSON from a given JSON String dot notation (Node.child.grandchild)
 *
 * @param {array} nodes Content nodes
 * @param {boolean} raw Raw content
 * @returns {object} JSON Object
 */
export function buildContentJson(nodes, raw) {
  const rows = {};

  nodes.forEach(node => {
    rows[node.name] = node.value;
  });

  if (!raw) {
    dot.object(rows);
  }

  return rows;
}

export function ternary(condition, value1, value2) {
  if (!isDefined(value2)) {
    value2 = '';
  }

  return condition ? value1 : value2;
}

export function exists(element, obj) {
  if (isArray(obj)) {
    return obj.indexOf(element) !== -1;
  }

  return keys(obj).indexOf(element) !== -1;
}

export function forEach(obj, callback) {
  if (isDefined(obj) && isDefined(obj[0]) && isDefined(obj[0].Field)) {
    return obj.forEach(callback);
  } else if (isArray(obj)) {
    return obj.forEach(callback);
  }

  return keys(obj).forEach(callback);
}

export function keys(obj) {
  return isObject(obj) ? Object.keys(obj) : false;
}

/**
 * Parses a given JSon string
 *
 * @param {string} str JSon String
 * @returns {object} JSON Object
 */
export function parseJson(str) {
  return JSON.parse(str);
}

export function parseObject(obj) {
  return parseJson(stringify(obj));
}

/**
 * Return a value from a given dot notation string from object
 *
 * @param {string} key Dot notation key
 * @param {object} obj Object
 * @returns {mixed} Value
 */
export function pick(key, obj) {
  return dot.pick(key, obj) || key;
}

/**
 * Return a string from a given JSon
 *
 * @param {object} json JSon Object
 * @returns {string} JSon
 */
export function stringify(json) {
  return JSON.stringify(json);
}
