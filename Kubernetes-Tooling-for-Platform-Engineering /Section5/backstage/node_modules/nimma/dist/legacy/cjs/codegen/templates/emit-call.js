'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');
var scope = require('./scope.js');

function generateEmitCall(id, {
  parents,
  keyed
}) {
  // can emit check
  // todo: add check
  return builders.expressionStatement(builders.callExpression(scope['default'].emit, [builders.stringLiteral(id), builders.numericLiteral(parents), builders.booleanLiteral(keyed)]));
}

exports['default'] = generateEmitCall;
