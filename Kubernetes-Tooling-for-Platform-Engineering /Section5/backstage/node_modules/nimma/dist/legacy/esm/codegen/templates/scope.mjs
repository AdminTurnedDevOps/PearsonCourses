import { memberExpression, identifier } from '../ast/builders.mjs';

const SCOPE_IDENTIFIER = identifier('scope');
var scope = {
  _: SCOPE_IDENTIFIER,
  bail: memberExpression(SCOPE_IDENTIFIER, identifier('bail')),
  callbacks: memberExpression(SCOPE_IDENTIFIER, identifier('callbacks')),
  depth: memberExpression(SCOPE_IDENTIFIER, identifier('depth')),
  destroy: memberExpression(SCOPE_IDENTIFIER, identifier('destroy')),
  emit: memberExpression(SCOPE_IDENTIFIER, identifier('emit')),
  fork: memberExpression(SCOPE_IDENTIFIER, identifier('fork')),
  path: memberExpression(SCOPE_IDENTIFIER, identifier('path')),
  property: memberExpression(SCOPE_IDENTIFIER, identifier('property')),
  sandbox: memberExpression(SCOPE_IDENTIFIER, identifier('sandbox')),
  traverse: memberExpression(SCOPE_IDENTIFIER, identifier('traverse')),
  value: memberExpression(SCOPE_IDENTIFIER, identifier('value'))
};

export { scope as default };
