import { BodyDataTypes } from "./types";
import type { RawDataPart } from "./Upload";
export declare const getChunk: (data: BodyDataTypes, partSize: number) => AsyncGenerator<RawDataPart, void, undefined>;
