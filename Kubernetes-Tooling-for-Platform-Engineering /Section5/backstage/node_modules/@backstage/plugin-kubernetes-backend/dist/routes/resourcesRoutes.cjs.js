'use strict';

var catalogModel = require('@backstage/catalog-model');
var errors = require('@backstage/errors');

const addResourceRoutesToRouter = (router, catalogApi, objectsProvider, auth, httpAuth) => {
  const getEntityByReq = async (req) => {
    const rawEntityRef = req.body.entityRef;
    if (rawEntityRef && typeof rawEntityRef !== "string") {
      throw new errors.InputError(`entity query must be a string`);
    } else if (!rawEntityRef) {
      throw new errors.InputError("entity is a required field");
    }
    let entityRef = void 0;
    try {
      entityRef = catalogModel.parseEntityRef(rawEntityRef);
    } catch (error) {
      throw new errors.InputError(`Invalid entity ref, ${error}`);
    }
    const { token } = await auth.getPluginRequestToken({
      onBehalfOf: await httpAuth.credentials(req),
      targetPluginId: "catalog"
    });
    const entity = await catalogApi.getEntityByRef(entityRef, { token });
    if (!entity) {
      throw new errors.InputError(
        `Entity ref missing, ${catalogModel.stringifyEntityRef(entityRef)}`
      );
    }
    return entity;
  };
  router.post("/resources/workloads/query", async (req, res) => {
    const entity = await getEntityByReq(req);
    const response = await objectsProvider.getKubernetesObjectsByEntity(
      {
        entity,
        auth: req.body.auth
      },
      { credentials: await httpAuth.credentials(req) }
    );
    res.json(response);
  });
  router.post("/resources/custom/query", async (req, res) => {
    const entity = await getEntityByReq(req);
    if (!req.body.customResources) {
      throw new errors.InputError("customResources is a required field");
    } else if (!Array.isArray(req.body.customResources)) {
      throw new errors.InputError("customResources must be an array");
    } else if (req.body.customResources.length === 0) {
      throw new errors.InputError("at least 1 customResource is required");
    }
    const response = await objectsProvider.getCustomResourcesByEntity(
      {
        entity,
        customResources: req.body.customResources,
        auth: req.body.auth
      },
      { credentials: await httpAuth.credentials(req) }
    );
    res.json(response);
  });
};

exports.addResourceRoutesToRouter = addResourceRoutesToRouter;
//# sourceMappingURL=resourcesRoutes.cjs.js.map
