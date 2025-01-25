'use strict';
/**
 * Module dependencies
 */

var crypto = require('crypto');

/**
 * 64 characters in the ascii range that can be used in URLs without special
 * encoding.
 */
var UIDCHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * Make a Buffer into a string ready for use in URLs
 *
 * @param {String} bytes a Buffer containing the bytes to convert
 * @returns {String} UID
 * @api private
 */
function tostr(bytes) {
  var r = '', i;

  for (i = 0; i < bytes.length; i++) {
    r += UIDCHARS[bytes[i] % 64];
  }

  return r;
}

/**
 * Generate an Unique Id
 *
 * @param {Number} length  The number of chars of the uid
 * @param {Number} [cb]  Callback for async uid generation
 * @api public
 */

function uid(length, cb) {
  if (typeof cb === 'undefined') {
    return tostr(crypto.randomBytes(length));
  } else {
    crypto.randomBytes(length, function (err, bytes) {
      if (err) return cb(err);
      cb(null, tostr(bytes));
    });
  }
}

/**
 * Exports
 */

module.exports = uid;
