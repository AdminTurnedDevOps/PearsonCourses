import { createRulesetFunction } from '@stoplight/spectral-core';
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
export const uniquenessTags = createRulesetFunction({
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
