'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builders = require('../ast/builders.js');

function buildJson(input) {
  switch (typeof input) {
    case 'boolean':
      return builders.booleanLiteral(input);

    case 'string':
      return builders.stringLiteral(input);

    case 'number':
      return builders.numericLiteral(input);

    case 'object':
      if (input === null) {
        return builders.nullLiteral();
      }

      if (Array.isArray(input)) {
        return builders.arrayExpression(input.map(buildJson));
      }

      return builders.objectExpression(Object.keys(input).map(key => builders.objectProperty(builders.stringLiteral(key), buildJson(input[key]))));
  }
}

exports['default'] = buildJson;
