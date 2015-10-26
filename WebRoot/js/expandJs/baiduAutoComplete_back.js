/* Copyright (c) 2010 Baidu  Licensed under the BSD License */
var baidu = baidu || {
    version: "1-1-1"
};
baidu.guid = "$BAIDU$";
window[baidu.guid] = window[baidu.guid] || {};
baidu.browser = baidu.browser || {};
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
if ((/(\d+\.\d)(\.\d)?\s+safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent))) {
    baidu.browser.safari = parseFloat(RegExp["\x241"])
}
if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.opera = parseFloat(RegExp["\x241"])
}
if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.chrome = parseFloat(RegExp["\x241"])
}
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.ie = baidu.ie = document.documentMode || parseFloat(RegExp["\x241"])
}
try {
    if (/(\d+\.\d)/.test(external.max_version)) {
        baidu.browser.maxthon = parseFloat(RegExp["\x241"])
    }
} catch(e) {}
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.firefox = parseFloat(RegExp["\x241"])
}
baidu.number = baidu.number || {};
baidu.number.pad = function(d, c) {
    var f = "",
    b = (d < 0),
    a = String(Math.abs(d));
    if (a.length < c) {
        f = (new Array(c - a.length + 1)).join("0")
    }
    return (b ? "-": "") + f + a
};
baidu.number.randomInt = function(b, a) {
    return Math.floor(Math.random() * (a - b + 1) + b)
};
baidu.number.comma = function(b, a) {
    if (!a || a < 1) {
        a = 3
    }
    b = String(b).split(".");
    b[0] = b[0].replace(new RegExp("(\\d)(?=(\\d{" + a + "})+$)", "ig"), "$1,");
    return b.join(".")
};
baidu.dom = baidu.dom || {};
baidu.dom._g = function(a) {
    if ("string" == typeof a || a instanceof String) {
        return document.getElementById(a)
    }
    return a
};
baidu._g = baidu.dom._g;
baidu.lang = baidu.lang || {};
baidu.lang.isString = function(a) {
    return "[object String]" == Object.prototype.toString.call(a)
};
baidu.isString = baidu.lang.isString;
baidu.array = baidu.array || {};
baidu.array.each = function(g, d) {
    var c, f, b, a = g.length;
    if ("function" == typeof d) {
        for (b = 0; b < a; b++) {
            f = g[b];
            c = d.call(g, f, b);
            if (c === false) {
                break
            }
        }
    }
    return g
};
baidu.each = baidu.array.each;
baidu.lang.isArray = function(a) {
    return "[object Array]" == Object.prototype.toString.call(a)
};
baidu.event = baidu.event || {};
baidu.element = {};
baidu.e = baidu.element = function(b) {
    var a = baidu._g(b);
    if (!a && baidu.dom.query) {
        a = baidu.dom.query(b)
    }
    return new baidu.element.Element(a)
};
baidu.fn = baidu.fn || {};
baidu.fn.methodize = function(b, a) {
    return function() {
        return b.apply(this, [(a ? this[a] : this)].concat([].slice.call(arguments)))
    }
};
baidu.fn.multize = function(c, a) {
    var b = function() {
        var l = arguments[0],
        h = a ? b: c,
        f = [],
        k = [].slice.call(arguments, 0),
        g = 0,
        d,
        j;
        if (l instanceof Array) {
            for (d = l.length; g < d; g++) {
                k[0] = l[g];
                j = h.apply(this, k);
                f.push(j)
            }
            return f
        } else {
            return c.apply(this, arguments)
        }
    };
    return b
};
baidu.element._wrapFunction = function(c, b) {
    return baidu.fn.methodize(a(baidu.fn.multize(c), baidu.element.Element, b), "_dom");
    function a(f, g, d) {
        d = d | 0;
        return function() {
            var h = f.apply(this, arguments);
            if (d > 0) {
                return new g(arguments[d - 1])
            }
            if (!d) {
                return new g(h)
            }
            return h
        }
    }
};
baidu.element.Element = function(b) {
    var a = this;
    a._dom = [];
    if (baidu.lang.isArray(b)) {
        baidu.each(b,
        function(d, c) {
            a._dom[c] = d
        })
    } else {
        a._dom[0] = b
    }
};
baidu.element.Element.prototype = {
    each: function(a) {
        baidu.array.each(this._dom,
        function(b) {
            a.call(this, (new baidu.element.Element(b)))
        })
    }
}; (function() {
    var c = baidu.element.Element.prototype,
    a = baidu.element._wrapFunction;
    baidu.each(("draggable droppable resizable").split(" "),
    function(d) {
        c[d] = a(baidu.dom[d], 1)
    });
    baidu.each(("remove getText contains getAttr getPosition getStyle hasClass intersect hasAttr").split(" "),
    function(d) {
        c[d] = c[d.replace(/^get[A-Z]/g, b)] = a(baidu.dom[d], -1)
    });
    baidu.each(("addClass empty hide show insertAfter insertBefore insertHTML removeClass setAttr setAttrs setStyle setStyles show toggleClass toggle children next first getAncestorByClass getAncestorBy getAncestorByTag getDocument getParent getWindow last next prev g q query removeStyle setOuter setOuterWidth setOuterHeight setPosition").split(" "),
    function(d) {
        c[d] = c[d.replace(/^get[A-Z]/g, b)] = a(baidu.dom[d], 0)
    });
    baidu.each(("on un").split(" "),
    function(d) {
        c[d] = a(baidu.event[d], 0)
    });
    baidu.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error").split(" "),
    function(d) {
        c[d] = function(f) {
            return this.on(d, f)
        }
    });
    function b(d) {
        return d.charAt(3).toLowerCase()
    }
})();
baidu.object = baidu.object || {};
baidu.object.each = function(f, c) {
    var b, a, d;
    if ("function" == typeof c) {
        for (a in f) {
            if (f.hasOwnProperty(a)) {
                d = f[a];
                b = c.call(f, d, a);
                if (b === false) {
                    break
                }
            }
        }
    }
    return f
};
baidu.element.extend = function(a) {
    var b = baidu.element;
    baidu.object.each(a,
    function(d, c) {
        b.Element.prototype[c] = b._wrapFunction(d, -1)
    })
};
baidu.url = baidu.url || {};
baidu.url.escapeSymbol = function(a) {
    return String(a).replace(/\%/g, "%25").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/\ /g, "%20").replace(/\//g, "%2F").replace(/\#/g, "%23").replace(/\=/g, "%3D")
};
baidu.string = baidu.string || {};
baidu.string.escapeReg = function(a) {
    return String(a).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
};
baidu.url.getQueryValue = function(b, c) {
    var d = new RegExp("(^|&|\\?|#)" + baidu.string.escapeReg(c) + "=([^&]*)(&|\x24)", "");
    var a = b.match(d);
    if (a) {
        return a[2]
    }
    return null
};
baidu.url.jsonToQuery = function(f, d) {
    var b = [],
    a = 0,
    c,
    h,
    g;
    d = d ||
    function(i) {
        return baidu.url.escapeSymbol(i)
    };
    for (c in f) {
        if (f.hasOwnProperty(c)) {
            h = f[c];
            if (Object.prototype.toString.call(h) == "[object Array]") {
                g = h.length;
                while (g--) {
                    b[a++] = c + "=" + d(h[g], c)
                }
            } else {
                b[a++] = c + "=" + d(h, c)
            }
        }
    }
    return b.join("&")
};
baidu.url.queryToJson = function(a) {
    var g = a.substr(a.indexOf("?") + 1),
    c = g.split("&"),
    f = c.length,
    l = {},
    d = 0,
    j,
    h,
    k,
    b;
    for (; d < f; d++) {
        b = c[d].split("=");
        j = b[0];
        h = b[1];
        k = l[j];
        if ("undefined" == typeof k) {
            l[j] = h
        } else {
            if (Object.prototype.toString.call(k) == "[object Array]") {
                k.push(h)
            } else {
                l[j] = [k, h]
            }
        }
    }
    return l
};
baidu.fn.bind = function(b, a) {
    var c = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
    return function() {
        var f = baidu.lang.isString(b) ? a[b] : b,
        d = (c) ? c.concat([].slice.call(arguments, 0)) : arguments;
        return f.apply(a || f, d)
    }
};
baidu.json = baidu.json || {};
baidu.json.parse = function(a) {
    return (new Function("return " + a))()
};
baidu.json.stringify = (function() {
    var b = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    function a(g) {
        if (/["\\\x00-\x1f]/.test(g)) {
            g = g.replace(/["\\\x00-\x1f]/g,
            function(h) {
                var i = b[h];
                if (i) {
                    return i
                }
                i = h.charCodeAt();
                return "\\u00" + Math.floor(i / 16).toString(16) + (i % 16).toString(16)
            })
        }
        return '"' + g + '"'
    }
    function d(n) {
        var h = ["["],
        j = n.length,
        g,
        k,
        m;
        for (k = 0; k < j; k++) {
            m = n[k];
            switch (typeof m) {
            case "undefined":
            case "function":
            case "unknown":
                break;
            default:
                if (g) {
                    h.push(",")
                }
                h.push(baidu.json.stringify(m));
                g = 1
            }
        }
        h.push("]");
        return h.join("")
    }
    function c(g) {
        return g < 10 ? "0" + g: g
    }
    function f(g) {
        return '"' + g.getFullYear() + "-" + c(g.getMonth() + 1) + "-" + c(g.getDate()) + "T" + c(g.getHours()) + ":" + c(g.getMinutes()) + ":" + c(g.getSeconds()) + '"'
    }
    return function(k) {
        switch (typeof k) {
        case "undefined":
            return "undefined";
        case "number":
            return isFinite(k) ? String(k) : "null";
        case "string":
            return a(k);
        case "boolean":
            return String(k);
        default:
            if (k === null) {
                return "null"
            } else {
                if (k instanceof Array) {
                    return d(k)
                } else {
                    if (k instanceof Date) {
                        return f(k)
                    } else {
                        var h = ["{"],
                        j = baidu.json.stringify,
                        g,
                        i;
                        for (key in k) {
                            if (k.hasOwnProperty(key)) {
                                i = k[key];
                                switch (typeof i) {
                                case "undefined":
                                case "unknown":
                                case "function":
                                    break;
                                default:
                                    if (g) {
                                        h.push(",")
                                    }
                                    g = 1;
                                    h.push(j(key) + ":" + j(i))
                                }
                            }
                        }
                        h.push("}");
                        return h.join("")
                    }
                }
            }
        }
    }
})();
baidu.json.encode = function(a) {
    return baidu.json.stringify(a)
};
baidu.json.decode = function(a) {
    return baidu.json.parse(a)
};
baidu.cookie = baidu.cookie || {};
baidu.cookie._isValidKey = function(a) {
    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(a)
};
baidu.cookie.setRaw = function(c, d, b) {
    if (!baidu.cookie._isValidKey(c)) {
        return
    }
    b = b || {};
    var a = b.expires;
    if ("number" == typeof b.expires) {
        a = new Date();
        a.setTime(a.getTime() + b.expires)
    }
    document.cookie = c + "=" + d + (b.path ? "; path=" + b.path: "") + (a ? "; expires=" + a.toGMTString() : "") + (b.domain ? "; domain=" + b.domain: "") + (b.secure ? "; secure": "")
};
baidu.cookie.getRaw = function(b) {
    if (baidu.cookie._isValidKey(b)) {
        var c = new RegExp("(^| )" + b + "=([^;]*)(;|\x24)"),
        a = c.exec(document.cookie);
        if (a) {
            return a[2] || null
        }
    }
    return null
};
baidu.cookie.set = function(b, c, a) {
    baidu.cookie.setRaw(b, encodeURIComponent(c), a)
};
baidu.cookie.remove = function(b, a) {
    a = a || {};
    a.expires = new Date(0);
    baidu.cookie.setRaw(b, "", a)
};
baidu.cookie.get = function(a) {
    var b = baidu.cookie.getRaw(a);
    if ("string" == typeof b) {
        b = decodeURIComponent(b);
        return b
    }
    return null
};
baidu.date = baidu.date || {};
baidu.date.format = function(a, g) {
    if ("string" != typeof g) {
        return a.toString()
    }
    function d(m, l) {
        g = g.replace(m, l)
    }
    var b = baidu.number.pad,
    h = a.getFullYear(),
    f = a.getMonth() + 1,
    k = a.getDate(),
    i = a.getHours(),
    c = a.getMinutes(),
    j = a.getSeconds();
    d(/yyyy/g, b(h, 4));
    d(/yy/g, b(h.toString().slice(2), 2));
    d(/MM/g, b(f, 2));
    d(/M/g, f);
    d(/dd/g, b(k, 2));
    d(/d/g, k);
    d(/HH/g, b(i, 2));
    d(/H/g, i);
    d(/hh/g, b(i % 12, 2));
    d(/h/g, i % 12);
    d(/mm/g, b(c, 2));
    d(/m/g, c);
    d(/ss/g, b(j, 2));
    d(/s/g, j);
    return g
};
baidu.date.parse = function(c) {
    var a = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ("string" == typeof c) {
        if (a.test(c) || isNaN(Date.parse(c))) {
            var g = c.split(/ |T/),
            b = g.length > 1 ? g[1].split(/[^\d]/) : [0, 0, 0],
            f = g[0].split(/[^\d]/);
            return new Date(f[0] - 0, f[1] - 1, f[2] - 0, b[0] - 0, b[1] - 0, b[2] - 0)
        } else {
            return new Date(c)
        }
    }
    return new Date()
};
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
baidu.dom._styleFixer.display = baidu.browser.ie && baidu.browser.ie < 8 ? {
    set: function(a, b) {
        a = a.style;
        if (b == "inline-block") {
            a.display = "inline";
            a.zoom = 1
        } else {
            a.display = b
        }
    }
}: baidu.browser.firefox && baidu.browser.firefox < 3 ? {
    set: function(a, b) {
        a.style.display = b == "inline-block" ? "-moz-inline-box": b
    }
}: null;
baidu.dom._styleFixer["float"] = baidu.browser.ie ? "styleFloat": "cssFloat";
baidu.dom._styleFixer.opacity = baidu.browser.ie ? {
    get: function(a) {
        var b = a.style.filter;
        return b && b.indexOf("opacity=") >= 0 ? (parseFloat(b.match(/opacity=([^)]*)/)[1]) / 100) + "": "1"
    },
    set: function(a, c) {
        var b = a.style;
        b.filter = (b.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (c == 1 ? "": "alpha(opacity=" + c * 100 + ")");
        b.zoom = 1
    }
}: null;
baidu.dom._styleFixer.textOverflow = (function() {
    var b = {};
    function a(f) {
        var g = f.length;
        if (g > 0) {
            g = f[g - 1];
            f.length--
        } else {
            g = null
        }
        return g
    }
    function c(f, g) {
        f[baidu.browser.firefox ? "textContent": "innerText"] = g
    }
    function d(n, j, t) {
        var l = baidu.browser.ie ? n.currentStyle || n.style: getComputedStyle(n, null),
        s = l.fontWeight,
        r = "font-family:" + l.fontFamily + ";font-size:" + l.fontSize + ";word-spacing:" + l.wordSpacing + ";font-weight:" + ((parseInt(s) || 0) == 401 ? 700 : s) + ";font-style:" + l.fontStyle + ";font-variant:" + l.fontVariant,
        f = b[r];
        if (!f) {
            l = n.appendChild(document.createElement("div"));
            l.style.cssText = "float:left;" + r;
            f = b[r] = [];
            for (var p = 0; p < 256; p++) {
                p == 32 ? (l.innerHTML = "&nbsp;") : c(l, String.fromCharCode(p));
                f[p] = l.offsetWidth
            }
            c(l, "涓€");
            f[256] = l.offsetWidth;
            c(l, "涓€涓€");
            f[257] = l.offsetWidth - f[256] * 2;
            f[258] = f[".".charCodeAt(0)] * 3 + f[257] * 3;
            n.removeChild(l)
        }
        for (var m = n.firstChild,
        q = f[256], h = f[257], g = f[258], v = [], t = t ? g: 0; m; m = m.nextSibling) {
            if (j < t) {
                n.removeChild(m)
            } else {
                if (m.nodeType == 3) {
                    for (var p = 0,
                    u = m.nodeValue,
                    k = u.length; p < k; p++) {
                        l = u.charCodeAt(p);
                        v[v.length] = [j, m, p];
                        j -= (p ? h: 0) + (l < 256 ? f[l] : q);
                        if (j < t) {
                            break
                        }
                    }
                } else {
                    l = m.tagName;
                    if (l == "IMG" || l == "TABLE") {
                        l = m;
                        m = m.previousSibling;
                        n.removeChild(l)
                    } else {
                        v[v.length] = [j, m];
                        j -= m.offsetWidth
                    }
                }
            }
        }
        if (j < t) {
            while (l = a(v)) {
                j = l[0];
                m = l[1];
                l = l[2];
                if (m.nodeType == 3) {
                    if (j >= g) {
                        m.nodeValue = m.nodeValue.substring(0, l) + "...";
                        return true
                    } else {
                        if (!l) {
                            n.removeChild(m)
                        }
                    }
                } else {
                    if (d(m, j, true)) {
                        return true
                    } else {
                        n.removeChild(m)
                    }
                }
            }
            n.innerHTML = ""
        }
    }
    return {
        get: function(g, h) {
            var f = baidu.browser;
            return (f.opera ? h.OTextOverflow: f.firefox ? g._baiduOverflow: h.textOverflow) || "clip"
        },
        set: function(g, i) {
            var f = baidu.browser;
            if (g.tagName == "TD" || g.tagName == "TH" || f.firefox) {
                g._baiduHTML && (g.innerHTML = g._baiduHTML);
                if (i == "ellipsis") {
                    g._baiduHTML = g.innerHTML;
                    var j = document.createElement("div"),
                    h = g.appendChild(j).offsetWidth;
                    g.removeChild(j);
                    d(g, h)
                } else {
                    g._baiduHTML = ""
                }
            }
            j = g.style;
            f.opera ? (j.OTextOverflow = i) : f.firefox ? (g._baiduOverflow = i) : (j.textOverflow = i)
        }
    }
})();
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
baidu.dom._styleFilter.filter = function(b, f, g) {
    for (var a = 0,
    d = baidu.dom._styleFilter,
    c; c = d[a]; a++) {
        if (c = c[g]) {
            f = c(b, f)
        }
    }
    return f
};
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    set: function(a, b) {
        if (b.constructor == Number && !/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(a)) {
            b = b + "px"
        }
        return b
    }
};
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    get: function(c, d) {
        if (/color/i.test(c) && d.indexOf("rgb(") != -1) {
            var f = d.split(",");
            d = "#";
            for (var b = 0,
            a; a = f[b]; b++) {
                a = parseInt(a.replace(/[^\d]/gi, ""), 10).toString(16);
                d += a.length == 1 ? "0" + a: a
            }
            d = d.toUpperCase()
        }
        return d
    }
};
baidu.dom.g = function(a) {
    if ("string" == typeof a || a instanceof String) {
        return document.getElementById(a)
    } else {
        if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
            return a
        }
    }
    return null
};
baidu.g = baidu.G = baidu.dom.g;
baidu.dom.hasAttr = function(c, b) {
    c = baidu.g(c);
    var a = c.attributes.getNamedItem(b);
    return !! (a && a.specified)
}; (function() {
    var a = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
    baidu.string.trim = function(b) {
        return String(b).replace(a, "")
    }
})();
baidu.trim = baidu.string.trim;
baidu.dom.addClass = function(a, b) {
    a = baidu.dom.g(a);
    a.className += " " + b;
    return a
};
baidu.addClass = baidu.dom.addClass;
baidu.dom.removeClass = function(d, f) {
    d = baidu.dom.g(d);
    var b = d.className.split(/\s+/).sort(),
    g = f.split(/\s+/).sort(),
    c = b.length,
    a = g.length;
    for (; c && a;) {
        if (b[c - 1] == g[a - 1]) {
            b.splice(--c, 1)
        } else {
            if (b[c - 1] < g[a - 1]) {
                a--
            } else {
                c--
            }
        }
    }
    d.className = b.join(" ");
    return d
};
baidu.removeClass = baidu.dom.removeClass;
baidu.dom.hasClass = function(c, d) {
    c = baidu.dom.g(c);
    var b = baidu.string.trim(d).split(/\s+/),
    a = b.length;
    d = c.className.split(/\s+/).join(" ");
    while (a--) {
        if (! (new RegExp("(^| )" + b[a] + "( |\x24)")).test(d)) {
            return false
        }
    }
    return true
};
baidu.dom.toggleClass = function(a, b) {
    if (baidu.dom.hasClass(a, b)) {
        baidu.dom.removeClass(a, b)
    } else {
        baidu.dom.addClass(a, b)
    }
};
baidu.string.toCamelCase = function(a) {
    if (a.indexOf("-") < 0 && a.indexOf("_") < 0) {
        return a
    }
    return a.replace(/[-_][^-_]/g,
    function(b) {
        return b.charAt(1).toUpperCase()
    })
};
baidu.dom.getStyle = function(c, b) {
    var g = baidu.dom;
    c = g.g(c);
    b = baidu.string.toCamelCase(b);
    var f = c.style[b];
    if (!f) {
        var a = g._styleFixer[b],
        d = c.currentStyle || (baidu.browser.ie ? c.style: getComputedStyle(c, null));
        if ("string" == typeof a) {
            f = d[a]
        } else {
            if (a && a.get) {
                f = a.get(c, d)
            } else {
                f = d[b]
            }
        }
    }
    if (a = g._styleFilter) {
        f = a.filter(b, f, "get")
    }
    return f
};
baidu.getStyle = baidu.dom.getStyle;
baidu.event._unload = function() {
    var c = baidu.event._listeners,
    a = c.length,
    b = !!window.removeEventListener,
    f, d;
    while (a--) {
        f = c[a];
        if (f[1] == "unload") {
            continue
        }
        d = f[0];
        if (d.removeEventListener) {
            d.removeEventListener(f[1], f[3], false)
        } else {
            if (d.detachEvent) {
                d.detachEvent("on" + f[1], f[3])
            }
        }
    }
    if (b) {
        window.removeEventListener("unload", baidu.event._unload, false)
    } else {
        window.detachEvent("onunload", baidu.event._unload)
    }
};
if (window.attachEvent) {
    window.attachEvent("onunload", baidu.event._unload)
} else {
    window.addEventListener("unload", baidu.event._unload, false)
}
baidu.event._listeners = baidu.event._listeners || [];
baidu.event.on = function(b, f, h) {
    f = f.replace(/^on/i, "").toLowerCase();
    b = baidu.dom._g(b);
    var g = function(j) {
        h.call(b, j)
    },
    a = baidu.event._listeners,
    d = baidu.event._eventFilter,
    i,
    c = f;
    if (d && d[f]) {
        i = d[f](b, f, g);
        c = i.type;
        g = i.listener
    }
    if (b.addEventListener) {
        b.addEventListener(c, g, false)
    } else {
        if (b.attachEvent) {
            b.attachEvent("on" + c, g)
        }
    }
    a[a.length] = [b, f, h, g, c];
    return b
};
baidu.on = baidu.event.on;
baidu.event.un = function(c, g, b) {
    c = baidu.dom._g(c);
    g = g.replace(/^on/i, "");
    var j = baidu.event._listeners,
    d = j.length,
    f = !b,
    i, h, a;
    while (d--) {
        i = j[d];
        if (i[1] === g && i[0] === c && (f || i[2] === b)) {
            h = i[4];
            a = i[3];
            if (c.removeEventListener) {
                c.removeEventListener(h, a, false)
            } else {
                if (c.detachEvent) {
                    c.detachEvent("on" + h, a)
                }
            }
            j.splice(d, 1)
        }
    }
    return c
};
baidu.un = baidu.event.un;
baidu.event.preventDefault = function(a) {
    if (a.preventDefault) {
        a.preventDefault()
    } else {
        a.returnValue = false
    }
};
baidu.object.extend = function(c, a) {
    for (var b in a) {
        if (a.hasOwnProperty(b)) {
            c[b] = a[b]
        }
    }
    return c
};
baidu.extend = baidu.object.extend;
baidu.page = baidu.page || {};
baidu.page.getScrollTop = function() {
    var a = document;
    return window.pageYOffset || a.documentElement.scrollTop || a.body.scrollTop
};
baidu.page.getScrollLeft = function() {
    var a = document;
    return window.pageXOffset || a.documentElement.scrollLeft || a.body.scrollLeft
}; (function() {
    baidu.page.getMousePosition = function() {
        return {
            x: baidu.page.getScrollLeft() + a.x,
            y: baidu.page.getScrollTop() + a.y
        }
    };
    var a = {
        x: 0,
        y: 0
    };
    baidu.event.on(document, "onmousemove",
    function(b) {
        b = window.event || b;
        a.x = b.clientX;
        a.y = b.clientY
    })
})();
baidu.lang.isFunction = function(a) {
    return "[object Function]" == Object.prototype.toString.call(a)
}; (function() {
    var l, k, g, d, o, h, p, a, n, f = baidu.lang.isFunction,
    c;
    baidu.dom.drag = function(r, q) {
        n = a = null;
        if (! (l = baidu.dom.g(r))) {
            return false
        }
        k = baidu.object.extend({
            autoStop: true,
            capture: true,
            interval: 20
        },
        q);
        o = parseInt(baidu.dom.getStyle(l, "top")) || 0;
        h = parseInt(baidu.dom.getStyle(l, "left")) || 0;
        if (k.mouseEvent) {
            g = baidu.page.getScrollLeft() + k.mouseEvent.clientX;
            d = baidu.page.getScrollTop() + k.mouseEvent.clientY
        } else {
            var s = baidu.page.getMousePosition();
            g = s.x;
            d = s.y
        }
        c = setInterval(b, k.interval);
        k.autoStop && baidu.event.on(document, "mouseup", m);
        baidu.event.on(document.body, "selectstart", i);
        if (k.capture && l.setCapture) {
            l.setCapture()
        } else {
            if (k.capture && window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
            }
        }
        p = document.body.style.MozUserSelect;
        document.body.style.MozUserSelect = "none";
        if (f(k.ondragstart)) {
            k.ondragstart(l, k)
        }
        return {
            stop: m,
            dispose: m,
            update: j
        }
    };
    function j(q) {
        baidu.extend(k, q)
    }
    function m() {
        clearTimeout(c);
        if (k.capture && l.releaseCapture) {
            l.releaseCapture()
        } else {
            if (k.capture && window.releaseEvents) {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
            }
        }
        document.body.style.MozUserSelect = p;
        baidu.event.un(document.body, "selectstart", i);
        k.autoStop && baidu.event.un(document, "mouseup", m);
        if (f(k.ondragend)) {
            k.ondragend(l, k)
        }
    }
    function b(u) {
        var q = k.range,
        t = baidu.page.getMousePosition(),
        r = h + t.x - g,
        s = o + t.y - d;
        if (typeof q == "object" && q && q.length == 4) {
            r = Math.max(q[3], r);
            r = Math.min(q[1] - l.offsetWidth, r);
            s = Math.max(q[0], s);
            s = Math.min(q[2] - l.offsetHeight, s)
        }
        l.style.top = s + "px";
        l.style.left = r + "px";
        if ((a !== r || n !== s) && (a !== null || n !== null)) {
            if (f(k.ondrag)) {
                k.ondrag(l, k)
            }
        }
        a = r;
        n = s
    }
    function i(q) {
        return baidu.event.preventDefault(q, false)
    }
})();
baidu.lang.guid = function() {
    return "TANGRAM__" + (window[baidu.guid]._counter++).toString(36)
};
window[baidu.guid]._counter = window[baidu.guid]._counter || 1;
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class = function(a) {
    this.guid = a || baidu.lang.guid();
    window[baidu.guid]._instances[this.guid] = this
};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class.prototype.dispose = function() {
    delete window[baidu.guid]._instances[this.guid];
    for (var a in this) {
        if (typeof this[a] != "function") {
            delete this[a]
        }
    }
    this.disposed = true
};
baidu.lang.Class.prototype.toString = function() {
    return "[object " + (this._className || "Object") + "]"
};
baidu.dom.draggable = function(b, l) {
    l = baidu.object.extend({
        toggle: function() {
            return true
        }
    },
    l || {});
    l.autoStop = true;
    b = baidu.dom.g(b);
    l.handler = l.handler || b;
    var a, j = ["ondragstart", "ondrag", "ondragend"],
    c = j.length - 1,
    d,
    k,
    g = {
        dispose: function() {
            k && k.dispose();
            baidu.event.un(l.handler, "onmousedown", h);
            baidu.lang.Class.prototype.dispose.call(g)
        }
    },
    f = this;
    if (a = baidu.dom.ddManager) {
        for (; c >= 0; c--) {
            d = j[c];
            l[d] = (function(i) {
                var m = l[i];
                return function() {
                    baidu.lang.isFunction(m) && m.apply(f, arguments);
                    a.dispatchEvent(i, {
                        DOM: b
                    })
                }
            })(d)
        }
    }
    if (b && baidu.dom.getStyle(b, "position") != "static") {
        function h(i) {
            l.mouseEvent = window.event || i;
            if (typeof l.toggle == "function" && !l.toggle()) {
                return
            }
            k = baidu.dom.drag(b, l);
            g.stop = k.stop;
            g.update = k.update
        }
        baidu.event.on(l.handler, "onmousedown", h)
    }
    return {
        cancel: function() {
            g.dispose()
        }
    }
};
baidu.lang.createSingle = function(b) {
    var d = new baidu.lang.Class();
    for (var a in b) {
        d[a] = b[a]
    }
    return d
};
baidu.lang.Event = function(a, b) {
    this.type = a;
    this.returnValue = true;
    this.target = b || null;
    this.currentTarget = null
};
baidu.lang.Class.prototype.addEventListener = function(d, c, b) {
    if (typeof c != "function") {
        return
    } ! this.__listeners && (this.__listeners = {});
    var a = this.__listeners,
    f;
    if (typeof b == "string" && b) {
        if (/[^\w\-]/.test(b)) {
            throw ("nonstandard key:" + b)
        } else {
            c.hashCode = b;
            f = b
        }
    }
    d.indexOf("on") != 0 && (d = "on" + d);
    typeof a[d] != "object" && (a[d] = {});
    f = f || baidu.lang.guid();
    c.hashCode = f;
    a[d][f] = c
};
baidu.lang.Class.prototype.removeEventListener = function(c, b) {
    if (typeof b == "function") {
        b = b.hashCode
    } else {
        if (typeof b != "string") {
            return
        }
    } ! this.__listeners && (this.__listeners = {});
    c.indexOf("on") != 0 && (c = "on" + c);
    var a = this.__listeners;
    if (!a[c]) {
        return
    }
    a[c][b] && delete a[c][b]
};
baidu.lang.Class.prototype.dispatchEvent = function(d, a) {
    if ("string" == typeof d) {
        d = new baidu.lang.Event(d)
    } ! this.__listeners && (this.__listeners = {});
    a = a || {};
    for (var c in a) {
        d[c] = a[c]
    }
    var c, b = this.__listeners,
    f = d.type;
    d.target = d.target || this;
    d.currentTarget = this;
    f.indexOf("on") != 0 && (f = "on" + f);
    typeof this[f] == "function" && this[f].apply(this, arguments);
    if (typeof b[f] == "object") {
        for (c in b[f]) {
            b[f][c].apply(this, arguments)
        }
    }
    return d.returnValue
};
baidu.dom.ddManager = baidu.lang.createSingle({
    _targetsDroppingOver: {}
});
baidu.dom.getDocument = function(a) {
    a = baidu.dom.g(a);
    return a.nodeType == 9 ? a: a.ownerDocument || a.document
};
baidu.dom.getPosition = function(b) {
    b = baidu.dom.g(b);
    var l = baidu.dom.getDocument(b),
    f = baidu.browser,
    i = baidu.dom.getStyle,
    d = f.isGecko > 0 && l.getBoxObjectFor && i(b, "position") == "absolute" && (b.style.top === "" || b.style.left === ""),
    j = {
        left: 0,
        top: 0
    },
    h = (f.ie && !f.isStrict) ? l.body: l.documentElement,
    m,
    c;
    if (b == h) {
        return j
    }
    if (b.getBoundingClientRect) {
        c = b.getBoundingClientRect();
        j.left = Math.floor(c.left) + Math.max(l.documentElement.scrollLeft, l.body.scrollLeft);
        j.top = Math.floor(c.top) + Math.max(l.documentElement.scrollTop, l.body.scrollTop);
        j.left -= l.documentElement.clientLeft;
        j.top -= l.documentElement.clientTop;
        var k = l.body,
        n = parseInt(i(k, "borderLeftWidth")),
        g = parseInt(i(k, "borderTopWidth"));
        if (f.ie && !f.isStrict) {
            j.left -= isNaN(n) ? 2 : n;
            j.top -= isNaN(g) ? 2 : g
        }
    } else {
        if (l.getBoxObjectFor && !d) {
            c = l.getBoxObjectFor(b);
            var a = l.getBoxObjectFor(h);
            j.left = c.screenX - a.screenX;
            j.top = c.screenY - a.screenY
        } else {
            m = b;
            do {
                j.left += m.offsetLeft;
                j.top += m.offsetTop;
                if (f.isWebkit > 0 && i(m, "position") == "fixed") {
                    j.left += l.body.scrollLeft;
                    j.top += l.body.scrollTop;
                    break
                }
                m = m.offsetParent
            } while ( m && m != b );
            if (f.opera > 0 || (f.isWebkit > 0 && i(b, "position") == "absolute")) {
                j.top -= l.body.offsetTop
            }
            m = b.offsetParent;
            while (m && m != l.body) {
                j.left -= m.scrollLeft;
                if (!f.opera || m.tagName != "TR") {
                    j.top -= m.scrollTop
                }
                m = m.offsetParent
            }
        }
    }
    return j
};
baidu.dom.intersect = function(j, i) {
    var h = baidu.dom.g,
    f = baidu.dom.getPosition,
    a = Math.max,
    c = Math.min;
    j = h(j);
    i = h(i);
    var d = f(j),
    b = f(i);
    return a(d.left, b.left) <= c(d.left + j.offsetWidth, b.left + i.offsetWidth) && a(d.top, b.top) <= c(d.top + j.offsetHeight, b.top + i.offsetHeight)
};
baidu.dom.droppable = function(d, b) {
    b = b || {};
    var c = baidu.dom.ddManager,
    g = baidu.dom.g(d),
    f = function(i) {
        var h = c._targetsDroppingOver;
        if (baidu.dom.intersect(g, i.DOM)) {
            if (!h[g]) { (typeof b.ondropover == "function") && b.ondropover.call(g, i.DOM);
                c.dispatchEvent("ondropover", {
                    trigger: i.DOM,
                    reciever: g
                });
                h[g] = true
            }
        } else {
            if (h[g]) { (typeof b.ondropout == "function") && b.ondropout.call(g, i.DOM);
                c.dispatchEvent("ondropout", {
                    trigger: i.DOM,
                    reciever: g
                })
            }
            delete h[g]
        }
    },
    a = function(h) {
        if (baidu.dom.intersect(g, h.DOM)) {
            typeof b.ondrop == "function" && b.ondrop.call(g, h.DOM);
            c.dispatchEvent("ondrop", {
                trigger: h.DOM,
                reciever: g
            })
        }
        delete c._targetsDroppingOver[g]
    };
    c.addEventListener("ondrag", f);
    c.addEventListener("ondragend", a);
    return {
        cancel: function() {
            c.removeEventListener("ondrag", f);
            c.removeEventListener("ondragend", a)
        }
    }
};
baidu.dom._NAME_ATTRS = (function() {
    var a = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    if (baidu.browser.ie < 8) {
        a["for"] = "htmlFor";
        a["class"] = "className"
    } else {
        a.htmlFor = "for";
        a.className = "class"
    }
    return a
})();
baidu.dom.setAttr = function(b, a, c) {
    b = baidu.dom.g(b);
    if ("style" == a) {
        b.style.cssText = c
    } else {
        a = baidu.dom._NAME_ATTRS[a] || a;
        b.setAttribute(a, c)
    }
    return b
};
baidu.setAttr = baidu.dom.setAttr;
baidu.dom.setAttrs = function(c, a) {
    c = baidu.dom.g(c);
    for (var b in a) {
        baidu.dom.setAttr(c, b, a[b])
    }
    return c
};
baidu.setAttrs = baidu.dom.setAttrs;
baidu.dom.getAttr = function(b, a) {
    b = baidu.dom.g(b);
    if ("style" == a) {
        return b.style.cssText
    }
    a = baidu.dom._NAME_ATTRS[a] || a;
    return b.getAttribute(a)
};
baidu.getAttr = baidu.dom.getAttr;
baidu.dom._matchNode = function(a, c, d) {
    a = baidu.dom.g(a);
    for (var b = a[d]; b; b = b[c]) {
        if (b.nodeType == 1) {
            return b
        }
    }
    return null
};
baidu.dom.prev = function(a) {
    return baidu.dom._matchNode(a, "previousSibling", "previousSibling")
};
baidu.dom.contains = function(a, b) {
    var c = baidu.dom._g;
    a = c(a);
    b = c(b);
    return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16)
};
baidu.dom.setStyle = function(c, b, d) {
    var f = baidu.dom,
    a;
    c = f.g(c);
    b = baidu.string.toCamelCase(b);
    if (a = f._styleFilter) {
        d = a.filter(b, d, "set")
    }
    a = f._styleFixer[b]; (a && a.set) ? a.set(c, d) : (c.style[a || b] = d);
    return c
};
baidu.setStyle = baidu.dom.setStyle;
baidu.dom.setStyles = function(b, c) {
    b = baidu.dom.g(b);
    for (var a in c) {
        baidu.dom.setStyle(b, a, c[a])
    }
    return b
};
baidu.setStyles = baidu.dom.setStyles;
baidu.dom.create = function(b, a) {
    a = a || {};
    var c = document.createElement(b);
    return baidu.dom.setAttrs(c, a)
};
baidu.lang.isNumber = function(a) {
    return "[object Number]" == Object.prototype.toString.call(a)
};
baidu.dom.resizable = function(f, q) {
    var j, k, h, a, n = {},
    b, p, o, g = {},
    d, i = {
        Width: {
            offset: "offsetWidth",
            style: ["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"]
        },
        Height: {
            offset: "offsetHeight",
            style: ["paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"]
        }
    },
    l = baidu.dom.getStyle;
    if (! (j = baidu.dom.g(f))) {
        return false
    }
    h = baidu.object.extend({
        handle: ["e", "s", "se"],
        minWidth: 16,
        minHeight: 16,
        resizeContainer: true,
        classPrefix: "tangram"
    },
    q);
    if (! (h.container && (k = baidu.dom.g(h.container)))) {
        k = j;
        h.resizeContainer = false
    }
    d = [[j, "Width", "", "offsetWidth"], [j, "Height", "", "offsetHeight"], [k, "Width", "c", "offsetWidth"], [k, "Height", "c", "offsetHeight"]];
    if (l(j, "position") == "static" && l(k, "position") == "static") {
        return
    }
    baidu.each(["minheight", "minwidth", "maxheight", "maxwidth"],
    function(r) {
        h[r] && (h[r] = parseInt(h[r]))
    });
    b = {
        e: {
            right: "-5px",
            top: "0px",
            width: "7px",
            height: "100%"
        },
        s: {
            left: "0px",
            bottom: "-5px",
            height: "7px",
            width: "100%"
        },
        se: {
            right: "1px",
            bottom: "1px",
            height: "16px",
            width: "16px"
        }
    };
    baidu.each(h.handle,
    function(u) {
        var s = h.classPrefix.split(" ");
        s[0] = s[0] + "-resizable-" + u;
        var v = baidu.dom.create("div", {
            className: s.join(" ")
        }),
        t = b[u],
        r;
        t.cursor = u + "-resize";
        t.position = "absolute";
        baidu.setStyles(v, t);
        k.appendChild(v);
        n[u] = v;
        baidu.on(v, "mousedown",
        function() {
            o = c(u);
            r = {
                e: [0, h.maxWidth ? h.maxWidth: Number.POSITIVE_INFINITY, g.orgcHeight.offset, h.minWidth],
                s: [h.minHeight, g.orgcWidth.offset, h.maxHeight ? h.maxHeight: Number.POSITIVE_INFINITY, 0],
                se: [h.minHeight, h.maxWidth ? h.maxWidth: Number.POSITIVE_INFINITY, h.maxHeight ? h.maxHeight: Number.POSITIVE_INFINITY, h.minWidth]
            };
            baidu.dom.drag(v, {
                ondragstart: function() {
                    baidu.object.each(g,
                    function(y, w) {
                        if (isNaN(y.v)) {
                            var x = y.target[i[y.direction].offset];
                            baidu.each(i[y.direction].style,
                            function(z) {
                                x -= (parseFloat(l(y.target, z)) || 0)
                            });
                            g[w].value = x
                        }
                    });
                    typeof(h.onresizestart) === "function" && h.onresizestart(arguments)
                },
                ondrag: function() {
                    var w = {
                        width: parseInt(v.style.left) - o.left,
                        height: parseInt(v.style.top) - o.top
                    };
                    baidu.setStyles(j, {
                        width: w.width + g.orgWidth.value,
                        height: w.height + g.orgHeight.value
                    });
                    if (h.resizeContainer) {
                        baidu.setStyles(k, {
                            width: w.width + g.orgcWidth.value,
                            height: w.height + g.orgcHeight.value
                        })
                    }
                    n.e && baidu.setStyle(n.e, "height", k.offsetHeight);
                    typeof(h.onresize) === "function" && h.onresize(arguments)
                },
                ondragend: function() {
                    m();
                    baidu.object.each(n,
                    function(x, w) {
                        baidu.each(["top", "left", "right", "bottom"],
                        function(y) {
                            baidu.setStyle(x, y, "")
                        });
                        baidu.setStyles(x, b[w])
                    });
                    n.e && baidu.setStyle(n.e, "height", k.offsetHeight);
                    typeof(h.onresizeend) === "function" && h.onresizeend(arguments)
                },
                range: r[u]
            })
        })
    });
    function c(s) {
        var t = {
            right: "",
            bottom: ""
        },
        u = n[s],
        r = b[s];
        m();
        t.top = parseInt(r.top);
        t.left = parseInt(r.left);
        if (s.indexOf("e") >= 0) {
            t.left = g.orgcWidth.value - parseInt(r.width) - parseInt(r.right) + (parseFloat(l(k, "paddingLeft")) || 0) + (parseFloat(l(k, "paddingRight")) || 0)
        }
        if (s.indexOf("s") >= 0) {
            t.top = g.orgcHeight.value - parseInt(r.height) - parseInt(r.bottom) + (parseFloat(l(k, "paddingTop")) || 0) + (parseFloat(l(k, "paddingBottom")) || 0)
        }
        baidu.setStyles(u, t);
        return t
    }
    function m() {
        function r(u, v) {
            v = v.toLowerCase();
            var s = l(u, v);
            if (s == "auto" || s.indexOf("%") > 0) {
                return s
            }
            return parseFloat(l(u, v)) || 0
        }
        baidu.each(d,
        function(s) {
            g["org" + s[2] + s[1]] = {
                value: r(s[0], s[1]),
                direction: s[1],
                target: s[0],
                offset: s[0][s[3]]
            }
        })
    }
};
baidu.dom.children = function(b) {
    b = baidu.dom.g(b);
    for (var a = [], c = b.firstChild; c; c = c.nextSibling) {
        if (c.nodeType == 1) {
            a.push(c)
        }
    }
    return a
};
baidu.dom.getParent = function(a) {
    a = baidu.dom._g(a);
    return a.parentElement || a.parentNode || null
};
baidu.dom.q = function(j, f, b) {
    var k = [],
    d = baidu.string.trim,
    h,
    g,
    a,
    c;
    if (! (j = d(j))) {
        return null
    }
    if ("undefined" == typeof f) {
        f = document
    } else {
        f = baidu.dom.g(f);
        if (!f) {
            return k
        }
    }
    b && (b = d(b).toUpperCase());
    if (f.getElementsByClassName) {
        a = f.getElementsByClassName(j);
        h = a.length;
        for (g = 0; g < h; g++) {
            c = a[g];
            if (b && c.tagName != b) {
                continue
            }
            k[k.length] = c
        }
    } else {
        j = new RegExp("(^|\\s)" + baidu.string.escapeReg(j) + "(\\s|\x24)");
        a = b ? f.getElementsByTagName(b) : (f.all || f.getElementsByTagName("*"));
        h = a.length;
        for (g = 0; g < h; g++) {
            c = a[g];
            j.test(c.className) && (k[k.length] = c)
        }
    }
    return k
};
baidu.q = baidu.Q = baidu.dom.q;
baidu.dom.last = function(a) {
    return baidu.dom._matchNode(a, "previousSibling", "lastChild")
};
baidu.dom.ready = function() {
    var c = false,
    f = false,
    d = [];
    function a() {
        if (!c) {
            c = true;
            for (var h = 0,
            g = d.length; h < g; h++) {
                d[h]()
            }
        }
    }
    function b() {
        if (f) {
            return
        }
        f = true;
        var j = document,
        h = window,
        g = baidu.browser.opera;
        if (j.addEventListener && !g) {
            j.addEventListener("DOMContentLoaded", g ?
            function() {
                if (c) {
                    return
                }
                for (var k = 0; k < j.styleSheets.length; k++) {
                    if (j.styleSheets[k].disabled) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                }
                a()
            }: a, false)
        } else {
            if (baidu.browser.ie && h == top) { (function() {
                    if (c) {
                        return
                    }
                    try {
                        j.documentElement.doScroll("left")
                    } catch(k) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    a()
                })()
            } else {
                if (baidu.browser.safari) {
                    var i; (function() {
                        if (c) {
                            return
                        }
                        if (j.readyState != "loaded" && j.readyState != "complete") {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        if (i === undefined) {
                            i = 0;
                            var n = j.getElementsByTagName("style"),
                            l = j.getElementsByTagName("link");
                            if (n) {
                                i += n.length
                            }
                            if (l) {
                                for (var m = 0,
                                k = l.length; m < k; m++) {
                                    if (l[m].getAttribute("rel") == "stylesheet") {
                                        i++
                                    }
                                }
                            }
                        }
                        if (j.styleSheets.length != i) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        a()
                    })()
                }
            }
        }
        h.attachEvent ? h.attachEvent("onload", a) : h.addEventListener("load", a, false)
    }
    return function(g) {
        b();
        c ? g() : (d[d.length] = g)
    }
} (); (function() {
    var p = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
    j = 0,
    d = Object.prototype.toString,
    o = false,
    i = true; [0, 0].sort(function() {
        i = false;
        return 0
    });
    var b = function(w, r, z, A) {
        z = z || [];
        r = r || document;
        var C = r;
        if (r.nodeType !== 1 && r.nodeType !== 9) {
            return []
        }
        if (!w || typeof w !== "string") {
            return z
        }
        var x = [],
        t,
        E,
        H,
        s,
        v = true,
        u = b.isXML(r),
        B = w,
        D,
        G,
        F,
        y;
        do {
            p.exec("");
            t = p.exec(B);
            if (t) {
                B = t[3];
                x.push(t[1]);
                if (t[2]) {
                    s = t[3];
                    break
                }
            }
        } while ( t );
        if (x.length > 1 && k.exec(w)) {
            if (x.length === 2 && f.relative[x[0]]) {
                E = h(x[0] + x[1], r)
            } else {
                E = f.relative[x[0]] ? [r] : b(x.shift(), r);
                while (x.length) {
                    w = x.shift();
                    if (f.relative[w]) {
                        w += x.shift()
                    }
                    E = h(w, E)
                }
            }
        } else {
            if (!A && x.length > 1 && r.nodeType === 9 && !u && f.match.ID.test(x[0]) && !f.match.ID.test(x[x.length - 1])) {
                D = b.find(x.shift(), r, u);
                r = D.expr ? b.filter(D.expr, D.set)[0] : D.set[0]
            }
            if (r) {
                D = A ? {
                    expr: x.pop(),
                    set: a(A)
                }: b.find(x.pop(), x.length === 1 && (x[0] === "~" || x[0] === "+") && r.parentNode ? r.parentNode: r, u);
                E = D.expr ? b.filter(D.expr, D.set) : D.set;
                if (x.length > 0) {
                    H = a(E)
                } else {
                    v = false
                }
                while (x.length) {
                    G = x.pop();
                    F = G;
                    if (!f.relative[G]) {
                        G = ""
                    } else {
                        F = x.pop()
                    }
                    if (F == null) {
                        F = r
                    }
                    f.relative[G](H, F, u)
                }
            } else {
                H = x = []
            }
        }
        if (!H) {
            H = E
        }
        if (!H) {
            b.error(G || w)
        }
        if (d.call(H) === "[object Array]") {
            if (!v) {
                z.push.apply(z, H)
            } else {
                if (r && r.nodeType === 1) {
                    for (y = 0; H[y] != null; y++) {
                        if (H[y] && (H[y] === true || H[y].nodeType === 1 && b.contains(r, H[y]))) {
                            z.push(E[y])
                        }
                    }
                } else {
                    for (y = 0; H[y] != null; y++) {
                        if (H[y] && H[y].nodeType === 1) {
                            z.push(E[y])
                        }
                    }
                }
            }
        } else {
            a(H, z)
        }
        if (s) {
            b(s, C, z, A);
            b.uniqueSort(z)
        }
        return z
    };
    b.uniqueSort = function(s) {
        if (c) {
            o = i;
            s.sort(c);
            if (o) {
                for (var r = 1; r < s.length; r++) {
                    if (s[r] === s[r - 1]) {
                        s.splice(r--, 1)
                    }
                }
            }
        }
        return s
    };
    b.matches = function(r, s) {
        return b(r, null, null, s)
    };
    b.find = function(y, r, z) {
        var x;
        if (!y) {
            return []
        }
        for (var u = 0,
        t = f.order.length; u < t; u++) {
            var w = f.order[u],
            v;
            if ((v = f.leftMatch[w].exec(y))) {
                var s = v[1];
                v.splice(1, 1);
                if (s.substr(s.length - 1) !== "\\") {
                    v[1] = (v[1] || "").replace(/\\/g, "");
                    x = f.find[w](v, r, z);
                    if (x != null) {
                        y = y.replace(f.match[w], "");
                        break
                    }
                }
            }
        }
        if (!x) {
            x = r.getElementsByTagName("*")
        }
        return {
            set: x,
            expr: y
        }
    };
    b.filter = function(C, B, F, v) {
        var t = C,
        H = [],
        z = B,
        x,
        r,
        y = B && B[0] && b.isXML(B[0]);
        while (C && B.length) {
            for (var A in f.filter) {
                if ((x = f.leftMatch[A].exec(C)) != null && x[2]) {
                    var s = f.filter[A],
                    G,
                    E,
                    u = x[1];
                    r = false;
                    x.splice(1, 1);
                    if (u.substr(u.length - 1) === "\\") {
                        continue
                    }
                    if (z === H) {
                        H = []
                    }
                    if (f.preFilter[A]) {
                        x = f.preFilter[A](x, z, F, H, v, y);
                        if (!x) {
                            r = G = true
                        } else {
                            if (x === true) {
                                continue
                            }
                        }
                    }
                    if (x) {
                        for (var w = 0; (E = z[w]) != null; w++) {
                            if (E) {
                                G = s(E, x, w, z);
                                var D = v ^ !!G;
                                if (F && G != null) {
                                    if (D) {
                                        r = true
                                    } else {
                                        z[w] = false
                                    }
                                } else {
                                    if (D) {
                                        H.push(E);
                                        r = true
                                    }
                                }
                            }
                        }
                    }
                    if (G !== undefined) {
                        if (!F) {
                            z = H
                        }
                        C = C.replace(f.match[A], "");
                        if (!r) {
                            return []
                        }
                        break
                    }
                }
            }
            if (C === t) {
                if (r == null) {
                    b.error(C)
                } else {
                    break
                }
            }
            t = C
        }
        return z
    };
    b.error = function(r) {
        throw "Syntax error, unrecognized expression: " + r
    };
    var f = b.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
            "class": "className",
            "for": "htmlFor"
        },
        attrHandle: {
            href: function(r) {
                return r.getAttribute("href")
            }
        },
        relative: {
            "+": function(x, s) {
                var u = typeof s === "string",
                w = u && !/\W/.test(s),
                y = u && !w;
                if (w) {
                    s = s.toLowerCase()
                }
                for (var t = 0,
                r = x.length,
                v; t < r; t++) {
                    if ((v = x[t])) {
                        while ((v = v.previousSibling) && v.nodeType !== 1) {}
                        x[t] = y || v && v.nodeName.toLowerCase() === s ? v || false: v === s
                    }
                }
                if (y) {
                    b.filter(s, x, true)
                }
            },
            ">": function(x, s) {
                var v = typeof s === "string",
                w, t = 0,
                r = x.length;
                if (v && !/\W/.test(s)) {
                    s = s.toLowerCase();
                    for (; t < r; t++) {
                        w = x[t];
                        if (w) {
                            var u = w.parentNode;
                            x[t] = u.nodeName.toLowerCase() === s ? u: false
                        }
                    }
                } else {
                    for (; t < r; t++) {
                        w = x[t];
                        if (w) {
                            x[t] = v ? w.parentNode: w.parentNode === s
                        }
                    }
                    if (v) {
                        b.filter(s, x, true)
                    }
                }
            },
            "": function(u, s, w) {
                var t = j++,
                r = q,
                v;
                if (typeof s === "string" && !/\W/.test(s)) {
                    s = s.toLowerCase();
                    v = s;
                    r = n
                }
                r("parentNode", s, t, u, v, w)
            },
            "~": function(u, s, w) {
                var t = j++,
                r = q,
                v;
                if (typeof s === "string" && !/\W/.test(s)) {
                    s = s.toLowerCase();
                    v = s;
                    r = n
                }
                r("previousSibling", s, t, u, v, w)
            }
        },
        find: {
            ID: function(s, t, u) {
                if (typeof t.getElementById !== "undefined" && !u) {
                    var r = t.getElementById(s[1]);
                    return r ? [r] : []
                }
            },
            NAME: function(t, w) {
                if (typeof w.getElementsByName !== "undefined") {
                    var s = [],
                    v = w.getElementsByName(t[1]);
                    for (var u = 0,
                    r = v.length; u < r; u++) {
                        if (v[u].getAttribute("name") === t[1]) {
                            s.push(v[u])
                        }
                    }
                    return s.length === 0 ? null: s
                }
            },
            TAG: function(r, s) {
                return s.getElementsByTagName(r[1])
            }
        },
        preFilter: {
            CLASS: function(u, s, t, r, x, y) {
                u = " " + u[1].replace(/\\/g, "") + " ";
                if (y) {
                    return u
                }
                for (var v = 0,
                w; (w = s[v]) != null; v++) {
                    if (w) {
                        if (x ^ (w.className && (" " + w.className + " ").replace(/[\t\n]/g, " ").indexOf(u) >= 0)) {
                            if (!t) {
                                r.push(w)
                            }
                        } else {
                            if (t) {
                                s[v] = false
                            }
                        }
                    }
                }
                return false
            },
            ID: function(r) {
                return r[1].replace(/\\/g, "")
            },
            TAG: function(s, r) {
                return s[1].toLowerCase()
            },
            CHILD: function(r) {
                if (r[1] === "nth") {
                    var s = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(r[2] === "even" && "2n" || r[2] === "odd" && "2n+1" || !/\D/.test(r[2]) && "0n+" + r[2] || r[2]);
                    r[2] = (s[1] + (s[2] || 1)) - 0;
                    r[3] = s[3] - 0
                }
                r[0] = j++;
                return r
            },
            ATTR: function(v, s, t, r, w, x) {
                var u = v[1].replace(/\\/g, "");
                if (!x && f.attrMap[u]) {
                    v[1] = f.attrMap[u]
                }
                if (v[2] === "~=") {
                    v[4] = " " + v[4] + " "
                }
                return v
            },
            PSEUDO: function(v, s, t, r, w) {
                if (v[1] === "not") {
                    if ((p.exec(v[3]) || "").length > 1 || /^\w/.test(v[3])) {
                        v[3] = b(v[3], null, null, s)
                    } else {
                        var u = b.filter(v[3], s, t, true ^ w);
                        if (!t) {
                            r.push.apply(r, u)
                        }
                        return false
                    }
                } else {
                    if (f.match.POS.test(v[0]) || f.match.CHILD.test(v[0])) {
                        return true
                    }
                }
                return v
            },
            POS: function(r) {
                r.unshift(true);
                return r
            }
        },
        filters: {
            enabled: function(r) {
                return r.disabled === false && r.type !== "hidden"
            },
            disabled: function(r) {
                return r.disabled === true
            },
            checked: function(r) {
                return r.checked === true
            },
            selected: function(r) {
                r.parentNode.selectedIndex;
                return r.selected === true
            },
            parent: function(r) {
                return !! r.firstChild
            },
            empty: function(r) {
                return ! r.firstChild
            },
            has: function(t, s, r) {
                return !! b(r[3], t).length
            },
            header: function(r) {
                return (/h\d/i).test(r.nodeName)
            },
            text: function(r) {
                return "text" === r.type
            },
            radio: function(r) {
                return "radio" === r.type
            },
            checkbox: function(r) {
                return "checkbox" === r.type
            },
            file: function(r) {
                return "file" === r.type
            },
            password: function(r) {
                return "password" === r.type
            },
            submit: function(r) {
                return "submit" === r.type
            },
            image: function(r) {
                return "image" === r.type
            },
            reset: function(r) {
                return "reset" === r.type
            },
            button: function(r) {
                return "button" === r.type || r.nodeName.toLowerCase() === "button"
            },
            input: function(r) {
                return (/input|select|textarea|button/i).test(r.nodeName)
            }
        },
        setFilters: {
            first: function(s, r) {
                return r === 0
            },
            last: function(t, s, r, u) {
                return s === u.length - 1
            },
            even: function(s, r) {
                return r % 2 === 0
            },
            odd: function(s, r) {
                return r % 2 === 1
            },
            lt: function(t, s, r) {
                return s < r[3] - 0
            },
            gt: function(t, s, r) {
                return s > r[3] - 0
            },
            nth: function(t, s, r) {
                return r[3] - 0 === s
            },
            eq: function(t, s, r) {
                return r[3] - 0 === s
            }
        },
        filter: {
            PSEUDO: function(t, y, x, z) {
                var r = y[1],
                s = f.filters[r];
                if (s) {
                    return s(t, x, y, z)
                } else {
                    if (r === "contains") {
                        return (t.textContent || t.innerText || b.getText([t]) || "").indexOf(y[3]) >= 0
                    } else {
                        if (r === "not") {
                            var u = y[3];
                            for (var w = 0,
                            v = u.length; w < v; w++) {
                                if (u[w] === t) {
                                    return false
                                }
                            }
                            return true
                        } else {
                            b.error("Syntax error, unrecognized expression: " + r)
                        }
                    }
                }
            },
            CHILD: function(r, u) {
                var x = u[1],
                s = r;
                switch (x) {
                case "only":
                case "first":
                    while ((s = s.previousSibling)) {
                        if (s.nodeType === 1) {
                            return false
                        }
                    }
                    if (x === "first") {
                        return true
                    }
                    s = r;
                case "last":
                    while ((s = s.nextSibling)) {
                        if (s.nodeType === 1) {
                            return false
                        }
                    }
                    return true;
                case "nth":
                    var t = u[2],
                    A = u[3];
                    if (t === 1 && A === 0) {
                        return true
                    }
                    var w = u[0],
                    z = r.parentNode;
                    if (z && (z.sizcache !== w || !r.nodeIndex)) {
                        var v = 0;
                        for (s = z.firstChild; s; s = s.nextSibling) {
                            if (s.nodeType === 1) {
                                s.nodeIndex = ++v
                            }
                        }
                        z.sizcache = w
                    }
                    var y = r.nodeIndex - A;
                    if (t === 0) {
                        return y === 0
                    } else {
                        return (y % t === 0 && y / t >= 0)
                    }
                }
            },
            ID: function(s, r) {
                return s.nodeType === 1 && s.getAttribute("id") === r
            },
            TAG: function(s, r) {
                return (r === "*" && s.nodeType === 1) || s.nodeName.toLowerCase() === r
            },
            CLASS: function(s, r) {
                return (" " + (s.className || s.getAttribute("class")) + " ").indexOf(r) > -1
            },
            ATTR: function(w, u) {
                var t = u[1],
                r = f.attrHandle[t] ? f.attrHandle[t](w) : w[t] != null ? w[t] : w.getAttribute(t),
                x = r + "",
                v = u[2],
                s = u[4];
                return r == null ? v === "!=": v === "=" ? x === s: v === "*=" ? x.indexOf(s) >= 0 : v === "~=" ? (" " + x + " ").indexOf(s) >= 0 : !s ? x && r !== false: v === "!=" ? x !== s: v === "^=" ? x.indexOf(s) === 0 : v === "$=" ? x.substr(x.length - s.length) === s: v === "|=" ? x === s || x.substr(0, s.length + 1) === s + "-": false
            },
            POS: function(v, s, t, w) {
                var r = s[2],
                u = f.setFilters[r];
                if (u) {
                    return u(v, t, s, w)
                }
            }
        }
    };
    var k = f.match.POS,
    g = function(s, r) {
        return "\\" + (r - 0 + 1)
    };
    for (var m in f.match) {
        f.match[m] = new RegExp(f.match[m].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
        f.leftMatch[m] = new RegExp(/(^(?:.|\r|\n)*?)/.source + f.match[m].source.replace(/\\(\d+)/g, g))
    }
    var a = function(s, r) {
        s = Array.prototype.slice.call(s, 0);
        if (r) {
            r.push.apply(r, s);
            return r
        }
        return s
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
    } catch(l) {
        a = function(v, u) {
            var s = u || [],
            t = 0;
            if (d.call(v) === "[object Array]") {
                Array.prototype.push.apply(s, v)
            } else {
                if (typeof v.length === "number") {
                    for (var r = v.length; t < r; t++) {
                        s.push(v[t])
                    }
                } else {
                    for (; v[t]; t++) {
                        s.push(v[t])
                    }
                }
            }
            return s
        }
    }
    var c;
    if (document.documentElement.compareDocumentPosition) {
        c = function(s, r) {
            if (!s.compareDocumentPosition || !r.compareDocumentPosition) {
                if (s == r) {
                    o = true
                }
                return s.compareDocumentPosition ? -1 : 1
            }
            var t = s.compareDocumentPosition(r) & 4 ? -1 : s === r ? 0 : 1;
            if (t === 0) {
                o = true
            }
            return t
        }
    } else {
        if ("sourceIndex" in document.documentElement) {
            c = function(s, r) {
                if (!s.sourceIndex || !r.sourceIndex) {
                    if (s == r) {
                        o = true
                    }
                    return s.sourceIndex ? -1 : 1
                }
                var t = s.sourceIndex - r.sourceIndex;
                if (t === 0) {
                    o = true
                }
                return t
            }
        } else {
            if (document.createRange) {
                c = function(u, s) {
                    if (!u.ownerDocument || !s.ownerDocument) {
                        if (u == s) {
                            o = true
                        }
                        return u.ownerDocument ? -1 : 1
                    }
                    var t = u.ownerDocument.createRange(),
                    r = s.ownerDocument.createRange();
                    t.setStart(u, 0);
                    t.setEnd(u, 0);
                    r.setStart(s, 0);
                    r.setEnd(s, 0);
                    var v = t.compareBoundaryPoints(Range.START_TO_END, r);
                    if (v === 0) {
                        o = true
                    }
                    return v
                }
            }
        }
    }
    b.getText = function(r) {
        var s = "",
        u;
        for (var t = 0; r[t]; t++) {
            u = r[t];
            if (u.nodeType === 3 || u.nodeType === 4) {
                s += u.nodeValue
            } else {
                if (u.nodeType !== 8) {
                    s += b.getText(u.childNodes)
                }
            }
        }
        return s
    }; (function() {
        var s = document.createElement("div"),
        t = "script" + (new Date()).getTime();
        s.innerHTML = "<a name='" + t + "'/>";
        var r = document.documentElement;
        r.insertBefore(s, r.firstChild);
        if (document.getElementById(t)) {
            f.find.ID = function(v, w, x) {
                if (typeof w.getElementById !== "undefined" && !x) {
                    var u = w.getElementById(v[1]);
                    return u ? u.id === v[1] || typeof u.getAttributeNode !== "undefined" && u.getAttributeNode("id").nodeValue === v[1] ? [u] : undefined: []
                }
            };
            f.filter.ID = function(w, u) {
                var v = typeof w.getAttributeNode !== "undefined" && w.getAttributeNode("id");
                return w.nodeType === 1 && v && v.nodeValue === u
            }
        }
        r.removeChild(s);
        r = s = null
    })(); (function() {
        var r = document.createElement("div");
        r.appendChild(document.createComment(""));
        if (r.getElementsByTagName("*").length > 0) {
            f.find.TAG = function(s, w) {
                var v = w.getElementsByTagName(s[1]);
                if (s[1] === "*") {
                    var u = [];
                    for (var t = 0; v[t]; t++) {
                        if (v[t].nodeType === 1) {
                            u.push(v[t])
                        }
                    }
                    v = u
                }
                return v
            }
        }
        r.innerHTML = "<a href='#'></a>";
        if (r.firstChild && typeof r.firstChild.getAttribute !== "undefined" && r.firstChild.getAttribute("href") !== "#") {
            f.attrHandle.href = function(s) {
                return s.getAttribute("href", 2)
            }
        }
        r = null
    })();
    if (document.querySelectorAll) { (function() {
            var r = b,
            t = document.createElement("div");
            t.innerHTML = "<p class='TEST'></p>";
            if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) {
                return
            }
            b = function(x, w, u, v) {
                w = w || document;
                if (!v && w.nodeType === 9 && !b.isXML(w)) {
                    try {
                        return a(w.querySelectorAll(x), u)
                    } catch(y) {}
                }
                return r(x, w, u, v)
            };
            for (var s in r) {
                b[s] = r[s]
            }
            t = null
        })()
    } (function() {
        var r = document.createElement("div");
        r.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (!r.getElementsByClassName || r.getElementsByClassName("e").length === 0) {
            return
        }
        r.lastChild.className = "e";
        if (r.getElementsByClassName("e").length === 1) {
            return
        }
        f.order.splice(1, 0, "CLASS");
        f.find.CLASS = function(s, t, u) {
            if (typeof t.getElementsByClassName !== "undefined" && !u) {
                return t.getElementsByClassName(s[1])
            }
        };
        r = null
    })();
    function n(s, x, w, A, y, z) {
        for (var u = 0,
        t = A.length; u < t; u++) {
            var r = A[u];
            if (r) {
                r = r[s];
                var v = false;
                while (r) {
                    if (r.sizcache === w) {
                        v = A[r.sizset];
                        break
                    }
                    if (r.nodeType === 1 && !z) {
                        r.sizcache = w;
                        r.sizset = u
                    }
                    if (r.nodeName.toLowerCase() === x) {
                        v = r;
                        break
                    }
                    r = r[s]
                }
                A[u] = v
            }
        }
    }
    function q(s, x, w, A, y, z) {
        for (var u = 0,
        t = A.length; u < t; u++) {
            var r = A[u];
            if (r) {
                r = r[s];
                var v = false;
                while (r) {
                    if (r.sizcache === w) {
                        v = A[r.sizset];
                        break
                    }
                    if (r.nodeType === 1) {
                        if (!z) {
                            r.sizcache = w;
                            r.sizset = u
                        }
                        if (typeof x !== "string") {
                            if (r === x) {
                                v = true;
                                break
                            }
                        } else {
                            if (b.filter(x, [r]).length > 0) {
                                v = r;
                                break
                            }
                        }
                    }
                    r = r[s]
                }
                A[u] = v
            }
        }
    }
    b.contains = document.compareDocumentPosition ?
    function(s, r) {
        return !! (s.compareDocumentPosition(r) & 16)
    }: function(s, r) {
        return s !== r && (s.contains ? s.contains(r) : true)
    };
    b.isXML = function(r) {
        var s = (r ? r.ownerDocument || r: 0).documentElement;
        return s ? s.nodeName !== "HTML": false
    };
    var h = function(r, y) {
        var u = [],
        v = "",
        w,
        t = y.nodeType ? [y] : y;
        while ((w = f.match.PSEUDO.exec(r))) {
            v += w[0];
            r = r.replace(f.match.PSEUDO, "")
        }
        r = f.relative[r] ? r + "*": r;
        for (var x = 0,
        s = t.length; x < s; x++) {
            b(r, t[x], u)
        }
        return b.filter(v, u)
    };
    baidu.dom.query = b
})();
baidu.dom.getAncestorByTag = function(b, a) {
    b = baidu.dom.g(b);
    a = a.toUpperCase();
    while ((b = b.parentNode) && b.nodeType == 1) {
        if (b.tagName == a) {
            return b
        }
    }
    return null
};
baidu.dom.getWindow = function(a) {
    a = baidu.dom.g(a);
    var b = baidu.dom.getDocument(a);
    return b.parentWindow || b.defaultView || null
};
baidu.dom.hide = function(a) {
    a = baidu.dom.g(a);
    a.style.display = "none";
    return a
};
baidu.hide = baidu.dom.hide;
baidu.dom.getAncestorBy = function(a, b) {
    a = baidu.dom.g(a);
    while ((a = a.parentNode) && a.nodeType == 1) {
        if (b(a)) {
            return a
        }
    }
    return null
};
baidu.dom.setOuter = function(a, b) {
    function c(d) {
        return parseFloat(baidu.getStyle(a, d)) || 0
    }
    if (baidu.browser.isStrict) {
        if (b.width) {
            b.width -= c("paddingLeft") + c("paddingRight") + c("borderLeftWidth") + c("borderRightWidth")
        }
        if (b.height) {
            b.height -= c("paddingTop") + c("paddingBottom") + c("borderTopWidth") + c("borderBottomWidth")
        }
    }
    return baidu.dom.setStyles(a, b)
};
baidu.dom.setOuterWidth = function(a, b) {
    return baidu.dom.setOuter(a, {
        width: b
    })
};
baidu.dom.next = function(a) {
    return baidu.dom._matchNode(a, "nextSibling", "nextSibling")
};
baidu.dom.removeStyle = function() {
    var b = document.createElement("DIV"),
    a,
    c = baidu.dom._g;
    if (b.style.removeProperty) {
        a = function(f, d) {
            f = c(f);
            f.style.removeProperty(d);
            return f
        }
    } else {
        if (b.style.removeAttribute) {
            a = function(f, d) {
                f = c(f);
                f.style.removeAttribute(baidu.string.toCamelCase(d));
                return f
            }
        }
    }
    b = null;
    return a
} ();
baidu.dom.setPosition = function(b, a) {
    return baidu.dom.setStyles(b, {
        left: a.left - parseFloat(baidu.dom.getStyle(b, "margin-left")) || 0,
        top: a.top - parseFloat(baidu.dom.getStyle(b, "margin-top")) || 0
    })
};
baidu.dom.show = function(a) {
    a = baidu.dom.g(a);
    a.style.display = "";
    return a
};
baidu.show = baidu.dom.show;
baidu.dom.toggle = function(a) {
    a = baidu.dom.g(a);
    a.style.display = a.style.display == "none" ? "": "none";
    return a
};
baidu.dom.getText = function(d) {
    var b = "",
    f, c = 0,
    a;
    d = baidu._g(d);
    if (d.nodeType === 3 || d.nodeType === 4) {
        b += d.nodeValue
    } else {
        if (d.nodeType !== 8) {
            f = d.childNodes;
            for (a = f.length; c < a; c++) {
                b += baidu.dom.getText(f[c])
            }
        }
    }
    return b
};
baidu.dom.insertAfter = function(d, c) {
    var b, a;
    b = baidu.dom._g;
    d = b(d);
    c = b(c);
    a = c.parentNode;
    if (a) {
        a.insertBefore(d, c.nextSibling)
    }
    return d
};
baidu.dom.first = function(a) {
    return baidu.dom._matchNode(a, "nextSibling", "firstChild")
};
baidu.dom.insertBefore = function(d, c) {
    var b, a;
    b = baidu.dom._g;
    d = b(d);
    c = b(c);
    a = c.parentNode;
    if (a) {
        a.insertBefore(d, c)
    }
    return d
};
baidu.dom.insertHTML = function(d, a, c) {
    d = baidu.dom.g(d);
    var b, f;
    if (d.insertAdjacentHTML) {
        d.insertAdjacentHTML(a, c)
    } else {
        b = d.ownerDocument.createRange();
        a = a.toUpperCase();
        if (a == "AFTERBEGIN" || a == "BEFOREEND") {
            b.selectNodeContents(d);
            b.collapse(a == "AFTERBEGIN")
        } else {
            f = a == "BEFOREBEGIN";
            b[f ? "setStartBefore": "setEndAfter"](d);
            b.collapse(f)
        }
        b.insertNode(b.createContextualFragment(c))
    }
    return d
};
baidu.insertHTML = baidu.dom.insertHTML;
baidu.dom.remove = function(a) {
    a = baidu.dom._g(a);
    var b = a.parentNode;
    b && b.removeChild(a)
};
baidu.dom.empty = function(a) {
    a = baidu.dom.g(a);
    while (a.firstChild) {
        a.removeChild(a.firstChild)
    }
    return a
};
baidu.dom.getAncestorByClass = function(a, b) {
    a = baidu.dom.g(a);
    b = new RegExp("(^|\\s)" + baidu.string.trim(b) + "(\\s|\x24)");
    while ((a = a.parentNode) && a.nodeType == 1) {
        if (b.test(a.className)) {
            return a
        }
    }
    return null
};
baidu.dom.setOuterHeight = function(b, a) {
    return baidu.dom.setOuter(b, {
        height: a
    })
};
baidu.event._eventFilter = baidu.event._eventFilter || {};
baidu.event._eventFilter._crossElementBoundary = function(a, d) {
    var c = d.relatedTarget,
    b = d.currentTarget;
    if (typeof c == "undefined") {
        return a.call(b, d)
    }
    if (c === false || b == c || c.prefix == "xul" || baidu.dom.contains(b, c)) {
        return
    }
    return a.call(b, d)
};
baidu.event._eventFilter.mouseleave = window.attachEvent ? null: function(a, b, c) {
    return {
        type: "mouseout",
        listener: baidu.fn.bind(baidu.event._eventFilter._crossElementBoundary, this, c)
    }
};
baidu.event._eventFilter.mouseenter = window.attachEvent ? null: function(a, b, c) {
    return {
        type: "mouseover",
        listener: baidu.fn.bind(baidu.event._eventFilter._crossElementBoundary, this, c)
    }
};
baidu.event.getPageX = function(b) {
    var a = b.pageX,
    c = document;
    if (!a && a !== 0) {
        a = (b.clientX || 0) + (c.documentElement.scrollLeft || c.body.scrollLeft)
    }
    return a
};
baidu.event.getPageY = function(b) {
    var a = b.pageY,
    c = document;
    if (!a && a !== 0) {
        a = (b.clientY || 0) + (c.documentElement.scrollTop || c.body.scrollTop)
    }
    return a
};
baidu.event.EventArg = function(c, f) {
    f = f || window;
    c = c || f.event;
    var d = f.document;
    this.target = c.target || c.srcElement;
    this.keyCode = c.which || c.keyCode;
    for (var a in c) {
        var b = c[a];
        if ("function" != typeof b) {
            this[a] = b
        }
    }
    if (!this.pageX && this.pageX !== 0) {
        this.pageX = (c.clientX || 0) + (d.documentElement.scrollLeft || d.body.scrollLeft);
        this.pageY = (c.clientY || 0) + (d.documentElement.scrollTop || d.body.scrollTop)
    }
    this._event = c
};
baidu.event.EventArg.prototype.preventDefault = function() {
    if (this._event.preventDefault) {
        this._event.preventDefault()
    } else {
        this._event.returnValue = false
    }
    return this
};
baidu.event.EventArg.prototype.stopPropagation = function() {
    if (this._event.stopPropagation) {
        this._event.stopPropagation()
    } else {
        this._event.cancelBubble = true
    }
    return this
};
baidu.event.EventArg.prototype.stop = function() {
    return this.stopPropagation().preventDefault()
};
baidu.event.get = function(a, b) {
    return new baidu.event.EventArg(a, b)
};
baidu.event.getKeyCode = function(a) {
    return a.which || a.keyCode
};
baidu.event.once = function(a, b, c) {
    a = baidu.dom._g(a);
    function d(f) {
        c.call(a, f);
        baidu.event.un(a, b, d)
    }
    baidu.event.on(a, b, d);
    return a
};
baidu.object.values = function(d) {
    var a = [],
    c = 0,
    b;
    for (b in d) {
        if (d.hasOwnProperty(b)) {
            a[c++] = d[b]
        }
    }
    return a
}; (function() {
    var d = baidu.browser,
    l = {
        keydown: 1,
        keyup: 1,
        keypress: 1
    },
    a = {
        click: 1,
        dblclick: 1,
        mousedown: 1,
        mousemove: 1,
        mouseup: 1,
        mouseover: 1,
        mouseout: 1
    },
    i = {
        abort: 1,
        blur: 1,
        change: 1,
        error: 1,
        focus: 1,
        load: d.ie ? 0 : 1,
        reset: 1,
        resize: 1,
        scroll: 1,
        select: 1,
        submit: 1,
        unload: d.ie ? 0 : 1
    },
    g = {
        scroll: 1,
        resize: 1,
        reset: 1,
        submit: 1,
        change: 1,
        select: 1,
        error: 1,
        abort: 1
    },
    k = {
        KeyEvents: ["bubbles", "cancelable", "view", "ctrlKey", "altKey", "shiftKey", "metaKey", "keyCode", "charCode"],
        MouseEvents: ["bubbles", "cancelable", "view", "detail", "screenX", "screenY", "clientX", "clientY", "ctrlKey", "altKey", "shiftKey", "metaKey", "button", "relatedTarget"],
        HTMLEvents: ["bubbles", "cancelable"],
        UIEvents: ["bubbles", "cancelable", "view", "detail"],
        Events: ["bubbles", "cancelable"]
    };
    baidu.object.extend(g, l);
    baidu.object.extend(g, a);
    function c(r, p) {
        var o = 0,
        n = r.length,
        q = {};
        for (; o < n; o++) {
            q[r[o]] = p[r[o]];
            delete p[r[o]]
        }
        return q
    }
    function f(p, o, n) {
        n = baidu.object.extend({},
        n);
        var q = baidu.object.values(c(k[o], n)),
        r = document.createEvent(o);
        q.unshift(p);
        if ("KeyEvents" == o) {
            r.initKeyEvent.apply(r, q)
        } else {
            if ("MouseEvents" == o) {
                r.initMouseEvent.apply(r, q)
            } else {
                if ("UIEvents" == o) {
                    r.initUIEvent.apply(r, q)
                } else {
                    r.initEvent.apply(r, q)
                }
            }
        }
        baidu.object.extend(r, n);
        return r
    }
    function b(n) {
        var o;
        if (document.createEventObject) {
            o = document.createEventObject();
            baidu.object.extend(o, n)
        }
        return o
    }
    function h(q, n) {
        n = c(k.KeyEvents, n);
        var r;
        if (document.createEvent) {
            try {
                r = f(q, "KeyEvents", n)
            } catch(p) {
                try {
                    r = f(q, "Events", n)
                } catch(o) {
                    r = f(q, "UIEvents", n)
                }
            }
        } else {
            n.keyCode = n.charCode > 0 ? n.charCode: n.keyCode;
            r = b(n)
        }
        return r
    }
    function m(o, n) {
        n = c(k.MouseEvents, n);
        var p;
        if (document.createEvent) {
            p = f(o, "MouseEvents", n);
            if (n.relatedTarget && !p.relatedTarget) {
                if ("mouseout" == o.toLowerCase()) {
                    p.toElement = n.relatedTarget
                } else {
                    if ("mouseover" == o.toLowerCase()) {
                        p.fromElement = n.relatedTarget
                    }
                }
            }
        } else {
            n.button = n.button == 0 ? 1 : n.button == 1 ? 4 : baidu.lang.isNumber(n.button) ? n.button: 0;
            p = b(n)
        }
        return p
    }
    function j(p, n) {
        n.bubbles = g.hasOwnProperty(p);
        n = c(k.HTMLEvents, n);
        var r;
        if (document.createEvent) {
            try {
                r = f(p, "HTMLEvents", n)
            } catch(q) {
                try {
                    r = f(p, "UIEvents", n)
                } catch(o) {
                    r = f(p, "Events", n)
                }
            }
        } else {
            r = b(n)
        }
        return r
    }
    baidu.event.fire = function(o, p, n) {
        var q;
        p = p.replace(/^on/i, "");
        o = baidu.dom._g(o);
        n = baidu.object.extend({
            bubbles: true,
            cancelable: true,
            view: window,
            detail: 1,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: 0,
            charCode: 0,
            button: 0,
            relatedTarget: null
        },
        n);
        if (l[p]) {
            q = h(p, n)
        } else {
            if (a[p]) {
                q = m(p, n)
            } else {
                if (i[p]) {
                    q = j(p, n)
                } else {
                    throw (new Error(p + " is not support!"))
                }
            }
        }
        if (q) {
            if (o.dispatchEvent) {
                o.dispatchEvent(q)
            } else {
                if (o.fireEvent) {
                    o.fireEvent("on" + p, q)
                }
            }
        }
    }
})();
baidu.event.stopPropagation = function(a) {
    if (a.stopPropagation) {
        a.stopPropagation()
    } else {
        a.cancelBubble = true
    }
};
baidu.event.stop = function(a) {
    var b = baidu.event;
    b.stopPropagation(a);
    b.preventDefault(a)
};
baidu.event.getTarget = function(a) {
    return a.target || a.srcElement
};
baidu.lang.Class.prototype.addEventListeners = function(c, d) {
    if (typeof d == "undefined") {
        for (var b in c) {
            this.addEventListener(b, c[b])
        }
    } else {
        c = c.split(",");
        var b = 0,
        a = c.length,
        f;
        for (; b < a; b++) {
            this.addEventListener(baidu.trim(c[b]), d)
        }
    }
};
baidu.lang.instance = function(a) {
    return window[baidu.guid]._instances[a] || null
};
baidu.lang.isDate = function(a) {
    return {}.toString.call(a) === "[object Date]" && a.toString() !== "Invalid Date" && !isNaN(a)
};
baidu.lang.isBoolean = function(a) {
    return typeof a === "boolean"
};
baidu.lang.toArray = function(b) {
    if (b === null || b === undefined) {
        return []
    }
    if (baidu.lang.isArray(b)) {
        return b
    }
    if (typeof b.length !== "number" || typeof b === "string" || baidu.lang.isFunction(b)) {
        return [b]
    }
    if (b.item) {
        var a = b.length,
        c = new Array(a);
        while (a--) {
            c[a] = b[a]
        }
        return c
    }
    return [].slice.call(b)
};
baidu.lang.module = function(name, module, owner) {
    var packages = name.split("."),
    len = packages.length - 1,
    packageName,
    i = 0;
    if (!owner) {
        try {
            if (! (new RegExp("^[a-zA-Z_\x24][a-zA-Z0-9_\x24]*\x24")).test(packages[0])) {
                throw ""
            }
            owner = eval(packages[0]);
            i = 1
        } catch(e) {
            owner = window
        }
    }
    for (; i < len; i++) {
        packageName = packages[i];
        if (!owner[packageName]) {
            owner[packageName] = {}
        }
        owner = owner[packageName]
    }
    if (!owner[packages[len]]) {
        owner[packages[len]] = module
    }
};
baidu.lang.inherits = function(h, f, d) {
    var c, g, a = h.prototype,
    b = new Function();
    b.prototype = f.prototype;
    g = h.prototype = new b();
    for (c in a) {
        g[c] = a[c]
    }
    h.prototype.constructor = h;
    h.superClass = f.prototype;
    if ("string" == typeof d) {
        g._className = d
    }
};
baidu.inherits = baidu.lang.inherits;
baidu.lang.isElement = function(a) {
    return !! (a && a.nodeName && a.nodeType == 1)
};
baidu.lang.decontrol = function(b) {
    var a = window[baidu.guid];
    a._instances && (delete a._instances[b])
};
baidu.lang.createClass = function(g, b) {
    b = b || {};
    var f = b.superClass || baidu.lang.Class;
    var d = function() {
        if (f != baidu.lang.Class) {
            f.apply(this, arguments)
        } else {
            f.call(this)
        }
        g.apply(this, arguments)
    };
    d.options = b.options || {};
    var j = function() {},
    h = g.prototype;
    j.prototype = f.prototype;
    var a = d.prototype = new j();
    for (var c in h) {
        a[c] = h[c]
    }
    typeof b.className == "string" && (a._className = b.className);
    a.constructor = h.constructor;
    d.extend = function(l) {
        for (var k in l) {
            d.prototype[k] = l[k]
        }
        return d
    };
    return d
};
baidu.lang.isObject = function(a) {
    return "function" == typeof a || !!(a && "object" == typeof a)
};
baidu.isObject = baidu.lang.isObject;
baidu.ajax = baidu.ajax || {};
baidu.ajax.request = function(d, p) {
    p = p || {};
    var j = p.data || "",
    h = !(p.async === false),
    i = p.username || "",
    n = p.password || "",
    a = (p.method || "GET").toUpperCase(),
    g = p.headers || {},
    c = {},
    m,
    o;
    function k() {
        if (o.readyState == 4) {
            try {
                var r = o.status
            } catch(q) {
                f("failure");
                return
            }
            f(r);
            if ((r >= 200 && r < 300) || r == 304 || r == 1223) {
                f("success")
            } else {
                f("failure")
            }
            window.setTimeout(function() {
                o.onreadystatechange = new Function();
                if (h) {
                    o = null
                }
            },
            0)
        }
    }
    function b() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch(q) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch(q) {}
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        }
    }
    function f(r) {
        r = "on" + r;
        var q = c[r],
        s = baidu.ajax[r];
        if (q) {
            if (r != "onsuccess") {
                q(o)
            } else {
                q(o, o.responseText)
            }
        } else {
            if (s) {
                if (r == "onsuccess") {
                    return
                }
                s(o)
            }
        }
    }
    for (m in p) {
        c[m] = p[m]
    }
    g["X-Request-With"] = "XMLHttpRequest";
    try {
        o = b();
        if (a == "GET") {
            d += (d.indexOf("?") >= 0 ? "&": "?");
            if (j) {
                d += j + "&";
                j = null
            }
            if (p.noCache) {
                d += "b" + (new Date()).getTime() + "=1"
            }
        }
        if (i) {
            o.open(a, d, h, i, n)
        } else {
            o.open(a, d, h)
        }
        if (h) {
            o.onreadystatechange = k
        }
        if (a == "POST") {
            o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        }
        for (m in g) {
            if (g.hasOwnProperty(m)) {
                o.setRequestHeader(m, g[m])
            }
        }
        f("beforerequest");
        o.send(j);
        if (!h) {
            k()
        }
    } catch(l) {
        f("failure")
    }
    return o
};
baidu.ajax.post = function(b, c, a) {
    return baidu.ajax.request(b, {
        onsuccess: a,
        method: "POST",
        data: c
    })
};
baidu.ajax.get = function(b, a) {
    return baidu.ajax.request(b, {
        onsuccess: a
    })
};
baidu.ajax.form = function(a, c) {
    c = c || {};
    var g = a.elements,
    o = g.length,
    b = a.getAttribute("method"),
    f = a.getAttribute("action"),
    u = c.replacer ||
    function(v, i) {
        return v
    },
    r = {},
    t = [],
    m,
    q,
    s,
    n,
    d,
    h,
    j,
    l,
    k;
    function p(i, v) {
        t.push(i + "=" + v)
    }
    for (m in c) {
        if (c.hasOwnProperty(m)) {
            r[m] = c[m]
        }
    }
    for (m = 0; m < o; m++) {
        q = g[m];
        n = q.name;
        if (!q.disabled && n) {
            s = q.type;
            d = q.value;
            switch (s) {
            case "radio":
            case "checkbox":
                if (!q.checked) {
                    break
                }
            case "textarea":
            case "text":
            case "password":
            case "hidden":
            case "select-one":
                p(n, u(d, n));
                break;
            case "select-multiple":
                h = q.options;
                l = h.length;
                for (j = 0; j < l; j++) {
                    k = h[j];
                    if (k.selected) {
                        p(n, u(k.value, n))
                    }
                }
                break
            }
        }
    }
    r.data = t.join("&");
    r.method = a.getAttribute("method") || "POST";
    return baidu.ajax.request(f, r)
};
baidu.sio = baidu.sio || {};
baidu.sio._removeScriptTag = function(b) {
    if (b.clearAttributes) {
        b.clearAttributes()
    } else {
        for (var a in b) {
            if (b.hasOwnProperty(a)) {
                delete b[a]
            }
        }
    }
    if (b && b.parentNode) {
        b.parentNode.removeChild(b)
    }
    b = null
};
baidu.sio.callByBrowser = function(d, h, c) {
    c = c || {};
    var f = document.createElement("SCRIPT"),
    b = 0,
    a,
    g = c.charset;
    f.onload = f.onreadystatechange = function() {
        if (b) {
            return
        }
        var i = f.readyState;
        if ("undefined" == typeof i || i == "loaded" || i == "complete") {
            b = 1;
            try { ("function" == typeof h) && h()
            } finally {
                baidu.sio._removeScriptTag(f)
            }
        }
    };
    f.setAttribute("type", "text/javascript");
    g && f.setAttribute("charset", g);
    f.setAttribute("src", d);
    document.getElementsByTagName("head")[0].appendChild(f)
};
baidu.sio.callByServer = function(a, j, k) {
    k = k || {};
    var g = document.createElement("SCRIPT"),
    f = "bd__cbs__",
    d = typeof j,
    i,
    h,
    b = k.charset,
    c = k.queryField || "callback";
    if ("string" == d) {
        i = j
    } else {
        if ("function" == d) {
            while (1) {
                i = f + Math.floor(Math.random() * 2147483648).toString(36);
                if (!window[i]) {
                    window[i] = function() {
                        try {
                            j.apply(window, arguments)
                        } finally {
                            baidu.sio._removeScriptTag(g);
                            window[i] = null
                        }
                    };
                    break
                }
            }
        }
    }
    if ("string" == typeof i) {
        a = a.replace((new RegExp("(\\?|&)callback=[^&]*")), "\x241" + c + "=" + i);
        if (a.search(new RegExp("(\\?|&)" + c + "=/")) < 0) {
            a += (a.indexOf("?") < 0 ? "?": "&") + c + "=" + i
        }
    }
    g.setAttribute("type", "text/javascript");
    b && g.setAttribute("charset", b);
    g.setAttribute("src", a);
    document.getElementsByTagName("head")[0].appendChild(g)
};
baidu.swf = baidu.swf || {};
baidu.swf.version = (function() {
    var h = navigator;
    if (h.plugins && h.mimeTypes.length) {
        var d = h.plugins["Shockwave Flash"];
        if (d && d.description) {
            return d.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
        }
    } else {
        if (window.ActiveXObject && !window.opera) {
            for (var b = 10; b >= 2; b--) {
                try {
                    var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + b);
                    if (g) {
                        var a = g.GetVariable("$version");
                        return a.replace(/WIN/g, "").replace(/,/g, ".")
                    }
                } catch(f) {}
            }
        }
    }
})();
baidu.string.encodeHTML = function(a) {
    return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
};
baidu.encodeHTML = baidu.string.encodeHTML;
baidu.swf.createHTML = function(t) {
    t = t || {};
    var l = baidu.swf.version,
    h = t.ver || "6.0.0",
    g, d, f, c, j, s, a = {},
    p = baidu.string.encodeHTML;
    for (c in t) {
        a[c] = t[c]
    }
    t = a;
    if (l) {
        l = l.split(".");
        h = h.split(".");
        for (f = 0; f < 3; f++) {
            g = parseInt(l[f], 10);
            d = parseInt(h[f], 10);
            if (d < g) {
                break
            } else {
                if (d > g) {
                    return ""
                }
            }
        }
    } else {
        return ""
    }
    var n = t.vars,
    m = ["classid", "codebase", "id", "width", "height", "align"];
    t.align = t.align || "middle";
    t.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
    t.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
    t.movie = t.url || "";
    delete t.vars;
    delete t.url;
    if ("string" == typeof n) {
        t.flashvars = n
    } else {
        var q = [];
        for (c in n) {
            s = n[c];
            if (s) {
                q.push(c + "=" + encodeURIComponent(s))
            }
        }
        t.flashvars = q.join("&")
    }
    var o = ["<object "];
    for (f = 0, j = m.length; f < j; f++) {
        s = m[f];
        o.push(" ", s, '="', p(t[s]), '"')
    }
    o.push(">");
    var b = {
        wmode: 1,
        scale: 1,
        quality: 1,
        play: 1,
        loop: 1,
        menu: 1,
        salign: 1,
        bgcolor: 1,
        base: 1,
        allowscriptaccess: 1,
        allownetworking: 1,
        allowfullscreen: 1,
        seamlesstabbing: 1,
        devicefont: 1,
        swliveconnect: 1,
        flashvars: 1,
        movie: 1
    };
    for (c in t) {
        s = t[c];
        c = c.toLowerCase();
        if (b[c] && s) {
            o.push('<param name="' + c + '" value="' + p(s) + '" />')
        }
    }
    t.src = t.movie;
    t.name = t.id;
    delete t.id;
    delete t.movie;
    delete t.classid;
    delete t.codebase;
    t.type = "application/x-shockwave-flash";
    t.pluginspage = "http://www.macromedia.com/go/getflashplayer";
    o.push("<embed");
    var r;
    for (c in t) {
        s = t[c];
        if (s) {
            if ((new RegExp("^salign\x24", "i")).test(c)) {
                r = s;
                continue
            }
            o.push(" ", c, '="', p(s), '"')
        }
    }
    if (r) {
        o.push(' salign="', p(r), '"')
    }
    o.push("></embed></object>");
    return o.join("")
};
baidu.array.remove = function(c, d) {
    var a = c.length,
    b = d;
    if ("function" != typeof d) {
        b = function(f) {
            return d === f
        }
    }
    while (a--) {
        if (true === b.call(c, c[a], a)) {
            c.splice(a, 1)
        }
    }
    return c
};
baidu.swf.getMovie = function(c) {
    var a = document[c],
    b;
    return baidu.browser.ie == 9 ? a && a.length ? (b = baidu.array.remove(baidu.lang.toArray(a),
    function(d) {
        return d.tagName.toLowerCase() != "embed"
    })).length == 1 ? b[0] : b: a: a || window[c]
};
baidu.swf.create = function(a, c) {
    a = a || {};
    var b = baidu.swf.createHTML(a) || a.errorMessage || "";
    if (c && "string" == typeof c) {
        c = document.getElementById(c)
    }
    if (c) {
        c.innerHTML = b
    } else {
        document.write(b)
    }
};
baidu.object.keys = function(d) {
    var a = [],
    c = 0,
    b;
    for (b in d) {
        if (d.hasOwnProperty(b)) {
            a[c++] = b
        }
    }
    return a
};
baidu.object.map = function(d, c) {
    var b = {};
    for (var a in d) {
        if (d.hasOwnProperty(a)) {
            b[a] = c(d[a], a)
        }
    }
    return b
};
baidu.object.clone = (function(a) {
    return function(g) {
        var c = g,
        d, b;
        if (!g || g instanceof Number || g instanceof String || g instanceof Boolean) {
            return c
        } else {
            if (g instanceof Array) {
                c = [];
                var f = 0;
                for (d = 0, b = g.length; d < b; d++) {
                    c[f++] = baidu.object.clone(g[d])
                }
            } else {
                if ("object" == typeof g) {
                    if (a[Object.prototype.toString.call(g)]) {
                        return c
                    }
                    c = {};
                    for (d in g) {
                        if (g.hasOwnProperty(d)) {
                            c[d] = baidu.object.clone(g[d])
                        }
                    }
                }
            }
        }
        return c
    }
})({
    "[object Function]": 1,
    "[object RegExp]": 1,
    "[object Date]": 1,
    "[object Error]": 1
});
baidu.string.filterFormat = function(c, a) {
    var b = Array.prototype.slice.call(arguments, 1),
    d = Object.prototype.toString;
    if (b.length) {
        b = b.length == 1 ? (a !== null && (/\[object Array\]|\[object Object\]/.test(d.call(a))) ? a: b) : b;
        return c.replace(/#\{(.+?)\}/g,
        function(g, k) {
            var m, j, h, f, l;
            if (!b) {
                return ""
            }
            m = k.split("|");
            j = b[m[0]];
            if ("[object Function]" == d.call(j)) {
                j = j(m[0])
            }
            for (h = 1, f = m.length; h < f; ++h) {
                l = baidu.string.filterFormat[m[h]];
                if ("[object Function]" == d.call(l)) {
                    j = l(j)
                }
            }
            return (("undefined" == typeof j || j === null) ? "": j)
        })
    }
    return c
};
baidu.string.filterFormat.escapeString = function(a) {
    if (!a || "string" != typeof a) {
        return a
    }
    return a.replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;").replace(/>/g, "&#62;").replace(/\\/g, "&#92;").replace(/\//g, "&#47;").replace(/`/g, "&#96;")
};
baidu.string.filterFormat.e = baidu.string.filterFormat.escapeString;
baidu.string.filterFormat.escapeJs = function(f) {
    if (!f || "string" != typeof f) {
        return f
    }
    var d, a, b, c = [];
    for (d = 0, a = f.length; d < a; ++d) {
        b = f.charCodeAt(d);
        if (b > 255) {
            c.push(f.charAt(d))
        } else {
            c.push("\\x" + b.toString(16))
        }
    }
    return c.join("")
};
baidu.string.filterFormat.js = baidu.string.filterFormat.escapeJs;
baidu.string.filterFormat.toInt = function(a) {
    return parseInt(a, 10) || 0
};
baidu.string.filterFormat.i = baidu.string.filterFormat.toInt;
baidu.string.getByteLength = function(a) {
    return String(a).replace(/[^\x00-\xff]/g, "ci").length
}; (function() {
    var c = /^\#[\da-f]{6}$/i,
    b = /^rgb\((\d+), (\d+), (\d+)\)$/,
    a = {
        black: "#000000",
        silver: "#c0c0c0",
        gray: "#808080",
        white: "#ffffff",
        maroon: "#800000",
        red: "#ff0000",
        purple: "#800080",
        fuchsia: "#ff00ff",
        green: "#008000",
        lime: "#00ff00",
        olive: "#808000",
        yellow: "#ffff0",
        navy: "#000080",
        blue: "#0000ff",
        teal: "#008080",
        aqua: "#00ffff"
    };
    baidu.string.formatColor = function(f) {
        if (c.test(f)) {
            return f
        } else {
            if (b.test(f)) {
                for (var k, j = 1,
                f = "#"; j < 4; j++) {
                    k = parseInt(RegExp["\x24" + j]).toString(16);
                    f += ("00" + k).substr(k.length)
                }
                return f
            } else {
                if (/^\#[\da-f]{3}$/.test(f)) {
                    var h = f.charAt(1),
                    g = f.charAt(2),
                    d = f.charAt(3);
                    return "#" + h + h + g + g + d + d
                } else {
                    if (a[f]) {
                        return a[f]
                    }
                }
            }
        }
        return ""
    }
})();
baidu.string.decodeHTML = function(a) {
    var b = String(a).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    return b.replace(/&#([\d]+);/g,
    function(d, c) {
        return String.fromCharCode(parseInt(c, 10))
    })
};
baidu.decodeHTML = baidu.string.decodeHTML;
baidu.string.format = function(c, a) {
    c = String(c);
    var b = Array.prototype.slice.call(arguments, 1),
    d = Object.prototype.toString;
    if (b.length) {
        b = b.length == 1 ? (a !== null && (/\[object Array\]|\[object Object\]/.test(d.call(a))) ? a: b) : b;
        return c.replace(/#\{(.+?)\}/g,
        function(f, h) {
            var g = b[h];
            if ("[object Function]" == d.call(g)) {
                g = g(h)
            }
            return ("undefined" == typeof g ? "": g)
        })
    }
    return c
};
baidu.format = baidu.string.format;
baidu.string.wbr = function(a) {
    return String(a).replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, "$&<wbr>").replace(/><wbr>/g, ">")
};
baidu.string.subByte = function(b, a) {
    b = String(b);
    if (a < 0 || baidu.string.getByteLength(b) <= a) {
        return b
    }
    b = b.substr(0, a).replace(/([^\x00-\xff])/g, "\x241 ").substr(0, a).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "\x241");
    return b
};
baidu.string.toHalfWidth = function(a) {
    return String(a).replace(/[\uFF01-\uFF5E]/g,
    function(b) {
        return String.fromCharCode(b.charCodeAt(0) - 65248)
    }).replace(/\u3000/g, " ")
};
baidu.page.getHeight = function() {
    var d = document,
    a = d.body,
    c = d.documentElement,
    b = d.compatMode == "BackCompat" ? a: d.documentElement;
    return Math.max(c.scrollHeight, a.scrollHeight, b.clientHeight)
};
baidu.page.loadCssFile = function(b) {
    var a = document.createElement("link");
    a.setAttribute("rel", "stylesheet");
    a.setAttribute("type", "text/css");
    a.setAttribute("href", b);
    document.getElementsByTagName("head")[0].appendChild(a)
};
baidu.page.getViewWidth = function() {
    var b = document,
    a = b.compatMode == "BackCompat" ? b.body: b.documentElement;
    return a.clientWidth
};
baidu.page.loadJsFile = function(b) {
    var a = document.createElement("script");
    a.setAttribute("type", "text/javascript");
    a.setAttribute("src", b);
    a.setAttribute("defer", "defer");
    document.getElementsByTagName("head")[0].appendChild(a)
};
baidu.page.createStyleSheet = function(a) {
    var g = a || {},
    d = g.document || document,
    c;
    if (baidu.browser.ie) {
        if (!g.url) {
            g.url = ""
        }
        return d.createStyleSheet(g.url, g.index)
    } else {
        c = "<style type='text/css'></style>";
        g.url && (c = "<link type='text/css' rel='stylesheet' href='" + g.url + "'/>");
        baidu.dom.insertHTML(d.getElementsByTagName("HEAD")[0], "beforeEnd", c);
        if (g.url) {
            return null
        }
        var b = d.styleSheets[d.styleSheets.length - 1],
        f = b.rules || b.cssRules;
        return {
            self: b,
            rules: b.rules || b.cssRules,
            addRule: function(h, k, j) {
                if (b.addRule) {
                    return b.addRule(h, k, j)
                } else {
                    if (b.insertRule) {
                        isNaN(j) && (j = f.length);
                        return b.insertRule(h + "{" + k + "}", j)
                    }
                }
            },
            removeRule: function(h) {
                if (b.removeRule) {
                    b.removeRule(h)
                } else {
                    if (b.deleteRule) {
                        isNaN(h) && (h = 0);
                        b.deleteRule(h)
                    }
                }
            }
        }
    }
};
baidu.page.getWidth = function() {
    var d = document,
    a = d.body,
    c = d.documentElement,
    b = d.compatMode == "BackCompat" ? a: d.documentElement;
    return Math.max(c.scrollWidth, a.scrollWidth, b.clientWidth)
};
baidu.page.load = function(g, d) {
    d = d || {};
    var c = baidu.page.load,
    b = c._cache = c._cache || {},
    f = d.parallel;
    function a() {
        baidu.each(g,
        function(i) {
            if (!b[i.url]) {
                return
            }
        });
        d.onload()
    }
    function h(j, l) {
        var k, i;
        switch (j.type) {
        case "css":
            k = document.createElement("link");
            k.setAttribute("rel", "stylesheet");
            k.setAttribute("type", "text/css");
            break;
        case "js":
            k = document.createElement("script");
            k.setAttribute("type", "text/javascript");
            k.charset = j.charset || "UTF8";
            break;
        case "html":
            k = document.createElement("iframe");
            k.frameBorder = "none";
            break;
        default:
            return
        }
        k.onload = k.onreadystatechange = function() {
            if (!i && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                i = true;
                k.onload = k.onreadystatechange = null;
                l.call(window, k)
            }
        };
        if (j.type == "css") { (function() {
                if (i) {
                    return
                }
                try {
                    k.sheet.cssRule
                } catch(m) {
                    setTimeout(arguments.callee, 20);
                    return
                }
                i = true;
                l.call(window, k)
            })()
        }
        k.href = k.src = j.url;
        document.body.appendChild(k)
    }
    typeof g == "string" && (g = [{
        url: g
    }]);
    if (! (g && g.length)) {
        return
    }
    baidu.each(g,
    function(k) {
        var j = k.url,
        l = !!f,
        i, m = function(n) {
            var o;
            b[k.url] = n;
            typeof k.onload == "function" && (o = k.onload.call(window, n));
            if (o === false) {
                return
            } ! f && c(g.slice(1));
            typeof d.onload == "function" && a()
        };
        k.type = (k.type || j.substr(j.lastIndexOf(".") + 1)).toLowerCase();
        k.requestType = k.requestType || (k.type == "html" ? "ajax": "dom");
        if (i = b[k.url]) {
            m.call(window, i);
            return l
        }
        if (k.requestType.toLowerCase() == "dom") {
            h(k, m)
        } else {
            baidu.ajax.get(k.url,
            function(o, n) {
                m(n)
            })
        }
        return l
    })
};
baidu.page.getViewHeight = function() {
    var b = document,
    a = b.compatMode == "BackCompat" ? b.body: b.documentElement;
    return a.clientHeight
};
baidu.array.filter = function(h, f) {
    var c = [],
    b = 0,
    a = h.length,
    g,
    d;
    if ("function" == typeof f) {
        for (d = 0; d < a; d++) {
            g = h[d];
            if (true === f.call(h, g, d)) {
                c[b++] = g
            }
        }
    }
    return c
};
baidu.array.unique = function(f, g) {
    var b = f.length,
    a = f.slice(0),
    d,
    c;
    if ("function" != typeof g) {
        g = function(i, h) {
            return i === h
        }
    }
    while (--b > 0) {
        c = a[b];
        d = b;
        while (d--) {
            if (g(c, a[d])) {
                a.splice(b, 1);
                break
            }
        }
    }
    return a
};
baidu.array.indexOf = function(d, f, b) {
    var a = d.length,
    c = f;
    b = Number(b) || 0;
    b = b < 0 ? Math.ceil(b) : Math.floor(b);
    b = Math.min(Math.max(b, 0), a);
    if ("function" != typeof f) {
        c = function(g) {
            return f === g
        }
    }
    for (; b < a; b++) {
        if (true === c.call(d, d[b], b)) {
            return b
        }
    }
    return - 1
};
baidu.array.map = function(f, d) {
    var c = [],
    b = 0,
    a = f.length;
    for (; b < a; b++) {
        c[b] = d(f[b], b)
    }
    return c
};
baidu.array.find = function(f, c) {
    var d, b, a = f.length;
    if ("function" == typeof c) {
        for (b = 0; b < a; b++) {
            d = f[b];
            if (true === c.call(f, d, b)) {
                return d
            }
        }
    }
    return null
};
baidu.array.lastIndexOf = function(c, d) {
    var a = c.length,
    b = d;
    if ("function" != typeof d) {
        b = function(f) {
            return d === f
        }
    }
    while (a--) {
        if (true === b.call(c, c[a], a)) {
            return a
        }
    }
    return - 1
};
baidu.array.removeAt = function(b, a) {
    return b.splice(a, 1)[0]
};
baidu.array.hash = function(f, b) {
    var g = {},
    d = b && b.length,
    c = 0,
    a = f.length;
    for (; c < a; c++) {
        g[f[c]] = (d && d > c) ? b[c] : true
    }
    return g
};
baidu.data = baidu.data || {};
baidu.dataSource = baidu.data.dataSource = baidu.data.dataSource || {};
baidu.data.dataSource.DataSource = baidu.lang.createClass(function(a) {
    this._cacheData = {};
    baidu.object.extend(this, a);
    this.addEventListener("onbeforeget",
    function(b) {
        var c = this,
        d;
        if (c.cache && (d = c._cacheData[b.key]) && b.onsuccess) {
            b.onsuccess.call(c, d)
        }
        b.returnValue = !!d
    })
},
{
    className: "baidu.data.dataSource.DataSource"
}).extend({
    maxCache: 100,
    cache: true,
    update: function(a) {
        var b = this;
        baidu.object.extend(b, a)
    },
    get: function(a) {},
    _get: function(a) {
        var b = this,
        c;
        c = b.transition.call(b, b.source);
        b.cache && a.key && c && b._addCacheData(a.key, c);
        a.onsuccess && a.onsuccess.call(b, c);
        return c
    },
    transition: function(a) {
        return a
    },
    _addCacheData: function(b, d) {
        var c = this,
        a = baidu.object.keys(c._cacheData);
        while (c.maxCache > 0 && a.length >= c.maxCache) {
            delete c._cacheData[a.shift()]
        }
        if (c.maxCache > 0) {
            c._cacheData[b] = d
        }
    }
});
baidu.data.dataSource.local = function(b, a) {
    a = baidu.object.extend({
        source: b
    },
    a || {});
    var c = new baidu.data.dataSource.DataSource(a);
    c.get = function(d) {
        var f = this,
        g;
        d = baidu.object.extend({
            key: "local"
        },
        d || {});
        if (!f.dispatchEvent("onbeforeget", d)) {
            g = f._get(d)
        }
        return g
    };
    return c
};
baidu.data.dataSource.sio = function(b, a) {
    a = baidu.object.extend({
        url: b
    },
    a || {});
    var c = new baidu.data.dataSource.DataSource(a);
    c.get = function(d) {
        var f = this;
        d = d || {};
        d.key = d.key || (f.url + (d.param ? "?" + baidu.json.stringify(d.param) : ""));
        if (d.callByType && d.callByType.toLowerCase() == "browser") {
            d.callByType = "callByBrowser"
        } else {
            d.callByType = "callByServer"
        }
        if (!f.dispatchEvent("onbeforeget", d)) {
            baidu.sio[d.callByType](d.key,
            function() {
                f._get(d)
            })
        }
    };
    return c
};
baidu.data.dataSource.ajax = function(b, a) {
    a = baidu.object.extend({
        url: b
    },
    a || {});
    var c = new baidu.data.dataSource.DataSource(a);
    c.get = function(d) {
        var f = this;
        d = d || {};
        d.key = d.key || (f.url + (d.param ? "?" + baidu.json.stringify(d.param) : ""));
        if (!f.dispatchEvent("onbeforeget", d)) {
            baidu.ajax.request(f.url, f.ajaxOption || {
                method: d.method || "get",
                data: d.param,
                onsuccess: function(h, g) {
                    f.source = g;
                    f._get(d)
                },
                onfailure: function(g) {
                    d.onfailure && d.onfailure.call(f, g)
                }
            })
        }
    };
    return c
}; (function() {
    var b = function(g) {
        return "PS" + g.replace(/_/g, "__").replace(/ /g, "_s")
    };
    var a = {
        searchList: ["userData", "localStorage", "cookie"],
        methods: ["init", "get", "set", "remove"],
        status: {
            SUCCESS: 0,
            FAILURE: 1,
            OVERFLOW: 2
        },
        option: {}
    };
    var c = {
        localStorage: {
            size: 10 * 1024 * 1024,
            test: function() {
                return window.localStorage ? true: false
            },
            methods: {
                init: function() {
                    this.store = window.localStorage
                },
                expand: function(g) {
                    return b(this.name) + b(g)
                },
                set: function(i, m, k, j) {
                    var g = a.status.SUCCESS;
                    i = this.expand(i);
                    var l;
                    if (j && j.expires) {
                        l = j.expires + "|" + m
                    } else {
                        l = "0|" + m
                    }
                    try {
                        this.store.setItem(i, l)
                    } catch(h) {
                        g = a.status.OVERFLOW
                    }
                    if (k) {
                        k.call(this, g, m)
                    }
                },
                get: function(j, k) {
                    var g = a.status.SUCCESS;
                    j = this.expand(j);
                    try {
                        var l = this.store.getItem(j);
                        if (l == null) {
                            g = a.status.FAILURE
                        }
                        var n = l.indexOf("|");
                        var m = l.substring(0, n);
                        var h = (new Date()).getTime();
                        if (m > h || m == "0") {
                            l = l.substring(n + 1, l.length)
                        } else {
                            l = null;
                            this.store.removeItem(j);
                            g = a.status.FAILURE
                        }
                    } catch(i) {
                        g = a.status.FAILURE
                    }
                    if (k) {
                        k.call(this, g, l)
                    }
                },
                remove: function(i, j) {
                    var g = a.status.SUCCESS;
                    var k = null;
                    i = this.expand(i);
                    try {
                        var l = this.store.getItem(i);
                        var m = l.indexOf("|");
                        k = l.substring(m + 1, l.length);
                        if (l == null) {
                            g = a.status.FAILURE
                        } else {
                            this.store.removeItem(i)
                        }
                    } catch(h) {
                        g = a.status.FAILURE
                    }
                    if (j) {
                        j.call(this, g, k)
                    }
                }
            }
        },
        userData: {
            size: 64 * 1024,
            test: function() {
                return window.ActiveXObject ? true: false
            },
            methods: {
                init: function() {
                    var h = "_storage_data_";
                    var i = h + b(this.name);
                    this.el = document.createElement("div");
                    this.el.id = i;
                    this.el.style.display = "none";
                    this.el.addBehavior("#default#userData");
                    var g = this;
                    document.body.insertBefore(this.el, document.body.firstChild);
                    baidu.on(window, "unload",
                    function() {
                        g.el = null
                    })
                },
                expand: function(g) {
                    return b(this.name) + b(g)
                },
                set: function(i, m, k, j) {
                    i = this.expand(i);
                    var g = a.status.SUCCESS;
                    try {
                        var l;
                        if (j && j.expires) {
                            this.el.expires = (new Date(j.expires + 8 * 60 * 60 * 1000)).toUTCString();
                            l = j.expires + "|" + m
                        } else {
                            l = "0|" + m
                        }
                        this.el.setAttribute(i, l);
                        this.el.save(i)
                    } catch(h) {
                        g = a.status.OVERFLOW;
                        m = null
                    }
                    if (k) {
                        k.call(this, g, m)
                    }
                },
                get: function(i, j) {
                    i = this.expand(i);
                    var g = a.status.SUCCESS;
                    try {
                        this.el.load(i)
                    } catch(l) {
                        alert("error!")
                    }
                    var k = this.el.getAttribute(i);
                    if (k) {
                        var n = k.indexOf("|");
                        var m = k.substring(0, n);
                        var h = (new Date()).getTime();
                        if (m > h || m == "0") {
                            k = k.substring(n + 1, k.length)
                        } else {
                            k = null;
                            g = a.status.FAILURE
                        }
                    }
                    if (k == null) {
                        g = a.status.FAILURE;
                        this.remove(i)
                    }
                    if (j) {
                        j.call(this, g, k)
                    }
                },
                remove: function(i, j) {
                    i = this.expand(i);
                    var g = a.status.SUCCESS;
                    var k = null;
                    try {
                        this.el.load(i);
                        k = this.el.getAttribute(i);
                        if (k == null) {
                            g = a.status.FAILURE
                        } else {
                            var l = k.indexOf("|");
                            k = k.substring(l + 1, k.length);
                            this.el.expires = new Date(315532799000).toUTCString();
                            this.el.removeAttribute(i);
                            this.el.save(i)
                        }
                    } catch(h) {
                        g = a.status.FAILURE
                    }
                    if (j) {
                        j.call(this, g, k)
                    }
                }
            }
        },
        cookie: {
            size: 4 * 1024,
            test: function() {
                return true
            },
            methods: {
                expand: function(g) {
                    return this.name + g
                },
                get: function(h, i) {
                    var g = a.status.SUCCESS;
                    h = this.expand(h);
                    var j = baidu.cookie.get(h);
                    if (j == null) {
                        g = a.status.FAILURE
                    }
                    if (i) {
                        i.call(this, g, j)
                    }
                },
                set: function(h, k, j, i) {
                    var g = a.status.SUCCESS;
                    h = this.expand(h);
                    if (i && i.expires) {
                        i.expires = new Date(expires)
                    }
                    baidu.cookie.set(h, k, i);
                    if (j) {
                        j.call(this, g, k)
                    }
                },
                remove: function(h, i) {
                    var g = a.status.SUCCESS;
                    h = this.expand(h);
                    var j = baidu.cookie.get(h);
                    baidu.cookie.remove(h);
                    if (j == null) {
                        g = a.status.FAILURE
                    }
                    if (i) {
                        i.call(this, g, j)
                    }
                }
            }
        }
    };
    var d = function(m) {
        var k = function() {};
        m.type = null;
        m.size = -1;
        for (var j = 0,
        h = a.methods.length; j < h; j++) {
            m.Store.prototype[a.methods[j]] = k
        }
        if (a.option.backend) {
            var g = a.option.backend;
            if (c[g] && c[g].test()) {
                m.type = g;
                m.size = c[g].size;
                for (key in c[g].methods) {
                    m.Store.prototype[key] = c[g].methods[key]
                }
            } else {
                for (var j = 0,
                h = a.searchList.length; ! m.type && j < h; j++) {
                    var g = c[a.searchList[j]];
                    if (g.test()) {
                        m.type = a.searchList[j];
                        m.size = g.size;
                        for (key in g.methods) {
                            m.Store.prototype[key] = g.methods[key]
                        }
                    }
                }
            }
        } else {
            for (var j = 0,
            h = a.searchList.length; ! m.type && j < h; j++) {
                var g = c[a.searchList[j]];
                if (g.test()) {
                    m.type = a.searchList[j];
                    m.size = g.size;
                    for (key in g.methods) {
                        m.Store.prototype[key] = g.methods[key]
                    }
                }
            }
        }
    };
    var f = {
        version: "1.0",
        type: null,
        size: -1,
        getSupportList: function() {
            var g = [];
            for (var j = 0,
            h = a.searchList.length; j < h; j++) {
                if (c[a.searchList[j]].test()) {
                    g.push(a.searchList[j])
                }
            }
            return g
        },
        Store: function(g, i) {
            var h = /^[a-z][a-z0-9_ -]+$/i;
            if (!h.exec(g)) {
                throw new Error("Invalid name")
            }
            if (!f.type) {
                throw new Error("No suitable storage found")
            }
            this.name = g;
            a.option = i || {};
            a.option.domain = i.domain || location.hostname || "localhost.localdomain";
            a.option.expires = a.option.expires || 365 * 24 * 60 * 60 * 1000;
            a.option.path = a.option.path || "/";
            this.init()
        },
        set: function(h, k, j, i) {
            var g = new f.Store("bd_storage", {});
            g.set(h, k, j, i)
        },
        get: function(h, j, i) {
            var g = new f.Store("bd_storage", {});
            g.get(h, j, i)
        },
        remove: function(h, i) {
            var g = new f.Store("bd_storage", {});
            g.remove(h, i)
        }
    };
    d(f);
    baidu.data.storage = f
})();
baidu.fx = baidu.fx || {};
baidu.fx.Timeline = baidu.lang.createClass(function(a) {
    baidu.object.extend(this, baidu.fx.Timeline.options);
    baidu.object.extend(this, a)
},
{
    className: "baidu.fx.Timeline",
    options: {
        interval: 16,
        duration: 500,
        dynamic: true
    }
}).extend({
    launch: function() {
        var a = this;
        a.dispatchEvent("onbeforestart");
        typeof a.initialize == "function" && a.initialize();
        a["\x06btime"] = new Date().getTime();
        a["\x06etime"] = a["\x06btime"] + (a.dynamic ? a.duration: 0);
        a["\x06pulsed"]();
        return a
    },
    "\x06pulsed": function() {
        var b = this;
        var a = new Date().getTime();
        b.percent = (a - b["\x06btime"]) / b.duration;
        b.dispatchEvent("onbeforeupdate");
        if (a >= b["\x06etime"]) {
            typeof b.render == "function" && b.render(b.transition(b.percent = 1));
            typeof b.finish == "function" && b.finish();
            b.dispatchEvent("onafterfinish");
            b.dispose();
            return
        }
        typeof b.render == "function" && b.render(b.transition(b.percent));
        b.dispatchEvent("onafterupdate");
        b["\x06timer"] = setTimeout(function() {
            b["\x06pulsed"]()
        },
        b.interval)
    },
    transition: function(a) {
        return a
    },
    cancel: function() {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];
        typeof this.restore == "function" && this.restore();
        this.dispatchEvent("oncancel");
        this.dispose()
    },
    end: function() {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];
        this["\x06pulsed"]()
    }
});
baidu.fx.create = function(d, b, c) {
    var f = new baidu.fx.Timeline(b);
    f.element = d;
    f._className = c || f._className;
    f["\x06original"] = {};
    var a = "baidu_current_effect";
    f.addEventListener("onbeforestart",
    function() {
        var h = this,
        g;
        h.attribName = "att_" + h._className.replace(/\W/g, "_");
        g = h.element.getAttribute(a);
        h.element.setAttribute(a, (g || "") + "|" + h.guid + "|", 0);
        if (!h.overlapping) { (g = h.element.getAttribute(h.attribName)) && window[baidu.guid]._instances[g].cancel();
            h.element.setAttribute(h.attribName, h.guid, 0)
        }
    });
    f["\x06clean"] = function(i) {
        var h = this,
        g;
        if (i = h.element) {
            i.removeAttribute(h.attribName);
            g = i.getAttribute(a);
            g = g.replace("|" + h.guid + "|", "");
            if (!g) {
                i.removeAttribute(a)
            } else {
                i.setAttribute(a, g, 0)
            }
        }
    };
    f.addEventListener("oncancel",
    function() {
        this["\x06clean"]();
        this["\x06restore"]()
    });
    f.addEventListener("onafterfinish",
    function() {
        this["\x06clean"]();
        this.restoreAfterFinish && this["\x06restore"]()
    });
    f.protect = function(g) {
        this["\x06original"][g] = this.element.style[g]
    };
    f["\x06restore"] = function() {
        var k = this["\x06original"],
        j = this.element.style,
        g;
        for (var h in k) {
            g = k[h];
            if (typeof g == "undefined") {
                continue
            }
            j[h] = g;
            if (!g && j.removeAttribute) {
                j.removeAttribute(h)
            } else {
                if (!g && j.removeProperty) {
                    j.removeProperty(h)
                }
            }
        }
    };
    return f
};
baidu.fx.move = function(b, a) {
    if (! (b = baidu.dom.g(b)) || baidu.dom.getStyle(b, "position") == "static") {
        return null
    }
    a = baidu.object.extend({
        x: 0,
        y: 0
    },
    a || {});
    if (a.x == 0 && a.y == 0) {
        return null
    }
    var c = baidu.fx.create(b, baidu.object.extend({
        initialize: function() {
            this.protect("top");
            this.protect("left");
            this.originX = parseInt(baidu.dom.getStyle(b, "left")) || 0;
            this.originY = parseInt(baidu.dom.getStyle(b, "top")) || 0
        },
        transition: function(d) {
            return 1 - Math.pow(1 - d, 2)
        },
        render: function(d) {
            b.style.top = (this.y * d + this.originY) + "px";
            b.style.left = (this.x * d + this.originX) + "px"
        }
    },
    a), "baidu.fx.move");
    return c.launch()
};
baidu.fx.highlight = function(b, a) {
    if (! (b = baidu.dom.g(b))) {
        return null
    }
    var d = b;
    var c = baidu.fx.create(d, baidu.object.extend({
        initialize: function() {
            var l = this,
            k = baidu.dom.getStyle,
            j = baidu.string.formatColor,
            g = j(k(d, "color")) || "#000000",
            f = j(k(d, "backgroundColor"));
            l.beginColor = l.beginColor || f || "#FFFF00";
            l.endColor = l.endColor || f || "#FFFFFF";
            l.finalColor = l.finalColor || l.endColor || l.element.style.backgroundColor;
            l.textColor == g && (l.textColor = "");
            this.protect("color");
            this.protect("backgroundColor");
            l.c_b = [];
            l.c_d = [];
            l.t_b = [];
            l.t_d = [];
            for (var m, h = 0; h < 3; h++) {
                m = 2 * h + 1;
                l.c_b[h] = parseInt(l.beginColor.substr(m, 2), 16);
                l.c_d[h] = parseInt(l.endColor.substr(m, 2), 16) - l.c_b[h];
                if (l.textColor) {
                    l.t_b[h] = parseInt(g.substr(m, 2), 16);
                    l.t_d[h] = parseInt(l.textColor.substr(m, 2), 16) - l.t_b[h]
                }
            }
        },
        render: function(k) {
            for (var j = this,
            g = "#",
            f = "#",
            l, h = 0; h < 3; h++) {
                l = Math.round(j.c_b[h] + j.c_d[h] * k).toString(16);
                g += ("00" + l).substr(l.length);
                if (j.textColor) {
                    l = Math.round(j.t_b[h] + j.t_d[h] * k).toString(16);
                    f += ("00" + l).substr(l.length)
                }
            }
            d.style.backgroundColor = g;
            j.textColor && (d.style.color = f)
        },
        finish: function() {
            this.textColor && (d.style.color = this.textColor);
            d.style.backgroundColor = this.finalColor
        }
    },
    a || {}), "baidu.fx.highlight");
    return c.launch()
};
baidu.fx.opacity = function(b, a) {
    if (! (b = baidu.dom.g(b))) {
        return null
    }
    a = baidu.object.extend({
        from: 0,
        to: 1
    },
    a || {});
    var d = b;
    var c = baidu.fx.create(d, baidu.object.extend({
        initialize: function() {
            baidu.dom.show(b);
            if (baidu.browser.ie) {
                this.protect("filter")
            } else {
                this.protect("opacity");
                this.protect("KHTMLOpacity")
            }
            this.distance = this.to - this.from
        },
        render: function(f) {
            var g = this.distance * f + this.from;
            if (!baidu.browser.ie) {
                d.style.opacity = g;
                d.style.KHTMLOpacity = g
            } else {
                d.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity:" + Math.floor(g * 100) + ")"
            }
        }
    },
    a), "baidu.fx.opacity");
    return c.launch()
};
baidu.fx.moveTo = function(d, b, c) {
    if (! (d = baidu.dom.g(d)) || baidu.dom.getStyle(d, "position") == "static" || typeof b != "object") {
        return null
    }
    var g = [b[0] || b.x || 0, b[1] || b.y || 0];
    var a = parseInt(baidu.dom.getStyle(d, "left")) || 0;
    var h = parseInt(baidu.dom.getStyle(d, "top")) || 0;
    var f = baidu.fx.move(d, baidu.object.extend({
        x: g[0] - a,
        y: g[1] - h
    },
    c || {}));
    return f
};
baidu.fx.scale = function(c, a) {
    if (! (c = baidu.dom.g(c))) {
        return null
    }
    a = baidu.object.extend({
        from: 0.1,
        to: 1
    },
    a || {});
    var f = /^(-?\d+px|\d?\d(\.\d+)?%|100%|left|center|right)(\s+(-?\d+px|\d?\d(\.\d+)?%|100%|top|center|bottom))?/i; ! f.test(a.transformOrigin) && (a.transformOrigin = "0px 0px");
    var b = {},
    d = baidu.fx.create(c, baidu.object.extend({
        initialize: function() {
            baidu.dom.show(c);
            var l = this,
            g = b,
            q = c.style,
            k = function(o) {
                l.protect(o)
            };
            if (baidu.browser.ie) {
                k("top");
                k("left");
                k("position");
                k("zoom");
                k("filter");
                this.offsetX = parseInt(baidu.dom.getStyle(c, "left")) || 0;
                this.offsetY = parseInt(baidu.dom.getStyle(c, "top")) || 0;
                if (baidu.dom.getStyle(c, "position") == "static") {
                    q.position = "relative"
                }
                f.test(this.transformOrigin);
                var j = RegExp["\x241"].toLowerCase(),
                i = RegExp["\x244"].toLowerCase(),
                m = this.element.offsetWidth,
                h = this.element.offsetHeight,
                p,
                n;
                if (/\d+%/.test(j)) {
                    p = parseInt(j, 10) / 100 * m
                } else {
                    if (/\d+px/.test(j)) {
                        p = parseInt(j)
                    } else {
                        if (j == "left") {
                            p = 0
                        } else {
                            if (j == "center") {
                                p = m / 2
                            } else {
                                if (j == "right") {
                                    p = m
                                }
                            }
                        }
                    }
                }
                if (!i) {
                    n = h / 2
                } else {
                    if (/\d+%/.test(i)) {
                        n = parseInt(i, 10) / 100 * h
                    } else {
                        if (/\d+px/.test(i)) {
                            n = parseInt(i)
                        } else {
                            if (i == "top") {
                                n = 0
                            } else {
                                if (i == "center") {
                                    n = h / 2
                                } else {
                                    if (i == "bottom") {
                                        n = h
                                    }
                                }
                            }
                        }
                    }
                }
                q.zoom = this.from;
                g.cx = p;
                g.cy = n
            } else {
                k("WebkitTransform");
                k("WebkitTransformOrigin");
                k("MozTransform");
                k("MozTransformOrigin");
                k("OTransform");
                k("OTransformOrigin");
                k("transform");
                k("transformOrigin");
                k("opacity");
                k("KHTMLOpacity");
                q.WebkitTransform = q.MozTransform = q.OTransform = q.transform = "scale(" + this.from + ")";
                q.WebkitTransformOrigin = q.MozTransformOrigin = q.OTransformOrigin = q.transformOrigin = this.transformOrigin
            }
        },
        render: function(j) {
            var h = c.style,
            g = this.to == 1,
            g = typeof this.opacityTrend == "boolean" ? this.opacityTrend: g,
            i = g ? this.percent: 1 - this.percent,
            k = this.to * j + this.from * (1 - j);
            if (baidu.browser.ie) {
                h.zoom = k;
                h.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity:" + Math.floor(i * 100) + ")";
                h.top = this.offsetY + b.cy * (1 - k);
                h.left = this.offsetX + b.cx * (1 - k)
            } else {
                h.WebkitTransform = h.MozTransform = h.OTransform = h.transform = "scale(" + k + ")";
                h.KHTMLOpacity = h.opacity = i
            }
        }
    },
    a), "baidu.fx.scale");
    return d.launch()
};
baidu.fx.zoomIn = function(b, a) {
    if (! (b = baidu.dom.g(b))) {
        return null
    }
    a = baidu.object.extend({
        to: 1,
        from: 0.1,
        restoreAfterFinish: true,
        transition: function(c) {
            return Math.pow(c, 2)
        }
    },
    a || {});
    return baidu.fx.scale(b, a)
};
baidu.fx.zoomOut = function(b, a) {
    if (! (b = baidu.dom.g(b))) {
        return null
    }
    a = baidu.object.extend({
        to: 0.1,
        from: 1,
        opacityTrend: false,
        restoreAfterFinish: true,
        transition: function(d) {
            return 1 - Math.pow(1 - d, 2)
        }
    },
    a || {});
    var c = baidu.fx.scale(b, a);
    c.addEventListener("onafterfinish",
    function() {
        baidu.dom.hide(this.element)
    });
    return c
};
baidu.fx.pulsate = function(c, a, b) {
    if (! (c = baidu.dom.g(c))) {
        return null
    }
    if (isNaN(a) || a == 0) {
        return null
    }
    var f = c;
    var d = baidu.fx.create(f, baidu.object.extend({
        initialize: function() {
            this.protect("visibility")
        },
        transition: function(g) {
            return Math.cos(2 * Math.PI * g)
        },
        render: function(g) {
            f.style.visibility = g > 0 ? "visible": "hidden"
        },
        finish: function() {
            setTimeout(function() {
                baidu.fx.pulsate(c, --a, b)
            },
            10)
        }
    },
    b), "baidu.fx.pulsate");
    return d.launch()
};
baidu.fx.expand = function(f, d) {
    if (! (f = baidu.dom.g(f))) {
        return null
    }
    var h = f,
    c, a, b = ["paddingBottom", "paddingTop", "borderTopWidth", "borderBottomWidth"];
    var g = baidu.fx.create(h, baidu.object.extend({
        initialize: function() {
            baidu.dom.show(h);
            this.protect("height");
            this.protect("overflow");
            a = c = h.offsetHeight;
            function i(l, k) {
                var j = parseInt(baidu.getStyle(l, k));
                j = isNaN(j) ? 0 : j;
                j = baidu.lang.isNumber(j) ? j: 0;
                return j
            }
            baidu.each(b,
            function(j) {
                a -= i(h, j)
            });
            h.style.overflow = "hidden";
            h.style.height = "1px"
        },
        transition: function(i) {
            return Math.sqrt(i)
        },
        render: function(i) {
            h.style.height = Math.floor(i * a) + "px"
        }
    },
    d || {}), "baidu.fx.expand_collapse");
    return g.launch()
};
baidu.fx.current = function(d) {
    if (! (d = baidu.dom.g(d))) {
        return null
    }
    var b, g, f = /\|([^\|]+)\|/g;
    do {
        if (g = d.getAttribute("baidu_current_effect")) {
            break
        }
    } while (( d = d . parentNode ) && d.nodeType == 1);
    if (!g) {
        return null
    }
    if ((b = g.match(f))) {
        f = /\|([^\|]+)\|/;
        for (var c = 0; c < b.length; c++) {
            f.test(b[c]);
            b[c] = window[baidu.guid]._instances[RegExp["\x241"]]
        }
    }
    return b
};
baidu.fx.fadeIn = function(b, a) {
    if (! (b = baidu.dom.g(b))) {
        return null
    }
    var c = baidu.fx.opacity(b, baidu.object.extend({
        from: 0,
        to: 1,
        restoreAfterFinish: true
    },
    a || {}));
    c._className = "baidu.fx.fadeIn";
    return c
};
baidu.fx.fadeOut = function(b, a) {
    if (! (b = baidu.dom.g(b))) {
        return null
    }
    var c = baidu.fx.opacity(b, baidu.object.extend({
        from: 1,
        to: 0,
        restoreAfterFinish: true
    },
    a || {}));
    c.addEventListener("onafterfinish",
    function() {
        baidu.dom.hide(this.element)
    });
    c._className = "baidu.fx.fadeOut";
    return c
};
baidu.fx.scrollBy = function(b, h, a) {
    if (! (b = baidu.dom.g(b)) || typeof h != "object") {
        return null
    }
    var g = {},
    f = {};
    g.x = h[0] || h.x || 0;
    g.y = h[1] || h.y || 0;
    var c = baidu.fx.create(b, baidu.object.extend({
        initialize: function() {
            var i = f.sTop = b.scrollTop;
            var d = f.sLeft = b.scrollLeft;
            f.sx = Math.min(b.scrollWidth - b.clientWidth - d, g.x);
            f.sy = Math.min(b.scrollHeight - b.clientHeight - i, g.y)
        },
        transition: function(d) {
            return 1 - Math.pow(1 - d, 2)
        },
        render: function(d) {
            b.scrollTop = (f.sy * d + f.sTop);
            b.scrollLeft = (f.sx * d + f.sLeft)
        },
        restore: function() {
            b.scrollTop = f.sTop;
            b.scrollLeft = f.sLeft
        }
    },
    a), "baidu.fx.scroll");
    return c.launch()
};
baidu.fx.getTransition = function(c) {
    var b = baidu.fx.transitions;
    if (!c || typeof b[c] != "string") {
        c = "linear"
    }
    return new Function("percent", b[c])
};
baidu.fx.transitions = {
    none: "return 0",
    full: "return 1",
    linear: "return percent",
    reverse: "return 1 - percent",
    parabola: "return Math.pow(percent, 2)",
    antiparabola: "return 1 - Math.pow(1 - percent, 2)",
    sinoidal: "return (-Math.cos(percent * Math.PI)/2) + 0.5",
    wobble: "return (-Math.cos(percent * Math.PI * (9 * percent))/2) + 0.5",
    spring: "return 1 - (Math.cos(percent * 4.5 * Math.PI) * Math.exp(-percent * 6))"
};
baidu.fx.mask = function(c, a) {
    if (! (c = baidu.dom.g(c)) || baidu.dom.getStyle(c, "position") != "absolute") {
        return null
    }
    var g = c,
    b = {};
    a = a || {};
    var f = /^(\d+px|\d?\d(\.\d+)?%|100%|left|center|right)(\s+(\d+px|\d?\d(\.\d+)?%|100%|top|center|bottom))?/i; ! f.test(a.startOrigin) && (a.startOrigin = "0px 0px");
    var a = baidu.object.extend({
        restoreAfterFinish: true,
        from: 0,
        to: 1
    },
    a || {});
    var d = baidu.fx.create(g, baidu.object.extend({
        initialize: function() {
            g.style.display = "";
            this.protect("clip");
            b.width = g.offsetWidth;
            b.height = g.offsetHeight;
            f.test(this.startOrigin);
            var l = RegExp["\x241"].toLowerCase(),
            k = RegExp["\x244"].toLowerCase(),
            j = this.element.offsetWidth,
            m = this.element.offsetHeight,
            i,
            h;
            if (/\d+%/.test(l)) {
                i = parseInt(l, 10) / 100 * j
            } else {
                if (/\d+px/.test(l)) {
                    i = parseInt(l)
                } else {
                    if (l == "left") {
                        i = 0
                    } else {
                        if (l == "center") {
                            i = j / 2
                        } else {
                            if (l == "right") {
                                i = j
                            }
                        }
                    }
                }
            }
            if (!k) {
                h = m / 2
            } else {
                if (/\d+%/.test(k)) {
                    h = parseInt(k, 10) / 100 * m
                } else {
                    if (/\d+px/.test(k)) {
                        h = parseInt(k)
                    } else {
                        if (k == "top") {
                            h = 0
                        } else {
                            if (k == "center") {
                                h = m / 2
                            } else {
                                if (k == "bottom") {
                                    h = m
                                }
                            }
                        }
                    }
                }
            }
            b.x = i;
            b.y = h
        },
        render: function(l) {
            var m = this.to * l + this.from * (1 - l),
            k = b.y * (1 - m) + "px ",
            j = b.x * (1 - m) + "px ",
            i = b.x * (1 - m) + b.width * m + "px ",
            h = b.y * (1 - m) + b.height * m + "px ";
            g.style.clip = "rect(" + k + i + h + j + ")"
        },
        finish: function() {
            if (this.to < this.from) {
                g.style.display = "none"
            }
        }
    },
    a), "baidu.fx.mask");
    return d.launch()
};
baidu.fx.shake = function(b, g, a) {
    if (! (b = baidu.dom.g(b))) {
        return null
    }
    var f = b;
    g = g || [];
    function c() {
        for (var h = 0; h < arguments.length; h++) {
            if (!isNaN(arguments[h])) {
                return arguments[h]
            }
        }
    }
    var d = baidu.fx.create(f, baidu.object.extend({
        initialize: function() {
            this.protect("top");
            this.protect("left");
            this.protect("position");
            this.restoreAfterFinish = true;
            if (baidu.dom.getStyle(f, "position") == "static") {
                f.style.position = "relative"
            }
            var h = this["\x06original"];
            this.originX = parseInt(h.left || 0);
            this.originY = parseInt(h.top || 0);
            this.offsetX = c(g[0], g.x, 16);
            this.offsetY = c(g[1], g.y, 5)
        },
        transition: function(i) {
            var h = 1 - i;
            return Math.floor(h * 16) % 2 == 1 ? h: i - 1
        },
        render: function(h) {
            f.style.top = (this.offsetY * h + this.originY) + "px";
            f.style.left = (this.offsetX * h + this.originX) + "px"
        }
    },
    a || {}), "baidu.fx.shake");
    return d.launch()
};
baidu.fx.remove = function(b, a) {
    return baidu.fx.fadeOut(b, baidu.object.extend(a || {},
    {
        onafterfinish: function() {
            baidu.dom.remove(this.element)
        }
    }))
};
baidu.fx.puff = function(b, a) {
    return baidu.fx.zoomOut(b, baidu.object.extend({
        to: 1.8,
        duration: 800,
        transformOrigin: "50% 50%"
    },
    a || {}))
};
baidu.fx.moveBy = function(b, g, a) {
    if (! (b = baidu.dom.g(b)) || baidu.dom.getStyle(b, "position") == "static" || typeof g != "object") {
        return null
    }
    var f = {};
    f.x = g[0] || g.x || 0;
    f.y = g[1] || g.y || 0;
    var c = baidu.fx.move(b, baidu.object.extend(f, a || {}));
    return c
};
baidu.fx.scrollTo = function(c, a, b) {
    if (! (c = baidu.dom.g(c)) || typeof a != "object") {
        return null
    }
    var f = {};
    f.x = (a[0] || a.x || 0) - c.scrollLeft;
    f.y = (a[1] || a.y || 0) - c.scrollTop;
    return baidu.fx.scrollBy(c, f, b)
};
baidu.fx.collapse = function(c, b) {
    if (! (c = baidu.dom.g(c))) {
        return null
    }
    var f = c,
    a;
    var d = baidu.fx.create(f, baidu.object.extend({
        initialize: function() {
            this.protect("height");
            this.protect("overflow");
            this.restoreAfterFinish = true;
            a = f.offsetHeight;
            f.style.overflow = "hidden"
        },
        transition: function(g) {
            return Math.pow(1 - g, 2)
        },
        render: function(g) {
            f.style.height = Math.floor(g * a) + "px"
        },
        finish: function() {
            baidu.dom.hide(f)
        }
    },
    b || {}), "baidu.fx.expand_collapse");
    return d.launch()
};
baidu.ui = baidu.ui || {};
baidu.ui.create = function(g, a) {
    var c = a.parent,
    b = a.element,
    f = a.autoRender;
    a.autoRender = a.parent = a.element = null;
    var d = new g(a);
    if (c && d.setParent) {
        d.setParent(c)
    }
    if (f && d.render) {
        d.render(b)
    }
    return d
};
baidu.ui.Base = {
    id: "",
    getId: function(a) {
        var c = this,
        b;
        b = "tangram-" + c.uiType + "--" + (c.id ? c.id: c.guid);
        return a ? b + "-" + a: b
    },
    getClass: function(b) {
        var d = this,
        c = d.classPrefix,
        a = d.skin;
        if (b) {
            c += "-" + b;
            a += "-" + b
        }
        if (d.skin) {
            c += " " + a
        }
        return c
    },
    getMain: function() {
        return baidu.g(this.mainId)
    },
    getBody: function() {
        return baidu.g(this.getId())
    },
    uiType: "",
    addons: [],
    getCallRef: function() {
        return "window['$BAIDU$']._instances['" + this.guid + "']"
    },
    getCallString: function(d) {
        var c = 0,
        b = Array.prototype.slice.call(arguments, 1),
        a = b.length;
        for (; c < a; c++) {
            if (typeof b[c] == "string") {
                b[c] = "'" + b[c] + "'"
            }
        }
        return this.getCallRef() + "." + d + "(" + b.join(",") + ");"
    },
    renderMain: function(b) {
        var d = this,
        c = 0,
        a;
        if (d.getMain()) {
            return
        }
        b = baidu.g(b);
        if (!b) {
            b = document.createElement("div");
            document.body.appendChild(b);
            b.style.position = "absolute";
            b.className = d.getClass("main")
        }
        if (!b.id) {
            b.id = d.getId("main")
        }
        d.mainId = b.id;
        b.setAttribute("data-guid", d.guid);
        return b
    },
    dispose: function() {
        this.dispatchEvent("dispose");
        baidu.lang.Class.prototype.dispose.call(this)
    }
};
baidu.ui.createUI = function(d, k) {
    k = k || {};
    var h = k.superClass || baidu.lang.Class,
    a = h == baidu.lang.Class ? 1 : 0,
    f,
    c,
    j = function(i) {
        var l = this;
        i = i || {};
        h.call(l, !a ? i: (i.guid || ""));
        baidu.object.extend(l, j.options);
        baidu.object.extend(l, i);
        l.classPrefix = l.classPrefix || "tangram-" + l.uiType.toLowerCase();
        for (f in baidu.ui.behavior) {
            if (typeof l[f] != "undefined") {
                baidu.object.extend(l, baidu.ui.behavior[f]);
                baidu.ui.behavior[f].call(l)
            }
        }
        d.apply(l, arguments);
        for (f = 0, c = j.addons.length; f < c; f++) {
            j.addons[f](l)
        }
    },
    b = function() {};
    b.prototype = h.prototype;
    var g = j.prototype = new b();
    for (f in baidu.ui.Base) {
        g[f] = baidu.ui.Base[f]
    }
    j.extend = function(l) {
        for (f in l) {
            j.prototype[f] = l[f]
        }
        var i = l.uiType,
        m = i ? baidu.ui[i] : "";
        if (m) {
            m.create = function(n) {
                return baidu.ui.create(m[i.charAt(0).toUpperCase() + i.slice(1)], n)
            }
        }
        return j
    };
    j.addons = [];
    j.register = function(i) {
        if (typeof i == "function") {
            j.addons.push(i)
        }
    };
    j.options = {};
    return j
};
baidu.ui.decorator = baidu.ui.decorator || {};
baidu.ui.decorator.Decorator = baidu.ui.createUI(function(a) {}).extend({
    uiType: "decorator",
    tpl: {
        box: "<table cellspacing='0'><tr><td #{class}></td><td #{class}></td><td #{class}></td></tr><tr><td #{class}></td><td #{class} id='#{innerWrapId}'></td><td #{class}></td></tr><tr><td #{class}></td><td #{class}></td><td #{class}></td></tr></table>"
    },
    tplClass: {
        box: ["lt", "ct", "rt", "lc", "cc", "rc", "lb", "cb", "rb"]
    },
    getInner: function() {
        return baidu.g(this.innerId)
    },
    _getBodyWrap: function() {
        return baidu.g(this.getId("body-wrap"))
    },
    render: function() {
        var d = this,
        c = document.createElement("div"),
        b = d.ui.getMain(),
        a = b.style,
        f = 0;
        document.body.appendChild(c);
        d.renderMain(c),
        c.className = d.getClass(d.type + "-main");
        c.innerHTML = baidu.format(d.tpl[d.type], {
            "class": function(g) {
                return "class='" + d.getClass(d.type + "-" + d.tplClass[d.type][f++]) + "'"
            },
            innerWrapId: d.getId("body-wrap")
        });
        baidu.each(baidu.dom.children(b),
        function(g) {
            d._getBodyWrap().appendChild(g)
        });
        b.appendChild(c);
        d.innerId = b.id;
        b.getBodyHolder = d._getBodyWrap()
    }
});
baidu.ui.decorator.create = function(a) {
    var b = new baidu.ui.decorator.Decorator(a);
    b.render();
    return b
};
baidu.ui.starRate = baidu.ui.starRate || {};
baidu.ui.starRate.StarRate = baidu.ui.createUI(function(a) {}).extend({
    uiType: "STARRATE",
    total: 5,
    current: 0,
    tplStar: '<span id="#{id}" class="#{className}" onmouseover="#{onmouseover}" onclick="#{onclick}"></span>',
    classOn: "on",
    classOff: "off",
    isDisable: false,
    getString: function() {
        var c = this,
        a = [],
        b;
        for (b = 0; b < c.total; ++b) {
            a.push(baidu.string.format(c.tplStar, {
                id: c.getId(b),
                className: b < c.current ? c.getClass(c.classOn) : c.getClass(c.classOff),
                onmouseover: c.getCallString("hoverAt", b + 1),
                onclick: c.getCallString("clickAt", b + 1)
            }))
        }
        return a.join("")
    },
    render: function(a) {
        var b = this,
        a = baidu.g(a);
        baidu.dom.insertHTML(a, "beforeEnd", b.getString());
        baidu.on(a, "mouseout",
        function() {
            b.starAt(b.current);
            b.dispatchEvent("onleave")
        })
    },
    starAt: function(a) {
        var c = this,
        b;
        for (b = 0; b < c.total; ++b) {
            baidu.g(c.getId(b)).className = b < a ? c.getClass(c.classOn) : c.getClass(c.classOff)
        }
    },
    hoverAt: function(a) {
        if (!this.isDisable) {
            this.starAt(a);
            this.dispatchEvent("onhover", {
                data: {
                    index: a
                }
            })
        }
    },
    clickAt: function(a) {
        if (!this.isDisable) {
            this.current = a;
            this.dispatchEvent("onclick", {
                data: {
                    index: a
                }
            })
        }
    },
    disable: function() {
        var a = this;
        a.isDisable = true
    },
    enable: function() {
        var a = this;
        a.isDisable = false
    }
});
baidu.ui.starRate.create = function(c, b) {
    b = b || {};
    var a = new baidu.ui.starRate.StarRate(b);
    a.render(c);
    return a
};
baidu.suggestion = baidu.ui.suggestion = baidu.ui.suggestion || {};
baidu.ui.get = function(a) {
    var b;
    if (baidu.lang.isString(a)) {
        return baidu.lang.instance(a)
    } else {
        do {
            if (!a || a.nodeType == 9) {
                return null
            }
            if (b = baidu.dom.getAttr(a, "data-guid")) {
                return baidu.lang.instance(b)
            }
        } while (( a = a . parentNode ) != document.body)
    }
};
baidu.ui.suggestion.Suggestion = baidu.ui.createUI(function(b) {
    var a = this;
    a.addEventListener("onload",
    function() {
        baidu.on(document, "mousedown", a.documentMousedownHandler);
        baidu.on(window, "blur", a.windowBlurHandler)
    });
    a.documentMousedownHandler = a.getDocumentMousedownHandler();
    a.windowBlurHandler = a.getWindowBlurHandler()
}).extend({
    event: new Object,
    uiType: "suggestion",
    onbeforepick: new Function,
    onpick: new Function,
    onconfirm: new Function,
    onhighlight: new Function,
    onshow: new Function,
    onhide: new Function,
    getData: function() {
        return []
    },
    prependHTML: "",
    appendHTML: "",
    currentData: {},
    tplDOM: "<div id='#{0}' class='#{1}'></div>",
    tplPrependAppend: "<div id='#{0}' class='#{1}'>#{2}</div>",
    tplBody: "<table cellspacing='0' cellpadding='2'><tbody>#{0}</tbody></table>",
    tplRow: '<tr><td id="#{0}" onmouseover="#{2}" onmouseout="#{3}" onmousedown="#{4}" onclick="#{5}">#{1}</td></tr>',
    getString: function() {
        var a = this;
        return baidu.format(a.tplDOM, a.getId(), a.getClass(), a.guid)
    },
    render: function(c) {
        var b = this,
        a;
        if (b.getMain()) {
            return
        }
        if (c.id) {
		
            b.targetId = c.id
        } else {
            b.targetId = c.id = b.getId("input")
        }
        a = b.renderMain();
        a.style.display = "none";
        a.innerHTML = b.getString();
        this.dispatchEvent("onload")
    },
    isShowing: function() {
        var b = this,
        a = b.getMain();
        return a && a.style.display != "none"
    },
    pick: function(b) {
        var a = this,
        c = a.currentData,
        f = c && typeof b == "number" && typeof c[b] != "undefined" ? c[b].value: b,
        d = {
            data: {
                item: f == b ? {
                    value: b,
                    content: b
                }: c[b],
                index: b
            }
        };
        if (a.dispatchEvent("onbeforepick", d)) {
            a.dispatchEvent("onpick", d)
        }
    },
    show: function(g, f, d) {
        var c = 0,
        a = f.length,
        b = this;
        if (a == 0 && !d) {
            b.hide()
        } else {
            b.currentData = [];
            for (; c < a; c++) {
                if (typeof f[c].value != "undefined") {
                    b.currentData.push(f[c])
                } else {
                    b.currentData.push({
                        value: f[c],
                        content: f[c]
                    })
                }
            }
            b.getBody().innerHTML = b.getBodyString();
            b.getMain().style.display = "block";
            b.dispatchEvent("onshow")
        }
    },
    highlight: function(b) {
        var a = this;
        a.clearHighlight();
        a.getItem(b).className = a.getClass("current");
        this.dispatchEvent("onhighlight", {
            data: this.getDataByIndex(b)
        })
    },
    hide: function() {
        var a = this;
        if (!a.isShowing()) {
            return
        }
        a.getMain().style.display = "none";
        a.dispatchEvent("onhide")
    },
    confirm: function(b, c) {
        var a = this;
        a.pick(b);
        a.dispatchEvent("onconfirm", {
            data: a.getDataByIndex(b),
            source: c
        });
        a.hide()
    },
    getDataByIndex: function(a) {
        return {
            item: this.currentData[a],
            index: a
        }
    },
    getTargetValue: function() {
        return this.getTarget().value
    },
    getHighlightIndex: function() {
        var b = this,
        a = b.currentData.length,
        c = 0;
        if (a && b.isShowing()) {
            for (; c < a; c++) {
                if (b.getItem(c).className == b.getClass("current")) {
                    return c
                }
            }
        }
        return - 1
    },
    clearHighlight: function() {
        var b = this,
        c = 0,
        a = b.currentData.length;
        for (; c < a; c++) {
            b.getItem(c).className = ""
        }
    },
    getTarget: function() {
        return baidu.g(this.targetId)
    },
    getItem: function(a) {
        return baidu.g(this.getId("item" + a))
    },
    getBodyString: function() {
        var c = this,
        g = "",
        f = [],
        h = c.currentData,
        a = h.length,
        d = 0;
        function b(i) {
            return baidu.format(c.tplPrependAppend, c.getId(i), c.getClass(i), c[i + "HTML"])
        }
        g += b("prepend");
        for (; d < a; d++) {
            f.push(baidu.format(c.tplRow, c.getId("item" + d), h[d].content, c.getCallString("itemOver", d), c.getCallString("itemOut"), c.getCallRef() + ".itemDown(event, " + d + ")", c.getCallString("itemClick", d)))
        }
        g += baidu.format(c.tplBody, f.join(""));
        g += b("append");
        return g
    },
    itemOver: function(a) {
        this.highlight(a)
    },
    itemOut: function() {
        this.clearHighlight()
    },
    itemDown: function(b, a) {
        this.dispatchEvent("onmousedownitem", {
            data: this.getDataByIndex(a)
        });
        if (!baidu.ie) {
            b.stopPropagation();
            b.preventDefault();
            return false
        }
    },
    itemClick: function(b) {

			var a = this;
			a.dispatchEvent("onitemclick", {
            data: this.getDataByIndex(b)
        });
        a.confirm(b, "mouse")
	   if(document.getElementsByName("baiduAuto")[0]){
			getnum(this.getDataByIndex(b).item.value)
		}
    },
    getDocumentMousedownHandler: function() {
        var a = this;
        return function(c) {
            c = c || window.event;
            var b = c.target || c.srcElement;
            if (b == a.getTarget() || baidu.ui.get(b)) {
                return
            }
            a.hide()
        }
    },
    getWindowBlurHandler: function() {
        var a = this;
        return function() {
            a.hide()
        }
    },
    dispose: function() {
        var a = this;
        a.dispatchEvent("dispose");
        baidu.un(document, "mousedown", a.documentMousedownHandler);
        baidu.un(window, "blur", a.windowBlurHandler);
        baidu.dom.remove(a.mainId);
        baidu.lang.Class.prototype.dispose.call(this)
    }
});
baidu.object.extend(baidu.ui.suggestion.Suggestion.prototype, {
    setData: function(d, c, b) {
        var a = this;
        a.dataCache[d] = c;
        if (!b) {
            a.show(d, a.dataCache[d])
        }
    }
});
baidu.ui.suggestion.Suggestion.register(function(a) {
    a.dataCache = {},
    a.addEventListener("onneeddata",
    function(c, d) {
        var b = a.dataCache;
        if (typeof b[d] == "undefined") {
            a.getData(d)
        } else {
            a.show(d, b[d])
        }
    })
});
baidu.ui.suggestion.Suggestion.register(function(a) {
    var h, c = "",
    g, d, b = false,
    f = false;
    a.addEventListener("onload",
    function() {
        h = this.getTarget();
        g = h.value;
        a.targetKeydownHandler = a.getTargetKeydownHandler();
        baidu.on(h, "keydown", a.targetKeydownHandler);
        h.setAttribute("autocomplete", "off");
        a.circleTimer = setInterval(function() {
            if (f) {
                return
            }
            if (baidu.g(h) == null) {
                a.dispose()
            }
            var i = h.value;
            if (i == c && i != "" && i != g && i != d) {
                if (a.requestTimer == 0) {
                    a.requestTimer = setTimeout(function() {
                        a.dispatchEvent("onneeddata", i)
                    },
                    100)
                }
            } else {
                clearTimeout(a.requestTimer);
                a.requestTimer = 0;
                if (i == "" && c != "") {
                    d = "";
                    a.hide()
                }
                c = i;
                if (i != d) {
                    a.defaultIptValue = i
                }
                if (g != h.value) {
                    g = ""
                }
            }
        },
        10);
        baidu.on(h, "beforedeactivate", a.beforedeactivateHandler)
    });
    a.addEventListener("onitemclick",
    function() {
        f = false;
        a.defaultIptValue = c = a.getTargetValue()
    });
    a.addEventListener("onpick",
    function(i) {
        if (b) {
            h.blur()
        }
        h.value = d = i.data.item.value;
        if (b) {
            h.focus()
        }
    });
    a.addEventListener("onmousedownitem",
    function(i) {
        b = true;
        f = true;
        setTimeout(function() {
            f = false;
            b = false
        },
        500)
    });
    a.addEventListener("ondispose",
    function() {
        baidu.un(h, "keydown", a.targetKeydownHandler);
        baidu.un(h, "beforedeactivate", a.beforedeactivateHandler);
        clearInterval(a.circleTimer)
    })
});
baidu.object.extend(baidu.ui.suggestion.Suggestion.prototype, {
    beforedeactivateHandler: function() {
        return function() {
            if (mousedownView) {
                window.event.cancelBubble = true;
                window.event.returnValue = false
            }
        }
    },
    getTargetKeydownHandler: function() {
        var b = this;
        function a(c) {
            var f = b.currentData,
            d;
            if (!b.isShowing()) {
                b.dispatchEvent("onneeddata", b.getTargetValue());
                return
            }
            d = b.getHighlightIndex();
            b.clearHighlight();
            if (c) {
                if (d == 0) {
                    b.pick(b.defaultIptValue);
                    d--;
                    return
                }
                if (d == -1) {
                    d = f.length
                }
                d--
            } else {
                if (d == f.length - 1) {
                    b.pick(b.defaultIptValue);
                    d = -1;
                    return
                }
                d++
            }
            b.highlight(d);
            b.pick(d)
        }
        return function(f) {
            var c = false,
            d;
            f = f || window.event;
            switch (f.keyCode) {
            case 9:
            case 27:
                b.hide();
                break;
            case 13:
				
                baidu.event.preventDefault(f);
                d = b.getHighlightIndex();
                b.confirm(d < 0 ? b.getTarget().value: d, "keyboard");
				if(document.getElementsByName("baiduAuto")[0]){
					getnum(b.getTarget().value)
				}
				
			

                break;
            case 38:
                c = true;
            case 40:
                baidu.event.preventDefault(f);
                a(c);
                break
            }
        }
    },
    defaultIptValue: ""
});
baidu.ui.smartPosition = baidu.ui.smartPosition || {};
baidu.ui.smartPosition.setBorderBoxStyles = function(c, d) {
    var f = ["marginTop", "marginLeft", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom"],
    a = {},
    b = f.length - 1;
    for (; b >= 0; b--) {
        a[f[b]] = parseFloat(baidu.getStyle(c, f[b])) || 0
    }
    if (d.top) {
        d.top -= a.marginTop
    }
    if (d.left) {
        d.left -= a.marginLeft
    }
    if (document.compatMode != "BackCompat") {
        if (d.width) {
            d.width -= a.paddingLeft + a.paddingRight + a.borderLeftWidth + a.borderRightWidth
        }
        if (d.height) {
            d.height -= a.paddingTop + a.paddingBottom + a.borderTopWidth + a.borderBottomWidth
        }
    }
    return baidu.dom.setStyles(c, d)
};
baidu.ui.smartPosition.SmartPosition = baidu.ui.createUI(function(a) {
    var b = this;
    if (!this.once) {
        baidu.event.on(baidu.dom.getWindow(b.source), "resize",
        function() {
            b.update()
        })
    }
}).extend({
    position: "bottomright",
    insideScreen: "default",
    offset: [0, 0],
    update: function(l, k) {
        var h = this,
        i = {},
        a = h.source,
        f = baidu.page.getViewHeight(),
        j = baidu.page.getViewWidth(),
        c = a.offsetWidth,
        d = a.offsetHeight,
        b = a.offsetParent,
        g = (!b || b == document.body) ? {
            left: 0,
            top: 0
        }: baidu.dom.getPosition(b);
        baidu.object.extend(this, l || {});
        h.position = h.position.toLowerCase();
        h.coordinate.x = h.coordinate[0] || h.coordinate.x || h.coordinate.left || 0;
        h.coordinate.y = h.coordinate[1] || h.coordinate.y || h.coordinate.top || 0;
        h.offset.x = h.offset[0] || h.offset.x || h.offset.left || 0;
        h.offset.y = h.offset[1] || h.offset.y || h.offset.top || 0;
        h.dispatchEvent("onbeforeupdate");
        i.left = h.coordinate.x + h.offset.x - g.left - (h.position.indexOf("left") >= 0 ? c: 0);
        i.top = h.coordinate.y + h.offset.y - g.top - (h.position.indexOf("top") >= 0 ? d: 0);
        switch (h.insideScreen) {
        case "surround":
            i.left = h.coordinate.x - g.left - (h.position.indexOf("left") >= 0 ? (h.coordinate.x - baidu.page.getScrollLeft() > c ? c: 0) : (j - h.coordinate.x + baidu.page.getScrollLeft() > c ? 0 : c));
            i.top = h.coordinate.y - g.top - (h.position.indexOf("top") >= 0 ? (h.coordinate.y - baidu.page.getScrollTop() > d ? d: 0) : (f - h.coordinate.y + baidu.page.getScrollTop() > d ? 0 : d));
            break;
        case "fix":
            i.left = Math.max(0 - parseFloat(baidu.dom.getStyle(a, "marginLeft")) || 0, Math.min(i.left, baidu.page.getViewWidth() - c - g.left));
            i.top = Math.max(0 - parseFloat(baidu.dom.getStyle(a, "marginTop")) || 0, Math.min(i.top, baidu.page.getViewHeight() - d - g.top));
            break;
        default:
        }
        baidu.ui.smartPosition.setBorderBoxStyles(a, i);
        if (!k && (f != baidu.page.getViewHeight() || j != baidu.page.getViewWidth())) {
            h.update({},
            true)
        }
        if (!k) {
            h.dispatchEvent("onupdate")
        }
    }
});
baidu.ui.smartPosition.set = function(b, d, a) {
    a = a || {};
    a.source = baidu.g(b);
    a.coordinate = d || [0, 0];
    var c = new baidu.ui.smartPosition.SmartPosition(a);
    c.update();
    return c
}; (function() {
    var g = {
        show: a,
        hide: b,
        update: i,
        iframes: [],
        options: {
            hideSelect: false,
            hideFlash: true
        }
    };
    baidu.ui.smartCover = baidu.ui.smartCover || g;
    var d = baidu.ui.smartCover;
    function c(k, n) {
        var q = [],
        p = k.length - 1,
        o,
        m,
        l = baidu.g(n) ? baidu.g(n) : document;
        for (; p >= 0; p--) {
            m = l.getElementsByTagName(k[p]);
            for (o = m.length - 1; o >= 0; o--) {
                if (m[o]) {
                    q.push([m[o], null])
                }
            }
        }
        return q
    }
    function a(q, t) {
        var r = [],
        n = {
            container: document
        };
        baidu.object.extend(n, g.options);
        baidu.object.extend(n, t || {});
        n.hideFlash && r.push("object");
        n.hideSelect && r.push("select");
        d.elementsToHide = c(r, n.container);
        var o = d.elementsToHide.length,
        l, m, k = q.getMain(),
        p = baidu.dom.getPosition(k),
        j = q.getId(),
        s = g.iframes[j];
        if (baidu.ie && !n.hideSelect) {
            if (!s) {
                s = g.iframes[j] = document.createElement("IFRAME");
                q.getMain().appendChild(s);
                s.style.display = "none"
            }
            s.src = "javascript:void(0)";
            baidu.dom.setStyles(s, {
                zIndex: -1,
                display: "block",
                border: "none",
                position: "absolute",
                width: k.offsetWidth,
                height: k.offsetHeight,
                top: 0,
                left: 0,
                filter: "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"
            })
        }
        if (!d.elementsToHide) {
            return
        }
        for (m = 0; m < o; m++) {
            l = d.elementsToHide[m];
            if (baidu.ui.get(l[0]) != q) {
                f(l)
            }
        }
    }
    function i(k) {
        if (baidu.ie) {
            var j = k.getMain(),
            l = k.getId();
            if (!g.iframes[l]) {
                return
            }
            baidu.dom.setStyles(g.iframes[l], {
                width: j.offsetWidth,
                height: j.offsetHeight
            })
        }
    }
    function b(n) {
        d.elementsToHide = d.elementsToHide || c(["object", "select"]);
        var j = d.elementsToHide.length,
        m, l, k = g.iframes[n.getId()];
        if (baidu.ie && k) {
            k.style.display = "none"
        }
        if (!d.elementsToHide) {
            return
        }
        for (l = 0; l < j; l++) {
            m = d.elementsToHide[l];
            if (baidu.ui.get(m[0]) != n) {
                h(m)
            }
            d.elementsToHide[l][0] = null
        }
        delete(d.elementsToHide)
    }
    function f(j) {
        if (j[1] === null) {
            j[1] = j[0].style.visibility;
            j[0].style.visibility = "hidden"
        }
    }
    function h(j) {
        if (j[1] !== null) {
            j[0].style.visibility = j[1];
            j[1] = null
        }
    }
})();
baidu.ui.suggestion.Suggestion.register(function(a) {
    a.addEventListener("onshow",
    function() {
        baidu.ui.smartCover.show(this)
    });
    a.addEventListener("onhide",
    function() {
        baidu.ui.smartCover.hide(this)
    })
});
baidu.extend(baidu.ui.suggestion.Suggestion.prototype, {
    fixWidth: true,
    getWindowResizeHandler: function() {
        var a = this;
        return function() {
            a.adjustPosition(true)
        }
    },
    adjustPosition: function(b) {
        var c = this,
        f = c.getTarget(),
        d,
        a = c.getMain(),
        g;
        if (!c.isShowing() && b) {
            return
        }
        d = baidu.dom.getPosition(f),
        g = {
            top: (d.top + f.offsetHeight - 1),
            left: d.left,
            width: f.offsetWidth
        };
        g = typeof c.view == "function" ? c.view(g) : g;
        baidu.ui.smartPosition.set(a, [g.left, g.top], {
            once: true
        });
        baidu.ui.smartPosition.setBorderBoxStyles(a, {
            width: g.width
        })
    }
});
baidu.ui.suggestion.Suggestion.register(function(a) {
    a.windowResizeHandler = a.getWindowResizeHandler();
    a.addEventListener("onload",
    function() {
        a.adjustPosition();
        if (a.fixWidth) {
            a.fixWidthTimer = setInterval(function() {
                var b = a.getMain();
                if (b.offsetWidth != 0 && a.getTarget().offsetWidth != b.offsetWidth) {
                    a.adjustPosition();
                    b.style.display = "block"
                }
            },
            100)
        }
        baidu.on(window, "resize", a.windowResizeHandler)
    });
    a.addEventListener("onshow",
    function() {
        a.adjustPosition()
    });
    a.addEventListener("ondispose",
    function() {
        baidu.un(window, "resize", a.windowResizeHandler);
        clearInterval(a.fixWidthTimer)
    })
});
baidu.ui.suggestion.create = function(c, a) {
    var b = new baidu.ui.suggestion.Suggestion(a);
    b.render(c);
    return b
};
baidu.ui.menubar = baidu.ui.menubar || {
    instances: {}
};
baidu.ui.smartPosition.element = function(b, d, a) {
    b = baidu.g(b);
    d = baidu.g(d);
    a = a || {};
    a.coordinate = a.coordinate || {};
    a.source = b;
    var c = new baidu.ui.smartPosition.SmartPosition(a);
    c.addEventListener("onbeforeupdate",
    function() {
        var g = this,
        f = baidu.dom.getPosition(d);
        g.coordinate["x"] = f.left + (g.position.indexOf("right") >= 0 ? d.offsetWidth: 0);
        g.coordinate["y"] = f.top + (g.position.indexOf("bottom") >= 0 ? d.offsetHeight: 0)
    });
    c.update();
    return c
};
baidu.ui.menubar.Menubar = baidu.ui.menubar.Menubar || baidu.ui.createUI(function(a) {
    var b = this;
    b.items = {};
    b.data = a.data || [];
    b._initialized = false;
    b.dispatchEvent("oninit")
}).extend({
    uiType: "menubar",
    width: "200",
    height: "",
    zIndex: 1200,
    hideDelay: 300,
    position: "bottomCenter",
    tplBody: '<div id="#{id}" class="#{class}">#{content}</div>',
    tplBranch: '<ul id="#{ulId}">#{subitems}</ul>',
    tplItem: '<li onmouseover="#{onmouseover}" onmouseout="#{onmouseout}"><a href="#" id="#{id}" class="#{class}" onclick="#{onclick}" title="#{title}">#{content}</a>#{branch}</li>',
    tplContent: '<span class="#{contentClass}">#{content}</span>',
    tplArrow: '<span class="#{arrow}"></span>',
    toggle: function() {
        return true
    },
    getString: function() {
        var a = this;
        return baidu.string.format(a.tplBody, {
            id: a.getId(),
            "class": a.getClass(),
            guid: a.guid,
            content: a.getItemsString(a.data, 0)
        })
    },
    getItemsString: function(b, c) {
        var d = this,
        a = [];
        baidu.array.each(b,
        function(g, f) {
            var h = [],
            i = c + "-" + f;
            d.items[i] = g;
            h.push(baidu.string.format(d.tplContent, {
                contentClass: d.getClass("content"),
                content: g.content || g.label
            }));
            if (g.items) {
                h.push(baidu.string.format(d.tplArrow, {
                    arrow: d.getClass("arrow")
                }))
            }
            a.push(baidu.string.format(d.tplItem, {
                id: d.getItemId(i),
                "class": (g.disabled ? (d.getClass("item") + " " + d.getClass("item-disabled")) : d.getClass("item")),
                onclick: d.getCallString("itemClick", i),
                onmouseover: g.disabled || d.getCallString("itemMouseOver", i),
                onmouseout: g.disabled || d.getCallString("itemMouseOut", i),
                content: h.join(""),
                branch: g.items ? d.getItemsString(g.items, i) : "",
                title: g.title
            }))
        });
        return baidu.string.format(d.tplBranch, {
            ulId: d.getBranchId(c),
            subitems: a.join("")
        })
    },
    render: function(b) {
        var a = this;
        b = baidu.g(b);
        if (b) {
            a.targetId = b.id || a.getId("target")
        }
        a.renderMain();
        a.dispatchEvent("onload")
    },
    itemClick: function(a) {
        var b = this;
        b.close(true);
        b.dispatchEvent("onitemclick", b.getItemEventData(a))
    },
    getItemEventData: function(a) {
        return {
            value: this.getItemData(a),
            index: a
        }
    },
    itemMouseOver: function(b) {
        var d = this,
        a = d.getItemData(b),
        c = d.getItem(b);
        baidu.dom.addClass(c, d.getClass("item-hover"));
        a.items && baidu.dom.show(d.getBranchId(b));
        a.showing = true;
        d.dispatchEvent("onitemmouseover", d.getItemEventData(b))
    },
    itemMouseOut: function(b) {
        var d = this,
        a = d.getItemData(b),
        c = d.getItem(b);
        baidu.dom.removeClass(d.getItem(b), d.getClass("item-hover"));
        a.showing = false;
        clearTimeout(a.outListener);
        a.outListener = setTimeout(function() {
            if (!a.showing) {
                a.items && baidu.dom.hide(d.getBranchId(b));
                d.dispatchEvent("onitemmouseout", d.getItemEventData(b))
            }
        },
        d.hideDelay)
    },
    update: function(c) {
        var d = this,
        b = d.getMain(),
        f = d.getTarget();
        c && baidu.object.extend(d, c);
        b.innerHTML = d.getString();
        d.dispatchEvent("onupdate");
        baidu.dom.setStyle(b, "z-index", d.zIndex);
        var a = d.getBody();
        baidu.dom.setStyles(a, {
            height: d.height,
            width: d.width
        });
        baidu.dom.setStyle(d.getBranchId(0), "width", d.width);
        baidu.dom.addClass(d.getBranchId(0), d.getClass("root"));
        baidu.object.each(d.items,
        function(h, g) {
            if (h.items) {
                baidu.dom.setStyles(d.getBranchId(g), {
                    left: d.width,
                    width: d.width,
                    position: "absolute",
                    display: "none"
                })
            }
        });
        if (f) {
            baidu.ui.smartPosition.element(d.getMain(), f, {
                position: d.position
            })
        }
    },
    getItemId: function(a) {
        return this.getId("item-" + a)
    },
    getBranchId: function(a) {
        return this.getId("branch-" + a)
    },
    getItem: function(a) {
        return baidu.g(this.getItemId(a))
    },
    getItemData: function(a) {
        return this.items[a]
    },
    open: function() {
        var b = this,
        c;
        if (baidu.lang.isFunction(b.toggle) && !b.toggle()) {
            return
        }
        if (!b.dispatchEvent("onbeforeopen")) {
            return
        }
        if (c = baidu.ui.menubar.showing) {
            c.close(true)
        }
        if (!b._initialized) {
            b.update();
            b._initialized = true
        }
        var a = b.getBody();
        baidu.dom.addClass(a, b.getClass("open"));
        baidu.dom.removeClass(a, b.getClass("empty"));
        b.dispatchEvent("onopen");
        baidu.ui.menubar.showing = b
    },
    close: function(c) {
        var b = this,
        a = b.getBody();
        if (!a) {
            return
        }
        baidu.ui.menubar.showing = null;
        if (c || b.dispatchEvent("onbeforeclose")) {
            baidu.dom.addClass(a, b.getClass("empty"));
            baidu.dom.removeClass(a, b.getClass("open"));
            b.dispatchEvent("onclose")
        }
    },
    dispose: function() {
        var a = this;
        a.dispatchEvent("ondispose");
        a.getMain() && baidu.dom.remove(a.getMain());
        baidu.lang.Class.prototype.dispose.call(a)
    },
    getTarget: function() {
        return baidu.g(this.targetId)
    }
});
baidu.object.extend(baidu.ui.menubar.Menubar.prototype, {
    type: "click",
    bodyClick: function(d) {
        var b = this;
        var c = baidu.event.getTarget(d || window.event),
        a = function(f) {
            return f == b.getTarget()
        };
        if (!c || a(c) || baidu.dom.getAncestorBy(c, a) || baidu.ui.get(c) == b) {
            return
        }
        b.close()
    }
});
baidu.ui.menubar.Menubar.register(function(a) {
    if (a.type == "click") {
        a.targetOpenHandler = baidu.fn.bind("open", a);
        a.bodyClickHandler = baidu.fn.bind("bodyClick", a);
        a.addEventListener("onload",
        function() {
            var b = a.getTarget();
            if (b) {
                baidu.on(b, "click", a.targetOpenHandler);
                baidu.on(document, "click", a.bodyClickHandler)
            }
        });
        a.addEventListener("ondispose",
        function() {
            var b = a.getTarget();
            if (b) {
                baidu.un(b, "click", a.targetOpenHandler);
                baidu.un(document, "click", a.bodyClickHandler)
            }
        })
    }
});
baidu.ui.menubar.click = function(b, c, a) {
    a = baidu.object.extend({
        data: c,
        type: "click",
        autoRender: true,
        element: baidu.g(b)
    },
    a || {});
    return baidu.ui.create(baidu.ui.menubar.Menubar, a)
};
baidu.object.extend(baidu.ui.menubar.Menubar.prototype, {
    tplIcon: '<span class="#{icon}" style="#{iconStyle};"></span>',
    updateIcons: function() {
        var a = this;
        baidu.object.each(a.items,
        function(c, b) {
            if (a.getItem(b)) {
                baidu.dom.insertHTML(a.getItem(b), "afterBegin", baidu.string.format(a.tplIcon, {
                    icon: a.getClass("icon"),
                    iconStyle: c.icon ? ("background-position:" + c.icon) : "background-image:none"
                }))
            }
        })
    }
});
baidu.ui.menubar.Menubar.register(function(a) {
    a.addEventListener("onupdate", a.updateIcons)
});
baidu.object.extend(baidu.ui.menubar.Menubar.prototype, {
    showFx: baidu.fx.expand,
    showFxOptions: {
        duration: 200
    },
    hideFx: baidu.fx.collapse,
    hideFxOptions: {
        duration: 500,
        restoreAfterFinish: true
    }
});
baidu.ui.menubar.Menubar.register(function(a) {
    a.addEventListener("onopen",
    function() { ! baidu.ui.menubar.showing && "function" == typeof a.showFx && a.showFx(baidu.g(a.getId()), a.showFxOptions)
    });
    a.addEventListener("onbeforeclose",
    function(c) {
        try {
            a.hideFx(baidu.g(a.getId()), a.hideFxOptions).addEventListener("onafterfinish",
            function() {
                a.close(true)
            });
            c.returnValue = false
        } catch(b) {}
        return false
    })
});
baidu.object.extend(baidu.ui.menubar.Menubar.prototype, {
    type: "hover",
    showDelay: 100,
    hideDelay: 500,
    targetHover: function() {
        var a = this;
        clearTimeout(a.hideHandler);
        a.showHandler = setTimeout(function() {
            a.open()
        },
        a.showDelay)
    },
    targetMouseOut: function() {
        var a = this;
        clearTimeout(a.showHandler);
        clearTimeout(a.hideHandler);
        a.hideHandler = setTimeout(function() {
            a.close()
        },
        a.hideDelay)
    },
    clearHideHandler: function() {
        clearTimeout(this.hideHandler)
    }
});
baidu.ui.menubar.Menubar.register(function(a) {
    a.targetHoverHandler = baidu.fn.bind("targetHover", a);
    a.targetMouseOutHandler = baidu.fn.bind("targetMouseOut", a);
    a.clearHandler = baidu.fn.bind("clearHideHandler", a);
    if (a.type == "hover") {
        a.addEventListener("onload",
        function() {
            var b = a.getTarget();
            if (b) {
                baidu.on(b, "mouseover", a.targetHoverHandler);
                baidu.on(document, "click", a.targetMouseOutHandler)
            }
        });
        a.addEventListener("onopen",
        function() {
            var c = a.getTarget(),
            b = a.getBody();
            if (c) {
                baidu.on(b, "mouseover", a.clearHandler);
                baidu.on(c, "mouseout", a.targetMouseOutHandler);
                baidu.on(b, "mouseout", a.targetMouseOutHandler)
            }
        });
        a.addEventListener("ondispose",
        function() {
            var c = a.getTarget(),
            b = a.getBody();
            if (c) {
                baidu.un(c, "mouseover", a.targetHoverHandler);
                baidu.un(c, "mouseout", a.targetMouseOutHandler);
                baidu.un(document, "click", a.targetMouseOutHandler)
            }
            if (b) {
                baidu.un(b, "mouseover", a.clearHandler);
                baidu.un(b, "mouseout", a.targetMouseOutHandler)
            }
        })
    }
});
baidu.ui.menubar.create = function(b, a) {
    a = a || {};
    a.data = b || [];
    return new baidu.ui.menubar.Menubar(a)
};
baidu.ui.menubar.hover = function(b, c, a) {
    a = baidu.object.extend({
        data: c,
        type: "hover",
        autoRender: true,
        element: baidu.g(b)
    },
    a || {});
    return baidu.ui.create(baidu.ui.menubar.Menubar, a)
};
baidu.ui.progressBar = baidu.ui.progressBar || {};
baidu.ui.progressBar.ProgressBar = baidu.ui.createUI(function(a) {}).extend({
    uiType: "progressBar",
    tplBody: '<div id="#{id}" class="#{class}">#{bar}</div>',
    tplBar: '<div id="#{barId}" class="#{barClass}"></div>',
    value: 0,
    _min: 0,
    _max: 100,
    axis: {
        horizontal: {
            offsetSize: "offsetWidth",
            size: "width"
        },
        vertical: {
            offsetSize: "offsetHeight",
            size: "height"
        }
    },
    getString: function() {
        var a = this;
        return baidu.format(a.tplBody, {
            id: a.getId(),
            "class": a.getClass(),
            bar: baidu.format(a.tplBar, {
                barId: a.getId("bar"),
                barClass: a.getClass("bar")
            })
        })
    },
    render: function(c) {
        var b = this,
        a;
        if (!c) {
            return
        }
        baidu.dom.insertHTML(b.renderMain(c), "beforeEnd", b.getString());
        b.dispatchEvent("onload");
        b.update()
    },
    update: function(b) {
        var c = this;
        b = b || {};
        baidu.object.extend(c, b);
        c.value = Math.max(Math.min(c.value, c._max), c._min);
        if (c.value == c._lastValue) {
            return
        }
        var a = c.axis[c.layout].size;
        baidu.dom.setStyle(c.getBar(), a, c._calcPos(c.value));
        c._lastValue = c.value;
        c.dispatchEvent("update")
    },
    getValue: function() {
        var a = this;
        return a.value
    },
    _calcPos: function(c) {
        var b = this;
        var a = b.getBody()[b.axis[b.layout].offsetSize];
        return c * (a) / (b._max - b._min)
    },
    disable: function() {
        this.disabled = true
    },
    enable: function() {
        this.disabled = false
    },
    getTarget: function() {
        return baidu.g(this.targetId)
    },
    getBar: function() {
        return baidu.g(this.getId("bar"))
    },
    dispose: function() {
        var a = this;
        baidu.dom.remove(a.getId())
    }
});
baidu.ui.tooltip = baidu.ui.tooltip || {
    mainId: null
};
baidu.ui.smartPosition.mouse = function(b, a) {
    a = a || {};
    a.source = b;
    a.coordinate = baidu.page.getMousePosition();
    a.once = true;
    var c = new baidu.ui.smartPosition.SmartPosition(a);
    c.update();
    return c
};
baidu.ui.tooltip.Tooltip = baidu.ui.createUI(new Function).extend({
    uiType: "TOOLTIP",
    width: "",
    height: "",
    content: "",
    zIndex: 3000,
    positionBy: "element",
    offsetPosition: "bottomRight",
    offset: [0, 0],
    tplBody: '<div id="#{id}" class="#{class}"></div>',
    toggle: function() {
        return true
    },
    getString: function() {
        var a = this;
        return baidu.format(a.tplBody, {
            id: a.getId(),
            "class": a.getClass()
        })
    },
    open: function() {
        var a = this,
        b;
        if (typeof a.toggle == "function" && !a.toggle()) {
            return
        }
        if (!a.dispatchEvent("onbeforeopen")) {
            return
        }
        if (b = baidu.ui.tooltip.showing) {
            b.close()
        }
        a.update(a);
        baidu.ui.tooltip.showing = a;
        a.dispatchEvent("onopen")
    },
    render: function(c) {
        var b = this,
        a;
        if (c.id) {
            b.targetId = c.id
        } else {
            b.targetId = c.id = b.getId("target")
        }
        b.content = b.content || c.title || "";
        c.title = "";
        if (baidu.ui.tooltip.mainId) {
            b.mainId = baidu.ui.tooltip.mainId;
            b.dispatchEvent("onload");
            return
        }
        a = b.renderMain(b.container);
        baidu.ui.tooltip.mainId = b.mainId;
        b.dispatchEvent("onload")
    },
    update: function(c) {
        var d = this,
        b = d.getMain(),
        a;
        b.innerHTML = d.getString();
        a = d.getBody();
        c = c || {};
        baidu.object.extend(this, c);
        baidu.dom.setStyles(b, {
            zIndex: d.zIndex,
            width: d.width,
            height: d.height,
            display: ""
        });
        if (c.contentElement) {
            a.innerHTML = "";
            a.appendChild(c.contentElement)
        } else {
            if (c.content) {
                a.innerHTML = d.content
            }
        }
        d._setPosition()
    },
    _setPosition: function() {
        var b = this,
        c = baidu.ui.smartPosition,
        a = {
            once: true,
            offset: b.offset,
            position: b.offsetPosition,
            insideScreen: "surround"
        };
        switch (b.positionBy) {
        case "element":
            c.element(b.getMain(), b.getTarget(), a);
            break;
        case "mouse":
            c.mouse(b.getMain(), a);
            break;
        default:
            break
        }
    },
    close: function() {
        var a = this;
        if (!a.getBody()) {
            return
        }
        if (a.dispatchEvent("onbeforeclose")) {
            a._close();
            a.dispatchEvent("onclose")
        }
    },
    _close: function() {
        this.getMain().style.left = "-100000px";
        baidu.ui.tooltip.showing = null
    },
    dispose: function() {
        var a = this;
        a.dispatchEvent("ondispose");
        if (a.getBody()) {
            baidu.dom.remove(a.getBody())
        }
        baidu.lang.Class.prototype.dispose.call(a)
    },
    getTarget: function() {
        return baidu.g(this.targetId)
    }
});
baidu.ui.tooltip.create = function(g, b) {
    if (!g) {
        return null
    }
    var a = [],
    f,
    d,
    c = baidu.lang.toArray(g);
    b = b || {};
    baidu.array.each(c,
    function(h) {
        f = new baidu.ui.tooltip.Tooltip(b);
        f.render(baidu.g(h));
        f.addEventListener("open",
        function() {
            this.contentElement && (this.contentElement.style.display = "")
        });
        a.push(f)
    });
    return g.splice || g.item ? a: a[0]
};
baidu.ui.tooltip.Tooltip.prototype.offset = [0, 0];
baidu.ui.tooltip.click = function(c, a) {
    var b = baidu.ui.tooltip.create(c, a),
    d = baidu.lang.isArray(b) ? b: [b];
    baidu.array.each(d,
    function(h) {
        var f = function(i) {
            h.open()
        },
        g = function(k) {
            if (!h.getBody()) {
                return
            }
            var j = baidu.event.getTarget(k || window.event),
            i = function(l) {
                return l == h.getTarget()
            };
            if (i(j) || baidu.dom.getAncestorBy(j, i) || baidu.ui.get(j) == h) {
                return
            }
            h.close()
        };
        baidu.on(h.getTarget(), "click", f);
        baidu.on(document, "click", g);
        h.addEventListener("ondispose",
        function() {
            baidu.un(h.getTarget(), "click", f);
            baidu.un(document, "click", g)
        })
    });
    return b
};
baidu.object.extend(baidu.ui.tooltip.Tooltip.prototype, {
    enableFx: true,
    showFx: baidu.fx.fadeIn,
    showFxOptions: {
        duration: 500
    },
    hideFx: baidu.fx.fadeOut,
    hideFxOptions: {
        duration: 500
    }
});
baidu.ui.tooltip.Tooltip.register(function(a) {
    if (a.enableFx) {
        a.addEventListener("onopen",
        function() {
            "function" == typeof a.showFx && a.showFx(a.getMain(), a.showFxOptions)
        });
        a.addEventListener("beforeclose",
        function(b) {
            a.hideFx(a.getMain(), a.hideFxOptions).addEventListener("onafterfinish",
            function() {
                a._close()
            });
            b.returnValue = false
        })
    }
});
baidu.extend(baidu.ui.tooltip.Tooltip.prototype, {
    showDelay: 100,
    hideDelay: 500,
    offset: [0, 0]
});
baidu.ui.tooltip.hover = function(c, a) {
    var b = baidu.ui.tooltip.create(c, a),
    d = baidu.lang.isArray(b) ? b: [b];
    baidu.array.each(d,
    function(g) {
        baidu.on(g.getTarget(), "mouseover",
        function(h) {
            clearTimeout(g.hideHandler);
            g.showHandler = setTimeout(function() {
                g.open()
            },
            g.showDelay)
        });
        g.addEventListener("onopen",
        function() {
            baidu.on(g.getBody(), "mouseover",
            function() {
                clearTimeout(g.hideHandler)
            })
        });
        function f() {
            clearTimeout(g.showHandler);
            clearTimeout(g.hideHandler);
            g.hideHandler = setTimeout(function() {
                g.close()
            },
            g.hideDelay)
        }
        baidu.on(g.getTarget(), "mouseout", f);
        g.addEventListener("onopen",
        function() {
            baidu.on(g.getBody(), "mouseout", f)
        })
    });
    return b
};
baidu.ui.modal = baidu.ui.modal || {
    mainId: null,
    showing: [],
    instances: {}
};
baidu.ui.modal.collection = {};
baidu.ui.modal.Modal = baidu.ui.createUI(function(b) {
    var c = this,
    a = (b && b.container) ? baidu.g(b.container) : null; ! a && (a = document.body);
    if (!a.id) {
        a.id = c.getId("container")
    }
    c.containerId = a.id;
    c.styles = {
        color: "#000000",
        opacity: 0.6,
        zIndex: 1000
    }
}).extend({
    uiType: "MODAL",
    _showing: false,
    getContainer: function() {
        var a = this;
        return baidu.g(a.containerId)
    },
    render: function() {
        var f = this,
        b, d, a, g = f.containerId,
        c = baidu.g(f.containerId);
        if (b = baidu.ui.modal.collection[g]) {
            f.mainId = b.mainId;
            a = f.getMain()
        } else {
            a = f.renderMain();
            if (c !== document.body) {
                c.appendChild(a)
            }
            baidu.ui.modal.collection[g] = {
                mainId: f.mainId,
                instance: []
            }
        }
    },
    show: function(j) {
        var h = this,
        a = h.getContainer(),
        f = h.getMain(),
        d = {},
        g = h.containerId,
        b = baidu.ui.modal.collection[g],
        c = b.instance.length,
        i;
        if (h._showing) {
            return
        }
        if (c > 0) {
            i = baidu.lang.instance(b.instance[c - 1]);
            i && i._hide()
        }
        j = j || {};
        h._show(j.styles || {});
        b.instance.push(h.guid);
        f.style.display = "block";
        h._showing = true;
        if (h.targetUI) {
            d = {
                container: a
            };
            baidu.ie < 8 && (d.hideSelect = true);
            baidu.ui.smartCover.show(h.targetUI, d)
        }
        h.dispatchEvent("onshow")
    },
    _show: function(b) {
        var a = this;
        a._getModalStyles(b || {});
        a._update();
        a.windowHandler = a.getWindowHandle();
        baidu.on(window, "resize", a.windowHandler);
        baidu.on(window, "scroll", a.windowHandler)
    },
    hide: function() {
        var g = this,
        b = g.containerId,
        h = baidu.ui.modal.collection[b],
        a = g.getMain(),
        f = h.instance.length,
        d;
        if (!g._showing) {
            return
        }
        for (var c = 0; c < f; c++) {
            if (h.instance[c] == g.guid) {
                h.instance.splice(c, 1);
                break
            }
        }
        f = h.instance.length;
        if (c == f) {
            g._hide();
            if (f > 0) {
                d = baidu.lang.instance(h.instance[f - 1]);
                d && d._show()
            } else {
                a.style.display = "none"
            }
        }
        g._showing = false;
        if (g.targetUI) {
            baidu.ui.smartCover.hide(g.targetUI)
        }
        g.dispatchEvent("onhide")
    },
    _hide: function() {
        var a = this;
        baidu.un(window, "resize", a.windowHandler);
        baidu.un(window, "scroll", a.windowHandler)
    },
    getWindowHandle: function() {
        var a = this;
        return function() {
            var b = a;
            a._getModalStyles({});
            a._update()
        }
    },
    update: function(b) {
        b = b || {};
        var c = this,
        a = c.getMain(),
        d = baidu.ui.modal.collection[c.containerId];
        b = b || {};
        baidu.extend(c, b);
        c._getModalStyles(b.styles || {});
        c._update();
        delete(b.styles);
        baidu.extend(c, b);
        c.dispatchEvent("onupdate")
    },
    _update: function() {
        var b = this,
        a = b.getMain();
        baidu.dom.setStyles(a, b.styles)
    },
    _getModalStyles: function(g) {
        var f = this,
        a = f.getMain(),
        b = f.getContainer(),
        c,
        i,
        d;
        function h(l, k) {
            var j = parseInt(baidu.getStyle(l, k));
            j = isNaN(j) ? 0 : j;
            j = baidu.lang.isNumber(j) ? j: 0;
            return j
        }
        if (b !== document.body) {
            g.width = b.offsetWidth;
            g.height = b.offsetHeight;
            if (baidu.getStyle(b, "position") == "static") {
                d = a.offsetParent || document.body;
                c = baidu.dom.getPosition(d);
                i = baidu.dom.getPosition(b);
                g.top = i.top - c.top + h(d, "marginTop");
                g.left = i.left - c.left + h(d, "marginLeft")
            }
        } else {
            g.width = baidu.page.getViewWidth();
            g.height = baidu.page.getViewHeight();
            if ((!baidu.browser.ie || baidu.browser.ie >= 7) && document.compatMode != "BackCompat") {
                g.position = "fixed";
                g.top = 0;
                g.left = 0
            } else {
                g.top = baidu.page.getScrollTop();
                g.left = baidu.page.getScrollLeft()
            }
        }
        baidu.extend(f.styles, g);
        f.styles.backgroundColor = f.styles.color || f.styles.backgroundColor;
        delete(f.styles.color)
    }
});
baidu.ui.modal.create = function(a) {
    a = a || {};
    var b = new baidu.ui.modal.Modal(a);
    b.render();
    return b
};
baidu.ui.pager = baidu.ui.pager || {};
baidu.ui.pager.Pager = baidu.ui.createUI(function(a) {
    this._init.apply(this, arguments)
}).extend({
    uiType: "pager",
    id: "pager",
    tplHref: "##{page}",
    tplLabel: "[#{page}]",
    specialLabelMap: {
        first: "棣栭〉",
        last: "灏鹃〉",
        previous: "涓婁竴椤�",
        next: "涓嬩竴椤�"
    },
    tplCurrentLabel: "#{page}",
    tplItem: '<a class="#{class}" page="#{page}" target="_self" href="#{href}">#{label}</a>',
    tplBody: '<div onclick="#{onclick}" id="#{id}" class="#{class}">#{items}</div>',
    beginPage: 1,
    endPage: 100,
    itemCount: 10,
    leftItemCount: 4,
    _init: function(a) {
        var b = this;
        b.update()
    },
    update: function(a) {
        var b = this;
        a = a || {};
        if (b.checkOptions(a)) {
            if (a.hasOwnProperty("currentPage") && a.currentPage != b.currentPage) {
                if (!b._notifyGotoPage(a.currentPage, false)) {
                    delete a.currentPage
                }
            }
            b._updateNoCheck(a);
            return true
        }
        return false
    },
    _updateNoCheck: function(a) {
        var b = this;
        baidu.object.extend(b, a);
        if (b.getMain()) {
            b._refresh()
        }
    },
    checkOptions: function(b) {
        var d = this;
        var c = b.beginPage || d.beginPage;
        var a = b.endPage || d.endPage;
        if (a <= c) {
            return false
        }
        if (b.hasOwnProperty("beginPage") && d.currentPage < c) {
            d.currentPage = c
        }
        if (b.hasOwnProperty("endPage") && d.currentPage >= a) {
            d.currentPage = a - 1
        }
        var f = b.currentPage || d.currentPage;
        if (f < c || f >= a) {
            return false
        }
        return true
    },
    _genItem: function(c, a) {
        var b = this;
        return baidu.string.format(b.tplItem, {
            "class": a ? b.getClass(a) : "",
            page: c,
            href: baidu.string.format(b.tplHref, {
                page: c
            }),
            label: function() {
                return (a ? (a == "current" ? baidu.string.format(b.tplCurrentLabel, {
                    page: c
                }) : b.specialLabelMap[a]) : baidu.string.format(b.tplLabel, {
                    page: c
                }))
            }
        })
    },
    _genBody: function() {
        var j = this;
        var a = j.beginPage;
        var c = j.endPage;
        var g = j.currentPage;
        var l = Math.min(c - a, j.itemCount);
        var k = Math.min(g - a, j.leftItemCount);
        k = Math.max(l - (c - g), k);
        var f = g - k;
        var b = {
            first: a,
            last: c - 1,
            previous: g - 1,
            next: g + 1
        };
        var m = {};
        baidu.object.each(b,
        function(o, i) {
            m[i] = j._genItem(o, i)
        });
        m.previous = b.previous < a ? "": m.previous;
        m.next = b.next >= c ? "": m.next;
        m.first = f == a ? "": m.first;
        m.last = f + l >= c - 1 ? "": m.last;
        var n = [];
        for (var d = 0; d < l; d++) {
            var h = f + d;
            n[d] = j._genItem(h, h == g ? "current": null)
        }
        return baidu.string.format(j.tplBody, {
            id: j.getId(),
            "class": j.getClass(),
            items: m.first + m.previous + n.join("") + m.next + m.last,
            onclick: j.getCallRef() + "._handleOnClick(event, this);"
        })
    },
    _refresh: function() {
        var a = this;
        a.getMain().innerHTML = a.getString()
    },
    _handleOnClick: function(a) {
        a = baidu.event.get(a);
        var c = this,
        b = a.target,
        d = Number(b.getAttribute("page"));
        if (d && c._notifyGotoPage(d, true)) {
            c._updateNoCheck({
                currentPage: d
            })
        } else {
            a.preventDefault()
        }
    },
    _notifyGotoPage: function(a, b) {
        return this.dispatchEvent("ongotopage", {
            page: a,
            fromClick: b
        })
    },
    ongotopage: function(a) {},
    getString: function() {
        var a = this;
        if (a.currentPage === undefined) {
            a.currentPage = a.beginPage
        }
        return a._genBody()
    },
    render: function(a) {
        var b = this;
        b.renderMain(a);
        b.getMain().innerHTML = b.getString();
        b.update();
        b.dispatchEvent("onload")
    },
    dispose: function() {
        var c = this;
        c.dispatchEvent("ondispose");
        if (c.getMain()) {
            var a = c.getMain();
            baidu.event.un(a, "click", c._handleOnClick);
            if (a.parentNode && a.parentNode.nodeType == 1) {
                a.parentNode.removeChild(a)
            }
            c.dispose = null;
            a = null;
            baidu.lang.Class.prototype.dispose.call(c)
        } else {
            c.addEventListener("onload",
            function b() {
                c.removeEventListener("onload", b);
                c.dispose()
            })
        }
    }
});
baidu.ui.input = baidu.ui.input || {};
baidu.ui.input.Input = baidu.ui.createUI(new Function).extend({
    uiType: "INPUT",
    tplBody: '<input id="#{id}" class="#{class}" value="#{text}" onfocus="#{onfocus}" onblur="#{onblur}" onchange="#{onchange}" onkeydown="#{onkeydown}" onkeyup="#{onkeyup}" onmouseover="#{onmouseover}" onmouseout="#{onmouseout}" />',
    disabled: false,
    getString: function() {
        var a = this;
        return baidu.format(a.tplBody, {
            id: a.getId(),
            onfocus: a.getCallString("_onFocus"),
            onblur: a.getCallString("_onBlur"),
            onchange: a.getCallString("_onChange"),
            onkeydown: a.getCallString("_onKeyDown"),
            onkeyup: a.getCallString("_onKeyUp"),
            onmouseover: a.getCallString("_onMouseOver"),
            onmouseout: a.getCallString("_onMouseOut"),
            text: a.text,
            "class": a.getClass(a.isDisabled() ? "disable": "")
        })
    },
    render: function(b) {
        if (!baidu.g(b)) {
            return
        }
        var a = this;
        baidu.dom.insertHTML(a.renderMain(b), "beforeEnd", a.getString());
        a.getBody().disabled = a.disabled
    },
    _onEventHandle: function(b, c) {
        var a = this;
        if (a.isDisabled()) {
            return
        }
        a._changeStyle(c);
        a.dispatchEvent(b)
    },
    _onFocus: function() {
        this._onEventHandle("onfocus", "focus")
    },
    _onBlur: function() {
        this._onEventHandle("onblur")
    },
    _onChange: function() {
        this._onEventHandle("onchange")
    },
    _onKeyDown: function() {
        this._onEventHandle("onkeydown", "focus")
    },
    _onKeyUp: function() {
        this._onEventHandle("onkeyup", "focus")
    },
    _onMouseOver: function() {
        this._onEventHandle("onmouseover", "hover")
    },
    _onMouseOut: function() {
        this._onEventHandle("onmouseout")
    },
    _changeStyle: function(c) {
        var b = this,
        a = b.getBody();
        baidu.dom.removeClass(a, b.getClass("hover") + " " + b.getClass("focus") + " " + b.getClass("disable"));
        baidu.addClass(a, b.getClass(c))
    },
    isDisabled: function() {
        return this.disabled
    },
    getText: function() {
        var a = this.getBody().value;
        return a
    },
    _able: function(c, a, d) {
        var b = this;
        b._changeStyle(d);
        b.getBody().disabled = a;
        b.disabled = a;
        b.dispatchEvent(c)
    },
    enable: function() {
        this._able("onenable", false)
    },
    disable: function() {
        this._able("ondisable", true, "disable")
    },
    dispose: function() {
        var a = this;
        a.dispatchEvent("ondispose");
        baidu.dom.remove(a.getBody());
        baidu.lang.Class.prototype.dispose.call(a)
    }
});
baidu.ui.input.setup = function(d, c) {
    var b = new baidu.ui.input.Input(c),
    a = baidu.dom.create("DIV", {
        style: "display:inline"
    });
    baidu.dom.insertAfter(a, d);
    b.text = d.value;
    b.disabled = d.disabled;
    b.render(a);
    baidu.dom.remove(d);
    return b
};
baidu.ui.input.create = function(d, c) {
    c = c || {};
    var a = new baidu.ui.input.Input(c);
    var b = baidu.g(d);
    a.render(b);
    return a
};
baidu.ui.accordion = baidu.ui.accordion || {};
baidu.ui.ItemSet = baidu.ui.createUI(function(a) {}).extend({
    currentClass: "current",
    tplHead: "",
    tplBody: "",
    headIds: [],
    bodyIds: [],
    switchType: "click",
    _getHeadString: function(d, b) {
        var c = this,
        a = c.getId("head" + b);
        c.headIds.push(a);
        if (b == 0) {
            c.addEventListener("onload",
            function() {
                c.setCurrentHead(baidu.g(a))
            })
        }
        return baidu.format(c.tplHead, {
            id: a,
            bodyId: c.getId("body" + b),
            "class": b == 0 ? c.getClass("head") + " " + c.getClass(c.currentClass) : c.getClass("head"),
            head: d.head,
            tangram: "name : " + c.getId("body" + b)
        })
    },
    _getBodyString: function(c, a) {
        var b = this,
        d = b.getId("body" + a);
        b.bodyIds.push(d);
        return baidu.format(b.tplBody, {
            id: d,
            "class": b.getClass("body"),
            body: c.body,
            display: a == 0 ? "block": "none"
        })
    },
    _getSwitchHandler: function(a) {
        var b = this;
        if (b.dispatchEvent("onbeforeswitch", {
            element: a
        })) {
            b.switchByHead(a);
            b.dispatchEvent("onswitch")
        }
    },
    _addSwitchEvent: function(a) {
        var b = this;
        a["on" + b.switchType] = baidu.fn.bind("_getSwitchHandler", b, a)
    },
    render: function(a) {
        var b = this;
        baidu.dom.insertHTML(b.renderMain(a), "beforeEnd", b.getString());
        baidu.each(b.getHeads(),
        function(d, c) {
            b._addSwitchEvent(d)
        });
        b.dispatchEvent("onload")
    },
    getHeads: function() {
        var b = this,
        a = [];
        baidu.each(b.headIds,
        function(d, c) {
            a.push(baidu.g(d))
        });
        return a
    },
    getBodies: function() {
        var b = this,
        a = [];
        baidu.each(b.bodyIds,
        function(d, c) {
            a.push(baidu.g(d))
        });
        return a
    },
    getCurrentHead: function() {
        return this.currentHead
    },
    setCurrentHead: function(a) {
        this.currentHead = a
    },
    getBodyByHead: function(a) {
        return baidu.g(a.getAttribute("bodyId"))
    },
    addItem: function(b) {
        var a = this.getHeads().length;
        this.insertItemHTML(b, a);
        this._addSwitchEvent(this.getHeads()[a])
    },
    removeItem: function(c) {
        var d = this.getHeads()[c],
        b = d.id,
        a = this.getBodyByHead(d),
        f = a.id;
        baidu.dom.remove(d);
        baidu.dom.remove(a);
        baidu.array.remove(this.headIds, b);
        baidu.array.remove(this.bodyIds, f)
    },
    switchByHead: function(a) {
        var c = this,
        b = c.getCurrentHead();
        if (b) {
            c.getBodyByHead(b).style.display = "none";
            baidu.dom.removeClass(b, c.getClass(c.currentClass))
        }
        c.setCurrentHead(a);
        c.getBodyByHead(a).style.display = "block";
        baidu.dom.addClass(a, c.getClass(c.currentClass))
    },
    switchByIndex: function(a) {
        this.switchByHead(this.getHeads()[a])
    },
    dispose: function() {
        this.dispatchEvent("ondispose")
    }
});
baidu.ui.accordion.Accordion = baidu.ui.createUI(function(a) {},
{
    superClass: baidu.ui.ItemSet
}).extend({
    uiType: "accordion",
    target: document.body,
    tplDOM: "<div id='#{id}' class='#{class}'>#{items}</div>",
    tplHead: '<div id="#{id}" bodyId="#{bodyId}" class="#{class}" >#{head}</div>',
    tplBody: "<div id='#{id}' class='#{class}' style='display:#{display};'>#{body}</div>",
    getString: function() {
        var b = this,
        a = this.items,
        c = [];
        baidu.each(a,
        function(f, d) {
            c.push(b._getHeadString(f, d) + b._getBodyString(f, d))
        });
        return baidu.format(this.tplDOM, {
            id: b.getId(),
            "class": b.getClass(),
            items: c.join("")
        })
    },
    insertItemHTML: function(c, a) {
        var b = this;
        baidu.dom.insertHTML(b.getMain(), "beforeEnd", b._getHeadString(c, a));
        baidu.dom.insertHTML(b.getMain(), "beforeEnd", b._getBodyString(c, a))
    }
});
baidu.ui.accordion.Accordion.register(function(a) {
    a.addEventListener("beforeswitch",
    function(c) {
        var f = a.getCurrentHead(),
        d = a.getBodyByHead(f),
        g = a.getBodyByHead(c.element),
        b;
        if (f.id != c.element.id && !baidu.fx.current(d)) {
            baidu.fx.collapse(d, {
                onbeforestart: function() {
                    baidu.dom.setStyles(g, {
                        display: "",
                        overflow: "hidden",
                        height: "0px"
                    });
                    d.style.overflow = "hidden"
                },
                onbeforeupdate: function() {
                    b = parseInt(baidu.dom.getStyle(d, "height"))
                },
                onafterupdate: function() {
                    g.style.height = parseInt(baidu.dom.getStyle(g, "height"), 10) - parseInt(baidu.dom.getStyle(d, "height"), 10) + b + "px"
                },
                onafterfinish: function() {
                    a.switchByHead(c.element);
                    g.style.overflow = "auto"
                }
            })
        }
        c.returnValue = false
    })
});
baidu.ui.tab = baidu.ui.tab || {};
baidu.ui.tab.Tab = baidu.ui.createUI(function(a) {},
{
    superClass: baidu.ui.ItemSet
}).extend({
    uiType: "tab",
    tplDOM: "<div id='#{id}' class='#{class}'>#{heads}#{bodies}</div>",
    tplHeads: "<ul id='#{id}' class='#{class}'>#{heads}</ul>",
    tplBodies: "<div id='#{id}' class='#{class}'>#{bodies}</div>",
    tplHead: "<li id='#{id}' bodyId='#{bodyId}' class='#{class}' ><a href='#' onclick='return false'>#{head}</a></li>",
    tplBody: "<div id='#{id}' class='#{class}' style='display : #{display};'>#{body}</div>",
    getString: function() {
        var d = this,
        b = this.items,
        a = [],
        c = [];
        baidu.each(b,
        function(g, f) {
            a.push(d._getBodyString(g, f));
            c.push(d._getHeadString(g, f))
        });
        return baidu.format(d.tplDOM, {
            id: d.getId(),
            "class": d.getClass(),
            heads: baidu.format(d.tplHeads, {
                id: d.getId("head-container"),
                "class": d.getClass("head-container"),
                heads: c.join("")
            }),
            bodies: baidu.format(d.tplBodies, {
                id: d.getId("body-container"),
                "class": d.getClass("body-container"),
                bodies: a.join("")
            })
        })
    },
    insertItemHTML: function(c, a) {
        var b = this;
        baidu.dom.insertHTML(baidu.g(b.getId("headParent")), "beforeEnd", this._getHeadString(c, a));
        baidu.dom.insertHTML(baidu.g(b.getId("bodyParent")), "beforeEnd", this._getBodyString(c, a))
    },
    getLabel: function() {
        return this.getHead()
    },
    getContent: function() {
        return this.getBody()
    },
    getAllLabelItems: function() {
        return this.getHeads()
    },
    focus: function(a) {
        this.selectByIndex(a)
    }
});
baidu.ui.tab.setup = function(b, a) {
    var c = new baidu.ui.tab.Tab(a),
    d = baidu.dom.children(b),
    f;
    baidu.dom.insertHTML(b, "beforeEnd", c.getBody("", ""));
    f = c.getBodies();
    baidu.array.each(d,
    function(h, g) {
        h.id = c.getId("body" + g);
        baidu.dom.addClass(h, c.getClass("body"));
        var i = baidu.g(h.getAttribute("bodyId"));
        if (!g) {
            baidu.dom.addClass(h, c.getClass("current"))
        } else {
            i.style.display = "none"
        }
        f.appendChild(h)
    });
    baidu.each(c.getHeads(),
    function(h, g) {
        baidu.on(h, "click",
        function(i) {
            c.switchByItem(h)
        })
    });
    return c
};
baidu.ui.tab.create = function(a, b) {
    var c = new baidu.ui.tab.Tab(b);
    c.render(a);
    return c
};
baidu.ui.Base.setParent = function(b) {
    var c = this,
    a = c._parent;
    a && a.dispatchEvent("removechild");
    if (b.dispatchEvent("appendchild", {
        child: c
    })) {
        c._parent = b
    }
};
baidu.ui.Base.getParent = function() {
    return this._parent || null
};
baidu.ui.slider = baidu.ui.slider || {};
baidu.ui.slider.Slider = baidu.ui.createUI(function(a) {
    var b = this;
    a = a || {};
    b.layout = a.layout || "horizontal";
    if (!a.range) {
        b.range = [b.min, b.max]
    }
}).extend({
    layout: "horizontal",
    uiType: "slider",
    tplBody: '<div id="#{id}" class="#{class}" onmousedown="#{mousedown}">#{thumb}</div>',
    tplThumb: '<div id="#{thumbId}" class="#{thumbClass}" style="position:absolute;"></div>',
    axis: {
        horizontal: {
            mousePos: "x",
            mainPos: "left",
            thumbSize: "offsetWidth",
            thumbPos: "left",
            _getSize: "_getWidth",
            _getThumbSize: "_getThumbWidth"
        },
        vertical: {
            mousePos: "y",
            mainPos: "top",
            thumbSize: "offsetHeight",
            thumbPos: "top",
            _getSize: "_getHeight",
            _getThumbSize: "_getThumbHeight"
        }
    },
    value: 0,
    min: 0,
    max: 100,
    disabled: false,
    _dragOpt: {},
    getString: function() {
        var a = this;
        return baidu.format(a.tplBody, {
            id: a.getId(),
            "class": a.getClass(),
            mousedown: a.getCallRef() + "._mouseDown(event)",
            thumb: baidu.format(a.tplThumb, {
                thumbId: a.getId("thumb"),
                thumbClass: a.getClass("thumb"),
                mouseOver: a.getCallRef() + "._onMouseOver(this);",
                mouseOut: a.getCallRef() + "._onMouseOut(this);"
            })
        })
    },
    _mouseDown: function(f) {
        var d = this,
        b = baidu.page.getMousePosition(),
        c = baidu.dom.getPosition(d.getMain()),
        a = 0;
        if (baidu.event.getTarget(f) == d.getThumb()) {
            return
        }
        a = b[d.axis[d.layout].mousePos] - c[d.axis[d.layout].mainPos] - d.getThumb()[d.axis[d.layout].thumbSize] / 2;
        d._calcValue(a);
        if (d.update()) {
            d.dispatchEvent("slidestop")
        }
        d.dispatchEvent("slideclick")
    },
    render: function(d) {
        var c = this,
        a, b;
        if (!d) {
            return
        }
        baidu.dom.insertHTML(c.renderMain(d), "beforeEnd", c.getString());
        c.getMain().style.position = "relative";
        c._createThumb();
        c.update();
        c.dispatchEvent("onload")
    },
    _createThumb: function() {
        var a = this;
        a._dragOpt = {
            ondragend: function() {
                a.dispatchEvent("slidestop")
            },
            ondragstart: function() {
                a.dispatchEvent("slidestart")
            },
            ondrag: function() {
                var b = a.getThumb().style[a.axis[a.layout].thumbPos];
                a._calcValue(parseInt(b));
                a.dispatchEvent("slide")
            },
            range: [0, 0, 0, 0]
        };
        a._updateDragRange();
        baidu.dom.draggable(a.getThumb(), a._dragOpt)
    },
    _updateDragRange: function() {
        var c = this,
        a = c.range,
        b = 0;
        c._dragOpt.range[2] = c._getHeight();
        b = (c[c.axis[c.layout]._getSize]() - c[c.axis[c.layout]._getThumbSize]()) / (c.max - c.min);
        if (c.layout == "horizontal") {
            if (typeof a != "undefined") {
                c._dragOpt.range[1] = a[1] * b + c._getThumbWidth();
                c._dragOpt.range[3] = a[0] * b
            } else {
                c._dragOpt.range[1] = c._getWidth();
                c._dragOpt.range[3] = 0
            }
        } else {
            if (typeof a != "undefined") {
                c._dragOpt.range[2] = a[1] * b + c._getThumbHeight();
                c._dragOpt.range[1] = c._getThumbWidth()
            } else {
                c._dragOpt.range[1] = c._getWidth();
                c._dragOpt.range[3] = 0
            }
        }
    },
    update: function(b) {
        var c = this,
        a = 0;
        b = b || {};
        baidu.object.extend(c, b);
        c._updateDragRange();
        c._adjustValue();
        if (c.value == c._lastValue) {
            return
        }
        c._lastValue = c.value;
        a = c[c.axis[c.layout]._getSize]() - c[c.axis[c.layout]._getThumbSize]();
        baidu.dom.setStyle(c.getThumb(), c.axis[c.layout].thumbPos, c.value * (a) / (c.max - c.min));
        c.dispatchEvent("update")
    },
    _adjustValue: function() {
        var a = this;
        a.value = Math.max(Math.min(a.value, a.range[1]), a.range[0])
    },
    _calcValue: function(c) {
        var b = this,
        a = b[b.axis[b.layout]._getSize]() - b[b.axis[b.layout]._getThumbSize]();
        b.value = c * (b.max - b.min) / (a);
        b._adjustValue()
    },
    _getWidth: function() {
        return parseInt(baidu.dom.getStyle(this.getBody(), "width"))
    },
    _getHeight: function() {
        return parseInt(baidu.dom.getStyle(this.getBody(), "height"))
    },
    _getThumbWidth: function() {
        return parseInt(baidu.dom.getStyle(this.getThumb(), "width"))
    },
    _getThumbHeight: function() {
        return parseInt(baidu.dom.getStyle(this.getThumb(), "height"))
    },
    getValue: function() {
        return this.value
    },
    disable: function() {
        this.disabled = true
    },
    enable: function() {
        this.disabled = false
    },
    getTarget: function() {
        return baidu.g(this.targetId)
    },
    getThumb: function() {
        return baidu.g(this.getId("thumb"))
    },
    dispose: function() {
        var a = this;
        baidu.dom.remove(a.getId())
    }
});
baidu.ui.slider.Slider.register(function(a) {
    a.addEventListener("load",
    function() {
        baidu.dom.insertHTML(a.getThumb(), "beforeBegin", a.getProgressBarString());
        a.progressBar = baidu.ui.create(baidu.ui.progressBar.ProgressBar, {
            layout: a.layout,
            skin: a.skin ? a.skin + "-followProgressbar": null
        });
        a.progressBar.render(a.getId("followProgressBar"));
        a._adjustProgressbar();
        a.addEventListener("dispose",
        function() {
            a.progressBar.dispose()
        })
    });
    a.addEventListeners("slide, slideclick",
    function() {
        a._adjustProgressbar()
    })
});
baidu.ui.slider.Slider.extend({
    tplProgressbar: "<div id='#{rsid}' class='#{class}' style='position:absolute; left:0px; top:0px;'></div>",
    getProgressBarString: function() {
        var a = this;
        return baidu.string.format(a.tplProgressbar, {
            rsid: a.getId("followProgressBar"),
            "class": a.getClass("followProgressbar")
        })
    },
    _adjustProgressbar: function() {
        var c = this,
        b = c.layout,
        a = c.axis[b];
        c.progressBar.getBar().style[c.progressBar.axis[b].size] = parseInt(baidu.dom.getStyle(c.getThumb(), a.thumbPos), 10) + c[a._getThumbSize]() / 2 + "px"
    }
});
baidu.ui.combox = baidu.ui.combox || {
    instances: {}
};
baidu.ui.combox.Combox = baidu.ui.createUI(function(a) {
    var b = this;
    b.data = b.data || [];
    b.menu = b.menu || false
}).extend({
    uiType: "combox",
    editable: false,
    width: "",
    height: "",
    zIndex: 1200,
    filter: function(c, b) {
        var a = [];
        baidu.array.each(b || this.data,
        function(d) {
            var f = (d.value || d.content).indexOf(c);
            if (f >= 0) {
                a.push(d)
            }
        });
        return a
    },
    tplBody: ['<div id="#{id}" class="#{class}" #{stateHandler}>', '<input id="#{inputid}" class="#{inputClass}" autocomplete="off" readOnly="readOnly"/>', '<span id="#{arrowid}" class="#{arrowClass}"></span>', "</div>"].join(""),
    getString: function() {
        var a = this;
        return baidu.format(a.tplBody, {
            id: a.getId(),
            "class": a.getClass(),
            inputClass: a.getClass("input"),
            arrowClass: a.getClass("arrow"),
            inputid: a.getId("input"),
            arrowid: a.getId("arrow"),
            stateHandler: a.statable ? a._getStateHandlerString() : ""
        })
    },
    render: function(b) {
        var a = this;
        if (a.getMain()) {
            return
        }
        baidu.dom.insertHTML(a.renderMain(b || a.target), "beforeEnd", a.getString());
        a._createMenu();
        a._enterTipMode();
        a.position && baidu.ui.smartPosition.set(b, a.position);
        a.dispatchEvent("onload")
    },
    _enterTipMode: function() {
        var b = this,
        a = b.getInput();
        b._showMenuHandler = baidu.fn.bind(function() {
            var d = this;
            var c = d.getInput();
            d.menu.open();
            d.menu.update({
                data: d.editable ? d.filter(c.value, d.data) : d.data
            })
        },
        b);
        baidu.on(a, "focus", b._showMenuHandler);
        if (b.editable) {
            a.readOnly = "";
            baidu.on(a, "keyup", b._showMenuHandler)
        }
    },
    _createMenu: function() {
        var b = this,
        a = b.getBody(),
        c = b.getArrow(),
        d = {
            width: b.width || a.offsetWidth,
            onitemclick: b.onitemclick,
            element: a,
            autoRender: true,
            data: b.data,
            onbeforeclose: b.onbeforeclose,
            onclose: b.onclose,
            onbeforeopen: b.onbeforeopen,
            onopen: b.onopen
        };
        if (!b.menu) {
            b.menu = baidu.ui.create(baidu.ui.menubar.Menubar, d);
            baidu.un(a, "click", b.targetOpenHandler);
            b.menu.addEventListener("onitemclick",
            function(f) {
                b.chooseItem(f)
            })
        }
        b.menu.close(true);
        b._showAllMenuHandler = baidu.fn.bind(function() {
            var f = this;
            f.menu.open();
            f.menu.update({
                data: f.data
            })
        },
        b);
        baidu.on(c, "click", b._showAllMenuHandler);
        return b.menu
    },
    getInput: function() {
        return baidu.g(this.getId("input"))
    },
    getArrow: function() {
        return baidu.g(this.getId("arrow"))
    },
    chooseItem: function(b) {
        var a = this;
        a.getInput().value = b.value.content;
        a.dispatchEvent("onitemchosen", b)
    },
    setValue: function(a) {
        this.getInput().value = a
    },
    dispose: function() {
        var a = this;
        baidu.un(a.getInput(), "keyup", a._showMenuHandler);
        baidu.un(a.getInput(), "focus", a._showMenuHandler);
        baidu.un(a.getArrow(), "click", a._showAllMenuHandler);
        if (a.getMain()) {
            baidu.dom.remove(a.getMain())
        }
        baidu.lang.Class.prototype.dispose.call(a)
    }
});
baidu.ui.combox.select = function(a, b) {
    a = baidu.g(a);
    if ("select" != a.tagName.toLowerCase()) {
        return
    }
    b = b || {};
    var f = [],
    d;
    baidu.array.each(a.options,
    function(g) {
        f.push({
            value: g.value || g.innerHTML,
            content: g.innerHTML
        })
    });
    b.data = f.concat(b.data || []);
    d = baidu.dom.getPosition(a);
    b.position = {
        x: d.left,
        y: d.top
    };
    a.style.display = "none";
    b.onitemchosen = function(g) {
        a.value = g.value.value || g.value.content
    };
    var c = new baidu.ui.combox.Combox(b);
    c.render();
    return c
};
baidu.ui.combox.create = function(c, a) {
    a = a || {};
    a.data = c || [];
    var b = new baidu.ui.combox.Combox(a);
    b.render();
    return b
};
baidu.ui.table = baidu.ui.table || {};
baidu.ui.table.Table = baidu.ui.createUI(function(a) {
    var b = this;
    b.data = b.data || [];
    b._rows = []
}).extend({
    uiType: "table",
    tplBody: '<div><table cellpadding="0" cellspacing="0" border="0" id="#{id}" class="#{class}" #{stateHandler}>#{rows}</table></div>',
    getString: function() {
        var a = this;
        return baidu.format(a.tplBody, {
            id: a.getId(),
            "class": a.getClass(),
            rows: a._getRowsString()
        })
    },
    _getRowsString: function() {
        var d = this,
        b = 0,
        a = d.data.length,
        c = [],
        f;
        for (; b < a; b++) {
            f = d.getRow(b);
            if (!f) {
                f = d._rows[b] = d._createRow(d.data[b])
            } else {
                f.update(d.data[b])
            }
            c.push(f.getString())
        }
        while (d._rows.length > d.data.length) {
            d._rows.pop()
        }
        return c.join("")
    },
    render: function(b) {
        var a = this;
        if (!b) {
            return
        }
        baidu.dom.insertHTML(a.renderMain(b), "beforeEnd", a.getString());
        a.resizeColumn();
        a.dispatchEvent("onload")
    },
    update: function(a) {
        var b = this;
        a = a || {};
        baidu.object.extend(b, a);
        b.dispatchEvent("beforeupdate");
        b.getMain().innerHTML = b.getString();
        b.dispatchEvent("update")
    },
    resizeColumn: function() {
        var a = this,
        c = [],
        b = a.getBody().rows[0];
        if (b && a.columns) {
            baidu.array.each(a.columns,
            function(d) {
                if (d.hasOwnProperty("width")) {
                    baidu.dom.setStyles(b.cells[d.index], {
                        width: d.width
                    })
                }
            })
        }
    },
    _createRow: function(a) {
        a.parent = this;
        return baidu.ui.create(baidu.ui.table.Row, a)
    },
    getRow: function(a) {
        var b = this._rows[a];
        if (b && !b.disposed) {
            return b
        }
        return null
    },
    getRowCount: function() {
        return this._rows.length
    },
    _addRow: function(b, a) {
        var c = this,
        a = baidu.lang.isNumber(a) ? a: c.getBody().rows.length,
        d = c._createRow(b);
        c.data.splice(a, 0, b);
        c._rows.splice(a, 0, d);
        d.insertTo(a);
        return d.getId()
    },
    addRow: function(b, a) {
        var c = this;
        c.dispatchEvent("addrow", {
            rowId: c._addRow(b, a)
        })
    },
    _removeRow: function(a) {
        var b = this,
        d = b._rows[a],
        c;
        if (d) {
            c = d.getId();
            b.data.splice(a, 1);
            d.remove();
            b._rows.splice(a, 1);
            0 == a && b.resizeColumn()
        }
        return c
    },
    removeRow: function(a) {
        var b = this,
        c = b._removeRow(a);
        if (c) {
            b.dispatchEvent("removerow", {
                rowId: c
            })
        }
    },
    getTarget: function() {
        var a = this;
        return baidu.g(a.targetId) || a.getMain()
    },
    dispose: function() {
        var a = this;
        baidu.dom.remove(a.getId())
    }
});
baidu.ui.behavior = baidu.ui.behavior || {}; (function() {
    var a = baidu.ui.behavior.statable = function() {};
    a._states = {};
    a._allStates = ["hover", "press", "disabled"];
    a._allEventsName = ["mouseover", "mouseout", "mousedown", "mouseup"];
    a._eventsHandler = {
        mouseover: function(d, c) {
            var b = this;
            if (!b.getState(d, c)["disabled"]) {
                b.setState("hover", d, c);
                return true
            }
        },
        mouseout: function(d, c) {
            var b = this;
            if (!b.getState(d, c)["disabled"]) {
                b.removeState("hover", d, c);
                b.removeState("press", d, c);
                return true
            }
        },
        mousedown: function(d, c) {
            var b = this;
            if (!b.getState(d, c)["disabled"]) {
                b.setState("press", d, c);
                return true
            }
        },
        mouseup: function(d, c) {
            var b = this;
            if (!b.getState(d, c)["disabled"]) {
                b.removeState("press", d, c);
                return true
            }
        }
    };
    a._getStateHandlerString = function(j, g) {
        var h = this,
        f = 0,
        b = h._allEventsName.length,
        c = [],
        d;
        if (typeof j == "undefined") {
            j = g = ""
        }
        for (; f < b; f++) {
            d = h._allEventsName[f];
            c[f] = "on" + d + '="' + h.getCallRef() + "._fireEvent('" + d + "', '" + j + "', '" + g + "', event)\""
        }
        return c.join(" ")
    };
    a._fireEvent = function(c, g, b, f) {
        var d = this,
        h = d.getId(g + b);
        if (d._eventsHandler[c].call(d, h, g)) {
            d.dispatchEvent(c, {
                element: h,
                group: g,
                key: b,
                DOMEvent: f
            })
        }
    };
    a.disable = function(b, d) {
        var c = this;
        b = b || c.getMain();
        if (!c.getState(b.id, d)["disabled"]) {
            c.removeState("press", b.id, d);
            c.removeState("hover", b.id, d);
            c.setState("disabled", b.id, d);
            c.dispatchEvent("ondisable")
        }
    };
    a.enable = function(b, d) {
        var c = this;
        b = b || c.getMain();
        if (c.getState(b.id, d)["disabled"]) {
            c.removeState("disabled", b.id, d);
            c.dispatchEvent("onenable")
        }
    };
    a.addState = function(f, b, c) {
        var d = this;
        d._allStates.push(f);
        if (b) {
            d._allEventsName.push(b);
            if (!c) {
                c = function() {
                    return true
                }
            }
            d._eventsHandler[b] = c
        }
    };
    a.getState = function(b, d) {
        d = d ? d + "-": "";
        b = b ? b: this.getId();
        var c = this._states[d + b];
        return c ? c: {}
    };
    a.setState = function(f, b, g) {
        g = g ? g + "-": "";
        b = b ? b: this.getId();
        var d = this,
        h = g + b,
        c;
        d._states[h] = d._states[h] || {};
        c = d._states[h][f];
        if (!c) {
            d._states[h][f] = 1;
            baidu.addClass(b, d.getClass(g + f))
        }
    };
    a.removeState = function(d, b, f) {
        f = f ? f + "-": "";
        b = b ? b: this.getId();
        var c = this,
        g = f + b;
        if (c._states[g]) {
            c._states[g][d] = 0;
            baidu.removeClass(b, c.getClass(f + d))
        }
    }
})();
baidu.extend(baidu.ui.behavior.statable, {
    _statableMouseHandler: function(b, c, a, d) {
        this._fireEvent(b, c, a, d)
    },
    setStateHandler: function(b, f, a) {
        var d = this,
        c = {};
        if (typeof a == "undefined") {
            f = a = ""
        }
        baidu.array.each(d._allEventsName,
        function(g) {
            c[g] = baidu.fn.bind("_statableMouseHandler", d, g, f, a);
            baidu.event.on(b, g, c[g])
        });
        d.addEventListener("dispose",
        function() {
            baidu.object.each(c,
            function(h, g) {
                baidu.event.un(b, g, h)
            })
        })
    }
});
baidu.ui.table.Cell = baidu.ui.createUI(function(a) {}).extend({
    uiType: "table-cell",
    _initialize: function(b) {
        var a = this;
        a.setParent(b);
        baidu.dom.setAttrs(a.target, {
            id: a.getId(),
            "data-guid": a.guid
        })
    },
    getMain: function() {
        return baidu.dom.g(this.getId())
    },
    getParent: function() {
        return this._parent
    },
    setParent: function(a) {
        this._parent = a
    },
    getHTML: function() {
        return this.getMain().innerHTML
    },
    setHTML: function(c) {
        var b = this,
        a = b.getParent();
        a.getParent().data[a.getMain().rowIndex].content[b.getMain().cellIndex] = c;
        b.getMain().innerHTML = c
    }
});
baidu.ui.table.Row = baidu.ui.createUI(function(a) {
    this._cells = {};
    this.addState("selected")
}).extend({
    uiType: "table-row",
    statable: true,
    getMain: function() {
        return baidu.g(this.getId())
    },
    getString: function() {
        var c = this,
        d = [],
        a = c.getClass("col"),
        b = {};
        d.push("<tr id='", c.getId(), "' class='", c.getClass(), "' data-guid='", c.guid, "' ", c._getStateHandlerString(), ">");
        baidu.array.each(c.content,
        function(g, f) {
            d.push("<td>", g, "</td>")
        });
        d.push("</tr>");
        return d.join("")
    },
    update: function(a) {
        var b = this,
        c = baidu.dom.children(b.getMain());
        a = a || {};
        baidu.object.extend(b, a);
        baidu.array.each(c,
        function(f, d) {
            f.innerHTML = b.content[d]
        });
        b.dispatchEvent("update")
    },
    insertTo: function(b) {
        var c = this,
        d, a;
        if (!c.getMain()) {
            d = c.getParent().getBody().insertRow(b);
            baidu.dom.setAttrs(d, {
                id: c.getId(),
                "class": c.getClass(),
                "data-guid": c.guid
            });
            c.setStateHandler(d);
            baidu.array.each(c.content,
            function(g, f) {
                a = d.insertCell(f);
                baidu.dom.setAttr(a, "class", c.getClass("col"));
                a.innerHTML = g
            })
        }
    },
    _getCols: function() {
        return baidu.dom.children(this.getId())
    },
    _getColsString: function(b, a) {
        return colsArr.join("")
    },
    select: function() {
        var a = this,
        b = a.getMain().id;
        if (!a.getState(b)["disabled"]) {
            a.setState("selected", b)
        }
    },
    unselect: function() {
        var a = this;
        a.removeState("selected", a.getMain().id)
    },
    remove: function() {
        var a = this;
        a.getParent().getBody().deleteRow(a.getBody().rowIndex);
        a.dispose()
    },
    toggle: function() {
        var a = this;
        if (a.getState(a.getMain().id)["selected"]) {
            a.unselect()
        } else {
            a.select()
        }
    },
    getCell: function(b) {
        var c = this,
        d = c._getCols()[b],
        a;
        if (d) {
            if (d.id) {
                a = c._cells[d.id]
            } else {
                a = new baidu.ui.table.Cell({
                    target: d
                });
                a._initialize(c);
                c._cells[a.getId()] = a
            }
        }
        d = null;
        return a
    },
    dispose: function() {
        var a = this;
        a.dispatchEvent("dispose");
        baidu.lang.Class.prototype.dispose.call(a)
    }
});
baidu.ui.table.Table.register(function(a) {
    a._createPage();
    a.addEventListener("beforeupdate",
    function() {
        a._createPage()
    })
});
baidu.object.extend(baidu.ui.table.Table.prototype, {
    currentPage: 1,
    _createPage: function() {
        var a = this;
        a.dataSet = a.data || [];
        if (a.pageSize) {
            a.data = a.data.slice(0, a.pageSize)
        }
    },
    gotoPage: function(a) {
        var c = this,
        a = a <= 0 ? 1 : Math.min(a, c.getTotalPage()),
        g = (a - 1) * c.pageSize,
        d = c.dataSet.slice(g, g + c.pageSize),
        b = 0,
        f;
        for (; b < c.pageSize; b++) {
            f = c.getRow(b);
            if (d[b]) {
                if (f) {
                    f.update(d[b])
                } else {
                    c.dispatchEvent("addrow", {
                        rowId: c._addRow(d[b])
                    })
                }
            } else {
                if (f) {
                    c.dispatchEvent("removerow", {
                        rowId: c._removeRow(b--)
                    })
                }
            }
        }
        c.data = d;
        c.currentPage = a;
        c.dispatchEvent("gotopage")
    },
    prevPage: function() {
        var a = this;
        a.gotoPage(--a.currentPage)
    },
    nextPage: function() {
        var a = this;
        a.gotoPage(++a.currentPage)
    },
    getTotalCount: function() {
        return this.dataSet.length
    },
    getTotalPage: function() {
        var a = this;
        return Math.ceil(a.dataSet.length / a.pageSize)
    },
    getCurrentPage: function() {
        return this.currentPage
    },
    addRow: function(d, c) {
        var f = this,
        c = baidu.lang.isNumber(c) ? c: f.getTotalCount(),
        b = f.getCurrentPage(),
        a = Math.ceil((c + 1) / f.pageSize),
        g,
        h;
        if (f.pageSize) {
            f.dataSet.splice(c, 0, g);
            if (b >= a) {
                c %= f.pageSize;
                if (b != a) {
                    g = f.dataSet[(b - 1) * f.pageSize];
                    c = 0
                }
                h = f._addRow(g, c);
                if (f.getRowCount() > f.pageSize) {
                    f.dispatchEvent("removerow", {
                        rowId: f._removeRow(f.getRowCount() - 1)
                    })
                }
            }
            f.dispatchEvent("addrow", {
                rowId: h
            })
        } else {
            f.dispatchEvent("addrow", {
                rowId: f._addRow(d, c)
            })
        }
    },
    removeRow: function(b) {
        var d = this,
        a = d.getCurrentPage(),
        c = Math.ceil((b + 1) / d.pageSize),
        g,
        f;
        if (d.pageSize) {
            d.dataSet.splice(b, 1);
            if (a >= c) {
                b = a != c ? 0 : b % d.pageSize;
                g = d._removeRow(b);
                f = d.dataSet[a * d.pageSize - 1];
                if (f) {
                    d.dispatchEvent("addrow", {
                        rowId: d._addRow(f)
                    })
                }
            }
            d.dispatchEvent("removerow", {
                rowId: g
            })
        } else {
            d.dispatchEvent("removerow", {
                rowId: d._removeRow(b)
            })
        }
    }
});
baidu.ui.table.Table.register(function(a) {
    if (a.columns) {
        a.addEventListeners("load, update",
        function() {
            a._selectedItems = {};
            a._checkboxList = {};
            a._checkboxDomList = {};
            a._createSelect()
        });
        a.addEventListeners({
            addrow: function(b) {
                a.addCheckbox(b.rowId, a._selectIndex)
            },
            removerow: function(b) {
                a.removeCheckbox(b.rowId)
            },
            gotopage: function() {
                a.unselectAll()
            }
        })
    }
});
baidu.object.extend(baidu.ui.table.Table.prototype, {
    tplSelect: '<input id="#{id}" type="checkbox" value="#{value}" onclick="#{handler}"/>',
    _createTitleScelect: function(a) {
        var b = this;
        b.titleCheckboxId = b.titleCheckboxId || b.getId("checkboxAll");
        baidu.dom.insertHTML(b.getTitleBody().rows[0].cells[a], "beforeEnd", baidu.string.format(b.tplSelect, {
            id: b.titleCheckboxId,
            value: "all",
            handler: b.getCallString("toggleAll")
        }))
    },
    _createSelect: function() {
        var d = this,
        a = d.getRowCount(),
        c = 0,
        b;
        baidu.array.each(d.columns,
        function(f) {
            if (f.hasOwnProperty("type") && f.type.toLowerCase() == "checkbox") {
                d._selectIndex = b = f.index;
                return false
            }
        });
        if (d.title && baidu.lang.isNumber(b)) {
            if (d.getTitleBody()) {
                d._createTitleScelect(b)
            } else {
                d.addEventListener("titleload",
                function() {
                    d._createTitleScelect(b);
                    d.removeEventListener("titleload", arguments.callee)
                })
            }
        }
        if (baidu.lang.isNumber(b)) {
            for (; c < a; c++) {
                d.addCheckbox(d.getRow(c).getId(), b)
            }
        }
    },
    _getSelectString: function(c) {
        var b = this,
        a = c.getId("checkbox");
        b._checkboxList[c.getId()] = a;
        b._checkboxDomList[c.getId()] = a;
        return baidu.string.format(b.tplSelect, {
            id: a,
            value: c.id ? c.id: c.guid,
            handler: b.getCallString("toggle", a)
        })
    },
    addCheckbox: function(f, c) {
        var d = this,
        g, b, a;
        if (baidu.lang.isNumber(c)) {
            g = baidu.ui.get(baidu.g(f)),
            b = g.getBody().cells[c],
            a = d._getSelectString(g);
            baidu.dom.insertHTML(b, "beforeEnd", a);
            baidu.dom.setAttr(b, "align", "center");
            g.addEventListener("update",
            function() {
                baidu.dom.insertHTML(b, "beforeEnd", a)
            });
            d._checkboxDomList[f] = baidu.dom.g(d._checkboxDomList[f])
        }
    },
    removeCheckbox: function(b) {
        var a = this;
        delete a._selectedItems[a._checkboxList[b]];
        delete a._checkboxList[b];
        delete a._checkboxDomList[b]
    },
    getTitleCheckbox: function() {
        return baidu.dom.g(this.titleCheckboxId)
    },
    setTitleCheckbox: function(a) {
        this.titleCheckboxId = a.id || a
    },
    _setSelectItems: function(d) {
        var a = this,
        b = baidu.g(d),
        c;
        if (b.checked) {
            c = baidu.ui.get(baidu.dom.getAncestorByTag(d, "TR"));
            a._selectedItems[b.id] = c.id || c
        } else {
            delete a._selectedItems[b.id]
        }
    },
    _setCheckboxState: function(f, d) {
        var b = this,
        f = baidu.lang.isNumber(f) ? [f] : f,
        a = [],
        c;
        if (f) {
            baidu.array.each(f,
            function(g) {
                a.push(b._checkboxDomList[b.getRow(g).getId()])
            })
        } else {
            a = baidu.object.values(b._checkboxDomList)
        }
        baidu.array.each(a,
        function(g) {
            if (d && !g.checked) {
                g.checked = true
            } else {
                if (!d && g.checked) {
                    g.checked = false
                }
            }
            if (f) {
                b.toggle(g)
            } else {
                b._setSelectItems(g)
            }
        })
    },
    select: function(a) {
        this._setCheckboxState(a, true)
    },
    unselect: function(a) {
        this._setCheckboxState(a, false)
    },
    toggle: function(b) {
        var c = this,
        f = c.getTitleCheckbox(),
        d = baidu.g(b),
        a;
        c._setSelectItems(b);
        if (d.checked) {
            a = baidu.object.keys(c._selectedItems).length;
            if (f && !f.checked && a == baidu.object.keys(c._checkboxList).length) {
                f.checked = true
            }
        } else {
            if (f && f.checked) {
                f.checked = false
            }
        }
    },
    selectAll: function() {
        this._setCheckboxState(null, true)
    },
    unselectAll: function() {
        this._setCheckboxState(null, false)
    },
    toggleAll: function() {
        var a = this,
        b = a.getTitleCheckbox();
        if (b) {
            this._setCheckboxState(null, b.checked)
        }
    },
    getSelected: function() {
        return baidu.object.values(this._selectedItems)
    }
});
baidu.ui.table.Table.register(function(a) {
    if (a.title) {
        a.addEventListeners("load, update",
        function() {
            if (!a.getTitleBody()) {
                baidu.dom.insertHTML(a.getTarget(), "afterBegin", a._getTitleString());
                a.dispatchEvent("titleload");
                baidu.dom.setStyles(a.getBody(), {
                    tableLayout: "fixed"
                });
                baidu.dom.setStyles(a.getTitleBody(), {
                    width: a.getBody().offsetWidth + "px",
                    tableLayout: "fixed"
                })
            }
            if (a.getTitleBody() && a.columns) {
                baidu.array.each(a.columns,
                function(b) {
                    if (b.hasOwnProperty("width")) {
                        baidu.dom.setStyles(a.getTitleBody().rows[0].cells[b.index], {
                            width: b.width
                        })
                    }
                })
            }
        });
        a.addEventListener("addrow",
        function() {
            if (a.getRowCount() == 1) {
                baidu.dom.setStyles(a.getTitleBody(), {
                    width: a.getBody().offsetWidth + "px"
                })
            }
        })
    }
});
baidu.object.extend(baidu.ui.table.Table.prototype, {
    tplTitle: '<div><table id="#{rsid}" class="#{tabClass}" cellspacing="0" cellpadding="0" border="0"><tr class="#{trClass}">#{col}</tr></table></div>',
    _getTitleString: function() {
        var c = this,
        b = [],
        a = "";
        baidu.array.each(c.title,
        function(d) {
            b.push("<td>", d, "</td>")
        });
        return baidu.string.format(c.tplTitle, {
            rsid: c.getId("title"),
            tabClass: c.getClass("title"),
            trClass: c.getClass("title-row"),
            col: b.join("")
        })
    },
    getTitleBody: function() {
        return baidu.g(this.getId("title"))
    }
});
baidu.ui.table.Table.register(function(a) {
    a.addEventListeners("load, update",
    function() {
        if (a.withPager) {
            baidu.dom.insertHTML(a.getTarget(), "beforeEnd", "<div id='" + a.getId("-pager") + "' align='right'></div>");
            a.pager = new baidu.ui.pager.Pager({
                endPage: a.getTotalPage() + 1,
                ongotopage: function(b) {
                    a.gotoPage(b.page)
                }
            });
            a.pager.render(a.getPagerContainer());
            a.addEventListeners("addrow, removerow",
            function() {
                a.pager.update({
                    endPage: a.getTotalPage() + 1
                })
            });
            a.resize();
            baidu.event.on(window, "resize",
            function() {
                a.resize()
            })
        }
    })
});
baidu.object.extend(baidu.ui.table.Table.prototype, {
    getPagerContainer: function() {
        return baidu.g(this.getId("-pager"))
    },
    resize: function() {
        var a = this;
        baidu.dom.setStyle(a.getPagerContainer(), "width", a.getBody().offsetWidth + "px")
    }
});
baidu.ui.table.Table.register(function(a) {
    if (a.columns) {
        a.addEventListeners("load, update",
        function() {
            var c = 0,
            b = a.getRowCount();
            a._editArray = [];
            baidu.array.each(a.columns,
            function(d) {
                if (d.hasOwnProperty("enableEdit")) {
                    a._editArray.push(d)
                }
            });
            if (a._editArray.length > 0) {
                a._textField = baidu.ui.input.create(a.getMain());
                a._textField.getBody().onblur = function(d) {
                    a._cellBlur(d)
                };
                baidu.dom.hide(a._textField.getBody())
            }
            for (; c < b; c++) {
                a.attachEdit(a.getRow(c))
            }
        });
        a.addEventListener("addrow",
        function(b) {
            a.attachEdit(baidu.ui.get(baidu.g(b.rowId)))
        })
    }
});
baidu.object.extend(baidu.ui.table.Table.prototype, {
    attachEdit: function(b) {
        var a = this;
        baidu.array.each(a._editArray,
        function(c) {
            b.getBody().cells[c.index].ondblclick = function(d) {
                a._cellFocus(d, this)
            }
        })
    },
    _cellFocus: function(b, a) {
        var f = this,
        c = f._textField.getBody(),
        d = a.clientWidth;
        if (baidu.event.getTarget(b || window.event).id != c.id) {
            c.value = a.innerHTML;
            a.innerHTML = "";
            a.appendChild(c);
            baidu.dom.show(c);
            baidu.dom.setStyle(c, "width", d - c.offsetWidth + c.clientWidth + "px");
            c.focus();
            c.select()
        }
    },
    _cellBlur: function(b) {
        var c = this,
        d = baidu.event.getTarget(b || window.event),
        a = baidu.dom.getAncestorByTag(d, "td");
        baidu.dom.hide(d);
        c.getTarget().appendChild(d);
        a.innerHTML = d.value
    }
});
baidu.ui.dialog = baidu.ui.dialog || {
    instances: {}
};
baidu.ui.dialog.Dialog = baidu.ui.createUI(function(a) {}).extend({
    uiType: "DIALOG",
    width: "400",
    height: "300",
    top: "auto",
    left: "auto",
    zIndex: 1000,
    titleText: "",
    contentText: "",
    onbeforeclose: function() {
        return true
    },
    tplDOM: "<div id='#{id}' class='#{class}' style='position:relative'>#{title}#{content}#{footer}</div>",
    tplTitle: "<div id='#{id}' class='#{class}'><span id='#{inner-id}' class='#{inner-class}'>#{content}</span></div>",
    tplContent: "<div id='#{id}' class='#{class}' style='overflow:auto; position:relative'>#{content}</div>",
    tplFooter: "<div id='#{id}' class='#{class}'></div>",
    isShown: function() {
        return baidu.ui.dialog.instances[this.guid] == "show"
    },
    getString: function() {
        var c = this,
        a, f = "title",
        d = "title-inner",
        b = "content",
        g = "footer";
        return baidu.format(c.tplDOM, {
            id: c.getId(),
            "class": c.getClass(),
            title: baidu.format(c.tplTitle, {
                id: c.getId(f),
                "class": c.getClass(f),
                "inner-id": c.getId(d),
                "inner-class": c.getClass(d),
                content: c.titleText
            }),
            content: baidu.format(c.tplContent, {
                id: c.getId(b),
                "class": c.getClass(b),
                content: c.contentText
            }),
            footer: baidu.format(c.tplFooter, {
                id: c.getId(g),
                "class": c.getClass(g)
            })
        })
    },
    render: function() {
        var b = this,
        a;
        if (b.getMain()) {
            return
        }
        a = b.renderMain();
        a.innerHTML = b.getString();
        b.update(b);
        baidu.dom.setStyles(b.getMain(), {
            position: "absolute",
            zIndex: this.zIndex,
            marginLeft: "-100000px"
        });
        b.windowResizeHandler = b.getWindowResizeHandler();
        baidu.on(window, "resize", b.windowResizeHandler);
        b.dispatchEvent("onload");
        return a
    },
    getWindowResizeHandler: function() {
        var a = this;
        return function() {
            a.update()
        }
    },
    open: function(a) {
        var b = this;
        b.update(a);
        b.getMain().style.marginLeft = "auto";
        baidu.ui.dialog.instances[b.guid] = "show";
        b.dispatchEvent("onopen")
    },
    close: function() {
        var a = this;
        if (a.dispatchEvent("onbeforeclose")) {
            a.getMain().style.marginLeft = "-100000px";
            baidu.ui.dialog.instances[a.guid] = "hide";
            a.dispatchEvent("onclose")
        }
    },
    update: function(b) {
        b = b || {};
        var c = this,
        a = c.getContent();
        baidu.object.extend(c, b);
        if (b.content) {
            if (a.firstChild != b.content) {
                a.innerHTML = "";
                a.appendChild(b.content)
            }
        } else {
            if (b.contentText) {
                a.innerHTML = b.contentText
            }
        }
        if (b.titleText) {
            c.getTitleInner("title-inner").innerHTML = b.titleText
        }
        c._updatePosition();
        c.dispatchEvent("onupdate")
    },
    _getBodyOffset: function() {
        var g = this,
        b, c = g.getBody(),
        f = g.getContent(),
        i = g.getTitle(),
        j = g.getFooter();
        b = {
            width: f.offsetWidth,
            height: f.offsetHeight
        };
        function d(m, l) {
            var k = parseInt(baidu.getStyle(m, l));
            k = isNaN(k) ? 0 : k;
            k = baidu.lang.isNumber(k) ? k: 0;
            return k
        }
        baidu.each(["marginLeft", "marginRight"],
        function(l, k) {
            b.width += d(f, l)
        });
        b.height += i.offsetHeight + d(i, "marginTop");
        b.height += j.offsetHeight + d(j, "marginBottom");
        var a = d(f, "marginTop"),
        h = d(i, "marginBottom");
        b.height += a >= h ? a: h;
        a = d(j, "marginTop"),
        h = d(f, "marginBottom");
        b.height += a >= h ? a: h;
        return b
    },
    _updatePosition: function() {
        var f = this,
        g, i = "",
        c = "",
        b = "",
        h = "",
        d = f.getContent(),
        a = f.getBody();
        baidu.setStyles(d, {
            width: f.width,
            height: f.height
        });
        g = f._getBodyOffset();
        baidu.setStyles(a, g);
        if ((f.left && f.left != "auto") || (f.right && f.right != "auto")) {
            h = f.left || "";
            c = f.right || ""
        } else {
            h = Math.max((baidu.page.getViewWidth() - parseInt(f.getMain().offsetWidth)) / 2 + baidu.page.getScrollLeft(), 0)
        }
        if ((f.top && f.top != "auto") || (f.bottom && f.bottom != "auto")) {
            i = f.top || "";
            b = f.bottom || ""
        } else {
            i = Math.max((baidu.page.getViewHeight() - parseInt(f.getMain().offsetHeight)) / 2 + baidu.page.getScrollTop(), 0)
        }
        baidu.dom.setStyles(f.getMain(), {
            top: i,
            right: c,
            bottom: b,
            left: h
        })
    },
    getTitle: function() {
        return baidu.g(this.getId("title"))
    },
    getTitleInner: function() {
        return baidu.g(this.getId("title-inner"))
    },
    getContent: function() {
        return baidu.g(this.getId("content"))
    },
    getFooter: function() {
        return baidu.g(this.getId("footer"))
    },
    dispose: function() {
        var a = this;
        delete baidu.ui.dialog.instances[a.guid];
        a.dispatchEvent("dispose");
        baidu.un(window, "resize", a.windowResizeHandler);
        baidu.dom.remove(a.getMain());
        baidu.lang.Class.prototype.dispose.call(a)
    }
});
baidu.extend(baidu.ui.dialog.Dialog.prototype, {
    closeOnEscape: true,
    enableKeyboard: true
});
baidu.ui.dialog.Dialog.register(function(a) {
    baidu.ui.dialog.keyboardHandler = baidu.ui.dialog.keyboardHandler ||
    function(d) {
        d = window.event || d;
        var c = d.keyCode || d.which,
        f, b;
        baidu.object.each(baidu.ui.dialog.instances,
        function(h, g) {
            if (h == "show") {
                b = baidu.lang.instance(g);
                if (!f || b.zIndex > f.zIndex) {
                    f = b
                }
            }
        });
        if (f) {
            switch (c) {
            case 27:
                f.closeOnEscape && f.close();
                break;
            case 13:
                f.dispatchEvent("onenter");
                break;
            default:
            }
        }
    };
    if (a.enableKeyboard && !baidu.ui.dialog.keyboardEventReady) {
        baidu.on(document, "keyup", baidu.ui.dialog.keyboardHandler);
        baidu.ui.dialog.keyboardEventReady = true
    }
    a.addEventListener("ondispose",
    function() {
        var b = true;
        baidu.object.each(baidu.ui.dialog.instances,
        function(d, c) {
            b = false;
            return false
        });
        if (b) {
            baidu.event.un(document, "keyup", baidu.ui.dialog.keyboardHandler);
            baidu.ui.dialog.keyboardEventReady = false
        }
    })
}); (function() {
    var a = baidu.ui.behavior.resizable = function() {};
    a.resizeUpdate = function(b) {
        var c = this,
        d;
        b = b || {};
        if (!c.resizable) {
            return
        }
        baidu.object.extend(c, b);
        c._resizeOption = {
            onresizestart: function() {
                c.dispatchEvent("onresizestart")
            },
            onresize: function() {
                c.dispatchEvent("onresize")
            },
            onresizeend: function() {
                c.dispatchEvent("onresizeend")
            }
        };
        baidu.each(["minWidth", "minHeight", "maxWidth", "maxHeight"],
        function(g, f) {
            c[g] && (c._resizeOption[g] = c[g])
        });
        c._resizeOption.classPrefix = b.classPrefix || c.classPrefix;
        b.container && (c._resizeOption.container = b.container);
        d = b.target || c.getBody();
        baidu.dom.resizable(d, c._resizeOption)
    }
})();
baidu.extend(baidu.ui.dialog.Dialog.prototype, {
    resizable: true,
    minWidth: 100,
    minHeight: 100
});
baidu.ui.dialog.Dialog.register(function(d) {
    if (d.resizable) {
        var c, b, a;
        d.addEventListener("onload",
        function() {
            c = d.getContent();
            a = d.getBody();
            b = baidu.getStyle(c, "marginRight");
            d.resizeUpdate({
                target: c,
                container: a,
                classPrefix: d.classPrefix
            })
        });
        d.addEventListener("onresize",
        function() {
            d.dispatchEvent("onupdate")
        });
        d.addEventListener("onresizeend",
        function() {
            d.width = baidu.getStyle(a, "width");
            d.height = baidu.getStyle(a, "height");
            d.width = baidu.getStyle(c, "width");
            d.height = baidu.getStyle(c, "height")
        })
    }
});
baidu.ui.button = baidu.ui.button || {};
baidu.ui.button.Button = baidu.ui.createUI(new Function).extend({
    uiType: "button",
    tplBody: '<div id="#{id}" class="#{class}" #{statable}>#{content}</div>',
    disable: false,
    statable: true,
    _getString: function() {
        var a = this;
        return baidu.format(a.tplBody, {
            id: a.getId(),
            "class": a.getClass(a.isDisabled() ? "disable": ""),
            statable: a._getStateHandlerString(),
            content: a.content
        })
    },
    render: function(c) {
        var b = this,
        a;
        b.addState("click", "click");
        baidu.dom.insertHTML(b.renderMain(c), "beforeEnd", b._getString());
        a = baidu.g(c).lastChild;
        if (b.title) {
            a.title = b.title
        }
        b.dispatchEvent("onload")
    },
    isDisabled: function() {
        var a = this,
        b = a.getId();
        return a.getState()["disabled"]
    },
    dispose: function() {
        var b = this,
        a = b.getBody();
        baidu.each(b._allEventsName,
        function(d, c) {
            a["on" + d] = null
        });
        baidu.dom.remove(a);
        baidu.lang.Class.prototype.dispose.call(b)
    },
    fire: function(a, d) {
        var c = this,
        b = a.toLowerCase();
        if (c.getState()["disabled"]) {
            return
        }
        c.setState(a);
        c._fireEvent(a, null, null, d)
    }
});
baidu.extend(baidu.ui.dialog.Dialog.prototype, {
    closeText: "",
    closeButton: true
});
baidu.ui.dialog.Dialog.register(function(a) {
    a.closeButton && a.addEventListener("onload",
    function() {
        var b = baidu.ui.button.create({
            parent: a,
            classPrefix: a.classPrefix + "-close",
            skin: a.skin ? a.skin + "-close": "",
            onclick: function() {
                a.close()
            },
            onmousedown: function(c) {
                baidu.event.stopPropagation(c.DOMEvent)
            },
            element: a.getTitle(),
            autoRender: true
        });
        a.closeButtonInstance = b;
        a.addEventListener("ondispose",
        function(c) {
            b.dispose()
        })
    })
});
baidu.extend(baidu.ui.dialog.Dialog.prototype, {
    createButtons: function() {
        var a = this;
        baidu.object.each(this.buttons,
        function(d, b) {
            baidu.extend(d, {
                classPrefix: a.classPrefix + "-" + b,
                skin: a.skin ? a.skin + "-" + b: "",
                element: a.getFooter(),
                autoRender: true,
                parent: a
            });
            var c = baidu.ui.create(baidu.ui.button.Button, d);
            a.buttonInstances[b] = c
        })
    },
    removeButtons: function() {
        var a = this;
        baidu.object.each(a.buttonInstances,
        function(c, b) {
            c.dispose()
        });
        a.buttonInstances = {}
    }
});
baidu.ui.dialog.Dialog.register(function(a) {
    a.buttonInstances = {};
    a.addEventListener("onload",
    function() {
        a.createButtons()
    });
    a.addEventListener("ondispose",
    function() {
        a.removeButtons()
    })
});
baidu.ui.dialog.alert = function(b, a) {
    var c;
    a = baidu.extend({
        type: "alert",
        buttons: {
            accept: {
                content: "纭畾",
                onclick: function() {
                    var f = this,
                    d = f.getParent();
                    d.dispatchEvent("onaccept") && d.close()
                }
            }
        }
    },
    a || {});
    if (baidu.isString(b)) {
        a.contentText = b
    } else {
        a.content = b
    }
    c = new baidu.ui.dialog.Dialog(a);
    if (typeof a.autoDispose == "undefined" || a.autoDispose) {
        c.addEventListener("onclose",
        function() {
            this.dispose()
        })
    }
    c.render();
    if (typeof a.autoOpen == "undefined" || a.autoOpen) {
        c.open()
    }
    c.addEventListener("onenter",
    function(d) {
        this.buttonInstances.accept.fire("click", d)
    });
    return c
};
baidu.ui.dialog.login = function(options) {
    options = options || {};
    options = baidu.extend({
        titleText: "鐧诲綍",
        loginURL: "http://passport.rdtest.baidu.com/api/?login&time=&token=&tpl=pp",
        regURL: "http://passport.rdtest.baidu.com/api/?reg&time=&token=&tpl=pp",
        loginJumpURL: window.location.href,
        regJumpURL: window.location.href,
        initialStatus: "login",
        onLoginSuccess: function(obj, json) {},
        onLoginFailure: function(obj, json) {},
        onRegisterSuccess: function(obj, json) {},
        onRegisterFailure: function(obj, json) {},
        loginContainerId: "loginContainer",
        regContainerId: "regContainer",
        loginPanelId: "loginPanel",
        regPanelId: "regPanel",
        tabId: "navTab",
        currentTabClass: "act",
        tplContainer: '		<div id="nav" class="passport-nav">            <ul id="#{tabId}" class="passport-nav-tab">                <li class="#{currentTabClass}" ><a href="##{idLoginPanel}" onclick="#{clickTabLogin};return false;" hidefocus="true" >鐧诲綍</a></li>                <li><a href="##{idRegPanel}" onclick="#{clickTabReg};return false;" hidefocus="true" >娉ㄥ唽</a></li>            </ul>            <p class="clear"></p>        </div>        <div id="content" class="passport-content">            <div id="#{idLoginPanel}" class="passport-login-panel">	            <div id="#{idLoginContainer}"></div>	            <div id="regDiv">                    <hr size="0" style="border-top:1px solid #AAAAAA">                    <div class="reg">娌℃湁鐧惧害璐﹀彿锛�<a href="##{idRegPanel}" onclick="#{clickTabReg};return false;">绔嬪嵆娉ㄥ唽鐧惧害璐﹀彿</a></div>                </div>            </div>            <div id="#{idRegPanel}" class="passport-reg-panel" style="display:none">                <div id="#{idRegContainer}" class="passport-reg-container"></div>            </div>        </div>'
    },
    options);
    options.changeTab = options.changeTab ||
    function(type) {
        var panelIds = [options.loginPanelId, options.regPanelId],
        tabs = baidu.dom.children(options.tabId),
        className = options.currentTabClass,
        curIndex = type == "login" ? 0 : 1;
        for (var i = 0; i < panelIds.length; ++i) {
            baidu.dom.removeClass(tabs[i], className);
            baidu.g(panelIds[i]).style.display = "none"
        }
        baidu.dom.addClass(tabs[curIndex], className);
        baidu.g(panelIds[curIndex]).style.display = ""; (type == "reg") ? this.renderReg() : this.renderLogin()
    };
    var dialogInstance = new baidu.ui.dialog.Dialog(options);
    dialogInstance.render();
    dialogInstance.update({
        contentText: options.contentText || baidu.string.format(options.tplContainer, {
            clickTabLogin: dialogInstance.getCallRef() + ".changeTab('login')",
            clickTabReg: dialogInstance.getCallRef() + ".changeTab('reg')",
            idLoginContainer: options.loginContainerId,
            idRegContainer: options.regContainerId,
            idLoginPanel: options.loginPanelId,
            idRegPanel: options.regPanelId,
            tabId: options.tabId,
            currentTabClass: options.currentTabClass
        })
    });
    baidu.extend(dialogInstance, {
        open: function() {
            var me = this; (me.initialStatus == "login") ? me.renderLogin() : me.changeTab("reg");
            me.dispatchEvent("onopen")
        },
        close: function() {
            var me = this;
            me.loginJson = me.regJson = null;
            baidu.ui.dialog.Dialog.prototype.close.call(me)
        },
        renderLogin: function() {
            var me = this;
            if (me.loginJson) {
                return
            }
            baidu.sio.callByServer(me.loginURL,
            function(value) {
                var json = me.loginJson = eval(value);
                baidu.sio.callByBrowser(json.jslink,
                function(value) {
                    baidu.ui.dialog.Dialog.prototype.open.call(me);
                    dialogInstance.loginDom = bdPass.LoginTemplate.render(json, options.loginContainerId, {
                        renderSafeflg: true,
                        onSuccess: options.onLoginSuccess,
                        jumpUrl: options.loginJumpURL,
                        onFailure: options.onLoginFailure
                    });
                    dialogInstance.update()
                })
            })
        },
        renderReg: function() {
            var me = this;
            if (me.regJson) {
                return
            }
            baidu.sio.callByServer(me.regURL,
            function(value) {
                var json = me.regJson = eval(value);
                baidu.sio.callByBrowser(json.jslink,
                function(value) {
                    baidu.ui.dialog.Dialog.prototype.open.call(me);
                    dialogInstance.registerDom = bdPass.RegTemplate.render(json, options.regContainerId, {
                        renderSafeflg: true,
                        onSuccess: options.onRegisterSuccess,
                        jumpUrl: options.regJumpURL,
                        onFailure: options.onRegisterFailure
                    });
                    dialogInstance.update()
                })
            })
        }
    });
    return dialogInstance
};
baidu.ui.dialog.Dialog.register(function(a) {
    a.addEventListener("onopen",
    function() {
        baidu.ui.smartCover.show(this)
    });
    a.addEventListener("onclose",
    function() {
        baidu.ui.smartCover.hide(this)
    });
    a.addEventListener("onupdate",
    function() {
        baidu.ui.smartCover.update(this)
    })
}); (function() {
    var a = baidu.ui.behavior.draggable = function() {
        this.addEventListener("onload",
        function() {
            var b = this;
            b.dragUpdate()
        });
        this.addEventListener("ondispose",
        function() {
            var b = this;
            baidu.un(b.dragHandler, "mousedown", b._dragFn);
            b.dragHandler = b._lastDragHandler = null
        })
    };
    a.dragUpdate = function(b) {
        var c = this;
        b = b || {};
        if (!c.draggable) {
            return
        }
        if (c.dragHandler != c._lastDragHandler && c._dragFn) {
            baidu.event.un(c._lastDragHandler, "onmousedown", c._dragFn)
        }
        baidu.object.extend(c, b);
        c._dragOption = {
            ondragstart: function() {
                c.dispatchEvent("ondragstart")
            },
            ondrag: function() {
                c.dispatchEvent("ondrag")
            },
            ondragend: function() {
                c.dispatchEvent("ondragend")
            },
            autoStop: true
        };
        c._dragOption.range = c.dragRange || [];
        c._dragOption.handler = c._lastDragHandler = c.dragHandler || c.getMain();
        if (c.dragHandler) {
            baidu.event.on(c.dragHandler, "onmousedown", c._dragFn = function() {
                baidu.dom.drag(c.dragTarget || c.getMain(), c._dragOption)
            })
        }
    }
})();
baidu.ui.dialog.Dialog.prototype.draggable = true;
baidu.ui.dialog.Dialog.register(function(b) {
    function a() {
        b.dragRange = [0, baidu.page.getWidth(), baidu.page.getHeight(), 0];
        b.dragUpdate()
    }
    b.addEventListener("onload",
    function() {
        b.dragHandler = b.dragHandler || b.getTitle();
        if (!b.dragRange) {
            a();
            baidu.on(window, "resize", a)
        } else {
            b.dragUpdate()
        }
    });
    b.addEventListener("ondragend",
    function() {
        b.left = baidu.dom.getStyle(b.getMain(), "left");
        b.top = baidu.dom.getStyle(b.getMain(), "top")
    });
    b.addEventListener("ondispose",
    function() {
        baidu.un(window, "resize", a)
    })
});
baidu.ui.dialog.confirm = function(b, a) {
    var c;
    a = baidu.extend({
        type: "confirm",
        buttons: {
            accept: {
                content: "纭畾",
                onclick: function() {
                    var f = this,
                    d = f.getParent();
                    d.dispatchEvent("onaccept") && d.close()
                }
            },
            cancel: {
                content: "鍙栨秷",
                onclick: function() {
                    var f = this,
                    d = f.getParent();
                    d.dispatchEvent("oncancel") && d.close()
                }
            }
        }
    },
    a || {});
    if (baidu.isString(b)) {
        a.contentText = b
    } else {
        a.content = b
    }
    c = new baidu.ui.dialog.Dialog(a);
    if (typeof a.autoDispose == "undefined" || a.autoDispose) {
        c.addEventListener("onclose",
        function() {
            this.dispose()
        })
    }
    c.render();
    if (typeof a.autoOpen == "undefined" || a.autoOpen) {
        c.open()
    }
    c.addEventListener("onenter",
    function(d) {
        this.buttonInstances.accept.fire("click", d)
    });
    return c
};
baidu.extend(baidu.ui.dialog.Dialog.prototype, {
    modal: true,
    modalColor: "#000000",
    modalOpacity: 0.4,
    hideModal: function() {
        var a = this; (a.modal && a.modalInstance) && a.modalInstance.hide()
    }
});
baidu.ui.dialog.Dialog.register(function(a) {
    if (a.modal) {
        a.addEventListener("onopen",
        function() {
            if (!a.modalInstance) {
                a.modalInstance = baidu.ui.modal.create()
            }
            a.modalInstance.show({
                targetUI: a,
                styles: {
                    color: a.modalColor,
                    opacity: a.modalOpacity,
                    zIndex: a.modalZIndex ? a.modalZIndex: a.zIndex - 1
                }
            })
        });
        a.addEventListener("onclose", a.hideModal);
        a.addEventListener("ondispose", a.hideModal)
    }
});
baidu.ui.dialog.create = function(a) {
    var b = new baidu.ui.dialog.Dialog(a);
    b.render();
    return b
};
baidu.ui.dialog.iframe = function(f, a) {
    a = a || {};
    var b = new baidu.ui.dialog.Dialog(a),
    c = "iframe",
    d;
    b.contentText = baidu.format(b.tplIframe, f, b.getId(c), b.getClass(c), b.iframeName ? b.iframeName: b.getId(c));
    b.render();
    d = b.getContent().firstChild;
    if (baidu.browser.ie) {
        d.src = b.getContent().firstChild.src
    }
    baidu.on(d, "onload",
    function() {
        b.update(b)
    });
    b.open();
    return b
};
baidu.ui.dialog.Dialog.extend({
    tplIframe: "<iframe width='100%' height='100%' frameborder='0' scrolling='no' src='#{0}' name='#{3}' id='#{1}' class='#{2}'></iframe>"
}); (function() {
    var a = baidu.ui.behavior.switchable = function(b) {
        b = b || {};
        var c = this;
        c._triggers = b.triggers || [];
        c._recievers = b.recievers || [];
        c._triggerEvent = b.triggerEvent || "";
        c.currentIndex = b.currentIndex || 0;
        c.rebindTriggers();
        c.addEventListener("ondispose",
        function() {
            c.unbindTriggers()
        })
    };
    a.switchTo = function(b) {
        var c = this;
        if (c.dispatchEvent("onbeforeswitch", c._getEventArgs(c.currentIndex, b))) {
            c.dispatchEvent("onswitch", c._getEventArgs(c.currentIndex, c.currentIndex = b))
        }
    };
    a.switchToTrigger = function(d) {
        var g = this,
        c = 0,
        f = g._triggers,
        b = f.length;
        for (; c < b; ++c) {
            if (d === g._triggers[c]) {
                break
            }
        }
        if (c < b) {
            g.switchTo(c)
        }
    };
    a.next = function() {
        var b = this;
        b.switchTo((b.currentIndex + 1) % b._triggers.length)
    };
    a.prev = function() {
        var c = this,
        b = c._triggers.length;
        c.switchTo((c.currentIndex - 1 + b) % b)
    };
    a.getCurrent = function() {
        var c = this,
        b = c.currentIndex;
        return {
            index: b,
            trigger: c._triggers[b],
            reciever: c._recievers[b]
        }
    };
    a._getEventArgs = function(b, d) {
        var c = this;
        return {
            fromIndex: b,
            fromTrigger: c._triggers[b],
            fromReciever: c._recievers[b],
            toIndex: d,
            toTrigger: c._triggers[d],
            toReciever: c._recievers[d]
        }
    };
    a.rebindTriggers = function() {
        var b = this;
        b._triggerHandler = b._triggerHandler ||
        function(c) {
            b.switchToTrigger(baidu.event.getTarget(window.event || c))
        };
        b.unbindTriggers(b);
        baidu.each(b._triggers,
        function(c) {
            baidu.on(c, b._triggerEvent, b._triggerHandler)
        })
    };
    a.unbindTriggers = function() {
        var b = this;
        baidu.each(b._triggers,
        function(c) {
            baidu.un(c, b._triggerEvent, b._triggerHandler)
        })
    }
})(); (function() {
    var a = baidu.ui.behavior.droppable = function() {
        var b = this;
        b.dropOptions = baidu.extend({
            ondropover: function(c) {
                b.dispatchEvent("ondropover", c)
            },
            ondropout: function(c) {
                b.dispatchEvent("ondropout", c)
            },
            ondrop: function(c) {
                b.dispatchEvent("ondrop", c)
            }
        },
        b.dropOptions);
        b.addEventListener("onload",
        function() {
            b.dropHandler = b.dropHandler || b.getBody();
            b.dropUpdate(b)
        })
    };
    a.dropUpdate = function(b) {
        var c = this;
        b && baidu.extend(c, b);
        c._theDroppable && c._theDroppable.cancel();
        if (! (c.droppable)) {
            return
        }
        c._theDroppable = baidu.dom.droppable(c.dropHandler, c.dropOptions)
    }
})(); (function() {
    var a = baidu.ui.behavior.decorator = function() {
        this.addEventListener("onload",
        function() {
            var c = this,
            b;
            baidu.each(c.decorator,
            function(f, d) {
                b = {
                    ui: c,
                    skin: c.skin
                };
                if (baidu.lang.isString(f)) {
                    b.type = f
                } else {
                    baidu.extend(b, f)
                }
                c._decoratorInstance[d] = baidu.ui.decorator.create(b)
            })
        });
        this.addEventListener("ondispose",
        function() {
            this._decoratorInstance = [];
            baidu.each(this._decoratorInstance,
            function(b) {
                b.dispose()
            })
        })
    };
    a._decoratorInstance = [];
    a.getDecorator = function() {
        var b = this._decoratorInstance;
        return b.length > 0 ? b: b[0]
    }
})();
baidu.ui.popup = baidu.ui.popup || {
    instances: {}
};
baidu.ui.popup.Popup = baidu.ui.createUI(function(a) {}).extend({
    uiType: "POPUP",
    width: "",
    height: "",
    top: "auto",
    left: "auto",
    zIndex: 1200,
    contentText: "",
    onbeforeclose: function() {
        return true
    },
    tplBody: "<div id='#{id}' class='#{class}'></div>",
    isShown: function() {
        return baidu.ui.popup.instances[this.guid] == "show"
    },
    getString: function() {
        var a = this;
        return baidu.format(a.tplBody, {
            id: a.getId(),
            "class": a.getClass()
        })
    },
    render: function() {
        var b = this,
        a;
        if (b.getMain()) {
            return
        }
        a = b.renderMain();
        a.innerHTML = b.getString();
        b.update(b);
        baidu.dom.setStyles(b.getMain(), {
            position: "absolute",
            zIndex: b.zIndex,
            marginLeft: "-100000px"
        });
        b.dispatchEvent("onload");
        return a
    },
    open: function(a) {
        var b = this;
        b.update(a);
        b.getMain().style.marginLeft = "auto";
        baidu.ui.popup.instances[b.guid] = "show";
        b.dispatchEvent("onopen")
    },
    close: function() {
        var a = this;
        if (a.dispatchEvent("onbeforeclose")) {
            a.getMain().style.marginLeft = "-100000px";
            baidu.ui.popup.instances[a.guid] = "hide";
            a.dispatchEvent("onclose")
        }
    },
    update: function(b) {
        b = b || {};
        var c = this,
        a = c.getBody();
        baidu.object.extend(c, b);
        if (b.content) {
            if (a.firstChild != b.content) {
                a.innerHTML = "";
                a.appendChild(b.content)
            }
        } else {
            if (b.contentText) {
                a.innerHTML = b.contentText
            }
        }
        c._updateSize();
        c._updatePosition();
        c.dispatchEvent("onupdate")
    },
    _updateSize: function() {
        var a = this;
        baidu.dom.setStyles(a.getMain(), {
            width: a.width,
            height: a.height
        })
    },
    _updatePosition: function() {
        var a = this;
        baidu.dom.setStyles(a.getMain(), {
            top: a.top,
            left: a.left
        })
    },
    dispose: function() {
        var a = this;
        a.dispatchEvent("ondispose");
        baidu.dom.remove(a.getMain());
        baidu.lang.Class.prototype.dispose.call(a)
    }
});
baidu.ui.popup.Popup.register(function(a) {
    a.addEventListener("onopen",
    function() {
        baidu.ui.smartCover.show(this)
    });
    a.addEventListener("onclose",
    function() {
        baidu.ui.smartCover.hide(this)
    });
    a.addEventListener("onupdate",
    function() {
        baidu.ui.smartCover.update(this)
    })
});
baidu.ui.popup.create = function(a) {
    var b = new baidu.ui.popup.Popup(a);
    b.render();
    return b
};
baidu.ui.createPopup = function(d) {
    var c = baidu.lang.createSingle({
        isOpen: false
    });
    c.eid = "baidupopup_" + c.guid;
    var b, h, a = "font-size:12px; margin:0;";
    try {
        baidu.browser.ie && (b = window.createPopup())
    } catch(g) {}
    if (!b) {
        var i = "<iframe id='" + c.eid + "' scrolling='no' frameborder='0' style='position:absolute; z-index:1;  width:0px; height:0px; background-color:#0FFFFF'></iframe>";
        if (!document.body) {
            document.write(i)
        } else {
            baidu.dom.insertHTML(document.body, "afterbegin", i)
        }
    }
    c.render = function() {
        var k = this;
        if (b) {
            k.window = b;
            k.document = b.document;
            var j = k.styleSheet = k.createStyleSheet();
            j.addRule("body", a);
            k.dispatchEvent("onready")
        } else {
            f()
        }
        baidu.event.on(window, "onblur",
        function() {
            k.focusme = false;
            if (!k.isOpen) {
                return
            }
            setTimeout(function() {
                if (!k.focusme) {
                    k.hide()
                }
            },
            100)
        });
        baidu.event.on(window, "onresize",
        function() {
            k.hide()
        });
        baidu.event.on(document, "onmousedown",
        function() {
            k.hide()
        })
    };
    function f(j) {
        h = baidu.dom.g(c.eid);
        if ((!j && baidu.browser.firefox) || !h) {
            setTimeout(function() {
                f(true)
            },
            10);
            return
        }
        c.window = h.contentWindow;
        var l = c.document = c.window.document;
        var k = "<html><head><style type='text/css'>body{" + a + " background-color:#FFFFFF;}\n</style></head><body onfocus='parent[\"" + baidu.guid + '"]._instances["' + c.guid + "\"].focusme=true'></body></html>";
        l.open();
        l.write(k);
        l.close();
        c.styleSheet = c.createStyleSheet();
        c.dispatchEvent("onready")
    }
    c.createStyleSheet = function(j) {
        j = j || {};
        j.document = this.document;
        return baidu.page.createStyleSheet(j)
    };
    c.show = function(p, o, n, k, l, j) {
        if (b) {
            if (j == "top") {
                o = -k
            } else {
                o = l.offsetHeight
            }
            b.show(0, o, n, k, l || document.body);
            this.isOpen = b.isOpen
        } else {
            if (h) {
                baidu.dom.show(this.eid);
                if (j == "top") {
                    o -= k
                } else {
                    o = o + l.offsetHeight
                }
                this.isOpen = true;
                var m = h.style;
                m.width = n + "px";
                m.height = k + "px";
                m.top = o + "px";
                m.left = p + "px"
            }
        }
        this.dispatchEvent("onshow")
    };
    c.bind = function(l, m, k, j) {
        var n = baidu.dom.getPosition(l);
        this.show(n.left, n.top, m, k, l, j)
    };
    c.hide = function() {
        if (this.isOpen) {
            if (b) {
                b.hide();
                this.isOpen = b.isOpen
            } else {
                if (h) {
                    this.isOpen = false;
                    var j = h.style;
                    j.width = "0px";
                    j.height = "0px";
                    baidu.dom.hide(this.eid)
                }
            }
            this.dispatchEvent("onhide")
        }
    };
    c.write = function(k) {
        var j = this;
        this.document.body.innerHTML = k
    };
    return c
};
baidu.ui.datePicker = baidu.ui.datePicker || {};
baidu.ui.datePicker.DatePicker = baidu.lang.createClass(function(b) {
    var d = {
        sunday: "\u65e5",
        monday: "\u4e00",
        tuesday: "\u4e8c",
        wednesday: "\u4e09",
        thursday: "\u56db",
        friday: "\u4e94",
        saturday: "\u516d",
        january: "\u4e00\u6708",
        february: "\u4e8c\u6708",
        march: "\u4e09\u6708",
        april: "\u56db\u6708",
        may: "\u4e94\u6708",
        june: "\u516d\u6708",
        july: "\u4e03\u6708",
        august: "\u516b\u6708",
        september: "\u4e5d\u6708",
        october: "\u5341\u6708",
        november: "\u5341\u4e00\u6708",
        december: "\u5341\u4e8c\u6708",
        titleToday: "\u4eca\u5929\u662fyyyy\u5e74MM\u6708dd\u65e5",
        titleYear: "yyyy\u5e74",
        titleYearMonth: "yyyy\u5e74MM\u6708"
    },
    a = {
        prevHTML: "<input type='button' style='height:18px; width:100%; border:none; background-color:transparent' value='&lt;'>",
        nextHTML: "<input type='button' style='height:18px; width:100%; border:none; background-color:transparent' value='&gt;'>"
    };
    if ((navigator.platform == "Win32" || navigator.platform == "Windows") && (baidu.browser.ie || baidu.browser.chrome)) {
        a.prevHTML = "<input type='button' style='font-family:Webdings; height:18px; width:100%; border:none; background-color:transparent' value='3'>";
        a.nextHTML = "<input type='button' style='font-family:Webdings; height:18px; width:100%; border:none; background-color:transparent' value='4'>"
    }
    var c = this;
    c.dateList = [];
    baidu.object.extend(c, baidu.ui.datePicker.DatePicker.options);
    baidu.object.extend(c, b);
    c.lang = baidu.object.extend(baidu.object.extend({},
    d), c.lang);
    c.config = baidu.object.extend(baidu.object.extend({},
    a), c.config);
    c.Class = baidu.ui.datePicker.DatePicker;
    c.Class.instance = c;
    c.currentWorkLayerName;
    c.Class.popup.onhide = function() {
        c.stopPrev();
        c.stopNext();
        c.Class.instance = null;
        c.Class = null;
        c.dispose()
    }
},
{
    options: {
        format: "yyyy-MM-dd",
        minDate: new Date( - 8640000000000000),
        maxDate: new Date(8640000000000000),
        duration: 365,
        pauseTime: 240,
        appointedDate: false
    },
    className: "baidu.ui.datePicker.DatePicker"
}).extend({
    render: function() {
        var j = this;
        j.dispatchEvent("onready");
        j.min = j.minDate.getTime();
        j.max = j.maxDate.getTime();
        j.g("prev").innerHTML = j.config.prevHTML;
        j.g("next").innerHTML = j.config.nextHTML;
        j.g("header").innerHTML = baidu.date.format(new Date(), j.lang.titleToday);
        j["\x06dateList"] = [];
        for (var g = 0,
        d = j.dateList.length; g < d; g++) {
            var l = j.dateList[g];
            j["\x06dateList"][g] = new Date(l.getFullYear(), l.getMonth(), l.getDate()).getTime()
        }
        var a = new Date();
        var h = j.currentDate = new Date(a.getFullYear(), a.getMonth(), a.getDate());
        j.appointedDate ? j.currentDate = j.appointedDate: j.appointedDate = h;
        var k = j.currentDate.getFullYear(),
        f = j.currentDate.getMonth(),
        c = j.g("date1").rows[0].cells,
        b = j.g("date2").rows[0].cells;
        for (var g = 0,
        d = j.Class.weeks.length; g < d; g++) {
            c[g].innerHTML = b[g].innerHTML = j.lang[j.Class.weeks[g]]
        }
        j.currentWorkLayerName = "date";
        baidu.dom.show(j.renderDate());
        j.title(baidu.date.format(j.currentDate, j.lang.titleYearMonth))
    },
    renderDate: function(f, q) {
        var E = this,
        A = E.currentDate,
        l = A.getFullYear(),
        C = A.getMonth(),
        G = E.getWorkLayer("date"),
        F = E.Class.dateOfMonth[C];
        1 == C && 0 == l % 4 && (0 != l % 100 || 0 == l % 400) && (F = 29);
        var c = new Date(l, C, 1),
        x = 1 - c.getDay(),
        a = new Date(),
        B = a.getFullYear(),
        b = a.getMonth(),
        g = a.getDate(),
        v = G.getElementsByTagName("TD");
        for (var w = 0,
        t = v.length; w < t; w++) {
            var p = new Date(l, C, x + w),
            j = v[w],
            r = p.getTime(),
            k = p.getFullYear(),
            u = p.getMonth(),
            z = p.getDate(),
            h = "",
            o = z;
            r > E.max || r < E.min && (o = " ");
            h = E.Class.weeks[p.getDay() % 7];
            u != C && (h += " other");
            if (o != " ") {
                p.getTime() == E.appointedDate.getTime() && (h += " current");
                baidu.array.indexOf(E["\x06dateList"], p.getTime()) > -1 && (h += " appointed");
                k == B && u == b && z == g && (h += " today")
            }
            j.setAttribute("data-year", k, 0);
            j.setAttribute("data-month", u, 0);
            j.setAttribute("data-date", z, 0);
            j.innerHTML = o;
            j.className = h
        }
        return (E.currentLayer = G)
    },
    renderMonth: function(k) {
        var h = this,
        l = h.currentDate,
        c = l.getFullYear(),
        j = l.getMonth(),
        g = h.getWorkLayer("month"),
        d = g.getElementsByTagName("TD");
        for (var f = 0,
        a = d.length; f < a; f++) {
            var b = d[f];
            var m = h.lang[h.Class.monthes[f]];
            new Date(c, f + 1, 1).getTime() < h.min && (m = " ");
            new Date(c, f, 1).getTime() > h.max && (m = " ");
            b.innerHTML = m;
            b.setAttribute("data-year", c, 0);
            b.setAttribute("data-month", f, 0);
            b.className = f == l.getMonth() && m != " " ? "current": ""
        }
        return (h.currentLayer = g)
    },
    renderYear: function() {
        var j = this,
        l = "",
        d = j.currentDate.getFullYear(),
        b = d - d % 10 - 1,
        h = j.getWorkLayer("year"),
        f = h.getElementsByTagName("TD");
        h.setAttribute("data-ytype", "singleYear", 0);
        for (var g = 0,
        a = f.length; g < a; g++) {
            var c = f[g],
            k = b + g,
            m = k;
            c.setAttribute("data-year", k, 0);
            l = (g == 0 || g > 10) ? "other": "";
            l = k == d ? l + " current": l;
            k < j.minDate.getFullYear() && (m = " ");
            k > j.maxDate.getFullYear() && (m = " ");
            c.className = m == " " ? "": l;
            c.innerHTML = m
        }
        return (j.currentLayer = h)
    },
    renderMultiyear: function(p, m) {
        var j = this,
        l = "",
        d = j.currentDate.getFullYear(),
        b = d - d % 100 - 10,
        h = j.getWorkLayer("year"),
        g = h.getElementsByTagName("TD");
        h.setAttribute("data-ytype", "multiyear", 0);
        for (var f = 0,
        a = g.length; f < a; f++) {
            var c = g[f],
            k = b + f * 10;
            c.setAttribute("data-ystart", k, 0);
            c.setAttribute("data-yend", k + 9, 0);
            l = (f == 0 || f > 10) ? "other": "";
            l = d >= k && d <= k + 9 ? l + " current": l;
            var o = k + "-<wbr>" + (k + 9);
            k + 9 < j.minDate.getFullYear() && (o = " ");
            k > j.maxDate.getFullYear() && (o = " ");
            c.className = o == " " ? "": l;
            c.innerHTML = o
        }
        return (j.currentLayer = h)
    },
    zoomLayer: function(g, c, f, a) {
        if (!c) {
            return
        }
        var d = this,
        b = parseInt(c.style.zIndex);
        g == "zoomOut" && (c.style.zIndex = b + 2);
        baidu.fx[g](c, {
            duration: d.duration,
            transformOrigin: a || "50% top",
            onafterfinish: function() {
                if (g == "zoomOut") {
                    c.style.zIndex = b
                } else {
                    d.Class && d.title(f)
                }
            }
        })
    },
    title: function(a) {
        this.g("current").innerHTML = a
    },
    g: function(a) {
        return this.Class.popup.document.getElementById(a)
    },
    show: function() {
        this.popup.bind(this.trigger, 178, 164, this.position)
    },
    pick: function(a) {
        if (!this.dispatchEvent(new baidu.lang.Event("onpick", a))) {
            return
        }
        var b = baidu.date.format(a, this.format);
        if (/input/i.test(this.trigger.tagName)) {
            this.trigger.value = b
        } else {
            this.trigger.innerHTML = b
        }
        this.popup.hide()
    },
    getWorkLayer: function(c) {
        var f = this,
        g = 60000,
        h = f.Class.zIndex,
        b = [f.g(c + "1").style.zIndex, f.g(c + "2").style.zIndex];
        if (h > g + 10) {
            baidu.array.each(["year1", "year2", "month1", "month2", "date1", "date2"],
            function(a) {
                var i = parseInt(f.g(a).style.zIndex);
                f.g(a).style.zIndex = i - g
            });
            baidu.ui.datePicker.DatePicker.zIndex -= g
        }
        var d = f.g(c += (parseInt(b[0]) <= parseInt(b[1]) ? "1": "2"));
        d.style.zIndex = ++baidu.ui.datePicker.DatePicker.zIndex;
        return d
    },
    startPrev: function() {
        var a = this,
        b = new Date().getTime();
        if (!a.startPrev.time || b - a.startPrev.time > a.duration + a.pauseTime) {
            a.prev()
        }
        a.startPrev.time = b;
        a.startPrev.timer = setTimeout(function() {
            a.startPrev()
        },
        a.duration + a.pauseTime)
    },
    stopPrev: function() {
        clearTimeout(this.startPrev.timer)
    },
    prev: function() {
        var f = this,
        b = f.currentDate.getMonth(),
        h = f.currentDate.getFullYear(),
        c = f.minDate.getMonth(),
        a = f.minDate.getFullYear();
        switch (f.currentWorkLayerName) {
        case "date":
            if (h == a && b - 1 < c) {
                return
            }
            f.currentDate.setMonth(b - 1);
            var d = baidu.date.format(f.currentDate, f.lang.titleYearMonth);
            f.zoomLayer("zoomIn", f.renderDate(), d, "5% top");
            break;
        case "month":
            if (h - 1 < a) {
                return
            }
            f.currentDate.setFullYear(h - 1);
            var d = baidu.date.format(f.currentDate, f.lang.titleYear);
            f.zoomLayer("zoomIn", f.renderMonth(), d, "5% top");
            break;
        case "year":
            if (h - h % 10 < a) {
                return
            }
            f.currentDate.setFullYear(h - 10);
            var g = h - 10 - h % 10;
            f.zoomLayer("zoomIn", f.renderYear(), g + "-" + (g + 9), "5% top");
            break;
        case "multiyear":
            if (h - h % 100 < a) {
                return
            }
            f.currentDate.setFullYear(h - 100);
            var g = h - 100 - h % 100;
            f.zoomLayer("zoomIn", f.renderMultiyear(), g + "-" + (g + 99), "5% top");
            break
        }
    },
    now: function() {
        var b = this,
        d = b.currentDate.getFullYear(),
        a = b.currentLayer;
        switch (b.currentWorkLayerName) {
        case "date":
            b.currentWorkLayerName = "month";
            baidu.dom.show(b.renderMonth());
            b.title(baidu.date.format(b.currentDate, b.lang.titleYear));
            b.zoomLayer("zoomOut", a);
            break;
        case "month":
            b.currentWorkLayerName = "year";
            baidu.dom.show(b.renderYear());
            var c = d - d % 10;
            b.title(c + "-" + (c + 9));
            b.zoomLayer("zoomOut", a);
            break;
        case "year":
            b.currentWorkLayerName = "multiyear";
            b.renderMultiyear();
            var c = d - d % 100;
            b.title(c + "-" + (c + 99));
            b.zoomLayer("zoomOut", a);
            break
        }
    },
    startNext: function() {
        var a = this,
        b = new Date().getTime();
        if (!a.startNext.time || b - a.startNext.time > a.duration + a.pauseTime) {
            a.next()
        }
        a.startNext.time = b;
        a.startNext.timer = setTimeout(function() {
            a.startNext()
        },
        a.duration + a.pauseTime)
    },
    stopNext: function() {
        clearTimeout(this.startNext.timer)
    },
    next: function() {
        var c = this,
        a = c.currentDate.getMonth(),
        h = c.currentDate.getFullYear(),
        f = c.maxDate.getMonth(),
        d = c.maxDate.getFullYear();
        switch (c.currentWorkLayerName) {
        case "date":
            if (h == d && a + 1 > f) {
                return
            }
            c.currentDate.setMonth(a + 1);
            var b = baidu.date.format(c.currentDate, c.lang.titleYearMonth);
            c.zoomLayer("zoomIn", c.renderDate(), b, "95% top");
            break;
        case "month":
            if (h + 1 > d) {
                return
            }
            c.currentDate.setFullYear(h + 1);
            var b = baidu.date.format(c.currentDate, c.lang.titleYear);
            c.zoomLayer("zoomIn", c.renderMonth(), b, "95% top");
            break;
        case "year":
            if (h + 10 > d) {
                return
            }
            c.currentDate.setFullYear(h + 10);
            var g = h + 10 - h % 10;
            c.zoomLayer("zoomIn", c.renderYear(), g + "-" + (g + 9), "95% top");
            break;
        case "multiyear":
            if (h + 100 > d) {
                return
            }
            c.currentDate.setFullYear(h + 100);
            var g = h + 100 - h % 100;
            c.zoomLayer("zoomIn", c.renderMultiyear(), g + "-" + (g + 99), "95% top");
            break
        }
    },
    click: function(k, d) {
        if (/^\s+$/.test(d.innerHTML)) {
            return
        }
        var h = this,
        i = d.getAttribute("data-year"),
        g = d.getAttribute("data-month"),
        c = d.getAttribute("data-date"),
        b = d.getAttribute("data-ystart"),
        j = d.getAttribute("data-yend"),
        f = (d.cellIndex + 0.5) * 25 + "% " + (d.parentNode.rowIndex + 0.5) * 34 + "%";
        if (k.id.indexOf("date") == 0) {
            h.pick(new Date(i, g, c))
        } else {
            if (k.id.indexOf("month") == 0) {
                h.currentDate = new Date(parseInt(i), parseInt(g), 1);
                h.currentWorkLayerName = "date";
                var l = baidu.date.format(h.currentDate, h.lang.titleYearMonth);
                h.zoomLayer("zoomIn", h.renderDate(), l, f)
            } else {
                if (k.id.indexOf("year") == 0) {
                    var a = k.getAttribute("data-ytype");
                    if (a && a == "multiyear") {
                        h.currentDate.setFullYear(parseInt(b));
                        h.currentWorkLayerName = "year";
                        h.zoomLayer("zoomIn", h.renderYear(), b + "-" + j, f)
                    } else {
                        h.currentDate.setFullYear(parseInt(i));
                        h.currentWorkLayerName = "month";
                        var l = baidu.date.format(h.currentDate, h.lang.titleYear);
                        h.zoomLayer("zoomIn", h.renderMonth(), l, f)
                    }
                }
            }
        }
    },
    today: function() {
        this.pick(new Date())
    }
}); (function() {
    var b = baidu.ui.datePicker.DatePicker;
    window[baidu.guid]._instances[(b.guid = baidu.lang.guid())] = b;
    b.popup = baidu.ui.createPopup();
    b.zIndex = 3;
    b.dateOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    b.weeks = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    b.monthes = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    b.popup.onready = function() {
        var c = this.styleSheet.addRule;
        c("td", "text-align:center; cursor:default; vertical-align:middle;");
        c("table", 'font-size:12px; background-color:#FFFFFF;font-family:simsun, "sans-serif"');
        c("#wrapper", "height:164px; width:178px; border:5px solid #EEEEEE;");
        c("#header", "height:20px; line-height:18px; cursor:pointer; text-align:center; background-color:#EEEEEE;");
        c("#nav", "height:20px; width:100%; border:1px solid #E7E7E7");
        c("#container", "position:relative; z-index:1; width:168px; height:114px; background-color:yellow;");
        c("#container table", "width:168px; height:114px; position:absolute; top:0px; left:0px; z-index:1;");
        c("#container td", "width:25%; height:38px; border:1px solid #FAFAFA;");
        c("#container th", "width:24px; height:18px; background-color:#EEEEEE;");
        c("#container td.mover", "border:1px solid blue; background-color:#F7F7F7;");
        c("#container #date1 td", "width:24px; height:16px;");
        c("#container #date2 td", "width:24px; height:16px;");
        c("#container td.other", "color:#AAAAAA;");
        c("#container td.appointed", "border:1px solid blue;");
        c("#container td.current", "border: 1px solid blue;");
        c("#container td.today", "border: 1px solid #A00000;");
        c(".saturday", "background-color:#FCFCFC; color:#800000");
        c(".sunday", "background-color:#FCFCFC; color:#A00000");
        var j = [],
        h = 'parent["' + baidu.guid + '"]._instances["' + b.guid + '"]';
        j.push("<table cellpadding='0' cellspacing='0' id='wrapper'>");
        j.push("<tr><td style='vertical-align:top'>");
        j.push("<div id='header' onclick='#{0}.drive(\"today\")'></div>");
        j.push("<table id='nav' cellpadding='0' cellspacing='0'><tr>");
        j.push("<td style='width:10%' id='prev' onmousedown='#{0}.drive(\"startPrev\")' ");
        j.push("onmouseup='#{0}.drive(\"stopPrev\")' onmouseout='#{0}.drive(\"stopPrev\")'> </td>");
        j.push("<td style='text-align:center;' id='current' onclick='#{0}.drive(\"now\")'>year</td>");
        j.push("<td style='width:10%' id='next' onmousedown='#{0}.drive(\"startNext\")' ");
        j.push("onmouseup='#{0}.drive(\"stopNext\")' onmouseout='#{0}.drive(\"stopNext\")'> </td>");
        j.push("</tr></table>");
        var f = ["<table id='#{0}' cellpadding='0' cellspacing='0' style='z-index:1' onclick='#{1}.click(event, this)'>"];
        f.push("<tr><td></td><td></td><td></td><td></td></tr>");
        f.push("<tr><td></td><td></td><td></td><td></td></tr>");
        f.push("<tr><td></td><td></td><td></td><td></td></tr>");
        f.push("</table>");
        j.push("<div id='container' onmouseout='#{0}.mouseout()'");
        j.push(" onmouseover='#{0}.mouseover(event, this)'>");
        j.push(baidu.string.format(f.join(""), "year1", h));
        j.push(baidu.string.format(f.join(""), "year2", h));
        j.push(baidu.string.format(f.join(""), "month1", h));
        j.push(baidu.string.format(f.join(""), "month2", h));
        var d = "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        for (var g = 1; g <= 7; g++) {
            f[g] = d
        }
        f[1] = f[1].replace(/td/g, "th");
        f.push("</table>");
        j.push(baidu.string.format(f.join(""), "date1", h));
        j.push(baidu.string.format(f.join(""), "date2", h));
        j.push("</div>");
        j.push("</td></tr></table>");
        this.write(baidu.string.format(j.join(""), h))
    };
    b.popup.render();
    b.addRule = function(c, d) {
        b.styleSheet.addRule(c, d)
    };
    b.drive = function(c) {
        c && b.instance && typeof b.instance[c] == "function" && b.instance[c].apply(b.instance, Array.prototype.slice.call(arguments, 1))
    };
    b.mouseover = function(c, d) { (b.td = a(c, d)) && baidu.dom.addClass(b.td, "mover")
    };
    function a(d, c) {
        d = b.popup.window.event || d;
        d = d.srcElement || d.target;
        while (d) {
            if (d.tagName == "TD") {
                return d
            }
            if (d == c) {
                return null
            }
            d = d.parentNode
        }
        return null
    }
    b.mouseout = function() {
        b.td && baidu.dom.removeClass(b.td, "mover");
        b.td = null
    };
    b.click = function(d, c) {
        var f = a(d, c);
        f && this.drive("click", c, f)
    }
})();
baidu.ui.datePicker.create = function(b, a) {
    b = baidu.dom.g(b);
    if (!b) {
        return null
    }
    var d = new baidu.ui.datePicker.DatePicker(a);
    d.trigger = b;
    var c = (b.value || b.innerHTML).replace(/[\-_]/g, "/");
    Date.parse(c) && (d.appointedDate = new Date(Date.parse(c)));
    d.popup = baidu.ui.datePicker.DatePicker.popup;
    d.render();
    d.show();
    return d
};
baidu.ui.button.setup = function(d, b) {
    var c = new baidu.ui.button.Button(b),
    a = baidu.dom.create("DIV", {
        style: "display:inline"
    });
    baidu.dom.insertAfter(a, d);
    c.content = d.innerHTML;
    c.render(a);
    baidu.dom.remove(d);
    return c
};
baidu.ui.carousel = baidu.ui.carousel || {};
baidu.ui.carousel.Carousel = baidu.ui.createUI(function(a) {
    this.contentText = a.contentText || []
}).extend({
    uiType: "carousel",
    orientation: "horizontal",
    pageSize: 3,
    scrollIndex: -1,
    totalCount: 0,
    itemCount: 0,
    offsetWidth: 0,
    offsetHeight: 0,
    axis: {
        horizontal: {
            offsetPos: "offsetLeft",
            offsetSize: "offsetWidth",
            scroll: "scrollLeft"
        },
        vertical: {
            offsetPos: "offsetTop",
            offsetSize: "offsetHeight",
            scroll: "scrollTop"
        }
    },
    tplDOM: "<div id='#{id}' class='#{class}'>#{content}</div>",
    tplItem: '<div id=\'#{id}\' class=\'#{class}\' onclick="#{handler}" onmouseover="#{mouseoverHandler}" onmouseout="#{mouseoutHandler}">#{content}</div>',
    render: function(b) {
        var a = this;
        baidu.dom.insertHTML(a.renderMain(b || a.target), "beforeEnd", a.getString());
        a.totalCount = a.contentText.length || 0;
        a._resize();
        a.dispatchEvent("onload")
    },
    _resize: function() {
        var d = this,
        c = d.axis[d.orientation].offsetSize,
        a = d.axis["horizontal" == d.orientation ? "vertical": "horizontal"].offsetSize,
        b = d.getItem(0);
        if (b && (d.getBody()[c] < d.pageSize * b[c] || d.getBody()[a] < b[a])) {
            d.offsetWidth = d.offsetWidth || b.offsetWidth;
            d.offsetHeight = d.offsetHeight || b.offsetHeight;
            baidu.dom.setStyles(d.getBody(), {
                width: d.offsetWidth * ("horizontal" == d.orientation ? d.pageSize: 1) + "px",
                height: d.offsetHeight * ("vertical" == d.orientation ? d.pageSize: 1) + "px"
            })
        }
        if ("horizontal" == d.orientation) {
            baidu.setStyles(d.getScrollContainer(), {
                width: d.offsetWidth * d.totalCount + "px"
            })
        }
    },
    getString: function() {
        var b = this,
        a = [],
        c;
        baidu.array.each(b.contentText,
        function(d) {
            a.push(baidu.format(b.tplItem, {
                id: b.getId("item" + b.itemCount),
                "class": b.getClass("item"),
                handler: b.getCallString("focus", b.getId("item" + b.itemCount)),
                mouseoverHandler: b.getCallString("_onMouse", b.getId("item" + b.itemCount)),
                mouseoutHandler: b.getCallString("_onMouse", b.getId("item" + b.itemCount++)),
                content: d.content
            }))
        });
        c = baidu.format(b.tplDOM, {
            id: b.getId("scroll"),
            "class": b.getClass("scroll"),
            content: a.join("")
        });
        return baidu.format(b.tplDOM, {
            id: b.getId(),
            "class": b.getClass(),
            content: c
        })
    },
    getScrollContainer: function() {
        return baidu.g(this.getId("scroll"))
    },
    getItem: function(a) {
        return baidu.dom.children(this.getScrollContainer())[a]
    },
    addItem: function(d, a) {
        var c = this,
        b = baidu.format(c.tplItem, {
            id: c.getId("item" + c.itemCount),
            "class": c.getClass("item"),
            handler: c.getCallString("focus", c.getId("item" + c.itemCount)),
            mouseoverHandler: c.getCallString("_onMouse", "over", c.getId("item" + c.itemCount)),
            mouseoutHandler: c.getCallString("_onMouse", "out", c.getId("item" + c.itemCount++)),
            content: d.innerHTML
        });
        if (baidu.lang.isNumber(a)) {
            baidu.dom.insertHTML(c.getItem(a), "beforeBegin", b);
            a <= c.scrollIndex && c.scrollIndex++
        } else {
            baidu.dom.insertHTML(c.getScrollContainer(), "beforeEnd", b)
        }
        c.totalCount++;
        c._resize()
    },
    removeItem: function(a) {
        var c = this,
        b = c.getItem(a);
        if (b) {
            baidu.dom.remove(b.id);
            c.scrollIndex = (a == c.scrollIndex) ? 0 : (a < c.scrollIndex ? c.scrollIndex - 1 : c.scrollIndex);
            c.totalCount--;
            c._resize()
        }
        return b
    },
    scrollTo: function(b, a) {
        var c = this,
        a = a || 0;
        if (c.dispatchEvent("onbeforescroll", {
            index: b,
            scrollOffset: a
        })) {
            c._scrollTo(b, a)
        }
    },
    _scrollTo: function(b, a) {
        var d = this,
        a = a || 0,
        c = d.getItem(b);
        if (c) {
            d.dispatchEvent("onbeforestartscroll", {
                index: b,
                scrollOffset: a
            });
            d.getBody()[d.axis[d.orientation].scroll] = d[d.axis[d.orientation].offsetSize] * (b - a);
            d.dispatchEvent("onafterscroll", {
                index: b,
                scrollOffset: a
            })
        }
    },
    focus: function(a) {
        var c = this,
        b;
        c.dispatchEvent("onitemclick");
        if ("string" == typeof(a)) {
            baidu.array.each(baidu.dom.children(c.getScrollContainer()),
            function(f, d) {
                if (a == f.id) {
                    a = d;
                    return
                }
            })
        }
        b = c.getItem(a);
        if (b && c.scrollIndex != a) {
            c._blur();
            baidu.dom.addClass(b, c.getClass("item-focus"));
            c.scrollIndex = a
        }
    },
    _blur: function() {
        var b = this,
        a = b.getItem(b.scrollIndex);
        if (a) {
            baidu.dom.removeClass(a, b.getClass("item-focus"));
            b.scrollIndex = -1
        }
    },
    _onMouse: function(b, a) {
        this.dispatchEvent("mouse" + b, {
            target: baidu.g(a)
        })
    },
    dispose: function() {
        var a = this;
        a.dispatchEvent("dispose");
        baidu.dom.remove(a.getMain());
        baidu.lang.Class.prototype.dispose.call(a)
    }
});
baidu.object.extend(baidu.ui.carousel.Carousel.prototype, {
    showButton: true,
    flip: "item",
    tplBtn: "<a class='#{class}' onclick=\"#{handler}\" href='javascript:void(0);'>#{content}</a>"
});
baidu.ui.carousel.Carousel.register(function(a) {
    a.btnLabel = a.btnLabel || {
        prev: "&lt;",
        next: "&gt;"
    };
    if (a.showButton) {
        a.addEventListener("onload",
        function() {
            baidu.dom.insertHTML(a.getMain(), "afterBegin", baidu.format(a.tplBtn, {
                "class": a.getClass("btn-base") + " " + a.getClass("btn-prev"),
                handler: a.getCallString("page" == a.flip ? "prevPage": "prev"),
                content: a.btnLabel.prev
            }));
            baidu.dom.insertHTML(a.getMain(), "beforeEnd", baidu.format(a.tplBtn, {
                "class": a.getClass("btn-base") + " " + a.getClass("btn-next"),
                handler: a.getCallString("page" == a.flip ? "nextPage": "next"),
                content: a.btnLabel.next
            }))
        })
    }
});
baidu.object.extend(baidu.ui.carousel.Carousel.prototype, {
    onbeforestartscroll: function(a) {
        this.focus(a.index)
    },
    prevPage: function() {
        this._gotoPage("prev")
    },
    nextPage: function() {
        this._gotoPage("next")
    },
    _gotoPage: function(g) {
        var d = this,
        c = Math.ceil(d.totalCount / d.pageSize),
        a = Math.ceil((d.scrollIndex + 1) / d.pageSize),
        f = "prev" == g ? (a <= 1 ? (d.isCycle ? c: 1) : a - 1) : (a >= c ? (d.isCycle ? 1 : c) : a + 1),
        b = (f - 1) * d.pageSize;
        d.scrollTo(b);
        d.dispatchEvent(g + "page")
    }
});
baidu.ui.carousel.Carousel.register(function(a) {
    if (a.autoScroll) {
        a.addEventListener("afterscroll",
        function() {
            a.autoScroll.timeOut = setTimeout(function() {
                var c, d, b, f;
                if ("page" == a.autoScroll.type.toLowerCase()) {
                    d = Math.ceil(a.totalCount / a.pageSize);
                    b = Math.ceil((a.scrollIndex + 1) / a.pageSize);
                    f = b >= d ? (a.isCycle ? 1 : d) : b + 1;
                    c = (f - 1) * a.pageSize
                } else {
                    c = a.scrollIndex >= a.totalCount - 1 ? (a.isCycle ? 0 : a.totalCount - 1) : a.scrollIndex + 1
                }
                a.scrollTo(c)
            },
            a.autoScroll.interval)
        })
    }
    a.addEventListener("dispose",
    function() {
        clearTimeout(a.autoScroll.timeOut)
    })
});
baidu.ui.carousel.Carousel.register(function(b) {
    if (b.data) {
        b.gridLayout = b.gridLayout ? (baidu.lang.isArray(b.gridLayout) ? {
            row: b.gridLayout[0],
            col: b.gridLayout[1]
        }: b.gridLayout) : {
            row: 3,
            col: 3
        };
        b._tableList = [];
        var c = b._formatData(b.data),
        a = b.contentText = [];
        baidu.array.each(c,
        function(f, d) {
            b._tableList.push(baidu.ui.table.create({
                data: f
            }));
            a.push({
                content: b._tableList[b._tableList.length - 1].getString()
            })
        });
        b.addEventListener("load",
        function() {
            baidu.array.each(b._tableList,
            function(f, d) {
                f.renderMain(b.getItem(d))
            })
        })
    }
});
baidu.object.extend(baidu.ui.carousel.Carousel.prototype, {
    _formatData: function(f) {
        var l = this,
        h = Math.ceil(f.length / (l.gridLayout.row * l.gridLayout.col)),
        m = [],
        b,
        n,
        a,
        g,
        d,
        c;
        for (g = 0; g < h; g++) {
            b = [];
            for (d = 0; d < l.gridLayout.row; d++) {
                n = [];
                for (c = 0; c < l.gridLayout.col; c++) {
                    a = f[g * l.gridLayout.row * l.gridLayout.col + d * l.gridLayout.col + c];
                    n.push(a ? a: "&nbsp;")
                }
                b.push({
                    content: n
                })
            }
            m.push(b)
        }
        return m
    },
    addTableItem: function(g, a) {
        var d = this,
        c, b = d._formatData(g),
        f = baidu.lang.isNumber(a) ? a: d.totalCount,
        h;
        if (b.length > 0) {
            c = baidu.ui.table.create({
                data: b[0]
            });
            Array.prototype.splice.apply(d.data, [f * d.gridLayout.row * d.gridLayout.col, 0].concat(g));
            d._tableList.splice(f, 0, c);
            h = baidu.dom.create("div");
            h.innerHTML = d._tableList[f].getString();
            d.addItem(h, a);
            c.renderMain(d.getItem(d.totalCount - 1))
        }
    },
    removeTableItem: function(b) {
        var f = this,
        c = f.getTable(b),
        d = 0,
        a;
        f.data.splice(b * f.gridLayout.row * f.gridLayout.col, f.gridLayout.row * f.gridLayout.col);
        f._tableList.splice(b, 1);
        f.removeItem(b);
        return c
    },
    getTable: function(a) {
        return this._tableList[a]
    }
});
baidu.object.extend(baidu.ui.carousel.Carousel.prototype, {
    onbeforestartscroll: function(a) {
        this.focus(a.index)
    },
    prev: function() {
        this._gotoItem("prev")
    },
    next: function() {
        this._gotoItem("next")
    },
    _gotoItem: function(g) {
        var d = this,
        b, c;
        if ("next" == g) {
            if (d.scrollIndex >= d.totalCount - 1) {
                b = d.isCycle ? 0 : d.totalCount - 1
            } else {
                b = d.scrollIndex + 1
            }
        } else {
            if (d.scrollIndex <= 0) {
                b = d.isCycle ? d.totalCount - 1 : 0
            } else {
                b = d.scrollIndex - 1
            }
        }
        c = d.getItem(b);
        if (c) {
            var a = c[d.axis[d.orientation].offsetPos] - d.getBody()[d.axis[d.orientation].scroll],
            f = c[d.axis[d.orientation].offsetSize];
            if (a < 0 || a + f > d.getBody()[d.axis[d.orientation].offsetSize]) {
                d.scrollTo(b, ("prev" == g ? 0 : d.pageSize - 1))
            } else {
                d.focus(b)
            }
            d.dispatchEvent(g + "item")
        }
    }
});
baidu.ui.carousel.Carousel.register(function(a) {
    a.addEventListener("onbeforescroll",
    function(b) {
        if (!baidu.fx.current(a.getBody())) {
            var d = 0,
            c = a.getItem(b.index),
            f = "vertical" == a.orientation;
            if (c) {
                d = a[a.axis[a.orientation].offsetSize] * (b.index - b.scrollOffset);
                baidu.fx.scrollTo(a.getBody(), {
                    x: (f ? 0 : d),
                    y: (f ? d: 0)
                },
                {
                    onbeforestart: function() {
                        a.dispatchEvent("onbeforestartscroll", {
                            index: b.index,
                            scrollOffset: b.scrollOffset
                        })
                    },
                    onafterfinish: function() {
                        a.dispatchEvent("onafterscroll", {
                            index: b.index,
                            scrollOffset: b.scrollOffset
                        })
                    }
                })
            }
        }
        b.returnValue = false
    })
});
baidu.ui.carousel.setup = function(b, a) {
    var b = baidu.g(b),
    a = a || {},
    d = baidu.dom.children(b);
    a.contentText = [];
    baidu.array.each(d,
    function(g, f) {
        a.contentText.push({
            content: g.innerHTML
        })
    });
    b.innerHTML = "";
    a.target = b;
    var c = new baidu.ui.carousel.Carousel(a);
    c.render();
    return c
};
baidu.ui.getAttribute = function(d) {
    var g = "data-tangram",
    j = d.getAttribute(g),
    c = {},
    f,
    b = baidu.string.trim;
    if (j) {
        j = j.split(";");
        f = j.length;
        for (; f--;) {
            var k = j[f],
            h = k.indexOf(":"),
            a = b(h >= 0 ? k.substring(0, h) : k),
            i = h >= 0 ? b(k.substring(h + 1)) || "true": "true";
            c[baidu.string.toCamelCase(b(a))] = /^\d+(\.\d+)?$/.test(i) ? i - 0 : i == "true" ? true: i == "false" ? false: i
        }
    }
    return c
};
baidu.ui.setup = function(f) {
    var d = 0,
    b = 0,
    j = f.getElementsByTagName("*"),
    h = [f],
    a,
    g,
    c;
    for (; f = j[d];) {
        h[++d] = f
    }
    for (d = 0; f = h[d++];) {
        if (baidu.dom.getParent(f)) {
            j = baidu.ui.getAttribute(f);
            if (g = j.ui) {
                c = baidu.ui[g];
                if (typeof c.setup == "function") {
                    c.setup(f, j)
                }
            }
        }
    }
};
baidu.ui.roundCorner = function(c, b) {
    var a = document.createElement("div");
    b = b || {};
    b.rcClass = b.rcClass || "tangram_rc_";
    a.className = b.rcClass + "container";
    a.style.position = "absolute";
    a.style.zIndex = -1;
    a.innerHTML = baidu.string.format('<table><tr><td class="#{0}lt"></td><td class="#{0}ct"></td><td class="#{0}rt"></td></tr><tr><td class="#{0}lc"></td><td class="#{0}cc"></td><td class="#{0}rc"></td></tr><tr><td class="#{0}bl"></td><td class="#{0}bc"></td><td class="#{0}br"></td></tr></table>', b.rcClass);
    c.parentNode.appendChild(a)
};
baidu.ui.provide = function(b, c) {
    var a = b.prototype.uiType;
    if (!baidu.ui[a][c]) {
        baidu.ui[a][c] = function() {
            var f = arguments.length,
            g = arguments[f - 1],
            d = [].slice.call(arguments, 0, f - 1);
            var h = new baidu.ui[a][a.replace(/\b\w+\b/g,
            function(i) {
                return i.substring(0, 1).toUpperCase() + i.substring(1)
            })](g);
            return h[c].apply(h, d)
        }
    }
};