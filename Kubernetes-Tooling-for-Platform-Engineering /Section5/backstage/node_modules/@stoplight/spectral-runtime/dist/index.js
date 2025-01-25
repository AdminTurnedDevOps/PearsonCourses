"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_REQUEST_OPTIONS = exports.fetch = void 0;
const tslib_1 = require("tslib");
(0, tslib_1.__exportStar)(require("./utils"), exports);
var fetch_1 = require("./fetch");
Object.defineProperty(exports, "fetch", { enumerable: true, get: function () { return (0, tslib_1.__importDefault)(fetch_1).default; } });
Object.defineProperty(exports, "DEFAULT_REQUEST_OPTIONS", { enumerable: true, get: function () { return fetch_1.DEFAULT_REQUEST_OPTIONS; } });
(0, tslib_1.__exportStar)(require("./reader"), exports);
//# sourceMappingURL=index.js.map