'use strict';

var catalogModel = require('@backstage/catalog-model');
var mime = require('mime-types');
var path = require('path');
var createLimiter = require('p-limit');
var recursiveReadDir = require('recursive-readdir');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var mime__default = /*#__PURE__*/_interopDefaultCompat(mime);
var path__default = /*#__PURE__*/_interopDefaultCompat(path);
var createLimiter__default = /*#__PURE__*/_interopDefaultCompat(createLimiter);
var recursiveReadDir__default = /*#__PURE__*/_interopDefaultCompat(recursiveReadDir);

const getContentTypeForExtension = (ext) => {
  const defaultContentType = "text/plain; charset=utf-8";
  const excludedTypes = [
    "text/html",
    "text/xml",
    "image/svg+xml",
    "text/xsl",
    "application/vnd.wap.xhtml+xml",
    "multipart/x-mixed-replace",
    "text/rdf",
    "application/mathml+xml",
    "application/octet-stream",
    "application/rdf+xml",
    "application/xhtml+xml",
    "application/xml",
    "text/cache-manifest",
    "text/vtt"
  ];
  if (ext.match(
    /htm|xml|svg|appcache|manifest|mathml|owl|rdf|rng|vtt|xht|xsd|xsl/i
  )) {
    return defaultContentType;
  }
  const contentType = mime__default.default.lookup(ext);
  if (contentType && excludedTypes.includes(contentType)) {
    return defaultContentType;
  }
  return mime__default.default.contentType(ext) || defaultContentType;
};
const getHeadersForFileExtension = (fileExtension) => {
  return {
    "Content-Type": getContentTypeForExtension(fileExtension)
  };
};
const getFileTreeRecursively = async (rootDirPath) => {
  const fileList = await recursiveReadDir__default.default(rootDirPath).catch((error) => {
    throw new Error(`Failed to read template directory: ${error.message}`);
  });
  return fileList;
};
const lowerCaseEntityTriplet = (posixPath) => {
  const [namespace, kind, name, ...rest] = posixPath.split(path__default.default.posix.sep);
  const lowerNamespace = namespace.toLowerCase();
  const lowerKind = kind.toLowerCase();
  const lowerName = name.toLowerCase();
  return [lowerNamespace, lowerKind, lowerName, ...rest].join(path__default.default.posix.sep);
};
const lowerCaseEntityTripletInStoragePath = (originalPath) => {
  let posixPath = originalPath;
  if (originalPath.includes(path__default.default.win32.sep)) {
    posixPath = originalPath.split(path__default.default.win32.sep).join(path__default.default.posix.sep);
  }
  const parts = posixPath.split(path__default.default.posix.sep);
  if (parts[0] === "") {
    parts.shift();
  }
  if (parts.length <= 3) {
    throw new Error(
      `Encountered file unmanaged by TechDocs ${originalPath}. Skipping.`
    );
  }
  return lowerCaseEntityTriplet(parts.join(path__default.default.posix.sep));
};
const normalizeExternalStorageRootPath = (posixPath) => {
  let normalizedPath = posixPath;
  if (posixPath.startsWith(path__default.default.posix.sep)) {
    normalizedPath = posixPath.slice(1);
  }
  if (normalizedPath.endsWith(path__default.default.posix.sep)) {
    normalizedPath = normalizedPath.slice(0, normalizedPath.length - 1);
  }
  return normalizedPath;
};
const getStaleFiles = (newFiles, oldFiles) => {
  const staleFiles = new Set(oldFiles);
  const removedParentDirs = /* @__PURE__ */ new Set();
  newFiles.forEach((newFile) => {
    staleFiles.delete(newFile);
    let parentDir = newFile.substring(0, newFile.lastIndexOf("/"));
    while (!removedParentDirs.has(parentDir) && parentDir.length >= newFile.indexOf("/")) {
      staleFiles.delete(parentDir);
      removedParentDirs.add(parentDir);
      parentDir = parentDir.substring(0, parentDir.lastIndexOf("/"));
    }
  });
  return Array.from(staleFiles);
};
const getCloudPathForLocalPath = (entity, localPath = "", useLegacyPathCasing = false, externalStorageRootPath = "") => {
  const relativeFilePathPosix = localPath.split(path__default.default.sep).join(path__default.default.posix.sep);
  const entityRootDir = `${entity.metadata?.namespace ?? catalogModel.DEFAULT_NAMESPACE}/${entity.kind}/${entity.metadata.name}`;
  const relativeFilePathTriplet = `${entityRootDir}/${relativeFilePathPosix}`;
  const destination = useLegacyPathCasing ? relativeFilePathTriplet : lowerCaseEntityTriplet(relativeFilePathTriplet);
  const destinationWithRoot = [
    // The extra filter prevents unintended double slashes and prefixes.
    ...externalStorageRootPath.split(path__default.default.posix.sep).filter((s) => s !== ""),
    destination
  ].join("/");
  return destinationWithRoot;
};
const bulkStorageOperation = async (operation, args, { concurrencyLimit } = { concurrencyLimit: 25 }) => {
  const limiter = createLimiter__default.default(concurrencyLimit);
  await Promise.all(args.map((arg) => limiter(operation, arg)));
};
const isValidContentPath = (bucketRoot, contentPath) => {
  const relativePath = path__default.default.posix.relative(bucketRoot, contentPath);
  if (relativePath === "") {
    return true;
  }
  const outsideBase = relativePath.startsWith("..");
  const differentDrive = path__default.default.posix.isAbsolute(relativePath);
  return !outsideBase && !differentDrive;
};

exports.bulkStorageOperation = bulkStorageOperation;
exports.getCloudPathForLocalPath = getCloudPathForLocalPath;
exports.getFileTreeRecursively = getFileTreeRecursively;
exports.getHeadersForFileExtension = getHeadersForFileExtension;
exports.getStaleFiles = getStaleFiles;
exports.isValidContentPath = isValidContentPath;
exports.lowerCaseEntityTriplet = lowerCaseEntityTriplet;
exports.lowerCaseEntityTripletInStoragePath = lowerCaseEntityTripletInStoragePath;
exports.normalizeExternalStorageRootPath = normalizeExternalStorageRootPath;
//# sourceMappingURL=helpers.cjs.js.map
