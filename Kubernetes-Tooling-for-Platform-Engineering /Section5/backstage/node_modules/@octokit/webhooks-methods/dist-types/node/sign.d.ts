import { type SignOptions } from "../types";
export declare function sign(options: SignOptions | string, payload: string): Promise<string>;
export declare namespace sign {
    var VERSION: string;
}
