import { C as n } from "./codemirror.es.js";
import { onlineParser as s, p as e, list as a, t } from "graphql-language-service";
import { i } from "./mode-indent.es.js";
import "./codemirror.es2.js";
n.defineMode("graphql-results", (r) => {
  const u = s({
    eatWhitespace: (l) => l.eatSpace(),
    lexRules: o,
    parseRules: c,
    editorConfig: { tabSize: r.tabSize }
  });
  return {
    config: r,
    startState: u.startState,
    token: u.token,
    indent: i,
    electricInput: /^\s*[}\]]/,
    fold: "brace",
    closeBrackets: {
      pairs: '[]{}""',
      explode: "[]{}"
    }
  };
});
const o = {
  Punctuation: /^\[|]|\{|\}|:|,/,
  Number: /^-?(?:0|(?:[1-9][0-9]*))(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?/,
  String: /^"(?:[^"\\]|\\(?:"|\/|\\|b|f|n|r|t|u[0-9a-fA-F]{4}))*"?/,
  Keyword: /^true|false|null/
}, c = {
  Document: [e("{"), a("Entry", e(",")), e("}")],
  Entry: [t("String", "def"), e(":"), "Value"],
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
  NumberValue: [t("Number", "number")],
  StringValue: [t("String", "string")],
  BooleanValue: [t("Keyword", "builtin")],
  NullValue: [t("Keyword", "keyword")],
  ListValue: [e("["), a("Value", e(",")), e("]")],
  ObjectValue: [e("{"), a("ObjectField", e(",")), e("}")],
  ObjectField: [t("String", "property"), e(":"), "Value"]
};
//# sourceMappingURL=mode.es3.js.map
