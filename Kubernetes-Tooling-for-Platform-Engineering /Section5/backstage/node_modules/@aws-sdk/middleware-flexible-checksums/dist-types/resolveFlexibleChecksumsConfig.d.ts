import { Provider } from "@smithy/types";
import { RequestChecksumCalculation, ResponseChecksumValidation } from "./constants";
export interface FlexibleChecksumsInputConfig {
    /**
     * Determines when a checksum will be calculated for request payloads.
     */
    requestChecksumCalculation?: RequestChecksumCalculation | Provider<RequestChecksumCalculation>;
    /**
     * Determines when checksum validation will be performed on response payloads.
     */
    responseChecksumValidation?: ResponseChecksumValidation | Provider<ResponseChecksumValidation>;
}
export interface FlexibleChecksumsResolvedConfig {
    requestChecksumCalculation: Provider<RequestChecksumCalculation>;
    responseChecksumValidation: Provider<ResponseChecksumValidation>;
}
export declare const resolveFlexibleChecksumsConfig: <T>(input: T & FlexibleChecksumsInputConfig) => T & FlexibleChecksumsResolvedConfig;
