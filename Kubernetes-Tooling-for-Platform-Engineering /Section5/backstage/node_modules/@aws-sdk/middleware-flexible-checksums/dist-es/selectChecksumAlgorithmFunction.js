import { AwsCrc32c } from "@aws-crypto/crc32c";
import { ChecksumAlgorithm } from "./constants";
import { getCrc32ChecksumAlgorithmFunction } from "./getCrc32ChecksumAlgorithmFunction";
export const selectChecksumAlgorithmFunction = (checksumAlgorithm, config) => {
    switch (checksumAlgorithm) {
        case ChecksumAlgorithm.MD5:
            return config.md5;
        case ChecksumAlgorithm.CRC32:
            return getCrc32ChecksumAlgorithmFunction();
        case ChecksumAlgorithm.CRC32C:
            return AwsCrc32c;
        case ChecksumAlgorithm.SHA1:
            return config.sha1;
        case ChecksumAlgorithm.SHA256:
            return config.sha256;
        default:
            throw new Error(`Unsupported checksum algorithm: ${checksumAlgorithm}`);
    }
};
