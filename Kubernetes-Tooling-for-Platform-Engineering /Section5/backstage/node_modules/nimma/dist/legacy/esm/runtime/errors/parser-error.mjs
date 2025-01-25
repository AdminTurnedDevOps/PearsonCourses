import CauseError from './cause-error.mjs';

class ParserError extends CauseError {
  constructor(message, expression, extra) {
    super(message, extra);
    this.input = expression;
  }

}

export { ParserError as default };
