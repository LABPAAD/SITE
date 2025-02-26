!function() {
    "use strict";
    function t(r) {
        return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? 
        function(t) {
            return typeof t;
        } : 
        function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, t(r);
    }
    
    function r(r) {
        var a = function(r, a) {
            if ("object" != t(r) || !r) return r;
            var n = r[Symbol.toPrimitive];
            if (void 0 !== n) {
                var e = n.call(r, a || "default");
                if ("object" != t(e)) return e;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === a ? String : Number)(r);
        }(r, "string");
        return "symbol" == t(a) ? a : a + "";
    }

    function a(t, a, n) {
        return (a = r(a)) in t ? Object.defineProperty(t, a, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[a] = n, t;
    }

    var n = {
        d: (t, r) => {
            for (var a in r) n.o(r, a) && !n.o(t, a) && Object.defineProperty(t, a, { enumerable: !0, get: r[a] });
        },
        o: (t, r) => Object.prototype.hasOwnProperty.call(t, r)
    }, e = {};

    n.d(e, { S: () => _ });

    var o, i = { top: "paddingBottom", bottom: "paddingTop", left: "paddingRight", right: "paddingLeft" };

    function c(t, r, a) {
        var n = void 0 === a ? {} : a, e = n.placement, o = void 0 === e ? "right-start" : e, c = n.offset, v = void 0 === c ? 0 : c, s = n.autoFlip, d = void 0 === s || s, l = n.autoShift, h = void 0 === l || l;
        r.style.padding = "0";
        var u = t.getBoundingClientRect(), _ = r.getBoundingClientRect(), f = u.top + scrollY, g = u.bottom + scrollY, m = u.right + scrollX, p = u.left + scrollX, w = u.top, b = innerHeight - u.bottom, k = u.left, y = innerWidth - u.right, j = 0, S = 0, O = o.split("-"), L = O[0], x = O[1];

        if (v = Math.max(0, v), d) {
            var I = _.height + v, C = _.width + v;
            "top" === L && w < I && b > w ? L = "bottom" : "bottom" === L && b < I && w > b ? L = "top" : "left" === L && k < C && y > k ? L = "right" : "right" === L && y < C && k > y && (L = "left");
        }

        if (h) {
            var M = _.height - u.height, H = _.width - u.width, U = M / 2, A = H / 2;
            "top" !== L && "bottom" !== L || ("start" === x && y < H ? x = y < A ? "end" : void 0 : "end" === x && k < H ? x = k < A ? "start" : void 0 : void 0 === x && (y < A || k < A) && (x = y > k ? "start" : "end")), "right" !== L && "left" !== L || ("start" === x && b < M ? x = b < U ? "end" : void 0 : "end" === x && w < M ? x = w < U ? "start" : void 0 : void 0 === x && (b < U || w < U) && (x = b > w ? "start" : "end")));
        }

        "top" === L || "bottom" === L ? (j = p + u.width / 2 - _.width / 2, S = "top" === L ? f - _.height - v : g) : (j = "right" === L ? m : p - _.width - v, S = f + u.height / 2 - _.height / 2, "start" === x && (S = f), "end" === x && (S = g - _.height));
        r.style.position = "absolute", r.style.left = j + "px", r.style.top = S + "px", r.style[i[L]] = v + "px";
    }

    function v(t) {
        var r = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&amp;#x60;" };
        return t.replace(/&(amp|lt|gt|quot|#39|x60);|[\&<>"'`]/g, function(t) { return "&" === t[0] ? t : r[t]; });
    }

    function s(t) {
        return encodeURI(t);
    }

    function d(t, r, a) {
        var n = t.split("?"), e = n[0], o = n[1], i = new URLSearchParams(o || "");
        return i.set(r, a), e + "?" + i.toString();
    }

    function l(t, r) {
        return t[r] || r;
    }

    function h() {
        return h = Object.assign ? Object.assign.bind() : function(t) {
            for (var r = 1; r < arguments.length; r++) {
                var a = arguments[r];
                for (var n in a) ({ }).hasOwnProperty.call(a, n) && (t[n] = a[n]);
            }
            return t;
        }, h.apply(null, arguments);
    }

    var u = document, _ = function() {
        function t(t) {
            var r = this, a = void 0 === t ? {} : t, n = a.placement, e = void 0 === n ? "right-start" : n, o = a.autoFlip, i = void 0 === o || o, c = a.autoShift, v = void 0 === c || c, s = a.offset, d = void 0 === s ? 10 : s, l = a.delayToShow, h = void 0 === l ? 500 : l, u = a.delayToHide, _ = void 0 === u ? 300 : u, f = a.additionalClass, g = void 0 === f ? "" : f, m = a.myHash, p = void 0 === m ? "" : m, w = a.onQueryHovercardRef, b = void 0 === w ? function(t) { return t; } : w, k = a.onFetchProfileStart, y = void 0 === k ? function() {} : k, j = a.onFetchProfileSuccess, S = void 0 === j ? function() {} : j, O = a.onFetchProfileFailure, L = void 0 === O ? function() {} : O, x = a.onHovercardShown, I = void 0 === x ? function() {} : x, C = a.onHovercardHidden, M = void 0 === C ? function() {} : C, H = a.i18n, U = void 0 === H ? {} : H;
            this.t = {}, this.i = [], this.v = new Map, this.l = new Map, this.u = new Map, this.attach = function(t, a) {
                var n = void 0 === a ? {} : a, e = n.dataAttributeName, o = void 0 === e ? "gravatar-hash" : e, i = n.ignoreSelector;
                t && (r.detach(), r._(t, o, i).forEach(function(t) {
                    t.ref.addEventListener("mouseenter", function(a) { return r.m(a, t); }), t.ref.addEventListener("mouseleave", function(a) { return r.p(a, t); });
                }));
            };
            this.detach = function() {
                r.i.length && (r.i.forEach(function(t) {
                    var a = t.ref;
                    a.removeEventListener("mouseenter", function() { return r.m; }), a.removeEventListener("mouseleave", function() { return r.p; });
                }), r.i = []);
            };
            this.k = e, this.j = i, this.O = v, this.L = d, this.I = h, this.C = _, this.M = g, this.H = p, this.U = b, this.A = y, this.P = S, this.R = L, this.T = I, this.B = M, this.t = U;
        }

        var r = t.prototype;
        return r._ = function(t, r, a) {
            var n = this, e = [], o = r.replace(/-([a-z])/g, function(t) { return t[1].toUpperCase(); }), i = a ? Array.from(u.querySelectorAll(a)) : [], c = i.length ? i : Array.from(t.querySelectorAll("a")), v = Array.from(c).filter(function(t) {
                return t && !t.querySelectorAll(".hovercard").length && !n.v.get(t) && t.getAttribute(r) && (!a || !t.closest(a));
            });
            return v.forEach(function(t) {
                n.v.set(t, { hash: t.getAttribute(r) }), e.push({ ref: t, hash: t.getAttribute(r) });
            }), e;
        }, r.m = function(t, r) {
            var a = this;
            clearTimeout(this.t[r.hash] || 0), this.t[r.hash] = setTimeout(function() { return a.I(r.ref); }, this.L);
        }, r.p = function(t, r) {
            var a = this;
            clearTimeout(this.t[r.hash]), this.t[r.hash] = setTimeout(function() { return a.B(r.ref); }, this.I);
        }, r;
    }();

    e.S;
}();
