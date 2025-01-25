"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixRequestBody = fixRequestBody;
const querystring = require("querystring");
/**
 * Fix proxied body if bodyParser is involved.
 */
function fixRequestBody(proxyReq, req) {
    const requestBody = req.body;
    if (!requestBody) {
        return;
    }
    const contentType = proxyReq.getHeader('Content-Type');
    const writeBody = (bodyData) => {
        // deepcode ignore ContentLengthInCode: bodyParser fix
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    };
    if (contentType && (contentType.includes('application/json') || contentType.includes('+json'))) {
        writeBody(JSON.stringify(requestBody));
    }
    if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
        writeBody(querystring.stringify(requestBody));
    }
}
