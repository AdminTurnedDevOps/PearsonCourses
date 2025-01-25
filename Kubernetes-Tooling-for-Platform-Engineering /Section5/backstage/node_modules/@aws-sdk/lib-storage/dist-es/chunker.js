import { Buffer } from "buffer";
import { Readable } from "stream";
import { getChunkStream } from "./chunks/getChunkStream";
import { getChunkUint8Array } from "./chunks/getChunkUint8Array";
import { getDataReadable } from "./chunks/getDataReadable";
import { getDataReadableStream } from "./chunks/getDataReadableStream";
export const getChunk = (data, partSize) => {
    if (data instanceof Uint8Array) {
        return getChunkUint8Array(data, partSize);
    }
    if (data instanceof Readable) {
        return getChunkStream(data, partSize, getDataReadable);
    }
    if (data instanceof String || typeof data === "string") {
        return getChunkUint8Array(Buffer.from(data), partSize);
    }
    if (typeof data.stream === "function") {
        return getChunkStream(data.stream(), partSize, getDataReadableStream);
    }
    if (data instanceof ReadableStream) {
        return getChunkStream(data, partSize, getDataReadableStream);
    }
    throw new Error("Body Data is unsupported format, expected data to be one of: string | Uint8Array | Buffer | Readable | ReadableStream | Blob;.");
};
