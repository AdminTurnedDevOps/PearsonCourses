import { getNamedType, isLeafType, Kind, parse, print, TypeInfo, visit, } from 'graphql';
export function fillLeafs(schema, docString, getDefaultFieldNames) {
    const insertions = [];
    if (!schema || !docString) {
        return { insertions, result: docString };
    }
    let ast;
    try {
        ast = parse(docString);
    }
    catch (_a) {
        return { insertions, result: docString };
    }
    const fieldNameFn = getDefaultFieldNames || defaultGetDefaultFieldNames;
    const typeInfo = new TypeInfo(schema);
    visit(ast, {
        leave(node) {
            typeInfo.leave(node);
        },
        enter(node) {
            typeInfo.enter(node);
            if (node.kind === 'Field' && !node.selectionSet) {
                const fieldType = typeInfo.getType();
                const selectionSet = buildSelectionSet(isFieldType(fieldType), fieldNameFn);
                if (selectionSet && node.loc) {
                    const indent = getIndentation(docString, node.loc.start);
                    insertions.push({
                        index: node.loc.end,
                        string: ' ' + print(selectionSet).replaceAll('\n', '\n' + indent),
                    });
                }
            }
        },
    });
    return {
        insertions,
        result: withInsertions(docString, insertions),
    };
}
function defaultGetDefaultFieldNames(type) {
    if (!('getFields' in type)) {
        return [];
    }
    const fields = type.getFields();
    if (fields.id) {
        return ['id'];
    }
    if (fields.edges) {
        return ['edges'];
    }
    if (fields.node) {
        return ['node'];
    }
    const leafFieldNames = [];
    for (const fieldName of Object.keys(fields)) {
        if (isLeafType(fields[fieldName].type)) {
            leafFieldNames.push(fieldName);
        }
    }
    return leafFieldNames;
}
function buildSelectionSet(type, getDefaultFieldNames) {
    const namedType = getNamedType(type);
    if (!type || isLeafType(type)) {
        return;
    }
    const fieldNames = getDefaultFieldNames(namedType);
    if (!Array.isArray(fieldNames) ||
        fieldNames.length === 0 ||
        !('getFields' in namedType)) {
        return;
    }
    return {
        kind: Kind.SELECTION_SET,
        selections: fieldNames.map(fieldName => {
            const fieldDef = namedType.getFields()[fieldName];
            const fieldType = fieldDef ? fieldDef.type : null;
            return {
                kind: Kind.FIELD,
                name: {
                    kind: Kind.NAME,
                    value: fieldName,
                },
                selectionSet: buildSelectionSet(fieldType, getDefaultFieldNames),
            };
        }),
    };
}
function withInsertions(initial, insertions) {
    if (insertions.length === 0) {
        return initial;
    }
    let edited = '';
    let prevIndex = 0;
    for (const { index, string } of insertions) {
        edited += initial.slice(prevIndex, index) + string;
        prevIndex = index;
    }
    edited += initial.slice(prevIndex);
    return edited;
}
function getIndentation(str, index) {
    let indentStart = index;
    let indentEnd = index;
    while (indentStart) {
        const c = str.charCodeAt(indentStart - 1);
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