(function () {
    var e = window.WPGroHo || {};
    e.my_hash = "";
    e.data = {};
    e.renderers = {};

    e.syncProfileData = function (a, r) {
        if (!e.data[a]) {
            e.data[a] = {};
            var n = document.querySelectorAll("div.grofile-hash-map-" + a + " span");

            for (var t = 0; t < n.length; t++) {
                var o = n[t];
                e.data[a][o.className] = o.textContent;
            }
        }
        e.appendProfileData(e.data[a], a, r);
    };

    e.appendProfileData = function (a, r, n) {
        for (var t in a) {
            if (typeof e.renderers[t] === "function") {
                return e.renderers[t](a[t], r, n, t);
            }

            var o = document.getElementById(n);
            if (o) {
                var d = o.querySelector("h4");
                if (d) {
                    var i = document.createElement("p");
                    i.className = "grav-extra " + t;
                    i.innerHTML = a[t];
                    d.insertAdjacentElement("afterend", i);
                }
            }
        }
    };

    window.WPGroHo = e;
})();