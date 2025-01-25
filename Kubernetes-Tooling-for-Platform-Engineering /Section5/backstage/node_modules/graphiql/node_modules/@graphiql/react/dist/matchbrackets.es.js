var f = Object.defineProperty;
var s = (e, o) => f(e, "name", { value: o, configurable: !0 });
import { g as i } from "./codemirror.es2.js";
import { r as m } from "./matchbrackets.es2.js";
function p(e, o) {
  for (var a = 0; a < o.length; a++) {
    const t = o[a];
    if (typeof t != "string" && !Array.isArray(t)) {
      for (const r in t)
        if (r !== "default" && !(r in e)) {
          const c = Object.getOwnPropertyDescriptor(t, r);
          c && Object.defineProperty(e, r, c.get ? c : {
            enumerable: !0,
            get: () => t[r]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
s(p, "_mergeNamespaces");
var n = m();
const u = /* @__PURE__ */ i(n), y = /* @__PURE__ */ p({
  __proto__: null,
  default: u
}, [n]);
export {
  y as m
};
//# sourceMappingURL=matchbrackets.es.js.map
