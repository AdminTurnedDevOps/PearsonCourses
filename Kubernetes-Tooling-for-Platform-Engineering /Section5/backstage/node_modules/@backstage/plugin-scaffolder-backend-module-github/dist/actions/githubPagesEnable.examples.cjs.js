'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Enables GitHub Pages for a repository.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages",
          name: "Enable GitHub Pages",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            buildType: "workflow",
            sourceBranch: "main",
            sourcePath: "/",
            token: "gph_YourGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Enables GitHub Pages for a repository with a custom source path.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages-custom-path",
          name: "Enable GitHub Pages with Custom Source Path",
          input: {
            repoUrl: "github.com?repo=customPathRepo&owner=customOwner",
            sourcePath: "/docs",
            token: "gph_YourGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Enables GitHub Pages for a repository using legacy build type.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages-legacy",
          name: "Enable GitHub Pages with Legacy Build Type",
          input: {
            repoUrl: "github.com?repo=legacyRepo&owner=legacyOwner",
            buildType: "legacy",
            token: "gph_YourGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Enables GitHub Pages for a repository with a custom source branch.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages-custom-branch",
          name: "Enable GitHub Pages with Custom Source Branch",
          input: {
            repoUrl: "github.com?repo=customBranchRepo&owner=branchOwner",
            sourceBranch: "develop",
            token: "gph_YourGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Enables GitHub Pages for a repository with full customization.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages-full-custom",
          name: "Enable GitHub Pages with Full Customization",
          input: {
            repoUrl: "github.com?repo=fullCustomRepo&owner=customOwner",
            buildType: "workflow",
            sourceBranch: "main",
            sourcePath: "/docs",
            token: "gph_YourGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Enables GitHub Pages for a repository with minimal configuration.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages-minimal",
          name: "Enable GitHub Pages with Minimal Configuration",
          input: {
            repoUrl: "github.com?repo=minimalRepo&owner=minimalOwner",
            token: "gph_YourGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Enables GitHub Pages for a repository with custom build type and source path.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages-custom-build-path",
          name: "Enable GitHub Pages with Custom Build Type and Source Path",
          input: {
            repoUrl: "github.com?repo=customBuildPathRepo&owner=customOwner",
            buildType: "legacy",
            sourcePath: "/custom-path",
            token: "gph_YourGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Enables GitHub Pages for a repository with custom source branch and path.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages-custom-branch-path",
          name: "Enable GitHub Pages with Custom Source Branch and Path",
          input: {
            repoUrl: "github.com?repo=customBranchPathRepo&owner=branchPathOwner",
            sourceBranch: "feature-branch",
            sourcePath: "/project-docs",
            token: "gph_YourGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Enables GitHub Pages for a repository with a custom owner and repository name.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages-custom-owner-repo",
          name: "Enable GitHub Pages with Custom Owner and Repository Name",
          input: {
            repoUrl: "github.com?repo=customRepoName&owner=customOwnerName",
            token: "gph_YourGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Enables GitHub Pages for a repository with full customization and a different token.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages-full-custom-diff-token",
          name: "Enable GitHub Pages with Full Customization and Different Token",
          input: {
            repoUrl: "github.com?repo=customTokenRepo&owner=tokenOwner",
            buildType: "workflow",
            sourceBranch: "main",
            sourcePath: "/site",
            token: "gph_DifferentGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Enables GitHub Pages for a repository with a specific token for authorization.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages-specific-token",
          name: "Enable GitHub Pages with Specific Token",
          input: {
            repoUrl: "github.com?repo=specificTokenRepo&owner=tokenOwner",
            token: "gph_SpecificGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Enables GitHub Pages for a documentation site with custom configuration.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:pages",
          id: "github-pages-doc-site",
          name: "Enable GitHub Pages for Documentation Site",
          input: {
            repoUrl: "github.com?repo=docSiteRepo&owner=docsOwner",
            buildType: "workflow",
            sourceBranch: "docs-branch",
            sourcePath: "/docs-site",
            token: "gph_DocsGitHubToken"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=githubPagesEnable.examples.cjs.js.map
