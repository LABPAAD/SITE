!function(t) {
    var e = {}; // Objeto para armazenar módulos
    function n(o) {
        // Função para carregar módulos
        if (e[o]) return e[o].exports;
        var r = e[o] = {i: o, l: false, exports: {}};
        return t[o].call(r.exports, r, r.exports, n), r.l = true, r.exports;
    }

    // Função que manipula cookies
    n.m = t;
    n.c = e;
    n.d = function(t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {enumerable: true, get: o});
    };

    // Função para configurar o ambiente de execução
    n.r = function(t) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(t, Symbol.toStringTag, {value: 'Module'});
        }
        Object.defineProperty(t, "__esModule", {value: true});
    };

    // Função de manipulação de tipo e identificadores
    n.t = function(t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" === typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {enumerable: true, value: t}), 2 & e && "string" != typeof t)
            for (var r in t) n.d(o, r, (function(e) { return t[e] }).bind(null, r));
        return o;
    };

    // Mais funções utilitárias para manipulação de cookies e rastreamento de usuários
    n.n = function(t) {
        var e = t && t.__esModule ? function() { return t.default } : function() { return t };
        return n.d(e, "a", e), e;
    };

    n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    };

    n.p = "";
    n(n.s = 9);
}([ /* Lista de módulos */ ]);
