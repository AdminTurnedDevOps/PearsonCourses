import { specifiedRules, validate, NoUnusedFragmentsRule, KnownFragmentNamesRule, Kind, ExecutableDefinitionsRule, LoneSchemaDefinitionRule, UniqueOperationTypesRule, UniqueTypeNamesRule, UniqueEnumValueNamesRule, UniqueFieldDefinitionNamesRule, UniqueDirectiveNamesRule, KnownTypeNamesRule, KnownDirectivesRule, UniqueDirectivesPerLocationRule, PossibleTypeExtensionsRule, UniqueArgumentNamesRule, UniqueInputFieldNamesRule, UniqueVariableNamesRule, FragmentsOnCompositeTypesRule, ProvidedRequiredArgumentsRule, } from 'graphql';
const specifiedSDLRules = [
    LoneSchemaDefinitionRule,
    UniqueOperationTypesRule,
    UniqueTypeNamesRule,
    UniqueEnumValueNamesRule,
    UniqueFieldDefinitionNamesRule,
    UniqueDirectiveNamesRule,
    KnownTypeNamesRule,
    KnownDirectivesRule,
    UniqueDirectivesPerLocationRule,
    PossibleTypeExtensionsRule,
    UniqueArgumentNamesRule,
    UniqueInputFieldNamesRule,
    UniqueVariableNamesRule,
    FragmentsOnCompositeTypesRule,
    ProvidedRequiredArgumentsRule,
];
export function validateWithCustomRules(schema, ast, customRules, isRelayCompatMode, isSchemaDocument) {
    const rules = specifiedRules.filter(rule => {
        if (rule === NoUnusedFragmentsRule || rule === ExecutableDefinitionsRule) {
            return false;
        }
        if (isRelayCompatMode && rule === KnownFragmentNamesRule) {
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
    const errors = validate(schema, ast, rules);
    return errors.filter(error => {
        if (error.message.includes('Unknown directive') && error.nodes) {
            const node = error.nodes[0];
            if (node && node.kind === Kind.DIRECTIVE) {
                const name = node.name.value;
                if (name === 'arguments' || name === 'argumentDefinitions') {
                    return false;
                }
            }
        }
        return true;
    });
}
//# sourceMappingURL=validateWithCustomRules.js.map