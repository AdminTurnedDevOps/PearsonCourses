"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLintTargets = void 0;
const jsonpath_plus_1 = require("jsonpath-plus");
const lodash_1 = require("lodash");
const getLintTargets = (targetValue, field) => {
    const targets = [];
    if ((0, lodash_1.isObject)(targetValue) && typeof field === 'string') {
        if (field === '@key') {
            for (const key of Object.keys(targetValue)) {
                targets.push({
                    path: [key],
                    value: key,
                });
            }
        }
        else if (field.startsWith('$')) {
            (0, jsonpath_plus_1.JSONPath)({
                path: field,
                json: targetValue,
                resultType: 'all',
                callback(result) {
                    targets.push({
                        path: (0, lodash_1.toPath)(result.path.slice(1)),
                        value: result.value,
                    });
                },
            });
        }
        else {
            targets.push({
                path: (0, lodash_1.toPath)(field),
                value: (0, lodash_1.get)(targetValue, field),
            });
        }
    }
    else {
        targets.push({
            path: [],
            value: targetValue,
        });
    }
    if (targets.length === 0) {
        targets.push({
            path: [],
            value: void 0,
        });
    }
    return targets;
};
exports.getLintTargets = getLintTargets;
//# sourceMappingURL=getLintTargets.js.map