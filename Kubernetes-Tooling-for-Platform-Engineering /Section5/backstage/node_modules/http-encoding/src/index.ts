import * as zlib from 'zlib';
import type { ZstdStreaming } from 'zstd-codec';

// We want promisify, but for easy browser usage downstream we want to avoid using Node's util
// version. We replace it with pify, but we import util here purely to get the more accurate types.
import { promisify as utilPromisify } from 'util';
const promisify: typeof utilPromisify = require('pify');

export type SUPPORTED_ENCODING =
    | 'identity'
    | 'gzip'
    | 'x-gzip'
    | 'deflate'
    | 'x-deflate'
    | 'br'
    | 'zstd'
    | 'base64';

export const gzip = promisify(zlib.gzip);
export const gunzip = promisify(zlib.gunzip);
export const deflate = promisify(zlib.deflate);
export const inflate = promisify(zlib.inflate);
export const inflateRaw = promisify(zlib.inflateRaw);

// Use Node's new built-in Brotli compression, if available, or
// use the brotli-wasm package if not.
export const brotliCompress = zlib.brotliCompress
    ? (async (buffer: Uint8Array, level?: number): Promise<Uint8Array> => {
        // In node, we just have to convert between the options formats and promisify:
        return new Promise((resolve, reject) => {
            zlib.brotliCompress(buffer, level !== undefined
                ? { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: level } }
                : {}
            , (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    })
    : (async (buffer: Uint8Array, level?: number): Promise<Uint8Array> => {
        const { compress } = await import('brotli-wasm'); // Sync in node, async in browsers
        return compress(buffer, { quality: level });
    });

export const brotliDecompress = zlib.brotliDecompress
    ? promisify(zlib.brotliDecompress)
    : (async (buffer: Uint8Array): Promise<Uint8Array> => {
        const { decompress } = await import('brotli-wasm'); // Sync in node, async in browsers
        return decompress(buffer);
    });

// Zstd is a non-built-in wasm implementation that initializes async. We handle this by
// loading it when the first zstd buffer is decompressed. That lets us defer loading
// until that point too, which is good since it's large-ish & rarely used.
let zstd: Promise<ZstdStreaming> | undefined;
const getZstd = async () => {
    if (!zstd) {
        zstd = new Promise(async (resolve) => {
            const { ZstdCodec } = await import('zstd-codec');
            ZstdCodec.run((binding) => {
                resolve(new binding.Streaming());
            })
        });
    }
    return await zstd;
};

export const zstdCompress = async (buffer: Uint8Array, level?: number): Promise<Uint8Array> => {
    return (await getZstd()).compress(buffer, level);
};

export const zstdDecompress = async (buffer: Uint8Array): Promise<Uint8Array> => {
    return (await getZstd()).decompress(buffer);
};

const encodeBase64 = (buffer: Uint8Array): Uint8Array => {
    return Buffer.from(asBuffer(buffer).toString('base64'), 'utf8');
};

const decodeBase64 = (buffer: Uint8Array): Uint8Array => {
    return Buffer.from(asBuffer(buffer).toString('utf8'), 'base64');
};

// We export promisified versions for consistency
const encodeBase64Promisified = promisify<Uint8Array, Uint8Array>(encodeBase64);
export { encodeBase64Promisified as encodeBase64 };
const decodeBase64Promisified = promisify<Uint8Array, Uint8Array>(decodeBase64);
export { decodeBase64Promisified as decodeBase64 };

const asBuffer = (input: Buffer | Uint8Array | ArrayBuffer): Buffer => {
    if (Buffer.isBuffer(input)) {
        return input;
    } else if (input instanceof ArrayBuffer) {
        return Buffer.from(input);
    } else {
        // Offset & length allow us to support all sorts of buffer views:
        return Buffer.from(input.buffer, input.byteOffset, input.byteLength);
    }
};

const IDENTITY_ENCODINGS = [
    // Explicitly unencoded in the standard way:
    'identity',
    // Weird encoding used by some AWS requests, actually just unencoded JSON:
    // https://docs.aws.amazon.com/en_us/AmazonCloudWatch/latest/APIReference/making-api-requests.html
    'amz-1.0',
    // Workaround for Apache's mod_deflate handling of 'identity', used in the wild mostly with PHP.
    // https://github.com/curl/curl/pull/2298
    'none',
    // No idea where these come from, but they definitely exist in real traffic and seem to come
    // from common confusion between content encodings and content types:
    'text',
    'binary',
    'utf8',
    'utf-8'
]

/**
 * Decodes a buffer, using the encodings as specified in a content-encoding header. Returns
 * a Buffer instance in Node, or a Uint8Array in a browser.
 *
 * Throws if any unrecognized/unavailable content-encoding is found.
 */
export async function decodeBuffer(body: Uint8Array | ArrayBuffer, encoding: string | string[] | undefined): Promise<Buffer> {
    const bodyBuffer = asBuffer(body);

    if (Array.isArray(encoding) || (typeof encoding === 'string' && encoding.indexOf(', ') >= 0)) {
        const encodings = typeof encoding === 'string' ? encoding.split(', ').reverse() : encoding;
        return encodings.reduce<Promise<Uint8Array>>((contentPromise, nextEncoding) => {
            return contentPromise.then((content) =>
                decodeBuffer(content, nextEncoding)
            );
        }, Promise.resolve(bodyBuffer as Uint8Array)) as Promise<Buffer>;
    }

    if (!encoding) encoding = 'identity';
    else encoding = encoding.toLowerCase();

    if (encoding === 'gzip' || encoding === 'x-gzip') {
        return gunzip(bodyBuffer);
    } else if (encoding === 'deflate' || encoding === 'x-deflate') {
        // Deflate is ambiguous, and may or may not have a zlib wrapper.
        // This checks the buffer header directly, based on
        // https://stackoverflow.com/a/37528114/68051
        const lowNibble = bodyBuffer[0] & 0xF;
        if (lowNibble === 8) {
            return inflate(bodyBuffer);
        } else {
            return inflateRaw(bodyBuffer);
        }
    } else if (encoding === 'br') {
        return asBuffer(await brotliDecompress(bodyBuffer));
    } else if (encoding === 'zstd') {
        return asBuffer(await zstdDecompress(bodyBuffer));
    } else if (encoding === 'base64') {
        return asBuffer(await decodeBase64(bodyBuffer));
    } else if (IDENTITY_ENCODINGS.includes(encoding)) {
        return asBuffer(bodyBuffer);
    }

    throw new Error(`Unsupported encoding: ${encoding}`);
};

/**
 * Decodes a buffer, using the encodings as specified in a content-encoding header, synchronously.
 * Returns a Buffer instance in Node, or a Uint8Array in a browser.
 *
 * Zstandard and Brotli decoding are not be supported in synchronous usage.
 *
 * Throws if any unrecognized/unavailable content-encoding is found.
 *
 * @deprecated This is here for convenience with some existing APIs, but for performance & consistency
 * async usage with decodeBuffer is preferable.
 */
 export function decodeBufferSync(body: Uint8Array | ArrayBuffer, encoding: string | string[] | undefined): Buffer {
    const bodyBuffer = asBuffer(body);

    if (Array.isArray(encoding) || (typeof encoding === 'string' && encoding.indexOf(', ') >= 0)) {
        const encodings = typeof encoding === 'string' ? encoding.split(', ').reverse() : encoding;
        return encodings.reduce((content, nextEncoding) => {
            return decodeBufferSync(content, nextEncoding);
        }, bodyBuffer) as Buffer;
    }

    if (!encoding) encoding = 'identity';
    else encoding = encoding.toLowerCase();

    if (encoding === 'gzip' || encoding === 'x-gzip') {
        return zlib.gunzipSync(bodyBuffer);
    } else if (encoding === 'deflate' || encoding === 'x-deflate') {
        // Deflate is ambiguous, and may or may not have a zlib wrapper.
        // This checks the buffer header directly, based on
        // https://stackoverflow.com/a/37528114/68051
        const lowNibble = bodyBuffer[0] & 0xF;
        if (lowNibble === 8) {
            return zlib.inflateSync(bodyBuffer);
        } else {
            return zlib.inflateRawSync(bodyBuffer);
        }
    } else if (encoding === 'base64') {
        return asBuffer(decodeBase64(bodyBuffer));
    } else if (IDENTITY_ENCODINGS.includes(encoding)) {
        return asBuffer(bodyBuffer);
    }

    throw new Error(`Unsupported encoding: ${encoding}`);
};

/**
 * Encodes a buffer, given a single encoding name (as used in content-encoding headers), and an optional
 * level. Returns a Buffer instance in Node, or a Uint8Array in a browser.
 *
 * Throws if an unrecognized/unavailable encoding is specified
 */
 export async function encodeBuffer(body: Uint8Array | ArrayBuffer, encoding: SUPPORTED_ENCODING, options: {
    level?: number
 } = {}): Promise<Buffer> {
    const bodyBuffer = asBuffer(body);
    const level = options.level ?? 4;

    if (!encoding) encoding = 'identity';
    else encoding = encoding.toLowerCase() as SUPPORTED_ENCODING;

    if (encoding === 'gzip' || encoding === 'x-gzip') {
        return gzip(bodyBuffer, { level });
    } else if (encoding === 'deflate' || encoding === 'x-deflate') {
        return deflate(bodyBuffer, { level });
    } else if (encoding === 'br') {
        return asBuffer(await brotliCompress(bodyBuffer, level));
    } else if (encoding === 'zstd') {
        return asBuffer(await zstdCompress(bodyBuffer, level));
    } else if (encoding === 'base64') {
        return asBuffer(encodeBase64(bodyBuffer));
    } else if (IDENTITY_ENCODINGS.includes(encoding)) {
        return asBuffer(bodyBuffer);
    } else {
        throw new Error(`Unsupported encoding: ${encoding}`);
    }
};