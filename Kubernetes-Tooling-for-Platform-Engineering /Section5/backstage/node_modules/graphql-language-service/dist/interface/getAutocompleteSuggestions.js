"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUseDirective = exports.getFragmentDefinitions = exports.getVariableCompletions = exports.getAutocompleteSuggestions = exports.SuggestionCommand = exports.getTypeInfo = exports.runOnlineParser = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../types");
const parser_1 = require("../parser");
Object.defineProperty(exports, "getTypeInfo", { enumerable: true, get: function () { return parser_1.getTypeInfo; } });
Object.defineProperty(exports, "runOnlineParser", { enumerable: true, get: function () { return parser_1.runOnlineParser; } });
const autocompleteUtils_1 = require("./autocompleteUtils");
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
exports.SuggestionCommand = {
    command: 'editor.action.triggerSuggest',
    title: 'Suggestions',
};
const collectFragmentDefs = (op) => {
    const externalFragments = [];
    if (op) {
        try {
            (0, graphql_1.visit)((0, graphql_1.parse)(op), {
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
function getAutocompleteSuggestions(schema, queryText, cursor, contextToken, fragmentDefs, options) {
    var _a;
    const opts = Object.assign(Object.assign({}, options), { schema });
    const context = (0, parser_1.getContextAtPosition)(queryText, cursor, schema, contextToken, options);
    if (!context) {
        return [];
    }
    const { state, typeInfo, mode, token } = context;
    const { kind, step, prevState } = state;
    if (kind === parser_1.RuleKinds.DOCUMENT) {
        if (mode === parser_1.GraphQLDocumentMode.TYPE_SYSTEM) {
            return getSuggestionsForTypeSystemDefinitions(token);
        }
        if (mode === parser_1.GraphQLDocumentMode.EXECUTABLE) {
            return getSuggestionsForExecutableDefinitions(token);
        }
        return getSuggestionsForUnknownDocumentMode(token);
    }
    if (kind === parser_1.RuleKinds.EXTEND_DEF) {
        return getSuggestionsForExtensionDefinitions(token);
    }
    if (((_a = prevState === null || prevState === void 0 ? void 0 : prevState.prevState) === null || _a === void 0 ? void 0 : _a.kind) === parser_1.RuleKinds.EXTENSION_DEFINITION &&
        state.name) {
        return (0, autocompleteUtils_1.hintList)(token, []);
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === graphql_1.Kind.SCALAR_TYPE_EXTENSION) {
        return (0, autocompleteUtils_1.hintList)(token, Object.values(schema.getTypeMap())
            .filter(graphql_1.isScalarType)
            .map(type => ({
            label: type.name,
            kind: types_1.CompletionItemKind.Function,
        })));
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === graphql_1.Kind.OBJECT_TYPE_EXTENSION) {
        return (0, autocompleteUtils_1.hintList)(token, Object.values(schema.getTypeMap())
            .filter(type => (0, graphql_1.isObjectType)(type) && !type.name.startsWith('__'))
            .map(type => ({
            label: type.name,
            kind: types_1.CompletionItemKind.Function,
        })));
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === graphql_1.Kind.INTERFACE_TYPE_EXTENSION) {
        return (0, autocompleteUtils_1.hintList)(token, Object.values(schema.getTypeMap())
            .filter(graphql_1.isInterfaceType)
            .map(type => ({
            label: type.name,
            kind: types_1.CompletionItemKind.Function,
        })));
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === graphql_1.Kind.UNION_TYPE_EXTENSION) {
        return (0, autocompleteUtils_1.hintList)(token, Object.values(schema.getTypeMap())
            .filter(graphql_1.isUnionType)
            .map(type => ({
            label: type.name,
            kind: types_1.CompletionItemKind.Function,
        })));
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === graphql_1.Kind.ENUM_TYPE_EXTENSION) {
        return (0, autocompleteUtils_1.hintList)(token, Object.values(schema.getTypeMap())
            .filter(type => (0, graphql_1.isEnumType)(type) && !type.name.startsWith('__'))
            .map(type => ({
            label: type.name,
            kind: types_1.CompletionItemKind.Function,
        })));
    }
    if ((prevState === null || prevState === void 0 ? void 0 : prevState.kind) === graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION) {
        return (0, autocompleteUtils_1.hintList)(token, Object.values(schema.getTypeMap())
            .filter(graphql_1.isInputObjectType)
            .map(type => ({
            label: type.name,
            kind: types_1.CompletionItemKind.Function,
        })));
    }
    if (kind === parser_1.RuleKinds.IMPLEMENTS ||
        (kind === parser_1.RuleKinds.NAMED_TYPE && (prevState === null || prevState === void 0 ? void 0 : prevState.kind) === parser_1.RuleKinds.IMPLEMENTS)) {
        return getSuggestionsForImplements(token, state, schema, queryText, typeInfo);
    }
    if (kind === parser_1.RuleKinds.SELECTION_SET ||
        kind === parser_1.RuleKinds.FIELD ||
        kind === parser_1.RuleKinds.ALIASED_FIELD) {
        return getSuggestionsForFieldNames(token, typeInfo, opts);
    }
    if (kind === parser_1.RuleKinds.ARGUMENTS ||
        (kind === parser_1.RuleKinds.ARGUMENT && step === 0)) {
        const { argDefs } = typeInfo;
        if (argDefs) {
            return (0, autocompleteUtils_1.hintList)(token, argDefs.map((argDef) => {
                var _a;
                return ({
                    label: argDef.name,
                    insertText: (0, autocompleteUtils_1.getInputInsertText)(argDef.name + ': ', argDef.type),
                    insertTextMode: vscode_languageserver_types_1.InsertTextMode.adjustIndentation,
                    insertTextFormat: types_1.InsertTextFormat.Snippet,
                    command: exports.SuggestionCommand,
                    labelDetails: {
                        detail: ' ' + String(argDef.type),
                    },
                    documentation: (_a = argDef.description) !== null && _a !== void 0 ? _a : undefined,
                    kind: types_1.CompletionItemKind.Variable,
                    type: argDef.type,
                });
            }));
        }
    }
    if ((kind === parser_1.RuleKinds.OBJECT_VALUE ||
        (kind === parser_1.RuleKinds.OBJECT_FIELD && step === 0)) &&
        typeInfo.objectFieldDefs) {
        const objectFields = (0, autocompleteUtils_1.objectValues)(typeInfo.objectFieldDefs);
        const completionKind = kind === parser_1.RuleKinds.OBJECT_VALUE
            ? types_1.CompletionItemKind.Value
            : types_1.CompletionItemKind.Field;
        return (0, autocompleteUtils_1.hintList)(token, objectFields.map(field => {
            var _a;
            return ({
                label: field.name,
                detail: String(field.type),
                documentation: (_a = field === null || field === void 0 ? void 0 : field.description) !== null && _a !== void 0 ? _a : undefined,
                kind: completionKind,
                type: field.type,
                insertText: (0, autocompleteUtils_1.getInputInsertText)(field.name + ': ', field.type),
                insertTextMode: vscode_languageserver_types_1.InsertTextMode.adjustIndentation,
                insertTextFormat: types_1.InsertTextFormat.Snippet,
                command: exports.SuggestionCommand,
            });
        }));
    }
    if (kind === parser_1.RuleKinds.ENUM_VALUE ||
        (kind === parser_1.RuleKinds.LIST_VALUE && step === 1) ||
        (kind === parser_1.RuleKinds.OBJECT_FIELD && step === 2) ||
        (kind === parser_1.RuleKinds.ARGUMENT && step === 2)) {
        return getSuggestionsForInputValues(token, typeInfo, queryText, schema);
    }
    if (kind === parser_1.RuleKinds.VARIABLE && step === 1) {
        const namedInputType = (0, graphql_1.getNamedType)(typeInfo.inputType);
        const variableDefinitions = getVariableCompletions(queryText, schema, token);
        return (0, autocompleteUtils_1.hintList)(token, variableDefinitions.filter(v => v.detail === (namedInputType === null || namedInputType === void 0 ? void 0 : namedInputType.name)));
    }
    if ((kind === parser_1.RuleKinds.TYPE_CONDITION && step === 1) ||
        (kind === parser_1.RuleKinds.NAMED_TYPE &&
            prevState != null &&
            prevState.kind === parser_1.RuleKinds.TYPE_CONDITION)) {
        return getSuggestionsForFragmentTypeConditions(token, typeInfo, schema, kind);
    }
    if (kind === parser_1.RuleKinds.FRAGMENT_SPREAD && step === 1) {
        return getSuggestionsForFragmentSpread(token, typeInfo, schema, queryText, Array.isArray(fragmentDefs)
            ? fragmentDefs
            : collectFragmentDefs(fragmentDefs));
    }
    const unwrappedState = unwrapType(state);
    if (unwrappedState.kind === parser_1.RuleKinds.FIELD_DEF) {
        return (0, autocompleteUtils_1.hintList)(token, Object.values(schema.getTypeMap())
            .filter(type => (0, graphql_1.isOutputType)(type) && !type.name.startsWith('__'))
            .map(type => ({
            label: type.name,
            kind: types_1.CompletionItemKind.Function,
            insertText: (options === null || options === void 0 ? void 0 : options.fillLeafsOnComplete)
                ? type.name + '\n'
                : type.name,
            insertTextMode: vscode_languageserver_types_1.InsertTextMode.adjustIndentation,
        })));
    }
    if (unwrappedState.kind === parser_1.RuleKinds.INPUT_VALUE_DEF && step === 2) {
        return (0, autocompleteUtils_1.hintList)(token, Object.values(schema.getTypeMap())
            .filter(type => (0, graphql_1.isInputType)(type) && !type.name.startsWith('__'))
            .map(type => ({
            label: type.name,
            kind: types_1.CompletionItemKind.Function,
            insertText: (options === null || options === void 0 ? void 0 : options.fillLeafsOnComplete)
                ? type.name + '\n$1'
                : type.name,
            insertTextMode: vscode_languageserver_types_1.InsertTextMode.adjustIndentation,
            insertTextFormat: types_1.InsertTextFormat.Snippet,
        })));
    }
    if ((kind === parser_1.RuleKinds.VARIABLE_DEFINITION && step === 2) ||
        (kind === parser_1.RuleKinds.LIST_TYPE && step === 1) ||
        (kind === parser_1.RuleKinds.NAMED_TYPE &&
            prevState &&
            (prevState.kind === parser_1.RuleKinds.VARIABLE_DEFINITION ||
                prevState.kind === parser_1.RuleKinds.LIST_TYPE ||
                prevState.kind === parser_1.RuleKinds.NON_NULL_TYPE))) {
        return getSuggestionsForVariableDefinition(token, schema, kind);
    }
    if (kind === parser_1.RuleKinds.DIRECTIVE) {
        return getSuggestionsForDirective(token, state, schema, kind);
    }
    if (kind === parser_1.RuleKinds.DIRECTIVE_DEF) {
        return getSuggestionsForDirectiveArguments(token, state, schema, kind);
    }
    return [];
}
exports.getAutocompleteSuggestions = getAutocompleteSuggestions;
const typeSystemCompletionItems = [
    { label: 'type', kind: types_1.CompletionItemKind.Function },
    { label: 'interface', kind: types_1.CompletionItemKind.Function },
    { label: 'union', kind: types_1.CompletionItemKind.Function },
    { label: 'input', kind: types_1.CompletionItemKind.Function },
    { label: 'scalar', kind: types_1.CompletionItemKind.Function },
    { label: 'schema', kind: types_1.CompletionItemKind.Function },
];
const executableCompletionItems = [
    { label: 'query', kind: types_1.CompletionItemKind.Function },
    { label: 'mutation', kind: types_1.CompletionItemKind.Function },
    { label: 'subscription', kind: types_1.CompletionItemKind.Function },
    { label: 'fragment', kind: types_1.CompletionItemKind.Function },
    { label: '{', kind: types_1.CompletionItemKind.Constructor },
];
function getSuggestionsForTypeSystemDefinitions(token) {
    return (0, autocompleteUtils_1.hintList)(token, [
        { label: 'extend', kind: types_1.CompletionItemKind.Function },
        ...typeSystemCompletionItems,
    ]);
}
function getSuggestionsForExecutableDefinitions(token) {
    return (0, autocompleteUtils_1.hintList)(token, executableCompletionItems);
}
function getSuggestionsForUnknownDocumentMode(token) {
    return (0, autocompleteUtils_1.hintList)(token, [
        { label: 'extend', kind: types_1.CompletionItemKind.Function },
        ...executableCompletionItems,
        ...typeSystemCompletionItems,
    ]);
}
function getSuggestionsForExtensionDefinitions(token) {
    return (0, autocompleteUtils_1.hintList)(token, typeSystemCompletionItems);
}
function getSuggestionsForFieldNames(token, typeInfo, options) {
    var _a;
    if (typeInfo.parentType) {
        const { parentType } = typeInfo;
        let fields = [];
        if ('getFields' in parentType) {
            fields = (0, autocompleteUtils_1.objectValues)(parentType.getFields());
        }
        if ((0, graphql_1.isCompositeType)(parentType)) {
            fields.push(graphql_1.TypeNameMetaFieldDef);
        }
        if (parentType === ((_a = options === null || options === void 0 ? void 0 : options.schema) === null || _a === void 0 ? void 0 : _a.getQueryType())) {
            fields.push(graphql_1.SchemaMetaFieldDef, graphql_1.TypeMetaFieldDef);
        }
        return (0, autocompleteUtils_1.hintList)(token, fields.map((field, index) => {
            var _a;
            const suggestion = {
                sortText: String(index) + field.name,
                label: field.name,
                detail: String(field.type),
                documentation: (_a = field.description) !== null && _a !== void 0 ? _a : undefined,
                deprecated: Boolean(field.deprecationReason),
                isDeprecated: Boolean(field.deprecationReason),
                deprecationReason: field.deprecationReason,
                kind: types_1.CompletionItemKind.Field,
                labelDetails: {
                    detail: ' ' + field.type.toString(),
                },
                type: field.type,
            };
            if (options === null || options === void 0 ? void 0 : options.fillLeafsOnComplete) {
                suggestion.insertText = (0, autocompleteUtils_1.getFieldInsertText)(field);
                if (!suggestion.insertText) {
                    suggestion.insertText = (0, autocompleteUtils_1.getInsertText)(field.name, field.type, field.name + (token.state.needsAdvance ? '' : '\n'));
                }
                if (suggestion.insertText) {
                    suggestion.insertTextFormat = types_1.InsertTextFormat.Snippet;
                    suggestion.insertTextMode = vscode_languageserver_types_1.InsertTextMode.adjustIndentation;
                    suggestion.command = exports.SuggestionCommand;
                }
            }
            return suggestion;
        }));
    }
    return [];
}
function getSuggestionsForInputValues(token, typeInfo, queryText, schema) {
    const namedInputType = (0, graphql_1.getNamedType)(typeInfo.inputType);
    const queryVariables = getVariableCompletions(queryText, schema, token).filter(v => v.detail === (namedInputType === null || namedInputType === void 0 ? void 0 : namedInputType.name));
    if (namedInputType instanceof graphql_1.GraphQLEnumType) {
        const values = namedInputType.getValues();
        return (0, autocompleteUtils_1.hintList)(token, values
            .map((value) => {
            var _a;
            return ({
                label: value.name,
                detail: String(namedInputType),
                documentation: (_a = value.description) !== null && _a !== void 0 ? _a : undefined,
                deprecated: Boolean(value.deprecationReason),
                isDeprecated: Boolean(value.deprecationReason),
                deprecationReason: value.deprecationReason,
                kind: types_1.CompletionItemKind.EnumMember,
                type: namedInputType,
            });
        })
            .concat(queryVariables));
    }
    if (namedInputType === graphql_1.GraphQLBoolean) {
        return (0, autocompleteUtils_1.hintList)(token, queryVariables.concat([
            {
                label: 'true',
                detail: String(graphql_1.GraphQLBoolean),
                documentation: 'Not false.',
                kind: types_1.CompletionItemKind.Variable,
                type: graphql_1.GraphQLBoolean,
            },
            {
                label: 'false',
                detail: String(graphql_1.GraphQLBoolean),
                documentation: 'Not true.',
                kind: types_1.CompletionItemKind.Variable,
                type: graphql_1.GraphQLBoolean,
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
    const schemaInterfaces = (0, autocompleteUtils_1.objectValues)(typeMap).filter(graphql_1.isInterfaceType);
    const schemaInterfaceNames = schemaInterfaces.map(({ name }) => name);
    const inlineInterfaces = new Set();
    (0, parser_1.runOnlineParser)(documentText, (_, state) => {
        var _a, _b, _c, _d, _e;
        if (state.name) {
            if (state.kind === parser_1.RuleKinds.INTERFACE_DEF &&
                !schemaInterfaceNames.includes(state.name)) {
                inlineInterfaces.add(state.name);
            }
            if (state.kind === parser_1.RuleKinds.NAMED_TYPE &&
                ((_a = state.prevState) === null || _a === void 0 ? void 0 : _a.kind) === parser_1.RuleKinds.IMPLEMENTS) {
                if (typeInfo.interfaceDef) {
                    const existingType = (_b = typeInfo.interfaceDef) === null || _b === void 0 ? void 0 : _b.getInterfaces().find(({ name }) => name === state.name);
                    if (existingType) {
                        return;
                    }
                    const type = schema.getType(state.name);
                    const interfaceConfig = (_c = typeInfo.interfaceDef) === null || _c === void 0 ? void 0 : _c.toConfig();
                    typeInfo.interfaceDef = new graphql_1.GraphQLInterfaceType(Object.assign(Object.assign({}, interfaceConfig), { interfaces: [
                            ...interfaceConfig.interfaces,
                            type ||
                                new graphql_1.GraphQLInterfaceType({ name: state.name, fields: {} }),
                        ] }));
                }
                else if (typeInfo.objectTypeDef) {
                    const existingType = (_d = typeInfo.objectTypeDef) === null || _d === void 0 ? void 0 : _d.getInterfaces().find(({ name }) => name === state.name);
                    if (existingType) {
                        return;
                    }
                    const type = schema.getType(state.name);
                    const objectTypeConfig = (_e = typeInfo.objectTypeDef) === null || _e === void 0 ? void 0 : _e.toConfig();
                    typeInfo.objectTypeDef = new graphql_1.GraphQLObjectType(Object.assign(Object.assign({}, objectTypeConfig), { interfaces: [
                            ...objectTypeConfig.interfaces,
                            type ||
                                new graphql_1.GraphQLInterfaceType({ name: state.name, fields: {} }),
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
    return (0, autocompleteUtils_1.hintList)(token, possibleInterfaces.map(type => {
        const result = {
            label: type.name,
            kind: types_1.CompletionItemKind.Interface,
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
        if ((0, graphql_1.isAbstractType)(typeInfo.parentType)) {
            const abstractType = (0, graphql_1.assertAbstractType)(typeInfo.parentType);
            const possibleObjTypes = schema.getPossibleTypes(abstractType);
            const possibleIfaceMap = Object.create(null);
            for (const type of possibleObjTypes) {
                for (const iface of type.getInterfaces()) {
                    possibleIfaceMap[iface.name] = iface;
                }
            }
            possibleTypes = possibleObjTypes.concat((0, autocompleteUtils_1.objectValues)(possibleIfaceMap));
        }
        else {
            possibleTypes = [typeInfo.parentType];
        }
    }
    else {
        const typeMap = schema.getTypeMap();
        possibleTypes = (0, autocompleteUtils_1.objectValues)(typeMap).filter(type => (0, graphql_1.isCompositeType)(type) && !type.name.startsWith('__'));
    }
    return (0, autocompleteUtils_1.hintList)(token, possibleTypes.map(type => {
        const namedType = (0, graphql_1.getNamedType)(type);
        return {
            label: String(type),
            documentation: (namedType === null || namedType === void 0 ? void 0 : namedType.description) || '',
            kind: types_1.CompletionItemKind.Field,
        };
    }));
}
function getSuggestionsForFragmentSpread(token, typeInfo, schema, queryText, fragmentDefs) {
    if (!queryText) {
        return [];
    }
    const typeMap = schema.getTypeMap();
    const defState = (0, parser_1.getDefinitionState)(token.state);
    const fragments = getFragmentDefinitions(queryText);
    if (fragmentDefs && fragmentDefs.length > 0) {
        fragments.push(...fragmentDefs);
    }
    const relevantFrags = fragments.filter(frag => typeMap[frag.typeCondition.name.value] &&
        !(defState &&
            defState.kind === parser_1.RuleKinds.FRAGMENT_DEFINITION &&
            defState.name === frag.name.value) &&
        (0, graphql_1.isCompositeType)(typeInfo.parentType) &&
        (0, graphql_1.isCompositeType)(typeMap[frag.typeCondition.name.value]) &&
        (0, graphql_1.doTypesOverlap)(schema, typeInfo.parentType, typeMap[frag.typeCondition.name.value]));
    return (0, autocompleteUtils_1.hintList)(token, relevantFrags.map(frag => ({
        label: frag.name.value,
        detail: String(typeMap[frag.typeCondition.name.value]),
        documentation: `fragment ${frag.name.value} on ${frag.typeCondition.name.value}`,
        labelDetails: {
            detail: `fragment ${frag.name.value} on ${frag.typeCondition.name.value}`,
        },
        kind: types_1.CompletionItemKind.Field,
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
function getVariableCompletions(queryText, schema, token) {
    let variableName = null;
    let variableType;
    const definitions = Object.create({});
    (0, parser_1.runOnlineParser)(queryText, (_, state) => {
        var _a;
        if ((state === null || state === void 0 ? void 0 : state.kind) === parser_1.RuleKinds.VARIABLE && state.name) {
            variableName = state.name;
        }
        if ((state === null || state === void 0 ? void 0 : state.kind) === parser_1.RuleKinds.NAMED_TYPE && variableName) {
            const parentDefinition = getParentDefinition(state, parser_1.RuleKinds.TYPE);
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
                kind: types_1.CompletionItemKind.Variable,
            };
            variableName = null;
            variableType = null;
        }
    });
    return (0, autocompleteUtils_1.objectValues)(definitions);
}
exports.getVariableCompletions = getVariableCompletions;
function getFragmentDefinitions(queryText) {
    const fragmentDefs = [];
    (0, parser_1.runOnlineParser)(queryText, (_, state) => {
        if (state.kind === parser_1.RuleKinds.FRAGMENT_DEFINITION &&
            state.name &&
            state.type) {
            fragmentDefs.push({
                kind: parser_1.RuleKinds.FRAGMENT_DEFINITION,
                name: {
                    kind: graphql_1.Kind.NAME,
                    value: state.name,
                },
                selectionSet: {
                    kind: parser_1.RuleKinds.SELECTION_SET,
                    selections: [],
                },
                typeCondition: {
                    kind: parser_1.RuleKinds.NAMED_TYPE,
                    name: {
                        kind: graphql_1.Kind.NAME,
                        value: state.type,
                    },
                },
            });
        }
    });
    return fragmentDefs;
}
exports.getFragmentDefinitions = getFragmentDefinitions;
function getSuggestionsForVariableDefinition(token, schema, _kind) {
    const inputTypeMap = schema.getTypeMap();
    const inputTypes = (0, autocompleteUtils_1.objectValues)(inputTypeMap).filter(graphql_1.isInputType);
    return (0, autocompleteUtils_1.hintList)(token, inputTypes.map((type) => ({
        label: type.name,
        documentation: (type === null || type === void 0 ? void 0 : type.description) || '',
        kind: types_1.CompletionItemKind.Variable,
    })));
}
function getSuggestionsForDirective(token, state, schema, _kind) {
    var _a;
    if ((_a = state.prevState) === null || _a === void 0 ? void 0 : _a.kind) {
        const directives = schema
            .getDirectives()
            .filter(directive => canUseDirective(state.prevState, directive));
        return (0, autocompleteUtils_1.hintList)(token, directives.map(directive => ({
            label: directive.name,
            documentation: (directive === null || directive === void 0 ? void 0 : directive.description) || '',
            kind: types_1.CompletionItemKind.Function,
        })));
    }
    return [];
}
function getSuggestionsForDirectiveArguments(token, state, schema, _kind) {
    const directive = schema.getDirectives().find(d => d.name === state.name);
    return (0, autocompleteUtils_1.hintList)(token, (directive === null || directive === void 0 ? void 0 : directive.args.map(arg => ({
        label: arg.name,
        documentation: arg.description || '',
        kind: types_1.CompletionItemKind.Field,
    }))) || []);
}
function canUseDirective(state, directive) {
    if (!(state === null || state === void 0 ? void 0 : state.kind)) {
        return false;
    }
    const { kind, prevState } = state;
    const { locations } = directive;
    switch (kind) {
        case parser_1.RuleKinds.QUERY:
            return locations.includes(graphql_1.DirectiveLocation.QUERY);
        case parser_1.RuleKinds.MUTATION:
            return locations.includes(graphql_1.DirectiveLocation.MUTATION);
        case parser_1.RuleKinds.SUBSCRIPTION:
            return locations.includes(graphql_1.DirectiveLocation.SUBSCRIPTION);
        case parser_1.RuleKinds.FIELD:
        case parser_1.RuleKinds.ALIASED_FIELD:
            return locations.includes(graphql_1.DirectiveLocation.FIELD);
        case parser_1.RuleKinds.FRAGMENT_DEFINITION:
            return locations.includes(graphql_1.DirectiveLocation.FRAGMENT_DEFINITION);
        case parser_1.RuleKinds.FRAGMENT_SPREAD:
            return locations.includes(graphql_1.DirectiveLocation.FRAGMENT_SPREAD);
        case parser_1.RuleKinds.INLINE_FRAGMENT:
            return locations.includes(graphql_1.DirectiveLocation.INLINE_FRAGMENT);
        case parser_1.RuleKinds.SCHEMA_DEF:
            return locations.includes(graphql_1.DirectiveLocation.SCHEMA);
        case parser_1.RuleKinds.SCALAR_DEF:
            return locations.includes(graphql_1.DirectiveLocation.SCALAR);
        case parser_1.RuleKinds.OBJECT_TYPE_DEF:
            return locations.includes(graphql_1.DirectiveLocation.OBJECT);
        case parser_1.RuleKinds.FIELD_DEF:
            return locations.includes(graphql_1.DirectiveLocation.FIELD_DEFINITION);
        case parser_1.RuleKinds.INTERFACE_DEF:
            return locations.includes(graphql_1.DirectiveLocation.INTERFACE);
        case parser_1.RuleKinds.UNION_DEF:
            return locations.includes(graphql_1.DirectiveLocation.UNION);
        case parser_1.RuleKinds.ENUM_DEF:
            return locations.includes(graphql_1.DirectiveLocation.ENUM);
        case parser_1.RuleKinds.ENUM_VALUE:
            return locations.includes(graphql_1.DirectiveLocation.ENUM_VALUE);
        case parser_1.RuleKinds.INPUT_DEF:
            return locations.includes(graphql_1.DirectiveLocation.INPUT_OBJECT);
        case parser_1.RuleKinds.INPUT_VALUE_DEF:
            const prevStateKind = prevState === null || prevState === void 0 ? void 0 : prevState.kind;
            switch (prevStateKind) {
                case parser_1.RuleKinds.ARGUMENTS_DEF:
                    return locations.includes(graphql_1.DirectiveLocation.ARGUMENT_DEFINITION);
                case parser_1.RuleKinds.INPUT_DEF:
                    return locations.includes(graphql_1.DirectiveLocation.INPUT_FIELD_DEFINITION);
            }
    }
    return false;
}
exports.canUseDirective = canUseDirective;
function unwrapType(state) {
    if (state.prevState &&
        state.kind &&
        [
            parser_1.RuleKinds.NAMED_TYPE,
            parser_1.RuleKinds.LIST_TYPE,
            parser_1.RuleKinds.TYPE,
            parser_1.RuleKinds.NON_NULL_TYPE,
        ].includes(state.kind)) {
        return unwrapType(state.prevState);
    }
    return state;
}
//# sourceMappingURL=getAutocompleteSuggestions.js.map