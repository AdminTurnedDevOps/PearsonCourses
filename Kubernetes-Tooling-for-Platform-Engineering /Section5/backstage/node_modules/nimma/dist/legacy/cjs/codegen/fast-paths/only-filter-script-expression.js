'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsep = require('../../parser/jsep.js');
var builders = require('../ast/builders.js');
var generators = require('../baseline/generators.js');
var guards = require('../guards.js');
var emitCall = require('../templates/emit-call.js');
var scope = require('../templates/scope.js');

// covers:
const TOP_LEVEL_DEPTH_IF_STATEMENT = builders.ifStatement(builders.binaryExpression('!==', scope['default'].depth, builders.numericLiteral(0)), builders.returnStatement());
var onlyFilterScriptExpression = ((nodes, tree, ctx) => {
  if (nodes.length !== 1 || !guards.isScriptFilterExpression(nodes[0])) {
    return false;
  }

  const condition = builders.unaryExpression('!', generators.rewriteESTree(tree, jsep['default'](nodes[0].value), 0), true);
  tree.pushAll([[builders.blockStatement([...(guards.isDeep(nodes[0]) ? [] : [TOP_LEVEL_DEPTH_IF_STATEMENT]), builders.ifStatement(condition, builders.returnStatement()), emitCall['default'](ctx.id, ctx.iterator.modifiers)]), 'tree-method'], [builders.stringLiteral(ctx.id), 'traverse']]);

  if (!guards.isDeep(nodes[0])) {
    var _tree$traversalZones$;

    (_tree$traversalZones$ = tree.traversalZones.create()) === null || _tree$traversalZones$ === void 0 ? void 0 : _tree$traversalZones$.resize().attach();
  }

  return true;
});

exports['default'] = onlyFilterScriptExpression;
