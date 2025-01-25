"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeMetaGuard = void 0;
function isNonNullObject(value) {
    return typeof value === "object" && value != null;
}
function createTypeMetaGuard(meta) {
    return (value) => {
        return (isNonNullObject(value) &&
            value.apiVersion === meta.apiVersion &&
            value.kind === meta.kind);
    };
}
exports.createTypeMetaGuard = createTypeMetaGuard;
//# sourceMappingURL=meta.js.map