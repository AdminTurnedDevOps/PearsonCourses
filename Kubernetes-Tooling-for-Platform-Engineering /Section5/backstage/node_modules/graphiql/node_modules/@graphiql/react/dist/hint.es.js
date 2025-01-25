import { C as r } from "./codemirror.es.js";
import "./show-hint.es.js";
import { Position as u, getAutocompleteSuggestions as g } from "graphql-language-service";
import "./codemirror.es2.js";
r.registerHelper("hint", "graphql", (o, a) => {
  const { schema: i, externalFragments: c } = a;
  if (!i)
    return;
  const s = o.getCursor(), e = o.getTokenAt(s), l = e.type !== null && /"|\w/.test(e.string[0]) ? e.start : e.end, p = new u(s.line, l), t = {
    list: g(i, o.getValue(), p, e, c).map((n) => ({
      text: n.label,
      type: n.type,
      description: n.documentation,
      isDeprecated: n.isDeprecated,
      deprecationReason: n.deprecationReason
    })),
    from: { line: s.line, ch: l },
    to: { line: s.line, ch: e.end }
  };
  return t != null && t.list && t.list.length > 0 && (t.from = r.Pos(t.from.line, t.from.ch), t.to = r.Pos(t.to.line, t.to.ch), r.signal(o, "hasCompletion", o, t, e)), t;
});
//# sourceMappingURL=hint.es.js.map
