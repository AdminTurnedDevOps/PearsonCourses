const { parse } = require('smtp-address-parser');

module.exports = (value) => {
  try {
    parse(value);
    return true;
  } catch (err) {
    return false;
  }
};
