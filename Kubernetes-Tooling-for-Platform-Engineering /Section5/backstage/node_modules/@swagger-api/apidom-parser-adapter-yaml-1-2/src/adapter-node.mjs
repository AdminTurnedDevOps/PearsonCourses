import lexicalAnalysis from "./lexical-analysis/node.mjs";
import syntacticAnalysis from "./syntactic-analysis/indirect/index.mjs";
export { mediaTypes, namespace } from "./adapter.mjs";
export { lexicalAnalysis, syntacticAnalysis };

/**
 * @public
 */
export const detect = async source => {
  try {
    const cst = await lexicalAnalysis(source);
    return !cst.rootNode.isError;
  } catch {
    return false;
  }
};

/**
 * @public
 */

/**
 * @public
 */

/**
 * @public
 */
export const parse = async (source, {
  sourceMap = false
} = {}) => {
  const cst = await lexicalAnalysis(source);
  return syntacticAnalysis(cst, {
    sourceMap
  });
};