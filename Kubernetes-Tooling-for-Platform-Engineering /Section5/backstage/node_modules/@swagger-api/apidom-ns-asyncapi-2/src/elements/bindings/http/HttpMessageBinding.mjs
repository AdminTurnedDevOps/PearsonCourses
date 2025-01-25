import { ObjectElement } from '@swagger-api/apidom-core';
/**
 * @public
 */
class HttpMessageBinding extends ObjectElement {
  constructor(content, meta, attributes) {
    super(content, meta, attributes);
    this.element = 'httpMessageBinding';
    this.classes.push('message-binding');
  }
  get headers() {
    return this.get('headers');
  }
  set headers(headers) {
    this.set('headers', headers);
  }
  get bindingVersion() {
    return this.get('bindingVersion');
  }
  set bindingVersion(bindingVersion) {
    this.set('bindingVersion', bindingVersion);
  }
}
export default HttpMessageBinding;