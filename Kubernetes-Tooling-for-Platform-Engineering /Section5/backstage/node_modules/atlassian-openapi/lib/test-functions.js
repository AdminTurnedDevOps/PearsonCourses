"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathsToOAS = void 0;
function pathsToOAS(paths, tags) {
    return {
        openapi: '3.0.0',
        info: {
            title: 'Test Swagger File',
            version: '1'
        },
        paths,
        tags
    };
}
exports.pathsToOAS = pathsToOAS;
