'use strict';

var catalogModel = require('@backstage/catalog-model');

const getDocumentText = (entity) => {
  const documentTexts = [];
  documentTexts.push(entity.metadata.description || "");
  if (catalogModel.isUserEntity(entity) || catalogModel.isGroupEntity(entity)) {
    if (entity.spec?.profile?.displayName) {
      documentTexts.push(entity.spec.profile.displayName);
    }
  }
  if (catalogModel.isUserEntity(entity)) {
    if (entity.spec?.profile?.email) {
      documentTexts.push(entity.spec.profile.email);
    }
  }
  return documentTexts.join(" : ");
};
const defaultTechDocsCollatorEntityTransformer = (entity) => {
  return {
    kind: entity.kind,
    namespace: entity.metadata.namespace || "default",
    annotations: entity.metadata.annotations || "",
    name: entity.metadata.name || "",
    title: entity.metadata.title || "",
    text: getDocumentText(entity),
    componentType: entity.spec?.type?.toString() || "other",
    type: entity.spec?.type?.toString() || "other",
    lifecycle: entity.spec?.lifecycle || "",
    owner: entity.spec?.owner || "",
    path: ""
  };
};

exports.defaultTechDocsCollatorEntityTransformer = defaultTechDocsCollatorEntityTransformer;
//# sourceMappingURL=defaultTechDocsCollatorEntityTransformer.cjs.js.map
