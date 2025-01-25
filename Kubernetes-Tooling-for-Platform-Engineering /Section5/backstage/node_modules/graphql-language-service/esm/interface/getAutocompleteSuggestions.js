import { isInterfaceType, GraphQLInterfaceType, GraphQLObjectType, Kind, DirectiveLocation, isScalarType, isObjectType, isUnionType, isEnumType, isInputObjectType, isOutputType, GraphQLBoolean, GraphQLEnumType, SchemaMetaFieldDef, TypeMetaFieldDef, TypeNameMetaFieldDef, assertAbstractType, doTypesOverlap, getNamedType, isAbstractType, isCompositeType, isInputType, visit, parse, } from 'graphql';
import { CompletionItemKind, InsertTextFormat, } from '../types';
import { getTypeInfo, runOnlineParser, RuleKinds, getContextAtPosition, getDefinitionState, GraphQLDocumentMode, } from '../parser';
import { hintList, objectValues, getInputInsertText, getFieldInsertText, getInsertText, } from './autocompleteUtils';
import { InsertTextMode } from 'vscode-languageserver-types';
export { runOnlineParser, getTypeInfo };
export const SuggestionCommand = {
    command: 'editor.action.triggerSuggest',
    title: 'Suggestions',
};
const collectFragmentDefs = (op) => {
    const externalFragments = [];
    if (op) {
        try {
            visit(parse(op), {
                FragmentDefinition(def) {
                    externalFragments.push(def);
                },
            });
        }
        catch (_a) {
            return [];
        }
    }
    return externalFragments;
};
export function getAutocompleteSuggestions(schema, queryText, cursor, contextToken, fragmentDefs, options) {
    var _a;
    const opts = Object.assign(Object.assign({}, options), { schema });
    const context = getContextAtPosition(queryText, cursor, schema, contextToken, options);
    if (!context) {
        return [];
    }
    const { state, typeInfo, mode, token } = context;
    const { kind, step, prevState } = state;
    if (kind === RuleKinds.DOCUMENT) {
        if (mode === GraphQLDocumentMode.TYPE_SYSTEM) {
            return getSuggestionsForTypeSystemDefinitions(token);
        }
        if (mode === GraphQLDocumentMode.EXECUTABLE) {
            return getSuggestionsForExecutableDefinitions(token);
        }
        return getSuggestionsForUnknownDocumentMode(token);
    }
    if (kind === RuleKinds.EXTEND_DEF) {
        return getSuggestionsForExtensionDefinitions(token);
    }
    if (((_a = prevState === null || prevState === void 0 ? void 0 : prevState.prevState) === null || _a === void 0 ? void 0 : _a.kind) === RuleKinds.EXTENSION_DEFINITION &&
        state.name) {
        return hintList(token, []);
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === Kind.SCALAR_TYPE_EXTENSION) {
        return hintList(token, Object.values(schema.getTypeMap())
            .filter(isScalarType)
            .map(type => ({
            label: type.name,
            kind: CompletionItemKind.Function,
        })));
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === Kind.OBJECT_TYPE_EXTENSION) {
        return hintList(token, Object.values(schema.getTypeMap())
            .filter(type => isObjectType(type) && !type.name.startsWith('__'))
            .map(type => ({
            label: type.name,
            kind: CompletionItemKind.Function,
        })));
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === Kind.INTERFACE_TYPE_EXTENSION) {
        return hintList(token, Object.values(schema.getTypeMap())
            .filter(isInterfaceType)
            .map(type => ({
            label: type.name,
            kind: CompletionItemKind.Function,
        })));
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === Kind.UNION_TYPE_EXTENSION) {
        return hintList(token, Object.values(schema.getTypeMap())
            .filter(isUnionType)
            .map(type => ({
            label: type.name,
            kind: CompletionItemKind.Function,
        })));
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === Kind.ENUM_TYPE_EXTENSION) {
        return hintList(token, Object.values(schema.getTypeMap())
            .filter(type => isEnumType(type) && !type.name.startsWith('__'))
            .map(type => ({
            label: type.name,
            kind: CompletionItemKind.Function,
        })));
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === Kind.INPUT_OBJECT_TYPE_EXTENSION) {
        return hintList(token, Object.values(schema.getTypeMap())
            .filter(isInputObjectType)
            .map(type => ({
            label: type.name,
            kind: CompletionItemKind.Function,
        })));
    }
    if (kind === RuleKinds.IMPLEMENTS ||
        (kind === RuleKinds.NAMED_TYPE && (prevState === null || prevState === void 0 ? void 0 : prevState.kind) === RuleKinds.IMPLEMENTS)) {
        return getSuggestionsForImplements(token, state, schema, queryText, typeInfo);
    }
    if (kind === RuleKinds.SELECTION_SET ||
        kind === RuleKinds.FIELD ||
        kind === RuleKinds.ALIASED_FIELD) {
        return getSuggestionsForFieldNames(token, typeInfo, opts);
    }
    if (kind === RuleKinds.ARGUMENTS ||
        (kind === RuleKinds.ARGUMENT && step === 0)) {
        const { argDefs } = typeInfo;
        if (argDefs) {
            return hintList(token, argDefs.map((argDef) => {
                var _a;
                return ({
                    label: argDef.name,
                    insertText: getInputInsertText(argDef.name + ': ', argDef.type),
                    insertTextMode: InsertTextMode.adjustIndentation,
                    insertTextFormat: InsertTextFormat.Snippet,
                    command: SuggestionCommand,
                    labelDetails: {
                        detail: ' ' + String(argDef.type),
                    },
                    documentation: (_a = argDef.description) !== null && _a !== void 0 ? _a : undefined,
                    kind: CompletionItemKind.Variable,
                    type: argDef.type,
                });
            }));
        }
    }
    if ((kind === RuleKinds.OBJECT_VALUE ||
        (kind === RuleKinds.OBJECT_FIELD && step === 0)) &&
        typeInfo.objectFieldDefs) {
        const objectFields = objectValues(typeInfo.objectFieldDefs);
        const completionKind = kind === RuleKinds.OBJECT_VALUE
            ? CompletionItemKind.Value
            : CompletionItemKind.Field;
        return hintList(token, objectFields.map(field => {
            var _a;
            return ({
                label: field.name,
                detail: String(field.type),
                documentation: (_a = field === null || field === void 0 ? void 0 : field.description) !== null && _a !== void 0 ? _a : undefined,
                kind: completionKind,
                type: field.type,
                insertText: getInputInsertText(field.name + ': ', field.type),
                insertTextMode: InsertTextMode.adjustIndentation,
                insertTextFormat: InsertTextFormat.Snippet,
                command: SuggestionCommand,
            });
        }));
    }
    if (kind === RuleKinds.ENUM_VALUE ||
        (kind === RuleKinds.LIST_VALUE && step === 1) ||
        (kind === RuleKinds.OBJECT_FIELD && step === 2) ||
        (kind === RuleKinds.ARGUMENT && step === 2)) {
        return getSuggestionsForInputValues(token, typeInfo, queryText, schema);
    }
    if (kind === RuleKinds.VARIABLE && step === 1) {
        const namedInputType = getNamedType(typeInfo.inputType);
        const variableDefinitions = getVariableCompletions(queryText, schema, token);
        return hintList(token, variableDefinitions.filter(v => v.detail === (namedInputType === null || namedInputType === void 0 ? void 0 : namedInputType.name)));
    }
    if ((kind === RuleKinds.TYPE_CONDITION && step === 1) ||
        (kind === RuleKinds.NAMED_TYPE &&
            prevState != null &&
            prevState.kind === RuleKinds.TYPE_CONDITION)) {
        return getSuggestionsForFragmentTypeConditions(token, typeInfo, schema, kind);
    }
    if (kind === RuleKinds.FRAGMENT_SPREAD && step === 1) {
        return getSuggestionsForFragmentSpread(token, typeInfo, schema, queryText, Array.isArray(fragmentDefs)
            ? fragmentDefs
            : collectFragmentDefs(fragmentDefs));
    }
    const unwrappedState = unwrapType(state);
    if (unwrappedState.kind === RuleKinds.FIELD_DEF) {
        return hintList(token, Object.values(schema.getTypeMap())
            .filter(type => isOutputType(type) && !type.name.startsWith('__'))
            .map(type => ({
            label: type.name,
            kind: CompletionItemKind.Function,
            insertText: (options === null || options === void 0 ? void 0 : options.fillLeafsOnComplete)
                ? type.name + '\n'
                : type.name,
            insertTextMode: InsertTextMode.adjustIndentation,
        })));
    }
    if (unwrappedState.kind === RuleKinds.INPUT_VALUE_DEF && step === 2) {
        return hintList(token, Object.values(schema.getTypeMap())
            .filter(type => isInputType(type) && !type.name.startsWith('__'))
            .map(type => ({
            label: type.name,
            kind: CompletionItemKind.Function,
            insertText: (options === null || options === void 0 ? void 0 : options.fillLeafsOnComplete)
                ? type.name + '\n$1'
                : type.name,
            insertTextMode: InsertTextMode.adjustIndentation,
            insertTextFormat: InsertTextFormat.Snippet,
        })));
    }
    if ((kind === RuleKinds.VARIABLE_DEFINITION && step === 2) ||
        (kind === RuleKinds.LIST_TYPE && step === 1) ||
        (kind === RuleKinds.NAMED_TYPE &&
            prevState &&
            (prevState.kind === RuleKinds.VARIABLE_DEFINITION ||
                prevState.kind === RuleKinds.LIST_TYPE ||
                prevState.kind === RuleKinds.NON_NULL_TYPE))) {
        return getSuggestionsForVariableDefinition(token, schema, kind);
    }
    if (kind === RuleKinds.DIRECTIVE) {
        return getSuggestionsForDirective(token, state, schema, kind);
    }
    if (kind === RuleKinds.DIRECTIVE_DEF) {
        return getSuggestionsForDirectiveArguments(token, state, schema, kind);
    }
    return [];
}
const typeSystemCompletionItems = [
    { label: 'type', kind: CompletionItemKind.Function },
    { label: 'interface', kind: CompletionItemKind.Function },
    { label: 'union', kind: CompletionItemKind.Function },
    { label: 'input', kind: CompletionItemKind.Function },
    { label: 'scalar', kind: CompletionItemKind.Function },
    { label: 'schema', kind: CompletionItemKind.Function },
];
const executableCompletionItems = [
    { label: 'query', kind: CompletionItemKind.Function },
    { label: 'mutation', kind: CompletionItemKind.Function },
    { label: 'subscription', kind: CompletionItemKind.Function },
    { label: 'fragment', kind: CompletionItemKind.Function },
    { label: '{', kind: CompletionItemKind.Constructor },
];
function getSuggestionsForTypeSystemDefinitions(token) {
    return hintList(token, [
        { label: 'extend', kind: CompletionItemKind.Function },
        ...typeSystemCompletionItems,
    ]);
}
function getSuggestionsForExecutableDefinitions(token) {
    return hintList(token, executableCompletionItems);
}
function getSuggestionsForUnknownDocumentMode(token) {
    return hintList(token, [
        { label: 'extend', kind: CompletionItemKind.Function },
        ...executableCompletionItems,
        ...typeSystemCompletionItems,
    ]);
}
function getSuggestionsForExtensionDefinitions(token) {
    return hintList(token, typeSystemCompletionItems);
}
function getSuggestionsForFieldNames(token, typeInfo, options) {
    var _a;
    if (typeInfo.parentType) {
        const { parentType } = typeInfo;
        let fields = [];
        if ('getFields' in parentType) {
            fields = objectValues(parentType.getFields());
        }
        if (isCompositeType(parentType)) {
            fields.push(TypeNameMetaFieldDef);
        }
        if (parentType === ((_a = options === null || options === void 0 ? void 0 : options.schema) === null || _a === void 0 ? void 0 : _a.getQueryType())) {
            fields.push(SchemaMetaFieldDef, TypeMetaFieldDef);
        }
        return hintList(token, fields.map((field, index) => {
            var _a;
            const suggestion = {
                sortText: String(index) + field.name,
                label: field.name,
                detail: String(field.type),
                documentation: (_a = field.description) !== null && _a !== void 0 ? _a : undefined,
                deprecated: Boolean(field.deprecationReason),
                isDeprecated: Boolean(field.deprecationReason),
                deprecationReason: field.deprecationReason,
                kind: CompletionItemKind.Field,
                labelDetails: {
                    detail: ' ' + field.type.toString(),
                },
                type: field.type,
            };
            if (options === null || options === void 0 ? void 0 : options.fillLeafsOnComplete) {
                suggestion.insertText = getFieldInsertText(field);
                if (!suggestion.insertText) {
                    suggestion.insertText = getInsertText(field.name, field.type, field.name + (token.state.needsAdvance ? '' : '\n'));
                }
                if (suggestion.insertText) {
                    suggestion.insertTextFormat = InsertTextFormat.Snippet;
                    suggestion.insertTextMode = InsertTextMode.adjustIndentation;
                    suggestion.command = SuggestionCommand;
                }
            }
            return suggestion;
        }));
    }
    return [];
}
function getSuggestionsForInputValues(token, typeInfo, queryText, schema) {
    const namedInputType = getNamedType(typeInfo.inputType);
    const queryVariables = getVariableCompletions(queryText, schema, token).filter(v => v.detail === (namedInputType === null || namedInputType === void 0 ? void 0 : namedInputType.name));
    if (namedInputType instanceof GraphQLEnumType) {
        const values = namedInputType.getValues();
        return hintList(token, values
            .map((value) => {
            var _a;
            return ({
                label: value.name,
                detail: String(namedInputType),
                documentation: (_a = value.description) !== null && _a !== void 0 ? _a : undefined,
                deprecated: Boolean(value.deprecationReason),
                isDeprecated: Boolean(value.deprecationReason),
                deprecationReason: value.deprecationReason,
                kind: CompletionItemKind.EnumMember,
                type: namedInputType,
            });
        })
            .concat(queryVariables));
    }
    if (namedInputType === GraphQLBoolean) {
        return hintList(token, queryVariables.concat([
            {
                label: 'true',
                detail: String(GraphQLBoolean),
                documentation: 'Not false.',
                kind: CompletionItemKind.Variable,
                type: GraphQLBoolean,
            },
            {
                label: 'false',
                detail: String(GraphQLBoolean),
                documentation: 'Not true.',
                kind: CompletionItemKind.Variable,
                type: GraphQLBoolean,
            },
        ]));
    }
    return queryVariables;
}
function getSuggestionsForImplements(token, tokenState, schema, documentText, typeInfo) {
    if (tokenState.needsSeparator) {
        return [];
    }
    const typeMap = schema.getTypeMap();
    const schemaInterfaces = objectValues(typeMap).filter(isInterfaceType);
    const schemaInterfaceNames = schemaInterfaces.map(({ name }) => name);
    const inlineInterfaces = new Set();
    runOnlineParser(documentText, (_, state) => {
        var _a, _b, _c, _d, _e;
        if (state.name) {
            if (state.kind === RuleKinds.INTERFACE_DEF &&
                !schemaInterfaceNames.includes(state.name)) {
                inlineInterfaces.add(state.name);
            }
            if (state.kind === RuleKinds.NAMED_TYPE &&
                ((_a = state.prevState) === null || _a === void 0 ? void 0 : _a.kind) === RuleKinds.IMPLEMENTS) {
                if (typeInfo.interfaceDef) {
                    const existingType = (_b = typeInfo.interfaceDef) === null || _b === void 0 ? void 0 : _b.getInterfaces().find(({ name }) => name === state.name);
                    if (existingType) {
                        return;
                    }
                    const type = schema.getType(state.name);
                    const interfaceConfig = (_c = typeInfo.interfaceDef) === null || _c === void 0 ? void 0 : _c.toConfig();
                    typeInfo.interfaceDef = new GraphQLInterfaceType(Object.assign(Object.assign({}, interfaceConfig), { interfaces: [
                            ...interfaceConfig.interfaces,
                            type ||
                                new GraphQLInterfaceType({ name: state.name, fields: {} }),
                        ] }));
                }
                else if (typeInfo.objectTypeDef) {
                    const existingType = (_d = typeInfo.objectTypeDef) === null || _d === void 0 ? void 0 : _d.getInterfaces().find(({ name }) => name === state.name);
                    if (existingType) {
                        return;
                    }
                    const type = schema.getType(state.name);
                    const objectTypeConfig = (_e = typeInfo.objectTypeDef) === null || _e === void 0 ? void 0 : _e.toConfig();
                    typeInfo.objectTypeDef = new GraphQLObjectType(Object.assign(Object.assign({}, objectTypeConfig), { interfaces: [
                            ...objectTypeConfig.interfaces,
                            type ||
                                new GraphQLInterfaceType({ name: state.name, fields: {} }),
                        ] }));
                }
            }
        }
    });
    const currentTypeToExtend = typeInfo.interfaceDef || typeInfo.objectTypeDef;
    const siblingInterfaces = (currentTypeToExtend === null || currentTypeToExtend === void 0 ? void 0 : currentTypeToExtend.getInterfaces()) || [];
    const siblingInterfaceNames = siblingInterfaces.map(({ name }) => name);
    const possibleInterfaces = schemaInterfaces
        .concat([...inlineInterfaces].map(name => ({ name })))
        .filter(({ name }) => name !== (currentTypeToExtend === null || currentTypeToExtend === void 0 ? void 0 : currentTypeToExtend.name) &&
        !siblingInterfaceNames.includes(name));
    return hintList(token, possibleInterfaces.map(type => {
        const result = {
            label: type.name,
            kind: CompletionItemKind.Interface,
            type,
        };
        if (type === null || type === void 0 ? void 0 : type.description) {
            result.documentation = type.description;
        }
        return result;
    }));
}
function getSuggestionsForFragmentTypeConditions(token, typeInfo, schema, _kind) {
    let possibleTypes;
    if (typeInfo.parentType) {
        if (isAbstractType(typeInfo.parentType)) {
            const abstractType = assertAbstractType(typeInfo.parentType);
            const possibleObjTypes = schema.getPossibleTypes(abstractType);
            const possibleIfaceMap = Object.create(null);
            for (const type of possibleObjTypes) {
                for (const iface of type.getInterfaces()) {
                    possibleIfaceMap[iface.name] = iface;
                }
            }
            possibleTypes = possibleObjTypes.concat(objectValues(possibleIfaceMap));
        }
        else {
            possibleTypes = [typeInfo.parentType];
        }
    }
    else {
        const typeMap = schema.getTypeMap();
        possibleTypes = objectValues(typeMap).filter(type => isCompositeType(type) && !type.name.startsWith('__'));
    }
    return hintList(token, possibleTypes.map(type => {
        const namedType = getNamedType(type);
        return {
            label: String(type),
            documentation: (namedType === null || namedType === void 0 ? void 0 : namedType.description) || '',
            kind: CompletionItemKind.Field,
        };
    }));
}
function getSuggestionsForFragmentSpread(token, typeInfo, schema, queryText, fragmentDefs) {
    if (!queryText) {
        return [];
    }
    const typeMap = schema.getTypeMap();
    const defState = getDefinitionState(token.state);
    const fragments = getFragmentDefinitions(queryText);
    if (fragmentDefs && fragmentDefs.length > 0) {
        fragments.push(...fragmentDefs);
    }
    const relevantFrags = fragments.filter(frag => typeMap[frag.typeCondition.name.value] &&
        !(defState &&
            defState.kind === RuleKinds.FRAGMENT_DEFINITION &&
            defState.name === frag.name.value) &&
        isCompositeType(typeInfo.parentType) &&
        isCompositeType(typeMap[frag.typeCondition.name.value]) &&
        doTypesOverlap(schema, typeInfo.parentType, typeMap[frag.typeCondition.name.value]));
    return hintList(token, relevantFrags.map(frag => ({
        label: frag.name.value,
        detail: String(typeMap[frag.typeCondition.name.value]),
        documentation: `fragment ${frag.name.value} on ${frag.typeCondition.name.value}`,
        labelDetails: {
            detail: `fragment ${frag.name.value} on ${frag.typeCondition.name.value}`,
        },
        kind: CompletionItemKind.Field,
        type: typeMap[frag.typeCondition.name.value],
    })));
}
const getParentDefinition = (state, kind) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (((_a = state.prevState) === null || _a === void 0 ? void 0 : _a.kind) === kind) {
        return state.prevState;
    }
    if (((_c = (_b = state.prevState) === null || _b === void 0 ? void 0 : _b.prevState) === null || _c === void 0 ? void 0 : _c.kind) === kind) {
        return state.prevState.prevState;
    }
    if (((_f = (_e = (_d = state.prevState) === null || _d === void 0 ? void 0 : _d.prevState) === null || _e === void 0 ? void 0 : _e.prevState) === null || _f === void 0 ? void 0 : _f.kind) === kind) {
        return state.prevState.prevState.prevState;
    }
    if (((_k = (_j = (_h = (_g = state.prevState) === null || _g === void 0 ? void 0 : _g.prevState) === null || _h === void 0 ? void 0 : _h.prevState) === null || _j === void 0 ? void 0 : _j.prevState) === null || _k === void 0 ? void 0 : _k.kind) === kind) {
        return state.prevState.prevState.prevState.prevState;
    }
};
export function getVariableCompletions(queryText, schema, token) {
    let variableName = null;
    let variableType;
    const definitions = Object.create({});
    runOnlineParser(queryText, (_, state) => {
        var _a;
        if ((state === null || state === void 0 ? void 0 : state.kind) === RuleKinds.VARIABLE && state.name) {
            variableName = state.name;
        }
        if ((state === null || state === void 0 ? void 0 : state.kind) === RuleKinds.NAMED_TYPE && variableName) {
            const parentDefinition = getParentDefinition(state, RuleKinds.TYPE);
            if (parentDefinition === null || parentDefinition === void 0 ? void 0 : parentDefinition.type) {
                variableType = schema.getType(parentDefinition === null || parentDefinition === void 0 ? void 0 : parentDefinition.type);
            }
        }
        if (variableName && variableType && !definitions[variableName]) {
            const replaceString = token.string === '$' || ((_a = token === null || token === void 0 ? void 0 : token.state) === null || _a === void 0 ? void 0 : _a.kind) === 'Variable'
                ? variableName
                : '$' + variableName;
            definitions[variableName] = {
                detail: variableType.toString(),
                insertText: replaceString,
                label: '$' + variableName,
                rawInsert: replaceString,
                type: variableType,
                kind: CompletionItemKind.Variable,
            };
            variableName = null;
            variableType = null;
        }
    });
    return objectValues(definitions);
}
export function getFragmentDefinitions(queryText) {
    const fragmentDefs = [];
    runOnlineParser(queryText, (_, state) => {
        if (state.kind === RuleKinds.FRAGMENT_DEFINITION &&
            state.name &&
            state.type) {
            fragmentDefs.push({
                kind: RuleKinds.FRAGMENT_DEFINITION,
                name: {
                    kind: Kind.NAME,
                    value: state.name,
                },
                selectionSet: {
                    kind: RuleKinds.SELECTION_SET,
                    selections: [],
                },
                typeCondition: {
                    kind: RuleKinds.NAMED_TYPE,
                    name: {
                        kind: Kind.NAME,
                        value: state.type,
                    },
                },
            });
        }
    });
    return fragmentDefs;
}
function getSuggestionsForVariableDefinition(token, schema, _kind) {
    const inputTypeMap = schema.getTypeMap();
    const inputTypes = objectValues(inputTypeMap).filter(isInputType);
    return hintList(token, inputTypes.map((type) => ({
        label: type.name,
        documentation: (type === null || type === void 0 ? void 0 : type.description) || '',
        kind: CompletionItemKind.Variable,
    })));
}
function getSuggestionsForDirective(token, state, schema, _kind) {
    var _a;
    if ((_a = state.prevState) === null || _a === void 0 ? void 0 : _a.kind) {
        const directives = schema
            .getDirectives()
            .filter(directive => canUseDirective(state.prevState, directive));
        return hintList(token, directives.map(directive => ({
            label: directive.name,
            documentation: (directive === null || directive === void 0 ? void 0 : directive.description) || '',
            kind: CompletionItemKind.Function,
        })));
    }
    return [];
}
function getSuggestionsForDirectiveArguments(token, state, schema, _kind) {
    const directive = schema.getDirectives().find(d => d.name === state.name);
    return hintList(token, (directive === null || directive === void 0 ? void 0 : directive.args.map(arg => ({
        label: arg.name,
        documentation: arg.description || '',
        kind: CompletionItemKind.Field,
    }))) || []);
}
export function canUseDirective(state, directive) {
    if (!(state === null || state === void 0 ? void 0 : state.kind)) {
        return false;
    }
    const { kind, prevState } = state;
    const { locations } = directive;
    switch (kind) {
        case RuleKinds.QUERY:
            return locations.includes(DirectiveLocation.QUERY);
        case RuleKinds.MUTATION:
            return locations.includes(DirectiveLocation.MUTATION);
        case RuleKinds.SUBSCRIPTION:
            return locations.includes(DirectiveLocation.SUBSCRIPTION);
        case RuleKinds.FIELD:
        case RuleKinds.ALIASED_FIELD:
            return locations.includes(DirectiveLocation.FIELD);
        case RuleKinds.FRAGMENT_DEFINITION:
            return locations.includes(DirectiveLocation.FRAGMENT_DEFINITION);
        case RuleKinds.FRAGMENT_SPREAD:
            return locations.includes(DirectiveLocation.FRAGMENT_SPREAD);
        case RuleKinds.INLINE_FRAGMENT:
            return locations.includes(DirectiveLocation.INLINE_FRAGMENT);
        case RuleKinds.SCHEMA_DEF:
            return locations.includes(DirectiveLocation.SCHEMA);
        case RuleKinds.SCALAR_DEF:
            return locations.includes(DirectiveLocation.SCALAR);
        case RuleKinds.OBJECT_TYPE_DEF:
            return locations.includes(DirectiveLocation.OBJECT);
        case RuleKinds.FIELD_DEF:
            return locations.includes(DirectiveLocation.FIELD_DEFINITION);
        case RuleKinds.INTERFACE_DEF:
            return locations.includes(DirectiveLocation.INTERFACE);
        case RuleKinds.UNION_DEF:
            return locations.includes(DirectiveLocation.UNION);
        case RuleKinds.ENUM_DEF:
            return locations.includes(DirectiveLocation.ENUM);
        case RuleKinds.ENUM_VALUE:
            return locations.includes(DirectiveLocation.ENUM_VALUE);
        case RuleKinds.INPUT_DEF:
            return locations.includes(DirectiveLocation.INPUT_OBJECT);
        case RuleKinds.INPUT_VALUE_DEF:
            const prevStateKind = prevState === null || prevState === void 0 ? void 0 : prevState.kind;
            switch (prevStateKind) {
                case RuleKinds.ARGUMENTS_DEF:
                    return locations.includes(DirectiveLocation.ARGUMENT_DEFINITION);
                case RuleKinds.INPUT_DEF:
                    return locations.includes(DirectiveLocation.INPUT_FIELD_DEFINITION);
            }
    }
    return false;
}
function unwrapType(state) {
    if (state.prevState &&
        state.kind &&
        [
            RuleKinds.NAMED_TYPE,
            RuleKinds.LIST_TYPE,
            RuleKinds.TYPE,
            RuleKinds.NON_NULL_TYPE,
        ].includes(state.kind)) {
        return unwrapType(state.prevState);
    }
    return state;
}
//# sourceMappingURL=getAutocompleteSuggestions.js.map