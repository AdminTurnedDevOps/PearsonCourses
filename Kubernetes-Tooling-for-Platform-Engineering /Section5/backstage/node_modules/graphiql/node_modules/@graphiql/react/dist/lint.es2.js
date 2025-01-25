import { C as t } from "./codemirror.es.js";
import { getDiagnostics as c } from "graphql-language-service";
import "./codemirror.es2.js";
const a = ["error", "warning", "information", "hint"], l = {
  "GraphQL: Validation": "validation",
  "GraphQL: Deprecation": "deprecation",
  "GraphQL: Syntax": "syntax"
};
t.registerHelper("lint", "graphql", (n, s) => {
  const { schema: i, validationRules: r, externalFragments: o } = s;
  return c(n, i, r, void 0, o).map((e) => ({
    message: e.message,
    severity: e.severity ? a[e.severity - 1] : a[0],
    type: e.source ? l[e.source] : void 0,
    from: t.Pos(e.range.start.line, e.range.start.character),
    to: t.Pos(e.range.end.line, e.range.end.character)
  }));
});
//# sourceMappingURL=lint.es2.js.map
