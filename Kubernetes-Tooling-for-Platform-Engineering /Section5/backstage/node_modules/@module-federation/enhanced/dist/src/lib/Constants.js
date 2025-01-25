"use strict";
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Sean Larkin @TheLarkInn
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBPACK_MODULE_TYPE_LAZY_COMPILATION_PROXY = exports.WEBPACK_MODULE_TYPE_CONSUME_SHARED_MODULE = exports.WEBPACK_MODULE_TYPE_PROVIDE = exports.WEBPACK_MODULE_TYPE_REMOTE = exports.WEBPACK_MODULE_TYPE_FALLBACK = exports.WEBPACK_MODULE_TYPE_RUNTIME = exports.ASSET_MODULE_TYPE_RAW_DATA_URL = exports.ASSET_MODULE_TYPE_SOURCE = exports.ASSET_MODULE_TYPE_RESOURCE = exports.ASSET_MODULE_TYPE_INLINE = exports.ASSET_MODULE_TYPE = exports.CSS_MODULE_TYPE_AUTO = exports.CSS_MODULE_TYPE_MODULE = exports.CSS_MODULE_TYPE_GLOBAL = exports.CSS_MODULE_TYPE = exports.WEBASSEMBLY_MODULE_TYPE_SYNC = exports.WEBASSEMBLY_MODULE_TYPE_ASYNC = exports.JSON_MODULE_TYPE = exports.JAVASCRIPT_MODULE_TYPE_ESM = exports.JAVASCRIPT_MODULE_TYPE_DYNAMIC = exports.JAVASCRIPT_MODULE_TYPE_AUTO = void 0;
/**
 * @type {Readonly<"javascript/auto">}
 */
exports.JAVASCRIPT_MODULE_TYPE_AUTO = 'javascript/auto';
/**
 * @type {Readonly<"javascript/dynamic">}
 */
exports.JAVASCRIPT_MODULE_TYPE_DYNAMIC = 'javascript/dynamic';
/**
 * @type {Readonly<"javascript/esm">}
 * This is the module type used for _strict_ ES Module syntax. This means that all legacy formats
 * that webpack supports (CommonJS, AMD, SystemJS) are not supported.
 */
exports.JAVASCRIPT_MODULE_TYPE_ESM = 'javascript/esm';
/**
 * @type {Readonly<"json">}
 * This is the module type used for JSON files. JSON files are always parsed as ES Module.
 */
exports.JSON_MODULE_TYPE = 'json';
/**
 * @type {Readonly<"webassembly/async">}
 * This is the module type used for WebAssembly modules. In webpack 5 they are always treated as async modules.
 *
 */
exports.WEBASSEMBLY_MODULE_TYPE_ASYNC = 'webassembly/async';
/**
 * @type {Readonly<"webassembly/sync">}
 * This is the module type used for WebAssembly modules. In webpack 4 they are always treated as sync modules.
 * There is a legacy option to support this usage in webpack 5 and up.
 */
exports.WEBASSEMBLY_MODULE_TYPE_SYNC = 'webassembly/sync';
/**
 * @type {Readonly<"css">}
 * This is the module type used for CSS files.
 */
exports.CSS_MODULE_TYPE = 'css';
/**
 * @type {Readonly<"css/global">}
 * This is the module type used for CSS modules files where you need to use `:local` in selector list to hash classes.
 */
exports.CSS_MODULE_TYPE_GLOBAL = 'css/global';
/**
 * @type {Readonly<"css/module">}
 * This is the module type used for CSS modules files, by default all classes are hashed.
 */
exports.CSS_MODULE_TYPE_MODULE = 'css/module';
/**
 * @type {Readonly<"css/auto">}
 * This is the module type used for CSS files, the module will be parsed as CSS modules if it's filename contains `.module.` or `.modules.`.
 */
exports.CSS_MODULE_TYPE_AUTO = 'css/auto';
/**
 * @type {Readonly<"asset">}
 * This is the module type used for automatically choosing between `asset/inline`, `asset/resource` based on asset size limit (8096).
 */
exports.ASSET_MODULE_TYPE = 'asset';
/**
 * @type {Readonly<"asset/inline">}
 * This is the module type used for assets that are inlined as a data URI. This is the equivalent of `url-loader`.
 */
exports.ASSET_MODULE_TYPE_INLINE = 'asset/inline';
/**
 * @type {Readonly<"asset/resource">}
 * This is the module type used for assets that are copied to the output directory. This is the equivalent of `file-loader`.
 */
exports.ASSET_MODULE_TYPE_RESOURCE = 'asset/resource';
/**
 * @type {Readonly<"asset/source">}
 * This is the module type used for assets that are imported as source code. This is the equivalent of `raw-loader`.
 */
exports.ASSET_MODULE_TYPE_SOURCE = 'asset/source';
/**
 * @type {Readonly<"asset/raw-data-url">}
 * TODO: Document what this asset type is for. See css-loader tests for its usage.
 */
exports.ASSET_MODULE_TYPE_RAW_DATA_URL = 'asset/raw-data-url';
/**
 * @type {Readonly<"runtime">}
 * This is the module type used for the webpack runtime abstractions.
 */
exports.WEBPACK_MODULE_TYPE_RUNTIME = 'runtime';
/**
 * @type {Readonly<"fallback-module">}
 * This is the module type used for the ModuleFederation feature's FallbackModule class.
 * TODO: Document this better.
 */
exports.WEBPACK_MODULE_TYPE_FALLBACK = 'fallback-module';
/**
 * @type {Readonly<"remote-module">}
 * This is the module type used for the ModuleFederation feature's RemoteModule class.
 * TODO: Document this better.
 */
exports.WEBPACK_MODULE_TYPE_REMOTE = 'remote-module';
/**
 * @type {Readonly<"provide-module">}
 * This is the module type used for the ModuleFederation feature's ProvideModule class.
 * TODO: Document this better.
 */
exports.WEBPACK_MODULE_TYPE_PROVIDE = 'provide-module';
/**
 * @type {Readonly<"consume-shared-module">}
 * This is the module type used for the ModuleFederation feature's ConsumeSharedModule class.
 */
exports.WEBPACK_MODULE_TYPE_CONSUME_SHARED_MODULE = 'consume-shared-module';
/**
 * @type {Readonly<"lazy-compilation-proxy">}
 * Module type used for `experiments.lazyCompilation` feature. See `LazyCompilationPlugin` for more information.
 */
exports.WEBPACK_MODULE_TYPE_LAZY_COMPILATION_PROXY = 'lazy-compilation-proxy';
/** @typedef {"javascript/auto" | "javascript/dynamic" | "javascript/esm"} JavaScriptModuleTypes */
/** @typedef {"json"} JSONModuleType */
/** @typedef {"webassembly/async" | "webassembly/sync"} WebAssemblyModuleTypes */
/** @typedef {"css" | "css/global" | "css/module"} CSSModuleTypes */
/** @typedef {"asset" | "asset/inline" | "asset/resource" | "asset/source" | "asset/raw-data-url"} AssetModuleTypes */
/** @typedef {"runtime" | "fallback-module" | "remote-module" | "provide-module" | "consume-shared-module" | "lazy-compilation-proxy"} WebpackModuleTypes */
/** @typedef {string} UnknownModuleTypes */
/** @typedef {JavaScriptModuleTypes | JSONModuleType | WebAssemblyModuleTypes | CSSModuleTypes | AssetModuleTypes | WebpackModuleTypes | UnknownModuleTypes} ModuleTypes */
//# sourceMappingURL=Constants.js.map