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
exports.MultiSamlStrategy = exports.Strategy = exports.AbstractStrategy = void 0;
const strategy_1 = require("./strategy");
Object.defineProperty(exports, "Strategy", { enumerable: true, get: function () { return strategy_1.Strategy; } });
Object.defineProperty(exports, "AbstractStrategy", { enumerable: true, get: function () { return strategy_1.AbstractStrategy; } });
const multiSamlStrategy_1 = require("./multiSamlStrategy");
Object.defineProperty(exports, "MultiSamlStrategy", { enumerable: true, get: function () { return multiSamlStrategy_1.MultiSamlStrategy; } });
__exportStar(require("@node-saml/node-saml"), exports);
//# sourceMappingURL=index.js.map