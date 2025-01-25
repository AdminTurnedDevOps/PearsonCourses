import { CharacterStream, onlineParser, getTypeInfo, } from '.';
import { BREAK, Kind, parse, visit } from 'graphql';
export function runOnlineParser(queryText, callback) {
    const lines = queryText.split('\n');
    const parser = onlineParser();
    let state = parser.startState();
    let style = '';
    let stream = new CharacterStream('');
    for (let i = 0; i < lines.length; i++) {
        stream = new CharacterStream(lines[i]);
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
export var GraphQLDocumentMode;
(function (GraphQLDocumentMode) {
    GraphQLDocumentMode["TYPE_SYSTEM"] = "TYPE_SYSTEM";
    GraphQLDocumentMode["EXECUTABLE"] = "EXECUTABLE";
    GraphQLDocumentMode["UNKNOWN"] = "UNKNOWN";
})(GraphQLDocumentMode || (GraphQLDocumentMode = {}));
export const TYPE_SYSTEM_KINDS = [
    Kind.SCHEMA_DEFINITION,
    Kind.OPERATION_TYPE_DEFINITION,
    Kind.SCALAR_TYPE_DEFINITION,
    Kind.OBJECT_TYPE_DEFINITION,
    Kind.INTERFACE_TYPE_DEFINITION,
    Kind.UNION_TYPE_DEFINITION,
    Kind.ENUM_TYPE_DEFINITION,
    Kind.INPUT_OBJECT_TYPE_DEFINITION,
    Kind.DIRECTIVE_DEFINITION,
    Kind.SCHEMA_EXTENSION,
    Kind.SCALAR_TYPE_EXTENSION,
    Kind.OBJECT_TYPE_EXTENSION,
    Kind.INTERFACE_TYPE_EXTENSION,
    Kind.UNION_TYPE_EXTENSION,
    Kind.ENUM_TYPE_EXTENSION,
    Kind.INPUT_OBJECT_TYPE_EXTENSION,
];
const getParsedMode = (sdl) => {
    let mode = GraphQLDocumentMode.UNKNOWN;
    if (sdl) {
        try {
            visit(parse(sdl), {
                enter(node) {
                    if (node.kind === 'Document') {
                        mode = GraphQLDocumentMode.EXECUTABLE;
                        return;
                    }
                    if (TYPE_SYSTEM_KINDS.includes(node.kind)) {
                        mode = GraphQLDocumentMode.TYPE_SYSTEM;
                        return BREAK;
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
export function getDocumentMode(documentText, uri) {
    if (uri === null || uri === void 0 ? void 0 : uri.endsWith('.graphqls')) {
        return GraphQLDocumentMode.TYPE_SYSTEM;
    }
    return getParsedMode(documentText);
}
export function getTokenAtPosition(queryText, cursor, offset = 0) {
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
export function getContextAtPosition(queryText, cursor, schema, contextToken, options) {
    const token = contextToken || getTokenAtPosition(queryText, cursor, 1);
    if (!token) {
        return null;
    }
    const state = token.state.kind === 'Invalid' ? token.state.prevState : token.state;
    if (!state) {
        return null;
    }
    const typeInfo = getTypeInfo(schema, token.state);
    const mode = (options === null || options === void 0 ? void 0 : options.mode) || getDocumentMode(queryText, options === null || options === void 0 ? void 0 : options.uri);
    return {
        token,
        state,
        typeInfo,
        mode,
    };
}
//# sourceMappingURL=api.js.map