"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const spectral_core_1 = require("@stoplight/spectral-core");
const spectral_runtime_1 = require("@stoplight/spectral-runtime");
const optionSchemas_1 = require("./optionSchemas");
const compare = (a, b) => {
    if ((typeof a === 'number' || Number.isNaN(Number(a))) && (typeof b === 'number' || !Number.isNaN(Number(b)))) {
        return Math.min(1, Math.max(-1, Number(a) - Number(b)));
    }
    if (typeof a !== 'string' || typeof b !== 'string') {
        return 0;
    }
    return a.localeCompare(b);
};
const getUnsortedItems = (arr, compareFn) => {
    for (let i = 0; i < arr.length - 1; i += 1) {
        if (compareFn(arr[i], arr[i + 1]) >= 1) {
            return [i, i + 1];
        }
    }
    return null;
};
function isStringOrNumber(maybeStringOrNumber) {
    return typeof maybeStringOrNumber === 'string' || typeof maybeStringOrNumber === 'number';
}
function isValidArray(arr) {
    return arr.every(isStringOrNumber);
}
exports.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: ['object', 'array'],
    },
    options: optionSchemas_1.optionSchemas.alphabetical,
}, function alphabetical(targetVal, opts, { path, documentInventory }) {
    var _a, _b;
    let targetArray;
    if (Array.isArray(targetVal)) {
        targetArray = targetVal;
    }
    else {
        targetArray = Object.keys((_b = (_a = documentInventory.findAssociatedItemForPath(path, true)) === null || _a === void 0 ? void 0 : _a.document.trapAccess(targetVal)) !== null && _b !== void 0 ? _b : targetVal);
    }
    if (targetArray.length < 2) {
        return;
    }
    const keyedBy = opts === null || opts === void 0 ? void 0 : opts.keyedBy;
    if (keyedBy !== void 0) {
        const _targetArray = [];
        for (const item of targetArray) {
            if (!(0, lodash_1.isObject)(item)) {
                return [
                    {
                        message: '#{{print("property")}}must be an object',
                    },
                ];
            }
            _targetArray.push(item[keyedBy]);
        }
        targetArray = _targetArray;
    }
    if (!isValidArray(targetArray)) {
        return [
            {
                message: '#{{print("property")}}must be one of the allowed types: number, string',
            },
        ];
    }
    const unsortedItems = getUnsortedItems(targetArray, compare);
    if (unsortedItems != null) {
        return [
            {
                ...(keyedBy === void 0
                    ? {
                        path: [...path, Array.isArray(targetVal) ? unsortedItems[0] : targetArray[unsortedItems[0]]],
                    }
                    : null),
                message: keyedBy !== void 0
                    ? 'properties must follow the alphabetical order'
                    : `${(0, spectral_runtime_1.printValue)(targetArray[unsortedItems[0]])} must be placed after ${(0, spectral_runtime_1.printValue)(targetArray[unsortedItems[1]])}`,
            },
        ];
    }
    return;
});
//# sourceMappingURL=alphabetical.js.map