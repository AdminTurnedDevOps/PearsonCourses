var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// packages/third-party-dts-extractor/src/ThirdPartyExtractor.ts
import findPkg from "find-pkg";
import fs from "fs-extra";
import path from "path";
import resolve from "resolve";

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
    if (path.isAbsolute(importPath)) {
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
      const pkgJsonPath = findPkg.sync(importEntry);
      const dir = path.dirname(pkgJsonPath);
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
      const types = pkg.types || pkg.typings;
      if (dir === this.context) {
        return;
      }
      if (types) {
        this.addPkgs(pkg.name, dir);
        return dir;
      } else if (fs.existsSync(path.resolve(dir, "index.d.ts"))) {
        this.addPkgs(pkg.name, dir);
        return dir;
      } else {
        const typedPkgName = getTypedName(pkg.name);
        const typedPkgJsonPath = findPkg.sync(
          resolve.sync(`${typedPkgName}/package.json`, {
            basedir: this.context
          })
        );
        const typedDir = path.dirname(typedPkgJsonPath);
        fs.readFileSync(typedPkgJsonPath, "utf-8");
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
        await fs.mkdir(dir, { recursive: true });
      } catch (err) {
        if (err.code !== "EEXIST")
          throw err;
      }
    };
    const copyFiles = async (srcDir, destDir) => {
      if (srcDir.startsWith(".")) {
        return;
      }
      const files = await fs.readdir(srcDir);
      await Promise.all(
        files.map(async (file) => {
          const fullPath = path.join(srcDir, file);
          if (["node_modules", "bin"].includes(file)) {
            return;
          }
          const stats = await fs.lstat(fullPath);
          if (stats.isDirectory()) {
            const destFullPath = path.join(destDir, file);
            await ensureDir(destFullPath);
            await copyFiles(fullPath, destFullPath);
          } else {
            if (fullPath.endsWith(".d.ts") || fullPath.endsWith("package.json")) {
              await fs.copyFile(fullPath, path.join(destDir, file));
            }
          }
        })
      );
    };
    await ensureDir(this.destDir);
    await Promise.all(
      Object.keys(this.pkgs).map(async (pkgName) => {
        const pkgDir = this.pkgs[pkgName];
        const destDir = path.resolve(this.destDir, pkgName);
        await ensureDir(destDir);
        await copyFiles(pkgDir, destDir);
      })
    );
  }
};
export {
  ThirdPartyExtractor
};
