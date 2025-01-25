'use strict';

const getAuthorizationHeader = (config) => {
  if (config.username && config.appPassword) {
    const buffer = Buffer.from(
      `${config.username}:${config.appPassword}`,
      "utf8"
    );
    return `Basic ${buffer.toString("base64")}`;
  }
  if (config.token) {
    return `Bearer ${config.token}`;
  }
  throw new Error(
    `Authorization has not been provided for Bitbucket Cloud. Please add either username + appPassword to the Integrations config or a user login auth token`
  );
};

exports.getAuthorizationHeader = getAuthorizationHeader;
//# sourceMappingURL=helpers.cjs.js.map
