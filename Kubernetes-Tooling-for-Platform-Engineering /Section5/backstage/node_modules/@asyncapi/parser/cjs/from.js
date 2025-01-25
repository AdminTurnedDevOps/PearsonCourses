"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.fromFile = exports.fromURL = void 0;
const fs_1 = require("fs");
const util_1 = require("util");
function fromURL(parser, source, options) {
    function fetchUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchFn = yield getFetch();
            return (yield fetchFn(source, options)).text();
        });
    }
    return {
        parse(options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                const schema = yield fetchUrl();
                return parser.parse(schema, Object.assign(Object.assign({}, options), { source }));
            });
        },
        validate(options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                const schema = yield fetchUrl();
                return parser.validate(schema, Object.assign(Object.assign({}, options), { source }));
            });
        }
    };
}
exports.fromURL = fromURL;
function fromFile(parser, source, options) {
    function readFileFn() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (0, util_1.promisify)(fs_1.readFile)(source, options)).toString();
        });
    }
    return {
        parse(options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                const schema = yield readFileFn();
                return parser.parse(schema, Object.assign(Object.assign({}, options), { source }));
            });
        },
        validate(options = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                const schema = yield readFileFn();
                return parser.validate(schema, Object.assign(Object.assign({}, options), { source }));
            });
        }
    };
}
exports.fromFile = fromFile;
let __fetchFn;
function getFetch() {
    return __awaiter(this, void 0, void 0, function* () {
        if (__fetchFn) {
            return __fetchFn;
        }
        if (typeof fetch === 'undefined') {
            return __fetchFn = (yield Promise.resolve().then(() => __importStar(require('node-fetch')))).default;
        }
        return (__fetchFn = fetch);
    });
}
