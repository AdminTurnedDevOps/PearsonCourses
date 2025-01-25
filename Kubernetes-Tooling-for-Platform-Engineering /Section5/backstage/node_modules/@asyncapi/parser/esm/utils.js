import { Document } from '@stoplight/spectral-core';
import { DiagnosticSeverity } from '@stoplight/types';
export function createDetailedAsyncAPI(parsed, input, source) {
    return {
        source,
        input,
        parsed,
        semver: getSemver(parsed.asyncapi),
    };
}
export function getSemver(version) {
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
export function normalizeInput(asyncapi) {
    if (typeof asyncapi === 'string') {
        return asyncapi;
    }
    return JSON.stringify(asyncapi, undefined, 2);
}
export function hasErrorDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === DiagnosticSeverity.Error);
}
export function hasWarningDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === DiagnosticSeverity.Warning);
}
export function hasInfoDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === DiagnosticSeverity.Information);
}
export function hasHintDiagnostic(diagnostics) {
    return diagnostics.some(diagnostic => diagnostic.severity === DiagnosticSeverity.Hint);
}
export function setExtension(id, value, model) {
    const modelValue = model.json();
    setExtensionOnJson(id, value, modelValue);
}
export function setExtensionOnJson(id, value, model) {
    if (typeof model === 'object' && model) {
        id = id.startsWith('x-') ? id : `x-${id}`;
        model[String(id)] = value;
    }
}
export function mergePatch(origin, patch) {
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
export function isObject(value) {
    return Boolean(value) && typeof value === 'object' && Array.isArray(value) === false;
}
export function hasRef(value) {
    return isObject(value) && '$ref' in value && typeof value.$ref === 'string';
}
export function toJSONPathArray(jsonPath) {
    return splitPath(serializePath(jsonPath));
}
export function createUncaghtDiagnostic(err, message, document) {
    if (!(err instanceof Error)) {
        return [];
    }
    const range = document ? document.getRangeForJsonPath([]) : Document.DEFAULT_RANGE;
    return [
        {
            code: 'uncaught-error',
            message: `${message}. Name: ${err.name}, message: ${err.message}, stack: ${err.stack}`,
            path: [],
            severity: DiagnosticSeverity.Error,
            range,
        }
    ];
}
export function tilde(str) {
    return str.replace(/[~/]{1}/g, (sub) => {
        switch (sub) {
            case '/': return '~1';
            case '~': return '~0';
        }
        return sub;
    });
}
export function untilde(str) {
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
export function findSubArrayIndex(arr, subarr, fromIndex = 0) {
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
export function resolveServerUrl(url) {
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
export function retrieveDeepData(value, path) {
    let index = 0;
    const length = path.length;
    while (typeof value === 'object' && value && index < length) {
        value = value[path[index++]];
    }
    return index === length ? value : undefined;
}
function serializePath(path) {
    if (path.startsWith('#'))
        return path.substring(1);
    return path;
}
function splitPath(path) {
    return path.split('/').filter(Boolean).map(untilde);
}
