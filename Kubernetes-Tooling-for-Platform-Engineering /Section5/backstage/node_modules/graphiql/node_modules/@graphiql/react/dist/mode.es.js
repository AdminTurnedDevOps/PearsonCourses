var a = Object.defineProperty;
var t = (e, r) => a(e, "name", { value: r, configurable: !0 });
import { C as s } from "./codemirror.es.js";
import { onlineParser as i, isIgnored as l, LexRules as n, ParseRules as p } from "graphql-language-service";
import { i as d } from "./mode-indent.es.js";
import "./codemirror.es2.js";
const m = /* @__PURE__ */ t((e) => {
  const r = i({
    eatWhitespace: (o) => o.eatWhile(l),
    lexRules: n,
    parseRules: p,
    editorConfig: { tabSize: e.tabSize }
  });
  return {
    config: e,
    startState: r.startState,
    token: r.token,
    indent: d,
    electricInput: /^\s*[})\]]/,
    fold: "brace",
    lineComment: "#",
    closeBrackets: {
      pairs: '()[]{}""',
      explode: "()[]{}"
    }
  };
}, "graphqlModeFactory");
s.defineMode("graphql", m);
//# sourceMappingURL=mode.es.js.map
