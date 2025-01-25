'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isObject = require('./codegen-functions/is-object.js');

function _traverseBody(key, curObj, scope, cb, deps) {
  const value = curObj[key];
  const pos = scope.enter(key);
  const matched = deps !== null && deps.length > 0 && !deps[0].fn(scope);

  if (deps === null || deps.length === 1 && matched) {
    cb(scope);
  }

  if (!isObject['default'](value)) ; else if (deps === null) {
    _traverse(value, scope, cb, deps);
  } else if (deps.length > 0) {
    if (matched) {
      _traverse(value, scope, cb, deps.slice(1));
    }

    if (deps[0].deep) {
      scope.exit(pos);
      scope.enter(key);

      _traverse(value, scope, cb, deps);
    }
  }

  scope.exit(pos);
}

function _traverse(curObj, scope, cb, deps) {
  if (Array.isArray(curObj)) {
    for (let i = 0; i < curObj.length; i++) {
      _traverseBody(i, curObj, scope, cb, deps);
    }
  } else {
    for (const key of Object.keys(curObj)) {
      _traverseBody(key, curObj, scope, cb, deps);
    }
  }
}

function traverse(cb) {
  _traverse(this.root, this, cb, null);
}
function bailedTraverse(cb, deps) {
  _traverse(this.value, this, cb, deps);
}
function zonedTraverse(cb, zones) {
  if (isSaneObject(this.root)) {
    zonesRegistry.set(this.root, zones);

    _traverse(new Proxy(this.root, traps), this, cb, null);
  } else {
    _traverse(this.root, this, cb, null);
  }
}
const zonesRegistry = new WeakMap();
const traps = {
  get(target, prop) {
    const value = target[prop];

    if (Array.isArray(target)) {
      if (prop === 'length') {
        return target.length;
      }

      const stored = zonesRegistry.get(target);

      if (prop in stored && isObject['default'](value)) {
        zonesRegistry.set(value, stored[prop]);
      }

      return value;
    }

    if (!isObject['default'](value)) {
      return value;
    }

    if (!isSaneObject(value)) {
      return value;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (isObject['default'](item)) {
          zonesRegistry.set(item, zonesRegistry.get(value));
        }
      }
    }

    const stored = zonesRegistry.get(value);
    return '**' in stored ? value : new Proxy(value, traps);
  },

  ownKeys(target) {
    const stored = zonesRegistry.get(target);
    zonesRegistry.delete(target);

    if ('*' in stored) {
      const actualKeys = Object.keys(target);

      for (const key of actualKeys) {
        const value = target[key];

        if (isObject['default'](value)) {
          zonesRegistry.set(value, stored['*']);
        }
      }

      return actualKeys;
    }

    const actualKeys = Object.keys(stored);

    for (let i = 0; i < actualKeys.length; i++) {
      const key = actualKeys[i];

      if (!Object.hasOwnProperty.call(target, key)) {
        actualKeys.splice(i, 1);
        i--;
        continue;
      }

      const value = target[key];

      if (isObject['default'](value)) {
        zonesRegistry.set(value, stored[key]);
      }
    }

    return actualKeys;
  }

};

function isSaneObject(object) {
  return !(Object.isFrozen(object) || Object.isSealed(object) || !Object.isExtensible(object));
}

exports.bailedTraverse = bailedTraverse;
exports.traverse = traverse;
exports.zonedTraverse = zonedTraverse;
