'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');
var guards = require('../guards.js');
var emitCall = require('../templates/emit-call.js');
var scope = require('../templates/scope.js');

// covers:
var deepSingleMember = ((nodes, tree, ctx) => {
  if (nodes.length !== 1 || !guards.isDeep(nodes[0]) || !guards.isMemberExpression(nodes[0])) {
    return false;
  }

  tree.push(builders.blockStatement([builders.ifStatement(builders.safeBinaryExpression('!==', scope['default'].property, builders.stringLiteral(nodes[0].value)), builders.returnStatement()), emitCall['default'](ctx.id, ctx.iterator.modifiers)]), 'tree-method');
  tree.push(builders.stringLiteral(ctx.id), 'traverse');
  return true;
});

exports['default'] = deepSingleMember;
