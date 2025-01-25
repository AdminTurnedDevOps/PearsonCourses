'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var errors = require('@backstage/errors');
var child_process = require('child_process');
var fs = require('fs-extra');
var gitUrlParse = require('git-url-parse');
var yaml = require('js-yaml');
var path = require('path');
var stream = require('stream');
var helpers = require('../publish/helpers.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);
var gitUrlParse__default = /*#__PURE__*/_interopDefaultCompat(gitUrlParse);
var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);
var path__default = /*#__PURE__*/_interopDefaultCompat(path);

function getGeneratorKey(entity) {
  if (!entity) {
    throw new Error("No entity provided");
  }
  return "techdocs";
}
const runCommand = async ({
  command,
  args,
  options,
  logStream = new stream.PassThrough()
}) => {
  await new Promise((resolve, reject) => {
    const process = child_process.spawn(command, args, options);
    process.stdout.on("data", (stream) => {
      logStream.write(stream);
    });
    process.stderr.on("data", (stream) => {
      logStream.write(stream);
    });
    process.on("error", (error) => {
      return reject(error);
    });
    process.on("close", (code) => {
      if (code !== 0) {
        return reject(`Command ${command} failed, exit code: ${code}`);
      }
      return resolve();
    });
  });
};
const getRepoUrlFromLocationAnnotation = (parsedLocationAnnotation, scmIntegrations, docsFolder = "docs") => {
  const { type: locationType, target } = parsedLocationAnnotation;
  if (locationType === "url") {
    const integration = scmIntegrations.byUrl(target);
    if (integration && ["github", "gitlab", "bitbucketServer", "harness"].includes(
      integration.type
    )) {
      const { filepathtype } = gitUrlParse__default.default(target);
      if (filepathtype === "") {
        return { repo_url: target };
      }
      const sourceFolder = integration.resolveUrl({
        url: `./${docsFolder}`,
        base: target.endsWith("/") ? target : `${target}/`
      });
      return {
        repo_url: target,
        edit_uri: integration.resolveEditUrl(sourceFolder)
      };
    }
  }
  return {};
};
class UnknownTag {
  constructor(data, type) {
    this.data = data;
    this.type = type;
  }
}
const MKDOCS_SCHEMA = yaml.DEFAULT_SCHEMA.extend([
  new yaml.Type("", {
    kind: "scalar",
    multi: true,
    representName: (o) => o.type,
    represent: (o) => o.data ?? "",
    instanceOf: UnknownTag,
    construct: (data, type) => new UnknownTag(data, type)
  }),
  new yaml.Type("tag:", {
    kind: "mapping",
    multi: true,
    representName: (o) => o.type,
    represent: (o) => o.data ?? "",
    instanceOf: UnknownTag,
    construct: (data, type) => new UnknownTag(data, type)
  }),
  new yaml.Type("", {
    kind: "sequence",
    multi: true,
    representName: (o) => o.type,
    represent: (o) => o.data ?? "",
    instanceOf: UnknownTag,
    construct: (data, type) => new UnknownTag(data, type)
  })
]);
const generateMkdocsYml = async (inputDir, siteOptions) => {
  try {
    const mkdocsYmlPath = path__default.default.join(inputDir, "mkdocs.yml");
    const defaultSiteName = siteOptions?.name ?? "Documentation Site";
    const defaultMkdocsContent = {
      site_name: defaultSiteName,
      docs_dir: "docs",
      plugins: ["techdocs-core"]
    };
    await fs__default.default.writeFile(
      mkdocsYmlPath,
      yaml__default.default.dump(defaultMkdocsContent, { schema: MKDOCS_SCHEMA })
    );
  } catch (error) {
    throw new errors.ForwardedError("Could not generate mkdocs.yml file", error);
  }
};
const getMkdocsYml = async (inputDir, options) => {
  let mkdocsYmlPath;
  let mkdocsYmlFileString;
  try {
    if (options?.mkdocsConfigFileName) {
      mkdocsYmlPath = path__default.default.join(inputDir, options.mkdocsConfigFileName);
      if (!await fs__default.default.pathExists(mkdocsYmlPath)) {
        throw new Error(`The specified file ${mkdocsYmlPath} does not exist`);
      }
      mkdocsYmlFileString = await fs__default.default.readFile(mkdocsYmlPath, "utf8");
      return {
        path: mkdocsYmlPath,
        content: mkdocsYmlFileString,
        configIsTemporary: false
      };
    }
    mkdocsYmlPath = path__default.default.join(inputDir, "mkdocs.yaml");
    if (await fs__default.default.pathExists(mkdocsYmlPath)) {
      mkdocsYmlFileString = await fs__default.default.readFile(mkdocsYmlPath, "utf8");
      return {
        path: mkdocsYmlPath,
        content: mkdocsYmlFileString,
        configIsTemporary: false
      };
    }
    mkdocsYmlPath = path__default.default.join(inputDir, "mkdocs.yml");
    if (await fs__default.default.pathExists(mkdocsYmlPath)) {
      mkdocsYmlFileString = await fs__default.default.readFile(mkdocsYmlPath, "utf8");
      return {
        path: mkdocsYmlPath,
        content: mkdocsYmlFileString,
        configIsTemporary: false
      };
    }
    await generateMkdocsYml(inputDir, options);
    mkdocsYmlFileString = await fs__default.default.readFile(mkdocsYmlPath, "utf8");
  } catch (error) {
    throw new errors.ForwardedError(
      "Could not read MkDocs YAML config file mkdocs.yml or mkdocs.yaml or default for validation",
      error
    );
  }
  return {
    path: mkdocsYmlPath,
    content: mkdocsYmlFileString,
    configIsTemporary: true
  };
};
const validateMkdocsYaml = async (inputDir, mkdocsYmlFileString) => {
  const mkdocsYml = yaml__default.default.load(mkdocsYmlFileString, {
    schema: MKDOCS_SCHEMA
  });
  if (mkdocsYml === null || typeof mkdocsYml !== "object") {
    return void 0;
  }
  const parsedMkdocsYml = mkdocsYml;
  if (parsedMkdocsYml.docs_dir && !backendPluginApi.isChildPath(inputDir, path.resolve(inputDir, parsedMkdocsYml.docs_dir))) {
    throw new Error(
      `docs_dir configuration value in mkdocs can't be an absolute directory or start with ../ for security reasons.
       Use relative paths instead which are resolved relative to your mkdocs.yml file location.`
    );
  }
  return parsedMkdocsYml.docs_dir;
};
const patchIndexPreBuild = async ({
  inputDir,
  logger,
  docsDir = "docs"
}) => {
  const docsPath = path__default.default.join(inputDir, docsDir);
  const indexMdPath = path__default.default.join(docsPath, "index.md");
  if (await fs__default.default.pathExists(indexMdPath)) {
    return;
  }
  logger.warn(`${path__default.default.join(docsDir, "index.md")} not found.`);
  const fallbacks = [
    path__default.default.join(docsPath, "README.md"),
    path__default.default.join(docsPath, "readme.md"),
    path__default.default.join(inputDir, "README.md"),
    path__default.default.join(inputDir, "readme.md")
  ];
  await fs__default.default.ensureDir(docsPath);
  for (const filePath of fallbacks) {
    try {
      await fs__default.default.copyFile(filePath, indexMdPath);
      return;
    } catch (error) {
      logger.warn(`${path__default.default.relative(inputDir, filePath)} not found.`);
    }
  }
  logger.warn(
    `Could not find any techdocs' index file. Please make sure at least one of ${[
      indexMdPath,
      ...fallbacks
    ].join(" ")} exists.`
  );
};
const createOrUpdateMetadata = async (techdocsMetadataPath, logger) => {
  const techdocsMetadataDir = techdocsMetadataPath.split(path__default.default.sep).slice(0, -1).join(path__default.default.sep);
  try {
    await fs__default.default.access(techdocsMetadataPath, fs__default.default.constants.F_OK);
  } catch (err) {
    await fs__default.default.writeJson(techdocsMetadataPath, JSON.parse("{}"));
  }
  let json;
  try {
    json = await fs__default.default.readJson(techdocsMetadataPath);
  } catch (err) {
    errors.assertError(err);
    const message = `Invalid JSON at ${techdocsMetadataPath} with error ${err.message}`;
    logger.error(message);
    throw new Error(message);
  }
  json.build_timestamp = Date.now();
  try {
    json.files = (await helpers.getFileTreeRecursively(techdocsMetadataDir)).map(
      (file) => file.replace(`${techdocsMetadataDir}${path__default.default.sep}`, "")
    );
  } catch (err) {
    errors.assertError(err);
    json.files = [];
    logger.warn(`Unable to add files list to metadata: ${err.message}`);
  }
  await fs__default.default.writeJson(techdocsMetadataPath, json);
  return;
};
const storeEtagMetadata = async (techdocsMetadataPath, etag) => {
  const json = await fs__default.default.readJson(techdocsMetadataPath);
  json.etag = etag;
  await fs__default.default.writeJson(techdocsMetadataPath, json);
};

exports.MKDOCS_SCHEMA = MKDOCS_SCHEMA;
exports.createOrUpdateMetadata = createOrUpdateMetadata;
exports.generateMkdocsYml = generateMkdocsYml;
exports.getGeneratorKey = getGeneratorKey;
exports.getMkdocsYml = getMkdocsYml;
exports.getRepoUrlFromLocationAnnotation = getRepoUrlFromLocationAnnotation;
exports.patchIndexPreBuild = patchIndexPreBuild;
exports.runCommand = runCommand;
exports.storeEtagMetadata = storeEtagMetadata;
exports.validateMkdocsYaml = validateMkdocsYaml;
//# sourceMappingURL=helpers.cjs.js.map
