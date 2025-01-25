import { GetTokenOptions, Token } from "./types";
export declare const getToken: ({ privateKey, payload, }: GetTokenOptions) => Promise<Token>;
