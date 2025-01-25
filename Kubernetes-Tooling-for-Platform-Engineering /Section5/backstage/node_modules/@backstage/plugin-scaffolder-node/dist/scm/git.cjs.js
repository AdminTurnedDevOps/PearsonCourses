'use strict';

var git = require('isomorphic-git');
var http = require('isomorphic-git/http/node');
var fs = require('fs-extra');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var git__default = /*#__PURE__*/_interopDefaultCompat(git);
var http__default = /*#__PURE__*/_interopDefaultCompat(http);
var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);

function isAuthCallbackOptions(options) {
  return "onAuth" in options;
}
class Git {
  constructor(config) {
    this.config = config;
    this.onAuth = config.onAuth;
    this.headers = {
      "user-agent": "git/@isomorphic-git",
      ...config.token ? { Authorization: `Bearer ${config.token}` } : {}
    };
  }
  headers;
  async add(options) {
    const { dir, filepath } = options;
    this.config.logger?.info(`Adding file {dir=${dir},filepath=${filepath}}`);
    return git__default.default.add({ fs: fs__default.default, dir, filepath });
  }
  async addRemote(options) {
    const { dir, url, remote, force } = options;
    this.config.logger?.info(
      `Creating new remote {dir=${dir},remote=${remote},url=${url}}`
    );
    return git__default.default.addRemote({ fs: fs__default.default, dir, remote, url, force });
  }
  async deleteRemote(options) {
    const { dir, remote } = options;
    this.config.logger?.info(`Deleting remote {dir=${dir},remote=${remote}}`);
    return git__default.default.deleteRemote({ fs: fs__default.default, dir, remote });
  }
  async checkout(options) {
    const { dir, ref } = options;
    this.config.logger?.info(`Checking out branch {dir=${dir},ref=${ref}}`);
    return git__default.default.checkout({ fs: fs__default.default, dir, ref });
  }
  async branch(options) {
    const { dir, ref } = options;
    this.config.logger?.info(`Creating branch {dir=${dir},ref=${ref}`);
    return git__default.default.branch({ fs: fs__default.default, dir, ref });
  }
  async commit(options) {
    const { dir, message, author, committer } = options;
    this.config.logger?.info(
      `Committing file to repo {dir=${dir},message=${message}}`
    );
    return git__default.default.commit({ fs: fs__default.default, dir, message, author, committer });
  }
  /** https://isomorphic-git.org/docs/en/clone */
  async clone(options) {
    const { url, dir, ref, depth, noCheckout } = options;
    this.config.logger?.info(`Cloning repo {dir=${dir},url=${url}}`);
    try {
      return await git__default.default.clone({
        fs: fs__default.default,
        http: http__default.default,
        url,
        dir,
        ref,
        singleBranch: true,
        depth: depth ?? 1,
        noCheckout,
        onProgress: this.onProgressHandler(),
        headers: this.headers,
        onAuth: this.onAuth
      });
    } catch (ex) {
      this.config.logger?.error(`Failed to clone repo {dir=${dir},url=${url}}`);
      if (ex.data) {
        throw new Error(`${ex.message} {data=${JSON.stringify(ex.data)}}`);
      }
      throw ex;
    }
  }
  /** https://isomorphic-git.org/docs/en/currentBranch */
  async currentBranch(options) {
    const { dir, fullName = false } = options;
    return git__default.default.currentBranch({ fs: fs__default.default, dir, fullname: fullName });
  }
  /** https://isomorphic-git.org/docs/en/fetch */
  async fetch(options) {
    const { dir, remote = "origin", tags = false } = options;
    this.config.logger?.info(
      `Fetching remote=${remote} for repository {dir=${dir}}`
    );
    try {
      await git__default.default.fetch({
        fs: fs__default.default,
        http: http__default.default,
        dir,
        remote,
        tags,
        onProgress: this.onProgressHandler(),
        headers: this.headers,
        onAuth: this.onAuth
      });
    } catch (ex) {
      this.config.logger?.error(
        `Failed to fetch repo {dir=${dir},remote=${remote}}`
      );
      if (ex.data) {
        throw new Error(`${ex.message} {data=${JSON.stringify(ex.data)}}`);
      }
      throw ex;
    }
  }
  async init(options) {
    const { dir, defaultBranch = "master" } = options;
    this.config.logger?.info(`Init git repository {dir=${dir}}`);
    return git__default.default.init({
      fs: fs__default.default,
      dir,
      defaultBranch
    });
  }
  /** https://isomorphic-git.org/docs/en/merge */
  async merge(options) {
    const { dir, theirs, ours, author, committer } = options;
    this.config.logger?.info(
      `Merging branch '${theirs}' into '${ours}' for repository {dir=${dir}}`
    );
    return git__default.default.merge({
      fs: fs__default.default,
      dir,
      ours,
      theirs,
      author,
      committer
    });
  }
  async push(options) {
    const { dir, remote, url, remoteRef, force } = options;
    this.config.logger?.info(
      `Pushing directory to remote {dir=${dir},remote=${remote}}`
    );
    try {
      return await git__default.default.push({
        fs: fs__default.default,
        dir,
        http: http__default.default,
        onProgress: this.onProgressHandler(),
        remoteRef,
        force,
        headers: this.headers,
        remote,
        url,
        onAuth: this.onAuth,
        corsProxy: ""
      });
    } catch (ex) {
      this.config.logger?.error(
        `Failed to push to repo {dir=${dir}, remote=${remote}}`
      );
      if (ex.data) {
        throw new Error(`${ex.message} {data=${JSON.stringify(ex.data)}}`);
      }
      throw ex;
    }
  }
  /** https://isomorphic-git.org/docs/en/readCommit */
  async readCommit(options) {
    const { dir, sha } = options;
    return git__default.default.readCommit({ fs: fs__default.default, dir, oid: sha });
  }
  /** https://isomorphic-git.org/docs/en/remove */
  async remove(options) {
    const { dir, filepath } = options;
    this.config.logger?.info(
      `Removing file from git index {dir=${dir},filepath=${filepath}}`
    );
    return git__default.default.remove({ fs: fs__default.default, dir, filepath });
  }
  /** https://isomorphic-git.org/docs/en/resolveRef */
  async resolveRef(options) {
    const { dir, ref } = options;
    return git__default.default.resolveRef({ fs: fs__default.default, dir, ref });
  }
  /** https://isomorphic-git.org/docs/en/log */
  async log(options) {
    const { dir, ref } = options;
    return git__default.default.log({
      fs: fs__default.default,
      dir,
      ref: ref ?? "HEAD"
    });
  }
  onAuth;
  onProgressHandler = () => {
    let currentPhase = "";
    return (event) => {
      if (currentPhase !== event.phase) {
        currentPhase = event.phase;
        this.config.logger?.info(event.phase);
      }
      const total = event.total ? `${Math.round(event.loaded / event.total * 100)}%` : event.loaded;
      this.config.logger?.debug(`status={${event.phase},total={${total}}}`);
    };
  };
  static fromAuth = (options) => {
    if (isAuthCallbackOptions(options)) {
      const { onAuth, logger: logger2 } = options;
      return new Git({ onAuth, logger: logger2 });
    }
    const { username, password, token, logger } = options;
    return new Git({ onAuth: () => ({ username, password }), token, logger });
  };
}

exports.Git = Git;
//# sourceMappingURL=git.cjs.js.map
