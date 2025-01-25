'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var jsep = require('../../parser/jsep.js');
var builders = require('../ast/builders.js');
var dump = require('../dump.js');
var fallbackExpressions = require('../templates/fallback-expressions.js');
var fnParams = require('../templates/fn-params.js');
var internalScope = require('../templates/internal-scope.js');
var scope = require('../templates/scope.js');
var treeMethodCall = require('../templates/tree-method-call.js');
var traversalZones = require('./traversal-zones.js');

const params = [builders.identifier('input'), builders.identifier('callbacks')];
const NEW_SCOPE_VARIABLE_DECLARATION = builders.variableDeclaration('const', [builders.variableDeclarator(scope['default']._, builders.newExpression(builders.identifier('Scope'), params))]);
/*
import {
 // deps
} from 'nimma/legacy/runtime';
// placement: tree
const tree = {};

// placement: program

export default function (input, callbacks) {
  const scope = new Scope(input, callbacks);

  try {
    // placement: body

    scope.traverse(() => {
      // placement: traverse
    });
  } finally {
    scope.destroy();
  }
}
*/

var _tree = /*#__PURE__*/new WeakMap();

var _shorthands = /*#__PURE__*/new WeakMap();

var _runtimeDependencies = /*#__PURE__*/new WeakMap();

var _program = /*#__PURE__*/new WeakMap();

var _body = /*#__PURE__*/new WeakMap();

var _traverse = /*#__PURE__*/new WeakMap();

var _availableShorthands = /*#__PURE__*/new WeakMap();

class ESTree {
  constructor({
    customShorthands,
    format,
    npmProvider
  }) {
    _tree.set(this, {
      writable: true,
      value: builders.objectExpression([])
    });

    _shorthands.set(this, {
      writable: true,
      value: builders.objectExpression([])
    });

    _runtimeDependencies.set(this, {
      writable: true,
      value: new Set(['Scope'])
    });

    _program.set(this, {
      writable: true,
      value: new Set()
    });

    _body.set(this, {
      writable: true,
      value: new Set()
    });

    _traverse.set(this, {
      writable: true,
      value: new Set()
    });

    _availableShorthands.set(this, {
      writable: true,
      value: void 0
    });

    this.format = format;
    this.npmProvider = npmProvider;
    this.ctx = null;
    this.traversalZones = new traversalZones['default']();

    _rollupPluginBabelHelpers.classPrivateFieldSet(this, _availableShorthands, customShorthands);
  }

  addRuntimeDependency(specifier) {
    if (!_rollupPluginBabelHelpers.classPrivateFieldGet(this, _runtimeDependencies).has(specifier)) {
      _rollupPluginBabelHelpers.classPrivateFieldGet(this, _runtimeDependencies).add(specifier);
    }
  }

  attachFallbackExpressions(fallback, expressions) {
    this.push(fallbackExpressions['default'](fallback.attach(this), expressions), 'body');
  }

  attachCustomShorthand(name) {
    if (_rollupPluginBabelHelpers.classPrivateFieldGet(this, _availableShorthands) === null || !(name in _rollupPluginBabelHelpers.classPrivateFieldGet(this, _availableShorthands))) {
      throw new ReferenceError(`Shorthand '${name}' is not defined`);
    }

    _rollupPluginBabelHelpers.classPrivateFieldGet(this, _shorthands).properties.push(builders.objectMethod('method', builders.identifier(name), fnParams['default'], builders.blockStatement([builders.returnStatement(jsep['default'](_rollupPluginBabelHelpers.classPrivateFieldGet(this, _availableShorthands)[name]))])));
  }

  getMethodByHash(hash) {
    return _rollupPluginBabelHelpers.classPrivateFieldGet(this, _tree).properties.find(prop => prop.key.value === hash);
  }

  push(node, placement) {
    switch (placement) {
      case 'tree-method':
        _rollupPluginBabelHelpers.classPrivateFieldGet(this, _tree).properties.push(builders.objectMethod('method', builders.stringLiteral(this.ctx.id), fnParams['default'], node));

        break;

      case 'program':
        if (!_rollupPluginBabelHelpers.classPrivateFieldGet(this, _program).has(node)) {
          _rollupPluginBabelHelpers.classPrivateFieldGet(this, _program).add(node);
        }

        break;

      case 'body':
        if (!_rollupPluginBabelHelpers.classPrivateFieldGet(this, _body).has(node)) {
          _rollupPluginBabelHelpers.classPrivateFieldGet(this, _body).add(node);
        }

        break;

      case 'traverse':
        _rollupPluginBabelHelpers.classPrivateFieldGet(this, _traverse).add(treeMethodCall['default'](node.value));

        break;
    }
  }

  pushAll(items) {
    for (const item of items) {
      this.push(...item);
    }
  }

  toString() {
    var _this$npmProvider;

    const traversalZones = this.traversalZones.root;
    return dump['default'](builders.program([builders.importDeclaration([..._rollupPluginBabelHelpers.classPrivateFieldGet(this, _runtimeDependencies)].map(dep => builders.importSpecifier(builders.identifier(dep), builders.identifier(dep))), builders.stringLiteral(`${(_this$npmProvider = this.npmProvider) !== null && _this$npmProvider !== void 0 ? _this$npmProvider : ''}nimma/legacy/runtime`)), ..._rollupPluginBabelHelpers.classPrivateFieldGet(this, _program), traversalZones, _rollupPluginBabelHelpers.classPrivateFieldGet(this, _tree).properties.length === 0 ? null : builders.variableDeclaration('const', [builders.variableDeclarator(internalScope['default'].tree, _rollupPluginBabelHelpers.classPrivateFieldGet(this, _tree))]), _rollupPluginBabelHelpers.classPrivateFieldGet(this, _shorthands).properties.length === 0 ? null : builders.variableDeclaration('const', [builders.variableDeclarator(internalScope['default'].shorthands, _rollupPluginBabelHelpers.classPrivateFieldGet(this, _shorthands))]), builders.exportDefaultDeclaration(builders.functionDeclaration(null, params, builders.blockStatement([NEW_SCOPE_VARIABLE_DECLARATION, builders.tryStatement(builders.blockStatement([..._rollupPluginBabelHelpers.classPrivateFieldGet(this, _body), _rollupPluginBabelHelpers.classPrivateFieldGet(this, _traverse).size === 0 ? null : builders.expressionStatement(builders.callExpression(scope['default'].traverse, [builders.arrowFunctionExpression([], builders.blockStatement(Array.from(_rollupPluginBabelHelpers.classPrivateFieldGet(this, _traverse)))), traversalZones === null ? builders.nullLiteral() : traversalZones.declarations[0].id]))].filter(Boolean)), null, builders.blockStatement([builders.expressionStatement(builders.callExpression(scope['default'].destroy, []))]))].filter(Boolean))))].filter(Boolean)));
  }

}

exports['default'] = ESTree;
