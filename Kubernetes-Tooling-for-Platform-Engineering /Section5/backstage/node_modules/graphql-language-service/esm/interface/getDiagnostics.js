import { GraphQLError, print, validate, NoDeprecatedCustomRule, parse, } from 'graphql';
import { CharacterStream, onlineParser } from '../parser';
import { Range, validateWithCustomRules, Position } from '../utils';
export const SEVERITY = {
    Error: 'Error',
    Warning: 'Warning',
    Information: 'Information',
    Hint: 'Hint',
};
export const DIAGNOSTIC_SEVERITY = {
    [SEVERITY.Error]: 1,
    [SEVERITY.Warning]: 2,
    [SEVERITY.Information]: 3,
    [SEVERITY.Hint]: 4,
};
const invariant = (condition, message) => {
    if (!condition) {
        throw new Error(message);
    }
};
export function getDiagnostics(query, schema = null, customRules, isRelayCompatMode, externalFragments) {
    var _a, _b;
    let ast = null;
    let fragments = '';
    if (externalFragments) {
        fragments =
            typeof externalFragments === 'string'
                ? externalFragments
                : externalFragments.reduce((acc, node) => acc + print(node) + '\n\n', '');
    }
    const enhancedQuery = fragments ? `${query}\n\n${fragments}` : query;
    try {
        ast = parse(enhancedQuery);
    }
    catch (error) {
        if (error instanceof GraphQLError) {
            const range = getRange((_b = (_a = error.locations) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : { line: 0, column: 0 }, enhancedQuery);
            return [
                {
                    severity: DIAGNOSTIC_SEVERITY.Error,
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
export function validateQuery(ast, schema = null, customRules, isRelayCompatMode) {
    if (!schema) {
        return [];
    }
    const validationErrorAnnotations = validateWithCustomRules(schema, ast, customRules, isRelayCompatMode).flatMap(error => annotations(error, DIAGNOSTIC_SEVERITY.Error, 'Validation'));
    const deprecationWarningAnnotations = validate(schema, ast, [
        NoDeprecatedCustomRule,
    ]).flatMap(error => annotations(error, DIAGNOSTIC_SEVERITY.Warning, 'Deprecation'));
    return validationErrorAnnotations.concat(deprecationWarningAnnotations);
}
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
                range: new Range(new Position(loc.line - 1, loc.column - 1), new Position(loc.line - 1, end)),
            });
        }
    }
    return highlightedNodes;
}
export function getRange(location, queryText) {
    const parser = onlineParser();
    const state = parser.startState();
    const lines = queryText.split('\n');
    invariant(lines.length >= location.line, 'Query text must have more lines than where the error happened');
    let stream = null;
    for (let i = 0; i < location.line; i++) {
        stream = new CharacterStream(lines[i]);
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
    return new Range(new Position(line, start), new Position(line, end));
}
function getLocation(node) {
    const typeCastedNode = node;
    const location = typeCastedNode.loc;
    invariant(location, 'Expected ASTNode to have a location.');
    return location;
}
//# sourceMappingURL=getDiagnostics.js.map