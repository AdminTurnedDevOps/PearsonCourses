import { MergeInput, ErrorMergeResult } from "./data";
import { Swagger } from "atlassian-openapi";
export declare type PathAndComponents = {
    paths: Swagger.Paths;
    components: Swagger.Components;
};
/**
 * Merge algorithm:
 *
 * Generate reference mappings for the components. Eliminating duplicates.
 * Generate reference mappings for the paths.
 * Copy the elements into the new location.
 * Update all of the paths and components to the new references.
 *
 * @param inputs
 */
export declare function mergePathsAndComponents(inputs: MergeInput): PathAndComponents | ErrorMergeResult;
//# sourceMappingURL=paths-and-components.d.ts.map