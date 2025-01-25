'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const resolve = require('resolve-dir');

function find(filename, cwd, limit = Infinity, callback) {
  if (typeof cwd === 'function') {
    callback = cwd;
    cwd = null;
  }

  if (typeof limit === 'function') {
    callback = limit;
    limit = Infinity;
  }

  if (typeof callback !== 'function') {
    return find.promise(filename, cwd, limit);
  }

  const dirname = path.resolve(cwd ? resolve(cwd) : '.');
  let depth = 0;
  let prev;

  function recurse(dirname, next) {
    const filepath = path.join(dirname, filename);

    fs.stat(filepath, function(err, stat) {
      if (err && err.code !== 'ENOENT') {
        next(err);
        return;
      }

      if (stat) {
        next(null, filepath);
        return;
      }

      if (prev !== dirname && depth < limit) {
        prev = dirname;
        depth++;
        recurse(path.dirname(dirname), next);
        return;
      }

      next();
    });
  }

  recurse(dirname, callback);
}

find.promise = function(filename, cwd, limit) {
  return util.promisify(find)(filename, cwd, limit);
};

find.sync = function(filename, cwd, limit = Infinity) {
  let dirname = path.resolve(cwd ? resolve(cwd) : '.');
  let depth = 0;
  let prev;

  do {
    const filepath = path.join(dirname, filename);

    if (fs.existsSync(filepath)) {
      return filepath;
    }

    depth++;
    prev = dirname;
    dirname = path.dirname(dirname);
  } while (prev !== dirname && depth <= limit);
};

module.exports = find;
