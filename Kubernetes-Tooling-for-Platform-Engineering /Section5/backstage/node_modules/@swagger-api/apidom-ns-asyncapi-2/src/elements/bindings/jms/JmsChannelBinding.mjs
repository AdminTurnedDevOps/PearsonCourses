import { ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class JmsChannelBinding extends ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'jmsChannelBinding';
    this.classes.push('channel-binding');
  }
}
export default JmsChannelBinding;