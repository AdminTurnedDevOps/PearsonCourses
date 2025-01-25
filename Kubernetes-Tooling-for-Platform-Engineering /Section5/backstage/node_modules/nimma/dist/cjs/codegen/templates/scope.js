'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');

const SCOPE_IDENTIFIER = builders.identifier('scope');
var scope = {
  _: SCOPE_IDENTIFIER,
  bail: builders.memberExpression(SCOPE_IDENTIFIER, builders.identifier('bail')),
  callbacks: builders.memberExpression(SCOPE_IDENTIFIER, builders.identifier('callbacks')),
  depth: builders.memberExpression(SCOPE_IDENTIFIER, builders.identifier('depth')),
  destroy: builders.memberExpression(SCOPE_IDENTIFIER, builders.identifier('destroy')),
  emit: builders.memberExpression(SCOPE_IDENTIFIER, builders.identifier('emit')),
  fork: builders.memberExpression(SCOPE_IDENTIFIER, builders.identifier('fork')),
  path: builders.memberExpression(SCOPE_IDENTIFIER, builders.identifier('path')),
  property: builders.memberExpression(SCOPE_IDENTIFIER, builders.identifier('property')),
  sandbox: builders.memberExpression(SCOPE_IDENTIFIER, builders.identifier('sandbox')),
  traverse: builders.memberExpression(SCOPE_IDENTIFIER, builders.identifier('traverse')),
  value: builders.memberExpression(SCOPE_IDENTIFIER, builders.identifier('value'))
};

exports['default'] = scope;
