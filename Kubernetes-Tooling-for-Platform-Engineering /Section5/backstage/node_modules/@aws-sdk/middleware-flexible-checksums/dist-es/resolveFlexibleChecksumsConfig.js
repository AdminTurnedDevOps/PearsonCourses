import { normalizeProvider } from "@smithy/util-middleware";
import { DEFAULT_REQUEST_CHECKSUM_CALCULATION, DEFAULT_RESPONSE_CHECKSUM_VALIDATION, } from "./constants";
export const resolveFlexibleChecksumsConfig = (input) => ({
    ...input,
    requestChecksumCalculation: normalizeProvider(input.requestChecksumCalculation ?? DEFAULT_REQUEST_CHECKSUM_CALCULATION),
    responseChecksumValidation: normalizeProvider(input.responseChecksumValidation ?? DEFAULT_RESPONSE_CHECKSUM_VALIDATION),
});
