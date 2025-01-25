'use strict';
var uid = require('./index');
var assert = require('assert');

var freqs = {};
var ITERATIONS = 1000000;
var LENGTH = 64;
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
var i;

for (i = 0; i < chars.length; i++) {
  freqs[chars[i]] = 0;
}

console.log("Running", ITERATIONS, "iterations...");
console.time("Duration");

while(ITERATIONS--) {
  var str = uid(LENGTH);
  for (var i = 0; i < str.length; i++) {
    freqs[str[i]]++;
  }
}

console.log("Done. Distribution:");
console.log(JSON.stringify(freqs, undefined, 2));
console.timeEnd("Duration");

var vals = Object.keys(freqs).map(function(key) {
  return freqs[key];
});
var min = Math.min.apply(null, vals);
var max = Math.max.apply(null, vals);

console.log("Min freq:", min, "Max freq:", max);
var diffPcnt = Math.abs(min / max - 1) * 100;
console.log("Min and max frequencies are " + diffPcnt + "% apart.");
assert(diffPcnt < 1);
