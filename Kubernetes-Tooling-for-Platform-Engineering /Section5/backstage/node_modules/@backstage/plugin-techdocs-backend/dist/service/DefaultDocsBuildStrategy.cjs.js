'use strict';

class DefaultDocsBuildStrategy {
  config;
  constructor(config) {
    this.config = config;
  }
  static fromConfig(config) {
    return new DefaultDocsBuildStrategy(config);
  }
  async shouldBuild(_) {
    return [void 0, "local"].includes(
      this.config.getOptionalString("techdocs.builder")
    );
  }
}

exports.DefaultDocsBuildStrategy = DefaultDocsBuildStrategy;
//# sourceMappingURL=DefaultDocsBuildStrategy.cjs.js.map
