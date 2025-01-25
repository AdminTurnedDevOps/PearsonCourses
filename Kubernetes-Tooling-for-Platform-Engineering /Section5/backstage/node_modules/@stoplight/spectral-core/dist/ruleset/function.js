"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRulesetFunction = exports.RulesetFunctionValidationError = void 0;
const tslib_1 = require("tslib");
const ajv_1 = (0, tslib_1.__importDefault)(require("ajv"));
const ajv_formats_1 = (0, tslib_1.__importDefault)(require("ajv-formats"));
const ajv_errors_1 = (0, tslib_1.__importDefault)(require("ajv-errors"));
const spectral_runtime_1 = require("@stoplight/spectral-runtime");
const index_1 = require("./validation/index");
const lodash_1 = require("lodash");
const AggregateError = require("es-aggregate-error");
const ajv = new ajv_1.default({ allErrors: true, allowUnionTypes: true, strict: true, keywords: ['x-internal'] });
(0, ajv_errors_1.default)(ajv);
(0, ajv_formats_1.default)(ajv);
class RulesetFunctionValidationError extends index_1.RulesetValidationError {
    constructor(fn, error) {
        super('invalid-function-options', RulesetFunctionValidationError.printMessage(fn, error), RulesetFunctionValidationError.getPath(error));
    }
    static getPath(error) {
        const path = [
            'functionOptions',
            ...(error.instancePath === '' ? [] : error.instancePath.slice(1).split('/')),
        ];
        switch (error.keyword) {
            case 'additionalProperties': {
                const additionalProperty = error.params.additionalProperty;
                path.push(additionalProperty);
                break;
            }
        }
        return path;
    }
    static printMessage(fn, error) {
        var _a;
        switch (error.keyword) {
            case 'type': {
                const path = (0, spectral_runtime_1.printPath)(error.instancePath.slice(1).split('/'), spectral_runtime_1.PrintStyle.Dot);
                const values = Array.isArray(error.params.type) ? error.params.type.join(', ') : String(error.params.type);
                return `"${fn}" function and its "${path}" option accepts only the following types: ${values}`;
            }
            case 'required': {
                const missingProperty = error.params.missingProperty;
                const missingPropertyPath = error.instancePath === ''
                    ? missingProperty
                    : (0, spectral_runtime_1.printPath)([...error.instancePath.slice(1).split('/'), missingProperty], spectral_runtime_1.PrintStyle.Dot);
                return `"${fn}" function is missing "${missingPropertyPath}" option`;
            }
            case 'additionalProperties': {
                const additionalProperty = error.params.additionalProperty;
                const additionalPropertyPath = error.instancePath === ''
                    ? additionalProperty
                    : (0, spectral_runtime_1.printPath)([...error.instancePath.slice(1).split('/'), additionalProperty], spectral_runtime_1.PrintStyle.Dot);
                return `"${fn}" function does not support "${additionalPropertyPath}" option`;
            }
            case 'enum': {
                const path = (0, spectral_runtime_1.printPath)(error.instancePath.slice(1).split('/'), spectral_runtime_1.PrintStyle.Dot);
                const values = error.params.allowedValues.map(spectral_runtime_1.printValue).join(', ');
                return `"${fn}" function and its "${path}" option accepts only the following values: ${values}`;
            }
            default:
                return (_a = error.message) !== null && _a !== void 0 ? _a : 'unknown error';
        }
    }
}
exports.RulesetFunctionValidationError = RulesetFunctionValidationError;
const DEFAULT_OPTIONS_VALIDATOR = (o) => o === null;
function createRulesetFunction({ input, errorOnInvalidInput = false, options, }, fn) {
    const validateOptions = options === null ? DEFAULT_OPTIONS_VALIDATOR : ajv.compile(options);
    const validateInput = input !== null ? ajv.compile(input) : input;
    const wrappedFn = function (input, options, ...args) {
        var _a, _b, _c;
        if ((validateInput === null || validateInput === void 0 ? void 0 : validateInput(input)) === false) {
            if (errorOnInvalidInput) {
                return [
                    {
                        message: (_c = (_b = (_a = validateInput.errors) === null || _a === void 0 ? void 0 : _a.find(error => error.keyword === 'errorMessage')) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : 'invalid input',
                    },
                ];
            }
            return;
        }
        wrappedFn.validator(options);
        return fn(input, options, ...args);
    };
    Reflect.defineProperty(wrappedFn, 'name', { value: fn.name });
    const validOpts = new WeakSet();
    wrappedFn.validator = function (o) {
        if ((0, lodash_1.isObject)(o) && validOpts.has(o))
            return;
        if (validateOptions(o)) {
            if ((0, lodash_1.isObject)(o))
                validOpts.add(o);
            return;
        }
        if (options === null) {
            throw new index_1.RulesetValidationError('invalid-function-options', `"${fn.name || '<unknown>'}" function does not accept any options`, ['functionOptions']);
        }
        else if ('errors' in validateOptions &&
            Array.isArray(validateOptions.errors) &&
            validateOptions.errors.length > 0) {
            throw new AggregateError(validateOptions.errors.map(error => new RulesetFunctionValidationError(fn.name || '<unknown>', error)));
        }
        else {
            throw new index_1.RulesetValidationError('invalid-function-options', `"functionOptions" of "${fn.name || '<unknown>'}" function must be valid`, ['functionOptions']);
        }
    };
    Reflect.defineProperty(wrappedFn, 'schemas', {
        enumerable: false,
        value: {
            input,
            options,
        },
    });
    return wrappedFn;
}
exports.createRulesetFunction = createRulesetFunction;
//# sourceMappingURL=function.js.map