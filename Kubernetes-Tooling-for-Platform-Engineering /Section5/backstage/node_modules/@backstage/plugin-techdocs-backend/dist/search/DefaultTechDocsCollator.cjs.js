'use strict';

var catalogModel = require('@backstage/catalog-model');
var unescape = require('lodash/unescape');
var pLimit = require('p-limit');
var alpha = require('@backstage/plugin-catalog-common/alpha');
var catalogClient = require('@backstage/catalog-client');
var pluginTechdocsCommon = require('@backstage/plugin-techdocs-common');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var unescape__default = /*#__PURE__*/_interopDefaultCompat(unescape);
var pLimit__default = /*#__PURE__*/_interopDefaultCompat(pLimit);

class DefaultTechDocsCollator {
  constructor(legacyPathCasing, options) {
    this.legacyPathCasing = legacyPathCasing;
    this.options = options;
  }
  type = "techdocs";
  visibilityPermission = alpha.catalogEntityReadPermission;
  static fromConfig(config, options) {
    const legacyPathCasing = config.getOptionalBoolean(
      "techdocs.legacyUseCaseSensitiveTripletPaths"
    ) || false;
    return new DefaultTechDocsCollator(legacyPathCasing, options);
  }
  async execute() {
    const {
      parallelismLimit,
      discovery,
      tokenManager,
      catalogClient: catalogClient$1,
      locationTemplate,
      logger
    } = this.options;
    const limit = pLimit__default.default(parallelismLimit ?? 10);
    const techDocsBaseUrl = await discovery.getBaseUrl("techdocs");
    const { token } = await tokenManager.getToken();
    const entities = await (catalogClient$1 ?? new catalogClient.CatalogClient({ discoveryApi: discovery })).getEntities(
      {
        filter: {
          [`metadata.annotations.${pluginTechdocsCommon.TECHDOCS_ANNOTATION}`]: catalogClient.CATALOG_FILTER_EXISTS
        },
        fields: [
          "kind",
          "namespace",
          "metadata.annotations",
          "metadata.name",
          "metadata.title",
          "metadata.namespace",
          "spec.type",
          "spec.lifecycle",
          "relations"
        ]
      },
      { token }
    );
    const docPromises = entities.items.map(
      (entity) => limit(async () => {
        const entityInfo = DefaultTechDocsCollator.handleEntityInfoCasing(
          this.legacyPathCasing ?? false,
          {
            kind: entity.kind,
            namespace: entity.metadata.namespace || "default",
            name: entity.metadata.name
          }
        );
        try {
          const { token: newToken } = await tokenManager.getToken();
          const searchIndexResponse = await fetch(
            DefaultTechDocsCollator.constructDocsIndexUrl(
              techDocsBaseUrl,
              entityInfo
            ),
            {
              headers: {
                Authorization: `Bearer ${newToken}`
              }
            }
          );
          const searchIndex = await searchIndexResponse.json();
          return searchIndex.docs.map((doc) => ({
            title: unescape__default.default(doc.title),
            text: unescape__default.default(doc.text || ""),
            location: this.applyArgsToFormat(
              locationTemplate || "/docs/:namespace/:kind/:name/:path",
              {
                ...entityInfo,
                path: doc.location
              }
            ),
            path: doc.location,
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
          logger.debug(
            `Failed to retrieve tech docs search index for entity ${entityInfo.namespace}/${entityInfo.kind}/${entityInfo.name}`,
            e
          );
          return [];
        }
      })
    );
    return (await Promise.all(docPromises)).flat();
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

exports.DefaultTechDocsCollator = DefaultTechDocsCollator;
//# sourceMappingURL=DefaultTechDocsCollator.cjs.js.map
