'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var catalogModel = require('@backstage/catalog-model');
var errors = require('@backstage/errors');
var pluginTechdocsCommon = require('@backstage/plugin-techdocs-common');
var path = require('path');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var path__default = /*#__PURE__*/_interopDefaultCompat(path);

const parseReferenceAnnotation = (annotationName, entity) => {
  const annotation = entity.metadata.annotations?.[annotationName];
  if (!annotation) {
    throw new errors.InputError(
      `No location annotation provided in entity: ${entity.metadata.name}`
    );
  }
  const { type, target } = catalogModel.parseLocationRef(annotation);
  return {
    type,
    target
  };
};
const transformDirLocation = (entity, dirAnnotation, scmIntegrations) => {
  const location = catalogModel.getEntitySourceLocation(entity);
  switch (location.type) {
    case "url": {
      const target = scmIntegrations.resolveUrl({
        url: dirAnnotation.target,
        base: location.target
      });
      return {
        type: "url",
        target
      };
    }
    case "file": {
      const target = backendPluginApi.resolveSafeChildPath(
        path__default.default.dirname(location.target),
        dirAnnotation.target
      );
      return {
        type: "dir",
        target
      };
    }
    default:
      throw new errors.InputError(`Unable to resolve location type ${location.type}`);
  }
};
const getLocationForEntity = (entity, scmIntegration) => {
  const annotation = parseReferenceAnnotation(pluginTechdocsCommon.TECHDOCS_ANNOTATION, entity);
  switch (annotation.type) {
    case "url":
      return annotation;
    case "dir":
      return transformDirLocation(entity, annotation, scmIntegration);
    default:
      throw new Error(`Invalid reference annotation ${annotation.type}`);
  }
};
const getDocFilesFromRepository = async (reader, entity, opts) => {
  const { target } = parseReferenceAnnotation(pluginTechdocsCommon.TECHDOCS_ANNOTATION, entity);
  opts?.logger?.debug(`Reading files from ${target}`);
  const readTreeResponse = await reader.readTree(target, { etag: opts?.etag });
  const preparedDir = await readTreeResponse.dir();
  opts?.logger?.debug(`Tree downloaded and stored at ${preparedDir}`);
  return {
    preparedDir,
    etag: readTreeResponse.etag
  };
};

exports.getDocFilesFromRepository = getDocFilesFromRepository;
exports.getLocationForEntity = getLocationForEntity;
exports.parseReferenceAnnotation = parseReferenceAnnotation;
exports.transformDirLocation = transformDirLocation;
//# sourceMappingURL=helpers.cjs.js.map
