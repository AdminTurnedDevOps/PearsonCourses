"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefinitionQueryResultForDefinitionNode = exports.getDefinitionQueryResultForFragmentSpread = exports.getDefinitionQueryResultForArgument = exports.getDefinitionQueryResultForField = exports.getDefinitionQueryResultForNamedType = exports.LANGUAGE = void 0;
const utils_1 = require("../utils");
exports.LANGUAGE = 'GraphQL';
function assert(value, message) {
    if (!value) {
        throw new Error(message);
    }
}
function getRange(text, node) {
    const location = node.loc;
    assert(location, 'Expected ASTNode to have a location.');
    return (0, utils_1.locToRange)(text, location);
}
function getPosition(text, node) {
    const location = node.loc;
    assert(location, 'Expected ASTNode to have a location.');
    return (0, utils_1.offsetToPosition)(text, location.start);
}
function getDefinitionQueryResultForNamedType(text, node, dependencies) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = node.name.value;
        const defNodes = dependencies.filter(({ definition }) => definition.name && definition.name.value === name);
        if (defNodes.length === 0) {
            throw new Error(`Definition not found for GraphQL type ${name}`);
        }
        const definitions = defNodes.map(({ filePath, content, definition }) => getDefinitionForNodeDefinition(filePath || '', content, definition));
        return {
            definitions,
            queryRange: definitions.map(_ => getRange(text, node)),
            printedName: name,
        };
    });
}
exports.getDefinitionQueryResultForNamedType = getDefinitionQueryResultForNamedType;
function getDefinitionQueryResultForField(fieldName, typeName, dependencies) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const defNodes = dependencies.filter(({ definition }) => definition.name && definition.name.value === typeName);
        if (defNodes.length === 0) {
            throw new Error(`Definition not found for GraphQL type ${typeName}`);
        }
        const definitions = [];
        for (const { filePath, content, definition } of defNodes) {
            const fieldDefinition = (_a = definition.fields) === null || _a === void 0 ? void 0 : _a.find(item => item.name.value === fieldName);
            if (fieldDefinition == null) {
                continue;
            }
            definitions.push(getDefinitionForFieldDefinition(filePath || '', content, fieldDefinition));
        }
        return {
            definitions,
            queryRange: [],
            printedName: [typeName, fieldName].join('.'),
        };
    });
}
exports.getDefinitionQueryResultForField = getDefinitionQueryResultForField;
function getDefinitionQueryResultForArgument(argumentName, fieldName, typeName, dependencies) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const definitions = [];
        for (const { filePath, content, definition } of dependencies) {
            const argDefinition = (_c = (_b = (_a = definition.fields) === null || _a === void 0 ? void 0 : _a.find(item => item.name.value === fieldName)) === null || _b === void 0 ? void 0 : _b.arguments) === null || _c === void 0 ? void 0 : _c.find(item => item.name.value === argumentName);
            if (argDefinition == null) {
                continue;
            }
            definitions.push(getDefinitionForArgumentDefinition(filePath || '', content, argDefinition));
        }
        return {
            definitions,
            queryRange: [],
            printedName: `${[typeName, fieldName].join('.')}(${argumentName})`,
        };
    });
}
exports.getDefinitionQueryResultForArgument = getDefinitionQueryResultForArgument;
function getDefinitionQueryResultForFragmentSpread(text, fragment, dependencies) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = fragment.name.value;
        const defNodes = dependencies.filter(({ definition }) => definition.name.value === name);
        if (defNodes.length === 0) {
            throw new Error(`Definition not found for GraphQL fragment ${name}`);
        }
        const definitions = defNodes.map(({ filePath, content, definition }) => getDefinitionForFragmentDefinition(filePath || '', content, definition));
        return {
            definitions,
            queryRange: definitions.map(_ => getRange(text, fragment)),
            printedName: name,
        };
    });
}
exports.getDefinitionQueryResultForFragmentSpread = getDefinitionQueryResultForFragmentSpread;
function getDefinitionQueryResultForDefinitionNode(path, text, definition) {
    var _a;
    return {
        definitions: [getDefinitionForFragmentDefinition(path, text, definition)],
        queryRange: definition.name ? [getRange(text, definition.name)] : [],
        printedName: (_a = definition.name) === null || _a === void 0 ? void 0 : _a.value,
    };
}
exports.getDefinitionQueryResultForDefinitionNode = getDefinitionQueryResultForDefinitionNode;
function getDefinitionForFragmentDefinition(path, text, definition) {
    const { name } = definition;
    if (!name) {
        throw new Error('Expected ASTNode to have a Name.');
    }
    return {
        path,
        position: getPosition(text, definition),
        range: getRange(text, definition),
        name: name.value || '',
        language: exports.LANGUAGE,
        projectRoot: path,
    };
}
function getDefinitionForNodeDefinition(path, text, definition) {
    const { name } = definition;
    assert(name, 'Expected ASTNode to have a Name.');
    return {
        path,
        position: getPosition(text, definition),
        range: getRange(text, definition),
        name: name.value || '',
        language: exports.LANGUAGE,
        projectRoot: path,
    };
}
function getDefinitionForFieldDefinition(path, text, definition) {
    const { name } = definition;
    assert(name, 'Expected ASTNode to have a Name.');
    return {
        path,
        position: getPosition(text, definition),
        range: getRange(text, definition),
        name: name.value || '',
        language: exports.LANGUAGE,
        projectRoot: path,
    };
}
function getDefinitionForArgumentDefinition(path, text, definition) {
    const { name } = definition;
    assert(name, 'Expected ASTNode to have a Name.');
    return {
        path,
        position: getPosition(text, definition),
        range: getRange(text, definition),
        name: name.value || '',
        language: exports.LANGUAGE,
        projectRoot: path,
    };
}
//# sourceMappingURL=getDefinition.js.map