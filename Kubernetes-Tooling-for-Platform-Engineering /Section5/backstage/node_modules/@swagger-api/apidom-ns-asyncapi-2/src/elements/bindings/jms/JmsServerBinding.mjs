import { ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class JmsServerBinding extends ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'jmsServerBinding';
    this.classes.push('server-binding');
  }
}
export default JmsServerBinding;