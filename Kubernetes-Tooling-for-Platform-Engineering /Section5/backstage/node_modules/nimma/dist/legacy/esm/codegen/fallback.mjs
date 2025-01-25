import { defineProperty as _defineProperty, classPrivateFieldSet as _classPrivateFieldSet, classPrivateFieldGet as _classPrivateFieldGet } from '../_virtual/_rollupPluginBabelHelpers.js';
import { importDeclaration, variableDeclaration, variableDeclarator, callExpression, objectExpression, objectProperty, memberExpression, identifier, templateLiteral, templateElement, importSpecifier, stringLiteral } from './ast/builders.mjs';

function safeName(name) {
  return `nimma_${name}`;
}

function safeIdentifier(name) {
  return identifier(safeName(name));
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

    _defineProperty(this, "runtimeDeps", new Map());

    _classPrivateFieldSet(this, _fn, fn);

    for (const [source, specifiers] of Object.entries(deps)) {
      const importSpecifiers = [];

      for (const {
        imported,
        local,
        value
      } of specifiers) {
        _classPrivateFieldGet(this, _deps).set(local, value);

        this.runtimeDeps.set(safeName(local), value);
        importSpecifiers.push(importSpecifier(safeIdentifier(local), identifier(imported)));

        _classPrivateFieldGet(this, _modules).add(importDeclaration(importSpecifiers, stringLiteral(source)));
      }
    }
  }

  get extraCode() {
    _classPrivateFieldGet(this, _extraCode) || _classPrivateFieldSet(this, _extraCode, getFunctionBody(_classPrivateFieldGet(this, _fn)));
    return _classPrivateFieldGet(this, _extraCode);
  }

  attach(tree) {
    for (const mod of _classPrivateFieldGet(this, _modules)) {
      tree.push(mod, 'program');
    }

    const id = identifier('fallback');
    const args = Array.from(_classPrivateFieldGet(this, _deps).keys());
    tree.push(variableDeclaration('const', [variableDeclarator(id, callExpression(memberExpression(callExpression(identifier('Function'), [templateLiteral([templateElement({
      raw: `return ${this.extraCode}`
    })], [])]), identifier('call')), [objectExpression(args.map(arg => objectProperty(stringLiteral(arg), safeIdentifier(arg))))]))]), 'program');
    return id;
  }

}

export { Fallback as default };
