'use strict';

var catalogModel = require('@backstage/catalog-model');
var Template_v1beta3_schema = require('./Template.v1beta3.schema.json.cjs.js');

const validator = catalogModel.entityKindSchemaValidator(Template_v1beta3_schema.default);
const templateEntityV1beta3Validator = {
  // TODO(freben): Emulate the old KindValidator until we fix that type
  async check(data) {
    return validator(data) === data;
  }
};
const isTemplateEntityV1beta3 = (entity) => entity.apiVersion === "scaffolder.backstage.io/v1beta3" && entity.kind === "Template";

exports.isTemplateEntityV1beta3 = isTemplateEntityV1beta3;
exports.templateEntityV1beta3Validator = templateEntityV1beta3Validator;
//# sourceMappingURL=TemplateEntityV1beta3.cjs.js.map
