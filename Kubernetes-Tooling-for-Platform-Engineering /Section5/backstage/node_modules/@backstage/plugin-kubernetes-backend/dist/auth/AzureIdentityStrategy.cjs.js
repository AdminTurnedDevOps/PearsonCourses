'use strict';

var identity = require('@azure/identity');

const aksScope = "6dae42f8-4368-4678-94ff-3960e28e3630/.default";
class AzureIdentityStrategy {
  constructor(logger, tokenCredential = new identity.DefaultAzureCredential()) {
    this.logger = logger;
    this.tokenCredential = tokenCredential;
  }
  accessToken = { token: "", expiresOnTimestamp: 0 };
  newTokenPromise;
  async getCredential() {
    if (!this.tokenRequiresRefresh()) {
      return { type: "bearer token", token: this.accessToken.token };
    }
    if (!this.newTokenPromise) {
      this.newTokenPromise = this.fetchNewToken();
    }
    return this.newTokenPromise ? { type: "bearer token", token: await this.newTokenPromise } : { type: "anonymous" };
  }
  validateCluster() {
    return [];
  }
  async fetchNewToken() {
    try {
      this.logger.info("Fetching new Azure token for AKS");
      const newAccessToken = await this.tokenCredential.getToken(aksScope, {
        requestOptions: { timeout: 1e4 }
        // 10 seconds
      });
      if (!newAccessToken) {
        throw new Error("AccessToken is null");
      }
      this.accessToken = newAccessToken;
    } catch (err) {
      this.logger.error("Unable to fetch Azure token", err);
      if (this.tokenExpired()) {
        throw err;
      }
    }
    this.newTokenPromise = void 0;
    return this.accessToken.token;
  }
  tokenRequiresRefresh() {
    const expiresOn = this.accessToken.expiresOnTimestamp - 15 * 60 * 1e3;
    return Date.now() >= expiresOn;
  }
  tokenExpired() {
    return Date.now() >= this.accessToken.expiresOnTimestamp;
  }
  presentAuthMetadata(_authMetadata) {
    return {};
  }
}

exports.AzureIdentityStrategy = AzureIdentityStrategy;
//# sourceMappingURL=AzureIdentityStrategy.cjs.js.map
