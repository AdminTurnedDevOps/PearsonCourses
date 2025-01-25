import type { Octokit } from "@octokit/core";
import type { File } from "./types";
export declare function valueToTreeObject(octokit: Octokit, owner: string, repo: string, path: string, value: string | File): Promise<{
    path: string;
    mode: string;
    content: string;
    sha?: undefined;
} | {
    path: string;
    mode: string;
    sha: string;
    content?: undefined;
}>;
