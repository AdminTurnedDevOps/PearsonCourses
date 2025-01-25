"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readParsable = exports.readFile = void 0;
const tslib_1 = require("tslib");
const path_1 = require("@stoplight/path");
const abort_controller_1 = (0, tslib_1.__importDefault)(require("abort-controller"));
const fs = (0, tslib_1.__importStar)(require("fs"));
const lodash_1 = require("lodash");
const fetch_1 = (0, tslib_1.__importDefault)(require("./fetch"));
const printError_1 = require("./utils/printError");
async function readFile(name, opts) {
    if ((0, path_1.isURL)(name)) {
        let response;
        let timeout = null;
        try {
            const requestOpts = {};
            requestOpts.agent = opts.agent;
            if (opts.timeout !== void 0) {
                const controller = new abort_controller_1.default();
                timeout = setTimeout(() => {
                    controller.abort();
                }, opts.timeout);
                requestOpts.signal = controller.signal;
            }
            response = await (0, fetch_1.default)(name, requestOpts);
            if (!response.ok)
                throw new Error(response.statusText);
            return await response.text();
        }
        catch (ex) {
            if ((0, lodash_1.isError)(ex) && ex.name === 'AbortError') {
                throw new Error('Timeout');
            }
            else {
                throw ex;
            }
        }
        finally {
            if (timeout !== null) {
                clearTimeout(timeout);
            }
        }
    }
    else {
        try {
            return await new Promise((resolve, reject) => {
                fs.readFile(name, opts.encoding, (err, data) => {
                    if (err !== null) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        }
        catch (ex) {
            throw new Error(`Could not read ${name}: ${(0, printError_1.printError)(ex)}`);
        }
    }
}
exports.readFile = readFile;
async function readParsable(name, opts) {
    try {
        return await readFile(name, opts);
    }
    catch (ex) {
        throw new Error(`Could not parse ${name}: ${(0, printError_1.printError)(ex)}`);
    }
}
exports.readParsable = readParsable;
//# sourceMappingURL=reader.js.map