import { classPrivateFieldSet as _classPrivateFieldSet, classPrivateFieldGet as _classPrivateFieldGet } from '../_virtual/_rollupPluginBabelHelpers.js';
import isObject from './codegen-functions/is-object.mjs';

function printSegment(path, segment) {
  return path + `[${typeof segment === 'string' ? `'${segment}'` : segment}]`;
}

function dumpPath(path) {
  return `$${path.reduce(printSegment, '')}`;
}

var _history = /*#__PURE__*/new WeakMap();

var _path = /*#__PURE__*/new WeakMap();

var _value = /*#__PURE__*/new WeakMap();

var _parent = /*#__PURE__*/new WeakMap();

class Sandbox {
  constructor(path, root, history = null) {
    _parent.set(this, {
      get: _get_parent,
      set: void 0
    });

    _history.set(this, {
      writable: true,
      value: void 0
    });

    _path.set(this, {
      writable: true,
      value: void 0
    });

    _value.set(this, {
      writable: true,
      value: void 0
    });

    this.root = root;

    _classPrivateFieldSet(this, _path, path);

    _classPrivateFieldSet(this, _history, history !== null && history !== void 0 ? history : [[0, root]]);

    _classPrivateFieldSet(this, _value, void 0);
  }

  get path() {
    return dumpPath(_classPrivateFieldGet(this, _path));
  }

  get depth() {
    return _classPrivateFieldGet(this, _path).length - 1;
  }

  get value() {
    var _classPrivateFieldGet2;

    if (_classPrivateFieldGet(this, _value) !== void 0) {
      return _classPrivateFieldGet(this, _value);
    }

    return (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _value)) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : _classPrivateFieldSet(this, _value, _classPrivateFieldGet(this, _history)[_classPrivateFieldGet(this, _history).length - 1][1]);
  }

  get property() {
    return unwrapOrNull(_classPrivateFieldGet(this, _path), this.depth);
  }

  get parentValue() {
    var _classPrivateFieldGet3;

    return (_classPrivateFieldGet3 = _classPrivateFieldGet(this, _parent)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3[1];
  }

  get parentProperty() {
    var _classPrivateFieldGet4;

    return _classPrivateFieldGet(this, _path)[(_classPrivateFieldGet4 = _classPrivateFieldGet(this, _parent)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4[0]];
  }

  destroy() {
    _classPrivateFieldGet(this, _history).length = 0;
  }

  push() {
    const root = this.property !== null && isObject(this.value) ? this.value[this.property] : null;

    _classPrivateFieldGet(this, _history).push([_classPrivateFieldGet(this, _path).length, root]);

    _classPrivateFieldSet(this, _value, root);

    return this;
  }

  pop() {
    const length = Math.max(0, _classPrivateFieldGet(this, _path).length + 1);

    while (_classPrivateFieldGet(this, _history).length > length) {
      _classPrivateFieldGet(this, _history).pop();
    }

    _classPrivateFieldSet(this, _value, void 0);

    return this;
  }

  at(pos) {
    if (Math.abs(pos) > _classPrivateFieldGet(this, _history).length) {
      return null;
    }

    const actualPos = (pos < 0 ? _classPrivateFieldGet(this, _history).length : 0) + pos;

    const history = _classPrivateFieldGet(this, _history).slice(0, actualPos + 1);

    return new Sandbox(_classPrivateFieldGet(this, _path).slice(0, history[history.length - 1][0]), history[history.length - 1][1], history);
  }

}

function _get_parent() {
  if (_classPrivateFieldGet(this, _history).length < 3) {
    return void 0;
  }

  return _classPrivateFieldGet(this, _history)[_classPrivateFieldGet(this, _history).length - 3];
}

function unwrapOrNull(collection, pos) {
  return pos >= 0 && collection.length > pos ? collection[pos] : null;
}

export { Sandbox };
