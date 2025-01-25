'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var aggregateError = require('./errors/aggregate-error.js');
var proxyCallbacks = require('./proxy-callbacks.js');
var sandbox = require('./sandbox.js');
var traverse = require('./traverse.js');

var _parent = /*#__PURE__*/new WeakMap();

var _output = /*#__PURE__*/new WeakMap();

class Scope {
  constructor(root, callbacks, parent = null) {
    _parent.set(this, {
      writable: true,
      value: void 0
    });

    _output.set(this, {
      writable: true,
      value: void 0
    });

    this.root = root;

    _rollupPluginBabelHelpers.classPrivateFieldSet(this, _parent, parent);

    this.path = [];
    this.errors = [];
    this.sandbox = new sandbox.Sandbox(this.path, root, null);
    this.callbacks = proxyCallbacks['default'](callbacks, this.errors);
    const self = this;

    _rollupPluginBabelHelpers.classPrivateFieldSet(this, _output, {
      path: this.path,

      get value() {
        return self.value;
      }

    });
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
    var _this$sandbox$at;

    const fn = this.callbacks[id];

    if (pos === 0 && !withKeys) {
      return void fn(_rollupPluginBabelHelpers.classPrivateFieldGet(this, _output));
    }

    if (pos !== 0 && pos > this.depth + 1) {
      return;
    }

    const output = pos === 0 ? _rollupPluginBabelHelpers.classPrivateFieldGet(this, _output) : {
      path: _rollupPluginBabelHelpers.classPrivateFieldGet(this, _output).path.slice(0, Math.max(0, _rollupPluginBabelHelpers.classPrivateFieldGet(this, _output).path.length - pos)),
      value: ((_this$sandbox$at = this.sandbox.at(-pos - 1)) !== null && _this$sandbox$at !== void 0 ? _this$sandbox$at : this.sandbox.at(0)).value
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
