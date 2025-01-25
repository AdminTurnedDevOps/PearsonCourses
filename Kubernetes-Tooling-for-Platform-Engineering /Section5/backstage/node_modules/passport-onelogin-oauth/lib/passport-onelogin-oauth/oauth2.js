/**
 * Module dependencies.
 */
var util = require('util')
  , uid = require('uid2')
  , querystring= require('querystring')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;

function Strategy(option, verify) {
  option = option || {};
  option.authorizationURL = option.issuer + "/auth";
  option.tokenURL = option.issuer + "/token";
  option.userInfoUrl = option.issuer + "/me";
  option.nonce = uid(24);

  OAuth2Strategy.call(this, option, verify);

  this.name = 'onelogin';
  this._userInfoUrl = option.userInfoUrl;
  this._idp = option.idp;

  // Authorize Request using Authorization Header
  this._oauth2.useAuthorizationHeaderforGET(true);
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from OneLogin. 
 * Further References at https://developers.onelogin.com/openid-connect/api/user-info
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `onelogin`
 *   - `id`
 *   - `username`
 *   - `displayName`
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */

Strategy.prototype.userProfile = function(accessToken, done) {
  const self = this;

  self._oauth2.get(self._userInfoUrl, accessToken, function(err, body) {
    let json;

    if (err) {
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }

    const profile = {
      id: String(json.sub),
      username: json.preferred_username,
      displayName: json.name,
      emails: [{value: json.email}],
      name: {
        fullName: json.name,
        familyName: json.family_name,
        givenName: json.given_name
      },
    };

    profile._raw = body;
    profile._json = json;

    done(null, profile);
  });
}

/**
 * Return extra OneLogin-specific parameters to be included in the authorization
 * request.
 *
 * @param {Object} option
 * @return {Object}
 * @api protected
 */
Strategy.prototype.authorizationParams = function(option) {
  var params = {};
  if(this._idp) {
    params["idp"] = this._idp;
  }
  return params;
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
