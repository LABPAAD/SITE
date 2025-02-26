(function () {
    const e = window.wpcom || {};
    e.actionbar = {};
    e.actionbar.data = window.actionbardata;
    const t = e.actionbar.data;

    function n(e = {}, o = () => {}) {
        if (!e.action) return;
        fetch(t.xhrURL, {
            method: "POST",
            body: new URLSearchParams(e),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(o);
    }

    let o;
    function c() {
        if (!o) {
            o = new Promise((e, n) => {
                if (window.WPCOM_Proxy_Request) {
                    e(window.WPCOM_Proxy_Request);
                } else {
                    const o = document.createElement("script");
                    o.src = t.proxyScriptUrl;
                    o.async = true;
                    document.body.appendChild(o);
                    o.addEventListener("load", () => e(window.WPCOM_Proxy_Request));
                    o.addEventListener("error", e => n(e));
                }
            });
        }
        return o;
    }

    function s(e, t, n = {}) {
        const o = { path: e, body: n, method: "POST", apiNamespace: t };
        c().then(e => e(o));
    }

    function i(e, t) {
        n({ action: "actionbar_stats", stat: e }, t);
    }

    function r(e) {
        n({ action: e, _wpnonce: t.nonce, source: "actionbar", blog_id: t.siteID });
    }

    let a = window.scrollY || window.pageYOffset || 0;
    if (window != window.top) return;
    const l = document.querySelector("#actionbar");
    if (!l) return;
    l.removeAttribute("style");
    if (t.statusMessage) A(t.statusMessage);
    
    let d = false;
    const u = l.querySelector(".actnbr-actn-follow");
    const f = l.querySelector(".actnbr-actn-reblog");
    const b = l.querySelector(".actnbr-actn-comment");
    const p = document.querySelector("#commentform");
    const m = l.querySelector(".actnbr-actn-privacy");
    const _ = l.querySelector("#toggle-input-notify-posts");
    const w = l.querySelector("#toggle-input-email-posts");
    const g = l.querySelector("#toggle-input-email-comments");
    const y = l.querySelectorAll(".segmented-control__link");
    const L = l.querySelector(".frequency-instantly");
    const v = l.querySelector(".frequency-daily");
    const h = l.querySelector(".frequency-weekly");
    
    if (f) {
        f.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            const n = "reblog_source";
            const o = "actionbar";
            new Image().src = `${document.location.protocol}//pixel.wp.com/g.gif?v=wpcom-no-pv&x_${n}=${o}&baba=${Math.random()}`;
            T("wpcom_actionbar_post_reblogged", { url: t.siteURL, blog_id: t.siteID, post_id: t.postID });
            const c = `${t.siteID}-${t.postID}`;
            if (wpcom_reblog && typeof wpcom_reblog.toggle_reblog_box_flair === "function") {
                wpcom_reblog.toggle_reblog_box_flair(c, t.postID);
            }
        });
    }

    if (b) {
        if (!p) {
            b.parentNode.classList.add("no-display");
        }
        b.addEventListener("click", e => {
            i("comment_clicked");
            T("wpcom_actionbar_comment_click", { url: t.siteURL, blog_id: t.siteID, post_id: t.postID });
        });
    }

    if (_) {
        _.addEventListener("click", e => {
            e.preventDefault();
            const n = e.target.parentElement.classList.toggle("is-checked");
            const o = `/read/sites/${t.siteID}/notification-subscriptions/${n ? "new" : "delete"}`;
            s(o, "wpcom/v2");
            T("wpcom_actionbar_site_notifications", { enabling: n, follow_source: "actionbar", url: t.siteURL });
        });
    }

    // Adicionando event listeners para outros botões da actionbar
    // ...
    
    document.addEventListener("click", e => {
        const t = !!e.target.closest("#follow-bubble");
        if (t) return;
        const n = l.querySelector(".actnbr-btn");
        if (d && !n.classList.contains("actnbr-hidden")) {
            d = false;
            n.classList.add("actnbr-hidden");
        }
    });
})();
