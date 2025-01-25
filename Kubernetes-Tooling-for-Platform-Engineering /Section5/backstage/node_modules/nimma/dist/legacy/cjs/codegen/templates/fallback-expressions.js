'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');
var scope = require('./scope.js');

function generateFallbackExpressions(fallback, expressions) {
  const path = builders.identifier('path');
  return builders.forOfStatement(builders.variableDeclaration('const', [builders.variableDeclarator(path)]), builders.arrayExpression(expressions.map(builders.stringLiteral)), builders.blockStatement([builders.callExpression(fallback, [builders.identifier('input'), path, builders.memberExpression(scope['default'].callbacks, path, true)])]));
}

exports['default'] = generateFallbackExpressions;
