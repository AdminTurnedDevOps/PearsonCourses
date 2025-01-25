'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');
var scope = require('./scope.js');

var sandbox = {
  at: builders.memberExpression(scope['default'].sandbox, builders.identifier('at')),
  index: builders.memberExpression(scope['default'].sandbox, builders.identifier('index')),
  parent: builders.memberExpression(scope['default'].sandbox, builders.identifier('parent')),
  parentProperty: builders.memberExpression(scope['default'].sandbox, builders.identifier('parentProperty')),
  parentValue: builders.memberExpression(scope['default'].sandbox, builders.identifier('parentValue')),
  path: builders.memberExpression(scope['default'].sandbox, builders.identifier('path')),
  property: builders.memberExpression(scope['default'].sandbox, builders.identifier('property')),
  root: builders.memberExpression(scope['default'].sandbox, builders.identifier('root')),
  value: builders.memberExpression(scope['default'].sandbox, builders.identifier('value'))
};

exports['default'] = sandbox;
