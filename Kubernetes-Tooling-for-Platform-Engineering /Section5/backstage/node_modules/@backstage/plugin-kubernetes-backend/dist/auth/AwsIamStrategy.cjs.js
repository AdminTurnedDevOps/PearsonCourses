'use strict';

var credentialProviders = require('@aws-sdk/credential-providers');
var signatureV4 = require('@aws-sdk/signature-v4');
var sha256Js = require('@aws-crypto/sha256-js');
var integrationAwsNode = require('@backstage/integration-aws-node');
var pluginKubernetesCommon = require('@backstage/plugin-kubernetes-common');

const defaultRegion = "us-east-1";
class AwsIamStrategy {
  credsManager;
  constructor(opts) {
    this.credsManager = integrationAwsNode.DefaultAwsCredentialsManager.fromConfig(opts.config);
  }
  async getCredential(clusterDetails) {
    return {
      type: "bearer token",
      token: await this.getBearerToken(
        clusterDetails.authMetadata[pluginKubernetesCommon.ANNOTATION_KUBERNETES_AWS_CLUSTER_ID] ?? clusterDetails.name,
        clusterDetails.authMetadata[pluginKubernetesCommon.ANNOTATION_KUBERNETES_AWS_ASSUME_ROLE],
        clusterDetails.authMetadata[pluginKubernetesCommon.ANNOTATION_KUBERNETES_AWS_EXTERNAL_ID]
      )
    };
  }
  validateCluster() {
    return [];
  }
  async getBearerToken(clusterId, assumeRole, externalId) {
    const region = process.env.AWS_REGION ?? defaultRegion;
    let credentials = (await this.credsManager.getCredentialProvider()).sdkCredentialProvider;
    if (assumeRole) {
      credentials = credentialProviders.fromTemporaryCredentials({
        masterCredentials: credentials,
        clientConfig: {
          region
        },
        params: {
          RoleArn: assumeRole,
          ExternalId: externalId
        }
      });
    }
    const signer = new signatureV4.SignatureV4({
      credentials,
      region,
      service: "sts",
      sha256: sha256Js.Sha256
    });
    const request = await signer.presign(
      {
        headers: {
          host: `sts.${region}.amazonaws.com`,
          "x-k8s-aws-id": clusterId
        },
        hostname: `sts.${region}.amazonaws.com`,
        method: "GET",
        path: "/",
        protocol: "https:",
        query: {
          Action: "GetCallerIdentity",
          Version: "2011-06-15"
        }
      },
      { expiresIn: 0 }
    );
    const query = Object.keys(request?.query ?? {}).map(
      (q) => `${encodeURIComponent(q)}=${encodeURIComponent(
        request.query?.[q]
      )}`
    ).join("&");
    const url = `https://${request.hostname}${request.path}?${query}`;
    return `k8s-aws-v1.${Buffer.from(url).toString("base64url")}`;
  }
  presentAuthMetadata(_authMetadata) {
    return {};
  }
}

exports.AwsIamStrategy = AwsIamStrategy;
//# sourceMappingURL=AwsIamStrategy.cjs.js.map
