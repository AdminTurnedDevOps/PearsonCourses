import { GraphQLInterfaceType, GraphQLObjectType, GraphQLEnumType, GraphQLInputObjectType, GraphQLList, getNamedType, getNullableType, SchemaMetaFieldDef, TypeMetaFieldDef, TypeNameMetaFieldDef, isCompositeType, } from 'graphql';
import { RuleKinds } from '.';
export function getFieldDef(schema, type, fieldName) {
    if (fieldName === SchemaMetaFieldDef.name && schema.getQueryType() === type) {
        return SchemaMetaFieldDef;
    }
    if (fieldName === TypeMetaFieldDef.name && schema.getQueryType() === type) {
        return TypeMetaFieldDef;
    }
    if (fieldName === TypeNameMetaFieldDef.name && isCompositeType(type)) {
        return TypeNameMetaFieldDef;
    }
    if ('getFields' in type) {
        return type.getFields()[fieldName];
    }
    return null;
}
export function forEachState(stack, fn) {
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
export function getDefinitionState(tokenState) {
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
export function getTypeInfo(schema, tokenState) {
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
            case RuleKinds.QUERY:
            case 'ShortQuery':
                type = schema.getQueryType();
                break;
            case RuleKinds.MUTATION:
                type = schema.getMutationType();
                break;
            case RuleKinds.SUBSCRIPTION:
                type = schema.getSubscriptionType();
                break;
            case RuleKinds.INLINE_FRAGMENT:
            case RuleKinds.FRAGMENT_DEFINITION:
                if (state.type) {
                    type = schema.getType(state.type);
                }
                break;
            case RuleKinds.FIELD:
            case RuleKinds.ALIASED_FIELD: {
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
            case RuleKinds.SELECTION_SET:
                parentType = getNamedType(type);
                break;
            case RuleKinds.DIRECTIVE:
                directiveDef = state.name ? schema.getDirective(state.name) : null;
                break;
            case RuleKinds.INTERFACE_DEF:
                if (state.name) {
                    objectTypeDef = null;
                    interfaceDef = new GraphQLInterfaceType({
                        name: state.name,
                        interfaces: [],
                        fields: {},
                    });
                }
                break;
            case RuleKinds.OBJECT_TYPE_DEF:
                if (state.name) {
                    interfaceDef = null;
                    objectTypeDef = new GraphQLObjectType({
                        name: state.name,
                        interfaces: [],
                        fields: {},
                    });
                }
                break;
            case RuleKinds.ARGUMENTS: {
                if (state.prevState) {
                    switch (state.prevState.kind) {
                        case RuleKinds.FIELD:
                            argDefs = fieldDef && fieldDef.args;
                            break;
                        case RuleKinds.DIRECTIVE:
                            argDefs =
                                directiveDef && directiveDef.args;
                            break;
                        case RuleKinds.ALIASED_FIELD: {
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
            case RuleKinds.ARGUMENT:
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
            case RuleKinds.VARIABLE_DEFINITION:
            case RuleKinds.VARIABLE:
                type = inputType;
                break;
            case RuleKinds.ENUM_VALUE:
                const enumType = getNamedType(inputType);
                enumValue =
                    enumType instanceof GraphQLEnumType
                        ? enumType
                            .getValues()
                            .find((val) => val.value === state.name)
                        : null;
                break;
            case RuleKinds.LIST_VALUE:
                const nullableType = getNullableType(inputType);
                inputType =
                    nullableType instanceof GraphQLList ? nullableType.ofType : null;
                break;
            case RuleKinds.OBJECT_VALUE:
                const objectType = getNamedType(inputType);
                objectFieldDefs =
                    objectType instanceof GraphQLInputObjectType
                        ? objectType.getFields()
                        : null;
                break;
            case RuleKinds.OBJECT_FIELD:
                const objectField = state.name && objectFieldDefs ? objectFieldDefs[state.name] : null;
                inputType = objectField === null || objectField === void 0 ? void 0 : objectField.type;
                fieldDef = objectField;
                type = fieldDef ? fieldDef.type : null;
                break;
            case RuleKinds.NAMED_TYPE:
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
//# sourceMappingURL=getTypeInfo.js.map