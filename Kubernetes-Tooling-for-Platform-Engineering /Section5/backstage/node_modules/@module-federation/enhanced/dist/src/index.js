"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModuleFederationConfig = exports.container = exports.parseOptions = exports.dependencies = exports.HoistContainerReferencesPlugin = exports.AsyncBoundaryPlugin = exports.FederationRuntimePlugin = exports.FederationModulesPlugin = exports.ProvideSharedPlugin = exports.ConsumeSharedPlugin = exports.ContainerPlugin = exports.SharePlugin = exports.ContainerReferencePlugin = exports.ModuleFederationPlugin = void 0;
var ModuleFederationPlugin_1 = require("./wrapper/ModuleFederationPlugin");
Object.defineProperty(exports, "ModuleFederationPlugin", { enumerable: true, get: function () { return __importDefault(ModuleFederationPlugin_1).default; } });
var ContainerReferencePlugin_1 = require("./wrapper/ContainerReferencePlugin");
Object.defineProperty(exports, "ContainerReferencePlugin", { enumerable: true, get: function () { return __importDefault(ContainerReferencePlugin_1).default; } });
var SharePlugin_1 = require("./wrapper/SharePlugin");
Object.defineProperty(exports, "SharePlugin", { enumerable: true, get: function () { return __importDefault(SharePlugin_1).default; } });
var ContainerPlugin_1 = require("./wrapper/ContainerPlugin");
Object.defineProperty(exports, "ContainerPlugin", { enumerable: true, get: function () { return __importDefault(ContainerPlugin_1).default; } });
var ConsumeSharedPlugin_1 = require("./wrapper/ConsumeSharedPlugin");
Object.defineProperty(exports, "ConsumeSharedPlugin", { enumerable: true, get: function () { return __importDefault(ConsumeSharedPlugin_1).default; } });
var ProvideSharedPlugin_1 = require("./wrapper/ProvideSharedPlugin");
Object.defineProperty(exports, "ProvideSharedPlugin", { enumerable: true, get: function () { return __importDefault(ProvideSharedPlugin_1).default; } });
var FederationModulesPlugin_1 = require("./wrapper/FederationModulesPlugin");
Object.defineProperty(exports, "FederationModulesPlugin", { enumerable: true, get: function () { return __importDefault(FederationModulesPlugin_1).default; } });
var FederationRuntimePlugin_1 = require("./wrapper/FederationRuntimePlugin");
Object.defineProperty(exports, "FederationRuntimePlugin", { enumerable: true, get: function () { return __importDefault(FederationRuntimePlugin_1).default; } });
var AsyncBoundaryPlugin_1 = require("./wrapper/AsyncBoundaryPlugin");
Object.defineProperty(exports, "AsyncBoundaryPlugin", { enumerable: true, get: function () { return __importDefault(AsyncBoundaryPlugin_1).default; } });
var HoistContainerReferencesPlugin_1 = require("./wrapper/HoistContainerReferencesPlugin");
Object.defineProperty(exports, "HoistContainerReferencesPlugin", { enumerable: true, get: function () { return __importDefault(HoistContainerReferencesPlugin_1).default; } });
exports.dependencies = {
    get ContainerEntryDependency() {
        return require('./lib/container/ContainerEntryDependency').default;
    },
};
var options_1 = require("./lib/container/options");
Object.defineProperty(exports, "parseOptions", { enumerable: true, get: function () { return options_1.parseOptions; } });
exports.container = {
    get ContainerEntryModule() {
        return require('./lib/container/ContainerEntryModule').default;
    },
};
const createModuleFederationConfig = (options) => {
    return options;
};
exports.createModuleFederationConfig = createModuleFederationConfig;
//# sourceMappingURL=index.js.map