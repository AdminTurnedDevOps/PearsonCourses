'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aggregateError = require('./errors/aggregate-error.js');
var proxyCallbacks = require('./proxy-callbacks.js');
var sandbox = require('./sandbox.js');
var traverse = require('./traverse.js');

class Scope {
  #parent;
  #output;

  constructor(root, callbacks, parent = null) {
    this.root = root;
    this.#parent = parent;
    this.path = [];
    this.errors = [];
    this.sandbox = new sandbox.Sandbox(this.path, root, null);
    this.callbacks = proxyCallbacks['default'](callbacks, this.errors);
    const self = this;
    this.#output = {
      path: this.path,

      get value() {
        return self.value;
      }

    };
  }

  get depth() {
    return this.path.length - 1;
  }

  get property() {
    return this.sandbox.property;
  }

  get value() {
    return this.sandbox.value;
  }

  enter(key) {
    this.path.push(key);
    this.sandbox = this.sandbox.push();
    return this.path.length;
  }

  exit(depth) {
    const length = Math.max(0, depth - 1);

    while (this.path.length > length) {
      this.path.pop();
    }

    this.sandbox = this.sandbox.pop();
    return this.path.length;
  }

  fork(path) {
    const newScope = new Scope(this.root, this.callbacks, this);

    for (const segment of path) {
      newScope.enter(segment);

      if (newScope.value === void 0) {
        return null;
      }
    }

    return newScope;
  }

  traverse(fn, zones) {
    if (zones !== null) {
      traverse.zonedTraverse.call(this, fn, zones);
    } else {
      traverse.traverse.call(this, fn);
    }
  }

  bail(id, fn, deps) {
    const scope = this.fork(this.path);
    traverse.bailedTraverse.call(scope, fn, deps);
  }

  emit(id, pos, withKeys) {
    const fn = this.callbacks[id];

    if (pos === 0 && !withKeys) {
      return void fn(this.#output);
    }

    if (pos !== 0 && pos > this.depth + 1) {
      return;
    }

    const output = pos === 0 ? this.#output : {
      path: this.#output.path.slice(0, Math.max(0, this.#output.path.length - pos)),
      value: (this.sandbox.at(-pos - 1) ?? this.sandbox.at(0)).value
    };

    if (!withKeys) {
      fn(output);
    } else {
      fn({
        path: output.path,
        value: output.path.length === 0 ? void 0 : output.path[output.path.length - 1]
      });
    }
  }

  destroy() {
    this.path.length = 0;
    this.sandbox.destroy();
    this.sandbox = null;

    if (this.errors.length > 0) {
      throw new aggregateError['default'](this.errors, 'Error running Nimma');
    }
  }

}

exports['default'] = Scope;
