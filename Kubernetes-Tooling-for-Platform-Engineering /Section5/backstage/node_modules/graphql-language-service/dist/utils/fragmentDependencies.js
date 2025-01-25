"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFragmentDependenciesForAST = exports.getFragmentDependencies = void 0;
const graphql_1 = require("graphql");
const nullthrows_1 = __importDefault(require("nullthrows"));
const getFragmentDependencies = (operationString, fragmentDefinitions) => {
    if (!fragmentDefinitions) {
        return [];
    }
    let parsedOperation;
    try {
        parsedOperation = (0, graphql_1.parse)(operationString);
    }
    catch (_a) {
        return [];
    }
    return (0, exports.getFragmentDependenciesForAST)(parsedOperation, fragmentDefinitions);
};
exports.getFragmentDependencies = getFragmentDependencies;
const getFragmentDependenciesForAST = (parsedOperation, fragmentDefinitions) => {
    if (!fragmentDefinitions) {
        return [];
    }
    const existingFrags = new Map();
    const referencedFragNames = new Set();
    (0, graphql_1.visit)(parsedOperation, {
        FragmentDefinition(node) {
            existingFrags.set(node.name.value, true);
        },
        FragmentSpread(node) {
            if (!referencedFragNames.has(node.name.value)) {
                referencedFragNames.add(node.name.value);
            }
        },
    });
    const asts = new Set();
    for (const name of referencedFragNames) {
        if (!existingFrags.has(name) && fragmentDefinitions.has(name)) {
            asts.add((0, nullthrows_1.default)(fragmentDefinitions.get(name)));
        }
    }
    const referencedFragments = [];
    for (const ast of asts) {
        (0, graphql_1.visit)(ast, {
            FragmentSpread(node) {
                if (!referencedFragNames.has(node.name.value) &&
                    fragmentDefinitions.get(node.name.value)) {
                    asts.add((0, nullthrows_1.default)(fragmentDefinitions.get(node.name.value)));
                    referencedFragNames.add(node.name.value);
                }
            },
        });
        if (!existingFrags.has(ast.name.value)) {
            referencedFragments.push(ast);
        }
    }
    return referencedFragments;
};
exports.getFragmentDependenciesForAST = getFragmentDependenciesForAST;
//# sourceMappingURL=fragmentDependencies.js.map