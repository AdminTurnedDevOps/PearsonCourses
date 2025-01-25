'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class CauseError extends Error {
  constructor(message, extra) {
    super(message);

    if (extra !== void 0 && 'cause' in extra) {
      this.cause = extra.cause;
    }
  }

}

exports['default'] = CauseError;
