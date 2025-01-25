import { Buffer } from "buffer";
export async function* getChunkStream(data, partSize, getNextData) {
    let partNumber = 1;
    const currentBuffer = { chunks: [], length: 0 };
    for await (const datum of getNextData(data)) {
        currentBuffer.chunks.push(datum);
        currentBuffer.length += datum.byteLength;
        while (currentBuffer.length > partSize) {
            const dataChunk = currentBuffer.chunks.length > 1 ? Buffer.concat(currentBuffer.chunks) : currentBuffer.chunks[0];
            yield {
                partNumber,
                data: dataChunk.subarray(0, partSize),
            };
            currentBuffer.chunks = [dataChunk.subarray(partSize)];
            currentBuffer.length = currentBuffer.chunks[0].byteLength;
            partNumber += 1;
        }
    }
    yield {
        partNumber,
        data: currentBuffer.chunks.length !== 1 ? Buffer.concat(currentBuffer.chunks) : currentBuffer.chunks[0],
        lastPart: true,
    };
}
