'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');
var fnParams = require('./fn-params.js');
var internalScope = require('./internal-scope.js');

function treeMethodCall(id) {
  const property = builders.stringLiteral(id);
  return builders.expressionStatement(builders.callExpression(builders.memberExpression(internalScope['default'].tree, property, true), fnParams['default']));
}

exports['default'] = treeMethodCall;
