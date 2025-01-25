const formats = require('./formats');

module.exports = (ajv, options = {}) => {
  const allFormats = Object.keys(formats);
  let formatsToInstall = allFormats;

  if (options.formats) {
    if (!Array.isArray(options.formats))
      throw new Error('options.formats must be an array');
    formatsToInstall = options.formats;
  }

  allFormats
    .filter((format) => formatsToInstall.includes(format))
    .forEach((key) => {
      ajv.addFormat(key, formats[key]);
    });

  return ajv;
};
