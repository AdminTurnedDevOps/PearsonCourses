import { ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class SnsChannelBinding extends ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'snsChannelBinding';
    this.classes.push('channel-binding');
  }
}
export default SnsChannelBinding;