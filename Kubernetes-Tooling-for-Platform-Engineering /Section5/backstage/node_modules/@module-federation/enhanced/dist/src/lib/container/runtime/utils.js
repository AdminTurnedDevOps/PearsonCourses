"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeToPosixPath = void 0;
exports.getFederationGlobalScope = getFederationGlobalScope;
exports.normalizeRuntimeInitOptionsWithOutShared = normalizeRuntimeInitOptionsWithOutShared;
exports.modifyEntry = modifyEntry;
exports.createHash = createHash;
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Zackary Jackson @ScriptedAlchemy
*/
const normalize_webpack_path_1 = require("@module-federation/sdk/normalize-webpack-path");
const upath_1 = __importDefault(require("upath"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const options_1 = require("../options");
const extractUrlAndGlobal = require((0, normalize_webpack_path_1.normalizeWebpackPath)('webpack/lib/util/extractUrlAndGlobal'));
function getFederationGlobalScope(runtimeGlobals) {
    return `${runtimeGlobals.require || '__webpack_require__'}.federation`;
}
function normalizeRuntimeInitOptionsWithOutShared(options) {
    const parsedOptions = (0, options_1.parseOptions)(options.remotes || [], (item) => ({
        external: Array.isArray(item) ? item : [item],
        shareScope: options.shareScope || 'default',
    }), (item) => ({
        external: Array.isArray(item.external) ? item.external : [item.external],
        shareScope: item.shareScope || options.shareScope || 'default',
    }));
    const remoteOptions = [];
    parsedOptions.forEach((parsedOption) => {
        const [alias, remoteInfos] = parsedOption;
        const { external, shareScope } = remoteInfos;
        try {
            // only fit for remoteType: 'script'
            const entry = external[0];
            if (/\s/.test(entry)) {
                return;
            }
            const [url, globalName] = extractUrlAndGlobal(external[0]);
            remoteOptions.push({
                alias,
                name: globalName,
                entry: url,
                shareScope: shareScope,
                // externalType
            });
        }
        catch (err) {
            return;
        }
    });
    const initOptionsWithoutShared = {
        name: options.name,
        remotes: remoteOptions,
        shareStrategy: options.shareStrategy || 'version-first',
    };
    return initOptionsWithoutShared;
}
function modifyEntry(options) {
    const { compiler, staticEntry, prependEntry } = options;
    const operator = (oriEntry, newEntry) => Object.assign(oriEntry, newEntry);
    if (typeof compiler.options.entry === 'function') {
        const prevEntryFn = compiler.options.entry;
        compiler.options.entry = async () => {
            let res = await prevEntryFn();
            if (staticEntry) {
                res = operator(res, staticEntry);
            }
            if (prependEntry) {
                prependEntry(res);
            }
            return res;
        };
    }
    else {
        if (staticEntry) {
            compiler.options.entry = operator(compiler.options.entry, staticEntry);
        }
        if (prependEntry) {
            prependEntry(compiler.options.entry);
        }
    }
}
function createHash(contents) {
    return crypto_1.default.createHash('md5').update(contents).digest('hex');
}
const normalizeToPosixPath = (p) => upath_1.default.normalizeSafe(path_1.default.normalize(p || ''));
exports.normalizeToPosixPath = normalizeToPosixPath;
//# sourceMappingURL=utils.js.map