"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDefaultValues = void 0;
const runtimeConfig_browser_1 = require("./runtimeConfig.browser");
exports.ClientDefaultValues = {
    ...runtimeConfig_browser_1.ClientDefaultValues,
    runtime: "react-native",
};
