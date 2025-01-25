export { sign } from "./node/sign";
import { verify } from "./node/verify";
export { verify };
export declare function verifyWithFallback(secret: string, payload: string, signature: string, additionalSecrets: undefined | string[]): Promise<any>;
