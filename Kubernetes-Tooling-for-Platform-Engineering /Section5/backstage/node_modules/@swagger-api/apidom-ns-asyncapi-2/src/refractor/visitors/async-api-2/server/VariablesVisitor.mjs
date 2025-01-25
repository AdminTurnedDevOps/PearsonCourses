import { Mixin } from 'ts-mixer';
import ServerVariablesElement from "../../../../elements/nces/ServerVariables.mjs";
import MapVisitor from "../../generics/MapVisitor.mjs";
import FallbackVisitor from "../../FallbackVisitor.mjs";
import { isReferenceLikeElement } from "../../../predicates.mjs";
/**
 * @public
 */
/**
 * @public
 */
class VariablesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  constructor(options) {
    super(options);
    this.element = new ServerVariablesElement();
    this.specPath = element => {
      return isReferenceLikeElement(element) ? ['document', 'objects', 'Reference'] : ['document', 'objects', 'ServerVariable'];
    };
  }
}
export default VariablesVisitor;