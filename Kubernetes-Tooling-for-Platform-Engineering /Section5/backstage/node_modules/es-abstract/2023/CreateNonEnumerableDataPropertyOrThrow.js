'use strict';

var $TypeError = require('es-errors/type');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsPropertyKey = require('./IsPropertyKey');

var isObject = require('../helpers/isObject');

// https://262.ecma-international.org/13.0/#sec-createnonenumerabledatapropertyorthrow

module.exports = function CreateNonEnumerableDataPropertyOrThrow(O, P, V) {
	if (!isObject(O)) {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefinePropertyOrThrow(O, P, newDesc);
};
