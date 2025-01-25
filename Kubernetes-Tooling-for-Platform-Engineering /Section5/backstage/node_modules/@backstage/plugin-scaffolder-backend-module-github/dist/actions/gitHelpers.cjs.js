'use strict';

var errors = require('@backstage/errors');

const enableBranchProtectionOnDefaultRepoBranch = async ({
  repoName,
  client,
  owner,
  logger,
  requireCodeOwnerReviews,
  bypassPullRequestAllowances,
  requiredApprovingReviewCount,
  restrictions,
  requiredStatusCheckContexts = [],
  requireBranchesToBeUpToDate = true,
  requiredConversationResolution = false,
  requireLastPushApproval = false,
  defaultBranch = "master",
  enforceAdmins = true,
  dismissStaleReviews = false,
  requiredCommitSigning = false,
  requiredLinearHistory = false
}) => {
  const tryOnce = async () => {
    try {
      await client.rest.repos.updateBranchProtection({
        mediaType: {
          /**
           * 👇 we need this preview because allowing a custom
           * reviewer count on branch protection is a preview
           * feature
           *
           * More here: https://docs.github.com/en/rest/overview/api-previews#require-multiple-approving-reviews
           */
          previews: ["luke-cage-preview"]
        },
        owner,
        repo: repoName,
        branch: defaultBranch,
        required_status_checks: {
          strict: requireBranchesToBeUpToDate,
          contexts: requiredStatusCheckContexts
        },
        restrictions: restrictions ?? null,
        enforce_admins: enforceAdmins,
        required_pull_request_reviews: {
          required_approving_review_count: requiredApprovingReviewCount,
          require_code_owner_reviews: requireCodeOwnerReviews,
          bypass_pull_request_allowances: bypassPullRequestAllowances,
          dismiss_stale_reviews: dismissStaleReviews,
          require_last_push_approval: requireLastPushApproval
        },
        required_conversation_resolution: requiredConversationResolution,
        required_linear_history: requiredLinearHistory
      });
      if (requiredCommitSigning) {
        await client.rest.repos.createCommitSignatureProtection({
          owner,
          repo: repoName,
          branch: defaultBranch
        });
      }
    } catch (e) {
      errors.assertError(e);
      if (e.message.includes(
        "Upgrade to GitHub Pro or make this repository public to enable this feature"
      )) {
        logger.warn(
          "Branch protection was not enabled as it requires GitHub Pro for private repositories"
        );
      } else {
        throw e;
      }
    }
  };
  try {
    await tryOnce();
  } catch (e) {
    if (!e.message.includes("Branch not found")) {
      throw e;
    }
    await new Promise((resolve) => setTimeout(resolve, 600));
    await tryOnce();
  }
};
function entityRefToName(name) {
  return name.replace(/^.*[:/]/g, "");
}

exports.enableBranchProtectionOnDefaultRepoBranch = enableBranchProtectionOnDefaultRepoBranch;
exports.entityRefToName = entityRefToName;
//# sourceMappingURL=gitHelpers.cjs.js.map
