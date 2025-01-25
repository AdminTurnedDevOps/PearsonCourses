var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Resolver as SpectralResolver } from '@stoplight/spectral-ref-resolver';
import { Cache } from '@stoplight/json-ref-resolver/cache';
import { resolveFile, resolveHttp } from '@stoplight/json-ref-readers';
export function createResolver(options = {}) {
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
    return new SpectralResolver({
        uriCache: cache ? undefined : new Cache({ stdTTL: 1 }),
        resolvers: resolvers,
    });
}
function createDefaultResolvers() {
    return [
        {
            schema: 'file',
            read: resolveFile,
        },
        {
            schema: 'https',
            read: resolveHttp,
        },
        {
            schema: 'http',
            read: resolveHttp,
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
