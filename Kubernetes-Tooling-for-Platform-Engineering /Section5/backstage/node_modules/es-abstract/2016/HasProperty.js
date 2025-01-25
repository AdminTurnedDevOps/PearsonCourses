'use strict';

var $TypeError = require('es-errors/type');

var IsPropertyKey = require('./IsPropertyKey');

var isObject = require('../helpers/isObject');

// https://262.ecma-international.org/6.0/#sec-hasproperty

module.exports = function HasProperty(O, P) {
	if (!isObject(O)) {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};
