/**
 * Module dependencies.
 */
const uid = require("uid2");
const querystring = require("querystring");
const OAuth2Strategy = require("passport-oauth2");
const InternalOAuthError = require("passport-oauth2").InternalOAuthError;

/**
 * @typedef {Object} UniqueOktaStrategyOptions
 * @property {string} audience audience is the Okta Domain, e.g. `https://example.okta.com`,
 * `https://example.oktapreview.com`
 * @property {string | undefined} authServerID authServerID is the authorization server ID. If it is defined, the token
 * URL might be something like `https://example.okta.com/oauth2/authServerID/v1/token`
 * @property {string | undefined} idp idp is the Identity Provider (id). This is an optional field. it's a 20 character
 * alphanumeric string, e.g. `qOp8aaJmCEhvep5Il6ZJ`  (generated example)
 * @property {boolean | undefined} passReqToCallback With this option enabled, `req` will be passed as the first argument to the
 * verify callback.
 * @property {'code'} response_type Set this to 'code'
 */

/**
 * @typedef {UniqueOktaStrategyOptions & Omit<import("passport-oauth2")._StrategyOptionsBase, "authorizationURL" | "tokenURL">} OktaStrategyOptions
 */

/**
 * @extends OAuth2Strategy
 */
class Strategy extends OAuth2Strategy {
  /**
   * @param {OktaStrategyOptions | undefined} options
   * @param {import("passport-oauth2").VerifyFunction | import("passport-oauth2").VerifyFunctionWithRequest} verify
   */
  constructor(options, verify) {
    const baseUrl = options.authServerID
      ? `${options.audience}/oauth2/${options.authServerID}/v1`
      : `${options.audience}/oauth2/v1`;
    const configuredOptions = {
      ...options,
      authorizationURL: `${baseUrl}/authorize`,
      tokenURL: `${baseUrl}/token`,
      userInfoUrl: `${baseUrl}/userinfo`,
    };

    super(configuredOptions, verify);

    this.name = "okta";
    this._userInfoUrl = configuredOptions.userInfoUrl;
    this._idp = configuredOptions.idp;
    this._state = configuredOptions.state;

    // Authorize Request using Authorization Header
    this._oauth2.getOAuthAccessToken = function (code, params, callback) {
      params = params || {};
      const codeParam =
        params.grant_type === "refresh_token" ? "refresh_token" : "code";
      params[codeParam] = code;
      const post_data = querystring.stringify(params);
      const post_headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic: " +
          new Buffer(this._clientId + ":" + this._clientSecret).toString(
            "base64"
          ),
      };
      this._request(
        "POST",
        this._getAccessTokenUrl(),
        post_headers,
        post_data,
        null,
        function (error, data) {
          if (error) callback(error);
          else {
            let results;
            try {
              // As of http://tools.ietf.org/html/draft-ietf-oauth-v2-07
              // responses should be in JSON
              results = JSON.parse(data);
            } catch (e) {
              // .... However both Facebook + Github currently use rev05 of the spec
              // and neither seem to specify a content-type correctly in their response headers :(
              // clients of these services will suffer a *minor* performance cost of the exception
              // being thrown
              results = querystring.parse(data);
            }
            const access_token = results["access_token"];
            const refresh_token = results["refresh_token"];
            delete results["refresh_token"];
            callback(null, access_token, refresh_token, results); // callback results =-=
          }
        }
      );
    };
  }

  /**
   * Retrieve user profile from Okta.
   * Further references at http://developer.okta.com/docs/api/resources/oidc.html#get-user-information
   *
   * This function constructs a normalized profile, with the following properties:
   *
   *   - `provider`         always set to `okta`
   *   - `id`
   *   - `username`
   *   - `displayName`
   *
   * @param {String} accessToken
   * @param {Function} done
   * @api protected
   */
  userProfile(accessToken, done) {
    const post_headers = { Authorization: "Bearer " + accessToken };

    // noinspection JSAccessibilityCheck
    this._oauth2._request(
      "POST",
      this._userInfoUrl,
      post_headers,
      "",
      null,
      function (err, body) {
        if (err) {
          return done(
            new InternalOAuthError("failed to fetch user profile", err)
          );
        }

        try {
          const json = JSON.parse(body);
          done(null, {
            provider: "tsokta",
            id: json.sub,
            displayName: json.name,
            username: json.preferred_username,
            name: {
              fullName: json.name,
              familyName: json.family_name,
              givenName: json.given_name,
            },
            emails: [{ value: json.email }],
            _raw: body,
            _json: json,
          });
        } catch (e) {
          done(e);
        }
      }
    );
  }

  /**
   * Return extra Okta-specific parameters to be included in the authorization
   * request.
   *
   * @param {Object} option
   * @return {Object}
   * @api protected
   */
  authorizationParams(option) {
    const params = {};
    if (this._state) {
      params.state = true;
      params.nonce = uid(24);
    }
    if (this._idp) {
      params.idp = this._idp;
    }
    return params;
  }
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
