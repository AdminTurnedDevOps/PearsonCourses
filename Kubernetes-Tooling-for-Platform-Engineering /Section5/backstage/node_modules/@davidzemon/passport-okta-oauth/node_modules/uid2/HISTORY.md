# 1.0.0 - August 24, 2021

- Switch from `crypto.pseudoRandomBytes()` back to `crypto.randomBytes()` (Both are equivalent in Node 4.x and above, and `pseudoRandomBytes()` is deprecated in Node 11.x and above)
- Add `engines` field to _package.json_
- Fix character distribution non-uniformity issue by adding back `-` and `_` to generated ids
- Add character distribution test
- Enable strict mode
- Fix JSDoc optional parameter syntax
- Add `Promise`-based API

# 0.0.4 - August 24, 2021

- Add _README.md_
- Add `repository` field to _package.json_
- Add `license` field to _package.json_
- Remove unused var, added param documentation

# 0.0.3 - July 6, 2013

- Add MIT License
- Change string generation to not rely internally on base64 byte buffer encoding
- Change string generation to only use the 62 latin alphanumeric chars
- Switch from `crypto.randomBytes()` to `crypto.pseudoRandomBytes()`

# 0.0.2 - February 25, 2013

- Make unique ids safe for use in URLs (Using 62 latin alphanumeric chars, `-` and `_`)

# 0.0.1 - February 4, 2013

- Initial Release
