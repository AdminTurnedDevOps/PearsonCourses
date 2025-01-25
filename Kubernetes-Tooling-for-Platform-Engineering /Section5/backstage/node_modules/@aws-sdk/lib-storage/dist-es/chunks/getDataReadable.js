import { Buffer } from "buffer";
export async function* getDataReadable(data) {
    for await (const chunk of data) {
        if (Buffer.isBuffer(chunk) || chunk instanceof Uint8Array) {
            yield chunk;
        }
        else {
            yield Buffer.from(chunk);
        }
    }
}
