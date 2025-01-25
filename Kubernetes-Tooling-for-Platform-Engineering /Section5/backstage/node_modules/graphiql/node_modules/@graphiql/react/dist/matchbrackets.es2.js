var R = Object.defineProperty;
var f = (L, y) => R(L, "name", { value: y, configurable: !0 });
import { r as F } from "./codemirror.es2.js";
var T = { exports: {} }, E;
function j() {
  return E || (E = 1, function(L, y) {
    (function(o) {
      o(F());
    })(function(o) {
      var S = /MSIE \d/.test(navigator.userAgent) && (document.documentMode == null || document.documentMode < 8), g = o.Pos, p = { "(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<", "<": ">>", ">": "<<" };
      function A(t) {
        return t && t.bracketRegex || /[(){}[\]]/;
      }
      f(A, "bracketRegex");
      function b(t, r, e) {
        var i = t.getLineHandle(r.line), n = r.ch - 1, l = e && e.afterCursor;
        l == null && (l = /(^| )cm-fat-cursor($| )/.test(t.getWrapperElement().className));
        var h = A(e), u = !l && n >= 0 && h.test(i.text.charAt(n)) && p[i.text.charAt(n)] || h.test(i.text.charAt(n + 1)) && p[i.text.charAt(++n)];
        if (!u)
          return null;
        var a = u.charAt(1) == ">" ? 1 : -1;
        if (e && e.strict && a > 0 != (n == r.ch))
          return null;
        var k = t.getTokenTypeAt(g(r.line, n + 1)), s = H(t, g(r.line, n + (a > 0 ? 1 : 0)), a, k, e);
        return s == null ? null : {
          from: g(r.line, n),
          to: s && s.pos,
          match: s && s.ch == u.charAt(0),
          forward: a > 0
        };
      }
      f(b, "findMatchingBracket");
      function H(t, r, e, i, n) {
        for (var l = n && n.maxScanLineLength || 1e4, h = n && n.maxScanLines || 1e3, u = [], a = A(n), k = e > 0 ? Math.min(r.line + h, t.lastLine() + 1) : Math.max(t.firstLine() - 1, r.line - h), s = r.line; s != k; s += e) {
          var c = t.getLine(s);
          if (c) {
            var v = e > 0 ? 0 : c.length - 1, q = e > 0 ? c.length : -1;
            if (!(c.length > l))
              for (s == r.line && (v = r.ch - (e < 0 ? 1 : 0)); v != q; v += e) {
                var d = c.charAt(v);
                if (a.test(d) && (i === void 0 || (t.getTokenTypeAt(g(s, v + 1)) || "") == (i || ""))) {
                  var m = p[d];
                  if (m && m.charAt(1) == ">" == e > 0)
                    u.push(d);
                  else if (u.length)
                    u.pop();
                  else
                    return { pos: g(s, v), ch: d };
                }
              }
          }
        }
        return s - e == (e > 0 ? t.lastLine() : t.firstLine()) ? !1 : null;
      }
      f(H, "scanForBracket");
      function M(t, r, e) {
        for (var i = t.state.matchBrackets.maxHighlightLineLength || 1e3, n = e && e.highlightNonMatching, l = [], h = t.listSelections(), u = 0; u < h.length; u++) {
          var a = h[u].empty() && b(t, h[u].head, e);
          if (a && (a.match || n !== !1) && t.getLine(a.from.line).length <= i) {
            var k = a.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
            l.push(t.markText(a.from, g(a.from.line, a.from.ch + 1), { className: k })), a.to && t.getLine(a.to.line).length <= i && l.push(t.markText(a.to, g(a.to.line, a.to.ch + 1), { className: k }));
          }
        }
        if (l.length) {
          S && t.state.focused && t.focus();
          var s = /* @__PURE__ */ f(function() {
            t.operation(function() {
              for (var c = 0; c < l.length; c++)
                l[c].clear();
            });
          }, "clear");
          if (r)
            setTimeout(s, 800);
          else
            return s;
        }
      }
      f(M, "matchBrackets");
      function x(t) {
        t.operation(function() {
          t.state.matchBrackets.currentlyHighlighted && (t.state.matchBrackets.currentlyHighlighted(), t.state.matchBrackets.currentlyHighlighted = null), t.state.matchBrackets.currentlyHighlighted = M(t, !1, t.state.matchBrackets);
        });
      }
      f(x, "doMatchBrackets");
      function B(t) {
        t.state.matchBrackets && t.state.matchBrackets.currentlyHighlighted && (t.state.matchBrackets.currentlyHighlighted(), t.state.matchBrackets.currentlyHighlighted = null);
      }
      f(B, "clearHighlighted"), o.defineOption("matchBrackets", !1, function(t, r, e) {
        e && e != o.Init && (t.off("cursorActivity", x), t.off("focus", x), t.off("blur", B), B(t)), r && (t.state.matchBrackets = typeof r == "object" ? r : {}, t.on("cursorActivity", x), t.on("focus", x), t.on("blur", B));
      }), o.defineExtension("matchBrackets", function() {
        M(this, !0);
      }), o.defineExtension("findMatchingBracket", function(t, r, e) {
        return (e || typeof r == "boolean") && (e ? (e.strict = r, r = e) : r = r ? { strict: !0 } : null), b(this, t, r);
      }), o.defineExtension("scanForBracket", function(t, r, e, i) {
        return H(this, t, r, e, i);
      });
    });
  }()), T.exports;
}
f(j, "requireMatchbrackets");
export {
  j as r
};
//# sourceMappingURL=matchbrackets.es2.js.map
