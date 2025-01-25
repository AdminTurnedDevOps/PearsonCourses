# Read-TLS-Client-Hello [![Build Status](https://github.com/httptoolkit/read-tls-client-hello/workflows/CI/badge.svg)](https://github.com/httptoolkit/read-tls-client-hello/actions) [![Available on NPM](https://img.shields.io/npm/v/read-tls-client-hello.svg)](https://npmjs.com/package/read-tls-client-hello)

> _Part of [HTTP Toolkit](https://httptoolkit.tech): powerful tools for building, testing & debugging HTTP(S)_

A pure-JS module to read TLS client hello data and calculate TLS fingerprints from an incoming socket connection. Tiny, with zero runtime dependencies.

Using this, you can analyze incoming TLS connections before you start a full handshake, and using their fingerprints you can recognize certain TLS clients - e.g. specific browser, cURL, or even the specific versions of a specific programming language a client is using - regardless of the content of the request they send.

See https://httptoolkit.com/blog/tls-fingerprinting-node-js/#how-does-tls-fingerprinting-work for more background on how TLS fingerprinting works.

Be aware that fingerprinting is _not_ a 100% reliable test. Most clients can modify their TLS fingerprint with a bit of work (though few do). In many cases, it's even possible to mimic another arbitrary fingerprint on demand (e.g. using libraries like [CycleTLS](https://www.npmjs.com/package/cycletls)). Most of the time though, for clients that aren't actively messing with you, the fingerprint will tell you what kind of client is making the connection.

## Docs

### TLS server helper

The easiest way to use this is to use the built-in `trackClientHellos` helper, which can be applied to any `tls.TLSServer` instance, including `https.Server` instances, like so:

```javascript
const https = require('https');
const { trackClientHellos } = require('read-tls-client-hello');

const server = new https.Server({ /* your TLS options etc */ });

trackClientHellos(server); // <-- Automatically track everything on this server

server.on('request', (request, response) => {
    // In your normal request handler, check `tlsClientHello` on the request's socket:
    console.log('Received request with TLS client hello:', request.socket.tlsClientHello);
});
```

A `tlsClientHello` property will be attached to all sockets, containing the parsed data returned by `readTlsClientHello` (see below) and a `ja3` property with the JA3 TLS fingerprint for the client hello, e.g. `cd08e31494f9531f560d64c695473da9`.

### Reading a TLS client hello

To read all available data from a TLS client hello manually, pass a stream (e.g. a `net.Socket`) to the exported `readTlsClientHello(stream)`, before the TLS handshake (or any other processing) starts. This returns a promise containing all data parsed from the client hello.

This method reads the initial data from the socket, parses it, and then unshifts it back into the socket, so that once the returned promise resolves the stream can be used like new, to start a normal TLS session using the same client hello.

If parsing fails, this method will throw an error, but will still ensure all data is returned to the socket first, so that non-TLS streams can also be processed as normal.

The returned promise resolves to an object, containing:

* `serverName` - The server name requested in the client hello (or undefined if SNI was not used)
* `alpnProtocols` - A array of ALPN protcol names requested in the client hello (or undefined if ALPN was not used)
* `fingerprintData` - An array containing the raw components used for JA3 TLS fingerprinting:
    1. The TLS version number as a Uint16 (771 for TLS 1.2+)
    2. An array of cipher ids (excluding GREASE)
    3. An array of extension ids (excluding GREASE)
    4. An array of supported group ids (excluding GREASE)
    5. An array of supported elliptic curve ids

### TLS fingerprinting

To calculate TLS fingerprints manually, there are a few options exported from this module:

* `getTlsFingerprintAsJa3` - Reads from a stream, just like `readTlsClientHello` above, but returns a promise for the JA3 hash string, e.g. `cd08e31494f9531f560d64c695473da9`, instead of the raw hello components.
* `readTlsClientHello(stream)` - Reads the entire hello (see above). In the returned object, you can read the raw data components used for fingerprinting from the `fingerprintData` property.
* `calculateJa3FromFingerprintData(data)` - Takes raw TLS fingerprint data, and returns the corresponding JA3 hash.