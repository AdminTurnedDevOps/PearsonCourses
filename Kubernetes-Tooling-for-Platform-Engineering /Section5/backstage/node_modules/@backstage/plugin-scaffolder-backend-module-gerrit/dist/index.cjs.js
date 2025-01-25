'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var gerrit = require('./actions/gerrit.cjs.js');
var gerritReview = require('./actions/gerritReview.cjs.js');
var module$1 = require('./module.cjs.js');



exports.createPublishGerritAction = gerrit.createPublishGerritAction;
exports.createPublishGerritReviewAction = gerritReview.createPublishGerritReviewAction;
exports.default = module$1.gerritModule;
//# sourceMappingURL=index.cjs.js.map
