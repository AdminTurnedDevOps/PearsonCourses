function stringify(obj) {
    return JSON.stringify(obj, null, 2);
}
function formatSingleError(error) {
    return Object.assign(Object.assign({}, error), { message: error.message, stack: error.stack });
}
function handleSingleError(error) {
    if (error instanceof Error) {
        return formatSingleError(error);
    }
    return error;
}
export function formatError(error) {
    if (Array.isArray(error)) {
        return stringify({
            errors: error.map(e => handleSingleError(e)),
        });
    }
    return stringify({ errors: [handleSingleError(error)] });
}
export function formatResult(result) {
    return stringify(result);
}
//# sourceMappingURL=index.js.map