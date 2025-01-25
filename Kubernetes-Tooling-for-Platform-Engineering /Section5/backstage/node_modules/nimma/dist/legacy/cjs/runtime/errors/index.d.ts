class ErrorWithCause extends Error {
  public readonly cause?: unknown;
}

export class ParserError extends ErrorWithCause {}
export class RuntimeError extends ErrorWithCause {}
