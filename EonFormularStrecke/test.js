!function (t) {
    "use strict";
    t.matchMedia = t.matchMedia || function (t) {
            var e, i = t.documentElement, n = i.firstElementChild || i.firstChild, o = t.createElement("body"), s = t.createElement("div");
            return s.id = "mq-test-1", s.style.cssText = "position:absolute;top:-100em", o.style.background = "none", o.appendChild(s), function (t) {
                return s.innerHTML = '&shy;<style media="' + t + '"> #mq-test-1 { width: 42px; }</style>', i.insertBefore(o, n), e = 42 === s.offsetWidth, i.removeChild(o), {
                    matches: e,
                    media: t
                }
            }
        }(t.document)
}(this), function (t) {
    "use strict";
    function e() {
        w(!0)
    }

    var i = {};
    t.respond = i, i.update = function () {
    };
    var n = [], o = function () {
        var e = !1;
        try {
            e = new t.XMLHttpRequest
        } catch (i) {
            e = new t.ActiveXObject("Microsoft.XMLHTTP")
        }
        return function () {
            return e
        }
    }(), s = function (t, e) {
        var i = o();
        i && (i.open("GET", t, !0), i.onreadystatechange = function () {
            4 !== i.readyState || 200 !== i.status && 304 !== i.status || e(i.responseText)
        }, 4 !== i.readyState && i.send(null))
    };
    if (i.ajax = s, i.queue = n, i.regex = {
            media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
            keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
            urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
            findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
            only: /(only\s+)?([a-zA-Z]+)\s?/,
            minw: /\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,
            maxw: /\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/
        }, i.mediaQueriesSupported = t.matchMedia && null !== t.matchMedia("only all") && t.matchMedia("only all").matches, !i.mediaQueriesSupported) {
        var r, a, l, c = t.document, d = c.documentElement, u = [], p = [], h = [], f = {}, m = 30, g = c.getElementsByTagName("head")[0] || d, v = c.getElementsByTagName("base")[0], y = g.getElementsByTagName("link"), b = function () {
            var t, e = c.createElement("div"), i = c.body, n = d.style.fontSize, o = i && i.style.fontSize, s = !1;
            return e.style.cssText = "position:absolute;font-size:1em;width:1em", i || (i = s = c.createElement("body"), i.style.background = "none"), d.style.fontSize = "100%", i.style.fontSize = "100%", i.appendChild(e), s && d.insertBefore(i, d.firstChild), t = e.offsetWidth, s ? d.removeChild(i) : i.removeChild(e), d.style.fontSize = n, o && (i.style.fontSize = o), t = l = parseFloat(t)
        }, w = function (e) {
            var i = "clientWidth", n = d[i], o = "CSS1Compat" === c.compatMode && n || c.body[i] || n, s = {}, f = y[y.length - 1], v = (new Date).getTime();
            if (e && r && m > v - r)return t.clearTimeout(a), void(a = t.setTimeout(w, m));
            r = v;
            for (var k in u)if (u.hasOwnProperty(k)) {
                var x = u[k], T = x.minw, C = x.maxw, S = null === T, E = null === C, P = "em";
                T && (T = parseFloat(T) * (T.indexOf(P) > -1 ? l || b() : 1)), C && (C = parseFloat(C) * (C.indexOf(P) > -1 ? l || b() : 1)), x.hasquery && (S && E || !(S || o >= T) || !(E || C >= o)) || (s[x.media] || (s[x.media] = []), s[x.media].push(p[x.rules]))
            }
            for (var _ in h)h.hasOwnProperty(_) && h[_] && h[_].parentNode === g && g.removeChild(h[_]);
            h.length = 0;
            for (var $ in s)if (s.hasOwnProperty($)) {
                var j = c.createElement("style"), A = s[$].join("\n");
                j.type = "text/css", j.media = $, g.insertBefore(j, f.nextSibling), j.styleSheet ? j.styleSheet.cssText = A : j.appendChild(c.createTextNode(A)), h.push(j)
            }
        }, k = function (t, e, n) {
            var o = t.replace(i.regex.keyframes, "").match(i.regex.media), s = o && o.length || 0;
            e = e.substring(0, e.lastIndexOf("/"));
            var r = function (t) {
                return t.replace(i.regex.urls, "$1" + e + "$2$3")
            }, a = !s && n;
            e.length && (e += "/"), a && (s = 1);
            for (var l = 0; s > l; l++) {
                var c, d, h, f;
                a ? (c = n, p.push(r(t))) : (c = o[l].match(i.regex.findStyles) && RegExp.$1, p.push(RegExp.$2 && r(RegExp.$2))), h = c.split(","), f = h.length;
                for (var m = 0; f > m; m++)d = h[m], u.push({
                    media: d.split("(")[0].match(i.regex.only) && RegExp.$2 || "all",
                    rules: p.length - 1,
                    hasquery: d.indexOf("(") > -1,
                    minw: d.match(i.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                    maxw: d.match(i.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                })
            }
            w()
        }, x = function () {
            if (n.length) {
                var e = n.shift();
                s(e.href, function (i) {
                    k(i, e.href, e.media), f[e.href] = !0, t.setTimeout(function () {
                        x()
                    }, 0)
                })
            }
        }, T = function () {
            for (var e = 0; e < y.length; e++) {
                var i = y[e], o = i.href, s = i.media, r = i.rel && "stylesheet" === i.rel.toLowerCase();
                o && r && !f[o] && (i.styleSheet && i.styleSheet.rawCssText ? (k(i.styleSheet.rawCssText, o, s), f[o] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(o) && !v || o.replace(RegExp.$1, "").split("/")[0] === t.location.host) && ("//" === o.substring(0, 2) && (o = t.location.protocol + o), n.push({
                    href: o,
                    media: s
                })))
            }
            x()
        };
        T(), i.update = T, i.getEmValue = b, t.addEventListener ? t.addEventListener("resize", e, !1) : t.attachEvent && t.attachEvent("onresize", e)
    }
}(this), function (t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function (t) {
        if (!t.document)throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function (t, e) {
    function i(t) {
        var e = t.length, i = oe.type(t);
        return "function" === i || oe.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }

    function n(t, e, i) {
        if (oe.isFunction(e))return oe.grep(t, function (t, n) {
            return !!e.call(t, n, t) !== i
        });
        if (e.nodeType)return oe.grep(t, function (t) {
            return t === e !== i
        });
        if ("string" == typeof e) {
            if (pe.test(e))return oe.filter(e, t, i);
            e = oe.filter(e, t)
        }
        return oe.grep(t, function (t) {
            return oe.inArray(t, e) >= 0 !== i
        })
    }

    function o(t, e) {
        do t = t[e]; while (t && 1 !== t.nodeType);
        return t
    }

    function s(t) {
        var e = we[t] = {};
        return oe.each(t.match(be) || [], function (t, i) {
            e[i] = !0
        }), e
    }

    function r() {
        fe.addEventListener ? (fe.removeEventListener("DOMContentLoaded", a, !1), t.removeEventListener("load", a, !1)) : (fe.detachEvent("onreadystatechange", a), t.detachEvent("onload", a))
    }

    function a() {
        (fe.addEventListener || "load" === event.type || "complete" === fe.readyState) && (r(), oe.ready())
    }

    function l(t, e, i) {
        if (void 0 === i && 1 === t.nodeType) {
            var n = "data-" + e.replace(Se, "-$1").toLowerCase();
            if (i = t.getAttribute(n), "string" == typeof i) {
                try {
                    i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : Ce.test(i) ? oe.parseJSON(i) : i
                } catch (o) {
                }
                oe.data(t, e, i)
            } else i = void 0
        }
        return i
    }

    function c(t) {
        var e;
        for (e in t)if (("data" !== e || !oe.isEmptyObject(t[e])) && "toJSON" !== e)return !1;
        return !0
    }

    function d(t, e, i, n) {
        if (oe.acceptData(t)) {
            var o, s, r = oe.expando, a = t.nodeType, l = a ? oe.cache : t, c = a ? t[r] : t[r] && r;
            if (c && l[c] && (n || l[c].data) || void 0 !== i || "string" != typeof e)return c || (c = a ? t[r] = J.pop() || oe.guid++ : r), l[c] || (l[c] = a ? {} : {toJSON: oe.noop}), ("object" == typeof e || "function" == typeof e) && (n ? l[c] = oe.extend(l[c], e) : l[c].data = oe.extend(l[c].data, e)), s = l[c], n || (s.data || (s.data = {}), s = s.data), void 0 !== i && (s[oe.camelCase(e)] = i), "string" == typeof e ? (o = s[e], null == o && (o = s[oe.camelCase(e)])) : o = s, o
        }
    }

    function u(t, e, i) {
        if (oe.acceptData(t)) {
            var n, o, s = t.nodeType, r = s ? oe.cache : t, a = s ? t[oe.expando] : oe.expando;
            if (r[a]) {
                if (e && (n = i ? r[a] : r[a].data)) {
                    oe.isArray(e) ? e = e.concat(oe.map(e, oe.camelCase)) : e in n ? e = [e] : (e = oe.camelCase(e), e = e in n ? [e] : e.split(" ")), o = e.length;
                    for (; o--;)delete n[e[o]];
                    if (i ? !c(n) : !oe.isEmptyObject(n))return
                }
                (i || (delete r[a].data, c(r[a]))) && (s ? oe.cleanData([t], !0) : ie.deleteExpando || r != r.window ? delete r[a] : r[a] = null)
            }
        }
    }

    function p() {
        return !0
    }

    function h() {
        return !1
    }

    function f() {
        try {
            return fe.activeElement
        } catch (t) {
        }
    }

    function m(t) {
        var e = Ie.split("|"), i = t.createDocumentFragment();
        if (i.createElement)for (; e.length;)i.createElement(e.pop());
        return i
    }

    function g(t, e) {
        var i, n, o = 0, s = typeof t.getElementsByTagName !== Te ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== Te ? t.querySelectorAll(e || "*") : void 0;
        if (!s)for (s = [], i = t.childNodes || t; null != (n = i[o]); o++)!e || oe.nodeName(n, e) ? s.push(n) : oe.merge(s, g(n, e));
        return void 0 === e || e && oe.nodeName(t, e) ? oe.merge([t], s) : s
    }

    function v(t) {
        je.test(t.type) && (t.defaultChecked = t.checked)
    }

    function y(t, e) {
        return oe.nodeName(t, "table") && oe.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function b(t) {
        return t.type = (null !== oe.find.attr(t, "type")) + "/" + t.type, t
    }

    function w(t) {
        var e = Xe.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function k(t, e) {
        for (var i, n = 0; null != (i = t[n]); n++)oe._data(i, "globalEval", !e || oe._data(e[n], "globalEval"))
    }

    function x(t, e) {
        if (1 === e.nodeType && oe.hasData(t)) {
            var i, n, o, s = oe._data(t), r = oe._data(e, s), a = s.events;
            if (a) {
                delete r.handle, r.events = {};
                for (i in a)for (n = 0, o = a[i].length; o > n; n++)oe.event.add(e, i, a[i][n])
            }
            r.data && (r.data = oe.extend({}, r.data))
        }
    }

    function T(t, e) {
        var i, n, o;
        if (1 === e.nodeType) {
            if (i = e.nodeName.toLowerCase(), !ie.noCloneEvent && e[oe.expando]) {
                o = oe._data(e);
                for (n in o.events)oe.removeEvent(e, n, o.handle);
                e.removeAttribute(oe.expando)
            }
            "script" === i && e.text !== t.text ? (b(e).text = t.text, w(e)) : "object" === i ? (e.parentNode && (e.outerHTML = t.outerHTML), ie.html5Clone && t.innerHTML && !oe.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === i && je.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === i ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue)
        }
    }

    function C(e, i) {
        var n, o = oe(i.createElement(e)).appendTo(i.body), s = t.getDefaultComputedStyle && (n = t.getDefaultComputedStyle(o[0])) ? n.display : oe.css(o[0], "display");
        return o.detach(), s
    }

    function S(t) {
        var e = fe, i = Ze[t];
        return i || (i = C(t, e), "none" !== i && i || (Ke = (Ke || oe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (Ke[0].contentWindow || Ke[0].contentDocument).document, e.write(), e.close(), i = C(t, e), Ke.detach()), Ze[t] = i), i
    }

    function E(t, e) {
        return {
            get: function () {
                var i = t();
                if (null != i)return i ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }

    function P(t, e) {
        if (e in t)return e;
        for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, o = pi.length; o--;)if (e = pi[o] + i, e in t)return e;
        return n
    }

    function _(t, e) {
        for (var i, n, o, s = [], r = 0, a = t.length; a > r; r++)n = t[r], n.style && (s[r] = oe._data(n, "olddisplay"), i = n.style.display, e ? (s[r] || "none" !== i || (n.style.display = ""), "" === n.style.display && _e(n) && (s[r] = oe._data(n, "olddisplay", S(n.nodeName)))) : (o = _e(n), (i && "none" !== i || !o) && oe._data(n, "olddisplay", o ? i : oe.css(n, "display"))));
        for (r = 0; a > r; r++)n = t[r], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? s[r] || "" : "none"));
        return t
    }

    function $(t, e, i) {
        var n = li.exec(e);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
    }

    function j(t, e, i, n, o) {
        for (var s = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, r = 0; 4 > s; s += 2)"margin" === i && (r += oe.css(t, i + Pe[s], !0, o)), n ? ("content" === i && (r -= oe.css(t, "padding" + Pe[s], !0, o)), "margin" !== i && (r -= oe.css(t, "border" + Pe[s] + "Width", !0, o))) : (r += oe.css(t, "padding" + Pe[s], !0, o), "padding" !== i && (r += oe.css(t, "border" + Pe[s] + "Width", !0, o)));
        return r
    }

    function A(t, e, i) {
        var n = !0, o = "width" === e ? t.offsetWidth : t.offsetHeight, s = ti(t), r = ie.boxSizing && "border-box" === oe.css(t, "boxSizing", !1, s);
        if (0 >= o || null == o) {
            if (o = ei(t, e, s), (0 > o || null == o) && (o = t.style[e]), ni.test(o))return o;
            n = r && (ie.boxSizingReliable() || o === t.style[e]), o = parseFloat(o) || 0
        }
        return o + j(t, e, i || (r ? "border" : "content"), n, s) + "px"
    }

    function L(t, e, i, n, o) {
        return new L.prototype.init(t, e, i, n, o)
    }

    function D() {
        return setTimeout(function () {
            hi = void 0
        }), hi = oe.now()
    }

    function O(t, e) {
        var i, n = {height: t}, o = 0;
        for (e = e ? 1 : 0; 4 > o; o += 2 - e)i = Pe[o], n["margin" + i] = n["padding" + i] = t;
        return e && (n.opacity = n.width = t), n
    }

    function N(t, e, i) {
        for (var n, o = (bi[e] || []).concat(bi["*"]), s = 0, r = o.length; r > s; s++)if (n = o[s].call(i, e, t))return n
    }

    function I(t, e, i) {
        var n, o, s, r, a, l, c, d, u = this, p = {}, h = t.style, f = t.nodeType && _e(t), m = oe._data(t, "fxshow");
        i.queue || (a = oe._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function () {
            a.unqueued || l()
        }), a.unqueued++, u.always(function () {
            u.always(function () {
                a.unqueued--, oe.queue(t, "fx").length || a.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [h.overflow, h.overflowX, h.overflowY], c = oe.css(t, "display"), d = "none" === c ? oe._data(t, "olddisplay") || S(t.nodeName) : c, "inline" === d && "none" === oe.css(t, "float") && (ie.inlineBlockNeedsLayout && "inline" !== S(t.nodeName) ? h.zoom = 1 : h.display = "inline-block")), i.overflow && (h.overflow = "hidden", ie.shrinkWrapBlocks() || u.always(function () {
            h.overflow = i.overflow[0], h.overflowX = i.overflow[1], h.overflowY = i.overflow[2]
        }));
        for (n in e)if (o = e[n], mi.exec(o)) {
            if (delete e[n], s = s || "toggle" === o, o === (f ? "hide" : "show")) {
                if ("show" !== o || !m || void 0 === m[n])continue;
                f = !0
            }
            p[n] = m && m[n] || oe.style(t, n)
        } else c = void 0;
        if (oe.isEmptyObject(p))"inline" === ("none" === c ? S(t.nodeName) : c) && (h.display = c); else {
            m ? "hidden" in m && (f = m.hidden) : m = oe._data(t, "fxshow", {}), s && (m.hidden = !f), f ? oe(t).show() : u.done(function () {
                oe(t).hide()
            }), u.done(function () {
                var e;
                oe._removeData(t, "fxshow");
                for (e in p)oe.style(t, e, p[e])
            });
            for (n in p)r = N(f ? m[n] : 0, n, u), n in m || (m[n] = r.start, f && (r.end = r.start, r.start = "width" === n || "height" === n ? 1 : 0))
        }
    }

    function H(t, e) {
        var i, n, o, s, r;
        for (i in t)if (n = oe.camelCase(i), o = e[n], s = t[i], oe.isArray(s) && (o = s[1], s = t[i] = s[0]), i !== n && (t[n] = s, delete t[i]), r = oe.cssHooks[n], r && "expand" in r) {
            s = r.expand(s), delete t[n];
            for (i in s)i in t || (t[i] = s[i], e[i] = o)
        } else e[n] = o
    }

    function F(t, e, i) {
        var n, o, s = 0, r = yi.length, a = oe.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (o)return !1;
            for (var e = hi || D(), i = Math.max(0, c.startTime + c.duration - e), n = i / c.duration || 0, s = 1 - n, r = 0, l = c.tweens.length; l > r; r++)c.tweens[r].run(s);
            return a.notifyWith(t, [c, s, i]), 1 > s && l ? i : (a.resolveWith(t, [c]), !1)
        }, c = a.promise({
            elem: t,
            props: oe.extend({}, e),
            opts: oe.extend(!0, {specialEasing: {}}, i),
            originalProperties: e,
            originalOptions: i,
            startTime: hi || D(),
            duration: i.duration,
            tweens: [],
            createTween: function (e, i) {
                var n = oe.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing);
                return c.tweens.push(n), n
            },
            stop: function (e) {
                var i = 0, n = e ? c.tweens.length : 0;
                if (o)return this;
                for (o = !0; n > i; i++)c.tweens[i].run(1);
                return e ? a.resolveWith(t, [c, e]) : a.rejectWith(t, [c, e]), this
            }
        }), d = c.props;
        for (H(d, c.opts.specialEasing); r > s; s++)if (n = yi[s].call(c, t, d, c.opts))return n;
        return oe.map(d, N, c), oe.isFunction(c.opts.start) && c.opts.start.call(t, c), oe.fx.timer(oe.extend(l, {
            elem: t,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function M(t) {
        return function (e, i) {
            "string" != typeof e && (i = e, e = "*");
            var n, o = 0, s = e.toLowerCase().match(be) || [];
            if (oe.isFunction(i))for (; n = s[o++];)"+" === n.charAt(0) ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
        }
    }

    function R(t, e, i, n) {
        function o(a) {
            var l;
            return s[a] = !0, oe.each(t[a] || [], function (t, a) {
                var c = a(e, i, n);
                return "string" != typeof c || r || s[c] ? r ? !(l = c) : void 0 : (e.dataTypes.unshift(c), o(c), !1)
            }), l
        }

        var s = {}, r = t === qi;
        return o(e.dataTypes[0]) || !s["*"] && o("*")
    }

    function z(t, e) {
        var i, n, o = oe.ajaxSettings.flatOptions || {};
        for (n in e)void 0 !== e[n] && ((o[n] ? t : i || (i = {}))[n] = e[n]);
        return i && oe.extend(!0, t, i), t
    }

    function W(t, e, i) {
        for (var n, o, s, r, a = t.contents, l = t.dataTypes; "*" === l[0];)l.shift(), void 0 === o && (o = t.mimeType || e.getResponseHeader("Content-Type"));
        if (o)for (r in a)if (a[r] && a[r].test(o)) {
            l.unshift(r);
            break
        }
        if (l[0] in i)s = l[0]; else {
            for (r in i) {
                if (!l[0] || t.converters[r + " " + l[0]]) {
                    s = r;
                    break
                }
                n || (n = r)
            }
            s = s || n
        }
        return s ? (s !== l[0] && l.unshift(s), i[s]) : void 0
    }

    function q(t, e, i, n) {
        var o, s, r, a, l, c = {}, d = t.dataTypes.slice();
        if (d[1])for (r in t.converters)c[r.toLowerCase()] = t.converters[r];
        for (s = d.shift(); s;)if (t.responseFields[s] && (i[t.responseFields[s]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = s, s = d.shift())if ("*" === s)s = l; else if ("*" !== l && l !== s) {
            if (r = c[l + " " + s] || c["* " + s], !r)for (o in c)if (a = o.split(" "), a[1] === s && (r = c[l + " " + a[0]] || c["* " + a[0]])) {
                r === !0 ? r = c[o] : c[o] !== !0 && (s = a[0], d.unshift(a[1]));
                break
            }
            if (r !== !0)if (r && t["throws"])e = r(e); else try {
                e = r(e)
            } catch (u) {
                return {state: "parsererror", error: r ? u : "No conversion from " + l + " to " + s}
            }
        }
        return {state: "success", data: e}
    }

    function V(t, e, i, n) {
        var o;
        if (oe.isArray(e))oe.each(e, function (e, o) {
            i || Xi.test(t) ? n(t, o) : V(t + "[" + ("object" == typeof o ? e : "") + "]", o, i, n)
        }); else if (i || "object" !== oe.type(e))n(t, e); else for (o in e)V(t + "[" + o + "]", e[o], i, n)
    }

    function B() {
        try {
            return new t.XMLHttpRequest
        } catch (e) {
        }
    }

    function U() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
        }
    }

    function X(t) {
        return oe.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
    }

    var J = [], G = J.slice, Q = J.concat, Y = J.push, K = J.indexOf, Z = {}, te = Z.toString, ee = Z.hasOwnProperty, ie = {}, ne = "1.11.1", oe = function (t, e) {
        return new oe.fn.init(t, e)
    }, se = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, re = /^-ms-/, ae = /-([\da-z])/gi, le = function (t, e) {
        return e.toUpperCase()
    };
    oe.fn = oe.prototype = {
        jquery: ne, constructor: oe, selector: "", length: 0, toArray: function () {
            return G.call(this)
        }, get: function (t) {
            return null != t ? 0 > t ? this[t + this.length] : this[t] : G.call(this)
        }, pushStack: function (t) {
            var e = oe.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        }, each: function (t, e) {
            return oe.each(this, t, e)
        }, map: function (t) {
            return this.pushStack(oe.map(this, function (e, i) {
                return t.call(e, i, e)
            }))
        }, slice: function () {
            return this.pushStack(G.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (t) {
            var e = this.length, i = +t + (0 > t ? e : 0);
            return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: Y, sort: J.sort, splice: J.splice
    }, oe.extend = oe.fn.extend = function () {
        var t, e, i, n, o, s, r = arguments[0] || {}, a = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof r && (c = r, r = arguments[a] || {}, a++), "object" == typeof r || oe.isFunction(r) || (r = {}), a === l && (r = this, a--); l > a; a++)if (null != (o = arguments[a]))for (n in o)t = r[n], i = o[n], r !== i && (c && i && (oe.isPlainObject(i) || (e = oe.isArray(i))) ? (e ? (e = !1, s = t && oe.isArray(t) ? t : []) : s = t && oe.isPlainObject(t) ? t : {}, r[n] = oe.extend(c, s, i)) : void 0 !== i && (r[n] = i));
        return r
    }, oe.extend({
        expando: "jQuery" + (ne + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (t) {
            throw new Error(t)
        }, noop: function () {
        }, isFunction: function (t) {
            return "function" === oe.type(t)
        }, isArray: Array.isArray || function (t) {
            return "array" === oe.type(t)
        }, isWindow: function (t) {
            return null != t && t == t.window
        }, isNumeric: function (t) {
            return !oe.isArray(t) && t - parseFloat(t) >= 0
        }, isEmptyObject: function (t) {
            var e;
            for (e in t)return !1;
            return !0
        }, isPlainObject: function (t) {
            var e;
            if (!t || "object" !== oe.type(t) || t.nodeType || oe.isWindow(t))return !1;
            try {
                if (t.constructor && !ee.call(t, "constructor") && !ee.call(t.constructor.prototype, "isPrototypeOf"))return !1
            } catch (i) {
                return !1
            }
            if (ie.ownLast)for (e in t)return ee.call(t, e);
            for (e in t);
            return void 0 === e || ee.call(t, e)
        }, type: function (t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? Z[te.call(t)] || "object" : typeof t
        }, globalEval: function (e) {
            e && oe.trim(e) && (t.execScript || function (e) {
                t.eval.call(t, e)
            })(e)
        }, camelCase: function (t) {
            return t.replace(re, "ms-").replace(ae, le)
        }, nodeName: function (t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        }, each: function (t, e, n) {
            var o, s = 0, r = t.length, a = i(t);
            if (n) {
                if (a)for (; r > s && (o = e.apply(t[s], n), o !== !1); s++); else for (s in t)if (o = e.apply(t[s], n), o === !1)break
            } else if (a)for (; r > s && (o = e.call(t[s], s, t[s]), o !== !1); s++); else for (s in t)if (o = e.call(t[s], s, t[s]), o === !1)break;
            return t
        }, trim: function (t) {
            return null == t ? "" : (t + "").replace(se, "")
        }, makeArray: function (t, e) {
            var n = e || [];
            return null != t && (i(Object(t)) ? oe.merge(n, "string" == typeof t ? [t] : t) : Y.call(n, t)), n
        }, inArray: function (t, e, i) {
            var n;
            if (e) {
                if (K)return K.call(e, t, i);
                for (n = e.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)if (i in e && e[i] === t)return i
            }
            return -1
        }, merge: function (t, e) {
            for (var i = +e.length, n = 0, o = t.length; i > n;)t[o++] = e[n++];
            if (i !== i)for (; void 0 !== e[n];)t[o++] = e[n++];
            return t.length = o, t
        }, grep: function (t, e, i) {
            for (var n, o = [], s = 0, r = t.length, a = !i; r > s; s++)n = !e(t[s], s), n !== a && o.push(t[s]);
            return o
        }, map: function (t, e, n) {
            var o, s = 0, r = t.length, a = i(t), l = [];
            if (a)for (; r > s; s++)o = e(t[s], s, n), null != o && l.push(o); else for (s in t)o = e(t[s], s, n), null != o && l.push(o);
            return Q.apply([], l)
        }, guid: 1, proxy: function (t, e) {
            var i, n, o;
            return "string" == typeof e && (o = t[e], e = t, t = o), oe.isFunction(t) ? (i = G.call(arguments, 2), n = function () {
                return t.apply(e || this, i.concat(G.call(arguments)))
            }, n.guid = t.guid = t.guid || oe.guid++, n) : void 0
        }, now: function () {
            return +new Date
        }, support: ie
    }), oe.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
        Z["[object " + e + "]"] = e.toLowerCase()
    });
    var ce = function (t) {
        function e(t, e, i, n) {
            var o, s, r, a, l, c, u, h, f, m;
            if ((e ? e.ownerDocument || e : R) !== L && A(e), e = e || L, i = i || [], !t || "string" != typeof t)return i;
            if (1 !== (a = e.nodeType) && 9 !== a)return [];
            if (O && !n) {
                if (o = ye.exec(t))if (r = o[1]) {
                    if (9 === a) {
                        if (s = e.getElementById(r), !s || !s.parentNode)return i;
                        if (s.id === r)return i.push(s), i
                    } else if (e.ownerDocument && (s = e.ownerDocument.getElementById(r)) && F(e, s) && s.id === r)return i.push(s), i
                } else {
                    if (o[2])return Z.apply(i, e.getElementsByTagName(t)), i;
                    if ((r = o[3]) && k.getElementsByClassName && e.getElementsByClassName)return Z.apply(i, e.getElementsByClassName(r)), i
                }
                if (k.qsa && (!N || !N.test(t))) {
                    if (h = u = M, f = e, m = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                        for (c = S(t), (u = e.getAttribute("id")) ? h = u.replace(we, "\\$&") : e.setAttribute("id", h), h = "[id='" + h + "'] ", l = c.length; l--;)c[l] = h + p(c[l]);
                        f = be.test(t) && d(e.parentNode) || e, m = c.join(",")
                    }
                    if (m)try {
                        return Z.apply(i, f.querySelectorAll(m)), i
                    } catch (g) {
                    } finally {
                        u || e.removeAttribute("id")
                    }
                }
            }
            return P(t.replace(le, "$1"), e, i, n)
        }

        function i() {
            function t(i, n) {
                return e.push(i + " ") > x.cacheLength && delete t[e.shift()], t[i + " "] = n
            }

            var e = [];
            return t
        }

        function n(t) {
            return t[M] = !0, t
        }

        function o(t) {
            var e = L.createElement("div");
            try {
                return !!t(e)
            } catch (i) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function s(t, e) {
            for (var i = t.split("|"), n = t.length; n--;)x.attrHandle[i[n]] = e
        }

        function r(t, e) {
            var i = e && t, n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || J) - (~t.sourceIndex || J);
            if (n)return n;
            if (i)for (; i = i.nextSibling;)if (i === e)return -1;
            return t ? 1 : -1
        }

        function a(t) {
            return function (e) {
                var i = e.nodeName.toLowerCase();
                return "input" === i && e.type === t
            }
        }

        function l(t) {
            return function (e) {
                var i = e.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && e.type === t
            }
        }

        function c(t) {
            return n(function (e) {
                return e = +e, n(function (i, n) {
                    for (var o, s = t([], i.length, e), r = s.length; r--;)i[o = s[r]] && (i[o] = !(n[o] = i[o]))
                })
            })
        }

        function d(t) {
            return t && typeof t.getElementsByTagName !== X && t
        }

        function u() {
        }

        function p(t) {
            for (var e = 0, i = t.length, n = ""; i > e; e++)n += t[e].value;
            return n
        }

        function h(t, e, i) {
            var n = e.dir, o = i && "parentNode" === n, s = W++;
            return e.first ? function (e, i, s) {
                for (; e = e[n];)if (1 === e.nodeType || o)return t(e, i, s)
            } : function (e, i, r) {
                var a, l, c = [z, s];
                if (r) {
                    for (; e = e[n];)if ((1 === e.nodeType || o) && t(e, i, r))return !0
                } else for (; e = e[n];)if (1 === e.nodeType || o) {
                    if (l = e[M] || (e[M] = {}), (a = l[n]) && a[0] === z && a[1] === s)return c[2] = a[2];
                    if (l[n] = c, c[2] = t(e, i, r))return !0
                }
            }
        }

        function f(t) {
            return t.length > 1 ? function (e, i, n) {
                for (var o = t.length; o--;)if (!t[o](e, i, n))return !1;
                return !0
            } : t[0]
        }

        function m(t, i, n) {
            for (var o = 0, s = i.length; s > o; o++)e(t, i[o], n);
            return n
        }

        function g(t, e, i, n, o) {
            for (var s, r = [], a = 0, l = t.length, c = null != e; l > a; a++)(s = t[a]) && (!i || i(s, n, o)) && (r.push(s), c && e.push(a));
            return r
        }

        function v(t, e, i, o, s, r) {
            return o && !o[M] && (o = v(o)), s && !s[M] && (s = v(s, r)), n(function (n, r, a, l) {
                var c, d, u, p = [], h = [], f = r.length, v = n || m(e || "*", a.nodeType ? [a] : a, []), y = !t || !n && e ? v : g(v, p, t, a, l), b = i ? s || (n ? t : f || o) ? [] : r : y;
                if (i && i(y, b, a, l), o)for (c = g(b, h), o(c, [], a, l), d = c.length; d--;)(u = c[d]) && (b[h[d]] = !(y[h[d]] = u));
                if (n) {
                    if (s || t) {
                        if (s) {
                            for (c = [], d = b.length; d--;)(u = b[d]) && c.push(y[d] = u);
                            s(null, b = [], c, l)
                        }
                        for (d = b.length; d--;)(u = b[d]) && (c = s ? ee.call(n, u) : p[d]) > -1 && (n[c] = !(r[c] = u))
                    }
                } else b = g(b === r ? b.splice(f, b.length) : b), s ? s(null, r, b, l) : Z.apply(r, b)
            })
        }

        function y(t) {
            for (var e, i, n, o = t.length, s = x.relative[t[0].type], r = s || x.relative[" "], a = s ? 1 : 0, l = h(function (t) {
                return t === e
            }, r, !0), c = h(function (t) {
                return ee.call(e, t) > -1
            }, r, !0), d = [function (t, i, n) {
                return !s && (n || i !== _) || ((e = i).nodeType ? l(t, i, n) : c(t, i, n))
            }]; o > a; a++)if (i = x.relative[t[a].type])d = [h(f(d), i)]; else {
                if (i = x.filter[t[a].type].apply(null, t[a].matches), i[M]) {
                    for (n = ++a; o > n && !x.relative[t[n].type]; n++);
                    return v(a > 1 && f(d), a > 1 && p(t.slice(0, a - 1).concat({value: " " === t[a - 2].type ? "*" : ""})).replace(le, "$1"), i, n > a && y(t.slice(a, n)), o > n && y(t = t.slice(n)), o > n && p(t))
                }
                d.push(i)
            }
            return f(d)
        }

        function b(t, i) {
            var o = i.length > 0, s = t.length > 0, r = function (n, r, a, l, c) {
                var d, u, p, h = 0, f = "0", m = n && [], v = [], y = _, b = n || s && x.find.TAG("*", c), w = z += null == y ? 1 : Math.random() || .1, k = b.length;
                for (c && (_ = r !== L && r); f !== k && null != (d = b[f]); f++) {
                    if (s && d) {
                        for (u = 0; p = t[u++];)if (p(d, r, a)) {
                            l.push(d);
                            break
                        }
                        c && (z = w)
                    }
                    o && ((d = !p && d) && h--, n && m.push(d))
                }
                if (h += f, o && f !== h) {
                    for (u = 0; p = i[u++];)p(m, v, r, a);
                    if (n) {
                        if (h > 0)for (; f--;)m[f] || v[f] || (v[f] = Y.call(l));
                        v = g(v)
                    }
                    Z.apply(l, v), c && !n && v.length > 0 && h + i.length > 1 && e.uniqueSort(l)
                }
                return c && (z = w, _ = y), m
            };
            return o ? n(r) : r
        }

        var w, k, x, T, C, S, E, P, _, $, j, A, L, D, O, N, I, H, F, M = "sizzle" + -new Date, R = t.document, z = 0, W = 0, q = i(), V = i(), B = i(), U = function (t, e) {
            return t === e && (j = !0), 0
        }, X = "undefined", J = 1 << 31, G = {}.hasOwnProperty, Q = [], Y = Q.pop, K = Q.push, Z = Q.push, te = Q.slice, ee = Q.indexOf || function (t) {
                for (var e = 0, i = this.length; i > e; e++)if (this[e] === t)return e;
                return -1
            }, ie = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", oe = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", se = oe.replace("w", "w#"), re = "\\[" + ne + "*(" + oe + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + se + "))|)" + ne + "*\\]", ae = ":(" + oe + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)", le = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"), ce = new RegExp("^" + ne + "*," + ne + "*"), de = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), ue = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), pe = new RegExp(ae), he = new RegExp("^" + se + "$"), fe = {
            ID: new RegExp("^#(" + oe + ")"),
            CLASS: new RegExp("^\\.(" + oe + ")"),
            TAG: new RegExp("^(" + oe.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + re),
            PSEUDO: new RegExp("^" + ae),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + ie + ")$", "i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
        }, me = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, ve = /^[^{]+\{\s*\[native \w/, ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, be = /[+~]/, we = /'|\\/g, ke = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), xe = function (t, e, i) {
            var n = "0x" + e - 65536;
            return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
        };
        try {
            Z.apply(Q = te.call(R.childNodes), R.childNodes), Q[R.childNodes.length].nodeType
        } catch (Te) {
            Z = {
                apply: Q.length ? function (t, e) {
                    K.apply(t, te.call(e))
                } : function (t, e) {
                    for (var i = t.length, n = 0; t[i++] = e[n++];);
                    t.length = i - 1
                }
            }
        }
        k = e.support = {}, C = e.isXML = function (t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return e ? "HTML" !== e.nodeName : !1
        }, A = e.setDocument = function (t) {
            var e, i = t ? t.ownerDocument || t : R, n = i.defaultView;
            return i !== L && 9 === i.nodeType && i.documentElement ? (L = i, D = i.documentElement, O = !C(i), n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", function () {
                A()
            }, !1) : n.attachEvent && n.attachEvent("onunload", function () {
                A()
            })), k.attributes = o(function (t) {
                return t.className = "i", !t.getAttribute("className")
            }), k.getElementsByTagName = o(function (t) {
                return t.appendChild(i.createComment("")), !t.getElementsByTagName("*").length
            }), k.getElementsByClassName = ve.test(i.getElementsByClassName) && o(function (t) {
                    return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
                }), k.getById = o(function (t) {
                return D.appendChild(t).id = M, !i.getElementsByName || !i.getElementsByName(M).length
            }), k.getById ? (x.find.ID = function (t, e) {
                if (typeof e.getElementById !== X && O) {
                    var i = e.getElementById(t);
                    return i && i.parentNode ? [i] : []
                }
            }, x.filter.ID = function (t) {
                var e = t.replace(ke, xe);
                return function (t) {
                    return t.getAttribute("id") === e
                }
            }) : (delete x.find.ID, x.filter.ID = function (t) {
                var e = t.replace(ke, xe);
                return function (t) {
                    var i = typeof t.getAttributeNode !== X && t.getAttributeNode("id");
                    return i && i.value === e
                }
            }), x.find.TAG = k.getElementsByTagName ? function (t, e) {
                return typeof e.getElementsByTagName !== X ? e.getElementsByTagName(t) : void 0
            } : function (t, e) {
                var i, n = [], o = 0, s = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; i = s[o++];)1 === i.nodeType && n.push(i);
                    return n
                }
                return s
            }, x.find.CLASS = k.getElementsByClassName && function (t, e) {
                    return typeof e.getElementsByClassName !== X && O ? e.getElementsByClassName(t) : void 0
                }, I = [], N = [], (k.qsa = ve.test(i.querySelectorAll)) && (o(function (t) {
                t.innerHTML = "<select msallowclip=''><option selected=''></option></select>", t.querySelectorAll("[msallowclip^='']").length && N.push("[*^$]=" + ne + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || N.push("\\[" + ne + "*(?:value|" + ie + ")"), t.querySelectorAll(":checked").length || N.push(":checked")
            }), o(function (t) {
                var e = i.createElement("input");
                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && N.push("name" + ne + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || N.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), N.push(",.*:")
            })), (k.matchesSelector = ve.test(H = D.matches || D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && o(function (t) {
                k.disconnectedMatch = H.call(t, "div"), H.call(t, "[s!='']:x"), I.push("!=", ae)
            }), N = N.length && new RegExp(N.join("|")), I = I.length && new RegExp(I.join("|")), e = ve.test(D.compareDocumentPosition), F = e || ve.test(D.contains) ? function (t, e) {
                var i = 9 === t.nodeType ? t.documentElement : t, n = e && e.parentNode;
                return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
            } : function (t, e) {
                if (e)for (; e = e.parentNode;)if (e === t)return !0;
                return !1
            }, U = e ? function (t, e) {
                if (t === e)return j = !0, 0;
                var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !k.sortDetached && e.compareDocumentPosition(t) === n ? t === i || t.ownerDocument === R && F(R, t) ? -1 : e === i || e.ownerDocument === R && F(R, e) ? 1 : $ ? ee.call($, t) - ee.call($, e) : 0 : 4 & n ? -1 : 1)
            } : function (t, e) {
                if (t === e)return j = !0, 0;
                var n, o = 0, s = t.parentNode, a = e.parentNode, l = [t], c = [e];
                if (!s || !a)return t === i ? -1 : e === i ? 1 : s ? -1 : a ? 1 : $ ? ee.call($, t) - ee.call($, e) : 0;
                if (s === a)return r(t, e);
                for (n = t; n = n.parentNode;)l.unshift(n);
                for (n = e; n = n.parentNode;)c.unshift(n);
                for (; l[o] === c[o];)o++;
                return o ? r(l[o], c[o]) : l[o] === R ? -1 : c[o] === R ? 1 : 0
            }, i) : L
        }, e.matches = function (t, i) {
            return e(t, null, null, i)
        }, e.matchesSelector = function (t, i) {
            if ((t.ownerDocument || t) !== L && A(t), i = i.replace(ue, "='$1']"), !(!k.matchesSelector || !O || I && I.test(i) || N && N.test(i)))try {
                var n = H.call(t, i);
                if (n || k.disconnectedMatch || t.document && 11 !== t.document.nodeType)return n
            } catch (o) {
            }
            return e(i, L, null, [t]).length > 0
        }, e.contains = function (t, e) {
            return (t.ownerDocument || t) !== L && A(t), F(t, e)
        }, e.attr = function (t, e) {
            (t.ownerDocument || t) !== L && A(t);
            var i = x.attrHandle[e.toLowerCase()], n = i && G.call(x.attrHandle, e.toLowerCase()) ? i(t, e, !O) : void 0;
            return void 0 !== n ? n : k.attributes || !O ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }, e.error = function (t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, e.uniqueSort = function (t) {
            var e, i = [], n = 0, o = 0;
            if (j = !k.detectDuplicates, $ = !k.sortStable && t.slice(0), t.sort(U), j) {
                for (; e = t[o++];)e === t[o] && (n = i.push(o));
                for (; n--;)t.splice(i[n], 1)
            }
            return $ = null, t
        }, T = e.getText = function (t) {
            var e, i = "", n = 0, o = t.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof t.textContent)return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling)i += T(t)
                } else if (3 === o || 4 === o)return t.nodeValue
            } else for (; e = t[n++];)i += T(e);
            return i
        }, x = e.selectors = {
            cacheLength: 50,
            createPseudo: n,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (t) {
                    return t[1] = t[1].replace(ke, xe), t[3] = (t[3] || t[4] || t[5] || "").replace(ke, xe), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                }, CHILD: function (t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                }, PSEUDO: function (t) {
                    var e, i = !t[6] && t[2];
                    return fe.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && pe.test(i) && (e = S(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                }
            },
            filter: {
                TAG: function (t) {
                    var e = t.replace(ke, xe).toLowerCase();
                    return "*" === t ? function () {
                        return !0
                    } : function (t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                }, CLASS: function (t) {
                    var e = q[t + " "];
                    return e || (e = new RegExp("(^|" + ne + ")" + t + "(" + ne + "|$)")) && q(t, function (t) {
                            return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== X && t.getAttribute("class") || "")
                        })
                }, ATTR: function (t, i, n) {
                    return function (o) {
                        var s = e.attr(o, t);
                        return null == s ? "!=" === i : i ? (s += "", "=" === i ? s === n : "!=" === i ? s !== n : "^=" === i ? n && 0 === s.indexOf(n) : "*=" === i ? n && s.indexOf(n) > -1 : "$=" === i ? n && s.slice(-n.length) === n : "~=" === i ? (" " + s + " ").indexOf(n) > -1 : "|=" === i ? s === n || s.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                }, CHILD: function (t, e, i, n, o) {
                    var s = "nth" !== t.slice(0, 3), r = "last" !== t.slice(-4), a = "of-type" === e;
                    return 1 === n && 0 === o ? function (t) {
                        return !!t.parentNode
                    } : function (e, i, l) {
                        var c, d, u, p, h, f, m = s !== r ? "nextSibling" : "previousSibling", g = e.parentNode, v = a && e.nodeName.toLowerCase(), y = !l && !a;
                        if (g) {
                            if (s) {
                                for (; m;) {
                                    for (u = e; u = u[m];)if (a ? u.nodeName.toLowerCase() === v : 1 === u.nodeType)return !1;
                                    f = m = "only" === t && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [r ? g.firstChild : g.lastChild], r && y) {
                                for (d = g[M] || (g[M] = {}), c = d[t] || [], h = c[0] === z && c[1], p = c[0] === z && c[2], u = h && g.childNodes[h]; u = ++h && u && u[m] || (p = h = 0) || f.pop();)if (1 === u.nodeType && ++p && u === e) {
                                    d[t] = [z, h, p];
                                    break
                                }
                            } else if (y && (c = (e[M] || (e[M] = {}))[t]) && c[0] === z)p = c[1]; else for (; (u = ++h && u && u[m] || (p = h = 0) || f.pop()) && ((a ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++p || (y && ((u[M] || (u[M] = {}))[t] = [z, p]), u !== e)););
                            return p -= o, p === n || p % n === 0 && p / n >= 0
                        }
                    }
                }, PSEUDO: function (t, i) {
                    var o, s = x.pseudos[t] || x.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                    return s[M] ? s(i) : s.length > 1 ? (o = [t, t, "", i], x.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function (t, e) {
                        for (var n, o = s(t, i), r = o.length; r--;)n = ee.call(t, o[r]), t[n] = !(e[n] = o[r])
                    }) : function (t) {
                        return s(t, 0, o)
                    }) : s
                }
            },
            pseudos: {
                not: n(function (t) {
                    var e = [], i = [], o = E(t.replace(le, "$1"));
                    return o[M] ? n(function (t, e, i, n) {
                        for (var s, r = o(t, null, n, []), a = t.length; a--;)(s = r[a]) && (t[a] = !(e[a] = s))
                    }) : function (t, n, s) {
                        return e[0] = t, o(e, null, s, i), !i.pop()
                    }
                }), has: n(function (t) {
                    return function (i) {
                        return e(t, i).length > 0
                    }
                }), contains: n(function (t) {
                    return function (e) {
                        return (e.textContent || e.innerText || T(e)).indexOf(t) > -1
                    }
                }), lang: n(function (t) {
                    return he.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(ke, xe).toLowerCase(), function (e) {
                        var i;
                        do if (i = O ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1
                    }
                }), target: function (e) {
                    var i = t.location && t.location.hash;
                    return i && i.slice(1) === e.id
                }, root: function (t) {
                    return t === D
                }, focus: function (t) {
                    return t === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                }, enabled: function (t) {
                    return t.disabled === !1
                }, disabled: function (t) {
                    return t.disabled === !0
                }, checked: function (t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                }, selected: function (t) {
                    return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                }, empty: function (t) {
                    for (t = t.firstChild; t; t = t.nextSibling)if (t.nodeType < 6)return !1;
                    return !0
                }, parent: function (t) {
                    return !x.pseudos.empty(t)
                }, header: function (t) {
                    return ge.test(t.nodeName)
                }, input: function (t) {
                    return me.test(t.nodeName)
                }, button: function (t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                }, text: function (t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                }, first: c(function () {
                    return [0]
                }), last: c(function (t, e) {
                    return [e - 1]
                }), eq: c(function (t, e, i) {
                    return [0 > i ? i + e : i]
                }), even: c(function (t, e) {
                    for (var i = 0; e > i; i += 2)t.push(i);
                    return t
                }), odd: c(function (t, e) {
                    for (var i = 1; e > i; i += 2)t.push(i);
                    return t
                }), lt: c(function (t, e, i) {
                    for (var n = 0 > i ? i + e : i; --n >= 0;)t.push(n);
                    return t
                }), gt: c(function (t, e, i) {
                    for (var n = 0 > i ? i + e : i; ++n < e;)t.push(n);
                    return t
                })
            }
        }, x.pseudos.nth = x.pseudos.eq;
        for (w in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})x.pseudos[w] = a(w);
        for (w in{submit: !0, reset: !0})x.pseudos[w] = l(w);
        return u.prototype = x.filters = x.pseudos, x.setFilters = new u, S = e.tokenize = function (t, i) {
            var n, o, s, r, a, l, c, d = V[t + " "];
            if (d)return i ? 0 : d.slice(0);
            for (a = t, l = [], c = x.preFilter; a;) {
                (!n || (o = ce.exec(a))) && (o && (a = a.slice(o[0].length) || a), l.push(s = [])), n = !1, (o = de.exec(a)) && (n = o.shift(), s.push({
                    value: n,
                    type: o[0].replace(le, " ")
                }), a = a.slice(n.length));
                for (r in x.filter)!(o = fe[r].exec(a)) || c[r] && !(o = c[r](o)) || (n = o.shift(), s.push({
                    value: n,
                    type: r,
                    matches: o
                }), a = a.slice(n.length));
                if (!n)break
            }
            return i ? a.length : a ? e.error(t) : V(t, l).slice(0)
        }, E = e.compile = function (t, e) {
            var i, n = [], o = [], s = B[t + " "];
            if (!s) {
                for (e || (e = S(t)), i = e.length; i--;)s = y(e[i]), s[M] ? n.push(s) : o.push(s);
                s = B(t, b(o, n)), s.selector = t
            }
            return s
        }, P = e.select = function (t, e, i, n) {
            var o, s, r, a, l, c = "function" == typeof t && t, u = !n && S(t = c.selector || t);
            if (i = i || [], 1 === u.length) {
                if (s = u[0] = u[0].slice(0), s.length > 2 && "ID" === (r = s[0]).type && k.getById && 9 === e.nodeType && O && x.relative[s[1].type]) {
                    if (e = (x.find.ID(r.matches[0].replace(ke, xe), e) || [])[0], !e)return i;
                    c && (e = e.parentNode), t = t.slice(s.shift().value.length)
                }
                for (o = fe.needsContext.test(t) ? 0 : s.length; o-- && (r = s[o], !x.relative[a = r.type]);)if ((l = x.find[a]) && (n = l(r.matches[0].replace(ke, xe), be.test(s[0].type) && d(e.parentNode) || e))) {
                    if (s.splice(o, 1), t = n.length && p(s), !t)return Z.apply(i, n), i;
                    break
                }
            }
            return (c || E(t, u))(n, e, !O, i, be.test(t) && d(e.parentNode) || e), i
        }, k.sortStable = M.split("").sort(U).join("") === M, k.detectDuplicates = !!j, A(), k.sortDetached = o(function (t) {
            return 1 & t.compareDocumentPosition(L.createElement("div"))
        }), o(function (t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || s("type|href|height|width", function (t, e, i) {
            return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), k.attributes && o(function (t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || s("value", function (t, e, i) {
            return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
        }), o(function (t) {
            return null == t.getAttribute("disabled")
        }) || s(ie, function (t, e, i) {
            var n;
            return i ? void 0 : t[e] === !0 ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }), e
    }(t);
    oe.find = ce, oe.expr = ce.selectors, oe.expr[":"] = oe.expr.pseudos, oe.unique = ce.uniqueSort, oe.text = ce.getText, oe.isXMLDoc = ce.isXML, oe.contains = ce.contains;
    var de = oe.expr.match.needsContext, ue = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, pe = /^.[^:#\[\.,]*$/;
    oe.filter = function (t, e, i) {
        var n = e[0];
        return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? oe.find.matchesSelector(n, t) ? [n] : [] : oe.find.matches(t, oe.grep(e, function (t) {
            return 1 === t.nodeType
        }))
    }, oe.fn.extend({
        find: function (t) {
            var e, i = [], n = this, o = n.length;
            if ("string" != typeof t)return this.pushStack(oe(t).filter(function () {
                for (e = 0; o > e; e++)if (oe.contains(n[e], this))return !0
            }));
            for (e = 0; o > e; e++)oe.find(t, n[e], i);
            return i = this.pushStack(o > 1 ? oe.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
        }, filter: function (t) {
            return this.pushStack(n(this, t || [], !1))
        }, not: function (t) {
            return this.pushStack(n(this, t || [], !0))
        }, is: function (t) {
            return !!n(this, "string" == typeof t && de.test(t) ? oe(t) : t || [], !1).length
        }
    });
    var he, fe = t.document, me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ge = oe.fn.init = function (t, e) {
        var i, n;
        if (!t)return this;
        if ("string" == typeof t) {
            if (i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : me.exec(t), !i || !i[1] && e)return !e || e.jquery ? (e || he).find(t) : this.constructor(e).find(t);
            if (i[1]) {
                if (e = e instanceof oe ? e[0] : e, oe.merge(this, oe.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : fe, !0)), ue.test(i[1]) && oe.isPlainObject(e))for (i in e)oe.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                return this
            }
            if (n = fe.getElementById(i[2]), n && n.parentNode) {
                if (n.id !== i[2])return he.find(t);
                this.length = 1, this[0] = n
            }
            return this.context = fe, this.selector = t, this
        }
        return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : oe.isFunction(t) ? "undefined" != typeof he.ready ? he.ready(t) : t(oe) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), oe.makeArray(t, this))
    };
    ge.prototype = oe.fn, he = oe(fe);
    var ve = /^(?:parents|prev(?:Until|All))/, ye = {children: !0, contents: !0, next: !0, prev: !0};
    oe.extend({
        dir: function (t, e, i) {
            for (var n = [], o = t[e]; o && 9 !== o.nodeType && (void 0 === i || 1 !== o.nodeType || !oe(o).is(i));)1 === o.nodeType && n.push(o), o = o[e];
            return n
        }, sibling: function (t, e) {
            for (var i = []; t; t = t.nextSibling)1 === t.nodeType && t !== e && i.push(t);
            return i
        }
    }), oe.fn.extend({
        has: function (t) {
            var e, i = oe(t, this), n = i.length;
            return this.filter(function () {
                for (e = 0; n > e; e++)if (oe.contains(this, i[e]))return !0
            })
        }, closest: function (t, e) {
            for (var i, n = 0, o = this.length, s = [], r = de.test(t) || "string" != typeof t ? oe(t, e || this.context) : 0; o > n; n++)for (i = this[n]; i && i !== e; i = i.parentNode)if (i.nodeType < 11 && (r ? r.index(i) > -1 : 1 === i.nodeType && oe.find.matchesSelector(i, t))) {
                s.push(i);
                break
            }
            return this.pushStack(s.length > 1 ? oe.unique(s) : s)
        }, index: function (t) {
            return t ? "string" == typeof t ? oe.inArray(this[0], oe(t)) : oe.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (t, e) {
            return this.pushStack(oe.unique(oe.merge(this.get(), oe(t, e))))
        }, addBack: function (t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), oe.each({
        parent: function (t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        }, parents: function (t) {
            return oe.dir(t, "parentNode")
        }, parentsUntil: function (t, e, i) {
            return oe.dir(t, "parentNode", i)
        }, next: function (t) {
            return o(t, "nextSibling")
        }, prev: function (t) {
            return o(t, "previousSibling")
        }, nextAll: function (t) {
            return oe.dir(t, "nextSibling")
        }, prevAll: function (t) {
            return oe.dir(t, "previousSibling")
        }, nextUntil: function (t, e, i) {
            return oe.dir(t, "nextSibling", i)
        }, prevUntil: function (t, e, i) {
            return oe.dir(t, "previousSibling", i)
        }, siblings: function (t) {
            return oe.sibling((t.parentNode || {}).firstChild, t)
        }, children: function (t) {
            return oe.sibling(t.firstChild)
        }, contents: function (t) {
            return oe.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : oe.merge([], t.childNodes)
        }
    }, function (t, e) {
        oe.fn[t] = function (i, n) {
            var o = oe.map(this, e, i);
            return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (o = oe.filter(n, o)), this.length > 1 && (ye[t] || (o = oe.unique(o)), ve.test(t) && (o = o.reverse())), this.pushStack(o)
        }
    });
    var be = /\S+/g, we = {};
    oe.Callbacks = function (t) {
        t = "string" == typeof t ? we[t] || s(t) : oe.extend({}, t);
        var e, i, n, o, r, a, l = [], c = !t.once && [], d = function (s) {
            for (i = t.memory && s, n = !0, r = a || 0, a = 0, o = l.length, e = !0; l && o > r; r++)if (l[r].apply(s[0], s[1]) === !1 && t.stopOnFalse) {
                i = !1;
                break
            }
            e = !1, l && (c ? c.length && d(c.shift()) : i ? l = [] : u.disable())
        }, u = {
            add: function () {
                if (l) {
                    var n = l.length;
                    !function s(e) {
                        oe.each(e, function (e, i) {
                            var n = oe.type(i);
                            "function" === n ? t.unique && u.has(i) || l.push(i) : i && i.length && "string" !== n && s(i)
                        })
                    }(arguments), e ? o = l.length : i && (a = n, d(i))
                }
                return this
            }, remove: function () {
                return l && oe.each(arguments, function (t, i) {
                    for (var n; (n = oe.inArray(i, l, n)) > -1;)l.splice(n, 1), e && (o >= n && o--, r >= n && r--)
                }), this
            }, has: function (t) {
                return t ? oe.inArray(t, l) > -1 : !(!l || !l.length)
            }, empty: function () {
                return l = [], o = 0, this
            }, disable: function () {
                return l = c = i = void 0, this
            }, disabled: function () {
                return !l
            }, lock: function () {
                return c = void 0, i || u.disable(), this
            }, locked: function () {
                return !c
            }, fireWith: function (t, i) {
                return !l || n && !c || (i = i || [], i = [t, i.slice ? i.slice() : i], e ? c.push(i) : d(i)), this
            }, fire: function () {
                return u.fireWith(this, arguments), this
            }, fired: function () {
                return !!n
            }
        };
        return u
    }, oe.extend({
        Deferred: function (t) {
            var e = [["resolve", "done", oe.Callbacks("once memory"), "resolved"], ["reject", "fail", oe.Callbacks("once memory"), "rejected"], ["notify", "progress", oe.Callbacks("memory")]], i = "pending", n = {
                state: function () {
                    return i
                }, always: function () {
                    return o.done(arguments).fail(arguments), this
                }, then: function () {
                    var t = arguments;
                    return oe.Deferred(function (i) {
                        oe.each(e, function (e, s) {
                            var r = oe.isFunction(t[e]) && t[e];
                            o[s[1]](function () {
                                var t = r && r.apply(this, arguments);
                                t && oe.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[s[0] + "With"](this === n ? i.promise() : this, r ? [t] : arguments)
                            })
                        }), t = null
                    }).promise()
                }, promise: function (t) {
                    return null != t ? oe.extend(t, n) : n
                }
            }, o = {};
            return n.pipe = n.then, oe.each(e, function (t, s) {
                var r = s[2], a = s[3];
                n[s[1]] = r.add, a && r.add(function () {
                    i = a
                }, e[1 ^ t][2].disable, e[2][2].lock), o[s[0]] = function () {
                    return o[s[0] + "With"](this === o ? n : this, arguments), this
                }, o[s[0] + "With"] = r.fireWith
            }), n.promise(o), t && t.call(o, o), o
        }, when: function (t) {
            var e, i, n, o = 0, s = G.call(arguments), r = s.length, a = 1 !== r || t && oe.isFunction(t.promise) ? r : 0, l = 1 === a ? t : oe.Deferred(), c = function (t, i, n) {
                return function (o) {
                    i[t] = this, n[t] = arguments.length > 1 ? G.call(arguments) : o, n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n)
                }
            };
            if (r > 1)for (e = new Array(r), i = new Array(r), n = new Array(r); r > o; o++)s[o] && oe.isFunction(s[o].promise) ? s[o].promise().done(c(o, n, s)).fail(l.reject).progress(c(o, i, e)) : --a;
            return a || l.resolveWith(n, s), l.promise()
        }
    });
    var ke;
    oe.fn.ready = function (t) {
        return oe.ready.promise().done(t), this
    }, oe.extend({
        isReady: !1, readyWait: 1, holdReady: function (t) {
            t ? oe.readyWait++ : oe.ready(!0)
        }, ready: function (t) {
            if (t === !0 ? !--oe.readyWait : !oe.isReady) {
                if (!fe.body)return setTimeout(oe.ready);
                oe.isReady = !0, t !== !0 && --oe.readyWait > 0 || (ke.resolveWith(fe, [oe]), oe.fn.triggerHandler && (oe(fe).triggerHandler("ready"), oe(fe).off("ready")))
            }
        }
    }), oe.ready.promise = function (e) {
        if (!ke)if (ke = oe.Deferred(), "complete" === fe.readyState)setTimeout(oe.ready); else if (fe.addEventListener)fe.addEventListener("DOMContentLoaded", a, !1), t.addEventListener("load", a, !1); else {
            fe.attachEvent("onreadystatechange", a), t.attachEvent("onload", a);
            var i = !1;
            try {
                i = null == t.frameElement && fe.documentElement
            } catch (n) {
            }
            i && i.doScroll && !function o() {
                if (!oe.isReady) {
                    try {
                        i.doScroll("left")
                    } catch (t) {
                        return setTimeout(o, 50)
                    }
                    r(), oe.ready()
                }
            }()
        }
        return ke.promise(e)
    };
    var xe, Te = "undefined";
    for (xe in oe(ie))break;
    ie.ownLast = "0" !== xe, ie.inlineBlockNeedsLayout = !1, oe(function () {
        var t, e, i, n;
        i = fe.getElementsByTagName("body")[0], i && i.style && (e = fe.createElement("div"), n = fe.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== Te && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ie.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (i.style.zoom = 1)), i.removeChild(n))
    }), function () {
        var t = fe.createElement("div");
        if (null == ie.deleteExpando) {
            ie.deleteExpando = !0;
            try {
                delete t.test
            } catch (e) {
                ie.deleteExpando = !1
            }
        }
        t = null
    }(), oe.acceptData = function (t) {
        var e = oe.noData[(t.nodeName + " ").toLowerCase()], i = +t.nodeType || 1;
        return 1 !== i && 9 !== i ? !1 : !e || e !== !0 && t.getAttribute("classid") === e
    };
    var Ce = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Se = /([A-Z])/g;
    oe.extend({
        cache: {},
        noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (t) {
            return t = t.nodeType ? oe.cache[t[oe.expando]] : t[oe.expando], !!t && !c(t)
        },
        data: function (t, e, i) {
            return d(t, e, i)
        },
        removeData: function (t, e) {
            return u(t, e)
        },
        _data: function (t, e, i) {
            return d(t, e, i, !0)
        },
        _removeData: function (t, e) {
            return u(t, e, !0)
        }
    }), oe.fn.extend({
        data: function (t, e) {
            var i, n, o, s = this[0], r = s && s.attributes;
            if (void 0 === t) {
                if (this.length && (o = oe.data(s), 1 === s.nodeType && !oe._data(s, "parsedAttrs"))) {
                    for (i = r.length; i--;)r[i] && (n = r[i].name, 0 === n.indexOf("data-") && (n = oe.camelCase(n.slice(5)), l(s, n, o[n])));
                    oe._data(s, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof t ? this.each(function () {
                oe.data(this, t)
            }) : arguments.length > 1 ? this.each(function () {
                oe.data(this, t, e)
            }) : s ? l(s, t, oe.data(s, t)) : void 0
        }, removeData: function (t) {
            return this.each(function () {
                oe.removeData(this, t)
            })
        }
    }), oe.extend({
        queue: function (t, e, i) {
            var n;
            return t ? (e = (e || "fx") + "queue", n = oe._data(t, e), i && (!n || oe.isArray(i) ? n = oe._data(t, e, oe.makeArray(i)) : n.push(i)), n || []) : void 0
        }, dequeue: function (t, e) {
            e = e || "fx";
            var i = oe.queue(t, e), n = i.length, o = i.shift(), s = oe._queueHooks(t, e), r = function () {
                oe.dequeue(t, e)
            };
            "inprogress" === o && (o = i.shift(), n--), o && ("fx" === e && i.unshift("inprogress"), delete s.stop, o.call(t, r, s)), !n && s && s.empty.fire()
        }, _queueHooks: function (t, e) {
            var i = e + "queueHooks";
            return oe._data(t, i) || oe._data(t, i, {
                    empty: oe.Callbacks("once memory").add(function () {
                        oe._removeData(t, e + "queue"), oe._removeData(t, i)
                    })
                })
        }
    }), oe.fn.extend({
        queue: function (t, e) {
            var i = 2;
            return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? oe.queue(this[0], t) : void 0 === e ? this : this.each(function () {
                var i = oe.queue(this, t, e);
                oe._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && oe.dequeue(this, t)
            })
        }, dequeue: function (t) {
            return this.each(function () {
                oe.dequeue(this, t)
            })
        }, clearQueue: function (t) {
            return this.queue(t || "fx", [])
        }, promise: function (t, e) {
            var i, n = 1, o = oe.Deferred(), s = this, r = this.length, a = function () {
                --n || o.resolveWith(s, [s])
            };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; r--;)i = oe._data(s[r], t + "queueHooks"), i && i.empty && (n++, i.empty.add(a));
            return a(), o.promise(e)
        }
    });
    var Ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Pe = ["Top", "Right", "Bottom", "Left"], _e = function (t, e) {
        return t = e || t, "none" === oe.css(t, "display") || !oe.contains(t.ownerDocument, t)
    }, $e = oe.access = function (t, e, i, n, o, s, r) {
        var a = 0, l = t.length, c = null == i;
        if ("object" === oe.type(i)) {
            o = !0;
            for (a in i)oe.access(t, e, a, i[a], !0, s, r)
        } else if (void 0 !== n && (o = !0, oe.isFunction(n) || (r = !0), c && (r ? (e.call(t, n), e = null) : (c = e, e = function (t, e, i) {
                return c.call(oe(t), i)
            })), e))for (; l > a; a++)e(t[a], i, r ? n : n.call(t[a], a, e(t[a], i)));
        return o ? t : c ? e.call(t) : l ? e(t[0], i) : s
    }, je = /^(?:checkbox|radio)$/i;
    !function () {
        var t = fe.createElement("input"), e = fe.createElement("div"), i = fe.createDocumentFragment();
        if (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ie.leadingWhitespace = 3 === e.firstChild.nodeType, ie.tbody = !e.getElementsByTagName("tbody").length, ie.htmlSerialize = !!e.getElementsByTagName("link").length, ie.html5Clone = "<:nav></:nav>" !== fe.createElement("nav").cloneNode(!0).outerHTML, t.type = "checkbox", t.checked = !0, i.appendChild(t), ie.appendChecked = t.checked, e.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, i.appendChild(e), e.innerHTML = "<input type='radio' checked='checked' name='t'/>", ie.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, ie.noCloneEvent = !0, e.attachEvent && (e.attachEvent("onclick", function () {
                ie.noCloneEvent = !1
            }), e.cloneNode(!0).click()), null == ie.deleteExpando) {
            ie.deleteExpando = !0;
            try {
                delete e.test
            } catch (n) {
                ie.deleteExpando = !1
            }
        }
    }(), function () {
        var e, i, n = fe.createElement("div");
        for (e in{
            submit: !0,
            change: !0,
            focusin: !0
        })i = "on" + e, (ie[e + "Bubbles"] = i in t) || (n.setAttribute(i, "t"), ie[e + "Bubbles"] = n.attributes[i].expando === !1);
        n = null
    }();
    var Ae = /^(?:input|select|textarea)$/i, Le = /^key/, De = /^(?:mouse|pointer|contextmenu)|click/, Oe = /^(?:focusinfocus|focusoutblur)$/, Ne = /^([^.]*)(?:\.(.+)|)$/;
    oe.event = {
        global: {},
        add: function (t, e, i, n, o) {
            var s, r, a, l, c, d, u, p, h, f, m, g = oe._data(t);
            if (g) {
                for (i.handler && (l = i, i = l.handler, o = l.selector), i.guid || (i.guid = oe.guid++), (r = g.events) || (r = g.events = {}), (d = g.handle) || (d = g.handle = function (t) {
                    return typeof oe === Te || t && oe.event.triggered === t.type ? void 0 : oe.event.dispatch.apply(d.elem, arguments)
                }, d.elem = t), e = (e || "").match(be) || [""], a = e.length; a--;)s = Ne.exec(e[a]) || [], h = m = s[1], f = (s[2] || "").split(".").sort(), h && (c = oe.event.special[h] || {}, h = (o ? c.delegateType : c.bindType) || h, c = oe.event.special[h] || {}, u = oe.extend({
                    type: h,
                    origType: m,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: o,
                    needsContext: o && oe.expr.match.needsContext.test(o),
                    namespace: f.join(".")
                }, l), (p = r[h]) || (p = r[h] = [], p.delegateCount = 0, c.setup && c.setup.call(t, n, f, d) !== !1 || (t.addEventListener ? t.addEventListener(h, d, !1) : t.attachEvent && t.attachEvent("on" + h, d))), c.add && (c.add.call(t, u), u.handler.guid || (u.handler.guid = i.guid)), o ? p.splice(p.delegateCount++, 0, u) : p.push(u), oe.event.global[h] = !0);
                t = null
            }
        },
        remove: function (t, e, i, n, o) {
            var s, r, a, l, c, d, u, p, h, f, m, g = oe.hasData(t) && oe._data(t);
            if (g && (d = g.events)) {
                for (e = (e || "").match(be) || [""], c = e.length; c--;)if (a = Ne.exec(e[c]) || [], h = m = a[1], f = (a[2] || "").split(".").sort(), h) {
                    for (u = oe.event.special[h] || {}, h = (n ? u.delegateType : u.bindType) || h, p = d[h] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = s = p.length; s--;)r = p[s], !o && m !== r.origType || i && i.guid !== r.guid || a && !a.test(r.namespace) || n && n !== r.selector && ("**" !== n || !r.selector) || (p.splice(s, 1), r.selector && p.delegateCount--, u.remove && u.remove.call(t, r));
                    l && !p.length && (u.teardown && u.teardown.call(t, f, g.handle) !== !1 || oe.removeEvent(t, h, g.handle), delete d[h])
                } else for (h in d)oe.event.remove(t, h + e[c], i, n, !0);
                oe.isEmptyObject(d) && (delete g.handle, oe._removeData(t, "events"))
            }
        },
        trigger: function (e, i, n, o) {
            var s, r, a, l, c, d, u, p = [n || fe], h = ee.call(e, "type") ? e.type : e, f = ee.call(e, "namespace") ? e.namespace.split(".") : [];
            if (a = d = n = n || fe, 3 !== n.nodeType && 8 !== n.nodeType && !Oe.test(h + oe.event.triggered) && (h.indexOf(".") >= 0 && (f = h.split("."), h = f.shift(), f.sort()), r = h.indexOf(":") < 0 && "on" + h, e = e[oe.expando] ? e : new oe.Event(h, "object" == typeof e && e), e.isTrigger = o ? 2 : 3, e.namespace = f.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : oe.makeArray(i, [e]), c = oe.event.special[h] || {}, o || !c.trigger || c.trigger.apply(n, i) !== !1)) {
                if (!o && !c.noBubble && !oe.isWindow(n)) {
                    for (l = c.delegateType || h, Oe.test(l + h) || (a = a.parentNode); a; a = a.parentNode)p.push(a), d = a;
                    d === (n.ownerDocument || fe) && p.push(d.defaultView || d.parentWindow || t)
                }
                for (u = 0; (a = p[u++]) && !e.isPropagationStopped();)e.type = u > 1 ? l : c.bindType || h, s = (oe._data(a, "events") || {})[e.type] && oe._data(a, "handle"), s && s.apply(a, i), s = r && a[r], s && s.apply && oe.acceptData(a) && (e.result = s.apply(a, i), e.result === !1 && e.preventDefault());
                if (e.type = h, !o && !e.isDefaultPrevented() && (!c._default || c._default.apply(p.pop(), i) === !1) && oe.acceptData(n) && r && n[h] && !oe.isWindow(n)) {
                    d = n[r], d && (n[r] = null), oe.event.triggered = h;
                    try {
                        n[h]()
                    } catch (m) {
                    }
                    oe.event.triggered = void 0, d && (n[r] = d)
                }
                return e.result
            }
        },
        dispatch: function (t) {
            t = oe.event.fix(t);
            var e, i, n, o, s, r = [], a = G.call(arguments), l = (oe._data(this, "events") || {})[t.type] || [], c = oe.event.special[t.type] || {};
            if (a[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
                for (r = oe.event.handlers.call(this, t, l), e = 0; (o = r[e++]) && !t.isPropagationStopped();)for (t.currentTarget = o.elem, s = 0; (n = o.handlers[s++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(n.namespace)) && (t.handleObj = n, t.data = n.data, i = ((oe.event.special[n.origType] || {}).handle || n.handler).apply(o.elem, a), void 0 !== i && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, t), t.result
            }
        },
        handlers: function (t, e) {
            var i, n, o, s, r = [], a = e.delegateCount, l = t.target;
            if (a && l.nodeType && (!t.button || "click" !== t.type))for (; l != this; l = l.parentNode || this)if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                for (o = [], s = 0; a > s; s++)n = e[s], i = n.selector + " ", void 0 === o[i] && (o[i] = n.needsContext ? oe(i, this).index(l) >= 0 : oe.find(i, this, null, [l]).length), o[i] && o.push(n);
                o.length && r.push({elem: l, handlers: o})
            }
            return a < e.length && r.push({elem: this, handlers: e.slice(a)}), r
        },
        fix: function (t) {
            if (t[oe.expando])return t;
            var e, i, n, o = t.type, s = t, r = this.fixHooks[o];
            for (r || (this.fixHooks[o] = r = De.test(o) ? this.mouseHooks : Le.test(o) ? this.keyHooks : {}), n = r.props ? this.props.concat(r.props) : this.props, t = new oe.Event(s), e = n.length; e--;)i = n[e], t[i] = s[i];
            return t.target || (t.target = s.srcElement || fe), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, r.filter ? r.filter(t, s) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (t, e) {
                var i, n, o, s = e.button, r = e.fromElement;
                return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || fe, o = n.documentElement, i = n.body, t.pageX = e.clientX + (o && o.scrollLeft || i && i.scrollLeft || 0) - (o && o.clientLeft || i && i.clientLeft || 0), t.pageY = e.clientY + (o && o.scrollTop || i && i.scrollTop || 0) - (o && o.clientTop || i && i.clientTop || 0)), !t.relatedTarget && r && (t.relatedTarget = r === t.target ? e.toElement : r), t.which || void 0 === s || (t.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), t
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== f() && this.focus)try {
                        return this.focus(), !1
                    } catch (t) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return oe.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                }, _default: function (t) {
                    return oe.nodeName(t.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function (t, e, i, n) {
            var o = oe.extend(new oe.Event, i, {type: t, isSimulated: !0, originalEvent: {}});
            n ? oe.event.trigger(o, null, e) : oe.event.dispatch.call(e, o), o.isDefaultPrevented() && i.preventDefault()
        }
    }, oe.removeEvent = fe.removeEventListener ? function (t, e, i) {
        t.removeEventListener && t.removeEventListener(e, i, !1)
    } : function (t, e, i) {
        var n = "on" + e;
        t.detachEvent && (typeof t[n] === Te && (t[n] = null), t.detachEvent(n, i))
    }, oe.Event = function (t, e) {
        return this instanceof oe.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? p : h) : this.type = t, e && oe.extend(this, e), this.timeStamp = t && t.timeStamp || oe.now(), void(this[oe.expando] = !0)) : new oe.Event(t, e)
    }, oe.Event.prototype = {
        isDefaultPrevented: h,
        isPropagationStopped: h,
        isImmediatePropagationStopped: h,
        preventDefault: function () {
            var t = this.originalEvent;
            this.isDefaultPrevented = p, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function () {
            var t = this.originalEvent;
            this.isPropagationStopped = p, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = p, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, oe.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (t, e) {
        oe.event.special[t] = {
            delegateType: e, bindType: e, handle: function (t) {
                var i, n = this, o = t.relatedTarget, s = t.handleObj;
                return (!o || o !== n && !oe.contains(n, o)) && (t.type = s.origType, i = s.handler.apply(this, arguments), t.type = e), i
            }
        }
    }), ie.submitBubbles || (oe.event.special.submit = {
        setup: function () {
            return oe.nodeName(this, "form") ? !1 : void oe.event.add(this, "click._submit keypress._submit", function (t) {
                var e = t.target, i = oe.nodeName(e, "input") || oe.nodeName(e, "button") ? e.form : void 0;
                i && !oe._data(i, "submitBubbles") && (oe.event.add(i, "submit._submit", function (t) {
                    t._submit_bubble = !0
                }), oe._data(i, "submitBubbles", !0))
            })
        }, postDispatch: function (t) {
            t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && oe.event.simulate("submit", this.parentNode, t, !0))
        }, teardown: function () {
            return oe.nodeName(this, "form") ? !1 : void oe.event.remove(this, "._submit")
        }
    }), ie.changeBubbles || (oe.event.special.change = {
        setup: function () {
            return Ae.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (oe.event.add(this, "propertychange._change", function (t) {
                "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
            }), oe.event.add(this, "click._change", function (t) {
                this._just_changed && !t.isTrigger && (this._just_changed = !1), oe.event.simulate("change", this, t, !0)
            })), !1) : void oe.event.add(this, "beforeactivate._change", function (t) {
                var e = t.target;
                Ae.test(e.nodeName) && !oe._data(e, "changeBubbles") && (oe.event.add(e, "change._change", function (t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || oe.event.simulate("change", this.parentNode, t, !0)
                }), oe._data(e, "changeBubbles", !0))
            })
        }, handle: function (t) {
            var e = t.target;
            return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return oe.event.remove(this, "._change"), !Ae.test(this.nodeName)
        }
    }), ie.focusinBubbles || oe.each({focus: "focusin", blur: "focusout"}, function (t, e) {
        var i = function (t) {
            oe.event.simulate(e, t.target, oe.event.fix(t), !0)
        };
        oe.event.special[e] = {
            setup: function () {
                var n = this.ownerDocument || this, o = oe._data(n, e);
                o || n.addEventListener(t, i, !0), oe._data(n, e, (o || 0) + 1)
            }, teardown: function () {
                var n = this.ownerDocument || this, o = oe._data(n, e) - 1;
                o ? oe._data(n, e, o) : (n.removeEventListener(t, i, !0), oe._removeData(n, e))
            }
        }
    }), oe.fn.extend({
        on: function (t, e, i, n, o) {
            var s, r;
            if ("object" == typeof t) {
                "string" != typeof e && (i = i || e, e = void 0);
                for (s in t)this.on(s, e, i, t[s], o);
                return this
            }
            if (null == i && null == n ? (n = e, i = e = void 0) : null == n && ("string" == typeof e ? (n = i, i = void 0) : (n = i, i = e, e = void 0)), n === !1)n = h; else if (!n)return this;
            return 1 === o && (r = n, n = function (t) {
                return oe().off(t), r.apply(this, arguments)
            }, n.guid = r.guid || (r.guid = oe.guid++)), this.each(function () {
                oe.event.add(this, t, n, i, e)
            })
        }, one: function (t, e, i, n) {
            return this.on(t, e, i, n, 1)
        }, off: function (t, e, i) {
            var n, o;
            if (t && t.preventDefault && t.handleObj)return n = t.handleObj, oe(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
            if ("object" == typeof t) {
                for (o in t)this.off(o, e, t[o]);
                return this
            }
            return (e === !1 || "function" == typeof e) && (i = e, e = void 0), i === !1 && (i = h), this.each(function () {
                oe.event.remove(this, t, i, e)
            })
        }, trigger: function (t, e) {
            return this.each(function () {
                oe.event.trigger(t, e, this)
            })
        }, triggerHandler: function (t, e) {
            var i = this[0];
            return i ? oe.event.trigger(t, e, i, !0) : void 0
        }
    });
    var Ie = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", He = / jQuery\d+="(?:null|\d+)"/g, Fe = new RegExp("<(?:" + Ie + ")[\\s/>]", "i"), Me = /^\s+/, Re = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ze = /<([\w:]+)/, We = /<tbody/i, qe = /<|&#?\w+;/, Ve = /<(?:script|style|link)/i, Be = /checked\s*(?:[^=]|=\s*.checked.)/i, Ue = /^$|\/(?:java|ecma)script/i, Xe = /^true\/(.*)/, Je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Ge = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: ie.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }, Qe = m(fe), Ye = Qe.appendChild(fe.createElement("div"));
    Ge.optgroup = Ge.option, Ge.tbody = Ge.tfoot = Ge.colgroup = Ge.caption = Ge.thead, Ge.th = Ge.td, oe.extend({
        clone: function (t, e, i) {
            var n, o, s, r, a, l = oe.contains(t.ownerDocument, t);
            if (ie.html5Clone || oe.isXMLDoc(t) || !Fe.test("<" + t.nodeName + ">") ? s = t.cloneNode(!0) : (Ye.innerHTML = t.outerHTML, Ye.removeChild(s = Ye.firstChild)), !(ie.noCloneEvent && ie.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || oe.isXMLDoc(t)))for (n = g(s), a = g(t), r = 0; null != (o = a[r]); ++r)n[r] && T(o, n[r]);
            if (e)if (i)for (a = a || g(t), n = n || g(s), r = 0; null != (o = a[r]); r++)x(o, n[r]); else x(t, s);
            return n = g(s, "script"), n.length > 0 && k(n, !l && g(t, "script")), n = a = o = null, s
        }, buildFragment: function (t, e, i, n) {
            for (var o, s, r, a, l, c, d, u = t.length, p = m(e), h = [], f = 0; u > f; f++)if (s = t[f], s || 0 === s)if ("object" === oe.type(s))oe.merge(h, s.nodeType ? [s] : s); else if (qe.test(s)) {
                for (a = a || p.appendChild(e.createElement("div")), l = (ze.exec(s) || ["", ""])[1].toLowerCase(), d = Ge[l] || Ge._default, a.innerHTML = d[1] + s.replace(Re, "<$1></$2>") + d[2], o = d[0]; o--;)a = a.lastChild;
                if (!ie.leadingWhitespace && Me.test(s) && h.push(e.createTextNode(Me.exec(s)[0])), !ie.tbody)for (s = "table" !== l || We.test(s) ? "<table>" !== d[1] || We.test(s) ? 0 : a : a.firstChild, o = s && s.childNodes.length; o--;)oe.nodeName(c = s.childNodes[o], "tbody") && !c.childNodes.length && s.removeChild(c);
                for (oe.merge(h, a.childNodes), a.textContent = ""; a.firstChild;)a.removeChild(a.firstChild);
                a = p.lastChild
            } else h.push(e.createTextNode(s));
            for (a && p.removeChild(a), ie.appendChecked || oe.grep(g(h, "input"), v), f = 0; s = h[f++];)if ((!n || -1 === oe.inArray(s, n)) && (r = oe.contains(s.ownerDocument, s), a = g(p.appendChild(s), "script"), r && k(a), i))for (o = 0; s = a[o++];)Ue.test(s.type || "") && i.push(s);
            return a = null, p
        }, cleanData: function (t, e) {
            for (var i, n, o, s, r = 0, a = oe.expando, l = oe.cache, c = ie.deleteExpando, d = oe.event.special; null != (i = t[r]); r++)if ((e || oe.acceptData(i)) && (o = i[a], s = o && l[o])) {
                if (s.events)for (n in s.events)d[n] ? oe.event.remove(i, n) : oe.removeEvent(i, n, s.handle);
                l[o] && (delete l[o], c ? delete i[a] : typeof i.removeAttribute !== Te ? i.removeAttribute(a) : i[a] = null, J.push(o))
            }
        }
    }), oe.fn.extend({
        text: function (t) {
            return $e(this, function (t) {
                return void 0 === t ? oe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || fe).createTextNode(t))
            }, null, t, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.appendChild(t)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        }, remove: function (t, e) {
            for (var i, n = t ? oe.filter(t, this) : this, o = 0; null != (i = n[o]); o++)e || 1 !== i.nodeType || oe.cleanData(g(i)), i.parentNode && (e && oe.contains(i.ownerDocument, i) && k(g(i, "script")), i.parentNode.removeChild(i));
            return this
        }, empty: function () {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && oe.cleanData(g(t, !1)); t.firstChild;)t.removeChild(t.firstChild);
                t.options && oe.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        }, clone: function (t, e) {
            return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function () {
                return oe.clone(this, t, e)
            })
        }, html: function (t) {
            return $e(this, function (t) {
                var e = this[0] || {}, i = 0, n = this.length;
                if (void 0 === t)return 1 === e.nodeType ? e.innerHTML.replace(He, "") : void 0;
                if (!("string" != typeof t || Ve.test(t) || !ie.htmlSerialize && Fe.test(t) || !ie.leadingWhitespace && Me.test(t) || Ge[(ze.exec(t) || ["", ""])[1].toLowerCase()])) {
                    t = t.replace(Re, "<$1></$2>");
                    try {
                        for (; n > i; i++)e = this[i] || {}, 1 === e.nodeType && (oe.cleanData(g(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (o) {
                    }
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        }, replaceWith: function () {
            var t = arguments[0];
            return this.domManip(arguments, function (e) {
                t = this.parentNode, oe.cleanData(g(this)), t && t.replaceChild(e, this)
            }), t && (t.length || t.nodeType) ? this : this.remove()
        }, detach: function (t) {
            return this.remove(t, !0)
        }, domManip: function (t, e) {
            t = Q.apply([], t);
            var i, n, o, s, r, a, l = 0, c = this.length, d = this, u = c - 1, p = t[0], h = oe.isFunction(p);
            if (h || c > 1 && "string" == typeof p && !ie.checkClone && Be.test(p))return this.each(function (i) {
                var n = d.eq(i);
                h && (t[0] = p.call(this, i, n.html())), n.domManip(t, e)
            });
            if (c && (a = oe.buildFragment(t, this[0].ownerDocument, !1, this), i = a.firstChild, 1 === a.childNodes.length && (a = i), i)) {
                for (s = oe.map(g(a, "script"), b), o = s.length; c > l; l++)n = a, l !== u && (n = oe.clone(n, !0, !0), o && oe.merge(s, g(n, "script"))), e.call(this[l], n, l);
                if (o)for (r = s[s.length - 1].ownerDocument, oe.map(s, w), l = 0; o > l; l++)n = s[l], Ue.test(n.type || "") && !oe._data(n, "globalEval") && oe.contains(r, n) && (n.src ? oe._evalUrl && oe._evalUrl(n.src) : oe.globalEval((n.text || n.textContent || n.innerHTML || "").replace(Je, "")));
                a = i = null
            }
            return this
        }
    }), oe.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (t, e) {
        oe.fn[t] = function (t) {
            for (var i, n = 0, o = [], s = oe(t), r = s.length - 1; r >= n; n++)i = n === r ? this : this.clone(!0), oe(s[n])[e](i), Y.apply(o, i.get());
            return this.pushStack(o)
        }
    });
    var Ke, Ze = {};
    !function () {
        var t;
        ie.shrinkWrapBlocks = function () {
            if (null != t)return t;
            t = !1;
            var e, i, n;
            return i = fe.getElementsByTagName("body")[0], i && i.style ? (e = fe.createElement("div"), n = fe.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== Te && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(fe.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), i.removeChild(n), t) : void 0
        }
    }();
    var ti, ei, ii = /^margin/, ni = new RegExp("^(" + Ee + ")(?!px)[a-z%]+$", "i"), oi = /^(top|right|bottom|left)$/;
    t.getComputedStyle ? (ti = function (t) {
        return t.ownerDocument.defaultView.getComputedStyle(t, null)
    }, ei = function (t, e, i) {
        var n, o, s, r, a = t.style;
        return i = i || ti(t), r = i ? i.getPropertyValue(e) || i[e] : void 0, i && ("" !== r || oe.contains(t.ownerDocument, t) || (r = oe.style(t, e)), ni.test(r) && ii.test(e) && (n = a.width, o = a.minWidth, s = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = i.width, a.width = n, a.minWidth = o, a.maxWidth = s)), void 0 === r ? r : r + ""
    }) : fe.documentElement.currentStyle && (ti = function (t) {
        return t.currentStyle
    }, ei = function (t, e, i) {
        var n, o, s, r, a = t.style;
        return i = i || ti(t), r = i ? i[e] : void 0, null == r && a && a[e] && (r = a[e]), ni.test(r) && !oi.test(e) && (n = a.left, o = t.runtimeStyle, s = o && o.left, s && (o.left = t.currentStyle.left), a.left = "fontSize" === e ? "1em" : r, r = a.pixelLeft + "px", a.left = n, s && (o.left = s)), void 0 === r ? r : r + "" || "auto"
    }), function () {
        function e() {
            var e, i, n, o;
            i = fe.getElementsByTagName("body")[0], i && i.style && (e = fe.createElement("div"), n = fe.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", s = r = !1, l = !0, t.getComputedStyle && (s = "1%" !== (t.getComputedStyle(e, null) || {}).top, r = "4px" === (t.getComputedStyle(e, null) || {width: "4px"}).width, o = e.appendChild(fe.createElement("div")), o.style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", o.style.marginRight = o.style.width = "0", e.style.width = "1px", l = !parseFloat((t.getComputedStyle(o, null) || {}).marginRight)), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = e.getElementsByTagName("td"), o[0].style.cssText = "margin:0;border:0;padding:0;display:none", a = 0 === o[0].offsetHeight, a && (o[0].style.display = "", o[1].style.display = "none", a = 0 === o[0].offsetHeight), i.removeChild(n))
        }

        var i, n, o, s, r, a, l;
        i = fe.createElement("div"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", o = i.getElementsByTagName("a")[0], n = o && o.style, n && (n.cssText = "float:left;opacity:.5", ie.opacity = "0.5" === n.opacity, ie.cssFloat = !!n.cssFloat, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", ie.clearCloneStyle = "content-box" === i.style.backgroundClip, ie.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing, oe.extend(ie, {
            reliableHiddenOffsets: function () {
                return null == a && e(), a
            }, boxSizingReliable: function () {
                return null == r && e(), r
            }, pixelPosition: function () {
                return null == s && e(), s
            }, reliableMarginRight: function () {
                return null == l && e(), l
            }
        }))
    }(), oe.swap = function (t, e, i, n) {
        var o, s, r = {};
        for (s in e)r[s] = t.style[s], t.style[s] = e[s];
        o = i.apply(t, n || []);
        for (s in e)t.style[s] = r[s];
        return o
    };
    var si = /alpha\([^)]*\)/i, ri = /opacity\s*=\s*([^)]*)/, ai = /^(none|table(?!-c[ea]).+)/, li = new RegExp("^(" + Ee + ")(.*)$", "i"), ci = new RegExp("^([+-])=(" + Ee + ")", "i"), di = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, ui = {letterSpacing: "0", fontWeight: "400"}, pi = ["Webkit", "O", "Moz", "ms"];
    oe.extend({
        cssHooks: {
            opacity: {
                get: function (t, e) {
                    if (e) {
                        var i = ei(t, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": ie.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var o, s, r, a = oe.camelCase(e), l = t.style;
                if (e = oe.cssProps[a] || (oe.cssProps[a] = P(l, a)), r = oe.cssHooks[e] || oe.cssHooks[a], void 0 === i)return r && "get" in r && void 0 !== (o = r.get(t, !1, n)) ? o : l[e];
                if (s = typeof i, "string" === s && (o = ci.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(oe.css(t, e)), s = "number"), null != i && i === i && ("number" !== s || oe.cssNumber[a] || (i += "px"), ie.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(r && "set" in r && void 0 === (i = r.set(t, i, n)))))try {
                    l[e] = i
                } catch (c) {
                }
            }
        },
        css: function (t, e, i, n) {
            var o, s, r, a = oe.camelCase(e);
            return e = oe.cssProps[a] || (oe.cssProps[a] = P(t.style, a)), r = oe.cssHooks[e] || oe.cssHooks[a], r && "get" in r && (s = r.get(t, !0, i)), void 0 === s && (s = ei(t, e, n)), "normal" === s && e in ui && (s = ui[e]), "" === i || i ? (o = parseFloat(s), i === !0 || oe.isNumeric(o) ? o || 0 : s) : s
        }
    }), oe.each(["height", "width"], function (t, e) {
        oe.cssHooks[e] = {
            get: function (t, i, n) {
                return i ? ai.test(oe.css(t, "display")) && 0 === t.offsetWidth ? oe.swap(t, di, function () {
                    return A(t, e, n)
                }) : A(t, e, n) : void 0
            }, set: function (t, i, n) {
                var o = n && ti(t);
                return $(t, i, n ? j(t, e, n, ie.boxSizing && "border-box" === oe.css(t, "boxSizing", !1, o), o) : 0)
            }
        }
    }), ie.opacity || (oe.cssHooks.opacity = {
        get: function (t, e) {
            return ri.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        }, set: function (t, e) {
            var i = t.style, n = t.currentStyle, o = oe.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "", s = n && n.filter || i.filter || "";
            i.zoom = 1, (e >= 1 || "" === e) && "" === oe.trim(s.replace(si, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === e || n && !n.filter) || (i.filter = si.test(s) ? s.replace(si, o) : s + " " + o)
        }
    }), oe.cssHooks.marginRight = E(ie.reliableMarginRight, function (t, e) {
        return e ? oe.swap(t, {display: "inline-block"}, ei, [t, "marginRight"]) : void 0
    }), oe.each({margin: "", padding: "", border: "Width"}, function (t, e) {
        oe.cssHooks[t + e] = {
            expand: function (i) {
                for (var n = 0, o = {}, s = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++)o[t + Pe[n] + e] = s[n] || s[n - 2] || s[0];
                return o
            }
        }, ii.test(t) || (oe.cssHooks[t + e].set = $)
    }), oe.fn.extend({
        css: function (t, e) {
            return $e(this, function (t, e, i) {
                var n, o, s = {}, r = 0;
                if (oe.isArray(e)) {
                    for (n = ti(t), o = e.length; o > r; r++)s[e[r]] = oe.css(t, e[r], !1, n);
                    return s
                }
                return void 0 !== i ? oe.style(t, e, i) : oe.css(t, e)
            }, t, e, arguments.length > 1)
        }, show: function () {
            return _(this, !0)
        }, hide: function () {
            return _(this)
        }, toggle: function (t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
                _e(this) ? oe(this).show() : oe(this).hide()
            })
        }
    }), oe.Tween = L, L.prototype = {
        constructor: L, init: function (t, e, i, n, o, s) {
            this.elem = t, this.prop = i, this.easing = o || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = s || (oe.cssNumber[i] ? "" : "px")
        }, cur: function () {
            var t = L.propHooks[this.prop];
            return t && t.get ? t.get(this) : L.propHooks._default.get(this)
        }, run: function (t) {
            var e, i = L.propHooks[this.prop];
            return this.pos = e = this.options.duration ? oe.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : L.propHooks._default.set(this), this
        }
    }, L.prototype.init.prototype = L.prototype, L.propHooks = {
        _default: {
            get: function (t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = oe.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            }, set: function (t) {
                oe.fx.step[t.prop] ? oe.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[oe.cssProps[t.prop]] || oe.cssHooks[t.prop]) ? oe.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, L.propHooks.scrollTop = L.propHooks.scrollLeft = {
        set: function (t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, oe.easing = {
        linear: function (t) {
            return t
        }, swing: function (t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, oe.fx = L.prototype.init, oe.fx.step = {};
    var hi, fi, mi = /^(?:toggle|show|hide)$/, gi = new RegExp("^(?:([+-])=|)(" + Ee + ")([a-z%]*)$", "i"), vi = /queueHooks$/, yi = [I], bi = {
        "*": [function (t, e) {
            var i = this.createTween(t, e), n = i.cur(), o = gi.exec(e), s = o && o[3] || (oe.cssNumber[t] ? "" : "px"), r = (oe.cssNumber[t] || "px" !== s && +n) && gi.exec(oe.css(i.elem, t)), a = 1, l = 20;
            if (r && r[3] !== s) {
                s = s || r[3], o = o || [], r = +n || 1;
                do a = a || ".5", r /= a, oe.style(i.elem, t, r + s); while (a !== (a = i.cur() / n) && 1 !== a && --l)
            }
            return o && (r = i.start = +r || +n || 0, i.unit = s, i.end = o[1] ? r + (o[1] + 1) * o[2] : +o[2]), i
        }]
    };
    oe.Animation = oe.extend(F, {
        tweener: function (t, e) {
            oe.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
            for (var i, n = 0, o = t.length; o > n; n++)i = t[n], bi[i] = bi[i] || [], bi[i].unshift(e)
        }, prefilter: function (t, e) {
            e ? yi.unshift(t) : yi.push(t)
        }
    }), oe.speed = function (t, e, i) {
        var n = t && "object" == typeof t ? oe.extend({}, t) : {
            complete: i || !i && e || oe.isFunction(t) && t,
            duration: t,
            easing: i && e || e && !oe.isFunction(e) && e
        };
        return n.duration = oe.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in oe.fx.speeds ? oe.fx.speeds[n.duration] : oe.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function () {
            oe.isFunction(n.old) && n.old.call(this), n.queue && oe.dequeue(this, n.queue)
        }, n
    }, oe.fn.extend({
        fadeTo: function (t, e, i, n) {
            return this.filter(_e).css("opacity", 0).show().end().animate({opacity: e}, t, i, n)
        }, animate: function (t, e, i, n) {
            var o = oe.isEmptyObject(t), s = oe.speed(e, i, n), r = function () {
                var e = F(this, oe.extend({}, t), s);
                (o || oe._data(this, "finish")) && e.stop(!0)
            };
            return r.finish = r, o || s.queue === !1 ? this.each(r) : this.queue(s.queue, r)
        }, stop: function (t, e, i) {
            var n = function (t) {
                var e = t.stop;
                delete t.stop, e(i)
            };
            return "string" != typeof t && (i = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function () {
                var e = !0, o = null != t && t + "queueHooks", s = oe.timers, r = oe._data(this);
                if (o)r[o] && r[o].stop && n(r[o]); else for (o in r)r[o] && r[o].stop && vi.test(o) && n(r[o]);
                for (o = s.length; o--;)s[o].elem !== this || null != t && s[o].queue !== t || (s[o].anim.stop(i), e = !1, s.splice(o, 1));
                (e || !i) && oe.dequeue(this, t)
            })
        }, finish: function (t) {
            return t !== !1 && (t = t || "fx"), this.each(function () {
                var e, i = oe._data(this), n = i[t + "queue"], o = i[t + "queueHooks"], s = oe.timers, r = n ? n.length : 0;
                for (i.finish = !0, oe.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = s.length; e--;)s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                for (e = 0; r > e; e++)n[e] && n[e].finish && n[e].finish.call(this);
                delete i.finish
            })
        }
    }), oe.each(["toggle", "show", "hide"], function (t, e) {
        var i = oe.fn[e];
        oe.fn[e] = function (t, n, o) {
            return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(O(e, !0), t, n, o)
        }
    }), oe.each({
        slideDown: O("show"),
        slideUp: O("hide"),
        slideToggle: O("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (t, e) {
        oe.fn[t] = function (t, i, n) {
            return this.animate(e, t, i, n)
        }
    }), oe.timers = [], oe.fx.tick = function () {
        var t, e = oe.timers, i = 0;
        for (hi = oe.now(); i < e.length; i++)t = e[i], t() || e[i] !== t || e.splice(i--, 1);
        e.length || oe.fx.stop(), hi = void 0
    }, oe.fx.timer = function (t) {
        oe.timers.push(t), t() ? oe.fx.start() : oe.timers.pop()
    }, oe.fx.interval = 13, oe.fx.start = function () {
        fi || (fi = setInterval(oe.fx.tick, oe.fx.interval))
    }, oe.fx.stop = function () {
        clearInterval(fi), fi = null
    }, oe.fx.speeds = {slow: 600, fast: 200, _default: 400}, oe.fn.delay = function (t, e) {
        return t = oe.fx ? oe.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function (e, i) {
            var n = setTimeout(e, t);
            i.stop = function () {
                clearTimeout(n)
            }
        })
    }, function () {
        var t, e, i, n, o;
        e = fe.createElement("div"), e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = e.getElementsByTagName("a")[0], i = fe.createElement("select"), o = i.appendChild(fe.createElement("option")), t = e.getElementsByTagName("input")[0], n.style.cssText = "top:1px", ie.getSetAttribute = "t" !== e.className, ie.style = /top/.test(n.getAttribute("style")), ie.hrefNormalized = "/a" === n.getAttribute("href"), ie.checkOn = !!t.value, ie.optSelected = o.selected, ie.enctype = !!fe.createElement("form").enctype, i.disabled = !0, ie.optDisabled = !o.disabled, t = fe.createElement("input"), t.setAttribute("value", ""), ie.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), ie.radioValue = "t" === t.value
    }();
    var wi = /\r/g;
    oe.fn.extend({
        val: function (t) {
            var e, i, n, o = this[0];
            {
                if (arguments.length)return n = oe.isFunction(t), this.each(function (i) {
                    var o;
                    1 === this.nodeType && (o = n ? t.call(this, i, oe(this).val()) : t, null == o ? o = "" : "number" == typeof o ? o += "" : oe.isArray(o) && (o = oe.map(o, function (t) {
                        return null == t ? "" : t + ""
                    })), e = oe.valHooks[this.type] || oe.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, o, "value") || (this.value = o))
                });
                if (o)return e = oe.valHooks[o.type] || oe.valHooks[o.nodeName.toLowerCase()], e && "get" in e && void 0 !== (i = e.get(o, "value")) ? i : (i = o.value, "string" == typeof i ? i.replace(wi, "") : null == i ? "" : i)
            }
        }
    }), oe.extend({
        valHooks: {
            option: {
                get: function (t) {
                    var e = oe.find.attr(t, "value");
                    return null != e ? e : oe.trim(oe.text(t))
                }
            }, select: {
                get: function (t) {
                    for (var e, i, n = t.options, o = t.selectedIndex, s = "select-one" === t.type || 0 > o, r = s ? null : [], a = s ? o + 1 : n.length, l = 0 > o ? a : s ? o : 0; a > l; l++)if (i = n[l], !(!i.selected && l !== o || (ie.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && oe.nodeName(i.parentNode, "optgroup"))) {
                        if (e = oe(i).val(), s)return e;
                        r.push(e)
                    }
                    return r
                }, set: function (t, e) {
                    for (var i, n, o = t.options, s = oe.makeArray(e), r = o.length; r--;)if (n = o[r], oe.inArray(oe.valHooks.option.get(n), s) >= 0)try {
                        n.selected = i = !0
                    } catch (a) {
                        n.scrollHeight
                    } else n.selected = !1;
                    return i || (t.selectedIndex = -1), o
                }
            }
        }
    }), oe.each(["radio", "checkbox"], function () {
        oe.valHooks[this] = {
            set: function (t, e) {
                return oe.isArray(e) ? t.checked = oe.inArray(oe(t).val(), e) >= 0 : void 0
            }
        }, ie.checkOn || (oe.valHooks[this].get = function (t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var ki, xi, Ti = oe.expr.attrHandle, Ci = /^(?:checked|selected)$/i, Si = ie.getSetAttribute, Ei = ie.input;
    oe.fn.extend({
        attr: function (t, e) {
            return $e(this, oe.attr, t, e, arguments.length > 1)
        }, removeAttr: function (t) {
            return this.each(function () {
                oe.removeAttr(this, t)
            })
        }
    }), oe.extend({
        attr: function (t, e, i) {
            var n, o, s = t.nodeType;
            if (t && 3 !== s && 8 !== s && 2 !== s)return typeof t.getAttribute === Te ? oe.prop(t, e, i) : (1 === s && oe.isXMLDoc(t) || (e = e.toLowerCase(), n = oe.attrHooks[e] || (oe.expr.match.bool.test(e) ? xi : ki)), void 0 === i ? n && "get" in n && null !== (o = n.get(t, e)) ? o : (o = oe.find.attr(t, e), null == o ? void 0 : o) : null !== i ? n && "set" in n && void 0 !== (o = n.set(t, i, e)) ? o : (t.setAttribute(e, i + ""), i) : void oe.removeAttr(t, e))
        }, removeAttr: function (t, e) {
            var i, n, o = 0, s = e && e.match(be);
            if (s && 1 === t.nodeType)for (; i = s[o++];)n = oe.propFix[i] || i, oe.expr.match.bool.test(i) ? Ei && Si || !Ci.test(i) ? t[n] = !1 : t[oe.camelCase("default-" + i)] = t[n] = !1 : oe.attr(t, i, ""), t.removeAttribute(Si ? i : n)
        }, attrHooks: {
            type: {
                set: function (t, e) {
                    if (!ie.radioValue && "radio" === e && oe.nodeName(t, "input")) {
                        var i = t.value;
                        return t.setAttribute("type", e), i && (t.value = i), e
                    }
                }
            }
        }
    }), xi = {
        set: function (t, e, i) {
            return e === !1 ? oe.removeAttr(t, i) : Ei && Si || !Ci.test(i) ? t.setAttribute(!Si && oe.propFix[i] || i, i) : t[oe.camelCase("default-" + i)] = t[i] = !0, i
        }
    }, oe.each(oe.expr.match.bool.source.match(/\w+/g), function (t, e) {
        var i = Ti[e] || oe.find.attr;
        Ti[e] = Ei && Si || !Ci.test(e) ? function (t, e, n) {
            var o, s;
            return n || (s = Ti[e], Ti[e] = o, o = null != i(t, e, n) ? e.toLowerCase() : null, Ti[e] = s), o
        } : function (t, e, i) {
            return i ? void 0 : t[oe.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }), Ei && Si || (oe.attrHooks.value = {
        set: function (t, e, i) {
            return oe.nodeName(t, "input") ? void(t.defaultValue = e) : ki && ki.set(t, e, i)
        }
    }), Si || (ki = {
        set: function (t, e, i) {
            var n = t.getAttributeNode(i);
            return n || t.setAttributeNode(n = t.ownerDocument.createAttribute(i)), n.value = e += "", "value" === i || e === t.getAttribute(i) ? e : void 0
        }
    }, Ti.id = Ti.name = Ti.coords = function (t, e, i) {
        var n;
        return i ? void 0 : (n = t.getAttributeNode(e)) && "" !== n.value ? n.value : null
    }, oe.valHooks.button = {
        get: function (t, e) {
            var i = t.getAttributeNode(e);
            return i && i.specified ? i.value : void 0
        }, set: ki.set
    }, oe.attrHooks.contenteditable = {
        set: function (t, e, i) {
            ki.set(t, "" === e ? !1 : e, i)
        }
    }, oe.each(["width", "height"], function (t, e) {
        oe.attrHooks[e] = {
            set: function (t, i) {
                return "" === i ? (t.setAttribute(e, "auto"), i) : void 0
            }
        }
    })), ie.style || (oe.attrHooks.style = {
        get: function (t) {
            return t.style.cssText || void 0
        }, set: function (t, e) {
            return t.style.cssText = e + ""
        }
    });
    var Pi = /^(?:input|select|textarea|button|object)$/i, _i = /^(?:a|area)$/i;
    oe.fn.extend({
        prop: function (t, e) {
            return $e(this, oe.prop, t, e, arguments.length > 1)
        }, removeProp: function (t) {
            return t = oe.propFix[t] || t, this.each(function () {
                try {
                    this[t] = void 0, delete this[t]
                } catch (e) {
                }
            })
        }
    }), oe.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (t, e, i) {
            var n, o, s, r = t.nodeType;
            if (t && 3 !== r && 8 !== r && 2 !== r)return s = 1 !== r || !oe.isXMLDoc(t), s && (e = oe.propFix[e] || e, o = oe.propHooks[e]), void 0 !== i ? o && "set" in o && void 0 !== (n = o.set(t, i, e)) ? n : t[e] = i : o && "get" in o && null !== (n = o.get(t, e)) ? n : t[e]
        }, propHooks: {
            tabIndex: {
                get: function (t) {
                    var e = oe.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : Pi.test(t.nodeName) || _i.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        }
    }), ie.hrefNormalized || oe.each(["href", "src"], function (t, e) {
        oe.propHooks[e] = {
            get: function (t) {
                return t.getAttribute(e, 4)
            }
        }
    }), ie.optSelected || (oe.propHooks.selected = {
        get: function (t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    }), oe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        oe.propFix[this.toLowerCase()] = this
    }), ie.enctype || (oe.propFix.enctype = "encoding");
    var $i = /[\t\r\n\f]/g;
    oe.fn.extend({
        addClass: function (t) {
            var e, i, n, o, s, r, a = 0, l = this.length, c = "string" == typeof t && t;
            if (oe.isFunction(t))return this.each(function (e) {
                oe(this).addClass(t.call(this, e, this.className))
            });
            if (c)for (e = (t || "").match(be) || []; l > a; a++)if (i = this[a], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace($i, " ") : " ")) {
                for (s = 0; o = e[s++];)n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                r = oe.trim(n), i.className !== r && (i.className = r)
            }
            return this
        }, removeClass: function (t) {
            var e, i, n, o, s, r, a = 0, l = this.length, c = 0 === arguments.length || "string" == typeof t && t;
            if (oe.isFunction(t))return this.each(function (e) {
                oe(this).removeClass(t.call(this, e, this.className))
            });
            if (c)for (e = (t || "").match(be) || []; l > a; a++)if (i = this[a], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace($i, " ") : "")) {
                for (s = 0; o = e[s++];)for (; n.indexOf(" " + o + " ") >= 0;)n = n.replace(" " + o + " ", " ");
                r = t ? oe.trim(n) : "", i.className !== r && (i.className = r)
            }
            return this
        }, toggleClass: function (t, e) {
            var i = typeof t;
            return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : this.each(oe.isFunction(t) ? function (i) {
                oe(this).toggleClass(t.call(this, i, this.className, e), e)
            } : function () {
                if ("string" === i)for (var e, n = 0, o = oe(this), s = t.match(be) || []; e = s[n++];)o.hasClass(e) ? o.removeClass(e) : o.addClass(e); else(i === Te || "boolean" === i) && (this.className && oe._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : oe._data(this, "__className__") || "")
            })
        }, hasClass: function (t) {
            for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)if (1 === this[i].nodeType && (" " + this[i].className + " ").replace($i, " ").indexOf(e) >= 0)return !0;
            return !1
        }
    }), oe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (t, e) {
        oe.fn[e] = function (t, i) {
            return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
        }
    }), oe.fn.extend({
        hover: function (t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        }, bind: function (t, e, i) {
            return this.on(t, null, e, i)
        }, unbind: function (t, e) {
            return this.off(t, null, e)
        }, delegate: function (t, e, i, n) {
            return this.on(e, t, i, n)
        }, undelegate: function (t, e, i) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
        }
    });
    var ji = oe.now(), Ai = /\?/, Li = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    oe.parseJSON = function (e) {
        if (t.JSON && t.JSON.parse)return t.JSON.parse(e + "");
        var i, n = null, o = oe.trim(e + "");
        return o && !oe.trim(o.replace(Li, function (t, e, o, s) {
            return i && e && (n = 0), 0 === n ? t : (i = o || e, n += !s - !o, "")
        })) ? Function("return " + o)() : oe.error("Invalid JSON: " + e)
    }, oe.parseXML = function (e) {
        var i, n;
        if (!e || "string" != typeof e)return null;
        try {
            t.DOMParser ? (n = new DOMParser, i = n.parseFromString(e, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(e))
        } catch (o) {
            i = void 0
        }
        return i && i.documentElement && !i.getElementsByTagName("parsererror").length || oe.error("Invalid XML: " + e), i
    };
    var Di, Oi, Ni = /#.*$/, Ii = /([?&])_=[^&]*/, Hi = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Fi = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Mi = /^(?:GET|HEAD)$/, Ri = /^\/\//, zi = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Wi = {}, qi = {}, Vi = "*/".concat("*");
    try {
        Oi = location.href
    } catch (Bi) {
        Oi = fe.createElement("a"), Oi.href = "", Oi = Oi.href
    }
    Di = zi.exec(Oi.toLowerCase()) || [], oe.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Oi,
            type: "GET",
            isLocal: Fi.test(Di[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Vi,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": oe.parseJSON, "text xml": oe.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (t, e) {
            return e ? z(z(t, oe.ajaxSettings), e) : z(oe.ajaxSettings, t)
        },
        ajaxPrefilter: M(Wi),
        ajaxTransport: M(qi),
        ajax: function (t, e) {
            function i(t, e, i, n) {
                var o, d, v, y, w, x = e;
                2 !== b && (b = 2, a && clearTimeout(a), c = void 0, r = n || "", k.readyState = t > 0 ? 4 : 0, o = t >= 200 && 300 > t || 304 === t, i && (y = W(u, k, i)), y = q(u, y, k, o), o ? (u.ifModified && (w = k.getResponseHeader("Last-Modified"), w && (oe.lastModified[s] = w), w = k.getResponseHeader("etag"), w && (oe.etag[s] = w)), 204 === t || "HEAD" === u.type ? x = "nocontent" : 304 === t ? x = "notmodified" : (x = y.state, d = y.data, v = y.error, o = !v)) : (v = x, (t || !x) && (x = "error", 0 > t && (t = 0))), k.status = t, k.statusText = (e || x) + "", o ? f.resolveWith(p, [d, x, k]) : f.rejectWith(p, [k, x, v]), k.statusCode(g), g = void 0, l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [k, u, o ? d : v]), m.fireWith(p, [k, x]), l && (h.trigger("ajaxComplete", [k, u]), --oe.active || oe.event.trigger("ajaxStop")))
            }

            "object" == typeof t && (e = t, t = void 0), e = e || {};
            var n, o, s, r, a, l, c, d, u = oe.ajaxSetup({}, e), p = u.context || u, h = u.context && (p.nodeType || p.jquery) ? oe(p) : oe.event, f = oe.Deferred(), m = oe.Callbacks("once memory"), g = u.statusCode || {}, v = {}, y = {}, b = 0, w = "canceled", k = {
                readyState: 0,
                getResponseHeader: function (t) {
                    var e;
                    if (2 === b) {
                        if (!d)for (d = {}; e = Hi.exec(r);)d[e[1].toLowerCase()] = e[2];
                        e = d[t.toLowerCase()]
                    }
                    return null == e ? null : e
                },
                getAllResponseHeaders: function () {
                    return 2 === b ? r : null
                },
                setRequestHeader: function (t, e) {
                    var i = t.toLowerCase();
                    return b || (t = y[i] = y[i] || t, v[t] = e), this
                },
                overrideMimeType: function (t) {
                    return b || (u.mimeType = t), this
                },
                statusCode: function (t) {
                    var e;
                    if (t)if (2 > b)for (e in t)g[e] = [g[e], t[e]]; else k.always(t[k.status]);
                    return this
                },
                abort: function (t) {
                    var e = t || w;
                    return c && c.abort(e), i(0, e), this
                }
            };
            if (f.promise(k).complete = m.add, k.success = k.done, k.error = k.fail, u.url = ((t || u.url || Oi) + "").replace(Ni, "").replace(Ri, Di[1] + "//"), u.type = e.method || e.type || u.method || u.type, u.dataTypes = oe.trim(u.dataType || "*").toLowerCase().match(be) || [""], null == u.crossDomain && (n = zi.exec(u.url.toLowerCase()), u.crossDomain = !(!n || n[1] === Di[1] && n[2] === Di[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (Di[3] || ("http:" === Di[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = oe.param(u.data, u.traditional)), R(Wi, u, e, k), 2 === b)return k;
            l = u.global, l && 0 === oe.active++ && oe.event.trigger("ajaxStart"), u.type = u.type.toUpperCase(), u.hasContent = !Mi.test(u.type), s = u.url, u.hasContent || (u.data && (s = u.url += (Ai.test(s) ? "&" : "?") + u.data, delete u.data), u.cache === !1 && (u.url = Ii.test(s) ? s.replace(Ii, "$1_=" + ji++) : s + (Ai.test(s) ? "&" : "?") + "_=" + ji++)), u.ifModified && (oe.lastModified[s] && k.setRequestHeader("If-Modified-Since", oe.lastModified[s]), oe.etag[s] && k.setRequestHeader("If-None-Match", oe.etag[s])), (u.data && u.hasContent && u.contentType !== !1 || e.contentType) && k.setRequestHeader("Content-Type", u.contentType), k.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + Vi + "; q=0.01" : "") : u.accepts["*"]);
            for (o in u.headers)k.setRequestHeader(o, u.headers[o]);
            if (u.beforeSend && (u.beforeSend.call(p, k, u) === !1 || 2 === b))return k.abort();
            w = "abort";
            for (o in{success: 1, error: 1, complete: 1})k[o](u[o]);
            if (c = R(qi, u, e, k)) {
                k.readyState = 1, l && h.trigger("ajaxSend", [k, u]), u.async && u.timeout > 0 && (a = setTimeout(function () {
                    k.abort("timeout")
                }, u.timeout));
                try {
                    b = 1, c.send(v, i)
                } catch (x) {
                    if (!(2 > b))throw x;
                    i(-1, x)
                }
            } else i(-1, "No Transport");
            return k
        },
        getJSON: function (t, e, i) {
            return oe.get(t, e, i, "json")
        },
        getScript: function (t, e) {
            return oe.get(t, void 0, e, "script")
        }
    }), oe.each(["get", "post"], function (t, e) {
        oe[e] = function (t, i, n, o) {
            return oe.isFunction(i) && (o = o || n, n = i, i = void 0), oe.ajax({
                url: t,
                type: e,
                dataType: o,
                data: i,
                success: n
            })
        }
    }), oe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
        oe.fn[e] = function (t) {
            return this.on(e, t)
        }
    }), oe._evalUrl = function (t) {
        return oe.ajax({url: t, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, oe.fn.extend({
        wrapAll: function (t) {
            if (oe.isFunction(t))return this.each(function (e) {
                oe(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = oe(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;)t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        }, wrapInner: function (t) {
            return this.each(oe.isFunction(t) ? function (e) {
                oe(this).wrapInner(t.call(this, e))
            } : function () {
                var e = oe(this), i = e.contents();
                i.length ? i.wrapAll(t) : e.append(t)
            })
        }, wrap: function (t) {
            var e = oe.isFunction(t);
            return this.each(function (i) {
                oe(this).wrapAll(e ? t.call(this, i) : t)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                oe.nodeName(this, "body") || oe(this).replaceWith(this.childNodes)
            }).end()
        }
    }), oe.expr.filters.hidden = function (t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !ie.reliableHiddenOffsets() && "none" === (t.style && t.style.display || oe.css(t, "display"))
    }, oe.expr.filters.visible = function (t) {
        return !oe.expr.filters.hidden(t)
    };
    var Ui = /%20/g, Xi = /\[\]$/, Ji = /\r?\n/g, Gi = /^(?:submit|button|image|reset|file)$/i, Qi = /^(?:input|select|textarea|keygen)/i;
    oe.param = function (t, e) {
        var i, n = [], o = function (t, e) {
            e = oe.isFunction(e) ? e() : null == e ? "" : e, n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
        };
        if (void 0 === e && (e = oe.ajaxSettings && oe.ajaxSettings.traditional), oe.isArray(t) || t.jquery && !oe.isPlainObject(t))oe.each(t, function () {
            o(this.name, this.value)
        }); else for (i in t)V(i, t[i], e, o);
        return n.join("&").replace(Ui, "+")
    }, oe.fn.extend({
        serialize: function () {
            return oe.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var t = oe.prop(this, "elements");
                return t ? oe.makeArray(t) : this
            }).filter(function () {
                var t = this.type;
                return this.name && !oe(this).is(":disabled") && Qi.test(this.nodeName) && !Gi.test(t) && (this.checked || !je.test(t))
            }).map(function (t, e) {
                var i = oe(this).val();
                return null == i ? null : oe.isArray(i) ? oe.map(i, function (t) {
                    return {name: e.name, value: t.replace(Ji, "\r\n")}
                }) : {name: e.name, value: i.replace(Ji, "\r\n")}
            }).get()
        }
    }), oe.ajaxSettings.xhr = void 0 !== t.ActiveXObject ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && B() || U()
    } : B;
    var Yi = 0, Ki = {}, Zi = oe.ajaxSettings.xhr();
    t.ActiveXObject && oe(t).on("unload", function () {
        for (var t in Ki)Ki[t](void 0, !0)
    }), ie.cors = !!Zi && "withCredentials" in Zi, Zi = ie.ajax = !!Zi, Zi && oe.ajaxTransport(function (t) {
        if (!t.crossDomain || ie.cors) {
            var e;
            return {
                send: function (i, n) {
                    var o, s = t.xhr(), r = ++Yi;
                    if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)for (o in t.xhrFields)s[o] = t.xhrFields[o];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (o in i)void 0 !== i[o] && s.setRequestHeader(o, i[o] + "");
                    s.send(t.hasContent && t.data || null), e = function (i, o) {
                        var a, l, c;
                        if (e && (o || 4 === s.readyState))if (delete Ki[r], e = void 0, s.onreadystatechange = oe.noop, o)4 !== s.readyState && s.abort(); else {
                            c = {}, a = s.status, "string" == typeof s.responseText && (c.text = s.responseText);
                            try {
                                l = s.statusText
                            } catch (d) {
                                l = ""
                            }
                            a || !t.isLocal || t.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
                        }
                        c && n(a, l, c, s.getAllResponseHeaders())
                    }, t.async ? 4 === s.readyState ? setTimeout(e) : s.onreadystatechange = Ki[r] = e : e()
                }, abort: function () {
                    e && e(void 0, !0)
                }
            }
        }
    }), oe.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (t) {
                return oe.globalEval(t), t
            }
        }
    }), oe.ajaxPrefilter("script", function (t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), oe.ajaxTransport("script", function (t) {
        if (t.crossDomain) {
            var e, i = fe.head || oe("head")[0] || fe.documentElement;
            return {
                send: function (n, o) {
                    e = fe.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function (t, i) {
                        (i || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, i || o(200, "success"))
                    }, i.insertBefore(e, i.firstChild)
                }, abort: function () {
                    e && e.onload(void 0, !0)
                }
            }
        }
    });
    var tn = [], en = /(=)\?(?=&|$)|\?\?/;
    oe.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var t = tn.pop() || oe.expando + "_" + ji++;
            return this[t] = !0, t
        }
    }), oe.ajaxPrefilter("json jsonp", function (e, i, n) {
        var o, s, r, a = e.jsonp !== !1 && (en.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && en.test(e.data) && "data");
        return a || "jsonp" === e.dataTypes[0] ? (o = e.jsonpCallback = oe.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(en, "$1" + o) : e.jsonp !== !1 && (e.url += (Ai.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function () {
            return r || oe.error(o + " was not called"), r[0]
        }, e.dataTypes[0] = "json", s = t[o], t[o] = function () {
            r = arguments
        }, n.always(function () {
            t[o] = s, e[o] && (e.jsonpCallback = i.jsonpCallback, tn.push(o)), r && oe.isFunction(s) && s(r[0]), r = s = void 0
        }), "script") : void 0
    }), oe.parseHTML = function (t, e, i) {
        if (!t || "string" != typeof t)return null;
        "boolean" == typeof e && (i = e, e = !1), e = e || fe;
        var n = ue.exec(t), o = !i && [];
        return n ? [e.createElement(n[1])] : (n = oe.buildFragment([t], e, o), o && o.length && oe(o).remove(), oe.merge([], n.childNodes))
    };
    var nn = oe.fn.load;
    oe.fn.load = function (t, e, i) {
        if ("string" != typeof t && nn)return nn.apply(this, arguments);
        var n, o, s, r = this, a = t.indexOf(" ");
        return a >= 0 && (n = oe.trim(t.slice(a, t.length)), t = t.slice(0, a)), oe.isFunction(e) ? (i = e, e = void 0) : e && "object" == typeof e && (s = "POST"), r.length > 0 && oe.ajax({
            url: t,
            type: s,
            dataType: "html",
            data: e
        }).done(function (t) {
            o = arguments, r.html(n ? oe("<div>").append(oe.parseHTML(t)).find(n) : t)
        }).complete(i && function (t, e) {
                r.each(i, o || [t.responseText, e, t])
            }), this
    }, oe.expr.filters.animated = function (t) {
        return oe.grep(oe.timers, function (e) {
            return t === e.elem
        }).length
    };
    var on = t.document.documentElement;
    oe.offset = {
        setOffset: function (t, e, i) {
            var n, o, s, r, a, l, c, d = oe.css(t, "position"), u = oe(t), p = {};
            "static" === d && (t.style.position = "relative"), a = u.offset(), s = oe.css(t, "top"), l = oe.css(t, "left"), c = ("absolute" === d || "fixed" === d) && oe.inArray("auto", [s, l]) > -1, c ? (n = u.position(), r = n.top, o = n.left) : (r = parseFloat(s) || 0, o = parseFloat(l) || 0), oe.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (p.top = e.top - a.top + r), null != e.left && (p.left = e.left - a.left + o), "using" in e ? e.using.call(t, p) : u.css(p)
        }
    }, oe.fn.extend({
        offset: function (t) {
            if (arguments.length)return void 0 === t ? this : this.each(function (e) {
                oe.offset.setOffset(this, t, e)
            });
            var e, i, n = {top: 0, left: 0}, o = this[0], s = o && o.ownerDocument;
            if (s)return e = s.documentElement, oe.contains(e, o) ? (typeof o.getBoundingClientRect !== Te && (n = o.getBoundingClientRect()), i = X(s), {
                top: n.top + (i.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: n.left + (i.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : n
        }, position: function () {
            if (this[0]) {
                var t, e, i = {top: 0, left: 0}, n = this[0];
                return "fixed" === oe.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), oe.nodeName(t[0], "html") || (i = t.offset()), i.top += oe.css(t[0], "borderTopWidth", !0), i.left += oe.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - i.top - oe.css(n, "marginTop", !0),
                    left: e.left - i.left - oe.css(n, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var t = this.offsetParent || on; t && !oe.nodeName(t, "html") && "static" === oe.css(t, "position");)t = t.offsetParent;
                return t || on
            })
        }
    }), oe.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, e) {
        var i = /Y/.test(e);
        oe.fn[t] = function (n) {
            return $e(this, function (t, n, o) {
                var s = X(t);
                return void 0 === o ? s ? e in s ? s[e] : s.document.documentElement[n] : t[n] : void(s ? s.scrollTo(i ? oe(s).scrollLeft() : o, i ? o : oe(s).scrollTop()) : t[n] = o)
            }, t, n, arguments.length, null)
        }
    }), oe.each(["top", "left"], function (t, e) {
        oe.cssHooks[e] = E(ie.pixelPosition, function (t, i) {
            return i ? (i = ei(t, e), ni.test(i) ? oe(t).position()[e] + "px" : i) : void 0
        })
    }), oe.each({Height: "height", Width: "width"}, function (t, e) {
        oe.each({padding: "inner" + t, content: e, "": "outer" + t}, function (i, n) {
            oe.fn[n] = function (n, o) {
                var s = arguments.length && (i || "boolean" != typeof n), r = i || (n === !0 || o === !0 ? "margin" : "border");
                return $e(this, function (e, i, n) {
                    var o;
                    return oe.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (o = e.documentElement, Math.max(e.body["scroll" + t], o["scroll" + t], e.body["offset" + t], o["offset" + t], o["client" + t])) : void 0 === n ? oe.css(e, i, r) : oe.style(e, i, n, r)
                }, e, s ? n : void 0, s, null)
            }
        })
    }), oe.fn.size = function () {
        return this.length
    }, oe.fn.andSelf = oe.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return oe
    });
    var sn = t.jQuery, rn = t.$;
    return oe.noConflict = function (e) {
        return t.$ === oe && (t.$ = rn), e && t.jQuery === oe && (t.jQuery = sn), oe
    }, typeof e === Te && (t.jQuery = t.$ = oe), oe
}), function (t, e) {
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var i, n = t(document);
    t.rails = i = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        CSRFProtection: function (e) {
            var i = t('meta[name="csrf-token"]').attr("content");
            i && e.setRequestHeader("X-CSRF-Token", i)
        },
        refreshCSRFTokens: function () {
            var e = t("meta[name=csrf-token]").attr("content"), i = t("meta[name=csrf-param]").attr("content");
            t('form input[name="' + i + '"]').val(e)
        },
        fire: function (e, i, n) {
            var o = t.Event(i);
            return e.trigger(o, n), o.result !== !1
        },
        confirm: function (t) {
            return confirm(t)
        },
        ajax: function (e) {
            return t.ajax(e)
        },
        href: function (t) {
            return t[0].href
        },
        handleRemote: function (n) {
            var o, s, r, a, l, c;
            if (i.fire(n, "ajax:before")) {
                if (a = n.data("with-credentials") || null, l = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, n.is("form")) {
                    o = n.attr("method"), s = n.attr("action"), r = n.serializeArray();
                    var d = n.data("ujs:submit-button");
                    d && (r.push(d), n.data("ujs:submit-button", null))
                } else n.is(i.inputChangeSelector) ? (o = n.data("method"), s = n.data("url"), r = n.serialize(), n.data("params") && (r = r + "&" + n.data("params"))) : n.is(i.buttonClickSelector) ? (o = n.data("method") || "get", s = n.data("url"), r = n.serialize(), n.data("params") && (r = r + "&" + n.data("params"))) : (o = n.data("method"), s = i.href(n), r = n.data("params") || null);
                return c = {
                    type: o || "GET", data: r, dataType: l, beforeSend: function (t, o) {
                        return o.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), i.fire(n, "ajax:beforeSend", [t, o]) ? void n.trigger("ajax:send", t) : !1
                    }, success: function (t, e, i) {
                        n.trigger("ajax:success", [t, e, i])
                    }, complete: function (t, e) {
                        n.trigger("ajax:complete", [t, e])
                    }, error: function (t, e, i) {
                        n.trigger("ajax:error", [t, e, i])
                    }, crossDomain: i.isCrossDomain(s)
                }, a && (c.xhrFields = {withCredentials: a}), s && (c.url = s), i.ajax(c)
            }
            return !1
        },
        isCrossDomain: function (t) {
            var e = document.createElement("a");
            e.href = location.href;
            var i = document.createElement("a");
            try {
                return i.href = t, i.href = i.href, !i.protocol || !i.host || e.protocol + "//" + e.host != i.protocol + "//" + i.host
            } catch (n) {
                return !0
            }
        },
        handleMethod: function (n) {
            var o = i.href(n), s = n.data("method"), r = n.attr("target"), a = t("meta[name=csrf-token]").attr("content"), l = t("meta[name=csrf-param]").attr("content"), c = t('<form method="post" action="' + o + '"></form>'), d = '<input name="_method" value="' + s + '" type="hidden" />';
            l === e || a === e || i.isCrossDomain(o) || (d += '<input name="' + l + '" value="' + a + '" type="hidden" />'), r && c.attr("target", r), c.hide().append(d).appendTo("body"), c.submit()
        },
        formElements: function (e, i) {
            return e.is("form") ? t(e[0].elements).filter(i) : e.find(i)
        },
        disableFormElements: function (e) {
            i.formElements(e, i.disableSelector).each(function () {
                i.disableFormElement(t(this))
            })
        },
        disableFormElement: function (t) {
            var i, n;
            i = t.is("button") ? "html" : "val", n = t.data("disable-with"), t.data("ujs:enable-with", t[i]()), n !== e && t[i](n), t.prop("disabled", !0)
        },
        enableFormElements: function (e) {
            i.formElements(e, i.enableSelector).each(function () {
                i.enableFormElement(t(this))
            })
        },
        enableFormElement: function (t) {
            var e = t.is("button") ? "html" : "val";
            t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
        },
        allowAction: function (t) {
            var e, n = t.data("confirm"), o = !1;
            return n ? (i.fire(t, "confirm") && (o = i.confirm(n), e = i.fire(t, "confirm:complete", [o])), o && e) : !0
        },
        blankInputs: function (e, i, n) {
            var o, s, r = t(), a = i || "input,textarea", l = e.find(a);
            return l.each(function () {
                if (o = t(this), s = o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : o.val(), !s == !n) {
                    if (o.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + o.attr("name") + '"]').length)return !0;
                    r = r.add(o)
                }
            }), r.length ? r : !1
        },
        nonBlankInputs: function (t, e) {
            return i.blankInputs(t, e, !0)
        },
        stopEverything: function (e) {
            return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        disableElement: function (t) {
            var n = t.data("disable-with");
            t.data("ujs:enable-with", t.html()), n !== e && t.html(n), t.bind("click.railsDisable", function (t) {
                return i.stopEverything(t)
            })
        },
        enableElement: function (t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
        }
    }, i.fire(n, "rails:attachBindings") && (t.ajaxPrefilter(function (t, e, n) {
        t.crossDomain || i.CSRFProtection(n)
    }), n.delegate(i.linkDisableSelector, "ajax:complete", function () {
        i.enableElement(t(this))
    }), n.delegate(i.buttonDisableSelector, "ajax:complete", function () {
        i.enableFormElement(t(this))
    }), n.delegate(i.linkClickSelector, "click.rails", function (n) {
        var o = t(this), s = o.data("method"), r = o.data("params"), a = n.metaKey || n.ctrlKey;
        if (!i.allowAction(o))return i.stopEverything(n);
        if (!a && o.is(i.linkDisableSelector) && i.disableElement(o), o.data("remote") !== e) {
            if (a && (!s || "GET" === s) && !r)return !0;
            var l = i.handleRemote(o);
            return l === !1 ? i.enableElement(o) : l.error(function () {
                i.enableElement(o)
            }), !1
        }
        return o.data("method") ? (i.handleMethod(o), !1) : void 0
    }), n.delegate(i.buttonClickSelector, "click.rails", function (e) {
        var n = t(this);
        if (!i.allowAction(n))return i.stopEverything(e);
        n.is(i.buttonDisableSelector) && i.disableFormElement(n);
        var o = i.handleRemote(n);
        return o === !1 ? i.enableFormElement(n) : o.error(function () {
            i.enableFormElement(n)
        }), !1
    }), n.delegate(i.inputChangeSelector, "change.rails", function (e) {
        var n = t(this);
        return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
    }), n.delegate(i.formSubmitSelector, "submit.rails", function (n) {
        var o, s, r = t(this), a = r.data("remote") !== e;
        if (!i.allowAction(r))return i.stopEverything(n);
        if (r.attr("novalidate") == e && (o = i.blankInputs(r, i.requiredInputSelector), o && i.fire(r, "ajax:aborted:required", [o])))return i.stopEverything(n);
        if (a) {
            if (s = i.nonBlankInputs(r, i.fileInputSelector)) {
                setTimeout(function () {
                    i.disableFormElements(r)
                }, 13);
                var l = i.fire(r, "ajax:aborted:file", [s]);
                return l || setTimeout(function () {
                    i.enableFormElements(r)
                }, 13), l
            }
            return i.handleRemote(r), !1
        }
        setTimeout(function () {
            i.disableFormElements(r)
        }, 13)
    }), n.delegate(i.formInputClickSelector, "click.rails", function (e) {
        var n = t(this);
        if (!i.allowAction(n))return i.stopEverything(e);
        var o = n.attr("name"), s = o ? {name: o, value: n.val()} : null;
        n.closest("form").data("ujs:submit-button", s)
    }), n.delegate(i.formSubmitSelector, "ajax:send.rails", function (e) {
        this == e.target && i.disableFormElements(t(this))
    }), n.delegate(i.formSubmitSelector, "ajax:complete.rails", function (e) {
        this == e.target && i.enableFormElements(t(this))
    }), t(function () {
        i.refreshCSRFTokens()
    }))
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var n = t(this), o = n.data("bs.collapse"), s = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            !o && s.toggle && "show" == e && (e = !e), o || n.data("bs.collapse", o = new i(this, s)), "string" == typeof e && o[e]()
        })
    }

    var i = function (e, n) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.transitioning = null, this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    i.VERSION = "3.2.0", i.DEFAULTS = {toggle: !0}, i.prototype.dimension = function () {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, i.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var i = t.Event("show.bs.collapse");
            if (this.$element.trigger(i), !i.isDefaultPrevented()) {
                var n = this.$parent && this.$parent.find("> .panel > .in");
                if (n && n.length) {
                    var o = n.data("bs.collapse");
                    if (o && o.transitioning)return;
                    e.call(n, "hide"), o || n.data("bs.collapse", null)
                }
                var s = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[s](0), this.transitioning = 1;
                var r = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[s](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!t.support.transition)return r.call(this);
                var a = t.camelCase(["scroll", s].join("-"));
                this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(350)[s](this.$element[0][a])
            }
        }
    }, i.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var n = function () {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(350) : n.call(this)
            }
        }
    }, i.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var n = t.fn.collapse;
    t.fn.collapse = e, t.fn.collapse.Constructor = i, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = n, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (i) {
        var n, o = t(this), s = o.attr("data-target") || i.preventDefault() || (n = o.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""), r = t(s), a = r.data("bs.collapse"), l = a ? "toggle" : o.data(), c = o.attr("data-parent"), d = c && t(c);
        a && a.transitioning || (d && d.find('[data-toggle="collapse"][data-parent="' + c + '"]').not(o).addClass("collapsed"), o[r.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), e.call(r, l)
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e, n) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.modal"), r = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e);
            s || o.data("bs.modal", s = new i(this, r)), "string" == typeof e ? s[e](n) : r.show && s.show(n)
        })
    }

    var i = function (e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.2.0", i.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0}, i.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function (e) {
        var i = this, n = t.Event("show.bs.modal", {relatedTarget: e});
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function () {
            var n = t.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), n && i.$element[0].offsetWidth, i.$element.addClass("in").attr("aria-hidden", !1), i.enforceFocus();
            var o = t.Event("shown.bs.modal", {relatedTarget: e});
            n ? i.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
                i.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(300) : i.$element.trigger("focus").trigger(o)
        }))
    }, i.prototype.hide = function (e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, i.prototype.enforceFocus = function () {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", t.proxy(function (t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, i.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function (e) {
        var i = this, n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && n;
            if (this.$backdrop = t('<div class="modal-backdrop ' + n + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
                    t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e)return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var s = function () {
                i.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", s).emulateTransitionEnd(150) : s()
        } else e && e()
    }, i.prototype.checkScrollbar = function () {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
    }, i.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "")
    }, i.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var n = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function () {
        return t.fn.modal = n, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
        var n = t(this), o = n.attr("href"), s = t(n.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")), r = s.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(o) && o}, s.data(), n.data());
        n.is("a") && i.preventDefault(), s.one("show.bs.modal", function (t) {
            t.isDefaultPrevented() || s.one("hidden.bs.modal", function () {
                n.is(":visible") && n.trigger("focus")
            })
        }), e.call(s, r, this)
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var n = t(this), o = n.data("bs.tab");
            o || n.data("bs.tab", o = new i(this)), "string" == typeof e && o[e]()
        })
    }

    var i = function (e) {
        this.element = t(e)
    };
    i.VERSION = "3.2.0", i.prototype.show = function () {
        var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), n = e.data("target");
        if (n || (n = e.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var o = i.find(".active:last a")[0], s = t.Event("show.bs.tab", {relatedTarget: o});
            if (e.trigger(s), !s.isDefaultPrevented()) {
                var r = t(n);
                this.activate(e.closest("li"), i), this.activate(r, r.parent(), function () {
                    e.trigger({type: "shown.bs.tab", relatedTarget: o})
                })
            }
        }
    }, i.prototype.activate = function (e, i, n) {
        function o() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), n && n()
        }

        var s = i.find("> .active"), r = n && t.support.transition && s.hasClass("fade");
        r ? s.one("bsTransitionEnd", o).emulateTransitionEnd(150) : o(), s.removeClass("in")
    };
    var n = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function () {
        return t.fn.tab = n, this
    }, t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (i) {
        i.preventDefault(), e.call(t(this), "show")
    })
}(jQuery), +function (t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e)if (void 0 !== t.style[i])return {end: e[i]};
        return !1
    }

    t.fn.emulateTransitionEnd = function (e) {
        var i = !1, n = this;
        t(this).one("bsTransitionEnd", function () {
            i = !0
        });
        var o = function () {
            i || t(n).trigger(t.support.transition.end)
        };
        return setTimeout(o, e), this
    }, t(function () {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var n = t(this), o = n.data("bs.tooltip"), s = "object" == typeof e && e;
            (o || "destroy" != e) && (o || n.data("bs.tooltip", o = new i(this, s)), "string" == typeof e && o[e]())
        })
    }

    var i = function (t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.2.0", i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, i.prototype.init = function (e, i, n) {
        this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
        for (var o = this.options.trigger.split(" "), s = o.length; s--;) {
            var r = o[s];
            if ("click" == r)this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin", l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function () {
        return i.DEFAULTS
    }, i.prototype.getOptions = function (e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function () {
        var e = {}, i = this.getDefaults();
        return this._options && t.each(this._options, function (t, n) {
            i[t] != n && (e[t] = n)
        }), e
    }, i.prototype.enter = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show()
    }, i.prototype.leave = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function () {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, i.prototype.show = function () {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var i = t.contains(document.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !i)return;
            var n = this, o = this.tip(), s = this.getUID(this.type);
            this.setContent(), o.attr("id", s), this.$element.attr("aria-describedby", s), this.options.animation && o.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement, a = /\s?auto?\s?/i, l = a.test(r);
            l && (r = r.replace(a, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
            var c = this.getPosition(), d = o[0].offsetWidth, u = o[0].offsetHeight;
            if (l) {
                var p = r, h = this.$element.parent(), f = this.getPosition(h);
                r = "bottom" == r && c.top + c.height + u - f.scroll > f.height ? "top" : "top" == r && c.top - f.scroll - u < 0 ? "bottom" : "right" == r && c.right + d > f.width ? "left" : "left" == r && c.left - d < f.left ? "right" : r, o.removeClass(p).addClass(r)
            }
            var m = this.getCalculatedOffset(r, c, d, u);
            this.applyPlacement(m, r);
            var g = function () {
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", g).emulateTransitionEnd(150) : g()
        }
    }, i.prototype.applyPlacement = function (e, i) {
        var n = this.tip(), o = n[0].offsetWidth, s = n[0].offsetHeight, r = parseInt(n.css("margin-top"), 10), a = parseInt(n.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top = e.top + r, e.left = e.left + a, t.offset.setOffset(n[0], t.extend({
            using: function (t) {
                n.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, e), 0), n.addClass("in");
        var l = n[0].offsetWidth, c = n[0].offsetHeight;
        "top" == i && c != s && (e.top = e.top + s - c);
        var d = this.getViewportAdjustedDelta(i, e, l, c);
        d.left ? e.left += d.left : e.top += d.top;
        var u = d.left ? 2 * d.left - o + l : 2 * d.top - s + c, p = d.left ? "left" : "top", h = d.left ? "offsetWidth" : "offsetHeight";
        n.offset(e), this.replaceArrow(u, n[0][h], p)
    }, i.prototype.replaceArrow = function (t, e, i) {
        this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
    }, i.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function () {
        function e() {
            "in" != i.hoverState && n.detach(), i.$element.trigger("hidden.bs." + i.type)
        }

        var i = this, n = this.tip(), o = t.Event("hide.bs." + this.type);
        return this.$element.removeAttr("aria-describedby"), this.$element.trigger(o), o.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), this.hoverState = null, this)
    }, i.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function () {
        return this.getTitle()
    }, i.prototype.getPosition = function (e) {
        e = e || this.$element;
        var i = e[0], n = "BODY" == i.tagName;
        return t.extend({}, "function" == typeof i.getBoundingClientRect ? i.getBoundingClientRect() : null, {
            scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop(),
            width: n ? t(window).width() : e.outerWidth(),
            height: n ? t(window).height() : e.outerHeight()
        }, n ? {top: 0, left: 0} : e.offset())
    }, i.prototype.getCalculatedOffset = function (t, e, i, n) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - n,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {top: e.top + e.height / 2 - n / 2, left: e.left - i} : {
            top: e.top + e.height / 2 - n / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function (t, e, i, n) {
        var o = {top: 0, left: 0};
        if (!this.$viewport)return o;
        var s = this.options.viewport && this.options.viewport.padding || 0, r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - s - r.scroll, l = e.top + s - r.scroll + n;
            a < r.top ? o.top = r.top - a : l > r.top + r.height && (o.top = r.top + r.height - l)
        } else {
            var c = e.left - s, d = e.left + s + i;
            c < r.left ? o.left = r.left - c : d > r.width && (o.left = r.left + r.width - d)
        }
        return o
    }, i.prototype.getTitle = function () {
        var t, e = this.$element, i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function (t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function () {
        return this.$tip = this.$tip || t(this.options.template)
    }, i.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, i.prototype.enable = function () {
        this.enabled = !0
    }, i.prototype.disable = function () {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function (e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function () {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var n = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = n, this
    }
}(jQuery), +function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var n = t(this), o = n.data("bs.popover"), s = "object" == typeof e && e;
            (o || "destroy" != e) && (o || n.data("bs.popover", o = new i(this, s)), "string" == typeof e && o[e]())
        })
    }

    var i = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip)throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.2.0", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function () {
        return i.DEFAULTS
    }, i.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle(), i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").empty()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, i.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, i.prototype.getContent = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, i.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, i.prototype.tip = function () {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    };
    var n = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function () {
        return t.fn.popover = n, this
    }
}(jQuery), !function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
    "use strict";
    var e = window.Slick || {};
    e = function () {
        function e(e, n) {
            var o, s = this;
            s.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: t(e),
                appendDots: t(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (t, e) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (e + 1) + "</button>"
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, s.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, t.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.hidden = "hidden", s.paused = !1, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = t(e), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, o = t(e).data("slick") || {}, s.options = t.extend({}, s.defaults, o, n), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, "undefined" != typeof document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = t.proxy(s.autoPlay, s), s.autoPlayClear = t.proxy(s.autoPlayClear, s), s.changeSlide = t.proxy(s.changeSlide, s), s.clickHandler = t.proxy(s.clickHandler, s), s.selectHandler = t.proxy(s.selectHandler, s), s.setPosition = t.proxy(s.setPosition, s), s.swipeHandler = t.proxy(s.swipeHandler, s), s.dragHandler = t.proxy(s.dragHandler, s), s.keyHandler = t.proxy(s.keyHandler, s), s.autoPlayIterator = t.proxy(s.autoPlayIterator, s), s.instanceUid = i++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0), s.checkResponsive(!0)
        }

        var i = 0;
        return e
    }(), e.prototype.addSlide = e.prototype.slickAdd = function (e, i, n) {
        var o = this;
        if ("boolean" == typeof i)n = i, i = null; else if (0 > i || i >= o.slideCount)return !1;
        o.unload(), "number" == typeof i ? 0 === i && 0 === o.$slides.length ? t(e).appendTo(o.$slideTrack) : n ? t(e).insertBefore(o.$slides.eq(i)) : t(e).insertAfter(o.$slides.eq(i)) : n === !0 ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function (e, i) {
            t(i).attr("data-slick-index", e)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, e.prototype.animateHeight = function () {
        var t = this;
        if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.animate({height: e}, t.options.speed)
        }
    }, e.prototype.animateSlide = function (e, i) {
        var n = {}, o = this;
        o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (e = -e), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({left: e}, o.options.speed, o.options.easing, i) : o.$slideTrack.animate({top: e}, o.options.speed, o.options.easing, i) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), t({animStart: o.currentLeft}).animate({animStart: e}, {
            duration: o.options.speed, easing: o.options.easing, step: function (t) {
                t = Math.ceil(t), o.options.vertical === !1 ? (n[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(n)) : (n[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(n))
            }, complete: function () {
                i && i.call()
            }
        })) : (o.applyTransition(), e = Math.ceil(e), n[o.animType] = o.options.vertical === !1 ? "translate3d(" + e + "px, 0px, 0px)" : "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(n), i && setTimeout(function () {
            o.disableTransition(), i.call()
        }, o.options.speed))
    }, e.prototype.asNavFor = function (e) {
        var i = this, n = i.options.asNavFor;
        n && null !== n && (n = t(n).not(i.$slider)), null !== n && "object" == typeof n && n.each(function () {
            var i = t(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function (t) {
        var e = this, i = {};
        i[e.transitionType] = e.options.fade === !1 ? e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.autoPlay = function () {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function () {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function () {
        var t = this;
        t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (0 === t.currentSlide - 1 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
    }, e.prototype.buildArrows = function () {
        var e = this;
        e.options.arrows === !0 && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function () {
        var e, i, n = this;
        if (n.options.dots === !0 && n.slideCount > n.options.slidesToShow) {
            for (i = '<ul class="' + n.options.dotsClass + '">', e = 0; e <= n.getDotCount(); e += 1)i += "<li>" + n.options.customPaging.call(this, n, e) + "</li>";
            i += "</ul>", n.$dots = t(i).appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, e.prototype.buildOut = function () {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, i) {
            t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
        }), e.$slidesCache = e.$slides, e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), (e.options.centerMode === !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function () {
        var t, e, i, n, o, s, r, a = this;
        if (n = document.createDocumentFragment(), s = a.$slider.children(), a.options.rows > 1) {
            for (r = a.options.slidesPerRow * a.options.rows, o = Math.ceil(s.length / r), t = 0; o > t; t++) {
                var l = document.createElement("div");
                for (e = 0; e < a.options.rows; e++) {
                    var c = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var d = t * r + (e * a.options.slidesPerRow + i);
                        s.get(d) && c.appendChild(s.get(d))
                    }
                    l.appendChild(c)
                }
                n.appendChild(l)
            }
            a.$slider.html(n), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function (e, i) {
        var n, o, s, r = this, a = !1, l = r.$slider.width(), c = window.innerWidth || t(window).width();
        if ("window" === r.respondTo ? s = c : "slider" === r.respondTo ? s = l : "min" === r.respondTo && (s = Math.min(c, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            o = null;
            for (n in r.breakpoints)r.breakpoints.hasOwnProperty(n) && (r.originalSettings.mobileFirst === !1 ? s < r.breakpoints[n] && (o = r.breakpoints[n]) : s > r.breakpoints[n] && (o = r.breakpoints[n]));
            null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || i) && (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = o) : (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), a = o), e || a === !1 || r.$slider.trigger("breakpoint", [r, a])
        }
    }, e.prototype.changeSlide = function (e, i) {
        var n, o, s, r = this, a = t(e.target);
        switch (a.is("a") && e.preventDefault(), a.is("li") || (a = a.closest("li")), s = 0 !== r.slideCount % r.options.slidesToScroll, n = s ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case"previous":
                o = 0 === n ? r.options.slidesToScroll : r.options.slidesToShow - n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, i);
                break;
            case"next":
                o = 0 === n ? r.options.slidesToScroll : n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, i);
                break;
            case"index":
                var l = 0 === e.data.index ? 0 : e.data.index || a.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(l), !1, i), a.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function (t) {
        var e, i, n = this;
        if (e = n.getNavigableIndexes(), i = 0, t > e[e.length - 1])t = e[e.length - 1]; else for (var o in e) {
            if (t < e[o]) {
                t = i;
                break
            }
            i = e[o]
        }
        return t
    }, e.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide), e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).off("mouseenter.slick", t.proxy(e.setPaused, e, !0)).off("mouseleave.slick", t.proxy(e.setPaused, e, !1))), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.$list.off("mouseenter.slick", t.proxy(e.setPaused, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.setPaused, e, !1)), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpRows = function () {
        var t, e = this;
        e.options.rows > 1 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.html(t))
    }, e.prototype.clickHandler = function (t) {
        var e = this;
        e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
    }, e.prototype.destroy = function (e) {
        var i = this;
        i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            t(this).attr("style", t(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
    }, e.prototype.disableTransition = function (t) {
        var e = this, i = {};
        i[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.fadeSlide = function (t, e) {
        var i = this;
        i.cssTransitions === !1 ? (i.$slides.eq(t).css({zIndex: i.options.zIndex}), i.$slides.eq(t).animate({opacity: 1}, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), e && setTimeout(function () {
            i.disableTransition(t), e.call()
        }, i.options.speed))
    }, e.prototype.fadeSlideOut = function (t) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(t).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function (t) {
        var e = this;
        null !== t && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
        var t = this;
        return t.currentSlide
    }, e.prototype.getDotCount = function () {
        var t = this, e = 0, i = 0, n = 0;
        if (t.options.infinite === !0)for (; e < t.slideCount;)++n, e = i + t.options.slidesToShow, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow; else if (t.options.centerMode === !0)n = t.slideCount; else for (; e < t.slideCount;)++n, e = i + t.options.slidesToShow, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return n - 1
    }, e.prototype.getLeft = function (t) {
        var e, i, n, o = this, s = 0;
        return o.slideOffset = 0, i = o.$slides.first().outerHeight(!0), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = -1 * o.slideWidth * o.options.slidesToShow, s = -1 * i * o.options.slidesToShow), 0 !== o.slideCount % o.options.slidesToScroll && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = -1 * (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth, s = -1 * (o.options.slidesToShow - (t - o.slideCount)) * i) : (o.slideOffset = -1 * o.slideCount % o.options.slidesToScroll * o.slideWidth, s = -1 * o.slideCount % o.options.slidesToScroll * i))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, s = (t + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, s = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = o.options.vertical === !1 ? -1 * t * o.slideWidth + o.slideOffset : -1 * t * i + s, o.options.variableWidth === !0 && (n = o.$slideTrack.children(".slick-slide").eq(o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? t : t + o.options.slidesToShow), e = n[0] ? -1 * n[0].offsetLeft : 0, o.options.centerMode === !0 && (n = o.$slideTrack.children(".slick-slide").eq(o.options.infinite === !1 ? t : t + o.options.slidesToShow + 1), e = n[0] ? -1 * n[0].offsetLeft : 0, e += (o.$list.width() - n.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function (t) {
        var e = this;
        return e.options[t]
    }, e.prototype.getNavigableIndexes = function () {
        var t, e = this, i = 0, n = 0, o = [];
        for (e.options.infinite === !1 ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, n = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); t > i;)o.push(i), i = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return o
    }, e.prototype.getSlick = function () {
        return this
    }, e.prototype.getSlideCount = function () {
        var e, i, n, o = this;
        return n = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide === !0 ? (o.$slideTrack.find(".slick-slide").each(function (e, s) {
            return s.offsetLeft - n + t(s).outerWidth() / 2 > -1 * o.swipeLeft ? (i = s, !1) : void 0
        }), e = Math.abs(t(i).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
        var i = this;
        i.changeSlide({data: {message: "index", index: parseInt(t)}}, e)
    }, e.prototype.init = function (e) {
        var i = this;
        t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots()), e && i.$slider.trigger("init", [i]), i.options.accessibility === !0 && i.initADA()
    }, e.prototype.initArrowEvents = function () {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {message: "previous"}, t.changeSlide), t.$nextArrow.on("click.slick", {message: "next"}, t.changeSlide))
    }, e.prototype.initDotEvents = function () {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {message: "index"}, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.setPaused, e, !0)).on("mouseleave.slick", t.proxy(e.setPaused, e, !1))
    }, e.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.$list.on("touchstart.slick mousedown.slick", {action: "start"}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {action: "move"}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {action: "end"}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), e.$list.on("mouseenter.slick", t.proxy(e.setPaused, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.setPaused, e, !1)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.initUI = function () {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
    }, e.prototype.keyHandler = function (t) {
        var e = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && e.options.accessibility === !0 ? e.changeSlide({data: {message: "previous"}}) : 39 === t.keyCode && e.options.accessibility === !0 && e.changeSlide({data: {message: "next"}}))
    }, e.prototype.lazyLoad = function () {
        function e(e) {
            t("img[data-lazy]", e).each(function () {
                var e = t(this), i = t(this).attr("data-lazy"), n = document.createElement("img");
                n.onload = function () {
                    e.animate({opacity: 0}, 100, function () {
                        e.attr("src", i).animate({opacity: 1}, 200, function () {
                            e.removeAttr("data-lazy").removeClass("slick-loading")
                        })
                    })
                }, n.src = i
            })
        }

        var i, n, o, s, r = this;
        r.options.centerMode === !0 ? r.options.infinite === !0 ? (o = r.currentSlide + (r.options.slidesToShow / 2 + 1), s = o + r.options.slidesToShow + 2) : (o = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), s = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (o = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, s = o + r.options.slidesToShow, r.options.fade === !0 && (o > 0 && o--, s <= r.slideCount && s++)), i = r.$slider.find(".slick-slide").slice(o, s), e(i), r.slideCount <= r.options.slidesToShow ? (n = r.$slider.find(".slick-slide"), e(n)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (n = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(n)) : 0 === r.currentSlide && (n = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), e(n))
    }, e.prototype.loadSlider = function () {
        var t = this;
        t.setPosition(), t.$slideTrack.css({opacity: 1}), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function () {
        var t = this;
        t.changeSlide({data: {message: "next"}})
    }, e.prototype.orientationChange = function () {
        var t = this;
        t.checkResponsive(), t.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function () {
        var t = this;
        t.autoPlayClear(), t.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function () {
        var t = this;
        t.paused = !1, t.autoPlay()
    }, e.prototype.postSlide = function (t) {
        var e = this;
        e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay === !0 && e.paused === !1 && e.autoPlay(), e.options.accessibility === !0 && e.initADA()
    }, e.prototype.prev = e.prototype.slickPrev = function () {
        var t = this;
        t.changeSlide({data: {message: "previous"}})
    }, e.prototype.preventDefault = function (t) {
        t.preventDefault()
    }, e.prototype.progressiveLazyLoad = function () {
        var e, i, n = this;
        e = t("img[data-lazy]", n.$slider).length, e > 0 && (i = t("img[data-lazy]", n.$slider).first(), i.attr("src", i.attr("data-lazy")).removeClass("slick-loading").load(function () {
            i.removeAttr("data-lazy"), n.progressiveLazyLoad(), n.options.adaptiveHeight === !0 && n.setPosition()
        }).error(function () {
            i.removeAttr("data-lazy"), n.progressiveLazyLoad()
        }))
    }, e.prototype.refresh = function (e) {
        var i = this, n = i.currentSlide;
        i.destroy(!0), t.extend(i, i.initials, {currentSlide: n}), i.init(), e || i.changeSlide({
            data: {
                message: "index",
                index: n
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function () {
        var e, i, n, o = this, s = o.options.responsive || null;
        if ("array" === t.type(s) && s.length) {
            o.respondTo = o.options.respondTo || "window";
            for (e in s)if (n = o.breakpoints.length - 1, i = s[e].breakpoint, s.hasOwnProperty(e)) {
                for (; n >= 0;)o.breakpoints[n] && o.breakpoints[n] === i && o.breakpoints.splice(n, 1), n--;
                o.breakpoints.push(i), o.breakpointSettings[i] = s[e].settings
            }
            o.breakpoints.sort(function (t, e) {
                return o.options.mobileFirst ? t - e : e - t
            })
        }
    }, e.prototype.reinit = function () {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses(0), e.setPosition(), e.$slider.trigger("reInit", [e]), e.options.autoplay === !0 && e.focusHandler()
    }, e.prototype.resize = function () {
        var e = this;
        t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
            e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function (t, e, i) {
        var n = this;
        return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : n.slideCount - 1) : t = e === !0 ? --t : t, n.slideCount < 1 || 0 > t || t > n.slideCount - 1 ? !1 : (n.unload(), i === !0 ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, void n.reinit())
    }, e.prototype.setCSS = function (t) {
        var e, i, n = this, o = {};
        n.options.rtl === !0 && (t = -t), e = "left" == n.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == n.positionProp ? Math.ceil(t) + "px" : "0px", o[n.positionProp] = t, n.transformsEnabled === !1 ? n.$slideTrack.css(o) : (o = {}, n.cssTransitions === !1 ? (o[n.animType] = "translate(" + e + ", " + i + ")", n.$slideTrack.css(o)) : (o[n.animType] = "translate3d(" + e + ", " + i + ", 0px)", n.$slideTrack.css(o)))
    }, e.prototype.setDimensions = function () {
        var t = this;
        t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({padding: "0px " + t.options.centerPadding}) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({padding: t.options.centerPadding + " 0px"})), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
    }, e.prototype.setFade = function () {
        var e, i = this;
        i.$slides.each(function (n, o) {
            e = -1 * i.slideWidth * n, t(o).css(i.options.rtl === !0 ? {
                position: "relative",
                right: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            } : {position: "relative", left: e, top: 0, zIndex: i.options.zIndex - 2, opacity: 0})
        }), i.$slides.eq(i.currentSlide).css({zIndex: i.options.zIndex - 1, opacity: 1})
    }, e.prototype.setHeight = function () {
        var t = this;
        if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function (e, i, n) {
        var o, s, r = this;
        if ("responsive" === e && "array" === t.type(i))for (s in i)if ("array" !== t.type(r.options.responsive))r.options.responsive = [i[s]]; else {
            for (o = r.options.responsive.length - 1; o >= 0;)r.options.responsive[o].breakpoint === i[s].breakpoint && r.options.responsive.splice(o, 1), o--;
            r.options.responsive.push(i[s])
        } else r.options[e] = i;
        n === !0 && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function () {
        var t = this;
        t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
    }, e.prototype.setProps = function () {
        var t = this, e = document.body.style;
        t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = null !== t.animType && t.animType !== !1
    }, e.prototype.setSlideClasses = function (t) {
        var e, i, n, o, s = this;
        i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(t).addClass("slick-current"), s.options.centerMode === !0 ? (e = Math.floor(s.options.slidesToShow / 2), s.options.infinite === !0 && (t >= e && t <= s.slideCount - 1 - e ? s.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = s.options.slidesToShow + t, i.slice(n - e + 1, n + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (o = s.slideCount % s.options.slidesToShow, n = s.options.infinite === !0 ? s.options.slidesToShow + t : t, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? i.slice(n - (s.options.slidesToShow - o), n + o).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === s.options.lazyLoad && s.lazyLoad()
    }, e.prototype.setupInfinite = function () {
        var e, i, n, o = this;
        if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (i = null, o.slideCount > o.options.slidesToShow)) {
            for (n = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - n; e -= 1)i = e - 1, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (e = 0; n > e; e += 1)i = e, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                t(this).attr("id", "")
            })
        }
    }, e.prototype.setPaused = function (t) {
        var e = this;
        e.options.autoplay === !0 && e.options.pauseOnHover === !0 && (e.paused = t, t ? e.autoPlayClear() : e.autoPlay())
    }, e.prototype.selectHandler = function (e) {
        var i = this, n = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"), o = parseInt(n.attr("data-slick-index"));
        return o || (o = 0), i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(o), void i.asNavFor(o)) : void i.slideHandler(o)
    }, e.prototype.slideHandler = function (t, e, i) {
        var n, o, s, r, a = null, l = this;
        return e = e || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (e === !1 && l.asNavFor(t), n = t, a = l.getLeft(n), r = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? r : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (n = l.currentSlide, i !== !0 ? l.animateSlide(r, function () {
            l.postSlide(n)
        }) : l.postSlide(n))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (n = l.currentSlide, i !== !0 ? l.animateSlide(r, function () {
            l.postSlide(n)
        }) : l.postSlide(n))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), o = 0 > n ? 0 !== l.slideCount % l.options.slidesToScroll ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + n : n >= l.slideCount ? 0 !== l.slideCount % l.options.slidesToScroll ? 0 : n - l.slideCount : n, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, o]), s = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (i !== !0 ? (l.fadeSlideOut(s), l.fadeSlide(o, function () {
            l.postSlide(o)
        })) : l.postSlide(o), void l.animateHeight()) : void(i !== !0 ? l.animateSlide(a, function () {
            l.postSlide(o)
        }) : l.postSlide(o))))
    }, e.prototype.startLoad = function () {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function () {
        var t, e, i, n, o = this;
        return t = o.touchObject.startX - o.touchObject.curX, e = o.touchObject.startY - o.touchObject.curY, i = Math.atan2(e, t), n = Math.round(180 * i / Math.PI), 0 > n && (n = 360 - Math.abs(n)), 45 >= n && n >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= n && n >= 315 ? o.options.rtl === !1 ? "left" : "right" : n >= 135 && 225 >= n ? o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping === !0 ? n >= 35 && 135 >= n ? "left" : "right" : "vertical"
    }, e.prototype.swipeEnd = function () {
        var t, e = this;
        if (e.dragging = !1, e.shouldClick = e.touchObject.swipeLength > 10 ? !1 : !0, void 0 === e.touchObject.curX)return !1;
        if (e.touchObject.edgeHit === !0 && e.$slider.trigger("edge", [e, e.swipeDirection()]), e.touchObject.swipeLength >= e.touchObject.minSwipe)switch (e.swipeDirection()) {
            case"left":
                t = e.options.swipeToSlide ? e.checkNavigable(e.currentSlide + e.getSlideCount()) : e.currentSlide + e.getSlideCount(), e.slideHandler(t), e.currentDirection = 0, e.touchObject = {}, e.$slider.trigger("swipe", [e, "left"]);
                break;
            case"right":
                t = e.options.swipeToSlide ? e.checkNavigable(e.currentSlide - e.getSlideCount()) : e.currentSlide - e.getSlideCount(), e.slideHandler(t), e.currentDirection = 1, e.touchObject = {}, e.$slider.trigger("swipe", [e, "right"])
        } else e.touchObject.startX !== e.touchObject.curX && (e.slideHandler(e.currentSlide), e.touchObject = {})
    }, e.prototype.swipeHandler = function (t) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== t.type.indexOf("mouse")))switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
            case"start":
                e.swipeStart(t);
                break;
            case"move":
                e.swipeMove(t);
                break;
            case"end":
                e.swipeEnd(t)
        }
    }, e.prototype.swipeMove = function (t) {
        var e, i, n, o, s, r = this;
        return s = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !r.dragging || s && 1 !== s.length ? !1 : (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX, r.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), i = r.swipeDirection(), "vertical" !== i ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), o = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (o = r.touchObject.curY > r.touchObject.startY ? 1 : -1), n = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (n = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.swipeLeft = r.options.vertical === !1 ? e + n * o : e + n * (r.$list.height() / r.listWidth) * o, r.options.verticalSwiping === !0 && (r.swipeLeft = e + n * o), r.options.fade === !0 || r.options.touchMove === !1 ? !1 : r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft)) : void 0)
    }, e.prototype.swipeStart = function (t) {
        var e, i = this;
        return 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void(i.dragging = !0))
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
        var t = this;
        null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
    }, e.prototype.unload = function () {
        var e = this;
        t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function (t) {
        var e = this;
        e.$slider.trigger("unslick", [e, t]), e.destroy()
    }, e.prototype.updateArrows = function () {
        var t, e = this;
        t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function () {
        var t = this;
        null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, e.prototype.visibility = function () {
        var t = this;
        document[t.hidden] ? (t.paused = !0, t.autoPlayClear()) : t.options.autoplay === !0 && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function () {
        var e = this;
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({tabindex: "-1"}), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (i) {
            t(this).attr({role: "option", "aria-describedby": "slick-slide" + e.instanceUid + i})
        }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function (i) {
            t(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + e.instanceUid + i,
                id: "slick-slide" + e.instanceUid + i
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
    }, e.prototype.activateADA = function () {
        var t = this, e = t.$slider.find("*").is(":focus");
        t.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false",
            tabindex: "0"
        }).find("a, input, button, select").attr({tabindex: "0"}), e && t.$slideTrack.find(".slick-active").focus()
    }, e.prototype.focusHandler = function () {
        var e = this;
        e.$slider.on("focus.slick blur.slick", "*", function (i) {
            i.stopImmediatePropagation();
            var n = t(this);
            setTimeout(function () {
                e.isPlay && (n.is(":focus") ? (e.autoPlayClear(), e.paused = !0) : (e.paused = !1, e.autoPlay()))
            }, 0)
        })
    }, t.fn.slick = function () {
        var t, i = this, n = arguments[0], o = Array.prototype.slice.call(arguments, 1), s = i.length, r = 0;
        for (r; s > r; r++)if ("object" == typeof n || "undefined" == typeof n ? i[r].slick = new e(i[r], n) : t = i[r].slick[n].apply(i[r].slick, o), "undefined" != typeof t)return t;
        return i
    }
}), function () {
    "use strict";
    function t() {
        var t = !1;
        if ("localStorage" in window)try {
            window.localStorage.setItem("_tmptest", "tmpval"), t = !0, window.localStorage.removeItem("_tmptest")
        } catch (e) {
        }
        if (t)try {
            window.localStorage && (k = window.localStorage, C = "localStorage", P = k.jStorage_update)
        } catch (o) {
        } else if ("globalStorage" in window)try {
            window.globalStorage && (k = "localhost" == window.location.hostname ? window.globalStorage["localhost.localdomain"] : window.globalStorage[window.location.hostname], C = "globalStorage", P = k.jStorage_update)
        } catch (s) {
        } else {
            if (x = document.createElement("link"), !x.addBehavior)return void(x = null);
            x.style.behavior = "url(#default#userData)", document.getElementsByTagName("head")[0].appendChild(x);
            try {
                x.load("jStorage")
            } catch (r) {
                x.setAttribute("jStorage", "{}"), x.save("jStorage"), x.load("jStorage")
            }
            var l = "{}";
            try {
                l = x.getAttribute("jStorage")
            } catch (c) {
            }
            try {
                P = x.getAttribute("jStorage_update")
            } catch (p) {
            }
            k.jStorage = l, C = "userDataBehavior"
        }
        a(), d(), i(), u(), "addEventListener" in window && window.addEventListener("pageshow", function (t) {
            t.persisted && n()
        }, !1)
    }

    function e() {
        var t = "{}";
        if ("userDataBehavior" == C) {
            x.load("jStorage");
            try {
                t = x.getAttribute("jStorage")
            } catch (e) {
            }
            try {
                P = x.getAttribute("jStorage_update")
            } catch (i) {
            }
            k.jStorage = t
        }
        a(), d(), u()
    }

    function i() {
        "localStorage" == C || "globalStorage" == C ? "addEventListener" in window ? window.addEventListener("storage", n, !1) : document.attachEvent("onstorage", n) : "userDataBehavior" == C && setInterval(n, 1e3)
    }

    function n() {
        var t;
        clearTimeout(E), E = setTimeout(function () {
            if ("localStorage" == C || "globalStorage" == C)t = k.jStorage_update; else if ("userDataBehavior" == C) {
                x.load("jStorage");
                try {
                    t = x.getAttribute("jStorage_update")
                } catch (e) {
                }
            }
            t && t != P && (P = t, o())
        }, 25)
    }

    function o() {
        var t, i = y.parse(y.stringify(w.__jstorage_meta.CRC32));
        e(), t = y.parse(y.stringify(w.__jstorage_meta.CRC32));
        var n, o = [], r = [];
        for (n in i)if (i.hasOwnProperty(n)) {
            if (!t[n]) {
                r.push(n);
                continue
            }
            i[n] != t[n] && "2." == String(i[n]).substr(0, 2) && o.push(n)
        }
        for (n in t)t.hasOwnProperty(n) && (i[n] || o.push(n));
        s(o, "updated"), s(r, "deleted")
    }

    function s(t, e) {
        t = [].concat(t || []);
        var i, n, o, s;
        if ("flushed" == e) {
            t = [];
            for (var r in S)S.hasOwnProperty(r) && t.push(r);
            e = "deleted"
        }
        for (i = 0, o = t.length; o > i; i++) {
            if (S[t[i]])for (n = 0, s = S[t[i]].length; s > n; n++)S[t[i]][n](t[i], e);
            if (S["*"])for (n = 0, s = S["*"].length; s > n; n++)S["*"][n](t[i], e)
        }
    }

    function r() {
        var t = (+new Date).toString();
        if ("localStorage" == C || "globalStorage" == C)try {
            k.jStorage_update = t
        } catch (e) {
            C = !1
        } else"userDataBehavior" == C && (x.setAttribute("jStorage_update", t), x.save("jStorage"));
        n()
    }

    function a() {
        if (k.jStorage)try {
            w = y.parse(String(k.jStorage))
        } catch (t) {
            k.jStorage = "{}"
        } else k.jStorage = "{}";
        T = k.jStorage ? String(k.jStorage).length : 0, w.__jstorage_meta || (w.__jstorage_meta = {}), w.__jstorage_meta.CRC32 || (w.__jstorage_meta.CRC32 = {})
    }

    function l() {
        h();
        try {
            k.jStorage = y.stringify(w), x && (x.setAttribute("jStorage", k.jStorage), x.save("jStorage")), T = k.jStorage ? String(k.jStorage).length : 0
        } catch (t) {
        }
    }

    function c(t) {
        if ("string" != typeof t && "number" != typeof t)throw new TypeError("Key name must be string or numeric");
        if ("__jstorage_meta" == t)throw new TypeError("Reserved key name");
        return !0
    }

    function d() {
        var t, e, i, n, o = 1 / 0, a = !1, c = [];
        if (clearTimeout(b), w.__jstorage_meta && "object" == typeof w.__jstorage_meta.TTL) {
            t = +new Date, i = w.__jstorage_meta.TTL, n = w.__jstorage_meta.CRC32;
            for (e in i)i.hasOwnProperty(e) && (i[e] <= t ? (delete i[e], delete n[e], delete w[e], a = !0, c.push(e)) : i[e] < o && (o = i[e]));
            1 / 0 != o && (b = setTimeout(d, Math.min(o - t, 2147483647))), a && (l(), r(), s(c, "deleted"))
        }
    }

    function u() {
        var t, e;
        if (w.__jstorage_meta.PubSub) {
            var i, n = $, o = [];
            for (t = e = w.__jstorage_meta.PubSub.length - 1; t >= 0; t--)i = w.__jstorage_meta.PubSub[t], i[0] > $ && (n = i[0], o.unshift(i));
            for (t = o.length - 1; t >= 0; t--)p(o[t][1], o[t][2]);
            $ = n
        }
    }

    function p(t, e) {
        if (_[t])for (var i = 0, n = _[t].length; n > i; i++)try {
            _[t][i](t, y.parse(y.stringify(e)))
        } catch (o) {
        }
    }

    function h() {
        if (w.__jstorage_meta.PubSub) {
            for (var t = +new Date - 2e3, e = 0, i = w.__jstorage_meta.PubSub.length; i > e; e++)if (w.__jstorage_meta.PubSub[e][0] <= t) {
                w.__jstorage_meta.PubSub.splice(e, w.__jstorage_meta.PubSub.length - e);
                break
            }
            w.__jstorage_meta.PubSub.length || delete w.__jstorage_meta.PubSub
        }
    }

    function f(t, e) {
        w.__jstorage_meta || (w.__jstorage_meta = {}), w.__jstorage_meta.PubSub || (w.__jstorage_meta.PubSub = []), w.__jstorage_meta.PubSub.unshift([+new Date, t, e]), l(), r()
    }

    function m(t, e) {
        for (var i, n = t.length, o = e ^ n, s = 0; n >= 4;)i = 255 & t.charCodeAt(s) | (255 & t.charCodeAt(++s)) << 8 | (255 & t.charCodeAt(++s)) << 16 | (255 & t.charCodeAt(++s)) << 24, i = 1540483477 * (65535 & i) + ((1540483477 * (i >>> 16) & 65535) << 16), i ^= i >>> 24, i = 1540483477 * (65535 & i) + ((1540483477 * (i >>> 16) & 65535) << 16), o = 1540483477 * (65535 & o) + ((1540483477 * (o >>> 16) & 65535) << 16) ^ i, n -= 4, ++s;
        switch (n) {
            case 3:
                o ^= (255 & t.charCodeAt(s + 2)) << 16;
            case 2:
                o ^= (255 & t.charCodeAt(s + 1)) << 8;
            case 1:
                o ^= 255 & t.charCodeAt(s), o = 1540483477 * (65535 & o) + ((1540483477 * (o >>> 16) & 65535) << 16)
        }
        return o ^= o >>> 13, o = 1540483477 * (65535 & o) + ((1540483477 * (o >>> 16) & 65535) << 16), o ^= o >>> 15, o >>> 0
    }

    var g = "0.4.12", v = window.jQuery || window.$ || (window.$ = {}), y = {
        parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function (t) {
            return String(t).evalJSON()
        } || v.parseJSON || v.evalJSON,
        stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || v.toJSON
    };
    if ("function" != typeof y.parse || "function" != typeof y.stringify)throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
    var b, w = {__jstorage_meta: {CRC32: {}}}, k = {jStorage: "{}"}, x = null, T = 0, C = !1, S = {}, E = !1, P = 0, _ = {}, $ = +new Date, j = {
        isXML: function (t) {
            var e = (t ? t.ownerDocument || t : 0).documentElement;
            return e ? "HTML" !== e.nodeName : !1
        }, encode: function (t) {
            if (!this.isXML(t))return !1;
            try {
                return (new XMLSerializer).serializeToString(t)
            } catch (e) {
                try {
                    return t.xml
                } catch (i) {
                }
            }
            return !1
        }, decode: function (t) {
            var e, i = "DOMParser" in window && (new DOMParser).parseFromString || window.ActiveXObject && function (t) {
                    var e = new ActiveXObject("Microsoft.XMLDOM");
                    return e.async = "false", e.loadXML(t), e
                };
            return i ? (e = i.call("DOMParser" in window && new DOMParser || window, t, "text/xml"), this.isXML(e) ? e : !1) : !1
        }
    };
    v.jStorage = {
        version: g, set: function (t, e, i) {
            if (c(t), i = i || {}, "undefined" == typeof e)return this.deleteKey(t), e;
            if (j.isXML(e))e = {_is_xml: !0, xml: j.encode(e)}; else {
                if ("function" == typeof e)return void 0;
                e && "object" == typeof e && (e = y.parse(y.stringify(e)))
            }
            return w[t] = e, w.__jstorage_meta.CRC32[t] = "2." + m(y.stringify(e), 2538058380), this.setTTL(t, i.TTL || 0), s(t, "updated"), e
        }, get: function (t, e) {
            return c(t), t in w ? w[t] && "object" == typeof w[t] && w[t]._is_xml ? j.decode(w[t].xml) : w[t] : "undefined" == typeof e ? null : e
        }, deleteKey: function (t) {
            return c(t), t in w ? (delete w[t], "object" == typeof w.__jstorage_meta.TTL && t in w.__jstorage_meta.TTL && delete w.__jstorage_meta.TTL[t], delete w.__jstorage_meta.CRC32[t], l(), r(), s(t, "deleted"), !0) : !1
        }, setTTL: function (t, e) {
            var i = +new Date;
            return c(t), e = Number(e) || 0, t in w ? (w.__jstorage_meta.TTL || (w.__jstorage_meta.TTL = {}), e > 0 ? w.__jstorage_meta.TTL[t] = i + e : delete w.__jstorage_meta.TTL[t], l(), d(), r(), !0) : !1
        }, getTTL: function (t) {
            var e, i = +new Date;
            return c(t), t in w && w.__jstorage_meta.TTL && w.__jstorage_meta.TTL[t] ? (e = w.__jstorage_meta.TTL[t] - i, e || 0) : 0
        }, flush: function () {
            return w = {__jstorage_meta: {CRC32: {}}}, l(), r(), s(null, "flushed"), !0
        }, storageObj: function () {
            function t() {
            }

            return t.prototype = w, new t
        }, index: function () {
            var t, e = [];
            for (t in w)w.hasOwnProperty(t) && "__jstorage_meta" != t && e.push(t);
            return e
        }, storageSize: function () {
            return T
        }, currentBackend: function () {
            return C
        }, storageAvailable: function () {
            return !!C
        }, listenKeyChange: function (t, e) {
            c(t), S[t] || (S[t] = []), S[t].push(e)
        }, stopListening: function (t, e) {
            if (c(t), S[t]) {
                if (!e)return void delete S[t];
                for (var i = S[t].length - 1; i >= 0; i--)S[t][i] == e && S[t].splice(i, 1)
            }
        }, subscribe: function (t, e) {
            if (t = (t || "").toString(), !t)throw new TypeError("Channel not defined");
            _[t] || (_[t] = []), _[t].push(e)
        }, publish: function (t, e) {
            if (t = (t || "").toString(), !t)throw new TypeError("Channel not defined");
            f(t, e)
        }, reInit: function () {
            e()
        }, noConflict: function (t) {
            return delete window.$.jStorage, t && (window.jStorage = this), this
        }
    }, t()
}(), function (t, e) {
    if ("function" == typeof define && define.amd)define(["jquery"], e); else if ("object" == typeof module && module.exports) {
        var i;
        try {
            i = require("jquery")
        } catch (n) {
            i = null
        }
        module.exports = e(i)
    } else t.Slider = e(t.jQuery)
}(this, function (t) {
    var e;
    return function (t) {
        "use strict";
        function e() {
        }

        function i(t) {
            function i(e) {
                e.prototype.option || (e.prototype.option = function (e) {
                    t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
                })
            }

            function o(e, i) {
                t.fn[e] = function (o) {
                    if ("string" == typeof o) {
                        for (var r = n.call(arguments, 1), a = 0, l = this.length; l > a; a++) {
                            var c = this[a], d = t.data(c, e);
                            if (d)if (t.isFunction(d[o]) && "_" !== o.charAt(0)) {
                                var u = d[o].apply(d, r);
                                if (void 0 !== u && u !== d)return u
                            } else s("no such method '" + o + "' for " + e + " instance"); else s("cannot call methods on " + e + " prior to initialization; attempted to call '" + o + "'")
                        }
                        return this
                    }
                    var p = this.map(function () {
                        var n = t.data(this, e);
                        return n ? (n.option(o), n._init()) : (n = new i(this, o), t.data(this, e, n)), t(this)
                    });
                    return !p || p.length > 1 ? p : p[0]
                }
            }

            if (t) {
                var s = "undefined" == typeof console ? e : function (t) {
                    console.error(t)
                };
                return t.bridget = function (t, e) {
                    i(e), o(t, e)
                }, t.bridget
            }
        }

        var n = Array.prototype.slice;
        i(t)
    }(t), function (t) {
        function i(e, i) {
            function n(t, e) {
                var i = "data-slider-" + e.replace(/_/g, "-"), n = t.getAttribute(i);
                try {
                    return JSON.parse(n)
                } catch (o) {
                    return n
                }
            }

            "string" == typeof e ? this.element = document.querySelector(e) : e instanceof HTMLElement && (this.element = e), i = i ? i : {};
            for (var s = Object.keys(this.defaultOptions), r = 0; r < s.length; r++) {
                var a = s[r], l = i[a];
                l = "undefined" != typeof l ? l : n(this.element, a), l = null !== l ? l : this.defaultOptions[a], this.options || (this.options = {}), this.options[a] = l
            }
            var c, d, u, p, h, f = this.element.style.width, m = !1, g = this.element.parentNode;
            if (this.sliderElem)m = !0; else {
                this.sliderElem = document.createElement("div"), this.sliderElem.className = "slider";
                var v = document.createElement("div");
                if (v.className = "slider-track", d = document.createElement("div"), d.className = "slider-track-low", c = document.createElement("div"), c.className = "slider-selection", u = document.createElement("div"), u.className = "slider-track-high", p = document.createElement("div"), p.className = "slider-handle min-slider-handle", h = document.createElement("div"), h.className = "slider-handle max-slider-handle", v.appendChild(d), v.appendChild(c), v.appendChild(u), this.ticks = [], Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                    for (r = 0; r < this.options.ticks.length; r++) {
                        var y = document.createElement("div");
                        y.className = "slider-tick", this.ticks.push(y), v.appendChild(y)
                    }
                    c.className += " tick-slider-selection"
                }
                if (v.appendChild(p), v.appendChild(h), this.tickLabels = [], Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0)for (this.tickLabelContainer = document.createElement("div"), this.tickLabelContainer.className = "slider-tick-label-container", r = 0; r < this.options.ticks_labels.length; r++) {
                    var b = document.createElement("div");
                    b.className = "slider-tick-label", b.innerHTML = this.options.ticks_labels[r], this.tickLabels.push(b), this.tickLabelContainer.appendChild(b)
                }
                var w = function (t) {
                    var e = document.createElement("div");
                    e.className = "tooltip-arrow";
                    var i = document.createElement("div");
                    i.className = "tooltip-inner", t.appendChild(e), t.appendChild(i)
                }, k = document.createElement("div");
                k.className = "tooltip tooltip-main", w(k);
                var x = document.createElement("div");
                x.className = "tooltip tooltip-min", w(x);
                var T = document.createElement("div");
                T.className = "tooltip tooltip-max", w(T), this.sliderElem.appendChild(v), this.sliderElem.appendChild(k), this.sliderElem.appendChild(x), this.sliderElem.appendChild(T), this.tickLabelContainer && this.sliderElem.appendChild(this.tickLabelContainer), g.insertBefore(this.sliderElem, this.element), this.element.style.display = "none"
            }
            if (t && (this.$element = t(this.element), this.$sliderElem = t(this.sliderElem)), this.eventToCallbackMap = {}, this.sliderElem.id = this.options.id, this.touchCapable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, this.tooltip = this.sliderElem.querySelector(".tooltip-main"), this.tooltipInner = this.tooltip.querySelector(".tooltip-inner"), this.tooltip_min = this.sliderElem.querySelector(".tooltip-min"), this.tooltipInner_min = this.tooltip_min.querySelector(".tooltip-inner"), this.tooltip_max = this.sliderElem.querySelector(".tooltip-max"), this.tooltipInner_max = this.tooltip_max.querySelector(".tooltip-inner"), o[this.options.scale] && (this.options.scale = o[this.options.scale]), m === !0 && (this._removeClass(this.sliderElem, "slider-horizontal"), this._removeClass(this.sliderElem, "slider-vertical"), this._removeClass(this.tooltip, "hide"), this._removeClass(this.tooltip_min, "hide"), this._removeClass(this.tooltip_max, "hide"), ["left", "top", "width", "height"].forEach(function (t) {
                    this._removeProperty(this.trackLow, t), this._removeProperty(this.trackSelection, t), this._removeProperty(this.trackHigh, t)
                }, this), [this.handle1, this.handle2].forEach(function (t) {
                    this._removeProperty(t, "left"), this._removeProperty(t, "top")
                }, this), [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function (t) {
                    this._removeProperty(t, "left"), this._removeProperty(t, "top"), this._removeProperty(t, "margin-left"), this._removeProperty(t, "margin-top"), this._removeClass(t, "right"), this._removeClass(t, "top")
                }, this)), "vertical" === this.options.orientation ? (this._addClass(this.sliderElem, "slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight", this._addClass(this.tooltip, "right"), this.tooltip.style.left = "100%", this._addClass(this.tooltip_min, "right"), this.tooltip_min.style.left = "100%", this._addClass(this.tooltip_max, "right"), this.tooltip_max.style.left = "100%") : (this._addClass(this.sliderElem, "slider-horizontal"), this.sliderElem.style.width = f, this.options.orientation = "horizontal", this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth", this._addClass(this.tooltip, "top"), this.tooltip.style.top = -this.tooltip.outerHeight - 14 + "px", this._addClass(this.tooltip_min, "top"), this.tooltip_min.style.top = -this.tooltip_min.outerHeight - 14 + "px", this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = -this.tooltip_max.outerHeight - 14 + "px"), Array.isArray(this.options.ticks) && this.options.ticks.length > 0 && (this.options.max = Math.max.apply(Math, this.options.ticks), this.options.min = Math.min.apply(Math, this.options.ticks)), Array.isArray(this.options.value) ? this.options.range = !0 : this.options.range && (this.options.value = [this.options.value, this.options.max]), this.trackLow = d || this.trackLow, this.trackSelection = c || this.trackSelection, this.trackHigh = u || this.trackHigh, "none" === this.options.selection && (this._addClass(this.trackLow, "hide"), this._addClass(this.trackSelection, "hide"), this._addClass(this.trackHigh, "hide")), this.handle1 = p || this.handle1, this.handle2 = h || this.handle2, m === !0)for (this._removeClass(this.handle1, "round triangle"), this._removeClass(this.handle2, "round triangle hide"), r = 0; r < this.ticks.length; r++)this._removeClass(this.ticks[r], "round triangle hide");
            var C = ["round", "triangle", "custom"], S = -1 !== C.indexOf(this.options.handle);
            if (S)for (this._addClass(this.handle1, this.options.handle), this._addClass(this.handle2, this.options.handle), r = 0; r < this.ticks.length; r++)this._addClass(this.ticks[r], this.options.handle);
            this.offset = this._offset(this.sliderElem), this.size = this.sliderElem[this.sizePos], this.setValue(this.options.value), this.handle1Keydown = this._keydown.bind(this, 0), this.handle1.addEventListener("keydown", this.handle1Keydown, !1), this.handle2Keydown = this._keydown.bind(this, 1), this.handle2.addEventListener("keydown", this.handle2Keydown, !1), this.mousedown = this._mousedown.bind(this), this.touchCapable && this.sliderElem.addEventListener("touchstart", this.mousedown, !1), this.sliderElem.addEventListener("mousedown", this.mousedown, !1), "hide" === this.options.tooltip ? (this._addClass(this.tooltip, "hide"), this._addClass(this.tooltip_min, "hide"), this._addClass(this.tooltip_max, "hide")) : "always" === this.options.tooltip ? (this._showTooltip(), this._alwaysShowTooltip = !0) : (this.showTooltip = this._showTooltip.bind(this), this.hideTooltip = this._hideTooltip.bind(this), this.sliderElem.addEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.addEventListener("mouseleave", this.hideTooltip, !1), this.handle1.addEventListener("focus", this.showTooltip, !1), this.handle1.addEventListener("blur", this.hideTooltip, !1), this.handle2.addEventListener("focus", this.showTooltip, !1), this.handle2.addEventListener("blur", this.hideTooltip, !1)), this.options.enabled ? this.enable() : this.disable()
        }

        var n = {
            formatInvalidInputErrorMsg: function (t) {
                return "Invalid input value '" + t + "' passed in"
            },
            callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
        }, o = {
            linear: {
                toValue: function (t) {
                    var e = t / 100 * (this.options.max - this.options.min);
                    if (this.options.ticks_positions.length > 0) {
                        for (var i, n, o, s = 0, r = 0; r < this.options.ticks_positions.length; r++)if (t <= this.options.ticks_positions[r]) {
                            i = r > 0 ? this.options.ticks[r - 1] : 0, o = r > 0 ? this.options.ticks_positions[r - 1] : 0, n = this.options.ticks[r], s = this.options.ticks_positions[r];
                            break
                        }
                        if (r > 0) {
                            var a = (t - o) / (s - o);
                            e = i + a * (n - i)
                        }
                    }
                    var l = this.options.min + Math.round(e / this.options.step) * this.options.step;
                    return l < this.options.min ? this.options.min : l > this.options.max ? this.options.max : l
                }, toPercentage: function (t) {
                    if (this.options.max === this.options.min)return 0;
                    if (this.options.ticks_positions.length > 0) {
                        for (var e, i, n, o = 0, s = 0; s < this.options.ticks.length; s++)if (t <= this.options.ticks[s]) {
                            e = s > 0 ? this.options.ticks[s - 1] : 0, n = s > 0 ? this.options.ticks_positions[s - 1] : 0, i = this.options.ticks[s], o = this.options.ticks_positions[s];
                            break
                        }
                        if (s > 0) {
                            var r = (t - e) / (i - e);
                            return n + r * (o - n)
                        }
                    }
                    return 100 * (t - this.options.min) / (this.options.max - this.options.min)
                }
            }, logarithmic: {
                toValue: function (t) {
                    var e = 0 === this.options.min ? 0 : Math.log(this.options.min), i = Math.log(this.options.max), n = Math.exp(e + (i - e) * t / 100);
                    return n = this.options.min + Math.round((n - this.options.min) / this.options.step) * this.options.step, n < this.options.min ? this.options.min : n > this.options.max ? this.options.max : n
                }, toPercentage: function (t) {
                    if (this.options.max === this.options.min)return 0;
                    var e = Math.log(this.options.max), i = 0 === this.options.min ? 0 : Math.log(this.options.min), n = 0 === t ? 0 : Math.log(t);
                    return 100 * (n - i) / (e - i)
                }
            }
        };
        if (e = function (t, e) {
                return i.call(this, t, e), this
            }, e.prototype = {
                _init: function () {
                },
                constructor: e,
                defaultOptions: {
                    id: "",
                    min: 0,
                    max: 10,
                    step: 1,
                    precision: 0,
                    orientation: "horizontal",
                    value: 5,
                    range: !1,
                    selection: "before",
                    tooltip: "show",
                    tooltip_split: !1,
                    handle: "round",
                    reversed: !1,
                    enabled: !0,
                    formatter: function (t) {
                        return Array.isArray(t) ? t[0] + " : " + t[1] : t
                    },
                    natural_arrow_keys: !1,
                    ticks: [],
                    ticks_positions: [],
                    ticks_labels: [],
                    ticks_snap_bounds: 0,
                    scale: "linear",
                    focus: !1
                },
                over: !1,
                inDrag: !1,
                getValue: function () {
                    return this.options.range ? this.options.value : this.options.value[0]
                },
                setValue: function (t, e, i) {
                    t || (t = 0);
                    var n = this.getValue();
                    this.options.value = this._validateInputValue(t);
                    var o = this._applyPrecision.bind(this);
                    this.options.range ? (this.options.value[0] = o(this.options.value[0]), this.options.value[1] = o(this.options.value[1]), this.options.value[0] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[0])), this.options.value[1] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[1]))) : (this.options.value = o(this.options.value), this.options.value = [Math.max(this.options.min, Math.min(this.options.max, this.options.value))], this._addClass(this.handle2, "hide"), this.options.value[1] = "after" === this.options.selection ? this.options.max : this.options.min), this.percentage = this.options.max > this.options.min ? [this._toPercentage(this.options.value[0]), this._toPercentage(this.options.value[1]), 100 * this.options.step / (this.options.max - this.options.min)] : [0, 0, 100], this._layout();
                    var s = this.options.range ? this.options.value : this.options.value[0];
                    return e === !0 && this._trigger("slide", s), n !== s && i === !0 && this._trigger("change", {
                        oldValue: n,
                        newValue: s
                    }), this._setDataVal(s), this
                },
                destroy: function () {
                    this._removeSliderEventHandlers(), this.sliderElem.parentNode.removeChild(this.sliderElem), this.element.style.display = "", this._cleanUpEventCallbacksMap(), this.element.removeAttribute("data"), t && (this._unbindJQueryEventHandlers(), this.$element.removeData("slider"))
                },
                disable: function () {
                    return this.options.enabled = !1, this.handle1.removeAttribute("tabindex"), this.handle2.removeAttribute("tabindex"), this._addClass(this.sliderElem, "slider-disabled"), this._trigger("slideDisabled"), this
                },
                enable: function () {
                    return this.options.enabled = !0, this.handle1.setAttribute("tabindex", 0), this.handle2.setAttribute("tabindex", 0), this._removeClass(this.sliderElem, "slider-disabled"), this._trigger("slideEnabled"), this
                },
                toggle: function () {
                    return this.options.enabled ? this.disable() : this.enable(), this
                },
                isEnabled: function () {
                    return this.options.enabled
                },
                on: function (t, e) {
                    return this._bindNonQueryEventHandler(t, e), this
                },
                off: function (e, i) {
                    t ? (this.$element.off(e, i), this.$sliderElem.off(e, i)) : this._unbindNonQueryEventHandler(e, i)
                },
                getAttribute: function (t) {
                    return t ? this.options[t] : this.options
                },
                setAttribute: function (t, e) {
                    return this.options[t] = e, this
                },
                refresh: function () {
                    return this._removeSliderEventHandlers(), i.call(this, this.element, this.options), t && t.data(this.element, "slider", this), this
                },
                relayout: function () {
                    return this._layout(), this
                },
                _removeSliderEventHandlers: function () {
                    this.handle1.removeEventListener("keydown", this.handle1Keydown, !1), this.handle1.removeEventListener("focus", this.showTooltip, !1), this.handle1.removeEventListener("blur", this.hideTooltip, !1), this.handle2.removeEventListener("keydown", this.handle2Keydown, !1), this.handle2.removeEventListener("focus", this.handle2Keydown, !1), this.handle2.removeEventListener("blur", this.handle2Keydown, !1), this.sliderElem.removeEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, !1), this.sliderElem.removeEventListener("touchstart", this.mousedown, !1), this.sliderElem.removeEventListener("mousedown", this.mousedown, !1)
                },
                _bindNonQueryEventHandler: function (t, e) {
                    void 0 === this.eventToCallbackMap[t] && (this.eventToCallbackMap[t] = []), this.eventToCallbackMap[t].push(e)
                },
                _unbindNonQueryEventHandler: function (t, e) {
                    var i = this.eventToCallbackMap[t];
                    if (void 0 !== i)for (var n = 0; n < i.length; n++)if (i[n] === e) {
                        i.splice(n, 1);
                        break
                    }
                },
                _cleanUpEventCallbacksMap: function () {
                    for (var t = Object.keys(this.eventToCallbackMap), e = 0; e < t.length; e++) {
                        var i = t[e];
                        this.eventToCallbackMap[i] = null
                    }
                },
                _showTooltip: function () {
                    this.options.tooltip_split === !1 ? (this._addClass(this.tooltip, "in"), this.tooltip_min.style.display = "none", this.tooltip_max.style.display = "none") : (this._addClass(this.tooltip_min, "in"), this._addClass(this.tooltip_max, "in"), this.tooltip.style.display = "none"), this.over = !0
                },
                _hideTooltip: function () {
                    this.inDrag === !1 && this.alwaysShowTooltip !== !0 && (this._removeClass(this.tooltip, "in"), this._removeClass(this.tooltip_min, "in"), this._removeClass(this.tooltip_max, "in")), this.over = !1
                },
                _layout: function () {
                    var t;
                    if (t = this.options.reversed ? [100 - this.percentage[0], this.options.range ? 100 - this.percentage[1] : this.percentage[1]] : [this.percentage[0], this.percentage[1]], this.handle1.style[this.stylePos] = t[0] + "%", this.handle2.style[this.stylePos] = t[1] + "%", Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                        var e = Math.max.apply(Math, this.options.ticks), i = Math.min.apply(Math, this.options.ticks), n = "vertical" === this.options.orientation ? "height" : "width", o = "vertical" === this.options.orientation ? "marginTop" : "marginLeft", s = this.size / (this.options.ticks.length - 1);
                        if (this.tickLabelContainer) {
                            var r = 0;
                            if (0 === this.options.ticks_positions.length)this.tickLabelContainer.style[o] = -s / 2 + "px", r = this.tickLabelContainer.offsetHeight; else for (a = 0; a < this.tickLabelContainer.childNodes.length; a++)this.tickLabelContainer.childNodes[a].offsetHeight > r && (r = this.tickLabelContainer.childNodes[a].offsetHeight);
                            "horizontal" === this.options.orientation && (this.sliderElem.style.marginBottom = r + "px")
                        }
                        for (var a = 0; a < this.options.ticks.length; a++) {
                            var l = this.options.ticks_positions[a] || 100 * (this.options.ticks[a] - i) / (e - i);
                            this.ticks[a].style[this.stylePos] = l + "%", this._removeClass(this.ticks[a], "in-selection"), this.options.range ? l >= t[0] && l <= t[1] && this._addClass(this.ticks[a], "in-selection") : "after" === this.options.selection && l >= t[0] ? this._addClass(this.ticks[a], "in-selection") : "before" === this.options.selection && l <= t[0] && this._addClass(this.ticks[a], "in-selection"), this.tickLabels[a] && (this.tickLabels[a].style[n] = s + "px", void 0 !== this.options.ticks_positions[a] && (this.tickLabels[a].style.position = "absolute", this.tickLabels[a].style[this.stylePos] = this.options.ticks_positions[a] + "%", this.tickLabels[a].style[o] = -s / 2 + "px"))
                        }
                    }
                    if ("vertical" === this.options.orientation)this.trackLow.style.top = "0", this.trackLow.style.height = Math.min(t[0], t[1]) + "%", this.trackSelection.style.top = Math.min(t[0], t[1]) + "%", this.trackSelection.style.height = Math.abs(t[0] - t[1]) + "%", this.trackHigh.style.bottom = "0", this.trackHigh.style.height = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%"; else {
                        this.trackLow.style.left = "0", this.trackLow.style.width = Math.min(t[0], t[1]) + "%", this.trackSelection.style.left = Math.min(t[0], t[1]) + "%", this.trackSelection.style.width = Math.abs(t[0] - t[1]) + "%", this.trackHigh.style.right = "0", this.trackHigh.style.width = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%";
                        var c = this.tooltip_min.getBoundingClientRect(), d = this.tooltip_max.getBoundingClientRect();
                        c.right > d.left ? (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = "18px") : (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = this.tooltip_min.style.top)
                    }
                    var u;
                    if (this.options.range) {
                        u = this.options.formatter(this.options.value), this._setText(this.tooltipInner, u), this.tooltip.style[this.stylePos] = (t[1] + t[0]) / 2 + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px"), "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px");
                        var p = this.options.formatter(this.options.value[0]);
                        this._setText(this.tooltipInner_min, p);
                        var h = this.options.formatter(this.options.value[1]);
                        this._setText(this.tooltipInner_max, h), this.tooltip_min.style[this.stylePos] = t[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_min, "margin-top", -this.tooltip_min.offsetHeight / 2 + "px") : this._css(this.tooltip_min, "margin-left", -this.tooltip_min.offsetWidth / 2 + "px"), this.tooltip_max.style[this.stylePos] = t[1] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_max, "margin-top", -this.tooltip_max.offsetHeight / 2 + "px") : this._css(this.tooltip_max, "margin-left", -this.tooltip_max.offsetWidth / 2 + "px")
                    } else u = this.options.formatter(this.options.value[0]), this._setText(this.tooltipInner, u), this.tooltip.style[this.stylePos] = t[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px")
                },
                _removeProperty: function (t, e) {
                    t.style.removeProperty ? t.style.removeProperty(e) : t.style.removeAttribute(e)
                },
                _mousedown: function (t) {
                    if (!this.options.enabled)return !1;
                    this.offset = this._offset(this.sliderElem), this.size = this.sliderElem[this.sizePos];
                    var e = this._getPercentage(t);
                    if (this.options.range) {
                        var i = Math.abs(this.percentage[0] - e), n = Math.abs(this.percentage[1] - e);
                        this.dragged = n > i ? 0 : 1
                    } else this.dragged = 0;
                    this.percentage[this.dragged] = e, this._layout(), this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), this.mousemove && document.removeEventListener("mousemove", this.mousemove, !1), this.mouseup && document.removeEventListener("mouseup", this.mouseup, !1), this.mousemove = this._mousemove.bind(this), this.mouseup = this._mouseup.bind(this), this.touchCapable && (document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1)), document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), this.inDrag = !0;
                    var o = this._calculateValue();
                    return this._trigger("slideStart", o), this._setDataVal(o), this.setValue(o, !1, !0), this._pauseEvent(t), this.options.focus && this._triggerFocusOnHandle(this.dragged), !0
                },
                _triggerFocusOnHandle: function (t) {
                    0 === t && this.handle1.focus(), 1 === t && this.handle2.focus()
                },
                _keydown: function (t, e) {
                    if (!this.options.enabled)return !1;
                    var i;
                    switch (e.keyCode) {
                        case 37:
                        case 40:
                            i = -1;
                            break;
                        case 39:
                        case 38:
                            i = 1
                    }
                    if (i) {
                        if (this.options.natural_arrow_keys) {
                            var n = "vertical" === this.options.orientation && !this.options.reversed, o = "horizontal" === this.options.orientation && this.options.reversed;
                            (n || o) && (i = -i)
                        }
                        var s = this.options.value[t] + i * this.options.step;
                        return this.options.range && (s = [t ? this.options.value[0] : s, t ? s : this.options.value[1]]), this._trigger("slideStart", s), this._setDataVal(s), this.setValue(s, !0, !0), this._setDataVal(s), this._trigger("slideStop", s), this._layout(), this._pauseEvent(e), !1
                    }
                },
                _pauseEvent: function (t) {
                    t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1
                },
                _mousemove: function (t) {
                    if (!this.options.enabled)return !1;
                    var e = this._getPercentage(t);
                    this._adjustPercentageForRangeSliders(e), this.percentage[this.dragged] = e, this._layout();
                    var i = this._calculateValue(!0);
                    return this.setValue(i, !0, !0), !1
                },
                _adjustPercentageForRangeSliders: function (t) {
                    if (this.options.range) {
                        var e = this._getNumDigitsAfterDecimalPlace(t);
                        e = e ? e - 1 : 0;
                        var i = this._applyToFixedAndParseFloat(t, e);
                        0 === this.dragged && this._applyToFixedAndParseFloat(this.percentage[1], e) < i ? (this.percentage[0] = this.percentage[1], this.dragged = 1) : 1 === this.dragged && this._applyToFixedAndParseFloat(this.percentage[0], e) > i && (this.percentage[1] = this.percentage[0], this.dragged = 0)
                    }
                },
                _mouseup: function () {
                    if (!this.options.enabled)return !1;
                    this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), document.removeEventListener("mousemove", this.mousemove, !1), document.removeEventListener("mouseup", this.mouseup, !1), this.inDrag = !1, this.over === !1 && this._hideTooltip();
                    var t = this._calculateValue(!0);
                    return this._layout(), this._setDataVal(t), this._trigger("slideStop", t), !1
                },
                _calculateValue: function (t) {
                    var e;
                    if (this.options.range ? (e = [this.options.min, this.options.max], 0 !== this.percentage[0] && (e[0] = this._toValue(this.percentage[0]), e[0] = this._applyPrecision(e[0])), 100 !== this.percentage[1] && (e[1] = this._toValue(this.percentage[1]), e[1] = this._applyPrecision(e[1]))) : (e = this._toValue(this.percentage[0]), e = parseFloat(e), e = this._applyPrecision(e)), t) {
                        for (var i = [e, 1 / 0], n = 0; n < this.options.ticks.length; n++) {
                            var o = Math.abs(this.options.ticks[n] - e);
                            o <= i[1] && (i = [this.options.ticks[n], o])
                        }
                        if (i[1] <= this.options.ticks_snap_bounds)return i[0]
                    }
                    return e
                },
                _applyPrecision: function (t) {
                    var e = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
                    return this._applyToFixedAndParseFloat(t, e)
                },
                _getNumDigitsAfterDecimalPlace: function (t) {
                    var e = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                    return e ? Math.max(0, (e[1] ? e[1].length : 0) - (e[2] ? +e[2] : 0)) : 0
                },
                _applyToFixedAndParseFloat: function (t, e) {
                    var i = t.toFixed(e);
                    return parseFloat(i)
                },
                _getPercentage: function (t) {
                    !this.touchCapable || "touchstart" !== t.type && "touchmove" !== t.type || (t = t.touches[0]);
                    var e = t[this.mousePos], i = this.offset[this.stylePos], n = e - i, o = n / this.size * 100;
                    return o = Math.round(o / this.percentage[2]) * this.percentage[2], this.options.reversed && (o = 100 - o), Math.max(0, Math.min(100, o))
                },
                _validateInputValue: function (t) {
                    if ("number" == typeof t)return t;
                    if (Array.isArray(t))return this._validateArray(t), t;
                    throw new Error(n.formatInvalidInputErrorMsg(t))
                },
                _validateArray: function (t) {
                    for (var e = 0; e < t.length; e++) {
                        var i = t[e];
                        if ("number" != typeof i)throw new Error(n.formatInvalidInputErrorMsg(i))
                    }
                },
                _setDataVal: function (t) {
                    var e = "value: '" + t + "'";
                    this.element.setAttribute("data", e), this.element.setAttribute("value", t), this.element.value = t
                },
                _trigger: function (e, i) {
                    i = i || 0 === i ? i : void 0;
                    var n = this.eventToCallbackMap[e];
                    if (n && n.length)for (var o = 0; o < n.length; o++) {
                        var s = n[o];
                        s(i)
                    }
                    t && this._triggerJQueryEvent(e, i)
                },
                _triggerJQueryEvent: function (t, e) {
                    var i = {type: t, value: e};
                    this.$element.trigger(i), this.$sliderElem.trigger(i)
                },
                _unbindJQueryEventHandlers: function () {
                    this.$element.off(), this.$sliderElem.off()
                },
                _setText: function (t, e) {
                    "undefined" != typeof t.innerText ? t.innerText = e : "undefined" != typeof t.textContent && (t.textContent = e)
                },
                _removeClass: function (t, e) {
                    for (var i = e.split(" "), n = t.className, o = 0; o < i.length; o++) {
                        var s = i[o], r = new RegExp("(?:\\s|^)" + s + "(?:\\s|$)");
                        n = n.replace(r, " ")
                    }
                    t.className = n.trim()
                },
                _addClass: function (t, e) {
                    for (var i = e.split(" "), n = t.className, o = 0; o < i.length; o++) {
                        var s = i[o], r = new RegExp("(?:\\s|^)" + s + "(?:\\s|$)"), a = r.test(n);
                        a || (n += " " + s)
                    }
                    t.className = n.trim()
                },
                _offsetLeft: function (t) {
                    for (var e = t.offsetLeft; (t = t.offsetParent) && !isNaN(t.offsetLeft);)e += t.offsetLeft;
                    return e
                },
                _offsetTop: function (t) {
                    for (var e = t.offsetTop; (t = t.offsetParent) && !isNaN(t.offsetTop);)e += t.offsetTop;
                    return e
                },
                _offset: function (t) {
                    return {left: this._offsetLeft(t), top: this._offsetTop(t)}
                },
                _css: function (e, i, n) {
                    if (t)t.style(e, i, n); else {
                        var o = i.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (t, e) {
                            return e.toUpperCase()
                        });
                        e.style[o] = n
                    }
                },
                _toValue: function (t) {
                    return this.options.scale.toValue.apply(this, [t])
                },
                _toPercentage: function (t) {
                    return this.options.scale.toPercentage.apply(this, [t])
                }
            }, t) {
            var s = t.fn.slider ? "bootstrapSlider" : "slider";
            t.bridget(s, e)
        }
    }(t), e
}), function (t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : t.Handlebars = t.Handlebars || e()
}(this, function () {
    var t = function () {
        "use strict";
        function t(t) {
            this.string = t
        }

        var e;
        return t.prototype.toString = function () {
            return "" + this.string
        }, e = t
    }(), e = function (t) {
        "use strict";
        function e(t) {
            return l[t]
        }

        function i(t) {
            for (var e = 1; e < arguments.length; e++)for (var i in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e], i) && (t[i] = arguments[e][i]);
            return t
        }

        function n(t) {
            return t instanceof a ? t.toString() : null == t ? "" : t ? (t = "" + t, d.test(t) ? t.replace(c, e) : t) : t + ""
        }

        function o(t) {
            return t || 0 === t ? h(t) && 0 === t.length ? !0 : !1 : !0
        }

        function s(t, e) {
            return (t ? t + "." : "") + e
        }

        var r = {}, a = t, l = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }, c = /[&<>"'`]/g, d = /[&<>"'`]/;
        r.extend = i;
        var u = Object.prototype.toString;
        r.toString = u;
        var p = function (t) {
            return "function" == typeof t
        };
        p(/x/) && (p = function (t) {
            return "function" == typeof t && "[object Function]" === u.call(t)
        });
        var p;
        r.isFunction = p;
        var h = Array.isArray || function (t) {
                return t && "object" == typeof t ? "[object Array]" === u.call(t) : !1
            };
        return r.isArray = h, r.escapeExpression = n, r.isEmpty = o, r.appendContextPath = s, r
    }(t), i = function () {
        "use strict";
        function t(t, e) {
            var n;
            e && e.firstLine && (n = e.firstLine, t += " - " + n + ":" + e.firstColumn);
            for (var o = Error.prototype.constructor.call(this, t), s = 0; s < i.length; s++)this[i[s]] = o[i[s]];
            n && (this.lineNumber = n, this.column = e.firstColumn)
        }

        var e, i = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        return t.prototype = new Error, e = t
    }(), n = function (t, e) {
        "use strict";
        function i(t, e) {
            this.helpers = t || {}, this.partials = e || {}, n(this)
        }

        function n(t) {
            t.registerHelper("helperMissing", function () {
                if (1 === arguments.length)return void 0;
                throw new r("Missing helper: '" + arguments[arguments.length - 1].name + "'")
            }), t.registerHelper("blockHelperMissing", function (e, i) {
                var n = i.inverse, o = i.fn;
                if (e === !0)return o(this);
                if (e === !1 || null == e)return n(this);
                if (d(e))return e.length > 0 ? (i.ids && (i.ids = [i.name]), t.helpers.each(e, i)) : n(this);
                if (i.data && i.ids) {
                    var r = g(i.data);
                    r.contextPath = s.appendContextPath(i.data.contextPath, i.name), i = {data: r}
                }
                return o(e, i)
            }), t.registerHelper("each", function (t, e) {
                if (!e)throw new r("Must pass iterator to #each");
                var i, n, o = e.fn, a = e.inverse, l = 0, c = "";
                if (e.data && e.ids && (n = s.appendContextPath(e.data.contextPath, e.ids[0]) + "."), u(t) && (t = t.call(this)), e.data && (i = g(e.data)), t && "object" == typeof t)if (d(t))for (var p = t.length; p > l; l++)i && (i.index = l, i.first = 0 === l, i.last = l === t.length - 1, n && (i.contextPath = n + l)), c += o(t[l], {data: i}); else for (var h in t)t.hasOwnProperty(h) && (i && (i.key = h, i.index = l, i.first = 0 === l, n && (i.contextPath = n + h)), c += o(t[h], {data: i}), l++);
                return 0 === l && (c = a(this)), c
            }), t.registerHelper("if", function (t, e) {
                return u(t) && (t = t.call(this)), !e.hash.includeZero && !t || s.isEmpty(t) ? e.inverse(this) : e.fn(this)
            }), t.registerHelper("unless", function (e, i) {
                return t.helpers["if"].call(this, e, {fn: i.inverse, inverse: i.fn, hash: i.hash})
            }), t.registerHelper("with", function (t, e) {
                u(t) && (t = t.call(this));
                var i = e.fn;
                if (s.isEmpty(t))return e.inverse(this);
                if (e.data && e.ids) {
                    var n = g(e.data);
                    n.contextPath = s.appendContextPath(e.data.contextPath, e.ids[0]), e = {data: n}
                }
                return i(t, e)
            }), t.registerHelper("log", function (e, i) {
                var n = i.data && null != i.data.level ? parseInt(i.data.level, 10) : 1;
                t.log(n, e)
            }), t.registerHelper("lookup", function (t, e) {
                return t && t[e]
            })
        }

        var o = {}, s = t, r = e, a = "2.0.0";
        o.VERSION = a;
        var l = 6;
        o.COMPILER_REVISION = l;
        var c = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1"
        };
        o.REVISION_CHANGES = c;
        var d = s.isArray, u = s.isFunction, p = s.toString, h = "[object Object]";
        o.HandlebarsEnvironment = i, i.prototype = {
            constructor: i, logger: f, log: m, registerHelper: function (t, e) {
                if (p.call(t) === h) {
                    if (e)throw new r("Arg not supported with multiple helpers");
                    s.extend(this.helpers, t)
                } else this.helpers[t] = e
            }, unregisterHelper: function (t) {
                delete this.helpers[t]
            }, registerPartial: function (t, e) {
                p.call(t) === h ? s.extend(this.partials, t) : this.partials[t] = e
            }, unregisterPartial: function (t) {
                delete this.partials[t]
            }
        };
        var f = {
            methodMap: {0: "debug", 1: "info", 2: "warn", 3: "error"},
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 3,
            log: function (t, e) {
                if (f.level <= t) {
                    var i = f.methodMap[t];
                    "undefined" != typeof console && console[i] && console[i].call(console, e)
                }
            }
        };
        o.logger = f;
        var m = f.log;
        o.log = m;
        var g = function (t) {
            var e = s.extend({}, t);
            return e._parent = t, e
        };
        return o.createFrame = g, o
    }(e, i), o = function (t, e, i) {
        "use strict";
        function n(t) {
            var e = t && t[0] || 1, i = p;
            if (e !== i) {
                if (i > e) {
                    var n = h[i], o = h[e];
                    throw new u("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + n + ") or downgrade your runtime to an older version (" + o + ").")
                }
                throw new u("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + t[1] + ").")
            }
        }

        function o(t, e) {
            if (!e)throw new u("No environment passed to template");
            if (!t || !t.main)throw new u("Unknown template object: " + typeof t);
            e.VM.checkRevision(t.compiler);
            var i = function (i, n, o, s, r, a, l, c, p) {
                r && (s = d.extend({}, s, r));
                var h = e.VM.invokePartial.call(this, i, o, s, a, l, c, p);
                if (null == h && e.compile) {
                    var f = {helpers: a, partials: l, data: c, depths: p};
                    l[o] = e.compile(i, {data: void 0 !== c, compat: t.compat}, e), h = l[o](s, f)
                }
                if (null != h) {
                    if (n) {
                        for (var m = h.split("\n"), g = 0, v = m.length; v > g && (m[g] || g + 1 !== v); g++)m[g] = n + m[g];
                        h = m.join("\n")
                    }
                    return h
                }
                throw new u("The partial " + o + " could not be compiled when running in runtime-only mode")
            }, n = {
                lookup: function (t, e) {
                    for (var i = t.length, n = 0; i > n; n++)if (t[n] && null != t[n][e])return t[n][e]
                }, lambda: function (t, e) {
                    return "function" == typeof t ? t.call(e) : t
                }, escapeExpression: d.escapeExpression, invokePartial: i, fn: function (e) {
                    return t[e]
                }, programs: [], program: function (t, e, i) {
                    var n = this.programs[t], o = this.fn(t);
                    return e || i ? n = s(this, t, o, e, i) : n || (n = this.programs[t] = s(this, t, o)), n
                }, data: function (t, e) {
                    for (; t && e--;)t = t._parent;
                    return t
                }, merge: function (t, e) {
                    var i = t || e;
                    return t && e && t !== e && (i = d.extend({}, e, t)), i
                }, noop: e.VM.noop, compilerInfo: t.compiler
            }, o = function (e, i) {
                i = i || {};
                var s = i.data;
                o._setup(i), !i.partial && t.useData && (s = l(e, s));
                var r;
                return t.useDepths && (r = i.depths ? [e].concat(i.depths) : [e]), t.main.call(n, e, n.helpers, n.partials, s, r)
            };
            return o.isTop = !0, o._setup = function (i) {
                i.partial ? (n.helpers = i.helpers, n.partials = i.partials) : (n.helpers = n.merge(i.helpers, e.helpers), t.usePartial && (n.partials = n.merge(i.partials, e.partials)))
            }, o._child = function (e, i, o) {
                if (t.useDepths && !o)throw new u("must pass parent depths");
                return s(n, e, t[e], i, o)
            }, o
        }

        function s(t, e, i, n, o) {
            var s = function (e, s) {
                return s = s || {}, i.call(t, e, t.helpers, t.partials, s.data || n, o && [e].concat(o))
            };
            return s.program = e, s.depth = o ? o.length : 0, s
        }

        function r(t, e, i, n, o, s, r) {
            var a = {partial: !0, helpers: n, partials: o, data: s, depths: r};
            if (void 0 === t)throw new u("The partial " + e + " could not be found");
            return t instanceof Function ? t(i, a) : void 0
        }

        function a() {
            return ""
        }

        function l(t, e) {
            return e && "root" in e || (e = e ? f(e) : {}, e.root = t), e
        }

        var c = {}, d = t, u = e, p = i.COMPILER_REVISION, h = i.REVISION_CHANGES, f = i.createFrame;
        return c.checkRevision = n, c.template = o, c.program = s, c.invokePartial = r, c.noop = a, c
    }(e, i, n), s = function (t, e, i, n, o) {
        "use strict";
        var s, r = t, a = e, l = i, c = n, d = o, u = function () {
            var t = new r.HandlebarsEnvironment;
            return c.extend(t, r), t.SafeString = a, t.Exception = l, t.Utils = c, t.escapeExpression = c.escapeExpression, t.VM = d, t.template = function (e) {
                return d.template(e, t)
            }, t
        }, p = u();
        return p.create = u, p["default"] = p, s = p
    }(n, t, i, e, o);
    return s
}), function (t) {
    var e = -1, i = -1, n = function (t) {
        return parseFloat(t) || 0
    }, o = function (e) {
        var i = 1, o = t(e), s = null, r = [];
        return o.each(function () {
            var e = t(this), o = e.offset().top - n(e.css("margin-top")), a = r.length > 0 ? r[r.length - 1] : null;
            null === a ? r.push(e) : Math.floor(Math.abs(s - o)) <= i ? r[r.length - 1] = a.add(e) : r.push(e), s = o
        }), r
    }, s = function (e) {
        var i = {byRow: !0, property: "height", target: null, remove: !1};
        return "object" == typeof e ? t.extend(i, e) : ("boolean" == typeof e ? i.byRow = e : "remove" === e && (i.remove = !0), i)
    }, r = t.fn.matchHeight = function (e) {
        var i = s(e);
        if (i.remove) {
            var n = this;
            return this.css(i.property, ""), t.each(r._groups, function (t, e) {
                e.elements = e.elements.not(n)
            }), this
        }
        return this.length <= 1 && !i.target ? this : (r._groups.push({
            elements: this,
            options: i
        }), r._apply(this, i), this)
    };
    r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null, r._afterUpdate = null, r._apply = function (e, i) {
        var a = s(i), l = t(e), c = [l], d = t(window).scrollTop(), u = t("html").outerHeight(!0), p = l.parents().filter(":hidden");
        return p.each(function () {
            var e = t(this);
            e.data("style-cache", e.attr("style"))
        }), p.css("display", "block"), a.byRow && !a.target && (l.each(function () {
            var e = t(this), i = "inline-block" === e.css("display") ? "inline-block" : "block";
            e.data("style-cache", e.attr("style")), e.css({
                display: i,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px"
            })
        }), c = o(l), l.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "")
        })), t.each(c, function (e, i) {
            var o = t(i), s = 0;
            if (a.target)s = a.target.outerHeight(!1); else {
                if (a.byRow && o.length <= 1)return void o.css(a.property, "");
                o.each(function () {
                    var e = t(this), i = "inline-block" === e.css("display") ? "inline-block" : "block", n = {display: i};
                    n[a.property] = "", e.css(n), e.outerHeight(!1) > s && (s = e.outerHeight(!1)), e.css("display", "")
                })
            }
            o.each(function () {
                var e = t(this), i = 0;
                a.target && e.is(a.target) || ("border-box" !== e.css("box-sizing") && (i += n(e.css("border-top-width")) + n(e.css("border-bottom-width")), i += n(e.css("padding-top")) + n(e.css("padding-bottom"))), e.css(a.property, s - i))
            })
        }), p.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || null)
        }), r._maintainScroll && t(window).scrollTop(d / u * t("html").outerHeight(!0)), this
    }, r._applyDataApi = function () {
        var e = {};
        t("[data-match-height], [data-mh]").each(function () {
            var i = t(this), n = i.attr("data-mh") || i.attr("data-match-height");
            e[n] = n in e ? e[n].add(i) : i
        }), t.each(e, function () {
            this.matchHeight(!0)
        })
    };
    var a = function (e) {
        r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function () {
            r._apply(this.elements, this.options)
        }), r._afterUpdate && r._afterUpdate(e, r._groups)
    };
    r._update = function (n, o) {
        if (o && "resize" === o.type) {
            var s = t(window).width();
            if (s === e)return;
            e = s
        }
        n ? -1 === i && (i = setTimeout(function () {
            a(o), i = -1
        }, r._throttle)) : a(o)
    }, t(r._applyDataApi), t(window).bind("load", function (t) {
        r._update(!1, t)
    }), t(window).bind("resize orientationchange", function (t) {
        r._update(!0, t)
    })
}(jQuery);
var outdatedBrowser = function (t) {
    function e(t) {
        a.style.opacity = t / 100, a.style.filter = "alpha(opacity=" + t + ")"
    }

    function i(t) {
        e(t), 1 == t && (a.style.display = "block"), 100 == t && (l = !0)
    }

    function n() {
        var t = document.getElementById("btnCloseUpdateBrowser"), e = document.getElementById("btnUpdateBrowser");
        a.style.backgroundColor = bkgColor, a.style.color = txtColor, a.children[0].style.color = txtColor, a.children[1].style.color = txtColor, e.style.color = txtColor, e.style.borderColor && (e.style.borderColor = txtColor), t.style.color = txtColor, t.onmousedown = function () {
            return a.style.display = "none", !1
        }, e.onmouseover = function () {
            this.style.color = bkgColor, this.style.backgroundColor = txtColor
        }, e.onmouseout = function () {
            this.style.color = txtColor, this.style.backgroundColor = bkgColor
        }
    }

    function o() {
        var t = !1;
        if (window.XMLHttpRequest)t = new XMLHttpRequest; else if (window.ActiveXObject)try {
            t = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
            try {
                t = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {
                t = !1
            }
        }
        return t
    }

    function s(t) {
        var e = o();
        return e && (e.onreadystatechange = function () {
            r(e)
        }, e.open("GET", t, !0), e.send(null)), !1
    }

    function r(t) {
        var e = document.getElementById("outdated");
        return 4 == t.readyState && (e.innerHTML = 200 == t.status || 304 == t.status ? t.responseText : u, n()), !1
    }

    var a = document.getElementById("outdated");
    this.defaultOpts = {
        bgColor: "#f25648",
        color: "#ffffff",
        lowerThan: "transform",
        languagePath: "../outdatedbrowser/lang/en.html"
    }, t ? ("IE8" == t.lowerThan || "borderSpacing" == t.lowerThan ? t.lowerThan = "borderSpacing" : "IE9" == t.lowerThan || "boxShadow" == t.lowerThan ? t.lowerThan = "boxShadow" : "IE10" == t.lowerThan || "transform" == t.lowerThan || "" == t.lowerThan || "undefined" == typeof t.lowerThan ? t.lowerThan = "transform" : ("IE11" == t.lowerThan || "borderImage" == t.lowerThan) && (t.lowerThan = "borderImage"), this.defaultOpts.bgColor = t.bgColor, this.defaultOpts.color = t.color, this.defaultOpts.lowerThan = t.lowerThan, this.defaultOpts.languagePath = t.languagePath, bkgColor = this.defaultOpts.bgColor, txtColor = this.defaultOpts.color, cssProp = this.defaultOpts.lowerThan, languagePath = this.defaultOpts.languagePath) : (bkgColor = this.defaultOpts.bgColor, txtColor = this.defaultOpts.color, cssProp = this.defaultOpts.lowerThan, languagePath = this.defaultOpts.languagePath);
    var l = !0, c = function () {
        var t = document.createElement("div"), e = "Khtml Ms O Moz Webkit".split(" "), i = e.length;
        return function (n) {
            if (n in t.style)return !0;
            for (n = n.replace(/^[a-z]/, function (t) {
                return t.toUpperCase()
            }); i--;)if (e[i] + n in t.style)return !0;
            return !1
        }
    }();
    if (!c("" + cssProp)) {
        if (l && "1" !== a.style.opacity) {
            l = !1;
            for (var d = 1; 100 >= d; d++)setTimeout(function (t) {
                return function () {
                    i(t)
                }
            }(d), 8 * d)
        }
        " " === languagePath || 0 == languagePath.length ? n() : s(languagePath);
        var u = '<h6>Your browser is out-of-date!</h6><p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>'
    }
};
(function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates.assistantEcoAddonResult = Handlebars.template({
        compiler: [6, ">= 2.0.0-beta.1"],
        main: function (t, e, i, n) {
            var o, s = "function", r = e.helperMissing, a = this.escapeExpression;
            return '<div class="assistant-result-eco-addon">\n  <div class="col-lg-12">\n    <div class="row">\n      <div class="col">\n        <h2 class="headline">\n          Jetzt neu: life' + a((o = null != (o = e.typeLowercase || (null != t ? t.typeLowercase : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "typeLowercase",
                    hash: {},
                    data: n
                }) : o)) + ' <span class="ls-icon-leaf"></span> \xf6ko\n        </h2>\n        <div class="price-panel">\n          <div class="row">\n            <div class="summary">\n              <h3>Preisinformationen</h3>\n              <dl>\n                <dt>Arbeitspreis pro kWh</dt>\n                <dd>' + a((o = null != (o = e.workingPriceVatCentRounded || (null != t ? t.workingPriceVatCentRounded : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "workingPriceVatCentRounded",
                    hash: {},
                    data: n
                }) : o)) + " Cent</dd>\n                <dt>Grundpreis pro Jahr</dt>\n                <dd>" + a((o = null != (o = e.basicPriceVatEuroRounded || (null != t ? t.basicPriceVatEuroRounded : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "basicPriceVatEuroRounded",
                    hash: {},
                    data: n
                }) : o)) + " Euro</dd>\n                <dt>Einmaliger life" + a((o = null != (o = e.typeLowercase || (null != t ? t.typeLowercase : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "typeLowercase",
                    hash: {},
                    data: n
                }) : o)) + "-Kundenbonus</dt>\n                <dd>" + a((o = null != (o = e.bonus || (null != t ? t.bonus : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "bonus",
                    hash: {},
                    data: n
                }) : o)) + "</dd>\n                <small>Preisstand: " + a((o = null != (o = e.priceValidFrom || (null != t ? t.priceValidFrom : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "priceValidFrom",
                    hash: {},
                    data: n
                }) : o)) + '. Gerundete Bruttopreise inkl. 19 % Umsatzsteuer.</small>\n              </dl>\n            </div>\n            <div class="price">\n              <a class="button btn-more-info" data-eco="true" href="#">Mehr Infos</a>\n              <div class="inner">\n                <h3>Verbrauchspreis pro Jahr</h3>\n                ' + a((o = null != (o = e.overallPrice || (null != t ? t.overallPrice : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "overallPrice",
                    hash: {},
                    data: n
                }) : o)) + ' \u20ac\n                <small>im 1. Jahr</small>\n                <a href="" class="info price-popover"></a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>'
        },
        useData: !0
    }), this.HandlebarsTemplates.assistantEcoAddonResult
}).call(this), function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates.assistantReference = Handlebars.template({
        compiler: [6, ">= 2.0.0-beta.1"],
        main: function (t, e, i, n) {
            var o, s = "function", r = e.helperMissing, a = this.escapeExpression;
            return '<div class="assistant-reference ' + a((o = null != (o = e.className || (null != t ? t.className : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "className",
                    hash: {},
                    data: n
                }) : o)) + '">\n  <span>Jetzt ' + a((o = null != (o = e.product || (null != t ? t.product : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "product",
                    hash: {},
                    data: n
                }) : o)) + "preis berechnen</span>\n</div>"
        },
        useData: !0
    }), this.HandlebarsTemplates.assistantReference
}.call(this), function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates.assistantResult = Handlebars.template({
        1: function (t, e, i, n) {
            var o, s = "function", r = e.helperMissing, a = this.escapeExpression;
            return "        <h2>So wenig zahlen Sie mit life" + a((o = null != (o = e.typeLowercase || (null != t ? t.typeLowercase : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "typeLowercase",
                    hash: {},
                    data: n
                }) : o)) + " \xf6ko.</h2>\n"
        }, 3: function (t, e, i, n) {
            var o, s = "function", r = e.helperMissing, a = this.escapeExpression;
            return "        <h2>So wenig zahlen Sie mit life" + a((o = null != (o = e.typeLowercase || (null != t ? t.typeLowercase : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "typeLowercase",
                    hash: {},
                    data: n
                }) : o)) + ".</h2>\n"
        }, 5: function (t, e, i, n) {
            var o, s = "function", r = e.helperMissing, a = this.escapeExpression;
            return '        <div class="type-headline">\n          life' + a((o = null != (o = e.typeLowercase || (null != t ? t.typeLowercase : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "typeLowercase",
                    hash: {},
                    data: n
                }) : o)) + '\n          <span class="eco">\xf6ko</span>\n        </div>\n'
        }, 7: function (t, e, i, n) {
            var o, s = "function", r = e.helperMissing, a = this.escapeExpression;
            return '        <div class="type-headline ' + a((o = null != (o = e.typeLowercase || (null != t ? t.typeLowercase : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "typeLowercase",
                    hash: {},
                    data: n
                }) : o)) + '">\n          life' + a((o = null != (o = e.typeLowercase || (null != t ? t.typeLowercase : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "typeLowercase",
                    hash: {},
                    data: n
                }) : o)) + "\n        </div>\n"
        }, 9: function () {
            return '                <dt>Energiemix</dt>\n                <dd><a href="#" class="energy-mix-modal-toggle">konventionell</a><dd>\n'
        }, compiler: [6, ">= 2.0.0-beta.1"], main: function (t, e, i, n) {
            var o, s, r = "function", a = e.helperMissing, l = this.escapeExpression, c = this.lambda, d = '<div class="assistant-result">\n  <div class="col-lg-12">\n    <div class="row">\n      <div class="col">\n        <div class="alert alert-danger hidden" role="alert"></div>\n';
            return o = e["if"].call(t, null != t ? t.isEco : t, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.program(3, n),
                data: n
            }), null != o && (d += o), d += '        <div class="zip-consumption">\n          <dl>\n            <dt>Ihr Ort</dt>\n            <dd>\n              <div class="input-group refresh-zip disabled">\n                <input type="text" class="form-control refresh-zip-input" value="' + l((s = null != (s = e.zip || (null != t ? t.zip : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "zip",
                    hash: {},
                    data: n
                }) : s)) + " " + l((s = null != (s = e.city || (null != t ? t.city : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "city",
                    hash: {},
                    data: n
                }) : s)) + '" disabled>\n                <span class="input-group-btn">\n                  <button class="btn refresh refresh-zip-submit" type="button"><i class="fa-repeat"></i></button>\n                  <button class="btn enable" type="button">&times;</button;\n                </span>\n              </div>\n            </dd>\n          </dl>\n          <dl>\n            <dt class="small">\n              bei Jahresverbrauch kWh/Jahr\n              <br>Jahrespreis: ' + l((s = null != (s = e.overallPrice || (null != t ? t.overallPrice : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "overallPrice",
                    hash: {},
                    data: n
                }) : s)) + ' Euro\n            </dt>\n            <dd>\n              <div class="input-group refresh-consumption disabled">\n                <input type="text" class="form-control refresh-consumption-input" value="' + l((s = null != (s = e.consumptionFormatted || (null != t ? t.consumptionFormatted : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "consumptionFormatted",
                    hash: {},
                    data: n
                }) : s)) + '" disabled>\n                <span class="addition">kWh</span>\n                <span class="input-group-btn">\n                  <button class="btn refresh refresh-consumption-submit" type="button"><i class="fa-repeat"></i></button>\n                  <button class="btn enable" type="button">&times;</button>\n                </span>\n              </div>\n            </dd>\n          </dl>\n        </div>\n      </div>\n    </div>\n    <div class="row">\n      <div class="col">\n', o = e["if"].call(t, null != t ? t.isEco : t, {
                name: "if",
                hash: {},
                fn: this.program(5, n),
                inverse: this.program(7, n),
                data: n
            }), null != o && (d += o), d += '        <div class="info-panel">\n          <ul class="nav nav-tabs" role="tablist">\n            <li role="presentation" class="active">\n              <a href="#_1" aria-controls="_1" role="tab">Tarifmerkmale</a>\n            </li>\n            <li role="presentation">\n              <a href="#_2" aria-controls="_2" role="tab">Preisinformationen</a>\n            </li>\n            <li>\n              <a href="#_3" aria-controls="_3" role="tab">Tarifbeschreibung</a>\n            </li>\n          </ul>\n\n          <div class="tab-content">\n            <div role="tabpanel" class="tab-pane active" id="_1">\n              ', s = null != (s = e.advantages || (null != t ? t.advantages : t)) ? s : a, o = typeof s === r ? s.call(t, {
                name: "advantages",
                hash: {},
                data: n
            }) : s, null != o && (d += o), d += "\n              <dl>\n                <dt>Erstvertragslaufzeit</dt>\n                <dd>" + l((s = null != (s = e.minContactPeriodDuration || (null != t ? t.minContactPeriodDuration : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "minContactPeriodDuration",
                    hash: {},
                    data: n
                }) : s)) + "</dd>\n                <dt>K\xfcndigungsfrist</dt>\n                <dd>jederzeit mit einer Frist von " + l((s = null != (s = e.cancellationPeriodDuration || (null != t ? t.cancellationPeriodDuration : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "cancellationPeriodDuration",
                    hash: {},
                    data: n
                }) : s)) + "n</dd>\n", o = e["if"].call(t, null != t ? t.typeIsStrom : t, {
                name: "if",
                hash: {},
                fn: this.program(9, n),
                inverse: this.noop,
                data: n
            }), null != o && (d += o), d += '              </dl>\n            </div>\n            <div role="tabpanel" class="tab-pane" id="_2">\n              <div class="table-responsive">\n                <table>\n                  <tr>\n                    <th>Jahresverbrauch</th>\n                    <th>Arbeitspreis netto</th>\n                    <th>Arbeitspreis brutto</th>\n                    <th>Grundpreis netto</th>\n                    <th>Grundpreis brutto</th>\n                  </tr>\n                  <tr>\n                    <td>bis ' + l((s = null != (s = e.consumptionTo || (null != t ? t.consumptionTo : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "consumptionTo",
                    hash: {},
                    data: n
                }) : s)) + " kWh</td>\n                    <td>" + l(c(null != (o = null != t ? t.blockPricesTo : t) ? o.workingPriceNetCentRounded : o, t)) + " ct/kWh</td>\n                    <td>" + l(c(null != (o = null != t ? t.blockPricesTo : t) ? o.workingPriceVatCentRounded : o, t)) + " ct/kWh</td>\n                    <td>" + l(c(null != (o = null != t ? t.blockPricesTo : t) ? o.basicPriceNetEuroRounded : o, t)) + " \u20ac/Jahr</td>\n                    <td>" + l(c(null != (o = null != t ? t.blockPricesTo : t) ? o.basicPriceVatEuroRounded : o, t)) + " \u20ac/Jahr</td>\n                  </tr>\n                  <tr>\n                    <td>ab " + l((s = null != (s = e.consumptionFrom || (null != t ? t.consumptionFrom : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "consumptionFrom",
                    hash: {},
                    data: n
                }) : s)) + " kWh</td>\n                    <td>" + l(c(null != (o = null != t ? t.blockPricesFrom : t) ? o.workingPriceNetCentRounded : o, t)) + " ct/kWh</td>\n                    <td>" + l(c(null != (o = null != t ? t.blockPricesFrom : t) ? o.workingPriceVatCentRounded : o, t)) + " ct/kWh</td>\n                    <td>" + l(c(null != (o = null != t ? t.blockPricesFrom : t) ? o.basicPriceNetEuroRounded : o, t)) + " \u20ac/Jahr</td>\n                    <td>" + l(c(null != (o = null != t ? t.blockPricesFrom : t) ? o.basicPriceVatEuroRounded : o, t)) + " \u20ac/Jahr</td>\n                  </tr>\n                </table>\n              </div>\n              <small>Preisstand: " + l((s = null != (s = e.priceValidFrom || (null != t ? t.priceValidFrom : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "priceValidFrom",
                    hash: {},
                    data: n
                }) : s)) + ". Gerundete Bruttopreise inkl. 19 % Umsatzsteuer.</small>\n              <h4>Beispielrechnung</h4>\n              <p>Jahrespreis in Euro = Jahresverbrauch in kWh x Arbeitspreis pro kWh + Grundpreis pro Jahr<br>\n              Monatlicher Abschlag in Euro = Jahrespreis in Euro / 11 (Abschl\xe4ge pro Jahr)</p>\n              <dl>\n                <dt>Zahlungsart</dt>\n                <dd>" + l((s = null != (s = e.paymentMethod || (null != t ? t.paymentMethod : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "paymentMethod",
                    hash: {},
                    data: n
                }) : s)) + '</dd>\n              </dl>\n            </div>\n            <div role="tabpanel" class="tab-pane description" id="_3">\n              ', s = null != (s = e.description || (null != t ? t.description : t)) ? s : a, o = typeof s === r ? s.call(t, {
                name: "description",
                hash: {},
                data: n
            }) : s, null != o && (d += o), d += '\n            </div>\n          </div>\n        </div>\n\n        <div class="price-panel">\n          <div class="row">\n            <div class="summary">\n              <h3>Preisinformationen</h3>\n              <dl>\n                <dt>Arbeitspreis pro kWh</dt>\n                <dd>' + l((s = null != (s = e.workingPriceVatCentRounded || (null != t ? t.workingPriceVatCentRounded : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "workingPriceVatCentRounded",
                    hash: {},
                    data: n
                }) : s)) + " Cent</dd>\n                <dt>Grundpreis pro Jahr</dt>\n                <dd>" + l((s = null != (s = e.basicPriceVatEuroRounded || (null != t ? t.basicPriceVatEuroRounded : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "basicPriceVatEuroRounded",
                    hash: {},
                    data: n
                }) : s)) + " Euro</dd>\n                <dt>Einmaliger life" + l((s = null != (s = e.typeLowercase || (null != t ? t.typeLowercase : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "typeLowercase",
                    hash: {},
                    data: n
                }) : s)) + "-Kundenbonus</dt>\n                <dd>" + l((s = null != (s = e.bonus || (null != t ? t.bonus : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "bonus",
                    hash: {},
                    data: n
                }) : s)) + "</dd>\n                <small>Preisstand: " + l((s = null != (s = e.priceValidFrom || (null != t ? t.priceValidFrom : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "priceValidFrom",
                    hash: {},
                    data: n
                }) : s)) + '. Gerundete Bruttopreise inkl. 19 % Umsatzsteuer.</small>\n              </dl>\n            </div>\n            <div class="price">\n              <div class="inner">\n                <h3>Verbrauchspreis pro Jahr</h3>\n                ' + l((s = null != (s = e.overallPrice || (null != t ? t.overallPrice : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "overallPrice",
                    hash: {},
                    data: n
                }) : s)) + ' \u20ac\n                <small>im 1. Jahr</small>\n                <a href="" class="info price-popover"></a>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <ul class="links">\n          <li><a href="' + l((s = null != (s = e.downloadPath || (null != t ? t.downloadPath : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "downloadPath",
                    hash: {},
                    data: n
                }) : s)) + 'agb.pdf" target="_blank">AGB</a></li>\n          <li><a href="' + l((s = null != (s = e.downloadPath || (null != t ? t.downloadPath : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "downloadPath",
                    hash: {},
                    data: n
                }) : s)) + 'tarifbeiblatt.pdf" target="_blank">Tarifbeiblatt</a></li>\n          <li><a class="price-modal-toggle" href="#">Preis- und Lieferbedingungen</a></li>\n        </ul>\n\n        <a class="button" href="/' + l((s = null != (s = e.typeLowercase || (null != t ? t.typeLowercase : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "typeLowercase",
                    hash: {},
                    data: n
                }) : s)) + "/bestellen?consumption=" + l((s = null != (s = e.consumption || (null != t ? t.consumption : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "consumption",
                    hash: {},
                    data: n
                }) : s)) + "&zipCode=" + l((s = null != (s = e.zip || (null != t ? t.zip : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "zip",
                    hash: {},
                    data: n
                }) : s)) + "&city=" + l((s = null != (s = e.city || (null != t ? t.city : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "city",
                    hash: {},
                    data: n
                }) : s)) + "&productName=" + l((s = null != (s = e.name || (null != t ? t.name : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "name",
                    hash: {},
                    data: n
                }) : s)) + "&productType=" + l((s = null != (s = e.type || (null != t ? t.type : t)) ? s : a, typeof s === r ? s.call(t, {
                    name: "type",
                    hash: {},
                    data: n
                }) : s)) + '&customerType=pk&tariffType=et&multiGridOperators=false">Online abschlie\xdfen</a>\n\n        <div class="legal">', s = null != (s = e.legal || (null != t ? t.legal : t)) ? s : a, o = typeof s === r ? s.call(t, {
                name: "legal",
                hash: {},
                data: n
            }) : s, null != o && (d += o), d + '</div>\n      </div>\n      <div class="col-md-3">\n        <div class="awards-teaser hidden-sm">\n          <div class="row powered-by">\n            <div class="col-lg-6 col-sm-4">\n              <img src="/ova/assets/images/eon-logo-small.png" class="img-responsive">\n            </div>\n            <div class="col-lg-6 col-sm-8 text-right">\n              <p class="partner-text">Vertragspartner ist<br>die E.ON Energie<br>Deutschland GmbH</p>\n            </div>\n          </div>\n          <div class="row certificate">\n            <div class="col-lg-6 col-sm-4">\n              <img src="https://www.lifestrom.de/partner/comodo_secure_100x85_transp.png" alt="Comodo" class="img-responsive" />\n            </div>\n            <div class="col-lg-6 col-sm-8 text-right">\n              <p class="partner-text">Sicher bestellen durch SSL-Verschl\xfcsselung</p>\n            </div>\n          </div>\n          <div class="row teaser">\n            <img src="/ova/assets/images/praemien_teaser.jpg" class="img-responsive"/>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>'
        }, useData: !0
    }), this.HandlebarsTemplates.assistantResult
}.call(this), function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates.assistantStandardAddonResult = Handlebars.template({
        compiler: [6, ">= 2.0.0-beta.1"], main: function (t, e, i, n) {
            var o, s = "function", r = e.helperMissing, a = this.escapeExpression;
            return '<div class="assistant-result-standard-addon">\n  <div class="col-lg-12">\n    <div class="row">\n      <div class="col">\n        <h2 class="headline">\n          Unser Standardtarif\n        </h2>\n        <div class="price-panel">\n          <div class="row">\n            <div class="summary">\n              <h3>Preisinformationen</h3>\n              <dl>\n                <dt>Arbeitspreis pro kWh</dt>\n                <dd>' + a((o = null != (o = e.workingPriceVatCentRounded || (null != t ? t.workingPriceVatCentRounded : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "workingPriceVatCentRounded",
                    hash: {},
                    data: n
                }) : o)) + " Cent</dd>\n                <dt>Grundpreis pro Jahr</dt>\n                <dd>" + a((o = null != (o = e.basicPriceVatEuroRounded || (null != t ? t.basicPriceVatEuroRounded : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "basicPriceVatEuroRounded",
                    hash: {},
                    data: n
                }) : o)) + " Euro</dd>\n                <dt>Einmaliger life" + a((o = null != (o = e.typeLowercase || (null != t ? t.typeLowercase : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "typeLowercase",
                    hash: {},
                    data: n
                }) : o)) + "-Kundenbonus</dt>\n                <dd>" + a((o = null != (o = e.bonus || (null != t ? t.bonus : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "bonus",
                    hash: {},
                    data: n
                }) : o)) + "</dd>\n                <small>Preisstand: " + a((o = null != (o = e.priceValidFrom || (null != t ? t.priceValidFrom : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "priceValidFrom",
                    hash: {},
                    data: n
                }) : o)) + '. Gerundete Bruttopreise inkl. 19 % Umsatzsteuer.</small>\n              </dl>\n            </div>\n            <div class="price">\n              <a class="button btn-more-info" data-eco="false" href="#">Mehr Infos</a>\n              <div class="inner">\n                <h3>Verbrauchspreis pro Jahr</h3>\n                ' + a((o = null != (o = e.overallPrice || (null != t ? t.overallPrice : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "overallPrice",
                    hash: {},
                    data: n
                }) : o)) + ' \u20ac\n                <small>im 1. Jahr</small>\n                <a href="" class="info price-popover"></a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>'
        }, useData: !0
    }), this.HandlebarsTemplates.assistantStandardAddonResult
}.call(this), function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates.gasAssistant = Handlebars.template({
        1: function () {
            return '      <a href="/erdgas" class="more-info" target="_parent">Mehr Infos</a>\n'
        }, compiler: [6, ">= 2.0.0-beta.1"], main: function (t, e, i, n) {
            var o, s = "<div class=\"alert alert-danger hidden\" role=\"alert\"></div>\n<form class='gas-assistant-form assistant'>\n  <div class=\"assistant-inner\">\n    <div class='form-group zip-group'>\n      <input type='text' placeholder=\"PLZ\" class='gas-assistant-zip' />\n      <label>Ihre Postleitzahl</label>\n    </div>\n    <span class='divider'>und</span>\n    <div class='form-group space-group'>\n      <div class=\"gas-assistant-space-outer\">\n        <input type='text' class='gas-assistant-space' name='gas-assistant-space' />\n      </div>\n      <div class='slider'>\n        <input type='text' class='gas-assistant-space-slider' />\n      </div>\n      <label>Wohnfl\xe4che in m<sup>2</sup></label>\n    </div>\n    <span class='divider'>oder</span>\n    <div class='form-group kWh-group'>\n      <input type='text' class='gas-assistant-kWh' placeholder=\"kWh\" />\n      <label>Jahresverbrauch in kWh</label>\n    </div>\n    <div class=\"button-group\">\n      <input type=\"submit\" value=\"Preis berechnen\" class=\"button\">\n";
            return o = e["if"].call(t, null != t ? t.hiddenOnLoad : t, {
                name: "if",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }), null != o && (s += o), s + "    </div>\n  </div>\n</form>"
        }, useData: !0
    }), this.HandlebarsTemplates.gasAssistant
}.call(this), function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates.loading = Handlebars.template({
        compiler: [6, ">= 2.0.0-beta.1"],
        main: function () {
            return '<div class="center-spinner">\n  <div class="spinner">\n    loading...\n  </div>\n</div>'
        },
        useData: !0
    }), this.HandlebarsTemplates.loading
}.call(this), function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates.loginPanel = Handlebars.template({
        compiler: [6, ">= 2.0.0-beta.1"],
        main: function (t, e, i, n) {
            var o, s = "function", r = e.helperMissing, a = this.escapeExpression;
            return '<div class="login-panel">\n  <div class="login-panel-body">\n    <div class="text">Nutzen Sie als life' + a((o = null != (o = e.product || (null != t ? t.product : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "product",
                    hash: {},
                    data: n
                }) : o)) + '-Kunde das Serviceportal von E.ON:</div>\n    <a href="https://www.eon.de/pk/de/mein-eon.html" class="button" target="_blank">Mein E.ON</a>\n  </div>\n</div>'
        },
        useData: !0
    }), this.HandlebarsTemplates.loginPanel
}.call(this), function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates.modal = Handlebars.template({
        compiler: [6, ">= 2.0.0-beta.1"],
        main: function () {
            return '<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">\n  <div class="modal-dialog modal-lg" role="document">\n    <div class="modal-content">\n    </div>\n  </div>\n</div>'
        },
        useData: !0
    }), this.HandlebarsTemplates.modal
}.call(this), function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["modals/assistantResultPrice"] = Handlebars.template({
        1: function (t, e, i, n) {
            var o, s = "function", r = e.helperMissing, a = this.escapeExpression;
            return "    <h3>" + a((o = null != (o = e.headline || (null != t ? t.headline : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "headline",
                    hash: {},
                    data: n
                }) : o)) + '</h3>\n    <p class="arial-font">' + a((o = null != (o = e.body || (null != t ? t.body : t)) ? o : r, typeof o === s ? o.call(t, {
                    name: "body",
                    hash: {},
                    data: n
                }) : o)) + "</h3>\n"
        }, compiler: [6, ">= 2.0.0-beta.1"], main: function (t, e, i, n) {
            var o, s, r, a = "function", l = e.helperMissing, c = this.escapeExpression, d = this.lambda, u = e.blockHelperMissing, p = '<div class="modal-header">\n  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n  <h3 class="modal-title">Preis- und Lieferbedingungen ' + c((s = null != (s = e.name || (null != t ? t.name : t)) ? s : l, typeof s === a ? s.call(t, {
                    name: "name",
                    hash: {},
                    data: n
                }) : s)) + '</h3>\n</div>\n<div class="modal-body">\n  <h3>3.1 Ihre Preise</h3>\n  <div class="table-responsive">\n    <table>\n      <tr>\n        <th>Jahresverbrauch</th>\n        <th>Arbeitspreis netto</th>\n        <th>Arbeitspreis brutto</th>\n        <th>Grundpreis netto</th>\n        <th>Grundpreis brutto</th>\n      </tr>\n      <tr>\n        <td>bis ' + c((s = null != (s = e.consumptionTo || (null != t ? t.consumptionTo : t)) ? s : l, typeof s === a ? s.call(t, {
                    name: "consumptionTo",
                    hash: {},
                    data: n
                }) : s)) + " kWh</td>\n        <td>" + c(d(null != (o = null != t ? t.blockPricesTo : t) ? o.workingPriceNetCentRounded : o, t)) + " ct/kWh</td>\n        <td>" + c(d(null != (o = null != t ? t.blockPricesTo : t) ? o.workingPriceVatCentRounded : o, t)) + " ct/kWh</td>\n        <td>" + c(d(null != (o = null != t ? t.blockPricesTo : t) ? o.basicPriceNetEuroRounded : o, t)) + " \u20ac/Jahr</td>\n        <td>" + c(d(null != (o = null != t ? t.blockPricesTo : t) ? o.basicPriceVatEuroRounded : o, t)) + " \u20ac/Jahr</td>\n      </tr>\n      <tr>\n        <td>ab " + c((s = null != (s = e.consumptionFrom || (null != t ? t.consumptionFrom : t)) ? s : l, typeof s === a ? s.call(t, {
                    name: "consumptionFrom",
                    hash: {},
                    data: n
                }) : s)) + " kWh</td>\n        <td>" + c(d(null != (o = null != t ? t.blockPricesFrom : t) ? o.workingPriceNetCentRounded : o, t)) + " ct/kWh</td>\n        <td>" + c(d(null != (o = null != t ? t.blockPricesFrom : t) ? o.workingPriceVatCentRounded : o, t)) + " ct/kWh</td>\n        <td>" + c(d(null != (o = null != t ? t.blockPricesFrom : t) ? o.basicPriceNetEuroRounded : o, t)) + " \u20ac/Jahr</td>\n        <td>" + c(d(null != (o = null != t ? t.blockPricesFrom : t) ? o.basicPriceVatEuroRounded : o, t)) + " \u20ac/Jahr</td>\n      </tr>\n    </table>\n  </div>\n  <small>Preisstand: " + c((s = null != (s = e.priceValidFrom || (null != t ? t.priceValidFrom : t)) ? s : l, typeof s === a ? s.call(t, {
                    name: "priceValidFrom",
                    hash: {},
                    data: n
                }) : s)) + ". Gerundete Bruttopreise inkl. 19 % Umsatzsteuer.</small>\n";
            return s = null != (s = e.contractTexts || (null != t ? t.contractTexts : t)) ? s : l, r = {
                name: "contractTexts",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }, o = typeof s === a ? s.call(t, r) : s, e.contractTexts || (o = u.call(t, o, r)), null != o && (p += o), p + "</div>"
        }, useData: !0
    }), this.HandlebarsTemplates["modals/assistantResultPrice"]
}.call(this), function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["modals/energyMix"] = Handlebars.template({
        compiler: [6, ">= 2.0.0-beta.1"],
        main: function () {
            return '<div class="modal-header">\n  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n  <h3 class="modal-title">Energiemix</h3>\n</div>\n<div class="modal-body">\n  <img src="/downloads/strom/energiemix.png" alt="Energiemix" class="img-responsive">\n</div>'
        },
        useData: !0
    }), this.HandlebarsTemplates["modals/energyMix"]
}.call(this), function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates.powerAssistant = Handlebars.template({
        1: function (t) {
            var e = this.lambda, i = this.escapeExpression;
            return '        <label class="radio-button">\n          ' + i(e(t, t)) + '\n          <input type="radio" name="power-assistant-persons-radio" value=' + i(e(t, t)) + " />\n        </label>\n"
        }, 3: function () {
            return '      <a href="/" class="more-info" target="_parent">Mehr Infos</a>\n'
        }, compiler: [6, ">= 2.0.0-beta.1"], main: function (t, e, i, n) {
            var o, s = "<div class=\"alert alert-danger hidden\" role=\"alert\"></div>\n<form class='power-assistant-form assistant'>\n  <div class=\"assistant-inner\">\n    <div class='form-group zip-group'>\n      <input type='text' placeholder=\"PLZ\" class='power-assistant-zip' />\n      <label>Ihre Postleitzahl</label>\n    </div>\n    <span class='divider'>und</span>\n    <div class='form-group persons-group'>\n      <div class='buttons'>\n";
            return o = e.each.call(t, null != t ? t.items : t, {
                name: "each",
                hash: {},
                fn: this.program(1, n),
                inverse: this.noop,
                data: n
            }), null != o && (s += o), s += "      </div>\n      <div class='slider'>\n        <input type='text' class='power-assistant-persons-slider' />\n      </div>\n      <label>Personen im Haushalt</label>\n    </div>\n    <span class='divider'>oder</span>\n    <div class='form-group kWh-group'>\n      <input type='text' class='power-assistant-kWh' placeholder=\"kWh\" />\n      <label>Jahresverbrauch in kWh</label>\n    </div>\n    <div class=\"button-group\">\n      <input type=\"submit\" value=\"Preis berechnen\" class=\"button\">\n", o = e["if"].call(t, null != t ? t.hiddenOnLoad : t, {
                name: "if",
                hash: {},
                fn: this.program(3, n),
                inverse: this.noop,
                data: n
            }), null != o && (s += o), s + "    </div>\n  </div>\n</form>"
        }, useData: !0
    }), this.HandlebarsTemplates.powerAssistant
}.call(this), function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates.zipcodeSuggestions = Handlebars.template({
        1: function (t, e, i, n, o) {
            var s, r = "";
            return s = e.each.call(t, null != t ? t.cities : t, {
                name: "each",
                hash: {},
                fn: this.program(2, n, o),
                inverse: this.noop,
                data: n
            }), null != s && (r += s), r
        }, 2: function (t, e, i, n, o) {
            var s = this.lambda, r = this.escapeExpression;
            return '    <li class="zip-code-suggestion">\n      <a href="#">' + r(s(null != o[1] ? o[1].zipCode : o[1], t)) + " " + r(s(null != t ? t.city : t, t)) + "</a>\n    </li>\n"
        }, compiler: [6, ">= 2.0.0-beta.1"], main: function (t, e, i, n, o) {
            var s, r = "<div class='zip-code-suggestions'>\n  <ul>\n";
            return s = e.each.call(t, null != t ? t.zipcodes : t, {
                name: "each",
                hash: {},
                fn: this.program(1, n, o),
                inverse: this.noop,
                data: n
            }), null != s && (r += s), r + "  </ul>\n</div>"
        }, useData: !0, useDepths: !0
    }), this.HandlebarsTemplates.zipcodeSuggestions
}.call(this);
var LifeStrom = LifeStrom || {};
LifeStrom.AssistantReference = function () {
    function t() {
        s = u.height(), r = n.offset().top - s, l = n.outerHeight(), $("html, body").animate({scrollTop: r - 20}, 500)
    }

    function e() {
        s = u.height(), r = n.offset().top - s, d.scrollTop() > r + l && c ? (c = !1, a.removeClass("out").addClass("in")) : d.scrollTop() < r + l && !c && (c = !0, a.removeClass("in").addClass("out"))
    }

    function i(i) {
        n = i, d = $(window), o = $("body"), u = o.find(">header"), o.append(HandlebarsTemplates.assistantReference({
            className: "home" == n.data("page") ? "out" : "",
            product: LifeStrom.PRODUCT.charAt(0).toUpperCase() + LifeStrom.PRODUCT.slice(1)
        })), a = $(".assistant-reference"), s = u.height(), r = n.offset().top - s, l = n.outerHeight(), a.on("touchstart click", function (e) {
            e.preventDefault(), t()
        }), "home" != n.data("page") ? (a.on("mouseenter", function () {
            $(this).addClass("in").css("animation", "none")
        }), a.on("mouseleave", function () {
            $(this).removeClass("in")
        })) : ($(".phone-number-reference-holder").addClass("hidden-xs"), c = !0, e(), d.on("scroll", function () {
            e()
        }))
    }

    var n, o, s, r, a, l, c, d, u;
    return {init: i}
}, $(function () {
    if ($(".assistant-panel").length > 0) {
        var t = new LifeStrom.AssistantReference;
        t.init($(".assistant-panel").first())
    }
});
var LifeStrom = LifeStrom || {};
LifeStrom.AssistantResult = function () {
    function t() {
        w ? a() : p.zipcodes(b).then(function (t) {
            w = t.zipCodes[0].cities[0].city, $.jStorage.set("pk[city]", w), a()
        })
    }

    function e() {
        return b = C.val().split(" ")[0], w = C.val().split(" ").slice(1).join(" "), w && $.jStorage.set("pk[city]", w), b.match(/^[0-9]{5}$/) ? (u.html(HandlebarsTemplates.loading), $.jStorage.set("pk[zip]", b), void t()) : (h.removeClass("hidden"), void h.text("Bitte g\xfcltige Postleitzahl eingeben."))
    }

    function i() {
        if (y = parseInt(S.val().replace(/[,\,.]/g, "")), "Strom" == v) {
            if (y > 1e5)return h.removeClass("hidden"), void h.text("Der Jahresverbrauch darf nicht mehr als 100.000 kWh betragen.");
            $.jStorage.set("pk[consumption][Strom]", S.val())
        } else if ("Erdgas" == v) {
            if (y > 3e5)return h.removeClass("hidden"), void h.text("Der Jahresverbrauch darf nicht mehr als 300.000 kWh betragen.");
            $.jStorage.set("pk[consumption][Erdgas]", S.val())
        }
        u.html(HandlebarsTemplates.loading), a()
    }

    function n() {
        C = u.find(".refresh-zip-input"), T = new LifeStrom.ZipcodeHelper, T.initInput(C), C.on("focus", function () {
            h.addClass("hidden"), h.text("")
        }), C.on("keypress", function (t) {
            var i = t.keyCode || t.which;
            13 == i && e()
        }), u.find(".refresh-zip-submit").on("click", function () {
            e()
        }), S = u.find(".refresh-consumption-input"), S.on("keypress", function (t) {
            var e = t.keyCode || t.which;
            13 == e && i()
        }), u.find(".refresh-consumption-submit").on("click", function () {
            i()
        }), u.find(".enable").one("click", function () {
            var t = $(this).closest(".input-group");
            t.removeClass("disabled"), $input = t.find("input"), $input.prop("disabled", !1).focus().select()
        }), u.find(".btn-more-info").one("click", function (t) {
            t.preventDefault(), $.jStorage.set("ls_isEco", $(this).data("eco")), location.href = location.href
        })
    }

    function o(t) {
        E = $("#modal");
        var e = E.find(".modal-content").first();
        u.find(".price-modal-toggle").on("click", function (i) {
            i.preventDefault();
            var n = [];
            jQuery.each(t.contractText.productHeadline, function (e, i) {
                n.push({headline: i, body: t.contractText.productText[e]})
            }), e.html(HandlebarsTemplates["modals/assistantResultPrice"]({
                blockPricesTo: t.blockPrices.currentProduct[0],
                blockPricesFrom: t.blockPrices.currentProduct[1],
                consumptionTo: t.blockPrices.currentProduct[0].consumptionTo.toString().split(/(?=(?:...)*$)/).join("."),
                consumptionFrom: t.blockPrices.currentProduct[1].consumptionFrom.toString().split(/(?=(?:...)*$)/).join("."),
                priceValidFrom: t.newCustomer.currentProduct.priceValidFrom,
                name: t.productInformation.productName,
                contractTexts: n
            })), E.modal()
        }), u.find(".energy-mix-modal-toggle").on("click", function (t) {
            t.preventDefault(), e.html(HandlebarsTemplates["modals/energyMix"]), E.modal()
        })
    }

    function s() {
        u.find(".price-popover").popover({
            content: "Im 1. Vertragsjahr " + x + "  Euro inkl. einmaligem Bonus f\xfcr Ihren Jahresverbrauch von " + y.toString().split(/(?=(?:...)*$)/).join(".") + " kWh",
            placement: "top",
            container: "body",
            trigger: "focus"
        }), u.find(".price-popover").on("click", function (t) {
            t.preventDefault(), navigator.userAgent.indexOf("Safari") > -1 && !(navigator.userAgent.indexOf("Chrome") > -1) && ($this = $(this), $this.hasClass("in") ? ($this.blur(), $this.removeClass("in")) : ($this.focus(), $this.addClass("in")))
        })
    }

    function r(t) {
        var e, i, r, a = t.newCustomer.currentProduct;
        "Strom" == v ? j ? (e = $("<div/>").html(u.data("advantages-power-eco")).text(), i = $("<div/>").html(u.data("description-power-eco")).text(), r = $("<div/>").html(u.data("legal-power-eco")).text()) : (e = $("<div/>").html(u.data("advantages-power")).text(), i = $("<div/>").html(u.data("description-power")).text(), r = $("<div/>").html(u.data("legal-power")).text()) : "Erdgas" == v && (j ? (e = $("<div/>").html(u.data("advantages-gas-eco")).text(), i = $("<div/>").html(u.data("description-gas-eco")).text(), r = $("<div/>").html(u.data("legal-gas-eco")).text()) : (e = $("<div/>").html(u.data("advantages-gas")).text(), i = $("<div/>").html(u.data("description-gas")).text(), r = $("<div/>").html(u.data("legal-gas")).text())), x = a.allRoundPriceYearVatEuroRounded.toFixed(2).replace(".", ","), u.html(HandlebarsTemplates[P]({
            isEco: j,
            type: v,
            typeIsStrom: "Strom" == v,
            typeLowercase: v.toLowerCase(),
            city: w,
            zip: b,
            consumption: y,
            consumptionFormatted: y.toString().split(/(?=(?:...)*$)/).join("."),
            overallPrice: x,
            bonus: t.newCustomer.bonusRaw + " " + t.newCustomer.bonusUnit,
            name: t.productInformation.productName,
            shortName: m,
            advantages: e,
            description: i,
            legal: r,
            cancellationPeriodDuration: a.cancellationPeriodDuration,
            minContactPeriodDuration: a.minContactPeriodDuration,
            blockPricesTo: t.blockPrices.currentProduct[0],
            blockPricesFrom: t.blockPrices.currentProduct[1],
            workingPriceVatCentRounded: a.workingPriceVatCentRounded,
            basicPriceVatEuroRounded: a.basicPriceVatEuroRounded,
            consumptionTo: t.blockPrices.currentProduct[0].consumptionTo.toString().split(/(?=(?:...)*$)/).join("."),
            consumptionFrom: t.blockPrices.currentProduct[1].consumptionFrom.toString().split(/(?=(?:...)*$)/).join("."),
            priceValidFrom: a.priceValidFrom,
            paymentMethod: t.productInformation.paymentMethod,
            downloadPath: k
        })), h = u.find(".alert"), n(), o(t), s(), u.find(".nav-tabs a").on("click", function (t) {
            t.preventDefault(), $(this).tab("show")
        })
    }

    function a() {
        _ && _.update(y, b, w), p.product(f, g, v, y, b, w).then(function (t) {
            r(t.products)
        }).fail(function (t) {
            c(t)
        })
    }

    function l(t, e, i) {
        u.html(""), y = t, b = e, w = i, a()
    }

    function c(t) {
        u.html(404 == t.status ? '<div class="alert alert-danger"><strong>Es tut uns Leid!</strong> Es konnte kein passendes Produkt gefunden werden.</div>' : '<div class="alert alert-danger"><strong>Es tut uns Leid!</strong> Es ist ein Fehler aufgetreten.</div>')
    }

    function d(e, i, n, o, s) {
        u = e, P = n, j = i, p = new LifeStrom.EonAPI, o && u.html(HandlebarsTemplates.loading), v = $.jStorage.get("pk[productType]", !1), "Strom" == v ? (y = $.jStorage.get("pk[consumption][Strom]", !1), i ? (f = "lifestrom \xf6ko powered by SAT.1", g = "EDG00_E402966", k = "/downloads/eco/strom/") : (f = "lifestrom powered by SAT.1", g = "EDG00_E402892", k = "/downloads/strom/")) : "Erdgas" == v && (y = $.jStorage.get("pk[consumption][Erdgas]", !1), i ? (f = "lifeerdgas \xf6ko powered by SAT.1", g = "EDG00_G402933", k = "/downloads/eco/erdgas/") : (f = "lifeerdgas powered by SAT.1", g = "EDG00_G402882", k = "/downloads/erdgas/")), y = parseInt(y.replace(/[,\,.]/g, "")), b = $.jStorage.get("pk[zip]", !1), w = $.jStorage.get("pk[city]", !1), t(), _ = s
    }

    var u, p, h, f, m, g, v, y, b, w, k, x, T, C, S, E, P, _, j = !1;
    return {init: d, update: l}
}, $(function () {
    if ($("#assistant-result").length > 0)if ($.jStorage.get("ls_isEco")) {
        var t = new LifeStrom.AssistantResult;
        t.init($("#assistant-result-addon"), !1, "assistantStandardAddonResult", !1);
        var e = new LifeStrom.AssistantResult;
        e.init($("#assistant-result"), !0, "assistantResult", !0, t)
    } else {
        var t = new LifeStrom.AssistantResult;
        t.init($("#assistant-result-addon"), !0, "assistantEcoAddonResult", !1);
        var e = new LifeStrom.AssistantResult;
        e.init($("#assistant-result"), !1, "assistantResult", !0, t)
    }
});
var LifeStrom = LifeStrom || {};
LifeStrom.GasAssistant = function () {
    function t(t) {
        f.val(t)
    }

    function e(t) {
        d.slider("setValue", t)
    }

    function i(i) {
        t(i), e(i)
    }

    function n(t) {
        for (var e = 0; e < l.length; e++) {
            var i = parseInt(l[e]["Wohnfl\xe4che"]);
            if (i >= t)return void s(parseInt(l[e].Verbrauch.replace(",", "")));
            s(parseInt(l[0].Verbrauch.replace(",", "")))
        }
    }

    function o(t) {
        for (var e = 0; e < l.length; e++) {
            var n = parseInt(l[e].Verbrauch.replace(",", ""));
            if (n >= t)return void i(parseInt(l[e]["Wohnfl\xe4che"]));
            i(parseInt(l[c - 1]["Wohnfl\xe4che"]))
        }
    }

    function s(t) {
        g = t;
        var e = g + "";
        r(e), u.find(".gas-assistant-kWh").change()
    }

    function r(t) {
        var e = ("" + t).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function (t) {
            return t + "."
        });
        u.find(".gas-assistant-kWh").val(e)
    }

    function a(i, a) {
        $.get("/Gasrechner.json").then(function (v) {
            if (l = v, c = l.length, u = i, u.html(HandlebarsTemplates.gasAssistant({hiddenOnLoad: !u.data("active")})), f = u.find(".gas-assistant-space"), m = u.find(".alert"), d = u.find(".gas-assistant-space-slider"), d.slider({
                    min: parseInt(v[0]["Wohnfl\xe4che"]),
                    max: parseInt(v[c - 1]["Wohnfl\xe4che"]),
                    value: a,
                    tooltip: "hide",
                    step: 5
                }), d.on("slideStop", function (e) {
                    t(e.value), n(e.value)
                }), u.find("input[name=gas-assistant-space]").on("change", function () {
                    e(parseInt(this.value)), n(this.value)
                }), u.find(".gas-assistant-kWh").on("change", function () {
                    var t = $(this), e = parseInt(t.val().replace(/[,\,.]/g, ""));
                    isNaN(e) ? e = g : (g = e, o(e)), r("" + e)
                }), h = u.find(".gas-assistant-zip"), p = new LifeStrom.ZipcodeHelper, p.initInput(h), h.on("focus", function () {
                    m.addClass("hidden"), m.text("")
                }), u.find(".gas-assistant-form").on("submit", function (t) {
                    t.preventDefault();
                    var e = h.val().split(" ")[0], n = h.val().split(" ").slice(1).join(" "), o = u.find(".gas-assistant-kWh").val();
                    return parseInt(o.replace(".", "")) > 3e5 ? (m.removeClass("hidden"), void m.text("Der Jahresverbrauch darf nicht mehr als 300.000 kWh betragen.")) : e.match(/^[0-9]{5}$/) ? ($.jStorage.set("pk[productType]", "Erdgas"), $.jStorage.set("pk[zip]", e), n && $.jStorage.set("pk[city]", n), $.jStorage.set("pk[consumption][Erdgas]", o), $.jStorage.set("pk[Erdgas][showProductAttributesFilter]", "true"), $.jStorage.set("[livingArea]", "100"), $.jStorage.set("ls_isEco", "1" == i.data("eco") ? !0 : !1), void(window.top.location.href = "/erdgas/tarif")) : (m.removeClass("hidden"), void m.text("Bitte g\xfcltige Postleitzahl eingeben."))
                }), $.jStorage.get("pk[consumption][Erdgas]", !1)) {
                var y = parseInt($.jStorage.get("pk[consumption][Erdgas]").replace(/[,\,.]/g, ""));
                isNaN(y) ? n(a) : s(y)
            } else n(a);
            $.jStorage.get("pk[zip]", !1) && $.jStorage.get("pk[city]", !1) && h.val($.jStorage.get("pk[zip]") + " " + $.jStorage.get("pk[city]"))
        })
    }

    var l, c, d, u, p, h, f, m, g = 0;
    return {init: a}
}, $(function () {
    if ($("#gas-assistant").length > 0) {
        var t = new LifeStrom.GasAssistant;
        t.init($("#gas-assistant"), 100)
    }
});
var LifeStrom = LifeStrom || {};
LifeStrom.LoginDropdown = function () {
    function t(t) {
        i = t, n = i.parent(), o = !1, i.after(HandlebarsTemplates.loginPanel({product: LifeStrom.PRODUCT})), s = i.next(), r = n.find(".button")[0], i.on("click", function (t) {
            t.preventDefault(), o ? (s.removeClass("in"), n.removeClass("in")) : (s.addClass("in"), n.addClass("in"), e()), o = !o
        })
    }

    function e() {
        $(document).one("mousedown", function (t) {
            var a = $(t.target)[0];
            a != i[0] && a != r && open ? (s.removeClass("in"), n.removeClass("in"), o = !1) : a == r && e()
        })
    }

    var i, n, o, s, r;
    return {init: t}
}, $(function () {
    if ($("a[href=#login]").length > 0) {
        var t = new LifeStrom.LoginDropdown;
        t.init($("a[href=#login]").first())
    }
});
var LifeStrom = LifeStrom || {};
LifeStrom.NavbarToggle = function () {
    function t(t, o) {
        e = t, i = o, n = !1, e.on("click", function (t) {
            t.preventDefault(), n ? (e.removeClass("in"), i.removeClass("in")) : (i.addClass("in"), e.addClass("in")), n = !n
        })
    }

    var e, i, n;
    return {init: t}
}, $(function () {
    var t = new LifeStrom.NavbarToggle;
    t.init($(".toggle-navigation"), $("#navigation"))
});
var LifeStrom = LifeStrom || {};
LifeStrom.PowerAssistant = function () {
    function t(t) {
        l.find(".radio-button").removeClass("active"), l.find("input[name=power-assistant-persons-radio][value=" + t + "]").prop("checked", !0).closest(".radio-button").addClass("active")
    }

    function e(t) {
        a.slider("setValue", t)
    }

    function i(i) {
        t(i), e(i)
    }

    function n(t) {
        o(p[t - 1])
    }

    function o(t) {
        h = t;
        var e = h + "";
        s(e), l.find(".power-assistant-kWh").change()
    }

    function s(t) {
        var e = ("" + t).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function (t) {
            return t + "."
        });
        l.find(".power-assistant-kWh").val(e)
    }

    function r(r, f) {
        var m = f;
        if (l = r, l.html(HandlebarsTemplates.powerAssistant({
                items: [1, 2, 3, 4, 5, 6],
                hiddenOnLoad: !l.data("active")
            })), u = l.find(".alert"), a = l.find(".power-assistant-persons-slider"), a.slider({
                min: 1,
                max: 6,
                value: m,
                tooltip: "hide"
            }), a.on("slideStop", function (e) {
                t(e.value), n(parseInt(a.val()))
            }), l.find("input[name=power-assistant-persons-radio]").on("click", function () {
                e(parseInt(this.value)), n(parseInt(a.val()))
            }), l.find(".power-assistant-kWh").on("change", function () {
                var t = $(this), e = parseInt(t.val().replace(/[,\,.]/g, ""));
                isNaN(e) ? e = h : (h = e, i(e < p[1] ? 1 : e < p[2] ? 2 : e < p[3] ? 3 : e < p[4] ? 4 : e < p[5] ? 5 : 6)), s("" + e)
            }), d = l.find(".power-assistant-zip"), c = new LifeStrom.ZipcodeHelper, c.initInput(d), d.on("focus", function () {
                u.addClass("hidden"), u.text("")
            }), l.find(".power-assistant-form").on("submit", function (t) {
                t.preventDefault();
                var e = d.val().split(" ")[0], i = d.val().split(" ").slice(1).join(" "), n = l.find(".power-assistant-kWh").val();
                return parseInt(n.replace(".", "")) > 1e5 ? (u.removeClass("hidden"), void u.text("Der Jahresverbrauch darf nicht mehr als 100.000 kWh betragen.")) : e.match(/^[0-9]{5}$/) ? ($.jStorage.set("pk[productType]", "Strom"), $.jStorage.set("pk[zip]", e), i && $.jStorage.set("pk[city]", i), $.jStorage.set("pk[consumption][Strom]", n), $.jStorage.set("pk[Strom][showProductAttributesFilter]", "true"), $.jStorage.set("[livingArea]", "100"), $.jStorage.set("ls_isEco", "1" == r.data("eco") ? !0 : !1), void(window.top.location.href = "/strom/tarif")) : (u.removeClass("hidden"), void u.text("Bitte g\xfcltige Postleitzahl eingeben."))
            }), i(m), $.jStorage.get("pk[consumption][Strom]", !1)) {
            var g = parseInt($.jStorage.get("pk[consumption][Strom]").replace(/[,\,.]/g, ""));
            o(isNaN(g) ? p[m - 1] : g)
        } else n(m);
        $.jStorage.get("pk[zip]", !1) && $.jStorage.get("pk[city]", !1) && d.val($.jStorage.get("pk[zip]") + " " + $.jStorage.get("pk[city]"))
    }

    var a, l, c, d, u, p = [1500, 2500, 3e3, 4e3, 5e3, 7e3], h = 0;
    return {init: r}
}, $(function () {
    if ($("#power-assistant").length > 0) {
        var t = new LifeStrom.PowerAssistant;
        t.init($("#power-assistant"), 2)
    }
});
var LifeStrom = LifeStrom || {};
LifeStrom.ZipcodeHelper = function () {
    function t(e) {
        e.one("keyup", function (i) {
            var n, o = i.keyCode || i.which, s = e.closest(".zip-code-suggestion");
            if (38 == o)i.preventDefault(), n = s.prev().find("a"), 0 == n.length && (n = s.siblings().last().find("a")); else {
                if (40 != o)return void t(e);
                i.preventDefault(), n = s.next().find("a"), 0 == n.length && (n = s.siblings().first().find("a"))
            }
            t(n), n.focus()
        }), e.one("keydown", function (i) {
            var n = i.keyCode || i.which;
            9 == n && ($focus = e.closest(".zip-code-suggestion").next().find("a"), t($focus))
        })
    }

    function e(e) {
        var i, n = new LifeStrom.EonAPI;
        e.on("keyup", function (o) {
            var s = o.keyCode || o.which;
            if (e.next(".center-spinner").remove(), 38 != s && 40 != s) {
                e.next(".zip-code-suggestions").remove();
                var r = this.value;
                r.length >= 3 && (clearTimeout(i), i = setTimeout(function () {
                    e.after(HandlebarsTemplates.loading), n.zipcodes(r).then(function (t) {
                        if (t.zipCodes.length > 0) {
                            var i, n;
                            e.next(".center-spinner").remove(), e.next(".zip-code-suggestions").remove(), e.after(HandlebarsTemplates.zipcodeSuggestions({zipcodes: t.zipCodes})), i = e.next(".zip-code-suggestions"), n = i.find(".zip-code-suggestion a"), n.on("click", function (t) {
                                t.preventDefault(), i.hide(), n.off(), e.val($(this).text())
                            })
                        }
                    })
                }, 500))
            } else if (e.next(".zip-code-suggestions").length > 0) {
                var a, l = e.next(".zip-code-suggestions"), c = l.find(".zip-code-suggestion a");
                38 == s ? a = c.last() : 40 == s && (a = c.first()), t(a), a.focus()
            }
        }), e.on("keydown", function (i) {
            var n = i.keyCode || i.which;
            if (9 == n) {
                var o = e.next(".zip-code-suggestions"), s = o.find(".zip-code-suggestion a");
                t(s.first())
            }
        })
    }

    return {initInput: e}
}, $(function () {
    if (outdatedBrowser({
            bgColor: "#fdf79f",
            color: "#333",
            lowerThan: "transform",
            languagePath: ""
        }), $('a[href="/erdgas"]').length > 0) {
        var t = $('a[href="/erdgas"]').first();
        t.parent().addClass("menu-item-gas")
    }
    if ($('a[href="/strom"]').length > 0) {
        var t = $('a[href="/strom"]').first();
        t.parent().addClass("menu-item-energy")
    }
    $(".nav-tabs a").on("click", function (t) {
        t.preventDefault(), $(this).tab("show")
    });
    for (var e = 0; e < $(".same-height-row").length; e++)$($(".same-height-row")[e]).find(".col").matchHeight();
    for (var e = 0; e < $(".collapse-group").length; e++) {
        var i = "collapse-group_" + e, n = $($(".collapse-group")[e]), o = n.find(".panel");
        n.attr("id", i);
        for (var s = 0; s < o.length; s++) {
            var r = "collapse_" + e + "_" + s, a = $(o[s]), l = a.find(".collapse-toggle"), c = a.find(".collapse");
            c.attr("id", r), l.attr("aria-expanded", "false").attr("aria-controls", r).on("click", function (t) {
                t.preventDefault();
                var e = $(this).closest(".collapse-group").attr("id");
                $(this).closest(".panel").find(".collapse").collapse({parent: "#" + e, toggle: !1}).collapse("toggle")
            }), c.on("show.bs.collapse", function () {
                $(this).closest(".panel").find(".collapse-toggle").addClass("in")
            }), c.on("hide.bs.collapse", function () {
                $(this).closest(".panel").find(".collapse-toggle").removeClass("in")
            })
        }
    }
    $(".faq .collapse").on("shown.bs.collapse", function () {
        $("html, body").animate({scrollTop: $(this).prev("h3").offset().top - 120}, 500)
    }), $("body").append(HandlebarsTemplates.modal), $("#modal").on("hidden.bs.modal", function () {
        $(this).find(".modal-content").empty()
    })
}), function () {
}.call(this), function () {
}.call(this), function () {
}.call(this), function () {
}.call(this);
var LifeStrom = LifeStrom || {};
LifeStrom.EonAPI = function () {
    function t(t) {
        return $.when($.ajax({
            type: "GET",
            url: LifeStrom.API_ADDRESS + t,
            xhrFields: {withCredentials: !1},
            beforeSend: function (t) {
                t.setRequestHeader("Authorization", "Bearer " + LifeStrom.API_TOKEN)
            }
        }))
    }

    function e(e) {
        return $.when(t("/zipcodes/1.2?clientId=psd&limit=10&query=" + encodeURIComponent(e)))
    }

    function i(e, i, n, o, s, r) {
        return $.when(t("/product/1.2?clientId=psd&productType=" + encodeURIComponent(n) + "&consumption=" + o + "&zipCode=" + s + "&city=" + encodeURIComponent(r) + "&productName=" + encodeURIComponent(e) + "&productId=" + i + "&customerType=pk&tariffType=et"))
    }

    return {callAPI: t, zipcodes: e, product: i}
};
var webtrekkConfig = webtrekkConfig || {
        trackId: "609973371197871",
        trackDomain: "lifestromde01.wt-eu02.net",
        domain: "REGEXP:^(.*lifestrom\\.de)$",
        cookie: "1",
        contentId: ""
    }, webtrekkUnloadObjects = webtrekkUnloadObjects || [], webtrekkLinktrackObjects = webtrekkLinktrackObjects || [], webtrekkHeatmapObjects = webtrekkHeatmapObjects || [], webtrekkV3 = function (g) {
    var u = function (t, e) {
        "1" != f.cookie || f.optOut || f.deactivatePixel || f.firstParty();
        var i = e ? e : f.formObject && "noForm" != t ? "form" : "link";
        0 != f.beforeUnloadPixel ? f.beforeUnloadPixel() : "form" == i && f.executePlugin(f.getPluginConfig("form", "before"));
        var n = "";
        if (f.config.linkId && (n += "&ct=" + f.wtEscape(f.maxlen(f.wtUnescape(f.config.linkId), 255)))) {
            f.linktrackOut && (n += "&ctx=1");
            var o = f.ccParams;
            "string" == typeof o && "" != o && (n += o)
        }
        if (f.wtEp)if (f.wtEpEncoded)n += f.wtEp; else if (o = f.wtEp, "string" == typeof o && "" != o)for (var o = o.split(/;/), s = 0; s < o.length; s++)if (f.wtTypeof(o[s])) {
            var r = o[s].split(/=/);
            f.checkSC("custom") && (r[1] = f.decrypt(r[1])), r[1] = f.wtEscape(r[1]), n += "&" + r[0] + "=" + r[1]
        }
        "noForm" != t && (n += f.checkFormTracking()), "" != n && (f.quicksend(f.wtEscape(f.contentId.split(";")[0]) + ",1," + f.baseparams(), n), f.config.linkId = "", f.ccParams = "", f.wtEp = ""), 0 != f.afterUnloadPixel ? f.afterUnloadPixel() : "form" == i && f.executePlugin(f.getPluginConfig("form", "after"))
    }, q = function (t) {
        var e, i, n = document.getElementById(f.heatmapRefpoint);
        if (i = e = n && null !== n ? 0 : -1, n && null !== n && f.wtTypeof(n.offsetLeft))for (; n;)e += 0 <= n.offsetLeft ? n.offsetLeft : 0, i += 0 <= n.offsetTop ? n.offsetTop : 0, n = n.offsetParent;
        var o = n = 0;
        t || (t = window.event), t.pageX || t.pageY ? (n = t.pageX, o = t.pageY) : (t.clientX || t.clientY) && (n = t.clientX, o = t.clientY, f.isIE && (0 < document.body.scrollLeft || 0 < document.body.scrollTop ? (n += document.body.scrollLeft, o += document.body.scrollTop) : (0 < document.documentElement.scrollLeft || 0 < document.documentElement.scrollTop) && (n += document.documentElement.scrollLeft, o += document.documentElement.scrollTop))), t = 0, t = f.isIE ? document.body.clientWidth : self.innerWidth - 16;
        var s = !0;
        (n >= t || !f.sentFullPixel) && (s = !1), (i >= 0 || e >= 0) && n > e && o > i && (n = "-" + (n - e), o = "-" + (o - i)), s && "1" == f.heatmap && (f.executePlugin(f.getPluginConfig("heatmap", "before")), f.quicksend(f.wtEscape(f.contentId.split(";")[0]) + "," + n + "," + o, "", "hm" + (f.fileSuffix ? ".pl" : "")), f.executePlugin(f.getPluginConfig("heatmap", "after")))
    }, r = function () {
        "undefined" != typeof wt_heatmap ? window.setTimeout(function () {
            wt_heatmap()
        }, 1e3) : ("undefined" == typeof wt_heatmap_retry && (window.wt_heatmap_retry = 0), wt_heatmap_retry++, 60 > wt_heatmap_retry && window.setTimeout(function () {
            r()
        }, 1e3))
    }, l = function () {
        "undefined" != typeof wt_overlay ? window.setTimeout(function () {
            wt_overlay()
        }, 1e3) : ("undefined" == typeof wt_overlay_retry && (window.wt_overlay_retry = 0), wt_overlay_retry++, 60 > wt_overlay_retry && window.setTimeout(function () {
            l()
        }, 1e3))
    }, s = function (t, e) {
        var i = f.urlParam(location.href, t, !1), n = f.urlParam(location.href, "wt_t", !1), o = (new Date).getTime(), s = RegExp(e), n = n ? parseInt(n) + 9e5 : o - 9e5;
        return i && s.test(i) && n > o ? i : !1
    }, n = function (t) {
        if (t && "2" == t.substring(0, 1)) {
            t = parseInt(t.substring(1, 11) + "000"), t = new Date(t);
            var e = t.getFullYear() + "", e = e + (9 > t.getMonth() ? "0" : ""), e = e + (t.getMonth() + 1), e = e + (9 > t.getDate() ? "0" : ""), e = e + t.getDate(), e = e + (9 > t.getHours() ? "0" : ""), e = e + t.getHours(), e = e + (9 > t.getMinutes() ? "0" : "");
            return e += t.getMinutes()
        }
        return ""
    }, h = webtrekkConfig, f = this;
    g || (g = h), this.defaultAttribute = "contentId linkId trackId trackDomain domain linkTrack linkTrackParams linkTrackPattern linkTrackReplace linkTrackDownloads linkTrackIgnorePattern customParameter crmCategory urmCategory customClickParameter customSessionParameter customTimeParameter customCampaignParameter customEcommerceParameter orderValue currency orderId product productCost productQuantity productCategory productStatus couponValue customerId contentGroup mediaCode mediaCodeValue mediaCodeCookie campaignId campaignAction internalSearch customSid customEid cookieDomain cookieEidTimeout cookieSidTimeout forceNewSession xwtip xwtua xwtrq xwteid xwtstt mediaCodeFrames framesetReferrer forceHTTPS secureConfig heatmap pixelSampling form formFullContent formAnonymous disableOverlayView beforeSendinfoPixel afterSendinfoPixel beforeUnloadPixel afterUnloadPixel xlc xlct xlcv ignorePrerendering isIE isOpera isSafari isChrome isFirefox email emailRID emailOptin firstName lastName telefon gender birthday birthdayJ birthdayM birthdayD country city postalCode street streetNumber validation fileSuffix".split(" "), this.cookie = g.cookie ? g.cookie : h.cookie ? h.cookie : "3", this.optoutName = g.optoutName ? g.optoutName : h.optoutName ? h.optoutName : "webtrekkOptOut", this.paramFirst = g.paramFirst ? g.paramFirst : h.paramFirst ? h.paramFirst : "", this.maxRequestLength = g.maxRequestLength ? g.maxRequestLength : h.maxRequestLength ? h.maxRequestLength : 7168, this.plugins = g.plugins && "" != g.plugins ? g.plugins : h.plugins && "" != h.plugins ? h.plugins : "Adobe Acrobat;Windows Media Player;Shockwave Flash;RealPlayer;QuickTime;Java;Silverlight".split(";"), "string" == typeof this.plugins && (this.plugins = this.plugins.split(";")), this.heatmapRefpoint = g.heatmapRefpoint ? g.heatmapRefpoint : h.heatmapRefpoint ? h.heatmapRefpoint : "wt_refpoint", this.linkTrackAttribute = g.linkTrackAttribute ? g.linkTrackAttribute : h.linkTrackAttribute ? h.linkTrackAttribute : "name", this.delayLinkTrack = g.delayLinkTrack ? g.delayLinkTrack : h.delayLinkTrack ? h.delayLinkTrack : !1, this.delayLinkTrackTime = g.delayLinkTrackTime ? g.delayLinkTrackTime : h.delayLinkTrackTime ? h.delayLinkTrackTime : 200, this.noDelayLinkTrackAttribute = g.noDelayLinkTrackAttribute ? g.noDelayLinkTrackAttribute : h.noDelayLinkTrackAttribute ? h.noDelayLinkTrackAttribute : !1, this.formAttribute = g.formAttribute ? g.formAttribute : h.formAttribute ? h.formAttribute : "name", this.formFieldAttribute = g.formFieldAttribute ? g.formFieldAttribute : h.formFieldAttribute ? h.formFieldAttribute : "name", this.formValueAttribute = g.formValueAttribute ? g.formValueAttribute : h.formValueAttribute ? h.formValueAttribute : "value", this.formFieldDefaultValue = g.formFieldDefaultValue ? g.formFieldDefaultValue : h.formFieldDefaultValue ? h.formFieldDefaultValue : {}, this.formPathAnalysis = g.formPathAnalysis ? g.formPathAnalysis : h.formPathAnalysis ? h.formPathAnalysis : !1, this.reporturl = g.reporturl ? g.reporturl : h.reporturl ? h.reporturl : "report2.webtrekk.de/cgi-bin/wt", this.updateCookie = g.updateCookie ? g.updateCookie : h.updateCookie ? h.updateCookie : !0, this.executePluginFunction = g.executePluginFunction ? g.executePluginFunction : h.executePluginFunction ? h.executePluginFunction : "", this.linktrackOut = this.cookieOne = this.sampleCookieString = this.lastVisitContact = this.firstVisitContact = this.eid = this.optOut = this.deactivateRequest = this.deactivatePixel = !1, this.linktrackNamedlinksOnly = !0, this.sentFullPixel = this.ccParams = !1, this.sentCampaignIds = {}, this.config = this.browserLang = this.formSubmit = this.formFocus = this.formName = this.formObject = this.gatherFormsP = this.overlayOn = this.heatmapOn = this.trackingSwitchMediaCodeTimestamp = this.trackingSwitchMediaCodeValue = this.trackingSwitchMediaCode = this.wtEpEncoded = this.wtEp = !1, this.unloadInstance = webtrekkUnloadObjects.length, this.plugin = {}, this.heatmapCounter = this.formCounter = this.linkCounter = this.clickCounter = this.pageCounter = 0, this.browserLang = !1, "string" == typeof navigator.language ? this.browserLang = navigator.language.substring(0, 2) : "string" == typeof navigator.userLanguage && (this.browserLang = navigator.userLanguage.substring(0, 2)), this.jsonPara = {
        ck: ["customClickParameter", {}],
        cp: ["customParameter", {}],
        cs: ["customSessionParameter", {}],
        ce: ["customTimeParameter", {}],
        cb: ["customEcommerceParameter", {}],
        vc: ["crmCategory", {}],
        uc: ["urmCategory", {}],
        ca: ["productCategory", {}],
        cc: ["customCampaignParameter", {}],
        cg: ["contentGroup", {}],
        ct: ["linkId", ""],
        ov: ["orderValue", ""],
        cr: ["currency", ""],
        oi: ["orderId", ""],
        ba: ["product", ""],
        co: ["productCost", ""],
        qn: ["productQuantity", ""],
        st: ["productStatus", ""],
        cd: ["customerId", ""],
        is: ["internalSearch", ""],
        mc: ["campaignId", ""],
        mca: ["campaignAction", ""]
    }, this.generateDefaultConfig = function (t, e) {
        for (var i = 0; i < this.defaultAttribute.length; i++) {
            var n = this.defaultAttribute[i];
            this[n] = t[n] ? t[n] : e[n] ? e[n] : !1
        }
    }, this.generateDefaultConfig(g, h), this.campaignAction = g.campaignAction ? g.campaignAction : h.campaignAction ? h.campaignAction : "click", "undefined" == typeof this.safetag && (this.safetag = !1), "undefined" == typeof this.safetagInProgress && (this.safetagInProgress = !1), "undefined" == typeof this.safetagParameter && (this.safetagParameter = {}), "undefined" == typeof this.update && (this.update = function () {
    }), this.saveSendinfoArguments = [], this.safetagTimeoutStarted = !1, this.version = 405, this.getJSON = function (a) {
        if (a && "{" == a.charAt(0) && "}" == a.charAt(a.length - 1))try {
            return eval("(" + a + ")")
        } catch (b) {
        }
        return null
    }, this.parseJSON = function (t, e) {
        for (var i in t) {
            var n = i;
            "object" == typeof t[n] ? ("undefined" != typeof this.jsonPara[n] && "object" != typeof this.config[this.jsonPara[n][0]] && (this.config[this.jsonPara[n][0]] = {}), this.parseJSON(t[n], n)) : e ? (isNaN(parseInt(n)) || 500 > parseInt(n)) && (this.config[this.jsonPara[e][0]][n] = t[n]) : "undefined" != typeof this.jsonPara[n] && (this.config[this.jsonPara[n][0]] = t[n])
        }
    }, this.getMappingParam = function (t) {
        var e, i, n, o = t.split("");
        for (e = 0; e < o.length; e++)if (!isNaN(parseInt(o[e]))) {
            i = e;
            break
        }
        return i ? (o = t.substr(0, i), n = t.substr(i, t.length - 1)) : o = t, {
            mapping: "undefined" != typeof this.jsonPara[o] ? this.jsonPara[o][0] : !1,
            index: n ? n : !1
        }
    }, this.getConfig = function (t) {
        for (var e = {}, i = 0; i < this.defaultAttribute.length; i++) {
            var n = this.defaultAttribute[i];
            e[n] = t ? !1 : this[n]
        }
        return e
    }, this.getRequestCounter = function (t, e) {
        var i = 0;
        return "before" == e && i++, "link" == t ? this.linkCounter += i : "click" == t ? this.clickCounter += i : "page" == t ? this.pageCounter += i : "heatmap" == t ? this.heatmapCounter += i : "form" == t ? this.formCounter += i : 0
    }, this.getPluginConfig = function (t, e) {
        return {instance: this, mode: t, type: e, requestCounter: this.getRequestCounter(t, e)}
    }, this.checkAsynchron = function (t, e, i, n) {
        "undefined" != typeof window[t] ? e && e(!0, i) : 0 >= n ? e && e(!1, i) : window.setTimeout(function () {
            i.checkAsynchron(t, e, i, n - 100)
        }, 100)
    }, this.loadAsynchron = function (t, e, i, n) {
        this.include(t) && this.checkAsynchron(e, i ? i : !1, this, n ? n : 2e3)
    }, this.include = function (t) {
        if (!document.createElement)return !1;
        var e = document.getElementsByTagName("head").item(0), i = document.createElement("script");
        return i.setAttribute("language", "javascript"), i.setAttribute("type", "text/javascript"), i.setAttribute("src", t), e.appendChild(i), !0
    }, this.executePlugin = function (t) {
        if (this.executePluginFunction && "string" == typeof this.executePluginFunction) {
            this.epf = !1;
            for (var e = this.executePluginFunction.split(";"), i = 0; i < e.length; i++)e[i] && "function" == typeof window[e[i]] && (this.epf = window[e[i]], this.epf(t))
        }
    }, this.indexOf = function (t, e, i) {
        return t.indexOf(e, i ? i : 0)
    }, this.wtTypeof = function (t) {
        return "undefined" != typeof t ? 1 : 0
    }, this.wtLength = function (t) {
        return "undefined" != typeof t ? t.length : 0
    }, this.getAttribute = function (t, e) {
        return "string" == typeof t.getAttribute(e) ? t.getAttribute(e) : "object" == typeof t.getAttribute(e) && "object" == typeof t.attributes[e] && null != t.attributes[e] ? t.attributes[e].nodeValue : ""
    }, this.getTimezone = function () {
        return Math.round(-1 * ((new Date).getTimezoneOffset() / 60))
    }, this.wtHref = function () {
        return "undefined" != typeof window.wtLocationHref ? window.wtLocationHref : this.wtLocation().href
    }, this.wtLocation = function () {
        var t = document.location;
        if (!document.layers && document.getElementById)try {
            t = top.document.location
        } catch (e) {
            t = document.location
        } else t = top.document.location;
        return t
    }, this.checkBrowser = function () {
        this.isIE = this.indexOf(navigator.appName, "Microsoft") ? !1 : !0, this.isIE || (this.isOpera = this.indexOf(navigator.appName, "Opera") ? !1 : !0, this.isOpera || (this.isSafari = -1 != navigator.vendor.toLowerCase().indexOf("apple"), this.isChrome = -1 != navigator.vendor.toLowerCase().indexOf("google"), this.isSafari || this.isChrome || (this.isFirefox = -1 != navigator.userAgent.toLowerCase().indexOf("firefox"))))
    }, this.checkBrowser(), this.url2contentId = function (t) {
        return t ? (t = /\/\/(.*)/.exec(t), 1 > t.length ? "no_content" : t[1].split("?")[0].replace(/\./g, "_").replace(/\//g, ".").replace(/\.{2,}/g, ".").toLowerCase().split(";")[0]) : "no_content"
    }, this.contentId = g.contentId ? g.contentId : this.url2contentId(document.location.href), this.registerEvent = function (t, e, i) {
        t.addEventListener ? ("webkitvisibilitychange" == e && this.unregisterEvent(t, e, i), t.addEventListener(e, i, !1)) : t.attachEvent && ("beforeunload" != e && "webkitvisibilitychange" != e || this.unregisterEvent(t, e, i), t.attachEvent("on" + e, i))
    }, this.unregisterEvent = function (t, e, i) {
        t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && t.detachEvent("on" + e, i)
    }, this.maxlen = function (t, e) {
        return t && t.length > e ? t.substring(0, e - 1) : t
    }, this.wtEscape = function (t) {
        try {
            return encodeURIComponent(t)
        } catch (e) {
            return escape(t)
        }
    }, this.wtUnescape = function (t) {
        try {
            return decodeURIComponent(t)
        } catch (e) {
            return unescape(t)
        }
    }, this.decrypt = function (t) {
        var e = "";
        if (t)try {
            e = this.wtUnescape(t.replace(/([0-9a-fA-F][0-9a-fA-F])/g, "%$1"))
        } catch (i) {
        }
        return e
    }, this.checkSC = function (t) {
        if ("string" != typeof this.secureConfig)return !1;
        for (var e = this.secureConfig.split(";"), i = 0; i < e.length; i++)if (e[i] == t)return !0;
        return !1
    }, this.zeroPad = function (t, e) {
        var i = "000000000000" + t;
        return i.substring(i.length - e, i.length)
    }, this.generateEid = function () {
        return "2" + this.zeroPad(Math.floor((new Date).getTime() / 1e3), 10) + this.zeroPad(Math.floor(1e6 * Math.random()), 8)
    }, this.getexpirydate = function (t) {
        var e = new Date, i = e.getTime();
        return e.setTime(i + 6e4 * t), e.toUTCString()
    }, this.setCookie = function (t, e, i) {
        var n = location.hostname;
        -1 == n.search(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/) && (n = location.hostname.split("."), n = n[n.length - 2] + "." + n[n.length - 1]);
        var o = !1;
        if (this.cookieDomain)for (var s = this.cookieDomain.split(";"), r = 0; r < s.length; r++)if (-1 != location.hostname.indexOf(s[r])) {
            n = s[r], o = !0;
            break
        }
        t = o && "undefined" != typeof i && i ? t + "=" + escape(e) + ";domain=" + n + ";path=/;expires=" + this.getexpirydate(i) : o ? t + "=" + escape(e) + ";path=/;domain=" + n : 3 > n.split(".")[0].length && "undefined" != typeof i && i ? t + "=" + escape(e) + ";path=/;expires=" + this.getexpirydate(i) : 3 > n.split(".")[0].length ? t + "=" + escape(e) + ";path=/" : "undefined" != typeof i && i ? t + "=" + escape(e) + ";domain=" + n + ";path=/;expires=" + this.getexpirydate(i) : t + "=" + escape(e) + ";path=/;domain=" + n, document.cookie = t
    }, this.getCookie = function (t) {
        for (var e = document.cookie.split(";"), i = 0; i < e.length; i++) {
            var n = e[i].substr(0, e[i].indexOf("=")), o = e[i].substr(e[i].indexOf("=") + 1), n = n.replace(/^\s+|\s+$/g, "");
            if (n == t)return unescape(o)
        }
        return ""
    }, (this.optOut = this.getCookie(this.optoutName) ? !0 : !1) && (this.deactivatePixel = !0), this.urlParam = function (t, e, i) {
        if (!t || null === t || "undefined" == typeof t)return i;
        var n = [];
        for (0 < t.indexOf("?") && (n = t.split("?")[1].replace(/&amp;/g, "&").split("#")[0].split("&")), t = 0; t < n.length; t++)if (0 == n[t].indexOf(e + "="))return this.wtUnescape(n[t].substring(e.length + 1).replace(/\+/g, "%20"));
        return i
    }, this.allUrlParam = function (a, b) {
        if (this.mediaCodeFrames && "" != this.mediaCodeFrames) {
            for (var c = this.mediaCodeFrames.split(";"), d = 0; d < c.length; d++) {
                var e = !1;
                try {
                    e = eval(c[d])
                } catch (f) {
                }
                if (e && e != top && e.location && (e = this.urlParam(e.location.href, a, b), e != b))return e
            }
            return b
        }
        c = "";
        try {
            c = top.location.href
        } catch (k) {
            c = document.location.href
        }
        return this.urlParam(c, a, b)
    }, this.plugInArray = function (t, e) {
        if ("object" != typeof t)return !1;
        for (var i = 0; i < t.length; i++) {
            var n = RegExp(t[i].toLowerCase(), "g");
            if (-1 != e.toLowerCase().search(n))return t[i]
        }
        return !1
    }, this.quicksend = function (t, e, i) {
        if (!this.trackDomain || !this.trackId || this.deactivatePixel || this.deactivateRequest)this.deactivateRequest = !1; else {
            if (i || (i = "wt" + (this.fileSuffix ? ".pl" : "")), "undefined" == typeof this.requestTimeout && (this.requestTimeout = 5), "1" == this.cookie && (e = "&eid=" + this.eid + "&one=" + (this.cookieOne ? "1" : "0") + "&fns=" + (this.forceNewSession ? "1" : "0") + e), "1" != this.cookie && (this.wtTypeof(this.cookieEidTimeout) || this.wtTypeof(this.cookieSidTimeout)) && (this.wtTypeof(this.cookieEidTimeout) && "" != this.cookieEidTimeout && (e = "&cet=" + this.cookieEidTimeout + e), this.wtTypeof(this.cookieSidTimeout) && "" != this.cookieSidTimeout && (e = "&cst=" + this.cookieSidTimeout + e)), 0 < this.pixelSampling && (e += "&ps=" + this.pixelSampling), e = "&tz=" + this.getTimezone() + e, t = "//" + this.trackDomain + "/" + this.trackId + "/" + i + "?p=" + this.version + "," + t + e + "&eor=1", !this.ignorePrerendering && this.isChrome && "undefined" != typeof document.webkitHidden && ("object" != typeof this.prerendering && (this.prerendering = []), document.webkitHidden)) {
                this.prerendering.push(t);
                var n = this;
                return void this.registerEvent(document, "webkitvisibilitychange", function () {
                    n.sendPrerendering()
                })
            }
            this.sendPixel(t, i), "hm" != i && "hm.pl" != i && (this.forceNewSession = this.cookieOne = !1, this.sentFullPixel = 1)
        }
    }, this.sendPrerendering = function () {
        if (!document.webkitHidden) {
            for (var t = 0; t < this.prerendering.length; t++)this.sendPixel(this.prerendering[t]);
            this.prerendering = []
        }
    }, this.sendPixel = function (t, e) {
        t = this.maxlen(t, this.maxRequestLength), this.isFirefox ? this.sendPixelElement(t, e) : this.sendPixelImage(t, e)
    }, this.sendPixelImage = function (t, e) {
        var i = "https:" == document.location.protocol ? "https:" : "http:";
        if (this.forceHTTPS && (i = "https:"), 0 !== t.search(/https:|http:/) && (t = i + t), ("hm" == e || "hm.pl" == e) && (t += "&hm_ts=" + (new Date).getTime()), "function" != typeof n)var n = function () {
            return document.createElement("img")
        };
        if ("undefined" == typeof o)var o = [];
        i = o.length, o[i] = new n, o[i].onload = function () {
            return !1
        }, o[i].src = t
    }, this.createPixelElement = function (t) {
        t = t.replace(/'/g, "%27");
        var e = document.createElement("div");
        return e.style.width = "0px", e.style.height = "0px", e.style.backgroundImage = "url('" + t + "')", window.setTimeout(function () {
            e.parentElement.removeChild(e)
        }, 5e3), e
    }, this.sendPixelElement = function (t, e) {
        var i = "https:" == document.location.protocol ? "https:" : "http:";
        this.forceHTTPS && (i = "https:"), 0 !== t.search(/https:|http:/) && (t = i + t), ("hm" == e || "hm.pl" == e) && (t += "&hm_ts=" + (new Date).getTime()), ("undefined" == typeof this.sendPixelObject || null === this.sendPixelObject) && ((i = document.getElementById("webtrekk-image")) && null !== i ? this.sendPixelObject = i : (this.sendPixelObject = document.createElement("div"), this.sendPixelObject.id = "webtrekk-image", this.sendPixelObject.style.width = "0px", this.sendPixelObject.style.height = "0px", this.sendPixelObject.style.overflow = "hidden", i = null, "object" == typeof document.body ? i = document.body : "object" == typeof document.getElementsByTagName("body")[0] && (i = document.getElementsByTagName("body")[0]), i && null !== i ? i.appendChild(this.sendPixelObject) : (this.sendPixelObject = null, this.sendPixelImage(t, "wt" + (this.fileSuffix ? ".pl" : ""))))), null !== this.sendPixelObject && this.sendPixelObject.appendChild(this.createPixelElement(t))
    }, this.checkCustomParameter = function (t, e) {
        var i = "";
        if ("object" == typeof t)for (var n in t) {
            var o = n;
            !isNaN(parseInt(o)) && this.wtTypeof(t[o]) && "string" == typeof t[o] && "" !== t[o] && (this.checkSC("custom") && (t[o] = this.decrypt(t[o])), -1 == this.paramFirst.indexOf(e + o + ";") && (i += "&" + e + o + "=" + this.wtEscape(t[o])))
        }
        return i
    }, this.send = function (t, e, i) {
        ("link" == e || "click" == e) && (this.config.linkId = t), this.config.contentId = this.config.contentId ? this.config.contentId : this.contentId;
        var n = (!e || "link" != e && "click" != e) && t ? t : this.config.contentId;
        n || (n = "no_content"), t = "";
        var n = this.wtEscape(n) + ",1,", n = n + this.baseparams(), o = navigator.plugins.length, r = "";
        if (o > 0) {
            for (var a = [], l = 0; o > l; l++)navigator.plugins && "Microsoft Internet Explorer" != navigator.appName && (r = "Shockwave Flash" == navigator.plugins[l].name ? navigator.plugins[l].description : navigator.plugins[l].name, (r = this.plugInArray(this.plugins, r)) && !this.plugInArray(a, r) && a.push(r));
            r = a.join("|")
        }
        if (this.paramFirst)for (o = this.paramFirst.split(";"), l = 0; l < o.length; l++) {
            var c = this.getMappingParam(o[l]), a = c.mapping, c = c.index;
            a && (c ? this.config[a] && "undefined" != typeof this.config[a][c] && this.config[a][c] && (t += "&" + o[l] + "=" + this.wtEscape(this.config[a][c])) : this.config[a] && (t += "&" + o[l] + "=" + this.wtEscape(this.config[a])))
        }
        if ("string" == typeof i && "" !== i)for (var d = i.split(/;/), l = 0; l < d.length; l++)this.wtTypeof(d[l]) && (i = d[l].split(/=/), this.checkSC("custom") && (i[1] = this.decrypt(i[1])), i[1] = this.wtEscape(i[1]), t += "&" + i[0] + "=" + i[1]); else {
            this.wtEpEncoded = !1, i = this.checkCustomParameter(this.config.customParameter, "cp"), o = this.checkCustomParameter(this.config.customSessionParameter, "cs"), a = this.checkCustomParameter(this.config.customTimeParameter, "ce"), this.config.couponValue && (this.config.customEcommerceParameter || (this.config.customEcommerceParameter = {}), this.config.customEcommerceParameter[563] = this.config.couponValue), c = this.checkCustomParameter(this.config.customEcommerceParameter, "cb"), this.config.orderValue && -1 == this.paramFirst.indexOf("ov;") && (t = this.checkSC("order") ? t + ("&ov=" + this.wtEscape(this.decrypt(this.config.orderValue))) : t + ("&ov=" + this.wtEscape(this.config.orderValue))), this.config.currency && -1 == this.paramFirst.indexOf("cr;") && (t = this.checkSC("order") ? t + ("&cr=" + this.wtEscape(this.decrypt(this.config.currency))) : t + ("&cr=" + this.wtEscape(this.config.currency))), this.config.orderId && -1 == this.paramFirst.indexOf("oi;") && (t += "&oi=" + this.wtEscape(this.config.orderId)), this.config.product && (-1 == this.paramFirst.indexOf("ba;") && (t += "&ba=" + this.wtEscape(this.config.product)), this.config.productCost && -1 == this.paramFirst.indexOf("co;") && (t += "&co=" + this.wtEscape(this.config.productCost)), this.config.productQuantity && -1 == this.paramFirst.indexOf("qn;") && (t += "&qn=" + this.wtEscape(this.config.productQuantity)), t += this.checkCustomParameter(this.config.productCategory, "ca"), this.config.productStatus && -1 == this.paramFirst.indexOf("st;") && (t += "&st=" + this.wtEscape(this.config.productStatus))), l = s("wt_cd", "(.*)"), this.config.customerId || (this.config.customerId = l), this.config.customerId && -1 == this.paramFirst.indexOf("cd;") && (t += "&cd=" + this.wtEscape(this.config.customerId)), t += this.checkCustomParameter(this.config.crmCategory, "vc"), !this.config.birthday && this.config.birthdayJ && this.config.birthdayM && this.config.birthdayD && (this.config.birthday = this.config.birthdayJ + this.config.birthdayM + this.config.birthdayD), this.config.telefon && (this.config.telefon = this.config.telefon.replace(/\W|_/g, "")), this.config.urmCategory || (this.config.urmCategory = {}), this.config.urmCategory[700] = this.config.email, this.config.urmCategory[701] = this.config.emailRID, this.config.urmCategory[702] = this.config.emailOptin, this.config.urmCategory[703] = this.config.firstName, this.config.urmCategory[704] = this.config.lastName, this.config.urmCategory[705] = this.config.telefon, this.config.urmCategory[706] = this.config.gender, this.config.urmCategory[707] = this.config.birthday, this.config.urmCategory[708] = this.config.country, this.config.urmCategory[709] = this.config.city, this.config.urmCategory[710] = this.config.postalCode, this.config.urmCategory[711] = this.config.street, this.config.urmCategory[712] = this.config.streetNumber, this.config.urmCategory[713] = this.config.validation, t += this.checkCustomParameter(this.config.urmCategory, "uc"), this.browserLang && (t += "&la=" + this.wtEscape(this.browserLang)), t += this.checkCustomParameter(this.config.contentGroup, "cg");
            var p = "";
            this.config.campaignId && (this.config.campaignId in this.sentCampaignIds ? this.config.campaignId = "ignore%3Dignore" : this.sentCampaignIds[this.config.campaignId] = !0, -1 == this.paramFirst.indexOf("mc;") && (t += "&mc=" + this.wtEscape(this.config.campaignId)), -1 == this.paramFirst.indexOf("mca;") && (t += "&mca=" + (this.config.campaignAction ? this.config.campaignAction.substring(0, 1) : "c"))), p += this.checkCustomParameter(this.config.customCampaignParameter, "cc"), this.trackingSwitchMediaCode && (t += "&tmc=" + this.wtEscape(this.trackingSwitchMediaCode)), this.trackingSwitchMediaCodeValue && (t += "&tmcv=" + this.wtEscape(this.trackingSwitchMediaCodeValue)), this.trackingSwitchMediaCodeTimestamp && (t += "&tmct=" + this.wtEscape(this.trackingSwitchMediaCodeTimestamp)), "object" == typeof wt_ts && "undefined" != typeof wt_ts.trackingSwitchMediaCode && (t += "&tmc=" + this.wtEscape(wt_ts.trackingSwitchMediaCode)), "object" == typeof wt_ts && "undefined" != typeof wt_ts.trackingSwitchMediaCodeValue && (t += "&tmcv=" + this.wtEscape(wt_ts.trackingSwitchMediaCodeValue)), "object" == typeof wt_ts && "undefined" != typeof wt_ts.trackingSwitchMediaCodeTimestamp && (t += "&tmct=" + this.wtEscape(wt_ts.trackingSwitchMediaCodeTimestamp));
            var h = "";
            if ("undefined" != typeof wt_vt && (d = wt_vt), this.wtTypeof(d) || (d = this.urlParam(location.href, "wt_vt", !1)), d)for (var f = this.getCookie("wt_vt").split(";"), l = 0; l < f.length; l++)-1 != f[l].indexOf(d + "v") && (h = "&wt_vt=" + f[l].split("t")[0].split("v")[1]);
            h && (t += h), this.config.internalSearch && -1 == this.paramFirst.indexOf("is;") && (t += "&is=" + this.wtEscape(this.maxlen(this.wtUnescape(this.config.internalSearch), 255))), i && (t += i), p && (t += p), a && (t += a), c && (t += c), o && (t += o), this.wtTypeof(this.config.customSid) && "" != this.config.customSid && (t += "&csid=" + this.config.customSid), this.wtTypeof(this.config.customEid) && "" != this.config.customEid && (t += "&ceid=" + this.config.customEid), this.wtTypeof(this.config.xwtip) && "" != this.config.xwtip && (t += "&X-WT-IP=" + this.wtEscape(this.config.xwtip)), this.wtTypeof(this.config.xwtua) && "" != this.config.xwtua && (t += "&X-WT-UA=" + this.wtEscape(this.config.xwtua)), this.wtTypeof(this.config.xwtrq) && "" != this.config.xwtrq && (t += "&X-WT-RQ=" + this.wtEscape(this.config.xwtrq)), this.wtTypeof(this.xwteid) && "" != this.xwteid && (t += "&X-WT-EID=" + this.wtEscape(this.xwteid), this.xwteid = !1), this.wtTypeof(this.config.xwtstt) && "" != this.config.xwtstt && (t += "&X-WT-STT=" + this.wtEscape(this.config.xwtstt)), !this.sentFullPixel && this.firstVisitContact && (t += "&fvc=" + this.firstVisitContact), !this.sentFullPixel && this.lastVisitContact && (t += "&lvc=" + this.lastVisitContact)
        }
        t += "&pu=" + this.wtEscape(document.location.href.split("#")[0]), this.config.linkId && this.config.customClickParameter && (t += this.checkCustomParameter(this.config.customClickParameter[this.config.linkId] ? this.config.customClickParameter[this.config.linkId] : this.config.customClickParameter, "ck"), this.ccParams = !1), this.config.xlc && this.config.xlct && ("" != this.config.xlc || "" != this.config.xlct) && (d = "", d = this.config.xlcv ? this.getExtLifeCycles(this.config.xlc, this.config.xlct, this.config.xlcv) : this.getExtLifeCycles(this.config.xlc, this.config.xlct), t += d), this.config.contentId || this.config.linkId || (this.config.contentId = this.contentId, this.config.linkId = "wt_ignore"), this.config.linkId ? (this.wtEp = t, this.wtEpEncoded = !0, u("noForm", e)) : ("1" == this.cookie ? this.cookieOne && (t += "&np=" + this.wtEscape(r)) : t += "&np=" + this.wtEscape(r), this.quicksend(n, t))
    }, this.sendinfo_media = function (t, e, i, n, o, s, r, a) {
        this.wtTypeof(wt_sendinfo_media) && wt_sendinfo_media(t, e, i, n, o, s, r, a, this.unloadInstance)
    }, this.getExtLifeCycles = function (t, e, i) {
        for (var n = "", o = {}, s = t.split("|"), r = 0; r < s.length; r++) {
            for (var a = s[r].split(";"), l = 0; l < a.length; l++)n = 0 == l ? n + this.wtEscape(a[l]) : n + a[l], n += ";";
            n = n.substr(0, n.length - 1), n += "|"
        }
        n = n.substr(0, n.length - 1), o.xlcl = this.wtEscape(t.split("|").length), o.xlct = this.wtEscape(e), "undefined" != typeof i && (o.xlcv = this.wtEscape(i)), o.xlc = this.wtEscape(n), t = "";
        for (var c in o)t += "&" + r + "=" + o[c];
        return t
    }, this.isOwnDomain = function (t) {
        var e = "";
        if (this.domain)if (0 == this.domain.toUpperCase().indexOf("REGEXP:")) {
            if (e = RegExp(this.domain.substring(7), "i"), e.test(this.getDomain(t)))return !0
        } else {
            e = this.domain.split(";"), t = this.getDomain(t);
            for (var i = 0; i < e.length; i++)if (t == e[i])return !0
        }
        return !1
    }, this.getDomain = function (t) {
        if ("string" != typeof t)return "";
        t = this.wtUnescape(t), t = t.split("://")[1];
        var e = RegExp("^(?:[^/]+://)?([^/:]+)", "g");
        return "undefined" != typeof t && (t = t.match(e), t[0]) ? t[0].toLowerCase() : ""
    }, this.baseparams = function () {
        var t = screen.width + "x" + screen.height + "," + ("Netscape" != navigator.appName ? screen.colorDepth : screen.pixelDepth) + ",", t = t + (1 == navigator.cookieEnabled ? "1," : 0 == navigator.cookieEnabled ? "0," : -1 != document.cookie.indexOf("=") ? "1," : "0,"), t = t + ((new Date).getTime() + ","), e = "0", i = s("wt_ref", "(.*)");
        if (f.framesetReferrer ? e = f.wtEscape(f.framesetReferrer) : "" != f.getCookie("wt_ref") ? (e = f.wtEscape(f.getCookie("wt_ref")), f.setCookie("wt_ref", "", -3600)) : i ? e = f.wtEscape(i) : 0 < document.referrer.length && (e = f.wtEscape(document.referrer)), f.sentFullPixel ? e = "2" : f.isOwnDomain(e) && (e = "1"), i = 0, !document.layers && document.getElementById)try {
            i = top.window.innerHeight
        } catch (n) {
        } else i = top.window.innerHeight;
        if (!i)try {
            i = top.document.documentElement.clientHeight
        } catch (o) {
        }
        if (!i)try {
            i = top.document.body.clientHeight
        } catch (r) {
        }
        "undefined" == typeof i && (i = -1);
        var a;
        if (a = 0, !document.layers && document.getElementById)try {
            a = top.window.innerWidth
        } catch (l) {
        } else a = top.window.innerWidth;
        if (!a)try {
            a = top.document.documentElement.clientWidth
        } catch (c) {
        }
        if (!a)try {
            a = top.document.body.clientWidth
        } catch (d) {
        }
        return "undefined" == typeof a && (a = -1), i && i > screen.height && (i = screen.height), a && a > screen.width && (a = screen.width), t = t + e + ("," + a + "x" + i), t += "," + (navigator.javaEnabled() ? "1" : "0")
    }, this.getMediaCode = function (t) {
        if (!t) {
            if (!this.mediaCode)return;
            t = this.mediaCode
        }
        var e = [];
        t = t.split(";");
        var i = 0, n = [];
        this.mediaCodeValue && (e = this.mediaCodeValue.split(";"));
        for (var o = 0; o < t.length; o++) {
            var s = this.allUrlParam(t[o], "");
            if (this.mediaCodeCookie) {
                var r, a = !1, l = (this.trackId + "").split(",")[0], c = this.getCookie("wt_mcc_" + l);
                r = t[o] + "_" + s;
                for (var d = 0, u = r.length, p = void 0, h = 0; u > h; h++)p = r.charCodeAt(h), d = (d << 5) - d + p, d &= d;
                r = d > 1e15 - 1 ? "0" : d + "", -1 === c.indexOf("," + r + ",") && s ? (n.push(t[o] + this.wtEscape("=" + s)), a = !0) : i++, a && (s = "", "eid" == this.mediaCodeCookie && (s = 2592e3), this.setCookie("wt_mcc_" + l, c + "," + r + ",", s))
            } else"undefined" != typeof e && "undefined" != typeof e[o] && "" !== e[o] ? n.push(t[o] + this.wtEscape("=" + e[o])) : "" !== s && n.push(t[o] + this.wtEscape("=" + s))
        }
        t.length === i && 0 !== t.length && n.push("ignore%3Dignore"), this.config.campaignId = n.join(";")
    }, this.searchContentIds = function () {
        var t = 0, e = 0;
        this.contentIds = this.wtEscape(this.contentId.split(";")[0]);
        do {
            t++;
            var i = this.urlParam(document.location.href, "wt_contentId" + t, !1);
            i && (this.contentIds += "&wt_contentId" + t + "=" + this.wtEscape(i), e++)
        } while (e >= t)
    };
    var v = function (t) {
        var e = f.reporturl;
        return null !== t.match(/^(http[s]?:\/\/)?(report\d+|analytics)\.webtrekk\.(com|de).*$/) && (e = t.split("/"), e.pop(), e = e.join("/")), e
    };
    for (this.startHeatmapOrOverlay = function (t, e) {
        this.searchContentIds(), this.urlParam(this.wtHref(), "wt_reporter", !1) ? this.reporturl = v(this.urlParam(this.wtHref(), "wt_reporter", !1)) : this.getCookie("wt_overlayFrame") && (this.reporturl = v(this.getCookie("wt_overlayFrame"))), -1 === this.reporturl.search(/http|https/) && (this.reporturl = document.location.protocol + "//" + this.reporturl), this.contentIds && this.include(this.reporturl + "/" + t + ".pl?wt_contentId=" + this.contentIds + "&x=" + (new Date).getTime()) && ("heatmap" == t && -1 != navigator.userAgent.indexOf("MSIE 6") && -1 != navigator.userAgent.indexOf("Windows NT 5.0") && alert("Click OK to start heatmap."), "complete" != document.readyState ? this.registerEvent(window, "load", e) : e())
    }, this.heatmapOn = 0 <= this.wtHref().indexOf("wt_heatmap=1"), this.overlayOn = 0 <= this.wtHref().indexOf("wt_overlay=1") || 0 <= document.cookie.indexOf("wt_overlay=1"), 0 <= this.wtHref().indexOf("wt_overlay=0") && (this.overlayOn = !1, this.setCookie("wt_overlay", "", -1)), this.heatmapTrackInit = function () {
        for (var t = !1, e = 0; e < webtrekkHeatmapObjects.length; e++)this == webtrekkHeatmapObjects[e] && (t = !0);
        !t && this.heatmap && "1" == this.heatmap && (webtrekkHeatmapObjects.push(this), this.registerEvent(document, "mousedown", q), this.registerEvent(document, "touchstart", q))
    }, this.heatmapTrackInit(), this.heatmapOn && !this.disableOverlayView && this.startHeatmapOrOverlay("heatmap", r), this.overlayOn && !this.disableOverlayView && (this.setCookie("wt_overlay", "1"), this.startHeatmapOrOverlay("overlay", l)), this.setPixelSampling = function (t) {
        t || (t = this.pixelSampling);
        for (var e = this.trackId.split(",")[0], i = this.getCookie("wt3_sample").split(";"), n = !1, o = 0; o < i.length; o++)-1 != this.indexOf(i[o], e + "|" + t) ? n = !0 : -1 != this.indexOf(i[o], e + "|") && (i[o] = "");
        o = 6, this.cookieEidTimeout && (o = this.cookieEidTimeout), n ? (i = i.join(";"), this.setCookie("wt3_sample", i, 43200 * o)) : (i.push(Math && Math.random && 0 == parseInt(Math.random() * t) ? e + "|" + t + "|1" : e + "|" + t + "|0"), this.setCookie("wt3_sample", i.join(";"), 43200 * o), i = this.getCookie("wt3_sample")), -1 == this.indexOf(i, e + "|" + t + "|1") && (this.deactivatePixel = !0)
    }, this.pixelSampling && !this.optOut && this.setPixelSampling(), this.firstParty = function () {
        for (var t = this.getCookie("wt3_sid").split(";"), e = this.getCookie("wt3_eid").split(";"), i = 0 === this.cookieEidTimeout ? this.cookieEidTimeout : this.cookieEidTimeout ? this.cookieEidTimeout : 6, o = this.trackId.split(",")[0], r = !1, a = !1, l = !1, c = this.generateEid(), d = 0; d < t.length; d++)if (-1 != t[d].indexOf(o)) {
            r = d;
            break
        }
        for (d = 0; d < e.length; d++)if (-1 != e[d].indexOf(o + "|")) {
            a = d;
            break
        }
        this.eid = s("wt_eid", "^[0-9]{19}$"), r || (t.push(o), a && !this.eid && (this.forceNewSession = !0)), a ? (this.eid && (e[a] = o + "|" + this.eid, this.updateCookie = !0), -1 == e[a].indexOf("#") && (e[a] += "#" + c), l = e[a].replace(o + "|", "").split("#")[1], this.eid = e[a].replace(o + "|", "").split("#")[0], e[a] = e[a].replace(/#[0-9]{19}/g, "#" + c), this.updateCookie && (i ? this.setCookie("wt3_eid", e.join(";"), 43200 * i) : this.setCookie("wt3_eid", e.join(";")))) : (this.eid || (this.eid = this.generateEid(), this.cookieOne = !0), e.push(o + "|" + this.eid + "#" + c), i ? this.setCookie("wt3_eid", e.join(";"), 43200 * i) : this.setCookie("wt3_eid", e.join(";"))), this.setCookie("wt3_sid", t.join(";")), r || (this.firstVisitContact = n(this.eid), this.updateCookie && (this.lastVisitContact = n(l ? l : c)))
    }, g = !1, h = 0; h < webtrekkUnloadObjects.length; h++)this == webtrekkUnloadObjects[h] && (g = !0);
    g || webtrekkUnloadObjects.push(this);
    var y = function () {
        var t, e = [];
        for (t in f.safetagParameter) {
            var i = t;
            if ("executePluginFunction" == i)f.executePluginFunction += f.safetagParameter[i], f.safetagParameter[i] = ""; else if ("object" == typeof f.safetagParameter[i]) {
                "object" != typeof f[i] && (f[i] = {});
                for (var n in f.safetagParameter[i]) {
                    var o = n;
                    f[i][o] = f.safetagParameter[i][o]
                }
            } else f[i] = f.safetagParameter[i], "form" != i && "linkTrack" != i && "heatmap" != i || e.push(i)
        }
        for (t = 0; t < e.length; t++)switch (e[t]) {
            case"form":
                f.formTrackInstall();
                break;
            case"linkTrack":
                f.linkTrackInit();
                break;
            case"heatmap":
                f.heatmapTrackInit()
        }
        f.safetagParameter.pixel = f
    }, z = function () {
        f.safetagTimeoutStarted = !0;
        var t = (new Date).getTime() - f.startSafetagTimeoutDate;
        if (f.safetagInProgress && t < f.safetag.timeout)window.setTimeout(function () {
            z()
        }, 5); else {
            for (f.safetagTimeoutStarted = !1, f.safetagInProgress = !1, t > f.safetag.timeout && (f.xwtstt = f.safetag.timeout + ""), t = 0; t < f.saveSendinfoArguments.length; t++) {
                var e = f.saveSendinfoArguments[t];
                f.sendinfo(e[0], e[1], e[2], e[3])
            }
            f.saveSendinfoArguments = []
        }
    };
    this.sendinfo = function (t, e, i, n) {
        i = i ? i : "page", -1 == location.href.indexOf("fb_xd_fragment") && (this.safetag && y(), this.config = "object" == typeof t ? t : this.getConfig(), this.safetagInProgress ? (f.saveSendinfoArguments.push(t ? [this.config, e, i, n] : [!1, e, i, n]), this.safetagTimeoutStarted || (this.startSafetagTimeoutDate = (new Date).getTime(), window.setTimeout(function () {
            z()
        }, 5))) : (this.config.linkId && (i = "click", e || (e = this.config.linkId)), 0 != this.beforeSendinfoPixel ? this.beforeSendinfoPixel() : this.executePlugin(this.getPluginConfig(i ? i : "page", "before")), this.safetag && y(), this.optOut || this.deactivatePixel || ("1" == this.cookie ? this.firstParty() : this.xwteid = s("wt_eid", "^[0-9]{19}$")), this.config.campaignId || !this.mediaCode || "page" != i || this.config.linkId || this.getMediaCode(), ("" != this.contentId || "" != e || document.layers) && this.send(e, i, n), 0 != this.afterSendinfoPixel ? this.afterSendinfoPixel() : this.executePlugin(this.getPluginConfig(i ? i : "page", "after"))))
    }, function (t) {
        var e = function (e, i) {
            var n = this;
            n.item = i, n.href = "undefined" != typeof i.href ? i.href : t.getAttribute(i, "href") ? t.getAttribute(i, "href") : "", n.linkIdByNameOrId = t.getAttribute(i, "name") ? t.getAttribute(i, "name") : t.getAttribute(i, "id") ? t.getAttribute(i, "id") : "", n.linkId = "", n.action = "link", n.isDownloadFile = !1, n.linktrackOut = !1, n.isInternalLink = function () {
                var e;
                if (t.linkTrackDownloads) {
                    e = n.href.split("."), e = e.pop();
                    for (var o = t.linkTrackDownloads.split(";"), s = 0; s < o.length; s++)if (o[s] == e) {
                        n.isDownloadFile = !0;
                        break
                    }
                }
                n.linktrackOut = t.domain && !t.isOwnDomain(n.href), (n.isDownloadFile || "_blank" === i.target) && (n.action = "click"), e = n.href;
                var o = e.toLowerCase(), s = e.split("#")[0], r = document.location, a = n.item, l = t.getAttribute, c = l(a, "onclick"), d = l(a, "onmousedown"), a = l(a, "ontouchstart");
                return e = t.noDelayLinkTrackAttribute ? !!t.getAttribute(i, t.noDelayLinkTrackAttribute) : !(e && !(0 === o.indexOf("javascript:") || 0 === o.indexOf("#") || "click" === n.action || s == r.href.split("#")[0] && -1 !== e.indexOf("#") || s == r.pathname.split("#")[0] && -1 !== e.indexOf("#") || c && -1 !== c.search(/return false[;]?$/) || d && -1 !== d.search(/return false[;]?$/) || a && -1 !== a.search(/return false[;]?$/)))
            }, n.getCCParams = function () {
                var e = "";
                if (t.config.customClickParameter) {
                    var i = "undefined" != typeof t.config.customClickParameter[n.linkIdByNameOrId] ? t.config.customClickParameter[n.linkIdByNameOrId] : !1;
                    i || (i = t.config.customClickParameter);
                    var o, s;
                    for (s in i)o = s, !isNaN(parseInt(o)) && "string" == typeof i[o] && i[o] && (t.checkSC("custom") && (i[o] = t.decrypt(i[o])), e += "&ck" + o + "=" + t.wtEscape(i[o]))
                }
                return e
            }, n.setJSONParams = function () {
                n.linkId || (n.linkId = t.getAttribute(i, t.linkTrackAttribute)), null !== t.getJSON(n.linkId) && (t.parseJSON(t.getJSON(n.linkId)), n.linkId = t.config.linkId)
            }, n.getLinkId = function () {
                if (n.linkId = t.getAttribute(i, t.linkTrackAttribute), n.setJSONParams(), "link" == t.linkTrack) {
                    var e = n.href.indexOf("//");
                    n.href = e >= 0 ? n.href.substr(e + 2) : n.href, t.linkTrackPattern && (t.linkTrackReplace || (t.linkTrackReplace = ""), n.href = n.href.replace(t.linkTrackPattern, t.linkTrackReplace)), n.linkId = (n.linkId ? n.linkId + "." : "") + n.href.split("?")[0].split("#")[0].replace(/\//g, "."), e = [], t.linkTrackParams && (e = t.linkTrackParams.replace(/;/g, ",").split(","));
                    for (var o = 0; o < e.length; o++) {
                        var s = t.urlParam(n.href, e[o], "");
                        s && (n.linkId += "." + e[o] + "." + s)
                    }
                }
                return n.linkId
            }
        };
        t.linkTrackObject = new function () {
            var i = this;
            i.triggerObjectName = "__" + (new Date).getTime() + "_" + parseInt(1e3 * Math.random());
            var n = function (e, n) {
                var o = n[i.triggerObjectName];
                t.config = t.getConfig(!0), t.config.customClickParameter = t.customClickParameter, t.ccParams = o.getCCParams();
                var s = t.config.linkId = o.getLinkId();
                t.linktrackOut = o.linktrackOut, t.sendinfo(t.config, s, o.action)
            }, o = function (e) {
                t.registerEvent(e, "click", function (o) {
                    (o.which && 1 == o.which || o.button && 1 == o.button) && (t.delayLinkTrack && "function" == typeof o.preventDefault && !e[i.triggerObjectName].isInternalLink() && (o.preventDefault(), window.setTimeout(function () {
                        document.location.href = e.href
                    }, t.delayLinkTrackTime)), n(o, e))
                })
            };
            i.linkTrackInit = function () {
                if (t.linkTrack && ("link" == t.linkTrack || "standard" == t.linkTrack)) {
                    for (var n = !1, s = 0; s < webtrekkLinktrackObjects.length; s++)t == webtrekkLinktrackObjects[s] && (n = !0);
                    for (n || webtrekkLinktrackObjects.push(t), n = 0, s = document.links.length; s > n; n++) {
                        var r = document.links[n], a = t.getAttribute(r, t.linkTrackAttribute), l = t.getAttribute(r, "href");
                        (t.linkTrackIgnorePattern && l && -1 == l.search(t.linkTrackIgnorePattern) || !t.linkTrackIgnorePattern) && "undefined" == typeof r[i.triggerObjectName] && (a || "link" == t.linkTrack) && (r[i.triggerObjectName] = new e(i, r), o(r))
                    }
                }
            }, i.linkTrackInit()
        }, t.linkTrackInstall = t.linkTrackObject.linkTrackInit, t.linkTrackInit = t.linkTrackObject.linkTrackInit
    }(f), function (t, e) {
        var i = function (t, e) {
            var i = null, n = e.type, o = t.getFormFieldName(e), s = t.getFormFieldValue(e);
            this.close = function () {
                null !== i && (window.clearInterval(i), i = null, s = t.getFormFieldValue(e), t.formFieldData[o] = [n, s], t.formFieldDataPathAnalysis.push([o, n, s]))
            }, this.start = function () {
                null === i && (i = window.setInterval(function () {
                    "undefined" != typeof e && e && null !== e && (s = t.getFormFieldValue(e), t.formFieldData[o] = [n, s])
                }, 50), delete t.formFieldDataUnused[o])
            }
        };
        t.formTrackObject = new function (e) {
            var n = this, o = t.wtTypeof(window.onbeforeunload) ? "beforeunload" : "unload";
            n.formObject = !1, n.formFocus = !1, n.formName = !1, n.form = t.form, n.formFieldData = {}, n.formFieldDataUnused = {}, n.formFieldDataPathAnalysis = [], n.triggerObjectName = "__" + (new Date).getTime() + "_" + parseInt(1e3 * Math.random());
            var s = function (t) {
                return "hidden" != t && "button" != t && "image" != t && "reset" != t && "submit" != t && "fieldset" != t
            }, r = function (t) {
                return "select-multiple" != t && "select-one" != t && "checkbox" != t && "radio" != t
            }, a = function () {
                if (l(), n.formObject) {
                    var r = t.getAttribute(n.formObject, t.formAttribute);
                    n.formName = r ? r : t.contentId.split(";")[0];
                    for (var r = 0, a = n.formObject.elements, d = a.length; d > r; r++) {
                        var u = a[r], p = n.getFormFieldName(u);
                        s(u.type) && p && null !== p && (n.formFieldData[p] = [u.type, n.getFormFieldValue(u)], n.formFieldDataUnused[p] = [u.type, n.getFormFieldValue(u)], function (e) {
                            t.registerEvent(e, "focus", function () {
                                s(e.type) && n.formObject && (n.formFocus = e, n.formFocus[n.triggerObjectName] = new i(n, n.formFocus), n.formFocus[n.triggerObjectName].start())
                            }), t.registerEvent(e, "blur", function () {
                                s(e.type) && n.formObject && n.formFocus && n.formFocus && "undefined" != typeof n.formFocus[n.triggerObjectName] && n.formFocus[n.triggerObjectName].close()
                            })
                        }(u))
                    }
                    t.registerEvent(n.formObject, "submit", c), t.registerEvent(window, o, e)
                }
            }, l = function () {
                if (n.form && !n.formObject)for (var e = document.forms, i = 0, o = e.length; o > i; i++) {
                    var s = e[i];
                    if (t.wtTypeof(s.elements.wt_form)) {
                        n.formObject = s;
                        break
                    }
                }
            }, c = function (e) {
                !n.form || e.target !== n.formObject && e.srcElement !== n.formObject || (t.formSubmit = !0)
            }, d = function (e) {
                var i = [];
                if (t.formFullContent && (i = t.formFullContent.split(";")), t.formAnonymous || r(e.type)) {
                    for (var o = 0; o < i.length; o++)if (i[o] == n.getFormFieldName(e))return !1;
                    return !0
                }
                return !1
            }, u = function (e, i) {
                i || (i = e);
                var n = t.getAttribute(i, t.formValueAttribute).replace(/[\.|;|\|]/g, "_");
                return r(e.type) ? t.maxlen(t.wtUnescape(i.value), 110) : d(e) ? "anon" : t.maxlen(t.wtUnescape(n), 110)
            }, p = function (t, e, i, o) {
                var s = t.replace(/[\.|;|\|]/g, "_") + ".", s = s + (e + "|") + (i + "|");
                return s = o ? s + "0" : s + (n.formFocus && n.getFormFieldName(n.formFocus) === t ? "1" : "0")
            }, h = function (t, e) {
                for (var i = [], n = 0, o = e.length; o > n; n++)if ("undefined" != typeof t[e[n]])if ("select-multiple" == t[e[n]][0])for (var s = t[e[n]][1].split("|"), r = 0, a = s.length; a > r; r++)i.push(p(e[n], t[e[n]][0], s[r])); else i.push(p(e[n], t[e[n]][0], t[e[n]][1]));
                return i.join(";")
            }, f = function () {
                if (!n.formObject)return "";
                var e, i = [];
                if (e = [], t.wtTypeof(n.formObject.elements.wt_fields)) {
                    var o = n.formObject.elements.wt_fields.value;
                    o && (e = o.split(";"))
                }
                if (0 >= e.length)for (var s in n.formFieldData)o = s, "string" == typeof o && o && e.push(o);
                if (s = !1, !t.formPathAnalysis)return h(n.formFieldData, e);
                (o = h(n.formFieldDataUnused, e)) && i.push(o);
                for (var o = 0, r = n.formFieldDataPathAnalysis, a = r.length; a > o; o++) {
                    var l;
                    t:{
                        l = 0;
                        for (var c = e.length; c > l; l++)if (r[o][0] === e[l]) {
                            l = !0;
                            break t
                        }
                        l = !1
                    }
                    l && (s = !0, i.push(p(r[o][0], r[o][1], r[o][2], !0)))
                }
                return s && (e = i[i.length - 1], e = e.substr(0, e.length - 1), i[i.length - 1] = e + "1"), i.join(";")
            };
            n.getFormFieldName = function (e) {
                var i = e.name;
                return t.formFieldAttribute && (i = "", (e = t.getAttribute(e, t.formFieldAttribute)) || null !== e) && (i = e), i
            }, n.getFormFieldValue = function (e) {
                var i = e.type, o = "";
                if ("select-multiple" == i) {
                    for (var o = [], s = 0, r = e.options, a = r.length; a > s; s++)r[s].selected && o.push(u(e, r[s]));
                    0 >= o.length && o.push("empty"), o = o.join("|")
                } else"select-one" == i ? (o = "", -1 !== e.selectedIndex && ((o = u(e, e.options[e.selectedIndex])) && null !== o || (o = "empty"))) : "checkbox" == i || "radio" == i ? (o = "", e.checked ? (o = u(e)) || (o = "checked") : o = "empty") : "hidden" != i && "button" != i && "image" != i && "reset" != i && "submit" != i && (s = (o = u(e)) ? "filled_out" : "empty", d(e) || (s = o), r = n.getFormFieldName(e), "undefined" != typeof t.formFieldDefaultValue[r] && t.formFieldDefaultValue[r] == o && "empty" !== s && (s = "empty"), s && null !== s || (s = "empty"), o = s);
                return d(e) && "select-multiple" !== i && "empty" !== o && "filled_out" !== o ? "anon" : o
            }, n.formTrackInstall = function (t) {
                n.formObject = t ? t : document.forms[0] ? document.forms[0] : !1, n.formObject && (n.form = "1", a())
            }, n.getFormTrackingData = function () {
                var e = "";
                if (n.formObject) {
                    var i = f();
                    i && (e += "&fn=" + t.wtEscape(n.formName) + "|" + (t.formSubmit ? "1" : "0"), e += "&ft=" + t.wtEscape(i)), t.formSubmit = !1, n.formName = !1, n.formObject = !1, n.formFocus = !1, n.formFieldData = {}, n.formFieldDataUnused = {}, n.formFieldDataPathAnalysis = []
                }
                return e
            }, n.sendFormRequest = function () {
                !1 !== t.beforeUnloadPixel ? t.beforeUnloadPixel() : t.executePlugin(t.getPluginConfig("form", "before"));
                var e = n.getFormTrackingData();
                e && t.quicksend(t.wtEscape(t.contentId.split(";")[0]) + ",1," + t.baseparams(), e), !1 !== t.afterUnloadPixel ? t.afterUnloadPixel() : t.executePlugin(t.getPluginConfig("form", "after"))
            }, n.form && "1" == n.form && a()
        }(e), t.formTrackInstall = t.formTrackObject.formTrackInstall, t.formTrackInit = t.formTrackObject.formTrackInstall, t.sendFormRequest = t.formTrackObject.sendFormRequest, t.checkFormTracking = t.formTrackObject.getFormTrackingData
    }(f, function () {
        u("form")
    }), function (t) {
        t.cookieManager = function (t, e, i) {
            this.name = t, this.keySeperator = "~", this.fieldSeparator = "#", this.durationSeperator = "|", this.found = !1, this.expires = e ? e : !1, this.accessPath = i ? i : "/", this.rawValue = "", this.fields = [], this.fieldsDuration = [];
            var n = function (t) {
                try {
                    return decodeURIComponent(t)
                } catch (e) {
                    return unescape(t)
                }
            }, o = function (t) {
                try {
                    return encodeURIComponent(t)
                } catch (e) {
                    return escape(t)
                }
            };
            this.read = function () {
                this.rawValue = null, this.found = !1;
                for (var t = document.cookie.split(";"), e = 0; e < t.length; e++) {
                    var i = t[e].substr(0, t[e].indexOf("=")), o = t[e].substr(t[e].indexOf("=") + 1), i = i.replace(/^\s+|\s+$/g, "");
                    i == this.name && (this.rawValue = o, this.found = !0)
                }
                if (null !== this.rawValue) {
                    t = e = 0;
                    do t = this.rawValue.indexOf(this.fieldSeparator, e), -1 != t && (e = this.rawValue.substring(e, t).split(this.durationSeperator), i = e[0].split(this.keySeperator), this.fields[i[0]] = n(i[1]), this.fieldsDuration[i[0]] = parseInt(n(e[1])), e = t + 1); while (-1 !== t && t !== this.rawValue.length - 1)
                }
                return this.found
            }, this.getSize = function () {
                var t, e = (new Date).getTime(), i = "";
                for (t in this.fields) {
                    var n = t + "";
                    this.fieldsDuration[n] >= e && (i += o(n) + this.keySeperator + o(this.fields[n]) + this.durationSeperator + o(this.fieldsDuration[n]) + this.fieldSeparator)
                }
                return i.length
            }, this.write = function () {
                var t, e = (new Date).getTime(), i = !0, n = this.name + "=";
                for (t in this.fields) {
                    var s = t + "";
                    this.fieldsDuration[s] >= e && (n += o(s) + this.keySeperator + o(this.fields[s]) + this.durationSeperator + o(this.fieldsDuration[s]) + this.fieldSeparator, i = !1)
                }
                e = i ? -99999 : this.expires, "" !== e && "number" == typeof e && (i = new Date, i.setTime((new Date).getTime() + 864e5 * e), n += "; expires=" + i.toGMTString()), null !== this.accessPath && (n += "; PATH=" + this.accessPath), e = location.hostname, -1 == e.search(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/) && (e = location.hostname.split("."), e = e[e.length - 2] + "." + e[e.length - 1]), document.cookie = n + ("; DOMAIN=" + e)
            }, this.remove = function () {
                return this.expires = -10, this.write(), this.read()
            }, this.get = function (t) {
                var e = (new Date).getTime();
                return this.fieldsDuration[t] >= e ? this.fields[t] : ""
            }, this.set = function (t, e, i, n, o) {
                i || (i = 31536e3), n || (n = "last");
                var s = (new Date).getTime();
                return "first" == n && "" !== this.fields[t] && null !== this.fields[t] && this.fieldsDuration[t] >= s ? this.fields[t] : (this.fields[t] = e, this.fieldsDuration[t] = s + 1e3 * parseInt(i), o || this.write(), e)
            }, this.prepare = function (t, e, i, n) {
                return this.set(t, e, i, n, !0)
            }, this.read()
        }
    }(f)
};
if ("object" == typeof webtrekkConfig && "object" == typeof webtrekkConfig.safetag && -1 === document.cookie.indexOf("wt_r=1")) {
    var wts = wts || [], wt_safetagConfig = {
        async: "undefined" != typeof webtrekkConfig.safetag.async ? webtrekkConfig.safetag.async : !0,
        timeout: "undefined" != typeof webtrekkConfig.safetag.timeout ? webtrekkConfig.safetag.timeout : 2e3,
        safetagDomain: "undefined" != typeof webtrekkConfig.safetag.safetagDomain ? webtrekkConfig.safetag.safetagDomain : !1,
        safetagId: "undefined" != typeof webtrekkConfig.safetag.safetagId ? webtrekkConfig.safetag.safetagId : !1,
        customDomain: "undefined" != typeof webtrekkConfig.safetag.customDomain ? webtrekkConfig.safetag.customDomain : !1,
        customPath: "undefined" != typeof webtrekkConfig.safetag.customPath ? webtrekkConfig.safetag.customPath : !1,
        option: "undefined" != typeof webtrekkConfig.safetag.option ? webtrekkConfig.safetag.option : {}
    };
    !function (t, e) {
        var i = function (t) {
            try {
                return encodeURIComponent(t)
            } catch (e) {
                return escape(t)
            }
        }, n = document.location.protocol;
        if ("http:" == n || "https:" == n) {
            var o = "";
            if (t.customDomain && t.customPath ? o = n + "//" + t.customDomain + "/" + t.customPath : t.safetagDomain && t.safetagId && (o = n + "//" + t.safetagDomain + "/resp/api/get/" + t.safetagId + "?url=" + i(document.location.href)), o) {
                for (var s in t.option)o += "&" + s + "=" + i(t.option[s]);
                if (webtrekkV3.prototype.safetag = t, webtrekkV3.prototype.safetagInProgress = !0, webtrekkV3.prototype.safetagParameter = {}, webtrekkV3.prototype.update = function () {
                    }, window.wts = e, window.safetagLoaderHandler = function (t, e) {
                        if (t && e)if ("onerror" == e)webtrekkV3.prototype.safetagInProgress = !1; else if ("onload" == e) {
                            if ("undefined" != typeof wt_r && !isNaN(wt_r)) {
                                var i = new Date;
                                document.cookie = "wt_r=1;path=/;expires=" + i.toUTCString(i.setTime(i.getTime() + 1e3 * parseInt(wt_r)))
                            }
                            webtrekkV3.prototype.safetagInProgress = !1
                        } else"onreadystatechange" != e || "loaded" != t.readyState && "complete" != t.readyState || (t.onreadystatechange = null, t.onload(r))
                    }, t.async || "complete" === document.readyState || "interactive" === document.readyState) {
                    var i = document.getElementsByTagName("script")[0], r = document.createElement("script");
                    r.async = t.async, r.type = "text/javascript", r.onerror = function () {
                        safetagLoaderHandler(r, "onerror")
                    }, r.onload = function () {
                        safetagLoaderHandler(r, "onload")
                    }, r.onreadystatechange = function () {
                        safetagLoaderHandler(r, "onreadystatechange")
                    }, r.src = o, i.parentNode.insertBefore(r, i)
                } else o = '<script type="text/javascript" src="' + o + '" onerror="safetagLoaderHandler(this,\'onerror\')"', o += " onload=\"safetagLoaderHandler(this,'onload')\"", o += " onreadystatechange=\"safetagLoaderHandler(this,'onreadystatechange')\"", o += "></script>", document.write(o)
            }
        }
    }(wt_safetagConfig, wts)
}