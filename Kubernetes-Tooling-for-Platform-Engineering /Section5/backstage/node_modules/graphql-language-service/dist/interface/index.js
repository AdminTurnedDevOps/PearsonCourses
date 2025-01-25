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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHoverInformation = exports.getOutline = void 0;
__exportStar(require("./autocompleteUtils"), exports);
__exportStar(require("./getAutocompleteSuggestions"), exports);
__exportStar(require("./getDefinition"), exports);
__exportStar(require("./getDiagnostics"), exports);
var getOutline_1 = require("./getOutline");
Object.defineProperty(exports, "getOutline", { enumerable: true, get: function () { return getOutline_1.getOutline; } });
var getHoverInformation_1 = require("./getHoverInformation");
Object.defineProperty(exports, "getHoverInformation", { enumerable: true, get: function () { return getHoverInformation_1.getHoverInformation; } });
//# sourceMappingURL=index.js.map