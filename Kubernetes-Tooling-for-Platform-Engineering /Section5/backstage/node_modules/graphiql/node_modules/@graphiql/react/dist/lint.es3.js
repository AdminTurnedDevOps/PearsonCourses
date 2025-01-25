var I = Object.defineProperty;
var t = (e, n) => I(e, "name", { value: n, configurable: !0 });
import { C as q } from "./codemirror.es.js";
import { GraphQLNonNull as j, GraphQLList as C, GraphQLInputObjectType as M, GraphQLEnumType as v, GraphQLScalarType as D } from "graphql";
import "./codemirror.es2.js";
function H(e) {
  d = e, w = e.length, s = u = g = -1, o(), x();
  const n = B();
  return p("EOF"), n;
}
t(H, "jsonParse");
let d, w, s, u, g, r, f;
function B() {
  const e = s, n = [];
  if (p("{"), !E("}")) {
    do
      n.push(U());
    while (E(","));
    p("}");
  }
  return {
    kind: "Object",
    start: e,
    end: g,
    members: n
  };
}
t(B, "parseObj");
function U() {
  const e = s, n = f === "String" ? G() : null;
  p("String"), p(":");
  const i = V();
  return {
    kind: "Member",
    start: e,
    end: g,
    key: n,
    value: i
  };
}
t(U, "parseMember");
function _() {
  const e = s, n = [];
  if (p("["), !E("]")) {
    do
      n.push(V());
    while (E(","));
    p("]");
  }
  return {
    kind: "Array",
    start: e,
    end: g,
    values: n
  };
}
t(_, "parseArr");
function V() {
  switch (f) {
    case "[":
      return _();
    case "{":
      return B();
    case "String":
    case "Number":
    case "Boolean":
    case "Null":
      const e = G();
      return x(), e;
  }
  p("Value");
}
t(V, "parseVal");
function G() {
  return { kind: f, start: s, end: u, value: JSON.parse(d.slice(s, u)) };
}
t(G, "curToken");
function p(e) {
  if (f === e) {
    x();
    return;
  }
  let n;
  if (f === "EOF")
    n = "[end of file]";
  else if (u - s > 1)
    n = "`" + d.slice(s, u) + "`";
  else {
    const i = d.slice(s).match(/^.+?\b/);
    n = "`" + (i ? i[0] : d[s]) + "`";
  }
  throw b(`Expected ${e} but found ${n}.`);
}
t(p, "expect");
class F extends Error {
  constructor(n, i) {
    super(n), this.position = i;
  }
}
t(F, "JSONSyntaxError");
function b(e) {
  return new F(e, { start: s, end: u });
}
t(b, "syntaxError");
function E(e) {
  if (f === e)
    return x(), !0;
}
t(E, "skip");
function o() {
  return u < w && (u++, r = u === w ? 0 : d.charCodeAt(u)), r;
}
t(o, "ch");
function x() {
  for (g = u; r === 9 || r === 10 || r === 13 || r === 32; )
    o();
  if (r === 0) {
    f = "EOF";
    return;
  }
  switch (s = u, r) {
    case 34:
      return f = "String", J();
    case 45:
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return f = "Number", P();
    case 102:
      if (d.slice(s, s + 5) !== "false")
        break;
      u += 4, o(), f = "Boolean";
      return;
    case 110:
      if (d.slice(s, s + 4) !== "null")
        break;
      u += 3, o(), f = "Null";
      return;
    case 116:
      if (d.slice(s, s + 4) !== "true")
        break;
      u += 3, o(), f = "Boolean";
      return;
  }
  f = d[s], o();
}
t(x, "lex");
function J() {
  for (o(); r !== 34 && r > 31; )
    if (r === 92)
      switch (r = o(), r) {
        case 34:
        case 47:
        case 92:
        case 98:
        case 102:
        case 110:
        case 114:
        case 116:
          o();
          break;
        case 117:
          o(), N(), N(), N(), N();
          break;
        default:
          throw b("Bad character escape sequence.");
      }
    else {
      if (u === w)
        throw b("Unterminated string.");
      o();
    }
  if (r === 34) {
    o();
    return;
  }
  throw b("Unterminated string.");
}
t(J, "readString");
function N() {
  if (r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102)
    return o();
  throw b("Expected hexadecimal digit.");
}
t(N, "readHex");
function P() {
  r === 45 && o(), r === 48 ? o() : O(), r === 46 && (o(), O()), (r === 69 || r === 101) && (r = o(), (r === 43 || r === 45) && o(), O());
}
t(P, "readNumber");
function O() {
  if (r < 48 || r > 57)
    throw b("Expected decimal digit.");
  do
    o();
  while (r >= 48 && r <= 57);
}
t(O, "readDigits");
q.registerHelper("lint", "graphql-variables", (e, n, i) => {
  if (!e)
    return [];
  let l;
  try {
    l = H(e);
  } catch (c) {
    if (c instanceof F)
      return [$(i, c.position, c.message)];
    throw c;
  }
  const { variableToType: a } = n;
  return a ? z(i, a, l) : [];
});
function z(e, n, i) {
  var l;
  const a = [];
  for (const c of i.members)
    if (c) {
      const m = (l = c.key) === null || l === void 0 ? void 0 : l.value, h = n[m];
      if (h)
        for (const [y, Q] of k(h, c.value))
          a.push($(e, y, Q));
      else
        a.push($(e, c.key, `Variable "$${m}" does not appear in any GraphQL query.`));
    }
  return a;
}
t(z, "validateVariables");
function k(e, n) {
  if (!e || !n)
    return [];
  if (e instanceof j)
    return n.kind === "Null" ? [[n, `Type "${e}" is non-nullable and cannot be null.`]] : k(e.ofType, n);
  if (n.kind === "Null")
    return [];
  if (e instanceof C) {
    const i = e.ofType;
    if (n.kind === "Array") {
      const l = n.values || [];
      return L(l, (a) => k(i, a));
    }
    return k(i, n);
  }
  if (e instanceof M) {
    if (n.kind !== "Object")
      return [[n, `Type "${e}" must be an Object.`]];
    const i = /* @__PURE__ */ Object.create(null), l = L(n.members, (a) => {
      var c;
      const m = (c = a == null ? void 0 : a.key) === null || c === void 0 ? void 0 : c.value;
      i[m] = !0;
      const h = e.getFields()[m];
      if (!h)
        return [
          [
            a.key,
            `Type "${e}" does not have a field "${m}".`
          ]
        ];
      const y = h ? h.type : void 0;
      return k(y, a.value);
    });
    for (const a of Object.keys(e.getFields())) {
      const c = e.getFields()[a];
      !i[a] && c.type instanceof j && !c.defaultValue && l.push([
        n,
        `Object of type "${e}" is missing required field "${a}".`
      ]);
    }
    return l;
  }
  return e.name === "Boolean" && n.kind !== "Boolean" || e.name === "String" && n.kind !== "String" || e.name === "ID" && n.kind !== "Number" && n.kind !== "String" || e.name === "Float" && n.kind !== "Number" || e.name === "Int" && (n.kind !== "Number" || (n.value | 0) !== n.value) ? [[n, `Expected value of type "${e}".`]] : (e instanceof v || e instanceof D) && (n.kind !== "String" && n.kind !== "Number" && n.kind !== "Boolean" && n.kind !== "Null" || K(e.parseValue(n.value))) ? [[n, `Expected value of type "${e}".`]] : [];
}
t(k, "validateValue");
function $(e, n, i) {
  return {
    message: i,
    severity: "error",
    type: "validation",
    from: e.posFromIndex(n.start),
    to: e.posFromIndex(n.end)
  };
}
t($, "lintError");
function K(e) {
  return e == null || e !== e;
}
t(K, "isNullish");
function L(e, n) {
  return Array.prototype.concat.apply([], e.map(n));
}
t(L, "mapCat");
//# sourceMappingURL=lint.es3.js.map
