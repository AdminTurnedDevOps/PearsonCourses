'use strict';

var extend = require('extend');

var data = {
  permanent: require('./lib/iana-permanent.json'),
  provosional: require('./lib/iana-provisional.json'),
  historical: require('./lib/iana-historical.json')
};

var allByName = {};

Object.keys(data).forEach(function (type) {
  data[type].forEach(function (schemeObj) {
    allByName[schemeObj.scheme] = extend(schemeObj, { type: type });
  });
});

data.unofficial = require('./lib/unofficial.json').filter(function (item) {
  return !allByName[item.scheme];
});

data.unofficial.forEach(function (schemeObj) {
  allByName[schemeObj.scheme] = extend(schemeObj, { type: 'unofficial' });
});


module.exports = extend(data, { allByName: allByName });
