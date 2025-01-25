"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeInfos = void 0;
const ts_is_present_1 = require("ts-is-present");
const lodash_1 = __importDefault(require("lodash"));
function getInfoDescriptionWithHeading(mergeInput) {
    const { description } = mergeInput.oas.info;
    if (description === undefined) {
        return undefined;
    }
    const trimmedDescription = description.trimRight();
    if (mergeInput.description === undefined || mergeInput.description.title === undefined) {
        return trimmedDescription;
    }
    const { title } = mergeInput.description;
    const headingLevel = title.headingLevel || 1;
    return `${'#'.repeat(headingLevel)} ${title.value}\n\n${trimmedDescription}`;
}
function mergeInfos(mergeInput) {
    const finalInfo = lodash_1.default.cloneDeep(mergeInput[0].oas.info);
    const appendedDescriptions = mergeInput
        .filter(i => i.description && i.description.append)
        .map(getInfoDescriptionWithHeading)
        .filter(ts_is_present_1.isPresent);
    if (appendedDescriptions.length > 0) {
        finalInfo.description = appendedDescriptions.join('\n\n');
    }
    return finalInfo;
}
exports.mergeInfos = mergeInfos;
