export function getSelectedOperationName(prevOperations, prevSelectedOperationName, operations) {
    if (!operations || operations.length < 1) {
        return;
    }
    const names = operations.map(op => { var _a; return (_a = op.name) === null || _a === void 0 ? void 0 : _a.value; });
    if (prevSelectedOperationName && names.includes(prevSelectedOperationName)) {
        return prevSelectedOperationName;
    }
    if (prevSelectedOperationName && prevOperations) {
        const prevNames = prevOperations.map(op => { var _a; return (_a = op.name) === null || _a === void 0 ? void 0 : _a.value; });
        const prevIndex = prevNames.indexOf(prevSelectedOperationName);
        if (prevIndex !== -1 && prevIndex < names.length) {
            return names[prevIndex];
        }
    }
    return names[0];
}
//# sourceMappingURL=operation-name.js.map