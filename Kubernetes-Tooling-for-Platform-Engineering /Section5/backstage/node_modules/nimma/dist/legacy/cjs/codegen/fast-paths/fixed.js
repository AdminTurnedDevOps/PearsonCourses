'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');
var guards = require('../guards.js');
var emitCall = require('../templates/emit-call.js');
var sandbox = require('../templates/sandbox.js');
var scope = require('../templates/scope.js');
var treeMethodCall = require('../templates/tree-method-call.js');

// Examples
const VALUE_IDENTIFIER = builders.identifier('value');
const IS_OBJECT_IDENTIFIER = builders.identifier('isObject');
const GET_IDENTIFIER = builders.identifier('get');
const IS_NOT_OBJECT_IF_STATEMENT = builders.ifStatement(builders.unaryExpression('!', builders.callExpression(IS_OBJECT_IDENTIFIER, [VALUE_IDENTIFIER])), builders.returnStatement());
const IS_NULL_SCOPE_IF_STATEMENT = builders.ifStatement(builders.binaryExpression('===', scope['default']._, builders.nullLiteral()), builders.returnStatement());

function toLiteral(node) {
  return builders.literal(node.value);
}

var fixed = ((nodes, tree, ctx) => {
  if (!nodes.every(guards.isMemberExpression) || nodes.some(guards.isDeep)) {
    return false;
  }

  const valueVariableDeclaration = builders.variableDeclaration('const', [builders.variableDeclarator(VALUE_IDENTIFIER, nodes.slice(0, -1).reduce((object, node) => {
    if (tree.format === 'ES2018') {
      object.arguments[1].elements.push(builders.literal(node.value));
      return object;
    }

    return builders.memberExpression(object, builders.literal(node.value), true, true);
  }, tree.format === 'ES2018' && nodes.length > 0 ? builders.callExpression(builders.identifier('get'), [sandbox['default'].root, builders.arrayExpression([])]) : sandbox['default'].root))]);
  tree.addRuntimeDependency(IS_OBJECT_IDENTIFIER.name);

  if (tree.format === 'ES2018') {
    tree.addRuntimeDependency(GET_IDENTIFIER.name);
  }

  tree.pushAll([[builders.blockStatement([valueVariableDeclaration, IS_NOT_OBJECT_IF_STATEMENT, builders.expressionStatement(builders.assignmentExpression('=', scope['default']._, builders.callExpression(scope['default'].fork, [builders.arrayExpression(nodes.map(toLiteral))]))), IS_NULL_SCOPE_IF_STATEMENT, emitCall['default'](ctx.id, ctx.iterator.modifiers)]), 'tree-method'], [treeMethodCall['default'](ctx.id), 'body']]);
  return true;
});

exports['default'] = fixed;
