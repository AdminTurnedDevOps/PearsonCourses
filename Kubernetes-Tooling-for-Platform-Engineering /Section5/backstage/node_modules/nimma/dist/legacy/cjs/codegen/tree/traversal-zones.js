'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var isObject = require('../../runtime/codegen-functions/is-object.js');
require('../../runtime/errors/aggregate-error.js');
var builders = require('../ast/builders.js');
var buildJson = require('../templates/build-json.js');

var _isDestroyed = /*#__PURE__*/new WeakMap();

var _zones = /*#__PURE__*/new WeakMap();

class TraversalZones {
  constructor() {
    _isDestroyed.set(this, {
      writable: true,
      value: false
    });

    _zones.set(this, {
      writable: true,
      value: []
    });
  }

  get root() {
    if (_rollupPluginBabelHelpers.classPrivateFieldGet(this, _isDestroyed) || _rollupPluginBabelHelpers.classPrivateFieldGet(this, _zones).length === 0) {
      return null;
    }

    const zonesIdentifier = builders.identifier('zones');
    return builders.variableDeclaration('const', [builders.variableDeclarator(zonesIdentifier, buildJson['default'](mergeZones(_rollupPluginBabelHelpers.classPrivateFieldGet(this, _zones))))]);
  }

  destroy() {
    _rollupPluginBabelHelpers.classPrivateFieldSet(this, _isDestroyed, true);
  }

  attach(zone) {
    _rollupPluginBabelHelpers.classPrivateFieldGet(this, _zones).push(zone);
  }

  create() {
    if (_rollupPluginBabelHelpers.classPrivateFieldGet(this, _isDestroyed)) {
      return null;
    }

    return new Zone(this);
  }

}

var _zones2 = /*#__PURE__*/new WeakMap();

var _localZones = /*#__PURE__*/new WeakMap();

var _relationships = /*#__PURE__*/new WeakMap();

class Zone {
  constructor(zones) {
    _zones2.set(this, {
      writable: true,
      value: void 0
    });

    _localZones.set(this, {
      writable: true,
      value: void 0
    });

    _relationships.set(this, {
      writable: true,
      value: void 0
    });

    _rollupPluginBabelHelpers.classPrivateFieldSet(this, _zones2, zones);

    this.root = {};

    _rollupPluginBabelHelpers.classPrivateFieldSet(this, _localZones, [this.root]);

    _rollupPluginBabelHelpers.classPrivateFieldSet(this, _relationships, new Map());
  }

  attach() {
    _rollupPluginBabelHelpers.classPrivateFieldGet(this, _zones2).attach(this.root);

    _rollupPluginBabelHelpers.classPrivateFieldGet(this, _relationships).clear();
  }

  expand(property) {
    let i = 0;

    for (const value of _rollupPluginBabelHelpers.classPrivateFieldGet(this, _localZones)) {
      if (value === null) continue;

      if (property === '**') {
        const parent = _rollupPluginBabelHelpers.classPrivateFieldGet(this, _relationships).get(value);

        if (parent !== void 0 && '*' in parent) {
          delete parent['*'];
          parent['**'] = null;
          continue;
        }

        value[property] = null;
      } else {
        value[property] = {};

        _rollupPluginBabelHelpers.classPrivateFieldGet(this, _relationships).set(value[property], value);
      }

      _rollupPluginBabelHelpers.classPrivateFieldGet(this, _localZones)[i++] = value[property];
    }

    return this;
  }

  expandMultiple(properties) {
    const root = _rollupPluginBabelHelpers.classPrivateFieldGet(this, _localZones)[0];

    if (root === null) {
      return this;
    }

    let i = 0;

    for (const property of properties) {
      root[property] = property === '**' ? null : {};

      if (_rollupPluginBabelHelpers.classPrivateFieldGet(this, _localZones).length < i) {
        _rollupPluginBabelHelpers.classPrivateFieldGet(this, _localZones).push(root[property]);
      } else {
        _rollupPluginBabelHelpers.classPrivateFieldGet(this, _localZones)[i++] = root[property];
      }
    }

    return this;
  }

  resize() {
    return this.expand('*');
  }

  allIn() {
    return this.expand('**');
  }

}

function pullAll(target) {
  return Object.keys(target).reduce((obj, key) => Object.assign(obj, target[key]), {});
}

function _mergeZones(target, source) {
  if ('*' in source) {
    const pulled = pullAll(target);

    _mergeZones(pulled, pullAll(source));

    target['*'] = '*' in pulled ? {
      '*': pulled['*']
    } : pulled;
  } else {
    for (const key of Object.keys(source)) {
      if (!(key in target)) {
        target[key] = source[key];
      } else if (isObject['default'](source[key])) {
        _mergeZones(target[key], source[key]);
      }
    }
  }
}

function mergeZones(zones) {
  const target = zones[0];

  for (let i = 1; i < zones.length; i++) {
    _mergeZones(target, zones[i]);
  }

  return target;
}

exports['default'] = TraversalZones;
