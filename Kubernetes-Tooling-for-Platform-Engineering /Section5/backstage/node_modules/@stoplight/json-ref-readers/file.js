"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function resolveFile(ref) {
    return new Promise((resolve, reject) => {
        const path = ref.href();
        fs_1.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.resolveFile = resolveFile;
//# sourceMappingURL=file.js.map