import { Buffer } from "buffer";
export async function* getDataReadableStream(data) {
    const reader = data.getReader();
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                return;
            }
            if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
                yield value;
            }
            else {
                yield Buffer.from(value);
            }
        }
    }
    catch (e) {
        throw e;
    }
    finally {
        reader.releaseLock();
    }
}
