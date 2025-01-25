# smtp-address-parser

Parse an SMTP (RFC-5321) address.

[![https://nodei.co/npm/smtp-address-parser.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/smtp-address-parser.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/smtp-address-parser)

## Some notes

** Changes in version 1.1.0: **

** Domains are now checked beyond RFC-5321 syntax only **

Domain names must be fully qualified; that is with at least two labels. The top-level domain must have at least two octets.

** Length limitations are now checked **

Total length limit of an address is 986 octets; based on a 1,000 octet SMTP line length.

See <https://tools.ietf.org/html/rfc1035> section 2.3.4. Size limits:

Domain names are limited to 255 octets, when encoded with a length byte before each label, and including the top-level zero length label. So, the effctive limit with interstitial dots is 253 octets.

Labels within a domain name are limited to 63 octets.

The above are limits of the DNS protocol, not any particular implementation.

RFC-5321 section 4.5.3.1. “Size Limits and Minimums” still says:

“To the maximum extent possible, implementation techniques that impose
no limits on the length of these objects should be used.”
