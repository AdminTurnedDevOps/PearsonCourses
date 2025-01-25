// Types
import type { Request } from 'express'

// Local Types
import type { MockRequest } from './index'

/**
 * Returns a mocked **Express** `Request` with mocked functions and default values.
 */
export const getMockReq = <T extends Request>(values: MockRequest = {}): T => {
  const {
    /* express.Request */
    params = {},
    query = {},
    body = {},
    cookies = {},
    method = '',
    protocol = '',
    secure = false,
    ip = '',
    ips = [],
    subdomains = [],
    path = '',
    hostname = '',
    host = '',
    fresh = false,
    stale = false,
    xhr = false,
    route = {},
    signedCookies = {},
    originalUrl = '',
    url = '',
    baseUrl = '',
    accepted = [],
    get = jest.fn().mockName('get mock default'),
    header = jest.fn().mockName('header mock default'),
    accepts = jest.fn().mockName('accepts mock default'),
    acceptsCharsets = jest.fn().mockName('acceptsCharsets mock default'),
    acceptsEncodings = jest.fn().mockName('acceptsEncodings mock default'),
    acceptsLanguages = jest.fn().mockName('acceptsLanguages mock default'),
    range = jest.fn().mockName('range mock default'),
    param = jest.fn().mockName('param mock default'),
    is = jest.fn().mockName('is mock default'),
    app = {},
    res = jest.fn().mockName('res mock default'),
    next = jest.fn().mockName('next mock default'),

    /* http.IncomingMessage */
    aborted = false,
    httpVersion = '',
    httpVersionMajor = 0,
    httpVersionMinor = 0,
    complete = false,
    connection = {},
    socket = {},
    headers = {},
    rawHeaders = [],
    trailers = {},
    rawTrailers = [],
    setTimeout = jest.fn().mockName('setTimeout mock default'),
    statusCode = 0,
    statusMessage = '',
    destroy = jest.fn().mockName('destroy mock default'),

    /* stream.Readable */
    readable = false,
    readableHighWaterMark = 0,
    readableLength = 0,
    readableObjectMode = false,
    destroyed = false,
    _read = jest.fn().mockName('_read mock default'),
    read = jest.fn().mockName('read mock default'),
    setEncoding = jest.fn().mockName('setEncoding mock default'),
    pause = jest.fn().mockName('pause mock default'),
    resume = jest.fn().mockName('resume mock default'),
    isPaused = jest.fn().mockName('isPaused mock default'),
    unpipe = jest.fn().mockName('unpipe mock default'),
    unshift = jest.fn().mockName('unshift mock default'),
    wrap = jest.fn().mockName('wrap mock default'),
    push = jest.fn().mockName('push mock default'),
    _destroy = jest.fn().mockName('_destroy mock default'),
    addListener = jest.fn().mockName('addListener mock default'),
    emit = jest.fn().mockName('emit mock default'),
    on = jest.fn().mockName('on mock default'),
    once = jest.fn().mockName('once mock default'),
    prependListener = jest.fn().mockName('prependListener mock default'),
    prependOnceListener = jest.fn().mockName('prependOnceListener mock default'),
    removeListener = jest.fn().mockName('removeListener mock default'),
    // destroy - is handled/overridden as part of http.IncomingMessage

    /* event.EventEmitter */
    // addListener - is handled/overridden as part of stream.Readable
    // on - is handled/overridden as part of stream.Readable
    // once - is handled/overridden as part of stream.Readable
    // removeListener - is handled/overridden as part of stream.Readable
    off = jest.fn().mockName('off mock default'),
    removeAllListeners = jest.fn().mockName('removeAllListeners mock default'),
    setMaxListeners = jest.fn().mockName('setMaxListeners mock default'),
    getMaxListeners = jest.fn().mockName('getMaxListeners mock default'),
    listeners = jest.fn().mockName('listeners mock default'),
    rawListeners = jest.fn().mockName('rawListeners mock default'),
    // emit - is handled/overridden as part of stream.Readable
    listenerCount = jest.fn().mockName('listenerCount mock default'),
    // prependListener - is handled/overridden as part of stream.Readable
    // prependOnceListener - is handled/overridden as part of stream.Readable
    eventNames = jest.fn().mockName('eventNames mock default'),

    // custom values
    ...extraProvidedValues
  } = values

  const request = {
    /* express.Request */
    params,
    query,
    body,
    cookies,
    method,
    protocol,
    secure,
    ip,
    ips,
    subdomains,
    path,
    hostname,
    host,
    fresh,
    stale,
    xhr,
    route,
    signedCookies,
    originalUrl,
    url,
    baseUrl,
    accepted,
    get,
    header,
    accepts,
    acceptsCharsets,
    acceptsEncodings,
    acceptsLanguages,
    range,
    param,
    is,
    app,
    res,
    next,

    /* http.IncomingMessage */
    aborted,
    httpVersion,
    httpVersionMajor,
    httpVersionMinor,
    complete,
    connection,
    socket,
    headers,
    rawHeaders,
    trailers,
    rawTrailers,
    setTimeout,
    statusCode,
    statusMessage,
    destroy,

    /* stream.Readable */
    readable,
    readableHighWaterMark,
    readableLength,
    readableObjectMode,
    destroyed,
    _read,
    read,
    setEncoding,
    pause,
    resume,
    isPaused,
    unpipe,
    unshift,
    wrap,
    push,
    _destroy,
    addListener,
    emit,
    on,
    once,
    prependListener,
    prependOnceListener,
    removeListener,
    // destroy - is handled/overridden as part of http.IncomingMessage

    /* event.EventEmitter */
    // addListener - is handled/overridden as part of stream.Readable
    // on - is handled/overridden as part of stream.Readable
    // once - is handled/overridden as part of stream.Readable
    // removeListener - is handled/overridden as part of stream.Readable
    off,
    removeAllListeners,
    setMaxListeners,
    getMaxListeners,
    listeners,
    rawListeners,
    // emit - is handled/overridden as part of stream.Readable
    listenerCount,
    // prependListener - is handled/overridden as part of stream.Readable
    // prependOnceListener - is handled/overridden as part of stream.Readable
    eventNames,

    // custom values
    ...extraProvidedValues,
  }

  return request as unknown as T
}

export default getMockReq
