"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePathsAndComponents = void 0;
const atlassian_openapi_1 = require("atlassian-openapi");
const reference_walker_1 = require("./reference-walker");
const lodash_1 = __importDefault(require("lodash"));
const operation_selection_1 = require("./operation-selection");
const component_equivalence_1 = require("./component-equivalence");
const dispute_1 = require("./dispute");
function removeFromStart(input, trim) {
    if (input.startsWith(trim)) {
        return input.substring(trim.length);
    }
    return input;
}
function processComponents(results, components, areEqual, dispute, addModifiedReference) {
    for (const key in components) {
        /* eslint-disable-next-line no-prototype-builtins */
        if (components.hasOwnProperty(key)) {
            const component = components[key];
            const modifiedKey = dispute_1.applyDispute(dispute, key, 'undisputed');
            if (modifiedKey !== key) {
                addModifiedReference(key, modifiedKey);
            }
            if (results[modifiedKey] === undefined || areEqual(results[modifiedKey], component)) {
                // Add the schema
                results[modifiedKey] = component;
            }
            else {
                // Distnguish the name and then add the element
                let schemaPlaced = false;
                // Try and use the dispute prefix first
                if (dispute !== undefined) {
                    const preferredSchemaKey = dispute_1.applyDispute(dispute, key, 'disputed');
                    if (results[preferredSchemaKey] === undefined || areEqual(results[preferredSchemaKey], component)) {
                        results[preferredSchemaKey] = component;
                        addModifiedReference(key, preferredSchemaKey);
                        schemaPlaced = true;
                    }
                }
                // Incrementally find the right prefix
                for (let antiConflict = 1; schemaPlaced === false && antiConflict < 1000; antiConflict++) {
                    const trySchemaKey = `${key}${antiConflict}`;
                    if (results[trySchemaKey] === undefined) {
                        results[trySchemaKey] = component;
                        addModifiedReference(key, trySchemaKey);
                        schemaPlaced = true;
                    }
                }
                // In the unlikely event that we can't find a duplicate, return an error
                if (schemaPlaced === false) {
                    return {
                        type: 'component-definition-conflict',
                        message: `The "${key}" definition had a duplicate in a previous input and could not be deduplicated.`
                    };
                }
            }
        }
    }
}
function countOperationsInPathItem(pathItem) {
    let count = 0;
    count += pathItem.get !== undefined ? 1 : 0;
    count += pathItem.put !== undefined ? 1 : 0;
    count += pathItem.post !== undefined ? 1 : 0;
    count += pathItem.delete !== undefined ? 1 : 0;
    count += pathItem.options !== undefined ? 1 : 0;
    count += pathItem.head !== undefined ? 1 : 0;
    count += pathItem.patch !== undefined ? 1 : 0;
    count += pathItem.trace !== undefined ? 1 : 0;
    return count;
}
function dropPathItemsWithNoOperations(originalOas) {
    const oas = lodash_1.default.cloneDeep(originalOas);
    for (const path in oas.paths) {
        /* eslint-disable-next-line no-prototype-builtins */
        if (oas.paths.hasOwnProperty(path)) {
            const pathItem = oas.paths[path];
            if (countOperationsInPathItem(pathItem) === 0) {
                delete oas.paths[path];
            }
        }
    }
    return oas;
}
function findUniqueOperationId(operationId, seenOperationIds, dispute) {
    if (!seenOperationIds.has(operationId)) {
        return operationId;
    }
    // Try the dispute prefix
    if (dispute !== undefined) {
        const disputeOpId = dispute_1.applyDispute(dispute, operationId, 'disputed');
        if (!seenOperationIds.has(disputeOpId)) {
            return disputeOpId;
        }
    }
    // Incrementally find the right prefix
    for (let antiConflict = 1; antiConflict < 1000; antiConflict++) {
        const tryOpId = `${operationId}${antiConflict}`;
        if (!seenOperationIds.has(tryOpId)) {
            return tryOpId;
        }
    }
    // Fail with an error
    return {
        type: 'operation-id-conflict',
        message: `Could not resolve a conflict for the operationId '${operationId}'`
    };
}
function ensureUniqueOperationId(operation, seenOperationIds, dispute) {
    if (operation.operationId !== undefined) {
        const opId = findUniqueOperationId(operation.operationId, seenOperationIds, dispute);
        if (typeof opId === 'string') {
            operation.operationId = opId;
            seenOperationIds.add(opId);
        }
        else {
            return opId;
        }
    }
}
function ensureUniqueOperationIds(pathItem, seenOperationIds, dispute) {
    const operations = [
        pathItem.get,
        pathItem.put,
        pathItem.post,
        pathItem.delete,
        pathItem.patch,
        pathItem.head,
        pathItem.trace,
        pathItem.options
    ];
    for (let opIndex = 0; opIndex < operations.length; opIndex++) {
        const operation = operations[opIndex];
        if (operation !== undefined) {
            const result = ensureUniqueOperationId(operation, seenOperationIds, dispute);
            if (result !== undefined) {
                return result;
            }
        }
    }
}
/**
 * Merge algorithm:
 *
 * Generate reference mappings for the components. Eliminating duplicates.
 * Generate reference mappings for the paths.
 * Copy the elements into the new location.
 * Update all of the paths and components to the new references.
 *
 * @param inputs
 */
function mergePathsAndComponents(inputs) {
    const seenOperationIds = new Set();
    const result = {
        paths: {},
        components: {},
    };
    for (let inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
        const input = inputs[inputIndex];
        const { oas: originalOas, pathModification, operationSelection } = input;
        const dispute = dispute_1.getDispute(input);
        const oas = dropPathItemsWithNoOperations(operation_selection_1.runOperationSelection(lodash_1.default.cloneDeep(originalOas), operationSelection));
        // Original references will be transformed to new non-conflicting references
        const referenceModification = {};
        // For each component in the original input, place it in the output with deduplicate taking place
        if (oas.components !== undefined) {
            const resultLookup = new atlassian_openapi_1.SwaggerLookup.InternalLookup({ openapi: '3.0.1', info: { title: 'dummy', version: '0' }, paths: {}, components: result.components });
            const currentLookup = new atlassian_openapi_1.SwaggerLookup.InternalLookup(oas);
            if (oas.components.schemas !== undefined) {
                result.components.schemas = result.components.schemas || {};
                processComponents(result.components.schemas, oas.components.schemas, component_equivalence_1.deepEquality(resultLookup, currentLookup), dispute, (from, to) => {
                    referenceModification[`#/components/schemas/${from}`] = `#/components/schemas/${to}`;
                });
            }
            if (oas.components.responses !== undefined) {
                result.components.responses = result.components.responses || {};
                processComponents(result.components.responses, oas.components.responses, component_equivalence_1.deepEquality(resultLookup, currentLookup), dispute, (from, to) => {
                    referenceModification[`#/components/responses/${from}`] = `#/components/responses/${to}`;
                });
            }
            if (oas.components.parameters !== undefined) {
                result.components.parameters = result.components.parameters || {};
                processComponents(result.components.parameters, oas.components.parameters, component_equivalence_1.deepEquality(resultLookup, currentLookup), dispute, (from, to) => {
                    referenceModification[`#/components/parameters/${from}`] = `#/components/parameters/${to}`;
                });
            }
            // examples
            if (oas.components.examples !== undefined) {
                result.components.examples = result.components.examples || {};
                processComponents(result.components.examples, oas.components.examples, component_equivalence_1.deepEquality(resultLookup, currentLookup), dispute, (from, to) => {
                    referenceModification[`#/components/examples/${from}`] = `#/components/examples/${to}`;
                });
            }
            // requestBodies
            if (oas.components.requestBodies !== undefined) {
                result.components.requestBodies = result.components.requestBodies || {};
                processComponents(result.components.requestBodies, oas.components.requestBodies, component_equivalence_1.deepEquality(resultLookup, currentLookup), dispute, (from, to) => {
                    referenceModification[`#/components/requestBodies/${from}`] = `#/components/requestBodies/${to}`;
                });
            }
            // headers
            if (oas.components.headers !== undefined) {
                result.components.headers = result.components.headers || {};
                processComponents(result.components.headers, oas.components.headers, component_equivalence_1.deepEquality(resultLookup, currentLookup), dispute, (from, to) => {
                    referenceModification[`#/components/headers/${from}`] = `#/components/headers/${to}`;
                });
            }
            // security schemes are different, we just take the security schemes from the first file that has any
            if (oas.components.securitySchemes !== undefined && Object.keys(oas.components.securitySchemes).length > 0 && result.components.securitySchemes === undefined) {
                result.components.securitySchemes = oas.components.securitySchemes;
            }
            // links
            if (oas.components.links !== undefined) {
                result.components.links = result.components.links || {};
                processComponents(result.components.links, oas.components.links, component_equivalence_1.deepEquality(resultLookup, currentLookup), dispute, (from, to) => {
                    referenceModification[`#/components/links/${from}`] = `#/components/links/${to}`;
                });
            }
            // callbacks
            if (oas.components.callbacks !== undefined) {
                result.components.callbacks = result.components.callbacks || {};
                processComponents(result.components.callbacks, oas.components.callbacks, component_equivalence_1.deepEquality(resultLookup, currentLookup), dispute, (from, to) => {
                    referenceModification[`#/components/callbacks/${from}`] = `#/components/callbacks/${to}`;
                });
            }
        }
        // For each path, convert it into the right format (looking out for duplicates)
        const paths = Object.keys(oas.paths || {});
        for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
            const originalPath = paths[pathIndex];
            const newPath = pathModification === undefined ? originalPath : `${pathModification.prepend || ''}${removeFromStart(originalPath, pathModification.stripStart || '')}`;
            if (originalPath !== newPath) {
                referenceModification[`#/paths/${originalPath}`] = `#/paths/${newPath}`;
            }
            // TODO perform more advanced matching for an existing path than an equals check
            if (result.paths[newPath] !== undefined) {
                return {
                    type: 'duplicate-paths',
                    message: `Input ${inputIndex}: The path '${originalPath}' maps to '${newPath}' and this has already been added by another input file`
                };
            }
            const copyPathItem = oas.paths[originalPath];
            ensureUniqueOperationIds(copyPathItem, seenOperationIds, dispute);
            result.paths[newPath] = copyPathItem;
        }
        // Update the references to point to the right location
        const modifiedKeys = Object.keys(referenceModification);
        reference_walker_1.walkAllReferences(oas, ref => {
            if (referenceModification[ref] !== undefined) {
                return referenceModification[ref];
            }
            const matchingKeys = modifiedKeys.filter(key => key.startsWith(`${ref}/`));
            if (matchingKeys.length > 1) {
                throw new Error(`Found more than one matching key for reference '${ref}': ${JSON.stringify(matchingKeys)}`);
            }
            else if (matchingKeys.length === 1) {
                return referenceModification[matchingKeys[0]];
            }
            return ref;
        });
    }
    return result;
}
exports.mergePathsAndComponents = mergePathsAndComponents;
