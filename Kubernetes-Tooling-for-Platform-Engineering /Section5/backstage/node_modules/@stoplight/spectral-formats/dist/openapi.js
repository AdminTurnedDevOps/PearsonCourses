"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oas3_1 = exports.oas3_0 = exports.oas3 = exports.oas2 = void 0;
const json_1 = require("@stoplight/json");
const oas2 = (document) => (0, json_1.isPlainObject)(document) && 'swagger' in document && parseInt(String(document.swagger)) === 2;
exports.oas2 = oas2;
exports.oas2.displayName = 'OpenAPI 2.0 (Swagger)';
const isOas3 = (document) => (0, json_1.isPlainObject)(document) && 'openapi' in document && Number.parseInt(String(document.openapi)) === 3;
exports.oas3 = isOas3;
exports.oas3.displayName = 'OpenAPI 3.x';
const oas3_0 = (document) => isOas3(document) && /^3\.0(?:\.[0-9]*)?$/.test(String(document.openapi));
exports.oas3_0 = oas3_0;
exports.oas3_0.displayName = 'OpenAPI 3.0.x';
const oas3_1 = (document) => isOas3(document) && /^3\.1(?:\.[0-9]*)?$/.test(String(document.openapi));
exports.oas3_1 = oas3_1;
exports.oas3_1.displayName = 'OpenAPI 3.1.x';
//# sourceMappingURL=openapi.js.map