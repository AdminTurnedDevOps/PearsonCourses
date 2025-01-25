'use strict';

const find = require('find-file-up');

module.exports = find.bind(null, 'package.json');
module.exports.sync = find.sync.bind(null, 'package.json');
