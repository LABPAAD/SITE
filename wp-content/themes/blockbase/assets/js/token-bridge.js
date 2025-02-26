// Listen for RLT authentication events and pass them to children of this document.
(function() {
    var currentToken;
    var parentOrigin;
    var iframeOrigins;
    var registeredIframes = [];
    var initializationListeners = [];
    var hasBeenInitialized = false;
    var RLT_KEY = 'jetpack:wpcomRLT';

    // Should we inject RLT into this iframe?
    function rltShouldAuthorizeIframe(frameOrigin) {
        if (!Array.isArray(iframeOrigins)) {
            return false;
        }
        return iframeOrigins.includes(frameOrigin);
    }

    function rltInvalidateWindowToken(token, target, origin) {
        if (target && typeof target.postMessage === 'function') {
            try {
                target.postMessage(JSON.stringify({
                    type: 'rltMessage',
                    data: {
                        event: 'invalidate',
                        token: token,
                        sourceOrigin: window.location.origin,
                    },
                }), origin);
            } catch (err) {
                return;
            }
        }
    }

    /**
     * PUBLIC METHODS
     */
    window.rltInvalidateToken = function(token, sourceOrigin) {
        // Invalidate in current context
        if (token === currentToken) {
            currentToken = null;
        }

        // Remove from localStorage, but only if in a top-level window, not iframe
        try {
            if (window.location === window.parent.location && window.localStorage) {
                if (window.localStorage.getItem(RLT_KEY) === token) {
                    window.localStorage.removeItem(RLT_KEY);
                }
            }
        } catch (e) {
            console.info("localstorage access for invalidate denied - probably blocked third-party access", window.location.href);
        }

        // Invalidate in registered iframes
        for (const [frameOrigin, frameWindow] of registeredIframes) {
            if (frameOrigin !== sourceOrigin) {
                rltInvalidateWindowToken(token, frameWindow, frameOrigin);
            }
        }

        // Invalidate in parent
        if (parentOrigin && parentOrigin !== sourceOrigin && window.parent) {
            rltInvalidateWindowToken(token, window.parent, parentOrigin);
        }
    };

    window.rltInjectToken = function(token, target, origin) {
        if (target && typeof target.postMessage === 'function') {
            try {
                target.postMessage(JSON.stringify({
                    type: 'loginMessage',
                    data: {
                        event: 'login',
                        success: true,
                        type: 'rlt',
                        token: token,
                        sourceOrigin: window.location.origin,
                    },
                }), origin);
            } catch (err) {
                return;
            }
        }
    };

    window.rltIsAuthenticated = function() {
        return !!currentToken;
    };

    window.rltGetToken = function() {
        return currentToken;
    };

    window.rltAddInitializationListener = function(listener) {
        // If RLT is already initialized, call the listener immediately
        if (hasBeenInitialized) {
            listener(currentToken);
        } else {
            initializationListeners.push(listener);
        }
    };

    // Store the token in localStorage
    window.rltStoreToken = function(token) {
        currentToken = token;
        try {
            if (window.location === window.parent.location && window.localStorage) {
                window.localStorage.setItem(RLT_KEY, token);
            }
        } catch (e) {
            console.info("localstorage access denied - probably blocked third-party access", window.location.href);
        }
    };

    window.rltInitialize = function(config) {
        if (!config || typeof window.postMessage !== 'function') {
            return;
        }

        currentToken = config.token;
        iframeOrigins = config.iframeOrigins;
        parentOrigin = config.parentOrigin; // Needed?

        // Load token from localStorage if possible, but only in top-level window
        try {
            if (!currentToken && window.location === window.parent.location && window.localStorage) {
                currentToken = window.localStorage.getItem(RLT_KEY);
            }
        } catch (e) {
            console.info("localstorage access denied - probably blocked third-party access", window.location.href);
        }

        // Listen for RLT events from approved origins
        window.addEventListener('message', function(e) {
            var message = e && e.data;
            if (typeof message === 'string') {
                try {
                    message = JSON.parse(message);
                } catch (err) {
                    return;
                }
            }

            var type = message && message.type;
            var data = message && message.data;

            if (type === 'loginMessage') {
                if (data && data.type === 'rlt' && data.token !== currentToken) {
                    // Put into localStorage if running in top-level window (not iframe)
                    rltStoreToken(data.token);

                    // Send to registered iframes
                    for (const [frameOrigin, frameWindow] of registeredIframes) {
                        rltInjectToken(currentToken, frameWindow, frameOrigin);
                    }

                    // Send to the parent, unless the event was sent _by_ the parent
                    if (parentOrigin && parentOrigin !== data.sourceOrigin && window.parent) {
                        rltInjectToken(currentToken, window.parent, parentOrigin);
                    }
                }
            }

            if (type === 'rltMessage') {
                if (data && data.event === 'invalidate' && data.token === currentToken) {
                    rltInvalidateToken(data.token);
                }

                if (data && data.event === 'register') {
                    if (rltShouldAuthorizeIframe(e.origin)) {
                        registeredIframes.push([e.origin, e.source]);
                        if (currentToken) {
                            rltInjectToken(currentToken, e.source, e.origin);
                        }
                    }
                }
            }
        });

        initializationListeners.forEach(function(listener) {
            listener(currentToken);
        });

        initializationListeners = [];

        // Inform the parent that we are ready to receive the RLT token
        window.parent.postMessage({
            type: 'rltMessage',
            data: {
                event: 'register'
            },
        }, '*');

        hasBeenInitialized = true;
    };
})();
