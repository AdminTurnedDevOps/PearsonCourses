"use strict";

var _fetchPonyfillNodeFetchNode = require("./fetch-ponyfill-node-fetch.node.js");
if (typeof globalThis.fetch === 'undefined') {
  globalThis.fetch = _fetchPonyfillNodeFetchNode.fetch;
}
if (typeof globalThis.Headers === 'undefined') {
  globalThis.Headers = _fetchPonyfillNodeFetchNode.Headers;
}
if (typeof globalThis.Request === 'undefined') {
  globalThis.Request = _fetchPonyfillNodeFetchNode.Request;
}
if (typeof globalThis.Response === 'undefined') {
  globalThis.Response = _fetchPonyfillNodeFetchNode.Response;
}
if (typeof globalThis.FormData === 'undefined') {
  globalThis.FormData = _fetchPonyfillNodeFetchNode.FormData;
}
if (typeof globalThis.File === 'undefined') {
  globalThis.File = _fetchPonyfillNodeFetchNode.File;
}
if (typeof globalThis.Blob === 'undefined') {
  globalThis.Blob = _fetchPonyfillNodeFetchNode.Blob;
}