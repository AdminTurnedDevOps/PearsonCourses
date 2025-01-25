'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
} from 'nimma/runtime';
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

class ESTree {
  #tree = builders.objectExpression([]);
  #shorthands = builders.objectExpression([]);
  #runtimeDependencies = new Set(['Scope']);
  #program = new Set();
  #body = new Set();
  #traverse = new Set();
  #availableShorthands;

  constructor({
    customShorthands,
    format,
    npmProvider
  }) {
    this.format = format;
    this.npmProvider = npmProvider;
    this.ctx = null;
    this.traversalZones = new traversalZones['default']();
    this.#availableShorthands = customShorthands;
  }

  addRuntimeDependency(specifier) {
    if (!this.#runtimeDependencies.has(specifier)) {
      this.#runtimeDependencies.add(specifier);
    }
  }

  attachFallbackExpressions(fallback, expressions) {
    this.push(fallbackExpressions['default'](fallback.attach(this), expressions), 'body');
  }

  attachCustomShorthand(name) {
    if (this.#availableShorthands === null || !(name in this.#availableShorthands)) {
      throw new ReferenceError(`Shorthand '${name}' is not defined`);
    }

    this.#shorthands.properties.push(builders.objectMethod('method', builders.identifier(name), fnParams['default'], builders.blockStatement([builders.returnStatement(jsep['default'](this.#availableShorthands[name]))])));
  }

  getMethodByHash(hash) {
    return this.#tree.properties.find(prop => prop.key.value === hash);
  }

  push(node, placement) {
    switch (placement) {
      case 'tree-method':
        this.#tree.properties.push(builders.objectMethod('method', builders.stringLiteral(this.ctx.id), fnParams['default'], node));
        break;

      case 'program':
        if (!this.#program.has(node)) {
          this.#program.add(node);
        }

        break;

      case 'body':
        if (!this.#body.has(node)) {
          this.#body.add(node);
        }

        break;

      case 'traverse':
        this.#traverse.add(treeMethodCall['default'](node.value));
        break;
    }
  }

  pushAll(items) {
    for (const item of items) {
      this.push(...item);
    }
  }

  toString() {
    const traversalZones = this.traversalZones.root;
    return dump['default'](builders.program([builders.importDeclaration([...this.#runtimeDependencies].map(dep => builders.importSpecifier(builders.identifier(dep), builders.identifier(dep))), builders.stringLiteral(`${this.npmProvider ?? ''}nimma/runtime`)), ...this.#program, traversalZones, this.#tree.properties.length === 0 ? null : builders.variableDeclaration('const', [builders.variableDeclarator(internalScope['default'].tree, this.#tree)]), this.#shorthands.properties.length === 0 ? null : builders.variableDeclaration('const', [builders.variableDeclarator(internalScope['default'].shorthands, this.#shorthands)]), builders.exportDefaultDeclaration(builders.functionDeclaration(null, params, builders.blockStatement([NEW_SCOPE_VARIABLE_DECLARATION, builders.tryStatement(builders.blockStatement([...this.#body, this.#traverse.size === 0 ? null : builders.expressionStatement(builders.callExpression(scope['default'].traverse, [builders.arrowFunctionExpression([], builders.blockStatement(Array.from(this.#traverse))), traversalZones === null ? builders.nullLiteral() : traversalZones.declarations[0].id]))].filter(Boolean)), null, builders.blockStatement([builders.expressionStatement(builders.callExpression(scope['default'].destroy, []))]))].filter(Boolean))))].filter(Boolean)));
  }

}

exports['default'] = ESTree;
