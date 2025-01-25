import { AwsCredentialIdentity } from "@smithy/types";
import { AwsSdkCredentialsFeatures } from "../feature-ids";
export {
  AwsCredentialIdentity,
  AwsCredentialIdentityProvider,
  IdentityProvider,
} from "@smithy/types";
export interface AwsIdentityProperties {
  callerClientConfig?: {
    region(): Promise<string>;
    profile?: string;
  };
}
export type RuntimeConfigIdentityProvider<T> = (
  awsIdentityProperties?: AwsIdentityProperties
) => Promise<T>;
export type RuntimeConfigAwsCredentialIdentityProvider =
  RuntimeConfigIdentityProvider<AwsCredentialIdentity>;
export type AttributedAwsCredentialIdentity = AwsCredentialIdentity & {
  $source?: AwsSdkCredentialsFeatures;
};
