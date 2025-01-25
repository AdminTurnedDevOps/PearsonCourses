var l = Object.defineProperty;
var u = (e, n) => l(e, "name", { value: n, configurable: !0 });
import { C as s } from "./codemirror.es.js";
import { g as m, a as g, b as c, c as j, d as M, e as k } from "./SchemaReference.es.js";
import "./codemirror.es2.js";
import "graphql";
import "./forEachState.es.js";
s.defineOption("jump", !1, (e, n, r) => {
  if (r && r !== s.Init) {
    const t = e.state.jump.onMouseOver;
    s.off(e.getWrapperElement(), "mouseover", t);
    const i = e.state.jump.onMouseOut;
    s.off(e.getWrapperElement(), "mouseout", i), s.off(document, "keydown", e.state.jump.onKeyDown), delete e.state.jump;
  }
  if (n) {
    const t = e.state.jump = {
      options: n,
      onMouseOver: y.bind(null, e),
      onMouseOut: v.bind(null, e),
      onKeyDown: D.bind(null, e)
    };
    s.on(e.getWrapperElement(), "mouseover", t.onMouseOver), s.on(e.getWrapperElement(), "mouseout", t.onMouseOut), s.on(document, "keydown", t.onKeyDown);
  }
});
function y(e, n) {
  const r = n.target || n.srcElement;
  if (!(r instanceof HTMLElement) || (r == null ? void 0 : r.nodeName) !== "SPAN")
    return;
  const t = r.getBoundingClientRect(), i = {
    left: (t.left + t.right) / 2,
    top: (t.top + t.bottom) / 2
  };
  e.state.jump.cursor = i, e.state.jump.isHoldingModifier && p(e);
}
u(y, "onMouseOver");
function v(e) {
  if (!e.state.jump.isHoldingModifier && e.state.jump.cursor) {
    e.state.jump.cursor = null;
    return;
  }
  e.state.jump.isHoldingModifier && e.state.jump.marker && d(e);
}
u(v, "onMouseOut");
function D(e, n) {
  if (e.state.jump.isHoldingModifier || !w(n.key))
    return;
  e.state.jump.isHoldingModifier = !0, e.state.jump.cursor && p(e);
  const r = /* @__PURE__ */ u((o) => {
    o.code === n.code && (e.state.jump.isHoldingModifier = !1, e.state.jump.marker && d(e), s.off(document, "keyup", r), s.off(document, "click", t), e.off("mousedown", i));
  }, "onKeyUp"), t = /* @__PURE__ */ u((o) => {
    const { destination: a, options: f } = e.state.jump;
    a && f.onClick(a, o);
  }, "onClick"), i = /* @__PURE__ */ u((o, a) => {
    e.state.jump.destination && (a.codemirrorIgnore = !0);
  }, "onMouseDown");
  s.on(document, "keyup", r), s.on(document, "click", t), e.on("mousedown", i);
}
u(D, "onKeyDown");
const O = typeof navigator < "u" && navigator && navigator.appVersion.includes("Mac");
function w(e) {
  return e === (O ? "Meta" : "Control");
}
u(w, "isJumpModifier");
function p(e) {
  if (e.state.jump.marker)
    return;
  const { cursor: n, options: r } = e.state.jump, t = e.coordsChar(n), i = e.getTokenAt(t, !0), o = r.getDestination || e.getHelper(t, "jump");
  if (o) {
    const a = o(i, r, e);
    if (a) {
      const f = e.markText({ line: t.line, ch: i.start }, { line: t.line, ch: i.end }, { className: "CodeMirror-jump-token" });
      e.state.jump.marker = f, e.state.jump.destination = a;
    }
  }
}
u(p, "enableJumpMode");
function d(e) {
  const { marker: n } = e.state.jump;
  e.state.jump.marker = null, e.state.jump.destination = null, n.clear();
}
u(d, "disableJumpMode");
s.registerHelper("jump", "graphql", (e, n) => {
  if (!n.schema || !n.onClick || !e.state)
    return;
  const { state: r } = e, { kind: t, step: i } = r, o = m(n.schema, r);
  if (t === "Field" && i === 0 && o.fieldDef || t === "AliasedField" && i === 2 && o.fieldDef)
    return g(o);
  if (t === "Directive" && i === 1 && o.directiveDef)
    return c(o);
  if (t === "Argument" && i === 0 && o.argDef)
    return j(o);
  if (t === "EnumValue" && o.enumValue)
    return M(o);
  if (t === "NamedType" && o.type)
    return k(o);
});
//# sourceMappingURL=jump.es.js.map
