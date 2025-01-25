"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDefaultValues = void 0;
const fs_1 = require("fs");
const runtimeConfig_shared_1 = require("./runtimeConfig.shared");
exports.ClientDefaultValues = {
    ...runtimeConfig_shared_1.ClientSharedValues,
    runtime: "node",
    lstatSync: fs_1.lstatSync,
};
