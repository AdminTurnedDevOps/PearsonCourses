"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMockRes = exports.getMockReq = void 0;
const request_1 = __importDefault(require("./src/request/request"));
exports.getMockReq = request_1.default;
const response_1 = __importDefault(require("./src/response/response"));
exports.getMockRes = response_1.default;
//# sourceMappingURL=index.js.map