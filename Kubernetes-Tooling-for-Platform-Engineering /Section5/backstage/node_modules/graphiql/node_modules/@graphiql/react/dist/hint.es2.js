var x = Object.defineProperty;
var c = (i, n) => x(i, "name", { value: n, configurable: !0 });
import { C as u } from "./codemirror.es.js";
import { getNamedType as h, GraphQLInputObjectType as g, GraphQLEnumType as T, GraphQLBoolean as y, getNullableType as V, GraphQLList as L } from "graphql";
import { f as j } from "./forEachState.es.js";
import "./codemirror.es2.js";
function f(i, n, t) {
  const r = v(t, b(n.string));
  if (!r)
    return;
  const e = n.type !== null && /"|\w/.test(n.string[0]) ? n.start : n.end;
  return {
    list: r,
    from: { line: i.line, ch: e },
    to: { line: i.line, ch: n.end }
  };
}
c(f, "hintList");
function v(i, n) {
  if (!n)
    return d(i, (l) => !l.isDeprecated);
  const t = i.map((l) => ({
    proximity: O(b(l.text), n),
    entry: l
  }));
  return d(d(t, (l) => l.proximity <= 2), (l) => !l.entry.isDeprecated).sort((l, s) => (l.entry.isDeprecated ? 1 : 0) - (s.entry.isDeprecated ? 1 : 0) || l.proximity - s.proximity || l.entry.text.length - s.entry.text.length).map((l) => l.entry);
}
c(v, "filterAndSortList");
function d(i, n) {
  const t = i.filter(n);
  return t.length === 0 ? i : t;
}
c(d, "filterNonEmpty");
function b(i) {
  return i.toLowerCase().replaceAll(/\W/g, "");
}
c(b, "normalizeText");
function O(i, n) {
  let t = N(n, i);
  return i.length > n.length && (t -= i.length - n.length - 1, t += i.indexOf(n) === 0 ? 0 : 0.5), t;
}
c(O, "getProximity");
function N(i, n) {
  let t, r;
  const e = [], l = i.length, s = n.length;
  for (t = 0; t <= l; t++)
    e[t] = [t];
  for (r = 1; r <= s; r++)
    e[0][r] = r;
  for (t = 1; t <= l; t++)
    for (r = 1; r <= s; r++) {
      const p = i[t - 1] === n[r - 1] ? 0 : 1;
      e[t][r] = Math.min(e[t - 1][r] + 1, e[t][r - 1] + 1, e[t - 1][r - 1] + p), t > 1 && r > 1 && i[t - 1] === n[r - 2] && i[t - 2] === n[r - 1] && (e[t][r] = Math.min(e[t][r], e[t - 2][r - 2] + p));
    }
  return e[l][s];
}
c(N, "lexicalDistance");
u.registerHelper("hint", "graphql-variables", (i, n) => {
  const t = i.getCursor(), r = i.getTokenAt(t), e = D(t, r, n);
  return e != null && e.list && e.list.length > 0 && (e.from = u.Pos(e.from.line, e.from.ch), e.to = u.Pos(e.to.line, e.to.ch), u.signal(i, "hasCompletion", i, e, r)), e;
});
function D(i, n, t) {
  const r = n.state.kind === "Invalid" ? n.state.prevState : n.state, { kind: e, step: l } = r;
  if (e === "Document" && l === 0)
    return f(i, n, [{ text: "{" }]);
  const { variableToType: s } = t;
  if (!s)
    return;
  const p = M(s, n.state);
  if (e === "Document" || e === "Variable" && l === 0) {
    const a = Object.keys(s);
    return f(i, n, a.map((o) => ({
      text: `"${o}": `,
      type: s[o]
    })));
  }
  if ((e === "ObjectValue" || e === "ObjectField" && l === 0) && p.fields) {
    const a = Object.keys(p.fields).map((o) => p.fields[o]);
    return f(i, n, a.map((o) => ({
      text: `"${o.name}": `,
      type: o.type,
      description: o.description
    })));
  }
  if (e === "StringValue" || e === "NumberValue" || e === "BooleanValue" || e === "NullValue" || e === "ListValue" && l === 1 || e === "ObjectField" && l === 2 || e === "Variable" && l === 2) {
    const a = p.type ? h(p.type) : void 0;
    if (a instanceof g)
      return f(i, n, [{ text: "{" }]);
    if (a instanceof T) {
      const o = a.getValues();
      return f(i, n, o.map((m) => ({
        text: `"${m.name}"`,
        type: a,
        description: m.description
      })));
    }
    if (a === y)
      return f(i, n, [
        { text: "true", type: y, description: "Not false." },
        { text: "false", type: y, description: "Not true." }
      ]);
  }
}
c(D, "getVariablesHint");
function M(i, n) {
  const t = {
    type: null,
    fields: null
  };
  return j(n, (r) => {
    switch (r.kind) {
      case "Variable": {
        t.type = i[r.name];
        break;
      }
      case "ListValue": {
        const e = t.type ? V(t.type) : void 0;
        t.type = e instanceof L ? e.ofType : null;
        break;
      }
      case "ObjectValue": {
        const e = t.type ? h(t.type) : void 0;
        t.fields = e instanceof g ? e.getFields() : null;
        break;
      }
      case "ObjectField": {
        const e = r.name && t.fields ? t.fields[r.name] : null;
        t.type = e == null ? void 0 : e.type;
        break;
      }
    }
  }), t;
}
c(M, "getTypeInfo");
//# sourceMappingURL=hint.es2.js.map
