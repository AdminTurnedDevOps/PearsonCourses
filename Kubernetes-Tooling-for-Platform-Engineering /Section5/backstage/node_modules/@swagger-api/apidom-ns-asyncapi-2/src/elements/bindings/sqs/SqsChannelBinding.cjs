"use strict";

exports.__esModule = true;
exports.default = void 0;
var _apidomCore = require("@swagger-api/apidom-core");
/**
 * @public
 */
class SqsChannelBinding extends _apidomCore.ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'sqsChannelBinding';
    this.classes.push('channel-binding');
  }
}
var _default = exports.default = SqsChannelBinding;