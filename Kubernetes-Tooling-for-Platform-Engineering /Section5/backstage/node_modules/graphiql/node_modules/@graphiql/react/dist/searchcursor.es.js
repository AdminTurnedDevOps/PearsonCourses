var f = Object.defineProperty;
var a = (r, o) => f(r, "name", { value: o, configurable: !0 });
import { g as u } from "./codemirror.es2.js";
import { r as i } from "./searchcursor.es2.js";
function p(r, o) {
  for (var s = 0; s < o.length; s++) {
    const e = o[s];
    if (typeof e != "string" && !Array.isArray(e)) {
      for (const t in e)
        if (t !== "default" && !(t in r)) {
          const c = Object.getOwnPropertyDescriptor(e, t);
          c && Object.defineProperty(r, t, c.get ? c : {
            enumerable: !0,
            get: () => e[t]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }));
}
a(p, "_mergeNamespaces");
var n = i();
const g = /* @__PURE__ */ u(n), b = /* @__PURE__ */ p({
  __proto__: null,
  default: g
}, [n]);
export {
  b as s
};
//# sourceMappingURL=searchcursor.es.js.map
