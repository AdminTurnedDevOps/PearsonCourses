'use strict';

var git = require('../scm/git.cjs.js');

async function initRepoAndPush(input) {
  const {
    dir,
    remoteUrl,
    auth,
    logger,
    defaultBranch = "master",
    commitMessage = "Initial commit",
    gitAuthorInfo
  } = input;
  const git$1 = git.Git.fromAuth({
    ...auth,
    logger
  });
  await git$1.init({
    dir,
    defaultBranch
  });
  await git$1.add({ dir, filepath: "." });
  const authorInfo = {
    name: gitAuthorInfo?.name ?? "Scaffolder",
    email: gitAuthorInfo?.email ?? "scaffolder@backstage.io"
  };
  const commitHash = await git$1.commit({
    dir,
    message: commitMessage,
    author: authorInfo,
    committer: authorInfo
  });
  await git$1.push({
    dir,
    remote: "origin",
    url: remoteUrl
  });
  return { commitHash };
}
async function commitAndPushRepo(input) {
  const {
    dir,
    auth,
    logger,
    commitMessage,
    gitAuthorInfo,
    branch = "master",
    remoteRef
  } = input;
  const git$1 = git.Git.fromAuth({
    ...auth,
    logger
  });
  await git$1.fetch({ dir });
  await git$1.checkout({ dir, ref: branch });
  await git$1.add({ dir, filepath: "." });
  const authorInfo = {
    name: gitAuthorInfo?.name ?? "Scaffolder",
    email: gitAuthorInfo?.email ?? "scaffolder@backstage.io"
  };
  const commitHash = await git$1.commit({
    dir,
    message: commitMessage,
    author: authorInfo,
    committer: authorInfo
  });
  await git$1.push({
    dir,
    remote: "origin",
    remoteRef: remoteRef ?? `refs/heads/${branch}`
  });
  return { commitHash };
}
async function cloneRepo(options) {
  const { url, dir, auth, logger, ref, depth, noCheckout } = options;
  const git$1 = git.Git.fromAuth({
    ...auth,
    logger
  });
  await git$1.clone({ url, dir, ref, depth, noCheckout });
}
async function createBranch(options) {
  const { dir, ref, auth, logger } = options;
  const git$1 = git.Git.fromAuth({
    ...auth,
    logger
  });
  await git$1.branch({ dir, ref });
}
async function addFiles(options) {
  const { dir, filepath, auth, logger } = options;
  const git$1 = git.Git.fromAuth({
    ...auth,
    logger
  });
  await git$1.add({ dir, filepath });
}
async function commitAndPushBranch(options) {
  const {
    dir,
    auth,
    logger,
    commitMessage,
    gitAuthorInfo,
    branch = "master",
    remoteRef,
    remote = "origin"
  } = options;
  const git$1 = git.Git.fromAuth({
    ...auth,
    logger
  });
  const authorInfo = {
    name: gitAuthorInfo?.name ?? "Scaffolder",
    email: gitAuthorInfo?.email ?? "scaffolder@backstage.io"
  };
  const commitHash = await git$1.commit({
    dir,
    message: commitMessage,
    author: authorInfo,
    committer: authorInfo
  });
  await git$1.push({
    dir,
    remote,
    remoteRef: remoteRef ?? `refs/heads/${branch}`
  });
  return { commitHash };
}

exports.addFiles = addFiles;
exports.cloneRepo = cloneRepo;
exports.commitAndPushBranch = commitAndPushBranch;
exports.commitAndPushRepo = commitAndPushRepo;
exports.createBranch = createBranch;
exports.initRepoAndPush = initRepoAndPush;
//# sourceMappingURL=gitHelpers.cjs.js.map
