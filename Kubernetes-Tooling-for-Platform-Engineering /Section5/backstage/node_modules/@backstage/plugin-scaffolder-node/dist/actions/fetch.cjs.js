'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var errors = require('@backstage/errors');
var fs = require('fs-extra');
var path = require('path');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);
var path__default = /*#__PURE__*/_interopDefaultCompat(path);

async function fetchContents(options) {
  const {
    reader,
    integrations,
    baseUrl,
    fetchUrl = ".",
    outputPath,
    token
  } = options;
  const fetchUrlIsAbsolute = isFetchUrlAbsolute(fetchUrl);
  if (!fetchUrlIsAbsolute && baseUrl?.startsWith("file://")) {
    const basePath = baseUrl.slice("file://".length);
    const srcDir = backendPluginApi.resolveSafeChildPath(path__default.default.dirname(basePath), fetchUrl);
    await fs__default.default.copy(srcDir, outputPath);
  } else {
    const readUrl = getReadUrl(fetchUrl, baseUrl, integrations);
    const res = await reader.readTree(readUrl, { token });
    await fs__default.default.ensureDir(outputPath);
    await res.dir({ targetDir: outputPath });
  }
}
async function fetchFile(options) {
  const {
    reader,
    integrations,
    baseUrl,
    fetchUrl = ".",
    outputPath,
    token
  } = options;
  const fetchUrlIsAbsolute = isFetchUrlAbsolute(fetchUrl);
  if (!fetchUrlIsAbsolute && baseUrl?.startsWith("file://")) {
    const basePath = baseUrl.slice("file://".length);
    const src = backendPluginApi.resolveSafeChildPath(path__default.default.dirname(basePath), fetchUrl);
    await fs__default.default.copyFile(src, outputPath);
  } else {
    const readUrl = getReadUrl(fetchUrl, baseUrl, integrations);
    const res = await reader.readUrl(readUrl, { token });
    await fs__default.default.ensureDir(path__default.default.dirname(outputPath));
    const buffer = await res.buffer();
    await fs__default.default.outputFile(outputPath, buffer);
  }
}
function isFetchUrlAbsolute(fetchUrl) {
  let fetchUrlIsAbsolute = false;
  try {
    new URL(fetchUrl);
    fetchUrlIsAbsolute = true;
  } catch {
  }
  return fetchUrlIsAbsolute;
}
function getReadUrl(fetchUrl, baseUrl, integrations) {
  if (isFetchUrlAbsolute(fetchUrl)) {
    return fetchUrl;
  } else if (baseUrl) {
    const integration = integrations.byUrl(baseUrl);
    if (!integration) {
      throw new errors.InputError(`No integration found for location ${baseUrl}`);
    }
    return integration.resolveUrl({
      url: fetchUrl,
      base: baseUrl
    });
  }
  throw new errors.InputError(
    `Failed to fetch, template location could not be determined and the fetch URL is relative, ${fetchUrl}`
  );
}

exports.fetchContents = fetchContents;
exports.fetchFile = fetchFile;
//# sourceMappingURL=fetch.cjs.js.map
