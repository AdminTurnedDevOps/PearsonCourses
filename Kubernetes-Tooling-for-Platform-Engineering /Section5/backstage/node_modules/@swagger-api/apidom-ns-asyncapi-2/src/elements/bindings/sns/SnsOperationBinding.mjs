import { ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class SnsOperationBinding extends ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'snsOperationBinding';
    this.classes.push('operation-binding');
  }
}
export default SnsOperationBinding;