"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniquenessTags = void 0;
const spectral_core_1 = require("@stoplight/spectral-core");
function getDuplicateTagsIndexes(tags) {
    return tags
        .map(item => item.name)
        .reduce((acc, item, i, arr) => {
        if (arr.indexOf(item) !== i) {
            acc.push(i);
        }
        return acc;
    }, []);
}
exports.uniquenessTags = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
            },
            required: ['name'],
        },
    },
    options: null,
}, (targetVal, _, ctx) => {
    const duplicatedTags = getDuplicateTagsIndexes(targetVal);
    if (duplicatedTags.length === 0) {
        return [];
    }
    const results = [];
    for (const duplicatedIndex of duplicatedTags) {
        const duplicatedTag = targetVal[duplicatedIndex].name;
        results.push({
            message: `"tags" object contains duplicate tag name "${duplicatedTag}".`,
            path: [...ctx.path, duplicatedIndex, 'name'],
        });
    }
    return results;
});
