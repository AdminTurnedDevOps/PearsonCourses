const url = require('url');

/**
 * Gate requests based on CORS data. For requests that are not permitted via CORS, invoke the
 * failure options callback, which defaults to rejecting the request.
 *
 * @param {Object} options
 * @param {String} options.origin The origin of the server - requests from this origin will always
 *   proceed.
 * @param {Boolean=} options.strict Whether to reject requests that lack an Origin header. Defaults
 *   to true.
 * @param {Boolean|Function=} options.allowSafe Whether to enforce the strict mode for safe requests (HEAD,
 *   GET). Defaults to true. A function can be passed here, that will be passed req and res and should return a boolean.
 * @param {Function=} options.failure A standard connect-style callback for handling failure.
 *   Defaults to rejecting the request with 403 Unauthorized.
 */
function corsGate(options) {
  options = Object.assign({
    strict: true,
    allowSafe: true,
    failure(req, res, next) {
      // Set `statusCode` vs. using `res#status`, as https://github.com/expressjs/cors does, so this
      // will work with any Connect-compatible server.
      res.statusCode = 403;
      res.end();
    }
  }, options);

  if (typeof options.origin !== 'string') {
    throw new Error("Must specify the server's origin.");
  }

  const thisOrigin = options.origin.toLowerCase();
  const failure = options.failure;

  return function(req, res, next) {
    const origin = (req.headers.origin || '').toLowerCase().trim();

    if (!origin) {
      const allowSafe = !!(typeof options.allowSafe === 'function' ? options.allowSafe(req, res) : options.allowSafe);
      // Fail on missing origin when in strict mode, but allow safe requests if allowSafe set.
      if (options.strict && (!allowSafe || ['GET', 'HEAD'].indexOf(req.method) === -1)) {
        return failure(req, res, next);
      }

      return next();
    }

    // Always allow same-origin requests.
    if (origin === thisOrigin) return next();

    // Now this is a cross-origin request. Check if we should allow it based on headers set by
    // previous CORS middleware. Note that `getHeader` is case-insensitive.
    const otherOrigin = (res.getHeader('access-control-allow-origin') || '').toLowerCase().trim();

    // Two values: allow any origin, or a specific origin.
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Allow-Origin
    if ((otherOrigin === '*') || (origin === otherOrigin)) return next();

    // CSRF! Abort.
    failure(req, res, next);
  };
}

/**
 * If the Origin header is missing, fill it with the origin part of the Referer.
 *
 * Firefox does not send the Origin header for same-origin requests, as of version 53. This is a
 * documented bug, so this middleware enables verification of the Origin in that case. Additionally,
 * no browser sends the Origin header when sending a GET request to load an image. We could simply
 * allow all GET requests - GET requests are safe, per HTTP - but we'd rather reject unauthorized
 * cross-origin GET requests wholesale.
 *
 * At present, Chrome and Safari do not support the strict-origin Referrer-Policy, so we can only
 * patch the Origin from the Referer on Firefox. In patching it, however, we can reject unauthorized
 * cross-origin GET requests from images, and once Chrome and Safari support strict-origin, we'll
 * be able to do so on all three platforms.
 *
 * In order to actually reject these requests, however, the patched Origin data must be visible to
 * the cors middleware. This middleware is distinct because it must appear before cors and corsGate
 * to perform all the described tasks.
 */
function originFallbackToReferrer() {
  return function(req, res, next) {
    const origin = req.headers.origin;
    if (!origin) {
      const ref = req.headers.referer;
      if (ref) {
        const parts = url.parse(ref);
        req.headers.origin = url.format({
          protocol: parts.protocol,
          host: parts.host
        });
      }
    }
    next();
  };
}

corsGate.originFallbackToReferrer = corsGate.originFallbackToReferer = originFallbackToReferrer;

module.exports = corsGate;
