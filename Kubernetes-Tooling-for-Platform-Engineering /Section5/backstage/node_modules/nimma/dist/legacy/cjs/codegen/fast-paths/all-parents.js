'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');
var emitCall = require('../templates/emit-call.js');
var sandbox = require('../templates/sandbox.js');

// covers:
const IS_OBJECT_IDENTIFIER = builders.identifier('isObject');
const IS_NOT_OBJECT_IF_STATEMENT = builders.ifStatement(builders.unaryExpression('!', builders.callExpression(IS_OBJECT_IDENTIFIER, [sandbox['default'].value])), builders.returnStatement());
const EMIT_ROOT_CALL_EXPRESSION = emitCall['default']('$..', {
  keyed: false,
  parents: 0
});
var allParents = ((nodes, tree, ctx) => {
  if (nodes.length !== 1 || nodes[0].type !== 'AllParentExpression') {
    return false;
  }

  tree.addRuntimeDependency(IS_OBJECT_IDENTIFIER.name);
  tree.push(builders.blockStatement([IS_NOT_OBJECT_IF_STATEMENT, emitCall['default'](ctx.id, ctx.iterator.modifiers)]), 'tree-method');
  tree.push(builders.stringLiteral(ctx.id), 'traverse');
  tree.push(EMIT_ROOT_CALL_EXPRESSION, 'body');
  return true;
});

exports['default'] = allParents;
