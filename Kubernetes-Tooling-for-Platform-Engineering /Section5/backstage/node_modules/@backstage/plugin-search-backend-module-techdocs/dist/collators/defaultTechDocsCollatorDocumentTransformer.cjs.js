'use strict';

var unescape = require('lodash/unescape');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var unescape__default = /*#__PURE__*/_interopDefaultCompat(unescape);

const defaultTechDocsCollatorDocumentTransformer = (doc) => {
  return {
    title: unescape__default.default(doc.title),
    text: unescape__default.default(doc.text || ""),
    path: doc.location
  };
};

exports.defaultTechDocsCollatorDocumentTransformer = defaultTechDocsCollatorDocumentTransformer;
//# sourceMappingURL=defaultTechDocsCollatorDocumentTransformer.cjs.js.map
