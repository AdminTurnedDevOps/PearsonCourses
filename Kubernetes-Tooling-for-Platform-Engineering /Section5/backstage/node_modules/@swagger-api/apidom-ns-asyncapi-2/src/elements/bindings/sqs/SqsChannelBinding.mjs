import { ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class SqsChannelBinding extends ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'sqsChannelBinding';
    this.classes.push('channel-binding');
  }
}
export default SqsChannelBinding;