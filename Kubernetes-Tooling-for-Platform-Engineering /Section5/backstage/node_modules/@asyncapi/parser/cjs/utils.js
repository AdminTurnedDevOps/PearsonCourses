"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveDeepData = exports.resolveServerUrl = exports.findSubArrayIndex = exports.untilde = exports.tilde = exports.createUncaghtDiagnostic = exports.toJSONPathArray = exports.hasRef = exports.isObject = exports.mergePatch = exports.setExtensionOnJson = exports.setExtension = exports.hasHintDiagnostic = exports.hasInfoDiagnostic = exports.hasWarningDiagnostic = exports.hasErrorDiagnostic = exports.normalizeInput = exports.getSemver = exports.createDetailedAsyncAPI = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
const types_1 = require("@stoplight/types");
function createDetailedAsyncAPI(parsed, input, source) {
    return {
        source,
        input,
        parsed,
        semver: getSemver(parsed.asyncapi),
    };
}
exports.createDetailedAsyncAPI = createDetailedAsyncAPI;
function getSemver(version) {
    const [major, minor, patchWithRc] = version.split('.');
    const [patch, rc] = patchWithRc.split('-rc');
    return {
        version,
        major: Number(major),
        minor: Number(minor),
        patch: Number(patch),
        rc: rc && Number(rc),
    };
}
exports.getSemver = getSemver;
function normalizeInput(asyncapi) {
    if (typeof asyncapi === 'string') {
        return asyncapi;
    }
    return JSON.stringify(asyncapi, undefined, 2);
}
exports.normalizeInput = normalizeInput;
function hasErrorDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === types_1.DiagnosticSeverity.Error);
}
exports.hasErrorDiagnostic = hasErrorDiagnostic;
function hasWarningDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === types_1.DiagnosticSeverity.Warning);
}
exports.hasWarningDiagnostic = hasWarningDiagnostic;
function hasInfoDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === types_1.DiagnosticSeverity.Information);
}
exports.hasInfoDiagnostic = hasInfoDiagnostic;
function hasHintDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === types_1.DiagnosticSeverity.Hint);
}
exports.hasHintDiagnostic = hasHintDiagnostic;
function setExtension(id, value, model) {
    const modelValue = model.json();
    setExtensionOnJson(id, value, modelValue);
}
exports.setExtension = setExtension;
function setExtensionOnJson(id, value, model) {
    if (typeof model === 'object' && model) {
        id = id.startsWith('x-') ? id : `x-${id}`;
        model[String(id)] = value;
    }
}
exports.setExtensionOnJson = setExtensionOnJson;
function mergePatch(origin, patch) {
    // If the patch is not an object, it replaces the origin.
    if (!isObject(patch)) {
        return patch;
    }
    const result = !isObject(origin)
        ? {} // Non objects are being replaced.
        : Object.assign({}, origin); // Make sure we never modify the origin.
    Object.keys(patch).forEach(key => {
        const patchVal = patch[key];
        if (patchVal === null) {
            delete result[key];
        }
        else {
            result[key] = mergePatch(result[key], patchVal);
        }
    });
    return result;
}
exports.mergePatch = mergePatch;
function isObject(value) {
    return Boolean(value) && typeof value === 'object' && Array.isArray(value) === false;
}
exports.isObject = isObject;
function hasRef(value) {
    return isObject(value) && '$ref' in value && typeof value.$ref === 'string';
}
exports.hasRef = hasRef;
function toJSONPathArray(jsonPath) {
    return splitPath(serializePath(jsonPath));
}
exports.toJSONPathArray = toJSONPathArray;
function createUncaghtDiagnostic(err, message, document) {
    if (!(err instanceof Error)) {
        return [];
    }
    const range = document ? document.getRangeForJsonPath([]) : spectral_core_1.Document.DEFAULT_RANGE;
    return [
        {
            code: 'uncaught-error',
            message: `${message}. Name: ${err.name}, message: ${err.message}, stack: ${err.stack}`,
            path: [],
            severity: types_1.DiagnosticSeverity.Error,
            range,
        }
    ];
}
exports.createUncaghtDiagnostic = createUncaghtDiagnostic;
function tilde(str) {
    return str.replace(/[~/]{1}/g, (sub) => {
        switch (sub) {
            case '/': return '~1';
            case '~': return '~0';
        }
        return sub;
    });
}
exports.tilde = tilde;
function untilde(str) {
    if (!str.includes('~'))
        return str;
    return str.replace(/~[01]/g, (sub) => {
        switch (sub) {
            case '~1': return '/';
            case '~0': return '~';
        }
        return sub;
    });
}
exports.untilde = untilde;
function findSubArrayIndex(arr, subarr, fromIndex = 0) {
    let i, found, j;
    for (i = fromIndex; i < 1 + (arr.length - subarr.length); ++i) {
        found = true;
        for (j = 0; j < subarr.length; ++j) {
            if (arr[i + j] !== subarr[j]) {
                found = false;
                break;
            }
        }
        if (found) {
            return i;
        }
    }
    return -1;
}
exports.findSubArrayIndex = findSubArrayIndex;
function resolveServerUrl(url) {
    // eslint-disable-next-line prefer-const
    let [maybeProtocol, maybeHost] = url.split('://');
    if (!maybeHost) {
        maybeHost = maybeProtocol;
    }
    const [host, ...pathnames] = maybeHost.split('/');
    if (pathnames.length) {
        return { host, pathname: `/${pathnames.join('/')}` };
    }
    return { host, pathname: undefined };
}
exports.resolveServerUrl = resolveServerUrl;
function retrieveDeepData(value, path) {
    let index = 0;
    const length = path.length;
    while (typeof value === 'object' && value && index < length) {
        value = value[path[index++]];
    }
    return index === length ? value : undefined;
}
exports.retrieveDeepData = retrieveDeepData;
function serializePath(path) {
    if (path.startsWith('#'))
        return path.substring(1);
    return path;
}
function splitPath(path) {
    return path.split('/').filter(Boolean).map(untilde);
}
