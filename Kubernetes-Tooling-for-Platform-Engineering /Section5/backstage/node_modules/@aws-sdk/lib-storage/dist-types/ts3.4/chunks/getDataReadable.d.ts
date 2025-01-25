import { Readable } from "stream";
export declare function getDataReadable(
  data: Readable
): AsyncGenerator<Uint8Array>;
