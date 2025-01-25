"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortResults = exports.compareResults = exports.comparePosition = exports.prepareResults = void 0;
const computeResultFingerprint = (rule) => {
    let id = String(rule.code);
    if (rule.path.length > 0) {
        id += JSON.stringify(rule.path);
    }
    else {
        id += JSON.stringify(rule.range);
    }
    if (rule.source !== void 0) {
        id += rule.source;
    }
    if (rule.message !== void 0) {
        id += rule.message;
    }
    return id;
};
const prepareResults = (results) => {
    return (0, exports.sortResults)(deduplicateResults(results));
};
exports.prepareResults = prepareResults;
const deduplicateResults = (results) => {
    const fingerprints = new Set();
    return results.filter(result => {
        const fingerprint = computeResultFingerprint(result);
        if (fingerprints.has(fingerprint)) {
            return false;
        }
        fingerprints.add(fingerprint);
        return true;
    });
};
const compareCode = (left, right) => {
    if (left === void 0 && right === void 0) {
        return 0;
    }
    if (left === void 0) {
        return -1;
    }
    if (right === void 0) {
        return 1;
    }
    return String(left).localeCompare(String(right), void 0, { numeric: true });
};
const compareSource = (left, right) => {
    if (left === void 0 && right === void 0) {
        return 0;
    }
    if (left === void 0) {
        return -1;
    }
    if (right === void 0) {
        return 1;
    }
    return left.localeCompare(right);
};
const normalize = (value) => {
    if (value < 0) {
        return -1;
    }
    if (value > 0) {
        return 1;
    }
    return 0;
};
const comparePosition = (left, right) => {
    const diffLine = left.line - right.line;
    if (diffLine !== 0) {
        return normalize(diffLine);
    }
    const diffChar = left.character - right.character;
    return normalize(diffChar);
};
exports.comparePosition = comparePosition;
const compareResults = (left, right) => {
    const diffSource = compareSource(left.source, right.source);
    if (diffSource !== 0) {
        return normalize(diffSource);
    }
    const diffStart = (0, exports.comparePosition)(left.range.start, right.range.start);
    if (diffStart !== 0) {
        return diffStart;
    }
    const diffCode = compareCode(left.code, right.code);
    if (diffCode !== 0) {
        return normalize(diffCode);
    }
    const diffPath = left.path.join().localeCompare(right.path.join());
    return normalize(diffPath);
};
exports.compareResults = compareResults;
const sortResults = (results) => {
    return [...results].sort(exports.compareResults);
};
exports.sortResults = sortResults;
//# sourceMappingURL=results.js.map