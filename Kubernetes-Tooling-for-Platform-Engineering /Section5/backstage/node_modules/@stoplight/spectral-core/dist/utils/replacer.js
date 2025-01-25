"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Replacer = void 0;
const tslib_1 = require("tslib");
const simple_eval_1 = (0, tslib_1.__importDefault)(require("simple-eval"));
class Replacer {
    constructor(count) {
        this.regex = new RegExp(`#?${'{'.repeat(count)}([^}\n]+)${'}'.repeat(count)}`, 'g');
        this.functions = {};
    }
    addFunction(name, filter) {
        this.functions[name] = filter;
    }
    print(input, values) {
        return input.replace(this.regex, (substr, identifier, index) => {
            const shouldEvaluate = input[index] === '#';
            if (shouldEvaluate) {
                return String((0, simple_eval_1.default)(identifier, {
                    ...Object.entries(this.functions).reduce((fns, [name, fn]) => {
                        fns[name] = fn.bind(values);
                        return fns;
                    }, {}),
                    ...values,
                }));
            }
            if (!(identifier in values)) {
                return '';
            }
            return String(values[identifier]);
        });
    }
}
exports.Replacer = Replacer;
//# sourceMappingURL=replacer.js.map