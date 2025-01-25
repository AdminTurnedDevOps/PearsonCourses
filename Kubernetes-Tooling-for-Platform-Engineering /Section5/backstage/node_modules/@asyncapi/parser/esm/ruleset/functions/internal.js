import { createRulesetFunction } from '@stoplight/spectral-core';
export const internal = createRulesetFunction({
    input: null,
    options: null,
}, (_, __, { document, documentInventory }) => {
    // adding document inventory in document - we need it in custom operations to resolve all circular refs
    document.__documentInventory = documentInventory;
});
