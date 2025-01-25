"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runOperationSelection = void 0;
const lodash_1 = __importDefault(require("lodash"));
const allMethods = [
    'get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'
];
function operationContainsAnyTag(operation, tags) {
    return operation.tags !== undefined && operation.tags.some(tag => tags.includes(tag));
}
function dropOperationsThatHaveTags(originalOas, excludedTags) {
    if (excludedTags.length === 0) {
        return originalOas;
    }
    const oas = lodash_1.default.cloneDeep(originalOas);
    for (const path in oas.paths) {
        /* eslint-disable-next-line no-prototype-builtins */
        if (oas.paths.hasOwnProperty(path)) {
            const pathItem = oas.paths[path];
            for (let i = 0; i < allMethods.length; i++) {
                const method = allMethods[i];
                const operation = pathItem[method];
                if (operation !== undefined && operationContainsAnyTag(operation, excludedTags)) {
                    delete pathItem[method];
                }
            }
        }
    }
    return oas;
}
function includeOperationsThatHaveTags(originalOas, includeTags) {
    if (includeTags.length === 0) {
        return originalOas;
    }
    const oas = lodash_1.default.cloneDeep(originalOas);
    for (const path in oas.paths) {
        /* eslint-disable-next-line no-prototype-builtins */
        if (oas.paths.hasOwnProperty(path)) {
            const pathItem = oas.paths[path];
            for (let i = 0; i < allMethods.length; i++) {
                const method = allMethods[i];
                const operation = pathItem[method];
                if (operation !== undefined && !operationContainsAnyTag(operation, includeTags)) {
                    delete pathItem[method];
                }
            }
        }
    }
    return oas;
}
function runOperationSelection(originalOas, operationSelection) {
    if (operationSelection === undefined) {
        return originalOas;
    }
    return dropOperationsThatHaveTags(includeOperationsThatHaveTags(originalOas, operationSelection.includeTags || []), operationSelection.excludeTags || []);
}
exports.runOperationSelection = runOperationSelection;
