# octokit-plugin-create-pull-request

> Octokit plugin to create a pull request with multiple file changes

[![@latest](https://img.shields.io/npm/v/octokit-plugin-create-pull-request.svg)](https://www.npmjs.com/package/octokit-plugin-create-pull-request)
[![Build Status](https://github.com/gr2m/octokit-plugin-create-pull-request/workflows/Test/badge.svg)](https://github.com/gr2m/octokit-plugin-create-pull-request/actions?query=workflow%3ATest+branch%3Amain)

Features

- Retrieves the repository’s default branch unless `base` branch is set
- Makes multiple file changes using a single commit
- Creates a fork if the authenticated user does not have write access to the repository
- Can update existing pull request

## Usage

<table>
<tbody valign=top align=left>
<tr><th>
Browsers
</th><td width=100%>

Load `octokit-plugin-create-pull-request` and [`@octokit/core`](https://github.com/octokit/core.js) (or core-compatible module) directly from [cdn.pika.dev](https://cdn.pika.dev)

```html
<script type="module">
  import { Octokit } from "https://cdn.pika.dev/@octokit/core";
  import { createPullRequest } from "https://cdn.pika.dev/octokit-plugin-create-pull-request";
</script>
```

</td></tr>
<tr><th>
Node
</th><td>

Install with `npm install @octokit/core octokit-plugin-create-pull-request`. Optionally replace `@octokit/core` with a core-compatible module

```js
const { Octokit } = require("@octokit/core");
const {
  createPullRequest,
  DELETE_FILE,
} = require("octokit-plugin-create-pull-request");
```

</td></tr>
</tbody>
</table>

```js
const MyOctokit = Octokit.plugin(createPullRequest);

const TOKEN = "secret123"; // create token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new MyOctokit({
  auth: TOKEN,
});

// Returns a normal Octokit PR response
// See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
octokit
  .createPullRequest({
    owner: "user-or-org-login",
    repo: "repo-name",
    title: "pull request title",
    body: "pull request description",
    head: "pull-request-branch-name",
    base: "main" /* optional: defaults to default branch */,
    update: false /* optional: set to `true` to enable updating existing pull requests */,
    forceFork: false /* optional: force creating fork even when user has write rights */,
    labels: [
      "bug",
    ] /* optional: applies the given labels when user has permissions. When updating an existing pull request, already present labels will not be deleted. */
    changes: [
      {
        /* optional: if `files` is not passed, an empty commit is created instead */
        files: {
          "path/to/file1.txt": "Content for file1",
          "path/to/file2.png": {
            content: "_base64_encoded_content_",
            encoding: "base64",
          },
          // deletes file if it exists,
          "path/to/file3.txt": DELETE_FILE,
          // updates file based on current content
          "path/to/file4.txt": ({ exists, encoding, content }) => {
            // do not create the file if it does not exist
            if (!exists) return null;

            return Buffer.from(content, encoding)
              .toString("utf-8")
              .toUpperCase();
          },
          "path/to/file5.sh": {
            content: "echo Hello World",
            encoding: "utf-8",
            // one of the modes supported by the git tree object
            // https://developer.github.com/v3/git/trees/#tree-object
            mode: "100755",
          },
          "path/to/file6.txt": ({ exists, encoding, content }) => {
            // do nothing if it does not exist
            if (!exists) return null;

            const fileContent = Buffer.from(content, encoding).toString(
              "utf-8"
            );

            if (fileContent.includes("octomania")) {
              // delete file
              return DELETE_FILE;
            }

            // keep file
            return null;
          },
        },
        commit:
          "creating file1.txt, file2.png, deleting file3.txt, updating file4.txt (if it exists), file5.sh",
        /* optional: if not passed, will be the authenticated user and the current date */
        author: {
          name: "Author LastName",
          email: "Author.LastName@acme.com",
          date: new Date().toISOString(), // must be ISO date string
        },
        /* optional: if not passed, will use the information set in author */
        committer: {
          name: "Committer LastName",
          email: "Committer.LastName@acme.com",
          date: new Date().toISOString(), // must be ISO date string
        },
        /* optional: if not passed, commit won't be signed*/
        signature: async function (commitPayload) {
          // import { createSignature } from 'github-api-signature'
          //
          // return createSignature(
          //   commitPayload,
          //   privateKey,
          //   passphrase
          // );
        },
      },
    ],
  })
  .then((pr) => console.log(pr.data.number));
```

By default, a pull request is created, even if no files have been changed. To prevent an empty pull request, set `options.createWhenEmpty` to `false`. If no pull request has been created, `octokit.createPullRequest()` resolves with `null`.

By default, commits are always created, even if no files have been updated. To prevent empty commits, set `options.changes[].emptyCommit` to `false`. To set a custom commit message for empty commits, set `emptyCommit` to a string.

For using this plugin with another plugin, you can import the `composeCreatePullRequest` function, which accepts an `octokit` instance as first argument, and the same options as `octokit.createPullRequest` as second argument.

```js
import { Octokit } from "@octokit/core";
import { composeCreatePullRequest } from "octokit-plugin-create-pull-request";

export function myPlugin(octokit) {
  return {
    async myFunction(options) {
      // custom code here

      const response = await composeCreatePullRequest(octokit, options);

      // more custom code here

      return response;
    },
  };
}
```

## LICENSE

[MIT](LICENSE)
