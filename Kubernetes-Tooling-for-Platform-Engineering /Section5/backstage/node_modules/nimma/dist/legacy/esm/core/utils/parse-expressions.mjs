import Iterator from '../../codegen/iterator.mjs';
import parse from '../../parser/index.mjs';
import AggregateError from '../../runtime/errors/aggregate-error.mjs';

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
      const parsed = parse(expression);

      if (unsafe === false && Iterator.analyze(parsed).bailed) {
        throw SyntaxError('Unsafe expressions are ignored, but no fallback was specified');
      }

      mappedExpressions.push([expression, parsed]);
    } catch (e) {
      erroredExpressions.push([expression, e]);
    }
  }

  if (!hasFallback && erroredExpressions.length > 0) {
    throw new AggregateError(erroredExpressions.map(pickException), `Error parsing ${erroredExpressions.map(pickExpression).join(', ')}`);
  }

  return {
    erroredExpressions: erroredExpressions.map(pickExpression),
    mappedExpressions
  };
}

export { parseExpressions as default };
