'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');
var guards = require('../guards.js');
var emitCall = require('../templates/emit-call.js');

// covers:
var deepWildcard = ((nodes, tree, ctx) => {
  if (nodes.length !== 1 || !guards.isWildcardExpression(nodes[0]) || !guards.isDeep(nodes[0])) {
    return false;
  }

  tree.push(builders.blockStatement([emitCall['default'](ctx.id, ctx.iterator.modifiers)]), 'tree-method');
  tree.push(builders.stringLiteral(ctx.id), 'traverse');
  return true;
});

exports['default'] = deepWildcard;
