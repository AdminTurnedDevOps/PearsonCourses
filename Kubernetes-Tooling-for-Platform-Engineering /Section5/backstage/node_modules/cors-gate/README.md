cors-gate
=========

[![Build Status](https://travis-ci.org/mixmaxhq/cors-gate.svg?branch=master)](https://travis-ci.org/mixmaxhq/cors-gate)

Connect-compatible middleware to selectively reject requests based on CORS rules.

This lets you implement an elegant alternative to CSRF tokens if you only need to support
modern browsers. For more information, see [our blog post](https://mixmax.com/blog/modern-csrf).

Install
-------

Run this in your project:

```sh
$ npm install cors-gate
```

Test
----

```sh
$ npm test
```

Usage
-----

```js
const express = require('express');
const cors = require('cors');
const corsGate = require('cors-gate');

const app = express();

app.use(cors({
  origin: ['https://app.mixmax.com', 'https://other-app.mixmax.com'],
  credentials: true
}));

// prevent cross-origin requests from domains not permitted by the preceeding cors rules
app.use(corsGate({
  // require an Origin header, and reject request if missing
  strict: true,
  // permit GET and HEAD requests, even without an Origin header
  allowSafe: true,
  // the origin of the server
  origin: 'https://api.mixmax.com'
}));

// add a new contact
app.post('/api/contacts', function(req, res) {
  // ...
  res.status(200).json({id: id});
});
```

### Alternative failure handling

By default, `cors-gate` will return `403 Unauthorized` to any requests that aren't permitted by the specified options.

The `failure` option offers a means to change this behavior. This way, unauthorized cross-origin requests can be permitted in a restricted manner - perhaps by requiring an explicit authentication mechanism rather than cookie-based authentication to prevent cross-site scripting. As such, `cors-gate` can serve as a CSRF mechanism without the need for a token, while still allowing limited forms of third-party cross-origin API requests.

```js
app.use(corsGate({
  origin: 'https://api.mixmax.com',
  failure: function(req, res, next) {
    // requests from other origins will have this flag set.
    req.requireExplicitAuthentication = true;
    next();
  }
}));
```

### Firefox and the Origin header

Firefox does not set the `Origin` header [on same-origin requests](http://stackoverflow.com/a/15514049/495611) (see also [csrf-request-tester](https://github.com/mixmaxhq/csrf-request-tester)) for same-origin requests, as of version 53. The `corsGate.originFallbackToReferrer` middleware will, if the `Origin` header is missing, fill it with the origin part of the `Referer`. This middleware thus enables verification of the `Origin` for same-origin requests.

Additionally, no browser sends the `Origin` header when sending a `GET` request to load an image. We could simply allow all `GET` requests - `GET` requests are safe, per `HTTP` - but we'd rather reject unauthorized cross-origin `GET` requests wholesale.

At present, Chrome and Safari do not support the `strict-origin` `Referrer-Policy`, so we can only patch the `Origin` from the `Referer` on Firefox. In patching it, however, we can reject unauthorized cross-origin `GET` requests from images, and once Chrome and Safari support `strict-origin`, we'll be able to do so on all three platforms.

In order to actually reject these requests, however, the patched `Origin` data must be visible to the `cors` middleware. This middleware is distinct because it must appear before `cors` and `corsGate` to perform all the described tasks.

```js
app.use(corsGate.originFallbackToReferrer());
app.use(cors({ ... }));
app.use(corsGate({ ... }));
```

### Language ports

- Go: [Roemerb/corsgate](https://github.com/Roemerb/corsgate)

License
-------

The [MIT License](https://github.com/mixmaxhq/cors-gate/blob/master/LICENSE).
