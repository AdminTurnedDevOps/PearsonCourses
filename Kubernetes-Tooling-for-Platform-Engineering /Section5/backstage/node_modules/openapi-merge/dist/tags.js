"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeTags = void 0;
function getNonExcludedTags(originalTags, excludedTagNames) {
    if (excludedTagNames.length === 0) {
        return originalTags;
    }
    return originalTags.filter(tag => !excludedTagNames.includes(tag.name));
}
function mergeTags(inputs) {
    const result = new Array();
    const seenTags = new Set();
    inputs.forEach(input => {
        const { operationSelection } = input;
        const { tags } = input.oas;
        if (tags !== undefined) {
            const excludeTags = operationSelection !== undefined && operationSelection.excludeTags !== undefined ? operationSelection.excludeTags : [];
            const nonExcludedTags = getNonExcludedTags(tags, excludeTags);
            nonExcludedTags.forEach(tag => {
                if (!seenTags.has(tag.name)) {
                    seenTags.add(tag.name);
                    result.push(tag);
                }
            });
        }
    });
    if (result.length === 0) {
        return undefined;
    }
    return result;
}
exports.mergeTags = mergeTags;
