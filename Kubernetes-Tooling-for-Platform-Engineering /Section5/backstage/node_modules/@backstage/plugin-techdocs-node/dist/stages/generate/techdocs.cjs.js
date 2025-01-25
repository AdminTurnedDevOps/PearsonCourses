'use strict';

var path = require('path');
var integration = require('@backstage/integration');
var helpers = require('./helpers.cjs.js');
var mkdocsPatchers = require('./mkdocsPatchers.cjs.js');
var errors = require('@backstage/errors');
var DockerContainerRunner = require('./DockerContainerRunner.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var path__default = /*#__PURE__*/_interopDefaultCompat(path);

class TechdocsGenerator {
  /**
   * The default docker image (and version) used to generate content. Public
   * and static so that techdocs-node consumers can use the same version.
   */
  static defaultDockerImage = "spotify/techdocs:v1.2.4";
  logger;
  containerRunner;
  options;
  scmIntegrations;
  /**
   * Returns a instance of TechDocs generator
   * @param config - A Backstage configuration
   * @param options - Options to configure the generator
   */
  static fromConfig(config, options) {
    const { containerRunner, logger } = options;
    const scmIntegrations = integration.ScmIntegrations.fromConfig(config);
    return new TechdocsGenerator({
      logger,
      containerRunner,
      config,
      scmIntegrations
    });
  }
  constructor(options) {
    this.logger = options.logger;
    this.options = readGeneratorConfig(options.config, options.logger);
    this.containerRunner = options.containerRunner;
    this.scmIntegrations = options.scmIntegrations;
  }
  /** {@inheritDoc GeneratorBase.run} */
  async run(options) {
    const {
      inputDir,
      outputDir,
      parsedLocationAnnotation,
      etag,
      logger: childLogger,
      logStream,
      siteOptions,
      runAsDefaultUser
    } = options;
    const { path: mkdocsYmlPath, content } = await helpers.getMkdocsYml(
      inputDir,
      siteOptions
    );
    const docsDir = await helpers.validateMkdocsYaml(inputDir, content);
    if (parsedLocationAnnotation) {
      await mkdocsPatchers.patchMkdocsYmlPreBuild(
        mkdocsYmlPath,
        childLogger,
        parsedLocationAnnotation,
        this.scmIntegrations
      );
    }
    if (this.options.legacyCopyReadmeMdToIndexMd) {
      await helpers.patchIndexPreBuild({ inputDir, logger: childLogger, docsDir });
    }
    const defaultPlugins = this.options.defaultPlugins ?? [];
    if (!this.options.omitTechdocsCoreMkdocsPlugin && !defaultPlugins.includes("techdocs-core")) {
      defaultPlugins.push("techdocs-core");
    }
    await mkdocsPatchers.patchMkdocsYmlWithPlugins(mkdocsYmlPath, childLogger, defaultPlugins);
    const mountDirs = {
      [inputDir]: "/input",
      [outputDir]: "/output"
    };
    try {
      switch (this.options.runIn) {
        case "local":
          await helpers.runCommand({
            command: "mkdocs",
            args: ["build", "-d", outputDir, "-v"],
            options: {
              cwd: inputDir
            },
            logStream
          });
          childLogger.info(
            `Successfully generated docs from ${inputDir} into ${outputDir} using local mkdocs`
          );
          break;
        case "docker": {
          const containerRunner = this.containerRunner || new DockerContainerRunner.DockerContainerRunner();
          await containerRunner.runContainer({
            imageName: this.options.dockerImage ?? TechdocsGenerator.defaultDockerImage,
            args: ["build", "-d", "/output"],
            logStream,
            mountDirs,
            workingDir: "/input",
            // Set the home directory inside the container as something that applications can
            // write to, otherwise they will just fail trying to write to /
            envVars: { HOME: "/tmp" },
            pullImage: this.options.pullImage,
            defaultUser: runAsDefaultUser
          });
          childLogger.info(
            `Successfully generated docs from ${inputDir} into ${outputDir} using techdocs-container`
          );
          break;
        }
        default:
          throw new Error(
            `Invalid config value "${this.options.runIn}" provided in 'techdocs.generators.techdocs'.`
          );
      }
    } catch (error) {
      this.logger.debug(
        `Failed to generate docs from ${inputDir} into ${outputDir}`
      );
      throw new errors.ForwardedError(
        `Failed to generate docs from ${inputDir} into ${outputDir}`,
        error
      );
    }
    await helpers.createOrUpdateMetadata(
      path__default.default.join(outputDir, "techdocs_metadata.json"),
      childLogger
    );
    if (etag) {
      await helpers.storeEtagMetadata(
        path__default.default.join(outputDir, "techdocs_metadata.json"),
        etag
      );
    }
  }
}
function readGeneratorConfig(config, logger) {
  const legacyGeneratorType = config.getOptionalString(
    "techdocs.generators.techdocs"
  );
  if (legacyGeneratorType) {
    logger.warn(
      `The 'techdocs.generators.techdocs' configuration key is deprecated and will be removed in the future. Please use 'techdocs.generator' instead. See here https://backstage.io/docs/features/techdocs/configuration`
    );
  }
  return {
    runIn: legacyGeneratorType ?? config.getOptionalString("techdocs.generator.runIn") ?? "docker",
    dockerImage: config.getOptionalString("techdocs.generator.dockerImage"),
    pullImage: config.getOptionalBoolean("techdocs.generator.pullImage"),
    omitTechdocsCoreMkdocsPlugin: config.getOptionalBoolean(
      "techdocs.generator.mkdocs.omitTechdocsCorePlugin"
    ),
    legacyCopyReadmeMdToIndexMd: config.getOptionalBoolean(
      "techdocs.generator.mkdocs.legacyCopyReadmeMdToIndexMd"
    ),
    defaultPlugins: config.getOptionalStringArray(
      "techdocs.generator.mkdocs.defaultPlugins"
    )
  };
}

exports.TechdocsGenerator = TechdocsGenerator;
exports.readGeneratorConfig = readGeneratorConfig;
//# sourceMappingURL=techdocs.cjs.js.map
