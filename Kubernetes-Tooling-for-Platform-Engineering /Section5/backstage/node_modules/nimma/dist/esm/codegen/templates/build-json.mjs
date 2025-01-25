import { nullLiteral, arrayExpression, objectExpression, objectProperty, stringLiteral, numericLiteral, booleanLiteral } from '../ast/builders.mjs';

function buildJson(input) {
  switch (typeof input) {
    case 'boolean':
      return booleanLiteral(input);

    case 'string':
      return stringLiteral(input);

    case 'number':
      return numericLiteral(input);

    case 'object':
      if (input === null) {
        return nullLiteral();
      }

      if (Array.isArray(input)) {
        return arrayExpression(input.map(buildJson));
      }

      return objectExpression(Object.keys(input).map(key => objectProperty(stringLiteral(key), buildJson(input[key]))));
  }
}

export { buildJson as default };
