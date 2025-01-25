'use strict';

var catalogModel = require('@backstage/catalog-model');
var crypto = require('crypto');

function locationSpecToMetadataName(location) {
  const hash = crypto.createHash("sha1").update(`${location.type}:${location.target}`).digest("hex");
  return `generated-${hash}`;
}
function locationSpecToLocationEntity(opts) {
  const location = opts.location;
  const parentEntity = opts.parentEntity;
  let ownLocation;
  let originLocation;
  if (parentEntity) {
    const maybeOwnLocation = parentEntity.metadata.annotations?.[catalogModel.ANNOTATION_LOCATION];
    if (!maybeOwnLocation) {
      throw new Error(
        `Parent entity '${catalogModel.stringifyEntityRef(
          parentEntity
        )}' of location '${catalogModel.stringifyLocationRef(
          location
        )}' does not have a location annotation`
      );
    }
    ownLocation = maybeOwnLocation;
    const maybeOriginLocation = parentEntity.metadata.annotations?.[catalogModel.ANNOTATION_ORIGIN_LOCATION];
    if (!maybeOriginLocation) {
      throw new Error(
        `Parent entity '${catalogModel.stringifyEntityRef(
          parentEntity
        )}' of location '${catalogModel.stringifyLocationRef(
          location
        )}' does not have an origin location annotation`
      );
    }
    originLocation = maybeOriginLocation;
  } else {
    ownLocation = catalogModel.stringifyLocationRef(location);
    originLocation = ownLocation;
  }
  const result = {
    apiVersion: "backstage.io/v1alpha1",
    kind: "Location",
    metadata: {
      name: locationSpecToMetadataName(location),
      annotations: {
        [catalogModel.ANNOTATION_LOCATION]: ownLocation,
        [catalogModel.ANNOTATION_ORIGIN_LOCATION]: originLocation
      }
    },
    spec: {
      type: location.type,
      target: location.target,
      presence: location.presence
    }
  };
  return result;
}

exports.locationSpecToLocationEntity = locationSpecToLocationEntity;
exports.locationSpecToMetadataName = locationSpecToMetadataName;
//# sourceMappingURL=conversion.cjs.js.map
