!(function (a, t) {
  "function" == typeof define && define.amd
    ? define(t)
    : "object" == typeof exports
    ? (module.exports = t(require, exports, module))
    : (a.CountUp = t());
})(this, function (a, t, n) {
  var e = function (a, t, n, e, i, r) {
    for (
      var o = 0, s = ["webkit", "moz", "ms", "o"], m = 0;
      m < s.length && !window.requestAnimationFrame;
      ++m
    )
      (window.requestAnimationFrame = window[s[m] + "RequestAnimationFrame"]),
        (window.cancelAnimationFrame =
          window[s[m] + "CancelAnimationFrame"] ||
          window[s[m] + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame ||
      (window.requestAnimationFrame = function (a, t) {
        var n = new Date().getTime(),
          e = Math.max(0, 16 - (n - o)),
          i = window.setTimeout(function () {
            a(n + e);
          }, e);
        return (o = n + e), i;
      }),
      window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function (a) {
          clearTimeout(a);
        });
    var u = this;
    u.options = {
      useEasing: !0,
      useGrouping: !0,
      separator: ",",
      decimal: ".",
      easingFn: null,
      formattingFn: null,
    };
    for (var l in r) r.hasOwnProperty(l) && (u.options[l] = r[l]);
    "" === u.options.separator && (u.options.useGrouping = !1),
      u.options.prefix || (u.options.prefix = ""),
      u.options.suffix || (u.options.suffix = ""),
      (u.d = "string" == typeof a ? document.getElementById(a) : a),
      (u.startVal = Number(t)),
      (u.endVal = Number(n)),
      (u.countDown = u.startVal > u.endVal),
      (u.frameVal = u.startVal),
      (u.decimals = Math.max(0, e || 0)),
      (u.dec = Math.pow(10, u.decimals)),
      (u.duration = 1e3 * Number(i) || 2e3),
      (u.formatNumber = function (a) {
        (a = a.toFixed(u.decimals)), (a += "");
        var t, n, e, i;
        if (
          ((t = a.split(".")),
          (n = t[0]),
          (e = t.length > 1 ? u.options.decimal + t[1] : ""),
          (i = /(\d+)(\d{3})/),
          u.options.useGrouping)
        )
          for (; i.test(n); )
            n = n.replace(i, "$1" + u.options.separator + "$2");
        return u.options.prefix + n + e + u.options.suffix;
      }),
      (u.easeOutExpo = function (a, t, n, e) {
        return (n * (-Math.pow(2, (-10 * a) / e) + 1) * 1024) / 1023 + t;
      }),
      (u.easingFn = u.options.easingFn ? u.options.easingFn : u.easeOutExpo),
      (u.formattingFn = u.options.formattingFn
        ? u.options.formattingFn
        : u.formatNumber),
      (u.version = function () {
        return "1.7.1";
      }),
      (u.printValue = function (a) {
        var t = u.formattingFn(a);
        "INPUT" === u.d.tagName
          ? (this.d.value = t)
          : "text" === u.d.tagName || "tspan" === u.d.tagName
          ? (this.d.textContent = t)
          : (this.d.innerHTML = t);
      }),
      (u.count = function (a) {
        u.startTime || (u.startTime = a), (u.timestamp = a);
        var t = a - u.startTime;
        (u.remaining = u.duration - t),
          u.options.useEasing
            ? u.countDown
              ? (u.frameVal =
                  u.startVal -
                  u.easingFn(t, 0, u.startVal - u.endVal, u.duration))
              : (u.frameVal = u.easingFn(
                  t,
                  u.startVal,
                  u.endVal - u.startVal,
                  u.duration
                ))
            : u.countDown
            ? (u.frameVal =
                u.startVal - (u.startVal - u.endVal) * (t / u.duration))
            : (u.frameVal =
                u.startVal + (u.endVal - u.startVal) * (t / u.duration)),
          u.countDown
            ? (u.frameVal = u.frameVal < u.endVal ? u.endVal : u.frameVal)
            : (u.frameVal = u.frameVal > u.endVal ? u.endVal : u.frameVal),
          (u.frameVal = Math.round(u.frameVal * u.dec) / u.dec),
          u.printValue(u.frameVal),
          t < u.duration
            ? (u.rAF = requestAnimationFrame(u.count))
            : u.callback && u.callback();
      }),
      (u.start = function (a) {
        return (u.callback = a), (u.rAF = requestAnimationFrame(u.count)), !1;
      }),
      (u.pauseResume = function () {
        u.paused
          ? ((u.paused = !1),
            delete u.startTime,
            (u.duration = u.remaining),
            (u.startVal = u.frameVal),
            requestAnimationFrame(u.count))
          : ((u.paused = !0), cancelAnimationFrame(u.rAF));
      }),
      (u.reset = function () {
        (u.paused = !1),
          delete u.startTime,
          (u.startVal = t),
          cancelAnimationFrame(u.rAF),
          u.printValue(u.startVal);
      }),
      (u.update = function (a) {
        cancelAnimationFrame(u.rAF),
          (u.paused = !1),
          delete u.startTime,
          (u.startVal = u.frameVal),
          (u.endVal = Number(a)),
          (u.countDown = u.startVal > u.endVal),
          (u.rAF = requestAnimationFrame(u.count));
      }),
      u.printValue(u.startVal);
  };
  return e;
});
!(function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery);
})(function (n) {
  var e,
    r,
    a =
      "[object OperaMini]" == Object.prototype.toString.call(window.operamini),
    o = "placeholder" in document.createElement("input") && !a,
    t = "placeholder" in document.createElement("textarea") && !a,
    i = n.valHooks,
    l = n.propHooks;
  function d(e, r) {
    var a = this,
      o = n(a);
    if (a.value == o.attr("placeholder") && o.hasClass("placeholder"))
      if (o.data("placeholder-password")) {
        if (
          ((o = o
            .hide()
            .nextAll('input[type="password"]:first')
            .show()
            .attr("id", o.removeAttr("id").data("placeholder-id"))),
          !0 === e)
        )
          return (o[0].value = r);
        o.focus();
      } else
        (a.value = ""), o.removeClass("placeholder"), a == s() && a.select();
  }
  function c() {
    var r,
      a,
      o,
      t,
      e = this,
      i = n(e),
      l = this.id;
    if ("" === e.value) {
      if ("password" === e.type) {
        if (!i.data("placeholder-textinput")) {
          try {
            r = i.clone().attr({ type: "text" });
          } catch (e) {
            r = n("<input>").attr(
              n.extend(
                ((a = this),
                (o = {}),
                (t = /^jQuery\d+$/),
                n.each(a.attributes, function (e, r) {
                  r.specified && !t.test(r.name) && (o[r.name] = r.value);
                }),
                o),
                { type: "text" }
              )
            );
          }
          r
            .removeAttr("name")
            .data({ "placeholder-password": i, "placeholder-id": l })
            .bind("focus.placeholder", d),
            i
              .data({ "placeholder-textinput": r, "placeholder-id": l })
              .before(r);
        }
        i = i
          .removeAttr("id")
          .hide()
          .prevAll('input[type="text"]:first')
          .attr("id", l)
          .show();
      }
      i.addClass("placeholder"), (i[0].value = i.attr("placeholder"));
    } else i.removeClass("placeholder");
  }
  function s() {
    try {
      return document.activeElement;
    } catch (e) {}
  }
  o && t
    ? ((r = n.fn.placeholder =
        function () {
          return this;
        }).input = r.textarea =
        !0)
    : (((r = n.fn.placeholder =
        function () {
          return (
            this.filter((o ? "textarea" : ":input") + "[placeholder]")
              .not(".placeholder")
              .bind({ "focus.placeholder": d, "blur.placeholder": c })
              .data("placeholder-enabled", !0)
              .trigger("blur.placeholder"),
            this
          );
        }).input = o),
      (r.textarea = t),
      (e = {
        get: function (e) {
          var r = n(e),
            a = r.data("placeholder-password");
          return a
            ? a[0].value
            : r.data("placeholder-enabled") && r.hasClass("placeholder")
            ? ""
            : e.value;
        },
        set: function (e, r) {
          var a = n(e),
            o = a.data("placeholder-password");
          return o
            ? (o[0].value = r)
            : a.data("placeholder-enabled")
            ? ("" === r
                ? ((e.value = r), e != s() && c.call(e))
                : (a.hasClass("placeholder") && d.call(e, !0, r)) ||
                  (e.value = r),
              a)
            : (e.value = r);
        },
      }),
      o || ((i.input = e), (l.value = e)),
      t || ((i.textarea = e), (l.value = e)),
      n(function () {
        n(document).delegate("form", "submit.placeholder", function () {
          var e = n(".placeholder", this).each(d);
          setTimeout(function () {
            e.each(c);
          }, 10);
        });
      }),
      n(window).bind("beforeunload.placeholder", function () {
        n(".placeholder").each(function () {
          this.value = "";
        });
      }));
}),
  (function (r) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (e) {
          return r(e);
        })
      : "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = r(require("jquery")))
      : r(window.jQuery);
  })(function (e) {
    "use strict";
    function r(e) {
      void 0 === e && (e = window.navigator.userAgent), (e = e.toLowerCase());
      var r =
          /(edge)\/([\w.]+)/.exec(e) ||
          /(opr)[\/]([\w.]+)/.exec(e) ||
          /(chrome)[ \/]([\w.]+)/.exec(e) ||
          /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(
            e
          ) ||
          /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(
            e
          ) ||
          /(webkit)[ \/]([\w.]+)/.exec(e) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) ||
          /(msie) ([\w.]+)/.exec(e) ||
          (0 <= e.indexOf("trident") && /(rv)(?::| )([\w.]+)/.exec(e)) ||
          (e.indexOf("compatible") < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)) ||
          [],
        a =
          /(ipad)/.exec(e) ||
          /(ipod)/.exec(e) ||
          /(iphone)/.exec(e) ||
          /(kindle)/.exec(e) ||
          /(silk)/.exec(e) ||
          /(android)/.exec(e) ||
          /(windows phone)/.exec(e) ||
          /(win)/.exec(e) ||
          /(mac)/.exec(e) ||
          /(linux)/.exec(e) ||
          /(cros)/.exec(e) ||
          /(playbook)/.exec(e) ||
          /(bb)/.exec(e) ||
          /(blackberry)/.exec(e) ||
          [],
        o = {},
        t = {
          browser: r[5] || r[3] || r[1] || "",
          version: r[2] || r[4] || "0",
          versionNumber: r[4] || r[2] || "0",
          platform: a[0] || "",
        };
      if (
        (t.browser &&
          ((o[t.browser] = !0),
          (o.version = t.version),
          (o.versionNumber = parseInt(t.versionNumber, 10))),
        t.platform && (o[t.platform] = !0),
        (o.android ||
          o.bb ||
          o.blackberry ||
          o.ipad ||
          o.iphone ||
          o.ipod ||
          o.kindle ||
          o.playbook ||
          o.silk ||
          o["windows phone"]) &&
          (o.mobile = !0),
        (o.cros || o.mac || o.linux || o.win) && (o.desktop = !0),
        (o.chrome || o.opr || o.safari) && (o.webkit = !0),
        o.rv || o.edge)
      ) {
        var i = "msie";
        o[(t.browser = i)] = !0;
      }
      if (o.safari && o.blackberry) {
        var l = "blackberry";
        o[(t.browser = l)] = !0;
      }
      if (o.safari && o.playbook) {
        var n = "playbook";
        o[(t.browser = n)] = !0;
      }
      if (o.bb) {
        var d = "blackberry";
        o[(t.browser = d)] = !0;
      }
      if (o.opr) {
        var c = "opera";
        o[(t.browser = c)] = !0;
      }
      if (o.safari && o.android) {
        var s = "android";
        o[(t.browser = s)] = !0;
      }
      if (o.safari && o.kindle) {
        var p = "kindle";
        o[(t.browser = p)] = !0;
      }
      if (o.safari && o.silk) {
        var u = "silk";
        o[(t.browser = u)] = !0;
      }
      return (o.name = t.browser), (o.platform = t.platform), o;
    }
    return (
      (window.jQBrowser = r(window.navigator.userAgent)),
      (window.jQBrowser.uaMatch = r),
      e && (e.browser = window.jQBrowser),
      window.jQBrowser
    );
  });
!(function () {
  "use strict";
  function l(a, t) {
    var e;
    if (
      ((t = t || {}),
      (this.trackingClick = !1),
      (this.trackingClickStart = 0),
      (this.targetElement = null),
      (this.touchStartX = 0),
      (this.touchStartY = 0),
      (this.lastTouchIdentifier = 0),
      (this.touchBoundary = t.touchBoundary || 10),
      (this.layer = a),
      (this.tapDelay = t.tapDelay || 200),
      (this.tapTimeout = t.tapTimeout || 700),
      !l.notNeeded(a))
    ) {
      for (
        var n = [
            "onMouse",
            "onClick",
            "onTouchStart",
            "onTouchMove",
            "onTouchEnd",
            "onTouchCancel",
          ],
          i = this,
          o = 0,
          s = n.length;
        o < s;
        o++
      )
        i[n[o]] = r(i[n[o]], i);
      c &&
        (a.addEventListener("mouseover", this.onMouse, !0),
        a.addEventListener("mousedown", this.onMouse, !0),
        a.addEventListener("mouseup", this.onMouse, !0)),
        a.addEventListener("click", this.onClick, !0),
        a.addEventListener("touchstart", this.onTouchStart, !1),
        a.addEventListener("touchmove", this.onTouchMove, !1),
        a.addEventListener("touchend", this.onTouchEnd, !1),
        a.addEventListener("touchcancel", this.onTouchCancel, !1),
        Event.prototype.stopImmediatePropagation ||
          ((a.removeEventListener = function (t, e, n) {
            var i = Node.prototype.removeEventListener;
            "click" === t
              ? i.call(a, t, e.hijacked || e, n)
              : i.call(a, t, e, n);
          }),
          (a.addEventListener = function (t, e, n) {
            var i = Node.prototype.addEventListener;
            "click" === t
              ? i.call(
                  a,
                  t,
                  e.hijacked ||
                    (e.hijacked = function (t) {
                      t.propagationStopped || e(t);
                    }),
                  n
                )
              : i.call(a, t, e, n);
          })),
        "function" == typeof a.onclick &&
          ((e = a.onclick),
          a.addEventListener(
            "click",
            function (t) {
              e(t);
            },
            !1
          ),
          (a.onclick = null));
    }
    function r(t, e) {
      return function () {
        return t.apply(e, arguments);
      };
    }
  }
  var t = 0 <= navigator.userAgent.indexOf("Windows Phone"),
    c = 0 < navigator.userAgent.indexOf("Android") && !t,
    r = /iP(ad|hone|od)/.test(navigator.userAgent) && !t,
    u = r && /OS 4_\d(_\d)?/.test(navigator.userAgent),
    h = r && /OS [6-7]_\d/.test(navigator.userAgent),
    a = 0 < navigator.userAgent.indexOf("BB10");
  (l.prototype.needsClick = function (t) {
    switch (t.nodeName.toLowerCase()) {
      case "button":
      case "select":
      case "textarea":
        if (t.disabled) return !0;
        break;
      case "input":
        if ((r && "file" === t.type) || t.disabled) return !0;
        break;
      case "label":
      case "iframe":
      case "video":
        return !0;
    }
    return /\bneedsclick\b/.test(t.className);
  }),
    (l.prototype.needsFocus = function (t) {
      switch (t.nodeName.toLowerCase()) {
        case "textarea":
          return !0;
        case "select":
          return !c;
        case "input":
          switch (t.type) {
            case "button":
            case "checkbox":
            case "file":
            case "image":
            case "radio":
            case "submit":
              return !1;
          }
          return !t.disabled && !t.readOnly;
        default:
          return /\bneedsfocus\b/.test(t.className);
      }
    }),
    (l.prototype.sendClick = function (t, e) {
      var n, i;
      document.activeElement &&
        document.activeElement !== t &&
        document.activeElement.blur(),
        (i = e.changedTouches[0]),
        (n = document.createEvent("MouseEvents")).initMouseEvent(
          this.determineEventType(t),
          !0,
          !0,
          window,
          1,
          i.screenX,
          i.screenY,
          i.clientX,
          i.clientY,
          !1,
          !1,
          !1,
          !1,
          0,
          null
        ),
        (n.forwardedTouchEvent = !0),
        t.dispatchEvent(n);
    }),
    (l.prototype.determineEventType = function (t) {
      return c && "select" === t.tagName.toLowerCase() ? "mousedown" : "click";
    }),
    (l.prototype.focus = function (t) {
      var e;
      r &&
      t.setSelectionRange &&
      0 !== t.type.indexOf("date") &&
      "time" !== t.type &&
      "month" !== t.type
        ? ((e = t.value.length), t.setSelectionRange(e, e))
        : t.focus();
    }),
    (l.prototype.updateScrollParent = function (t) {
      var e, n;
      if (!(e = t.fastClickScrollParent) || !e.contains(t)) {
        n = t;
        do {
          if (n.scrollHeight > n.offsetHeight) {
            (e = n), (t.fastClickScrollParent = n);
            break;
          }
          n = n.parentElement;
        } while (n);
      }
      e && (e.fastClickLastScrollTop = e.scrollTop);
    }),
    (l.prototype.getTargetElementFromEventTarget = function (t) {
      return t.nodeType === Node.TEXT_NODE ? t.parentNode : t;
    }),
    (l.prototype.onTouchStart = function (t) {
      var e, n, i;
      if (1 < t.targetTouches.length) return !0;
      if (
        ((e = this.getTargetElementFromEventTarget(t.target)),
        (n = t.targetTouches[0]),
        r)
      ) {
        if ((i = window.getSelection()).rangeCount && !i.isCollapsed) return !0;
        if (!u) {
          if (n.identifier && n.identifier === this.lastTouchIdentifier)
            return t.preventDefault(), !1;
          (this.lastTouchIdentifier = n.identifier), this.updateScrollParent(e);
        }
      }
      return (
        (this.trackingClick = !0),
        (this.trackingClickStart = t.timeStamp),
        (this.targetElement = e),
        (this.touchStartX = n.pageX),
        (this.touchStartY = n.pageY),
        t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(),
        !0
      );
    }),
    (l.prototype.touchHasMoved = function (t) {
      var e = t.changedTouches[0],
        n = this.touchBoundary;
      return (
        Math.abs(e.pageX - this.touchStartX) > n ||
        Math.abs(e.pageY - this.touchStartY) > n
      );
    }),
    (l.prototype.onTouchMove = function (t) {
      return (
        this.trackingClick &&
          (this.targetElement !==
            this.getTargetElementFromEventTarget(t.target) ||
            this.touchHasMoved(t)) &&
          ((this.trackingClick = !1), (this.targetElement = null)),
        !0
      );
    }),
    (l.prototype.findControl = function (t) {
      return void 0 !== t.control
        ? t.control
        : t.htmlFor
        ? document.getElementById(t.htmlFor)
        : t.querySelector(
            "button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea"
          );
    }),
    (l.prototype.onTouchEnd = function (t) {
      var e,
        n,
        i,
        a,
        o,
        s = this.targetElement;
      if (!this.trackingClick) return !0;
      if (t.timeStamp - this.lastClickTime < this.tapDelay)
        return (this.cancelNextClick = !0);
      if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
      if (
        ((this.cancelNextClick = !1),
        (this.lastClickTime = t.timeStamp),
        (n = this.trackingClickStart),
        (this.trackingClick = !1),
        (this.trackingClickStart = 0),
        h &&
          ((o = t.changedTouches[0]),
          ((s =
            document.elementFromPoint(
              o.pageX - window.pageXOffset,
              o.pageY - window.pageYOffset
            ) || s).fastClickScrollParent =
            this.targetElement.fastClickScrollParent)),
        "label" === (i = s.tagName.toLowerCase()))
      ) {
        if ((e = this.findControl(s))) {
          if ((this.focus(s), c)) return !1;
          s = e;
        }
      } else if (this.needsFocus(s))
        return (
          100 < t.timeStamp - n || (r && window.top !== window && "input" === i)
            ? (this.targetElement = null)
            : (this.focus(s),
              this.sendClick(s, t),
              (r && "select" === i) ||
                ((this.targetElement = null), t.preventDefault())),
          !1
        );
      return (
        !(
          !r ||
          u ||
          !(a = s.fastClickScrollParent) ||
          a.fastClickLastScrollTop === a.scrollTop
        ) ||
        (this.needsClick(s) || (t.preventDefault(), this.sendClick(s, t)), !1)
      );
    }),
    (l.prototype.onTouchCancel = function () {
      (this.trackingClick = !1), (this.targetElement = null);
    }),
    (l.prototype.onMouse = function (t) {
      return (
        !this.targetElement ||
        !!t.forwardedTouchEvent ||
        !t.cancelable ||
        !(!this.needsClick(this.targetElement) || this.cancelNextClick) ||
        (t.stopImmediatePropagation
          ? t.stopImmediatePropagation()
          : (t.propagationStopped = !0),
        t.stopPropagation(),
        t.preventDefault(),
        !1)
      );
    }),
    (l.prototype.onClick = function (t) {
      var e;
      return this.trackingClick
        ? ((this.targetElement = null), !(this.trackingClick = !1))
        : ("submit" === t.target.type && 0 === t.detail) ||
            ((e = this.onMouse(t)) || (this.targetElement = null), e);
    }),
    (l.prototype.destroy = function () {
      var t = this.layer;
      c &&
        (t.removeEventListener("mouseover", this.onMouse, !0),
        t.removeEventListener("mousedown", this.onMouse, !0),
        t.removeEventListener("mouseup", this.onMouse, !0)),
        t.removeEventListener("click", this.onClick, !0),
        t.removeEventListener("touchstart", this.onTouchStart, !1),
        t.removeEventListener("touchmove", this.onTouchMove, !1),
        t.removeEventListener("touchend", this.onTouchEnd, !1),
        t.removeEventListener("touchcancel", this.onTouchCancel, !1);
    }),
    (l.notNeeded = function (t) {
      var e, n, i;
      if (void 0 === window.ontouchstart) return !0;
      if ((n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1])) {
        if (!c) return !0;
        if ((e = document.querySelector("meta[name=viewport]"))) {
          if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
          if (
            31 < n &&
            document.documentElement.scrollWidth <= window.outerWidth
          )
            return !0;
        }
      }
      if (
        a &&
        10 <=
          (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] &&
        3 <= i[2] &&
        (e = document.querySelector("meta[name=viewport]"))
      ) {
        if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
        if (document.documentElement.scrollWidth <= window.outerWidth)
          return !0;
      }
      return (
        "none" === t.style.msTouchAction ||
        "manipulation" === t.style.touchAction ||
        !!(
          27 <= +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] &&
          (e = document.querySelector("meta[name=viewport]")) &&
          (-1 !== e.content.indexOf("user-scalable=no") ||
            document.documentElement.scrollWidth <= window.outerWidth)
        ) ||
        "none" === t.style.touchAction ||
        "manipulation" === t.style.touchAction
      );
    }),
    (l.attach = function (t, e) {
      return new l(t, e);
    }),
    "function" == typeof define && "object" == typeof define.amd && define.amd
      ? define(function () {
          return l;
        })
      : "undefined" != typeof module && module.exports
      ? ((module.exports = l.attach), (module.exports.FastClick = l))
      : (window.FastClick = l);
})(),
  (function (h, l, a, o) {
    "use strict";
    var t, e;
    (t = [
      "foundation-mq-small",
      "foundation-mq-small-only",
      "foundation-mq-medium",
      "foundation-mq-medium-only",
      "foundation-mq-large",
      "foundation-mq-large-only",
      "foundation-mq-xlarge",
      "foundation-mq-xlarge-only",
      "foundation-mq-xxlarge",
      "foundation-data-attribute-namespace",
    ]),
      (e = h("head")).prepend(
        h.map(t, function (t) {
          if (0 === e.has("." + t).length) return '<meta class="' + t + '" />';
        })
      ),
      h(function () {
        "undefined" != typeof FastClick &&
          void 0 !== a.body &&
          FastClick.attach(a.body);
      });
    var c = function (t, e) {
        if ("string" != typeof t) return h(t, e);
        if (e) {
          var n;
          if (e.jquery) {
            if (!(n = e[0])) return e;
          } else n = e;
          return h(n.querySelectorAll(t));
        }
        return h(a.querySelectorAll(t));
      },
      n = function (t) {
        var e = [];
        return (
          t || e.push("data"),
          0 < this.namespace.length && e.push(this.namespace),
          e.push(this.name),
          e.join("-")
        );
      },
      i = function (t) {
        for (var e = t.split("-"), n = e.length, i = []; n--; )
          0 !== n
            ? i.push(e[n])
            : 0 < this.namespace.length
            ? i.push(this.namespace, e[n])
            : i.push(e[n]);
        return i.reverse().join("-");
      },
      s = function (n, i) {
        var a = this,
          t = function () {
            var t = c(this),
              e = !t.data(a.attr_name(!0) + "-init");
            t.data(
              a.attr_name(!0) + "-init",
              h.extend({}, a.settings, i || n, a.data_options(t))
            ),
              e && a.events(this);
          };
        if (
          (c(this.scope).is("[" + this.attr_name() + "]")
            ? t.call(this.scope)
            : c("[" + this.attr_name() + "]", this.scope).each(t),
          "string" == typeof n)
        )
          return this[n].call(this, i);
      };
    function r(t) {
      (this.selector = t), (this.query = "");
    }
    l.matchMedia ||
      (l.matchMedia = (function () {
        var e = l.styleMedia || l.media;
        if (!e) {
          var n,
            i = a.createElement("style"),
            t = a.getElementsByTagName("script")[0];
          (i.type = "text/css"),
            (i.id = "matchmediajs-test"),
            t.parentNode.insertBefore(i, t),
            (n =
              ("getComputedStyle" in l && l.getComputedStyle(i, null)) ||
              i.currentStyle),
            (e = {
              matchMedium: function (t) {
                var e =
                  "@media " + t + "{ #matchmediajs-test { width: 1px; } }";
                return (
                  i.styleSheet
                    ? (i.styleSheet.cssText = e)
                    : (i.textContent = e),
                  "1px" === n.width
                );
              },
            });
        }
        return function (t) {
          return { matches: e.matchMedium(t || "all"), media: t || "all" };
        };
      })()),
      (function (e) {
        for (
          var n,
            a = 0,
            t = ["webkit", "moz"],
            i = l.requestAnimationFrame,
            o = l.cancelAnimationFrame,
            s = void 0 !== e.fx;
          a < t.length && !i;
          a++
        )
          (i = l[t[a] + "RequestAnimationFrame"]),
            (o =
              o ||
              l[t[a] + "CancelAnimationFrame"] ||
              l[t[a] + "CancelRequestAnimationFrame"]);
        function r() {
          n && (i(r), s && e.fx.tick());
        }
        i
          ? ((l.requestAnimationFrame = i),
            (l.cancelAnimationFrame = o),
            s &&
              ((e.fx.timer = function (t) {
                t() && e.timers.push(t) && !n && ((n = !0), r());
              }),
              (e.fx.stop = function () {
                n = !1;
              })))
          : ((l.requestAnimationFrame = function (t) {
              var e = new Date().getTime(),
                n = Math.max(0, 16 - (e - a)),
                i = l.setTimeout(function () {
                  t(e + n);
                }, n);
              return (a = e + n), i;
            }),
            (l.cancelAnimationFrame = function (t) {
              clearTimeout(t);
            }));
      })(h),
      (r.prototype.toString = function () {
        return (
          this.query ||
          (this.query = c(this.selector)
            .css("font-family")
            .replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""))
        );
      }),
      (l.Foundation = {
        name: "Foundation",
        version: "5.5.3",
        media_queries: {
          small: new r(".foundation-mq-small"),
          "small-only": new r(".foundation-mq-small-only"),
          medium: new r(".foundation-mq-medium"),
          "medium-only": new r(".foundation-mq-medium-only"),
          large: new r(".foundation-mq-large"),
          "large-only": new r(".foundation-mq-large-only"),
          xlarge: new r(".foundation-mq-xlarge"),
          "xlarge-only": new r(".foundation-mq-xlarge-only"),
          xxlarge: new r(".foundation-mq-xxlarge"),
        },
        stylesheet: h("<style></style>").appendTo("head")[0].sheet,
        global: { namespace: o },
        init: function (t, e, n, i, a) {
          var o = [t, n, i, a],
            s = [];
          if (
            ((this.rtl = /rtl/i.test(c("html").attr("dir"))),
            (this.scope = t || this.scope),
            this.set_namespace(),
            e && "string" == typeof e && !/reflow/i.test(e))
          )
            this.libs.hasOwnProperty(e) && s.push(this.init_lib(e, o));
          else for (var r in this.libs) s.push(this.init_lib(r, e));
          return (
            c(l).load(function () {
              c(l)
                .trigger("resize.fndtn.clearing")
                .trigger("resize.fndtn.dropdown")
                .trigger("resize.fndtn.equalizer")
                .trigger("resize.fndtn.interchange")
                .trigger("resize.fndtn.joyride")
                .trigger("resize.fndtn.magellan")
                .trigger("resize.fndtn.topbar")
                .trigger("resize.fndtn.slider");
            }),
            t
          );
        },
        init_lib: function (t, e) {
          return this.libs.hasOwnProperty(t)
            ? (this.patch(this.libs[t]),
              e && e.hasOwnProperty(t)
                ? (void 0 !== this.libs[t].settings
                    ? h.extend(!0, this.libs[t].settings, e[t])
                    : void 0 !== this.libs[t].defaults &&
                      h.extend(!0, this.libs[t].defaults, e[t]),
                  this.libs[t].init.apply(this.libs[t], [this.scope, e[t]]))
                : ((e = e instanceof Array ? e : new Array(e)),
                  this.libs[t].init.apply(this.libs[t], e)))
            : function () {};
        },
        patch: function (t) {
          (t.scope = this.scope),
            (t.namespace = this.global.namespace),
            (t.rtl = this.rtl),
            (t.data_options = this.utils.data_options),
            (t.attr_name = n),
            (t.add_namespace = i),
            (t.bindings = s),
            (t.S = this.utils.S);
        },
        inherit: function (t, e) {
          for (var n = e.split(" "), i = n.length; i--; )
            this.utils.hasOwnProperty(n[i]) && (t[n[i]] = this.utils[n[i]]);
        },
        set_namespace: function () {
          var t =
            this.global.namespace === o
              ? h(".foundation-data-attribute-namespace").css("font-family")
              : this.global.namespace;
          this.global.namespace = t === o || /false/i.test(t) ? "" : t;
        },
        libs: {},
        utils: {
          S: c,
          throttle: function (n, i) {
            var a = null;
            return function () {
              var t = this,
                e = arguments;
              null == a &&
                (a = setTimeout(function () {
                  n.apply(t, e), (a = null);
                }, i));
            };
          },
          debounce: function (i, a, o) {
            var s, r;
            return function () {
              var t = this,
                e = arguments,
                n = o && !s;
              return (
                clearTimeout(s),
                (s = setTimeout(function () {
                  (s = null), o || (r = i.apply(t, e));
                }, a)),
                n && (r = i.apply(t, e)),
                r
              );
            };
          },
          data_options: function (t, e) {
            e = e || "options";
            var n,
              i,
              a,
              o,
              s,
              r,
              l = {},
              c =
                ((o = t),
                0 < (s = Foundation.global.namespace).length
                  ? o.data(s + "-" + e)
                  : o.data(e));
            if ("object" == typeof c) return c;
            function u(t) {
              return "string" == typeof t ? h.trim(t) : t;
            }
            for (n = (a = (c || ":").split(";")).length; n--; )
              (i = [(i = a[n].split(":"))[0], i.slice(1).join(":")]),
                /true/i.test(i[1]) && (i[1] = !0),
                /false/i.test(i[1]) && (i[1] = !1),
                (r = i[1]),
                isNaN(r - 0) ||
                  null === r ||
                  "" === r ||
                  !1 === r ||
                  !0 === r ||
                  (-1 === i[1].indexOf(".")
                    ? (i[1] = parseInt(i[1], 10))
                    : (i[1] = parseFloat(i[1]))),
                2 === i.length && 0 < i[0].length && (l[u(i[0])] = u(i[1]));
            return l;
          },
          register_media: function (t, e) {
            var n;
            Foundation.media_queries[t] === o &&
              (h("head").append('<meta class="' + e + '"/>'),
              (Foundation.media_queries[t] =
                (("string" == typeof (n = h("." + e).css("font-family")) ||
                  n instanceof String) &&
                  (n = n.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, "")),
                n)));
          },
          add_custom_rule: function (t, e) {
            e === o && Foundation.stylesheet
              ? Foundation.stylesheet.insertRule(
                  t,
                  Foundation.stylesheet.cssRules.length
                )
              : Foundation.media_queries[e] !== o &&
                Foundation.stylesheet.insertRule(
                  "@media " + Foundation.media_queries[e] + "{ " + t + " }",
                  Foundation.stylesheet.cssRules.length
                );
          },
          image_loaded: function (t, e) {
            var n = this,
              i = t.length;
            (0 === i ||
              (function (t) {
                for (var e = t.length - 1; 0 <= e; e--)
                  if (t.attr("height") === o) return !1;
                return !0;
              })(t)) &&
              e(t),
              t.each(function () {
                !(function (t, e) {
                  function n() {
                    e(t[0]);
                  }
                  t.attr("src")
                    ? t[0].complete || 4 === t[0].readyState
                      ? n()
                      : function () {
                          if (
                            (this.one("load", n),
                            /MSIE (\d+\.\d+);/.test(navigator.userAgent))
                          ) {
                            var t = this.attr("src"),
                              e = t.match(/\?/) ? "&" : "?";
                            (e += "random=" + new Date().getTime()),
                              this.attr("src", t + e);
                          }
                        }.call(t)
                    : n();
                })(n.S(this), function () {
                  0 === (i -= 1) && e(t);
                });
              });
          },
          random_str: function () {
            return (
              this.fidx || (this.fidx = 0),
              (this.prefix =
                this.prefix ||
                [this.name || "F", (+new Date()).toString(36)].join("-")),
              this.prefix + (this.fidx++).toString(36)
            );
          },
          match: function (t) {
            return l.matchMedia(t).matches;
          },
          is_small_up: function () {
            return this.match(Foundation.media_queries.small);
          },
          is_medium_up: function () {
            return this.match(Foundation.media_queries.medium);
          },
          is_large_up: function () {
            return this.match(Foundation.media_queries.large);
          },
          is_xlarge_up: function () {
            return this.match(Foundation.media_queries.xlarge);
          },
          is_xxlarge_up: function () {
            return this.match(Foundation.media_queries.xxlarge);
          },
          is_small_only: function () {
            return !(
              this.is_medium_up() ||
              this.is_large_up() ||
              this.is_xlarge_up() ||
              this.is_xxlarge_up()
            );
          },
          is_medium_only: function () {
            return (
              this.is_medium_up() &&
              !this.is_large_up() &&
              !this.is_xlarge_up() &&
              !this.is_xxlarge_up()
            );
          },
          is_large_only: function () {
            return (
              this.is_medium_up() &&
              this.is_large_up() &&
              !this.is_xlarge_up() &&
              !this.is_xxlarge_up()
            );
          },
          is_xlarge_only: function () {
            return (
              this.is_medium_up() &&
              this.is_large_up() &&
              this.is_xlarge_up() &&
              !this.is_xxlarge_up()
            );
          },
          is_xxlarge_only: function () {
            return (
              this.is_medium_up() &&
              this.is_large_up() &&
              this.is_xlarge_up() &&
              this.is_xxlarge_up()
            );
          },
        },
      }),
      (h.fn.foundation = function () {
        var t = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
          return Foundation.init.apply(Foundation, [this].concat(t)), this;
        });
      });
  })(jQuery, window, window.document),
  (function (c, t, e, n) {
    "use strict";
    Foundation.libs.equalizer = {
      name: "equalizer",
      version: "5.5.3",
      settings: {
        use_tallest: !0,
        before_height_change: c.noop,
        after_height_change: c.noop,
        equalize_on_stack: !1,
        act_on_hidden_el: !1,
      },
      init: function (t, e, n) {
        Foundation.inherit(this, "image_loaded"),
          this.bindings(e, n),
          this.reflow();
      },
      events: function () {
        this.S(t)
          .off(".equalizer")
          .on(
            "resize.fndtn.equalizer",
            function (t) {
              this.reflow();
            }.bind(this)
          );
      },
      equalize: function (t) {
        var e,
          n,
          i = !1,
          a = t.data("equalizer"),
          o = t.data(this.attr_name(!0) + "-init") || this.settings;
        if (
          0 !==
            (e = o.act_on_hidden_el
              ? a
                ? t.find("[" + this.attr_name() + '-watch="' + a + '"]')
                : t.find("[" + this.attr_name() + "-watch]")
              : a
              ? t.find("[" + this.attr_name() + '-watch="' + a + '"]:visible')
              : t.find("[" + this.attr_name() + "-watch]:visible")).length &&
          (o.before_height_change(),
          t.trigger("before-height-change.fndth.equalizer"),
          e.height("inherit"),
          !1 !== o.equalize_on_stack ||
            ((n = e.first().offset().top),
            e.each(function () {
              if (c(this).offset().top !== n) return !(i = !0);
            }),
            !i))
        ) {
          var s = e
            .map(function () {
              return c(this).outerHeight(!1);
            })
            .get();
          if (o.use_tallest) {
            var r = Math.max.apply(null, s);
            e.css("height", r);
          } else {
            var l = Math.min.apply(null, s);
            e.css("height", l);
          }
          o.after_height_change(),
            t.trigger("after-height-change.fndtn.equalizer");
        }
      },
      reflow: function () {
        var i = this;
        this.S("[" + this.attr_name() + "]", this.scope).each(function () {
          var t = c(this),
            e = t.data("equalizer-mq"),
            n = !0;
          e &&
            ((e = "is_" + e.replace(/-/g, "_")),
            Foundation.utils.hasOwnProperty(e) && (n = !1)),
            i.image_loaded(i.S("img", this), function () {
              n || Foundation.utils[e]()
                ? i.equalize(t)
                : t
                    .find("[" + i.attr_name() + "-watch]:visible")
                    .css("height", "auto");
            });
        });
      },
    };
  })(jQuery, window, window.document),
  (function (d, f, m, p) {
    "use strict";
    Foundation.libs.tab = {
      name: "tab",
      version: "5.5.3",
      settings: {
        active_class: "active",
        callback: function () {},
        deep_linking: !1,
        scroll_to_content: !0,
        is_hover: !1,
      },
      default_tab_hashes: [],
      init: function (t, e, n) {
        var i = this;
        (0, this.S)(
          "[" + this.attr_name() + "] > .active > a",
          this.scope
        ).each(function () {
          i.default_tab_hashes.push(this.hash);
        }),
          this.bindings(e, n),
          this.handle_location_hash_change();
      },
      events: function () {
        var n = this,
          i = this.S,
          a = function (t, e) {
            (i(e)
              .closest("[" + n.attr_name() + "]")
              .data(n.attr_name(!0) + "-init").is_hover &&
              !Modernizr.touch) ||
              (9 !== (t.keyCode || t.which) &&
                (t.preventDefault(), t.stopPropagation()),
              n.toggle_active_tab(i(e).parent()));
          };
        i(this.scope)
          .off(".tab")
          .on(
            "keydown.fndtn.tab",
            "[" + this.attr_name() + "] > * > a",
            function (t) {
              var e = t.keyCode || t.which;
              if (13 === e || 32 === e) {
                a(t, this);
              }
            }
          )
          .on(
            "click.fndtn.tab",
            "[" + this.attr_name() + "] > * > a",
            function (t) {
              a(t, this);
            }
          )
          .on(
            "mouseenter.fndtn.tab",
            "[" + this.attr_name() + "] > * > a",
            function (t) {
              i(this)
                .closest("[" + n.attr_name() + "]")
                .data(n.attr_name(!0) + "-init").is_hover &&
                n.toggle_active_tab(i(this).parent());
            }
          ),
          i(f).on("hashchange.fndtn.tab", function (t) {
            t.preventDefault(), n.handle_location_hash_change();
          });
      },
      handle_location_hash_change: function () {
        var o = this,
          s = this.S;
        s("[" + this.attr_name() + "]", this.scope).each(function () {
          var t,
            e = s(this).data(o.attr_name(!0) + "-init");
          if (e.deep_linking)
            if (
              "" !=
              (t = e.scroll_to_content
                ? o.scope.location.hash
                : o.scope.location.hash.replace("fndtn-", ""))
            ) {
              var n = s(t);
              if (n.hasClass("content") && n.parent().hasClass("tabs-content"))
                o.toggle_active_tab(
                  d("[" + o.attr_name() + "] > * > a[href=" + t + "]").parent()
                );
              else {
                var i = n.closest(".content").attr("id");
                i != p &&
                  o.toggle_active_tab(
                    d(
                      "[" + o.attr_name() + "] > * > a[href=#" + i + "]"
                    ).parent(),
                    t
                  );
              }
            } else
              for (var a = 0; a < o.default_tab_hashes.length; a++)
                o.toggle_active_tab(
                  d(
                    "[" +
                      o.attr_name() +
                      "] > * > a[href=" +
                      o.default_tab_hashes[a] +
                      "]"
                  ).parent()
                );
        });
      },
      toggle_active_tab: function (t, e) {
        var n = this,
          i = n.S,
          a = t.closest("[" + this.attr_name() + "]"),
          o = t.find("a"),
          s = t.children("a").first(),
          r = "#" + s.attr("href").split("#")[1],
          l = i(r),
          c = t.siblings(),
          u = a.data(this.attr_name(!0) + "-init"),
          h = function (t) {
            (t !==
              (u.scroll_to_content
                ? n.default_tab_hashes[0]
                : "fndtn-" + n.default_tab_hashes[0].replace("#", "")) ||
              f.location.hash) &&
              (f.location.hash = t);
          };
        s.data("tab-content") &&
          (l = i((r = "#" + s.data("tab-content").split("#")[1]))),
          u.deep_linking &&
            (u.scroll_to_content
              ? (h(e || r),
                e == p || e == r
                  ? t.parent()[0].scrollIntoView()
                  : i(r)[0].scrollIntoView())
              : h(
                  e != p
                    ? "fndtn-" + e.replace("#", "")
                    : "fndtn-" + r.replace("#", "")
                )),
          t.addClass(u.active_class).triggerHandler("opened"),
          o.attr({ "aria-selected": "true", tabindex: 0 }),
          c.removeClass(u.active_class),
          c.find("a").attr({ "aria-selected": "false" }),
          l
            .siblings()
            .removeClass(u.active_class)
            .attr({ "aria-hidden": "true" }),
          l
            .addClass(u.active_class)
            .attr("aria-hidden", "false")
            .removeAttr("tabindex"),
          u.callback(t),
          l.triggerHandler("toggled", [l]),
          a.triggerHandler("toggled", [t]),
          o.off("keydown").on("keydown", function (t) {
            var e,
              n = d(this),
              i = d(this).parents("li").prev().children('[role="tab"]'),
              a = d(this).parents("li").next().children('[role="tab"]');
            switch (t.keyCode) {
              case 37:
                e = i;
                break;
              case 39:
                e = a;
                break;
              default:
                e = !1;
            }
            e.length &&
              (n.attr({ tabindex: "-1", "aria-selected": null }),
              e.attr({ tabindex: "0", "aria-selected": !0 }).focus()),
              d('[role="tabpanel"]').attr("aria-hidden", "true"),
              d("#" + d(m.activeElement).attr("href").substring(1)).attr(
                "aria-hidden",
                null
              );
          });
      },
      data_attr: function (t) {
        return 0 < this.namespace.length ? this.namespace + "-" + t : t;
      },
      off: function () {},
      reflow: function () {},
    };
  })(jQuery, window, window.document),
  (function (h, t, e, n) {
    "use strict";
    Foundation.libs["magellan-expedition"] = {
      name: "magellan-expedition",
      version: "5.5.3",
      settings: {
        active_class: "active",
        threshold: 0,
        destination_threshold: 20,
        throttle_delay: 30,
        fixed_top: 0,
        offset_by_height: !0,
        duration: 700,
        easing: "swing",
      },
      init: function (t, e, n) {
        Foundation.inherit(this, "throttle"), this.bindings(e, n);
      },
      events: function () {
        var u = this,
          t = u.S,
          e = u.settings;
        u.set_expedition_position(),
          t(u.scope)
            .off(".magellan")
            .on(
              "click.fndtn.magellan",
              "[" + u.add_namespace("data-magellan-arrival") + "] a[href*=#]",
              function (t) {
                var e = this.hostname === location.hostname || !this.hostname,
                  n =
                    u.filterPathname(location.pathname) ===
                    u.filterPathname(this.pathname),
                  i = this.hash.replace(/(:|\.|\/)/g, "\\$1"),
                  a = this;
                if (e && n && i) {
                  t.preventDefault();
                  var o = h(this).closest("[" + u.attr_name() + "]"),
                    s = o.data("magellan-expedition-init"),
                    r = this.hash.split("#").join(""),
                    l = h('a[name="' + r + '"]');
                  0 === l.length && (l = h("#" + r));
                  var c = l.offset().top - s.destination_threshold + 1;
                  s.offset_by_height && (c -= o.outerHeight()),
                    h("html, body")
                      .stop()
                      .animate(
                        { scrollTop: c },
                        s.duration,
                        s.easing,
                        function () {
                          history.pushState
                            ? history.pushState(
                                null,
                                null,
                                a.pathname + a.search + "#" + r
                              )
                            : (location.hash = a.pathname + a.search + "#" + r);
                        }
                      );
                }
              }
            )
            .on(
              "scroll.fndtn.magellan",
              u.throttle(this.check_for_arrivals.bind(this), e.throttle_delay)
            );
      },
      check_for_arrivals: function () {
        this.update_arrivals(), this.update_expedition_positions();
      },
      set_expedition_position: function () {
        var r = this;
        h("[" + this.attr_name() + "=fixed]", r.scope).each(function (t, e) {
          var n,
            i,
            a = h(this),
            o = a.data("magellan-expedition-init"),
            s = a.attr("styles");
          a.attr("style", ""),
            (n = a.offset().top + o.threshold),
            (i = parseInt(a.data("magellan-fixed-top"))),
            isNaN(i) || (r.settings.fixed_top = i),
            a.data(r.data_attr("magellan-top-offset"), n),
            a.attr("style", s);
        });
      },
      update_expedition_positions: function () {
        var o = this,
          s = h(t).scrollTop();
        h("[" + this.attr_name() + "=fixed]", o.scope).each(function () {
          var t = h(this),
            e = t.data("magellan-expedition-init"),
            n = t.attr("style"),
            i = t.data("magellan-top-offset");
          if (s + o.settings.fixed_top >= i) {
            var a = t.prev(
              "[" + o.add_namespace("data-magellan-expedition-clone") + "]"
            );
            0 === a.length &&
              ((a = t.clone()).removeAttr(o.attr_name()),
              a.attr(o.add_namespace("data-magellan-expedition-clone"), ""),
              t.before(a)),
              t.css({ position: "fixed", top: e.fixed_top }).addClass("fixed");
          } else t.prev("[" + o.add_namespace("data-magellan-expedition-clone") + "]").remove(), t.attr("style", n).css("position", "").css("top", "").removeClass("fixed");
        });
      },
      update_arrivals: function () {
        var o = this,
          s = h(t).scrollTop();
        h("[" + this.attr_name() + "]", o.scope).each(function () {
          var n = h(this),
            i = n.data(o.attr_name(!0) + "-init"),
            t = o.offsets(n, s),
            e = n.find("[" + o.add_namespace("data-magellan-arrival") + "]"),
            a = !1;
          t.each(function (t, e) {
            if (e.viewport_offset >= e.top_offset)
              return (
                n
                  .find("[" + o.add_namespace("data-magellan-arrival") + "]")
                  .not(e.arrival)
                  .removeClass(i.active_class),
                e.arrival.addClass(i.active_class),
                (a = !0)
              );
          }),
            a || e.removeClass(i.active_class);
        });
      },
      offsets: function (o, t) {
        var s = this,
          r = o.data(s.attr_name(!0) + "-init"),
          l = t;
        return o
          .find("[" + s.add_namespace("data-magellan-arrival") + "]")
          .map(function (t, e) {
            var n = h(this).data(s.data_attr("magellan-arrival")),
              i = h(
                "[" +
                  s.add_namespace("data-magellan-destination") +
                  "=" +
                  n +
                  "]"
              );
            if (0 < i.length) {
              var a = i.offset().top - r.destination_threshold;
              return (
                r.offset_by_height && (a -= o.outerHeight()),
                (a = Math.floor(a)),
                {
                  destination: i,
                  arrival: h(this),
                  top_offset: a,
                  viewport_offset: l,
                }
              );
            }
          })
          .sort(function (t, e) {
            return t.top_offset < e.top_offset
              ? -1
              : t.top_offset > e.top_offset
              ? 1
              : 0;
          });
      },
      data_attr: function (t) {
        return 0 < this.namespace.length ? this.namespace + "-" + t : t;
      },
      off: function () {
        this.S(this.scope).off(".magellan"), this.S(t).off(".magellan");
      },
      filterPathname: function (t) {
        return (t = t || "")
          .replace(/^\//, "")
          .replace(/(?:index|default).[a-zA-Z]{3,4}$/, "")
          .replace(/\/$/, "");
      },
      reflow: function () {
        h(
          "[" + this.add_namespace("data-magellan-expedition-clone") + "]",
          this.scope
        ).remove();
      },
    };
  })(jQuery, window, window.document);
(function ($, window, document, undefined) {
  "use strict";

  Foundation.libs.accordion = {
    name: "accordion",

    version: "5.5.3",

    settings: {
      content_class: "content",
      active_class: "active",
      multi_expand: false,
      toggleable: true,
      callback: function () {},
    },

    init: function (scope, method, options) {
      this.bindings(method, options);
    },

    events: function (instance) {
      var self = this;
      var S = this.S;
      self.create(this.S(instance));

      S(this.scope)
        .off(".fndtn.accordion")
        .on(
          "click.fndtn.accordion",
          "[" +
            this.attr_name() +
            "] > dd > a, [" +
            this.attr_name() +
            "] > li > a",
          function (e) {
            var accordion = S(this).closest("[" + self.attr_name() + "]"),
              groupSelector =
                self.attr_name() + "=" + accordion.attr(self.attr_name()),
              settings =
                accordion.data(self.attr_name(true) + "-init") || self.settings,
              target = S("#" + this.href.split("#")[1]),
              aunts = $("> dd, > li", accordion),
              siblings = aunts.children("." + settings.content_class),
              active_content = siblings.filter("." + settings.active_class);

            e.preventDefault();

            if (accordion.attr(self.attr_name())) {
              siblings = siblings.add(
                "[" +
                  groupSelector +
                  "] dd > " +
                  "." +
                  settings.content_class +
                  ", [" +
                  groupSelector +
                  "] li > " +
                  "." +
                  settings.content_class
              );
              aunts = aunts.add(
                "[" + groupSelector + "] dd, [" + groupSelector + "] li"
              );
            }

            if (settings.toggleable && target.is(active_content)) {
              target.parent("dd, li").toggleClass(settings.active_class, false);
              target.toggleClass(settings.active_class, false);
              S(this).attr("aria-expanded", function (i, attr) {
                return attr === "true" ? "false" : "true";
              });
              settings.callback(target);
              target.triggerHandler("toggled", [accordion]);
              accordion.triggerHandler("toggled", [target]);
              return;
            }

            if (!settings.multi_expand) {
              siblings.removeClass(settings.active_class);
              aunts.removeClass(settings.active_class);
              aunts.children("a").attr("aria-expanded", "false");
            }

            target
              .addClass(settings.active_class)
              .parent()
              .addClass(settings.active_class);
            settings.callback(target);
            target.triggerHandler("toggled", [accordion]);
            accordion.triggerHandler("toggled", [target]);
            S(this).attr("aria-expanded", "true");
          }
        );
    },

    create: function ($instance) {
      var self = this,
        accordion = $instance,
        aunts = $("> .accordion-navigation", accordion),
        settings =
          accordion.data(self.attr_name(true) + "-init") || self.settings;

      aunts.children("a").attr("aria-expanded", "false");
      aunts
        .has("." + settings.content_class + "." + settings.active_class)
        .addClass(settings.active_class)
        .children("a")
        .attr("aria-expanded", "true");

      if (settings.multi_expand) {
        $instance.attr("aria-multiselectable", "true");
      }
    },

    toggle: function (options) {
      var options = typeof options !== "undefined" ? options : {};
      var selector =
        typeof options.selector !== "undefined" ? options.selector : "";
      var toggle_state =
        typeof options.toggle_state !== "undefined" ? options.toggle_state : "";
      var $accordion =
        typeof options.$accordion !== "undefined"
          ? options.$accordion
          : this.S(this.scope).closest("[" + this.attr_name() + "]");

      var $items = $accordion.find("> dd" + selector + ", > li" + selector);
      if ($items.length < 1) {
        if (window.console) {
          console.error("Selection not found.", selector);
        }
        return false;
      }

      var S = this.S;
      var active_class = this.settings.active_class;
      $items.each(function () {
        var $item = S(this);
        var is_active = $item.hasClass(active_class);
        if (
          (is_active && toggle_state === "close") ||
          (!is_active && toggle_state === "open") ||
          toggle_state === ""
        ) {
          $item.find("> a").trigger("click.fndtn.accordion");
        }
      });
    },

    open: function (options) {
      var options = typeof options !== "undefined" ? options : {};
      options.toggle_state = "open";
      this.toggle(options);
    },

    close: function (options) {
      var options = typeof options !== "undefined" ? options : {};
      options.toggle_state = "close";
      this.toggle(options);
    },

    off: function () {},

    reflow: function () {},
  };
})(jQuery, window, window.document);
(function ($, window, document, undefined) {
  "use strict";

  Foundation.libs.tab = {
    name: "tab",

    version: "{{VERSION}}",

    settings: {
      active_class: "active",
      callback: function () {},
      deep_linking: false,
      scroll_to_content: true,
      is_hover: false,
    },

    default_tab_hashes: [],

    init: function (scope, method, options) {
      var self = this,
        S = this.S;

      // Store the default active tabs which will be referenced when the
      // location hash is absent, as in the case of navigating the tabs and
      // returning to the first viewing via the browser Back button.
      S("[" + this.attr_name() + "] > .active > a", this.scope).each(
        function () {
          self.default_tab_hashes.push(this.hash);
        }
      );

      this.bindings(method, options);
      this.handle_location_hash_change();
    },

    events: function () {
      var self = this,
        S = this.S;

      var usual_tab_behavior = function (e, target) {
        var settings = S(target)
          .closest("[" + self.attr_name() + "]")
          .data(self.attr_name(true) + "-init");
        if (!settings.is_hover || Modernizr.touch) {
          // if user did not pressed tab key, prevent default action
          var keyCode = e.keyCode || e.which;
          if (keyCode !== 9) {
            e.preventDefault();
            e.stopPropagation();
          }
          self.toggle_active_tab(S(target).parent());
        }
      };

      S(this.scope)
        .off(".tab")
        // Key event: focus/tab key
        .on(
          "keydown.fndtn.tab",
          "[" + this.attr_name() + "] > * > a",
          function (e) {
            var keyCode = e.keyCode || e.which;
            // if user pressed tab key
            if (keyCode === 13 || keyCode === 32) {
              // enter or space
              var el = this;
              usual_tab_behavior(e, el);
            }
          }
        )
        // Click event: tab title
        .on(
          "click.fndtn.tab",
          "[" + this.attr_name() + "] > * > a",
          function (e) {
            var el = this;
            usual_tab_behavior(e, el);
          }
        )
        // Hover event: tab title
        .on(
          "mouseenter.fndtn.tab",
          "[" + this.attr_name() + "] > * > a",
          function (e) {
            var settings = S(this)
              .closest("[" + self.attr_name() + "]")
              .data(self.attr_name(true) + "-init");
            if (settings.is_hover) {
              self.toggle_active_tab(S(this).parent());
            }
          }
        );

      // Location hash change event
      S(window).on("hashchange.fndtn.tab", function (e) {
        e.preventDefault();
        self.handle_location_hash_change();
      });
    },

    handle_location_hash_change: function () {
      var self = this,
        S = this.S;

      S("[" + this.attr_name() + "]", this.scope).each(function () {
        var settings = S(this).data(self.attr_name(true) + "-init");
        if (settings.deep_linking) {
          // Match the location hash to a label
          var hash;
          if (settings.scroll_to_content) {
            hash = self.scope.location.hash;
          } else {
            // prefix the hash to prevent anchor scrolling
            hash = self.scope.location.hash.replace("fndtn-", "");
          }
          if (hash != "") {
            // Check whether the location hash references a tab content div or
            // another element on the page (inside or outside the tab content div)
            var hash_element = S(hash);
            if (
              hash_element.hasClass("content") &&
              hash_element.parent().hasClass("tabs-content")
            ) {
              // Tab content div
              self.toggle_active_tab(
                $(
                  "[" + self.attr_name() + "] > * > a[href=" + hash + "]"
                ).parent()
              );
            } else {
              // Not the tab content div. If inside the tab content, find the
              // containing tab and toggle it as active.
              var hash_tab_container_id = hash_element
                .closest(".content")
                .attr("id");
              if (hash_tab_container_id != undefined) {
                self.toggle_active_tab(
                  $(
                    "[" +
                      self.attr_name() +
                      "] > * > a[href=#" +
                      hash_tab_container_id +
                      "]"
                  ).parent(),
                  hash
                );
              }
            }
          } else {
            // Reference the default tab hashes which were initialized in the init function
            for (var ind = 0; ind < self.default_tab_hashes.length; ind++) {
              self.toggle_active_tab(
                $(
                  "[" +
                    self.attr_name() +
                    "] > * > a[href=" +
                    self.default_tab_hashes[ind] +
                    "]"
                ).parent()
              );
            }
          }
        }
      });
    },

    toggle_active_tab: function (tab, location_hash) {
      var self = this,
        S = self.S,
        tabs = tab.closest("[" + this.attr_name() + "]"),
        tab_link = tab.find("a"),
        anchor = tab.children("a").first(),
        target_hash = "#" + anchor.attr("href").split("#")[1],
        target = S(target_hash),
        siblings = tab.siblings(),
        settings = tabs.data(this.attr_name(true) + "-init"),
        interpret_keyup_action = function (e) {
          // Light modification of Heydon Pickering's Practical ARIA Examples: http://heydonworks.com/practical_aria_examples/js/a11y.js

          // define current, previous and next (possible) tabs

          var $original = $(this);
          var $prev = $(this).parents("li").prev().children('[role="tab"]');
          var $next = $(this).parents("li").next().children('[role="tab"]');
          var $target;

          // find the direction (prev or next)

          switch (e.keyCode) {
            case 37:
              $target = $prev;
              break;
            case 39:
              $target = $next;
              break;
            default:
              $target = false;
              break;
          }

          if ($target.length) {
            $original.attr({
              tabindex: "-1",
              "aria-selected": null,
            });
            $target
              .attr({
                tabindex: "0",
                "aria-selected": true,
              })
              .focus();
          }

          // Hide panels

          $('[role="tabpanel"]').attr("aria-hidden", "true");

          // Show panel which corresponds to target

          $("#" + $(document.activeElement).attr("href").substring(1)).attr(
            "aria-hidden",
            null
          );
        },
        go_to_hash = function (hash) {
          // This function allows correct behaviour of the browser's back button when deep linking is enabled. Without it
          // the user would get continually redirected to the default hash.
          var default_hash = settings.scroll_to_content
            ? self.default_tab_hashes[0]
            : "fndtn-" + self.default_tab_hashes[0].replace("#", "");

          if (hash !== default_hash || window.location.hash) {
            window.location.hash = hash;
          }
        };

      // allow usage of data-tab-content attribute instead of href
      if (anchor.data("tab-content")) {
        target_hash = "#" + anchor.data("tab-content").split("#")[1];
        target = S(target_hash);
      }

      if (settings.deep_linking) {
        if (settings.scroll_to_content) {
          // retain current hash to scroll to content
          go_to_hash(location_hash || target_hash);

          if (location_hash == undefined || location_hash == target_hash) {
            tab.parent()[0].scrollIntoView();
          } else {
            S(target_hash)[0].scrollIntoView();
          }
        } else {
          // prefix the hashes so that the browser doesn't scroll down
          if (location_hash != undefined) {
            go_to_hash("fndtn-" + location_hash.replace("#", ""));
          } else {
            go_to_hash("fndtn-" + target_hash.replace("#", ""));
          }
        }
      }

      // WARNING: The activation and deactivation of the tab content must
      // occur after the deep linking in order to properly refresh the browser
      // window (notably in Chrome).
      // Clean up multiple attr instances to done once
      tab.addClass(settings.active_class).triggerHandler("opened");
      tab_link.attr({ "aria-selected": "true", tabindex: 0 });
      siblings.removeClass(settings.active_class);
      siblings
        .find("a")
        .attr({ "aria-selected": "false" /*,  tabindex : -1*/ });
      target
        .siblings()
        .removeClass(settings.active_class)
        .attr({ "aria-hidden": "true" /*,  tabindex : -1*/ });
      target
        .addClass(settings.active_class)
        .attr("aria-hidden", "false")
        .removeAttr("tabindex");
      settings.callback(tab);
      target.triggerHandler("toggled", [target]);
      tabs.triggerHandler("toggled", [tab]);

      tab_link.off("keydown").on("keydown", interpret_keyup_action);
    },

    data_attr: function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + "-" + str;
      }

      return str;
    },

    off: function () {},

    reflow: function () {},
  };
})(jQuery, window, window.document);
!(function (T, y, u) {
  "use strict";
  var w,
    l,
    D,
    k,
    s,
    a,
    o,
    r,
    c,
    f,
    d,
    h,
    g,
    i,
    M,
    n = "accessibleMegaMenu",
    p = {
      uuidPrefix: "accessible-megamenu",
      menuClass: "accessible-megamenu",
      topNavItemClass: "accessible-megamenu-top-nav-item",
      panelClass: "accessible-megamenu-panel",
      panelGroupClass: "accessible-megamenu-panel-group",
      hoverClass: "hover",
      focusClass: "focus",
      openClass: "open",
    },
    N = {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
      keyMap: {
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        59: ";",
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "q",
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        86: "v",
        87: "w",
        88: "x",
        89: "y",
        90: "z",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
        190: ".",
      },
    };
  function E(e, t) {
    (this.element = e),
      (this.settings = T.extend({}, p, t)),
      (this._defaults = p),
      (this._name = n),
      (this.mouseTimeoutID = null),
      (this.focusTimeoutID = null),
      (this.mouseFocused = !1),
      (this.justFocused = !1),
      this.init();
  }
  function b(e) {
    return (
      T.expr.filters.visible(e) &&
      !T(e)
        .parents()
        .addBack()
        .filter(function () {
          return "hidden" === T.css(this, "visibility");
        }).length
    );
  }
  function m(e, t) {
    var s,
      a,
      i,
      n = e.nodeName.toLowerCase();
    return "area" === n
      ? ((a = (s = e.parentNode).name),
        !(!e.href || !a || "map" !== s.nodeName.toLowerCase()) &&
          !!(i = T("img[usemap=#" + a + "]")[0]) &&
          b(i))
      : (/input|select|textarea|button|object/.test(n)
          ? !e.disabled
          : ("a" === n && e.href) || t) && b(e);
  }
  (E.prototype =
    ((i = 0),
    (M = ""),
    (w = function (e) {
      return T(e)
        .closest(":data(plugin_" + n + ")")
        .data("plugin_" + n);
    }),
    (l = function (e) {
      e = T(e);
      var t = this.settings;
      e.attr("id") ||
        e.attr("id", t.uuidPrefix + "-" + new Date().getTime() + "-" + ++i);
    }),
    (D = function (e, t) {
      var s,
        a = T(e.target),
        i = this,
        n = this.settings,
        l = this.menu,
        o = a.closest("." + n.topNavItemClass),
        r = a.hasClass(n.panelClass) ? a : a.closest("." + n.panelClass);
      if ((g.call(this, !0), t))
        if (
          (o = l
            .find("." + n.topNavItemClass + " ." + n.openClass + ":first")
            .closest("." + n.topNavItemClass)).is(e.relatedTarget) ||
          0 < o.has(e.relatedTarget).length
        )
          0 === o.length &&
            l
              .find("[aria-expanded=true]")
              .attr("aria-expanded", "false")
              .removeClass(n.openClass)
              .filter("." + n.panelClass)
              .attr("aria-hidden", "true");
        else {
          if (
            ("mouseout" === e.type || "focusout" === e.type) &&
            0 < o.has(u.activeElement).length
          )
            return;
          o
            .find("[aria-expanded]")
            .attr("aria-expanded", "false")
            .removeClass(n.openClass)
            .filter("." + n.panelClass)
            .attr("aria-hidden", "true"),
            (("keydown" === e.type && e.keyCode === N.ESCAPE) ||
              "DOMAttrModified" === e.type) &&
              ((s = o.find(":tabbable:first")),
              setTimeout(function () {
                l
                  .find("[aria-expanded]." + i.settings.panelClass)
                  .off("DOMAttrModified.accessible-megamenu"),
                  s.focus(),
                  (i.justFocused = !1);
              }, 99));
        }
      else
        clearTimeout(i.focusTimeoutID),
          o
            .siblings()
            .find("[aria-expanded]")
            .attr("aria-expanded", "false")
            .removeClass(n.openClass)
            .filter("." + n.panelClass)
            .attr("aria-hidden", "true"),
          o
            .find("[aria-expanded]")
            .attr("aria-expanded", "true")
            .addClass(n.openClass)
            .filter("." + n.panelClass)
            .attr("aria-hidden", "false"),
          "mouseover" === e.type &&
            a.is(":tabbable") &&
            1 === o.length &&
            0 === r.length &&
            0 < l.has(u.activeElement).length &&
            (a.focus(), (i.justFocused = !1)),
          g.call(i);
    }),
    (k = function (e) {
      var t = T(e.currentTarget),
        s = t.closest("." + this.settings.topNavItemClass),
        a = t.closest("." + this.settings.panelClass);
      1 === s.length &&
        0 === a.length &&
        1 === s.find("." + this.settings.panelClass).length &&
        (t.hasClass(this.settings.openClass)
          ? this.justFocused &&
            (e.preventDefault(), e.stopPropagation(), (this.justFocused = !1))
          : (e.preventDefault(),
            e.stopPropagation(),
            D.call(this, e),
            (this.justFocused = !1)));
    }),
    (s = function (e) {
      0 === T(e.target).closest(this.menu).length &&
        (e.preventDefault(), e.stopPropagation(), D.call(this, e, !0));
    }),
    (a = function (e) {
      "aria-expanded" === e.originalEvent.attrName &&
        "false" === e.originalEvent.newValue &&
        T(e.target).hasClass(this.settings.openClass) &&
        (e.preventDefault(), e.stopPropagation(), D.call(this, e, !0));
    }),
    (o = function (e) {
      clearTimeout(this.focusTimeoutID);
      var t = T(e.target),
        s = t.closest("." + this.settings.panelClass);
      t
        .addClass(this.settings.focusClass)
        .on("click.accessible-megamenu", T.proxy(k, this)),
        (this.justFocused = !this.mouseFocused),
        (this.mouseFocused = !1),
        this.panels.not(s).filter("." + this.settings.openClass).length &&
          D.call(this, e);
    }),
    (r = function (t) {
      this.justFocused = !1;
      var s = this,
        e = T(t.target),
        a = e.closest("." + this.settings.topNavItemClass);
      e.removeClass(this.settings.focusClass).off("click.accessible-megamenu"),
        y.cvox
          ? (s.focusTimeoutID = setTimeout(function () {
              y.cvox.Api.getCurrentNode(function (e) {
                a.has(e).length
                  ? clearTimeout(s.focusTimeoutID)
                  : (s.focusTimeoutID = setTimeout(
                      function (e, t, s) {
                        D.call(e, t, s);
                      },
                      275,
                      s,
                      t,
                      !0
                    ));
              });
            }, 25))
          : (s.focusTimeoutID = setTimeout(function () {
              D.call(s, t, !0);
            }, 300));
    }),
    (c = function (e) {
      var t,
        s,
        a,
        i,
        n,
        l,
        o = this.constructor === E ? this : w(this),
        r = o.settings,
        u = T(T(this).is("." + r.hoverClass + ":tabbable") ? this : e.target),
        c = o.menu,
        f = o.topnavitems,
        d = u.closest("." + r.topNavItemClass),
        h = c.find(":tabbable"),
        g = u.hasClass(r.panelClass) ? u : u.closest("." + r.panelClass),
        p = g.find("." + r.panelGroupClass),
        b = u.closest("." + r.panelGroupClass),
        m = e.keyCode || e.which,
        C = !1,
        v = N.keyMap[e.keyCode] || "",
        x = 1 === d.length && 0 === g.length;
      if (!u.is("input:focus, select:focus, textarea:focus, button:focus")) {
        switch (
          (u.is("." + r.hoverClass + ":tabbable") &&
            T("html").off("keydown.accessible-megamenu"),
          m)
        ) {
          case N.ESCAPE:
            D.call(o, e, !0);
            break;
          case N.DOWN:
            e.preventDefault(),
              !(C = x
                ? (D.call(o, e),
                  1 ===
                    d.find("." + r.panelClass + " :tabbable:first").focus()
                      .length)
                : 1 ===
                  h.filter(":gt(" + h.index(u) + "):first").focus().length) &&
                y.opera &&
                "[object Opera]" === opera.toString() &&
                (e.ctrlKey || e.metaKey) &&
                ((a = (h = T(":tabbable")).index(u)),
                (C =
                  1 ===
                  T(
                    ":tabbable:gt(" + T(":tabbable").index(u) + "):first"
                  ).focus().length));
            break;
          case N.UP:
            e.preventDefault(),
              x && u.hasClass(r.openClass)
                ? (D.call(o, e, !0),
                  (t = f.filter(":lt(" + f.index(d) + "):last")).children(
                    "." + r.panelClass
                  ).length &&
                    (C =
                      1 ===
                      t
                        .children()
                        .attr("aria-expanded", "true")
                        .addClass(r.openClass)
                        .filter("." + r.panelClass)
                        .attr("aria-hidden", "false")
                        .find(":tabbable:last")
                        .focus()))
                : x ||
                  (C =
                    1 ===
                    h.filter(":lt(" + h.index(u) + "):last").focus().length),
              !C &&
                y.opera &&
                "[object Opera]" === opera.toString() &&
                (e.ctrlKey || e.metaKey) &&
                ((a = (h = T(":tabbable")).index(u)),
                (C =
                  1 ===
                  T(
                    ":tabbable:lt(" + T(":tabbable").index(u) + "):first"
                  ).focus().length));
            break;
          case N.RIGHT:
            e.preventDefault(),
              x
                ? (C =
                    1 ===
                    f
                      .filter(":gt(" + f.index(d) + "):first")
                      .find(":tabbable:first")
                      .focus().length)
                : (p.length &&
                    b.length &&
                    (C =
                      1 ===
                      p
                        .filter(":gt(" + p.index(b) + "):first")
                        .find(":tabbable:first")
                        .focus().length),
                  C || (C = 1 === d.find(":tabbable:first").focus().length));
            break;
          case N.LEFT:
            e.preventDefault(),
              x
                ? (C =
                    1 ===
                    f
                      .filter(":lt(" + f.index(d) + "):last")
                      .find(":tabbable:first")
                      .focus().length)
                : (p.length &&
                    b.length &&
                    (C =
                      1 ===
                      p
                        .filter(":lt(" + p.index(b) + "):last")
                        .find(":tabbable:first")
                        .focus().length),
                  C || (C = 1 === d.find(":tabbable:first").focus().length));
            break;
          case N.TAB:
            (a = h.index(u)),
              e.shiftKey && x && u.hasClass(r.openClass)
                ? (D.call(o, e, !0),
                  (t = f.filter(":lt(" + f.index(d) + "):last")).children(
                    "." + r.panelClass
                  ).length &&
                    (C = t
                      .children()
                      .attr("aria-expanded", "true")
                      .addClass(r.openClass)
                      .filter("." + r.panelClass)
                      .attr("aria-hidden", "false")
                      .find(":tabbable:last")
                      .focus()))
                : e.shiftKey && 0 < a
                ? (C = 1 === h.filter(":lt(" + a + "):last").focus().length)
                : !e.shiftKey && a < h.length - 1
                ? (C = 1 === h.filter(":gt(" + a + "):first").focus().length)
                : y.opera &&
                  "[object Opera]" === opera.toString() &&
                  ((a = (h = T(":tabbable")).index(u)),
                  (C = e.shiftKey
                    ? 1 ===
                      T(
                        ":tabbable:lt(" + T(":tabbable").index(u) + "):last"
                      ).focus().length
                    : 1 ===
                      T(
                        ":tabbable:gt(" + T(":tabbable").index(u) + "):first"
                      ).focus().length)),
              C && e.preventDefault();
            break;
          case N.SPACE:
            if (!x) return !0;
            e.preventDefault(), k.call(o, e);
            break;
          case N.ENTER:
            return !0;
          default:
            if (
              (clearTimeout(this.keydownTimeoutID),
              0 === (M += v !== M ? v : "").length)
            )
              return;
            for (
              this.keydownTimeoutID = setTimeout(function () {
                M = "";
              }, 1e3),
                h =
                  x && !u.hasClass(r.openClass)
                    ? h.filter(":not(." + r.panelClass + " :tabbable)")
                    : d.find(":tabbable"),
                e.shiftKey && (h = T(h.get().reverse())),
                a = 0;
              a < h.length;
              a++
            )
              if ((i = h.eq(a)).is(u)) {
                s = 1 === M.length ? a + 1 : a;
                break;
              }
            for (
              l = new RegExp(
                "^" + M.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                "i"
              ),
                a = s;
              a < h.length;
              a++
            )
              if (((i = h.eq(a)), (n = T.trim(i.text())), l.test(n))) {
                (C = !0), i.focus();
                break;
              }
            if (!C)
              for (a = 0; a < s; a++)
                if (((i = h.eq(a)), (n = T.trim(i.text())), l.test(n))) {
                  i.focus();
                  break;
                }
        }
        o.justFocused = !1;
      }
    }),
    (f = function (e) {
      (T(e.target).is(this.settings.panelClass) ||
        T(e.target).closest(":focusable").length) &&
        (this.mouseFocused = !0),
        (this.mouseTimeoutID = setTimeout(function () {
          clearTimeout(this.focusTimeoutID);
        }, 1));
    }),
    (d = function (e) {
      clearTimeout(this.mouseTimeoutID),
        T(e.target).addClass(this.settings.hoverClass),
        D.call(this, e),
        T(e.target).is(":tabbable") &&
          T("html").on("keydown.accessible-megamenu", T.proxy(c, e.target));
    }),
    (h = function (e) {
      var t = this;
      T(e.target).removeClass(t.settings.hoverClass),
        (t.mouseTimeoutID = setTimeout(function () {
          D.call(t, e, !0);
        }, 250)),
        T(e.target).is(":tabbable") &&
          T("html").off("keydown.accessible-megamenu");
    }),
    (g = function (e) {
      var t = this.menu;
      e
        ? (T("html").off(
            "mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu"
          ),
          t
            .find("[aria-expanded]." + this.settings.panelClass)
            .off("DOMAttrModified.accessible-megamenu"))
        : (T("html").on(
            "mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu",
            T.proxy(s, this)
          ),
          t
            .find("[aria-expanded=true]." + this.settings.panelClass)
            .on("DOMAttrModified.accessible-megamenu", T.proxy(a, this)));
    }),
    {
      constructor: E,
      init: function () {
        var e = this.settings,
          t = T(this.element),
          s = t.children().first(),
          a = s.children();
        this.start(e, t, s, a);
      },
      start: function (i, e, t, s) {
        var n = this;
        (this.settings = i),
          (this.menu = t),
          (this.topnavitems = s),
          e.attr("role", "navigation"),
          t.addClass(i.menuClass),
          s.each(function (e, t) {
            var s, a;
            (t = T(t)).addClass(i.topNavItemClass),
              (s = t.find(":tabbable:first")),
              (a = t.children(":not(:tabbable):last")),
              l.call(n, s),
              a.length &&
                (l.call(n, a),
                s.attr({
                  "aria-haspopup": !0,
                  "aria-controls": a.attr("id"),
                  "aria-expanded": !1,
                }),
                a
                  .attr({
                    role: "group",
                    "aria-expanded": !1,
                    "aria-hidden": !0,
                  })
                  .addClass(i.panelClass)
                  .not("[aria-labelledby]")
                  .attr("aria-labelledby", s.attr("id")));
          }),
          (this.panels = t.find("." + i.panelClass)),
          t
            .on(
              "focusin.accessible-megamenu",
              ":focusable, ." + i.panelClass,
              T.proxy(o, this)
            )
            .on(
              "focusout.accessible-megamenu",
              ":focusable, ." + i.panelClass,
              T.proxy(r, this)
            )
            .on("keydown.accessible-megamenu", T.proxy(c, this))
            .on("mouseover.accessible-megamenu", T.proxy(d, this))
            .on("mouseout.accessible-megamenu", T.proxy(h, this))
            .on("mousedown.accessible-megamenu", T.proxy(f, this)),
          t.find("hr").attr("role", "separator"),
          T(u.activeElement).closest(t).length &&
            T(u.activeElement).trigger("focusin.accessible-megamenu");
      },
      getDefaults: function () {
        return this._defaults;
      },
      getOption: function (e) {
        return this.settings[e];
      },
      getAllOptions: function () {
        return this.settings;
      },
      setOption: function (e, t, s) {
        (this.settings[e] = t), s && this.init();
      },
    })),
    (T.fn[n] = function (e) {
      return this.each(function () {
        T.data(this, "plugin_" + n) ||
          T.data(this, "plugin_" + n, new T.fn[n].AccessibleMegaMenu(this, e));
      });
    }),
    (T.fn[n].AccessibleMegaMenu = E),
    T.extend(T.expr[":"], {
      data: T.expr.createPseudo
        ? T.expr.createPseudo(function (t) {
            return function (e) {
              return !!T.data(e, t);
            };
          })
        : function (e, t, s) {
            return !!T.data(e, s[3]);
          },
      focusable: function (e) {
        return m(e, !isNaN(T.attr(e, "tabindex")));
      },
      tabbable: function (e) {
        var t = T.attr(e, "tabindex"),
          s = isNaN(t);
        return (s || 0 <= t) && m(e, !s);
      },
    });
})(jQuery, window, document),
  (function (s) {
    "use strict";
    (window.UT = window.UT || {}),
      (UT.Navigation = function () {
        s("#menu-icon").on("click", this.toggleMobileNavigation),
          s("#nav-overlay").on(
            Modernizr.touch ? "touchstart" : "click",
            this.toggleMobileNavigation
          ),
          s(".nav .nav-link.has-child").on(
            "click",
            this.showMobileSubNavigation
          ),
          0 < s(".container-nav nav:first").length &&
            s(".container-nav nav:first").accessibleMegaMenu();
      }),
      (UT.Navigation.prototype = {
        toggleMobileNavigation: function (e) {
          e.preventDefault(),
            s("body").toggleClass("show-nav").trigger("menuToggle");
        },
        showMobileSubNavigation: function (e) {
          e.preventDefault();
          var t = s(this);
          t.parent().siblings().removeClass("nav-active"),
            t.parent().toggleClass("nav-active");
        },
      }),
      s("#show-parents").click(function (e) {
        e.preventDefault(),
          s("#parents").toggle(),
          s(".toggle").toggleClass("active"),
          s(this).toggleClass("active");
      });
  })(jQuery),
  (function (g) {
    "use strict";
    (window.UT = window.UT || {}),
      (UT.Layout = function (h) {
        g("#main-nav .sub-nav").each(function (e, t) {
          var s,
            a,
            i,
            n,
            l,
            o,
            r = g(t),
            u = g("#main-nav"),
            c = r.find(".sub-nav-item"),
            f = g.extend({}, { cols: 4 }, h),
            d = function () {
              if (
                (r.removeClass("item-c-" + o + " item-r-" + l),
                (s = r.parent().width()))
              ) {
                (a = r.width()),
                  (i = Math.floor(s / f.cols)),
                  (n = Math.min(Math.floor(a / i), c.length)),
                  (l = Math.ceil(c.length / n)),
                  (o = Math.ceil(c.length / l)),
                  r.addClass("item-c-" + o + " item-r-" + l);
                for (var e = 0; e < o; e++)
                  for (var t = 0; t < l; t++)
                    c.eq(e + t) &&
                      (c
                        .eq(e * l + t)
                        .addClass("item-c-" + (e + 1) + " item-r-" + (t + 1)),
                      t + 1 == l && c.eq(e * l + t).addClass("item-last"));
                a + r.offset().left > u.width() + u.offset().left &&
                  r.closest(".sub-nav-wrapper").addClass("overflowing"),
                  g(window).off("resize", d);
              }
            };
          g(window).resize(d), d();
        });
      });
  })(jQuery),
  (function (e) {
    try {
      e(document).foundation({ equalizer: { equalize_on_stack: !0 } });
    } catch (e) {}
    window.UT = window.UT || {};
    new UT.Navigation();
    var t = window.UT && window.UT.layoutCols ? window.UT.layoutCols : 4;
    new UT.Layout({ cols: t });
    e("input").placeholder();
  })(jQuery);
/*! ScrollMagic v2.0.6 | (c) 2018 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define(t)
    : "object" == typeof exports
    ? (module.exports = t())
    : (e.ScrollMagic = t());
})(this, function () {
  "use strict";
  var e = function () {};
  (e.version = "2.0.6"), window.addEventListener("mousewheel", function () {});
  var t = "data-scrollmagic-pin-spacer";
  e.Controller = function (r) {
    var o,
      s,
      a = "ScrollMagic.Controller",
      l = "FORWARD",
      c = "REVERSE",
      f = "PAUSED",
      u = n.defaults,
      d = this,
      h = i.extend({}, u, r),
      g = [],
      p = !1,
      v = 0,
      m = f,
      w = !0,
      y = 0,
      S = !0,
      b = function () {
        for (var e in h) u.hasOwnProperty(e) || delete h[e];
        if (((h.container = i.get.elements(h.container)[0]), !h.container))
          throw a + " init failed.";
        (w =
          h.container === window ||
          h.container === document.body ||
          !document.body.contains(h.container)),
          w && (h.container = window),
          (y = z()),
          h.container.addEventListener("resize", T),
          h.container.addEventListener("scroll", T);
        var t = parseInt(h.refreshInterval, 10);
        (h.refreshInterval = i.type.Number(t) ? t : u.refreshInterval), E();
      },
      E = function () {
        h.refreshInterval > 0 && (s = window.setTimeout(A, h.refreshInterval));
      },
      x = function () {
        return h.vertical
          ? i.get.scrollTop(h.container)
          : i.get.scrollLeft(h.container);
      },
      z = function () {
        return h.vertical
          ? i.get.height(h.container)
          : i.get.width(h.container);
      },
      C = (this._setScrollPos = function (e) {
        h.vertical
          ? w
            ? window.scrollTo(i.get.scrollLeft(), e)
            : (h.container.scrollTop = e)
          : w
          ? window.scrollTo(e, i.get.scrollTop())
          : (h.container.scrollLeft = e);
      }),
      F = function () {
        if (S && p) {
          var e = i.type.Array(p) ? p : g.slice(0);
          p = !1;
          var t = v;
          v = d.scrollPos();
          var n = v - t;
          0 !== n && (m = n > 0 ? l : c),
            m === c && e.reverse(),
            e.forEach(function (e) {
              e.update(!0);
            });
        }
      },
      L = function () {
        o = i.rAF(F);
      },
      T = function (e) {
        "resize" == e.type && ((y = z()), (m = f)), p !== !0 && ((p = !0), L());
      },
      A = function () {
        if (!w && y != z()) {
          var e;
          try {
            e = new Event("resize", { bubbles: !1, cancelable: !1 });
          } catch (t) {
            (e = document.createEvent("Event")), e.initEvent("resize", !1, !1);
          }
          h.container.dispatchEvent(e);
        }
        g.forEach(function (e) {
          e.refresh();
        }),
          E();
      };
    this._options = h;
    var N = function (e) {
      if (e.length <= 1) return e;
      var t = e.slice(0);
      return (
        t.sort(function (e, t) {
          return e.scrollOffset() > t.scrollOffset() ? 1 : -1;
        }),
        t
      );
    };
    return (
      (this.addScene = function (t) {
        if (i.type.Array(t))
          t.forEach(function (e) {
            d.addScene(e);
          });
        else if (t instanceof e.Scene)
          if (t.controller() !== d) t.addTo(d);
          else if (g.indexOf(t) < 0) {
            g.push(t),
              (g = N(g)),
              t.on("shift.controller_sort", function () {
                g = N(g);
              });
            for (var n in h.globalSceneOptions)
              t[n] && t[n].call(t, h.globalSceneOptions[n]);
          }
        return d;
      }),
      (this.removeScene = function (e) {
        if (i.type.Array(e))
          e.forEach(function (e) {
            d.removeScene(e);
          });
        else {
          var t = g.indexOf(e);
          t > -1 &&
            (e.off("shift.controller_sort"), g.splice(t, 1), e.remove());
        }
        return d;
      }),
      (this.updateScene = function (t, n) {
        return (
          i.type.Array(t)
            ? t.forEach(function (e) {
                d.updateScene(e, n);
              })
            : n
            ? t.update(!0)
            : p !== !0 &&
              t instanceof e.Scene &&
              ((p = p || []), -1 == p.indexOf(t) && p.push(t), (p = N(p)), L()),
          d
        );
      }),
      (this.update = function (e) {
        return T({ type: "resize" }), e && F(), d;
      }),
      (this.scrollTo = function (n, r) {
        if (i.type.Number(n)) C.call(h.container, n, r);
        else if (n instanceof e.Scene)
          n.controller() === d && d.scrollTo(n.scrollOffset(), r);
        else if (i.type.Function(n)) C = n;
        else {
          var o = i.get.elements(n)[0];
          if (o) {
            for (; o.parentNode.hasAttribute(t); ) o = o.parentNode;
            var s = h.vertical ? "top" : "left",
              a = i.get.offset(h.container),
              l = i.get.offset(o);
            w || (a[s] -= d.scrollPos()), d.scrollTo(l[s] - a[s], r);
          }
        }
        return d;
      }),
      (this.scrollPos = function (e) {
        return arguments.length
          ? (i.type.Function(e) && (x = e), d)
          : x.call(d);
      }),
      (this.info = function (e) {
        var t = {
          size: y,
          vertical: h.vertical,
          scrollPos: v,
          scrollDirection: m,
          container: h.container,
          isDocument: w,
        };
        return arguments.length ? (void 0 !== t[e] ? t[e] : void 0) : t;
      }),
      (this.loglevel = function () {
        return d;
      }),
      (this.enabled = function (e) {
        return arguments.length
          ? (S != e && ((S = !!e), d.updateScene(g, !0)), d)
          : S;
      }),
      (this.destroy = function (e) {
        window.clearTimeout(s);
        for (var t = g.length; t--; ) g[t].destroy(e);
        return (
          h.container.removeEventListener("resize", T),
          h.container.removeEventListener("scroll", T),
          i.cAF(o),
          null
        );
      }),
      b(),
      d
    );
  };
  var n = {
    defaults: {
      container: window,
      vertical: !0,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100,
    },
  };
  (e.Controller.addOption = function (e, t) {
    n.defaults[e] = t;
  }),
    (e.Controller.extend = function (t) {
      var n = this;
      (e.Controller = function () {
        return (
          n.apply(this, arguments),
          (this.$super = i.extend({}, this)),
          t.apply(this, arguments) || this
        );
      }),
        i.extend(e.Controller, n),
        (e.Controller.prototype = n.prototype),
        (e.Controller.prototype.constructor = e.Controller);
    }),
    (e.Scene = function (n) {
      var o,
        s,
        a = "BEFORE",
        l = "DURING",
        c = "AFTER",
        f = r.defaults,
        u = this,
        d = i.extend({}, f, n),
        h = a,
        g = 0,
        p = { start: 0, end: 0 },
        v = 0,
        m = !0,
        w = function () {
          for (var e in d) f.hasOwnProperty(e) || delete d[e];
          for (var t in f) L(t);
          C();
        },
        y = {};
      (this.on = function (e, t) {
        return (
          i.type.Function(t) &&
            ((e = e.trim().split(" ")),
            e.forEach(function (e) {
              var n = e.split("."),
                r = n[0],
                i = n[1];
              "*" != r &&
                (y[r] || (y[r] = []),
                y[r].push({ namespace: i || "", callback: t }));
            })),
          u
        );
      }),
        (this.off = function (e, t) {
          return e
            ? ((e = e.trim().split(" ")),
              e.forEach(function (e) {
                var n = e.split("."),
                  r = n[0],
                  i = n[1] || "",
                  o = "*" === r ? Object.keys(y) : [r];
                o.forEach(function (e) {
                  for (var n = y[e] || [], r = n.length; r--; ) {
                    var o = n[r];
                    !o ||
                      (i !== o.namespace && "*" !== i) ||
                      (t && t != o.callback) ||
                      n.splice(r, 1);
                  }
                  n.length || delete y[e];
                });
              }),
              u)
            : u;
        }),
        (this.trigger = function (t, n) {
          if (t) {
            var r = t.trim().split("."),
              i = r[0],
              o = r[1],
              s = y[i];
            s &&
              s.forEach(function (t) {
                (o && o !== t.namespace) ||
                  t.callback.call(u, new e.Event(i, t.namespace, u, n));
              });
          }
          return u;
        }),
        u
          .on("change.internal", function (e) {
            "loglevel" !== e.what &&
              "tweenChanges" !== e.what &&
              ("triggerElement" === e.what
                ? E()
                : "reverse" === e.what && u.update());
          })
          .on("shift.internal", function () {
            S(), u.update();
          }),
        (this.addTo = function (t) {
          return (
            t instanceof e.Controller &&
              s != t &&
              (s && s.removeScene(u),
              (s = t),
              C(),
              b(!0),
              E(!0),
              S(),
              s.info("container").addEventListener("resize", x),
              t.addScene(u),
              u.trigger("add", { controller: s }),
              u.update()),
            u
          );
        }),
        (this.enabled = function (e) {
          return arguments.length
            ? (m != e && ((m = !!e), u.update(!0)), u)
            : m;
        }),
        (this.remove = function () {
          if (s) {
            s.info("container").removeEventListener("resize", x);
            var e = s;
            (s = void 0), e.removeScene(u), u.trigger("remove");
          }
          return u;
        }),
        (this.destroy = function (e) {
          return (
            u.trigger("destroy", { reset: e }), u.remove(), u.off("*.*"), null
          );
        }),
        (this.update = function (e) {
          if (s)
            if (e)
              if (s.enabled() && m) {
                var t,
                  n = s.info("scrollPos");
                (t =
                  d.duration > 0
                    ? (n - p.start) / (p.end - p.start)
                    : n >= p.start
                    ? 1
                    : 0),
                  u.trigger("update", {
                    startPos: p.start,
                    endPos: p.end,
                    scrollPos: n,
                  }),
                  u.progress(t);
              } else T && h === l && N(!0);
            else s.updateScene(u, !1);
          return u;
        }),
        (this.refresh = function () {
          return b(), E(), u;
        }),
        (this.progress = function (e) {
          if (arguments.length) {
            var t = !1,
              n = h,
              r = s ? s.info("scrollDirection") : "PAUSED",
              i = d.reverse || e >= g;
            if (
              (0 === d.duration
                ? ((t = g != e),
                  (g = 1 > e && i ? 0 : 1),
                  (h = 0 === g ? a : l))
                : 0 > e && h !== a && i
                ? ((g = 0), (h = a), (t = !0))
                : e >= 0 && 1 > e && i
                ? ((g = e), (h = l), (t = !0))
                : e >= 1 && h !== c
                ? ((g = 1), (h = c), (t = !0))
                : h !== l || i || N(),
              t)
            ) {
              var o = { progress: g, state: h, scrollDirection: r },
                f = h != n,
                p = function (e) {
                  u.trigger(e, o);
                };
              f && n !== l && (p("enter"), p(n === a ? "start" : "end")),
                p("progress"),
                f && h !== l && (p(h === a ? "start" : "end"), p("leave"));
            }
            return u;
          }
          return g;
        });
      var S = function () {
          (p = { start: v + d.offset }),
            s &&
              d.triggerElement &&
              (p.start -= s.info("size") * d.triggerHook),
            (p.end = p.start + d.duration);
        },
        b = function (e) {
          if (o) {
            var t = "duration";
            F(t, o.call(u)) &&
              !e &&
              (u.trigger("change", { what: t, newval: d[t] }),
              u.trigger("shift", { reason: t }));
          }
        },
        E = function (e) {
          var n = 0,
            r = d.triggerElement;
          if (s && (r || v > 0)) {
            if (r)
              if (r.parentNode) {
                for (
                  var o = s.info(),
                    a = i.get.offset(o.container),
                    l = o.vertical ? "top" : "left";
                  r.parentNode.hasAttribute(t);

                )
                  r = r.parentNode;
                var c = i.get.offset(r);
                o.isDocument || (a[l] -= s.scrollPos()), (n = c[l] - a[l]);
              } else u.triggerElement(void 0);
            var f = n != v;
            (v = n),
              f &&
                !e &&
                u.trigger("shift", { reason: "triggerElementPosition" });
          }
        },
        x = function () {
          d.triggerHook > 0 &&
            u.trigger("shift", { reason: "containerResize" });
        },
        z = i.extend(r.validate, {
          duration: function (e) {
            if (i.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) {
              var t = parseFloat(e) / 100;
              e = function () {
                return s ? s.info("size") * t : 0;
              };
            }
            if (i.type.Function(e)) {
              o = e;
              try {
                e = parseFloat(o());
              } catch (n) {
                e = -1;
              }
            }
            if (((e = parseFloat(e)), !i.type.Number(e) || 0 > e))
              throw o ? ((o = void 0), 0) : 0;
            return e;
          },
        }),
        C = function (e) {
          (e = arguments.length ? [e] : Object.keys(z)),
            e.forEach(function (e) {
              var t;
              if (z[e])
                try {
                  t = z[e](d[e]);
                } catch (n) {
                  t = f[e];
                } finally {
                  d[e] = t;
                }
            });
        },
        F = function (e, t) {
          var n = !1,
            r = d[e];
          return d[e] != t && ((d[e] = t), C(e), (n = r != d[e])), n;
        },
        L = function (e) {
          u[e] ||
            (u[e] = function (t) {
              return arguments.length
                ? ("duration" === e && (o = void 0),
                  F(e, t) &&
                    (u.trigger("change", { what: e, newval: d[e] }),
                    r.shifts.indexOf(e) > -1 &&
                      u.trigger("shift", { reason: e })),
                  u)
                : d[e];
            });
        };
      (this.controller = function () {
        return s;
      }),
        (this.state = function () {
          return h;
        }),
        (this.scrollOffset = function () {
          return p.start;
        }),
        (this.triggerPosition = function () {
          var e = d.offset;
          return (
            s && (e += d.triggerElement ? v : s.info("size") * u.triggerHook()),
            e
          );
        });
      var T, A;
      u.on("shift.internal", function (e) {
        var t = "duration" === e.reason;
        ((h === c && t) || (h === l && 0 === d.duration)) && N(), t && O();
      })
        .on("progress.internal", function () {
          N();
        })
        .on("add.internal", function () {
          O();
        })
        .on("destroy.internal", function (e) {
          u.removePin(e.reset);
        });
      var N = function (e) {
          if (T && s) {
            var t = s.info(),
              n = A.spacer.firstChild;
            if (e || h !== l) {
              var r = {
                  position: A.inFlow ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                },
                o = i.css(n, "position") != r.position;
              A.pushFollowers
                ? d.duration > 0 &&
                  (h === c && 0 === parseFloat(i.css(A.spacer, "padding-top"))
                    ? (o = !0)
                    : h === a &&
                      0 === parseFloat(i.css(A.spacer, "padding-bottom")) &&
                      (o = !0))
                : (r[t.vertical ? "top" : "left"] = d.duration * g),
                i.css(n, r),
                o && O();
            } else {
              "fixed" != i.css(n, "position") &&
                (i.css(n, { position: "fixed" }), O());
              var f = i.get.offset(A.spacer, !0),
                u =
                  d.reverse || 0 === d.duration
                    ? t.scrollPos - p.start
                    : Math.round(g * d.duration * 10) / 10;
              (f[t.vertical ? "top" : "left"] += u),
                i.css(A.spacer.firstChild, { top: f.top, left: f.left });
            }
          }
        },
        O = function () {
          if (T && s && A.inFlow) {
            var e = h === l,
              t = s.info("vertical"),
              n = A.spacer.firstChild,
              r = i.isMarginCollapseType(i.css(A.spacer, "display")),
              o = {};
            A.relSize.width || A.relSize.autoFullWidth
              ? e
                ? i.css(T, { width: i.get.width(A.spacer) })
                : i.css(T, { width: "100%" })
              : ((o["min-width"] = i.get.width(t ? T : n, !0, !0)),
                (o.width = e ? o["min-width"] : "auto")),
              A.relSize.height
                ? e
                  ? i.css(T, {
                      height:
                        i.get.height(A.spacer) -
                        (A.pushFollowers ? d.duration : 0),
                    })
                  : i.css(T, { height: "100%" })
                : ((o["min-height"] = i.get.height(t ? n : T, !0, !r)),
                  (o.height = e ? o["min-height"] : "auto")),
              A.pushFollowers &&
                ((o["padding" + (t ? "Top" : "Left")] = d.duration * g),
                (o["padding" + (t ? "Bottom" : "Right")] =
                  d.duration * (1 - g))),
              i.css(A.spacer, o);
          }
        },
        _ = function () {
          s && T && h === l && !s.info("isDocument") && N();
        },
        P = function () {
          s &&
            T &&
            h === l &&
            (((A.relSize.width || A.relSize.autoFullWidth) &&
              i.get.width(window) != i.get.width(A.spacer.parentNode)) ||
              (A.relSize.height &&
                i.get.height(window) != i.get.height(A.spacer.parentNode))) &&
            O();
        },
        D = function (e) {
          s &&
            T &&
            h === l &&
            !s.info("isDocument") &&
            (e.preventDefault(),
            s._setScrollPos(
              s.info("scrollPos") -
                ((e.wheelDelta ||
                  e[s.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 ||
                  30 * -e.detail)
            ));
        };
      (this.setPin = function (e, n) {
        var r = { pushFollowers: !0, spacerClass: "scrollmagic-pin-spacer" };
        if (((n = i.extend({}, r, n)), (e = i.get.elements(e)[0]), !e))
          return u;
        if ("fixed" === i.css(e, "position")) return u;
        if (T) {
          if (T === e) return u;
          u.removePin();
        }
        T = e;
        var o = T.parentNode.style.display,
          s = [
            "top",
            "left",
            "bottom",
            "right",
            "margin",
            "marginLeft",
            "marginRight",
            "marginTop",
            "marginBottom",
          ];
        T.parentNode.style.display = "none";
        var a = "absolute" != i.css(T, "position"),
          l = i.css(T, s.concat(["display"])),
          c = i.css(T, ["width", "height"]);
        (T.parentNode.style.display = o),
          !a && n.pushFollowers && (n.pushFollowers = !1);
        var f = T.parentNode.insertBefore(document.createElement("div"), T),
          d = i.extend(l, {
            position: a ? "relative" : "absolute",
            boxSizing: "content-box",
            mozBoxSizing: "content-box",
            webkitBoxSizing: "content-box",
          });
        if (
          (a || i.extend(d, i.css(T, ["width", "height"])),
          i.css(f, d),
          f.setAttribute(t, ""),
          i.addClass(f, n.spacerClass),
          (A = {
            spacer: f,
            relSize: {
              width: "%" === c.width.slice(-1),
              height: "%" === c.height.slice(-1),
              autoFullWidth:
                "auto" === c.width && a && i.isMarginCollapseType(l.display),
            },
            pushFollowers: n.pushFollowers,
            inFlow: a,
          }),
          !T.___origStyle)
        ) {
          T.___origStyle = {};
          var h = T.style,
            g = s.concat([
              "width",
              "height",
              "position",
              "boxSizing",
              "mozBoxSizing",
              "webkitBoxSizing",
            ]);
          g.forEach(function (e) {
            T.___origStyle[e] = h[e] || "";
          });
        }
        return (
          A.relSize.width && i.css(f, { width: c.width }),
          A.relSize.height && i.css(f, { height: c.height }),
          f.appendChild(T),
          i.css(T, {
            position: a ? "relative" : "absolute",
            margin: "auto",
            top: "auto",
            left: "auto",
            bottom: "auto",
            right: "auto",
          }),
          (A.relSize.width || A.relSize.autoFullWidth) &&
            i.css(T, {
              boxSizing: "border-box",
              mozBoxSizing: "border-box",
              webkitBoxSizing: "border-box",
            }),
          window.addEventListener("scroll", _),
          window.addEventListener("resize", _),
          window.addEventListener("resize", P),
          T.addEventListener("mousewheel", D),
          T.addEventListener("DOMMouseScroll", D),
          N(),
          u
        );
      }),
        (this.removePin = function (e) {
          if (T) {
            if ((h === l && N(!0), e || !s)) {
              var n = A.spacer.firstChild;
              if (n.hasAttribute(t)) {
                var r = A.spacer.style,
                  o = [
                    "margin",
                    "marginLeft",
                    "marginRight",
                    "marginTop",
                    "marginBottom",
                  ],
                  a = {};
                o.forEach(function (e) {
                  a[e] = r[e] || "";
                }),
                  i.css(n, a);
              }
              A.spacer.parentNode.insertBefore(n, A.spacer),
                A.spacer.parentNode.removeChild(A.spacer),
                T.parentNode.hasAttribute(t) ||
                  (i.css(T, T.___origStyle), delete T.___origStyle);
            }
            window.removeEventListener("scroll", _),
              window.removeEventListener("resize", _),
              window.removeEventListener("resize", P),
              T.removeEventListener("mousewheel", D),
              T.removeEventListener("DOMMouseScroll", D),
              (T = void 0);
          }
          return u;
        });
      var R,
        k = [];
      return (
        u.on("destroy.internal", function (e) {
          u.removeClassToggle(e.reset);
        }),
        (this.setClassToggle = function (e, t) {
          var n = i.get.elements(e);
          return 0 !== n.length && i.type.String(t)
            ? (k.length > 0 && u.removeClassToggle(),
              (R = t),
              (k = n),
              u.on("enter.internal_class leave.internal_class", function (e) {
                var t = "enter" === e.type ? i.addClass : i.removeClass;
                k.forEach(function (e) {
                  t(e, R);
                });
              }),
              u)
            : u;
        }),
        (this.removeClassToggle = function (e) {
          return (
            e &&
              k.forEach(function (e) {
                i.removeClass(e, R);
              }),
            u.off("start.internal_class end.internal_class"),
            (R = void 0),
            (k = []),
            u
          );
        }),
        w(),
        u
      );
    });
  var r = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: void 0,
      triggerHook: 0.5,
      reverse: !0,
      loglevel: 2,
    },
    validate: {
      offset: function (e) {
        if (((e = parseFloat(e)), !i.type.Number(e))) throw 0;
        return e;
      },
      triggerElement: function (e) {
        if ((e = e || void 0)) {
          var t = i.get.elements(e)[0];
          if (!t || !t.parentNode) throw 0;
          e = t;
        }
        return e;
      },
      triggerHook: function (e) {
        var t = { onCenter: 0.5, onEnter: 1, onLeave: 0 };
        if (i.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
        else {
          if (!(e in t)) throw 0;
          e = t[e];
        }
        return e;
      },
      reverse: function (e) {
        return !!e;
      },
    },
    shifts: ["duration", "offset", "triggerHook"],
  };
  (e.Scene.addOption = function (e, t, n, i) {
    e in r.defaults ||
      ((r.defaults[e] = t), (r.validate[e] = n), i && r.shifts.push(e));
  }),
    (e.Scene.extend = function (t) {
      var n = this;
      (e.Scene = function () {
        return (
          n.apply(this, arguments),
          (this.$super = i.extend({}, this)),
          t.apply(this, arguments) || this
        );
      }),
        i.extend(e.Scene, n),
        (e.Scene.prototype = n.prototype),
        (e.Scene.prototype.constructor = e.Scene);
    }),
    (e.Event = function (e, t, n, r) {
      r = r || {};
      for (var i in r) this[i] = r[i];
      return (
        (this.type = e),
        (this.target = this.currentTarget = n),
        (this.namespace = t || ""),
        (this.timeStamp = this.timestamp = Date.now()),
        this
      );
    });
  var i = (e._util = (function (e) {
    var t,
      n = {},
      r = function (e) {
        return parseFloat(e) || 0;
      },
      i = function (t) {
        return t.currentStyle ? t.currentStyle : e.getComputedStyle(t);
      },
      o = function (t, n, o, s) {
        if (((n = n === document ? e : n), n === e)) s = !1;
        else if (!u.DomElement(n)) return 0;
        t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
        var a =
          (o
            ? n["offset" + t] || n["outer" + t]
            : n["client" + t] || n["inner" + t]) || 0;
        if (o && s) {
          var l = i(n);
          a +=
            "Height" === t
              ? r(l.marginTop) + r(l.marginBottom)
              : r(l.marginLeft) + r(l.marginRight);
        }
        return a;
      },
      s = function (e) {
        return e
          .replace(/^[^a-z]+([a-z])/g, "$1")
          .replace(/-([a-z])/g, function (e) {
            return e[1].toUpperCase();
          });
      };
    (n.extend = function (e) {
      for (e = e || {}, t = 1; t < arguments.length; t++)
        if (arguments[t])
          for (var n in arguments[t])
            arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
      return e;
    }),
      (n.isMarginCollapseType = function (e) {
        return (
          ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1
        );
      });
    var a = 0,
      l = ["ms", "moz", "webkit", "o"],
      c = e.requestAnimationFrame,
      f = e.cancelAnimationFrame;
    for (t = 0; !c && t < l.length; ++t)
      (c = e[l[t] + "RequestAnimationFrame"]),
        (f =
          e[l[t] + "CancelAnimationFrame"] ||
          e[l[t] + "CancelRequestAnimationFrame"]);
    c ||
      (c = function (t) {
        var n = new Date().getTime(),
          r = Math.max(0, 16 - (n - a)),
          i = e.setTimeout(function () {
            t(n + r);
          }, r);
        return (a = n + r), i;
      }),
      f ||
        (f = function (t) {
          e.clearTimeout(t);
        }),
      (n.rAF = c.bind(e)),
      (n.cAF = f.bind(e));
    var u = (n.type = function (e) {
      return Object.prototype.toString
        .call(e)
        .replace(/^\[object (.+)\]$/, "$1")
        .toLowerCase();
    });
    (u.String = function (e) {
      return "string" === u(e);
    }),
      (u.Function = function (e) {
        return "function" === u(e);
      }),
      (u.Array = function (e) {
        return Array.isArray(e);
      }),
      (u.Number = function (e) {
        return !u.Array(e) && e - parseFloat(e) + 1 >= 0;
      }),
      (u.DomElement = function (e) {
        return "object" == typeof HTMLElement
          ? e instanceof HTMLElement
          : e &&
              "object" == typeof e &&
              null !== e &&
              1 === e.nodeType &&
              "string" == typeof e.nodeName;
      });
    var d = (n.get = {});
    return (
      (d.elements = function (t) {
        var n = [];
        if (u.String(t))
          try {
            t = document.querySelectorAll(t);
          } catch (r) {
            return n;
          }
        if ("nodelist" === u(t) || u.Array(t))
          for (var i = 0, o = (n.length = t.length); o > i; i++) {
            var s = t[i];
            n[i] = u.DomElement(s) ? s : d.elements(s);
          }
        else (u.DomElement(t) || t === document || t === e) && (n = [t]);
        return n;
      }),
      (d.scrollTop = function (t) {
        return t && "number" == typeof t.scrollTop
          ? t.scrollTop
          : e.pageYOffset || 0;
      }),
      (d.scrollLeft = function (t) {
        return t && "number" == typeof t.scrollLeft
          ? t.scrollLeft
          : e.pageXOffset || 0;
      }),
      (d.width = function (e, t, n) {
        return o("width", e, t, n);
      }),
      (d.height = function (e, t, n) {
        return o("height", e, t, n);
      }),
      (d.offset = function (e, t) {
        var n = { top: 0, left: 0 };
        if (e && e.getBoundingClientRect) {
          var r = e.getBoundingClientRect();
          (n.top = r.top),
            (n.left = r.left),
            t || ((n.top += d.scrollTop()), (n.left += d.scrollLeft()));
        }
        return n;
      }),
      (n.addClass = function (e, t) {
        t && (e.classList ? e.classList.add(t) : (e.className += " " + t));
      }),
      (n.removeClass = function (e, t) {
        t &&
          (e.classList
            ? e.classList.remove(t)
            : (e.className = e.className.replace(
                RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"),
                " "
              )));
      }),
      (n.css = function (e, t) {
        if (u.String(t)) return i(e)[s(t)];
        if (u.Array(t)) {
          var n = {},
            r = i(e);
          return (
            t.forEach(function (e) {
              n[e] = r[s(e)];
            }),
            n
          );
        }
        for (var o in t) {
          var a = t[o];
          a == parseFloat(a) && (a += "px"), (e.style[s(o)] = a);
        }
      }),
      n
    );
  })(window || {}));
  return e;
});
(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.utexasAccessibleMobileMenu = {
    attach: function (context, settings) {
      // After loading the screen.
      $(window).on("ready resize", function () {
        // If screen smaller than 64.063em.
        if ($(window).width() < 1025) {
          // And the mobile menu is closed.
          if (!$("body").hasClass("show-nav")) {
            // Make mobile menu items unreachable.
            toggleAccessibilityAttribute("true", "-1");
          }
        } else {
          // Make mobile menu items reachable.
          toggleAccessibilityAttribute("false", "0");
        }
      });
      // When a key is pressed.
      $(document).on("keydown", function (event) {
        // If it is the Esc key, and mobile menu is open, close it.
        if (event.key === "Escape" && $("body").hasClass("show-nav")) {
          $("body").removeClass("show-nav").trigger("menuToggle");
          $("#menu-icon").focus();
        }
      });
      // If the first item of the mobile menu loses focus.
      $(".topnav .topnav-constituents")
        .children()
        .first()
        .focusout(function (e) {
          // If focused element is not a menu item, hide the menu.
          if (!$(e.relatedTarget).hasClass("nav-link")) {
            $("body").removeClass("show-nav").trigger("menuToggle");
          }
        });
      // If the last item of the mobile menu loses focus.
      $("#main-nav")
        .children()
        .last()
        .focusout(function (e) {
          // If focused element is not a menu item, hide the menu.
          if (!$(e.relatedTarget).hasClass("nav-link")) {
            $("body").removeClass("show-nav").trigger("menuToggle");
          }
        });
      // Custom event listener to toggle mobile menu a11y attributes.
      $("body").on("menuToggle", function () {
        // If mobile menu is open.
        if ($("body").hasClass("show-nav")) {
          // Make mobile menu items reachable.
          toggleAccessibilityAttribute("false", "0");
        } else {
          // Only toggle accessibility at screen widths < 1025px.
          if ($(window).width() < 1025) {
            // Make mobile menu items unreachable.
            toggleAccessibilityAttribute("true", "-1");
          }
        }
      });
      function toggleAccessibilityAttribute(ariaHidden, tabindex) {
        $(".nav-link, .nav-search-input, .nav-search-button").attr(
          "tabindex",
          tabindex
        );
        $(".nav-link, .nav-search-input, .nav-search-button").attr(
          "aria-hidden",
          ariaHidden
        );
      }
    },
  };
})(jQuery, Drupal, this, this.document);
(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.utexasHomePageConfig = {
    attach: function (context, settings) {
      /*
       * WaitForFinalEvent Function
       * This function allow us to only perform re-calculations
       * AFTER an event has completed.
       * Below, we'll use it to recalculate values only after the
       * window has been resized, instead of recalculating every pixel change.
       */
      const waitForFinalEvent = (function () {
        const timers = {};
        return function (callback, ms, uniqueId) {
          if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
          }
          if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
          }
          timers[uniqueId] = setTimeout(callback, ms);
        };
      })();
      var headerHeight = $(".UT-header").height();
      $(window).load(function () {
        if ($(window).width() > 1024) {
          createScrollMagicScenes();
        }
        headerHeight = recalculateHeaderPadding();
      });

      $(window).resize(function () {
        waitForFinalEvent(
          function () {
            headerHeight = recalculateHeaderPadding();
          },
          200,
          "header resize"
        );
      });

      var video = document.getElementById("ut-video");
      var playButton = document.getElementById("play-pause");
      if (playButton !== null) {
        // Event listener for the play/pause button
        playButton.addEventListener("click", function () {
          if (video.paused === true) {
            video.play();
            playButton.innerHTML =
              '<p class="hiddenText">Pause button</p><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><title>Pause button</title><path d="M25,50A25.007,25.007,0,0,1,15.269,1.965,25.006,25.006,0,0,1,34.731,48.035,24.844,24.844,0,0,1,25,50Zm3.907-37.5a.71.71,0,0,0-.781.6V36.9a.71.71,0,0,0,.781.6h4.688a.71.71,0,0,0,.781-.6V13.1a.71.71,0,0,0-.781-.6Zm-12.5,0a.71.71,0,0,0-.781.6V36.9a.71.71,0,0,0,.781.6h4.688a.71.71,0,0,0,.781-.6V13.1a.71.71,0,0,0-.781-.6Z" /></svg>';
          } else {
            video.pause();
            playButton.innerHTML =
              '<p class="hiddenText">Play button</p><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><title>Play button</title><path d="M25,50A25.007,25.007,0,0,1,15.268,1.965,25.006,25.006,0,0,1,34.731,48.035,24.844,24.844,0,0,1,25,50ZM21.363,12.5c-.166,0-.265.121-.265.323,0,.028,0,10.862,0,12.1s0,12.069,0,12.1a.382.382,0,0,0,.1.278.308.308,0,0,0,.22.088.291.291,0,0,0,.21-.084L33.011,25.239a.43.43,0,0,0,0-.566L21.627,12.611A.38.38,0,0,0,21.363,12.5Z" /></svg>';
          }
        });
      }
      // Fade out scroll-hint if someone starts scrolling
      $(window).on("scroll", function () {
        $("#scroll-hint").fadeOut();
      });
      // Scroll to university-stories on scroll-hint click
      $("#scroll-hint").on("click touchstart", function (e) {
        e.preventDefault();
        var targetOffset = $("#university-stories").offset().top - headerHeight;
        $("html, body").animate({ scrollTop: targetOffset }, 1000);
      });
      // Add padding class to hero headline when news/homepage alert is present.
      var news_alert_present = $(
        ".region-content-top .block-views .content .view-core-home-featured-news-item"
      ).length;
      var hp_alert_present = $(".container-alert").length;
      if (news_alert_present || hp_alert_present) {
        $(".homepage-hero__headline").addClass("homepage-hero-alert-padding");
      }

      // Create all of the ScrollMagic Scenes
      var createScrollMagicScenes = function () {
        /////////////////////////////////////////////////////
        // initialize controller and set variables
        var controller = new ScrollMagic.Controller();
        var windowHeight = $(window).height();
        // pinDiffControllerHeight is the duration the differentiator widget remains fixed
        // var pinDiffControllerHeight = $(".differentiator.texas .bottom-panel .mask p").offset().top - $(".differentiator.diff-one .top-panel p").offset().top - 20;
        // triggerHookValue needs to convert (100vh - 240px) / 2 to get halfway point of scrolling part of screen
        // var triggerHookValue = 1 - (((windowHeight - headerHeight) / 2) / windowHeight);
        // imageTrigger is the point where the top of the differentiator hits the bottom of the header
        var imageTrigger = 1 - (windowHeight - headerHeight) / windowHeight;
        var fixImageDuration =
          $("div#be-a-leader").offset().top -
          $(".differentiator.diff-one").offset().top -
          $(".differentiator.diff-one").height();

        /////////////////////////////////////////////////////
        // swap images when passing into the bottom-panel of each differentiator
        $(".differentiator").each(function (el, ind) {
          var id = $(this).attr("id");
          var thisDiff = $(this);
          var thisHeight = thisDiff.height();
          if (id === "diff-four") {
            thisHeight = thisHeight - windowHeight;
          }
          var newScene = new ScrollMagic.Scene({
            triggerElement: ".differentiator." + id,
            duration: thisHeight,
            triggerHook: imageTrigger,
          });
          newScene.on("enter", function () {
            if (id !== "texas") {
              thisDiff.find(".image-wrapper").addClass("fixed");
            }
          });
          newScene
            .on("leave", function () {
              thisDiff.find(".image-wrapper").removeClass("fixed");
            })
            // .addIndicators({name:"image fixer"})
            .addTo(controller);
        });

        ////////////////////////////////
        // animate numbers on scroll
        $(".fade-in").each(function (el) {
          var $this = $(this);
          var id = $this.find("span.counter").attr("id");
          var number = $this.find("span.counter").text();
          var options = {
            useEasing: true,
            useGrouping: true,
            separator: ",",
            decimal: ".",
          };
          var decimals = 0;
          if (id === "texas-dollars") {
            decimals = 1;
          }
          var animate = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.9,
            reverse: false,
          }).setClassToggle(this, "increase-opacity");
          animate
            .on("enter", function (el) {
              if (id) {
                var demo = new CountUp(id, 0, number, decimals, 2.5, options);
                if (!demo.error) {
                  demo.start();
                }
              }
            })
            .addTo(controller);
        });
      };

      function recalculateHeaderPadding() {
        var headerHeight = $(".UT-header").height();
        $(".front .UT-page").css("padding-top", headerHeight);
        return headerHeight;
      }

      /*
       * Helper function to make the close button for the
       * Announcement Bar accessible. It allows closure
       * by using the space and enter keys.
       * See: https://karlgroves.com/2014/11/24/ridiculously-easy-trick-for-keyboard-accessibility
       */
      function a11yClick(event) {
        if (event.type === "click") {
          return true;
        } else if (event.type === "keypress") {
          var code = event.charCode || event.keyCode;
          if (code === 32 || code === 13) {
            return true;
          }
        } else {
          return false;
        }
      }
    },
  };
})(jQuery, Drupal, this, this.document);
