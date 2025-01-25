'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var iterator = require('../../codegen/iterator.js');
var index = require('../../parser/index.js');
var aggregateError = require('../../runtime/errors/aggregate-error.js');

function pickException([, ex]) {
  return ex;
}

function pickExpression([expression]) {
  return expression;
}

function parseExpressions(expressions, unsafe, hasFallback) {
  const mappedExpressions = [];
  const erroredExpressions = [];

  for (const expression of new Set(expressions)) {
    try {
      const parsed = index['default'](expression);

      if (unsafe === false && iterator['default'].analyze(parsed).bailed) {
        throw SyntaxError('Unsafe expressions are ignored, but no fallback was specified');
      }

      mappedExpressions.push([expression, parsed]);
    } catch (e) {
      erroredExpressions.push([expression, e]);
    }
  }

  if (!hasFallback && erroredExpressions.length > 0) {
    throw new aggregateError['default'](erroredExpressions.map(pickException), `Error parsing ${erroredExpressions.map(pickExpression).join(', ')}`);
  }

  return {
    erroredExpressions: erroredExpressions.map(pickExpression),
    mappedExpressions
  };
}

exports['default'] = parseExpressions;
