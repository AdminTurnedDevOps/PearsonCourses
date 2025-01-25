"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveMatchedConfigs = resolveMatchedConfigs;
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy
*/
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const ModuleNotFoundError = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/ModuleNotFoundError'));
const LazySet = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/LazySet'));
const RESOLVE_OPTIONS = {
    dependencyType: 'esm',
};
async function resolveMatchedConfigs(compilation, configs) {
    const resolved = new Map();
    const unresolved = new Map();
    const prefixed = new Map();
    const resolveContext = {
        fileDependencies: new LazySet(),
        contextDependencies: new LazySet(),
        missingDependencies: new LazySet(),
    };
    // @ts-ignore
    const resolver = compilation.resolverFactory.get('normal', RESOLVE_OPTIONS);
    const context = compilation.compiler.context;
    await Promise.all(
    //@ts-ignore
    configs.map(([request, config]) => {
        if (/^\.\.?(\/|$)/.test(request)) {
            // relative request
            return new Promise((resolve) => {
                resolver.resolve({}, context, request, resolveContext, (err, result) => {
                    if (err || result === false) {
                        err = err || new Error(`Can't resolve ${request}`);
                        compilation.errors.push(
                        // @ts-ignore
                        new ModuleNotFoundError(null, err, {
                            name: `shared module ${request}`,
                        }));
                        return resolve();
                    }
                    resolved.set(result, config);
                    resolve();
                });
            });
        }
        else if (/^(\/|[A-Za-z]:\\|\\\\)/.test(request)) {
            // absolute path
            resolved.set(request, config);
        }
        else if (request.endsWith('/')) {
            // module request prefix
            prefixed.set(request, config);
        }
        else {
            // module request
            unresolved.set(request, config);
        }
    }));
    compilation.contextDependencies.addAll(resolveContext.contextDependencies);
    compilation.fileDependencies.addAll(resolveContext.fileDependencies);
    compilation.missingDependencies.addAll(resolveContext.missingDependencies);
    return { resolved, unresolved, prefixed };
}
//# sourceMappingURL=resolveMatchedConfigs.js.map