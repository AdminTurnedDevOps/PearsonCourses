'use strict';

var _uid = require('.');

/**
 * Generate an Unique Id, asynchronously, returning a Promise
 *
 * @param {Number} length  The number of chars of the uid
 * @returns {Promise<Number>} A promise tha resolves to the generated uid
 * @api public
 */

module.exports = function uid(length) {
  return new Promise(function (resolve, reject) {
    _uid(length, function (err, id) {
      if (err) return reject(err);
      resolve(id);
    });
  });
};