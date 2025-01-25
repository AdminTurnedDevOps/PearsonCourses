"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectVariables = void 0;
const graphql_1 = require("graphql");
function collectVariables(schema, documentAST) {
    const variableToType = Object.create(null);
    for (const definition of documentAST.definitions) {
        if (definition.kind === 'OperationDefinition') {
            const { variableDefinitions } = definition;
            if (variableDefinitions) {
                for (const { variable, type } of variableDefinitions) {
                    const inputType = (0, graphql_1.typeFromAST)(schema, type);
                    if (inputType) {
                        variableToType[variable.name.value] = inputType;
                    }
                    else if (type.kind === graphql_1.Kind.NAMED_TYPE &&
                        type.name.value === 'Float') {
                        variableToType[variable.name.value] = graphql_1.GraphQLFloat;
                    }
                }
            }
        }
    }
    return variableToType;
}
exports.collectVariables = collectVariables;
//# sourceMappingURL=collectVariables.js.map