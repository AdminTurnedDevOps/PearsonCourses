'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');
var guards = require('../guards.js');
var emitCall = require('../templates/emit-call.js');
var scope = require('../templates/scope.js');

// Covers:
const IS_NOT_ZERO_DEPTH_IF_STATEMENT = builders.ifStatement(builders.binaryExpression('!==', scope['default'].depth, builders.numericLiteral(0)), builders.returnStatement());
var topLevelWildcard = ((nodes, tree, ctx) => {
  var _tree$traversalZones$;

  if (nodes.length !== 1 || !guards.isWildcardExpression(nodes[0]) || guards.isDeep(nodes[0])) {
    return false;
  }

  tree.push(builders.blockStatement([IS_NOT_ZERO_DEPTH_IF_STATEMENT, emitCall['default'](ctx.id, ctx.iterator.modifiers)]), 'tree-method');
  tree.push(builders.stringLiteral(ctx.id), 'traverse');
  (_tree$traversalZones$ = tree.traversalZones.create()) === null || _tree$traversalZones$ === void 0 ? void 0 : _tree$traversalZones$.resize().attach();
  return true;
});

exports['default'] = topLevelWildcard;
