// for es6 install esm and switch to lines marked es6
// npm i -S esm
// eslint-disable-next-line no-global-assign
// require = require('esm')(module/* , options */) //es6
// module.exports = require('./lib/redact-error') // es6
// user the following for es5
module.exports = require('./dist/axios-cached-dns-resolve') // es5
