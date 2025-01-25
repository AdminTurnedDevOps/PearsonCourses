'use strict';

var errors = require('@backstage/errors');
var stream = require('stream');
var helpers = require('../helpers.cjs.js');

class MigrateWriteStream extends stream.Writable {
  logger;
  removeOriginal;
  maxConcurrency;
  inFlight = 0;
  constructor(logger, removeOriginal, concurrency) {
    super({ objectMode: true });
    this.logger = logger;
    this.removeOriginal = removeOriginal;
    this.maxConcurrency = concurrency;
  }
  _write(file, _encoding, next) {
    let shouldCallNext = true;
    let newFile;
    try {
      newFile = helpers.lowerCaseEntityTripletInStoragePath(file.name);
    } catch (e) {
      errors.assertError(e);
      this.logger.warn(e.message);
      next();
      return;
    }
    if (newFile === file.name) {
      next();
      return;
    }
    this.inFlight++;
    if (this.inFlight < this.maxConcurrency) {
      next();
      shouldCallNext = false;
    }
    const migrate = this.removeOriginal ? file.move.bind(file) : file.copy.bind(file);
    this.logger.debug(`Migrating ${file.name}`);
    migrate(newFile).catch(
      (e) => this.logger.warn(`Unable to migrate ${file.name}: ${e.message}`)
    ).finally(() => {
      this.inFlight--;
      if (shouldCallNext) {
        next();
      }
    });
  }
}

exports.MigrateWriteStream = MigrateWriteStream;
//# sourceMappingURL=GoogleMigration.cjs.js.map
