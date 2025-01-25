function isNonNullObject(value) {
    return typeof value === "object" && value != null;
}
export function createTypeMetaGuard(meta) {
    return (value) => {
        return (isNonNullObject(value) &&
            value.apiVersion === meta.apiVersion &&
            value.kind === meta.kind);
    };
}
//# sourceMappingURL=meta.mjs.map