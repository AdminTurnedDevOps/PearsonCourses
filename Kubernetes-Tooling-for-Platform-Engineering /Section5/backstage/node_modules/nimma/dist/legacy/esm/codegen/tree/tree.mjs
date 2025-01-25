import { classPrivateFieldSet as _classPrivateFieldSet, classPrivateFieldGet as _classPrivateFieldGet } from '../../_virtual/_rollupPluginBabelHelpers.js';
import jsep from '../../parser/jsep.mjs';
import { objectExpression, objectMethod, blockStatement, returnStatement, identifier, stringLiteral, program, importDeclaration, importSpecifier, variableDeclaration, variableDeclarator, exportDefaultDeclaration, functionDeclaration, tryStatement, expressionStatement, callExpression, arrowFunctionExpression, nullLiteral, newExpression } from '../ast/builders.mjs';
import astring from '../dump.mjs';
import generateFallbackExpressions from '../templates/fallback-expressions.mjs';
import fnParams from '../templates/fn-params.mjs';
import internalScope from '../templates/internal-scope.mjs';
import scope from '../templates/scope.mjs';
import treeMethodCall from '../templates/tree-method-call.mjs';
import TraversalZones from './traversal-zones.mjs';

const params = [identifier('input'), identifier('callbacks')];
const NEW_SCOPE_VARIABLE_DECLARATION = variableDeclaration('const', [variableDeclarator(scope._, newExpression(identifier('Scope'), params))]);
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
      value: objectExpression([])
    });

    _shorthands.set(this, {
      writable: true,
      value: objectExpression([])
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
    this.traversalZones = new TraversalZones();

    _classPrivateFieldSet(this, _availableShorthands, customShorthands);
  }

  addRuntimeDependency(specifier) {
    if (!_classPrivateFieldGet(this, _runtimeDependencies).has(specifier)) {
      _classPrivateFieldGet(this, _runtimeDependencies).add(specifier);
    }
  }

  attachFallbackExpressions(fallback, expressions) {
    this.push(generateFallbackExpressions(fallback.attach(this), expressions), 'body');
  }

  attachCustomShorthand(name) {
    if (_classPrivateFieldGet(this, _availableShorthands) === null || !(name in _classPrivateFieldGet(this, _availableShorthands))) {
      throw new ReferenceError(`Shorthand '${name}' is not defined`);
    }

    _classPrivateFieldGet(this, _shorthands).properties.push(objectMethod('method', identifier(name), fnParams, blockStatement([returnStatement(jsep(_classPrivateFieldGet(this, _availableShorthands)[name]))])));
  }

  getMethodByHash(hash) {
    return _classPrivateFieldGet(this, _tree).properties.find(prop => prop.key.value === hash);
  }

  push(node, placement) {
    switch (placement) {
      case 'tree-method':
        _classPrivateFieldGet(this, _tree).properties.push(objectMethod('method', stringLiteral(this.ctx.id), fnParams, node));

        break;

      case 'program':
        if (!_classPrivateFieldGet(this, _program).has(node)) {
          _classPrivateFieldGet(this, _program).add(node);
        }

        break;

      case 'body':
        if (!_classPrivateFieldGet(this, _body).has(node)) {
          _classPrivateFieldGet(this, _body).add(node);
        }

        break;

      case 'traverse':
        _classPrivateFieldGet(this, _traverse).add(treeMethodCall(node.value));

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
    return astring(program([importDeclaration([..._classPrivateFieldGet(this, _runtimeDependencies)].map(dep => importSpecifier(identifier(dep), identifier(dep))), stringLiteral(`${(_this$npmProvider = this.npmProvider) !== null && _this$npmProvider !== void 0 ? _this$npmProvider : ''}nimma/legacy/runtime`)), ..._classPrivateFieldGet(this, _program), traversalZones, _classPrivateFieldGet(this, _tree).properties.length === 0 ? null : variableDeclaration('const', [variableDeclarator(internalScope.tree, _classPrivateFieldGet(this, _tree))]), _classPrivateFieldGet(this, _shorthands).properties.length === 0 ? null : variableDeclaration('const', [variableDeclarator(internalScope.shorthands, _classPrivateFieldGet(this, _shorthands))]), exportDefaultDeclaration(functionDeclaration(null, params, blockStatement([NEW_SCOPE_VARIABLE_DECLARATION, tryStatement(blockStatement([..._classPrivateFieldGet(this, _body), _classPrivateFieldGet(this, _traverse).size === 0 ? null : expressionStatement(callExpression(scope.traverse, [arrowFunctionExpression([], blockStatement(Array.from(_classPrivateFieldGet(this, _traverse)))), traversalZones === null ? nullLiteral() : traversalZones.declarations[0].id]))].filter(Boolean)), null, blockStatement([expressionStatement(callExpression(scope.destroy, []))]))].filter(Boolean))))].filter(Boolean)));
  }

}

export { ESTree as default };
