import { ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Mqtt5ServerBinding extends ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'mqtt5ServerBinding';
    this.classes.push('server-binding');
  }
}
export default Mqtt5ServerBinding;