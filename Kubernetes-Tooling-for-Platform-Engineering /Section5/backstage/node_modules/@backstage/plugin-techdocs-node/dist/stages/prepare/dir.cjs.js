'use strict';

var errors = require('@backstage/errors');
var integration = require('@backstage/integration');
var pluginTechdocsCommon = require('@backstage/plugin-techdocs-common');
var helpers = require('../../helpers.cjs.js');

class DirectoryPreparer {
  scmIntegrations;
  reader;
  /**
   * Returns a directory preparer instance
   * @param config - A backstage config
   * @param options - A directory preparer options containing a logger and reader
   */
  static fromConfig(config, options) {
    return new DirectoryPreparer(config, options.logger, options.reader);
  }
  constructor(config, _logger, reader) {
    this.reader = reader;
    this.scmIntegrations = integration.ScmIntegrations.fromConfig(config);
  }
  /** {@inheritDoc PreparerBase.shouldCleanPreparedDirectory} */
  shouldCleanPreparedDirectory() {
    return false;
  }
  /** {@inheritDoc PreparerBase.prepare} */
  async prepare(entity, options) {
    const annotation = helpers.parseReferenceAnnotation(pluginTechdocsCommon.TECHDOCS_ANNOTATION, entity);
    const { type, target } = helpers.transformDirLocation(
      entity,
      annotation,
      this.scmIntegrations
    );
    switch (type) {
      case "url": {
        options?.logger?.debug(`Reading files from ${target}`);
        const response = await this.reader.readTree(target, {
          etag: options?.etag
        });
        const preparedDir = await response.dir();
        options?.logger?.debug(`Tree downloaded and stored at ${preparedDir}`);
        return {
          preparedDir,
          etag: response.etag
        };
      }
      case "dir": {
        return {
          // the transformation already validated that the target is in a safe location
          preparedDir: target,
          // Instead of supporting caching on local sources, use techdocs-cli for local development and debugging.
          etag: ""
        };
      }
      default:
        throw new errors.InputError(`Unable to resolve location type ${type}`);
    }
  }
}

exports.DirectoryPreparer = DirectoryPreparer;
//# sourceMappingURL=dir.cjs.js.map
