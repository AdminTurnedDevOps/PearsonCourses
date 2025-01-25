"use strict";

exports.__esModule = true;
exports.default = void 0;
var _apidomCore = require("@swagger-api/apidom-core");
/**
 * @public
 */
class Mqtt5ServerBinding extends _apidomCore.ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'mqtt5ServerBinding';
    this.classes.push('server-binding');
  }
}
var _default = exports.default = Mqtt5ServerBinding;