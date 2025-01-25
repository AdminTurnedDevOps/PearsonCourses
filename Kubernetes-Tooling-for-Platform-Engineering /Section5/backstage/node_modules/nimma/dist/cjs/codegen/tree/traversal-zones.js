'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isObject = require('../../runtime/codegen-functions/is-object.js');
var builders = require('../ast/builders.js');
var buildJson = require('../templates/build-json.js');

class TraversalZones {
  #isDestroyed = false;
  #zones = [];

  get root() {
    if (this.#isDestroyed || this.#zones.length === 0) {
      return null;
    }

    const zonesIdentifier = builders.identifier('zones');
    return builders.variableDeclaration('const', [builders.variableDeclarator(zonesIdentifier, buildJson['default'](mergeZones(this.#zones)))]);
  }

  destroy() {
    this.#isDestroyed = true;
  }

  attach(zone) {
    this.#zones.push(zone);
  }

  create() {
    if (this.#isDestroyed) {
      return null;
    }

    return new Zone(this);
  }

}

class Zone {
  #zones;
  #localZones;
  #relationships;

  constructor(zones) {
    this.#zones = zones;
    this.root = {};
    this.#localZones = [this.root];
    this.#relationships = new Map();
  }

  attach() {
    this.#zones.attach(this.root);
    this.#relationships.clear();
  }

  expand(property) {
    let i = 0;

    for (const value of this.#localZones) {
      if (value === null) continue;

      if (property === '**') {
        const parent = this.#relationships.get(value);

        if (parent !== void 0 && '*' in parent) {
          delete parent['*'];
          parent['**'] = null;
          continue;
        }

        value[property] = null;
      } else {
        value[property] = {};
        this.#relationships.set(value[property], value);
      }

      this.#localZones[i++] = value[property];
    }

    return this;
  }

  expandMultiple(properties) {
    const root = this.#localZones[0];

    if (root === null) {
      return this;
    }

    let i = 0;

    for (const property of properties) {
      root[property] = property === '**' ? null : {};

      if (this.#localZones.length < i) {
        this.#localZones.push(root[property]);
      } else {
        this.#localZones[i++] = root[property];
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
