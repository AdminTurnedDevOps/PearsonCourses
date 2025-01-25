import { toValue } from '@swagger-api/apidom-core';
import toPath from '../utils/to-path.js';
class ParameterMacroVisitor {
  parameterMacro;
  options;
  #macroOperation;
  OperationElement = {
    enter: operationElement => {
      this.#macroOperation = operationElement;
    },
    leave: () => {
      this.#macroOperation = undefined;
    }
  };
  ParameterElement = {
    leave: (parameterElement, key, parent, path, ancestors) => {
      const pojoOperation = this.#macroOperation ? toValue(this.#macroOperation) : null;
      const pojoParameter = toValue(parameterElement);
      try {
        const macroValue = this.parameterMacro(pojoOperation, pojoParameter);
        parameterElement.set('default', macroValue);
      } catch (error) {
        var _this$options$derefer, _this$options$derefer2;
        const macroError = new Error(error, {
          cause: error
        });
        macroError.fullPath = toPath([...ancestors, parent]);
        (_this$options$derefer = this.options.dereference.dereferenceOpts) === null || _this$options$derefer === void 0 || (_this$options$derefer = _this$options$derefer.errors) === null || _this$options$derefer === void 0 || (_this$options$derefer2 = _this$options$derefer.push) === null || _this$options$derefer2 === void 0 || _this$options$derefer2.call(_this$options$derefer, macroError);
      }
    }
  };
  constructor({
    parameterMacro,
    options
  }) {
    this.parameterMacro = parameterMacro;
    this.options = options;
  }
}
export default ParameterMacroVisitor;