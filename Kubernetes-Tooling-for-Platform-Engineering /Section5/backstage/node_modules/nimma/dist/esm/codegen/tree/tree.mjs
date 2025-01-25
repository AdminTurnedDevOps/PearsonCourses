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
  #tree = objectExpression([]);
  #shorthands = objectExpression([]);
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
    this.traversalZones = new TraversalZones();
    this.#availableShorthands = customShorthands;
  }

  addRuntimeDependency(specifier) {
    if (!this.#runtimeDependencies.has(specifier)) {
      this.#runtimeDependencies.add(specifier);
    }
  }

  attachFallbackExpressions(fallback, expressions) {
    this.push(generateFallbackExpressions(fallback.attach(this), expressions), 'body');
  }

  attachCustomShorthand(name) {
    if (this.#availableShorthands === null || !(name in this.#availableShorthands)) {
      throw new ReferenceError(`Shorthand '${name}' is not defined`);
    }

    this.#shorthands.properties.push(objectMethod('method', identifier(name), fnParams, blockStatement([returnStatement(jsep(this.#availableShorthands[name]))])));
  }

  getMethodByHash(hash) {
    return this.#tree.properties.find(prop => prop.key.value === hash);
  }

  push(node, placement) {
    switch (placement) {
      case 'tree-method':
        this.#tree.properties.push(objectMethod('method', stringLiteral(this.ctx.id), fnParams, node));
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
        this.#traverse.add(treeMethodCall(node.value));
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
    return astring(program([importDeclaration([...this.#runtimeDependencies].map(dep => importSpecifier(identifier(dep), identifier(dep))), stringLiteral(`${this.npmProvider ?? ''}nimma/runtime`)), ...this.#program, traversalZones, this.#tree.properties.length === 0 ? null : variableDeclaration('const', [variableDeclarator(internalScope.tree, this.#tree)]), this.#shorthands.properties.length === 0 ? null : variableDeclaration('const', [variableDeclarator(internalScope.shorthands, this.#shorthands)]), exportDefaultDeclaration(functionDeclaration(null, params, blockStatement([NEW_SCOPE_VARIABLE_DECLARATION, tryStatement(blockStatement([...this.#body, this.#traverse.size === 0 ? null : expressionStatement(callExpression(scope.traverse, [arrowFunctionExpression([], blockStatement(Array.from(this.#traverse))), traversalZones === null ? nullLiteral() : traversalZones.declarations[0].id]))].filter(Boolean)), null, blockStatement([expressionStatement(callExpression(scope.destroy, []))]))].filter(Boolean))))].filter(Boolean)));
  }

}

export { ESTree as default };
