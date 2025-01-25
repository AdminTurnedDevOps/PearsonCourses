"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAjvInstances = void 0;
const tslib_1 = require("tslib");
const ajv_1 = (0, tslib_1.__importDefault)(require("ajv"));
const _2019_1 = (0, tslib_1.__importDefault)(require("ajv/dist/2019"));
const _2020_1 = (0, tslib_1.__importDefault)(require("ajv/dist/2020"));
const ajv_draft_04_1 = (0, tslib_1.__importDefault)(require("ajv-draft-04"));
const ajv_formats_1 = (0, tslib_1.__importDefault)(require("ajv-formats"));
const ajv_errors_1 = (0, tslib_1.__importDefault)(require("ajv-errors"));
const draft6MetaSchema = (0, tslib_1.__importStar)(require("ajv/dist/refs/json-schema-draft-06.json"));
const draft4MetaSchema = (0, tslib_1.__importStar)(require("./draft4.json"));
const logger = {
    warn(...args) {
        const firstArg = args[0];
        if (typeof firstArg === 'string') {
            if (firstArg.startsWith('unknown format'))
                return;
            console.warn(...args);
        }
    },
    log: console.log,
    error: console.error,
};
function createAjvInstance(Ajv, allErrors) {
    const ajv = new Ajv({
        allErrors,
        meta: true,
        messages: true,
        strict: false,
        allowUnionTypes: true,
        logger,
        unicodeRegExp: false,
    });
    (0, ajv_formats_1.default)(ajv);
    if (allErrors) {
        (0, ajv_errors_1.default)(ajv);
    }
    if (Ajv === ajv_1.default) {
        ajv.addSchema(draft4MetaSchema);
        ajv.addSchema(draft6MetaSchema);
    }
    return ajv;
}
function _createAjvInstances(Ajv) {
    let _default;
    let _allErrors;
    return {
        get default() {
            _default !== null && _default !== void 0 ? _default : (_default = createAjvInstance(Ajv, false));
            return _default;
        },
        get allErrors() {
            _allErrors !== null && _allErrors !== void 0 ? _allErrors : (_allErrors = createAjvInstance(Ajv, true));
            return _allErrors;
        },
    };
}
function createAjvInstances() {
    const ajvInstances = {
        auto: _createAjvInstances(ajv_1.default),
        draft4: _createAjvInstances(ajv_draft_04_1.default),
        'draft2019-09': _createAjvInstances(_2019_1.default),
        'draft2020-12': _createAjvInstances(_2020_1.default),
    };
    const compiledSchemas = new WeakMap();
    return function (schema, dialect, allErrors) {
        var _a, _b, _c, _d;
        const instances = ((_a = ajvInstances[dialect]) !== null && _a !== void 0 ? _a : ajvInstances.auto);
        const ajv = instances[allErrors ? 'allErrors' : 'default'];
        const $id = schema.$id;
        if (typeof $id === 'string') {
            return (_b = ajv.getSchema($id)) !== null && _b !== void 0 ? _b : ajv.compile(schema);
        }
        else {
            const actualCompiledSchemas = (_c = compiledSchemas.get(ajv)) !== null && _c !== void 0 ? _c : compiledSchemas.set(ajv, new WeakMap()).get(ajv);
            return (_d = actualCompiledSchemas.get(schema)) !== null && _d !== void 0 ? _d : actualCompiledSchemas.set(schema, ajv.compile(schema)).get(schema);
        }
    };
}
exports.createAjvInstances = createAjvInstances;
//# sourceMappingURL=ajv.js.map