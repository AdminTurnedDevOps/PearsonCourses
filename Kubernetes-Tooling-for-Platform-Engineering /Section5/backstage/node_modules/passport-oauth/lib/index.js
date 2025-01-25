/**
 * Module dependencies.
 */
var OAuthStrategy = require('passport-oauth1')
  , OAuth2Strategy = require('passport-oauth2')
  , InternalOAuthError = require('passport-oauth1').InternalOAuthError;


/**
 * Export constructors.
 */
exports.OAuthStrategy = OAuthStrategy;
exports.OAuth2Strategy = OAuth2Strategy;

/**
 * Export errors.
 */
exports.InternalOAuthError = InternalOAuthError;
