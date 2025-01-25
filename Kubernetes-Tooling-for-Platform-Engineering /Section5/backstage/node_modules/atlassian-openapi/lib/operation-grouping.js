"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagGroupingStrategy = exports.urlGroupingStrategy = exports.radV1GroupingStrategy = exports.getOpPath = exports.getIdForOperation = exports.getIdForOperationGroup = void 0;
const URI = require("urijs");
function findBestServer(swagger) {
    if (swagger.servers === undefined) {
        return undefined;
    }
    const validServers = swagger.servers.filter(s => s.url.startsWith('http'));
    if (validServers.length === 0) {
        return swagger.servers.length > 0 ? swagger.servers[0] : undefined;
    }
    const httpsServer = validServers.find(s => s.url.startsWith('https://'));
    return httpsServer === undefined ? validServers[0] : httpsServer;
}
function getServerUrlWithDefault(swagger) {
    const bestServer = findBestServer(swagger);
    // Default value
    if (bestServer === undefined) {
        return 'https://your-domain.atlassian.net';
    }
    return bestServer.url.startsWith('//') ? `https:${bestServer.url}` : bestServer.url;
}
function getIdForOperationGroup(grouping) {
    // In the end, only alphanumeric characters should remain
    return 'api-group-' + grouping.title.replace(/[^A-Za-z\-]/g, '-');
}
exports.getIdForOperationGroup = getIdForOperationGroup;
function generateId(text) {
    return text.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
}
function getIdForOperation(po) {
    return `api-${generateId(po.path.substring(1))}-${po.method}`;
}
exports.getIdForOperation = getIdForOperation;
function getOpPath(po) {
    const pathSegments = new URI(po.baseUrl).segment();
    const basePath = pathSegments.filter(s => s.length > 0).join('/');
    const path = basePath.length > 0 ? `/${basePath}${po.path}` : po.path;
    return `${po.method.toUpperCase()} ${path}`;
}
exports.getOpPath = getOpPath;
function pathItemHasSummary(pathItem) {
    return typeof pathItem.summary !== 'undefined' && pathItem.summary.length > 0;
}
function extractFromPathItem(baseUrl, path, pathItem, security) {
    const pathItemParameters = pathItem.parameters === undefined ? [] : pathItem.parameters;
    const toPO = (method, operation) => {
        return {
            baseUrl,
            path,
            method,
            operation,
            pathItemParameters,
            security
        };
    };
    const operations = new Array();
    // tslint:disable:no-unused-expression
    pathItem.get && operations.push(toPO('get', pathItem.get));
    pathItem.put && operations.push(toPO('put', pathItem.put));
    pathItem.post && operations.push(toPO('post', pathItem.post));
    pathItem.delete && operations.push(toPO('delete', pathItem.delete));
    pathItem.options && operations.push(toPO('options', pathItem.options));
    pathItem.head && operations.push(toPO('head', pathItem.head));
    pathItem.patch && operations.push(toPO('patch', pathItem.patch));
    pathItem.trace && operations.push(toPO('trace', pathItem.trace));
    // tslint:enable:no-unused-expression
    return operations;
}
function toPathAndOperation(baseUrl, paths, security) {
    return new Array().concat(...Object.keys(paths).map(path => extractFromPathItem(baseUrl, path, paths[path], security)));
}
function toTagGroups(tags, pos) {
    let lookup = {};
    let defaultOps = new Array();
    // For each path and operation
    pos.forEach(op => {
        // If there is no tag, put it in the default group
        if (typeof op.operation.tags === 'undefined' || op.operation.tags.length === 0) {
            defaultOps.push(op);
        }
        else {
            const firstTag = op.operation.tags[0];
            const matchingTag = tags.find(t => t.name === firstTag);
            // If there is a tag but it does not match any defined tag, put it in the default group
            if (typeof matchingTag !== 'undefined') {
                if (typeof lookup[firstTag] === 'undefined') {
                    const opArr = new Array();
                    opArr.push(op);
                    lookup[firstTag] = {
                        tag: matchingTag,
                        operations: opArr
                    };
                }
                else {
                    lookup[firstTag].operations.push(op);
                }
            }
            else {
                defaultOps.push(op);
            }
        }
    });
    return {
        // Maintain the original sort order of the tags
        groups: tags.map(t => lookup[t.name]).filter(tg => typeof tg !== 'undefined'),
        default: {
            operations: defaultOps
        }
    };
}
function tagGroupToOperationGrouping(tg) {
    return {
        title: tg.tag.name,
        description: tg.tag.description,
        operations: tg.operations
    };
}
function tagGroupsToOperationGroupings(tgs) {
    const groups = tgs.groups.map(tagGroupToOperationGrouping);
    if (tgs.default.operations.length > 0) {
        groups.push({
            title: 'Other operations',
            operations: tgs.default.operations
        });
    }
    return { groups };
}
function generateTitleFromPath(path) {
    // This is a workaround for the issue with deeper endpoint paths in Jira Cloud REST Api.
    // This should be replaced with tags feature, once it's implemented. See go/j/JCE-1590
    const pathElement = path.startsWith('/api/3/') || path.startsWith('/api/2/') || path.startsWith('/auth/1') ? 2 : 0;
    const firstPathItem = path.substring(1).split('/')[pathElement];
    return firstPathItem ? firstPathItem[0].toUpperCase() + firstPathItem.slice(1) : '/';
}
/**
 * This function replicates the RAD V1 grouping strategy that we used for the side-nav. Having this grouping strategy
 * present should ease the transition to RAD V2 by making it the fallback mechanism if tagging has not been implemented.
 */
exports.radV1GroupingStrategy = swagger => {
    const baseUrl = getServerUrlWithDefault(swagger);
    const groupings = {};
    Object.keys(swagger.paths).forEach(path => {
        const topLevelPathGroup = generateTitleFromPath(path);
        const newPathItems = extractFromPathItem(baseUrl, path, swagger.paths[path], swagger.security);
        if (groupings[topLevelPathGroup] === undefined) {
            groupings[topLevelPathGroup] = {
                title: topLevelPathGroup,
                operations: newPathItems
            };
        }
        else {
            groupings[topLevelPathGroup].operations.push(...newPathItems);
        }
    });
    return {
        groups: Object.keys(groupings).map(pg => groupings[pg])
    };
};
exports.urlGroupingStrategy = swagger => {
    if (!Object.keys(swagger.paths).some(path => pathItemHasSummary(swagger.paths[path]))) {
        return exports.radV1GroupingStrategy(swagger);
    }
    const paths = Object.keys(swagger.paths).sort();
    const baseUrl = getServerUrlWithDefault(swagger);
    const groups = paths.map(path => {
        const pathItem = swagger.paths[path];
        return {
            title: pathItem.summary || generateTitleFromPath(path),
            description: pathItem.description,
            operations: extractFromPathItem(baseUrl, path, pathItem, swagger.security)
        };
    });
    return { groups };
};
exports.tagGroupingStrategy = swagger => {
    if (!swagger.tags) {
        // Fall-back to a urlGrouping strategy if tagging does not work.
        return exports.urlGroupingStrategy(swagger);
    }
    return tagGroupsToOperationGroupings(toTagGroups(swagger.tags, toPathAndOperation(getServerUrlWithDefault(swagger), swagger.paths, swagger.security)));
};
