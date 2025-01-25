const OAuth2Strategy = require('passport-oauth2');

const defaultOptions = {
  authorizationURL: 'https://auth.atlassian.com/authorize',
  tokenURL: 'https://auth.atlassian.com/oauth/token',
  profileURL: 'https://api.atlassian.com/me',
  accessibleResourcesURL: 'https://api.atlassian.com/oauth/token/accessible-resources',
};

const defaultScope = ['read:me'];

class Strategy extends OAuth2Strategy {
  /**
   * `Strategy` constructor.
   *
   * Atlassian strategy authenticates requests using the OAuth 2.0 (3LO) protocol.
   *
   * Applications must supply a `verify` callback which accepts an `accessToken`,
   * `refreshToken` and service-specific `profile`, and then calls the `cb`
   * callback supplying a `user`, which should be set to `false` if thed
   * credentials are not valid.  If an exception occured, `err` should be set.
   *
   * Options:
   *   - `clientID`      your Atlassian application's App ID
   *   - `clientSecret`  your Atlassian application's App Secret
   *   - `callbackURL`   URL to which Atlassian will redirect the user after granting authorization
   *   - `scope`         API scopes that enable access to certain resources
   *
   * Examples:
   *
   * passport.use(new AtlassianStrategy({
   *   clientID: '123-456-789',
   *   clientSecret: 'secret',
   *   callbackURL: 'https://www.example.net/auth/atlassian/callback',
   *   scope: 'offline_access read:jira-user'
   * }, function(accessToken, refreshToken, profile, cb) {
   *   User.findOrCreate(..., function (err, user) {
   *     cb(err, user);
   *   });
   * }));
   *
   * @constructor
   * @param {object} options
   * @param {function} verify
   * @access public
   */
  constructor(options = {}, verify) {
    if (!options.scope) {
      throw new TypeError('AtlassianOAuth2 requires a scope option');
    }

    options = {
      ...defaultOptions,
      ...options,
    };

    super(options, verify);
    this.options = options;
    this.name = 'atlassian';
    this._oauth2.useAuthorizationHeaderforGET(true);
    this._setupDefaultScope();
  }

  /**
   * Return extra Atlassian OAuth2 specific parameters to be included in the authorization
   * request.
   *
   * @return {object}
   * @access protected
   */
  authorizationParams() {
    return {
      audience: 'api.atlassian.com',
      prompt: 'consent',
    };
  }

  /**
   * Return normalized user profile
   *
   * @param {string} accessToken
   * @param {function} done
   * @access protected
   */
  userProfile(accessToken, done) {
    this._oauth2.get(this.options.profileURL, accessToken, (err, body) => {
      if (err) return done(err);

      let profile;

      try {
        const json = JSON.parse(body);
        profile = this._convertProfileFields(json);
        profile.provider = 'atlassian';
        profile._raw = body;
        profile._json = json;
      } catch (e) {
        return done(new Error('Failed to parse user profile'));
      }

      // Retreive list of resources user has access to
      this._oauth2.get(this.options.accessibleResourcesURL, accessToken, (errAr, bodyAr) => {
        if (errAr) return done(errAr);

        try {
          profile.accessibleResources = JSON.parse(bodyAr);
          done(null, profile);
        } catch (e) {
          return done(new Error('Failed to parse accessible resources'));
        }
      });
    });
  }

  _setupDefaultScope() {
    if (this._skipUserProfile) {
      return;
    }

    let scope = this._scope || [];

    if (!Array.isArray(scope)) {
      scope = scope.split(this._scopeSeparator);
    }

    this._scope = Array.from(new Set([...scope, ...defaultScope]));
  }

  _convertProfileFields(json) {
    return {
      id: json.account_id,
      displayName: json.name,
      email: json.email,
      photo: json.picture,
    };
  }
}

module.exports = Strategy;
