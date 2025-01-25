import { Provider } from "@smithy/types";
import {
  RequestChecksumCalculation,
  ResponseChecksumValidation,
} from "./constants";
export interface FlexibleChecksumsInputConfig {
  requestChecksumCalculation?:
    | RequestChecksumCalculation
    | Provider<RequestChecksumCalculation>;
  responseChecksumValidation?:
    | ResponseChecksumValidation
    | Provider<ResponseChecksumValidation>;
}
export interface FlexibleChecksumsResolvedConfig {
  requestChecksumCalculation: Provider<RequestChecksumCalculation>;
  responseChecksumValidation: Provider<ResponseChecksumValidation>;
}
export declare const resolveFlexibleChecksumsConfig: <T>(
  input: T & FlexibleChecksumsInputConfig
) => T & FlexibleChecksumsResolvedConfig;
