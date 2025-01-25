import { type SignOptions } from "./types";
export declare function sign(options: SignOptions | string, payload: string): Promise<string>;
export declare function verify(secret: string, eventPayload: string, signature: string): Promise<boolean>;
