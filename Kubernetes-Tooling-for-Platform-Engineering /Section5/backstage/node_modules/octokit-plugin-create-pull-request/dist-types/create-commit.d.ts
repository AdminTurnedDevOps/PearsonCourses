import type { Changes, State } from "./types";
export declare function createCommit(state: Required<State>, treeCreated: boolean, changes: Changes): Promise<string>;
