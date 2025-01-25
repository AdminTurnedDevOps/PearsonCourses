'use strict';

var pluginTechdocsCommon = require('@backstage/plugin-techdocs-common');
var helpers = require('../../helpers.cjs.js');
var dir = require('./dir.cjs.js');
var url = require('./url.cjs.js');

class Preparers {
  preparerMap = /* @__PURE__ */ new Map();
  /**
   * Returns a generators instance containing a generator for TechDocs
   * @public
   * @param backstageConfig - A Backstage configuration
   * @param preparerConfig - Options to configure preparers
   */
  static async fromConfig(backstageConfig, options) {
    const preparers = new Preparers();
    const urlPreparer = url.UrlPreparer.fromConfig({
      reader: options.reader,
      logger: options.logger
    });
    preparers.register("url", urlPreparer);
    const directoryPreparer = dir.DirectoryPreparer.fromConfig(backstageConfig, {
      reader: options.reader,
      logger: options.logger
    });
    preparers.register("dir", directoryPreparer);
    return preparers;
  }
  /**
   * Register a preparer in the preparers collection
   * @param protocol - url or dir to associate with preparer
   * @param preparer - The preparer instance to set
   */
  register(protocol, preparer) {
    this.preparerMap.set(protocol, preparer);
  }
  /**
   * Returns the preparer for a given TechDocs entity
   * @param entity - A TechDocs entity instance
   * @returns
   */
  get(entity) {
    const { type } = helpers.parseReferenceAnnotation(pluginTechdocsCommon.TECHDOCS_ANNOTATION, entity);
    const preparer = this.preparerMap.get(type);
    if (!preparer) {
      throw new Error(`No preparer registered for type: "${type}"`);
    }
    return preparer;
  }
}

exports.Preparers = Preparers;
//# sourceMappingURL=preparers.cjs.js.map
