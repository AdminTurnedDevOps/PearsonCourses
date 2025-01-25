"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContextAtPosition = exports.getTokenAtPosition = exports.getDocumentMode = exports.TYPE_SYSTEM_KINDS = exports.GraphQLDocumentMode = exports.runOnlineParser = void 0;
const _1 = require(".");
const graphql_1 = require("graphql");
function runOnlineParser(queryText, callback) {
    const lines = queryText.split('\n');
    const parser = (0, _1.onlineParser)();
    let state = parser.startState();
    let style = '';
    let stream = new _1.CharacterStream('');
    for (let i = 0; i < lines.length; i++) {
        stream = new _1.CharacterStream(lines[i]);
        while (!stream.eol()) {
            style = parser.token(stream, state);
            const code = callback(stream, state, style, i);
            if (code === 'BREAK') {
                break;
            }
        }
        callback(stream, state, style, i);
        if (!state.kind) {
            state = parser.startState();
        }
    }
    return {
        start: stream.getStartOfToken(),
        end: stream.getCurrentPosition(),
        string: stream.current(),
        state,
        style,
    };
}
exports.runOnlineParser = runOnlineParser;
var GraphQLDocumentMode;
(function (GraphQLDocumentMode) {
    GraphQLDocumentMode["TYPE_SYSTEM"] = "TYPE_SYSTEM";
    GraphQLDocumentMode["EXECUTABLE"] = "EXECUTABLE";
    GraphQLDocumentMode["UNKNOWN"] = "UNKNOWN";
})(GraphQLDocumentMode = exports.GraphQLDocumentMode || (exports.GraphQLDocumentMode = {}));
exports.TYPE_SYSTEM_KINDS = [
    graphql_1.Kind.SCHEMA_DEFINITION,
    graphql_1.Kind.OPERATION_TYPE_DEFINITION,
    graphql_1.Kind.SCALAR_TYPE_DEFINITION,
    graphql_1.Kind.OBJECT_TYPE_DEFINITION,
    graphql_1.Kind.INTERFACE_TYPE_DEFINITION,
    graphql_1.Kind.UNION_TYPE_DEFINITION,
    graphql_1.Kind.ENUM_TYPE_DEFINITION,
    graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION,
    graphql_1.Kind.DIRECTIVE_DEFINITION,
    graphql_1.Kind.SCHEMA_EXTENSION,
    graphql_1.Kind.SCALAR_TYPE_EXTENSION,
    graphql_1.Kind.OBJECT_TYPE_EXTENSION,
    graphql_1.Kind.INTERFACE_TYPE_EXTENSION,
    graphql_1.Kind.UNION_TYPE_EXTENSION,
    graphql_1.Kind.ENUM_TYPE_EXTENSION,
    graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION,
];
const getParsedMode = (sdl) => {
    let mode = GraphQLDocumentMode.UNKNOWN;
    if (sdl) {
        try {
            (0, graphql_1.visit)((0, graphql_1.parse)(sdl), {
                enter(node) {
                    if (node.kind === 'Document') {
                        mode = GraphQLDocumentMode.EXECUTABLE;
                        return;
                    }
                    if (exports.TYPE_SYSTEM_KINDS.includes(node.kind)) {
                        mode = GraphQLDocumentMode.TYPE_SYSTEM;
                        return graphql_1.BREAK;
                    }
                    return false;
                },
            });
        }
        catch (_a) {
            return mode;
        }
    }
    return mode;
};
function getDocumentMode(documentText, uri) {
    if (uri === null || uri === void 0 ? void 0 : uri.endsWith('.graphqls')) {
        return GraphQLDocumentMode.TYPE_SYSTEM;
    }
    return getParsedMode(documentText);
}
exports.getDocumentMode = getDocumentMode;
function getTokenAtPosition(queryText, cursor, offset = 0) {
    let styleAtCursor = null;
    let stateAtCursor = null;
    let stringAtCursor = null;
    const token = runOnlineParser(queryText, (stream, state, style, index) => {
        if (index !== cursor.line ||
            stream.getCurrentPosition() + offset < cursor.character + 1) {
            return;
        }
        styleAtCursor = style;
        stateAtCursor = Object.assign({}, state);
        stringAtCursor = stream.current();
        return 'BREAK';
    });
    return {
        start: token.start,
        end: token.end,
        string: stringAtCursor || token.string,
        state: stateAtCursor || token.state,
        style: styleAtCursor || token.style,
    };
}
exports.getTokenAtPosition = getTokenAtPosition;
function getContextAtPosition(queryText, cursor, schema, contextToken, options) {
    const token = contextToken || getTokenAtPosition(queryText, cursor, 1);
    if (!token) {
        return null;
    }
    const state = token.state.kind === 'Invalid' ? token.state.prevState : token.state;
    if (!state) {
        return null;
    }
    const typeInfo = (0, _1.getTypeInfo)(schema, token.state);
    const mode = (options === null || options === void 0 ? void 0 : options.mode) || getDocumentMode(queryText, options === null || options === void 0 ? void 0 : options.uri);
    return {
        token,
        state,
        typeInfo,
        mode,
    };
}
exports.getContextAtPosition = getContextAtPosition;
//# sourceMappingURL=api.js.map