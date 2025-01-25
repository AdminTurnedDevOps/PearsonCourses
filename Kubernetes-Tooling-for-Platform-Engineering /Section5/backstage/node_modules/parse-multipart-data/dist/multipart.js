"use strict";
/**
 * Multipart Parser (Finite State Machine)
 * usage:
 * const multipart = require('./multipart.js');
 * const body = multipart.DemoData(); 							   // raw body
 * const body = Buffer.from(event['body-json'].toString(),'base64'); // AWS case
 * const boundary = multipart.getBoundary(event.params.header['content-type']);
 * const parts = multipart.Parse(body,boundary);
 * each part is:
 * { filename: 'A.txt', type: 'text/plain', data: <Buffer 41 41 41 41 42 42 42 42> }
 *  or { name: 'key', data: <Buffer 41 41 41 41 42 42 42 42> }
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoData = exports.getBoundary = exports.parse = void 0;
var ParsingState;
(function (ParsingState) {
    ParsingState[ParsingState["INIT"] = 0] = "INIT";
    ParsingState[ParsingState["READING_HEADERS"] = 1] = "READING_HEADERS";
    ParsingState[ParsingState["READING_DATA"] = 2] = "READING_DATA";
    ParsingState[ParsingState["READING_PART_SEPARATOR"] = 3] = "READING_PART_SEPARATOR";
})(ParsingState || (ParsingState = {}));
function parse(multipartBodyBuffer, boundary) {
    var lastline = '';
    var contentDispositionHeader = '';
    var contentTypeHeader = '';
    var state = ParsingState.INIT;
    var buffer = [];
    var allParts = [];
    var currentPartHeaders = [];
    for (var i = 0; i < multipartBodyBuffer.length; i++) {
        var oneByte = multipartBodyBuffer[i];
        var prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
        // 0x0a => \n
        // 0x0d => \r
        var newLineDetected = oneByte === 0x0a && prevByte === 0x0d;
        var newLineChar = oneByte === 0x0a || oneByte === 0x0d;
        if (!newLineChar)
            lastline += String.fromCharCode(oneByte);
        if (ParsingState.INIT === state && newLineDetected) {
            // searching for boundary
            if ('--' + boundary === lastline) {
                state = ParsingState.READING_HEADERS; // found boundary. start reading headers
            }
            lastline = '';
        }
        else if (ParsingState.READING_HEADERS === state && newLineDetected) {
            // parsing headers. Headers are separated by an empty line from the content. Stop reading headers when the line is empty
            if (lastline.length) {
                currentPartHeaders.push(lastline);
            }
            else {
                // found empty line. search for the headers we want and set the values
                for (var _i = 0, currentPartHeaders_1 = currentPartHeaders; _i < currentPartHeaders_1.length; _i++) {
                    var h = currentPartHeaders_1[_i];
                    if (h.toLowerCase().startsWith('content-disposition:')) {
                        contentDispositionHeader = h;
                    }
                    else if (h.toLowerCase().startsWith('content-type:')) {
                        contentTypeHeader = h;
                    }
                }
                state = ParsingState.READING_DATA;
                buffer = [];
            }
            lastline = '';
        }
        else if (ParsingState.READING_DATA === state) {
            // parsing data
            if (lastline.length > boundary.length + 4) {
                lastline = ''; // mem save
            }
            if ('--' + boundary === lastline) {
                var j = buffer.length - lastline.length;
                var part = buffer.slice(0, j - 1);
                allParts.push(process({ contentDispositionHeader: contentDispositionHeader, contentTypeHeader: contentTypeHeader, part: part }));
                buffer = [];
                currentPartHeaders = [];
                lastline = '';
                state = ParsingState.READING_PART_SEPARATOR;
                contentDispositionHeader = '';
                contentTypeHeader = '';
            }
            else {
                buffer.push(oneByte);
            }
            if (newLineDetected) {
                lastline = '';
            }
        }
        else if (ParsingState.READING_PART_SEPARATOR === state) {
            if (newLineDetected) {
                state = ParsingState.READING_HEADERS;
            }
        }
    }
    return allParts;
}
exports.parse = parse;
//  read the boundary from the content-type header sent by the http client
//  this value may be similar to:
//  'multipart/form-data; boundary=----WebKitFormBoundaryvm5A9tzU1ONaGP5B',
function getBoundary(header) {
    var items = header.split(';');
    if (items) {
        for (var i = 0; i < items.length; i++) {
            var item = new String(items[i]).trim();
            if (item.indexOf('boundary') >= 0) {
                var k = item.split('=');
                return new String(k[1]).trim().replace(/^["']|["']$/g, '');
            }
        }
    }
    return '';
}
exports.getBoundary = getBoundary;
function DemoData() {
    var body = 'trash1\r\n';
    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n';
    body += 'Content-Type: text/plain\r\n';
    body +=
        'Content-Disposition: form-data; name="uploads[]"; filename="A.txt"\r\n';
    body += '\r\n';
    body += '@11X';
    body += '111Y\r\n';
    body += '111Z\rCCCC\nCCCC\r\nCCCCC@\r\n\r\n';
    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n';
    body += 'Content-Type: text/plain\r\n';
    body +=
        'Content-Disposition: form-data; name="uploads[]"; filename="B.txt"\r\n';
    body += '\r\n';
    body += '@22X';
    body += '222Y\r\n';
    body += '222Z\r222W\n2220\r\n666@\r\n';
    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n';
    body += 'Content-Disposition: form-data; name="input1"\r\n';
    body += '\r\n';
    body += 'value1\r\n';
    body += '------WebKitFormBoundaryvef1fLxmoUdYZWXp--\r\n';
    return {
        body: Buffer.from(body),
        boundary: '----WebKitFormBoundaryvef1fLxmoUdYZWXp'
    };
}
exports.DemoData = DemoData;
function process(part) {
    // will transform this object:
    // { header: 'Content-Disposition: form-data; name="uploads[]"; filename="A.txt"',
    // info: 'Content-Type: text/plain',
    // part: 'AAAABBBB' }
    // into this one:
    // { filename: 'A.txt', type: 'text/plain', data: <Buffer 41 41 41 41 42 42 42 42> }
    var obj = function (str) {
        var k = str.split('=');
        var a = k[0].trim();
        var b = JSON.parse(k[1].trim());
        var o = {};
        Object.defineProperty(o, a, {
            value: b,
            writable: true,
            enumerable: true,
            configurable: true
        });
        return o;
    };
    var header = part.contentDispositionHeader.split(';');
    var filenameData = header[2];
    var input = {};
    if (filenameData) {
        input = obj(filenameData);
        var contentType = part.contentTypeHeader.split(':')[1].trim();
        Object.defineProperty(input, 'type', {
            value: contentType,
            writable: true,
            enumerable: true,
            configurable: true
        });
    }
    // always process the name field
    Object.defineProperty(input, 'name', {
        value: header[1].split('=')[1].replace(/"/g, ''),
        writable: true,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(input, 'data', {
        value: Buffer.from(part.part),
        writable: true,
        enumerable: true,
        configurable: true
    });
    return input;
}
//# sourceMappingURL=multipart.js.map