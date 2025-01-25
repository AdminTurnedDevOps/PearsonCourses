"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeInfo = exports.getDefinitionState = exports.forEachState = exports.getFieldDef = void 0;
const graphql_1 = require("graphql");
const _1 = require(".");
function getFieldDef(schema, type, fieldName) {
    if (fieldName === graphql_1.SchemaMetaFieldDef.name && schema.getQueryType() === type) {
        return graphql_1.SchemaMetaFieldDef;
    }
    if (fieldName === graphql_1.TypeMetaFieldDef.name && schema.getQueryType() === type) {
        return graphql_1.TypeMetaFieldDef;
    }
    if (fieldName === graphql_1.TypeNameMetaFieldDef.name && (0, graphql_1.isCompositeType)(type)) {
        return graphql_1.TypeNameMetaFieldDef;
    }
    if ('getFields' in type) {
        return type.getFields()[fieldName];
    }
    return null;
}
exports.getFieldDef = getFieldDef;
function forEachState(stack, fn) {
    const reverseStateStack = [];
    let state = stack;
    while (state === null || state === void 0 ? void 0 : state.kind) {
        reverseStateStack.push(state);
        state = state.prevState;
    }
    for (let i = reverseStateStack.length - 1; i >= 0; i--) {
        fn(reverseStateStack[i]);
    }
}
exports.forEachState = forEachState;
function getDefinitionState(tokenState) {
    let definitionState;
    forEachState(tokenState, (state) => {
        switch (state.kind) {
            case 'Query':
            case 'ShortQuery':
            case 'Mutation':
            case 'Subscription':
            case 'FragmentDefinition':
                definitionState = state;
                break;
        }
    });
    return definitionState;
}
exports.getDefinitionState = getDefinitionState;
function getTypeInfo(schema, tokenState) {
    let argDef;
    let argDefs;
    let directiveDef;
    let enumValue;
    let fieldDef;
    let inputType;
    let objectTypeDef;
    let objectFieldDefs;
    let parentType;
    let type;
    let interfaceDef;
    forEachState(tokenState, state => {
        var _a;
        switch (state.kind) {
            case _1.RuleKinds.QUERY:
            case 'ShortQuery':
                type = schema.getQueryType();
                break;
            case _1.RuleKinds.MUTATION:
                type = schema.getMutationType();
                break;
            case _1.RuleKinds.SUBSCRIPTION:
                type = schema.getSubscriptionType();
                break;
            case _1.RuleKinds.INLINE_FRAGMENT:
            case _1.RuleKinds.FRAGMENT_DEFINITION:
                if (state.type) {
                    type = schema.getType(state.type);
                }
                break;
            case _1.RuleKinds.FIELD:
            case _1.RuleKinds.ALIASED_FIELD: {
                if (!type || !state.name) {
                    fieldDef = null;
                }
                else {
                    fieldDef = parentType
                        ? getFieldDef(schema, parentType, state.name)
                        : null;
                    type = fieldDef ? fieldDef.type : null;
                }
                break;
            }
            case _1.RuleKinds.SELECTION_SET:
                parentType = (0, graphql_1.getNamedType)(type);
                break;
            case _1.RuleKinds.DIRECTIVE:
                directiveDef = state.name ? schema.getDirective(state.name) : null;
                break;
            case _1.RuleKinds.INTERFACE_DEF:
                if (state.name) {
                    objectTypeDef = null;
                    interfaceDef = new graphql_1.GraphQLInterfaceType({
                        name: state.name,
                        interfaces: [],
                        fields: {},
                    });
                }
                break;
            case _1.RuleKinds.OBJECT_TYPE_DEF:
                if (state.name) {
                    interfaceDef = null;
                    objectTypeDef = new graphql_1.GraphQLObjectType({
                        name: state.name,
                        interfaces: [],
                        fields: {},
                    });
                }
                break;
            case _1.RuleKinds.ARGUMENTS: {
                if (state.prevState) {
                    switch (state.prevState.kind) {
                        case _1.RuleKinds.FIELD:
                            argDefs = fieldDef && fieldDef.args;
                            break;
                        case _1.RuleKinds.DIRECTIVE:
                            argDefs =
                                directiveDef && directiveDef.args;
                            break;
                        case _1.RuleKinds.ALIASED_FIELD: {
                            const name = (_a = state.prevState) === null || _a === void 0 ? void 0 : _a.name;
                            if (!name) {
                                argDefs = null;
                                break;
                            }
                            const field = parentType
                                ? getFieldDef(schema, parentType, name)
                                : null;
                            if (!field) {
                                argDefs = null;
                                break;
                            }
                            argDefs = field.args;
                            break;
                        }
                        default:
                            argDefs = null;
                            break;
                    }
                }
                else {
                    argDefs = null;
                }
                break;
            }
            case _1.RuleKinds.ARGUMENT:
                if (argDefs) {
                    for (let i = 0; i < argDefs.length; i++) {
                        if (argDefs[i].name === state.name) {
                            argDef = argDefs[i];
                            break;
                        }
                    }
                }
                inputType = argDef === null || argDef === void 0 ? void 0 : argDef.type;
                break;
            case _1.RuleKinds.VARIABLE_DEFINITION:
            case _1.RuleKinds.VARIABLE:
                type = inputType;
                break;
            case _1.RuleKinds.ENUM_VALUE:
                const enumType = (0, graphql_1.getNamedType)(inputType);
                enumValue =
                    enumType instanceof graphql_1.GraphQLEnumType
                        ? enumType
                            .getValues()
                            .find((val) => val.value === state.name)
                        : null;
                break;
            case _1.RuleKinds.LIST_VALUE:
                const nullableType = (0, graphql_1.getNullableType)(inputType);
                inputType =
                    nullableType instanceof graphql_1.GraphQLList ? nullableType.ofType : null;
                break;
            case _1.RuleKinds.OBJECT_VALUE:
                const objectType = (0, graphql_1.getNamedType)(inputType);
                objectFieldDefs =
                    objectType instanceof graphql_1.GraphQLInputObjectType
                        ? objectType.getFields()
                        : null;
                break;
            case _1.RuleKinds.OBJECT_FIELD:
                const objectField = state.name && objectFieldDefs ? objectFieldDefs[state.name] : null;
                inputType = objectField === null || objectField === void 0 ? void 0 : objectField.type;
                fieldDef = objectField;
                type = fieldDef ? fieldDef.type : null;
                break;
            case _1.RuleKinds.NAMED_TYPE:
                if (state.name) {
                    type = schema.getType(state.name);
                }
                break;
        }
    });
    return {
        argDef,
        argDefs,
        directiveDef,
        enumValue,
        fieldDef,
        inputType,
        objectFieldDefs,
        parentType,
        type,
        interfaceDef,
        objectTypeDef,
    };
}
exports.getTypeInfo = getTypeInfo;
//# sourceMappingURL=getTypeInfo.js.map