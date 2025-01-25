import { RawDataPart } from "../Upload";
export declare function getChunkUint8Array(data: Uint8Array, partSize: number): AsyncGenerator<RawDataPart, void, undefined>;
