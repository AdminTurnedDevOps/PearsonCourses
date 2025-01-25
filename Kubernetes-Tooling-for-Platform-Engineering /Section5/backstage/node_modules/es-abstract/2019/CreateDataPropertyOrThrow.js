'use strict';

var $TypeError = require('es-errors/type');

var CreateDataProperty = require('./CreateDataProperty');
var IsPropertyKey = require('./IsPropertyKey');

var isObject = require('../helpers/isObject');

// // https://262.ecma-international.org/6.0/#sec-createdatapropertyorthrow

module.exports = function CreateDataPropertyOrThrow(O, P, V) {
	if (!isObject(O)) {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty(O, P, V);
	if (!success) {
		throw new $TypeError('unable to create data property');
	}
	return success;
};
