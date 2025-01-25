'use strict';

var helpers = require('./helpers.cjs.js');
var techdocs = require('./techdocs.cjs.js');

class Generators {
  generatorMap = /* @__PURE__ */ new Map();
  /**
   * Returns a generators instance containing a generator for TechDocs
   * @param config - A Backstage configuration
   * @param options - Options to configure the TechDocs generator
   */
  static async fromConfig(config, options) {
    const generators = new Generators();
    const techdocsGenerator = options.customGenerator ?? techdocs.TechdocsGenerator.fromConfig(config, options);
    generators.register("techdocs", techdocsGenerator);
    return generators;
  }
  /**
   * Register a generator in the generators collection
   * @param generatorKey - Unique identifier for the generator
   * @param generator - The generator instance to register
   */
  register(generatorKey, generator) {
    this.generatorMap.set(generatorKey, generator);
  }
  /**
   * Returns the generator for a given TechDocs entity
   * @param entity - A TechDocs entity instance
   */
  get(entity) {
    const generatorKey = helpers.getGeneratorKey(entity);
    const generator = this.generatorMap.get(generatorKey);
    if (!generator) {
      throw new Error(`No generator registered for entity: "${generatorKey}"`);
    }
    return generator;
  }
}

exports.Generators = Generators;
//# sourceMappingURL=generators.cjs.js.map
