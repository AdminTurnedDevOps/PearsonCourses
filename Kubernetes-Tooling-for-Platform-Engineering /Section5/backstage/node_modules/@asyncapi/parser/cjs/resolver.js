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
exports.createResolver = void 0;
const spectral_ref_resolver_1 = require("@stoplight/spectral-ref-resolver");
const cache_1 = require("@stoplight/json-ref-resolver/cache");
const json_ref_readers_1 = require("@stoplight/json-ref-readers");
function createResolver(options = {}) {
    const availableResolvers = [
        ...createDefaultResolvers(),
        ...(options.resolvers || [])
    ].map(r => (Object.assign(Object.assign({}, r), { order: r.order || Number.MAX_SAFE_INTEGER, canRead: typeof r.canRead === 'undefined' ? true : r.canRead })));
    const availableSchemas = [...new Set(availableResolvers.map(r => r.schema))];
    const resolvers = availableSchemas.reduce((acc, schema) => {
        acc[schema] = { resolve: createSchemaResolver(schema, availableResolvers) };
        return acc;
    }, {});
    // if cache is enabled, use default Cache instance in SpectralResolver, otherwise use custom one with ttl set to 1ms
    const cache = options.cache !== false;
    return new spectral_ref_resolver_1.Resolver({
        uriCache: cache ? undefined : new cache_1.Cache({ stdTTL: 1 }),
        resolvers: resolvers,
    });
}
exports.createResolver = createResolver;
function createDefaultResolvers() {
    return [
        {
            schema: 'file',
            read: json_ref_readers_1.resolveFile,
        },
        {
            schema: 'https',
            read: json_ref_readers_1.resolveHttp,
        },
        {
            schema: 'http',
            read: json_ref_readers_1.resolveHttp,
        },
    ];
}
function createSchemaResolver(schema, allResolvers) {
    const resolvers = allResolvers.filter(r => r.schema === schema).sort((a, b) => { return a.order - b.order; });
    return (uri, ctx) => __awaiter(this, void 0, void 0, function* () {
        let result = undefined;
        let lastError;
        for (const resolver of resolvers) {
            try {
                if (!canRead(resolver, uri, ctx))
                    continue;
                result = yield resolver.read(uri, ctx);
                if (typeof result === 'string') {
                    break;
                }
            }
            catch (e) {
                lastError = e;
                continue;
            }
        }
        if (typeof result !== 'string') {
            throw lastError || new Error(`None of the available resolvers for "${schema}" can resolve the given reference.`);
        }
        return result;
    });
}
function canRead(resolver, uri, ctx) {
    return typeof resolver.canRead === 'function' ? resolver.canRead(uri, ctx) : resolver.canRead;
}
