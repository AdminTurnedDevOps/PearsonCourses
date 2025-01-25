"use strict";

exports.__esModule = true;
exports.default = void 0;
var _apidomCore = require("@swagger-api/apidom-core");
/**
 * @public
 */
class SolaceOperationBinding extends _apidomCore.ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'solaceOperationBinding';
    this.classes.push('operation-binding');
  }
  get bindingVersion() {
    return this.get('bindingVersion');
  }
  set bindingVersion(bindingVersion) {
    this.set('bindingVersion', bindingVersion);
  }
  get destinations() {
    return this.get('destinations');
  }
  set destinations(destinations) {
    this.set('destinations', destinations);
  }
}
var _default = exports.default = SolaceOperationBinding;