'use strict';

var processingResult = require('./api/processingResult.cjs.js');
var conversion = require('./conversion.cjs.js');
var catalogService = require('./catalogService.cjs.js');



exports.processingResult = processingResult.processingResult;
exports.locationSpecToLocationEntity = conversion.locationSpecToLocationEntity;
exports.locationSpecToMetadataName = conversion.locationSpecToMetadataName;
exports.catalogServiceRef = catalogService.catalogServiceRef;
//# sourceMappingURL=index.cjs.js.map
