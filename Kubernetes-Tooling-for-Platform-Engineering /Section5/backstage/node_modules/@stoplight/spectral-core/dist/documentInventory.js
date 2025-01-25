"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentInventory = void 0;
const tslib_1 = require("tslib");
const json_1 = require("@stoplight/json");
const path_1 = require("@stoplight/path");
const lodash_1 = require("lodash");
const document_1 = require("./document");
const errorMessages_1 = require("./errorMessages");
const Parsers = (0, tslib_1.__importStar)(require("@stoplight/spectral-parsers"));
const spectral_runtime_1 = require("@stoplight/spectral-runtime");
class DocumentInventory {
    constructor(document, resolver) {
        this.document = document;
        this.resolver = resolver;
        this.diagnostics = [];
        this.parseResolveResult = resolveOpts => {
            const source = resolveOpts.targetAuthority.href().replace(/\/$/, '');
            const ext = (0, path_1.extname)(source);
            const content = String(resolveOpts.result);
            const parser = ext === '.json' ? Parsers.Json : Parsers.Yaml;
            const document = new document_1.Document(content, parser, source);
            resolveOpts.result = document.data;
            if (document.diagnostics.length > 0) {
                this.diagnostics.push(...(0, errorMessages_1.formatParserDiagnostics)(document.diagnostics, document.source));
            }
            this.referencedDocuments[source] = document;
            return Promise.resolve(resolveOpts);
        };
        this.graph = null;
        this.errors = null;
        const cacheKey = resolver.uriCache;
        const cachedDocuments = DocumentInventory._cachedRemoteDocuments.get(cacheKey);
        if (cachedDocuments !== void 0) {
            this.referencedDocuments = cachedDocuments;
        }
        else {
            this.referencedDocuments = {};
            DocumentInventory._cachedRemoteDocuments.set(cacheKey, this.referencedDocuments);
        }
    }
    get source() {
        return this.document.source;
    }
    get unresolved() {
        return this.document.data;
    }
    get formats() {
        var _a;
        return (_a = this.document.formats) !== null && _a !== void 0 ? _a : null;
    }
    async resolve() {
        if (!(0, lodash_1.isObjectLike)(this.document.data)) {
            this.graph = null;
            this.resolved = this.document.data;
            this.errors = null;
            return;
        }
        const resolveResult = await this.resolver.resolve(this.document.data, {
            ...(this.document.source !== null ? { baseUri: this.document.source } : null),
            parseResolveResult: this.parseResolveResult,
        });
        this.graph = resolveResult.graph;
        this.resolved = resolveResult.result;
        this.errors = (0, errorMessages_1.formatResolverErrors)(this.document, resolveResult.errors);
    }
    findAssociatedItemForPath(path, resolved) {
        if (!resolved) {
            const newPath = (0, spectral_runtime_1.getClosestJsonPath)(this.unresolved, path);
            const item = {
                document: this.document,
                path: newPath,
                missingPropertyPath: path,
            };
            return item;
        }
        try {
            const newPath = (0, spectral_runtime_1.getClosestJsonPath)(this.resolved, path);
            const $ref = (0, spectral_runtime_1.traverseObjUntilRef)(this.unresolved, newPath);
            if ($ref === null) {
                const item = {
                    document: this.document,
                    path: (0, spectral_runtime_1.getClosestJsonPath)(this.unresolved, path),
                    missingPropertyPath: path,
                };
                return item;
            }
            const missingPropertyPath = newPath.length === 0 ? [] : path.slice(path.lastIndexOf(newPath[newPath.length - 1]) + 1);
            let { source } = this;
            if (source === null || this.graph === null) {
                return null;
            }
            let refMap = this.graph.getNodeData(source).refMap;
            let resolvedDoc = this.document;
            const adjustedPath = ['#', ...path.map(json_1.encodePointerUriFragment).map(String)];
            let refMapKey = '';
            for (const segment of adjustedPath) {
                if (refMapKey.length > 0) {
                    refMapKey += '/';
                }
                refMapKey += segment;
                while (refMapKey in refMap) {
                    const newRef = refMap[refMapKey];
                    if ((0, json_1.isLocalRef)(newRef)) {
                        refMapKey = newRef;
                    }
                    else {
                        const extractedSource = (0, json_1.extractSourceFromRef)(newRef);
                        if (extractedSource === null) {
                            const item = {
                                document: resolvedDoc,
                                path: (0, spectral_runtime_1.getClosestJsonPath)(resolvedDoc.data, path),
                                missingPropertyPath: path,
                            };
                            return item;
                        }
                        source = (0, spectral_runtime_1.isAbsoluteRef)(extractedSource) ? extractedSource : (0, path_1.resolve)(source, '..', extractedSource);
                        const newResolvedDoc = source === this.document.source ? this.document : this.referencedDocuments[source];
                        if (newResolvedDoc === null || newResolvedDoc === void 0) {
                            const item = {
                                document: resolvedDoc,
                                path: (0, spectral_runtime_1.getClosestJsonPath)(resolvedDoc.data, path),
                                missingPropertyPath: path,
                            };
                            return item;
                        }
                        resolvedDoc = newResolvedDoc;
                        refMap = this.graph.getNodeData(source).refMap;
                        refMapKey = newRef.indexOf('#') >= 0 ? newRef.slice(newRef.indexOf('#')) : '#';
                    }
                }
            }
            const closestPath = (0, spectral_runtime_1.getClosestJsonPath)(resolvedDoc.data, this.convertRefMapKeyToPath(refMapKey));
            const item = {
                document: resolvedDoc,
                path: closestPath,
                missingPropertyPath: [...closestPath, ...missingPropertyPath],
            };
            return item;
        }
        catch {
            return null;
        }
    }
    convertRefMapKeyToPath(refPath) {
        if (refPath.startsWith('#/')) {
            refPath = refPath.slice(2);
        }
        return refPath.split('/').map(json_1.decodePointerFragment);
    }
}
exports.DocumentInventory = DocumentInventory;
DocumentInventory._cachedRemoteDocuments = new WeakMap();
//# sourceMappingURL=documentInventory.js.map