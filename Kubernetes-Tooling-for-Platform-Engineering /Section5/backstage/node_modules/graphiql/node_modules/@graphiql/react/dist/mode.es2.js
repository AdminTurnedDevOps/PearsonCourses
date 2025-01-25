var o = Object.defineProperty;
var i = (r, t) => o(r, "name", { value: t, configurable: !0 });
import { C as c } from "./codemirror.es.js";
import { onlineParser as b, p as e, list as l, opt as n, t as a } from "graphql-language-service";
import { i as d } from "./mode-indent.es.js";
import "./codemirror.es2.js";
c.defineMode("graphql-variables", (r) => {
  const t = b({
    eatWhitespace: (u) => u.eatSpace(),
    lexRules: V,
    parseRules: m,
    editorConfig: { tabSize: r.tabSize }
  });
  return {
    config: r,
    startState: t.startState,
    token: t.token,
    indent: d,
    electricInput: /^\s*[}\]]/,
    fold: "brace",
    closeBrackets: {
      pairs: '[]{}""',
      explode: "[]{}"
    }
  };
});
const V = {
  Punctuation: /^\[|]|\{|\}|:|,/,
  Number: /^-?(?:0|(?:[1-9][0-9]*))(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?/,
  String: /^"(?:[^"\\]|\\(?:"|\/|\\|b|f|n|r|t|u[0-9a-fA-F]{4}))*"?/,
  Keyword: /^true|false|null/
}, m = {
  Document: [e("{"), l("Variable", n(e(","))), e("}")],
  Variable: [s("variable"), e(":"), "Value"],
  Value(r) {
    switch (r.kind) {
      case "Number":
        return "NumberValue";
      case "String":
        return "StringValue";
      case "Punctuation":
        switch (r.value) {
          case "[":
            return "ListValue";
          case "{":
            return "ObjectValue";
        }
        return null;
      case "Keyword":
        switch (r.value) {
          case "true":
          case "false":
            return "BooleanValue";
          case "null":
            return "NullValue";
        }
        return null;
    }
  },
  NumberValue: [a("Number", "number")],
  StringValue: [a("String", "string")],
  BooleanValue: [a("Keyword", "builtin")],
  NullValue: [a("Keyword", "keyword")],
  ListValue: [e("["), l("Value", n(e(","))), e("]")],
  ObjectValue: [e("{"), l("ObjectField", n(e(","))), e("}")],
  ObjectField: [s("attribute"), e(":"), "Value"]
};
function s(r) {
  return {
    style: r,
    match: (t) => t.kind === "String",
    update(t, u) {
      t.name = u.value.slice(1, -1);
    }
  };
}
i(s, "namedKey");
//# sourceMappingURL=mode.es2.js.map
