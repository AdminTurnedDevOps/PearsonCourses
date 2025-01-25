"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRange = exports.validateQuery = exports.getDiagnostics = exports.DIAGNOSTIC_SEVERITY = exports.SEVERITY = void 0;
const graphql_1 = require("graphql");
const parser_1 = require("../parser");
const utils_1 = require("../utils");
exports.SEVERITY = {
    Error: 'Error',
    Warning: 'Warning',
    Information: 'Information',
    Hint: 'Hint',
};
exports.DIAGNOSTIC_SEVERITY = {
    [exports.SEVERITY.Error]: 1,
    [exports.SEVERITY.Warning]: 2,
    [exports.SEVERITY.Information]: 3,
    [exports.SEVERITY.Hint]: 4,
};
const invariant = (condition, message) => {
    if (!condition) {
        throw new Error(message);
    }
};
function getDiagnostics(query, schema = null, customRules, isRelayCompatMode, externalFragments) {
    var _a, _b;
    let ast = null;
    let fragments = '';
    if (externalFragments) {
        fragments =
            typeof externalFragments === 'string'
                ? externalFragments
                : externalFragments.reduce((acc, node) => acc + (0, graphql_1.print)(node) + '\n\n', '');
    }
    const enhancedQuery = fragments ? `${query}\n\n${fragments}` : query;
    try {
        ast = (0, graphql_1.parse)(enhancedQuery);
    }
    catch (error) {
        if (error instanceof graphql_1.GraphQLError) {
            const range = getRange((_b = (_a = error.locations) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : { line: 0, column: 0 }, enhancedQuery);
            return [
                {
                    severity: exports.DIAGNOSTIC_SEVERITY.Error,
                    message: error.message,
                    source: 'GraphQL: Syntax',
                    range,
                },
            ];
        }
        throw error;
    }
    return validateQuery(ast, schema, customRules, isRelayCompatMode);
}
exports.getDiagnostics = getDiagnostics;
function validateQuery(ast, schema = null, customRules, isRelayCompatMode) {
    if (!schema) {
        return [];
    }
    const validationErrorAnnotations = (0, utils_1.validateWithCustomRules)(schema, ast, customRules, isRelayCompatMode).flatMap(error => annotations(error, exports.DIAGNOSTIC_SEVERITY.Error, 'Validation'));
    const deprecationWarningAnnotations = (0, graphql_1.validate)(schema, ast, [
        graphql_1.NoDeprecatedCustomRule,
    ]).flatMap(error => annotations(error, exports.DIAGNOSTIC_SEVERITY.Warning, 'Deprecation'));
    return validationErrorAnnotations.concat(deprecationWarningAnnotations);
}
exports.validateQuery = validateQuery;
function annotations(error, severity, type) {
    if (!error.nodes) {
        return [];
    }
    const highlightedNodes = [];
    for (const [i, node] of error.nodes.entries()) {
        const highlightNode = node.kind !== 'Variable' && 'name' in node && node.name !== undefined
            ? node.name
            : 'variable' in node && node.variable !== undefined
                ? node.variable
                : node;
        if (highlightNode) {
            invariant(error.locations, 'GraphQL validation error requires locations.');
            const loc = error.locations[i];
            const highlightLoc = getLocation(highlightNode);
            const end = loc.column + (highlightLoc.end - highlightLoc.start);
            highlightedNodes.push({
                source: `GraphQL: ${type}`,
                message: error.message,
                severity,
                range: new utils_1.Range(new utils_1.Position(loc.line - 1, loc.column - 1), new utils_1.Position(loc.line - 1, end)),
            });
        }
    }
    return highlightedNodes;
}
function getRange(location, queryText) {
    const parser = (0, parser_1.onlineParser)();
    const state = parser.startState();
    const lines = queryText.split('\n');
    invariant(lines.length >= location.line, 'Query text must have more lines than where the error happened');
    let stream = null;
    for (let i = 0; i < location.line; i++) {
        stream = new parser_1.CharacterStream(lines[i]);
        while (!stream.eol()) {
            const style = parser.token(stream, state);
            if (style === 'invalidchar') {
                break;
            }
        }
    }
    invariant(stream, 'Expected Parser stream to be available.');
    const line = location.line - 1;
    const start = stream.getStartOfToken();
    const end = stream.getCurrentPosition();
    return new utils_1.Range(new utils_1.Position(line, start), new utils_1.Position(line, end));
}
exports.getRange = getRange;
function getLocation(node) {
    const typeCastedNode = node;
    const location = typeCastedNode.loc;
    invariant(location, 'Expected ASTNode to have a location.');
    return location;
}
//# sourceMappingURL=getDiagnostics.js.map