# Destroyable-Server [![Build Status](https://github.com/httptoolkit/destroyable-server/workflows/CI/badge.svg)](https://github.com/httptoolkit/destroyable-server/actions) [![Available on NPM](https://img.shields.io/npm/v/destroyable-server.svg)](https://npmjs.com/package/destroyable-server)

> _Part of [HTTP Toolkit](https://httptoolkit.com/): powerful tools for building, testing & debugging HTTP(S)_

A tiny Node.js module to make any server force-closeable.

Without this module, when you call `server.close()` it stops listening for new connections, but it doesn't close existing connections, which can stop your process from exiting or cause problems with starting new servers.

With this module, you can call `server.destroy()` to forcibly shut down all existing sockets in addition to closing the server, to immediately & completely end all connections.

This works for HTTP, TLS, bare sockets, whatever. Anything that extends `net.Server` or follows its patterns should work correctly.

Use it like so:

```javascript
const net = require('net');

const { makeDestroyable } = require('destroyable-server');

// Create a server somewhere:
let server = net.Server((socket) => { /* ... */ };

// Make it destroyable:
server = makeDestroyable(server);

// When you're done with it, destroy it:
server.destroy();
```

Calling `makeDestroyable` mutates the passed server slightly, to track all active connections, and add a `destroy()` method which ends them.

Calling `destroy()` ends the connections and the server, and returns a promise, which resolves once that is complete.