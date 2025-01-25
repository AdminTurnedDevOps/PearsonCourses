"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseRules = exports.LexRules = exports.isIgnored = void 0;
const RuleHelpers_1 = require("./RuleHelpers");
const graphql_1 = require("graphql");
const isIgnored = (ch) => ch === ' ' ||
    ch === '\t' ||
    ch === ',' ||
    ch === '\n' ||
    ch === '\r' ||
    ch === '\uFEFF' ||
    ch === '\u00A0';
exports.isIgnored = isIgnored;
exports.LexRules = {
    Name: /^[_A-Za-z][_0-9A-Za-z]*/,
    Punctuation: /^(?:!|\$|\(|\)|\.\.\.|:|=|&|@|\[|]|\{|\||\})/,
    Number: /^-?(?:0|(?:[1-9][0-9]*))(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?/,
    String: /^(?:"""(?:\\"""|[^"]|"[^"]|""[^"])*(?:""")?|"(?:[^"\\]|\\(?:"|\/|\\|b|f|n|r|t|u[0-9a-fA-F]{4}))*"?)/,
    Comment: /^#.*/,
};
exports.ParseRules = {
    Document: [(0, RuleHelpers_1.list)('Definition')],
    Definition(token) {
        switch (token.value) {
            case '{':
                return 'ShortQuery';
            case 'query':
                return 'Query';
            case 'mutation':
                return 'Mutation';
            case 'subscription':
                return 'Subscription';
            case 'fragment':
                return graphql_1.Kind.FRAGMENT_DEFINITION;
            case 'schema':
                return 'SchemaDef';
            case 'scalar':
                return 'ScalarDef';
            case 'type':
                return 'ObjectTypeDef';
            case 'interface':
                return 'InterfaceDef';
            case 'union':
                return 'UnionDef';
            case 'enum':
                return 'EnumDef';
            case 'input':
                return 'InputDef';
            case 'extend':
                return 'ExtendDef';
            case 'directive':
                return 'DirectiveDef';
        }
    },
    ShortQuery: ['SelectionSet'],
    Query: [
        word('query'),
        (0, RuleHelpers_1.opt)(name('def')),
        (0, RuleHelpers_1.opt)('VariableDefinitions'),
        (0, RuleHelpers_1.list)('Directive'),
        'SelectionSet',
    ],
    Mutation: [
        word('mutation'),
        (0, RuleHelpers_1.opt)(name('def')),
        (0, RuleHelpers_1.opt)('VariableDefinitions'),
        (0, RuleHelpers_1.list)('Directive'),
        'SelectionSet',
    ],
    Subscription: [
        word('subscription'),
        (0, RuleHelpers_1.opt)(name('def')),
        (0, RuleHelpers_1.opt)('VariableDefinitions'),
        (0, RuleHelpers_1.list)('Directive'),
        'SelectionSet',
    ],
    VariableDefinitions: [(0, RuleHelpers_1.p)('('), (0, RuleHelpers_1.list)('VariableDefinition'), (0, RuleHelpers_1.p)(')')],
    VariableDefinition: ['Variable', (0, RuleHelpers_1.p)(':'), 'Type', (0, RuleHelpers_1.opt)('DefaultValue')],
    Variable: [(0, RuleHelpers_1.p)('$', 'variable'), name('variable')],
    DefaultValue: [(0, RuleHelpers_1.p)('='), 'Value'],
    SelectionSet: [(0, RuleHelpers_1.p)('{'), (0, RuleHelpers_1.list)('Selection'), (0, RuleHelpers_1.p)('}')],
    Selection(token, stream) {
        return token.value === '...'
            ? stream.match(/[\s\u00a0,]*(on\b|@|{)/, false)
                ? 'InlineFragment'
                : 'FragmentSpread'
            : stream.match(/[\s\u00a0,]*:/, false)
                ? 'AliasedField'
                : 'Field';
    },
    AliasedField: [
        name('property'),
        (0, RuleHelpers_1.p)(':'),
        name('qualifier'),
        (0, RuleHelpers_1.opt)('Arguments'),
        (0, RuleHelpers_1.list)('Directive'),
        (0, RuleHelpers_1.opt)('SelectionSet'),
    ],
    Field: [
        name('property'),
        (0, RuleHelpers_1.opt)('Arguments'),
        (0, RuleHelpers_1.list)('Directive'),
        (0, RuleHelpers_1.opt)('SelectionSet'),
    ],
    Arguments: [(0, RuleHelpers_1.p)('('), (0, RuleHelpers_1.list)('Argument'), (0, RuleHelpers_1.p)(')')],
    Argument: [name('attribute'), (0, RuleHelpers_1.p)(':'), 'Value'],
    FragmentSpread: [(0, RuleHelpers_1.p)('...'), name('def'), (0, RuleHelpers_1.list)('Directive')],
    InlineFragment: [
        (0, RuleHelpers_1.p)('...'),
        (0, RuleHelpers_1.opt)('TypeCondition'),
        (0, RuleHelpers_1.list)('Directive'),
        'SelectionSet',
    ],
    FragmentDefinition: [
        word('fragment'),
        (0, RuleHelpers_1.opt)((0, RuleHelpers_1.butNot)(name('def'), [word('on')])),
        'TypeCondition',
        (0, RuleHelpers_1.list)('Directive'),
        'SelectionSet',
    ],
    TypeCondition: [word('on'), 'NamedType'],
    Value(token) {
        switch (token.kind) {
            case 'Number':
                return 'NumberValue';
            case 'String':
                return 'StringValue';
            case 'Punctuation':
                switch (token.value) {
                    case '[':
                        return 'ListValue';
                    case '{':
                        return 'ObjectValue';
                    case '$':
                        return 'Variable';
                    case '&':
                        return 'NamedType';
                }
                return null;
            case 'Name':
                switch (token.value) {
                    case 'true':
                    case 'false':
                        return 'BooleanValue';
                }
                if (token.value === 'null') {
                    return 'NullValue';
                }
                return 'EnumValue';
        }
    },
    NumberValue: [(0, RuleHelpers_1.t)('Number', 'number')],
    StringValue: [
        {
            style: 'string',
            match: (token) => token.kind === 'String',
            update(state, token) {
                if (token.value.startsWith('"""')) {
                    state.inBlockstring = !token.value.slice(3).endsWith('"""');
                }
            },
        },
    ],
    BooleanValue: [(0, RuleHelpers_1.t)('Name', 'builtin')],
    NullValue: [(0, RuleHelpers_1.t)('Name', 'keyword')],
    EnumValue: [name('string-2')],
    ListValue: [(0, RuleHelpers_1.p)('['), (0, RuleHelpers_1.list)('Value'), (0, RuleHelpers_1.p)(']')],
    ObjectValue: [(0, RuleHelpers_1.p)('{'), (0, RuleHelpers_1.list)('ObjectField'), (0, RuleHelpers_1.p)('}')],
    ObjectField: [name('attribute'), (0, RuleHelpers_1.p)(':'), 'Value'],
    Type(token) {
        return token.value === '[' ? 'ListType' : 'NonNullType';
    },
    ListType: [(0, RuleHelpers_1.p)('['), 'Type', (0, RuleHelpers_1.p)(']'), (0, RuleHelpers_1.opt)((0, RuleHelpers_1.p)('!'))],
    NonNullType: ['NamedType', (0, RuleHelpers_1.opt)((0, RuleHelpers_1.p)('!'))],
    NamedType: [type('atom')],
    Directive: [(0, RuleHelpers_1.p)('@', 'meta'), name('meta'), (0, RuleHelpers_1.opt)('Arguments')],
    DirectiveDef: [
        word('directive'),
        (0, RuleHelpers_1.p)('@', 'meta'),
        name('meta'),
        (0, RuleHelpers_1.opt)('ArgumentsDef'),
        word('on'),
        (0, RuleHelpers_1.list)('DirectiveLocation', (0, RuleHelpers_1.p)('|')),
    ],
    InterfaceDef: [
        word('interface'),
        name('atom'),
        (0, RuleHelpers_1.opt)('Implements'),
        (0, RuleHelpers_1.list)('Directive'),
        (0, RuleHelpers_1.p)('{'),
        (0, RuleHelpers_1.list)('FieldDef'),
        (0, RuleHelpers_1.p)('}'),
    ],
    Implements: [word('implements'), (0, RuleHelpers_1.list)('NamedType', (0, RuleHelpers_1.p)('&'))],
    DirectiveLocation: [name('string-2')],
    SchemaDef: [
        word('schema'),
        (0, RuleHelpers_1.list)('Directive'),
        (0, RuleHelpers_1.p)('{'),
        (0, RuleHelpers_1.list)('OperationTypeDef'),
        (0, RuleHelpers_1.p)('}'),
    ],
    OperationTypeDef: [name('keyword'), (0, RuleHelpers_1.p)(':'), name('atom')],
    ScalarDef: [word('scalar'), name('atom'), (0, RuleHelpers_1.list)('Directive')],
    ObjectTypeDef: [
        word('type'),
        name('atom'),
        (0, RuleHelpers_1.opt)('Implements'),
        (0, RuleHelpers_1.list)('Directive'),
        (0, RuleHelpers_1.p)('{'),
        (0, RuleHelpers_1.list)('FieldDef'),
        (0, RuleHelpers_1.p)('}'),
    ],
    FieldDef: [
        name('property'),
        (0, RuleHelpers_1.opt)('ArgumentsDef'),
        (0, RuleHelpers_1.p)(':'),
        'Type',
        (0, RuleHelpers_1.list)('Directive'),
    ],
    ArgumentsDef: [(0, RuleHelpers_1.p)('('), (0, RuleHelpers_1.list)('InputValueDef'), (0, RuleHelpers_1.p)(')')],
    InputValueDef: [
        name('attribute'),
        (0, RuleHelpers_1.p)(':'),
        'Type',
        (0, RuleHelpers_1.opt)('DefaultValue'),
        (0, RuleHelpers_1.list)('Directive'),
    ],
    UnionDef: [
        word('union'),
        name('atom'),
        (0, RuleHelpers_1.list)('Directive'),
        (0, RuleHelpers_1.p)('='),
        (0, RuleHelpers_1.list)('UnionMember', (0, RuleHelpers_1.p)('|')),
    ],
    UnionMember: ['NamedType'],
    EnumDef: [
        word('enum'),
        name('atom'),
        (0, RuleHelpers_1.list)('Directive'),
        (0, RuleHelpers_1.p)('{'),
        (0, RuleHelpers_1.list)('EnumValueDef'),
        (0, RuleHelpers_1.p)('}'),
    ],
    EnumValueDef: [name('string-2'), (0, RuleHelpers_1.list)('Directive')],
    InputDef: [
        word('input'),
        name('atom'),
        (0, RuleHelpers_1.list)('Directive'),
        (0, RuleHelpers_1.p)('{'),
        (0, RuleHelpers_1.list)('InputValueDef'),
        (0, RuleHelpers_1.p)('}'),
    ],
    ExtendDef: [word('extend'), 'ExtensionDefinition'],
    ExtensionDefinition(token) {
        switch (token.value) {
            case 'schema':
                return graphql_1.Kind.SCHEMA_EXTENSION;
            case 'scalar':
                return graphql_1.Kind.SCALAR_TYPE_EXTENSION;
            case 'type':
                return graphql_1.Kind.OBJECT_TYPE_EXTENSION;
            case 'interface':
                return graphql_1.Kind.INTERFACE_TYPE_EXTENSION;
            case 'union':
                return graphql_1.Kind.UNION_TYPE_EXTENSION;
            case 'enum':
                return graphql_1.Kind.ENUM_TYPE_EXTENSION;
            case 'input':
                return graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION;
        }
    },
    [graphql_1.Kind.SCHEMA_EXTENSION]: ['SchemaDef'],
    [graphql_1.Kind.SCALAR_TYPE_EXTENSION]: ['ScalarDef'],
    [graphql_1.Kind.OBJECT_TYPE_EXTENSION]: ['ObjectTypeDef'],
    [graphql_1.Kind.INTERFACE_TYPE_EXTENSION]: ['InterfaceDef'],
    [graphql_1.Kind.UNION_TYPE_EXTENSION]: ['UnionDef'],
    [graphql_1.Kind.ENUM_TYPE_EXTENSION]: ['EnumDef'],
    [graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION]: ['InputDef'],
};
function word(value) {
    return {
        style: 'keyword',
        match: (token) => token.kind === 'Name' && token.value === value,
    };
}
function name(style) {
    return {
        style,
        match: (token) => token.kind === 'Name',
        update(state, token) {
            state.name = token.value;
        },
    };
}
function type(style) {
    return {
        style,
        match: (token) => token.kind === 'Name',
        update(state, token) {
            var _a;
            if ((_a = state.prevState) === null || _a === void 0 ? void 0 : _a.prevState) {
                state.name = token.value;
                state.prevState.prevState.type = token.value;
            }
        },
    };
}
//# sourceMappingURL=Rules.js.map