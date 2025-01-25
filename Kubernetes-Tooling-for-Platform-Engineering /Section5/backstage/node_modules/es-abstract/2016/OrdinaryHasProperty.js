'use strict';

var $TypeError = require('es-errors/type');

var IsPropertyKey = require('./IsPropertyKey');

var isObject = require('../helpers/isObject');

// https://262.ecma-international.org/6.0/#sec-ordinaryhasproperty

module.exports = function OrdinaryHasProperty(O, P) {
	if (!isObject(O)) {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	return P in O;
};
