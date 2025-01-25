"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMP_DIR = exports.FEDERATION_SUPPORTED_TYPES = void 0;
/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Zackary Jackson @ScriptedAlchemy
*/
const path_1 = __importDefault(require("path"));
const sdk_1 = require("@module-federation/sdk");
const FEDERATION_SUPPORTED_TYPES = ['script'];
exports.FEDERATION_SUPPORTED_TYPES = FEDERATION_SUPPORTED_TYPES;
const TEMP_DIR = path_1.default.join(`${process.cwd()}/node_modules`, sdk_1.TEMP_DIR);
exports.TEMP_DIR = TEMP_DIR;
//# sourceMappingURL=constant.js.map