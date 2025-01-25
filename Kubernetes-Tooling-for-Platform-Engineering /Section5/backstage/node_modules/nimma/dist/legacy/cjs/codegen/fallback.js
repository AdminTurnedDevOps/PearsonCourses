'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var builders = require('./ast/builders.js');

function safeName(name) {
  return `nimma_${name}`;
}

function safeIdentifier(name) {
  return builders.identifier(safeName(name));
}

function getFunctionBody(fn) {
  const source = Reflect.apply(Function.toString, fn, []);
  const paramsDefEnd = source.indexOf(')') + 1;
  const body = source.slice(paramsDefEnd).replace(/^\s*(=>\s*)?/, '');
  const arr = source.slice(source.indexOf('('), paramsDefEnd).split(/[,\s]+/).splice(0, 3);
  return `${arr.join(', ')} => ${body}`;
}

var _modules = /*#__PURE__*/new WeakMap();

var _deps = /*#__PURE__*/new WeakMap();

var _fn = /*#__PURE__*/new WeakMap();

var _extraCode = /*#__PURE__*/new WeakMap();

class Fallback {
  constructor(deps, fn) {
    _modules.set(this, {
      writable: true,
      value: new Set()
    });

    _deps.set(this, {
      writable: true,
      value: new Map()
    });

    _fn.set(this, {
      writable: true,
      value: void 0
    });

    _extraCode.set(this, {
      writable: true,
      value: ''
    });

    _rollupPluginBabelHelpers.defineProperty(this, "runtimeDeps", new Map());

    _rollupPluginBabelHelpers.classPrivateFieldSet(this, _fn, fn);

    for (const [source, specifiers] of Object.entries(deps)) {
      const importSpecifiers = [];

      for (const {
        imported,
        local,
        value
      } of specifiers) {
        _rollupPluginBabelHelpers.classPrivateFieldGet(this, _deps).set(local, value);

        this.runtimeDeps.set(safeName(local), value);
        importSpecifiers.push(builders.importSpecifier(safeIdentifier(local), builders.identifier(imported)));

        _rollupPluginBabelHelpers.classPrivateFieldGet(this, _modules).add(builders.importDeclaration(importSpecifiers, builders.stringLiteral(source)));
      }
    }
  }

  get extraCode() {
    _rollupPluginBabelHelpers.classPrivateFieldGet(this, _extraCode) || _rollupPluginBabelHelpers.classPrivateFieldSet(this, _extraCode, getFunctionBody(_rollupPluginBabelHelpers.classPrivateFieldGet(this, _fn)));
    return _rollupPluginBabelHelpers.classPrivateFieldGet(this, _extraCode);
  }

  attach(tree) {
    for (const mod of _rollupPluginBabelHelpers.classPrivateFieldGet(this, _modules)) {
      tree.push(mod, 'program');
    }

    const id = builders.identifier('fallback');
    const args = Array.from(_rollupPluginBabelHelpers.classPrivateFieldGet(this, _deps).keys());
    tree.push(builders.variableDeclaration('const', [builders.variableDeclarator(id, builders.callExpression(builders.memberExpression(builders.callExpression(builders.identifier('Function'), [builders.templateLiteral([builders.templateElement({
      raw: `return ${this.extraCode}`
    })], [])]), builders.identifier('call')), [builders.objectExpression(args.map(arg => builders.objectProperty(builders.stringLiteral(arg), safeIdentifier(arg))))]))]), 'program');
    return id;
  }

}

exports['default'] = Fallback;
