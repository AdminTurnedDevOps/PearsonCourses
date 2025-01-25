"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const tslib_1 = require("tslib");
const ajv_1 = (0, tslib_1.__importStar)(require("ajv"));
const names_1 = (0, tslib_1.__importDefault)(require("ajv/dist/compile/names"));
const ajv_formats_1 = (0, tslib_1.__importDefault)(require("ajv-formats"));
const ajv_errors_1 = (0, tslib_1.__importDefault)(require("ajv-errors"));
const ruleSchema = (0, tslib_1.__importStar)(require("../meta/rule.schema.json"));
const shared = (0, tslib_1.__importStar)(require("../meta/shared.json"));
const rulesetSchema = (0, tslib_1.__importStar)(require("../meta/ruleset.schema.json"));
const jsExtensions = (0, tslib_1.__importStar)(require("../meta/js-extensions.json"));
const jsonExtensions = (0, tslib_1.__importStar)(require("../meta/json-extensions.json"));
const alias_1 = require("./validators/alias");
const function_1 = require("./validators/function");
const validators = {
    js: null,
    json: null,
};
function createValidator(format) {
    const existingValidator = validators[format];
    if (existingValidator !== null) {
        return existingValidator;
    }
    const ajv = new ajv_1.default({
        allErrors: true,
        strict: true,
        strictRequired: false,
        keywords: ['$anchor'],
        schemas: [ruleSchema, shared],
        passContext: true,
    });
    (0, ajv_formats_1.default)(ajv);
    (0, ajv_errors_1.default)(ajv);
    ajv.addKeyword({
        keyword: 'x-spectral-runtime',
        schemaType: 'string',
        error: {
            message(cxt) {
                var _a;
                return (0, ajv_1._) `${((_a = cxt.params) === null || _a === void 0 ? void 0 : _a.message) !== void 0 ? cxt.params.message : ''}`;
            },
            params(cxt) {
                var _a;
                return (0, ajv_1._) `{ errors: ${((_a = cxt.params) === null || _a === void 0 ? void 0 : _a.errors) !== void 0 && cxt.params.errors} || [] }`;
            },
        },
        code(cxt) {
            const { data } = cxt;
            switch (cxt.schema) {
                case 'format':
                    cxt.fail((0, ajv_1._) `typeof ${data} !== "function"`);
                    break;
                case 'ruleset-function': {
                    const fn = cxt.gen.const('spectralFunction', (0, ajv_1._) `this.validateFunction(${data}.function, ${data}.functionOptions === void 0 ? null : ${data}.functionOptions, ${names_1.default.instancePath})`);
                    cxt.gen.if((0, ajv_1._) `${fn} !== void 0`);
                    cxt.error(false, { errors: fn });
                    cxt.gen.endIf();
                    break;
                }
                case 'alias': {
                    const alias = cxt.gen.const('spectralAlias', (0, ajv_1._) `this.validateAlias(${names_1.default.rootData}, ${data}, ${names_1.default.instancePath})`);
                    cxt.gen.if((0, ajv_1._) `${alias} !== void 0`);
                    cxt.error(false, { errors: alias });
                    cxt.gen.endIf();
                    break;
                }
            }
        },
    });
    if (format === 'js') {
        ajv.addSchema(jsExtensions);
    }
    else {
        ajv.addSchema(jsonExtensions);
    }
    const validator = new Proxy(ajv.compile(rulesetSchema), {
        apply(target, thisArg, args) {
            return Reflect.apply(target, { validateAlias: alias_1.validateAlias, validateFunction: function_1.validateFunction }, args);
        },
    });
    validators[format] = validator;
    return validator;
}
exports.createValidator = createValidator;
//# sourceMappingURL=ajv.js.map