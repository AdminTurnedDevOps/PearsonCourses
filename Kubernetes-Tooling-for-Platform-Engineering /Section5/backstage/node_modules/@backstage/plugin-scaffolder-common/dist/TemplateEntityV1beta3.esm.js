import { entityKindSchemaValidator } from '@backstage/catalog-model';
import schema from './Template.v1beta3.schema.json.esm.js';

const validator = entityKindSchemaValidator(schema);
const templateEntityV1beta3Validator = {
  // TODO(freben): Emulate the old KindValidator until we fix that type
  async check(data) {
    return validator(data) === data;
  }
};
const isTemplateEntityV1beta3 = (entity) => entity.apiVersion === "scaffolder.backstage.io/v1beta3" && entity.kind === "Template";

export { isTemplateEntityV1beta3, templateEntityV1beta3Validator };
//# sourceMappingURL=TemplateEntityV1beta3.esm.js.map
