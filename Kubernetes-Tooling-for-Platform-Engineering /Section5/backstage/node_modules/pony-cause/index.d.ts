export class ErrorWithCause<T = undefined> extends Error {
    constructor(message: string, { cause }?: {
        cause?: T;
    } | undefined);
    cause: T;
}
export function findCauseByReference<T extends Error>(err: unknown, reference: new (...args: any[]) => T): T | undefined;
export function getErrorCause(err: Error | {
    cause?: unknown | (() => Error | {
        cause?: unknown | (() => Error | any);
    });
}): Error | undefined;
export function stackWithCauses(err: Error): string;
export function messageWithCauses(err: Error): string;
//# sourceMappingURL=index.d.ts.map