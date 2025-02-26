"use strict";

function getType(value) {
    return typeof Symbol === "function" && typeof Symbol.iterator === "symbol" 
        ? function (val) { return typeof val; } 
        : function (val) { 
            return val && typeof Symbol === "function" && val.constructor === Symbol && val !== Symbol.prototype 
                ? "symbol" 
                : typeof val;
        }(value);
}

function toPrimitive(input) {
    var result = (function (val, hint) {
        if (getType(val) !== "object" || !val) return val;
        var prim = val[Symbol.toPrimitive];
        if (prim !== undefined) {
            var output = prim.call(val, hint || "default");
            if (getType(output) !== "object") return output;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(val);
    })(input, "string");
    return getType(result) === "symbol" ? result : result + "";
}

function defineProperty(obj, key, value) {
    key = toPrimitive(key);
    if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

var utils = {
    define: (target, props) => {
        for (var key in props) {
            if (Object.prototype.hasOwnProperty.call(props, key) && !Object.prototype.hasOwnProperty.call(target, key)) {
                Object.defineProperty(target, key, { enumerable: true, get: props[key] });
            }
        }
    },
    hasOwn: (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
};

var module = {};
utils.define(module, { SomeExport: () => Tooltip });

var placementStyles = {
    top: "paddingBottom",
    bottom: "paddingTop",
    left: "paddingRight",
    right: "paddingLeft"
};

function positionElement(target, element, options = {}) {
    var {
        placement = "right-start",
        offset = 0,
        autoFlip = true,
        autoShift = true
    } = options;
    
    element.style.padding = "0";
    var targetRect = target.getBoundingClientRect();
    var elementRect = element.getBoundingClientRect();
    var scrollX = window.scrollX, scrollY = window.scrollY;
    var top = targetRect.top + scrollY;
    var bottom = targetRect.bottom + scrollY;
    var left = targetRect.left + scrollX;
    var right = targetRect.right + scrollX;
    
    var posX = 0, posY = 0;
    var [mainPlacement, subPlacement] = placement.split("-");

    if (offset > 0 && autoFlip) {
        var elementHeight = elementRect.height + offset;
        var elementWidth = elementRect.width + offset;
        
        if (mainPlacement === "top" && top < elementHeight && bottom > top) {
            mainPlacement = "bottom";
        } else if (mainPlacement === "bottom" && bottom < elementHeight && top > bottom) {
            mainPlacement = "top";
        } else if (mainPlacement === "left" && left < elementWidth && right > left) {
            mainPlacement = "right";
        } else if (mainPlacement === "right" && right < elementWidth && left > right) {
            mainPlacement = "left";
        }
    }
    
    if (mainPlacement === "top" || mainPlacement === "bottom") {
        posX = left + targetRect.width / 2 - elementRect.width / 2;
        posY = mainPlacement === "top" ? top - elementRect.height - offset : bottom;
        if (subPlacement === "start") posX = left;
        if (subPlacement === "end") posX = right - elementRect.width;
    } else {
        posX = mainPlacement === "right" ? right : left - elementRect.width - offset;
        posY = top + targetRect.height / 2 - elementRect.height / 2;
        if (subPlacement === "start") posY = top;
        if (subPlacement === "end") posY = bottom - elementRect.height;
    }

    element.style.position = "absolute";
    element.style.left = `${posX}px`;
    element.style.top = `${posY}px`;
    element.style[placementStyles[mainPlacement]] = `${offset}px`;
}

function escapeHtml(html) {
    var escapeChars = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "`": "&#x60;"
    };
    return html.replace(/[&<>"'`]/g, char => escapeChars[char] || char);
}

function encodeUri(uri) {
    return encodeURI(uri);
}

function updateQueryString(url, key, value) {
    var [baseUrl, queryString] = url.split("?");
    var params = new URLSearchParams(queryString || "");
    params.set(key, value);
    return `${baseUrl}?${params.toString()}`;
}

function getValue(obj, key) {
    return obj[key] || key;
}

function mergeObjects() {
    return Object.assign({}, ...arguments);
}

var Tooltip = function () {
    function Tooltip(options = {}) {
        this.settings = mergeObjects({
            placement: "right-start",
            autoFlip: true,
            autoShift: true,
            offset: 10,
            delayToShow: 500,
            delayToHide: 300,
            additionalClass: "",
            myHash: "",
            onQueryHovercardRef: (el) => el,
            onFetchProfileStart: () => {},
            onFetchProfileSuccess: () => {},
            onFetchProfileFailure: () => {},
            onHovercardShown: () => {},
            onHovercardHidden: () => {},
            i18n: {}
        }, options);
    }
    
    Tooltip.prototype.attach = function (element, config = {}) {
        var { dataAttributeName = "gravatar-hash", ignoreSelector } = config;
        if (!element) return;
        this.detach();
        // Further logic for attaching events
    };
    
    Tooltip.prototype.detach = function () {
        // Logic for removing event listeners
    };
    
    return Tooltip;
}();

module.SomeExport = Tooltip;
