"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// packages/third-party-dts-extractor/src/ThirdPartyExtractor.ts
var _findpkg = require('find-pkg'); var _findpkg2 = _interopRequireDefault(_findpkg);
var _fsextra = require('fs-extra'); var _fsextra2 = _interopRequireDefault(_fsextra);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _resolve = require('resolve'); var _resolve2 = _interopRequireDefault(_resolve);

// packages/third-party-dts-extractor/src/utils.ts
function getTypedName(name) {
  return `@types/${name.replace(/^@/, "").replace("/", "__")}`;
}

// packages/third-party-dts-extractor/src/ThirdPartyExtractor.ts
var ignoredPkgs = ["typescript"];
var isNodeUtils = (pkgJsonPath, importPath) => {
  return pkgJsonPath === importPath;
};
var ThirdPartyExtractor = class {
  constructor(destDir, context = process.cwd()) {
    this.destDir = destDir;
    this.context = context;
    this.pkgs = {};
    this.pattern = /(from|import\()\s*['"]([^'"]+)['"]/g;
  }
  addPkgs(pkgName, dirName) {
    if (ignoredPkgs.includes(pkgName)) {
      return;
    }
    this.pkgs[pkgName] = dirName;
  }
  inferPkgDir(importPath) {
    if (this.pkgs[importPath]) {
      return;
    }
    if (_path2.default.isAbsolute(importPath)) {
      return;
    }
    if (importPath.startsWith(".")) {
      return;
    }
    try {
      const importEntry = __require.resolve(importPath, {
        paths: [this.context]
      });
      if (isNodeUtils(importEntry, importPath)) {
        return;
      }
      const pkgJsonPath = _findpkg2.default.sync(importEntry);
      const dir = _path2.default.dirname(pkgJsonPath);
      const pkg = JSON.parse(_fsextra2.default.readFileSync(pkgJsonPath, "utf-8"));
      const types = pkg.types || pkg.typings;
      if (dir === this.context) {
        return;
      }
      if (types) {
        this.addPkgs(pkg.name, dir);
        return dir;
      } else if (_fsextra2.default.existsSync(_path2.default.resolve(dir, "index.d.ts"))) {
        this.addPkgs(pkg.name, dir);
        return dir;
      } else {
        const typedPkgName = getTypedName(pkg.name);
        const typedPkgJsonPath = _findpkg2.default.sync(
          _resolve2.default.sync(`${typedPkgName}/package.json`, {
            basedir: this.context
          })
        );
        const typedDir = _path2.default.dirname(typedPkgJsonPath);
        _fsextra2.default.readFileSync(typedPkgJsonPath, "utf-8");
        this.addPkgs(typedPkgName, typedDir);
        return typedDir;
      }
    } catch (_err) {
      return;
    }
  }
  collectTypeImports(str) {
    const { pattern } = this;
    let match;
    const imports = /* @__PURE__ */ new Set();
    while ((match = pattern.exec(str)) !== null) {
      imports.add(match[2]);
    }
    return [...imports];
  }
  collectPkgs(str) {
    const imports = this.collectTypeImports(str);
    imports.forEach((importPath) => {
      this.inferPkgDir(importPath);
    });
  }
  async copyDts() {
    if (!Object.keys(this.pkgs).length) {
      return;
    }
    const ensureDir = async (dir) => {
      try {
        await _fsextra2.default.mkdir(dir, { recursive: true });
      } catch (err) {
        if (err.code !== "EEXIST")
          throw err;
      }
    };
    const copyFiles = async (srcDir, destDir) => {
      if (srcDir.startsWith(".")) {
        return;
      }
      const files = await _fsextra2.default.readdir(srcDir);
      await Promise.all(
        files.map(async (file) => {
          const fullPath = _path2.default.join(srcDir, file);
          if (["node_modules", "bin"].includes(file)) {
            return;
          }
          const stats = await _fsextra2.default.lstat(fullPath);
          if (stats.isDirectory()) {
            const destFullPath = _path2.default.join(destDir, file);
            await ensureDir(destFullPath);
            await copyFiles(fullPath, destFullPath);
          } else {
            if (fullPath.endsWith(".d.ts") || fullPath.endsWith("package.json")) {
              await _fsextra2.default.copyFile(fullPath, _path2.default.join(destDir, file));
            }
          }
        })
      );
    };
    await ensureDir(this.destDir);
    await Promise.all(
      Object.keys(this.pkgs).map(async (pkgName) => {
        const pkgDir = this.pkgs[pkgName];
        const destDir = _path2.default.resolve(this.destDir, pkgName);
        await ensureDir(destDir);
        await copyFiles(pkgDir, destDir);
      })
    );
  }
};


exports.ThirdPartyExtractor = ThirdPartyExtractor;
