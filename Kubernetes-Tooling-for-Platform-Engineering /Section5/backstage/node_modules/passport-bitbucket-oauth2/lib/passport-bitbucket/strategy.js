/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth2')
  , Profile = require('./profile')
  , InternalOAuthError = require('passport-oauth2').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The Bitbucket authentication strategy authenticates requests by delegating to
 * Bitbucket using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      identifies client to Bitbucket
 *   - `clientSecret`   secret used to esablish ownership of the client key
 *   - `callbackURL`      URL to which Bitbucket will redirect the user after granting authorization
 *   - `scope`         array of permission scopes to request.  valid scopes include:
 *                     (see https://confluence.atlassian.com/display/BITBUCKET/OAuth+on+Bitbucket#OAuthonBitbucket-Scopes for more info)
 *
 * Examples:
 *
 *     passport.use(new BitbucketStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/bitbucket/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://bitbucket.org/site/oauth2/authorize';
  options.tokenURL = options.tokenURL || 'https://bitbucket.org/site/oauth2/access_token';
  options.customHeaders = options.customHeaders || {};

  if (!options.customHeaders['User-Agent']) {
    options.customHeaders['User-Agent'] = options.userAgent || 'passport-bitbucket';
    //HACK: requests need to fall back to Basic Auth (for access_token call)
    options.customHeaders.Authorization = 'Basic ' + new Buffer(options.clientID + ':' + options.clientSecret).toString('base64');
  }

  OAuth2Strategy.call(this, options, verify);
  this.name = 'bitbucket';
  this._userProfileURL = options.userProfileURL || 'https://api.bitbucket.org/2.0/user';
  this._oauth2.useAuthorizationHeaderforGET(true);
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from Bitbucket.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `bitbucket`
 *   - `id`               the user's Bitbucket uuid
 *   - `username`         the user's Bitbucket username
 *   - `displayName`      the user's full name
 *   - `profileUrl`       the URL of the profile for the user on Bitbucket
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
    var json;
    
    if (err) {
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }
    
    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }
    
    var profile = Profile.parse(json);
    profile.provider  = 'bitbucket';
    profile._raw = body;
    profile._json = json;
    
    done(null, profile);
  });
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
