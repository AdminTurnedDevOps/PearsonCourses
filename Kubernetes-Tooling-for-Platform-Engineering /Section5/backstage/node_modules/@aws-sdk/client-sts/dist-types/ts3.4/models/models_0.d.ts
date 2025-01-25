import { ExceptionOptionType as __ExceptionOptionType } from "@smithy/smithy-client";
import { STSServiceException as __BaseException } from "./STSServiceException";
export interface AssumedRoleUser {
  AssumedRoleId: string | undefined;
  Arn: string | undefined;
}
export interface PolicyDescriptorType {
  arn?: string | undefined;
}
export interface ProvidedContext {
  ProviderArn?: string | undefined;
  ContextAssertion?: string | undefined;
}
export interface Tag {
  Key: string | undefined;
  Value: string | undefined;
}
export interface AssumeRoleRequest {
  RoleArn: string | undefined;
  RoleSessionName: string | undefined;
  PolicyArns?: PolicyDescriptorType[] | undefined;
  Policy?: string | undefined;
  DurationSeconds?: number | undefined;
  Tags?: Tag[] | undefined;
  TransitiveTagKeys?: string[] | undefined;
  ExternalId?: string | undefined;
  SerialNumber?: string | undefined;
  TokenCode?: string | undefined;
  SourceIdentity?: string | undefined;
  ProvidedContexts?: ProvidedContext[] | undefined;
}
export interface Credentials {
  AccessKeyId: string | undefined;
  SecretAccessKey: string | undefined;
  SessionToken: string | undefined;
  Expiration: Date | undefined;
}
export interface AssumeRoleResponse {
  Credentials?: Credentials | undefined;
  AssumedRoleUser?: AssumedRoleUser | undefined;
  PackedPolicySize?: number | undefined;
  SourceIdentity?: string | undefined;
}
export declare class ExpiredTokenException extends __BaseException {
  readonly name: "ExpiredTokenException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<ExpiredTokenException, __BaseException>
  );
}
export declare class MalformedPolicyDocumentException extends __BaseException {
  readonly name: "MalformedPolicyDocumentException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<
      MalformedPolicyDocumentException,
      __BaseException
    >
  );
}
export declare class PackedPolicyTooLargeException extends __BaseException {
  readonly name: "PackedPolicyTooLargeException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<PackedPolicyTooLargeException, __BaseException>
  );
}
export declare class RegionDisabledException extends __BaseException {
  readonly name: "RegionDisabledException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<RegionDisabledException, __BaseException>
  );
}
export interface AssumeRoleWithSAMLRequest {
  RoleArn: string | undefined;
  PrincipalArn: string | undefined;
  SAMLAssertion: string | undefined;
  PolicyArns?: PolicyDescriptorType[] | undefined;
  Policy?: string | undefined;
  DurationSeconds?: number | undefined;
}
export interface AssumeRoleWithSAMLResponse {
  Credentials?: Credentials | undefined;
  AssumedRoleUser?: AssumedRoleUser | undefined;
  PackedPolicySize?: number | undefined;
  Subject?: string | undefined;
  SubjectType?: string | undefined;
  Issuer?: string | undefined;
  Audience?: string | undefined;
  NameQualifier?: string | undefined;
  SourceIdentity?: string | undefined;
}
export declare class IDPRejectedClaimException extends __BaseException {
  readonly name: "IDPRejectedClaimException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<IDPRejectedClaimException, __BaseException>
  );
}
export declare class InvalidIdentityTokenException extends __BaseException {
  readonly name: "InvalidIdentityTokenException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<InvalidIdentityTokenException, __BaseException>
  );
}
export interface AssumeRoleWithWebIdentityRequest {
  RoleArn: string | undefined;
  RoleSessionName: string | undefined;
  WebIdentityToken: string | undefined;
  ProviderId?: string | undefined;
  PolicyArns?: PolicyDescriptorType[] | undefined;
  Policy?: string | undefined;
  DurationSeconds?: number | undefined;
}
export interface AssumeRoleWithWebIdentityResponse {
  Credentials?: Credentials | undefined;
  SubjectFromWebIdentityToken?: string | undefined;
  AssumedRoleUser?: AssumedRoleUser | undefined;
  PackedPolicySize?: number | undefined;
  Provider?: string | undefined;
  Audience?: string | undefined;
  SourceIdentity?: string | undefined;
}
export declare class IDPCommunicationErrorException extends __BaseException {
  readonly name: "IDPCommunicationErrorException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<IDPCommunicationErrorException, __BaseException>
  );
}
export interface AssumeRootRequest {
  TargetPrincipal: string | undefined;
  TaskPolicyArn: PolicyDescriptorType | undefined;
  DurationSeconds?: number | undefined;
}
export interface AssumeRootResponse {
  Credentials?: Credentials | undefined;
  SourceIdentity?: string | undefined;
}
export interface DecodeAuthorizationMessageRequest {
  EncodedMessage: string | undefined;
}
export interface DecodeAuthorizationMessageResponse {
  DecodedMessage?: string | undefined;
}
export declare class InvalidAuthorizationMessageException extends __BaseException {
  readonly name: "InvalidAuthorizationMessageException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<
      InvalidAuthorizationMessageException,
      __BaseException
    >
  );
}
export interface GetAccessKeyInfoRequest {
  AccessKeyId: string | undefined;
}
export interface GetAccessKeyInfoResponse {
  Account?: string | undefined;
}
export interface GetCallerIdentityRequest {}
export interface GetCallerIdentityResponse {
  UserId?: string | undefined;
  Account?: string | undefined;
  Arn?: string | undefined;
}
export interface GetFederationTokenRequest {
  Name: string | undefined;
  Policy?: string | undefined;
  PolicyArns?: PolicyDescriptorType[] | undefined;
  DurationSeconds?: number | undefined;
  Tags?: Tag[] | undefined;
}
export interface FederatedUser {
  FederatedUserId: string | undefined;
  Arn: string | undefined;
}
export interface GetFederationTokenResponse {
  Credentials?: Credentials | undefined;
  FederatedUser?: FederatedUser | undefined;
  PackedPolicySize?: number | undefined;
}
export interface GetSessionTokenRequest {
  DurationSeconds?: number | undefined;
  SerialNumber?: string | undefined;
  TokenCode?: string | undefined;
}
export interface GetSessionTokenResponse {
  Credentials?: Credentials | undefined;
}
export declare const CredentialsFilterSensitiveLog: (obj: Credentials) => any;
export declare const AssumeRoleResponseFilterSensitiveLog: (
  obj: AssumeRoleResponse
) => any;
export declare const AssumeRoleWithSAMLRequestFilterSensitiveLog: (
  obj: AssumeRoleWithSAMLRequest
) => any;
export declare const AssumeRoleWithSAMLResponseFilterSensitiveLog: (
  obj: AssumeRoleWithSAMLResponse
) => any;
export declare const AssumeRoleWithWebIdentityRequestFilterSensitiveLog: (
  obj: AssumeRoleWithWebIdentityRequest
) => any;
export declare const AssumeRoleWithWebIdentityResponseFilterSensitiveLog: (
  obj: AssumeRoleWithWebIdentityResponse
) => any;
export declare const AssumeRootResponseFilterSensitiveLog: (
  obj: AssumeRootResponse
) => any;
export declare const GetFederationTokenResponseFilterSensitiveLog: (
  obj: GetFederationTokenResponse
) => any;
export declare const GetSessionTokenResponseFilterSensitiveLog: (
  obj: GetSessionTokenResponse
) => any;
