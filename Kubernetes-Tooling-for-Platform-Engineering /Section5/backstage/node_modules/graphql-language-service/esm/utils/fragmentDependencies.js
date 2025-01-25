import { parse, visit } from 'graphql';
import nullthrows from 'nullthrows';
export const getFragmentDependencies = (operationString, fragmentDefinitions) => {
    if (!fragmentDefinitions) {
        return [];
    }
    let parsedOperation;
    try {
        parsedOperation = parse(operationString);
    }
    catch (_a) {
        return [];
    }
    return getFragmentDependenciesForAST(parsedOperation, fragmentDefinitions);
};
export const getFragmentDependenciesForAST = (parsedOperation, fragmentDefinitions) => {
    if (!fragmentDefinitions) {
        return [];
    }
    const existingFrags = new Map();
    const referencedFragNames = new Set();
    visit(parsedOperation, {
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
            asts.add(nullthrows(fragmentDefinitions.get(name)));
        }
    }
    const referencedFragments = [];
    for (const ast of asts) {
        visit(ast, {
            FragmentSpread(node) {
                if (!referencedFragNames.has(node.name.value) &&
                    fragmentDefinitions.get(node.name.value)) {
                    asts.add(nullthrows(fragmentDefinitions.get(node.name.value)));
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
//# sourceMappingURL=fragmentDependencies.js.map