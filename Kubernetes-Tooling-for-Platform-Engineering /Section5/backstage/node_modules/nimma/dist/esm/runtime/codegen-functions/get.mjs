import isObject from './is-object.mjs';

function get(input, path) {
  if (path.length === 0 || !isObject(input)) return input;
  let value = input;

  for (const segment of path.slice(0, path.length - 1)) {
    value = value[segment];
    if (!isObject(value)) return;
  }

  return value[path[path.length - 1]];
}

export { get as default };
