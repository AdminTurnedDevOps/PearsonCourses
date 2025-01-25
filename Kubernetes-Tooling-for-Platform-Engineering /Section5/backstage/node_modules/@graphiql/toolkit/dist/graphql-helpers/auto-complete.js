"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillLeafs = void 0;
var graphql_1 = require("graphql");
function fillLeafs(schema, docString, getDefaultFieldNames) {
    var insertions = [];
    if (!schema || !docString) {
        return { insertions: insertions, result: docString };
    }
    var ast;
    try {
        ast = (0, graphql_1.parse)(docString);
    }
    catch (_a) {
        return { insertions: insertions, result: docString };
    }
    var fieldNameFn = getDefaultFieldNames || defaultGetDefaultFieldNames;
    var typeInfo = new graphql_1.TypeInfo(schema);
    (0, graphql_1.visit)(ast, {
        leave: function (node) {
            typeInfo.leave(node);
        },
        enter: function (node) {
            typeInfo.enter(node);
            if (node.kind === 'Field' && !node.selectionSet) {
                var fieldType = typeInfo.getType();
                var selectionSet = buildSelectionSet(isFieldType(fieldType), fieldNameFn);
                if (selectionSet && node.loc) {
                    var indent = getIndentation(docString, node.loc.start);
                    insertions.push({
                        index: node.loc.end,
                        string: ' ' + (0, graphql_1.print)(selectionSet).replaceAll('\n', '\n' + indent),
                    });
                }
            }
        },
    });
    return {
        insertions: insertions,
        result: withInsertions(docString, insertions),
    };
}
exports.fillLeafs = fillLeafs;
function defaultGetDefaultFieldNames(type) {
    var e_1, _a;
    if (!('getFields' in type)) {
        return [];
    }
    var fields = type.getFields();
    if (fields.id) {
        return ['id'];
    }
    if (fields.edges) {
        return ['edges'];
    }
    if (fields.node) {
        return ['node'];
    }
    var leafFieldNames = [];
    try {
        for (var _b = __values(Object.keys(fields)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var fieldName = _c.value;
            if ((0, graphql_1.isLeafType)(fields[fieldName].type)) {
                leafFieldNames.push(fieldName);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return leafFieldNames;
}
function buildSelectionSet(type, getDefaultFieldNames) {
    var namedType = (0, graphql_1.getNamedType)(type);
    if (!type || (0, graphql_1.isLeafType)(type)) {
        return;
    }
    var fieldNames = getDefaultFieldNames(namedType);
    if (!Array.isArray(fieldNames) ||
        fieldNames.length === 0 ||
        !('getFields' in namedType)) {
        return;
    }
    return {
        kind: graphql_1.Kind.SELECTION_SET,
        selections: fieldNames.map(function (fieldName) {
            var fieldDef = namedType.getFields()[fieldName];
            var fieldType = fieldDef ? fieldDef.type : null;
            return {
                kind: graphql_1.Kind.FIELD,
                name: {
                    kind: graphql_1.Kind.NAME,
                    value: fieldName,
                },
                selectionSet: buildSelectionSet(fieldType, getDefaultFieldNames),
            };
        }),
    };
}
function withInsertions(initial, insertions) {
    var e_2, _a;
    if (insertions.length === 0) {
        return initial;
    }
    var edited = '';
    var prevIndex = 0;
    try {
        for (var insertions_1 = __values(insertions), insertions_1_1 = insertions_1.next(); !insertions_1_1.done; insertions_1_1 = insertions_1.next()) {
            var _b = insertions_1_1.value, index = _b.index, string = _b.string;
            edited += initial.slice(prevIndex, index) + string;
            prevIndex = index;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (insertions_1_1 && !insertions_1_1.done && (_a = insertions_1.return)) _a.call(insertions_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    edited += initial.slice(prevIndex);
    return edited;
}
function getIndentation(str, index) {
    var indentStart = index;
    var indentEnd = index;
    while (indentStart) {
        var c = str.charCodeAt(indentStart - 1);
        if (c === 10 || c === 13 || c === 0x2028 || c === 0x2029) {
            break;
        }
        indentStart--;
        if (c !== 9 && c !== 11 && c !== 12 && c !== 32 && c !== 160) {
            indentEnd = indentStart;
        }
    }
    return str.slice(indentStart, indentEnd);
}
function isFieldType(fieldType) {
    if (fieldType) {
        return fieldType;
    }
}
//# sourceMappingURL=auto-complete.js.map