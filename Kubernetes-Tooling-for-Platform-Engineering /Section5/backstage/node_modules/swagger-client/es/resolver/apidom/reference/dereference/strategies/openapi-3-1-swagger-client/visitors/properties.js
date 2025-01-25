import { isObjectElement, toValue } from '@swagger-api/apidom-core';
import toPath from '../utils/to-path.js';
class ModelPropertyMacroVisitor {
  modelPropertyMacro;
  options;
  SchemaElement = {
    leave: (schemaElement, key, parent, path, ancestors) => {
      if (typeof schemaElement.properties === 'undefined') return;
      if (!isObjectElement(schemaElement.properties)) return;
      schemaElement.properties.forEach(property => {
        if (!isObjectElement(property)) return;
        try {
          const macroValue = this.modelPropertyMacro(toValue(property));
          property.set('default', macroValue);
        } catch (error) {
          var _this$options$derefer, _this$options$derefer2;
          const macroError = new Error(error, {
            cause: error
          });
          macroError.fullPath = [...toPath([...ancestors, parent, schemaElement]), 'properties'];
          (_this$options$derefer = this.options.dereference.dereferenceOpts) === null || _this$options$derefer === void 0 || (_this$options$derefer = _this$options$derefer.errors) === null || _this$options$derefer === void 0 || (_this$options$derefer2 = _this$options$derefer.push) === null || _this$options$derefer2 === void 0 || _this$options$derefer2.call(_this$options$derefer, macroError);
        }
      });
    }
  };
  constructor({
    modelPropertyMacro,
    options
  }) {
    this.modelPropertyMacro = modelPropertyMacro;
    this.options = options;
  }
}
export default ModelPropertyMacroVisitor;