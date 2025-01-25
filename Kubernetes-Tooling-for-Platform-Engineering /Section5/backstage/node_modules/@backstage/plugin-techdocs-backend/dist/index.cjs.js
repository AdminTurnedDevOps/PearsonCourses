'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('./plugin.cjs.js');
var router = require('./service/router.cjs.js');
var index = require('./search/index.cjs.js');
var pluginTechdocsNode = require('@backstage/plugin-techdocs-node');
var DefaultTechDocsCollator = require('./search/DefaultTechDocsCollator.cjs.js');



exports.default = plugin.techdocsPlugin;
exports.createRouter = router.createRouter;
exports.DefaultTechDocsCollatorFactory = index.DefaultTechDocsCollatorFactory;
exports.DefaultTechDocsCollator = DefaultTechDocsCollator.DefaultTechDocsCollator;
Object.keys(pluginTechdocsNode).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return pluginTechdocsNode[k]; }
  });
});
//# sourceMappingURL=index.cjs.js.map
