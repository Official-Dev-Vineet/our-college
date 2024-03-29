window.Modernizr = (function (r, d, i) {
  var e,
    o,
    a,
    c = {},
    f = d.documentElement,
    m = "modernizr",
    t = d.createElement(m),
    s = t.style,
    u = d.createElement("input"),
    l = ":)",
    n = {}.toString,
    p = " -webkit- -moz- -o- -ms- ".split(" "),
    h = "Webkit Moz O ms",
    g = h.split(" "),
    v = h.toLowerCase().split(" "),
    y = "http://www.w3.org/2000/svg",
    b = {},
    E = {},
    x = {},
    w = [],
    S = w.slice,
    C = function (e, t, n, r) {
      var o,
        a,
        i,
        c,
        s = d.createElement("div"),
        u = d.body,
        l = u || d.createElement("body");
      if (parseInt(n, 10))
        for (; n--; )
          ((i = d.createElement("div")).id = r ? r[n] : m + (n + 1)),
            s.appendChild(i);
      return (
        (o = ["&#173;", '<style id="s', m, '">', e, "</style>"].join("")),
        (s.id = m),
        ((u ? s : l).innerHTML += o),
        l.appendChild(s),
        u ||
          ((l.style.background = ""),
          (l.style.overflow = "hidden"),
          (c = f.style.overflow),
          (f.style.overflow = "hidden"),
          f.appendChild(l)),
        (a = t(s, e)),
        u
          ? s.parentNode.removeChild(s)
          : (l.parentNode.removeChild(l), (f.style.overflow = c)),
        !!a
      );
    },
    k =
      ((a = {
        select: "input",
        change: "input",
        submit: "form",
        reset: "form",
        error: "img",
        load: "img",
        abort: "img",
      }),
      function (e, t) {
        t = t || d.createElement(a[e] || "div");
        var n = (e = "on" + e) in t;
        return (
          n ||
            (t.setAttribute || (t = d.createElement("div")),
            t.setAttribute &&
              t.removeAttribute &&
              (t.setAttribute(e, ""),
              (n = M(t[e], "function")),
              M(t[e], "undefined") || (t[e] = i),
              t.removeAttribute(e))),
          (t = null),
          n
        );
      }),
    T = {}.hasOwnProperty;
  function N(e) {
    s.cssText = e;
  }
  function M(e, t) {
    return typeof e === t;
  }
  function P(e, t) {
    return !!~("" + e).indexOf(t);
  }
  function j(e, t) {
    for (var n in e) {
      var r = e[n];
      if (!P(r, "-") && s[r] !== i) return "pfx" != t || r;
    }
    return !1;
  }
  function $(e, t, n) {
    var r = e.charAt(0).toUpperCase() + e.slice(1),
      o = (e + " " + g.join(r + " ") + r).split(" ");
    return M(t, "string") || M(t, "undefined")
      ? j(o, t)
      : (function (e, t, n) {
          for (var r in e) {
            var o = t[e[r]];
            if (o !== i)
              return !1 === n ? e[r] : M(o, "function") ? o.bind(n || t) : o;
          }
          return !1;
        })((o = (e + " " + v.join(r + " ") + r).split(" ")), t, n);
  }
  for (var D in ((o =
    M(T, "undefined") || M(T.call, "undefined")
      ? function (e, t) {
          return t in e && M(e.constructor.prototype[t], "undefined");
        }
      : function (e, t) {
          return T.call(e, t);
        }),
  Function.prototype.bind ||
    (Function.prototype.bind = function (r) {
      var o = this;
      if ("function" != typeof o) throw new TypeError();
      var a = S.call(arguments, 1),
        i = function () {
          if (this instanceof i) {
            var e = function () {};
            e.prototype = o.prototype;
            var t = new e(),
              n = o.apply(t, a.concat(S.call(arguments)));
            return Object(n) === n ? n : t;
          }
          return o.apply(r, a.concat(S.call(arguments)));
        };
      return i;
    }),
  (b.flexbox = function () {
    return $("flexWrap");
  }),
  (b.flexboxlegacy = function () {
    return $("boxDirection");
  }),
  (b.canvas = function () {
    var e = d.createElement("canvas");
    return !(!e.getContext || !e.getContext("2d"));
  }),
  (b.canvastext = function () {
    return !(
      !c.canvas ||
      !M(d.createElement("canvas").getContext("2d").fillText, "function")
    );
  }),
  (b.webgl = function () {
    return !!r.WebGLRenderingContext;
  }),
  (b.touch = function () {
    var t;
    return (
      "ontouchstart" in r || (r.DocumentTouch && d instanceof DocumentTouch)
        ? (t = !0)
        : C(
            [
              "@media (",
              p.join("touch-enabled),("),
              m,
              ")",
              "{#modernizr{top:9px;position:absolute}}",
            ].join(""),
            function (e) {
              t = 9 === e.offsetTop;
            }
          ),
      t
    );
  }),
  (b.geolocation = function () {
    return "geolocation" in navigator;
  }),
  (b.postmessage = function () {
    return !!r.postMessage;
  }),
  (b.websqldatabase = function () {
    return !!r.openDatabase;
  }),
  (b.indexedDB = function () {
    return !!$("indexedDB", r);
  }),
  (b.hashchange = function () {
    return k("hashchange", r) && (d.documentMode === i || 7 < d.documentMode);
  }),
  (b.history = function () {
    return !(!r.history || !history.pushState);
  }),
  (b.draganddrop = function () {
    var e = d.createElement("div");
    return "draggable" in e || ("ondragstart" in e && "ondrop" in e);
  }),
  (b.websockets = function () {
    return "WebSocket" in r || "MozWebSocket" in r;
  }),
  (b.rgba = function () {
    return (
      N("background-color:rgba(150,255,150,.5)"), P(s.backgroundColor, "rgba")
    );
  }),
  (b.hsla = function () {
    return (
      N("background-color:hsla(120,40%,100%,.5)"),
      P(s.backgroundColor, "rgba") || P(s.backgroundColor, "hsla")
    );
  }),
  (b.multiplebgs = function () {
    return (
      N("background:url(https://),url(https://),red url(https://)"),
      /(url\s*\(.*?){3}/.test(s.background)
    );
  }),
  (b.backgroundsize = function () {
    return $("backgroundSize");
  }),
  (b.borderimage = function () {
    return $("borderImage");
  }),
  (b.borderradius = function () {
    return $("borderRadius");
  }),
  (b.boxshadow = function () {
    return $("boxShadow");
  }),
  (b.textshadow = function () {
    return "" === d.createElement("div").style.textShadow;
  }),
  (b.opacity = function () {
    var e, t;
    return (
      (e = "opacity:.55"),
      N(p.join(e + ";") + (t || "")),
      /^0.55$/.test(s.opacity)
    );
  }),
  (b.cssanimations = function () {
    return $("animationName");
  }),
  (b.csscolumns = function () {
    return $("columnCount");
  }),
  (b.cssgradients = function () {
    var e = "background-image:";
    return (
      N(
        (
          e +
          "-webkit- "
            .split(" ")
            .join(
              "gradient(linear,left top,right bottom,from(#9f9),to(white));" + e
            ) +
          p.join("linear-gradient(left top,#9f9, white);" + e)
        ).slice(0, -e.length)
      ),
      P(s.backgroundImage, "gradient")
    );
  }),
  (b.cssreflections = function () {
    return $("boxReflect");
  }),
  (b.csstransforms = function () {
    return !!$("transform");
  }),
  (b.csstransforms3d = function () {
    var n = !!$("perspective");
    return (
      n &&
        "webkitPerspective" in f.style &&
        C(
          "@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
          function (e, t) {
            n = 9 === e.offsetLeft && 3 === e.offsetHeight;
          }
        ),
      n
    );
  }),
  (b.csstransitions = function () {
    return $("transition");
  }),
  (b.fontface = function () {
    var a;
    return (
      C('@font-face {font-family:"font";src:url("https://")}', function (e, t) {
        var n = d.getElementById("smodernizr"),
          r = n.sheet || n.styleSheet,
          o = r
            ? r.cssRules && r.cssRules[0]
              ? r.cssRules[0].cssText
              : r.cssText || ""
            : "";
        a = /src/i.test(o) && 0 === o.indexOf(t.split(" ")[0]);
      }),
      a
    );
  }),
  (b.generatedcontent = function () {
    var t;
    return (
      C(
        [
          "#",
          m,
          "{font:0/0 a}#",
          m,
          ':after{content:"',
          l,
          '";visibility:hidden;font:3px/1 a}',
        ].join(""),
        function (e) {
          t = 3 <= e.offsetHeight;
        }
      ),
      t
    );
  }),
  (b.video = function () {
    var e = d.createElement("video"),
      t = !1;
    try {
      (t = !!e.canPlayType) &&
        (((t = new Boolean(t)).ogg = e
          .canPlayType('video/ogg; codecs="theora"')
          .replace(/^no$/, "")),
        (t.h264 = e
          .canPlayType('video/mp4; codecs="avc1.42E01E"')
          .replace(/^no$/, "")),
        (t.webm = e
          .canPlayType('video/webm; codecs="vp8, vorbis"')
          .replace(/^no$/, "")));
    } catch (e) {}
    return t;
  }),
  (b.audio = function () {
    var e = d.createElement("audio"),
      t = !1;
    try {
      (t = !!e.canPlayType) &&
        (((t = new Boolean(t)).ogg = e
          .canPlayType('audio/ogg; codecs="vorbis"')
          .replace(/^no$/, "")),
        (t.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, "")),
        (t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "")),
        (t.m4a = (
          e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")
        ).replace(/^no$/, "")));
    } catch (e) {}
    return t;
  }),
  (b.localstorage = function () {
    try {
      return localStorage.setItem(m, m), localStorage.removeItem(m), !0;
    } catch (e) {
      return !1;
    }
  }),
  (b.sessionstorage = function () {
    try {
      return sessionStorage.setItem(m, m), sessionStorage.removeItem(m), !0;
    } catch (e) {
      return !1;
    }
  }),
  (b.webworkers = function () {
    return !!r.Worker;
  }),
  (b.applicationcache = function () {
    return !!r.applicationCache;
  }),
  (b.svg = function () {
    return !!d.createElementNS && !!d.createElementNS(y, "svg").createSVGRect;
  }),
  (b.inlinesvg = function () {
    var e = d.createElement("div");
    return (
      (e.innerHTML = "<svg/>"), (e.firstChild && e.firstChild.namespaceURI) == y
    );
  }),
  (b.smil = function () {
    return (
      !!d.createElementNS &&
      /SVGAnimate/.test(n.call(d.createElementNS(y, "animate")))
    );
  }),
  (b.svgclippaths = function () {
    return (
      !!d.createElementNS &&
      /SVGClipPath/.test(n.call(d.createElementNS(y, "clipPath")))
    );
  }),
  b))
    o(b, D) &&
      ((e = D.toLowerCase()), (c[e] = b[D]()), w.push((c[e] ? "" : "no-") + e));
  return (
    c.input ||
      ((c.input = (function (e) {
        for (var t = 0, n = e.length; t < n; t++) x[e[t]] = !!(e[t] in u);
        return (
          x.list &&
            (x.list = !(
              !d.createElement("datalist") || !r.HTMLDataListElement
            )),
          x
        );
      })(
        "autocomplete autofocus list placeholder max min multiple pattern required step".split(
          " "
        )
      )),
      (c.inputtypes = (function (e) {
        for (var t, n, r, o = 0, a = e.length; o < a; o++)
          u.setAttribute("type", (n = e[o])),
            (t = "text" !== u.type) &&
              ((u.value = l),
              (u.style.cssText = "position:absolute;visibility:hidden;"),
              /^range$/.test(n) && u.style.WebkitAppearance !== i
                ? (f.appendChild(u),
                  (t =
                    (r = d.defaultView).getComputedStyle &&
                    "textfield" !==
                      r.getComputedStyle(u, null).WebkitAppearance &&
                    0 !== u.offsetHeight),
                  f.removeChild(u))
                : /^(search|tel)$/.test(n) ||
                  (t = /^(url|email)$/.test(n)
                    ? u.checkValidity && !1 === u.checkValidity()
                    : u.value != l)),
            (E[e[o]] = !!t);
        return E;
      })(
        "search tel url email datetime date month week time datetime-local number range color".split(
          " "
        )
      ))),
    (c.addTest = function (e, t) {
      if ("object" == typeof e) for (var n in e) o(e, n) && c.addTest(n, e[n]);
      else {
        if (((e = e.toLowerCase()), c[e] !== i)) return c;
        (t = "function" == typeof t ? t() : t),
          (f.className += " " + (t ? "" : "no-") + e),
          (c[e] = t);
      }
      return c;
    }),
    N(""),
    (t = u = null),
    (function (e, s) {
      var u,
        l,
        t = e.html5 || {},
        o =
          /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        a =
          /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        n = "_html5shiv",
        r = 0,
        i = {};
      function d() {
        var e = p.elements;
        return "string" == typeof e ? e.split(" ") : e;
      }
      function f(e) {
        var t = i[e[n]];
        return t || ((t = {}), r++, (e[n] = r), (i[r] = t)), t;
      }
      function m(e, t, n) {
        return (
          t || (t = s),
          l
            ? t.createElement(e)
            : (n || (n = f(t)),
              !(r = n.cache[e]
                ? n.cache[e].cloneNode()
                : a.test(e)
                ? (n.cache[e] = n.createElem(e)).cloneNode()
                : n.createElem(e)).canHaveChildren ||
              o.test(e) ||
              r.tagUrn
                ? r
                : n.frag.appendChild(r))
        );
        var r;
      }
      function c(e) {
        e || (e = s);
        var t,
          n,
          r,
          o,
          a,
          i,
          c = f(e);
        return (
          !p.shivCSS ||
            u ||
            c.hasCSS ||
            (c.hasCSS =
              ((n =
                "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}"),
              (r = (t = e).createElement("p")),
              (o = t.getElementsByTagName("head")[0] || t.documentElement),
              (r.innerHTML = "x<style>" + n + "</style>"),
              !!o.insertBefore(r.lastChild, o.firstChild))),
          l ||
            ((a = e),
            (i = c).cache ||
              ((i.cache = {}),
              (i.createElem = a.createElement),
              (i.createFrag = a.createDocumentFragment),
              (i.frag = i.createFrag())),
            (a.createElement = function (e) {
              return p.shivMethods ? m(e, a, i) : i.createElem(e);
            }),
            (a.createDocumentFragment = Function(
              "h,f",
              "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
                d()
                  .join()
                  .replace(/[\w\-]+/g, function (e) {
                    return (
                      i.createElem(e), i.frag.createElement(e), 'c("' + e + '")'
                    );
                  }) +
                ");return n}"
            )(p, i.frag))),
          e
        );
      }
      !(function () {
        try {
          var e = s.createElement("a");
          (e.innerHTML = "<xyz></xyz>"),
            (u = "hidden" in e),
            (l =
              1 == e.childNodes.length ||
              (function () {
                s.createElement("a");
                var e = s.createDocumentFragment();
                return (
                  void 0 === e.cloneNode ||
                  void 0 === e.createDocumentFragment ||
                  void 0 === e.createElement
                );
              })());
        } catch (e) {
          l = u = !0;
        }
      })();
      var p = {
        elements:
          t.elements ||
          "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
        version: "3.7.0",
        shivCSS: !1 !== t.shivCSS,
        supportsUnknownElements: l,
        shivMethods: !1 !== t.shivMethods,
        type: "default",
        shivDocument: c,
        createElement: m,
        createDocumentFragment: function (e, t) {
          if ((e || (e = s), l)) return e.createDocumentFragment();
          for (
            var n = (t = t || f(e)).frag.cloneNode(),
              r = 0,
              o = d(),
              a = o.length;
            r < a;
            r++
          )
            n.createElement(o[r]);
          return n;
        },
      };
      (e.html5 = p), c(s);
    })(this, d),
    (c._version = "2.8.3"),
    (c._prefixes = p),
    (c._domPrefixes = v),
    (c._cssomPrefixes = g),
    (c.mq = function (e) {
      var t,
        n = r.matchMedia || r.msMatchMedia;
      return n
        ? (n(e) && n(e).matches) || !1
        : (C(
            "@media " + e + " { #" + m + " { position: absolute; } }",
            function (e) {
              t =
                "absolute" ==
                (r.getComputedStyle
                  ? getComputedStyle(e, null)
                  : e.currentStyle
                ).position;
            }
          ),
          t);
    }),
    (c.hasEvent = k),
    (c.testProp = function (e) {
      return j([e]);
    }),
    (c.testAllProps = $),
    (c.testStyles = C),
    (c.prefixed = function (e, t, n) {
      return t ? $(e, t, n) : $(e, "pfx");
    }),
    (f.className =
      f.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + w.join(" ")),
    c
  );
})(this, this.document);
