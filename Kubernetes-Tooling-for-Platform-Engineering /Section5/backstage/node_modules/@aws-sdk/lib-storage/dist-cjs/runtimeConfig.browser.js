"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDefaultValues = void 0;
const runtimeConfig_shared_1 = require("./runtimeConfig.shared");
exports.ClientDefaultValues = {
    ...runtimeConfig_shared_1.ClientSharedValues,
    runtime: "browser",
};
