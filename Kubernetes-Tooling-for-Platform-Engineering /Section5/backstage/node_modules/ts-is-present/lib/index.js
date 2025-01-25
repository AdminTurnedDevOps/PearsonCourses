"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasValueAtKey = exports.hasPresentKey = exports.isFilled = exports.isDefined = exports.isPresent = void 0;
function isPresent(t) {
    return t !== undefined && t !== null;
}
exports.isPresent = isPresent;
function isDefined(t) {
    return t !== undefined;
}
exports.isDefined = isDefined;
function isFilled(t) {
    return t !== null;
}
exports.isFilled = isFilled;
/**
 * Returns a function that can be used to filter down objects
 * to the ones that have a defined non-null value under the key `k`.
 *
 * @example
 * ```ts
 * const filesWithUrl = files.filter(file => file.url);
 * files[0].url // In this case, TS might still treat this as undefined/null
 *
 * const filesWithUrl = files.filter(hasPresentKey("url"));
 * files[0].url // TS will know that this is present
 * ```
 *
 * See https://github.com/microsoft/TypeScript/issues/16069
 * why is that useful.
 */
function hasPresentKey(k) {
    return function (a) {
        return a[k] !== undefined && a[k] !== null;
    };
}
exports.hasPresentKey = hasPresentKey;
/**
 * Returns a function that can be used to filter down objects
 * to the ones that have a specific value V under a key `k`.
 *
 * @example
 * ```ts
 * type File = { type: "image", imageUrl: string } | { type: "pdf", pdfUrl: string };
 * const files: File[] = [];
 *
 * const imageFiles = files.filter(file => file.type === "image");
 * files[0].type // In this case, TS will still treat it  as `"image" | "pdf"`
 *
 * const filesWithUrl = files.filter(hasValueKey("type", "image" as const));
 * files[0].type // TS will now know that this is "image"
 * files[0].imageUrl // TS will know this is present, because already it excluded the other union members.
 *
 * Note: the cast `as const` is necessary, otherwise TS will only know that type is a string.
 * ```
 *
 * See https://github.com/microsoft/TypeScript/issues/16069
 * why is that useful.
 */
function hasValueAtKey(k, v) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (a) {
        return a[k] === v;
    };
}
exports.hasValueAtKey = hasValueAtKey;
//# sourceMappingURL=index.js.map