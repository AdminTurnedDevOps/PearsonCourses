import { memberExpression, identifier } from '../ast/builders.mjs';
import scope from './scope.mjs';

var sandbox = {
  at: memberExpression(scope.sandbox, identifier('at')),
  index: memberExpression(scope.sandbox, identifier('index')),
  parent: memberExpression(scope.sandbox, identifier('parent')),
  parentProperty: memberExpression(scope.sandbox, identifier('parentProperty')),
  parentValue: memberExpression(scope.sandbox, identifier('parentValue')),
  path: memberExpression(scope.sandbox, identifier('path')),
  property: memberExpression(scope.sandbox, identifier('property')),
  root: memberExpression(scope.sandbox, identifier('root')),
  value: memberExpression(scope.sandbox, identifier('value'))
};

export { sandbox as default };
