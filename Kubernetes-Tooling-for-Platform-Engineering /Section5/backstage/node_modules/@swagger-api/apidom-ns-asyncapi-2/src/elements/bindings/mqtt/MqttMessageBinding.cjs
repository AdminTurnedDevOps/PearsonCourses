"use strict";

exports.__esModule = true;
exports.default = void 0;
var _apidomCore = require("@swagger-api/apidom-core");
/**
 * @public
 */
class MqttMessageBinding extends _apidomCore.ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'mqttMessageBinding';
    this.classes.push('message-binding');
  }
  get bindingVersion() {
    return this.get('bindingVersion');
  }
  set bindingVersion(bindingVersion) {
    this.set('bindingVersion', bindingVersion);
  }
}
var _default = exports.default = MqttMessageBinding;