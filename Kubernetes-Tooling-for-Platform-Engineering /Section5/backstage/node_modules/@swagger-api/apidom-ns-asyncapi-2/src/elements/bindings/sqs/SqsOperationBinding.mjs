import { ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class SqsOperationBinding extends ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'sqsOperationBinding';
    this.classes.push('operation-binding');
  }
}
export default SqsOperationBinding;