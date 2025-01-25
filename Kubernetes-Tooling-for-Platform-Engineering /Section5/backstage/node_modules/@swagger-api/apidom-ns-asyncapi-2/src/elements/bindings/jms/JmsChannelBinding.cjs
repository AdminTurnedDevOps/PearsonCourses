"use strict";

exports.__esModule = true;
exports.default = void 0;
var _apidomCore = require("@swagger-api/apidom-core");
/**
 * @public
 */
class JmsChannelBinding extends _apidomCore.ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'jmsChannelBinding';
    this.classes.push('channel-binding');
  }
}
var _default = exports.default = JmsChannelBinding;