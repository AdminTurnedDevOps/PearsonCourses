'use strict';

var fs = require('fs-extra');
var yaml = require('js-yaml');
var helpers = require('./helpers.cjs.js');
var errors = require('@backstage/errors');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);
var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const patchMkdocsFile = async (mkdocsYmlPath, logger, updateAction) => {
  let didEdit = false;
  let mkdocsYmlFileString;
  try {
    mkdocsYmlFileString = await fs__default.default.readFile(mkdocsYmlPath, "utf8");
  } catch (error) {
    errors.assertError(error);
    logger.warn(
      `Could not read MkDocs YAML config file ${mkdocsYmlPath} before running the generator: ${error.message}`
    );
    return;
  }
  let mkdocsYml;
  try {
    mkdocsYml = yaml__default.default.load(mkdocsYmlFileString, { schema: helpers.MKDOCS_SCHEMA });
    if (typeof mkdocsYml === "string" || typeof mkdocsYml === "undefined") {
      throw new Error("Bad YAML format.");
    }
  } catch (error) {
    errors.assertError(error);
    logger.warn(
      `Error in parsing YAML at ${mkdocsYmlPath} before running the generator. ${error.message}`
    );
    return;
  }
  didEdit = updateAction(mkdocsYml);
  try {
    if (didEdit) {
      await fs__default.default.writeFile(
        mkdocsYmlPath,
        yaml__default.default.dump(mkdocsYml, { schema: helpers.MKDOCS_SCHEMA }),
        "utf8"
      );
    }
  } catch (error) {
    errors.assertError(error);
    logger.warn(
      `Could not write to ${mkdocsYmlPath} after updating it before running the generator. ${error.message}`
    );
    return;
  }
};
const patchMkdocsYmlPreBuild = async (mkdocsYmlPath, logger, parsedLocationAnnotation, scmIntegrations) => {
  await patchMkdocsFile(mkdocsYmlPath, logger, (mkdocsYml) => {
    if (!("repo_url" in mkdocsYml) || !("edit_uri" in mkdocsYml)) {
      const result = helpers.getRepoUrlFromLocationAnnotation(
        parsedLocationAnnotation,
        scmIntegrations,
        mkdocsYml.docs_dir
      );
      if (result.repo_url || result.edit_uri) {
        mkdocsYml.repo_url = mkdocsYml.repo_url || result.repo_url;
        mkdocsYml.edit_uri = mkdocsYml.edit_uri || result.edit_uri;
        logger.info(
          `Set ${JSON.stringify(
            result
          )}. You can disable this feature by manually setting 'repo_url' or 'edit_uri' according to the MkDocs documentation at https://www.mkdocs.org/user-guide/configuration/#repo_url`
        );
        return true;
      }
    }
    return false;
  });
};
const patchMkdocsYmlWithPlugins = async (mkdocsYmlPath, logger, defaultPlugins = ["techdocs-core"]) => {
  await patchMkdocsFile(mkdocsYmlPath, logger, (mkdocsYml) => {
    if (!("plugins" in mkdocsYml)) {
      mkdocsYml.plugins = defaultPlugins;
      return true;
    }
    let changesMade = false;
    defaultPlugins.forEach((dp) => {
      if (!(mkdocsYml.plugins.includes(dp) || mkdocsYml.plugins.some((p) => p.hasOwnProperty(dp)))) {
        mkdocsYml.plugins = [.../* @__PURE__ */ new Set([...mkdocsYml.plugins, dp])];
        changesMade = true;
      }
    });
    return changesMade;
  });
};

exports.patchMkdocsYmlPreBuild = patchMkdocsYmlPreBuild;
exports.patchMkdocsYmlWithPlugins = patchMkdocsYmlWithPlugins;
//# sourceMappingURL=mkdocsPatchers.cjs.js.map
