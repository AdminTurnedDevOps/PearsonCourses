# Node SAML

[![Build Status](https://github.com/node-saml/node-saml/workflows/Build%20Status/badge.svg)](https://github.com/node-saml/node-saml/actions?query=workflow%3ABuild%Status)
[![npm version](https://badge.fury.io/js/@node-saml%2Fnode-saml.svg)](https://badge.fury.io/js/@node-saml%2Fnode-saml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![codecov](https://codecov.io/gh/node-saml/node-saml/branch/master/graph/badge.svg?token=PQWCMBWBFB)](https://codecov.io/gh/node-saml/node-saml)
[![DeepScan grade](https://deepscan.io/api/teams/17569/projects/20921/branches/586237/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=17569&pid=20921&bid=586237)

[![NPM](https://nodei.co/npm/@node-saml/node-saml.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@node-saml/node-saml)

This is a [SAML 2.0](http://en.wikipedia.org/wiki/SAML_2.0) authentication provider for Node.js.

## Installation

```shell
npm install @node-saml/node-saml
```

## Usage

The examples utilize the [Feide OpenIdp identity provider](https://openidp.feide.no/). You need an account there to log in with this. You also need to [register your site](https://openidp.feide.no/simplesaml/module.php/metaedit/index.php) as a service provider.

### Configure strategy

The SAML identity provider will redirect you to the URL provided by the `path` configuration.

```javascript
const { SAML } = require("@node-saml/node-saml");

const options = {};
const saml = new SAML(options);
```

#### Config parameter details

- **Core**
- `callbackUrl`: full callbackUrl
- `entryPoint`: identity provider entrypoint (is required to be spec-compliant when the request is signed)
- `issuer`: issuer string to supply to identity provider
- `audience`: expected saml response Audience, defaults to value of Issuer (if `false`, Audience won't be verified)
- `idpCert`: the IDP's public signing certificate used to validate the signatures of the incoming SAML Responses, see [Security and signatures](#security-and-signatures)
- `privateKey`: see [Security and signatures](#security-and-signatures).
- `publicCert`: the service provider's public signing certificate used to embed in AuthnRequest in order for the IDP to validate the signatures of the incoming SAML Request, see [Security and signatures](#security-and-signatures)
- `decryptionPvk`: optional private key that will be used to attempt to decrypt any encrypted assertions that are received
- `signatureAlgorithm`: valid values are 'sha1', 'sha256', or 'sha512'
- `digestAlgorithm`: optionally set the digest algorithm used to provide a digest for the signed data object, valid values are 'sha1' (default), 'sha256', or 'sha512'
- `xmlSignatureTransforms`: optionally set an array of signature transforms to be used in HTTP-POST signatures. By default this is `[ 'http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/2001/10/xml-exc-c14n#' ]`
- **Additional SAML behaviors**
- `additionalParams`: dictionary of additional query params to add to all requests; if an object with this key is passed to `authenticate`, the dictionary of additional query params will be appended to those present on the returned URL, overriding any specified by initialization options' additional parameters (`additionalParams`, `additionalAuthorizeParams`, and `additionalLogoutParams`)
- `additionalAuthorizeParams`: dictionary of additional query params to add to 'authorize' requests
- `identifierFormat`: optional name identifier format to request from identity provider (default: `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`)
- `allowCreate`: grants permission to the identity provider to create a new subject identifier (default: `true`)
- `spNameQualifier`: optionally specifies that the assertion subject's identifier be returned (or created) in the namespace of another service provider, or in the namespace of an affiliation of service providers
- `wantAssertionsSigned`: if true, add `WantAssertionsSigned="true"` to the metadata, to specify that the IdP should always sign the assertions. It is on by default. Note: either the response or the assertion must be signed even if both are turned off.
- `wantAuthnResponseSigned`: if true, require that all incoming authentication response messages be signed at the top level, not just at the assertions. It is on by default. Note: either the response or the assertion must be signed even if both are turned off.
- `acceptedClockSkewMs`: Time in milliseconds of skew that is acceptable between client and server when checking `OnBefore` and `NotOnOrAfter` assertion condition validity timestamps. Setting to `-1` will disable checking these conditions entirely. Default is `0`.
- `maxAssertionAgeMs`: Amount of time after which the framework should consider an assertion expired. If the limit imposed by this variable is stricter than the limit imposed by `NotOnOrAfter`, this limit will be used when determining if an assertion is expired.
- `attributeConsumingServiceIndex`: optional `AttributeConsumingServiceIndex` attribute to add to AuthnRequest to instruct the IDP which attribute set to attach to the response ([link](http://blog.aniljohn.com/2014/01/data-minimization-front-channel-saml-attribute-requests.html))
- `disableRequestedAuthnContext`: if truthy, do not request a specific authentication context.
- `authnContext`: if truthy, name identifier format to request auth context (default: `urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport`); array of values is also supported
- `racComparison`: Requested Authentication Context comparison type. Possible values are 'exact','minimum','maximum','better'. Default is 'exact'.

- `forceAuthn`: if set to true, the initial SAML request from the service provider specifies that the IdP should force re-authentication of the user, even if they possess a valid session.
- `passive`: if set to true, specifies that the IdP must not visibly take control of the user interface and interact with the user.
- `providerName`: optional human-readable name of the requester for use by the presenter's user agent or the identity provider
- `skipRequestCompression`: if set to true, the SAML request from the service provider won't be compressed.
- `authnRequestBinding`: if set to `HTTP-POST`, will request authentication from IDP via HTTP POST binding, otherwise defaults to HTTP Redirect
- `disableRequestAcsUrl`: if truthy, SAML AuthnRequest from the service provider will not include the optional AssertionConsumerServiceURL. Default is falsy so it is automatically included.
- `generateUniqueId`: optional function which will be called to generate unique IDs for SAML requests.
- `scoping`: An optional configuration which implements the functionality [explained in the SAML spec paragraph "3.4.1.2 Element <Scoping>"](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf). The config object is structured as following:
- `signMetadata`: if true, adds a signature to the generated Service Provider metadata. `privateKey` must be set to use this option.

```javascript
{
  idpList: [ // optional
    {
      entries: [ // required
        {
          providerId: 'yourProviderId', // required for each entry
          name: 'yourName', // optional
          loc: 'yourLoc', // optional
        }
      ],
      getComplete: 'URI to your complete IDP list', // optional
    },
  ],
  proxyCount: 2, // optional
  requesterId: 'requesterId', // optional
}
```

- **InResponseTo Validation**
- `validateInResponseTo`:
  - if `"always"`, then InResponseTo will be validated from incoming SAML responses
  - if `"never"`, then InResponseTo won't be validated
  - if `"ifPresent"`, then InResponseTo will only be validated if present in the incoming SAML response
- `requestIdExpirationPeriodMs`: Defines the expiration time when a Request ID generated for a SAML request will not be valid if seen in a SAML response in the `InResponseTo` field. Default is 8 hours.
- `cacheProvider`: Defines the implementation for a cache provider used to store request Ids generated in SAML requests as part of `InResponseTo` validation. Default is a built-in in-memory cache provider. For details see the 'Cache Provider' section.
- **Issuer Validation**
- `idpIssuer`: if provided, then the IdP issuer will be validated for incoming Logout Requests/Responses. For ADFS this looks like `https://acme_tools.windows.net/deadbeef`
- **Passport**
- `passReqToCallback`: if truthy, `req` will be passed as the first argument to the verify callback (default: `false`)
- `name`: Optionally, provide a custom name. (default: `saml`). Useful If you want to instantiate the strategy multiple times with different configurations,
  allowing users to authenticate against multiple different SAML targets from the same site. You'll need to use a unique set of URLs
  for each target, and use this custom name when calling `passport.authenticate()` as well.
- **Logout**
- `logoutUrl`: base address to call with logout requests (default: `entryPoint`)
- `additionalLogoutParams`: dictionary of additional query params to add to 'logout' requests
- `logoutCallbackUrl`: The value with which to populate the `Location` attribute in the `SingleLogoutService` elements in the generated service provider metadata.

- **SAML Authn Request Extensions**
- `samlAuthnRequestExtensions`: Optional, The SAML extension provides a more flexible structure for expressing which combination of Attributes are requested by service providers in comparison to the existing mechanisms, [More about extensions](https://docs.oasis-open.org/security/saml-protoc-req-attr-req/v1.0/saml-protoc-req-attr-req-v1.0.html). There are many possible values for the `samlAuthnRequestExtensions` element. It accepts fully customize [XMLBuilder](https://www.npmjs.com/package/xmlbuilder) type.

```javascript
// Example
samlAuthnRequestExtensions: {
  "md:RequestedAttribute": {
    "@isRequired": "true",
    "@Name": "LastName",
    "@xmlns:md": "urn:oasis:names:tc:SAML:2.0:metadata"
  },
  vetuma: {
    "@xmlns": "urn:vetuma:SAML:2.0:extensions",
    LG: {
      "#text": "sv",
    },
  },
},
```

- **SAML Logout Request Extensions**
- `samlLogoutRequestExtensions`: Optional, The SAML extension provides a more flexible structure for expressing which combination of Attributes are requested by service providers in comparison to the existing mechanisms, [More about extensions](https://docs.oasis-open.org/security/saml-protoc-req-attr-req/v1.0/saml-protoc-req-attr-req-v1.0.html). There are many possible values for the `samlLogoutRequestExtensions` element. It accepts fully customize [XMLBuilder](https://www.npmjs.com/package/xmlbuilder) type.

```javascript
// Example
samlLogoutRequestExtensions: {
  vetuma: {
    "@xmlns": "urn:vetuma:SAML:2.0:extensions",
    LG: {
      "#text": "sv",
    },
  },
},
```

- **SAML metadata Extensions**
- `metadataContactPerson`: Optional, this parameters can be used to include more metadata in the XML generated by `generateServiceProviderMetadata`. There are many possible values for the `metadataContactPerson` element. You can check the type definitions for help.
- `metadataOrganization`: Optional, this parameters can be used to include more metadata in the XML generated by `generateServiceProviderMetadata`. There are many possible values for the `metadataOrganization` element. You can check the type definitions for help.

```javascript
// Example for metadataContactPerson
metadataContactPerson:  [{
  "@contactType": "support",
  "GivenName": "test",
  "EmailAddress": "test@node-saml",
}],
// ContactPerson is an array because there can be multiple ContactPerson fields
```

### generateServiceProviderMetadata( decryptionCert, publicCert )

As a convenience, the strategy object exposes a `generateServiceProviderMetadata` method which will generate a service provider metadata document suitable for supplying to an identity provider.

The `decryptionCert` argument should be a public certificate matching the `decryptionPvk` and is required if the strategy is configured with a `decryptionPvk`.

The `publicCert` argument should be a public certificate matching the `privateKey` and is required if the strategy is configured with a `privateKey`. An array of certificates can be provided to support certificate rotation. When supplying an array of certificates, the first entry in the array should match the current `privateKey`. Additional entries in the array can be used to publish upcoming certificates to IdPs before changing the `privateKey`.

### generateServiceProviderMetadata( params )

The underlying `generateServiceProviderMetadata` function is also exported directly. This is useful if you want to generate metadata without creating a strategy object.

```js
const { generateServiceProviderMetadata } = require("@node-saml/node-saml");

const metadata = generateServiceProviderMetadata({
  issuer: "https://example.com",
  callbackUrl: "https://example.com/callback",
});
```

## Security and signatures

Node-SAML uses the HTTP Redirect Binding for its `AuthnRequest`s (unless overridden with the `authnRequestBinding` parameter), and expects to receive the messages back via the HTTP POST binding.

### Configuration option `signatureAlgorithm`

Authentication requests sent by Node-SAML can be signed using RSA signature with SHA1, SHA256 or SHA512 hashing algorithms.

To select hashing algorithm, use:

```javascript
signatureAlgorithm: 'sha1' // (default, but not recommended anymore these days)
signatureAlgorithm: 'sha256', // (preferred - your IDP should support it, otherwise think about upgrading it)
signatureAlgorithm: 'sha512' // (most secure - check if your IDP supports it)
```

### Configuration option `privateKey`

To sign authentication requests, private key needs to be provide in the PEM format via the `privateKey` configuration property.
Node-SAML is enforcing [RFC7468](https://www.rfc-editor.org/rfc/rfc7468) `stricttextualmsg` format for PEM files.

Add it to strategy options like this:

```javascript
privateKey: fs.readFileSync("./privateKey.pem", "latin1");
```

Example formats for `privateKey` field are,

1. RFC7468 `stricttextualmsg` formatted PEM:

```text
-----BEGIN PRIVATE KEY-----
<private key contents here delimited at 64 characters per row>
-----END PRIVATE KEY-----
```

or

```text
-----BEGIN RSA PRIVATE KEY-----
<private key contents here delimited at 64 characters per row>
-----END RSA PRIVATE KEY-----
```

2. Alternatively, a single-line or multi-line private key in Base64 format.
   See example from tests of [single line private key](test/static/single_line_acme_tools_com.key).

### Configuration option `idpCert`

It is important to validate the signatures of the incoming SAML Responses.
For this, provide the Identity Provider's public X.509 signing certificate(s) or public key(s) in [RFC7468](https://www.rfc-editor.org/rfc/rfc7468) `stricttextualmsg` PEM format
via the `idpCert` configuration property.

> **Important**, provided public key MUST always be in PEM format!

Add it to options like this:

```javascript
idpCert: "MIICizCCAfQCCQCY8tKaMc0BMjANBgkqh ... W==";
```

or

If the Identity Provider has multiple signing certificates or public keys that are valid then the `idpCert` configuration property can be an array.
This can be the case during the rolling from an old key to a new key and responses signed with either key are valid:

```javascript
idpCert: ["MIICizCCAfQCCQCY8tKaMc0BMjANBgkqh ... W==", "MIIEOTCCAyGgAwIBAgIJAKZgJdKdCdL6M ... g="];
```

or

The `idpCert` configuration property can also be a function that receives a callback as argument calls back a possible error and a certificate or array of certificates
or a public key or array of public keys.
This allows the Identity Provider to be polled for valid certificates or public keys and the new certificate or public key can be used if it is changed:

```javascript
idpCert: (callback) => {
  callback(null, polledCertificates);
};
```

Example formats for `idpCert` field are,

1. RFC7468 stricttextualmsg formatted PEM:

```text
-----BEGIN CERTIFICATE-----
<certificate contents here delimited at 64 characters per row>
-----END CERTIFICATE-----
```

or

```text
-----BEGIN PUBLIC KEY-----
<public key contents here delimited at 64 characters per row>
-----END PUBLIC KEY-----
```

2. Alternatively, a single-line or multi-line **certificate** in Base64 format.

### TIP: If the certificate is in the binary DER encoding

Convert it to the necessary PEM encoding like this:

```shell
openssl x509 -inform der -in my_certificate.cer -out my_certificate.pem
```

Some identity providers require that the public signing certificate be embedded in AuthnRequest in order for the IDP to verify the request as well as match the subject DN and confirm if the certificate was signed. This can be achieved by passing service provider's public signing certificate in PEM format via the `publicCert` configuration key. The `publicCert` should be a public certificate matching the privateKey.

```
-----BEGIN CERTIFICATE-----
<X.509 certificate contents here delimited at 64 characters per row>
-----END CERTIFICATE-----

```

Alternativelly a single line X.509 certificate without start/end lines where all rows are joined into single line can be passed:

```javascript
publicCert: "MIICizCCAfQCCQCY8tKaMc0BMjANBgkqh ... W==";
```

## SAML Response Validation - NotBefore and NotOnOrAfter

If the `NotBefore` or the `NotOnOrAfter` attributes are returned in the SAML response, Node-SAML will validate them
against the current time +/- a configurable clock skew value. The default for the skew is 0s. This is to account for
differences between the clock time on the client (Node server with Node-SAML) and the server (Identity provider).

`NotBefore` and `NotOnOrAfter` can be part of either the `SubjectConfirmation` element, or within in the `Assertion/Conditions` element
in the SAML response.

## Subject confirmation validation

When configured (turn `validateInResponseTo` to `always` in the Node-SAML config), the `InResponseTo` attribute will be validated.
Validation will succeed if Node-SAML previously generated a SAML request with an id that matches the value of `InResponseTo`.

Also note that `InResponseTo` is validated as an attribute of the top level `Response` element in the SAML response, as well
as part of the `SubjectConfirmation` element.

Previous request id's generated for SAML requests will eventually expire. This is controlled with the `requestIdExpirationPeriodMs` option
passed into the Node-SAML config. The default is 28,800,000 ms (8 hours). Once expired, a subsequent SAML response
received with an `InResponseTo` equal to the expired id will not validate and an error will be returned.

## Cache Provider

When `InResponseTo` validation is turned on, Node SAML will store generated request ids used in SAML requests to the IdP. The implementation
of how things are stored, checked to see if they exist, and eventually removed is handled by the configured `CacheProvider`.

The default implementation is a simple in-memory cache provider. For multiple server/process scenarios, this will not be sufficient as
the server/process that generated the request id and stored in memory could be different than the server/process handling the
SAML response. The `InResponseTo` could fail in this case erroneously.

To support this scenario you can create a cache provider that implements the following interface:

```typescript
interface CacheProvider {
  // Store an item in the cache, using the specified key and value.
  saveAsync(key: string, value: string): Promise<CacheItem | null>;
  // Returns the value of the specified key in the cache
  getAsync(key: string): Promise<string | null>;
  // Removes an item from the cache if the key exists
  removeAsync(key: string): Promise<string | null>;
}
```

## SLO (single logout)

Node-SAML has built in support for SLO including

- Signature validation
- IdP initiated and SP initiated logouts
- Decryption of encrypted name identifiers in IdP initiated logout
- `Redirect` and `POST` SAML Protocol Bindings

## ChangeLog

See [Changelog](https://github.com/node-saml/node-saml/blob/master/CHANGELOG.md)

## FAQ

## Node Support Policy

We only support [Long-Term Support](https://github.com/nodejs/Release) versions of Node.

We specifically limit our support to LTS versions of Node, not because this package won't work on other versions, but because we have a limited amount of time, and supporting LTS offers the greatest return on that investment.

It's possible this package will work correctly on newer versions of Node. It may even be possible to use this package on older versions of Node, though that's more unlikely as we'll make every effort to take advantage of features available in the oldest LTS version we support.

As each Node LTS version reaches its end-of-life we will remove that version from the `node` `engines` property of our package's `package.json` file. Removing a Node version is considered a breaking change and will entail the publishing of a new major version of this package. We will not accept any requests to support an end-of-life version of Node. Any merge requests or issues supporting an end-of-life version of Node will be closed.

We will accept code that allows this package to run on newer, non-LTS, versions of Node.
