'use strict';

var yaml = require('yaml');
var commonGitlabConfig = require('../commonGitlabConfig.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Trigger a GitLab Project Pipeline",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "triggerPipeline",
          name: "Trigger Project Pipeline",
          action: "gitlab:pipeline:trigger",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            tokenDescription: "This is the text that will appear in the pipeline token",
            token: "glpt-xxxxxxxxxxxx",
            branch: "main",
            variables: { var_one: "one", var_two: "two" }
          }
        }
      ]
    })
  },
  {
    description: "Trigger a GitLab Project Pipeline with No Variables",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "triggerPipeline",
          name: "Trigger Project Pipeline",
          action: "gitlab:pipeline:trigger",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            tokenDescription: "This is the text that will appear in the pipeline token",
            token: "glpt-xxxxxxxxxxxx",
            branch: "main",
            variables: {}
          }
        }
      ]
    })
  },
  {
    description: "Trigger a GitLab Project Pipeline with Single Variables",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "triggerPipeline",
          name: "Trigger Project Pipeline",
          action: "gitlab:pipeline:trigger",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            tokenDescription: "This is the text that will appear in the pipeline token",
            token: "glpt-xxxxxxxxxxxx",
            branch: "main",
            variables: { var_one: "one" }
          }
        }
      ]
    })
  },
  {
    description: "Trigger a GitLab Project Pipeline with Multiple Variables",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "triggerPipeline",
          name: "Trigger Project Pipeline",
          action: "gitlab:pipeline:trigger",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            tokenDescription: "This is the text that will appear in the pipeline token",
            token: "glpt-xxxxxxxxxxxx",
            branch: "main",
            variables: { var_one: "one", var_two: "two", var_three: "three" }
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gitlabPipelineTrigger.examples.cjs.js.map
