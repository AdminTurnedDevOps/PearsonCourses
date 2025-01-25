import { withHandlers } from ".";
/**
 * Attaches a cleanup handler from and AsyncIterable to an AsyncIterable.
 *
 * @param source
 * @param target
 */
export function withHandlersFrom(
/** The source that should be returned with attached handlers. */
source, 
/**The target on which the return and throw methods should be called. */
target) {
    return withHandlers(source, () => { var _a; return (_a = target.return) === null || _a === void 0 ? void 0 : _a.call(target); }, err => { var _a; return (_a = target.throw) === null || _a === void 0 ? void 0 : _a.call(target, err); });
}
//# sourceMappingURL=withHandlersFrom.js.map