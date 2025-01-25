'use strict';

var errors = require('@backstage/errors');
var helpers = require('../../helpers.cjs.js');

class UrlPreparer {
  logger;
  reader;
  /**
   * Returns a directory preparer instance
   * @param config - A URL preparer config containing the a logger and reader
   */
  static fromConfig(options) {
    return new UrlPreparer(options.reader, options.logger);
  }
  constructor(reader, logger) {
    this.logger = logger;
    this.reader = reader;
  }
  /** {@inheritDoc PreparerBase.shouldCleanPreparedDirectory} */
  shouldCleanPreparedDirectory() {
    return true;
  }
  /** {@inheritDoc PreparerBase.prepare} */
  async prepare(entity, options) {
    try {
      return await helpers.getDocFilesFromRepository(this.reader, entity, {
        etag: options?.etag,
        logger: this.logger
      });
    } catch (error) {
      errors.assertError(error);
      if (error.name === "NotModifiedError") {
        this.logger.debug(`Cache is valid for etag ${options?.etag}`);
      } else {
        this.logger.debug(
          `Unable to fetch files for building docs ${error.message}`
        );
      }
      throw error;
    }
  }
}

exports.UrlPreparer = UrlPreparer;
//# sourceMappingURL=url.cjs.js.map
