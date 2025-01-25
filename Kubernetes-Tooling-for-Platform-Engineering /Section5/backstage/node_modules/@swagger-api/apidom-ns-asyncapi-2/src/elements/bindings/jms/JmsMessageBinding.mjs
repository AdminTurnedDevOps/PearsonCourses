import { ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class JmsMessageBinding extends ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'jmsMessageBinding';
    this.classes.push('message-binding');
  }
}
export default JmsMessageBinding;