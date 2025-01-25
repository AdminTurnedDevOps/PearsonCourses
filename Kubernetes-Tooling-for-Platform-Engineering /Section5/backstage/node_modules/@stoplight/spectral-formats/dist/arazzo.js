"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arazzo1_0 = void 0;
const json_1 = require("@stoplight/json");
const arazzo1_0Regex = /^1\.0(?:\.[0-9]*)?$/;
const isArazzo = (document) => (0, json_1.isPlainObject)(document) && 'arazzo' in document && arazzo1_0Regex.test(String(document.arazzo));
exports.arazzo1_0 = isArazzo;
exports.arazzo1_0.displayName = 'Arazzo 1.0.x';
//# sourceMappingURL=arazzo.js.map