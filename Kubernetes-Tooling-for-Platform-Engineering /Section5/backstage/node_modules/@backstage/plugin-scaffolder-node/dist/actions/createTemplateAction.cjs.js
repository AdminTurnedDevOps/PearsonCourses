'use strict';

var zodToJsonSchema = require('zod-to-json-schema');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var zodToJsonSchema__default = /*#__PURE__*/_interopDefaultCompat(zodToJsonSchema);

const createTemplateAction = (action) => {
  const inputSchema = action.schema?.input && "safeParseAsync" in action.schema.input ? zodToJsonSchema__default.default(action.schema.input) : action.schema?.input;
  const outputSchema = action.schema?.output && "safeParseAsync" in action.schema.output ? zodToJsonSchema__default.default(action.schema.output) : action.schema?.output;
  return {
    ...action,
    schema: {
      ...action.schema,
      input: inputSchema,
      output: outputSchema
    }
  };
};

exports.createTemplateAction = createTemplateAction;
//# sourceMappingURL=createTemplateAction.cjs.js.map
