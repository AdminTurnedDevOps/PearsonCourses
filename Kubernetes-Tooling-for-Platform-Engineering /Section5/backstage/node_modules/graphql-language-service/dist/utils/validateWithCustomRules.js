"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWithCustomRules = void 0;
const graphql_1 = require("graphql");
const specifiedSDLRules = [
    graphql_1.LoneSchemaDefinitionRule,
    graphql_1.UniqueOperationTypesRule,
    graphql_1.UniqueTypeNamesRule,
    graphql_1.UniqueEnumValueNamesRule,
    graphql_1.UniqueFieldDefinitionNamesRule,
    graphql_1.UniqueDirectiveNamesRule,
    graphql_1.KnownTypeNamesRule,
    graphql_1.KnownDirectivesRule,
    graphql_1.UniqueDirectivesPerLocationRule,
    graphql_1.PossibleTypeExtensionsRule,
    graphql_1.UniqueArgumentNamesRule,
    graphql_1.UniqueInputFieldNamesRule,
    graphql_1.UniqueVariableNamesRule,
    graphql_1.FragmentsOnCompositeTypesRule,
    graphql_1.ProvidedRequiredArgumentsRule,
];
function validateWithCustomRules(schema, ast, customRules, isRelayCompatMode, isSchemaDocument) {
    const rules = graphql_1.specifiedRules.filter(rule => {
        if (rule === graphql_1.NoUnusedFragmentsRule || rule === graphql_1.ExecutableDefinitionsRule) {
            return false;
        }
        if (isRelayCompatMode && rule === graphql_1.KnownFragmentNamesRule) {
            return false;
        }
        return true;
    });
    if (customRules) {
        Array.prototype.push.apply(rules, customRules);
    }
    if (isSchemaDocument) {
        Array.prototype.push.apply(rules, specifiedSDLRules);
    }
    const errors = (0, graphql_1.validate)(schema, ast, rules);
    return errors.filter(error => {
        if (error.message.includes('Unknown directive') && error.nodes) {
            const node = error.nodes[0];
            if (node && node.kind === graphql_1.Kind.DIRECTIVE) {
                const name = node.name.value;
                if (name === 'arguments' || name === 'argumentDefinitions') {
                    return false;
                }
            }
        }
        return true;
    });
}
exports.validateWithCustomRules = validateWithCustomRules;
//# sourceMappingURL=validateWithCustomRules.js.map