# Safari 14 IndexedDB fix

Safari on macOS Big Sur 11.4 and iOS 14.6 has a [nasty bug](https://bugs.webkit.org/show_bug.cgi?id=226547) where IndexedDB requests get lost and never resolve.

This library (well, function) works around the issue and tells you when IndexedDB is actually available.

To install:

```
npm i safari-14-idb-fix
```

To use:

```js
import idbReady from 'safari-14-idb-fix';

idbReady().then(() => {
  // Safari has figured out where IndexedDB is.
  // You can use IndexedDB as usual.
});
```

## All bundles

A modern build tool will handle the above example fine, but if you need some different builds:

- `dist/cjs/index.js` CommonJS module.
- `dist/cjs-compat/index.js` CommonJS module, transpiled for older browsers.
- `dist/esm/index.js` EcmaScript module.
- `dist/esm-compat/index.js` EcmaScript module, transpiled for older browsers.
- `dist/iife/index-min.js` Minified plain JS, which creates an `idbReady` global.
- `dist/iife-compat/index-min.js` As above, but transpiled for older browsers.
