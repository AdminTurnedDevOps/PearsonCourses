import Http from '../../http/index.js';
export const retrievalURI = options => {
  var _ref, _globalThis$document;
  /**
   * Swagger-UI uses baseDoc instead of url, this helper function exists
   * to allow both.
   *
   * In browser environment, we allow to pass a relative URI Reference,
   * and we resolve it against the document's baseURI before passing it deeper
   * to swagger-client code.
   */
  const {
    baseDoc,
    url
  } = options;
  const retrievalURL = (_ref = baseDoc !== null && baseDoc !== void 0 ? baseDoc : url) !== null && _ref !== void 0 ? _ref : '';
  return typeof ((_globalThis$document = globalThis.document) === null || _globalThis$document === void 0 ? void 0 : _globalThis$document.baseURI) === 'string' ? String(new URL(retrievalURL, globalThis.document.baseURI)) : retrievalURL;
};
export const httpClient = options => {
  const {
    fetch,
    http
  } = options;

  // @TODO fetch should be removed, and http used instead
  // provide a default fetch implementation
  return fetch || http || Http;
};