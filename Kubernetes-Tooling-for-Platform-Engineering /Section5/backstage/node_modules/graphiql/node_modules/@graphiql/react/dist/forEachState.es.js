var n = Object.defineProperty;
var l = (e, a) => n(e, "name", { value: a, configurable: !0 });
function s(e, a) {
  const o = [];
  let t = e;
  for (; t != null && t.kind; )
    o.push(t), t = t.prevState;
  for (let i = o.length - 1; i >= 0; i--)
    a(o[i]);
}
l(s, "forEachState");
export {
  s as f
};
//# sourceMappingURL=forEachState.es.js.map
