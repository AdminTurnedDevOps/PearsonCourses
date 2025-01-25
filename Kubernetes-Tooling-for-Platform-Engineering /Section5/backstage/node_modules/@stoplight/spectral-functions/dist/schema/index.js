"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const better_ajv_errors_1 = (0, tslib_1.__importDefault)(require("@stoplight/better-ajv-errors"));
const spectral_formats_1 = require("@stoplight/spectral-formats");
const ajv_1 = require("./ajv");
const ref_error_1 = (0, tslib_1.__importDefault)(require("ajv/dist/compile/ref_error"));
const spectral_core_1 = require("@stoplight/spectral-core");
const lodash_1 = require("lodash");
const optionSchemas_1 = require("../optionSchemas");
const instances = new WeakMap();
exports.default = (0, spectral_core_1.createRulesetFunction)({
    input: null,
    options: optionSchemas_1.optionSchemas.schema,
}, function schema(targetVal, opts, { path, rule, documentInventory }) {
    var _a, _b, _c;
    if (targetVal === void 0) {
        return [
            {
                path,
                message: `#{{print("property")}}must exist`,
            },
        ];
    }
    const assignAjvInstance = (_a = instances.get(documentInventory)) !== null && _a !== void 0 ? _a : instances.set(documentInventory, (0, ajv_1.createAjvInstances)()).get(documentInventory);
    const results = [];
    const { allErrors = false, schema: schemaObj } = opts;
    try {
        const dialect = (_b = (opts.dialect === void 0 || opts.dialect === 'auto' ? (0, spectral_formats_1.detectDialect)(schemaObj) : opts === null || opts === void 0 ? void 0 : opts.dialect)) !== null && _b !== void 0 ? _b : 'draft7';
        const validator = assignAjvInstance(schemaObj, dialect, allErrors);
        if ((validator === null || validator === void 0 ? void 0 : validator(targetVal)) === false && Array.isArray(validator.errors)) {
            (_c = opts.prepareResults) === null || _c === void 0 ? void 0 : _c.call(opts, validator.errors);
            results.push(...(0, better_ajv_errors_1.default)(schemaObj, validator.errors, {
                propertyPath: path,
                targetValue: targetVal,
            }).map(({ suggestion, error, path: errorPath }) => ({
                message: suggestion !== void 0 ? `${error}. ${suggestion}` : error,
                path: [...path, ...(errorPath !== '' ? errorPath.replace(/^\//, '').split('/') : [])],
            })));
        }
    }
    catch (ex) {
        if (!(0, lodash_1.isError)(ex)) {
            throw new Error('Unexpected error');
        }
        const ignoreError = (rule === null || rule === void 0 ? void 0 : rule.resolved) && ex instanceof ref_error_1.default;
        if (!ignoreError) {
            results.push({
                message: ex.message,
                path,
            });
        }
    }
    return results;
});
//# sourceMappingURL=index.js.map