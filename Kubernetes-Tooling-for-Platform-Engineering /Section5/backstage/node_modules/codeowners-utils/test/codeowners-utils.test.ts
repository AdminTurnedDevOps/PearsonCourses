import test from "ava"
import * as codeowners from "../src/codeowners-utils"
import stripIndent from "strip-indent"

test("parse", t => {
	let entries = codeowners.parse(
		stripIndent(`
      # comment
      *         @root
      *.js      @js js@example.com
      # comment
      # comment
      doc/*.md  @doc
    `),
	)

	t.deepEqual(entries, [
		{
			pattern: "doc/*.md",
			owners: ["@doc"],
		},
		{
			pattern: "*.js",
			owners: ["@js", "js@example.com"],
		},
		{
			pattern: "*",
			owners: ["@root"],
		},
	])
})
