"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedOperationName = void 0;
function getSelectedOperationName(prevOperations, prevSelectedOperationName, operations) {
    if (!operations || operations.length < 1) {
        return;
    }
    var names = operations.map(function (op) { var _a; return (_a = op.name) === null || _a === void 0 ? void 0 : _a.value; });
    if (prevSelectedOperationName && names.includes(prevSelectedOperationName)) {
        return prevSelectedOperationName;
    }
    if (prevSelectedOperationName && prevOperations) {
        var prevNames = prevOperations.map(function (op) { var _a; return (_a = op.name) === null || _a === void 0 ? void 0 : _a.value; });
        var prevIndex = prevNames.indexOf(prevSelectedOperationName);
        if (prevIndex !== -1 && prevIndex < names.length) {
            return names[prevIndex];
        }
    }
    return names[0];
}
exports.getSelectedOperationName = getSelectedOperationName;
//# sourceMappingURL=operation-name.js.map