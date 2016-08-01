import dot from 'dot-object';

export function buildContentJson(nodes, raw) {
  const row = {};

  nodes.forEach(node => {
    row[node.name] = node.value;
  });

  if (!raw) {
    dot.object(row);
  }

  return row;
}

export function parseJson(value) {
  return JSON.parse(value);
}

export function pick(key, obj) {
  return dot.pick(key, obj) || key;
}

export function stringify(value) {
  return JSON.stringify(value);
}
