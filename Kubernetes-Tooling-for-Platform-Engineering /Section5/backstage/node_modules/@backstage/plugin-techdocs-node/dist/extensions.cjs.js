'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');

const techdocsBuildsExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "techdocs.builds"
});
const techdocsGeneratorExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "techdocs.generator"
});
const techdocsPreparerExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "techdocs.preparer"
});
const techdocsPublisherExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "techdocs.publisher"
});

exports.techdocsBuildsExtensionPoint = techdocsBuildsExtensionPoint;
exports.techdocsGeneratorExtensionPoint = techdocsGeneratorExtensionPoint;
exports.techdocsPreparerExtensionPoint = techdocsPreparerExtensionPoint;
exports.techdocsPublisherExtensionPoint = techdocsPublisherExtensionPoint;
//# sourceMappingURL=extensions.cjs.js.map
