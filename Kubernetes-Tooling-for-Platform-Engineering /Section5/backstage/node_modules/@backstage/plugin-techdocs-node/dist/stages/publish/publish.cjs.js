'use strict';

var awsS3 = require('./awsS3.cjs.js');
var azureBlobStorage = require('./azureBlobStorage.cjs.js');
var googleStorage = require('./googleStorage.cjs.js');
var local = require('./local.cjs.js');
var openStackSwift = require('./openStackSwift.cjs.js');

class Publisher {
  publishers = /* @__PURE__ */ new Map();
  register(type, publisher) {
    this.publishers.set(type, publisher);
  }
  get(config) {
    const publisherType = config.getOptionalString(
      "techdocs.publisher.type"
    ) ?? "local";
    if (!publisherType) {
      throw new Error("TechDocs publisher type not specified for the entity");
    }
    const publisher = this.publishers.get(publisherType);
    if (!publisher) {
      throw new Error(
        `TechDocs publisher '${publisherType}' is not registered`
      );
    }
    return publisher;
  }
  /**
   * Returns a instance of TechDocs publisher
   * @param config - A Backstage configuration
   * @param options - Options for configuring the publisher factory
   */
  static async fromConfig(config, options) {
    const { logger, discovery, customPublisher } = options;
    const publishers = new Publisher();
    if (customPublisher) {
      publishers.register("techdocs", customPublisher);
      return customPublisher;
    }
    const publisherType = config.getOptionalString(
      "techdocs.publisher.type"
    ) ?? "local";
    switch (publisherType) {
      case "googleGcs":
        logger.info("Creating Google Storage Bucket publisher for TechDocs");
        publishers.register(
          publisherType,
          googleStorage.GoogleGCSPublish.fromConfig(
            config,
            logger,
            options.publisherSettings?.googleGcs
          )
        );
        break;
      case "awsS3":
        logger.info("Creating AWS S3 Bucket publisher for TechDocs");
        publishers.register(
          publisherType,
          await awsS3.AwsS3Publish.fromConfig(config, logger)
        );
        break;
      case "azureBlobStorage":
        logger.info(
          "Creating Azure Blob Storage Container publisher for TechDocs"
        );
        publishers.register(
          publisherType,
          azureBlobStorage.AzureBlobStoragePublish.fromConfig(config, logger)
        );
        break;
      case "openStackSwift":
        logger.info(
          "Creating OpenStack Swift Container publisher for TechDocs"
        );
        publishers.register(
          publisherType,
          openStackSwift.OpenStackSwiftPublish.fromConfig(config, logger)
        );
        break;
      case "local":
        logger.info("Creating Local publisher for TechDocs");
        publishers.register(
          publisherType,
          local.LocalPublish.fromConfig(config, logger, discovery)
        );
        break;
      default:
        logger.info("Creating Local publisher for TechDocs");
        publishers.register(
          publisherType,
          local.LocalPublish.fromConfig(config, logger, discovery)
        );
    }
    return publishers.get(config);
  }
}

exports.Publisher = Publisher;
//# sourceMappingURL=publish.cjs.js.map
