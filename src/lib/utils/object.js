// NPM Dependencies
import dot from 'dot-object';

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

/**
 * Parses a given JSon string
 *
 * @param {string} str JSon String
 * @returns {object} JSON Object
 */
export function parseJson(str) {
  return JSON.parse(str);
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
