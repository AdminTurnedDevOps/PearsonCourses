'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Initializes a git repository with the content in the workspace, and publishes it to GitLab with the default configuration.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gitlab",
          name: "Publish to GitLab",
          input: {
            repoUrl: "gitlab.com?repo=project_name&owner=group_name"
          }
        }
      ]
    })
  },
  {
    description: "Add a description.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gitlab",
          name: "Publish to GitLab",
          input: {
            repoUrl: "gitlab.com?repo=project_name&owner=group_name",
            description: "Initialize a git repository"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a GitLab repository with an initial commit message, if not set defaults to `initial commit`.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gitlab",
          name: "Publish to GitLab",
          input: {
            repoUrl: "gitlab.com?repo=project_name&owner=group_name",
            description: "Initialize a git repository",
            gitCommitMessage: "Started a project."
          }
        }
      ]
    })
  },
  {
    description: "Initializes a GitLab repository with aditional settings.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gitlab",
          name: "Publish to GitLab",
          input: {
            repoUrl: "gitlab.com?repo=project_name&owner=group_name",
            settings: {
              ci_config_path: ".gitlab-ci.yml",
              visibility: "public"
            }
          }
        }
      ]
    })
  },
  {
    description: "Initializes a GitLab repository with fast forward merge and always squash settings.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gitlab",
          name: "Publish to GitLab",
          input: {
            repoUrl: "gitlab.com?repo=project_name&owner=group_name",
            settings: {
              merge_method: "ff",
              squash_option: "always"
            }
          }
        }
      ]
    })
  },
  {
    description: "Initializes a GitLab repository with branch settings.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gitlab",
          name: "Publish to GitLab",
          input: {
            repoUrl: "gitlab.com?repo=project_name&owner=group_name",
            branches: [
              {
                name: "dev",
                create: true,
                protect: true,
                ref: "master"
              },
              {
                name: "master",
                protect: true
              }
            ]
          }
        }
      ]
    })
  },
  {
    description: "Initializes a GitLab repository with environment variables.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gitlab",
          name: "Publish to GitLab",
          input: {
            repoUrl: "gitlab.com?repo=project_name&owner=group_name",
            projectVariables: [
              {
                key: "key1",
                value: "value1",
                protected: true,
                masked: false
              },
              {
                key: "key2",
                value: "value2",
                protected: true,
                masked: false
              }
            ]
          }
        }
      ]
    })
  },
  {
    description: "Initializes a GitLab repository with pipeline must succeed and allow merge on skipped pipeline settings.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gitlab",
          name: "Publish to GitLab",
          input: {
            repoUrl: "gitlab.com?repo=project_name&owner=group_name",
            settings: {
              only_allow_merge_if_pipeline_succeeds: true,
              allow_merge_on_skipped_pipeline: true
            }
          }
        }
      ]
    })
  },
  {
    description: "Initializes a GitLab repository with setting to require all threads (discussions) on merge request to be resolved before merging.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gitlab",
          name: "Publish to GitLab",
          input: {
            repoUrl: "gitlab.com?repo=project_name&owner=group_name",
            settings: {
              only_allow_merge_if_all_discussions_are_resolved: true
            }
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gitlab.examples.cjs.js.map
