# Httpolyglot [![Build Status](https://github.com/httptoolkit/httpolyglot/workflows/CI/badge.svg)](https://github.com/httptoolkit/httpolyglot/actions) [![Available on NPM](https://img.shields.io/npm/v/@httptoolkit/httpolyglot.svg)](https://npmjs.com/package/@httptoolkit/httpolyglot)

> _Part of [HTTP Toolkit](https://httptoolkit.com): powerful tools for building, testing & debugging HTTP(S)_

A module for serving HTTP, HTTPS and HTTP/2 connections, all over the same port.

Forked from the original [`httpolyglot`](https://github.com/mscdex/httpolyglot) to fix various issues required for [HTTP Toolkit](https://httptoolkit.com), including:

* Support for HTTP/2
* Fixing `tlsClientError`: https://github.com/mscdex/httpolyglot/pull/11
* Include initially sniffed bytes aren't lost in subsequent `clientError` events (https://github.com/mscdex/httpolyglot/issues/13)
* Dropping support for very old versions of Node (and thereby simplifying the code somewhat)
* Converting to TypeScript
* Event subscription support (subscribe to `server.on(x, ...)` to hear about `x` from _all_ internal servers - HTTP/2, HTTP/1, TLS and net)

Requirements
============

* [node.js](http://nodejs.org/) -- v12.0.0 or newer


Install
============

    npm install @httptoolkit/httpolyglot


Examples
========

* Simple usage:

```javascript
const httpolyglot = require('@httptoolkit/httpolyglot');
const fs = require('fs');

httpolyglot.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end((req.socket.encrypted ? 'HTTPS' : 'HTTP') + ' Connection!');
}).listen(9000, 'localhost', function() {
  console.log('httpolyglot server listening on port 9000');
  // visit http://localhost:9000 and https://localhost:9000 in your browser ...
});
```

* Simple redirect of all http connections to https:

```javascript
const httpolyglot = require('@httptoolkit/httpolyglot');
const fs = require('fs');

httpolyglot.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, function(req, res) {
  if (!req.socket.encrypted) {
    res.writeHead(301, { 'Location': 'https://localhost:9000' });
    return res.end();
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome, HTTPS user!');
}).listen(9000, 'localhost', function() {
  console.log('httpolyglot server listening on port 9000');
  // visit http://localhost:9000 and https://localhost:9000 in your browser ...
});
```


API
===

Exports
-------

* **Server** - A class similar to https.Server (except instances have `setTimeout()` from http.Server).

* **createServer**(< _object_ >tlsConfig[, < _function_ >requestListener]) - _Server_ - Creates and returns a new Server instance.

How it Works
============

TLS and HTTP connections are easy to distinguish based on the first byte sent by clients trying to connect. See [this comment](https://github.com/mscdex/httpolyglot/issues/3#issuecomment-173680155) for more information.
