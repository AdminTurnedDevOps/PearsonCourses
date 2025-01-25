import findUp from "find-up"
import locatePath from "locate-path"
import path from "path"
import fs from "fs"
import util from "util"
import ignore from "ignore"
import crossSpawn from "cross-spawn"
import { SpawnOptions } from "child_process"

let readFile = util.promisify(fs.readFile)

/**
 * An individual entry from a CODEOWNERS file
 */
export interface CodeOwnersEntry {
	pattern: string
	owners: Array<string>
}

/**
 * Parse a CODEOWNERS file into an array of entries (will be in reverse order
 * of the file).
 */
export function parse(str: string): Array<CodeOwnersEntry> {
	let entries = []
	let lines = str.split("\n")

	for (let line of lines) {
		let [content, comment] = line.split("#")
		let trimmed = content.trim()
		if (trimmed === "") continue
		let [pattern, ...owners] = trimmed.split(/\s+/)
		entries.push({ pattern, owners })
	}

	return entries.reverse()
}

/**
 * Standard locations to search for the CODEOWNERS file in priority order
 * (Note: This comes from GitHub).
 */
export let CODEOWNERS_PATHS = [
	".github/CODEOWNERS",
	"docs/CODEOWNERS",
	"CODEOWNERS",
]

/**
 * Find the path of the CODEOWNERS file from the current working directory.
 */
export async function findOwnersPath(cwd: string): Promise<string | null> {
	let git = await findUp(".git/", { cwd, type: "directory" })
	if (!git) return null

	let root = path.dirname(git)
	let paths = CODEOWNERS_PATHS.map(part => path.join(root, part))
	let codeowners = await locatePath(paths, { cwd })

	return codeowners || null
}

/**
 * Find, load, and parse the CODEOWNERS file (if it exists) from the current
 * working directory.
 */
export async function loadOwners(
	cwd: string,
): Promise<Array<CodeOwnersEntry> | null> {
	let file = await findOwnersPath(cwd)
	if (!file) return null
	let contents = await readFile(file, "utf-8")
	let entries = parse(contents)
	return entries
}

/**
 * Match a filename against a glob pattern (while respecting .gitignore rules)
 */
export function matchPattern(filename: string, pattern: string) {
	return ignore()
		.add(pattern)
		.ignores(filename)
}

/**
 * Match a filename against CODEOWNERS entries to determine which (if any) it
 * matches.
 */
export function matchFile(
	filename: string,
	entries: Array<CodeOwnersEntry>,
): CodeOwnersEntry | null {
	for (let entry of entries) {
		if (matchPattern(filename, entry.pattern)) {
			return entry
		}
	}
	return null
}

/**
 * Given a set of files and CODEOWNERS entries, return the set of files which
 * are not matched to any CODEOWNERS entries.
 */
export function filterUnmatchedFiles(
	files: Array<string>,
	entries: Array<CodeOwnersEntry>,
) {
	return files.filter(file => !matchFile(file, entries))
}

/**
 * Spawn a child process and convert it into a promise.
 * @internal
 */
function spawn(
	cmd: string,
	args: Array<string>,
	opts: SpawnOptions,
	onData: (data: string) => unknown,
) {
	return new Promise((resolve, reject) => {
		let proc = crossSpawn(cmd, args, opts)

		proc.stdout.on("data", onData)

		proc.on("error", reject)
		proc.on("close", code => {
			if (code !== 0) {
				reject(new Error(`"${cmd} ${args.join(" ")}" exited with non-zero exit code: ${code}`)) // prettier-ignore
			} else {
				resolve()
			}
		})
	})
}

/**
 * Use git to list all files in a repository.
 * @internal
 */
async function lsFiles(
	cwd: string,
	onFiles: (files: Array<string>) => unknown,
) {
	await spawn(
		"git",
		["ls-files", "--others", "--exclude-standard"],
		{ cwd, stdio: ["ignore", "pipe", "inherit"] },
		data => {
			let files = data
				.toString()
				.trim()
				.split("\n")

			onFiles(files)
		},
	)
}

/**
 * Find all of the files in a git repository which are not matched by any code
 * owners using a set of CODEOWNERS entries.
 */
export async function findUnmatchedFilesFromEntries(
	entries: Array<CodeOwnersEntry>,
	cwd: string,
): Promise<Array<string>> {
	let unmatched: Array<string> = []

	await lsFiles(cwd, files => {
		unmatched = unmatched.concat(filterUnmatchedFiles(files, entries))
	})

	return unmatched
}

/**
 * Find all of the files in a git repository which are not matched by any code
 * owners.
 */
export async function findUnmatchedFiles(
	cwd: string,
): Promise<Array<string> | null> {
	let entries = await loadOwners(cwd)
	if (!entries) return null
	let unmatched = await findUnmatchedFilesFromEntries(entries, cwd)
	return unmatched
}
