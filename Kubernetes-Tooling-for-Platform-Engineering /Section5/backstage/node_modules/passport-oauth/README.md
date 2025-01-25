# passport-oauth

[![Build](https://travis-ci.org/jaredhanson/passport-oauth.png)](http://travis-ci.org/jaredhanson/passport-oauth)
[![Coverage](https://coveralls.io/repos/jaredhanson/passport-oauth/badge.png)](https://coveralls.io/r/jaredhanson/passport-oauth)
[![Dependencies](https://david-dm.org/jaredhanson/passport-oauth.png)](http://david-dm.org/jaredhanson/passport-oauth)


General-purpose OAuth 1.0 and OAuth 2.0 authentication strategies for [Passport](https://github.com/jaredhanson/passport).

This is a meta-module that combines [passport-oauth1](https://github.com/jaredhanson/passport-oauth1)
and [passport-oauth2](https://github.com/jaredhanson/passport-oauth2).  It
exists for backwards-compatibility with the 0.1.x line of OAuth-based
strategies.  As of version 1.x.x, it is encouraged to declare dependencies
on the module that implements specific version of OAuth in use.

## Install

    $ npm install passport-oauth

## Tests

    $ npm install
    $ npm test

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
