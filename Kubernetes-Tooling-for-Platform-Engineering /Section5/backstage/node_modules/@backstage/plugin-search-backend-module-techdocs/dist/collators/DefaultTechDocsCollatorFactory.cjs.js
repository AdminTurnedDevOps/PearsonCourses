'use strict';

var backendCommon = require('@backstage/backend-common');
var catalogClient = require('@backstage/catalog-client');
var catalogModel = require('@backstage/catalog-model');
var alpha = require('@backstage/plugin-catalog-common/alpha');
var pLimit = require('p-limit');
var stream = require('stream');
var defaultTechDocsCollatorEntityTransformer = require('./defaultTechDocsCollatorEntityTransformer.cjs.js');
var defaultTechDocsCollatorDocumentTransformer = require('./defaultTechDocsCollatorDocumentTransformer.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var pLimit__default = /*#__PURE__*/_interopDefaultCompat(pLimit);

class DefaultTechDocsCollatorFactory {
  type = "techdocs";
  visibilityPermission = alpha.catalogEntityReadPermission;
  discovery;
  locationTemplate;
  logger;
  auth;
  catalogClient;
  parallelismLimit;
  legacyPathCasing;
  entityTransformer;
  documentTransformer;
  constructor(options) {
    this.discovery = options.discovery;
    this.locationTemplate = options.locationTemplate || "/docs/:namespace/:kind/:name/:path";
    this.logger = options.logger.child({ documentType: this.type });
    this.catalogClient = options.catalogClient || new catalogClient.CatalogClient({ discoveryApi: options.discovery });
    this.parallelismLimit = options.parallelismLimit ?? 10;
    this.legacyPathCasing = options.legacyPathCasing ?? false;
    this.entityTransformer = options.entityTransformer ?? (() => ({}));
    this.documentTransformer = options.documentTransformer ?? (() => ({}));
    this.auth = backendCommon.createLegacyAuthAdapters({
      auth: options.auth,
      discovery: options.discovery,
      tokenManager: options.tokenManager
    }).auth;
  }
  static fromConfig(config, options) {
    const legacyPathCasing = config.getOptionalBoolean(
      "techdocs.legacyUseCaseSensitiveTripletPaths"
    ) || false;
    const locationTemplate = config.getOptionalString(
      "search.collators.techdocs.locationTemplate"
    );
    const parallelismLimit = config.getOptionalNumber(
      "search.collators.techdocs.parallelismLimit"
    );
    return new DefaultTechDocsCollatorFactory({
      ...options,
      locationTemplate,
      parallelismLimit,
      legacyPathCasing
    });
  }
  async getCollator() {
    return stream.Readable.from(this.execute());
  }
  async *execute() {
    const limit = pLimit__default.default(this.parallelismLimit);
    const techDocsBaseUrl = await this.discovery.getBaseUrl("techdocs");
    let entitiesRetrieved = 0;
    let moreEntitiesToGet = true;
    const batchSize = this.parallelismLimit * 50;
    while (moreEntitiesToGet) {
      const { token: catalogToken } = await this.auth.getPluginRequestToken({
        onBehalfOf: await this.auth.getOwnServiceCredentials(),
        targetPluginId: "catalog"
      });
      const entities = (await this.catalogClient.getEntities(
        {
          filter: {
            "metadata.annotations.backstage.io/techdocs-ref": catalogClient.CATALOG_FILTER_EXISTS
          },
          limit: batchSize,
          offset: entitiesRetrieved
        },
        { token: catalogToken }
      )).items;
      moreEntitiesToGet = entities.length === batchSize;
      entitiesRetrieved += entities.length;
      const docPromises = entities.filter((it) => it.metadata?.annotations?.["backstage.io/techdocs-ref"]).map(
        (entity) => limit(async () => {
          const entityInfo = DefaultTechDocsCollatorFactory.handleEntityInfoCasing(
            this.legacyPathCasing,
            {
              kind: entity.kind,
              namespace: entity.metadata.namespace || "default",
              name: entity.metadata.name
            }
          );
          try {
            const { token: techdocsToken } = await this.auth.getPluginRequestToken({
              onBehalfOf: await this.auth.getOwnServiceCredentials(),
              targetPluginId: "techdocs"
            });
            const searchIndexResponse = await fetch(
              DefaultTechDocsCollatorFactory.constructDocsIndexUrl(
                techDocsBaseUrl,
                entityInfo
              ),
              {
                headers: {
                  Authorization: `Bearer ${techdocsToken}`
                }
              }
            );
            const searchIndex = await Promise.race([
              searchIndexResponse.json(),
              new Promise((_resolve, reject) => {
                setTimeout(() => {
                  reject("Could not parse JSON in 5 seconds.");
                }, 5e3);
              })
            ]);
            return searchIndex.docs.map((doc) => ({
              ...defaultTechDocsCollatorEntityTransformer.defaultTechDocsCollatorEntityTransformer(entity),
              ...defaultTechDocsCollatorDocumentTransformer.defaultTechDocsCollatorDocumentTransformer(doc),
              ...this.entityTransformer(entity),
              ...this.documentTransformer(doc),
              location: this.applyArgsToFormat(
                this.locationTemplate || "/docs/:namespace/:kind/:name/:path",
                {
                  ...entityInfo,
                  path: doc.location
                }
              ),
              ...entityInfo,
              entityTitle: entity.metadata.title,
              componentType: entity.spec?.type?.toString() || "other",
              lifecycle: entity.spec?.lifecycle || "",
              owner: getSimpleEntityOwnerString(entity),
              authorization: {
                resourceRef: catalogModel.stringifyEntityRef(entity)
              }
            }));
          } catch (e) {
            this.logger.debug(
              `Failed to retrieve tech docs search index for entity ${entityInfo.namespace}/${entityInfo.kind}/${entityInfo.name}`,
              e
            );
            return [];
          }
        })
      );
      yield* (await Promise.all(docPromises)).flat();
    }
  }
  applyArgsToFormat(format, args) {
    let formatted = format;
    for (const [key, value] of Object.entries(args)) {
      formatted = formatted.replace(`:${key}`, value);
    }
    return formatted;
  }
  static constructDocsIndexUrl(techDocsBaseUrl, entityInfo) {
    return `${techDocsBaseUrl}/static/docs/${entityInfo.namespace}/${entityInfo.kind}/${entityInfo.name}/search/search_index.json`;
  }
  static handleEntityInfoCasing(legacyPaths, entityInfo) {
    return legacyPaths ? entityInfo : Object.entries(entityInfo).reduce((acc, [key, value]) => {
      return { ...acc, [key]: value.toLocaleLowerCase("en-US") };
    }, {});
  }
}
function getSimpleEntityOwnerString(entity) {
  if (entity.relations) {
    const owner = entity.relations.find((r) => r.type === catalogModel.RELATION_OWNED_BY);
    if (owner) {
      const { name } = catalogModel.parseEntityRef(owner.targetRef);
      return name;
    }
  }
  return "";
}

exports.DefaultTechDocsCollatorFactory = DefaultTechDocsCollatorFactory;
//# sourceMappingURL=DefaultTechDocsCollatorFactory.cjs.js.map
