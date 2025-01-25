const { toASCII } = require('punycode');

const hostnameRegex =
  /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;

module.exports = (value) => {
  const hostname = toASCII(value);
  return (
    hostname.replace(/\.$/, '').length <= 253 && hostnameRegex.test(hostname)
  );
};
