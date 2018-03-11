/**
 * SHARE.JS
 */
!function(a, b) {
    function c(a, b) {
        for (var c in b) {
            var d = Object.prototype.hasOwnProperty;
            if (d.call(b, c) && b[c] === a) return c
        }
        return -1
    }
    function d(a, b) {
        for (var d = function(a, b) {
            if (a.getElementsByClassName) return a.getElementsByClassName(b);
            for (var c = [], d = new RegExp("(^| )" + b + "( |$)"), e = a.getElementsByTagName("*"), f = 0, g = e.length; g > f; f++) d.test(e[f].className) && c.push(e[f]);
            return c
        }, e = function(a, b) {
            for (var c = []; b.length;) {
                var e, f = b.shift(),
                    g = a.split("")[0];
                if ("#" === g) e = f.getElementById(a.replace(/^#/, "")), e && (e = [e]);
                else if ("." === g) e = d(f, a.replace(/^\./, "")), e && (e = [].slice.call(e));
                else {
                    e = [];
                    var h = f.getElementsByTagName(a);
                    h && k(h, function() {
                        e.push(this)
                    })
                }
                e && (c = c.concat(e))
            }
            return c
        }, f = function(a) {
            for (var b, d = []; a.length;) b = a.shift(), -1 === c(b, d) && d.push(b);
            return d
        }, g = a.split(","), h = []; g.length;) {
            var i = g.shift().replace(/^\s+|\s+$/g, ""),
                j = i.split(" "),
                l = [document];
            b && (l = J.Array(b) ? b.slice() : [b]);
            a: for (; j.length && (l = e(j.shift(), l), l.length););
            h = h.concat(l)
        }
        return f(h)
    }
    function e(a, b) {
        for (var c = []; a.length;) {
            var d = a.shift();
            i(d, b) || c.push(d)
        }
        return c
    }
    function f(a, b) {
        var c = Object.prototype.hasOwnProperty;
        for (var d in b) c.call(b, d) && (a[d] = b[d]);
        return a
    }
    function g(a, b, c, d) {
        var e = J.Array(a) ? a : [a],
            f = b.split(" ");
        k(e, function(a, b) {
            k(f, function(a, e) {
                b.addEventListener ? b.addEventListener(e, c, d) : b.attachEvent && b.attachEvent("on" + e, c)
            })
        })
    }
    function h(b, c) {
        for (var d = J.Array(b) ? b : [b], e = Object.prototype.hasOwnProperty, f = 0, g = d.length; g > f; f++) {
            var h, i, b = d[f];
            if (J.Object(c)) for (h in c) e.call(c, h) && (i = c[h], b.style[h] = "function" == typeof i ? i.call(b, h) : i);
            else {
                if (3 !== arguments.length) return b.style[c] ? b.style[c] : b.currentStyle ? b.currentStyle[c] : a.getComputedStyle(b, null)[c];
                b.style[arguments[1]] = arguments[2]
            }
        }
    }
    function i(a, b) {
        var c = J.Array(a) ? a[0] : a;
        return c.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
    }
    function j(a, b) {
        var c = J.Array(a) ? a : [a];
        k(c, function(a, c) {
            i(c, b) || (c.className += " " + b)
        })
    }
    function k(a, b) {
        for (var c = 0, d = a.length; d > c; c++) b.call(a[c], c, a[c])
    }
    function m(b) {
        if (!b) return !1;
        if (a.JSON && a.JSON.stringify) return a.JSON.stringify(b);
        var c = [],
            d = function(a) {
                return "object" == typeof a && null !== a ? m(a) : (a || (a = ""), a.replace && a.replace('"', '\\"'), /^(string|number)$/.test(typeof a) ? '"' + a + '"' : a)
            };
        for (var e in b) {
            var f = Object.prototype.hasOwnProperty;
            f.call(b, e) && c.push('"' + e + '":' + d(b[e]))
        }
        return "{" + c.join(",") + "}"
    }
    function n(a) {
        for (var b = {}, c = a.substr(a.indexOf("?") + 1).split("&"), d = 0, e = c.length; e > d; d++) {
            var f = c[d],
                g = f.split("=");
            b[g[0]] = g[1]
        }
        return b
    }
    function o(a, c, d, e) {
        //e = e || 3e4;
        //var f = b.createElement("iframe"),
        //    g = !1;
        //f.onload = function() {
        //    !g && d && d(!0, "success"), g = !0, f.parentNode.removeChild(f)
        //}, setTimeout(function() {
        //    !g && d && d(!1, "timeout")
        //}, e), f.src = a + "?" + p(c), f.style.display = "none", b.body.appendChild(f)
    }
    function p(a) {
        var b = [];
        if (a.constructor === Array) for (var c = 0; c < a.length; c++) b.push(a[c].name + "=" + encodeURIComponent(a[c].value));
        else for (var d in a) b.push(d + "=" + encodeURIComponent(a[d]));
        return b.join("&")
    }
    function q() {
        var a = 0;
        if (b.body.clientWidth && b.documentElement.clientWidth) var a = b.body.clientWidth < b.documentElement.clientWidth ? b.body.clientWidth : b.documentElement.clientWidth;
        else var a = b.body.clientWidth > b.documentElement.clientWidth ? b.body.clientWidth : b.documentElement.clientWidth;
        var c = 0;
        if (b.body.clientHeight && b.documentElement.clientHeight) var c = b.body.clientHeight < b.documentElement.clientHeight ? b.body.clientHeight : b.documentElement.clientHeight;
        else var c = b.body.clientHeight > b.documentElement.clientHeight ? b.body.clientHeight : b.documentElement.clientHeight;
        return {
            width: a,
            height: c
        }
    }
    function r() {
        var b = a.navigator.userAgent.toLowerCase();
        return b.match(/MicroMessenger/i) ? !0 : !1
    }
    function s(a, b) {
        a.attachEvent ? a.attachEvent("onload", b) : setTimeout(function() {
            t(a, b)
        }, 0)
    }
    function t(b, c) {
        if (!c.isCalled) {
            var d = !1;
            if (/webkit/i.test(a.navigator.userAgent)) b.sheet && (d = !0);
            else if (b.sheet) try {
                b.sheet.cssRules && (d = !0)
            } catch (e) {
                1e3 === e.code && (d = !0)
            }
            d ? setTimeout(function() {
                c()
            }, 1) : setTimeout(function() {
                t(b, c)
            }, 1)
        }
    }
    function u(b) {
        var c, d = b.currentStyle && b.currentStyle.backgroundImage;
        if (d && null !== d.match(/\.(png|jpg|jpeg|gif)/i)) {
            c = d.substring(5, d.length - 2);
            var e = a.navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
            e.match && e.match(/MSIE[5678]/) && (b.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + c + "', sizingMethod='scale');", b.style.backgroundImage = "none")
        }
    }
    function v(a) {
        function c(a) {
            for (var c = a.offsetLeft, d = a.offsetParent; null !== d;) c += d.offsetLeft, d = d.offsetParent;
            var e;
            return e = b.body.scrollTop ? b.body.scrollLeft : b.documentElement.scrollLeft, c - e
        }
        function d(a) {
            for (var c = a.offsetTop, d = a.offsetParent; null !== d;) c += d.offsetTop, d = d.offsetParent;
            var e;
            return e = b.body.scrollTop ? b.body.scrollTop : b.documentElement.scrollTop, c - e
        }
        return {
            left: c(a),
            top: d(a)
        }
    }
    function w(a) {
        var a = a.toLowerCase();
        return a = a.replace(/\b\w+\b/g, function(a) {
            return a.substring(0, 1).toUpperCase() + a.substring(1)
        })
    }
    function x(a) {
        var c = b.createElement("div").style,
            d = w(a);
        return "webkit" + d in c ? "webkit" + d : "moz" + d in c ? "moz" + d : "o" + d in c ? "o" + d : "ms" + d in c ? "ms" + d : a
    }
    function y(b, c, d) {
        c = c || "debug", c = "mob-share-" + c, (E.debug && !d || G) && a.console && a.console.log(c.toUpperCase() + ": " + b)
    }
    function z(a, b) {
        if (!E.appkey)
            E.appkey= 'share.js';
        var c = "Normal";
        E.platforms[a] && E.platforms[a].construct && (c = E.platforms[a].construct);
        var d = new N[c](a);
        return b && d.send(b), d
    }
    function C() {
        var c = {
            url: "",
            title: "",
            description: "",
            reason: "",
            pic: ""
        };
        c.url = a.location.href, b.title && (c.title = b.title);
        for (var d = b.getElementsByTagName("meta"), e = 0, f = d.length; f > e; e++) {
            var g = d[e].getAttribute("name");
            if (g && "description" === g.toLowerCase()) {
                c.description = d[e].getAttribute("content");
                break
            }
        }
        return c
    }
    var D, E = {
            debug: !1,
            platforms: {
                weibo: {
                    id: 1,
                    api: "http://service.weibo.com/share/share.php",
                    handler: function(a) {
                        return {
                            title: a.title + "  " + a.description,
                            url: a.url,
                            pic: a.pic
                        }
                    }
                },
                qzone: {
                    id: 6,
                    api: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
                    handler: function(a) {
                        return {
                            summary: a.description,
                            desc: a.reason ? a.reason : a.description,
                            title: a.title,
                            url: a.url,
                            pics: a.pic,
                            otype: "share"
                        }
                    }
                },
                qq: {
                    id: 24,
                    api: "http://connect.qq.com/widget/shareqq/index.html",
                    handler: function(a) {
                        return {
                            desc: a.reason ? a.reason : a.description,
                            summary: a.description,
                            title: a.title,
                            url: a.url,
                            pics: a.pic
                        }
                    }
                },
                douban: {
                    id: 5,
                    api: "http://www.douban.com/share/service",
                    handler: function(a) {
                        return {
                            href: a.url,
                            text: a.description,
                            name: a.title,
                            title: a.title,
                            image: a.pic
                        }
                    }
                },
                facebook: {
                    id: 10,
                    api: "https://www.facebook.com/sharer.php",
                    mapi: "https://m.facebook.com/sharer.php",
                    handler: function(a) {
                        return {
                            u: a.url,
                            t: a.title
                        }
                    }
                },
                twitter: {
                    id: 11,
                    api: "https://twitter.com/intent/tweet",
                    handler: function(a) {
                        return {
                            text: a.title + "  " + a.description,
                            url: a.url
                        }
                    }
                },
                tieba: {
                    id: 49,
                    api: "http://tieba.baidu.com/f/commit/share/openShareApi",
                    handler: function(a) {
                        return {
                            desc: a.description,
                            title: a.title,
                            url: a.url,
                            pic: a.pic
                        }
                    }
                },
                weixin: {
                    id: 22,
                    construct: "Weixin"
                },
                pocket: {
                    id: 26,
                    api: "https://getpocket.com/edit",
                    handler: function(a) {
                        return {
                            title: a.title + "  " + a.description,
                            url: a.url
                        }
                    }
                },
                evernote: {
                    id: 12,
                    api: "https://www.evernote.com/clip.action",
                    handler: function(a) {
                        return {
                            title: a.title + "  " + a.description,
                            url: a.url
                        }
                    }
                },
                google: {
                    id: 14,
                    api: "https://plus.google.com/share",
                    handler: function(a) {
                        return {
                            t: a.title + "  " + a.description,
                            url: a.url
                        }
                    }
                },
                youdao: {
                    id: 27,
                    api: "http://note.youdao.com/memory",
                    handler: function(a) {
                        return {
                            title: a.title,
                            summary: a.description,
                            url: a.url,
                            product: "ShareSDK"
                        }
                    }
                },
                pinterest: {
                    id: 30,
                    api: "https://www.pinterest.com/pin/create/bookmarklet",
                    handler: function(a) {
                        return {
                            title: a.title + "  " + a.description,
                            url: a.url,
                            media: a.pic,
                            alt: ""
                        }
                    }
                },
                tumblr: {
                    id: 17,
                    api: "https://www.tumblr.com/widgets/share/tool",
                    handler: function(a) {
                        return {
                            title: a.title + "  " + a.description,
                            url: a.url,
                            shareSource: "legacy",
                            canonicalUrl: ""
                        }
                    }
                },
                instapaper: {
                    id: 25,
                    api: "https://www.instapaper.com/edit",
                    handler: function(a) {
                        return {
                            title: a.title,
                            url: a.url,
                            description: a.description
                        }
                    }
                },
                linkedin: {
                    id: 16,
                    api: "http://www.linkedin.com/shareArticle",
                    handler: function(a) {
                        return {
                            title: a.title,
                            url: a.url,
                            summary: a.description,
                            armin: "armin",
                            ro: "true",
                            mini: "true",
                            source: ""
                        }
                    }
                }
            },
            appkey: null,
            params: {},
            callback: function() {},
            staticDir: null
        },
        G = !1,
        H = !! a.navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
    D = function() {
        var a = "vh739KAwkGnyHZ0RFsEdMWc62OgeTmP/zolqaUVYj4Sfur8NiCbpLJ+51D=xBtQIX".split(""),
            b = function(a) {
                for (var b = []; a > 0;) {
                    var c = a % 2;
                    a = Math.floor(a / 2), b.push(c)
                }
                return b.reverse(), b
            },
            c = function(a) {
                for (var b = 0, c = 0, d = a.length - 1; d >= 0; --d) {
                    var e = a[d];
                    1 == e && (b += Math.pow(2, c)), ++c
                }
                return b
            },
            d = function(a, b) {
                for (var c = 8 - (a + 1) + 6 * (a - 1), d = b.length, e = c - d; --e >= 0;) b.unshift(0);
                for (var f = [], g = a; --g >= 0;) f.push(1);
                f.push(0);
                for (var h = 0, i = 8 - (a + 1); i > h; ++h) f.push(b[h]);
                for (var j = 0; a - 1 > j; ++j) {
                    f.push(1), f.push(0);
                    for (var k = 6; --k >= 0;) f.push(b[h++])
                }
                return f
            },
            e = {
                encode: function(e) {
                    for (var f = [], g = [], h = 0, i = e.length; i > h; ++h) {
                        var j = e.charCodeAt(h),
                            k = b(j);
                        if (128 > j) {
                            for (var l = 8 - k.length; --l >= 0;) k.unshift(0);
                            g = g.concat(k)
                        } else j >= 128 && 2047 >= j ? g = g.concat(d(2, k)) : j >= 2048 && 65535 >= j ? g = g.concat(d(3, k)) : j >= 65536 && 2097151 >= j ? g = g.concat(d(4, k)) : j >= 2097152 && 67108863 >= j ? g = g.concat(d(5, k)) : j >= 4e6 && 2147483647 >= j && (g = g.concat(d(6, k)))
                    }
                    for (var m = 0, h = 0, i = g.length; i > h; h += 6) {
                        var n = h + 6 - i;
                        2 == n ? m = 2 : 4 == n && (m = 4);
                        for (var o = m; --o >= 0;) g.push(0);
                        f.push(c(g.slice(h, h + 6)))
                    }
                    for (var p = "", h = 0, i = f.length; i > h; ++h) p += a[f[h]];
                    for (var h = 0, i = m / 2; i > h; ++h) p += a[a.length - 1];
                    return p
                },
                decode: function(d) {
                    var e = d.length,
                        f = 0;
                    "=" == d.charAt(e - 1) && ("=" == d.charAt(e - 2) ? (f = 4, d = d.substring(0, e - 2)) : (f = 2, d = d.substring(0, e - 1)));
                    for (var g = [], h = 0, i = d.length; i > h; ++h) for (var j = d.charAt(h), k = 0, l = a.length; l > k; ++k) if (j == a[k]) {
                        var m = b(k),
                            n = m.length;
                        if (6 - n > 0) for (var o = 6 - n; o > 0; --o) m.unshift(0);
                        g = g.concat(m);
                        break
                    }
                    f > 0 && (g = g.slice(0, g.length - f));
                    for (var p = [], q = [], h = 0, i = g.length; i > h;) if (0 == g[h]) p = p.concat(c(g.slice(h, h + 8))), h += 8;
                    else {
                        for (var r = 0; i > h && 1 == g[h];)++r, ++h;
                        for (q = q.concat(g.slice(h + 1, h + 8 - r)), h += 8 - r; r > 1;) q = q.concat(g.slice(h + 2, h + 8)), h += 8, --r;
                        p = p.concat(c(q)), q = []
                    }
                    for (var s = "", h = 0, i = p.length; i > h; ++h) s += String.fromCharCode(p[h]);
                    return s
                }
            };
        return e
    }();
    var I;
    I = function() {
        function a(a) {
            return 128 > a ? [a] : 2048 > a ? (c0 = 192 + (a >> 6), c1 = 128 + (63 & a), [c0, c1]) : (c0 = 224 + (a >> 12), c1 = 128 + (a >> 6 & 63), c2 = 128 + (63 & a), [c0, c1, c2])
        }
        function b(b) {
            for (var c = [], d = 0; d < b.length; d++) for (var e = b.charCodeAt(d), f = a(e), g = 0; g < f.length; g++) c.push(f[g]);
            return c
        }
        function c(a, c) {
            this.typeNumber = -1, this.errorCorrectLevel = c, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.rsBlocks = null, this.totalDataCount = -1, this.data = a, this.utf8bytes = b(a), this.make()
        }
        function d(a, b) {
            if (void 0 == a.length) throw new Error(a.length + "/" + b);
            for (var c = 0; c < a.length && 0 == a[c];) c++;
            this.num = new Array(a.length - c + b);
            for (var d = 0; d < a.length - c; d++) this.num[d] = a[d + c]
        }
        function e() {
            this.buffer = new Array, this.length = 0
        }
        var f = [],
            g = function(a) {
                function b(a, b) {
                    var c = Object.prototype.hasOwnProperty;
                    for (var d in b) c.call(b, d) && (a[d] = b[d]);
                    return a
                }
                "string" == typeof a && (a = {
                    text: a
                }), this.options = b({
                    text: "",
                    render: "",
                    width: 256,
                    height: 256,
                    correctLevel: 3,
                    background: "#ffffff",
                    foreground: "#000000"
                }, a);
                for (var d = null, e = 0, g = f.length; g > e; e++) if (f[e].text == this.options.text && f[e].text.correctLevel == this.options.correctLevel) {
                    d = f[e].obj;
                    break
                }
                if (e == g && (d = new c(this.options.text, this.options.correctLevel), f.push({
                        text: this.options.text,
                        correctLevel: this.options.correctLevel,
                        obj: d
                    })), this.options.render) switch (this.options.render) {
                    case "canvas":
                        return this.createCanvas(d);
                    case "table":
                        return this.createTable(d);
                    case "svg":
                        return this.createSVG(d);
                    default:
                        return this.createDefault(d)
                }
                return this.createDefault(d)
            };
        g.prototype.createDefault = function(a) {
            var b = document.createElement("canvas");
            return b.getContext ? this.createCanvas(a) : (SVG_NS = "http://www.w3.org/2000/svg", document.createElementNS && document.createElementNS(SVG_NS, "svg").createSVGRect ? this.createSVG(a) : this.createTable(a))
        }, g.prototype.createCanvas = function(a) {
            var b = document.createElement("canvas");
            b.width = this.options.width, b.height = this.options.height;
            for (var c = b.getContext("2d"), d = (this.options.width / a.getModuleCount()).toPrecision(4), e = this.options.height / a.getModuleCount().toPrecision(4), f = 0; f < a.getModuleCount(); f++) for (var g = 0; g < a.getModuleCount(); g++) {
                c.fillStyle = a.modules[f][g] ? this.options.foreground : this.options.background;
                var h = Math.ceil((g + 1) * d) - Math.floor(g * d),
                    i = Math.ceil((f + 1) * d) - Math.floor(f * d);
                c.fillRect(Math.round(g * d), Math.round(f * e), h, i)
            }
            return b
        }, g.prototype.createTable = function(a) {
            var b = [];
            b.push('<table style="border:0px; margin:0px; padding:0px; border-collapse:collapse; background-color: ' + this.options.background + ';">');
            var c = -1,
                d = -1,
                e = -1,
                f = -1;
            c = e = Math.floor(this.options.width / a.getModuleCount()), d = f = Math.floor(this.options.height / a.getModuleCount()), 0 >= e && (c = a.getModuleCount() < 80 ? 2 : 1), 0 >= f && (d = a.getModuleCount() < 80 ? 2 : 1), foreTd = '<td style="border:0px; margin:0px; padding:0px; width:' + c + "px; background-color: " + this.options.foreground + '"></td>', backTd = '<td style="border:0px; margin:0px; padding:0px; width:' + c + "px; background-color: " + this.options.background + '"></td>', l = a.getModuleCount();
            for (var g = 0; g < l; g++) {
                b.push('<tr style="border:0px; margin:0px; padding:0px; height: ' + d + 'px">');
                for (var h = 0; h < l; h++) b.push(a.modules[g][h] ? foreTd : backTd);
                b.push("</tr>")
            }
            b.push("</table>");
            var i = document.createElement("span");
            return i.innerHTML = b.join(""), i.firstChild
        }, g.prototype.createSVG = function(a) {
            for (var b, c, d, e, f = a.getModuleCount(), g = this.options.height / this.options.width, h = '<svg xmlns="http://www.w3.org/2000/svg" width="' + this.options.width + 'px" height="' + this.options.height + 'px" viewbox="0 0 ' + 10 * f + " " + 10 * f * g + '">', i = "<path ", j = ' style="stroke-width:0.5;stroke:' + this.options.foreground + ";fill:" + this.options.foreground + ';"></path>', k = ' style="stroke-width:0.5;stroke:' + this.options.background + ";fill:" + this.options.background + ';"></path>', l = 0; f > l; l++) for (var m = 0; f > m; m++) b = 10 * m, d = 10 * l * g, c = 10 * (m + 1), e = 10 * (l + 1) * g, h += i + 'd="M ' + b + "," + d + " L " + c + "," + d + " L " + c + "," + e + " L " + b + "," + e + ' Z"', h += a.modules[l][m] ? j : k;
            h += "</svg>";
            var n = document.createElement("span");
            return n.innerHTML = h, n.firstChild
        }, c.prototype = {
            constructor: c,
            getModuleCount: function() {
                return this.moduleCount
            },
            make: function() {
                this.getRightType(), this.dataCache = this.createData(), this.createQrcode()
            },
            makeImpl: function(a) {
                this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
                for (var b = 0; b < this.moduleCount; b++) this.modules[b] = new Array(this.moduleCount);
                this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(!0, a), this.typeNumber >= 7 && this.setupTypeNumber(!0), this.mapData(this.dataCache, a)
            },
            setupPositionProbePattern: function(a, b) {
                for (var c = -1; 7 >= c; c++) if (!(-1 >= a + c || this.moduleCount <= a + c)) for (var d = -1; 7 >= d; d++) - 1 >= b + d || this.moduleCount <= b + d || (this.modules[a + c][b + d] = c >= 0 && 6 >= c && (0 == d || 6 == d) || d >= 0 && 6 >= d && (0 == c || 6 == c) || c >= 2 && 4 >= c && d >= 2 && 4 >= d ? !0 : !1)
            },
            createQrcode: function() {
                for (var a = 0, b = 0, c = null, d = 0; 8 > d; d++) {
                    this.makeImpl(d);
                    var e = j.getLostPoint(this);
                    (0 == d || a > e) && (a = e, b = d, c = this.modules)
                }
                this.modules = c, this.setupTypeInfo(!1, b), this.typeNumber >= 7 && this.setupTypeNumber(!1)
            },
            setupTimingPattern: function() {
                for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = a % 2 == 0, null == this.modules[6][a] && (this.modules[6][a] = a % 2 == 0))
            },
            setupPositionAdjustPattern: function() {
                for (var a = j.getPatternPosition(this.typeNumber), b = 0; b < a.length; b++) for (var c = 0; c < a.length; c++) {
                    var d = a[b],
                        e = a[c];
                    if (null == this.modules[d][e]) for (var f = -2; 2 >= f; f++) for (var g = -2; 2 >= g; g++) this.modules[d + f][e + g] = -2 == f || 2 == f || -2 == g || 2 == g || 0 == f && 0 == g ? !0 : !1
                }
            },
            setupTypeNumber: function(a) {
                for (var b = j.getBCHTypeNumber(this.typeNumber), c = 0; 18 > c; c++) {
                    var d = !a && 1 == (b >> c & 1);
                    this.modules[Math.floor(c / 3)][c % 3 + this.moduleCount - 8 - 3] = d, this.modules[c % 3 + this.moduleCount - 8 - 3][Math.floor(c / 3)] = d
                }
            },
            setupTypeInfo: function(a, b) {
                for (var c = h[this.errorCorrectLevel] << 3 | b, d = j.getBCHTypeInfo(c), e = 0; 15 > e; e++) {
                    var f = !a && 1 == (d >> e & 1);
                    6 > e ? this.modules[e][8] = f : 8 > e ? this.modules[e + 1][8] = f : this.modules[this.moduleCount - 15 + e][8] = f;
                    var f = !a && 1 == (d >> e & 1);
                    8 > e ? this.modules[8][this.moduleCount - e - 1] = f : 9 > e ? this.modules[8][15 - e - 1 + 1] = f : this.modules[8][15 - e - 1] = f
                }
                this.modules[this.moduleCount - 8][8] = !a
            },
            createData: function() {
                var a = new e,
                    b = this.typeNumber > 9 ? 16 : 8;
                a.put(4, 4), a.put(this.utf8bytes.length, b);
                for (var d = 0, f = this.utf8bytes.length; f > d; d++) a.put(this.utf8bytes[d], 8);
                for (a.length + 4 <= 8 * this.totalDataCount && a.put(0, 4); a.length % 8 != 0;) a.putBit(!1);
                for (;;) {
                    if (a.length >= 8 * this.totalDataCount) break;
                    if (a.put(c.PAD0, 8), a.length >= 8 * this.totalDataCount) break;
                    a.put(c.PAD1, 8)
                }
                return this.createBytes(a)
            },
            createBytes: function(a) {
                for (var b = 0, c = 0, e = 0, f = this.rsBlock.length / 3, g = new Array, h = 0; f > h; h++) for (var i = this.rsBlock[3 * h + 0], k = this.rsBlock[3 * h + 1], l = this.rsBlock[3 * h + 2], m = 0; i > m; m++) g.push([l, k]);
                for (var n = new Array(g.length), o = new Array(g.length), p = 0; p < g.length; p++) {
                    var q = g[p][0],
                        r = g[p][1] - q;
                    c = Math.max(c, q), e = Math.max(e, r), n[p] = new Array(q);
                    for (var h = 0; h < n[p].length; h++) n[p][h] = 255 & a.buffer[h + b];
                    b += q;
                    var s = j.getErrorCorrectPolynomial(r),
                        t = new d(n[p], s.getLength() - 1),
                        u = t.mod(s);
                    o[p] = new Array(s.getLength() - 1);
                    for (var h = 0; h < o[p].length; h++) {
                        var v = h + u.getLength() - o[p].length;
                        o[p][h] = v >= 0 ? u.get(v) : 0
                    }
                }
                for (var w = new Array(this.totalDataCount), x = 0, h = 0; c > h; h++) for (var p = 0; p < g.length; p++) h < n[p].length && (w[x++] = n[p][h]);
                for (var h = 0; e > h; h++) for (var p = 0; p < g.length; p++) h < o[p].length && (w[x++] = o[p][h]);
                return w
            },
            mapData: function(a, b) {
                for (var c = -1, d = this.moduleCount - 1, e = 7, f = 0, g = this.moduleCount - 1; g > 0; g -= 2) for (6 == g && g--;;) {
                    for (var h = 0; 2 > h; h++) if (null == this.modules[d][g - h]) {
                        var i = !1;
                        f < a.length && (i = 1 == (a[f] >>> e & 1));
                        var k = j.getMask(b, d, g - h);
                        k && (i = !i), this.modules[d][g - h] = i, e--, -1 == e && (f++, e = 7)
                    }
                    if (d += c, 0 > d || this.moduleCount <= d) {
                        d -= c, c = -c;
                        break
                    }
                }
            }
        }, c.PAD0 = 236, c.PAD1 = 17;
        for (var h = [1, 0, 3, 2], i = {
            PATTERN000: 0,
            PATTERN001: 1,
            PATTERN010: 2,
            PATTERN011: 3,
            PATTERN100: 4,
            PATTERN101: 5,
            PATTERN110: 6,
            PATTERN111: 7
        }, j = {
            PATTERN_POSITION_TABLE: [
                [],
                [6, 18],
                [6, 22],
                [6, 26],
                [6, 30],
                [6, 34],
                [6, 22, 38],
                [6, 24, 42],
                [6, 26, 46],
                [6, 28, 50],
                [6, 30, 54],
                [6, 32, 58],
                [6, 34, 62],
                [6, 26, 46, 66],
                [6, 26, 48, 70],
                [6, 26, 50, 74],
                [6, 30, 54, 78],
                [6, 30, 56, 82],
                [6, 30, 58, 86],
                [6, 34, 62, 90],
                [6, 28, 50, 72, 94],
                [6, 26, 50, 74, 98],
                [6, 30, 54, 78, 102],
                [6, 28, 54, 80, 106],
                [6, 32, 58, 84, 110],
                [6, 30, 58, 86, 114],
                [6, 34, 62, 90, 118],
                [6, 26, 50, 74, 98, 122],
                [6, 30, 54, 78, 102, 126],
                [6, 26, 52, 78, 104, 130],
                [6, 30, 56, 82, 108, 134],
                [6, 34, 60, 86, 112, 138],
                [6, 30, 58, 86, 114, 142],
                [6, 34, 62, 90, 118, 146],
                [6, 30, 54, 78, 102, 126, 150],
                [6, 24, 50, 76, 102, 128, 154],
                [6, 28, 54, 80, 106, 132, 158],
                [6, 32, 58, 84, 110, 136, 162],
                [6, 26, 54, 82, 110, 138, 166],
                [6, 30, 58, 86, 114, 142, 170]
            ],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function(a) {
                for (var b = a << 10; j.getBCHDigit(b) - j.getBCHDigit(j.G15) >= 0;) b ^= j.G15 << j.getBCHDigit(b) - j.getBCHDigit(j.G15);
                return (a << 10 | b) ^ j.G15_MASK
            },
            getBCHTypeNumber: function(a) {
                for (var b = a << 12; j.getBCHDigit(b) - j.getBCHDigit(j.G18) >= 0;) b ^= j.G18 << j.getBCHDigit(b) - j.getBCHDigit(j.G18);
                return a << 12 | b
            },
            getBCHDigit: function(a) {
                for (var b = 0; 0 != a;) b++, a >>>= 1;
                return b
            },
            getPatternPosition: function(a) {
                return j.PATTERN_POSITION_TABLE[a - 1]
            },
            getMask: function(a, b, c) {
                switch (a) {
                    case i.PATTERN000:
                        return (b + c) % 2 == 0;
                    case i.PATTERN001:
                        return b % 2 == 0;
                    case i.PATTERN010:
                        return c % 3 == 0;
                    case i.PATTERN011:
                        return (b + c) % 3 == 0;
                    case i.PATTERN100:
                        return (Math.floor(b / 2) + Math.floor(c / 3)) % 2 == 0;
                    case i.PATTERN101:
                        return b * c % 2 + b * c % 3 == 0;
                    case i.PATTERN110:
                        return (b * c % 2 + b * c % 3) % 2 == 0;
                    case i.PATTERN111:
                        return (b * c % 3 + (b + c) % 2) % 2 == 0;
                    default:
                        throw new Error("bad maskPattern:" + a)
                }
            },
            getErrorCorrectPolynomial: function(a) {
                for (var b = new d([1], 0), c = 0; a > c; c++) b = b.multiply(new d([1, k.gexp(c)], 0));
                return b
            },
            getLostPoint: function(a) {
                for (var b = a.getModuleCount(), c = 0, d = 0, e = 0; b > e; e++) for (var f = 0, g = a.modules[e][0], h = 0; b > h; h++) {
                    var i = a.modules[e][h];
                    if (b - 6 > h && i && !a.modules[e][h + 1] && a.modules[e][h + 2] && a.modules[e][h + 3] && a.modules[e][h + 4] && !a.modules[e][h + 5] && a.modules[e][h + 6] && (b - 10 > h ? a.modules[e][h + 7] && a.modules[e][h + 8] && a.modules[e][h + 9] && a.modules[e][h + 10] && (c += 40) : h > 3 && a.modules[e][h - 1] && a.modules[e][h - 2] && a.modules[e][h - 3] && a.modules[e][h - 4] && (c += 40)), b - 1 > e && b - 1 > h) {
                        var j = 0;
                        i && j++, a.modules[e + 1][h] && j++, a.modules[e][h + 1] && j++, a.modules[e + 1][h + 1] && j++, (0 == j || 4 == j) && (c += 3)
                    }
                    g ^ i ? f++ : (g = i, f >= 5 && (c += 3 + f - 5), f = 1), i && d++
                }
                for (var h = 0; b > h; h++) for (var f = 0, g = a.modules[0][h], e = 0; b > e; e++) {
                    var i = a.modules[e][h];
                    b - 6 > e && i && !a.modules[e + 1][h] && a.modules[e + 2][h] && a.modules[e + 3][h] && a.modules[e + 4][h] && !a.modules[e + 5][h] && a.modules[e + 6][h] && (b - 10 > e ? a.modules[e + 7][h] && a.modules[e + 8][h] && a.modules[e + 9][h] && a.modules[e + 10][h] && (c += 40) : e > 3 && a.modules[e - 1][h] && a.modules[e - 2][h] && a.modules[e - 3][h] && a.modules[e - 4][h] && (c += 40)), g ^ i ? f++ : (g = i, f >= 5 && (c += 3 + f - 5), f = 1)
                }
                var k = Math.abs(100 * d / b / b - 50) / 5;
                return c += 10 * k
            }
        }, k = {
            glog: function(a) {
                if (1 > a) throw new Error("glog(" + a + ")");
                return k.LOG_TABLE[a]
            },
            gexp: function(a) {
                for (; 0 > a;) a += 255;
                for (; a >= 256;) a -= 255;
                return k.EXP_TABLE[a]
            },
            EXP_TABLE: new Array(256),
            LOG_TABLE: new Array(256)
        }, m = 0; 8 > m; m++) k.EXP_TABLE[m] = 1 << m;
        for (var m = 8; 256 > m; m++) k.EXP_TABLE[m] = k.EXP_TABLE[m - 4] ^ k.EXP_TABLE[m - 5] ^ k.EXP_TABLE[m - 6] ^ k.EXP_TABLE[m - 8];
        for (var m = 0; 255 > m; m++) k.LOG_TABLE[k.EXP_TABLE[m]] = m;
        var RS_BLOCK_TABLE = [];
        return d.prototype = {
            get: function(a) {
                return this.num[a]
            },
            getLength: function() {
                return this.num.length
            },
            multiply: function(a) {
                for (var b = new Array(this.getLength() + a.getLength() - 1), c = 0; c < this.getLength(); c++) for (var e = 0; e < a.getLength(); e++) b[c + e] ^= k.gexp(k.glog(this.get(c)) + k.glog(a.get(e)));
                return new d(b, 0)
            },
            mod: function(a) {
                var b = this.getLength(),
                    c = a.getLength();
                if (0 > b - c) return this;
                for (var e = new Array(b), f = 0; b > f; f++) e[f] = this.get(f);
                for (; e.length >= c;) {
                    for (var g = k.glog(e[0]) - k.glog(a.get(0)), f = 0; f < a.getLength(); f++) e[f] ^= k.gexp(k.glog(a.get(f)) + g);
                    for (; 0 == e[0];) e.shift()
                }
                return new d(e, 0)
            }
        }, RS_BLOCK_TABLE = [
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12],
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16]
        ], c.prototype.getRightType = function() {
            for (var a = 1; 41 > a; a++) {
                var b = RS_BLOCK_TABLE[4 * (a - 1) + this.errorCorrectLevel];
                if (void 0 == b) throw new Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + this.errorCorrectLevel);
                for (var c = b.length / 3, d = 0, e = 0; c > e; e++) {
                    var f = b[3 * e + 0],
                        g = b[3 * e + 2];
                    d += g * f
                }
                var h = a > 9 ? 2 : 1;
                if (this.utf8bytes.length + h < d || 40 == a) {
                    this.typeNumber = a, this.rsBlock = b, this.totalDataCount = d;
                    break
                }
            }
        }, e.prototype = {
            get: function(a) {
                var b = Math.floor(a / 8);
                return this.buffer[b] >>> 7 - a % 8 & 1
            },
            put: function(a, b) {
                for (var c = 0; b > c; c++) this.putBit(a >>> b - c - 1 & 1)
            },
            putBit: function(a) {
                var b = Math.floor(this.length / 8);
                this.buffer.length <= b && this.buffer.push(0), a && (this.buffer[b] |= 128 >>> this.length % 8), this.length++
            }
        }, g
    }();
    for (var J = {
        types: ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
    }, K = 0, L = J.types.length; L > K; K++) J[J.types[K]] = function(a) {
        return function(b) {
            return Object.prototype.toString.call(b) === "[object " + a + "]"
        }
    }(J.types[K]);
    var M = function() {
        return z.apply(this, arguments)
    };
    M.config = function(a) {
        var b = E.appkey;
        E = f(E, a || {}), "appkey" in a && a.appkey !== b
    }, M.getConfig = function(a) {
        return E[a] || null
    }, M.ready = function() {
        function c(a) {
            if (!e && ("onreadystatechange" !== a.type || "complete" === b.readyState)) {
                for (var c = 0, f = d.length; f > c; c++) d && d[c].call(b);
                e = !0, d = null
            }
        }
        var d = [],
            e = !1;
        return b.addEventListener ? (b.addEventListener("DOMContentLoaded", c, !1), b.addEventListener("readystatechange", c, !1), a.addEventListener("load", c, !1)) : b.attachEvent && (b.attachEvent("onreadystatechange", c), a.attachEvent("onload", c)), function(a) {
            e ? a.call(b) : d.push(a)
        }
    }(), M.ready(function() {
        y("init");
        var a = d("#-mob-share")[0];
        if (a && a.src) {
            var b = n(a.src);
            b.appkey && !E.appkey && M.config({
                appkey: b.appkey
            });
            var c = a.src.split("?")[0].replace(/\/[^\/]+\.[^\/]+$/, "");
            M.config({
                staticDir: c
            })
        }
    });
    var N = {};
    N.Normal = function(a) {
        y("sharer instantiation: " + a);
        var b = a || "";
        if (!E.platforms[b]) throw "Platform '" + b + "' is not exists";
        this._platform = b
    }, N.Normal.prototype.send = function(b) {
        b = b || {}, y("passing parameters: " + m(b));
        var c = f(C(), E.params);
        b = f(c, b), y("extended parameters: " + m(b));
        var d = function(a) {
            if (!b[a]) throw "Please provide '" + a + "' parameter"
        };
        d("title");
        var e = E.platforms[this._platform].api;
        H && E.platforms[this._platform].mapi && (e = E.platforms[this._platform].mapi);
        var g = E.platforms[this._platform].handler(b);
        y("open the new page of platform: " + e + "?" + p(g)), a.open(e + "?" + p(g), "_blank"), "function" == typeof E.callback && E.callback(this._platform, {
            url: b.url || "",
            title: b.title || "",
            description: b.description || "",
            reason: b.reason || b.description,
            pic: b.pic || ""
        })
    }, N.Weixin = function() {
        this._platform = "weixin"
    }, N.Weixin.prototype.send = function() {
        var c = C();
        if (E.params.url && (c.url = E.params.url), r()) {
            var d = b.createElement("div");
            d.className = "-mob-share-weixin-tips-content";
            var e = b.createElement("div");
            e.className = "-mob-share-weixin-tips-arrow";
            var f = b.createElement("div");
            f.className = "-mob-share-weixin-tips", f.innerHTML = "\u70b9\u51fb\u53f3\u4e0a\u89d2<br />\u5c06\u5b83\u5206\u4eab\u5230\u670b\u53cb\u5708<br />\u6216\u6307\u5b9a\u7684\u670b\u53cb";
            var i = b.createElement("div");
            i.className = "-mob-share-weixin-qrcode-bg";
            var j = function() {
                O([d, i], {
                    opacity: 0
                }, 300, function() {
                    d.parentNode.removeChild(d), i.parentNode.removeChild(i)
                })
            };
            g(i, "click", j), g(d, "click", j), d.appendChild(e), d.appendChild(f), h([d, i], {
                opacity: 0
            });
            var k = b.getElementsByTagName("body")[0];
            k.appendChild(d), k.appendChild(i), O(d, {
                opacity: 1
            }, 300), O(i, {
                opacity: .7
            }, 300)
        } else {
            var d = b.createElement("div");
            d.className = "-mob-share-weixin-qrcode-content";
            var l = function() {
                var a = (q().width - 280) / 2;
                d.style.left = (0 > a ? 0 : a) + "px";
                var b = .2 * q().height;
                d.style.top = (0 > b ? 0 : b) + "px"
            };
            l(), g(a, "resize", l);
            var m = b.createElement("button");
            m.className = "-mob-share-weixin-qrcode-close", m.innerHTML = "X", m.title = "\u5173\u95ed";
            var n = b.createElement("p");
            n.className = "-mob-share-weixin-qrcode-header", n.innerHTML = "\u4f7f\u7528\u5fae\u4fe1\u3010\u626b\u4e00\u626b\u3011\u626b\u63cf\u4e0b\u9762\u7684\u4e8c\u7ef4\u7801";
            var i = b.createElement("div");
            i.className = "-mob-share-weixin-qrcode-bg";
            var o, p = new I({
                text: c.url,
                width: 250,
                height: 250
            });
            "CANVAS" === p.nodeName && p.toDataURL ? (o = b.createElement("img"), o.className = "-mob-share-weixin-qrcode", o.src = p.toDataURL()) : (o = b.createElement("div"), o.className = "-mob-share-weixin-qrcode", o.appendChild(p));
            var j = function() {
                O([d, i], {
                    opacity: 0
                }, 300, function() {
                    d.parentNode.removeChild(d), i.parentNode.removeChild(i)
                })
            };
            g(m, "click", j), d.appendChild(m), d.appendChild(n), d.appendChild(o), h([d, i], {
                opacity: 0
            });
            var k = b.getElementsByTagName("body")[0];
            k.appendChild(d), k.appendChild(i), O(d, {
                opacity: 1
            }, 300), O(i, {
                opacity: .7
            }, 300)
        }
        "function" == typeof E.callback && E.callback(this._platform, {
            url: c.url || "",
            title: c.title || "",
            reason: c.reason || c.description,
            description: c.description || "",
            pic: c.pic || ""
        })
    };
    var O = function() {
            var a, b, d, e, f, g, i, j, l;
            j = 1, l = "lxjwlt" + (Math.random() + "").replace(/\D/g, ""), d = [], i = {}, a = {
                def: "easeOutQuad",
                swing: function(b, c, d, e) {
                    return a[a.def](b, c, d, e)
                },
                easeInQuad: function(a, b, c, d) {
                    return c * (a /= d) * a + b
                },
                easeOutQuad: function(a, b, c, d) {
                    return -c * (a /= d) * (a - 2) + b
                },
                easeInCubic: function(a, b, c, d) {
                    return c * (a /= d) * a * a + b
                },
                easeOutBack: function(a, b, c, d, e) {
                    return void 0 === e && (e = 6), c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
                },
                easeOutBounce: function(a, b, c, d) {
                    return (a /= d) < 1 / 2.75 ? 7.5625 * c * a * a + b : 2 / 2.75 > a ? c * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + b : 2.5 / 2.75 > a ? c * (7.5625 * (a -= 2.25 / 2.75) * a + .9375) + b : c * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + b
                }
            }, e = function(a, b) {
                if ("run" !== a[0] && a.length) {
                    a.unshift("run");
                    var c = setInterval(function() {
                        var d, e, f, g, i, j, k;
                        for (f = a.length - 1; f > 0; f--) {
                            d = a[f], d.bTime = d.bTime || (new Date).getTime(), g = (new Date).getTime() - d.bTime, i = d.beginVal, j = d.changeVal, k = d.duration, k || (k = .1);
                            var l = d.type;
                            g >= k ? (e = b[l](k, i, j, k), d.over(), a.splice(f, 1)) : e = b[l](g, i, j, k);
                            var m = {};
                            m[d.propName] = e + d.unit, h(d.elem, m)
                        }
                        1 === a.length && (clearInterval(c), a.pop())
                    }, 1)
                }
            }, b = function(b, f, i, j, l) {
                var m = function(b, f, i, j) {
                    var k, m, n, o, p, q, r, o = 0;
                    o += 1, r = function() {
                        "function" == typeof j && j(), o -= 1, 0 === o && g(b)
                    };
                    for (n in f) {
                        q = h(b, n) || "", k = +parseFloat(q).toFixed(1) || 0;
                        var m;
                        if (m = "function" == typeof f[n] ? f[n].call(b, n) : f[n], m = +parseFloat(m).toFixed(1) || 0, p = +q === k ? "" : q.match(/(?:px|em|pt)/i), "transition" in b.style) {
                            var s = n,
                                t = m;
                            null === b.getAttribute("data-mob-animation-transitionProperty") && (b.setAttribute("data-mob-animation-transitionProperty", h(b, "transitionProperty")), b.setAttribute("data-mob-animation-transitionDuration", h(b, "transitionDuration")));
                            var u = [];
                            if (h(b, "transitionProperty") && (u = h(b, "transitionProperty").replace(/ /g, "").split(",")), l) t = m + p;
                            else {
                                var v = 0,
                                    w = 0,
                                    y = h(b, x("transform")) || "",
                                    z = y.match(/translate\(([^,]+),([^)]+)\)/);
                                z && (v = z[1], w = z[2]), "top" === s ? (s = x("transform"), t = "translate(" + v + "," + (t - k) + p + ")") : "left" === s ? (s = x("transform"), t = "translate(" + (t - k) + p + "," + w + ")") : "bottom" === s ? (s = x("transform"), t = "translate(" + v + "," + -(t - k) + p + ")") : "right" === s ? (s = x("transform"), t = "translate(" + -(t - k) + p + "," + w + ")") : t += p
                            } - 1 === c(s, u) && u.push(s), h(b, {
                                transitionProperty: u.join(","),
                                transitionDuration: (i / 1e3).toFixed(3) + "s"
                            });
                            var A = {};
                            A[s] = t, h(b, A), setTimeout(function(a, c, d, e) {
                                return function() {
                                    if (null !== b.getAttribute("data-mob-animation-transitionProperty") && (h(b, {
                                            transitionProperty: b.getAttribute("data-mob-animation-transitionProperty"),
                                            transitionDuration: b.getAttribute("data-mob-animation-transitionDuration")
                                        }), b.removeAttribute("data-mob-animation-transitionProperty"), b.removeAttribute("data-mob-animation-transitionDuration")), a === x("transform")) {
                                        var f = {};
                                        f[c] = d + e, f[x("transform")] = "translate(0,0)", h(b, f)
                                    }
                                    r()
                                }
                            }(s, n, m, p), i)
                        } else m !== k && d.push({
                            elem: b,
                            propName: n,
                            beginVal: k,
                            changeVal: m - k,
                            duration: i || 0 === i ? i : 400,
                            type: "swing",
                            unit: p,
                            over: r
                        })
                    }
                    e(d, a)
                };
                b = J.Array(b) ? b : [b];
                var n = 0;
                k(b, function() {
                    m(this, f, i, function() {
                        n++, n === b.length && "function" == typeof j && j()
                    }, l)
                })
            };
            var m = function(a, c, d, e, g) {
                var h = function() {
                    b.call(window, a, c, d, e, g)
                };
                f(a, h)
            };
            return f = function(a, b) {
                var c, d;
                a[l] || (a[l] = j++, i[a[l]] = []), d = a[l], c = i[d], c.push(b), "run" !== c[0] && g(a)
            }, g = function(a) {
                var b, c = i[a[l]],
                    d = "run";
                if (c) {
                    if (c[0] === d && 1 === c.length) return void c.shift();
                    for (; c.length;) if (b = c.shift(), "function" == typeof b) {
                        b(), c.unshift(d);
                        break
                    }
                }
            }, b.queue = m, b
        }(),
        P = function() {
            function c(c, f, i) {
                function j(a, b, e) {
                    var g = a / b;
                    if (Math.abs(g) > .2 && 200 > b && 0 > e && e > -o) {
                        var h = 0 > a ? e + o : -e,
                            i = h + c[r] / 6,
                            j = d(a, b, i),
                            l = e + j.dist;
                        return t = j.time, O(f, A(p, l + "px"), t, k, !0), l
                    }
                    return k(), e
                }
                function k() {
                    x > 0 ? x = 0 : -o > x && (x = -o), t = 200, O(f, A(p, x + "px"), t, !1, !0)
                }
                var l, m, n, o, p, q, r, s, t = 0,
                    u = !1,
                    w = 0,
                    x = 0,
                    y = 0,
                    z = null;
                i ? (p = "left", q = "x", r = "offsetWidth", s = "scrollWidth") : (p = "top", q = "y", r = "offsetHeight", s = "scrollHeight");
                var A = function(a, b) {
                    var c = {};
                    return c[a] = b, c
                };
                g(f, "mousedown touchstart", function(a) {
                    n = 0, o = f[s] - c[r] + 10, 0 > o && (o = 0);
                    var b = f.style[p] || 0;
                    t = 0, O(f, A(p, b + "px"), t, !1, !0), u = !0, w = e(a)[q], y = x = parseInt(b) || 0, z = new Date, l && l.parentNode.removeChild(l)
                }), g(b.body, "mousemove touchmove", function(d) {
                    if (u) {
                        5 < (new Date).getTime() - z.getTime() && (l ? clearTimeout(m) : (l = b.createElement("div"), h(l, {
                            display: "none"
                        }), l.unselectable = "on", l.onselectstart = function() {
                            return !1
                        }, b.body.appendChild(l)), h(l, {
                            display: "block",
                            width: c.clientWidth + "px",
                            height: c.clientHeight + "px",
                            position: "fixed",
                            opacity: .5,
                            top: v(c).top + "px",
                            left: v(c).left + "px",
                            zIndex: 9999999999
                        }));
                        var g = e(d)[q] - w;
                        return x = y + g, x > 0 ? x = y + g / 2 : -o > x && (x = y + g / 2), O(f, A(p, x + "px"), 0, !1, !0), d && d.preventDefault ? d.preventDefault() : a.event.returnValue = !1, !1
                    }
                }, !0), g(b.body, "mouseup touchend", function() {
                    l && (m = setTimeout(function() {
                        l.parentNode.removeChild(l), l = null
                    }, 100)), u = !1;
                    var a = 0;
                    z && (a = (new Date).getTime() - z.getTime());
                    var b = x - y;
                    x = j(b, a, x, f)
                }, !0)
            }
            function d(a, b, c) {
                var d = .001,
                    e = Math.abs(a) / b,
                    f = e * e / (2 * d),
                    g = 0;
                return Math.abs(f) > c && (f = c, e /= 6), f *= 0 > a ? -1 : 1, g = e / d, {
                    dist: f,
                    time: g
                }
            }
            function e(c) {
                var d = {
                    x: 0,
                    y: 0
                };
                return c.touches && c.touches[0] ? (d.x = c.touches[0].clientX, d.y = c.touches[0].clientY, d) : ("undefined" != typeof a.pageYOffset ? (d.x = a.pageXOffset, d.y = a.pageYOffset) : "undefined" != typeof b.compatMode && "BackCompat" !== b.compatMode ? (d.x = b.documentElement.scrollLeft, d.y = b.documentElement.scrollTop) : "undefined" != typeof b.body && (d.x = b.body.scrollLeft, d.y = b.body.scrollTop), d.x += c.clientX, d.y += c.clientY, d)
            }
            return c
        }(),
        Q = {};
    Q.scatter = {
        horizontal: !1,
        init: function() {
            var a = d(".-mob-share-ui");
            h(a, {
                display: "block",
                visibility: "hidden",
                left: 0,
                top: 0
            });
            var b = q(),
                c = d(".-mob-share-list li", a);
            k(c, function() {
                v(this);
                h(this, {
                    margin: "0px",
                    top: function() {
                        var a = (b.height - this.clientHeight) / 2 + "px";
                        return this.setAttribute("data-mob-share-center-top", a), a
                    },
                    left: function() {
                        var a = (b.width - this.clientWidth) / 2 + "px";
                        return this.setAttribute("data-mob-share-center-left", a), a
                    }
                })
            }), h(c, {
                position: "absolute"
            }), h(d(".-mob-share-ui-bg"), {
                display: "none"
            })
        },
        open: function() {
            var a = d(".-mob-share-ui"),
                b = d(".-mob-share-list", a),
                c = d("li", b);
            if (c.length) {
                for (var e, f = c[0].clientWidth, g = c[0].clientHeight, i = c.length, j = q().width, l = 2 * parseFloat(h(c[0], "fontSize")); i;) {
                    if (j - (f + l) * i > .05 * j) {
                        e = i;
                        break
                    }
                    i--
                }
                var m = f + l,
                    n = (j - m * e) / 2;
                n += (m - f) / 2, k(c, function(a) {
                    var b = Math.floor(a / e) + 1,
                        c = 50 * b;
                    O(this, {
                        top: (b - 1) * g + c + "px",
                        left: a % e * m + n + "px"
                    }, 300)
                })
            }
            h(a, {
                visibility: "inherit"
            }), O(a, {
                opacity: 1
            }, 300, function() {
                h(b, {
                    height: function() {
                        var a = parseFloat(h(c[c.length - 1], "top")),
                            b = a + g + 70;
                        return b < q().height ? q().height + "px" : b + "px"
                    }
                })
            })
        },
        close: function() {
            var a = d(".-mob-share-ui"),
                b = d(".-mob-share-list li", a);
            O(a, {
                opacity: 0
            }, 300, function() {
                h(a, {
                    visibility: "hidden"
                })
            }), O(b, {
                top: function() {
                    return this.getAttribute("data-mob-share-center-top")
                },
                left: function() {
                    return this.getAttribute("data-mob-share-center-left")
                }
            }, 300)
        },
        resize: function() {
            this.init()
        }
    }, Q.slideBottom = {
        horizontal: !0,
        init: function() {
            var a = d(".-mob-share-ui");
            h(a, {
                display: "block",
                visibility: "inherit"
            }), h(a, {
                bottom: function() {
                    return "-" + this.clientHeight + "px"
                }
            }), h(a, {
                visibility: "hidden"
            }), h(d(".-mob-share-ui-bg"), {
                display: "none"
            })
        },
        open: function() {
            var a = d(".-mob-share-ui");
            h(a, {
                visibility: "inherit"
            }), O(a, {
                bottom: "0px"
            }, 300);
            var b = d(".-mob-share-ui-bg");
            h(b, {
                opacity: 0,
                display: "block"
            }), O(b, {
                opacity: .5
            }, 300)
        },
        close: function() {
            var a = d(".-mob-share-ui");
            O(a, {
                bottom: function() {
                    return "-" + this.clientHeight + "px"
                }
            }, 300, function() {
                h(a, {
                    visibility: "hidden"
                })
            });
            var b = d(".-mob-share-ui-bg");
            O(b, {
                opacity: 0
            }, 300, function() {
                h(b, {
                    display: "none"
                })
            })
        },
        resize: function() {
            this.init()
        }
    }, Q.slideLeft = {
        horizontal: !1,
        init: function() {
            var a = d(".-mob-share-ui");
            h(a, {
                display: "block",
                visibility: "inherit"
            }), h(a, {
                left: function() {
                    return "-" + this.clientWidth + "px"
                }
            }), h(a, {
                visibility: "hidden"
            }), h(d(".-mob-share-ui-bg"), {
                display: "none"
            })
        },
        open: function() {
            var a = d(".-mob-share-ui");
            h(a, {
                visibility: "inherit"
            }), O(a, {
                left: "0px"
            }, 300);
            var b = d(".-mob-share-ui-bg");
            h(b, {
                opacity: 0,
                display: "block"
            }), O(b, {
                opacity: .5
            }, 300)
        },
        close: function() {
            var a = d(".-mob-share-ui");
            O(a, {
                left: function() {
                    return "-" + this.clientWidth + "px"
                }
            }, 300, function() {
                h(a, {
                    visibility: "hidden"
                })
            });
            var b = d(".-mob-share-ui-bg");
            O(b, {
                opacity: 0
            }, 300, function() {
                h(b, {
                    display: "none"
                })
            })
        },
        resize: function() {
            this.init()
        }
    }, Q.slideRight = {
        horizontal: !1,
        init: function() {
            var a = d(".-mob-share-ui");
            h(a, {
                display: "block",
                visibility: "inherit"
            }), h(a, {
                right: function() {
                    return "-" + this.clientWidth + "px"
                }
            }), h(a, {
                visibility: "hidden"
            }), h(d(".-mob-share-ui-bg"), {
                display: "none"
            })
        },
        open: function() {
            var a = d(".-mob-share-ui");
            h(a, {
                visibility: "inherit"
            }), O(a, {
                right: "0px"
            }, 300);
            var b = d(".-mob-share-ui-bg");
            h(b, {
                opacity: 0,
                display: "block"
            }), O(b, {
                opacity: .5
            }, 300)
        },
        close: function() {
            var a = d(".-mob-share-ui");
            O(a, {
                right: function() {
                    return "-" + this.clientWidth + "px"
                }
            }, 300, function() {
                h(a, {
                    visibility: "hidden"
                })
            });
            var b = d(".-mob-share-ui-bg");
            O(b, {
                opacity: 0
            }, 300, function() {
                h(b, {
                    display: "none"
                })
            })
        },
        resize: function() {
            this.init()
        }
    }, Q.slideTop = {
        horizontal: !0,
        init: function() {
            var a = d(".-mob-share-ui");
            h(a, {
                display: "block",
                visibility: "inherit"
            }), h(a, {
                top: function() {
                    return "-" + this.clientHeight + "px"
                }
            }), h(a, {
                visibility: "hidden"
            }), h(d(".-mob-share-ui-bg"), {
                display: "none"
            })
        },
        open: function() {
            var a = d(".-mob-share-ui");
            h(a, {
                visibility: "inherit"
            }), O(a, {
                top: "0px"
            }, 300);
            var b = d(".-mob-share-ui-bg");
            h(b, {
                opacity: 0,
                display: "block"
            }), O(b, {
                opacity: .5
            }, 300)
        },
        close: function() {
            var a = d(".-mob-share-ui");
            O(a, {
                top: function() {
                    return "-" + (this.clientHeight + 1) + "px"
                }
            }, 300, function() {
                h(a, {
                    visibility: "hidden"
                })
            });
            var b = d(".-mob-share-ui-bg");
            O(b, {
                opacity: 0
            }, 300, function() {
                h(b, {
                    display: "none"
                })
            })
        },
        resize: function() {
            this.init()
        }
    };
    var R = !1,
        S = "scatter";
    M.ui = {
        init: function() {
            var c = function() {
                var b = ["tencentweibo", "renren", "kaixin", "mingdao", "pengyou"];
                k(b, function(a, b) {
                    d(".-mob-share-" + b).length > 0 && d(".-mob-share-" + b)[0] && d(".-mob-share-ui .-mob-share-list")[0].removeChild(d(".-mob-share-" + b)[0])
                });
                var c = M.getConfig("platforms");
                for (var f in c) {
                    var h = e(d(".-mob-share-" + f), "-mob-share-initialized");
                    j(h, "-mob-share-initialized"), g(h, "click", function() {
                        var a = f;
                        return function() {
                            M(a).send(), M.ui.close()
                        }
                    }())
                }
                var l = e(d(".-mob-share-ui"), "-mob-share-initialized");
                if (l.length) {
                    j(l, "-mob-share-initialized");
                    var m = l[0].className.match(/-mob-share-ui-theme-([\w-]+)\b/);
                    if (m) {
                        var n = m[1].replace(/-[a-zA-Z]/g, function(a) {
                            return a.replace("-", "").toUpperCase()
                        });
                        Q[n] && (S = n)
                    }
                    k(l, function() {
                        this.unselectable = "on", this.onselectstart = function() {
                            return !1
                        }, i(this, "-mob-share-ui-theme") || j(this, "-mob-share-ui-theme"), P(this, d(".-mob-share-list", this)[0], Q[S].horizontal)
                    }), Q[S].init();
                    var c = M.getConfig("platforms");
                    for (var f in c) {
                        var h = d(".-mob-share-ui .-mob-share-" + f)[0];
                        h && u(h)
                    }
                    var o = d(".-mob-share-open");
                    g(o, "click", function() {
                        M.ui.open()
                    });
                    var p = d(".-mob-share-close, .-mob-share-ui-bg");
                    g(p, "click", function() {
                        M.ui.close()
                    }), g(p, "mousemove touchmove", function(b) {
                        return b && b.preventDefault ? b.preventDefault() : a.event.returnValue = !1, !1
                    })
                }
            };
            if (R || null === M.getConfig("staticDir")) c();
            else {
                R = !0;
                var f = b.createElement("link");
                f.rel = "stylesheet", f.type = "text/css", f.href = M.getConfig("staticDir") + "/share.css";
                var h = !1,
                    l = function() {
                        h || (c(), h = !0)
                    };
                s(f, l), f.onload = l, b.getElementsByTagName("head")[0].appendChild(f)
            }
        },
        open: function() {
            Q[S].open()
        },
        close: function() {
            Q[S].close()
        },
        resize: function() {
            Q[S].resize()
        }
    }, M.ready(function() {
        M.ui.init(), g(a, "resize", function() {
            M.ui.resize()
        })
    }), a.mobShare = M, "function" == typeof a.define && (a.define.amd || a.define.cmd) && a.define("mob-share", [], function() {
        return M.ui.init(), M
    })
}(window, document);