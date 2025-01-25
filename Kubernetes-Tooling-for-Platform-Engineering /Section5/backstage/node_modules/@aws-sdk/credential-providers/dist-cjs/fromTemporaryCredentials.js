"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromTemporaryCredentials = void 0;
const property_provider_1 = require("@smithy/property-provider");
const fromTemporaryCredentials = (options) => {
    let stsClient;
    return async () => {
        options.logger?.debug("@aws-sdk/credential-providers - fromTemporaryCredentials (STS)");
        const params = { ...options.params, RoleSessionName: options.params.RoleSessionName ?? "aws-sdk-js-" + Date.now() };
        if (params?.SerialNumber) {
            if (!options.mfaCodeProvider) {
                throw new property_provider_1.CredentialsProviderError(`Temporary credential requires multi-factor authentication,` + ` but no MFA code callback was provided.`, {
                    tryNextLink: false,
                    logger: options.logger,
                });
            }
            params.TokenCode = await options.mfaCodeProvider(params?.SerialNumber);
        }
        const { AssumeRoleCommand, STSClient } = await Promise.resolve().then(() => __importStar(require("./loadSts")));
        if (!stsClient)
            stsClient = new STSClient({ ...options.clientConfig, credentials: options.masterCredentials });
        if (options.clientPlugins) {
            for (const plugin of options.clientPlugins) {
                stsClient.middlewareStack.use(plugin);
            }
        }
        const { Credentials } = await stsClient.send(new AssumeRoleCommand(params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
            throw new property_provider_1.CredentialsProviderError(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`, {
                logger: options.logger,
            });
        }
        return {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken,
            expiration: Credentials.Expiration,
            credentialScope: Credentials.CredentialScope,
        };
    };
};
exports.fromTemporaryCredentials = fromTemporaryCredentials;
