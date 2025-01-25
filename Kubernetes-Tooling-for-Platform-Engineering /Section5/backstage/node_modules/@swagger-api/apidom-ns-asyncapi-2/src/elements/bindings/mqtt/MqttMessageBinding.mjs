import { ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class MqttMessageBinding extends ObjectElement {
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
export default MqttMessageBinding;