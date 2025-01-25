var c = Object.defineProperty;
var n = (r, o) => c(r, "name", { value: o, configurable: !0 });
import { r as f, g as p } from "./codemirror.es2.js";
function u(r, o) {
  for (var a = 0; a < o.length; a++) {
    const e = o[a];
    if (typeof e != "string" && !Array.isArray(e)) {
      for (const t in e)
        if (t !== "default" && !(t in r)) {
          const i = Object.getOwnPropertyDescriptor(e, t);
          i && Object.defineProperty(r, t, i.get ? i : {
            enumerable: !0,
            get: () => e[t]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }));
}
n(u, "_mergeNamespaces");
var s = f();
const d = /* @__PURE__ */ p(s), m = /* @__PURE__ */ u({
  __proto__: null,
  default: d
}, [s]);
export {
  d as C,
  m as c
};
//# sourceMappingURL=codemirror.es.js.map
