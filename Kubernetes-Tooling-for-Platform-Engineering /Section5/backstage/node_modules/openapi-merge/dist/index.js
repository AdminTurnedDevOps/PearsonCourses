"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.isErrorResult = void 0;
const ts_is_present_1 = require("ts-is-present");
const data_1 = require("./data");
Object.defineProperty(exports, "isErrorResult", { enumerable: true, get: function () { return data_1.isErrorResult; } });
const tags_1 = require("./tags");
const paths_and_components_1 = require("./paths-and-components");
const extensions_1 = require("./extensions");
const info_1 = require("./info");
function getFirst(inputs) {
    if (inputs.length > 0) {
        return inputs[0];
    }
    return undefined;
}
function getFirstMatching(inputs, extract) {
    return getFirst(inputs.map(extract).filter(ts_is_present_1.isPresent));
}
/**
 * Swagger Merge Tool
 */
function merge(inputs) {
    if (inputs.length === 0) {
        return { type: 'no-inputs', message: 'You must provide at least one OAS file as an input.' };
    }
    const pathAndComponentResult = paths_and_components_1.mergePathsAndComponents(inputs);
    if (data_1.isErrorResult(pathAndComponentResult)) {
        return pathAndComponentResult;
    }
    const { paths, components: retComponents } = pathAndComponentResult;
    const components = Object.keys(retComponents).length === 0 ? undefined : retComponents;
    const output = extensions_1.mergeExtensions({
        openapi: '3.0.3',
        info: info_1.mergeInfos(inputs),
        servers: getFirstMatching(inputs, input => input.oas.servers),
        externalDocs: getFirstMatching(inputs, input => input.oas.externalDocs),
        security: getFirstMatching(inputs, input => input.oas.security),
        tags: tags_1.mergeTags(inputs),
        paths,
        components,
    }, inputs.map(input => input.oas));
    return { output };
}
exports.merge = merge;
