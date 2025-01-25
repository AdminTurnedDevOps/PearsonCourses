import { RawDataPart } from "../Upload";
export declare function getChunkStream<T>(data: T, partSize: number, getNextData: (data: T) => AsyncGenerator<Uint8Array>): AsyncGenerator<RawDataPart, void, undefined>;
