var d = Object.defineProperty;
var o = (e, n) => d(e, "name", { value: n, configurable: !0 });
function r(e, n) {
  var t, i;
  const { levels: l, indentLevel: v } = e;
  return ((!l || l.length === 0 ? v : l.at(-1) - (!((t = this.electricInput) === null || t === void 0) && t.test(n) ? 1 : 0)) || 0) * (((i = this.config) === null || i === void 0 ? void 0 : i.indentUnit) || 0);
}
o(r, "indent");
export {
  r as i
};
//# sourceMappingURL=mode-indent.es.js.map
