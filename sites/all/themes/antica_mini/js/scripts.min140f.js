var ShowMore = (function () {
  "use strict";
  const t = (t, e) => {
      let { rows: s, children: n } = t;
      const i = "table" === e ? s : n,
        r = [].slice
          .call(i)
          .filter((t) => t.classList.contains("hidden")).length;
      return 0 !== r ? " " + r : "";
    },
    e = function (t, e) {
      return (
        void 0 === e && (e = !1), t.classList[e ? "add" : "remove"]("hidden")
      );
    },
    s = (t, e) => {
      for (let s in e) t.setAttribute(s, e[s]);
    },
    n = (t) => document.createElement(t),
    i = {
      newLine: { match: /(\r\n|\n|\r)/gm, replace: "" },
      space: { match: /\s\s+/gm, replace: " " },
      br: { match: /<br\s*\/?>/gim, replace: "" },
      html: { match: /(<((?!b|\/b|!strong|\/strong)[^>]+)>)/gi, replace: "" },
    },
    r = {
      typeElement: "span",
      more: !1,
      less: !1,
      number: !1,
      nobutton: !1,
      after: 0,
      btnClass: "show-more-btn",
      btnClassAppend: null,
    };
  return class {
    constructor(l, a) {
      let {
        onMoreLess: o = () => {},
        regex: h = {},
        config: c,
      } = void 0 === a ? {} : a;
      (this.t = () => {
        const {
          element: t,
          after: i,
          ellipsis: r,
          nobutton: l,
          limit: a,
          type: o,
        } = this.s;
        s(t, { "aria-expanded": "false" });
        const h = a + i,
          c = !1 === r ? "" : "...";
        if ("text" === o) {
          const e = t.innerHTML.trim();
          if (t.textContent.trim().length > h) {
            let s = e;
            for (let t in this.i) {
              const { match: e, replace: n } = this.i[t];
              t && e && (s = s.replace(e, n));
            }
            const i = ((t, e) => {
              let s = n("div");
              return (
                s.insertAdjacentHTML("afterbegin", t),
                (function t(e, s) {
                  let n = e.firstChild;
                  do {
                    3 === n.nodeType
                      ? s(n)
                      : 1 === n.nodeType &&
                        n.childNodes &&
                        n.childNodes[0] &&
                        t(n, s);
                  } while ((n = n.nextSibling));
                })(s, function (t) {
                  if (e > 0) {
                    let s = t.data.length;
                    (e -= s) <= 0 &&
                      (t.data = t.substringData(0, t.data.length + e));
                  } else t.data = "";
                }),
                s.innerHTML
              );
            })(s, a - 1).concat(c);
            if (
              ((t.textContent = ""),
              t.insertAdjacentHTML("beforeend", i),
              this.l(t, { ...this.s, originalText: e, truncatedText: i }),
              l)
            )
              return;
            this.o(this.s);
          }
        }
        if ("list" === o || "table" === o) {
          const s = this.h(t, o);
          if (s.length > h) {
            for (let t = a; t < s.length; t++) e(s[t], !0);
            if (
              (l || this.o(this.s),
              this.l("list" === o ? t : t.nextElementSibling, this.s),
              l)
            )
              return;
          }
        }
      }),
        (this.l = (t, e) => t.addEventListener("click", this.p.bind(this, e))),
        (this.m = (e) => {
          let {
            element: i,
            number: r,
            less: l,
            more: a,
            type: o,
            btnClass: h,
            btnClassAppend: c,
          } = e;
          const d = this.u ? l || "" : a || "",
            p = this.u ? "collapse" : "expand",
            f = !!this.u,
            m = n("button");
          return (
            (m.className = null == c ? h : h + " " + c),
            s(m, { "aria-expanded": f, "aria-label": p, tabindex: 0 }),
            m.insertAdjacentHTML("beforeend", r ? d + t(i, o) : d),
            m
          );
        }),
        (this.p = (t, s) => {
          let { target: i } = s;
          const {
              element: r,
              type: l,
              limit: a,
              less: o,
              typeElement: h,
              originalText: c,
              truncatedText: d,
              btnClass: p,
            } = t,
            f = i.classList.contains(p);
          if (!f) return;
          const m = r.getAttribute("aria-expanded");
          if (
            ((this.u = "false" === m),
            "text" === l &&
              f &&
              ((r.textContent = ""),
              r.insertAdjacentHTML("beforeend", this.u ? c : d),
              o))
          ) {
            const e = n(h);
            e.classList.add("show-more-wrapper"),
              e.insertAdjacentElement("beforeend", this.m(t)),
              r.appendChild(e);
          }
          if ("list" === l || "table" === l) {
            const t = this.h(r, l);
            for (let s = 0; s < t.length; s++) {
              const n = "list" === l ? s >= a && s < t.length - 1 : s >= a;
              "false" === m ? e(t[s]) : n && e(t[s], !0);
            }
          }
          l && this.g({ ...t, target: i });
        }),
        (this.h = (t, e) =>
          "list" === e ? [].slice.call(t.children) : t.rows),
        (this.o = (t) => {
          const { type: e, element: s, more: i, typeElement: r } = t;
          if (i)
            if ("table" === e) s.insertAdjacentElement("afterend", this.m(t));
            else {
              const e = n(r);
              e.classList.add("show-more-wrapper"),
                e.appendChild(this.m(t)),
                s.appendChild(e);
            }
        }),
        (this.g = (e) => {
          const {
              element: n,
              type: i,
              less: r,
              more: l,
              number: a,
              target: o,
            } = e,
            h = this.u ? r : l,
            c = this.u ? "expand" : "collapse",
            d = "table" === i ? i : "the " + i,
            p = n.lastElementChild;
          s(n, { "aria-expanded": this.u }),
            s(o, { "aria-expanded": this.u, "aria-label": c + " " + d }),
            this.C(c, e),
            h
              ? (o.innerHTML = a ? h + t(n, i) : h)
              : "table" === i
              ? o.parentNode.removeChild(o)
              : "list" === i && p.parentNode.removeChild(p);
        });
      const d = [].slice.call(document.querySelectorAll(l));
      (this.C = o),
        (this.i = { ...i, ...h }),
        d.map((t, e) => {
          const s = JSON.parse(t.getAttribute("data-config")),
            n = { ...c, ...s };
          (this.s = {
            index: e,
            classArray: t.classList,
            ...r,
            ...n,
            typeElement: n.element || "span",
            element: t,
          }),
            this.t();
        });
    }
  };
})();
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  (e = (function () {
    function e(e, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(e),
        appendDots: i(e),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(e)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(e).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        "undefined" != typeof document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : "undefined" != typeof document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = t++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    }
    var t = 0;
    return e;
  })()),
    (e.prototype.activateADA = function () {
      var i = this;
      i.$slideTrack
        .find(".slick-active")
        .attr({ "aria-hidden": "false" })
        .find("a, input, button, select")
        .attr({ tabindex: "0" });
    }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : o === !0
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        i.options.adaptiveHeight === !0 &&
        i.options.vertical === !1
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        s.options.rtl === !0 && s.options.vertical === !1 && (e = -e),
        s.transformsEnabled === !1
          ? s.options.vertical === !1
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : s.cssTransitions === !1
          ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    s.options.vertical === !1
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                },
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            s.options.vertical === !1
              ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor;
      return t && null !== t && (t = i(t).not(e.$slider)), t;
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this,
        o = t.getNavTarget();
      null !== o &&
        "object" == typeof o &&
        o.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      e.options.fade === !1
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (i.options.infinite === !1 &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 === 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      e.options.arrows === !0 &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            e.options.infinite !== !0 &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (e.options.centerMode !== !0 && e.options.swipeToSlide !== !0) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.options.draggable === !0 && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 0)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
          ? (n = d)
          : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (r.originalSettings.mobileFirst === !1
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  e === !0 && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  e === !0 && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            e === !0 && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || l === !1 || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        (n = r.slideCount % r.options.slidesToScroll !== 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t);
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e,
        t,
        o = this;
      if (((e = o.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var s in e) {
          if (i < e[s]) {
            i = t;
            break;
          }
          t = e[s];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        e.options.accessibility === !0 &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          e.options.accessibility === !0 &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        e.options.accessibility === !0 &&
          e.$list.off("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 0 &&
        ((i = e.$slides.children().children()),
        i.removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      var e = this;
      e.shouldClick === !1 &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]);
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      t.cssTransitions === !1
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      e.cssTransitions === !1
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick", "*", function (t) {
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              o.is(":focus") &&
              ((e.focussed = !0), e.autoPlay());
          }, 0);
        })
        .on("blur.slick", "*", function (t) {
          i(this);
          e.options.pauseOnFocus && ((e.focussed = !1), e.autoPlay());
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        var i = this;
        return i.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (i.options.infinite === !0)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (i.options.centerMode === !0) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        n.options.infinite === !0
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              n.options.vertical === !0 &&
                n.options.centerMode === !0 &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll !== 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : n.options.centerMode === !0 && n.options.infinite === !0
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : n.options.centerMode === !0 &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          n.options.vertical === !1
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        n.options.variableWidth === !0 &&
          ((o =
            n.slideCount <= n.options.slidesToShow || n.options.infinite === !1
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            n.options.rtl === !0
              ? o[0]
                ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1
                : 0
              : o[0]
              ? o[0].offsetLeft * -1
              : 0),
          n.options.centerMode === !0 &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              n.options.infinite === !1
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              n.options.rtl === !0
                ? o[0]
                  ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1
                  : 0
                : o[0]
                ? o[0].offsetLeft * -1
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        var e = this;
        return e.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        e.options.infinite === !1
          ? (i = e.slideCount)
          : ((t = e.options.slidesToScroll * -1),
            (o = e.options.slidesToScroll * -1),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o,
        s,
        n = this;
      return (
        (s = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0),
        (o = n.swipeLeft * -1 + s),
        n.options.swipeToSlide === !0
          ? (n.$slideTrack.find(".slick-slide").each(function (e, s) {
              var r, l, d;
              if (
                ((r = i(s).outerWidth()),
                (l = s.offsetLeft),
                n.options.centerMode !== !0 && (l += r / 2),
                (d = l + r),
                o < d)
              )
                return (t = s), !1;
            }),
            (e = Math.abs(i(t).attr("data-slick-index") - n.currentSlide) || 1))
          : n.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        var t = this;
        t.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        t.options.accessibility === !0 && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (t) {
              var s = o.indexOf(t);
              if (
                (i(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + e.instanceUid + t,
                  tabindex: -1,
                }),
                s !== -1)
              ) {
                var n = "slick-slide-control" + e.instanceUid + s;
                i("#" + n).length && i(this).attr({ "aria-describedby": n });
              }
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.options.focusOnChange
          ? e.$slides.eq(s).attr({ tabindex: "0" })
          : e.$slides.eq(s).removeAttr("tabindex");
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        i.options.accessibility === !0 &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      e.options.dots === !0 &&
        e.slideCount > e.options.slidesToShow &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        e.options.accessibility === !0 &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        e.options.dots === !0 &&
          e.options.pauseOnDotsHover === !0 &&
          e.slideCount > e.options.slidesToShow &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        e.options.accessibility === !0 &&
          e.$list.on("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        i.options.dots === !0 &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && e.options.accessibility === !0
          ? e.changeSlide({
              data: { message: e.options.rtl === !0 ? "next" : "previous" },
            })
          : 39 === i.keyCode &&
            e.options.accessibility === !0 &&
            e.changeSlide({
              data: { message: e.options.rtl === !0 ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
            n = document.createElement("img");
          (n.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                r.$slider.trigger("lazyLoaded", [r, e, t]);
            });
          }),
            (n.onerror = function () {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                r.$slider.trigger("lazyLoadError", [r, e, t]);
            }),
            (n.src = t);
        });
      }
      var t,
        o,
        s,
        n,
        r = this;
      if (
        (r.options.centerMode === !0
          ? r.options.infinite === !0
            ? ((s = r.currentSlide + (r.options.slidesToShow / 2 + 1)),
              (n = s + r.options.slidesToShow + 2))
            : ((s = Math.max(
                0,
                r.currentSlide - (r.options.slidesToShow / 2 + 1)
              )),
              (n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide))
          : ((s = r.options.infinite
              ? r.options.slidesToShow + r.currentSlide
              : r.currentSlide),
            (n = Math.ceil(s + r.options.slidesToShow)),
            r.options.fade === !0 && (s > 0 && s--, n <= r.slideCount && n++)),
        (t = r.$slider.find(".slick-slide").slice(s, n)),
        "anticipated" === r.options.lazyLoad)
      )
        for (
          var l = s - 1, d = n, a = r.$slider.find(".slick-slide"), c = 0;
          c < r.options.slidesToScroll;
          c++
        )
          l < 0 && (l = r.slideCount - 1),
            (t = t.add(a.eq(l))),
            (t = t.add(a.eq(d))),
            l--,
            d++;
      e(t),
        r.slideCount <= r.options.slidesToShow
          ? ((o = r.$slider.find(".slick-slide")), e(o))
          : r.currentSlide >= r.slideCount - r.options.slidesToShow
          ? ((o = r.$slider
              .find(".slick-cloned")
              .slice(0, r.options.slidesToShow)),
            e(o))
          : 0 === r.currentSlide &&
            ((o = r.$slider
              .find(".slick-cloned")
              .slice(r.options.slidesToShow * -1)),
            e(o));
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        var i = this;
        i.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      if (
        !t.unslicked &&
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        t.options.accessibility === !0 &&
          (t.initADA(), t.options.focusOnChange))
      ) {
        var o = i(t.$slides.get(t.currentSlide));
        o.attr("tabindex", 0).focus();
      }
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        var i = this;
        i.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          (r = document.createElement("img")),
          (r.onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              l.options.adaptiveHeight === !0 && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        return (
          "boolean" == typeof i
            ? ((e = i), (i = e === !0 ? 0 : o.slideCount - 1))
            : (i = e === !0 ? --i : i),
          !(o.slideCount < 1 || i < 0 || i > o.slideCount - 1) &&
            (o.unload(),
            t === !0
              ? o.$slideTrack.children().remove()
              : o.$slideTrack.children(this.options.slide).eq(i).remove(),
            (o.$slides = o.$slideTrack.children(this.options.slide)),
            o.$slideTrack.children(this.options.slide).detach(),
            o.$slideTrack.append(o.$slides),
            (o.$slidesCache = o.$slides),
            void o.reinit())
        );
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      o.options.rtl === !0 && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        o.transformsEnabled === !1
          ? o.$slideTrack.css(s)
          : ((s = {}),
            o.cssTransitions === !1
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      i.options.vertical === !1
        ? i.options.centerMode === !0 &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          i.options.centerMode === !0 &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        i.options.vertical === !1 && i.options.variableWidth === !1
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : i.options.variableWidth === !0
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      i.options.variableWidth === !1 &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          t.options.rtl === !0
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        i.options.adaptiveHeight === !0 &&
        i.options.vertical === !1
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : "undefined" != typeof arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        i.options.fade === !1
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = i.options.vertical === !0 ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (i.options.useCSS === !0 && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          i.animType !== !1 &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && i.animType !== !1);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        n.options.centerMode === !0)
      ) {
        var r = n.options.slidesToShow % 2 === 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          n.options.infinite === !0 &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center");
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = n.options.infinite === !0 ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (s.options.fade === !0 && (s.options.centerMode = !1),
        s.options.infinite === !0 &&
          s.options.fade === !1 &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            s.options.centerMode === !0
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this;
      i || e.autoPlay(), (e.interrupted = i);
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      return (
        s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? void t.slideHandler(s, !1, !0)
          : void t.slideHandler(s)
      );
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (a.animating === !0 && a.options.waitForAnimate === !0) ||
          (a.options.fade === !0 && a.currentSlide === i)
        ))
      )
        return (
          e === !1 && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          a.options.infinite === !1 &&
          a.options.centerMode === !1 &&
          (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)
            ? void (
                a.options.fade === !1 &&
                ((o = a.currentSlide),
                t !== !0 && a.slideCount > a.options.slidesToShow
                  ? a.animateSlide(r, function () {
                      a.postSlide(o);
                    })
                  : a.postSlide(o))
              )
            : a.options.infinite === !1 &&
              a.options.centerMode === !0 &&
              (i < 0 || i > a.slideCount - a.options.slidesToScroll)
            ? void (
                a.options.fade === !1 &&
                ((o = a.currentSlide),
                t !== !0 && a.slideCount > a.options.slidesToShow
                  ? a.animateSlide(r, function () {
                      a.postSlide(o);
                    })
                  : a.postSlide(o))
              )
            : (a.options.autoplay && clearInterval(a.autoPlayTimer),
              (s =
                o < 0
                  ? a.slideCount % a.options.slidesToScroll !== 0
                    ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                    : a.slideCount + o
                  : o >= a.slideCount
                  ? a.slideCount % a.options.slidesToScroll !== 0
                    ? 0
                    : o - a.slideCount
                  : o),
              (a.animating = !0),
              a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
              (n = a.currentSlide),
              (a.currentSlide = s),
              a.setSlideClasses(a.currentSlide),
              a.options.asNavFor &&
                ((l = a.getNavTarget()),
                (l = l.slick("getSlick")),
                l.slideCount <= l.options.slidesToShow &&
                  l.setSlideClasses(a.currentSlide)),
              a.updateDots(),
              a.updateArrows(),
              a.options.fade === !0
                ? (t !== !0
                    ? (a.fadeSlideOut(n),
                      a.fadeSlide(s, function () {
                        a.postSlide(s);
                      }))
                    : a.postSlide(s),
                  void a.animateHeight())
                : void (t !== !0 && a.slideCount > a.options.slidesToShow
                    ? a.animateSlide(d, function () {
                        a.postSlide(s);
                      })
                    : a.postSlide(s)))
        );
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        i.options.dots === !0 &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)),
        o < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? s.options.rtl === !1
            ? "left"
            : "right"
          : o <= 360 && o >= 315
          ? s.options.rtl === !1
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? s.options.rtl === !1
            ? "right"
            : "left"
          : s.options.verticalSwiping === !0
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (o.touchObject.edgeHit === !0 &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          e.options.swipe === !1 ||
          ("ontouchend" in document && e.options.swipe === !1) ||
          (e.options.draggable === !1 && i.type.indexOf("mouse") !== -1)
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          e.options.verticalSwiping === !0 &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (l.options.verticalSwiping === !0 &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (l.options.rtl === !1 ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              l.options.verticalSwiping === !0 &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              l.options.infinite === !1 &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              l.options.vertical === !1
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s),
              l.options.fade !== !0 &&
                l.options.touchMove !== !1 &&
                (l.animating === !0
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      return (
        (t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
        t.slideCount <= t.options.slidesToShow
          ? ((t.touchObject = {}), !1)
          : (void 0 !== i.originalEvent &&
              void 0 !== i.originalEvent.touches &&
              (e = i.originalEvent.touches[0]),
            (t.touchObject.startX = t.touchObject.curX =
              void 0 !== e ? e.pageX : i.clientX),
            (t.touchObject.startY = t.touchObject.curY =
              void 0 !== e ? e.pageY : i.clientY),
            void (t.dragging = !0))
      );
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      e.$slider.trigger("unslick", [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i,
        e = this;
      (i = Math.floor(e.options.slidesToShow / 2)),
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          !e.options.infinite &&
          (e.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          e.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === e.currentSlide
            ? (e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : e.currentSlide >= e.slideCount - e.options.slidesToShow &&
              e.options.centerMode === !1
            ? (e.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : e.currentSlide >= e.slideCount - 1 &&
              e.options.centerMode === !0 &&
              (e.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || "undefined" == typeof s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          "undefined" != typeof t)
        )
          return t;
      return o;
    });
});
// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
!(function (t, e, n, o) {
  "use strict";
  function i(t, e) {
    var o,
      i,
      a,
      s = [],
      r = 0;
    (t && t.isDefaultPrevented()) ||
      (t.preventDefault(),
      (e = e || {}),
      t && t.data && (e = h(t.data.options, e)),
      (o = e.$target || n(t.currentTarget).trigger("blur")),
      ((a = n.fancybox.getInstance()) && a.$trigger && a.$trigger.is(o)) ||
        (e.selector
          ? (s = n(e.selector))
          : ((i = o.attr("data-fancybox") || ""),
            i
              ? ((s = t.data ? t.data.items : []),
                (s = s.length
                  ? s.filter('[data-fancybox="' + i + '"]')
                  : n('[data-fancybox="' + i + '"]')))
              : (s = [o])),
        (r = n(s).index(o)),
        r < 0 && (r = 0),
        (a = n.fancybox.open(s, e, r)),
        (a.$trigger = o)));
  }
  if (((t.console = t.console || { info: function (t) {} }), n)) {
    if (n.fn.fancybox) return void console.info("fancyBox already initialized");
    var a = {
        closeExisting: !1,
        loop: !1,
        gutter: 50,
        keyboard: !0,
        preventCaptionOverlap: !0,
        arrows: !0,
        infobar: !0,
        smallBtn: "auto",
        toolbar: "auto",
        buttons: ["zoom", "slideShow", "thumbs", "close"],
        idleTime: 3,
        protect: !1,
        modal: !1,
        image: { preload: !1 },
        ajax: { settings: { data: { fancybox: !0 } } },
        iframe: {
          tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
          preload: !0,
          css: {},
          attr: { scrolling: "auto" },
        },
        video: {
          tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
          format: "",
          autoStart: !0,
        },
        defaultType: "image",
        animationEffect: "zoom",
        animationDuration: 366,
        zoomOpacity: "auto",
        transitionEffect: "fade",
        transitionDuration: 366,
        slideClass: "",
        baseClass: "",
        baseTpl:
          '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
        spinnerTpl: '<div class="fancybox-loading"></div>',
        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
        btnTpl: {
          download:
            '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
          zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
          close:
            '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
          arrowLeft:
            '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
          arrowRight:
            '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
          smallBtn:
            '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>',
        },
        parentEl: "body",
        hideScrollbar: !0,
        autoFocus: !0,
        backFocus: !0,
        trapFocus: !0,
        fullScreen: { autoStart: !1 },
        touch: { vertical: !0, momentum: !0 },
        hash: null,
        media: {},
        slideShow: { autoStart: !1, speed: 3e3 },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: ".fancybox-container",
          axis: "y",
        },
        wheel: "auto",
        onInit: n.noop,
        beforeLoad: n.noop,
        afterLoad: n.noop,
        beforeShow: n.noop,
        afterShow: n.noop,
        beforeClose: n.noop,
        afterClose: n.noop,
        onActivate: n.noop,
        onDeactivate: n.noop,
        clickContent: function (t, e) {
          return "image" === t.type && "zoom";
        },
        clickSlide: "close",
        clickOutside: "close",
        dblclickContent: !1,
        dblclickSlide: !1,
        dblclickOutside: !1,
        mobile: {
          preventCaptionOverlap: !1,
          idleTime: !1,
          clickContent: function (t, e) {
            return "image" === t.type && "toggleControls";
          },
          clickSlide: function (t, e) {
            return "image" === t.type ? "toggleControls" : "close";
          },
          dblclickContent: function (t, e) {
            return "image" === t.type && "zoom";
          },
          dblclickSlide: function (t, e) {
            return "image" === t.type && "zoom";
          },
        },
        lang: "en",
        i18n: {
          en: {
            CLOSE: "Close",
            NEXT: "Next",
            PREV: "Previous",
            ERROR:
              "The requested content cannot be loaded. <br/> Please try again later.",
            PLAY_START: "Start slideshow",
            PLAY_STOP: "Pause slideshow",
            FULL_SCREEN: "Full screen",
            THUMBS: "Thumbnails",
            DOWNLOAD: "Download",
            SHARE: "Share",
            ZOOM: "Zoom",
          },
          de: {
            CLOSE: "Schlie&szlig;en",
            NEXT: "Weiter",
            PREV: "Zur&uuml;ck",
            ERROR:
              "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
            PLAY_START: "Diaschau starten",
            PLAY_STOP: "Diaschau beenden",
            FULL_SCREEN: "Vollbild",
            THUMBS: "Vorschaubilder",
            DOWNLOAD: "Herunterladen",
            SHARE: "Teilen",
            ZOOM: "Vergr&ouml;&szlig;ern",
          },
        },
      },
      s = n(t),
      r = n(e),
      c = 0,
      l = function (t) {
        return t && t.hasOwnProperty && t instanceof n;
      },
      d = (function () {
        return (
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          t.mozRequestAnimationFrame ||
          t.oRequestAnimationFrame ||
          function (e) {
            return t.setTimeout(e, 1e3 / 60);
          }
        );
      })(),
      u = (function () {
        return (
          t.cancelAnimationFrame ||
          t.webkitCancelAnimationFrame ||
          t.mozCancelAnimationFrame ||
          t.oCancelAnimationFrame ||
          function (e) {
            t.clearTimeout(e);
          }
        );
      })(),
      f = (function () {
        var t,
          n = e.createElement("fakeelement"),
          o = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd",
          };
        for (t in o) if (void 0 !== n.style[t]) return o[t];
        return "transitionend";
      })(),
      p = function (t) {
        return t && t.length && t[0].offsetHeight;
      },
      h = function (t, e) {
        var o = n.extend(!0, {}, t, e);
        return (
          n.each(e, function (t, e) {
            n.isArray(e) && (o[t] = e);
          }),
          o
        );
      },
      g = function (t) {
        var o, i;
        return (
          !(!t || t.ownerDocument !== e) &&
          (n(".fancybox-container").css("pointer-events", "none"),
          (o = {
            x: t.getBoundingClientRect().left + t.offsetWidth / 2,
            y: t.getBoundingClientRect().top + t.offsetHeight / 2,
          }),
          (i = e.elementFromPoint(o.x, o.y) === t),
          n(".fancybox-container").css("pointer-events", ""),
          i)
        );
      },
      b = function (t, e, o) {
        var i = this;
        (i.opts = h({ index: o }, n.fancybox.defaults)),
          n.isPlainObject(e) && (i.opts = h(i.opts, e)),
          n.fancybox.isMobile && (i.opts = h(i.opts, i.opts.mobile)),
          (i.id = i.opts.id || ++c),
          (i.currIndex = parseInt(i.opts.index, 10) || 0),
          (i.prevIndex = null),
          (i.prevPos = null),
          (i.currPos = 0),
          (i.firstRun = !0),
          (i.group = []),
          (i.slides = {}),
          i.addContent(t),
          i.group.length && i.init();
      };
    n.extend(b.prototype, {
      init: function () {
        var o,
          i,
          a = this,
          s = a.group[a.currIndex],
          r = s.opts;
        r.closeExisting && n.fancybox.close(!0),
          n("body").addClass("fancybox-active"),
          !n.fancybox.getInstance() &&
            !1 !== r.hideScrollbar &&
            !n.fancybox.isMobile &&
            e.body.scrollHeight > t.innerHeight &&
            (n("head").append(
              '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
                (t.innerWidth - e.documentElement.clientWidth) +
                "px;}</style>"
            ),
            n("body").addClass("compensate-for-scrollbar")),
          (i = ""),
          n.each(r.buttons, function (t, e) {
            i += r.btnTpl[e] || "";
          }),
          (o = n(
            a.translate(
              a,
              r.baseTpl
                .replace("{{buttons}}", i)
                .replace("{{arrows}}", r.btnTpl.arrowLeft + r.btnTpl.arrowRight)
            )
          )
            .attr("id", "fancybox-container-" + a.id)
            .addClass(r.baseClass)
            .data("FancyBox", a)
            .appendTo(r.parentEl)),
          (a.$refs = { container: o }),
          [
            "bg",
            "inner",
            "infobar",
            "toolbar",
            "stage",
            "caption",
            "navigation",
          ].forEach(function (t) {
            a.$refs[t] = o.find(".fancybox-" + t);
          }),
          a.trigger("onInit"),
          a.activate(),
          a.jumpTo(a.currIndex);
      },
      translate: function (t, e) {
        var n = t.opts.i18n[t.opts.lang] || t.opts.i18n.en;
        return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
          return void 0 === n[e] ? t : n[e];
        });
      },
      addContent: function (t) {
        var e,
          o = this,
          i = n.makeArray(t);
        n.each(i, function (t, e) {
          var i,
            a,
            s,
            r,
            c,
            l = {},
            d = {};
          n.isPlainObject(e)
            ? ((l = e), (d = e.opts || e))
            : "object" === n.type(e) && n(e).length
            ? ((i = n(e)),
              (d = i.data() || {}),
              (d = n.extend(!0, {}, d, d.options)),
              (d.$orig = i),
              (l.src = o.opts.src || d.src || i.attr("href")),
              l.type || l.src || ((l.type = "inline"), (l.src = e)))
            : (l = { type: "html", src: e + "" }),
            (l.opts = n.extend(!0, {}, o.opts, d)),
            n.isArray(d.buttons) && (l.opts.buttons = d.buttons),
            n.fancybox.isMobile &&
              l.opts.mobile &&
              (l.opts = h(l.opts, l.opts.mobile)),
            (a = l.type || l.opts.type),
            (r = l.src || ""),
            !a &&
              r &&
              ((s = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                ? ((a = "video"),
                  l.opts.video.format ||
                    (l.opts.video.format =
                      "video/" + ("ogv" === s[1] ? "ogg" : s[1])))
                : r.match(
                    /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
                  )
                ? (a = "image")
                : r.match(/\.(pdf)((\?|#).*)?$/i)
                ? ((a = "iframe"),
                  (l = n.extend(!0, l, {
                    contentType: "pdf",
                    opts: { iframe: { preload: !1 } },
                  })))
                : "#" === r.charAt(0) && (a = "inline")),
            a ? (l.type = a) : o.trigger("objectNeedsType", l),
            l.contentType ||
              (l.contentType =
                n.inArray(l.type, ["html", "inline", "ajax"]) > -1
                  ? "html"
                  : l.type),
            (l.index = o.group.length),
            "auto" == l.opts.smallBtn &&
              (l.opts.smallBtn =
                n.inArray(l.type, ["html", "inline", "ajax"]) > -1),
            "auto" === l.opts.toolbar && (l.opts.toolbar = !l.opts.smallBtn),
            (l.$thumb = l.opts.$thumb || null),
            l.opts.$trigger &&
              l.index === o.opts.index &&
              ((l.$thumb = l.opts.$trigger.find("img:first")),
              l.$thumb.length && (l.opts.$orig = l.opts.$trigger)),
            (l.$thumb && l.$thumb.length) ||
              !l.opts.$orig ||
              (l.$thumb = l.opts.$orig.find("img:first")),
            l.$thumb && !l.$thumb.length && (l.$thumb = null),
            (l.thumb = l.opts.thumb || (l.$thumb ? l.$thumb[0].src : null)),
            "function" === n.type(l.opts.caption) &&
              (l.opts.caption = l.opts.caption.apply(e, [o, l])),
            "function" === n.type(o.opts.caption) &&
              (l.opts.caption = o.opts.caption.apply(e, [o, l])),
            l.opts.caption instanceof n ||
              (l.opts.caption =
                void 0 === l.opts.caption ? "" : l.opts.caption + ""),
            "ajax" === l.type &&
              ((c = r.split(/\s+/, 2)),
              c.length > 1 &&
                ((l.src = c.shift()), (l.opts.filter = c.shift()))),
            l.opts.modal &&
              (l.opts = n.extend(!0, l.opts, {
                trapFocus: !0,
                infobar: 0,
                toolbar: 0,
                smallBtn: 0,
                keyboard: 0,
                slideShow: 0,
                fullScreen: 0,
                thumbs: 0,
                touch: 0,
                clickContent: !1,
                clickSlide: !1,
                clickOutside: !1,
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
              })),
            o.group.push(l);
        }),
          Object.keys(o.slides).length &&
            (o.updateControls(),
            (e = o.Thumbs) && e.isActive && (e.create(), e.focus()));
      },
      addEvents: function () {
        var e = this;
        e.removeEvents(),
          e.$refs.container
            .on("click.fb-close", "[data-fancybox-close]", function (t) {
              t.stopPropagation(), t.preventDefault(), e.close(t);
            })
            .on(
              "touchstart.fb-prev click.fb-prev",
              "[data-fancybox-prev]",
              function (t) {
                t.stopPropagation(), t.preventDefault(), e.previous();
              }
            )
            .on(
              "touchstart.fb-next click.fb-next",
              "[data-fancybox-next]",
              function (t) {
                t.stopPropagation(), t.preventDefault(), e.next();
              }
            )
            .on("click.fb", "[data-fancybox-zoom]", function (t) {
              e[e.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
            }),
          s.on("orientationchange.fb resize.fb", function (t) {
            t && t.originalEvent && "resize" === t.originalEvent.type
              ? (e.requestId && u(e.requestId),
                (e.requestId = d(function () {
                  e.update(t);
                })))
              : (e.current &&
                  "iframe" === e.current.type &&
                  e.$refs.stage.hide(),
                setTimeout(
                  function () {
                    e.$refs.stage.show(), e.update(t);
                  },
                  n.fancybox.isMobile ? 600 : 250
                ));
          }),
          r.on("keydown.fb", function (t) {
            var o = n.fancybox ? n.fancybox.getInstance() : null,
              i = o.current,
              a = t.keyCode || t.which;
            if (9 == a) return void (i.opts.trapFocus && e.focus(t));
            if (
              !(
                !i.opts.keyboard ||
                t.ctrlKey ||
                t.altKey ||
                t.shiftKey ||
                n(t.target).is("input,textarea,video,audio,select")
              )
            )
              return 8 === a || 27 === a
                ? (t.preventDefault(), void e.close(t))
                : 37 === a || 38 === a
                ? (t.preventDefault(), void e.previous())
                : 39 === a || 40 === a
                ? (t.preventDefault(), void e.next())
                : void e.trigger("afterKeydown", t, a);
          }),
          e.group[e.currIndex].opts.idleTime &&
            ((e.idleSecondsCounter = 0),
            r.on(
              "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
              function (t) {
                (e.idleSecondsCounter = 0),
                  e.isIdle && e.showControls(),
                  (e.isIdle = !1);
              }
            ),
            (e.idleInterval = t.setInterval(function () {
              ++e.idleSecondsCounter >= e.group[e.currIndex].opts.idleTime &&
                !e.isDragging &&
                ((e.isIdle = !0), (e.idleSecondsCounter = 0), e.hideControls());
            }, 1e3)));
      },
      removeEvents: function () {
        var e = this;
        s.off("orientationchange.fb resize.fb"),
          r.off("keydown.fb .fb-idle"),
          this.$refs.container.off(".fb-close .fb-prev .fb-next"),
          e.idleInterval &&
            (t.clearInterval(e.idleInterval), (e.idleInterval = null));
      },
      previous: function (t) {
        return this.jumpTo(this.currPos - 1, t);
      },
      next: function (t) {
        return this.jumpTo(this.currPos + 1, t);
      },
      jumpTo: function (t, e) {
        var o,
          i,
          a,
          s,
          r,
          c,
          l,
          d,
          u,
          f = this,
          h = f.group.length;
        if (!(f.isDragging || f.isClosing || (f.isAnimating && f.firstRun))) {
          if (
            ((t = parseInt(t, 10)),
            !(a = f.current ? f.current.opts.loop : f.opts.loop) &&
              (t < 0 || t >= h))
          )
            return !1;
          if (
            ((o = f.firstRun = !Object.keys(f.slides).length),
            (r = f.current),
            (f.prevIndex = f.currIndex),
            (f.prevPos = f.currPos),
            (s = f.createSlide(t)),
            h > 1 &&
              ((a || s.index < h - 1) && f.createSlide(t + 1),
              (a || s.index > 0) && f.createSlide(t - 1)),
            (f.current = s),
            (f.currIndex = s.index),
            (f.currPos = s.pos),
            f.trigger("beforeShow", o),
            f.updateControls(),
            (s.forcedDuration = void 0),
            n.isNumeric(e)
              ? (s.forcedDuration = e)
              : (e = s.opts[o ? "animationDuration" : "transitionDuration"]),
            (e = parseInt(e, 10)),
            (i = f.isMoved(s)),
            s.$slide.addClass("fancybox-slide--current"),
            o)
          )
            return (
              s.opts.animationEffect &&
                e &&
                f.$refs.container.css("transition-duration", e + "ms"),
              f.$refs.container.addClass("fancybox-is-open").trigger("focus"),
              f.loadSlide(s),
              void f.preload("image")
            );
          (c = n.fancybox.getTranslate(r.$slide)),
            (l = n.fancybox.getTranslate(f.$refs.stage)),
            n.each(f.slides, function (t, e) {
              n.fancybox.stop(e.$slide, !0);
            }),
            r.pos !== s.pos && (r.isComplete = !1),
            r.$slide.removeClass(
              "fancybox-slide--complete fancybox-slide--current"
            ),
            i
              ? ((u = c.left - (r.pos * c.width + r.pos * r.opts.gutter)),
                n.each(f.slides, function (t, o) {
                  o.$slide
                    .removeClass("fancybox-animated")
                    .removeClass(function (t, e) {
                      return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(
                        " "
                      );
                    });
                  var i = o.pos * c.width + o.pos * o.opts.gutter;
                  n.fancybox.setTranslate(o.$slide, {
                    top: 0,
                    left: i - l.left + u,
                  }),
                    o.pos !== s.pos &&
                      o.$slide.addClass(
                        "fancybox-slide--" +
                          (o.pos > s.pos ? "next" : "previous")
                      ),
                    p(o.$slide),
                    n.fancybox.animate(
                      o.$slide,
                      {
                        top: 0,
                        left:
                          (o.pos - s.pos) * c.width +
                          (o.pos - s.pos) * o.opts.gutter,
                      },
                      e,
                      function () {
                        o.$slide
                          .css({ transform: "", opacity: "" })
                          .removeClass(
                            "fancybox-slide--next fancybox-slide--previous"
                          ),
                          o.pos === f.currPos && f.complete();
                      }
                    );
                }))
              : e &&
                s.opts.transitionEffect &&
                ((d =
                  "fancybox-animated fancybox-fx-" + s.opts.transitionEffect),
                r.$slide.addClass(
                  "fancybox-slide--" + (r.pos > s.pos ? "next" : "previous")
                ),
                n.fancybox.animate(
                  r.$slide,
                  d,
                  e,
                  function () {
                    r.$slide
                      .removeClass(d)
                      .removeClass(
                        "fancybox-slide--next fancybox-slide--previous"
                      );
                  },
                  !1
                )),
            s.isLoaded ? f.revealContent(s) : f.loadSlide(s),
            f.preload("image");
        }
      },
      createSlide: function (t) {
        var e,
          o,
          i = this;
        return (
          (o = t % i.group.length),
          (o = o < 0 ? i.group.length + o : o),
          !i.slides[t] &&
            i.group[o] &&
            ((e = n('<div class="fancybox-slide"></div>').appendTo(
              i.$refs.stage
            )),
            (i.slides[t] = n.extend(!0, {}, i.group[o], {
              pos: t,
              $slide: e,
              isLoaded: !1,
            })),
            i.updateSlide(i.slides[t])),
          i.slides[t]
        );
      },
      scaleToActual: function (t, e, o) {
        var i,
          a,
          s,
          r,
          c,
          l = this,
          d = l.current,
          u = d.$content,
          f = n.fancybox.getTranslate(d.$slide).width,
          p = n.fancybox.getTranslate(d.$slide).height,
          h = d.width,
          g = d.height;
        l.isAnimating ||
          l.isMoved() ||
          !u ||
          "image" != d.type ||
          !d.isLoaded ||
          d.hasError ||
          ((l.isAnimating = !0),
          n.fancybox.stop(u),
          (t = void 0 === t ? 0.5 * f : t),
          (e = void 0 === e ? 0.5 * p : e),
          (i = n.fancybox.getTranslate(u)),
          (i.top -= n.fancybox.getTranslate(d.$slide).top),
          (i.left -= n.fancybox.getTranslate(d.$slide).left),
          (r = h / i.width),
          (c = g / i.height),
          (a = 0.5 * f - 0.5 * h),
          (s = 0.5 * p - 0.5 * g),
          h > f &&
            ((a = i.left * r - (t * r - t)),
            a > 0 && (a = 0),
            a < f - h && (a = f - h)),
          g > p &&
            ((s = i.top * c - (e * c - e)),
            s > 0 && (s = 0),
            s < p - g && (s = p - g)),
          l.updateCursor(h, g),
          n.fancybox.animate(
            u,
            { top: s, left: a, scaleX: r, scaleY: c },
            o || 366,
            function () {
              l.isAnimating = !1;
            }
          ),
          l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop());
      },
      scaleToFit: function (t) {
        var e,
          o = this,
          i = o.current,
          a = i.$content;
        o.isAnimating ||
          o.isMoved() ||
          !a ||
          "image" != i.type ||
          !i.isLoaded ||
          i.hasError ||
          ((o.isAnimating = !0),
          n.fancybox.stop(a),
          (e = o.getFitPos(i)),
          o.updateCursor(e.width, e.height),
          n.fancybox.animate(
            a,
            {
              top: e.top,
              left: e.left,
              scaleX: e.width / a.width(),
              scaleY: e.height / a.height(),
            },
            t || 366,
            function () {
              o.isAnimating = !1;
            }
          ));
      },
      getFitPos: function (t) {
        var e,
          o,
          i,
          a,
          s = this,
          r = t.$content,
          c = t.$slide,
          l = t.width || t.opts.width,
          d = t.height || t.opts.height,
          u = {};
        return (
          !!(t.isLoaded && r && r.length) &&
          ((e = n.fancybox.getTranslate(s.$refs.stage).width),
          (o = n.fancybox.getTranslate(s.$refs.stage).height),
          (e -=
            parseFloat(c.css("paddingLeft")) +
            parseFloat(c.css("paddingRight")) +
            parseFloat(r.css("marginLeft")) +
            parseFloat(r.css("marginRight"))),
          (o -=
            parseFloat(c.css("paddingTop")) +
            parseFloat(c.css("paddingBottom")) +
            parseFloat(r.css("marginTop")) +
            parseFloat(r.css("marginBottom"))),
          (l && d) || ((l = e), (d = o)),
          (i = Math.min(1, e / l, o / d)),
          (l *= i),
          (d *= i),
          l > e - 0.5 && (l = e),
          d > o - 0.5 && (d = o),
          "image" === t.type
            ? ((u.top =
                Math.floor(0.5 * (o - d)) + parseFloat(c.css("paddingTop"))),
              (u.left =
                Math.floor(0.5 * (e - l)) + parseFloat(c.css("paddingLeft"))))
            : "video" === t.contentType &&
              ((a =
                t.opts.width && t.opts.height ? l / d : t.opts.ratio || 16 / 9),
              d > l / a ? (d = l / a) : l > d * a && (l = d * a)),
          (u.width = l),
          (u.height = d),
          u)
        );
      },
      update: function (t) {
        var e = this;
        n.each(e.slides, function (n, o) {
          e.updateSlide(o, t);
        });
      },
      updateSlide: function (t, e) {
        var o = this,
          i = t && t.$content,
          a = t.width || t.opts.width,
          s = t.height || t.opts.height,
          r = t.$slide;
        o.adjustCaption(t),
          i &&
            (a || s || "video" === t.contentType) &&
            !t.hasError &&
            (n.fancybox.stop(i),
            n.fancybox.setTranslate(i, o.getFitPos(t)),
            t.pos === o.currPos && ((o.isAnimating = !1), o.updateCursor())),
          o.adjustLayout(t),
          r.length &&
            (r.trigger("refresh"),
            t.pos === o.currPos &&
              o.$refs.toolbar
                .add(o.$refs.navigation.find(".fancybox-button--arrow_right"))
                .toggleClass(
                  "compensate-for-scrollbar",
                  r.get(0).scrollHeight > r.get(0).clientHeight
                )),
          o.trigger("onUpdate", t, e);
      },
      centerSlide: function (t) {
        var e = this,
          o = e.current,
          i = o.$slide;
        !e.isClosing &&
          o &&
          (i.siblings().css({ transform: "", opacity: "" }),
          i
            .parent()
            .children()
            .removeClass("fancybox-slide--previous fancybox-slide--next"),
          n.fancybox.animate(
            i,
            { top: 0, left: 0, opacity: 1 },
            void 0 === t ? 0 : t,
            function () {
              i.css({ transform: "", opacity: "" }),
                o.isComplete || e.complete();
            },
            !1
          ));
      },
      isMoved: function (t) {
        var e,
          o,
          i = t || this.current;
        return (
          !!i &&
          ((o = n.fancybox.getTranslate(this.$refs.stage)),
          (e = n.fancybox.getTranslate(i.$slide)),
          !i.$slide.hasClass("fancybox-animated") &&
            (Math.abs(e.top - o.top) > 0.5 || Math.abs(e.left - o.left) > 0.5))
        );
      },
      updateCursor: function (t, e) {
        var o,
          i,
          a = this,
          s = a.current,
          r = a.$refs.container;
        s &&
          !a.isClosing &&
          a.Guestures &&
          (r.removeClass(
            "fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"
          ),
          (o = a.canPan(t, e)),
          (i = !!o || a.isZoomable()),
          r.toggleClass("fancybox-is-zoomable", i),
          n("[data-fancybox-zoom]").prop("disabled", !i),
          o
            ? r.addClass("fancybox-can-pan")
            : i &&
              ("zoom" === s.opts.clickContent ||
                (n.isFunction(s.opts.clickContent) &&
                  "zoom" == s.opts.clickContent(s)))
            ? r.addClass("fancybox-can-zoomIn")
            : s.opts.touch &&
              (s.opts.touch.vertical || a.group.length > 1) &&
              "video" !== s.contentType &&
              r.addClass("fancybox-can-swipe"));
      },
      isZoomable: function () {
        var t,
          e = this,
          n = e.current;
        if (n && !e.isClosing && "image" === n.type && !n.hasError) {
          if (!n.isLoaded) return !0;
          if (
            (t = e.getFitPos(n)) &&
            (n.width > t.width || n.height > t.height)
          )
            return !0;
        }
        return !1;
      },
      isScaledDown: function (t, e) {
        var o = this,
          i = !1,
          a = o.current,
          s = a.$content;
        return (
          void 0 !== t && void 0 !== e
            ? (i = t < a.width && e < a.height)
            : s &&
              ((i = n.fancybox.getTranslate(s)),
              (i = i.width < a.width && i.height < a.height)),
          i
        );
      },
      canPan: function (t, e) {
        var o = this,
          i = o.current,
          a = null,
          s = !1;
        return (
          "image" === i.type &&
            (i.isComplete || (t && e)) &&
            !i.hasError &&
            ((s = o.getFitPos(i)),
            void 0 !== t && void 0 !== e
              ? (a = { width: t, height: e })
              : i.isComplete && (a = n.fancybox.getTranslate(i.$content)),
            a &&
              s &&
              (s =
                Math.abs(a.width - s.width) > 1.5 ||
                Math.abs(a.height - s.height) > 1.5)),
          s
        );
      },
      loadSlide: function (t) {
        var e,
          o,
          i,
          a = this;
        if (!t.isLoading && !t.isLoaded) {
          if (((t.isLoading = !0), !1 === a.trigger("beforeLoad", t)))
            return (t.isLoading = !1), !1;
          switch (
            ((e = t.type),
            (o = t.$slide),
            o.off("refresh").trigger("onReset").addClass(t.opts.slideClass),
            e)
          ) {
            case "image":
              a.setImage(t);
              break;
            case "iframe":
              a.setIframe(t);
              break;
            case "html":
              a.setContent(t, t.src || t.content);
              break;
            case "video":
              a.setContent(
                t,
                t.opts.video.tpl
                  .replace(/\{\{src\}\}/gi, t.src)
                  .replace(
                    "{{format}}",
                    t.opts.videoFormat || t.opts.video.format || ""
                  )
                  .replace("{{poster}}", t.thumb || "")
              );
              break;
            case "inline":
              n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
              break;
            case "ajax":
              a.showLoading(t),
                (i = n.ajax(
                  n.extend({}, t.opts.ajax.settings, {
                    url: t.src,
                    success: function (e, n) {
                      "success" === n && a.setContent(t, e);
                    },
                    error: function (e, n) {
                      e && "abort" !== n && a.setError(t);
                    },
                  })
                )),
                o.one("onReset", function () {
                  i.abort();
                });
              break;
            default:
              a.setError(t);
          }
          return !0;
        }
      },
      setImage: function (t) {
        var o,
          i = this;
        setTimeout(function () {
          var e = t.$image;
          i.isClosing ||
            !t.isLoading ||
            (e && e.length && e[0].complete) ||
            t.hasError ||
            i.showLoading(t);
        }, 50),
          i.checkSrcset(t),
          (t.$content = n('<div class="fancybox-content"></div>')
            .addClass("fancybox-is-hidden")
            .appendTo(t.$slide.addClass("fancybox-slide--image"))),
          !1 !== t.opts.preload &&
            t.opts.width &&
            t.opts.height &&
            t.thumb &&
            ((t.width = t.opts.width),
            (t.height = t.opts.height),
            (o = e.createElement("img")),
            (o.onerror = function () {
              n(this).remove(), (t.$ghost = null);
            }),
            (o.onload = function () {
              i.afterLoad(t);
            }),
            (t.$ghost = n(o)
              .addClass("fancybox-image")
              .appendTo(t.$content)
              .attr("src", t.thumb))),
          i.setBigImage(t);
      },
      checkSrcset: function (e) {
        var n,
          o,
          i,
          a,
          s = e.opts.srcset || e.opts.image.srcset;
        if (s) {
          (i = t.devicePixelRatio || 1),
            (a = t.innerWidth * i),
            (o = s.split(",").map(function (t) {
              var e = {};
              return (
                t
                  .trim()
                  .split(/\s+/)
                  .forEach(function (t, n) {
                    var o = parseInt(t.substring(0, t.length - 1), 10);
                    if (0 === n) return (e.url = t);
                    o && ((e.value = o), (e.postfix = t[t.length - 1]));
                  }),
                e
              );
            })),
            o.sort(function (t, e) {
              return t.value - e.value;
            });
          for (var r = 0; r < o.length; r++) {
            var c = o[r];
            if (
              ("w" === c.postfix && c.value >= a) ||
              ("x" === c.postfix && c.value >= i)
            ) {
              n = c;
              break;
            }
          }
          !n && o.length && (n = o[o.length - 1]),
            n &&
              ((e.src = n.url),
              e.width &&
                e.height &&
                "w" == n.postfix &&
                ((e.height = (e.width / e.height) * n.value),
                (e.width = n.value)),
              (e.opts.srcset = s));
        }
      },
      setBigImage: function (t) {
        var o = this,
          i = e.createElement("img"),
          a = n(i);
        (t.$image = a
          .one("error", function () {
            o.setError(t);
          })
          .one("load", function () {
            var e;
            t.$ghost ||
              (o.resolveImageSlideSize(
                t,
                this.naturalWidth,
                this.naturalHeight
              ),
              o.afterLoad(t)),
              o.isClosing ||
                (t.opts.srcset &&
                  ((e = t.opts.sizes),
                  (e && "auto" !== e) ||
                    (e =
                      (t.width / t.height > 1 && s.width() / s.height() > 1
                        ? "100"
                        : Math.round((t.width / t.height) * 100)) + "vw"),
                  a.attr("sizes", e).attr("srcset", t.opts.srcset)),
                t.$ghost &&
                  setTimeout(function () {
                    t.$ghost && !o.isClosing && t.$ghost.hide();
                  }, Math.min(300, Math.max(1e3, t.height / 1600))),
                o.hideLoading(t));
          })
          .addClass("fancybox-image")
          .attr("src", t.src)
          .appendTo(t.$content)),
          (i.complete || "complete" == i.readyState) &&
          a.naturalWidth &&
          a.naturalHeight
            ? a.trigger("load")
            : i.error && a.trigger("error");
      },
      resolveImageSlideSize: function (t, e, n) {
        var o = parseInt(t.opts.width, 10),
          i = parseInt(t.opts.height, 10);
        (t.width = e),
          (t.height = n),
          o > 0 && ((t.width = o), (t.height = Math.floor((o * n) / e))),
          i > 0 && ((t.width = Math.floor((i * e) / n)), (t.height = i));
      },
      setIframe: function (t) {
        var e,
          o = this,
          i = t.opts.iframe,
          a = t.$slide;
        (t.$content = n(
          '<div class="fancybox-content' +
            (i.preload ? " fancybox-is-hidden" : "") +
            '"></div>'
        )
          .css(i.css)
          .appendTo(a)),
          a.addClass("fancybox-slide--" + t.contentType),
          (t.$iframe = e =
            n(i.tpl.replace(/\{rnd\}/g, new Date().getTime()))
              .attr(i.attr)
              .appendTo(t.$content)),
          i.preload
            ? (o.showLoading(t),
              e.on("load.fb error.fb", function (e) {
                (this.isReady = 1), t.$slide.trigger("refresh"), o.afterLoad(t);
              }),
              a.on("refresh.fb", function () {
                var n,
                  o,
                  s = t.$content,
                  r = i.css.width,
                  c = i.css.height;
                if (1 === e[0].isReady) {
                  try {
                    (n = e.contents()), (o = n.find("body"));
                  } catch (t) {}
                  o &&
                    o.length &&
                    o.children().length &&
                    (a.css("overflow", "visible"),
                    s.css({
                      width: "100%",
                      "max-width": "100%",
                      height: "9999px",
                    }),
                    void 0 === r &&
                      (r = Math.ceil(
                        Math.max(o[0].clientWidth, o.outerWidth(!0))
                      )),
                    s.css("width", r || "").css("max-width", ""),
                    void 0 === c &&
                      (c = Math.ceil(
                        Math.max(o[0].clientHeight, o.outerHeight(!0))
                      )),
                    s.css("height", c || ""),
                    a.css("overflow", "auto")),
                    s.removeClass("fancybox-is-hidden");
                }
              }))
            : o.afterLoad(t),
          e.attr("src", t.src),
          a.one("onReset", function () {
            try {
              n(this)
                .find("iframe")
                .hide()
                .unbind()
                .attr("src", "//about:blank");
            } catch (t) {}
            n(this).off("refresh.fb").empty(),
              (t.isLoaded = !1),
              (t.isRevealed = !1);
          });
      },
      setContent: function (t, e) {
        var o = this;
        o.isClosing ||
          (o.hideLoading(t),
          t.$content && n.fancybox.stop(t.$content),
          t.$slide.empty(),
          l(e) && e.parent().length
            ? ((e.hasClass("fancybox-content") ||
                e.parent().hasClass("fancybox-content")) &&
                e.parents(".fancybox-slide").trigger("onReset"),
              (t.$placeholder = n("<div>").hide().insertAfter(e)),
              e.css("display", "inline-block"))
            : t.hasError ||
              ("string" === n.type(e) &&
                (e = n("<div>").append(n.trim(e)).contents()),
              t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))),
          t.$slide.one("onReset", function () {
            n(this).find("video,audio").trigger("pause"),
              t.$placeholder &&
                (t.$placeholder
                  .after(e.removeClass("fancybox-content").hide())
                  .remove(),
                (t.$placeholder = null)),
              t.$smallBtn && (t.$smallBtn.remove(), (t.$smallBtn = null)),
              t.hasError ||
                (n(this).empty(), (t.isLoaded = !1), (t.isRevealed = !1));
          }),
          n(e).appendTo(t.$slide),
          n(e).is("video,audio") &&
            (n(e).addClass("fancybox-video"),
            n(e).wrap("<div></div>"),
            (t.contentType = "video"),
            (t.opts.width = t.opts.width || n(e).attr("width")),
            (t.opts.height = t.opts.height || n(e).attr("height"))),
          (t.$content = t.$slide
            .children()
            .filter("div,form,main,video,audio,article,.fancybox-content")
            .first()),
          t.$content.siblings().hide(),
          t.$content.length ||
            (t.$content = t.$slide.wrapInner("<div></div>").children().first()),
          t.$content.addClass("fancybox-content"),
          t.$slide.addClass("fancybox-slide--" + t.contentType),
          o.afterLoad(t));
      },
      setError: function (t) {
        (t.hasError = !0),
          t.$slide
            .trigger("onReset")
            .removeClass("fancybox-slide--" + t.contentType)
            .addClass("fancybox-slide--error"),
          (t.contentType = "html"),
          this.setContent(t, this.translate(t, t.opts.errorTpl)),
          t.pos === this.currPos && (this.isAnimating = !1);
      },
      showLoading: function (t) {
        var e = this;
        (t = t || e.current) &&
          !t.$spinner &&
          (t.$spinner = n(e.translate(e, e.opts.spinnerTpl))
            .appendTo(t.$slide)
            .hide()
            .fadeIn("fast"));
      },
      hideLoading: function (t) {
        var e = this;
        (t = t || e.current) &&
          t.$spinner &&
          (t.$spinner.stop().remove(), delete t.$spinner);
      },
      afterLoad: function (t) {
        var e = this;
        e.isClosing ||
          ((t.isLoading = !1),
          (t.isLoaded = !0),
          e.trigger("afterLoad", t),
          e.hideLoading(t),
          !t.opts.smallBtn ||
            (t.$smallBtn && t.$smallBtn.length) ||
            (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(
              t.$content
            )),
          t.opts.protect &&
            t.$content &&
            !t.hasError &&
            (t.$content.on("contextmenu.fb", function (t) {
              return 2 == t.button && t.preventDefault(), !0;
            }),
            "image" === t.type &&
              n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),
          e.adjustCaption(t),
          e.adjustLayout(t),
          t.pos === e.currPos && e.updateCursor(),
          e.revealContent(t));
      },
      adjustCaption: function (t) {
        var e,
          n = this,
          o = t || n.current,
          i = o.opts.caption,
          a = o.opts.preventCaptionOverlap,
          s = n.$refs.caption,
          r = !1;
        s.toggleClass("fancybox-caption--separate", a),
          a &&
            i &&
            i.length &&
            (o.pos !== n.currPos
              ? ((e = s.clone().appendTo(s.parent())),
                e.children().eq(0).empty().html(i),
                (r = e.outerHeight(!0)),
                e.empty().remove())
              : n.$caption && (r = n.$caption.outerHeight(!0)),
            o.$slide.css("padding-bottom", r || ""));
      },
      adjustLayout: function (t) {
        var e,
          n,
          o,
          i,
          a = this,
          s = t || a.current;
        s.isLoaded &&
          !0 !== s.opts.disableLayoutFix &&
          (s.$content.css("margin-bottom", ""),
          s.$content.outerHeight() > s.$slide.height() + 0.5 &&
            ((o = s.$slide[0].style["padding-bottom"]),
            (i = s.$slide.css("padding-bottom")),
            parseFloat(i) > 0 &&
              ((e = s.$slide[0].scrollHeight),
              s.$slide.css("padding-bottom", 0),
              Math.abs(e - s.$slide[0].scrollHeight) < 1 && (n = i),
              s.$slide.css("padding-bottom", o))),
          s.$content.css("margin-bottom", n));
      },
      revealContent: function (t) {
        var e,
          o,
          i,
          a,
          s = this,
          r = t.$slide,
          c = !1,
          l = !1,
          d = s.isMoved(t),
          u = t.isRevealed;
        return (
          (t.isRevealed = !0),
          (e = t.opts[s.firstRun ? "animationEffect" : "transitionEffect"]),
          (i = t.opts[s.firstRun ? "animationDuration" : "transitionDuration"]),
          (i = parseInt(
            void 0 === t.forcedDuration ? i : t.forcedDuration,
            10
          )),
          (!d && t.pos === s.currPos && i) || (e = !1),
          "zoom" === e &&
            (t.pos === s.currPos &&
            i &&
            "image" === t.type &&
            !t.hasError &&
            (l = s.getThumbPos(t))
              ? (c = s.getFitPos(t))
              : (e = "fade")),
          "zoom" === e
            ? ((s.isAnimating = !0),
              (c.scaleX = c.width / l.width),
              (c.scaleY = c.height / l.height),
              (a = t.opts.zoomOpacity),
              "auto" == a &&
                (a = Math.abs(t.width / t.height - l.width / l.height) > 0.1),
              a && ((l.opacity = 0.1), (c.opacity = 1)),
              n.fancybox.setTranslate(
                t.$content.removeClass("fancybox-is-hidden"),
                l
              ),
              p(t.$content),
              void n.fancybox.animate(t.$content, c, i, function () {
                (s.isAnimating = !1), s.complete();
              }))
            : (s.updateSlide(t),
              e
                ? (n.fancybox.stop(r),
                  (o =
                    "fancybox-slide--" +
                    (t.pos >= s.prevPos ? "next" : "previous") +
                    " fancybox-animated fancybox-fx-" +
                    e),
                  r.addClass(o).removeClass("fancybox-slide--current"),
                  t.$content.removeClass("fancybox-is-hidden"),
                  p(r),
                  "image" !== t.type && t.$content.hide().show(0),
                  void n.fancybox.animate(
                    r,
                    "fancybox-slide--current",
                    i,
                    function () {
                      r.removeClass(o).css({ transform: "", opacity: "" }),
                        t.pos === s.currPos && s.complete();
                    },
                    !0
                  ))
                : (t.$content.removeClass("fancybox-is-hidden"),
                  u ||
                    !d ||
                    "image" !== t.type ||
                    t.hasError ||
                    t.$content.hide().fadeIn("fast"),
                  void (t.pos === s.currPos && s.complete())))
        );
      },
      getThumbPos: function (t) {
        var e,
          o,
          i,
          a,
          s,
          r = !1,
          c = t.$thumb;
        return (
          !(!c || !g(c[0])) &&
          ((e = n.fancybox.getTranslate(c)),
          (o = parseFloat(c.css("border-top-width") || 0)),
          (i = parseFloat(c.css("border-right-width") || 0)),
          (a = parseFloat(c.css("border-bottom-width") || 0)),
          (s = parseFloat(c.css("border-left-width") || 0)),
          (r = {
            top: e.top + o,
            left: e.left + s,
            width: e.width - i - s,
            height: e.height - o - a,
            scaleX: 1,
            scaleY: 1,
          }),
          e.width > 0 && e.height > 0 && r)
        );
      },
      complete: function () {
        var t,
          e = this,
          o = e.current,
          i = {};
        !e.isMoved() &&
          o.isLoaded &&
          (o.isComplete ||
            ((o.isComplete = !0),
            o.$slide.siblings().trigger("onReset"),
            e.preload("inline"),
            p(o.$slide),
            o.$slide.addClass("fancybox-slide--complete"),
            n.each(e.slides, function (t, o) {
              o.pos >= e.currPos - 1 && o.pos <= e.currPos + 1
                ? (i[o.pos] = o)
                : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove());
            }),
            (e.slides = i)),
          (e.isAnimating = !1),
          e.updateCursor(),
          e.trigger("afterShow"),
          o.opts.video.autoStart &&
            o.$slide
              .find("video,audio")
              .filter(":visible:first")
              .trigger("play")
              .one("ended", function () {
                Document.exitFullscreen
                  ? Document.exitFullscreen()
                  : this.webkitExitFullscreen && this.webkitExitFullscreen(),
                  e.next();
              }),
          o.opts.autoFocus &&
            "html" === o.contentType &&
            ((t = o.$content.find("input[autofocus]:enabled:visible:first")),
            t.length ? t.trigger("focus") : e.focus(null, !0)),
          o.$slide.scrollTop(0).scrollLeft(0));
      },
      preload: function (t) {
        var e,
          n,
          o = this;
        o.group.length < 2 ||
          ((n = o.slides[o.currPos + 1]),
          (e = o.slides[o.currPos - 1]),
          e && e.type === t && o.loadSlide(e),
          n && n.type === t && o.loadSlide(n));
      },
      focus: function (t, o) {
        var i,
          a,
          s = this,
          r = [
            "a[href]",
            "area[href]",
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            "select:not([disabled]):not([aria-hidden])",
            "textarea:not([disabled]):not([aria-hidden])",
            "button:not([disabled]):not([aria-hidden])",
            "iframe",
            "object",
            "embed",
            "video",
            "audio",
            "[contenteditable]",
            '[tabindex]:not([tabindex^="-"])',
          ].join(",");
        s.isClosing ||
          ((i =
            !t && s.current && s.current.isComplete
              ? s.current.$slide.find(
                  "*:visible" + (o ? ":not(.fancybox-close-small)" : "")
                )
              : s.$refs.container.find("*:visible")),
          (i = i.filter(r).filter(function () {
            return (
              "hidden" !== n(this).css("visibility") &&
              !n(this).hasClass("disabled")
            );
          })),
          i.length
            ? ((a = i.index(e.activeElement)),
              t && t.shiftKey
                ? (a < 0 || 0 == a) &&
                  (t.preventDefault(), i.eq(i.length - 1).trigger("focus"))
                : (a < 0 || a == i.length - 1) &&
                  (t && t.preventDefault(), i.eq(0).trigger("focus")))
            : s.$refs.container.trigger("focus"));
      },
      activate: function () {
        var t = this;
        n(".fancybox-container").each(function () {
          var e = n(this).data("FancyBox");
          e &&
            e.id !== t.id &&
            !e.isClosing &&
            (e.trigger("onDeactivate"), e.removeEvents(), (e.isVisible = !1));
        }),
          (t.isVisible = !0),
          (t.current || t.isIdle) && (t.update(), t.updateControls()),
          t.trigger("onActivate"),
          t.addEvents();
      },
      close: function (t, e) {
        var o,
          i,
          a,
          s,
          r,
          c,
          l,
          u = this,
          f = u.current,
          h = function () {
            u.cleanUp(t);
          };
        return (
          !u.isClosing &&
          ((u.isClosing = !0),
          !1 === u.trigger("beforeClose", t)
            ? ((u.isClosing = !1),
              d(function () {
                u.update();
              }),
              !1)
            : (u.removeEvents(),
              (a = f.$content),
              (o = f.opts.animationEffect),
              (i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0),
              f.$slide.removeClass(
                "fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"
              ),
              !0 !== t ? n.fancybox.stop(f.$slide) : (o = !1),
              f.$slide.siblings().trigger("onReset").remove(),
              i &&
                u.$refs.container
                  .removeClass("fancybox-is-open")
                  .addClass("fancybox-is-closing")
                  .css("transition-duration", i + "ms"),
              u.hideLoading(f),
              u.hideControls(!0),
              u.updateCursor(),
              "zoom" !== o ||
                (a &&
                  i &&
                  "image" === f.type &&
                  !u.isMoved() &&
                  !f.hasError &&
                  (l = u.getThumbPos(f))) ||
                (o = "fade"),
              "zoom" === o
                ? (n.fancybox.stop(a),
                  (s = n.fancybox.getTranslate(a)),
                  (c = {
                    top: s.top,
                    left: s.left,
                    scaleX: s.width / l.width,
                    scaleY: s.height / l.height,
                    width: l.width,
                    height: l.height,
                  }),
                  (r = f.opts.zoomOpacity),
                  "auto" == r &&
                    (r =
                      Math.abs(f.width / f.height - l.width / l.height) > 0.1),
                  r && (l.opacity = 0),
                  n.fancybox.setTranslate(a, c),
                  p(a),
                  n.fancybox.animate(a, l, i, h),
                  !0)
                : (o && i
                    ? n.fancybox.animate(
                        f.$slide
                          .addClass("fancybox-slide--previous")
                          .removeClass("fancybox-slide--current"),
                        "fancybox-animated fancybox-fx-" + o,
                        i,
                        h
                      )
                    : !0 === t
                    ? setTimeout(h, i)
                    : h(),
                  !0)))
        );
      },
      cleanUp: function (e) {
        var o,
          i,
          a,
          s = this,
          r = s.current.opts.$orig;
        s.current.$slide.trigger("onReset"),
          s.$refs.container.empty().remove(),
          s.trigger("afterClose", e),
          s.current.opts.backFocus &&
            ((r && r.length && r.is(":visible")) || (r = s.$trigger),
            r &&
              r.length &&
              ((i = t.scrollX),
              (a = t.scrollY),
              r.trigger("focus"),
              n("html, body").scrollTop(a).scrollLeft(i))),
          (s.current = null),
          (o = n.fancybox.getInstance()),
          o
            ? o.activate()
            : (n("body").removeClass(
                "fancybox-active compensate-for-scrollbar"
              ),
              n("#fancybox-style-noscroll").remove());
      },
      trigger: function (t, e) {
        var o,
          i = Array.prototype.slice.call(arguments, 1),
          a = this,
          s = e && e.opts ? e : a.current;
        if (
          (s ? i.unshift(s) : (s = a),
          i.unshift(a),
          n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)),
          !1 === o)
        )
          return o;
        "afterClose" !== t && a.$refs
          ? a.$refs.container.trigger(t + ".fb", i)
          : r.trigger(t + ".fb", i);
      },
      updateControls: function () {
        var t = this,
          o = t.current,
          i = o.index,
          a = t.$refs.container,
          s = t.$refs.caption,
          r = o.opts.caption;
        o.$slide.trigger("refresh"),
          r && r.length
            ? ((t.$caption = s), s.children().eq(0).html(r))
            : (t.$caption = null),
          t.hasHiddenControls || t.isIdle || t.showControls(),
          a.find("[data-fancybox-count]").html(t.group.length),
          a.find("[data-fancybox-index]").html(i + 1),
          a
            .find("[data-fancybox-prev]")
            .prop("disabled", !o.opts.loop && i <= 0),
          a
            .find("[data-fancybox-next]")
            .prop("disabled", !o.opts.loop && i >= t.group.length - 1),
          "image" === o.type
            ? a
                .find("[data-fancybox-zoom]")
                .show()
                .end()
                .find("[data-fancybox-download]")
                .attr("href", o.opts.image.src || o.src)
                .show()
            : o.opts.toolbar &&
              a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(),
          n(e.activeElement).is(":hidden,[disabled]") &&
            t.$refs.container.trigger("focus");
      },
      hideControls: function (t) {
        var e = this,
          n = ["infobar", "toolbar", "nav"];
        (!t && e.current.opts.preventCaptionOverlap) || n.push("caption"),
          this.$refs.container.removeClass(
            n
              .map(function (t) {
                return "fancybox-show-" + t;
              })
              .join(" ")
          ),
          (this.hasHiddenControls = !0);
      },
      showControls: function () {
        var t = this,
          e = t.current ? t.current.opts : t.opts,
          n = t.$refs.container;
        (t.hasHiddenControls = !1),
          (t.idleSecondsCounter = 0),
          n
            .toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons))
            .toggleClass(
              "fancybox-show-infobar",
              !!(e.infobar && t.group.length > 1)
            )
            .toggleClass("fancybox-show-caption", !!t.$caption)
            .toggleClass(
              "fancybox-show-nav",
              !!(e.arrows && t.group.length > 1)
            )
            .toggleClass("fancybox-is-modal", !!e.modal);
      },
      toggleControls: function () {
        this.hasHiddenControls ? this.showControls() : this.hideControls();
      },
    }),
      (n.fancybox = {
        version: "3.5.7",
        defaults: a,
        getInstance: function (t) {
          var e = n(
              '.fancybox-container:not(".fancybox-is-closing"):last'
            ).data("FancyBox"),
            o = Array.prototype.slice.call(arguments, 1);
          return (
            e instanceof b &&
            ("string" === n.type(t)
              ? e[t].apply(e, o)
              : "function" === n.type(t) && t.apply(e, o),
            e)
          );
        },
        open: function (t, e, n) {
          return new b(t, e, n);
        },
        close: function (t) {
          var e = this.getInstance();
          e && (e.close(), !0 === t && this.close(t));
        },
        destroy: function () {
          this.close(!0), r.add("body").off("click.fb-start", "**");
        },
        isMobile:
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ),
        use3d: (function () {
          var n = e.createElement("div");
          return (
            t.getComputedStyle &&
            t.getComputedStyle(n) &&
            t.getComputedStyle(n).getPropertyValue("transform") &&
            !(e.documentMode && e.documentMode < 11)
          );
        })(),
        getTranslate: function (t) {
          var e;
          return (
            !(!t || !t.length) &&
            ((e = t[0].getBoundingClientRect()),
            {
              top: e.top || 0,
              left: e.left || 0,
              width: e.width,
              height: e.height,
              opacity: parseFloat(t.css("opacity")),
            })
          );
        },
        setTranslate: function (t, e) {
          var n = "",
            o = {};
          if (t && e)
            return (
              (void 0 === e.left && void 0 === e.top) ||
                ((n =
                  (void 0 === e.left ? t.position().left : e.left) +
                  "px, " +
                  (void 0 === e.top ? t.position().top : e.top) +
                  "px"),
                (n = this.use3d
                  ? "translate3d(" + n + ", 0px)"
                  : "translate(" + n + ")")),
              void 0 !== e.scaleX && void 0 !== e.scaleY
                ? (n += " scale(" + e.scaleX + ", " + e.scaleY + ")")
                : void 0 !== e.scaleX && (n += " scaleX(" + e.scaleX + ")"),
              n.length && (o.transform = n),
              void 0 !== e.opacity && (o.opacity = e.opacity),
              void 0 !== e.width && (o.width = e.width),
              void 0 !== e.height && (o.height = e.height),
              t.css(o)
            );
        },
        animate: function (t, e, o, i, a) {
          var s,
            r = this;
          n.isFunction(o) && ((i = o), (o = null)),
            r.stop(t),
            (s = r.getTranslate(t)),
            t.on(f, function (c) {
              (!c ||
                !c.originalEvent ||
                (t.is(c.originalEvent.target) &&
                  "z-index" != c.originalEvent.propertyName)) &&
                (r.stop(t),
                n.isNumeric(o) && t.css("transition-duration", ""),
                n.isPlainObject(e)
                  ? void 0 !== e.scaleX &&
                    void 0 !== e.scaleY &&
                    r.setTranslate(t, {
                      top: e.top,
                      left: e.left,
                      width: s.width * e.scaleX,
                      height: s.height * e.scaleY,
                      scaleX: 1,
                      scaleY: 1,
                    })
                  : !0 !== a && t.removeClass(e),
                n.isFunction(i) && i(c));
            }),
            n.isNumeric(o) && t.css("transition-duration", o + "ms"),
            n.isPlainObject(e)
              ? (void 0 !== e.scaleX &&
                  void 0 !== e.scaleY &&
                  (delete e.width,
                  delete e.height,
                  t.parent().hasClass("fancybox-slide--image") &&
                    t.parent().addClass("fancybox-is-scaling")),
                n.fancybox.setTranslate(t, e))
              : t.addClass(e),
            t.data(
              "timer",
              setTimeout(function () {
                t.trigger(f);
              }, o + 33)
            );
        },
        stop: function (t, e) {
          t &&
            t.length &&
            (clearTimeout(t.data("timer")),
            e && t.trigger(f),
            t.off(f).css("transition-duration", ""),
            t.parent().removeClass("fancybox-is-scaling"));
        },
      }),
      (n.fn.fancybox = function (t) {
        var e;
        return (
          (t = t || {}),
          (e = t.selector || !1),
          e
            ? n("body")
                .off("click.fb-start", e)
                .on("click.fb-start", e, { options: t }, i)
            : this.off("click.fb-start").on(
                "click.fb-start",
                { items: this, options: t },
                i
              ),
          this
        );
      }),
      r.on("click.fb-start", "[data-fancybox]", i),
      r.on("click.fb-start", "[data-fancybox-trigger]", function (t) {
        n('[data-fancybox="' + n(this).attr("data-fancybox-trigger") + '"]')
          .eq(n(this).attr("data-fancybox-index") || 0)
          .trigger("click.fb-start", { $trigger: n(this) });
      }),
      (function () {
        var t = null;
        r.on("mousedown mouseup focus blur", ".fancybox-button", function (e) {
          switch (e.type) {
            case "mousedown":
              t = n(this);
              break;
            case "mouseup":
              t = null;
              break;
            case "focusin":
              n(".fancybox-button").removeClass("fancybox-focus"),
                n(this).is(t) ||
                  n(this).is("[disabled]") ||
                  n(this).addClass("fancybox-focus");
              break;
            case "focusout":
              n(".fancybox-button").removeClass("fancybox-focus");
          }
        });
      })();
  }
})(window, document, jQuery),
  (function (t) {
    "use strict";
    var e = {
        youtube: {
          matcher:
            /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
          params: {
            autoplay: 1,
            autohide: 1,
            fs: 1,
            rel: 0,
            hd: 1,
            wmode: "transparent",
            enablejsapi: 1,
            html5: 1,
          },
          paramPlace: 8,
          type: "iframe",
          url: "https://www.youtube-nocookie.com/embed/$4",
          thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg",
        },
        vimeo: {
          matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
          params: {
            autoplay: 1,
            hd: 1,
            show_title: 1,
            show_byline: 1,
            show_portrait: 0,
            fullscreen: 1,
          },
          paramPlace: 3,
          type: "iframe",
          url: "//player.vimeo.com/video/$2",
        },
        instagram: {
          matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
          type: "image",
          url: "//$1/p/$2/media/?size=l",
        },
        gmap_place: {
          matcher:
            /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
          type: "iframe",
          url: function (t) {
            return (
              "//maps.google." +
              t[2] +
              "/?ll=" +
              (t[9]
                ? t[9] +
                  "&z=" +
                  Math.floor(t[10]) +
                  (t[12] ? t[12].replace(/^\//, "&") : "")
                : t[12] + ""
              ).replace(/\?/, "&") +
              "&output=" +
              (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
            );
          },
        },
        gmap_search: {
          matcher:
            /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
          type: "iframe",
          url: function (t) {
            return (
              "//maps.google." +
              t[2] +
              "/maps?q=" +
              t[5].replace("query=", "q=").replace("api=1", "") +
              "&output=embed"
            );
          },
        },
      },
      n = function (e, n, o) {
        if (e)
          return (
            (o = o || ""),
            "object" === t.type(o) && (o = t.param(o, !0)),
            t.each(n, function (t, n) {
              e = e.replace("$" + t, n || "");
            }),
            o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o),
            e
          );
      };
    t(document).on("objectNeedsType.fb", function (o, i, a) {
      var s,
        r,
        c,
        l,
        d,
        u,
        f,
        p = a.src || "",
        h = !1;
      (s = t.extend(!0, {}, e, a.opts.media)),
        t.each(s, function (e, o) {
          if ((c = p.match(o.matcher))) {
            if (
              ((h = o.type), (f = e), (u = {}), o.paramPlace && c[o.paramPlace])
            ) {
              (d = c[o.paramPlace]),
                "?" == d[0] && (d = d.substring(1)),
                (d = d.split("&"));
              for (var i = 0; i < d.length; ++i) {
                var s = d[i].split("=", 2);
                2 == s.length &&
                  (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")));
              }
            }
            return (
              (l = t.extend(!0, {}, o.params, a.opts[e], u)),
              (p =
                "function" === t.type(o.url)
                  ? o.url.call(this, c, l, a)
                  : n(o.url, c, l)),
              (r =
                "function" === t.type(o.thumb)
                  ? o.thumb.call(this, c, l, a)
                  : n(o.thumb, c)),
              "youtube" === e
                ? (p = p.replace(/&t=((\d+)m)?(\d+)s/, function (t, e, n, o) {
                    return (
                      "&start=" +
                      ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
                    );
                  }))
                : "vimeo" === e && (p = p.replace("&%23", "#")),
              !1
            );
          }
        }),
        h
          ? (a.opts.thumb ||
              (a.opts.$thumb && a.opts.$thumb.length) ||
              (a.opts.thumb = r),
            "iframe" === h &&
              (a.opts = t.extend(!0, a.opts, {
                iframe: { preload: !1, attr: { scrolling: "no" } },
              })),
            t.extend(a, {
              type: h,
              src: p,
              origSrc: a.src,
              contentSource: f,
              contentType:
                "image" === h
                  ? "image"
                  : "gmap_place" == f || "gmap_search" == f
                  ? "map"
                  : "video",
            }))
          : p && (a.type = a.opts.defaultType);
    });
    var o = {
      youtube: {
        src: "https://www.youtube.com/iframe_api",
        class: "YT",
        loading: !1,
        loaded: !1,
      },
      vimeo: {
        src: "https://player.vimeo.com/api/player.js",
        class: "Vimeo",
        loading: !1,
        loaded: !1,
      },
      load: function (t) {
        var e,
          n = this;
        if (this[t].loaded)
          return void setTimeout(function () {
            n.done(t);
          });
        this[t].loading ||
          ((this[t].loading = !0),
          (e = document.createElement("script")),
          (e.type = "text/javascript"),
          (e.src = this[t].src),
          "youtube" === t
            ? (window.onYouTubeIframeAPIReady = function () {
                (n[t].loaded = !0), n.done(t);
              })
            : (e.onload = function () {
                (n[t].loaded = !0), n.done(t);
              }),
          document.body.appendChild(e));
      },
      done: function (e) {
        var n, o, i;
        "youtube" === e && delete window.onYouTubeIframeAPIReady,
          (n = t.fancybox.getInstance()) &&
            ((o = n.current.$content.find("iframe")),
            "youtube" === e && void 0 !== YT && YT
              ? (i = new YT.Player(o.attr("id"), {
                  events: {
                    onStateChange: function (t) {
                      0 == t.data && n.next();
                    },
                  },
                }))
              : "vimeo" === e &&
                void 0 !== Vimeo &&
                Vimeo &&
                ((i = new Vimeo.Player(o)),
                i.on("ended", function () {
                  n.next();
                })));
      },
    };
    t(document).on({
      "afterShow.fb": function (t, e, n) {
        e.group.length > 1 &&
          ("youtube" === n.contentSource || "vimeo" === n.contentSource) &&
          o.load(n.contentSource);
      },
    });
  })(jQuery),
  (function (t, e, n) {
    "use strict";
    var o = (function () {
        return (
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          t.mozRequestAnimationFrame ||
          t.oRequestAnimationFrame ||
          function (e) {
            return t.setTimeout(e, 1e3 / 60);
          }
        );
      })(),
      i = (function () {
        return (
          t.cancelAnimationFrame ||
          t.webkitCancelAnimationFrame ||
          t.mozCancelAnimationFrame ||
          t.oCancelAnimationFrame ||
          function (e) {
            t.clearTimeout(e);
          }
        );
      })(),
      a = function (e) {
        var n = [];
        (e = e.originalEvent || e || t.e),
          (e =
            e.touches && e.touches.length
              ? e.touches
              : e.changedTouches && e.changedTouches.length
              ? e.changedTouches
              : [e]);
        for (var o in e)
          e[o].pageX
            ? n.push({ x: e[o].pageX, y: e[o].pageY })
            : e[o].clientX && n.push({ x: e[o].clientX, y: e[o].clientY });
        return n;
      },
      s = function (t, e, n) {
        return e && t
          ? "x" === n
            ? t.x - e.x
            : "y" === n
            ? t.y - e.y
            : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
          : 0;
      },
      r = function (t) {
        if (
          t.is(
            'a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe'
          ) ||
          n.isFunction(t.get(0).onclick) ||
          t.data("selectable")
        )
          return !0;
        for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
          if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
        return !1;
      },
      c = function (e) {
        var n = t.getComputedStyle(e)["overflow-y"],
          o = t.getComputedStyle(e)["overflow-x"],
          i =
            ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
          a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
        return i || a;
      },
      l = function (t) {
        for (var e = !1; ; ) {
          if ((e = c(t.get(0)))) break;
          if (
            ((t = t.parent()),
            !t.length || t.hasClass("fancybox-stage") || t.is("body"))
          )
            break;
        }
        return e;
      },
      d = function (t) {
        var e = this;
        (e.instance = t),
          (e.$bg = t.$refs.bg),
          (e.$stage = t.$refs.stage),
          (e.$container = t.$refs.container),
          e.destroy(),
          e.$container.on(
            "touchstart.fb.touch mousedown.fb.touch",
            n.proxy(e, "ontouchstart")
          );
      };
    (d.prototype.destroy = function () {
      var t = this;
      t.$container.off(".fb.touch"),
        n(e).off(".fb.touch"),
        t.requestId && (i(t.requestId), (t.requestId = null)),
        t.tapped && (clearTimeout(t.tapped), (t.tapped = null));
    }),
      (d.prototype.ontouchstart = function (o) {
        var i = this,
          c = n(o.target),
          d = i.instance,
          u = d.current,
          f = u.$slide,
          p = u.$content,
          h = "touchstart" == o.type;
        if (
          (h && i.$container.off("mousedown.fb.touch"),
          (!o.originalEvent || 2 != o.originalEvent.button) &&
            f.length &&
            c.length &&
            !r(c) &&
            !r(c.parent()) &&
            (c.is("img") ||
              !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left)))
        ) {
          if (!u || d.isAnimating || u.$slide.hasClass("fancybox-animated"))
            return o.stopPropagation(), void o.preventDefault();
          (i.realPoints = i.startPoints = a(o)),
            i.startPoints.length &&
              (u.touch && o.stopPropagation(),
              (i.startEvent = o),
              (i.canTap = !0),
              (i.$target = c),
              (i.$content = p),
              (i.opts = u.opts.touch),
              (i.isPanning = !1),
              (i.isSwiping = !1),
              (i.isZooming = !1),
              (i.isScrolling = !1),
              (i.canPan = d.canPan()),
              (i.startTime = new Date().getTime()),
              (i.distanceX = i.distanceY = i.distance = 0),
              (i.canvasWidth = Math.round(f[0].clientWidth)),
              (i.canvasHeight = Math.round(f[0].clientHeight)),
              (i.contentLastPos = null),
              (i.contentStartPos = n.fancybox.getTranslate(i.$content) || {
                top: 0,
                left: 0,
              }),
              (i.sliderStartPos = n.fancybox.getTranslate(f)),
              (i.stagePos = n.fancybox.getTranslate(d.$refs.stage)),
              (i.sliderStartPos.top -= i.stagePos.top),
              (i.sliderStartPos.left -= i.stagePos.left),
              (i.contentStartPos.top -= i.stagePos.top),
              (i.contentStartPos.left -= i.stagePos.left),
              n(e)
                .off(".fb.touch")
                .on(
                  h
                    ? "touchend.fb.touch touchcancel.fb.touch"
                    : "mouseup.fb.touch mouseleave.fb.touch",
                  n.proxy(i, "ontouchend")
                )
                .on(
                  h ? "touchmove.fb.touch" : "mousemove.fb.touch",
                  n.proxy(i, "ontouchmove")
                ),
              n.fancybox.isMobile &&
                e.addEventListener("scroll", i.onscroll, !0),
              (((i.opts || i.canPan) &&
                (c.is(i.$stage) || i.$stage.find(c).length)) ||
                (c.is(".fancybox-image") && o.preventDefault(),
                n.fancybox.isMobile &&
                  c.parents(".fancybox-caption").length)) &&
                ((i.isScrollable = l(c) || l(c.parent())),
                (n.fancybox.isMobile && i.isScrollable) || o.preventDefault(),
                (1 === i.startPoints.length || u.hasError) &&
                  (i.canPan
                    ? (n.fancybox.stop(i.$content), (i.isPanning = !0))
                    : (i.isSwiping = !0),
                  i.$container.addClass("fancybox-is-grabbing")),
                2 === i.startPoints.length &&
                  "image" === u.type &&
                  (u.isLoaded || u.$ghost) &&
                  ((i.canTap = !1),
                  (i.isSwiping = !1),
                  (i.isPanning = !1),
                  (i.isZooming = !0),
                  n.fancybox.stop(i.$content),
                  (i.centerPointStartX =
                    0.5 * (i.startPoints[0].x + i.startPoints[1].x) -
                    n(t).scrollLeft()),
                  (i.centerPointStartY =
                    0.5 * (i.startPoints[0].y + i.startPoints[1].y) -
                    n(t).scrollTop()),
                  (i.percentageOfImageAtPinchPointX =
                    (i.centerPointStartX - i.contentStartPos.left) /
                    i.contentStartPos.width),
                  (i.percentageOfImageAtPinchPointY =
                    (i.centerPointStartY - i.contentStartPos.top) /
                    i.contentStartPos.height),
                  (i.startDistanceBetweenFingers = s(
                    i.startPoints[0],
                    i.startPoints[1]
                  )))));
        }
      }),
      (d.prototype.onscroll = function (t) {
        var n = this;
        (n.isScrolling = !0), e.removeEventListener("scroll", n.onscroll, !0);
      }),
      (d.prototype.ontouchmove = function (t) {
        var e = this;
        return void 0 !== t.originalEvent.buttons &&
          0 === t.originalEvent.buttons
          ? void e.ontouchend(t)
          : e.isScrolling
          ? void (e.canTap = !1)
          : ((e.newPoints = a(t)),
            void (
              (e.opts || e.canPan) &&
              e.newPoints.length &&
              e.newPoints.length &&
              ((e.isSwiping && !0 === e.isSwiping) || t.preventDefault(),
              (e.distanceX = s(e.newPoints[0], e.startPoints[0], "x")),
              (e.distanceY = s(e.newPoints[0], e.startPoints[0], "y")),
              (e.distance = s(e.newPoints[0], e.startPoints[0])),
              e.distance > 0 &&
                (e.isSwiping
                  ? e.onSwipe(t)
                  : e.isPanning
                  ? e.onPan()
                  : e.isZooming && e.onZoom()))
            ));
      }),
      (d.prototype.onSwipe = function (e) {
        var a,
          s = this,
          r = s.instance,
          c = s.isSwiping,
          l = s.sliderStartPos.left || 0;
        if (!0 !== c)
          "x" == c &&
            (s.distanceX > 0 &&
            (s.instance.group.length < 2 ||
              (0 === s.instance.current.index && !s.instance.current.opts.loop))
              ? (l += Math.pow(s.distanceX, 0.8))
              : s.distanceX < 0 &&
                (s.instance.group.length < 2 ||
                  (s.instance.current.index === s.instance.group.length - 1 &&
                    !s.instance.current.opts.loop))
              ? (l -= Math.pow(-s.distanceX, 0.8))
              : (l += s.distanceX)),
            (s.sliderLastPos = {
              top: "x" == c ? 0 : s.sliderStartPos.top + s.distanceY,
              left: l,
            }),
            s.requestId && (i(s.requestId), (s.requestId = null)),
            (s.requestId = o(function () {
              s.sliderLastPos &&
                (n.each(s.instance.slides, function (t, e) {
                  var o = e.pos - s.instance.currPos;
                  n.fancybox.setTranslate(e.$slide, {
                    top: s.sliderLastPos.top,
                    left:
                      s.sliderLastPos.left +
                      o * s.canvasWidth +
                      o * e.opts.gutter,
                  });
                }),
                s.$container.addClass("fancybox-is-sliding"));
            }));
        else if (Math.abs(s.distance) > 10) {
          if (
            ((s.canTap = !1),
            r.group.length < 2 && s.opts.vertical
              ? (s.isSwiping = "y")
              : r.isDragging ||
                !1 === s.opts.vertical ||
                ("auto" === s.opts.vertical && n(t).width() > 800)
              ? (s.isSwiping = "x")
              : ((a = Math.abs(
                  (180 * Math.atan2(s.distanceY, s.distanceX)) / Math.PI
                )),
                (s.isSwiping = a > 45 && a < 135 ? "y" : "x")),
            "y" === s.isSwiping && n.fancybox.isMobile && s.isScrollable)
          )
            return void (s.isScrolling = !0);
          (r.isDragging = s.isSwiping),
            (s.startPoints = s.newPoints),
            n.each(r.slides, function (t, e) {
              var o, i;
              n.fancybox.stop(e.$slide),
                (o = n.fancybox.getTranslate(e.$slide)),
                (i = n.fancybox.getTranslate(r.$refs.stage)),
                e.$slide
                  .css({
                    transform: "",
                    opacity: "",
                    "transition-duration": "",
                  })
                  .removeClass("fancybox-animated")
                  .removeClass(function (t, e) {
                    return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
                  }),
                e.pos === r.current.pos &&
                  ((s.sliderStartPos.top = o.top - i.top),
                  (s.sliderStartPos.left = o.left - i.left)),
                n.fancybox.setTranslate(e.$slide, {
                  top: o.top - i.top,
                  left: o.left - i.left,
                });
            }),
            r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop();
        }
      }),
      (d.prototype.onPan = function () {
        var t = this;
        if (s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5))
          return void (t.startPoints = t.newPoints);
        (t.canTap = !1),
          (t.contentLastPos = t.limitMovement()),
          t.requestId && i(t.requestId),
          (t.requestId = o(function () {
            n.fancybox.setTranslate(t.$content, t.contentLastPos);
          }));
      }),
      (d.prototype.limitMovement = function () {
        var t,
          e,
          n,
          o,
          i,
          a,
          s = this,
          r = s.canvasWidth,
          c = s.canvasHeight,
          l = s.distanceX,
          d = s.distanceY,
          u = s.contentStartPos,
          f = u.left,
          p = u.top,
          h = u.width,
          g = u.height;
        return (
          (i = h > r ? f + l : f),
          (a = p + d),
          (t = Math.max(0, 0.5 * r - 0.5 * h)),
          (e = Math.max(0, 0.5 * c - 0.5 * g)),
          (n = Math.min(r - h, 0.5 * r - 0.5 * h)),
          (o = Math.min(c - g, 0.5 * c - 0.5 * g)),
          l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, 0.8) || 0),
          l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, 0.8) || 0),
          d > 0 && a > e && (a = e - 1 + Math.pow(-e + p + d, 0.8) || 0),
          d < 0 && a < o && (a = o + 1 - Math.pow(o - p - d, 0.8) || 0),
          { top: a, left: i }
        );
      }),
      (d.prototype.limitPosition = function (t, e, n, o) {
        var i = this,
          a = i.canvasWidth,
          s = i.canvasHeight;
        return (
          n > a
            ? ((t = t > 0 ? 0 : t), (t = t < a - n ? a - n : t))
            : (t = Math.max(0, a / 2 - n / 2)),
          o > s
            ? ((e = e > 0 ? 0 : e), (e = e < s - o ? s - o : e))
            : (e = Math.max(0, s / 2 - o / 2)),
          { top: e, left: t }
        );
      }),
      (d.prototype.onZoom = function () {
        var e = this,
          a = e.contentStartPos,
          r = a.width,
          c = a.height,
          l = a.left,
          d = a.top,
          u = s(e.newPoints[0], e.newPoints[1]),
          f = u / e.startDistanceBetweenFingers,
          p = Math.floor(r * f),
          h = Math.floor(c * f),
          g = (r - p) * e.percentageOfImageAtPinchPointX,
          b = (c - h) * e.percentageOfImageAtPinchPointY,
          m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
          v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
          y = m - e.centerPointStartX,
          x = v - e.centerPointStartY,
          w = l + (g + y),
          $ = d + (b + x),
          S = { top: $, left: w, scaleX: f, scaleY: f };
        (e.canTap = !1),
          (e.newWidth = p),
          (e.newHeight = h),
          (e.contentLastPos = S),
          e.requestId && i(e.requestId),
          (e.requestId = o(function () {
            n.fancybox.setTranslate(e.$content, e.contentLastPos);
          }));
      }),
      (d.prototype.ontouchend = function (t) {
        var o = this,
          s = o.isSwiping,
          r = o.isPanning,
          c = o.isZooming,
          l = o.isScrolling;
        if (
          ((o.endPoints = a(t)),
          (o.dMs = Math.max(new Date().getTime() - o.startTime, 1)),
          o.$container.removeClass("fancybox-is-grabbing"),
          n(e).off(".fb.touch"),
          e.removeEventListener("scroll", o.onscroll, !0),
          o.requestId && (i(o.requestId), (o.requestId = null)),
          (o.isSwiping = !1),
          (o.isPanning = !1),
          (o.isZooming = !1),
          (o.isScrolling = !1),
          (o.instance.isDragging = !1),
          o.canTap)
        )
          return o.onTap(t);
        (o.speed = 100),
          (o.velocityX = (o.distanceX / o.dMs) * 0.5),
          (o.velocityY = (o.distanceY / o.dMs) * 0.5),
          r ? o.endPanning() : c ? o.endZooming() : o.endSwiping(s, l);
      }),
      (d.prototype.endSwiping = function (t, e) {
        var o = this,
          i = !1,
          a = o.instance.group.length,
          s = Math.abs(o.distanceX),
          r = "x" == t && a > 1 && ((o.dMs > 130 && s > 10) || s > 50);
        (o.sliderLastPos = null),
          "y" == t && !e && Math.abs(o.distanceY) > 50
            ? (n.fancybox.animate(
                o.instance.current.$slide,
                {
                  top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
                  opacity: 0,
                },
                200
              ),
              (i = o.instance.close(!0, 250)))
            : r && o.distanceX > 0
            ? (i = o.instance.previous(300))
            : r && o.distanceX < 0 && (i = o.instance.next(300)),
          !1 !== i || ("x" != t && "y" != t) || o.instance.centerSlide(200),
          o.$container.removeClass("fancybox-is-sliding");
      }),
      (d.prototype.endPanning = function () {
        var t,
          e,
          o,
          i = this;
        i.contentLastPos &&
          (!1 === i.opts.momentum || i.dMs > 350
            ? ((t = i.contentLastPos.left), (e = i.contentLastPos.top))
            : ((t = i.contentLastPos.left + 500 * i.velocityX),
              (e = i.contentLastPos.top + 500 * i.velocityY)),
          (o = i.limitPosition(
            t,
            e,
            i.contentStartPos.width,
            i.contentStartPos.height
          )),
          (o.width = i.contentStartPos.width),
          (o.height = i.contentStartPos.height),
          n.fancybox.animate(i.$content, o, 366));
      }),
      (d.prototype.endZooming = function () {
        var t,
          e,
          o,
          i,
          a = this,
          s = a.instance.current,
          r = a.newWidth,
          c = a.newHeight;
        a.contentLastPos &&
          ((t = a.contentLastPos.left),
          (e = a.contentLastPos.top),
          (i = { top: e, left: t, width: r, height: c, scaleX: 1, scaleY: 1 }),
          n.fancybox.setTranslate(a.$content, i),
          r < a.canvasWidth && c < a.canvasHeight
            ? a.instance.scaleToFit(150)
            : r > s.width || c > s.height
            ? a.instance.scaleToActual(
                a.centerPointStartX,
                a.centerPointStartY,
                150
              )
            : ((o = a.limitPosition(t, e, r, c)),
              n.fancybox.animate(a.$content, o, 150)));
      }),
      (d.prototype.onTap = function (e) {
        var o,
          i = this,
          s = n(e.target),
          r = i.instance,
          c = r.current,
          l = (e && a(e)) || i.startPoints,
          d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0,
          u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0,
          f = function (t) {
            var o = c.opts[t];
            if ((n.isFunction(o) && (o = o.apply(r, [c, e])), o))
              switch (o) {
                case "close":
                  r.close(i.startEvent);
                  break;
                case "toggleControls":
                  r.toggleControls();
                  break;
                case "next":
                  r.next();
                  break;
                case "nextOrClose":
                  r.group.length > 1 ? r.next() : r.close(i.startEvent);
                  break;
                case "zoom":
                  "image" == c.type &&
                    (c.isLoaded || c.$ghost) &&
                    (r.canPan()
                      ? r.scaleToFit()
                      : r.isScaledDown()
                      ? r.scaleToActual(d, u)
                      : r.group.length < 2 && r.close(i.startEvent));
              }
          };
        if (
          (!e.originalEvent || 2 != e.originalEvent.button) &&
          (s.is("img") || !(d > s[0].clientWidth + s.offset().left))
        ) {
          if (
            s.is(
              ".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"
            )
          )
            o = "Outside";
          else if (s.is(".fancybox-slide")) o = "Slide";
          else {
            if (
              !r.current.$content ||
              !r.current.$content.find(s).addBack().filter(s).length
            )
              return;
            o = "Content";
          }
          if (i.tapped) {
            if (
              (clearTimeout(i.tapped),
              (i.tapped = null),
              Math.abs(d - i.tapX) > 50 || Math.abs(u - i.tapY) > 50)
            )
              return this;
            f("dblclick" + o);
          } else
            (i.tapX = d),
              (i.tapY = u),
              c.opts["dblclick" + o] &&
              c.opts["dblclick" + o] !== c.opts["click" + o]
                ? (i.tapped = setTimeout(function () {
                    (i.tapped = null), r.isAnimating || f("click" + o);
                  }, 500))
                : f("click" + o);
          return this;
        }
      }),
      n(e)
        .on("onActivate.fb", function (t, e) {
          e && !e.Guestures && (e.Guestures = new d(e));
        })
        .on("beforeClose.fb", function (t, e) {
          e && e.Guestures && e.Guestures.destroy();
        });
  })(window, document, jQuery),
  (function (t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
        slideShow:
          '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>',
      },
      slideShow: { autoStart: !1, speed: 3e3, progress: !0 },
    });
    var n = function (t) {
      (this.instance = t), this.init();
    };
    e.extend(n.prototype, {
      timer: null,
      isActive: !1,
      $button: null,
      init: function () {
        var t = this,
          n = t.instance,
          o = n.group[n.currIndex].opts.slideShow;
        (t.$button = n.$refs.toolbar
          .find("[data-fancybox-play]")
          .on("click", function () {
            t.toggle();
          })),
          n.group.length < 2 || !o
            ? t.$button.hide()
            : o.progress &&
              (t.$progress = e(
                '<div class="fancybox-progress"></div>'
              ).appendTo(n.$refs.inner));
      },
      set: function (t) {
        var n = this,
          o = n.instance,
          i = o.current;
        i && (!0 === t || i.opts.loop || o.currIndex < o.group.length - 1)
          ? n.isActive &&
            "video" !== i.contentType &&
            (n.$progress &&
              e.fancybox.animate(
                n.$progress.show(),
                { scaleX: 1 },
                i.opts.slideShow.speed
              ),
            (n.timer = setTimeout(function () {
              o.current.opts.loop || o.current.index != o.group.length - 1
                ? o.next()
                : o.jumpTo(0);
            }, i.opts.slideShow.speed)))
          : (n.stop(), (o.idleSecondsCounter = 0), o.showControls());
      },
      clear: function () {
        var t = this;
        clearTimeout(t.timer),
          (t.timer = null),
          t.$progress && t.$progress.removeAttr("style").hide();
      },
      start: function () {
        var t = this,
          e = t.instance.current;
        e &&
          (t.$button
            .attr(
              "title",
              (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP
            )
            .removeClass("fancybox-button--play")
            .addClass("fancybox-button--pause"),
          (t.isActive = !0),
          e.isComplete && t.set(!0),
          t.instance.trigger("onSlideShowChange", !0));
      },
      stop: function () {
        var t = this,
          e = t.instance.current;
        t.clear(),
          t.$button
            .attr(
              "title",
              (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START
            )
            .removeClass("fancybox-button--pause")
            .addClass("fancybox-button--play"),
          (t.isActive = !1),
          t.instance.trigger("onSlideShowChange", !1),
          t.$progress && t.$progress.removeAttr("style").hide();
      },
      toggle: function () {
        var t = this;
        t.isActive ? t.stop() : t.start();
      },
    }),
      e(t).on({
        "onInit.fb": function (t, e) {
          e && !e.SlideShow && (e.SlideShow = new n(e));
        },
        "beforeShow.fb": function (t, e, n, o) {
          var i = e && e.SlideShow;
          o
            ? i && n.opts.slideShow.autoStart && i.start()
            : i && i.isActive && i.clear();
        },
        "afterShow.fb": function (t, e, n) {
          var o = e && e.SlideShow;
          o && o.isActive && o.set();
        },
        "afterKeydown.fb": function (n, o, i, a, s) {
          var r = o && o.SlideShow;
          !r ||
            !i.opts.slideShow ||
            (80 !== s && 32 !== s) ||
            e(t.activeElement).is("button,a,input") ||
            (a.preventDefault(), r.toggle());
        },
        "beforeClose.fb onDeactivate.fb": function (t, e) {
          var n = e && e.SlideShow;
          n && n.stop();
        },
      }),
      e(t).on("visibilitychange", function () {
        var n = e.fancybox.getInstance(),
          o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set());
      });
  })(document, jQuery),
  (function (t, e) {
    "use strict";
    var n = (function () {
      for (
        var e = [
            [
              "requestFullscreen",
              "exitFullscreen",
              "fullscreenElement",
              "fullscreenEnabled",
              "fullscreenchange",
              "fullscreenerror",
            ],
            [
              "webkitRequestFullscreen",
              "webkitExitFullscreen",
              "webkitFullscreenElement",
              "webkitFullscreenEnabled",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "webkitRequestFullScreen",
              "webkitCancelFullScreen",
              "webkitCurrentFullScreenElement",
              "webkitCancelFullScreen",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "mozRequestFullScreen",
              "mozCancelFullScreen",
              "mozFullScreenElement",
              "mozFullScreenEnabled",
              "mozfullscreenchange",
              "mozfullscreenerror",
            ],
            [
              "msRequestFullscreen",
              "msExitFullscreen",
              "msFullscreenElement",
              "msFullscreenEnabled",
              "MSFullscreenChange",
              "MSFullscreenError",
            ],
          ],
          n = {},
          o = 0;
        o < e.length;
        o++
      ) {
        var i = e[o];
        if (i && i[1] in t) {
          for (var a = 0; a < i.length; a++) n[e[0][a]] = i[a];
          return n;
        }
      }
      return !1;
    })();
    if (n) {
      var o = {
        request: function (e) {
          (e = e || t.documentElement),
            e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT);
        },
        exit: function () {
          t[n.exitFullscreen]();
        },
        toggle: function (e) {
          (e = e || t.documentElement),
            this.isFullscreen() ? this.exit() : this.request(e);
        },
        isFullscreen: function () {
          return Boolean(t[n.fullscreenElement]);
        },
        enabled: function () {
          return Boolean(t[n.fullscreenEnabled]);
        },
      };
      e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
          fullScreen:
            '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>',
        },
        fullScreen: { autoStart: !1 },
      }),
        e(t).on(n.fullscreenchange, function () {
          var t = o.isFullscreen(),
            n = e.fancybox.getInstance();
          n &&
            (n.current &&
              "image" === n.current.type &&
              n.isAnimating &&
              ((n.isAnimating = !1),
              n.update(!0, !0, 0),
              n.isComplete || n.complete()),
            n.trigger("onFullscreenChange", t),
            n.$refs.container.toggleClass("fancybox-is-fullscreen", t),
            n.$refs.toolbar
              .find("[data-fancybox-fullscreen]")
              .toggleClass("fancybox-button--fsenter", !t)
              .toggleClass("fancybox-button--fsexit", t));
        });
    }
    e(t).on({
      "onInit.fb": function (t, e) {
        var i;
        if (!n)
          return void e.$refs.toolbar
            .find("[data-fancybox-fullscreen]")
            .remove();
        e && e.group[e.currIndex].opts.fullScreen
          ? ((i = e.$refs.container),
            i.on(
              "click.fb-fullscreen",
              "[data-fancybox-fullscreen]",
              function (t) {
                t.stopPropagation(), t.preventDefault(), o.toggle();
              }
            ),
            e.opts.fullScreen &&
              !0 === e.opts.fullScreen.autoStart &&
              o.request(),
            (e.FullScreen = o))
          : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
      },
      "afterKeydown.fb": function (t, e, n, o, i) {
        e &&
          e.FullScreen &&
          70 === i &&
          (o.preventDefault(), e.FullScreen.toggle());
      },
      "beforeClose.fb": function (t, e) {
        e &&
          e.FullScreen &&
          e.$refs.container.hasClass("fancybox-is-fullscreen") &&
          o.exit();
      },
    });
  })(document, jQuery),
  (function (t, e) {
    "use strict";
    var n = "fancybox-thumbs";
    e.fancybox.defaults = e.extend(
      !0,
      {
        btnTpl: {
          thumbs:
            '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>',
        },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: ".fancybox-container",
          axis: "y",
        },
      },
      e.fancybox.defaults
    );
    var o = function (t) {
      this.init(t);
    };
    e.extend(o.prototype, {
      $button: null,
      $grid: null,
      $list: null,
      isVisible: !1,
      isActive: !1,
      init: function (t) {
        var e = this,
          n = t.group,
          o = 0;
        (e.instance = t),
          (e.opts = n[t.currIndex].opts.thumbs),
          (t.Thumbs = e),
          (e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"));
        for (
          var i = 0, a = n.length;
          i < a && (n[i].thumb && o++, !(o > 1));
          i++
        );
        o > 1 && e.opts
          ? (e.$button.removeAttr("style").on("click", function () {
              e.toggle();
            }),
            (e.isActive = !0))
          : e.$button.hide();
      },
      create: function () {
        var t,
          o = this,
          i = o.instance,
          a = o.opts.parentEl,
          s = [];
        o.$grid ||
          ((o.$grid = e(
            '<div class="' + n + " " + n + "-" + o.opts.axis + '"></div>'
          ).appendTo(i.$refs.container.find(a).addBack().filter(a))),
          o.$grid.on("click", "a", function () {
            i.jumpTo(e(this).attr("data-index"));
          })),
          o.$list ||
            (o.$list = e('<div class="' + n + '__list">').appendTo(o.$grid)),
          e.each(i.group, function (e, n) {
            (t = n.thumb),
              t || "image" !== n.type || (t = n.src),
              s.push(
                '<a href="javascript:;" tabindex="0" data-index="' +
                  e +
                  '"' +
                  (t && t.length
                    ? ' style="background-image:url(' + t + ')"'
                    : 'class="fancybox-thumbs-missing"') +
                  "></a>"
              );
          }),
          (o.$list[0].innerHTML = s.join("")),
          "x" === o.opts.axis &&
            o.$list.width(
              parseInt(o.$grid.css("padding-right"), 10) +
                i.group.length * o.$list.children().eq(0).outerWidth(!0)
            );
      },
      focus: function (t) {
        var e,
          n,
          o = this,
          i = o.$list,
          a = o.$grid;
        o.instance.current &&
          ((e = i
            .children()
            .removeClass("fancybox-thumbs-active")
            .filter('[data-index="' + o.instance.current.index + '"]')
            .addClass("fancybox-thumbs-active")),
          (n = e.position()),
          "y" === o.opts.axis &&
          (n.top < 0 || n.top > i.height() - e.outerHeight())
            ? i.stop().animate({ scrollTop: i.scrollTop() + n.top }, t)
            : "x" === o.opts.axis &&
              (n.left < a.scrollLeft() ||
                n.left > a.scrollLeft() + (a.width() - e.outerWidth())) &&
              i.parent().stop().animate({ scrollLeft: n.left }, t));
      },
      update: function () {
        var t = this;
        t.instance.$refs.container.toggleClass(
          "fancybox-show-thumbs",
          this.isVisible
        ),
          t.isVisible
            ? (t.$grid || t.create(),
              t.instance.trigger("onThumbsShow"),
              t.focus(0))
            : t.$grid && t.instance.trigger("onThumbsHide"),
          t.instance.update();
      },
      hide: function () {
        (this.isVisible = !1), this.update();
      },
      show: function () {
        (this.isVisible = !0), this.update();
      },
      toggle: function () {
        (this.isVisible = !this.isVisible), this.update();
      },
    }),
      e(t).on({
        "onInit.fb": function (t, e) {
          var n;
          e &&
            !e.Thumbs &&
            ((n = new o(e)), n.isActive && !0 === n.opts.autoStart && n.show());
        },
        "beforeShow.fb": function (t, e, n, o) {
          var i = e && e.Thumbs;
          i && i.isVisible && i.focus(o ? 0 : 250);
        },
        "afterKeydown.fb": function (t, e, n, o, i) {
          var a = e && e.Thumbs;
          a && a.isActive && 71 === i && (o.preventDefault(), a.toggle());
        },
        "beforeClose.fb": function (t, e) {
          var n = e && e.Thumbs;
          n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide();
        },
      });
  })(document, jQuery),
  (function (t, e) {
    "use strict";
    function n(t) {
      var e = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;",
      };
      return String(t).replace(/[&<>"'`=\/]/g, function (t) {
        return e[t];
      });
    }
    e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
        share:
          '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>',
      },
      share: {
        url: function (t, e) {
          return (
            (!t.currentHash &&
              "inline" !== e.type &&
              "html" !== e.type &&
              (e.origSrc || e.src)) ||
            window.location
          );
        },
        tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>',
      },
    }),
      e(t).on("click", "[data-fancybox-share]", function () {
        var t,
          o,
          i = e.fancybox.getInstance(),
          a = i.current || null;
        a &&
          ("function" === e.type(a.opts.share.url) &&
            (t = a.opts.share.url.apply(a, [i, a])),
          (o = a.opts.share.tpl
            .replace(
              /\{\{media\}\}/g,
              "image" === a.type ? encodeURIComponent(a.src) : ""
            )
            .replace(/\{\{url\}\}/g, encodeURIComponent(t))
            .replace(/\{\{url_raw\}\}/g, n(t))
            .replace(
              /\{\{descr\}\}/g,
              i.$caption ? encodeURIComponent(i.$caption.text()) : ""
            )),
          e.fancybox.open({
            src: i.translate(i, o),
            type: "html",
            opts: {
              touch: !1,
              animationEffect: !1,
              afterLoad: function (t, e) {
                i.$refs.container.one("beforeClose.fb", function () {
                  t.close(null, 0);
                }),
                  e.$content.find(".fancybox-share__button").click(function () {
                    return (
                      window.open(this.href, "Share", "width=550, height=450"),
                      !1
                    );
                  });
              },
              mobile: { autoFocus: !1 },
            },
          }));
      });
  })(document, jQuery),
  (function (t, e, n) {
    "use strict";
    function o() {
      var e = t.location.hash.substr(1),
        n = e.split("-"),
        o =
          n.length > 1 && /^\+?\d+$/.test(n[n.length - 1])
            ? parseInt(n.pop(-1), 10) || 1
            : 1,
        i = n.join("-");
      return { hash: e, index: o < 1 ? 1 : o, gallery: i };
    }
    function i(t) {
      "" !== t.gallery &&
        n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']")
          .eq(t.index - 1)
          .focus()
          .trigger("click.fb-start");
    }
    function a(t) {
      var e, n;
      return (
        !!t &&
        ((e = t.current ? t.current.opts : t.opts),
        "" !==
          (n =
            e.hash ||
            (e.$orig
              ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger")
              : "")) && n)
      );
    }
    n.escapeSelector ||
      (n.escapeSelector = function (t) {
        return (t + "").replace(
          /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
          function (t, e) {
            return e
              ? "\0" === t
                ? "�"
                : t.slice(0, -1) +
                  "\\" +
                  t.charCodeAt(t.length - 1).toString(16) +
                  " "
              : "\\" + t;
          }
        );
      }),
      n(function () {
        !1 !== n.fancybox.defaults.hash &&
          (n(e).on({
            "onInit.fb": function (t, e) {
              var n, i;
              !1 !== e.group[e.currIndex].opts.hash &&
                ((n = o()),
                (i = a(e)) &&
                  n.gallery &&
                  i == n.gallery &&
                  (e.currIndex = n.index - 1));
            },
            "beforeShow.fb": function (n, o, i, s) {
              var r;
              i &&
                !1 !== i.opts.hash &&
                (r = a(o)) &&
                ((o.currentHash =
                  r + (o.group.length > 1 ? "-" + (i.index + 1) : "")),
                t.location.hash !== "#" + o.currentHash &&
                  (s && !o.origHash && (o.origHash = t.location.hash),
                  o.hashTimer && clearTimeout(o.hashTimer),
                  (o.hashTimer = setTimeout(function () {
                    "replaceState" in t.history
                      ? (t.history[s ? "pushState" : "replaceState"](
                          {},
                          e.title,
                          t.location.pathname +
                            t.location.search +
                            "#" +
                            o.currentHash
                        ),
                        s && (o.hasCreatedHistory = !0))
                      : (t.location.hash = o.currentHash),
                      (o.hashTimer = null);
                  }, 300))));
            },
            "beforeClose.fb": function (n, o, i) {
              i &&
                !1 !== i.opts.hash &&
                (clearTimeout(o.hashTimer),
                o.currentHash && o.hasCreatedHistory
                  ? t.history.back()
                  : o.currentHash &&
                    ("replaceState" in t.history
                      ? t.history.replaceState(
                          {},
                          e.title,
                          t.location.pathname +
                            t.location.search +
                            (o.origHash || "")
                        )
                      : (t.location.hash = o.origHash)),
                (o.currentHash = null));
            },
          }),
          n(t).on("hashchange.fb", function () {
            var t = o(),
              e = null;
            n.each(n(".fancybox-container").get().reverse(), function (t, o) {
              var i = n(o).data("FancyBox");
              if (i && i.currentHash) return (e = i), !1;
            }),
              e
                ? e.currentHash === t.gallery + "-" + t.index ||
                  (1 === t.index && e.currentHash == t.gallery) ||
                  ((e.currentHash = null), e.close())
                : "" !== t.gallery && i(t);
          }),
          setTimeout(function () {
            n.fancybox.getInstance() || i(o());
          }, 50));
      });
  })(window, document, jQuery),
  (function (t, e) {
    "use strict";
    var n = new Date().getTime();
    e(t).on({
      "onInit.fb": function (t, e, o) {
        e.$refs.stage.on(
          "mousewheel DOMMouseScroll wheel MozMousePixelScroll",
          function (t) {
            var o = e.current,
              i = new Date().getTime();
            e.group.length < 2 ||
              !1 === o.opts.wheel ||
              ("auto" === o.opts.wheel && "image" !== o.type) ||
              (t.preventDefault(),
              t.stopPropagation(),
              o.$slide.hasClass("fancybox-animated") ||
                ((t = t.originalEvent || t),
                i - n < 250 ||
                  ((n = i),
                  e[
                    (-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0
                      ? "next"
                      : "previous"
                  ]())));
          }
        );
      },
    });
  })(document, jQuery);
/*
== malihu jquery custom scrollbar plugin == 
Version: 3.1.5 
Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller 
Author: malihu
Author URI: http://manos.malihu.gr
License: MIT License (MIT)
*/

/*
Copyright Manos Malihutsakis (email: manos@malihu.gr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
The code below is fairly long, fully commented and should be normally used in development. 
For production, use either the minified jquery.mCustomScrollbar.min.js script or 
the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin 
and dependencies (minified). 
*/

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = factory;
  } else {
    factory(jQuery, window, document);
  }
})(function ($) {
  (function (init) {
    var _rjs = typeof define === "function" && define.amd /* RequireJS */,
      _njs = typeof module !== "undefined" && module.exports /* NodeJS */,
      _dlp =
        "https:" == document.location.protocol
          ? "https:"
          : "http:" /* location protocol */,
      _url =
        "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
    if (!_rjs) {
      if (_njs) {
        require("jquery-mousewheel")($);
      } else {
        /* load jquery-mousewheel plugin (via CDN) if it's not present or not loaded via RequireJS 
			(works when mCustomScrollbar fn is called on window load) */
        $.event.special.mousewheel ||
          $("head").append(
            decodeURI(
              "%3Cscript src=" + _dlp + "//" + _url + "%3E%3C/script%3E"
            )
          );
      }
    }
    init();
  })(function () {
    /* 
	----------------------------------------
	PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S) 
	----------------------------------------
	*/

    var pluginNS = "mCustomScrollbar",
      pluginPfx = "mCS",
      defaultSelector = ".mCustomScrollbar",
      /* 
	----------------------------------------
	DEFAULT OPTIONS 
	----------------------------------------
	*/

      defaults = {
        /*
			set element/content width/height programmatically 
			values: boolean, pixels, percentage 
				option						default
				-------------------------------------
				setWidth					false
				setHeight					false
			*/
        /*
			set the initial css top property of content  
			values: string (e.g. "-100px", "10%" etc.)
			*/
        setTop: 0,
        /*
			set the initial css left property of content  
			values: string (e.g. "-100px", "10%" etc.)
			*/
        setLeft: 0,
        /* 
			scrollbar axis (vertical and/or horizontal scrollbars) 
			values (string): "y", "x", "yx"
			*/
        axis: "y",
        /*
			position of scrollbar relative to content  
			values (string): "inside", "outside" ("outside" requires elements with position:relative)
			*/
        scrollbarPosition: "inside",
        /*
			scrolling inertia
			values: integer (milliseconds)
			*/
        scrollInertia: 950,
        /* 
			auto-adjust scrollbar dragger length
			values: boolean
			*/
        autoDraggerLength: true,
        /*
			auto-hide scrollbar when idle 
			values: boolean
				option						default
				-------------------------------------
				autoHideScrollbar			false
			*/
        /*
			auto-expands scrollbar on mouse-over and dragging
			values: boolean
				option						default
				-------------------------------------
				autoExpandScrollbar			false
			*/
        /*
			always show scrollbar, even when there's nothing to scroll 
			values: integer (0=disable, 1=always show dragger rail and buttons, 2=always show dragger rail, dragger and buttons), boolean
			*/
        alwaysShowScrollbar: 0,
        /*
			scrolling always snaps to a multiple of this number in pixels
			values: integer, array ([y,x])
				option						default
				-------------------------------------
				snapAmount					null
			*/
        /*
			when snapping, snap with this number in pixels as an offset 
			values: integer
			*/
        snapOffset: 0,
        /* 
			mouse-wheel scrolling
			*/
        mouseWheel: {
          /* 
				enable mouse-wheel scrolling
				values: boolean
				*/
          enable: true,
          /* 
				scrolling amount in pixels
				values: "auto", integer 
				*/
          scrollAmount: "auto",
          /* 
				mouse-wheel scrolling axis 
				the default scrolling direction when both vertical and horizontal scrollbars are present 
				values (string): "y", "x" 
				*/
          axis: "y",
          /* 
				prevent the default behaviour which automatically scrolls the parent element(s) when end of scrolling is reached 
				values: boolean
					option						default
					-------------------------------------
					preventDefault				null
				*/
          /*
				the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.  
				values: "auto", integer 
				"auto" uses the default OS/browser value 
				*/
          deltaFactor: "auto",
          /*
				normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration) 
				values: boolean
					option						default
					-------------------------------------
					normalizeDelta				null
				*/
          /*
				invert mouse-wheel scrolling direction 
				values: boolean
					option						default
					-------------------------------------
					invert						null
				*/
          /*
				the tags that disable mouse-wheel when cursor is over them
				*/
          disableOver: ["select", "option", "keygen", "datalist", "textarea"],
        },
        /* 
			scrollbar buttons
			*/
        scrollButtons: {
          /*
				enable scrollbar buttons
				values: boolean
					option						default
					-------------------------------------
					enable						null
				*/
          /*
				scrollbar buttons scrolling type 
				values (string): "stepless", "stepped"
				*/
          scrollType: "stepless",
          /*
				scrolling amount in pixels
				values: "auto", integer 
				*/
          scrollAmount: "auto",
          /*
				tabindex of the scrollbar buttons
				values: false, integer
					option						default
					-------------------------------------
					tabindex					null
				*/
        },
        /* 
			keyboard scrolling
			*/
        keyboard: {
          /*
				enable scrolling via keyboard
				values: boolean
				*/
          enable: true,
          /*
				keyboard scrolling type 
				values (string): "stepless", "stepped"
				*/
          scrollType: "stepless",
          /*
				scrolling amount in pixels
				values: "auto", integer 
				*/
          scrollAmount: "auto",
        },
        /*
			enable content touch-swipe scrolling 
			values: boolean, integer, string (number)
			integer values define the axis-specific minimum amount required for scrolling momentum
			*/
        contentTouchScroll: 25,
        /*
			enable/disable document (default) touch-swipe scrolling 
			*/
        documentTouchScroll: true,
        /*
			advanced option parameters
			*/
        advanced: {
          /*
				auto-expand content horizontally (for "x" or "yx" axis) 
				values: boolean, integer (the value 2 forces the non scrollHeight/scrollWidth method, the value 3 forces the scrollHeight/scrollWidth method)
					option						default
					-------------------------------------
					autoExpandHorizontalScroll	null
				*/
          /*
				auto-scroll to elements with focus
				*/
          autoScrollOnFocus:
            "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
          /*
				auto-update scrollbars on content, element or viewport resize 
				should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc. 
				values: boolean
				*/
          updateOnContentResize: true,
          /*
				auto-update scrollbars each time each image inside the element is fully loaded 
				values: "auto", boolean
				*/
          updateOnImageLoad: "auto",
          /*
				auto-update scrollbars based on the amount and size changes of specific selectors 
				useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size 
				values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed) 
				a value of true (boolean) will auto-update scrollbars each time any element is changed
					option						default
					-------------------------------------
					updateOnSelectorChange		null
				*/
          /*
				extra selectors that'll allow scrollbar dragging upon mousemove/up, pointermove/up, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					extraDraggableSelectors		null
				*/
          /*
				extra selectors that'll release scrollbar dragging upon mouseup, pointerup, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					releaseDraggableSelectors	null
				*/
          /*
				auto-update timeout 
				values: integer (milliseconds)
				*/
          autoUpdateTimeout: 60,
        },
        /* 
			scrollbar theme 
			values: string (see CSS/plugin URI for a list of ready-to-use themes)
			*/
        theme: "light",
        /*
			user defined callback functions
			*/
        callbacks: {
          /*
				Available callbacks: 
					callback					default
					-------------------------------------
					onCreate					null
					onInit						null
					onScrollStart				null
					onScroll					null
					onTotalScroll				null
					onTotalScrollBack			null
					whileScrolling				null
					onOverflowY					null
					onOverflowX					null
					onOverflowYNone				null
					onOverflowXNone				null
					onImageLoad					null
					onSelectorChange			null
					onBeforeUpdate				null
					onUpdate					null
				*/
          onTotalScrollOffset: 0,
          onTotalScrollBackOffset: 0,
          alwaysTriggerOffsets: true,
        },
        /*
			add scrollbar(s) on all elements matching the current selector, now and in the future 
			values: boolean, string 
			string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
			liveSelector values: string (selector)
				option						default
				-------------------------------------
				live						false
				liveSelector				null
			*/
      },
      /* 
	----------------------------------------
	VARS, CONSTANTS 
	----------------------------------------
	*/

      totalInstances = 0 /* plugin instances amount */,
      liveTimers = {} /* live option timers */,
      oldIE =
        window.attachEvent && !window.addEventListener
          ? 1
          : 0 /* detect IE < 9 */,
      touchActive = false,
      touchable /* global touch vars (for touch and pointer events) */,
      /* general plugin classes */
      classes = [
        "mCSB_dragger_onDrag",
        "mCSB_scrollTools_onDrag",
        "mCS_img_loaded",
        "mCS_disabled",
        "mCS_destroyed",
        "mCS_no_scrollbar",
        "mCS-autoHide",
        "mCS-dir-rtl",
        "mCS_no_scrollbar_y",
        "mCS_no_scrollbar_x",
        "mCS_y_hidden",
        "mCS_x_hidden",
        "mCSB_draggerContainer",
        "mCSB_buttonUp",
        "mCSB_buttonDown",
        "mCSB_buttonLeft",
        "mCSB_buttonRight",
      ],
      /* 
	----------------------------------------
	METHODS 
	----------------------------------------
	*/

      methods = {
        /* 
			plugin initialization method 
			creates the scrollbar(s), plugin data object and options
			----------------------------------------
			*/

        init: function (options) {
          var options = $.extend(true, {}, defaults, options),
            selector = _selector.call(this); /* validate selector */

          /* 
				if live option is enabled, monitor for elements matching the current selector and 
				apply scrollbar(s) when found (now and in the future) 
				*/
          if (options.live) {
            var liveSelector =
                options.liveSelector ||
                this.selector ||
                defaultSelector /* live selector(s) */,
              $liveSelector =
                $(liveSelector); /* live selector(s) as jquery object */
            if (options.live === "off") {
              /* 
						disable live if requested 
						usage: $(selector).mCustomScrollbar({live:"off"}); 
						*/
              removeLiveTimers(liveSelector);
              return;
            }
            liveTimers[liveSelector] = setTimeout(function () {
              /* call mCustomScrollbar fn on live selector(s) every half-second */
              $liveSelector.mCustomScrollbar(options);
              if (options.live === "once" && $liveSelector.length) {
                /* disable live after first invocation */
                removeLiveTimers(liveSelector);
              }
            }, 500);
          } else {
            removeLiveTimers(liveSelector);
          }

          /* options backward compatibility (for versions < 3.0.0) and normalization */
          options.setWidth = options.set_width
            ? options.set_width
            : options.setWidth;
          options.setHeight = options.set_height
            ? options.set_height
            : options.setHeight;
          options.axis = options.horizontalScroll
            ? "x"
            : _findAxis(options.axis);
          options.scrollInertia =
            options.scrollInertia > 0 && options.scrollInertia < 17
              ? 17
              : options.scrollInertia;
          if (
            typeof options.mouseWheel !== "object" &&
            options.mouseWheel == true
          ) {
            /* old school mouseWheel option (non-object) */
            options.mouseWheel = {
              enable: true,
              scrollAmount: "auto",
              axis: "y",
              preventDefault: false,
              deltaFactor: "auto",
              normalizeDelta: false,
              invert: false,
            };
          }
          options.mouseWheel.scrollAmount = !options.mouseWheelPixels
            ? options.mouseWheel.scrollAmount
            : options.mouseWheelPixels;
          options.mouseWheel.normalizeDelta = !options.advanced
            .normalizeMouseWheelDelta
            ? options.mouseWheel.normalizeDelta
            : options.advanced.normalizeMouseWheelDelta;
          options.scrollButtons.scrollType = _findScrollButtonsType(
            options.scrollButtons.scrollType
          );

          _theme(options); /* theme-specific options */

          /* plugin constructor */
          return $(selector).each(function () {
            var $this = $(this);

            if (!$this.data(pluginPfx)) {
              /* prevent multiple instantiations */

              /* store options and create objects in jquery data */
              $this.data(pluginPfx, {
                idx: ++totalInstances /* instance index */,
                opt: options /* options */,
                scrollRatio: {
                  y: null,
                  x: null,
                } /* scrollbar to content ratio */,
                overflowed: null /* overflowed axis */,
                contentReset: {
                  y: null,
                  x: null,
                } /* object to check when content resets */,
                bindEvents: false /* object to check if events are bound */,
                tweenRunning: false /* object to check if tween is running */,
                sequential: {} /* sequential scrolling object */,
                langDir:
                  $this.css(
                    "direction"
                  ) /* detect/store direction (ltr or rtl) */,
                cbOffsets:
                  null /* object to check whether callback offsets always trigger */,
                /* 
							object to check how scrolling events where last triggered 
							"internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method) 
							usage: object.data("mCS").trigger
							*/
                trigger: null,
                /* 
							object to check for changes in elements in order to call the update method automatically 
							*/
                poll: {
                  size: { o: 0, n: 0 },
                  img: { o: 0, n: 0 },
                  change: { o: 0, n: 0 },
                },
              });

              var d = $this.data(pluginPfx),
                o = d.opt,
                /* HTML data attributes */
                htmlDataAxis = $this.data("mcs-axis"),
                htmlDataSbPos = $this.data("mcs-scrollbar-position"),
                htmlDataTheme = $this.data("mcs-theme");

              if (htmlDataAxis) {
                o.axis = htmlDataAxis;
              } /* usage example: data-mcs-axis="y" */
              if (htmlDataSbPos) {
                o.scrollbarPosition = htmlDataSbPos;
              } /* usage example: data-mcs-scrollbar-position="outside" */
              if (htmlDataTheme) {
                /* usage example: data-mcs-theme="minimal" */
                o.theme = htmlDataTheme;
                _theme(o); /* theme-specific options */
              }

              _pluginMarkup.call(this); /* add plugin markup */

              if (
                d &&
                o.callbacks.onCreate &&
                typeof o.callbacks.onCreate === "function"
              ) {
                o.callbacks.onCreate.call(this);
              } /* callbacks: onCreate */

              $(
                "#mCSB_" + d.idx + "_container img:not(." + classes[2] + ")"
              ).addClass(classes[2]); /* flag loaded images */

              methods.update.call(null, $this); /* call the update method */
            }
          });
        },
        /* ---------------------------------------- */

        /* 
			plugin update method 
			updates content and scrollbar(s) values, events and status 
			----------------------------------------
			usage: $(selector).mCustomScrollbar("update");
			*/

        update: function (el, cb) {
          var selector = el || _selector.call(this); /* validate selector */

          return $(selector).each(function () {
            var $this = $(this);

            if ($this.data(pluginPfx)) {
              /* check if plugin has initialized */

              var d = $this.data(pluginPfx),
                o = d.opt,
                mCSB_container = $("#mCSB_" + d.idx + "_container"),
                mCustomScrollBox = $("#mCSB_" + d.idx),
                mCSB_dragger = [
                  $("#mCSB_" + d.idx + "_dragger_vertical"),
                  $("#mCSB_" + d.idx + "_dragger_horizontal"),
                ];

              if (!mCSB_container.length) {
                return;
              }

              if (d.tweenRunning) {
                _stop($this);
              } /* stop any running tweens while updating */

              if (
                cb &&
                d &&
                o.callbacks.onBeforeUpdate &&
                typeof o.callbacks.onBeforeUpdate === "function"
              ) {
                o.callbacks.onBeforeUpdate.call(this);
              } /* callbacks: onBeforeUpdate */

              /* if element was disabled or destroyed, remove class(es) */
              if ($this.hasClass(classes[3])) {
                $this.removeClass(classes[3]);
              }
              if ($this.hasClass(classes[4])) {
                $this.removeClass(classes[4]);
              }

              /* css flexbox fix, detect/set max-height */
              mCustomScrollBox.css("max-height", "none");
              if (mCustomScrollBox.height() !== $this.height()) {
                mCustomScrollBox.css("max-height", $this.height());
              }

              _expandContentHorizontally.call(
                this
              ); /* expand content horizontally */

              if (o.axis !== "y" && !o.advanced.autoExpandHorizontalScroll) {
                mCSB_container.css("width", _contentWidth(mCSB_container));
              }

              d.overflowed =
                _overflowed.call(this); /* determine if scrolling is required */

              _scrollbarVisibility.call(this); /* show/hide scrollbar(s) */

              /* auto-adjust scrollbar dragger length analogous to content */
              if (o.autoDraggerLength) {
                _setDraggerLength.call(this);
              }

              _scrollRatio.call(
                this
              ); /* calculate and store scrollbar to content ratio */

              _bindEvents.call(this); /* bind scrollbar events */

              /* reset scrolling position and/or events */
              var to = [
                Math.abs(mCSB_container[0].offsetTop),
                Math.abs(mCSB_container[0].offsetLeft),
              ];
              if (o.axis !== "x") {
                /* y/yx axis */
                if (!d.overflowed[0]) {
                  /* y scrolling is not required */
                  _resetContentPosition.call(this); /* reset content position */
                  if (o.axis === "y") {
                    _unbindEvents.call(this);
                  } else if (o.axis === "yx" && d.overflowed[1]) {
                    _scrollTo($this, to[1].toString(), {
                      dir: "x",
                      dur: 0,
                      overwrite: "none",
                    });
                  }
                } else if (
                  mCSB_dragger[0].height() > mCSB_dragger[0].parent().height()
                ) {
                  _resetContentPosition.call(this); /* reset content position */
                } else {
                  /* y scrolling is required */
                  _scrollTo($this, to[0].toString(), {
                    dir: "y",
                    dur: 0,
                    overwrite: "none",
                  });
                  d.contentReset.y = null;
                }
              }
              if (o.axis !== "y") {
                /* x/yx axis */
                if (!d.overflowed[1]) {
                  /* x scrolling is not required */
                  _resetContentPosition.call(this); /* reset content position */
                  if (o.axis === "x") {
                    _unbindEvents.call(this);
                  } else if (o.axis === "yx" && d.overflowed[0]) {
                    _scrollTo($this, to[0].toString(), {
                      dir: "y",
                      dur: 0,
                      overwrite: "none",
                    });
                  }
                } else if (
                  mCSB_dragger[1].width() > mCSB_dragger[1].parent().width()
                ) {
                  _resetContentPosition.call(this); /* reset content position */
                } else {
                  /* x scrolling is required */
                  _scrollTo($this, to[1].toString(), {
                    dir: "x",
                    dur: 0,
                    overwrite: "none",
                  });
                  d.contentReset.x = null;
                }
              }

              /* callbacks: onImageLoad, onSelectorChange, onUpdate */
              if (cb && d) {
                if (
                  cb === 2 &&
                  o.callbacks.onImageLoad &&
                  typeof o.callbacks.onImageLoad === "function"
                ) {
                  o.callbacks.onImageLoad.call(this);
                } else if (
                  cb === 3 &&
                  o.callbacks.onSelectorChange &&
                  typeof o.callbacks.onSelectorChange === "function"
                ) {
                  o.callbacks.onSelectorChange.call(this);
                } else if (
                  o.callbacks.onUpdate &&
                  typeof o.callbacks.onUpdate === "function"
                ) {
                  o.callbacks.onUpdate.call(this);
                }
              }

              _autoUpdate.call(
                this
              ); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */
            }
          });
        },
        /* ---------------------------------------- */

        /* 
			plugin scrollTo method 
			triggers a scrolling event to a specific value
			----------------------------------------
			usage: $(selector).mCustomScrollbar("scrollTo",value,options);
			*/

        scrollTo: function (val, options) {
          /* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
          if (typeof val == "undefined" || val == null) {
            return;
          }

          var selector = _selector.call(this); /* validate selector */

          return $(selector).each(function () {
            var $this = $(this);

            if ($this.data(pluginPfx)) {
              /* check if plugin has initialized */

              var d = $this.data(pluginPfx),
                o = d.opt,
                /* method default options */
                methodDefaults = {
                  trigger:
                    "external" /* method is by default triggered externally (e.g. from other scripts) */,
                  scrollInertia:
                    o.scrollInertia /* scrolling inertia (animation duration) */,
                  scrollEasing: "mcsEaseInOut" /* animation easing */,
                  moveDragger: false /* move dragger instead of content */,
                  timeout: 60 /* scroll-to delay */,
                  callbacks: true /* enable/disable callbacks */,
                  onStart: true,
                  onUpdate: true,
                  onComplete: true,
                },
                methodOptions = $.extend(true, {}, methodDefaults, options),
                to = _arr.call(this, val),
                dur =
                  methodOptions.scrollInertia > 0 &&
                  methodOptions.scrollInertia < 17
                    ? 17
                    : methodOptions.scrollInertia;

              /* translate yx values to actual scroll-to positions */
              to[0] = _to.call(this, to[0], "y");
              to[1] = _to.call(this, to[1], "x");

              /* 
						check if scroll-to value moves the dragger instead of content. 
						Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.) 
						*/
              if (methodOptions.moveDragger) {
                to[0] *= d.scrollRatio.y;
                to[1] *= d.scrollRatio.x;
              }

              methodOptions.dur = _isTabHidden() ? 0 : dur; //skip animations if browser tab is hidden

              setTimeout(function () {
                /* do the scrolling */
                if (
                  to[0] !== null &&
                  typeof to[0] !== "undefined" &&
                  o.axis !== "x" &&
                  d.overflowed[0]
                ) {
                  /* scroll y */
                  methodOptions.dir = "y";
                  methodOptions.overwrite = "all";
                  _scrollTo($this, to[0].toString(), methodOptions);
                }
                if (
                  to[1] !== null &&
                  typeof to[1] !== "undefined" &&
                  o.axis !== "y" &&
                  d.overflowed[1]
                ) {
                  /* scroll x */
                  methodOptions.dir = "x";
                  methodOptions.overwrite = "none";
                  _scrollTo($this, to[1].toString(), methodOptions);
                }
              }, methodOptions.timeout);
            }
          });
        },
        /* ---------------------------------------- */

        /*
			plugin stop method 
			stops scrolling animation
			----------------------------------------
			usage: $(selector).mCustomScrollbar("stop");
			*/
        stop: function () {
          var selector = _selector.call(this); /* validate selector */

          return $(selector).each(function () {
            var $this = $(this);

            if ($this.data(pluginPfx)) {
              /* check if plugin has initialized */

              _stop($this);
            }
          });
        },
        /* ---------------------------------------- */

        /*
			plugin disable method 
			temporarily disables the scrollbar(s) 
			----------------------------------------
			usage: $(selector).mCustomScrollbar("disable",reset); 
			reset (boolean): resets content position to 0 
			*/
        disable: function (r) {
          var selector = _selector.call(this); /* validate selector */

          return $(selector).each(function () {
            var $this = $(this);

            if ($this.data(pluginPfx)) {
              /* check if plugin has initialized */

              var d = $this.data(pluginPfx);

              _autoUpdate.call(this, "remove"); /* remove automatic updating */

              _unbindEvents.call(this); /* unbind events */

              if (r) {
                _resetContentPosition.call(this);
              } /* reset content position */

              _scrollbarVisibility.call(
                this,
                true
              ); /* show/hide scrollbar(s) */

              $this.addClass(classes[3]); /* add disable class */
            }
          });
        },
        /* ---------------------------------------- */

        /*
			plugin destroy method 
			completely removes the scrollbar(s) and returns the element to its original state
			----------------------------------------
			usage: $(selector).mCustomScrollbar("destroy"); 
			*/
        destroy: function () {
          var selector = _selector.call(this); /* validate selector */

          return $(selector).each(function () {
            var $this = $(this);

            if ($this.data(pluginPfx)) {
              /* check if plugin has initialized */

              var d = $this.data(pluginPfx),
                o = d.opt,
                mCustomScrollBox = $("#mCSB_" + d.idx),
                mCSB_container = $("#mCSB_" + d.idx + "_container"),
                scrollbar = $(".mCSB_" + d.idx + "_scrollbar");

              if (o.live) {
                removeLiveTimers(o.liveSelector || $(selector).selector);
              } /* remove live timers */

              _autoUpdate.call(this, "remove"); /* remove automatic updating */

              _unbindEvents.call(this); /* unbind events */

              _resetContentPosition.call(this); /* reset content position */

              $this.removeData(pluginPfx); /* remove plugin data object */

              _delete(this, "mcs"); /* delete callbacks object */

              /* remove plugin markup */
              scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
              mCSB_container
                .find("img." + classes[2])
                .removeClass(classes[2]); /* remove loaded images flag */
              mCustomScrollBox.replaceWith(
                mCSB_container.contents()
              ); /* replace plugin's inner wrapper with the original content */
              /* remove plugin classes from the element and add destroy class */
              $this
                .removeClass(
                  pluginNS +
                    " _" +
                    pluginPfx +
                    "_" +
                    d.idx +
                    " " +
                    classes[6] +
                    " " +
                    classes[7] +
                    " " +
                    classes[5] +
                    " " +
                    classes[3]
                )
                .addClass(classes[4]);
            }
          });
        },
        /* ---------------------------------------- */
      },
      /* 
	----------------------------------------
	FUNCTIONS
	----------------------------------------
	*/

      /* validates selector (if selector is invalid or undefined uses the default one) */
      _selector = function () {
        return typeof $(this) !== "object" || $(this).length < 1
          ? defaultSelector
          : this;
      },
      /* -------------------- */

      /* changes options according to theme */
      _theme = function (obj) {
        var fixedSizeScrollbarThemes = [
            "rounded",
            "rounded-dark",
            "rounded-dots",
            "rounded-dots-dark",
          ],
          nonExpandedScrollbarThemes = [
            "rounded-dots",
            "rounded-dots-dark",
            "3d",
            "3d-dark",
            "3d-thick",
            "3d-thick-dark",
            "inset",
            "inset-dark",
            "inset-2",
            "inset-2-dark",
            "inset-3",
            "inset-3-dark",
          ],
          disabledScrollButtonsThemes = ["minimal", "minimal-dark"],
          enabledAutoHideScrollbarThemes = ["minimal", "minimal-dark"],
          scrollbarPositionOutsideThemes = ["minimal", "minimal-dark"];
        obj.autoDraggerLength =
          $.inArray(obj.theme, fixedSizeScrollbarThemes) > -1
            ? false
            : obj.autoDraggerLength;
        obj.autoExpandScrollbar =
          $.inArray(obj.theme, nonExpandedScrollbarThemes) > -1
            ? false
            : obj.autoExpandScrollbar;
        obj.scrollButtons.enable =
          $.inArray(obj.theme, disabledScrollButtonsThemes) > -1
            ? false
            : obj.scrollButtons.enable;
        obj.autoHideScrollbar =
          $.inArray(obj.theme, enabledAutoHideScrollbarThemes) > -1
            ? true
            : obj.autoHideScrollbar;
        obj.scrollbarPosition =
          $.inArray(obj.theme, scrollbarPositionOutsideThemes) > -1
            ? "outside"
            : obj.scrollbarPosition;
      },
      /* -------------------- */

      /* live option timers removal */
      removeLiveTimers = function (selector) {
        if (liveTimers[selector]) {
          clearTimeout(liveTimers[selector]);
          _delete(liveTimers, selector);
        }
      },
      /* -------------------- */

      /* normalizes axis option to valid values: "y", "x", "yx" */
      _findAxis = function (val) {
        return val === "yx" || val === "xy" || val === "auto"
          ? "yx"
          : val === "x" || val === "horizontal"
          ? "x"
          : "y";
      },
      /* -------------------- */

      /* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
      _findScrollButtonsType = function (val) {
        return val === "stepped" ||
          val === "pixels" ||
          val === "step" ||
          val === "click"
          ? "stepped"
          : "stepless";
      },
      /* -------------------- */

      /* generates plugin markup */
      _pluginMarkup = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          expandClass = o.autoExpandScrollbar
            ? " " + classes[1] + "_expand"
            : "",
          scrollbar = [
            "<div id='mCSB_" +
              d.idx +
              "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" +
              d.idx +
              "_scrollbar mCS-" +
              o.theme +
              " mCSB_scrollTools_vertical" +
              expandClass +
              "'><div class='" +
              classes[12] +
              "'><div id='mCSB_" +
              d.idx +
              "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
            "<div id='mCSB_" +
              d.idx +
              "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" +
              d.idx +
              "_scrollbar mCS-" +
              o.theme +
              " mCSB_scrollTools_horizontal" +
              expandClass +
              "'><div class='" +
              classes[12] +
              "'><div id='mCSB_" +
              d.idx +
              "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
          ],
          wrapperClass =
            o.axis === "yx"
              ? "mCSB_vertical_horizontal"
              : o.axis === "x"
              ? "mCSB_horizontal"
              : "mCSB_vertical",
          scrollbars =
            o.axis === "yx"
              ? scrollbar[0] + scrollbar[1]
              : o.axis === "x"
              ? scrollbar[1]
              : scrollbar[0],
          contentWrapper =
            o.axis === "yx"
              ? "<div id='mCSB_" +
                d.idx +
                "_container_wrapper' class='mCSB_container_wrapper' />"
              : "",
          autoHideClass = o.autoHideScrollbar ? " " + classes[6] : "",
          scrollbarDirClass =
            o.axis !== "x" && d.langDir === "rtl" ? " " + classes[7] : "";
        if (o.setWidth) {
          $this.css("width", o.setWidth);
        } /* set element width */
        if (o.setHeight) {
          $this.css("height", o.setHeight);
        } /* set element height */
        o.setLeft =
          o.axis !== "y" && d.langDir === "rtl"
            ? "989999px"
            : o.setLeft; /* adjust left position for rtl direction */
        $this
          .addClass(
            pluginNS +
              " _" +
              pluginPfx +
              "_" +
              d.idx +
              autoHideClass +
              scrollbarDirClass
          )
          .wrapInner(
            "<div id='mCSB_" +
              d.idx +
              "' class='mCustomScrollBox mCS-" +
              o.theme +
              " " +
              wrapperClass +
              "'><div id='mCSB_" +
              d.idx +
              "_container' class='mCSB_container' style='position:relative; top:" +
              o.setTop +
              "; left:" +
              o.setLeft +
              ";' dir='" +
              d.langDir +
              "' /></div>"
          );
        var mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container");
        if (o.axis !== "y" && !o.advanced.autoExpandHorizontalScroll) {
          mCSB_container.css("width", _contentWidth(mCSB_container));
        }
        if (o.scrollbarPosition === "outside") {
          if ($this.css("position") === "static") {
            /* requires elements with non-static position */
            $this.css("position", "relative");
          }
          $this.css("overflow", "visible");
          mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
        } else {
          mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
          mCSB_container.wrap(contentWrapper);
        }
        _scrollButtons.call(this); /* add scrollbar buttons */
        /* minimum dragger length */
        var mCSB_dragger = [
          $("#mCSB_" + d.idx + "_dragger_vertical"),
          $("#mCSB_" + d.idx + "_dragger_horizontal"),
        ];
        mCSB_dragger[0].css("min-height", mCSB_dragger[0].height());
        mCSB_dragger[1].css("min-width", mCSB_dragger[1].width());
      },
      /* -------------------- */

      /* calculates content width */
      _contentWidth = function (el) {
        var val = [
            el[0].scrollWidth,
            Math.max.apply(
              Math,
              el
                .children()
                .map(function () {
                  return $(this).outerWidth(true);
                })
                .get()
            ),
          ],
          w = el.parent().width();
        return val[0] > w ? val[0] : val[1] > w ? val[1] : "100%";
      },
      /* -------------------- */

      /* expands content horizontally */
      _expandContentHorizontally = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          mCSB_container = $("#mCSB_" + d.idx + "_container");
        if (o.advanced.autoExpandHorizontalScroll && o.axis !== "y") {
          /* calculate scrollWidth */
          mCSB_container.css({
            width: "auto",
            "min-width": 0,
            "overflow-x": "scroll",
          });
          var w = Math.ceil(mCSB_container[0].scrollWidth);
          if (
            o.advanced.autoExpandHorizontalScroll === 3 ||
            (o.advanced.autoExpandHorizontalScroll !== 2 &&
              w > mCSB_container.parent().width())
          ) {
            mCSB_container.css({
              width: w,
              "min-width": "100%",
              "overflow-x": "inherit",
            });
          } else {
            /* 
					wrap content with an infinite width div and set its position to absolute and width to auto. 
					Setting width to auto before calculating the actual width is important! 
					We must let the browser set the width as browser zoom values are impossible to calculate.
					*/
            mCSB_container
              .css({ "overflow-x": "inherit", position: "absolute" })
              .wrap(
                "<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />"
              )
              .css({
                /* set actual width, original position and un-wrap */
                /* 
							get the exact width (with decimals) and then round-up. 
							Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
							*/
                width:
                  Math.ceil(
                    mCSB_container[0].getBoundingClientRect().right + 0.4
                  ) -
                  Math.floor(mCSB_container[0].getBoundingClientRect().left),
                "min-width": "100%",
                position: "relative",
              })
              .unwrap();
          }
        }
      },
      /* -------------------- */

      /* adds scrollbar buttons */
      _scrollButtons = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          mCSB_scrollTools = $(".mCSB_" + d.idx + "_scrollbar:first"),
          tabindex = !_isNumeric(o.scrollButtons.tabindex)
            ? ""
            : "tabindex='" + o.scrollButtons.tabindex + "'",
          btnHTML = [
            "<a href='#' class='" + classes[13] + "' " + tabindex + " />",
            "<a href='#' class='" + classes[14] + "' " + tabindex + " />",
            "<a href='#' class='" + classes[15] + "' " + tabindex + " />",
            "<a href='#' class='" + classes[16] + "' " + tabindex + " />",
          ],
          btn = [
            o.axis === "x" ? btnHTML[2] : btnHTML[0],
            o.axis === "x" ? btnHTML[3] : btnHTML[1],
            btnHTML[2],
            btnHTML[3],
          ];
        if (o.scrollButtons.enable) {
          mCSB_scrollTools
            .prepend(btn[0])
            .append(btn[1])
            .next(".mCSB_scrollTools")
            .prepend(btn[2])
            .append(btn[3]);
        }
      },
      /* -------------------- */

      /* auto-adjusts scrollbar dragger length */
      _setDraggerLength = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          mCSB_dragger = [
            $("#mCSB_" + d.idx + "_dragger_vertical"),
            $("#mCSB_" + d.idx + "_dragger_horizontal"),
          ],
          ratio = [
            mCustomScrollBox.height() / mCSB_container.outerHeight(false),
            mCustomScrollBox.width() / mCSB_container.outerWidth(false),
          ],
          l = [
            parseInt(mCSB_dragger[0].css("min-height")),
            Math.round(ratio[0] * mCSB_dragger[0].parent().height()),
            parseInt(mCSB_dragger[1].css("min-width")),
            Math.round(ratio[1] * mCSB_dragger[1].parent().width()),
          ],
          h = oldIE && l[1] < l[0] ? l[0] : l[1],
          w = oldIE && l[3] < l[2] ? l[2] : l[3];
        mCSB_dragger[0]
          .css({
            height: h,
            "max-height": mCSB_dragger[0].parent().height() - 10,
          })
          .find(".mCSB_dragger_bar")
          .css({ "line-height": l[0] + "px" });
        mCSB_dragger[1].css({
          width: w,
          "max-width": mCSB_dragger[1].parent().width() - 10,
        });
      },
      /* -------------------- */

      /* calculates scrollbar to content ratio */
      _scrollRatio = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          mCSB_dragger = [
            $("#mCSB_" + d.idx + "_dragger_vertical"),
            $("#mCSB_" + d.idx + "_dragger_horizontal"),
          ],
          scrollAmount = [
            mCSB_container.outerHeight(false) - mCustomScrollBox.height(),
            mCSB_container.outerWidth(false) - mCustomScrollBox.width(),
          ],
          ratio = [
            scrollAmount[0] /
              (mCSB_dragger[0].parent().height() - mCSB_dragger[0].height()),
            scrollAmount[1] /
              (mCSB_dragger[1].parent().width() - mCSB_dragger[1].width()),
          ];
        d.scrollRatio = { y: ratio[0], x: ratio[1] };
      },
      /* -------------------- */

      /* toggles scrolling classes */
      _onDragClasses = function (el, action, xpnd) {
        var expandClass = xpnd ? classes[0] + "_expanded" : "",
          scrollbar = el.closest(".mCSB_scrollTools");
        if (action === "active") {
          el.toggleClass(classes[0] + " " + expandClass);
          scrollbar.toggleClass(classes[1]);
          el[0]._draggable = el[0]._draggable ? 0 : 1;
        } else {
          if (!el[0]._draggable) {
            if (action === "hide") {
              el.removeClass(classes[0]);
              scrollbar.removeClass(classes[1]);
            } else {
              el.addClass(classes[0]);
              scrollbar.addClass(classes[1]);
            }
          }
        }
      },
      /* -------------------- */

      /* checks if content overflows its container to determine if scrolling is required */
      _overflowed = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          contentHeight =
            d.overflowed == null
              ? mCSB_container.height()
              : mCSB_container.outerHeight(false),
          contentWidth =
            d.overflowed == null
              ? mCSB_container.width()
              : mCSB_container.outerWidth(false),
          h = mCSB_container[0].scrollHeight,
          w = mCSB_container[0].scrollWidth;
        if (h > contentHeight) {
          contentHeight = h;
        }
        if (w > contentWidth) {
          contentWidth = w;
        }
        return [
          contentHeight > mCustomScrollBox.height(),
          contentWidth > mCustomScrollBox.width(),
        ];
      },
      /* -------------------- */

      /* resets content position to 0 */
      _resetContentPosition = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          mCSB_dragger = [
            $("#mCSB_" + d.idx + "_dragger_vertical"),
            $("#mCSB_" + d.idx + "_dragger_horizontal"),
          ];
        _stop($this); /* stop any current scrolling before resetting */
        if (
          (o.axis !== "x" && !d.overflowed[0]) ||
          (o.axis === "y" && d.overflowed[0])
        ) {
          /* reset y */
          mCSB_dragger[0].add(mCSB_container).css("top", 0);
          _scrollTo($this, "_resetY");
        }
        if (
          (o.axis !== "y" && !d.overflowed[1]) ||
          (o.axis === "x" && d.overflowed[1])
        ) {
          /* reset x */
          var cx = (dx = 0);
          if (d.langDir === "rtl") {
            /* adjust left position for rtl direction */
            cx = mCustomScrollBox.width() - mCSB_container.outerWidth(false);
            dx = Math.abs(cx / d.scrollRatio.x);
          }
          mCSB_container.css("left", cx);
          mCSB_dragger[1].css("left", dx);
          _scrollTo($this, "_resetX");
        }
      },
      /* -------------------- */

      /* binds scrollbar events */
      _bindEvents = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt;
        if (!d.bindEvents) {
          /* check if events are already bound */
          _draggable.call(this);
          if (o.contentTouchScroll) {
            _contentDraggable.call(this);
          }
          _selectable.call(this);
          if (o.mouseWheel.enable) {
            /* bind mousewheel fn when plugin is available */
            function _mwt() {
              mousewheelTimeout = setTimeout(function () {
                if (!$.event.special.mousewheel) {
                  _mwt();
                } else {
                  clearTimeout(mousewheelTimeout);
                  _mousewheel.call($this[0]);
                }
              }, 100);
            }
            var mousewheelTimeout;
            _mwt();
          }
          _draggerRail.call(this);
          _wrapperScroll.call(this);
          if (o.advanced.autoScrollOnFocus) {
            _focus.call(this);
          }
          if (o.scrollButtons.enable) {
            _buttons.call(this);
          }
          if (o.keyboard.enable) {
            _keyboard.call(this);
          }
          d.bindEvents = true;
        }
      },
      /* -------------------- */

      /* unbinds scrollbar events */
      _unbindEvents = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          namespace = pluginPfx + "_" + d.idx,
          sb = ".mCSB_" + d.idx + "_scrollbar",
          sel = $(
            "#mCSB_" +
              d.idx +
              ",#mCSB_" +
              d.idx +
              "_container,#mCSB_" +
              d.idx +
              "_container_wrapper," +
              sb +
              " ." +
              classes[12] +
              ",#mCSB_" +
              d.idx +
              "_dragger_vertical,#mCSB_" +
              d.idx +
              "_dragger_horizontal," +
              sb +
              ">a"
          ),
          mCSB_container = $("#mCSB_" + d.idx + "_container");
        if (o.advanced.releaseDraggableSelectors) {
          sel.add($(o.advanced.releaseDraggableSelectors));
        }
        if (o.advanced.extraDraggableSelectors) {
          sel.add($(o.advanced.extraDraggableSelectors));
        }
        if (d.bindEvents) {
          /* check if events are bound */
          /* unbind namespaced events from document/selectors */
          $(document)
            .add($(!_canAccessIFrame() || top.document))
            .unbind("." + namespace);
          sel.each(function () {
            $(this).unbind("." + namespace);
          });
          /* clear and delete timeouts/objects */
          clearTimeout($this[0]._focusTimeout);
          _delete($this[0], "_focusTimeout");
          clearTimeout(d.sequential.step);
          _delete(d.sequential, "step");
          clearTimeout(mCSB_container[0].onCompleteTimeout);
          _delete(mCSB_container[0], "onCompleteTimeout");
          d.bindEvents = false;
        }
      },
      /* -------------------- */

      /* toggles scrollbar visibility */
      _scrollbarVisibility = function (disabled) {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          contentWrapper = $("#mCSB_" + d.idx + "_container_wrapper"),
          content = contentWrapper.length
            ? contentWrapper
            : $("#mCSB_" + d.idx + "_container"),
          scrollbar = [
            $("#mCSB_" + d.idx + "_scrollbar_vertical"),
            $("#mCSB_" + d.idx + "_scrollbar_horizontal"),
          ],
          mCSB_dragger = [
            scrollbar[0].find(".mCSB_dragger"),
            scrollbar[1].find(".mCSB_dragger"),
          ];
        if (o.axis !== "x") {
          if (d.overflowed[0] && !disabled) {
            scrollbar[0]
              .add(mCSB_dragger[0])
              .add(scrollbar[0].children("a"))
              .css("display", "block");
            content.removeClass(classes[8] + " " + classes[10]);
          } else {
            if (o.alwaysShowScrollbar) {
              if (o.alwaysShowScrollbar !== 2) {
                mCSB_dragger[0].css("display", "none");
              }
              content.removeClass(classes[10]);
            } else {
              scrollbar[0].css("display", "none");
              content.addClass(classes[10]);
            }
            content.addClass(classes[8]);
          }
        }
        if (o.axis !== "y") {
          if (d.overflowed[1] && !disabled) {
            scrollbar[1]
              .add(mCSB_dragger[1])
              .add(scrollbar[1].children("a"))
              .css("display", "block");
            content.removeClass(classes[9] + " " + classes[11]);
          } else {
            if (o.alwaysShowScrollbar) {
              if (o.alwaysShowScrollbar !== 2) {
                mCSB_dragger[1].css("display", "none");
              }
              content.removeClass(classes[11]);
            } else {
              scrollbar[1].css("display", "none");
              content.addClass(classes[11]);
            }
            content.addClass(classes[9]);
          }
        }
        if (!d.overflowed[0] && !d.overflowed[1]) {
          $this.addClass(classes[5]);
        } else {
          $this.removeClass(classes[5]);
        }
      },
      /* -------------------- */

      /* returns input coordinates of pointer, touch and mouse events (relative to document) */
      _coordinates = function (e) {
        var t = e.type,
          o =
            e.target.ownerDocument !== document && frameElement !== null
              ? [$(frameElement).offset().top, $(frameElement).offset().left]
              : null,
          io =
            _canAccessIFrame() &&
            e.target.ownerDocument !== top.document &&
            frameElement !== null
              ? [
                  $(e.view.frameElement).offset().top,
                  $(e.view.frameElement).offset().left,
                ]
              : [0, 0];
        switch (t) {
          case "pointerdown":
          case "MSPointerDown":
          case "pointermove":
          case "MSPointerMove":
          case "pointerup":
          case "MSPointerUp":
            return o
              ? [
                  e.originalEvent.pageY - o[0] + io[0],
                  e.originalEvent.pageX - o[1] + io[1],
                  false,
                ]
              : [e.originalEvent.pageY, e.originalEvent.pageX, false];
            break;
          case "touchstart":
          case "touchmove":
          case "touchend":
            var touch =
                e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
              touches =
                e.originalEvent.touches.length ||
                e.originalEvent.changedTouches.length;
            return e.target.ownerDocument !== document
              ? [touch.screenY, touch.screenX, touches > 1]
              : [touch.pageY, touch.pageX, touches > 1];
            break;
          default:
            return o
              ? [e.pageY - o[0] + io[0], e.pageX - o[1] + io[1], false]
              : [e.pageY, e.pageX, false];
        }
      },
      /* -------------------- */

      /* 
		SCROLLBAR DRAG EVENTS
		scrolls content via scrollbar dragging 
		*/
      _draggable = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          namespace = pluginPfx + "_" + d.idx,
          draggerId = [
            "mCSB_" + d.idx + "_dragger_vertical",
            "mCSB_" + d.idx + "_dragger_horizontal",
          ],
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          mCSB_dragger = $("#" + draggerId[0] + ",#" + draggerId[1]),
          draggable,
          dragY,
          dragX,
          rds = o.advanced.releaseDraggableSelectors
            ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors))
            : mCSB_dragger,
          eds = o.advanced.extraDraggableSelectors
            ? $(!_canAccessIFrame() || top.document).add(
                $(o.advanced.extraDraggableSelectors)
              )
            : $(!_canAccessIFrame() || top.document);
        mCSB_dragger
          .bind("contextmenu." + namespace, function (e) {
            e.preventDefault(); //prevent right click
          })
          .bind(
            "mousedown." +
              namespace +
              " touchstart." +
              namespace +
              " pointerdown." +
              namespace +
              " MSPointerDown." +
              namespace,
            function (e) {
              e.stopImmediatePropagation();
              e.preventDefault();
              if (!_mouseBtnLeft(e)) {
                return;
              } /* left mouse button only */
              touchActive = true;
              if (oldIE) {
                document.onselectstart = function () {
                  return false;
                };
              } /* disable text selection for IE < 9 */
              _iframe.call(
                mCSB_container,
                false
              ); /* enable scrollbar dragging over iframes by disabling their events */
              _stop($this);
              draggable = $(this);
              var offset = draggable.offset(),
                y = _coordinates(e)[0] - offset.top,
                x = _coordinates(e)[1] - offset.left,
                h = draggable.height() + offset.top,
                w = draggable.width() + offset.left;
              if (y < h && y > 0 && x < w && x > 0) {
                dragY = y;
                dragX = x;
              }
              _onDragClasses(draggable, "active", o.autoExpandScrollbar);
            }
          )
          .bind("touchmove." + namespace, function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            var offset = draggable.offset(),
              y = _coordinates(e)[0] - offset.top,
              x = _coordinates(e)[1] - offset.left;
            _drag(dragY, dragX, y, x);
          });
        $(document)
          .add(eds)
          .bind(
            "mousemove." +
              namespace +
              " pointermove." +
              namespace +
              " MSPointerMove." +
              namespace,
            function (e) {
              if (draggable) {
                var offset = draggable.offset(),
                  y = _coordinates(e)[0] - offset.top,
                  x = _coordinates(e)[1] - offset.left;
                if (dragY === y && dragX === x) {
                  return;
                } /* has it really moved? */
                _drag(dragY, dragX, y, x);
              }
            }
          )
          .add(rds)
          .bind(
            "mouseup." +
              namespace +
              " touchend." +
              namespace +
              " pointerup." +
              namespace +
              " MSPointerUp." +
              namespace,
            function (e) {
              if (draggable) {
                _onDragClasses(draggable, "active", o.autoExpandScrollbar);
                draggable = null;
              }
              touchActive = false;
              if (oldIE) {
                document.onselectstart = null;
              } /* enable text selection for IE < 9 */
              _iframe.call(mCSB_container, true); /* enable iframes events */
            }
          );
        function _drag(dragY, dragX, y, x) {
          mCSB_container[0].idleTimer = o.scrollInertia < 233 ? 250 : 0;
          if (draggable.attr("id") === draggerId[1]) {
            var dir = "x",
              to = (draggable[0].offsetLeft - dragX + x) * d.scrollRatio.x;
          } else {
            var dir = "y",
              to = (draggable[0].offsetTop - dragY + y) * d.scrollRatio.y;
          }
          _scrollTo($this, to.toString(), { dir: dir, drag: true });
        }
      },
      /* -------------------- */

      /* 
		TOUCH SWIPE EVENTS
		scrolls content via touch swipe 
		Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices 
		*/
      _contentDraggable = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          namespace = pluginPfx + "_" + d.idx,
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          mCSB_dragger = [
            $("#mCSB_" + d.idx + "_dragger_vertical"),
            $("#mCSB_" + d.idx + "_dragger_horizontal"),
          ],
          draggable,
          dragY,
          dragX,
          touchStartY,
          touchStartX,
          touchMoveY = [],
          touchMoveX = [],
          startTime,
          runningTime,
          endTime,
          distance,
          speed,
          amount,
          durA = 0,
          durB,
          overwrite = o.axis === "yx" ? "none" : "all",
          touchIntent = [],
          touchDrag,
          docDrag,
          iframe = mCSB_container.find("iframe"),
          events = [
            "touchstart." +
              namespace +
              " pointerdown." +
              namespace +
              " MSPointerDown." +
              namespace, //start
            "touchmove." +
              namespace +
              " pointermove." +
              namespace +
              " MSPointerMove." +
              namespace, //move
            "touchend." +
              namespace +
              " pointerup." +
              namespace +
              " MSPointerUp." +
              namespace, //end
          ],
          touchAction =
            document.body.style.touchAction !== undefined &&
            document.body.style.touchAction !== "";
        mCSB_container
          .bind(events[0], function (e) {
            _onTouchstart(e);
          })
          .bind(events[1], function (e) {
            _onTouchmove(e);
          });
        mCustomScrollBox
          .bind(events[0], function (e) {
            _onTouchstart2(e);
          })
          .bind(events[2], function (e) {
            _onTouchend(e);
          });
        if (iframe.length) {
          iframe.each(function () {
            $(this).bind("load", function () {
              /* bind events on accessible iframes */
              if (_canAccessIFrame(this)) {
                $(this.contentDocument || this.contentWindow.document)
                  .bind(events[0], function (e) {
                    _onTouchstart(e);
                    _onTouchstart2(e);
                  })
                  .bind(events[1], function (e) {
                    _onTouchmove(e);
                  })
                  .bind(events[2], function (e) {
                    _onTouchend(e);
                  });
              }
            });
          });
        }
        function _onTouchstart(e) {
          if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
            touchable = 0;
            return;
          }
          touchable = 1;
          touchDrag = 0;
          docDrag = 0;
          draggable = 1;
          $this.removeClass("mCS_touch_action");
          var offset = mCSB_container.offset();
          dragY = _coordinates(e)[0] - offset.top;
          dragX = _coordinates(e)[1] - offset.left;
          touchIntent = [_coordinates(e)[0], _coordinates(e)[1]];
        }
        function _onTouchmove(e) {
          if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
            return;
          }
          if (!o.documentTouchScroll) {
            e.preventDefault();
          }
          e.stopImmediatePropagation();
          if (docDrag && !touchDrag) {
            return;
          }
          if (draggable) {
            runningTime = _getTime();
            var offset = mCustomScrollBox.offset(),
              y = _coordinates(e)[0] - offset.top,
              x = _coordinates(e)[1] - offset.left,
              easing = "mcsLinearOut";
            touchMoveY.push(y);
            touchMoveX.push(x);
            touchIntent[2] = Math.abs(_coordinates(e)[0] - touchIntent[0]);
            touchIntent[3] = Math.abs(_coordinates(e)[1] - touchIntent[1]);
            if (d.overflowed[0]) {
              var limit =
                  mCSB_dragger[0].parent().height() - mCSB_dragger[0].height(),
                prevent =
                  dragY - y > 0 &&
                  y - dragY > -(limit * d.scrollRatio.y) &&
                  (touchIntent[3] * 2 < touchIntent[2] || o.axis === "yx");
            }
            if (d.overflowed[1]) {
              var limitX =
                  mCSB_dragger[1].parent().width() - mCSB_dragger[1].width(),
                preventX =
                  dragX - x > 0 &&
                  x - dragX > -(limitX * d.scrollRatio.x) &&
                  (touchIntent[2] * 2 < touchIntent[3] || o.axis === "yx");
            }
            if (prevent || preventX) {
              /* prevent native document scrolling */
              if (!touchAction) {
                e.preventDefault();
              }
              touchDrag = 1;
            } else {
              docDrag = 1;
              $this.addClass("mCS_touch_action");
            }
            if (touchAction) {
              e.preventDefault();
            }
            amount =
              o.axis === "yx"
                ? [dragY - y, dragX - x]
                : o.axis === "x"
                ? [null, dragX - x]
                : [dragY - y, null];
            mCSB_container[0].idleTimer = 250;
            if (d.overflowed[0]) {
              _drag(amount[0], durA, easing, "y", "all", true);
            }
            if (d.overflowed[1]) {
              _drag(amount[1], durA, easing, "x", overwrite, true);
            }
          }
        }
        function _onTouchstart2(e) {
          if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
            touchable = 0;
            return;
          }
          touchable = 1;
          e.stopImmediatePropagation();
          _stop($this);
          startTime = _getTime();
          var offset = mCustomScrollBox.offset();
          touchStartY = _coordinates(e)[0] - offset.top;
          touchStartX = _coordinates(e)[1] - offset.left;
          touchMoveY = [];
          touchMoveX = [];
        }
        function _onTouchend(e) {
          if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
            return;
          }
          draggable = 0;
          e.stopImmediatePropagation();
          touchDrag = 0;
          docDrag = 0;
          endTime = _getTime();
          var offset = mCustomScrollBox.offset(),
            y = _coordinates(e)[0] - offset.top,
            x = _coordinates(e)[1] - offset.left;
          if (endTime - runningTime > 30) {
            return;
          }
          speed = 1000 / (endTime - startTime);
          var easing = "mcsEaseOut",
            slow = speed < 2.5,
            diff = slow
              ? [
                  touchMoveY[touchMoveY.length - 2],
                  touchMoveX[touchMoveX.length - 2],
                ]
              : [0, 0];
          distance = slow
            ? [y - diff[0], x - diff[1]]
            : [y - touchStartY, x - touchStartX];
          var absDistance = [Math.abs(distance[0]), Math.abs(distance[1])];
          speed = slow
            ? [Math.abs(distance[0] / 4), Math.abs(distance[1] / 4)]
            : [speed, speed];
          var a = [
            Math.abs(mCSB_container[0].offsetTop) -
              distance[0] * _m(absDistance[0] / speed[0], speed[0]),
            Math.abs(mCSB_container[0].offsetLeft) -
              distance[1] * _m(absDistance[1] / speed[1], speed[1]),
          ];
          amount =
            o.axis === "yx"
              ? [a[0], a[1]]
              : o.axis === "x"
              ? [null, a[1]]
              : [a[0], null];
          durB = [
            absDistance[0] * 4 + o.scrollInertia,
            absDistance[1] * 4 + o.scrollInertia,
          ];
          var md =
            parseInt(o.contentTouchScroll) ||
            0; /* absolute minimum distance required */
          amount[0] = absDistance[0] > md ? amount[0] : 0;
          amount[1] = absDistance[1] > md ? amount[1] : 0;
          if (d.overflowed[0]) {
            _drag(amount[0], durB[0], easing, "y", overwrite, false);
          }
          if (d.overflowed[1]) {
            _drag(amount[1], durB[1], easing, "x", overwrite, false);
          }
        }
        function _m(ds, s) {
          var r = [s * 1.5, s * 2, s / 1.5, s / 2];
          if (ds > 90) {
            return s > 4 ? r[0] : r[3];
          } else if (ds > 60) {
            return s > 3 ? r[3] : r[2];
          } else if (ds > 30) {
            return s > 8 ? r[1] : s > 6 ? r[0] : s > 4 ? s : r[2];
          } else {
            return s > 8 ? s : r[3];
          }
        }
        function _drag(amount, dur, easing, dir, overwrite, drag) {
          if (!amount) {
            return;
          }
          _scrollTo($this, amount.toString(), {
            dur: dur,
            scrollEasing: easing,
            dir: dir,
            overwrite: overwrite,
            drag: drag,
          });
        }
      },
      /* -------------------- */

      /* 
		SELECT TEXT EVENTS 
		scrolls content when text is selected 
		*/
      _selectable = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          seq = d.sequential,
          namespace = pluginPfx + "_" + d.idx,
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent(),
          action;
        mCSB_container
          .bind("mousedown." + namespace, function (e) {
            if (touchable) {
              return;
            }
            if (!action) {
              action = 1;
              touchActive = true;
            }
          })
          .add(document)
          .bind("mousemove." + namespace, function (e) {
            if (!touchable && action && _sel()) {
              var offset = mCSB_container.offset(),
                y =
                  _coordinates(e)[0] - offset.top + mCSB_container[0].offsetTop,
                x =
                  _coordinates(e)[1] -
                  offset.left +
                  mCSB_container[0].offsetLeft;
              if (
                y > 0 &&
                y < wrapper.height() &&
                x > 0 &&
                x < wrapper.width()
              ) {
                if (seq.step) {
                  _seq("off", null, "stepped");
                }
              } else {
                if (o.axis !== "x" && d.overflowed[0]) {
                  if (y < 0) {
                    _seq("on", 38);
                  } else if (y > wrapper.height()) {
                    _seq("on", 40);
                  }
                }
                if (o.axis !== "y" && d.overflowed[1]) {
                  if (x < 0) {
                    _seq("on", 37);
                  } else if (x > wrapper.width()) {
                    _seq("on", 39);
                  }
                }
              }
            }
          })
          .bind("mouseup." + namespace + " dragend." + namespace, function (e) {
            if (touchable) {
              return;
            }
            if (action) {
              action = 0;
              _seq("off", null);
            }
            touchActive = false;
          });
        function _sel() {
          return window.getSelection
            ? window.getSelection().toString()
            : document.selection && document.selection.type != "Control"
            ? document.selection.createRange().text
            : 0;
        }
        function _seq(a, c, s) {
          seq.type = s && action ? "stepped" : "stepless";
          seq.scrollAmount = 10;
          _sequentialScroll($this, a, c, "mcsLinearOut", s ? 60 : null);
        }
      },
      /* -------------------- */

      /* 
		MOUSE WHEEL EVENT
		scrolls content via mouse-wheel 
		via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
		*/
      _mousewheel = function () {
        if (!$(this).data(pluginPfx)) {
          return;
        } /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          namespace = pluginPfx + "_" + d.idx,
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_dragger = [
            $("#mCSB_" + d.idx + "_dragger_vertical"),
            $("#mCSB_" + d.idx + "_dragger_horizontal"),
          ],
          iframe = $("#mCSB_" + d.idx + "_container").find("iframe");
        if (iframe.length) {
          iframe.each(function () {
            $(this).bind("load", function () {
              /* bind events on accessible iframes */
              if (_canAccessIFrame(this)) {
                $(this.contentDocument || this.contentWindow.document).bind(
                  "mousewheel." + namespace,
                  function (e, delta) {
                    _onMousewheel(e, delta);
                  }
                );
              }
            });
          });
        }
        mCustomScrollBox.bind("mousewheel." + namespace, function (e, delta) {
          _onMousewheel(e, delta);
        });
        function _onMousewheel(e, delta) {
          _stop($this);
          if (_disableMousewheel($this, e.target)) {
            return;
          } /* disables mouse-wheel when hovering specific elements */
          var deltaFactor =
              o.mouseWheel.deltaFactor !== "auto"
                ? parseInt(o.mouseWheel.deltaFactor)
                : oldIE && e.deltaFactor < 100
                ? 100
                : e.deltaFactor || 100,
            dur = o.scrollInertia;
          if (o.axis === "x" || o.mouseWheel.axis === "x") {
            var dir = "x",
              px = [
                Math.round(deltaFactor * d.scrollRatio.x),
                parseInt(o.mouseWheel.scrollAmount),
              ],
              amount =
                o.mouseWheel.scrollAmount !== "auto"
                  ? px[1]
                  : px[0] >= mCustomScrollBox.width()
                  ? mCustomScrollBox.width() * 0.9
                  : px[0],
              contentPos = Math.abs(
                $("#mCSB_" + d.idx + "_container")[0].offsetLeft
              ),
              draggerPos = mCSB_dragger[1][0].offsetLeft,
              limit =
                mCSB_dragger[1].parent().width() - mCSB_dragger[1].width(),
              dlt = o.mouseWheel.axis === "y" ? e.deltaY || delta : e.deltaX;
          } else {
            var dir = "y",
              px = [
                Math.round(deltaFactor * d.scrollRatio.y),
                parseInt(o.mouseWheel.scrollAmount),
              ],
              amount =
                o.mouseWheel.scrollAmount !== "auto"
                  ? px[1]
                  : px[0] >= mCustomScrollBox.height()
                  ? mCustomScrollBox.height() * 0.9
                  : px[0],
              contentPos = Math.abs(
                $("#mCSB_" + d.idx + "_container")[0].offsetTop
              ),
              draggerPos = mCSB_dragger[0][0].offsetTop,
              limit =
                mCSB_dragger[0].parent().height() - mCSB_dragger[0].height(),
              dlt = e.deltaY || delta;
          }
          if (
            (dir === "y" && !d.overflowed[0]) ||
            (dir === "x" && !d.overflowed[1])
          ) {
            return;
          }
          if (o.mouseWheel.invert || e.webkitDirectionInvertedFromDevice) {
            dlt = -dlt;
          }
          if (o.mouseWheel.normalizeDelta) {
            dlt = dlt < 0 ? -1 : 1;
          }
          if (
            (dlt > 0 && draggerPos !== 0) ||
            (dlt < 0 && draggerPos !== limit) ||
            o.mouseWheel.preventDefault
          ) {
            e.stopImmediatePropagation();
            e.preventDefault();
          }
          if (e.deltaFactor < 5 && !o.mouseWheel.normalizeDelta) {
            //very low deltaFactor values mean some kind of delta acceleration (e.g. osx trackpad), so adjusting scrolling accordingly
            amount = e.deltaFactor;
            dur = 17;
          }
          _scrollTo($this, (contentPos - dlt * amount).toString(), {
            dir: dir,
            dur: dur,
          });
        }
      },
      /* -------------------- */

      /* checks if iframe can be accessed */
      _canAccessIFrameCache = new Object(),
      _canAccessIFrame = function (iframe) {
        var result = false,
          cacheKey = false,
          html = null;
        if (iframe === undefined) {
          cacheKey = "#empty";
        } else if ($(iframe).attr("id") !== undefined) {
          cacheKey = $(iframe).attr("id");
        }
        if (
          cacheKey !== false &&
          _canAccessIFrameCache[cacheKey] !== undefined
        ) {
          return _canAccessIFrameCache[cacheKey];
        }
        if (!iframe) {
          try {
            var doc = top.document;
            html = doc.body.innerHTML;
          } catch (err) {
            /* do nothing */
          }
          result = html !== null;
        } else {
          try {
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            html = doc.body.innerHTML;
          } catch (err) {
            /* do nothing */
          }
          result = html !== null;
        }
        if (cacheKey !== false) {
          _canAccessIFrameCache[cacheKey] = result;
        }
        return result;
      },
      /* -------------------- */

      /* switches iframe's pointer-events property (drag, mousewheel etc. over cross-domain iframes) */
      _iframe = function (evt) {
        var el = this.find("iframe");
        if (!el.length) {
          return;
        } /* check if content contains iframes */
        var val = !evt ? "none" : "auto";
        el.css(
          "pointer-events",
          val
        ); /* for IE11, iframe's display property should not be "block" */
      },
      /* -------------------- */

      /* disables mouse-wheel when hovering specific elements like select, datalist etc. */
      _disableMousewheel = function (el, target) {
        var tag = target.nodeName.toLowerCase(),
          tags = el.data(pluginPfx).opt.mouseWheel.disableOver,
          /* elements that require focus */
          focusTags = ["select", "textarea"];
        return (
          $.inArray(tag, tags) > -1 &&
          !($.inArray(tag, focusTags) > -1 && !$(target).is(":focus"))
        );
      },
      /* -------------------- */

      /* 
		DRAGGER RAIL CLICK EVENT
		scrolls content via dragger rail 
		*/
      _draggerRail = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          namespace = pluginPfx + "_" + d.idx,
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent(),
          mCSB_draggerContainer = $(
            ".mCSB_" + d.idx + "_scrollbar ." + classes[12]
          ),
          clickable;
        mCSB_draggerContainer
          .bind(
            "mousedown." +
              namespace +
              " touchstart." +
              namespace +
              " pointerdown." +
              namespace +
              " MSPointerDown." +
              namespace,
            function (e) {
              touchActive = true;
              if (!$(e.target).hasClass("mCSB_dragger")) {
                clickable = 1;
              }
            }
          )
          .bind(
            "touchend." +
              namespace +
              " pointerup." +
              namespace +
              " MSPointerUp." +
              namespace,
            function (e) {
              touchActive = false;
            }
          )
          .bind("click." + namespace, function (e) {
            if (!clickable) {
              return;
            }
            clickable = 0;
            if (
              $(e.target).hasClass(classes[12]) ||
              $(e.target).hasClass("mCSB_draggerRail")
            ) {
              _stop($this);
              var el = $(this),
                mCSB_dragger = el.find(".mCSB_dragger");
              if (el.parent(".mCSB_scrollTools_horizontal").length > 0) {
                if (!d.overflowed[1]) {
                  return;
                }
                var dir = "x",
                  clickDir = e.pageX > mCSB_dragger.offset().left ? -1 : 1,
                  to =
                    Math.abs(mCSB_container[0].offsetLeft) -
                    clickDir * (wrapper.width() * 0.9);
              } else {
                if (!d.overflowed[0]) {
                  return;
                }
                var dir = "y",
                  clickDir = e.pageY > mCSB_dragger.offset().top ? -1 : 1,
                  to =
                    Math.abs(mCSB_container[0].offsetTop) -
                    clickDir * (wrapper.height() * 0.9);
              }
              _scrollTo($this, to.toString(), {
                dir: dir,
                scrollEasing: "mcsEaseInOut",
              });
            }
          });
      },
      /* -------------------- */

      /* 
		FOCUS EVENT
		scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
		*/
      _focus = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          namespace = pluginPfx + "_" + d.idx,
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent();
        mCSB_container.bind("focusin." + namespace, function (e) {
          var el = $(document.activeElement),
            nested = mCSB_container.find(".mCustomScrollBox").length,
            dur = 0;
          if (!el.is(o.advanced.autoScrollOnFocus)) {
            return;
          }
          _stop($this);
          clearTimeout($this[0]._focusTimeout);
          $this[0]._focusTimer = nested ? (dur + 17) * nested : 0;
          $this[0]._focusTimeout = setTimeout(function () {
            var to = [_childPos(el)[0], _childPos(el)[1]],
              contentPos = [
                mCSB_container[0].offsetTop,
                mCSB_container[0].offsetLeft,
              ],
              isVisible = [
                contentPos[0] + to[0] >= 0 &&
                  contentPos[0] + to[0] <
                    wrapper.height() - el.outerHeight(false),
                contentPos[1] + to[1] >= 0 &&
                  contentPos[0] + to[1] <
                    wrapper.width() - el.outerWidth(false),
              ],
              overwrite =
                o.axis === "yx" && !isVisible[0] && !isVisible[1]
                  ? "none"
                  : "all";
            if (o.axis !== "x" && !isVisible[0]) {
              _scrollTo($this, to[0].toString(), {
                dir: "y",
                scrollEasing: "mcsEaseInOut",
                overwrite: overwrite,
                dur: dur,
              });
            }
            if (o.axis !== "y" && !isVisible[1]) {
              _scrollTo($this, to[1].toString(), {
                dir: "x",
                scrollEasing: "mcsEaseInOut",
                overwrite: overwrite,
                dur: dur,
              });
            }
          }, $this[0]._focusTimer);
        });
      },
      /* -------------------- */

      /* sets content wrapper scrollTop/scrollLeft always to 0 */
      _wrapperScroll = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          namespace = pluginPfx + "_" + d.idx,
          wrapper = $("#mCSB_" + d.idx + "_container").parent();
        wrapper.bind("scroll." + namespace, function (e) {
          if (wrapper.scrollTop() !== 0 || wrapper.scrollLeft() !== 0) {
            $(".mCSB_" + d.idx + "_scrollbar").css(
              "visibility",
              "hidden"
            ); /* hide scrollbar(s) */
          }
        });
      },
      /* -------------------- */

      /* 
		BUTTONS EVENTS
		scrolls content via up, down, left and right buttons 
		*/
      _buttons = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          seq = d.sequential,
          namespace = pluginPfx + "_" + d.idx,
          sel = ".mCSB_" + d.idx + "_scrollbar",
          btn = $(sel + ">a");
        btn
          .bind("contextmenu." + namespace, function (e) {
            e.preventDefault(); //prevent right click
          })
          .bind(
            "mousedown." +
              namespace +
              " touchstart." +
              namespace +
              " pointerdown." +
              namespace +
              " MSPointerDown." +
              namespace +
              " mouseup." +
              namespace +
              " touchend." +
              namespace +
              " pointerup." +
              namespace +
              " MSPointerUp." +
              namespace +
              " mouseout." +
              namespace +
              " pointerout." +
              namespace +
              " MSPointerOut." +
              namespace +
              " click." +
              namespace,
            function (e) {
              e.preventDefault();
              if (!_mouseBtnLeft(e)) {
                return;
              } /* left mouse button only */
              var btnClass = $(this).attr("class");
              seq.type = o.scrollButtons.scrollType;
              switch (e.type) {
                case "mousedown":
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                  if (seq.type === "stepped") {
                    return;
                  }
                  touchActive = true;
                  d.tweenRunning = false;
                  _seq("on", btnClass);
                  break;
                case "mouseup":
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseout":
                case "pointerout":
                case "MSPointerOut":
                  if (seq.type === "stepped") {
                    return;
                  }
                  touchActive = false;
                  if (seq.dir) {
                    _seq("off", btnClass);
                  }
                  break;
                case "click":
                  if (seq.type !== "stepped" || d.tweenRunning) {
                    return;
                  }
                  _seq("on", btnClass);
                  break;
              }
              function _seq(a, c) {
                seq.scrollAmount = o.scrollButtons.scrollAmount;
                _sequentialScroll($this, a, c);
              }
            }
          );
      },
      /* -------------------- */

      /* 
		KEYBOARD EVENTS
		scrolls content via keyboard 
		Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
		*/
      _keyboard = function () {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          seq = d.sequential,
          namespace = pluginPfx + "_" + d.idx,
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent(),
          editables =
            "input,textarea,select,datalist,keygen,[contenteditable='true']",
          iframe = mCSB_container.find("iframe"),
          events = [
            "blur." +
              namespace +
              " keydown." +
              namespace +
              " keyup." +
              namespace,
          ];
        if (iframe.length) {
          iframe.each(function () {
            $(this).bind("load", function () {
              /* bind events on accessible iframes */
              if (_canAccessIFrame(this)) {
                $(this.contentDocument || this.contentWindow.document).bind(
                  events[0],
                  function (e) {
                    _onKeyboard(e);
                  }
                );
              }
            });
          });
        }
        mCustomScrollBox.attr("tabindex", "0").bind(events[0], function (e) {
          _onKeyboard(e);
        });
        function _onKeyboard(e) {
          switch (e.type) {
            case "blur":
              if (d.tweenRunning && seq.dir) {
                _seq("off", null);
              }
              break;
            case "keydown":
            case "keyup":
              var code = e.keyCode ? e.keyCode : e.which,
                action = "on";
              if (
                (o.axis !== "x" && (code === 38 || code === 40)) ||
                (o.axis !== "y" && (code === 37 || code === 39))
              ) {
                /* up (38), down (40), left (37), right (39) arrows */
                if (
                  ((code === 38 || code === 40) && !d.overflowed[0]) ||
                  ((code === 37 || code === 39) && !d.overflowed[1])
                ) {
                  return;
                }
                if (e.type === "keyup") {
                  action = "off";
                }
                if (!$(document.activeElement).is(editables)) {
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  _seq(action, code);
                }
              } else if (code === 33 || code === 34) {
                /* PgUp (33), PgDn (34) */
                if (d.overflowed[0] || d.overflowed[1]) {
                  e.preventDefault();
                  e.stopImmediatePropagation();
                }
                if (e.type === "keyup") {
                  _stop($this);
                  var keyboardDir = code === 34 ? -1 : 1;
                  if (
                    o.axis === "x" ||
                    (o.axis === "yx" && d.overflowed[1] && !d.overflowed[0])
                  ) {
                    var dir = "x",
                      to =
                        Math.abs(mCSB_container[0].offsetLeft) -
                        keyboardDir * (wrapper.width() * 0.9);
                  } else {
                    var dir = "y",
                      to =
                        Math.abs(mCSB_container[0].offsetTop) -
                        keyboardDir * (wrapper.height() * 0.9);
                  }
                  _scrollTo($this, to.toString(), {
                    dir: dir,
                    scrollEasing: "mcsEaseInOut",
                  });
                }
              } else if (code === 35 || code === 36) {
                /* End (35), Home (36) */
                if (!$(document.activeElement).is(editables)) {
                  if (d.overflowed[0] || d.overflowed[1]) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                  }
                  if (e.type === "keyup") {
                    if (
                      o.axis === "x" ||
                      (o.axis === "yx" && d.overflowed[1] && !d.overflowed[0])
                    ) {
                      var dir = "x",
                        to =
                          code === 35
                            ? Math.abs(
                                wrapper.width() -
                                  mCSB_container.outerWidth(false)
                              )
                            : 0;
                    } else {
                      var dir = "y",
                        to =
                          code === 35
                            ? Math.abs(
                                wrapper.height() -
                                  mCSB_container.outerHeight(false)
                              )
                            : 0;
                    }
                    _scrollTo($this, to.toString(), {
                      dir: dir,
                      scrollEasing: "mcsEaseInOut",
                    });
                  }
                }
              }
              break;
          }
          function _seq(a, c) {
            seq.type = o.keyboard.scrollType;
            seq.scrollAmount = o.keyboard.scrollAmount;
            if (seq.type === "stepped" && d.tweenRunning) {
              return;
            }
            _sequentialScroll($this, a, c);
          }
        }
      },
      /* -------------------- */

      /* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
      _sequentialScroll = function (el, action, trigger, e, s) {
        var d = el.data(pluginPfx),
          o = d.opt,
          seq = d.sequential,
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          once = seq.type === "stepped" ? true : false,
          steplessSpeed =
            o.scrollInertia < 26 ? 26 : o.scrollInertia /* 26/1.5=17 */,
          steppedSpeed = o.scrollInertia < 1 ? 17 : o.scrollInertia;
        switch (action) {
          case "on":
            seq.dir = [
              trigger === classes[16] ||
              trigger === classes[15] ||
              trigger === 39 ||
              trigger === 37
                ? "x"
                : "y",
              trigger === classes[13] ||
              trigger === classes[15] ||
              trigger === 38 ||
              trigger === 37
                ? -1
                : 1,
            ];
            _stop(el);
            if (_isNumeric(trigger) && seq.type === "stepped") {
              return;
            }
            _on(once);
            break;
          case "off":
            _off();
            if (once || (d.tweenRunning && seq.dir)) {
              _on(true);
            }
            break;
        }

        /* starts sequence */
        function _on(once) {
          if (o.snapAmount) {
            seq.scrollAmount = !(o.snapAmount instanceof Array)
              ? o.snapAmount
              : seq.dir[0] === "x"
              ? o.snapAmount[1]
              : o.snapAmount[0];
          } /* scrolling snapping */
          var c = seq.type !== "stepped" /* continuous scrolling */,
            t = s
              ? s
              : !once
              ? 1000 / 60
              : c
              ? steplessSpeed / 1.5
              : steppedSpeed /* timer */,
            m = !once ? 2.5 : c ? 7.5 : 40 /* multiplier */,
            contentPos = [
              Math.abs(mCSB_container[0].offsetTop),
              Math.abs(mCSB_container[0].offsetLeft),
            ],
            ratio = [
              d.scrollRatio.y > 10 ? 10 : d.scrollRatio.y,
              d.scrollRatio.x > 10 ? 10 : d.scrollRatio.x,
            ],
            amount =
              seq.dir[0] === "x"
                ? contentPos[1] + seq.dir[1] * (ratio[1] * m)
                : contentPos[0] + seq.dir[1] * (ratio[0] * m),
            px =
              seq.dir[0] === "x"
                ? contentPos[1] + seq.dir[1] * parseInt(seq.scrollAmount)
                : contentPos[0] + seq.dir[1] * parseInt(seq.scrollAmount),
            to = seq.scrollAmount !== "auto" ? px : amount,
            easing = e
              ? e
              : !once
              ? "mcsLinear"
              : c
              ? "mcsLinearOut"
              : "mcsEaseInOut",
            onComplete = !once ? false : true;
          if (once && t < 17) {
            to = seq.dir[0] === "x" ? contentPos[1] : contentPos[0];
          }
          _scrollTo(el, to.toString(), {
            dir: seq.dir[0],
            scrollEasing: easing,
            dur: t,
            onComplete: onComplete,
          });
          if (once) {
            seq.dir = false;
            return;
          }
          clearTimeout(seq.step);
          seq.step = setTimeout(function () {
            _on();
          }, t);
        }
        /* stops sequence */
        function _off() {
          clearTimeout(seq.step);
          _delete(seq, "step");
          _stop(el);
        }
      },
      /* -------------------- */

      /* returns a yx array from value */
      _arr = function (val) {
        var o = $(this).data(pluginPfx).opt,
          vals = [];
        if (typeof val === "function") {
          val = val();
        } /* check if the value is a single anonymous function */
        /* check if value is object or array, its length and create an array with yx values */
        if (!(val instanceof Array)) {
          /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
          vals[0] = val.y ? val.y : val.x || o.axis === "x" ? null : val;
          vals[1] = val.x ? val.x : val.y || o.axis === "y" ? null : val;
        } else {
          /* array value (e.g. [100,100]) */
          vals =
            val.length > 1
              ? [val[0], val[1]]
              : o.axis === "x"
              ? [null, val[0]]
              : [val[0], null];
        }
        /* check if array values are anonymous functions */
        if (typeof vals[0] === "function") {
          vals[0] = vals[0]();
        }
        if (typeof vals[1] === "function") {
          vals[1] = vals[1]();
        }
        return vals;
      },
      /* -------------------- */

      /* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
      _to = function (val, dir) {
        if (val == null || typeof val == "undefined") {
          return;
        }
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent(),
          t = typeof val;
        if (!dir) {
          dir = o.axis === "x" ? "x" : "y";
        }
        var contentLength =
            dir === "x"
              ? mCSB_container.outerWidth(false) - wrapper.width()
              : mCSB_container.outerHeight(false) - wrapper.height(),
          contentPos =
            dir === "x"
              ? mCSB_container[0].offsetLeft
              : mCSB_container[0].offsetTop,
          cssProp = dir === "x" ? "left" : "top";
        switch (t) {
          case "function" /* this currently is not used. Consider removing it */:
            return val();
            break;
          case "object" /* js/jquery object */:
            var obj = val.jquery ? val : $(val);
            if (!obj.length) {
              return;
            }
            return dir === "x" ? _childPos(obj)[1] : _childPos(obj)[0];
            break;
          case "string":
          case "number":
            if (_isNumeric(val)) {
              /* numeric value */
              return Math.abs(val);
            } else if (val.indexOf("%") !== -1) {
              /* percentage value */
              return Math.abs((contentLength * parseInt(val)) / 100);
            } else if (val.indexOf("-=") !== -1) {
              /* decrease value */
              return Math.abs(contentPos - parseInt(val.split("-=")[1]));
            } else if (val.indexOf("+=") !== -1) {
              /* inrease value */
              var p = contentPos + parseInt(val.split("+=")[1]);
              return p >= 0 ? 0 : Math.abs(p);
            } else if (
              val.indexOf("px") !== -1 &&
              _isNumeric(val.split("px")[0])
            ) {
              /* pixels string value (e.g. "100px") */
              return Math.abs(val.split("px")[0]);
            } else {
              if (val === "top" || val === "left") {
                /* special strings */
                return 0;
              } else if (val === "bottom") {
                return Math.abs(
                  wrapper.height() - mCSB_container.outerHeight(false)
                );
              } else if (val === "right") {
                return Math.abs(
                  wrapper.width() - mCSB_container.outerWidth(false)
                );
              } else if (val === "first" || val === "last") {
                var obj = mCSB_container.find(":" + val);
                return dir === "x" ? _childPos(obj)[1] : _childPos(obj)[0];
              } else {
                if ($(val).length) {
                  /* jquery selector */
                  return dir === "x"
                    ? _childPos($(val))[1]
                    : _childPos($(val))[0];
                } else {
                  /* other values (e.g. "100em") */
                  mCSB_container.css(cssProp, val);
                  methods.update.call(null, $this[0]);
                  return;
                }
              }
            }
            break;
        }
      },
      /* -------------------- */

      /* calls the update method automatically */
      _autoUpdate = function (rem) {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          mCSB_container = $("#mCSB_" + d.idx + "_container");
        if (rem) {
          /* 
				removes autoUpdate timer 
				usage: _autoUpdate.call(this,"remove");
				*/
          clearTimeout(mCSB_container[0].autoUpdate);
          _delete(mCSB_container[0], "autoUpdate");
          return;
        }
        upd();
        function upd() {
          clearTimeout(mCSB_container[0].autoUpdate);
          if ($this.parents("html").length === 0) {
            /* check element in dom tree */
            $this = null;
            return;
          }
          mCSB_container[0].autoUpdate = setTimeout(function () {
            /* update on specific selector(s) length and size change */
            if (o.advanced.updateOnSelectorChange) {
              d.poll.change.n = sizesSum();
              if (d.poll.change.n !== d.poll.change.o) {
                d.poll.change.o = d.poll.change.n;
                doUpd(3);
                return;
              }
            }
            /* update on main element and scrollbar size changes */
            if (o.advanced.updateOnContentResize) {
              d.poll.size.n =
                $this[0].scrollHeight +
                $this[0].scrollWidth +
                mCSB_container[0].offsetHeight +
                $this[0].offsetHeight +
                $this[0].offsetWidth;
              if (d.poll.size.n !== d.poll.size.o) {
                d.poll.size.o = d.poll.size.n;
                doUpd(1);
                return;
              }
            }
            /* update on image load */
            if (o.advanced.updateOnImageLoad) {
              if (
                !(o.advanced.updateOnImageLoad === "auto" && o.axis === "y")
              ) {
                //by default, it doesn't run on vertical content
                d.poll.img.n = mCSB_container.find("img").length;
                if (d.poll.img.n !== d.poll.img.o) {
                  d.poll.img.o = d.poll.img.n;
                  mCSB_container.find("img").each(function () {
                    imgLoader(this);
                  });
                  return;
                }
              }
            }
            if (
              o.advanced.updateOnSelectorChange ||
              o.advanced.updateOnContentResize ||
              o.advanced.updateOnImageLoad
            ) {
              upd();
            }
          }, o.advanced.autoUpdateTimeout);
        }
        /* a tiny image loader */
        function imgLoader(el) {
          if ($(el).hasClass(classes[2])) {
            doUpd();
            return;
          }
          var img = new Image();
          function createDelegate(contextObject, delegateMethod) {
            return function () {
              return delegateMethod.apply(contextObject, arguments);
            };
          }
          function imgOnLoad() {
            this.onload = null;
            $(el).addClass(classes[2]);
            doUpd(2);
          }
          img.onload = createDelegate(img, imgOnLoad);
          img.src = el.src;
        }
        /* returns the total height and width sum of all elements matching the selector */
        function sizesSum() {
          if (o.advanced.updateOnSelectorChange === true) {
            o.advanced.updateOnSelectorChange = "*";
          }
          var total = 0,
            sel = mCSB_container.find(o.advanced.updateOnSelectorChange);
          if (o.advanced.updateOnSelectorChange && sel.length > 0) {
            sel.each(function () {
              total += this.offsetHeight + this.offsetWidth;
            });
          }
          return total;
        }
        /* calls the update method */
        function doUpd(cb) {
          clearTimeout(mCSB_container[0].autoUpdate);
          methods.update.call(null, $this[0], cb);
        }
      },
      /* -------------------- */

      /* snaps scrolling to a multiple of a pixels number */
      _snapAmount = function (to, amount, offset) {
        return Math.round(to / amount) * amount - offset;
      },
      /* -------------------- */

      /* stops content and scrollbar animations */
      _stop = function (el) {
        var d = el.data(pluginPfx),
          sel = $(
            "#mCSB_" +
              d.idx +
              "_container,#mCSB_" +
              d.idx +
              "_container_wrapper,#mCSB_" +
              d.idx +
              "_dragger_vertical,#mCSB_" +
              d.idx +
              "_dragger_horizontal"
          );
        sel.each(function () {
          _stopTween.call(this);
        });
      },
      /* -------------------- */

      /* 
		ANIMATES CONTENT 
		This is where the actual scrolling happens
		*/
      _scrollTo = function (el, to, options) {
        var d = el.data(pluginPfx),
          o = d.opt,
          defaults = {
            trigger: "internal",
            dir: "y",
            scrollEasing: "mcsEaseOut",
            drag: false,
            dur: o.scrollInertia,
            overwrite: "all",
            callbacks: true,
            onStart: true,
            onUpdate: true,
            onComplete: true,
          },
          options = $.extend(defaults, options),
          dur = [options.dur, options.drag ? 0 : options.dur],
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent(),
          totalScrollOffsets = o.callbacks.onTotalScrollOffset
            ? _arr.call(el, o.callbacks.onTotalScrollOffset)
            : [0, 0],
          totalScrollBackOffsets = o.callbacks.onTotalScrollBackOffset
            ? _arr.call(el, o.callbacks.onTotalScrollBackOffset)
            : [0, 0];
        d.trigger = options.trigger;
        if (wrapper.scrollTop() !== 0 || wrapper.scrollLeft() !== 0) {
          /* always reset scrollTop/Left */
          $(".mCSB_" + d.idx + "_scrollbar").css("visibility", "visible");
          wrapper.scrollTop(0).scrollLeft(0);
        }
        if (to === "_resetY" && !d.contentReset.y) {
          /* callbacks: onOverflowYNone */
          if (_cb("onOverflowYNone")) {
            o.callbacks.onOverflowYNone.call(el[0]);
          }
          d.contentReset.y = 1;
        }
        if (to === "_resetX" && !d.contentReset.x) {
          /* callbacks: onOverflowXNone */
          if (_cb("onOverflowXNone")) {
            o.callbacks.onOverflowXNone.call(el[0]);
          }
          d.contentReset.x = 1;
        }
        if (to === "_resetY" || to === "_resetX") {
          return;
        }
        if ((d.contentReset.y || !el[0].mcs) && d.overflowed[0]) {
          /* callbacks: onOverflowY */
          if (_cb("onOverflowY")) {
            o.callbacks.onOverflowY.call(el[0]);
          }
          d.contentReset.x = null;
        }
        if ((d.contentReset.x || !el[0].mcs) && d.overflowed[1]) {
          /* callbacks: onOverflowX */
          if (_cb("onOverflowX")) {
            o.callbacks.onOverflowX.call(el[0]);
          }
          d.contentReset.x = null;
        }
        if (o.snapAmount) {
          /* scrolling snapping */
          var snapAmount = !(o.snapAmount instanceof Array)
            ? o.snapAmount
            : options.dir === "x"
            ? o.snapAmount[1]
            : o.snapAmount[0];
          to = _snapAmount(to, snapAmount, o.snapOffset);
        }
        switch (options.dir) {
          case "x":
            var mCSB_dragger = $("#mCSB_" + d.idx + "_dragger_horizontal"),
              property = "left",
              contentPos = mCSB_container[0].offsetLeft,
              limit = [
                mCustomScrollBox.width() - mCSB_container.outerWidth(false),
                mCSB_dragger.parent().width() - mCSB_dragger.width(),
              ],
              scrollTo = [to, to === 0 ? 0 : to / d.scrollRatio.x],
              tso = totalScrollOffsets[1],
              tsbo = totalScrollBackOffsets[1],
              totalScrollOffset = tso > 0 ? tso / d.scrollRatio.x : 0,
              totalScrollBackOffset = tsbo > 0 ? tsbo / d.scrollRatio.x : 0;
            break;
          case "y":
            var mCSB_dragger = $("#mCSB_" + d.idx + "_dragger_vertical"),
              property = "top",
              contentPos = mCSB_container[0].offsetTop,
              limit = [
                mCustomScrollBox.height() - mCSB_container.outerHeight(false),
                mCSB_dragger.parent().height() - mCSB_dragger.height(),
              ],
              scrollTo = [to, to === 0 ? 0 : to / d.scrollRatio.y],
              tso = totalScrollOffsets[0],
              tsbo = totalScrollBackOffsets[0],
              totalScrollOffset = tso > 0 ? tso / d.scrollRatio.y : 0,
              totalScrollBackOffset = tsbo > 0 ? tsbo / d.scrollRatio.y : 0;
            break;
        }
        if (scrollTo[1] < 0 || (scrollTo[0] === 0 && scrollTo[1] === 0)) {
          scrollTo = [0, 0];
        } else if (scrollTo[1] >= limit[1]) {
          scrollTo = [limit[0], limit[1]];
        } else {
          scrollTo[0] = -scrollTo[0];
        }
        if (!el[0].mcs) {
          _mcs(); /* init mcs object (once) to make it available before callbacks */
          if (_cb("onInit")) {
            o.callbacks.onInit.call(el[0]);
          } /* callbacks: onInit */
        }
        clearTimeout(mCSB_container[0].onCompleteTimeout);
        _tweenTo(
          mCSB_dragger[0],
          property,
          Math.round(scrollTo[1]),
          dur[1],
          options.scrollEasing
        );
        if (
          !d.tweenRunning &&
          ((contentPos === 0 && scrollTo[0] >= 0) ||
            (contentPos === limit[0] && scrollTo[0] <= limit[0]))
        ) {
          return;
        }
        _tweenTo(
          mCSB_container[0],
          property,
          Math.round(scrollTo[0]),
          dur[0],
          options.scrollEasing,
          options.overwrite,
          {
            onStart: function () {
              if (options.callbacks && options.onStart && !d.tweenRunning) {
                /* callbacks: onScrollStart */
                if (_cb("onScrollStart")) {
                  _mcs();
                  o.callbacks.onScrollStart.call(el[0]);
                }
                d.tweenRunning = true;
                _onDragClasses(mCSB_dragger);
                d.cbOffsets = _cbOffsets();
              }
            },
            onUpdate: function () {
              if (options.callbacks && options.onUpdate) {
                /* callbacks: whileScrolling */
                if (_cb("whileScrolling")) {
                  _mcs();
                  o.callbacks.whileScrolling.call(el[0]);
                }
              }
            },
            onComplete: function () {
              if (options.callbacks && options.onComplete) {
                if (o.axis === "yx") {
                  clearTimeout(mCSB_container[0].onCompleteTimeout);
                }
                var t = mCSB_container[0].idleTimer || 0;
                mCSB_container[0].onCompleteTimeout = setTimeout(function () {
                  /* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
                  if (_cb("onScroll")) {
                    _mcs();
                    o.callbacks.onScroll.call(el[0]);
                  }
                  if (
                    _cb("onTotalScroll") &&
                    scrollTo[1] >= limit[1] - totalScrollOffset &&
                    d.cbOffsets[0]
                  ) {
                    _mcs();
                    o.callbacks.onTotalScroll.call(el[0]);
                  }
                  if (
                    _cb("onTotalScrollBack") &&
                    scrollTo[1] <= totalScrollBackOffset &&
                    d.cbOffsets[1]
                  ) {
                    _mcs();
                    o.callbacks.onTotalScrollBack.call(el[0]);
                  }
                  d.tweenRunning = false;
                  mCSB_container[0].idleTimer = 0;
                  _onDragClasses(mCSB_dragger, "hide");
                }, t);
              }
            },
          }
        );
        /* checks if callback function exists */
        function _cb(cb) {
          return d && o.callbacks[cb] && typeof o.callbacks[cb] === "function";
        }
        /* checks whether callback offsets always trigger */
        function _cbOffsets() {
          return [
            o.callbacks.alwaysTriggerOffsets || contentPos >= limit[0] + tso,
            o.callbacks.alwaysTriggerOffsets || contentPos <= -tsbo,
          ];
        }
        /* 
			populates object with useful values for the user 
			values: 
				content: this.mcs.content
				content top position: this.mcs.top 
				content left position: this.mcs.left 
				dragger top position: this.mcs.draggerTop 
				dragger left position: this.mcs.draggerLeft 
				scrolling y percentage: this.mcs.topPct 
				scrolling x percentage: this.mcs.leftPct 
				scrolling direction: this.mcs.direction
			*/
        function _mcs() {
          var cp = [
              mCSB_container[0].offsetTop,
              mCSB_container[0].offsetLeft,
            ] /* content position */,
            dp = [
              mCSB_dragger[0].offsetTop,
              mCSB_dragger[0].offsetLeft,
            ] /* dragger position */,
            cl = [
              mCSB_container.outerHeight(false),
              mCSB_container.outerWidth(false),
            ] /* content length */,
            pl = [
              mCustomScrollBox.height(),
              mCustomScrollBox.width(),
            ]; /* content parent length */
          el[0].mcs = {
            content:
              mCSB_container /* original content wrapper as jquery object */,
            top: cp[0],
            left: cp[1],
            draggerTop: dp[0],
            draggerLeft: dp[1],
            topPct: Math.round(
              (100 * Math.abs(cp[0])) / (Math.abs(cl[0]) - pl[0])
            ),
            leftPct: Math.round(
              (100 * Math.abs(cp[1])) / (Math.abs(cl[1]) - pl[1])
            ),
            direction: options.dir,
          };
          /* 
				this refers to the original element containing the scrollbar(s)
				usage: this.mcs.top, this.mcs.leftPct etc. 
				*/
        }
      },
      /* -------------------- */

      /* 
		CUSTOM JAVASCRIPT ANIMATION TWEEN 
		Lighter and faster than jquery animate() and css transitions 
		Animates top/left properties and includes easings 
		*/
      _tweenTo = function (
        el,
        prop,
        to,
        duration,
        easing,
        overwrite,
        callbacks
      ) {
        if (!el._mTween) {
          el._mTween = { top: {}, left: {} };
        }
        var callbacks = callbacks || {},
          onStart = callbacks.onStart || function () {},
          onUpdate = callbacks.onUpdate || function () {},
          onComplete = callbacks.onComplete || function () {},
          startTime = _getTime(),
          _delay,
          progress = 0,
          from = el.offsetTop,
          elStyle = el.style,
          _request,
          tobj = el._mTween[prop];
        if (prop === "left") {
          from = el.offsetLeft;
        }
        var diff = to - from;
        tobj.stop = 0;
        if (overwrite !== "none") {
          _cancelTween();
        }
        _startTween();
        function _step() {
          if (tobj.stop) {
            return;
          }
          if (!progress) {
            onStart.call();
          }
          progress = _getTime() - startTime;
          _tween();
          if (progress >= tobj.time) {
            tobj.time =
              progress > tobj.time
                ? progress + _delay - (progress - tobj.time)
                : progress + _delay - 1;
            if (tobj.time < progress + 1) {
              tobj.time = progress + 1;
            }
          }
          if (tobj.time < duration) {
            tobj.id = _request(_step);
          } else {
            onComplete.call();
          }
        }
        function _tween() {
          if (duration > 0) {
            tobj.currVal = _ease(tobj.time, from, diff, duration, easing);
            elStyle[prop] = Math.round(tobj.currVal) + "px";
          } else {
            elStyle[prop] = to + "px";
          }
          onUpdate.call();
        }
        function _startTween() {
          _delay = 1000 / 60;
          tobj.time = progress + _delay;
          _request = !window.requestAnimationFrame
            ? function (f) {
                _tween();
                return setTimeout(f, 0.01);
              }
            : window.requestAnimationFrame;
          tobj.id = _request(_step);
        }
        function _cancelTween() {
          if (tobj.id == null) {
            return;
          }
          if (!window.requestAnimationFrame) {
            clearTimeout(tobj.id);
          } else {
            window.cancelAnimationFrame(tobj.id);
          }
          tobj.id = null;
        }
        function _ease(t, b, c, d, type) {
          switch (type) {
            case "linear":
            case "mcsLinear":
              return (c * t) / d + b;
              break;
            case "mcsLinearOut":
              t /= d;
              t--;
              return c * Math.sqrt(1 - t * t) + b;
              break;
            case "easeInOutSmooth":
              t /= d / 2;
              if (t < 1) return (c / 2) * t * t + b;
              t--;
              return (-c / 2) * (t * (t - 2) - 1) + b;
              break;
            case "easeInOutStrong":
              t /= d / 2;
              if (t < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
              t--;
              return (c / 2) * (-Math.pow(2, -10 * t) + 2) + b;
              break;
            case "easeInOut":
            case "mcsEaseInOut":
              t /= d / 2;
              if (t < 1) return (c / 2) * t * t * t + b;
              t -= 2;
              return (c / 2) * (t * t * t + 2) + b;
              break;
            case "easeOutSmooth":
              t /= d;
              t--;
              return -c * (t * t * t * t - 1) + b;
              break;
            case "easeOutStrong":
              return c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
              break;
            case "easeOut":
            case "mcsEaseOut":
            default:
              var ts = (t /= d) * t,
                tc = ts * t;
              return (
                b +
                c *
                  (0.499999999999997 * tc * ts +
                    -2.5 * ts * ts +
                    5.5 * tc +
                    -6.5 * ts +
                    4 * t)
              );
          }
        }
      },
      /* -------------------- */

      /* returns current time */
      _getTime = function () {
        if (window.performance && window.performance.now) {
          return window.performance.now();
        } else {
          if (window.performance && window.performance.webkitNow) {
            return window.performance.webkitNow();
          } else {
            if (Date.now) {
              return Date.now();
            } else {
              return new Date().getTime();
            }
          }
        }
      },
      /* -------------------- */

      /* stops a tween */
      _stopTween = function () {
        var el = this;
        if (!el._mTween) {
          el._mTween = { top: {}, left: {} };
        }
        var props = ["top", "left"];
        for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          if (el._mTween[prop].id) {
            if (!window.requestAnimationFrame) {
              clearTimeout(el._mTween[prop].id);
            } else {
              window.cancelAnimationFrame(el._mTween[prop].id);
            }
            el._mTween[prop].id = null;
            el._mTween[prop].stop = 1;
          }
        }
      },
      /* -------------------- */

      /* deletes a property (avoiding the exception thrown by IE) */
      _delete = function (c, m) {
        try {
          delete c[m];
        } catch (e) {
          c[m] = null;
        }
      },
      /* -------------------- */

      /* detects left mouse button */
      _mouseBtnLeft = function (e) {
        return !(e.which && e.which !== 1);
      },
      /* -------------------- */

      /* detects if pointer type event is touch */
      _pointerTouch = function (e) {
        var t = e.originalEvent.pointerType;
        return !(t && t !== "touch" && t !== 2);
      },
      /* -------------------- */

      /* checks if value is numeric */
      _isNumeric = function (val) {
        return !isNaN(parseFloat(val)) && isFinite(val);
      },
      /* -------------------- */

      /* returns element position according to content */
      _childPos = function (el) {
        var p = el.parents(".mCSB_container");
        return [
          el.offset().top - p.offset().top,
          el.offset().left - p.offset().left,
        ];
      },
      /* -------------------- */

      /* checks if browser tab is hidden/inactive via Page Visibility API */
      _isTabHidden = function () {
        var prop = _getHiddenProp();
        if (!prop) return false;
        return document[prop];
        function _getHiddenProp() {
          var pfx = ["webkit", "moz", "ms", "o"];
          if ("hidden" in document) return "hidden"; //natively supported
          for (var i = 0; i < pfx.length; i++) {
            //prefixed
            if (pfx[i] + "Hidden" in document) return pfx[i] + "Hidden";
          }
          return null; //not supported
        }
      };
    /* -------------------- */

    /* 
	----------------------------------------
	PLUGIN SETUP 
	----------------------------------------
	*/

    /* plugin constructor functions */
    $.fn[pluginNS] = function (method) {
      /* usage: $(selector).mCustomScrollbar(); */
      if (methods[method]) {
        return methods[method].apply(
          this,
          Array.prototype.slice.call(arguments, 1)
        );
      } else if (typeof method === "object" || !method) {
        return methods.init.apply(this, arguments);
      } else {
        $.error("Method " + method + " does not exist");
      }
    };
    $[pluginNS] = function (method) {
      /* usage: $.mCustomScrollbar(); */
      if (methods[method]) {
        return methods[method].apply(
          this,
          Array.prototype.slice.call(arguments, 1)
        );
      } else if (typeof method === "object" || !method) {
        return methods.init.apply(this, arguments);
      } else {
        $.error("Method " + method + " does not exist");
      }
    };

    /* 
	allow setting plugin default options. 
	usage: $.mCustomScrollbar.defaults.scrollInertia=500; 
	to apply any changed default options on default selectors (below), use inside document ready fn 
	e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
	*/
    $[pluginNS].defaults = defaults;

    /* 
	add window object (window.mCustomScrollbar) 
	usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
	*/
    window[pluginNS] = true;

    $(window).bind("load", function () {
      $(defaultSelector)[
        pluginNS
      ](); /* add scrollbars automatically on default selector */

      /* extend jQuery expressions */
      $.extend($.expr[":"], {
        /* checks if element is within scrollable viewport */
        mcsInView:
          $.expr[":"].mcsInView ||
          function (el) {
            var $el = $(el),
              content = $el.parents(".mCSB_container"),
              wrapper,
              cPos;
            if (!content.length) {
              return;
            }
            wrapper = content.parent();
            cPos = [content[0].offsetTop, content[0].offsetLeft];
            return (
              cPos[0] + _childPos($el)[0] >= 0 &&
              cPos[0] + _childPos($el)[0] <
                wrapper.height() - $el.outerHeight(false) &&
              cPos[1] + _childPos($el)[1] >= 0 &&
              cPos[1] + _childPos($el)[1] <
                wrapper.width() - $el.outerWidth(false)
            );
          },
        /* checks if element or part of element is in view of scrollable viewport */
        mcsInSight:
          $.expr[":"].mcsInSight ||
          function (el, i, m) {
            var $el = $(el),
              elD,
              content = $el.parents(".mCSB_container"),
              wrapperView,
              pos,
              wrapperViewPct,
              pctVals =
                m[3] === "exact"
                  ? [
                      [1, 0],
                      [1, 0],
                    ]
                  : [
                      [0.9, 0.1],
                      [0.6, 0.4],
                    ];
            if (!content.length) {
              return;
            }
            elD = [$el.outerHeight(false), $el.outerWidth(false)];
            pos = [
              content[0].offsetTop + _childPos($el)[0],
              content[0].offsetLeft + _childPos($el)[1],
            ];
            wrapperView = [
              content.parent()[0].offsetHeight,
              content.parent()[0].offsetWidth,
            ];
            wrapperViewPct = [
              elD[0] < wrapperView[0] ? pctVals[0] : pctVals[1],
              elD[1] < wrapperView[1] ? pctVals[0] : pctVals[1],
            ];
            return (
              pos[0] - wrapperView[0] * wrapperViewPct[0][0] < 0 &&
              pos[0] + elD[0] - wrapperView[0] * wrapperViewPct[0][1] >= 0 &&
              pos[1] - wrapperView[1] * wrapperViewPct[1][0] < 0 &&
              pos[1] + elD[1] - wrapperView[1] * wrapperViewPct[1][1] >= 0
            );
          },
        /* checks if element is overflowed having visible scrollbar(s) */
        mcsOverflow:
          $.expr[":"].mcsOverflow ||
          function (el) {
            var d = $(el).data(pluginPfx);
            if (!d) {
              return;
            }
            return d.overflowed[0] || d.overflowed[1];
          },
      });
    });
  });
});
/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 *
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    factory((root.dragscroll = {}));
  }
})(this, function (exports) {
  var _window = window;
  var _document = document;
  var mousemove = "mousemove";
  var mouseup = "mouseup";
  var mousedown = "mousedown";
  var EventListener = "EventListener";
  var addEventListener = "add" + EventListener;
  var removeEventListener = "remove" + EventListener;
  var newScrollX, newScrollY;

  var dragged = [];
  var reset = function (i, el) {
    for (i = 0; i < dragged.length; ) {
      el = dragged[i++];
      el = el.container || el;
      el[removeEventListener](mousedown, el.md, 0);
      _window[removeEventListener](mouseup, el.mu, 0);
      _window[removeEventListener](mousemove, el.mm, 0);
    }

    // cloning into array since HTMLCollection is updated dynamically
    dragged = [].slice.call(_document.getElementsByClassName("dragscroll"));
    for (i = 0; i < dragged.length; ) {
      (function (el, lastClientX, lastClientY, pushed, scroller, cont) {
        (cont = el.container || el)[addEventListener](
          mousedown,
          (cont.md = function (e) {
            if (
              !el.hasAttribute("nochilddrag") ||
              _document.elementFromPoint(e.pageX, e.pageY) == cont
            ) {
              pushed = 1;
              lastClientX = e.clientX;
              lastClientY = e.clientY;

              e.preventDefault();
            }
          }),
          0
        );

        _window[addEventListener](
          mouseup,
          (cont.mu = function () {
            pushed = 0;
          }),
          0
        );

        _window[addEventListener](
          mousemove,
          (cont.mm = function (e) {
            if (pushed) {
              (scroller = el.scroller || el).scrollLeft -= newScrollX =
                -lastClientX + (lastClientX = e.clientX);
              scroller.scrollTop -= newScrollY =
                -lastClientY + (lastClientY = e.clientY);
              if (el == _document.body) {
                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                scroller.scrollTop -= newScrollY;
              }
            }
          }),
          0
        );
      })(dragged[i++]);
    }
  };

  if (_document.readyState == "complete") {
    reset();
  } else {
    _window[addEventListener]("load", reset, 0);
  }

  exports.reset = reset;
});

/*! jQuery UI - v1.12.1 - 2017-08-16
 * http://jqueryui.com
 * Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/draggable.js, widgets/droppable.js, widgets/resizable.js, widgets/selectable.js, widgets/sortable.js, widgets/mouse.js, widgets/slider.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (t) {
  function e(t) {
    for (var e = t.css("visibility"); "inherit" === e; )
      (t = t.parent()), (e = t.css("visibility"));
    return "hidden" !== e;
  }
  (t.ui = t.ui || {}), (t.ui.version = "1.12.1");
  var i = 0,
    s = Array.prototype.slice;
  (t.cleanData = (function (e) {
    return function (i) {
      var s, n, o;
      for (o = 0; null != (n = i[o]); o++)
        try {
          (s = t._data(n, "events")),
            s && s.remove && t(n).triggerHandler("remove");
        } catch (a) {}
      e(i);
    };
  })(t.cleanData)),
    (t.widget = function (e, i, s) {
      var n,
        o,
        a,
        r = {},
        l = e.split(".")[0];
      e = e.split(".")[1];
      var h = l + "-" + e;
      return (
        s || ((s = i), (i = t.Widget)),
        t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))),
        (t.expr[":"][h.toLowerCase()] = function (e) {
          return !!t.data(e, h);
        }),
        (t[l] = t[l] || {}),
        (n = t[l][e]),
        (o = t[l][e] =
          function (t, e) {
            return this._createWidget
              ? (arguments.length && this._createWidget(t, e), void 0)
              : new o(t, e);
          }),
        t.extend(o, n, {
          version: s.version,
          _proto: t.extend({}, s),
          _childConstructors: [],
        }),
        (a = new i()),
        (a.options = t.widget.extend({}, a.options)),
        t.each(s, function (e, s) {
          return t.isFunction(s)
            ? ((r[e] = (function () {
                function t() {
                  return i.prototype[e].apply(this, arguments);
                }
                function n(t) {
                  return i.prototype[e].apply(this, t);
                }
                return function () {
                  var e,
                    i = this._super,
                    o = this._superApply;
                  return (
                    (this._super = t),
                    (this._superApply = n),
                    (e = s.apply(this, arguments)),
                    (this._super = i),
                    (this._superApply = o),
                    e
                  );
                };
              })()),
              void 0)
            : ((r[e] = s), void 0);
        }),
        (o.prototype = t.widget.extend(
          a,
          { widgetEventPrefix: n ? a.widgetEventPrefix || e : e },
          r,
          { constructor: o, namespace: l, widgetName: e, widgetFullName: h }
        )),
        n
          ? (t.each(n._childConstructors, function (e, i) {
              var s = i.prototype;
              t.widget(s.namespace + "." + s.widgetName, o, i._proto);
            }),
            delete n._childConstructors)
          : i._childConstructors.push(o),
        t.widget.bridge(e, o),
        o
      );
    }),
    (t.widget.extend = function (e) {
      for (var i, n, o = s.call(arguments, 1), a = 0, r = o.length; r > a; a++)
        for (i in o[a])
          (n = o[a][i]),
            o[a].hasOwnProperty(i) &&
              void 0 !== n &&
              (e[i] = t.isPlainObject(n)
                ? t.isPlainObject(e[i])
                  ? t.widget.extend({}, e[i], n)
                  : t.widget.extend({}, n)
                : n);
      return e;
    }),
    (t.widget.bridge = function (e, i) {
      var n = i.prototype.widgetFullName || e;
      t.fn[e] = function (o) {
        var a = "string" == typeof o,
          r = s.call(arguments, 1),
          l = this;
        return (
          a
            ? this.length || "instance" !== o
              ? this.each(function () {
                  var i,
                    s = t.data(this, n);
                  return "instance" === o
                    ? ((l = s), !1)
                    : s
                    ? t.isFunction(s[o]) && "_" !== o.charAt(0)
                      ? ((i = s[o].apply(s, r)),
                        i !== s && void 0 !== i
                          ? ((l = i && i.jquery ? l.pushStack(i.get()) : i), !1)
                          : void 0)
                      : t.error(
                          "no such method '" +
                            o +
                            "' for " +
                            e +
                            " widget instance"
                        )
                    : t.error(
                        "cannot call methods on " +
                          e +
                          " prior to initialization; " +
                          "attempted to call method '" +
                          o +
                          "'"
                      );
                })
              : (l = void 0)
            : (r.length && (o = t.widget.extend.apply(null, [o].concat(r))),
              this.each(function () {
                var e = t.data(this, n);
                e
                  ? (e.option(o || {}), e._init && e._init())
                  : t.data(this, n, new i(o, this));
              })),
          l
        );
      };
    }),
    (t.Widget = function () {}),
    (t.Widget._childConstructors = []),
    (t.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { classes: {}, disabled: !1, create: null },
      _createWidget: function (e, s) {
        (s = t(s || this.defaultElement || this)[0]),
          (this.element = t(s)),
          (this.uuid = i++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.bindings = t()),
          (this.hoverable = t()),
          (this.focusable = t()),
          (this.classesElementLookup = {}),
          s !== this &&
            (t.data(s, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (t) {
                t.target === s && this.destroy();
              },
            }),
            (this.document = t(s.style ? s.ownerDocument : s.document || s)),
            (this.window = t(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          (this.options = t.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            e
          )),
          this._create(),
          this.options.disabled &&
            this._setOptionDisabled(this.options.disabled),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: function () {
        return {};
      },
      _getCreateEventData: t.noop,
      _create: t.noop,
      _init: t.noop,
      destroy: function () {
        var e = this;
        this._destroy(),
          t.each(this.classesElementLookup, function (t, i) {
            e._removeClass(i, t);
          }),
          this.element.off(this.eventNamespace).removeData(this.widgetFullName),
          this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
          this.bindings.off(this.eventNamespace);
      },
      _destroy: t.noop,
      widget: function () {
        return this.element;
      },
      option: function (e, i) {
        var s,
          n,
          o,
          a = e;
        if (0 === arguments.length) return t.widget.extend({}, this.options);
        if ("string" == typeof e)
          if (((a = {}), (s = e.split(".")), (e = s.shift()), s.length)) {
            for (
              n = a[e] = t.widget.extend({}, this.options[e]), o = 0;
              s.length - 1 > o;
              o++
            )
              (n[s[o]] = n[s[o]] || {}), (n = n[s[o]]);
            if (((e = s.pop()), 1 === arguments.length))
              return void 0 === n[e] ? null : n[e];
            n[e] = i;
          } else {
            if (1 === arguments.length)
              return void 0 === this.options[e] ? null : this.options[e];
            a[e] = i;
          }
        return this._setOptions(a), this;
      },
      _setOptions: function (t) {
        var e;
        for (e in t) this._setOption(e, t[e]);
        return this;
      },
      _setOption: function (t, e) {
        return (
          "classes" === t && this._setOptionClasses(e),
          (this.options[t] = e),
          "disabled" === t && this._setOptionDisabled(e),
          this
        );
      },
      _setOptionClasses: function (e) {
        var i, s, n;
        for (i in e)
          (n = this.classesElementLookup[i]),
            e[i] !== this.options.classes[i] &&
              n &&
              n.length &&
              ((s = t(n.get())),
              this._removeClass(n, i),
              s.addClass(
                this._classes({ element: s, keys: i, classes: e, add: !0 })
              ));
      },
      _setOptionDisabled: function (t) {
        this._toggleClass(
          this.widget(),
          this.widgetFullName + "-disabled",
          null,
          !!t
        ),
          t &&
            (this._removeClass(this.hoverable, null, "ui-state-hover"),
            this._removeClass(this.focusable, null, "ui-state-focus"));
      },
      enable: function () {
        return this._setOptions({ disabled: !1 });
      },
      disable: function () {
        return this._setOptions({ disabled: !0 });
      },
      _classes: function (e) {
        function i(i, o) {
          var a, r;
          for (r = 0; i.length > r; r++)
            (a = n.classesElementLookup[i[r]] || t()),
              (a = e.add
                ? t(t.unique(a.get().concat(e.element.get())))
                : t(a.not(e.element).get())),
              (n.classesElementLookup[i[r]] = a),
              s.push(i[r]),
              o && e.classes[i[r]] && s.push(e.classes[i[r]]);
        }
        var s = [],
          n = this;
        return (
          (e = t.extend(
            { element: this.element, classes: this.options.classes || {} },
            e
          )),
          this._on(e.element, { remove: "_untrackClassesElement" }),
          e.keys && i(e.keys.match(/\S+/g) || [], !0),
          e.extra && i(e.extra.match(/\S+/g) || []),
          s.join(" ")
        );
      },
      _untrackClassesElement: function (e) {
        var i = this;
        t.each(i.classesElementLookup, function (s, n) {
          -1 !== t.inArray(e.target, n) &&
            (i.classesElementLookup[s] = t(n.not(e.target).get()));
        });
      },
      _removeClass: function (t, e, i) {
        return this._toggleClass(t, e, i, !1);
      },
      _addClass: function (t, e, i) {
        return this._toggleClass(t, e, i, !0);
      },
      _toggleClass: function (t, e, i, s) {
        s = "boolean" == typeof s ? s : i;
        var n = "string" == typeof t || null === t,
          o = {
            extra: n ? e : i,
            keys: n ? t : e,
            element: n ? this.element : t,
            add: s,
          };
        return o.element.toggleClass(this._classes(o), s), this;
      },
      _on: function (e, i, s) {
        var n,
          o = this;
        "boolean" != typeof e && ((s = i), (i = e), (e = !1)),
          s
            ? ((i = n = t(i)), (this.bindings = this.bindings.add(i)))
            : ((s = i), (i = this.element), (n = this.widget())),
          t.each(s, function (s, a) {
            function r() {
              return e ||
                (o.options.disabled !== !0 &&
                  !t(this).hasClass("ui-state-disabled"))
                ? ("string" == typeof a ? o[a] : a).apply(o, arguments)
                : void 0;
            }
            "string" != typeof a &&
              (r.guid = a.guid = a.guid || r.guid || t.guid++);
            var l = s.match(/^([\w:-]*)\s*(.*)$/),
              h = l[1] + o.eventNamespace,
              c = l[2];
            c ? n.on(h, c, r) : i.on(h, r);
          });
      },
      _off: function (e, i) {
        (i =
          (i || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          e.off(i).off(i),
          (this.bindings = t(this.bindings.not(e).get())),
          (this.focusable = t(this.focusable.not(e).get())),
          (this.hoverable = t(this.hoverable.not(e).get()));
      },
      _delay: function (t, e) {
        function i() {
          return ("string" == typeof t ? s[t] : t).apply(s, arguments);
        }
        var s = this;
        return setTimeout(i, e || 0);
      },
      _hoverable: function (e) {
        (this.hoverable = this.hoverable.add(e)),
          this._on(e, {
            mouseenter: function (e) {
              this._addClass(t(e.currentTarget), null, "ui-state-hover");
            },
            mouseleave: function (e) {
              this._removeClass(t(e.currentTarget), null, "ui-state-hover");
            },
          });
      },
      _focusable: function (e) {
        (this.focusable = this.focusable.add(e)),
          this._on(e, {
            focusin: function (e) {
              this._addClass(t(e.currentTarget), null, "ui-state-focus");
            },
            focusout: function (e) {
              this._removeClass(t(e.currentTarget), null, "ui-state-focus");
            },
          });
      },
      _trigger: function (e, i, s) {
        var n,
          o,
          a = this.options[e];
        if (
          ((s = s || {}),
          (i = t.Event(i)),
          (i.type = (
            e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e
          ).toLowerCase()),
          (i.target = this.element[0]),
          (o = i.originalEvent))
        )
          for (n in o) n in i || (i[n] = o[n]);
        return (
          this.element.trigger(i, s),
          !(
            (t.isFunction(a) &&
              a.apply(this.element[0], [i].concat(s)) === !1) ||
            i.isDefaultPrevented()
          )
        );
      },
    }),
    t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
      t.Widget.prototype["_" + e] = function (s, n, o) {
        "string" == typeof n && (n = { effect: n });
        var a,
          r = n ? (n === !0 || "number" == typeof n ? i : n.effect || i) : e;
        (n = n || {}),
          "number" == typeof n && (n = { duration: n }),
          (a = !t.isEmptyObject(n)),
          (n.complete = o),
          n.delay && s.delay(n.delay),
          a && t.effects && t.effects.effect[r]
            ? s[e](n)
            : r !== e && s[r]
            ? s[r](n.duration, n.easing, o)
            : s.queue(function (i) {
                t(this)[e](), o && o.call(s[0]), i();
              });
      };
    }),
    t.widget,
    (function () {
      function e(t, e, i) {
        return [
          parseFloat(t[0]) * (u.test(t[0]) ? e / 100 : 1),
          parseFloat(t[1]) * (u.test(t[1]) ? i / 100 : 1),
        ];
      }
      function i(e, i) {
        return parseInt(t.css(e, i), 10) || 0;
      }
      function s(e) {
        var i = e[0];
        return 9 === i.nodeType
          ? {
              width: e.width(),
              height: e.height(),
              offset: { top: 0, left: 0 },
            }
          : t.isWindow(i)
          ? {
              width: e.width(),
              height: e.height(),
              offset: { top: e.scrollTop(), left: e.scrollLeft() },
            }
          : i.preventDefault
          ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } }
          : {
              width: e.outerWidth(),
              height: e.outerHeight(),
              offset: e.offset(),
            };
      }
      var n,
        o = Math.max,
        a = Math.abs,
        r = /left|center|right/,
        l = /top|center|bottom/,
        h = /[\+\-]\d+(\.[\d]+)?%?/,
        c = /^\w+/,
        u = /%$/,
        d = t.fn.position;
      (t.position = {
        scrollbarWidth: function () {
          if (void 0 !== n) return n;
          var e,
            i,
            s = t(
              "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
            ),
            o = s.children()[0];
          return (
            t("body").append(s),
            (e = o.offsetWidth),
            s.css("overflow", "scroll"),
            (i = o.offsetWidth),
            e === i && (i = s[0].clientWidth),
            s.remove(),
            (n = e - i)
          );
        },
        getScrollInfo: function (e) {
          var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
            s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
            n =
              "scroll" === i ||
              ("auto" === i && e.width < e.element[0].scrollWidth),
            o =
              "scroll" === s ||
              ("auto" === s && e.height < e.element[0].scrollHeight);
          return {
            width: o ? t.position.scrollbarWidth() : 0,
            height: n ? t.position.scrollbarWidth() : 0,
          };
        },
        getWithinInfo: function (e) {
          var i = t(e || window),
            s = t.isWindow(i[0]),
            n = !!i[0] && 9 === i[0].nodeType,
            o = !s && !n;
          return {
            element: i,
            isWindow: s,
            isDocument: n,
            offset: o ? t(e).offset() : { left: 0, top: 0 },
            scrollLeft: i.scrollLeft(),
            scrollTop: i.scrollTop(),
            width: i.outerWidth(),
            height: i.outerHeight(),
          };
        },
      }),
        (t.fn.position = function (n) {
          if (!n || !n.of) return d.apply(this, arguments);
          n = t.extend({}, n);
          var u,
            p,
            f,
            g,
            m,
            _,
            v = t(n.of),
            b = t.position.getWithinInfo(n.within),
            y = t.position.getScrollInfo(b),
            w = (n.collision || "flip").split(" "),
            k = {};
          return (
            (_ = s(v)),
            v[0].preventDefault && (n.at = "left top"),
            (p = _.width),
            (f = _.height),
            (g = _.offset),
            (m = t.extend({}, g)),
            t.each(["my", "at"], function () {
              var t,
                e,
                i = (n[this] || "").split(" ");
              1 === i.length &&
                (i = r.test(i[0])
                  ? i.concat(["center"])
                  : l.test(i[0])
                  ? ["center"].concat(i)
                  : ["center", "center"]),
                (i[0] = r.test(i[0]) ? i[0] : "center"),
                (i[1] = l.test(i[1]) ? i[1] : "center"),
                (t = h.exec(i[0])),
                (e = h.exec(i[1])),
                (k[this] = [t ? t[0] : 0, e ? e[0] : 0]),
                (n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]]);
            }),
            1 === w.length && (w[1] = w[0]),
            "right" === n.at[0]
              ? (m.left += p)
              : "center" === n.at[0] && (m.left += p / 2),
            "bottom" === n.at[1]
              ? (m.top += f)
              : "center" === n.at[1] && (m.top += f / 2),
            (u = e(k.at, p, f)),
            (m.left += u[0]),
            (m.top += u[1]),
            this.each(function () {
              var s,
                r,
                l = t(this),
                h = l.outerWidth(),
                c = l.outerHeight(),
                d = i(this, "marginLeft"),
                _ = i(this, "marginTop"),
                x = h + d + i(this, "marginRight") + y.width,
                C = c + _ + i(this, "marginBottom") + y.height,
                D = t.extend({}, m),
                T = e(k.my, l.outerWidth(), l.outerHeight());
              "right" === n.my[0]
                ? (D.left -= h)
                : "center" === n.my[0] && (D.left -= h / 2),
                "bottom" === n.my[1]
                  ? (D.top -= c)
                  : "center" === n.my[1] && (D.top -= c / 2),
                (D.left += T[0]),
                (D.top += T[1]),
                (s = { marginLeft: d, marginTop: _ }),
                t.each(["left", "top"], function (e, i) {
                  t.ui.position[w[e]] &&
                    t.ui.position[w[e]][i](D, {
                      targetWidth: p,
                      targetHeight: f,
                      elemWidth: h,
                      elemHeight: c,
                      collisionPosition: s,
                      collisionWidth: x,
                      collisionHeight: C,
                      offset: [u[0] + T[0], u[1] + T[1]],
                      my: n.my,
                      at: n.at,
                      within: b,
                      elem: l,
                    });
                }),
                n.using &&
                  (r = function (t) {
                    var e = g.left - D.left,
                      i = e + p - h,
                      s = g.top - D.top,
                      r = s + f - c,
                      u = {
                        target: {
                          element: v,
                          left: g.left,
                          top: g.top,
                          width: p,
                          height: f,
                        },
                        element: {
                          element: l,
                          left: D.left,
                          top: D.top,
                          width: h,
                          height: c,
                        },
                        horizontal: 0 > i ? "left" : e > 0 ? "right" : "center",
                        vertical: 0 > r ? "top" : s > 0 ? "bottom" : "middle",
                      };
                    h > p && p > a(e + i) && (u.horizontal = "center"),
                      c > f && f > a(s + r) && (u.vertical = "middle"),
                      (u.important =
                        o(a(e), a(i)) > o(a(s), a(r))
                          ? "horizontal"
                          : "vertical"),
                      n.using.call(this, t, u);
                  }),
                l.offset(t.extend(D, { using: r }));
            })
          );
        }),
        (t.ui.position = {
          fit: {
            left: function (t, e) {
              var i,
                s = e.within,
                n = s.isWindow ? s.scrollLeft : s.offset.left,
                a = s.width,
                r = t.left - e.collisionPosition.marginLeft,
                l = n - r,
                h = r + e.collisionWidth - a - n;
              e.collisionWidth > a
                ? l > 0 && 0 >= h
                  ? ((i = t.left + l + e.collisionWidth - a - n),
                    (t.left += l - i))
                  : (t.left =
                      h > 0 && 0 >= l
                        ? n
                        : l > h
                        ? n + a - e.collisionWidth
                        : n)
                : l > 0
                ? (t.left += l)
                : h > 0
                ? (t.left -= h)
                : (t.left = o(t.left - r, t.left));
            },
            top: function (t, e) {
              var i,
                s = e.within,
                n = s.isWindow ? s.scrollTop : s.offset.top,
                a = e.within.height,
                r = t.top - e.collisionPosition.marginTop,
                l = n - r,
                h = r + e.collisionHeight - a - n;
              e.collisionHeight > a
                ? l > 0 && 0 >= h
                  ? ((i = t.top + l + e.collisionHeight - a - n),
                    (t.top += l - i))
                  : (t.top =
                      h > 0 && 0 >= l
                        ? n
                        : l > h
                        ? n + a - e.collisionHeight
                        : n)
                : l > 0
                ? (t.top += l)
                : h > 0
                ? (t.top -= h)
                : (t.top = o(t.top - r, t.top));
            },
          },
          flip: {
            left: function (t, e) {
              var i,
                s,
                n = e.within,
                o = n.offset.left + n.scrollLeft,
                r = n.width,
                l = n.isWindow ? n.scrollLeft : n.offset.left,
                h = t.left - e.collisionPosition.marginLeft,
                c = h - l,
                u = h + e.collisionWidth - r - l,
                d =
                  "left" === e.my[0]
                    ? -e.elemWidth
                    : "right" === e.my[0]
                    ? e.elemWidth
                    : 0,
                p =
                  "left" === e.at[0]
                    ? e.targetWidth
                    : "right" === e.at[0]
                    ? -e.targetWidth
                    : 0,
                f = -2 * e.offset[0];
              0 > c
                ? ((i = t.left + d + p + f + e.collisionWidth - r - o),
                  (0 > i || a(c) > i) && (t.left += d + p + f))
                : u > 0 &&
                  ((s =
                    t.left - e.collisionPosition.marginLeft + d + p + f - l),
                  (s > 0 || u > a(s)) && (t.left += d + p + f));
            },
            top: function (t, e) {
              var i,
                s,
                n = e.within,
                o = n.offset.top + n.scrollTop,
                r = n.height,
                l = n.isWindow ? n.scrollTop : n.offset.top,
                h = t.top - e.collisionPosition.marginTop,
                c = h - l,
                u = h + e.collisionHeight - r - l,
                d = "top" === e.my[1],
                p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                f =
                  "top" === e.at[1]
                    ? e.targetHeight
                    : "bottom" === e.at[1]
                    ? -e.targetHeight
                    : 0,
                g = -2 * e.offset[1];
              0 > c
                ? ((s = t.top + p + f + g + e.collisionHeight - r - o),
                  (0 > s || a(c) > s) && (t.top += p + f + g))
                : u > 0 &&
                  ((i = t.top - e.collisionPosition.marginTop + p + f + g - l),
                  (i > 0 || u > a(i)) && (t.top += p + f + g));
            },
          },
          flipfit: {
            left: function () {
              t.ui.position.flip.left.apply(this, arguments),
                t.ui.position.fit.left.apply(this, arguments);
            },
            top: function () {
              t.ui.position.flip.top.apply(this, arguments),
                t.ui.position.fit.top.apply(this, arguments);
            },
          },
        });
    })(),
    t.ui.position,
    t.extend(t.expr[":"], {
      data: t.expr.createPseudo
        ? t.expr.createPseudo(function (e) {
            return function (i) {
              return !!t.data(i, e);
            };
          })
        : function (e, i, s) {
            return !!t.data(e, s[3]);
          },
    }),
    t.fn.extend({
      disableSelection: (function () {
        var t =
          "onselectstart" in document.createElement("div")
            ? "selectstart"
            : "mousedown";
        return function () {
          return this.on(t + ".ui-disableSelection", function (t) {
            t.preventDefault();
          });
        };
      })(),
      enableSelection: function () {
        return this.off(".ui-disableSelection");
      },
    }),
    (t.ui.focusable = function (i, s) {
      var n,
        o,
        a,
        r,
        l,
        h = i.nodeName.toLowerCase();
      return "area" === h
        ? ((n = i.parentNode),
          (o = n.name),
          i.href && o && "map" === n.nodeName.toLowerCase()
            ? ((a = t("img[usemap='#" + o + "']")),
              a.length > 0 && a.is(":visible"))
            : !1)
        : (/^(input|select|textarea|button|object)$/.test(h)
            ? ((r = !i.disabled),
              r && ((l = t(i).closest("fieldset")[0]), l && (r = !l.disabled)))
            : (r = "a" === h ? i.href || s : s),
          r && t(i).is(":visible") && e(t(i)));
    }),
    t.extend(t.expr[":"], {
      focusable: function (e) {
        return t.ui.focusable(e, null != t.attr(e, "tabindex"));
      },
    }),
    t.ui.focusable,
    (t.fn.form = function () {
      return "string" == typeof this[0].form
        ? this.closest("form")
        : t(this[0].form);
    }),
    (t.ui.formResetMixin = {
      _formResetHandler: function () {
        var e = t(this);
        setTimeout(function () {
          var i = e.data("ui-form-reset-instances");
          t.each(i, function () {
            this.refresh();
          });
        });
      },
      _bindFormResetHandler: function () {
        if (((this.form = this.element.form()), this.form.length)) {
          var t = this.form.data("ui-form-reset-instances") || [];
          t.length ||
            this.form.on("reset.ui-form-reset", this._formResetHandler),
            t.push(this),
            this.form.data("ui-form-reset-instances", t);
        }
      },
      _unbindFormResetHandler: function () {
        if (this.form.length) {
          var e = this.form.data("ui-form-reset-instances");
          e.splice(t.inArray(this, e), 1),
            e.length
              ? this.form.data("ui-form-reset-instances", e)
              : this.form
                  .removeData("ui-form-reset-instances")
                  .off("reset.ui-form-reset");
        }
      },
    }),
    "1.7" === t.fn.jquery.substring(0, 3) &&
      (t.each(["Width", "Height"], function (e, i) {
        function s(e, i, s, o) {
          return (
            t.each(n, function () {
              (i -= parseFloat(t.css(e, "padding" + this)) || 0),
                s &&
                  (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0),
                o && (i -= parseFloat(t.css(e, "margin" + this)) || 0);
            }),
            i
          );
        }
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
          o = i.toLowerCase(),
          a = {
            innerWidth: t.fn.innerWidth,
            innerHeight: t.fn.innerHeight,
            outerWidth: t.fn.outerWidth,
            outerHeight: t.fn.outerHeight,
          };
        (t.fn["inner" + i] = function (e) {
          return void 0 === e
            ? a["inner" + i].call(this)
            : this.each(function () {
                t(this).css(o, s(this, e) + "px");
              });
        }),
          (t.fn["outer" + i] = function (e, n) {
            return "number" != typeof e
              ? a["outer" + i].call(this, e)
              : this.each(function () {
                  t(this).css(o, s(this, e, !0, n) + "px");
                });
          });
      }),
      (t.fn.addBack = function (t) {
        return this.add(
          null == t ? this.prevObject : this.prevObject.filter(t)
        );
      })),
    (t.ui.keyCode = {
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
    }),
    (t.ui.escapeSelector = (function () {
      var t = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
      return function (e) {
        return e.replace(t, "\\$1");
      };
    })()),
    (t.fn.labels = function () {
      var e, i, s, n, o;
      return this[0].labels && this[0].labels.length
        ? this.pushStack(this[0].labels)
        : ((n = this.eq(0).parents("label")),
          (s = this.attr("id")),
          s &&
            ((e = this.eq(0).parents().last()),
            (o = e.add(e.length ? e.siblings() : this.siblings())),
            (i = "label[for='" + t.ui.escapeSelector(s) + "']"),
            (n = n.add(o.find(i).addBack(i)))),
          this.pushStack(n));
    }),
    (t.fn.scrollParent = function (e) {
      var i = this.css("position"),
        s = "absolute" === i,
        n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        o = this.parents()
          .filter(function () {
            var e = t(this);
            return s && "static" === e.css("position")
              ? !1
              : n.test(
                  e.css("overflow") + e.css("overflow-y") + e.css("overflow-x")
                );
          })
          .eq(0);
      return "fixed" !== i && o.length
        ? o
        : t(this[0].ownerDocument || document);
    }),
    t.extend(t.expr[":"], {
      tabbable: function (e) {
        var i = t.attr(e, "tabindex"),
          s = null != i;
        return (!s || i >= 0) && t.ui.focusable(e, s);
      },
    }),
    t.fn.extend({
      uniqueId: (function () {
        var t = 0;
        return function () {
          return this.each(function () {
            this.id || (this.id = "ui-id-" + ++t);
          });
        };
      })(),
      removeUniqueId: function () {
        return this.each(function () {
          /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id");
        });
      },
    }),
    (t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
  var n = !1;
  t(document).on("mouseup", function () {
    n = !1;
  }),
    t.widget("ui.mouse", {
      version: "1.12.1",
      options: {
        cancel: "input, textarea, button, select, option",
        distance: 1,
        delay: 0,
      },
      _mouseInit: function () {
        var e = this;
        this.element
          .on("mousedown." + this.widgetName, function (t) {
            return e._mouseDown(t);
          })
          .on("click." + this.widgetName, function (i) {
            return !0 === t.data(i.target, e.widgetName + ".preventClickEvent")
              ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"),
                i.stopImmediatePropagation(),
                !1)
              : void 0;
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.off("." + this.widgetName),
          this._mouseMoveDelegate &&
            this.document
              .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .off("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function (e) {
        if (!n) {
          (this._mouseMoved = !1),
            this._mouseStarted && this._mouseUp(e),
            (this._mouseDownEvent = e);
          var i = this,
            s = 1 === e.which,
            o =
              "string" == typeof this.options.cancel && e.target.nodeName
                ? t(e.target).closest(this.options.cancel).length
                : !1;
          return s && !o && this._mouseCapture(e)
            ? ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  i.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(e) &&
              this._mouseDelayMet(e) &&
              ((this._mouseStarted = this._mouseStart(e) !== !1),
              !this._mouseStarted)
                ? (e.preventDefault(), !0)
                : (!0 ===
                    t.data(e.target, this.widgetName + ".preventClickEvent") &&
                    t.removeData(
                      e.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (t) {
                    return i._mouseMove(t);
                  }),
                  (this._mouseUpDelegate = function (t) {
                    return i._mouseUp(t);
                  }),
                  this.document
                    .on("mousemove." + this.widgetName, this._mouseMoveDelegate)
                    .on("mouseup." + this.widgetName, this._mouseUpDelegate),
                  e.preventDefault(),
                  (n = !0),
                  !0))
            : !0;
        }
      },
      _mouseMove: function (e) {
        if (this._mouseMoved) {
          if (
            t.ui.ie &&
            (!document.documentMode || 9 > document.documentMode) &&
            !e.button
          )
            return this._mouseUp(e);
          if (!e.which)
            if (
              e.originalEvent.altKey ||
              e.originalEvent.ctrlKey ||
              e.originalEvent.metaKey ||
              e.originalEvent.shiftKey
            )
              this.ignoreMissingWhich = !0;
            else if (!this.ignoreMissingWhich) return this._mouseUp(e);
        }
        return (
          (e.which || e.button) && (this._mouseMoved = !0),
          this._mouseStarted
            ? (this._mouseDrag(e), e.preventDefault())
            : (this._mouseDistanceMet(e) &&
                this._mouseDelayMet(e) &&
                ((this._mouseStarted =
                  this._mouseStart(this._mouseDownEvent, e) !== !1),
                this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
              !this._mouseStarted)
        );
      },
      _mouseUp: function (e) {
        this.document
          .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
          .off("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            e.target === this._mouseDownEvent.target &&
              t.data(e.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(e)),
          this._mouseDelayTimer &&
            (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer),
          (this.ignoreMissingWhich = !1),
          (n = !1),
          e.preventDefault();
      },
      _mouseDistanceMet: function (t) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - t.pageX),
            Math.abs(this._mouseDownEvent.pageY - t.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0;
      },
    }),
    (t.ui.plugin = {
      add: function (e, i, s) {
        var n,
          o = t.ui[e].prototype;
        for (n in s)
          (o.plugins[n] = o.plugins[n] || []), o.plugins[n].push([i, s[n]]);
      },
      call: function (t, e, i, s) {
        var n,
          o = t.plugins[e];
        if (
          o &&
          (s ||
            (t.element[0].parentNode &&
              11 !== t.element[0].parentNode.nodeType))
        )
          for (n = 0; o.length > n; n++)
            t.options[o[n][0]] && o[n][1].apply(t.element, i);
      },
    }),
    (t.ui.safeActiveElement = function (t) {
      var e;
      try {
        e = t.activeElement;
      } catch (i) {
        e = t.body;
      }
      return e || (e = t.body), e.nodeName || (e = t.body), e;
    }),
    (t.ui.safeBlur = function (e) {
      e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur");
    }),
    t.widget("ui.draggable", t.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "drag",
      options: {
        addClasses: !0,
        appendTo: "parent",
        axis: !1,
        connectToSortable: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        iframeFix: !1,
        opacity: !1,
        refreshPositions: !1,
        revert: !1,
        revertDuration: 500,
        scope: "default",
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: !1,
        snapMode: "both",
        snapTolerance: 20,
        stack: !1,
        zIndex: !1,
        drag: null,
        start: null,
        stop: null,
      },
      _create: function () {
        "original" === this.options.helper && this._setPositionRelative(),
          this.options.addClasses && this._addClass("ui-draggable"),
          this._setHandleClassName(),
          this._mouseInit();
      },
      _setOption: function (t, e) {
        this._super(t, e),
          "handle" === t &&
            (this._removeHandleClassName(), this._setHandleClassName());
      },
      _destroy: function () {
        return (this.helper || this.element).is(".ui-draggable-dragging")
          ? ((this.destroyOnClear = !0), void 0)
          : (this._removeHandleClassName(), this._mouseDestroy(), void 0);
      },
      _mouseCapture: function (e) {
        var i = this.options;
        return this.helper ||
          i.disabled ||
          t(e.target).closest(".ui-resizable-handle").length > 0
          ? !1
          : ((this.handle = this._getHandle(e)),
            this.handle
              ? (this._blurActiveElement(e),
                this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix),
                !0)
              : !1);
      },
      _blockFrames: function (e) {
        this.iframeBlocks = this.document.find(e).map(function () {
          var e = t(this);
          return t("<div>")
            .css("position", "absolute")
            .appendTo(e.parent())
            .outerWidth(e.outerWidth())
            .outerHeight(e.outerHeight())
            .offset(e.offset())[0];
        });
      },
      _unblockFrames: function () {
        this.iframeBlocks &&
          (this.iframeBlocks.remove(), delete this.iframeBlocks);
      },
      _blurActiveElement: function (e) {
        var i = t.ui.safeActiveElement(this.document[0]),
          s = t(e.target);
        s.closest(i).length || t.ui.safeBlur(i);
      },
      _mouseStart: function (e) {
        var i = this.options;
        return (
          (this.helper = this._createHelper(e)),
          this._addClass(this.helper, "ui-draggable-dragging"),
          this._cacheHelperProportions(),
          t.ui.ddmanager && (t.ui.ddmanager.current = this),
          this._cacheMargins(),
          (this.cssPosition = this.helper.css("position")),
          (this.scrollParent = this.helper.scrollParent(!0)),
          (this.offsetParent = this.helper.offsetParent()),
          (this.hasFixedAncestor =
            this.helper.parents().filter(function () {
              return "fixed" === t(this).css("position");
            }).length > 0),
          (this.positionAbs = this.element.offset()),
          this._refreshOffsets(e),
          (this.originalPosition = this.position =
            this._generatePosition(e, !1)),
          (this.originalPageX = e.pageX),
          (this.originalPageY = e.pageY),
          i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
          this._setContainment(),
          this._trigger("start", e) === !1
            ? (this._clear(), !1)
            : (this._cacheHelperProportions(),
              t.ui.ddmanager &&
                !i.dropBehaviour &&
                t.ui.ddmanager.prepareOffsets(this, e),
              this._mouseDrag(e, !0),
              t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e),
              !0)
        );
      },
      _refreshOffsets: function (t) {
        (this.offset = {
          top: this.positionAbs.top - this.margins.top,
          left: this.positionAbs.left - this.margins.left,
          scroll: !1,
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset(),
        }),
          (this.offset.click = {
            left: t.pageX - this.offset.left,
            top: t.pageY - this.offset.top,
          });
      },
      _mouseDrag: function (e, i) {
        if (
          (this.hasFixedAncestor &&
            (this.offset.parent = this._getParentOffset()),
          (this.position = this._generatePosition(e, !0)),
          (this.positionAbs = this._convertPositionTo("absolute")),
          !i)
        ) {
          var s = this._uiHash();
          if (this._trigger("drag", e, s) === !1)
            return this._mouseUp(new t.Event("mouseup", e)), !1;
          this.position = s.position;
        }
        return (
          (this.helper[0].style.left = this.position.left + "px"),
          (this.helper[0].style.top = this.position.top + "px"),
          t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
          !1
        );
      },
      _mouseStop: function (e) {
        var i = this,
          s = !1;
        return (
          t.ui.ddmanager &&
            !this.options.dropBehaviour &&
            (s = t.ui.ddmanager.drop(this, e)),
          this.dropped && ((s = this.dropped), (this.dropped = !1)),
          ("invalid" === this.options.revert && !s) ||
          ("valid" === this.options.revert && s) ||
          this.options.revert === !0 ||
          (t.isFunction(this.options.revert) &&
            this.options.revert.call(this.element, s))
            ? t(this.helper).animate(
                this.originalPosition,
                parseInt(this.options.revertDuration, 10),
                function () {
                  i._trigger("stop", e) !== !1 && i._clear();
                }
              )
            : this._trigger("stop", e) !== !1 && this._clear(),
          !1
        );
      },
      _mouseUp: function (e) {
        return (
          this._unblockFrames(),
          t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e),
          this.handleElement.is(e.target) && this.element.trigger("focus"),
          t.ui.mouse.prototype._mouseUp.call(this, e)
        );
      },
      cancel: function () {
        return (
          this.helper.is(".ui-draggable-dragging")
            ? this._mouseUp(new t.Event("mouseup", { target: this.element[0] }))
            : this._clear(),
          this
        );
      },
      _getHandle: function (e) {
        return this.options.handle
          ? !!t(e.target).closest(this.element.find(this.options.handle)).length
          : !0;
      },
      _setHandleClassName: function () {
        (this.handleElement = this.options.handle
          ? this.element.find(this.options.handle)
          : this.element),
          this._addClass(this.handleElement, "ui-draggable-handle");
      },
      _removeHandleClassName: function () {
        this._removeClass(this.handleElement, "ui-draggable-handle");
      },
      _createHelper: function (e) {
        var i = this.options,
          s = t.isFunction(i.helper),
          n = s
            ? t(i.helper.apply(this.element[0], [e]))
            : "clone" === i.helper
            ? this.element.clone().removeAttr("id")
            : this.element;
        return (
          n.parents("body").length ||
            n.appendTo(
              "parent" === i.appendTo ? this.element[0].parentNode : i.appendTo
            ),
          s && n[0] === this.element[0] && this._setPositionRelative(),
          n[0] === this.element[0] ||
            /(fixed|absolute)/.test(n.css("position")) ||
            n.css("position", "absolute"),
          n
        );
      },
      _setPositionRelative: function () {
        /^(?:r|a|f)/.test(this.element.css("position")) ||
          (this.element[0].style.position = "relative");
      },
      _adjustOffsetFromHelper: function (e) {
        "string" == typeof e && (e = e.split(" ")),
          t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
          "left" in e && (this.offset.click.left = e.left + this.margins.left),
          "right" in e &&
            (this.offset.click.left =
              this.helperProportions.width - e.right + this.margins.left),
          "top" in e && (this.offset.click.top = e.top + this.margins.top),
          "bottom" in e &&
            (this.offset.click.top =
              this.helperProportions.height - e.bottom + this.margins.top);
      },
      _isRootNode: function (t) {
        return /(html|body)/i.test(t.tagName) || t === this.document[0];
      },
      _getParentOffset: function () {
        var e = this.offsetParent.offset(),
          i = this.document[0];
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== i &&
            t.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((e.left += this.scrollParent.scrollLeft()),
            (e.top += this.scrollParent.scrollTop())),
          this._isRootNode(this.offsetParent[0]) && (e = { top: 0, left: 0 }),
          {
            top:
              e.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              e.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
        var t = this.element.position(),
          e = this._isRootNode(this.scrollParent[0]);
        return {
          top:
            t.top -
            (parseInt(this.helper.css("top"), 10) || 0) +
            (e ? 0 : this.scrollParent.scrollTop()),
          left:
            t.left -
            (parseInt(this.helper.css("left"), 10) || 0) +
            (e ? 0 : this.scrollParent.scrollLeft()),
        };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.element.css("marginLeft"), 10) || 0,
          top: parseInt(this.element.css("marginTop"), 10) || 0,
          right: parseInt(this.element.css("marginRight"), 10) || 0,
          bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var e,
          i,
          s,
          n = this.options,
          o = this.document[0];
        return (
          (this.relativeContainer = null),
          n.containment
            ? "window" === n.containment
              ? ((this.containment = [
                  t(window).scrollLeft() -
                    this.offset.relative.left -
                    this.offset.parent.left,
                  t(window).scrollTop() -
                    this.offset.relative.top -
                    this.offset.parent.top,
                  t(window).scrollLeft() +
                    t(window).width() -
                    this.helperProportions.width -
                    this.margins.left,
                  t(window).scrollTop() +
                    (t(window).height() || o.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top,
                ]),
                void 0)
              : "document" === n.containment
              ? ((this.containment = [
                  0,
                  0,
                  t(o).width() -
                    this.helperProportions.width -
                    this.margins.left,
                  (t(o).height() || o.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top,
                ]),
                void 0)
              : n.containment.constructor === Array
              ? ((this.containment = n.containment), void 0)
              : ("parent" === n.containment &&
                  (n.containment = this.helper[0].parentNode),
                (i = t(n.containment)),
                (s = i[0]),
                s &&
                  ((e = /(scroll|auto)/.test(i.css("overflow"))),
                  (this.containment = [
                    (parseInt(i.css("borderLeftWidth"), 10) || 0) +
                      (parseInt(i.css("paddingLeft"), 10) || 0),
                    (parseInt(i.css("borderTopWidth"), 10) || 0) +
                      (parseInt(i.css("paddingTop"), 10) || 0),
                    (e
                      ? Math.max(s.scrollWidth, s.offsetWidth)
                      : s.offsetWidth) -
                      (parseInt(i.css("borderRightWidth"), 10) || 0) -
                      (parseInt(i.css("paddingRight"), 10) || 0) -
                      this.helperProportions.width -
                      this.margins.left -
                      this.margins.right,
                    (e
                      ? Math.max(s.scrollHeight, s.offsetHeight)
                      : s.offsetHeight) -
                      (parseInt(i.css("borderBottomWidth"), 10) || 0) -
                      (parseInt(i.css("paddingBottom"), 10) || 0) -
                      this.helperProportions.height -
                      this.margins.top -
                      this.margins.bottom,
                  ]),
                  (this.relativeContainer = i)),
                void 0)
            : ((this.containment = null), void 0)
        );
      },
      _convertPositionTo: function (t, e) {
        e || (e = this.position);
        var i = "absolute" === t ? 1 : -1,
          s = this._isRootNode(this.scrollParent[0]);
        return {
          top:
            e.top +
            this.offset.relative.top * i +
            this.offset.parent.top * i -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.top
              : s
              ? 0
              : this.offset.scroll.top) *
              i,
          left:
            e.left +
            this.offset.relative.left * i +
            this.offset.parent.left * i -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.left
              : s
              ? 0
              : this.offset.scroll.left) *
              i,
        };
      },
      _generatePosition: function (t, e) {
        var i,
          s,
          n,
          o,
          a = this.options,
          r = this._isRootNode(this.scrollParent[0]),
          l = t.pageX,
          h = t.pageY;
        return (
          (r && this.offset.scroll) ||
            (this.offset.scroll = {
              top: this.scrollParent.scrollTop(),
              left: this.scrollParent.scrollLeft(),
            }),
          e &&
            (this.containment &&
              (this.relativeContainer
                ? ((s = this.relativeContainer.offset()),
                  (i = [
                    this.containment[0] + s.left,
                    this.containment[1] + s.top,
                    this.containment[2] + s.left,
                    this.containment[3] + s.top,
                  ]))
                : (i = this.containment),
              t.pageX - this.offset.click.left < i[0] &&
                (l = i[0] + this.offset.click.left),
              t.pageY - this.offset.click.top < i[1] &&
                (h = i[1] + this.offset.click.top),
              t.pageX - this.offset.click.left > i[2] &&
                (l = i[2] + this.offset.click.left),
              t.pageY - this.offset.click.top > i[3] &&
                (h = i[3] + this.offset.click.top)),
            a.grid &&
              ((n = a.grid[1]
                ? this.originalPageY +
                  Math.round((h - this.originalPageY) / a.grid[1]) * a.grid[1]
                : this.originalPageY),
              (h = i
                ? n - this.offset.click.top >= i[1] ||
                  n - this.offset.click.top > i[3]
                  ? n
                  : n - this.offset.click.top >= i[1]
                  ? n - a.grid[1]
                  : n + a.grid[1]
                : n),
              (o = a.grid[0]
                ? this.originalPageX +
                  Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0]
                : this.originalPageX),
              (l = i
                ? o - this.offset.click.left >= i[0] ||
                  o - this.offset.click.left > i[2]
                  ? o
                  : o - this.offset.click.left >= i[0]
                  ? o - a.grid[0]
                  : o + a.grid[0]
                : o)),
            "y" === a.axis && (l = this.originalPageX),
            "x" === a.axis && (h = this.originalPageY)),
          {
            top:
              h -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.top
                : r
                ? 0
                : this.offset.scroll.top),
            left:
              l -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.left
                : r
                ? 0
                : this.offset.scroll.left),
          }
        );
      },
      _clear: function () {
        this._removeClass(this.helper, "ui-draggable-dragging"),
          this.helper[0] === this.element[0] ||
            this.cancelHelperRemoval ||
            this.helper.remove(),
          (this.helper = null),
          (this.cancelHelperRemoval = !1),
          this.destroyOnClear && this.destroy();
      },
      _trigger: function (e, i, s) {
        return (
          (s = s || this._uiHash()),
          t.ui.plugin.call(this, e, [i, s, this], !0),
          /^(drag|start|stop)/.test(e) &&
            ((this.positionAbs = this._convertPositionTo("absolute")),
            (s.offset = this.positionAbs)),
          t.Widget.prototype._trigger.call(this, e, i, s)
        );
      },
      plugins: {},
      _uiHash: function () {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs,
        };
      },
    }),
    t.ui.plugin.add("draggable", "connectToSortable", {
      start: function (e, i, s) {
        var n = t.extend({}, i, { item: s.element });
        (s.sortables = []),
          t(s.options.connectToSortable).each(function () {
            var i = t(this).sortable("instance");
            i &&
              !i.options.disabled &&
              (s.sortables.push(i),
              i.refreshPositions(),
              i._trigger("activate", e, n));
          });
      },
      stop: function (e, i, s) {
        var n = t.extend({}, i, { item: s.element });
        (s.cancelHelperRemoval = !1),
          t.each(s.sortables, function () {
            var t = this;
            t.isOver
              ? ((t.isOver = 0),
                (s.cancelHelperRemoval = !0),
                (t.cancelHelperRemoval = !1),
                (t._storedCSS = {
                  position: t.placeholder.css("position"),
                  top: t.placeholder.css("top"),
                  left: t.placeholder.css("left"),
                }),
                t._mouseStop(e),
                (t.options.helper = t.options._helper))
              : ((t.cancelHelperRemoval = !0), t._trigger("deactivate", e, n));
          });
      },
      drag: function (e, i, s) {
        t.each(s.sortables, function () {
          var n = !1,
            o = this;
          (o.positionAbs = s.positionAbs),
            (o.helperProportions = s.helperProportions),
            (o.offset.click = s.offset.click),
            o._intersectsWith(o.containerCache) &&
              ((n = !0),
              t.each(s.sortables, function () {
                return (
                  (this.positionAbs = s.positionAbs),
                  (this.helperProportions = s.helperProportions),
                  (this.offset.click = s.offset.click),
                  this !== o &&
                    this._intersectsWith(this.containerCache) &&
                    t.contains(o.element[0], this.element[0]) &&
                    (n = !1),
                  n
                );
              })),
            n
              ? (o.isOver ||
                  ((o.isOver = 1),
                  (s._parent = i.helper.parent()),
                  (o.currentItem = i.helper
                    .appendTo(o.element)
                    .data("ui-sortable-item", !0)),
                  (o.options._helper = o.options.helper),
                  (o.options.helper = function () {
                    return i.helper[0];
                  }),
                  (e.target = o.currentItem[0]),
                  o._mouseCapture(e, !0),
                  o._mouseStart(e, !0, !0),
                  (o.offset.click.top = s.offset.click.top),
                  (o.offset.click.left = s.offset.click.left),
                  (o.offset.parent.left -=
                    s.offset.parent.left - o.offset.parent.left),
                  (o.offset.parent.top -=
                    s.offset.parent.top - o.offset.parent.top),
                  s._trigger("toSortable", e),
                  (s.dropped = o.element),
                  t.each(s.sortables, function () {
                    this.refreshPositions();
                  }),
                  (s.currentItem = s.element),
                  (o.fromOutside = s)),
                o.currentItem && (o._mouseDrag(e), (i.position = o.position)))
              : o.isOver &&
                ((o.isOver = 0),
                (o.cancelHelperRemoval = !0),
                (o.options._revert = o.options.revert),
                (o.options.revert = !1),
                o._trigger("out", e, o._uiHash(o)),
                o._mouseStop(e, !0),
                (o.options.revert = o.options._revert),
                (o.options.helper = o.options._helper),
                o.placeholder && o.placeholder.remove(),
                i.helper.appendTo(s._parent),
                s._refreshOffsets(e),
                (i.position = s._generatePosition(e, !0)),
                s._trigger("fromSortable", e),
                (s.dropped = !1),
                t.each(s.sortables, function () {
                  this.refreshPositions();
                }));
        });
      },
    }),
    t.ui.plugin.add("draggable", "cursor", {
      start: function (e, i, s) {
        var n = t("body"),
          o = s.options;
        n.css("cursor") && (o._cursor = n.css("cursor")),
          n.css("cursor", o.cursor);
      },
      stop: function (e, i, s) {
        var n = s.options;
        n._cursor && t("body").css("cursor", n._cursor);
      },
    }),
    t.ui.plugin.add("draggable", "opacity", {
      start: function (e, i, s) {
        var n = t(i.helper),
          o = s.options;
        n.css("opacity") && (o._opacity = n.css("opacity")),
          n.css("opacity", o.opacity);
      },
      stop: function (e, i, s) {
        var n = s.options;
        n._opacity && t(i.helper).css("opacity", n._opacity);
      },
    }),
    t.ui.plugin.add("draggable", "scroll", {
      start: function (t, e, i) {
        i.scrollParentNotHidden ||
          (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
          i.scrollParentNotHidden[0] !== i.document[0] &&
            "HTML" !== i.scrollParentNotHidden[0].tagName &&
            (i.overflowOffset = i.scrollParentNotHidden.offset());
      },
      drag: function (e, i, s) {
        var n = s.options,
          o = !1,
          a = s.scrollParentNotHidden[0],
          r = s.document[0];
        a !== r && "HTML" !== a.tagName
          ? ((n.axis && "x" === n.axis) ||
              (s.overflowOffset.top + a.offsetHeight - e.pageY <
              n.scrollSensitivity
                ? (a.scrollTop = o = a.scrollTop + n.scrollSpeed)
                : e.pageY - s.overflowOffset.top < n.scrollSensitivity &&
                  (a.scrollTop = o = a.scrollTop - n.scrollSpeed)),
            (n.axis && "y" === n.axis) ||
              (s.overflowOffset.left + a.offsetWidth - e.pageX <
              n.scrollSensitivity
                ? (a.scrollLeft = o = a.scrollLeft + n.scrollSpeed)
                : e.pageX - s.overflowOffset.left < n.scrollSensitivity &&
                  (a.scrollLeft = o = a.scrollLeft - n.scrollSpeed)))
          : ((n.axis && "x" === n.axis) ||
              (e.pageY - t(r).scrollTop() < n.scrollSensitivity
                ? (o = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed))
                : t(window).height() - (e.pageY - t(r).scrollTop()) <
                    n.scrollSensitivity &&
                  (o = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))),
            (n.axis && "y" === n.axis) ||
              (e.pageX - t(r).scrollLeft() < n.scrollSensitivity
                ? (o = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed))
                : t(window).width() - (e.pageX - t(r).scrollLeft()) <
                    n.scrollSensitivity &&
                  (o = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))),
          o !== !1 &&
            t.ui.ddmanager &&
            !n.dropBehaviour &&
            t.ui.ddmanager.prepareOffsets(s, e);
      },
    }),
    t.ui.plugin.add("draggable", "snap", {
      start: function (e, i, s) {
        var n = s.options;
        (s.snapElements = []),
          t(
            n.snap.constructor !== String
              ? n.snap.items || ":data(ui-draggable)"
              : n.snap
          ).each(function () {
            var e = t(this),
              i = e.offset();
            this !== s.element[0] &&
              s.snapElements.push({
                item: this,
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: i.top,
                left: i.left,
              });
          });
      },
      drag: function (e, i, s) {
        var n,
          o,
          a,
          r,
          l,
          h,
          c,
          u,
          d,
          p,
          f = s.options,
          g = f.snapTolerance,
          m = i.offset.left,
          _ = m + s.helperProportions.width,
          v = i.offset.top,
          b = v + s.helperProportions.height;
        for (d = s.snapElements.length - 1; d >= 0; d--)
          (l = s.snapElements[d].left - s.margins.left),
            (h = l + s.snapElements[d].width),
            (c = s.snapElements[d].top - s.margins.top),
            (u = c + s.snapElements[d].height),
            l - g > _ ||
            m > h + g ||
            c - g > b ||
            v > u + g ||
            !t.contains(
              s.snapElements[d].item.ownerDocument,
              s.snapElements[d].item
            )
              ? (s.snapElements[d].snapping &&
                  s.options.snap.release &&
                  s.options.snap.release.call(
                    s.element,
                    e,
                    t.extend(s._uiHash(), { snapItem: s.snapElements[d].item })
                  ),
                (s.snapElements[d].snapping = !1))
              : ("inner" !== f.snapMode &&
                  ((n = g >= Math.abs(c - b)),
                  (o = g >= Math.abs(u - v)),
                  (a = g >= Math.abs(l - _)),
                  (r = g >= Math.abs(h - m)),
                  n &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: c - s.helperProportions.height,
                      left: 0,
                    }).top),
                  o &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: u,
                      left: 0,
                    }).top),
                  a &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: l - s.helperProportions.width,
                    }).left),
                  r &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: h,
                    }).left)),
                (p = n || o || a || r),
                "outer" !== f.snapMode &&
                  ((n = g >= Math.abs(c - v)),
                  (o = g >= Math.abs(u - b)),
                  (a = g >= Math.abs(l - m)),
                  (r = g >= Math.abs(h - _)),
                  n &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: c,
                      left: 0,
                    }).top),
                  o &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: u - s.helperProportions.height,
                      left: 0,
                    }).top),
                  a &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: l,
                    }).left),
                  r &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: h - s.helperProportions.width,
                    }).left)),
                !s.snapElements[d].snapping &&
                  (n || o || a || r || p) &&
                  s.options.snap.snap &&
                  s.options.snap.snap.call(
                    s.element,
                    e,
                    t.extend(s._uiHash(), { snapItem: s.snapElements[d].item })
                  ),
                (s.snapElements[d].snapping = n || o || a || r || p));
      },
    }),
    t.ui.plugin.add("draggable", "stack", {
      start: function (e, i, s) {
        var n,
          o = s.options,
          a = t.makeArray(t(o.stack)).sort(function (e, i) {
            return (
              (parseInt(t(e).css("zIndex"), 10) || 0) -
              (parseInt(t(i).css("zIndex"), 10) || 0)
            );
          });
        a.length &&
          ((n = parseInt(t(a[0]).css("zIndex"), 10) || 0),
          t(a).each(function (e) {
            t(this).css("zIndex", n + e);
          }),
          this.css("zIndex", n + a.length));
      },
    }),
    t.ui.plugin.add("draggable", "zIndex", {
      start: function (e, i, s) {
        var n = t(i.helper),
          o = s.options;
        n.css("zIndex") && (o._zIndex = n.css("zIndex")),
          n.css("zIndex", o.zIndex);
      },
      stop: function (e, i, s) {
        var n = s.options;
        n._zIndex && t(i.helper).css("zIndex", n._zIndex);
      },
    }),
    t.ui.draggable,
    t.widget("ui.droppable", {
      version: "1.12.1",
      widgetEventPrefix: "drop",
      options: {
        accept: "*",
        addClasses: !0,
        greedy: !1,
        scope: "default",
        tolerance: "intersect",
        activate: null,
        deactivate: null,
        drop: null,
        out: null,
        over: null,
      },
      _create: function () {
        var e,
          i = this.options,
          s = i.accept;
        (this.isover = !1),
          (this.isout = !0),
          (this.accept = t.isFunction(s)
            ? s
            : function (t) {
                return t.is(s);
              }),
          (this.proportions = function () {
            return arguments.length
              ? ((e = arguments[0]), void 0)
              : e
              ? e
              : (e = {
                  width: this.element[0].offsetWidth,
                  height: this.element[0].offsetHeight,
                });
          }),
          this._addToManager(i.scope),
          i.addClasses && this._addClass("ui-droppable");
      },
      _addToManager: function (e) {
        (t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || []),
          t.ui.ddmanager.droppables[e].push(this);
      },
      _splice: function (t) {
        for (var e = 0; t.length > e; e++) t[e] === this && t.splice(e, 1);
      },
      _destroy: function () {
        var e = t.ui.ddmanager.droppables[this.options.scope];
        this._splice(e);
      },
      _setOption: function (e, i) {
        if ("accept" === e)
          this.accept = t.isFunction(i)
            ? i
            : function (t) {
                return t.is(i);
              };
        else if ("scope" === e) {
          var s = t.ui.ddmanager.droppables[this.options.scope];
          this._splice(s), this._addToManager(i);
        }
        this._super(e, i);
      },
      _activate: function (e) {
        var i = t.ui.ddmanager.current;
        this._addActiveClass(), i && this._trigger("activate", e, this.ui(i));
      },
      _deactivate: function (e) {
        var i = t.ui.ddmanager.current;
        this._removeActiveClass(),
          i && this._trigger("deactivate", e, this.ui(i));
      },
      _over: function (e) {
        var i = t.ui.ddmanager.current;
        i &&
          (i.currentItem || i.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], i.currentItem || i.element) &&
          (this._addHoverClass(), this._trigger("over", e, this.ui(i)));
      },
      _out: function (e) {
        var i = t.ui.ddmanager.current;
        i &&
          (i.currentItem || i.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], i.currentItem || i.element) &&
          (this._removeHoverClass(), this._trigger("out", e, this.ui(i)));
      },
      _drop: function (e, i) {
        var s = i || t.ui.ddmanager.current,
          n = !1;
        return s && (s.currentItem || s.element)[0] !== this.element[0]
          ? (this.element
              .find(":data(ui-droppable)")
              .not(".ui-draggable-dragging")
              .each(function () {
                var i = t(this).droppable("instance");
                return i.options.greedy &&
                  !i.options.disabled &&
                  i.options.scope === s.options.scope &&
                  i.accept.call(i.element[0], s.currentItem || s.element) &&
                  o(
                    s,
                    t.extend(i, { offset: i.element.offset() }),
                    i.options.tolerance,
                    e
                  )
                  ? ((n = !0), !1)
                  : void 0;
              }),
            n
              ? !1
              : this.accept.call(this.element[0], s.currentItem || s.element)
              ? (this._removeActiveClass(),
                this._removeHoverClass(),
                this._trigger("drop", e, this.ui(s)),
                this.element)
              : !1)
          : !1;
      },
      ui: function (t) {
        return {
          draggable: t.currentItem || t.element,
          helper: t.helper,
          position: t.position,
          offset: t.positionAbs,
        };
      },
      _addHoverClass: function () {
        this._addClass("ui-droppable-hover");
      },
      _removeHoverClass: function () {
        this._removeClass("ui-droppable-hover");
      },
      _addActiveClass: function () {
        this._addClass("ui-droppable-active");
      },
      _removeActiveClass: function () {
        this._removeClass("ui-droppable-active");
      },
    });
  var o = (t.ui.intersect = (function () {
    function t(t, e, i) {
      return t >= e && e + i > t;
    }
    return function (e, i, s, n) {
      if (!i.offset) return !1;
      var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
        a = (e.positionAbs || e.position.absolute).top + e.margins.top,
        r = o + e.helperProportions.width,
        l = a + e.helperProportions.height,
        h = i.offset.left,
        c = i.offset.top,
        u = h + i.proportions().width,
        d = c + i.proportions().height;
      switch (s) {
        case "fit":
          return o >= h && u >= r && a >= c && d >= l;
        case "intersect":
          return (
            o + e.helperProportions.width / 2 > h &&
            u > r - e.helperProportions.width / 2 &&
            a + e.helperProportions.height / 2 > c &&
            d > l - e.helperProportions.height / 2
          );
        case "pointer":
          return (
            t(n.pageY, c, i.proportions().height) &&
            t(n.pageX, h, i.proportions().width)
          );
        case "touch":
          return (
            ((a >= c && d >= a) || (l >= c && d >= l) || (c > a && l > d)) &&
            ((o >= h && u >= o) || (r >= h && u >= r) || (h > o && r > u))
          );
        default:
          return !1;
      }
    };
  })());
  (t.ui.ddmanager = {
    current: null,
    droppables: { default: [] },
    prepareOffsets: function (e, i) {
      var s,
        n,
        o = t.ui.ddmanager.droppables[e.options.scope] || [],
        a = i ? i.type : null,
        r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
      t: for (s = 0; o.length > s; s++)
        if (
          !(
            o[s].options.disabled ||
            (e &&
              !o[s].accept.call(o[s].element[0], e.currentItem || e.element))
          )
        ) {
          for (n = 0; r.length > n; n++)
            if (r[n] === o[s].element[0]) {
              o[s].proportions().height = 0;
              continue t;
            }
          (o[s].visible = "none" !== o[s].element.css("display")),
            o[s].visible &&
              ("mousedown" === a && o[s]._activate.call(o[s], i),
              (o[s].offset = o[s].element.offset()),
              o[s].proportions({
                width: o[s].element[0].offsetWidth,
                height: o[s].element[0].offsetHeight,
              }));
        }
    },
    drop: function (e, i) {
      var s = !1;
      return (
        t.each(
          (t.ui.ddmanager.droppables[e.options.scope] || []).slice(),
          function () {
            this.options &&
              (!this.options.disabled &&
                this.visible &&
                o(e, this, this.options.tolerance, i) &&
                (s = this._drop.call(this, i) || s),
              !this.options.disabled &&
                this.visible &&
                this.accept.call(this.element[0], e.currentItem || e.element) &&
                ((this.isout = !0),
                (this.isover = !1),
                this._deactivate.call(this, i)));
          }
        ),
        s
      );
    },
    dragStart: function (e, i) {
      e.element.parentsUntil("body").on("scroll.droppable", function () {
        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
      });
    },
    drag: function (e, i) {
      e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i),
        t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
          if (!this.options.disabled && !this.greedyChild && this.visible) {
            var s,
              n,
              a,
              r = o(e, this, this.options.tolerance, i),
              l =
                !r && this.isover
                  ? "isout"
                  : r && !this.isover
                  ? "isover"
                  : null;
            l &&
              (this.options.greedy &&
                ((n = this.options.scope),
                (a = this.element
                  .parents(":data(ui-droppable)")
                  .filter(function () {
                    return t(this).droppable("instance").options.scope === n;
                  })),
                a.length &&
                  ((s = t(a[0]).droppable("instance")),
                  (s.greedyChild = "isover" === l))),
              s &&
                "isover" === l &&
                ((s.isover = !1), (s.isout = !0), s._out.call(s, i)),
              (this[l] = !0),
              (this["isout" === l ? "isover" : "isout"] = !1),
              this["isover" === l ? "_over" : "_out"].call(this, i),
              s &&
                "isout" === l &&
                ((s.isout = !1), (s.isover = !0), s._over.call(s, i)));
          }
        });
    },
    dragStop: function (e, i) {
      e.element.parentsUntil("body").off("scroll.droppable"),
        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
    },
  }),
    t.uiBackCompat !== !1 &&
      t.widget("ui.droppable", t.ui.droppable, {
        options: { hoverClass: !1, activeClass: !1 },
        _addActiveClass: function () {
          this._super(),
            this.options.activeClass &&
              this.element.addClass(this.options.activeClass);
        },
        _removeActiveClass: function () {
          this._super(),
            this.options.activeClass &&
              this.element.removeClass(this.options.activeClass);
        },
        _addHoverClass: function () {
          this._super(),
            this.options.hoverClass &&
              this.element.addClass(this.options.hoverClass);
        },
        _removeHoverClass: function () {
          this._super(),
            this.options.hoverClass &&
              this.element.removeClass(this.options.hoverClass);
        },
      }),
    t.ui.droppable,
    t.widget("ui.resizable", t.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "resize",
      options: {
        alsoResize: !1,
        animate: !1,
        animateDuration: "slow",
        animateEasing: "swing",
        aspectRatio: !1,
        autoHide: !1,
        classes: { "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se" },
        containment: !1,
        ghost: !1,
        grid: !1,
        handles: "e,s,se",
        helper: !1,
        maxHeight: null,
        maxWidth: null,
        minHeight: 10,
        minWidth: 10,
        zIndex: 90,
        resize: null,
        start: null,
        stop: null,
      },
      _num: function (t) {
        return parseFloat(t) || 0;
      },
      _isNumber: function (t) {
        return !isNaN(parseFloat(t));
      },
      _hasScroll: function (e, i) {
        if ("hidden" === t(e).css("overflow")) return !1;
        var s = i && "left" === i ? "scrollLeft" : "scrollTop",
          n = !1;
        return e[s] > 0 ? !0 : ((e[s] = 1), (n = e[s] > 0), (e[s] = 0), n);
      },
      _create: function () {
        var e,
          i = this.options,
          s = this;
        this._addClass("ui-resizable"),
          t.extend(this, {
            _aspectRatio: !!i.aspectRatio,
            aspectRatio: i.aspectRatio,
            originalElement: this.element,
            _proportionallyResizeElements: [],
            _helper:
              i.helper || i.ghost || i.animate
                ? i.helper || "ui-resizable-helper"
                : null,
          }),
          this.element[0].nodeName.match(
            /^(canvas|textarea|input|select|button|img)$/i
          ) &&
            (this.element.wrap(
              t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css(
                {
                  position: this.element.css("position"),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css("top"),
                  left: this.element.css("left"),
                }
              )
            ),
            (this.element = this.element
              .parent()
              .data("ui-resizable", this.element.resizable("instance"))),
            (this.elementIsWrapper = !0),
            (e = {
              marginTop: this.originalElement.css("marginTop"),
              marginRight: this.originalElement.css("marginRight"),
              marginBottom: this.originalElement.css("marginBottom"),
              marginLeft: this.originalElement.css("marginLeft"),
            }),
            this.element.css(e),
            this.originalElement.css("margin", 0),
            (this.originalResizeStyle = this.originalElement.css("resize")),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(
              this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block",
              })
            ),
            this.originalElement.css(e),
            this._proportionallyResize()),
          this._setupHandles(),
          i.autoHide &&
            t(this.element)
              .on("mouseenter", function () {
                i.disabled ||
                  (s._removeClass("ui-resizable-autohide"), s._handles.show());
              })
              .on("mouseleave", function () {
                i.disabled ||
                  s.resizing ||
                  (s._addClass("ui-resizable-autohide"), s._handles.hide());
              }),
          this._mouseInit();
      },
      _destroy: function () {
        this._mouseDestroy();
        var e,
          i = function (e) {
            t(e)
              .removeData("resizable")
              .removeData("ui-resizable")
              .off(".resizable")
              .find(".ui-resizable-handle")
              .remove();
          };
        return (
          this.elementIsWrapper &&
            (i(this.element),
            (e = this.element),
            this.originalElement
              .css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left"),
              })
              .insertAfter(e),
            e.remove()),
          this.originalElement.css("resize", this.originalResizeStyle),
          i(this.originalElement),
          this
        );
      },
      _setOption: function (t, e) {
        switch ((this._super(t, e), t)) {
          case "handles":
            this._removeHandles(), this._setupHandles();
            break;
          default:
        }
      },
      _setupHandles: function () {
        var e,
          i,
          s,
          n,
          o,
          a = this.options,
          r = this;
        if (
          ((this.handles =
            a.handles ||
            (t(".ui-resizable-handle", this.element).length
              ? {
                  n: ".ui-resizable-n",
                  e: ".ui-resizable-e",
                  s: ".ui-resizable-s",
                  w: ".ui-resizable-w",
                  se: ".ui-resizable-se",
                  sw: ".ui-resizable-sw",
                  ne: ".ui-resizable-ne",
                  nw: ".ui-resizable-nw",
                }
              : "e,s,se")),
          (this._handles = t()),
          this.handles.constructor === String)
        )
          for (
            "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
              s = this.handles.split(","),
              this.handles = {},
              i = 0;
            s.length > i;
            i++
          )
            (e = t.trim(s[i])),
              (n = "ui-resizable-" + e),
              (o = t("<div>")),
              this._addClass(o, "ui-resizable-handle " + n),
              o.css({ zIndex: a.zIndex }),
              (this.handles[e] = ".ui-resizable-" + e),
              this.element.append(o);
        (this._renderAxis = function (e) {
          var i, s, n, o;
          e = e || this.element;
          for (i in this.handles)
            this.handles[i].constructor === String
              ? (this.handles[i] = this.element
                  .children(this.handles[i])
                  .first()
                  .show())
              : (this.handles[i].jquery || this.handles[i].nodeType) &&
                ((this.handles[i] = t(this.handles[i])),
                this._on(this.handles[i], { mousedown: r._mouseDown })),
              this.elementIsWrapper &&
                this.originalElement[0].nodeName.match(
                  /^(textarea|input|select|button)$/i
                ) &&
                ((s = t(this.handles[i], this.element)),
                (o = /sw|ne|nw|se|n|s/.test(i)
                  ? s.outerHeight()
                  : s.outerWidth()),
                (n = [
                  "padding",
                  /ne|nw|n/.test(i)
                    ? "Top"
                    : /se|sw|s/.test(i)
                    ? "Bottom"
                    : /^e$/.test(i)
                    ? "Right"
                    : "Left",
                ].join("")),
                e.css(n, o),
                this._proportionallyResize()),
              (this._handles = this._handles.add(this.handles[i]));
        }),
          this._renderAxis(this.element),
          (this._handles = this._handles.add(
            this.element.find(".ui-resizable-handle")
          )),
          this._handles.disableSelection(),
          this._handles.on("mouseover", function () {
            r.resizing ||
              (this.className &&
                (o = this.className.match(
                  /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i
                )),
              (r.axis = o && o[1] ? o[1] : "se"));
          }),
          a.autoHide &&
            (this._handles.hide(), this._addClass("ui-resizable-autohide"));
      },
      _removeHandles: function () {
        this._handles.remove();
      },
      _mouseCapture: function (e) {
        var i,
          s,
          n = !1;
        for (i in this.handles)
          (s = t(this.handles[i])[0]),
            (s === e.target || t.contains(s, e.target)) && (n = !0);
        return !this.options.disabled && n;
      },
      _mouseStart: function (e) {
        var i,
          s,
          n,
          o = this.options,
          a = this.element;
        return (
          (this.resizing = !0),
          this._renderProxy(),
          (i = this._num(this.helper.css("left"))),
          (s = this._num(this.helper.css("top"))),
          o.containment &&
            ((i += t(o.containment).scrollLeft() || 0),
            (s += t(o.containment).scrollTop() || 0)),
          (this.offset = this.helper.offset()),
          (this.position = { left: i, top: s }),
          (this.size = this._helper
            ? { width: this.helper.width(), height: this.helper.height() }
            : { width: a.width(), height: a.height() }),
          (this.originalSize = this._helper
            ? { width: a.outerWidth(), height: a.outerHeight() }
            : { width: a.width(), height: a.height() }),
          (this.sizeDiff = {
            width: a.outerWidth() - a.width(),
            height: a.outerHeight() - a.height(),
          }),
          (this.originalPosition = { left: i, top: s }),
          (this.originalMousePosition = { left: e.pageX, top: e.pageY }),
          (this.aspectRatio =
            "number" == typeof o.aspectRatio
              ? o.aspectRatio
              : this.originalSize.width / this.originalSize.height || 1),
          (n = t(".ui-resizable-" + this.axis).css("cursor")),
          t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n),
          this._addClass("ui-resizable-resizing"),
          this._propagate("start", e),
          !0
        );
      },
      _mouseDrag: function (e) {
        var i,
          s,
          n = this.originalMousePosition,
          o = this.axis,
          a = e.pageX - n.left || 0,
          r = e.pageY - n.top || 0,
          l = this._change[o];
        return (
          this._updatePrevProperties(),
          l
            ? ((i = l.apply(this, [e, a, r])),
              this._updateVirtualBoundaries(e.shiftKey),
              (this._aspectRatio || e.shiftKey) &&
                (i = this._updateRatio(i, e)),
              (i = this._respectSize(i, e)),
              this._updateCache(i),
              this._propagate("resize", e),
              (s = this._applyChanges()),
              !this._helper &&
                this._proportionallyResizeElements.length &&
                this._proportionallyResize(),
              t.isEmptyObject(s) ||
                (this._updatePrevProperties(),
                this._trigger("resize", e, this.ui()),
                this._applyChanges()),
              !1)
            : !1
        );
      },
      _mouseStop: function (e) {
        this.resizing = !1;
        var i,
          s,
          n,
          o,
          a,
          r,
          l,
          h = this.options,
          c = this;
        return (
          this._helper &&
            ((i = this._proportionallyResizeElements),
            (s = i.length && /textarea/i.test(i[0].nodeName)),
            (n = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height),
            (o = s ? 0 : c.sizeDiff.width),
            (a = {
              width: c.helper.width() - o,
              height: c.helper.height() - n,
            }),
            (r =
              parseFloat(c.element.css("left")) +
                (c.position.left - c.originalPosition.left) || null),
            (l =
              parseFloat(c.element.css("top")) +
                (c.position.top - c.originalPosition.top) || null),
            h.animate || this.element.css(t.extend(a, { top: l, left: r })),
            c.helper.height(c.size.height),
            c.helper.width(c.size.width),
            this._helper && !h.animate && this._proportionallyResize()),
          t("body").css("cursor", "auto"),
          this._removeClass("ui-resizable-resizing"),
          this._propagate("stop", e),
          this._helper && this.helper.remove(),
          !1
        );
      },
      _updatePrevProperties: function () {
        (this.prevPosition = {
          top: this.position.top,
          left: this.position.left,
        }),
          (this.prevSize = {
            width: this.size.width,
            height: this.size.height,
          });
      },
      _applyChanges: function () {
        var t = {};
        return (
          this.position.top !== this.prevPosition.top &&
            (t.top = this.position.top + "px"),
          this.position.left !== this.prevPosition.left &&
            (t.left = this.position.left + "px"),
          this.size.width !== this.prevSize.width &&
            (t.width = this.size.width + "px"),
          this.size.height !== this.prevSize.height &&
            (t.height = this.size.height + "px"),
          this.helper.css(t),
          t
        );
      },
      _updateVirtualBoundaries: function (t) {
        var e,
          i,
          s,
          n,
          o,
          a = this.options;
        (o = {
          minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0,
          maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0,
          minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0,
          maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0,
        }),
          (this._aspectRatio || t) &&
            ((e = o.minHeight * this.aspectRatio),
            (s = o.minWidth / this.aspectRatio),
            (i = o.maxHeight * this.aspectRatio),
            (n = o.maxWidth / this.aspectRatio),
            e > o.minWidth && (o.minWidth = e),
            s > o.minHeight && (o.minHeight = s),
            o.maxWidth > i && (o.maxWidth = i),
            o.maxHeight > n && (o.maxHeight = n)),
          (this._vBoundaries = o);
      },
      _updateCache: function (t) {
        (this.offset = this.helper.offset()),
          this._isNumber(t.left) && (this.position.left = t.left),
          this._isNumber(t.top) && (this.position.top = t.top),
          this._isNumber(t.height) && (this.size.height = t.height),
          this._isNumber(t.width) && (this.size.width = t.width);
      },
      _updateRatio: function (t) {
        var e = this.position,
          i = this.size,
          s = this.axis;
        return (
          this._isNumber(t.height)
            ? (t.width = t.height * this.aspectRatio)
            : this._isNumber(t.width) &&
              (t.height = t.width / this.aspectRatio),
          "sw" === s &&
            ((t.left = e.left + (i.width - t.width)), (t.top = null)),
          "nw" === s &&
            ((t.top = e.top + (i.height - t.height)),
            (t.left = e.left + (i.width - t.width))),
          t
        );
      },
      _respectSize: function (t) {
        var e = this._vBoundaries,
          i = this.axis,
          s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
          n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
          o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
          a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
          r = this.originalPosition.left + this.originalSize.width,
          l = this.originalPosition.top + this.originalSize.height,
          h = /sw|nw|w/.test(i),
          c = /nw|ne|n/.test(i);
        return (
          o && (t.width = e.minWidth),
          a && (t.height = e.minHeight),
          s && (t.width = e.maxWidth),
          n && (t.height = e.maxHeight),
          o && h && (t.left = r - e.minWidth),
          s && h && (t.left = r - e.maxWidth),
          a && c && (t.top = l - e.minHeight),
          n && c && (t.top = l - e.maxHeight),
          t.width || t.height || t.left || !t.top
            ? t.width || t.height || t.top || !t.left || (t.left = null)
            : (t.top = null),
          t
        );
      },
      _getPaddingPlusBorderDimensions: function (t) {
        for (
          var e = 0,
            i = [],
            s = [
              t.css("borderTopWidth"),
              t.css("borderRightWidth"),
              t.css("borderBottomWidth"),
              t.css("borderLeftWidth"),
            ],
            n = [
              t.css("paddingTop"),
              t.css("paddingRight"),
              t.css("paddingBottom"),
              t.css("paddingLeft"),
            ];
          4 > e;
          e++
        )
          (i[e] = parseFloat(s[e]) || 0), (i[e] += parseFloat(n[e]) || 0);
        return { height: i[0] + i[2], width: i[1] + i[3] };
      },
      _proportionallyResize: function () {
        if (this._proportionallyResizeElements.length)
          for (
            var t, e = 0, i = this.helper || this.element;
            this._proportionallyResizeElements.length > e;
            e++
          )
            (t = this._proportionallyResizeElements[e]),
              this.outerDimensions ||
                (this.outerDimensions =
                  this._getPaddingPlusBorderDimensions(t)),
              t.css({
                height: i.height() - this.outerDimensions.height || 0,
                width: i.width() - this.outerDimensions.width || 0,
              });
      },
      _renderProxy: function () {
        var e = this.element,
          i = this.options;
        (this.elementOffset = e.offset()),
          this._helper
            ? ((this.helper =
                this.helper || t("<div style='overflow:hidden;'></div>")),
              this._addClass(this.helper, this._helper),
              this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex,
              }),
              this.helper.appendTo("body").disableSelection())
            : (this.helper = this.element);
      },
      _change: {
        e: function (t, e) {
          return { width: this.originalSize.width + e };
        },
        w: function (t, e) {
          var i = this.originalSize,
            s = this.originalPosition;
          return { left: s.left + e, width: i.width - e };
        },
        n: function (t, e, i) {
          var s = this.originalSize,
            n = this.originalPosition;
          return { top: n.top + i, height: s.height - i };
        },
        s: function (t, e, i) {
          return { height: this.originalSize.height + i };
        },
        se: function (e, i, s) {
          return t.extend(
            this._change.s.apply(this, arguments),
            this._change.e.apply(this, [e, i, s])
          );
        },
        sw: function (e, i, s) {
          return t.extend(
            this._change.s.apply(this, arguments),
            this._change.w.apply(this, [e, i, s])
          );
        },
        ne: function (e, i, s) {
          return t.extend(
            this._change.n.apply(this, arguments),
            this._change.e.apply(this, [e, i, s])
          );
        },
        nw: function (e, i, s) {
          return t.extend(
            this._change.n.apply(this, arguments),
            this._change.w.apply(this, [e, i, s])
          );
        },
      },
      _propagate: function (e, i) {
        t.ui.plugin.call(this, e, [i, this.ui()]),
          "resize" !== e && this._trigger(e, i, this.ui());
      },
      plugins: {},
      ui: function () {
        return {
          originalElement: this.originalElement,
          element: this.element,
          helper: this.helper,
          position: this.position,
          size: this.size,
          originalSize: this.originalSize,
          originalPosition: this.originalPosition,
        };
      },
    }),
    t.ui.plugin.add("resizable", "animate", {
      stop: function (e) {
        var i = t(this).resizable("instance"),
          s = i.options,
          n = i._proportionallyResizeElements,
          o = n.length && /textarea/i.test(n[0].nodeName),
          a = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
          r = o ? 0 : i.sizeDiff.width,
          l = { width: i.size.width - r, height: i.size.height - a },
          h =
            parseFloat(i.element.css("left")) +
              (i.position.left - i.originalPosition.left) || null,
          c =
            parseFloat(i.element.css("top")) +
              (i.position.top - i.originalPosition.top) || null;
        i.element.animate(t.extend(l, c && h ? { top: c, left: h } : {}), {
          duration: s.animateDuration,
          easing: s.animateEasing,
          step: function () {
            var s = {
              width: parseFloat(i.element.css("width")),
              height: parseFloat(i.element.css("height")),
              top: parseFloat(i.element.css("top")),
              left: parseFloat(i.element.css("left")),
            };
            n && n.length && t(n[0]).css({ width: s.width, height: s.height }),
              i._updateCache(s),
              i._propagate("resize", e);
          },
        });
      },
    }),
    t.ui.plugin.add("resizable", "containment", {
      start: function () {
        var e,
          i,
          s,
          n,
          o,
          a,
          r,
          l = t(this).resizable("instance"),
          h = l.options,
          c = l.element,
          u = h.containment,
          d =
            u instanceof t
              ? u.get(0)
              : /parent/.test(u)
              ? c.parent().get(0)
              : u;
        d &&
          ((l.containerElement = t(d)),
          /document/.test(u) || u === document
            ? ((l.containerOffset = { left: 0, top: 0 }),
              (l.containerPosition = { left: 0, top: 0 }),
              (l.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height:
                  t(document).height() || document.body.parentNode.scrollHeight,
              }))
            : ((e = t(d)),
              (i = []),
              t(["Top", "Right", "Left", "Bottom"]).each(function (t, s) {
                i[t] = l._num(e.css("padding" + s));
              }),
              (l.containerOffset = e.offset()),
              (l.containerPosition = e.position()),
              (l.containerSize = {
                height: e.innerHeight() - i[3],
                width: e.innerWidth() - i[1],
              }),
              (s = l.containerOffset),
              (n = l.containerSize.height),
              (o = l.containerSize.width),
              (a = l._hasScroll(d, "left") ? d.scrollWidth : o),
              (r = l._hasScroll(d) ? d.scrollHeight : n),
              (l.parentData = {
                element: d,
                left: s.left,
                top: s.top,
                width: a,
                height: r,
              })));
      },
      resize: function (e) {
        var i,
          s,
          n,
          o,
          a = t(this).resizable("instance"),
          r = a.options,
          l = a.containerOffset,
          h = a.position,
          c = a._aspectRatio || e.shiftKey,
          u = { top: 0, left: 0 },
          d = a.containerElement,
          p = !0;
        d[0] !== document && /static/.test(d.css("position")) && (u = l),
          h.left < (a._helper ? l.left : 0) &&
            ((a.size.width =
              a.size.width +
              (a._helper
                ? a.position.left - l.left
                : a.position.left - u.left)),
            c && ((a.size.height = a.size.width / a.aspectRatio), (p = !1)),
            (a.position.left = r.helper ? l.left : 0)),
          h.top < (a._helper ? l.top : 0) &&
            ((a.size.height =
              a.size.height +
              (a._helper ? a.position.top - l.top : a.position.top)),
            c && ((a.size.width = a.size.height * a.aspectRatio), (p = !1)),
            (a.position.top = a._helper ? l.top : 0)),
          (n = a.containerElement.get(0) === a.element.parent().get(0)),
          (o = /relative|absolute/.test(a.containerElement.css("position"))),
          n && o
            ? ((a.offset.left = a.parentData.left + a.position.left),
              (a.offset.top = a.parentData.top + a.position.top))
            : ((a.offset.left = a.element.offset().left),
              (a.offset.top = a.element.offset().top)),
          (i = Math.abs(
            a.sizeDiff.width +
              (a._helper ? a.offset.left - u.left : a.offset.left - l.left)
          )),
          (s = Math.abs(
            a.sizeDiff.height +
              (a._helper ? a.offset.top - u.top : a.offset.top - l.top)
          )),
          i + a.size.width >= a.parentData.width &&
            ((a.size.width = a.parentData.width - i),
            c && ((a.size.height = a.size.width / a.aspectRatio), (p = !1))),
          s + a.size.height >= a.parentData.height &&
            ((a.size.height = a.parentData.height - s),
            c && ((a.size.width = a.size.height * a.aspectRatio), (p = !1))),
          p ||
            ((a.position.left = a.prevPosition.left),
            (a.position.top = a.prevPosition.top),
            (a.size.width = a.prevSize.width),
            (a.size.height = a.prevSize.height));
      },
      stop: function () {
        var e = t(this).resizable("instance"),
          i = e.options,
          s = e.containerOffset,
          n = e.containerPosition,
          o = e.containerElement,
          a = t(e.helper),
          r = a.offset(),
          l = a.outerWidth() - e.sizeDiff.width,
          h = a.outerHeight() - e.sizeDiff.height;
        e._helper &&
          !i.animate &&
          /relative/.test(o.css("position")) &&
          t(this).css({ left: r.left - n.left - s.left, width: l, height: h }),
          e._helper &&
            !i.animate &&
            /static/.test(o.css("position")) &&
            t(this).css({
              left: r.left - n.left - s.left,
              width: l,
              height: h,
            });
      },
    }),
    t.ui.plugin.add("resizable", "alsoResize", {
      start: function () {
        var e = t(this).resizable("instance"),
          i = e.options;
        t(i.alsoResize).each(function () {
          var e = t(this);
          e.data("ui-resizable-alsoresize", {
            width: parseFloat(e.width()),
            height: parseFloat(e.height()),
            left: parseFloat(e.css("left")),
            top: parseFloat(e.css("top")),
          });
        });
      },
      resize: function (e, i) {
        var s = t(this).resizable("instance"),
          n = s.options,
          o = s.originalSize,
          a = s.originalPosition,
          r = {
            height: s.size.height - o.height || 0,
            width: s.size.width - o.width || 0,
            top: s.position.top - a.top || 0,
            left: s.position.left - a.left || 0,
          };
        t(n.alsoResize).each(function () {
          var e = t(this),
            s = t(this).data("ui-resizable-alsoresize"),
            n = {},
            o = e.parents(i.originalElement[0]).length
              ? ["width", "height"]
              : ["width", "height", "top", "left"];
          t.each(o, function (t, e) {
            var i = (s[e] || 0) + (r[e] || 0);
            i && i >= 0 && (n[e] = i || null);
          }),
            e.css(n);
        });
      },
      stop: function () {
        t(this).removeData("ui-resizable-alsoresize");
      },
    }),
    t.ui.plugin.add("resizable", "ghost", {
      start: function () {
        var e = t(this).resizable("instance"),
          i = e.size;
        (e.ghost = e.originalElement.clone()),
          e.ghost.css({
            opacity: 0.25,
            display: "block",
            position: "relative",
            height: i.height,
            width: i.width,
            margin: 0,
            left: 0,
            top: 0,
          }),
          e._addClass(e.ghost, "ui-resizable-ghost"),
          t.uiBackCompat !== !1 &&
            "string" == typeof e.options.ghost &&
            e.ghost.addClass(this.options.ghost),
          e.ghost.appendTo(e.helper);
      },
      resize: function () {
        var e = t(this).resizable("instance");
        e.ghost &&
          e.ghost.css({
            position: "relative",
            height: e.size.height,
            width: e.size.width,
          });
      },
      stop: function () {
        var e = t(this).resizable("instance");
        e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0));
      },
    }),
    t.ui.plugin.add("resizable", "grid", {
      resize: function () {
        var e,
          i = t(this).resizable("instance"),
          s = i.options,
          n = i.size,
          o = i.originalSize,
          a = i.originalPosition,
          r = i.axis,
          l = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
          h = l[0] || 1,
          c = l[1] || 1,
          u = Math.round((n.width - o.width) / h) * h,
          d = Math.round((n.height - o.height) / c) * c,
          p = o.width + u,
          f = o.height + d,
          g = s.maxWidth && p > s.maxWidth,
          m = s.maxHeight && f > s.maxHeight,
          _ = s.minWidth && s.minWidth > p,
          v = s.minHeight && s.minHeight > f;
        (s.grid = l),
          _ && (p += h),
          v && (f += c),
          g && (p -= h),
          m && (f -= c),
          /^(se|s|e)$/.test(r)
            ? ((i.size.width = p), (i.size.height = f))
            : /^(ne)$/.test(r)
            ? ((i.size.width = p),
              (i.size.height = f),
              (i.position.top = a.top - d))
            : /^(sw)$/.test(r)
            ? ((i.size.width = p),
              (i.size.height = f),
              (i.position.left = a.left - u))
            : ((0 >= f - c || 0 >= p - h) &&
                (e = i._getPaddingPlusBorderDimensions(this)),
              f - c > 0
                ? ((i.size.height = f), (i.position.top = a.top - d))
                : ((f = c - e.height),
                  (i.size.height = f),
                  (i.position.top = a.top + o.height - f)),
              p - h > 0
                ? ((i.size.width = p), (i.position.left = a.left - u))
                : ((p = h - e.width),
                  (i.size.width = p),
                  (i.position.left = a.left + o.width - p)));
      },
    }),
    t.ui.resizable,
    t.widget("ui.selectable", t.ui.mouse, {
      version: "1.12.1",
      options: {
        appendTo: "body",
        autoRefresh: !0,
        distance: 0,
        filter: "*",
        tolerance: "touch",
        selected: null,
        selecting: null,
        start: null,
        stop: null,
        unselected: null,
        unselecting: null,
      },
      _create: function () {
        var e = this;
        this._addClass("ui-selectable"),
          (this.dragged = !1),
          (this.refresh = function () {
            (e.elementPos = t(e.element[0]).offset()),
              (e.selectees = t(e.options.filter, e.element[0])),
              e._addClass(e.selectees, "ui-selectee"),
              e.selectees.each(function () {
                var i = t(this),
                  s = i.offset(),
                  n = {
                    left: s.left - e.elementPos.left,
                    top: s.top - e.elementPos.top,
                  };
                t.data(this, "selectable-item", {
                  element: this,
                  $element: i,
                  left: n.left,
                  top: n.top,
                  right: n.left + i.outerWidth(),
                  bottom: n.top + i.outerHeight(),
                  startselected: !1,
                  selected: i.hasClass("ui-selected"),
                  selecting: i.hasClass("ui-selecting"),
                  unselecting: i.hasClass("ui-unselecting"),
                });
              });
          }),
          this.refresh(),
          this._mouseInit(),
          (this.helper = t("<div>")),
          this._addClass(this.helper, "ui-selectable-helper");
      },
      _destroy: function () {
        this.selectees.removeData("selectable-item"), this._mouseDestroy();
      },
      _mouseStart: function (e) {
        var i = this,
          s = this.options;
        (this.opos = [e.pageX, e.pageY]),
          (this.elementPos = t(this.element[0]).offset()),
          this.options.disabled ||
            ((this.selectees = t(s.filter, this.element[0])),
            this._trigger("start", e),
            t(s.appendTo).append(this.helper),
            this.helper.css({
              left: e.pageX,
              top: e.pageY,
              width: 0,
              height: 0,
            }),
            s.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function () {
              var s = t.data(this, "selectable-item");
              (s.startselected = !0),
                e.metaKey ||
                  e.ctrlKey ||
                  (i._removeClass(s.$element, "ui-selected"),
                  (s.selected = !1),
                  i._addClass(s.$element, "ui-unselecting"),
                  (s.unselecting = !0),
                  i._trigger("unselecting", e, { unselecting: s.element }));
            }),
            t(e.target)
              .parents()
              .addBack()
              .each(function () {
                var s,
                  n = t.data(this, "selectable-item");
                return n
                  ? ((s =
                      (!e.metaKey && !e.ctrlKey) ||
                      !n.$element.hasClass("ui-selected")),
                    i
                      ._removeClass(
                        n.$element,
                        s ? "ui-unselecting" : "ui-selected"
                      )
                      ._addClass(
                        n.$element,
                        s ? "ui-selecting" : "ui-unselecting"
                      ),
                    (n.unselecting = !s),
                    (n.selecting = s),
                    (n.selected = s),
                    s
                      ? i._trigger("selecting", e, { selecting: n.element })
                      : i._trigger("unselecting", e, {
                          unselecting: n.element,
                        }),
                    !1)
                  : void 0;
              }));
      },
      _mouseDrag: function (e) {
        if (((this.dragged = !0), !this.options.disabled)) {
          var i,
            s = this,
            n = this.options,
            o = this.opos[0],
            a = this.opos[1],
            r = e.pageX,
            l = e.pageY;
          return (
            o > r && ((i = r), (r = o), (o = i)),
            a > l && ((i = l), (l = a), (a = i)),
            this.helper.css({ left: o, top: a, width: r - o, height: l - a }),
            this.selectees.each(function () {
              var i = t.data(this, "selectable-item"),
                h = !1,
                c = {};
              i &&
                i.element !== s.element[0] &&
                ((c.left = i.left + s.elementPos.left),
                (c.right = i.right + s.elementPos.left),
                (c.top = i.top + s.elementPos.top),
                (c.bottom = i.bottom + s.elementPos.top),
                "touch" === n.tolerance
                  ? (h = !(
                      c.left > r ||
                      o > c.right ||
                      c.top > l ||
                      a > c.bottom
                    ))
                  : "fit" === n.tolerance &&
                    (h =
                      c.left > o && r > c.right && c.top > a && l > c.bottom),
                h
                  ? (i.selected &&
                      (s._removeClass(i.$element, "ui-selected"),
                      (i.selected = !1)),
                    i.unselecting &&
                      (s._removeClass(i.$element, "ui-unselecting"),
                      (i.unselecting = !1)),
                    i.selecting ||
                      (s._addClass(i.$element, "ui-selecting"),
                      (i.selecting = !0),
                      s._trigger("selecting", e, { selecting: i.element })))
                  : (i.selecting &&
                      ((e.metaKey || e.ctrlKey) && i.startselected
                        ? (s._removeClass(i.$element, "ui-selecting"),
                          (i.selecting = !1),
                          s._addClass(i.$element, "ui-selected"),
                          (i.selected = !0))
                        : (s._removeClass(i.$element, "ui-selecting"),
                          (i.selecting = !1),
                          i.startselected &&
                            (s._addClass(i.$element, "ui-unselecting"),
                            (i.unselecting = !0)),
                          s._trigger("unselecting", e, {
                            unselecting: i.element,
                          }))),
                    i.selected &&
                      (e.metaKey ||
                        e.ctrlKey ||
                        i.startselected ||
                        (s._removeClass(i.$element, "ui-selected"),
                        (i.selected = !1),
                        s._addClass(i.$element, "ui-unselecting"),
                        (i.unselecting = !0),
                        s._trigger("unselecting", e, {
                          unselecting: i.element,
                        })))));
            }),
            !1
          );
        }
      },
      _mouseStop: function (e) {
        var i = this;
        return (
          (this.dragged = !1),
          t(".ui-unselecting", this.element[0]).each(function () {
            var s = t.data(this, "selectable-item");
            i._removeClass(s.$element, "ui-unselecting"),
              (s.unselecting = !1),
              (s.startselected = !1),
              i._trigger("unselected", e, { unselected: s.element });
          }),
          t(".ui-selecting", this.element[0]).each(function () {
            var s = t.data(this, "selectable-item");
            i
              ._removeClass(s.$element, "ui-selecting")
              ._addClass(s.$element, "ui-selected"),
              (s.selecting = !1),
              (s.selected = !0),
              (s.startselected = !0),
              i._trigger("selected", e, { selected: s.element });
          }),
          this._trigger("stop", e),
          this.helper.remove(),
          !1
        );
      },
    }),
    t.widget("ui.sortable", t.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "sort",
      ready: !1,
      options: {
        appendTo: "parent",
        axis: !1,
        connectWith: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        dropOnEmpty: !0,
        forcePlaceholderSize: !1,
        forceHelperSize: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        items: "> *",
        opacity: !1,
        placeholder: !1,
        revert: !1,
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        scope: "default",
        tolerance: "intersect",
        zIndex: 1e3,
        activate: null,
        beforeStop: null,
        change: null,
        deactivate: null,
        out: null,
        over: null,
        receive: null,
        remove: null,
        sort: null,
        start: null,
        stop: null,
        update: null,
      },
      _isOverAxis: function (t, e, i) {
        return t >= e && e + i > t;
      },
      _isFloating: function (t) {
        return (
          /left|right/.test(t.css("float")) ||
          /inline|table-cell/.test(t.css("display"))
        );
      },
      _create: function () {
        (this.containerCache = {}),
          this._addClass("ui-sortable"),
          this.refresh(),
          (this.offset = this.element.offset()),
          this._mouseInit(),
          this._setHandleClassName(),
          (this.ready = !0);
      },
      _setOption: function (t, e) {
        this._super(t, e), "handle" === t && this._setHandleClassName();
      },
      _setHandleClassName: function () {
        var e = this;
        this._removeClass(
          this.element.find(".ui-sortable-handle"),
          "ui-sortable-handle"
        ),
          t.each(this.items, function () {
            e._addClass(
              this.instance.options.handle
                ? this.item.find(this.instance.options.handle)
                : this.item,
              "ui-sortable-handle"
            );
          });
      },
      _destroy: function () {
        this._mouseDestroy();
        for (var t = this.items.length - 1; t >= 0; t--)
          this.items[t].item.removeData(this.widgetName + "-item");
        return this;
      },
      _mouseCapture: function (e, i) {
        var s = null,
          n = !1,
          o = this;
        return this.reverting
          ? !1
          : this.options.disabled || "static" === this.options.type
          ? !1
          : (this._refreshItems(e),
            t(e.target)
              .parents()
              .each(function () {
                return t.data(this, o.widgetName + "-item") === o
                  ? ((s = t(this)), !1)
                  : void 0;
              }),
            t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)),
            s
              ? !this.options.handle ||
                i ||
                (t(this.options.handle, s)
                  .find("*")
                  .addBack()
                  .each(function () {
                    this === e.target && (n = !0);
                  }),
                n)
                ? ((this.currentItem = s), this._removeCurrentsFromItems(), !0)
                : !1
              : !1);
      },
      _mouseStart: function (e, i, s) {
        var n,
          o,
          a = this.options;
        if (
          ((this.currentContainer = this),
          this.refreshPositions(),
          (this.helper = this._createHelper(e)),
          this._cacheHelperProportions(),
          this._cacheMargins(),
          (this.scrollParent = this.helper.scrollParent()),
          (this.offset = this.currentItem.offset()),
          (this.offset = {
            top: this.offset.top - this.margins.top,
            left: this.offset.left - this.margins.left,
          }),
          t.extend(this.offset, {
            click: {
              left: e.pageX - this.offset.left,
              top: e.pageY - this.offset.top,
            },
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
          this.helper.css("position", "absolute"),
          (this.cssPosition = this.helper.css("position")),
          (this.originalPosition = this._generatePosition(e)),
          (this.originalPageX = e.pageX),
          (this.originalPageY = e.pageY),
          a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt),
          (this.domPosition = {
            prev: this.currentItem.prev()[0],
            parent: this.currentItem.parent()[0],
          }),
          this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
          this._createPlaceholder(),
          a.containment && this._setContainment(),
          a.cursor &&
            "auto" !== a.cursor &&
            ((o = this.document.find("body")),
            (this.storedCursor = o.css("cursor")),
            o.css("cursor", a.cursor),
            (this.storedStylesheet = t(
              "<style>*{ cursor: " + a.cursor + " !important; }</style>"
            ).appendTo(o))),
          a.opacity &&
            (this.helper.css("opacity") &&
              (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", a.opacity)),
          a.zIndex &&
            (this.helper.css("zIndex") &&
              (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", a.zIndex)),
          this.scrollParent[0] !== this.document[0] &&
            "HTML" !== this.scrollParent[0].tagName &&
            (this.overflowOffset = this.scrollParent.offset()),
          this._trigger("start", e, this._uiHash()),
          this._preserveHelperProportions || this._cacheHelperProportions(),
          !s)
        )
          for (n = this.containers.length - 1; n >= 0; n--)
            this.containers[n]._trigger("activate", e, this._uiHash(this));
        return (
          t.ui.ddmanager && (t.ui.ddmanager.current = this),
          t.ui.ddmanager &&
            !a.dropBehaviour &&
            t.ui.ddmanager.prepareOffsets(this, e),
          (this.dragging = !0),
          this._addClass(this.helper, "ui-sortable-helper"),
          this._mouseDrag(e),
          !0
        );
      },
      _mouseDrag: function (e) {
        var i,
          s,
          n,
          o,
          a = this.options,
          r = !1;
        for (
          this.position = this._generatePosition(e),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll &&
              (this.scrollParent[0] !== this.document[0] &&
              "HTML" !== this.scrollParent[0].tagName
                ? (this.overflowOffset.top +
                    this.scrollParent[0].offsetHeight -
                    e.pageY <
                  a.scrollSensitivity
                    ? (this.scrollParent[0].scrollTop = r =
                        this.scrollParent[0].scrollTop + a.scrollSpeed)
                    : e.pageY - this.overflowOffset.top < a.scrollSensitivity &&
                      (this.scrollParent[0].scrollTop = r =
                        this.scrollParent[0].scrollTop - a.scrollSpeed),
                  this.overflowOffset.left +
                    this.scrollParent[0].offsetWidth -
                    e.pageX <
                  a.scrollSensitivity
                    ? (this.scrollParent[0].scrollLeft = r =
                        this.scrollParent[0].scrollLeft + a.scrollSpeed)
                    : e.pageX - this.overflowOffset.left <
                        a.scrollSensitivity &&
                      (this.scrollParent[0].scrollLeft = r =
                        this.scrollParent[0].scrollLeft - a.scrollSpeed))
                : (e.pageY - this.document.scrollTop() < a.scrollSensitivity
                    ? (r = this.document.scrollTop(
                        this.document.scrollTop() - a.scrollSpeed
                      ))
                    : this.window.height() -
                        (e.pageY - this.document.scrollTop()) <
                        a.scrollSensitivity &&
                      (r = this.document.scrollTop(
                        this.document.scrollTop() + a.scrollSpeed
                      )),
                  e.pageX - this.document.scrollLeft() < a.scrollSensitivity
                    ? (r = this.document.scrollLeft(
                        this.document.scrollLeft() - a.scrollSpeed
                      ))
                    : this.window.width() -
                        (e.pageX - this.document.scrollLeft()) <
                        a.scrollSensitivity &&
                      (r = this.document.scrollLeft(
                        this.document.scrollLeft() + a.scrollSpeed
                      ))),
              r !== !1 &&
                t.ui.ddmanager &&
                !a.dropBehaviour &&
                t.ui.ddmanager.prepareOffsets(this, e)),
            this.positionAbs = this._convertPositionTo("absolute"),
            (this.options.axis && "y" === this.options.axis) ||
              (this.helper[0].style.left = this.position.left + "px"),
            (this.options.axis && "x" === this.options.axis) ||
              (this.helper[0].style.top = this.position.top + "px"),
            i = this.items.length - 1;
          i >= 0;
          i--
        )
          if (
            ((s = this.items[i]),
            (n = s.item[0]),
            (o = this._intersectsWithPointer(s)),
            o &&
              s.instance === this.currentContainer &&
              n !== this.currentItem[0] &&
              this.placeholder[1 === o ? "next" : "prev"]()[0] !== n &&
              !t.contains(this.placeholder[0], n) &&
              ("semi-dynamic" === this.options.type
                ? !t.contains(this.element[0], n)
                : !0))
          ) {
            if (
              ((this.direction = 1 === o ? "down" : "up"),
              "pointer" !== this.options.tolerance &&
                !this._intersectsWithSides(s))
            )
              break;
            this._rearrange(e, s), this._trigger("change", e, this._uiHash());
            break;
          }
        return (
          this._contactContainers(e),
          t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
          this._trigger("sort", e, this._uiHash()),
          (this.lastPositionAbs = this.positionAbs),
          !1
        );
      },
      _mouseStop: function (e, i) {
        if (e) {
          if (
            (t.ui.ddmanager &&
              !this.options.dropBehaviour &&
              t.ui.ddmanager.drop(this, e),
            this.options.revert)
          ) {
            var s = this,
              n = this.placeholder.offset(),
              o = this.options.axis,
              a = {};
            (o && "x" !== o) ||
              (a.left =
                n.left -
                this.offset.parent.left -
                this.margins.left +
                (this.offsetParent[0] === this.document[0].body
                  ? 0
                  : this.offsetParent[0].scrollLeft)),
              (o && "y" !== o) ||
                (a.top =
                  n.top -
                  this.offset.parent.top -
                  this.margins.top +
                  (this.offsetParent[0] === this.document[0].body
                    ? 0
                    : this.offsetParent[0].scrollTop)),
              (this.reverting = !0),
              t(this.helper).animate(
                a,
                parseInt(this.options.revert, 10) || 500,
                function () {
                  s._clear(e);
                }
              );
          } else this._clear(e, i);
          return !1;
        }
      },
      cancel: function () {
        if (this.dragging) {
          this._mouseUp(new t.Event("mouseup", { target: null })),
            "original" === this.options.helper
              ? (this.currentItem.css(this._storedCSS),
                this._removeClass(this.currentItem, "ui-sortable-helper"))
              : this.currentItem.show();
          for (var e = this.containers.length - 1; e >= 0; e--)
            this.containers[e]._trigger("deactivate", null, this._uiHash(this)),
              this.containers[e].containerCache.over &&
                (this.containers[e]._trigger("out", null, this._uiHash(this)),
                (this.containers[e].containerCache.over = 0));
        }
        return (
          this.placeholder &&
            (this.placeholder[0].parentNode &&
              this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper &&
              this.helper &&
              this.helper[0].parentNode &&
              this.helper.remove(),
            t.extend(this, {
              helper: null,
              dragging: !1,
              reverting: !1,
              _noFinalSort: null,
            }),
            this.domPosition.prev
              ? t(this.domPosition.prev).after(this.currentItem)
              : t(this.domPosition.parent).prepend(this.currentItem)),
          this
        );
      },
      serialize: function (e) {
        var i = this._getItemsAsjQuery(e && e.connected),
          s = [];
        return (
          (e = e || {}),
          t(i).each(function () {
            var i = (t(e.item || this).attr(e.attribute || "id") || "").match(
              e.expression || /(.+)[\-=_](.+)/
            );
            i &&
              s.push(
                (e.key || i[1] + "[]") +
                  "=" +
                  (e.key && e.expression ? i[1] : i[2])
              );
          }),
          !s.length && e.key && s.push(e.key + "="),
          s.join("&")
        );
      },
      toArray: function (e) {
        var i = this._getItemsAsjQuery(e && e.connected),
          s = [];
        return (
          (e = e || {}),
          i.each(function () {
            s.push(t(e.item || this).attr(e.attribute || "id") || "");
          }),
          s
        );
      },
      _intersectsWith: function (t) {
        var e = this.positionAbs.left,
          i = e + this.helperProportions.width,
          s = this.positionAbs.top,
          n = s + this.helperProportions.height,
          o = t.left,
          a = o + t.width,
          r = t.top,
          l = r + t.height,
          h = this.offset.click.top,
          c = this.offset.click.left,
          u = "x" === this.options.axis || (s + h > r && l > s + h),
          d = "y" === this.options.axis || (e + c > o && a > e + c),
          p = u && d;
        return "pointer" === this.options.tolerance ||
          this.options.forcePointerForContainers ||
          ("pointer" !== this.options.tolerance &&
            this.helperProportions[this.floating ? "width" : "height"] >
              t[this.floating ? "width" : "height"])
          ? p
          : e + this.helperProportions.width / 2 > o &&
              a > i - this.helperProportions.width / 2 &&
              s + this.helperProportions.height / 2 > r &&
              l > n - this.helperProportions.height / 2;
      },
      _intersectsWithPointer: function (t) {
        var e,
          i,
          s =
            "x" === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.top + this.offset.click.top,
              t.top,
              t.height
            ),
          n =
            "y" === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.left + this.offset.click.left,
              t.left,
              t.width
            ),
          o = s && n;
        return o
          ? ((e = this._getDragVerticalDirection()),
            (i = this._getDragHorizontalDirection()),
            this.floating
              ? "right" === i || "down" === e
                ? 2
                : 1
              : e && ("down" === e ? 2 : 1))
          : !1;
      },
      _intersectsWithSides: function (t) {
        var e = this._isOverAxis(
            this.positionAbs.top + this.offset.click.top,
            t.top + t.height / 2,
            t.height
          ),
          i = this._isOverAxis(
            this.positionAbs.left + this.offset.click.left,
            t.left + t.width / 2,
            t.width
          ),
          s = this._getDragVerticalDirection(),
          n = this._getDragHorizontalDirection();
        return this.floating && n
          ? ("right" === n && i) || ("left" === n && !i)
          : s && (("down" === s && e) || ("up" === s && !e));
      },
      _getDragVerticalDirection: function () {
        var t = this.positionAbs.top - this.lastPositionAbs.top;
        return 0 !== t && (t > 0 ? "down" : "up");
      },
      _getDragHorizontalDirection: function () {
        var t = this.positionAbs.left - this.lastPositionAbs.left;
        return 0 !== t && (t > 0 ? "right" : "left");
      },
      refresh: function (t) {
        return (
          this._refreshItems(t),
          this._setHandleClassName(),
          this.refreshPositions(),
          this
        );
      },
      _connectWith: function () {
        var t = this.options;
        return t.connectWith.constructor === String
          ? [t.connectWith]
          : t.connectWith;
      },
      _getItemsAsjQuery: function (e) {
        function i() {
          r.push(this);
        }
        var s,
          n,
          o,
          a,
          r = [],
          l = [],
          h = this._connectWith();
        if (h && e)
          for (s = h.length - 1; s >= 0; s--)
            for (o = t(h[s], this.document[0]), n = o.length - 1; n >= 0; n--)
              (a = t.data(o[n], this.widgetFullName)),
                a &&
                  a !== this &&
                  !a.options.disabled &&
                  l.push([
                    t.isFunction(a.options.items)
                      ? a.options.items.call(a.element)
                      : t(a.options.items, a.element)
                          .not(".ui-sortable-helper")
                          .not(".ui-sortable-placeholder"),
                    a,
                  ]);
        for (
          l.push([
            t.isFunction(this.options.items)
              ? this.options.items.call(this.element, null, {
                  options: this.options,
                  item: this.currentItem,
                })
              : t(this.options.items, this.element)
                  .not(".ui-sortable-helper")
                  .not(".ui-sortable-placeholder"),
            this,
          ]),
            s = l.length - 1;
          s >= 0;
          s--
        )
          l[s][0].each(i);
        return t(r);
      },
      _removeCurrentsFromItems: function () {
        var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
        this.items = t.grep(this.items, function (t) {
          for (var i = 0; e.length > i; i++) if (e[i] === t.item[0]) return !1;
          return !0;
        });
      },
      _refreshItems: function (e) {
        (this.items = []), (this.containers = [this]);
        var i,
          s,
          n,
          o,
          a,
          r,
          l,
          h,
          c = this.items,
          u = [
            [
              t.isFunction(this.options.items)
                ? this.options.items.call(this.element[0], e, {
                    item: this.currentItem,
                  })
                : t(this.options.items, this.element),
              this,
            ],
          ],
          d = this._connectWith();
        if (d && this.ready)
          for (i = d.length - 1; i >= 0; i--)
            for (n = t(d[i], this.document[0]), s = n.length - 1; s >= 0; s--)
              (o = t.data(n[s], this.widgetFullName)),
                o &&
                  o !== this &&
                  !o.options.disabled &&
                  (u.push([
                    t.isFunction(o.options.items)
                      ? o.options.items.call(o.element[0], e, {
                          item: this.currentItem,
                        })
                      : t(o.options.items, o.element),
                    o,
                  ]),
                  this.containers.push(o));
        for (i = u.length - 1; i >= 0; i--)
          for (a = u[i][1], r = u[i][0], s = 0, h = r.length; h > s; s++)
            (l = t(r[s])),
              l.data(this.widgetName + "-item", a),
              c.push({
                item: l,
                instance: a,
                width: 0,
                height: 0,
                left: 0,
                top: 0,
              });
      },
      refreshPositions: function (e) {
        (this.floating = this.items.length
          ? "x" === this.options.axis || this._isFloating(this.items[0].item)
          : !1),
          this.offsetParent &&
            this.helper &&
            (this.offset.parent = this._getParentOffset());
        var i, s, n, o;
        for (i = this.items.length - 1; i >= 0; i--)
          (s = this.items[i]),
            (s.instance !== this.currentContainer &&
              this.currentContainer &&
              s.item[0] !== this.currentItem[0]) ||
              ((n = this.options.toleranceElement
                ? t(this.options.toleranceElement, s.item)
                : s.item),
              e || ((s.width = n.outerWidth()), (s.height = n.outerHeight())),
              (o = n.offset()),
              (s.left = o.left),
              (s.top = o.top));
        if (this.options.custom && this.options.custom.refreshContainers)
          this.options.custom.refreshContainers.call(this);
        else
          for (i = this.containers.length - 1; i >= 0; i--)
            (o = this.containers[i].element.offset()),
              (this.containers[i].containerCache.left = o.left),
              (this.containers[i].containerCache.top = o.top),
              (this.containers[i].containerCache.width =
                this.containers[i].element.outerWidth()),
              (this.containers[i].containerCache.height =
                this.containers[i].element.outerHeight());
        return this;
      },
      _createPlaceholder: function (e) {
        e = e || this;
        var i,
          s = e.options;
        (s.placeholder && s.placeholder.constructor !== String) ||
          ((i = s.placeholder),
          (s.placeholder = {
            element: function () {
              var s = e.currentItem[0].nodeName.toLowerCase(),
                n = t("<" + s + ">", e.document[0]);
              return (
                e
                  ._addClass(
                    n,
                    "ui-sortable-placeholder",
                    i || e.currentItem[0].className
                  )
                  ._removeClass(n, "ui-sortable-helper"),
                "tbody" === s
                  ? e._createTrPlaceholder(
                      e.currentItem.find("tr").eq(0),
                      t("<tr>", e.document[0]).appendTo(n)
                    )
                  : "tr" === s
                  ? e._createTrPlaceholder(e.currentItem, n)
                  : "img" === s && n.attr("src", e.currentItem.attr("src")),
                i || n.css("visibility", "hidden"),
                n
              );
            },
            update: function (t, n) {
              (!i || s.forcePlaceholderSize) &&
                (n.height() ||
                  n.height(
                    e.currentItem.innerHeight() -
                      parseInt(e.currentItem.css("paddingTop") || 0, 10) -
                      parseInt(e.currentItem.css("paddingBottom") || 0, 10)
                  ),
                n.width() ||
                  n.width(
                    e.currentItem.innerWidth() -
                      parseInt(e.currentItem.css("paddingLeft") || 0, 10) -
                      parseInt(e.currentItem.css("paddingRight") || 0, 10)
                  ));
            },
          })),
          (e.placeholder = t(
            s.placeholder.element.call(e.element, e.currentItem)
          )),
          e.currentItem.after(e.placeholder),
          s.placeholder.update(e, e.placeholder);
      },
      _createTrPlaceholder: function (e, i) {
        var s = this;
        e.children().each(function () {
          t("<td>&#160;</td>", s.document[0])
            .attr("colspan", t(this).attr("colspan") || 1)
            .appendTo(i);
        });
      },
      _contactContainers: function (e) {
        var i,
          s,
          n,
          o,
          a,
          r,
          l,
          h,
          c,
          u,
          d = null,
          p = null;
        for (i = this.containers.length - 1; i >= 0; i--)
          if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
            if (this._intersectsWith(this.containers[i].containerCache)) {
              if (d && t.contains(this.containers[i].element[0], d.element[0]))
                continue;
              (d = this.containers[i]), (p = i);
            } else
              this.containers[i].containerCache.over &&
                (this.containers[i]._trigger("out", e, this._uiHash(this)),
                (this.containers[i].containerCache.over = 0));
        if (d)
          if (1 === this.containers.length)
            this.containers[p].containerCache.over ||
              (this.containers[p]._trigger("over", e, this._uiHash(this)),
              (this.containers[p].containerCache.over = 1));
          else {
            for (
              n = 1e4,
                o = null,
                c = d.floating || this._isFloating(this.currentItem),
                a = c ? "left" : "top",
                r = c ? "width" : "height",
                u = c ? "pageX" : "pageY",
                s = this.items.length - 1;
              s >= 0;
              s--
            )
              t.contains(
                this.containers[p].element[0],
                this.items[s].item[0]
              ) &&
                this.items[s].item[0] !== this.currentItem[0] &&
                ((l = this.items[s].item.offset()[a]),
                (h = !1),
                e[u] - l > this.items[s][r] / 2 && (h = !0),
                n > Math.abs(e[u] - l) &&
                  ((n = Math.abs(e[u] - l)),
                  (o = this.items[s]),
                  (this.direction = h ? "up" : "down")));
            if (!o && !this.options.dropOnEmpty) return;
            if (this.currentContainer === this.containers[p])
              return (
                this.currentContainer.containerCache.over ||
                  (this.containers[p]._trigger("over", e, this._uiHash()),
                  (this.currentContainer.containerCache.over = 1)),
                void 0
              );
            o
              ? this._rearrange(e, o, null, !0)
              : this._rearrange(e, null, this.containers[p].element, !0),
              this._trigger("change", e, this._uiHash()),
              this.containers[p]._trigger("change", e, this._uiHash(this)),
              (this.currentContainer = this.containers[p]),
              this.options.placeholder.update(
                this.currentContainer,
                this.placeholder
              ),
              this.containers[p]._trigger("over", e, this._uiHash(this)),
              (this.containers[p].containerCache.over = 1);
          }
      },
      _createHelper: function (e) {
        var i = this.options,
          s = t.isFunction(i.helper)
            ? t(i.helper.apply(this.element[0], [e, this.currentItem]))
            : "clone" === i.helper
            ? this.currentItem.clone()
            : this.currentItem;
        return (
          s.parents("body").length ||
            t(
              "parent" !== i.appendTo
                ? i.appendTo
                : this.currentItem[0].parentNode
            )[0].appendChild(s[0]),
          s[0] === this.currentItem[0] &&
            (this._storedCSS = {
              width: this.currentItem[0].style.width,
              height: this.currentItem[0].style.height,
              position: this.currentItem.css("position"),
              top: this.currentItem.css("top"),
              left: this.currentItem.css("left"),
            }),
          (!s[0].style.width || i.forceHelperSize) &&
            s.width(this.currentItem.width()),
          (!s[0].style.height || i.forceHelperSize) &&
            s.height(this.currentItem.height()),
          s
        );
      },
      _adjustOffsetFromHelper: function (e) {
        "string" == typeof e && (e = e.split(" ")),
          t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
          "left" in e && (this.offset.click.left = e.left + this.margins.left),
          "right" in e &&
            (this.offset.click.left =
              this.helperProportions.width - e.right + this.margins.left),
          "top" in e && (this.offset.click.top = e.top + this.margins.top),
          "bottom" in e &&
            (this.offset.click.top =
              this.helperProportions.height - e.bottom + this.margins.top);
      },
      _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var e = this.offsetParent.offset();
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== this.document[0] &&
            t.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((e.left += this.scrollParent.scrollLeft()),
            (e.top += this.scrollParent.scrollTop())),
          (this.offsetParent[0] === this.document[0].body ||
            (this.offsetParent[0].tagName &&
              "html" === this.offsetParent[0].tagName.toLowerCase() &&
              t.ui.ie)) &&
            (e = { top: 0, left: 0 }),
          {
            top:
              e.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              e.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        if ("relative" === this.cssPosition) {
          var t = this.currentItem.position();
          return {
            top:
              t.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              this.scrollParent.scrollTop(),
            left:
              t.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              this.scrollParent.scrollLeft(),
          };
        }
        return { top: 0, left: 0 };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
          top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var e,
          i,
          s,
          n = this.options;
        "parent" === n.containment &&
          (n.containment = this.helper[0].parentNode),
          ("document" === n.containment || "window" === n.containment) &&
            (this.containment = [
              0 - this.offset.relative.left - this.offset.parent.left,
              0 - this.offset.relative.top - this.offset.parent.top,
              "document" === n.containment
                ? this.document.width()
                : this.window.width() -
                  this.helperProportions.width -
                  this.margins.left,
              ("document" === n.containment
                ? this.document.height() ||
                  document.body.parentNode.scrollHeight
                : this.window.height() ||
                  this.document[0].body.parentNode.scrollHeight) -
                this.helperProportions.height -
                this.margins.top,
            ]),
          /^(document|window|parent)$/.test(n.containment) ||
            ((e = t(n.containment)[0]),
            (i = t(n.containment).offset()),
            (s = "hidden" !== t(e).css("overflow")),
            (this.containment = [
              i.left +
                (parseInt(t(e).css("borderLeftWidth"), 10) || 0) +
                (parseInt(t(e).css("paddingLeft"), 10) || 0) -
                this.margins.left,
              i.top +
                (parseInt(t(e).css("borderTopWidth"), 10) || 0) +
                (parseInt(t(e).css("paddingTop"), 10) || 0) -
                this.margins.top,
              i.left +
                (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) -
                (parseInt(t(e).css("borderLeftWidth"), 10) || 0) -
                (parseInt(t(e).css("paddingRight"), 10) || 0) -
                this.helperProportions.width -
                this.margins.left,
              i.top +
                (s
                  ? Math.max(e.scrollHeight, e.offsetHeight)
                  : e.offsetHeight) -
                (parseInt(t(e).css("borderTopWidth"), 10) || 0) -
                (parseInt(t(e).css("paddingBottom"), 10) || 0) -
                this.helperProportions.height -
                this.margins.top,
            ]));
      },
      _convertPositionTo: function (e, i) {
        i || (i = this.position);
        var s = "absolute" === e ? 1 : -1,
          n =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              t.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          o = /(html|body)/i.test(n[0].tagName);
        return {
          top:
            i.top +
            this.offset.relative.top * s +
            this.offset.parent.top * s -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollTop()
              : o
              ? 0
              : n.scrollTop()) *
              s,
          left:
            i.left +
            this.offset.relative.left * s +
            this.offset.parent.left * s -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollLeft()
              : o
              ? 0
              : n.scrollLeft()) *
              s,
        };
      },
      _generatePosition: function (e) {
        var i,
          s,
          n = this.options,
          o = e.pageX,
          a = e.pageY,
          r =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              t.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          l = /(html|body)/i.test(r[0].tagName);
        return (
          "relative" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              this.scrollParent[0] !== this.offsetParent[0]) ||
            (this.offset.relative = this._getRelativeOffset()),
          this.originalPosition &&
            (this.containment &&
              (e.pageX - this.offset.click.left < this.containment[0] &&
                (o = this.containment[0] + this.offset.click.left),
              e.pageY - this.offset.click.top < this.containment[1] &&
                (a = this.containment[1] + this.offset.click.top),
              e.pageX - this.offset.click.left > this.containment[2] &&
                (o = this.containment[2] + this.offset.click.left),
              e.pageY - this.offset.click.top > this.containment[3] &&
                (a = this.containment[3] + this.offset.click.top)),
            n.grid &&
              ((i =
                this.originalPageY +
                Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1]),
              (a = this.containment
                ? i - this.offset.click.top >= this.containment[1] &&
                  i - this.offset.click.top <= this.containment[3]
                  ? i
                  : i - this.offset.click.top >= this.containment[1]
                  ? i - n.grid[1]
                  : i + n.grid[1]
                : i),
              (s =
                this.originalPageX +
                Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0]),
              (o = this.containment
                ? s - this.offset.click.left >= this.containment[0] &&
                  s - this.offset.click.left <= this.containment[2]
                  ? s
                  : s - this.offset.click.left >= this.containment[0]
                  ? s - n.grid[0]
                  : s + n.grid[0]
                : s))),
          {
            top:
              a -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : l
                ? 0
                : r.scrollTop()),
            left:
              o -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : l
                ? 0
                : r.scrollLeft()),
          }
        );
      },
      _rearrange: function (t, e, i, s) {
        i
          ? i[0].appendChild(this.placeholder[0])
          : e.item[0].parentNode.insertBefore(
              this.placeholder[0],
              "down" === this.direction ? e.item[0] : e.item[0].nextSibling
            ),
          (this.counter = this.counter ? ++this.counter : 1);
        var n = this.counter;
        this._delay(function () {
          n === this.counter && this.refreshPositions(!s);
        });
      },
      _clear: function (t, e) {
        function i(t, e, i) {
          return function (s) {
            i._trigger(t, s, e._uiHash(e));
          };
        }
        this.reverting = !1;
        var s,
          n = [];
        if (
          (!this._noFinalSort &&
            this.currentItem.parent().length &&
            this.placeholder.before(this.currentItem),
          (this._noFinalSort = null),
          this.helper[0] === this.currentItem[0])
        ) {
          for (s in this._storedCSS)
            ("auto" === this._storedCSS[s] ||
              "static" === this._storedCSS[s]) &&
              (this._storedCSS[s] = "");
          this.currentItem.css(this._storedCSS),
            this._removeClass(this.currentItem, "ui-sortable-helper");
        } else this.currentItem.show();
        for (
          this.fromOutside &&
            !e &&
            n.push(function (t) {
              this._trigger("receive", t, this._uiHash(this.fromOutside));
            }),
            (!this.fromOutside &&
              this.domPosition.prev ===
                this.currentItem.prev().not(".ui-sortable-helper")[0] &&
              this.domPosition.parent === this.currentItem.parent()[0]) ||
              e ||
              n.push(function (t) {
                this._trigger("update", t, this._uiHash());
              }),
            this !== this.currentContainer &&
              (e ||
                (n.push(function (t) {
                  this._trigger("remove", t, this._uiHash());
                }),
                n.push(
                  function (t) {
                    return function (e) {
                      t._trigger("receive", e, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ),
                n.push(
                  function (t) {
                    return function (e) {
                      t._trigger("update", e, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ))),
            s = this.containers.length - 1;
          s >= 0;
          s--
        )
          e || n.push(i("deactivate", this, this.containers[s])),
            this.containers[s].containerCache.over &&
              (n.push(i("out", this, this.containers[s])),
              (this.containers[s].containerCache.over = 0));
        if (
          (this.storedCursor &&
            (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
          this._storedOpacity &&
            this.helper.css("opacity", this._storedOpacity),
          this._storedZIndex &&
            this.helper.css(
              "zIndex",
              "auto" === this._storedZIndex ? "" : this._storedZIndex
            ),
          (this.dragging = !1),
          e || this._trigger("beforeStop", t, this._uiHash()),
          this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
          this.cancelHelperRemoval ||
            (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            (this.helper = null)),
          !e)
        ) {
          for (s = 0; n.length > s; s++) n[s].call(this, t);
          this._trigger("stop", t, this._uiHash());
        }
        return (this.fromOutside = !1), !this.cancelHelperRemoval;
      },
      _trigger: function () {
        t.Widget.prototype._trigger.apply(this, arguments) === !1 &&
          this.cancel();
      },
      _uiHash: function (e) {
        var i = e || this;
        return {
          helper: i.helper,
          placeholder: i.placeholder || t([]),
          position: i.position,
          originalPosition: i.originalPosition,
          offset: i.positionAbs,
          item: i.currentItem,
          sender: e ? e.element : null,
        };
      },
    }),
    t.widget("ui.slider", t.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        classes: {
          "ui-slider": "ui-corner-all",
          "ui-slider-handle": "ui-corner-all",
          "ui-slider-range": "ui-corner-all ui-widget-header",
        },
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null,
        change: null,
        slide: null,
        start: null,
        stop: null,
      },
      numPages: 5,
      _create: function () {
        (this._keySliding = !1),
          (this._mouseSliding = !1),
          (this._animateOff = !0),
          (this._handleIndex = null),
          this._detectOrientation(),
          this._mouseInit(),
          this._calculateNewMax(),
          this._addClass(
            "ui-slider ui-slider-" + this.orientation,
            "ui-widget ui-widget-content"
          ),
          this._refresh(),
          (this._animateOff = !1);
      },
      _refresh: function () {
        this._createRange(),
          this._createHandles(),
          this._setupEvents(),
          this._refreshValue();
      },
      _createHandles: function () {
        var e,
          i,
          s = this.options,
          n = this.element.find(".ui-slider-handle"),
          o = "<span tabindex='0'></span>",
          a = [];
        for (
          i = (s.values && s.values.length) || 1,
            n.length > i && (n.slice(i).remove(), (n = n.slice(0, i))),
            e = n.length;
          i > e;
          e++
        )
          a.push(o);
        (this.handles = n.add(t(a.join("")).appendTo(this.element))),
          this._addClass(this.handles, "ui-slider-handle", "ui-state-default"),
          (this.handle = this.handles.eq(0)),
          this.handles.each(function (e) {
            t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
          });
      },
      _createRange: function () {
        var e = this.options;
        e.range
          ? (e.range === !0 &&
              (e.values
                ? e.values.length && 2 !== e.values.length
                  ? (e.values = [e.values[0], e.values[0]])
                  : t.isArray(e.values) && (e.values = e.values.slice(0))
                : (e.values = [this._valueMin(), this._valueMin()])),
            this.range && this.range.length
              ? (this._removeClass(
                  this.range,
                  "ui-slider-range-min ui-slider-range-max"
                ),
                this.range.css({ left: "", bottom: "" }))
              : ((this.range = t("<div>").appendTo(this.element)),
                this._addClass(this.range, "ui-slider-range")),
            ("min" === e.range || "max" === e.range) &&
              this._addClass(this.range, "ui-slider-range-" + e.range))
          : (this.range && this.range.remove(), (this.range = null));
      },
      _setupEvents: function () {
        this._off(this.handles),
          this._on(this.handles, this._handleEvents),
          this._hoverable(this.handles),
          this._focusable(this.handles);
      },
      _destroy: function () {
        this.handles.remove(),
          this.range && this.range.remove(),
          this._mouseDestroy();
      },
      _mouseCapture: function (e) {
        var i,
          s,
          n,
          o,
          a,
          r,
          l,
          h,
          c = this,
          u = this.options;
        return u.disabled
          ? !1
          : ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
            }),
            (this.elementOffset = this.element.offset()),
            (i = { x: e.pageX, y: e.pageY }),
            (s = this._normValueFromMouse(i)),
            (n = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function (e) {
              var i = Math.abs(s - c.values(e));
              (n > i ||
                (n === i &&
                  (e === c._lastChangedValue || c.values(e) === u.min))) &&
                ((n = i), (o = t(this)), (a = e));
            }),
            (r = this._start(e, a)),
            r === !1
              ? !1
              : ((this._mouseSliding = !0),
                (this._handleIndex = a),
                this._addClass(o, null, "ui-state-active"),
                o.trigger("focus"),
                (l = o.offset()),
                (h = !t(e.target).parents().addBack().is(".ui-slider-handle")),
                (this._clickOffset = h
                  ? { left: 0, top: 0 }
                  : {
                      left: e.pageX - l.left - o.width() / 2,
                      top:
                        e.pageY -
                        l.top -
                        o.height() / 2 -
                        (parseInt(o.css("borderTopWidth"), 10) || 0) -
                        (parseInt(o.css("borderBottomWidth"), 10) || 0) +
                        (parseInt(o.css("marginTop"), 10) || 0),
                    }),
                this.handles.hasClass("ui-state-hover") || this._slide(e, a, s),
                (this._animateOff = !0),
                !0));
      },
      _mouseStart: function () {
        return !0;
      },
      _mouseDrag: function (t) {
        var e = { x: t.pageX, y: t.pageY },
          i = this._normValueFromMouse(e);
        return this._slide(t, this._handleIndex, i), !1;
      },
      _mouseStop: function (t) {
        return (
          this._removeClass(this.handles, null, "ui-state-active"),
          (this._mouseSliding = !1),
          this._stop(t, this._handleIndex),
          this._change(t, this._handleIndex),
          (this._handleIndex = null),
          (this._clickOffset = null),
          (this._animateOff = !1),
          !1
        );
      },
      _detectOrientation: function () {
        this.orientation =
          "vertical" === this.options.orientation ? "vertical" : "horizontal";
      },
      _normValueFromMouse: function (t) {
        var e, i, s, n, o;
        return (
          "horizontal" === this.orientation
            ? ((e = this.elementSize.width),
              (i =
                t.x -
                this.elementOffset.left -
                (this._clickOffset ? this._clickOffset.left : 0)))
            : ((e = this.elementSize.height),
              (i =
                t.y -
                this.elementOffset.top -
                (this._clickOffset ? this._clickOffset.top : 0))),
          (s = i / e),
          s > 1 && (s = 1),
          0 > s && (s = 0),
          "vertical" === this.orientation && (s = 1 - s),
          (n = this._valueMax() - this._valueMin()),
          (o = this._valueMin() + s * n),
          this._trimAlignValue(o)
        );
      },
      _uiHash: function (t, e, i) {
        var s = {
          handle: this.handles[t],
          handleIndex: t,
          value: void 0 !== e ? e : this.value(),
        };
        return (
          this._hasMultipleValues() &&
            ((s.value = void 0 !== e ? e : this.values(t)),
            (s.values = i || this.values())),
          s
        );
      },
      _hasMultipleValues: function () {
        return this.options.values && this.options.values.length;
      },
      _start: function (t, e) {
        return this._trigger("start", t, this._uiHash(e));
      },
      _slide: function (t, e, i) {
        var s,
          n,
          o = this.value(),
          a = this.values();
        this._hasMultipleValues() &&
          ((n = this.values(e ? 0 : 1)),
          (o = this.values(e)),
          2 === this.options.values.length &&
            this.options.range === !0 &&
            (i = 0 === e ? Math.min(n, i) : Math.max(n, i)),
          (a[e] = i)),
          i !== o &&
            ((s = this._trigger("slide", t, this._uiHash(e, i, a))),
            s !== !1 &&
              (this._hasMultipleValues() ? this.values(e, i) : this.value(i)));
      },
      _stop: function (t, e) {
        this._trigger("stop", t, this._uiHash(e));
      },
      _change: function (t, e) {
        this._keySliding ||
          this._mouseSliding ||
          ((this._lastChangedValue = e),
          this._trigger("change", t, this._uiHash(e)));
      },
      value: function (t) {
        return arguments.length
          ? ((this.options.value = this._trimAlignValue(t)),
            this._refreshValue(),
            this._change(null, 0),
            void 0)
          : this._value();
      },
      values: function (e, i) {
        var s, n, o;
        if (arguments.length > 1)
          return (
            (this.options.values[e] = this._trimAlignValue(i)),
            this._refreshValue(),
            this._change(null, e),
            void 0
          );
        if (!arguments.length) return this._values();
        if (!t.isArray(arguments[0]))
          return this._hasMultipleValues() ? this._values(e) : this.value();
        for (
          s = this.options.values, n = arguments[0], o = 0;
          s.length > o;
          o += 1
        )
          (s[o] = this._trimAlignValue(n[o])), this._change(null, o);
        this._refreshValue();
      },
      _setOption: function (e, i) {
        var s,
          n = 0;
        switch (
          ("range" === e &&
            this.options.range === !0 &&
            ("min" === i
              ? ((this.options.value = this._values(0)),
                (this.options.values = null))
              : "max" === i &&
                ((this.options.value = this._values(
                  this.options.values.length - 1
                )),
                (this.options.values = null))),
          t.isArray(this.options.values) && (n = this.options.values.length),
          this._super(e, i),
          e)
        ) {
          case "orientation":
            this._detectOrientation(),
              this._removeClass(
                "ui-slider-horizontal ui-slider-vertical"
              )._addClass("ui-slider-" + this.orientation),
              this._refreshValue(),
              this.options.range && this._refreshRange(i),
              this.handles.css("horizontal" === i ? "bottom" : "left", "");
            break;
          case "value":
            (this._animateOff = !0),
              this._refreshValue(),
              this._change(null, 0),
              (this._animateOff = !1);
            break;
          case "values":
            for (
              this._animateOff = !0, this._refreshValue(), s = n - 1;
              s >= 0;
              s--
            )
              this._change(null, s);
            this._animateOff = !1;
            break;
          case "step":
          case "min":
          case "max":
            (this._animateOff = !0),
              this._calculateNewMax(),
              this._refreshValue(),
              (this._animateOff = !1);
            break;
          case "range":
            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
        }
      },
      _setOptionDisabled: function (t) {
        this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
      },
      _value: function () {
        var t = this.options.value;
        return (t = this._trimAlignValue(t));
      },
      _values: function (t) {
        var e, i, s;
        if (arguments.length)
          return (e = this.options.values[t]), (e = this._trimAlignValue(e));
        if (this._hasMultipleValues()) {
          for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)
            i[s] = this._trimAlignValue(i[s]);
          return i;
        }
        return [];
      },
      _trimAlignValue: function (t) {
        if (this._valueMin() >= t) return this._valueMin();
        if (t >= this._valueMax()) return this._valueMax();
        var e = this.options.step > 0 ? this.options.step : 1,
          i = (t - this._valueMin()) % e,
          s = t - i;
        return (
          2 * Math.abs(i) >= e && (s += i > 0 ? e : -e),
          parseFloat(s.toFixed(5))
        );
      },
      _calculateNewMax: function () {
        var t = this.options.max,
          e = this._valueMin(),
          i = this.options.step,
          s = Math.round((t - e) / i) * i;
        (t = s + e),
          t > this.options.max && (t -= i),
          (this.max = parseFloat(t.toFixed(this._precision())));
      },
      _precision: function () {
        var t = this._precisionOf(this.options.step);
        return (
          null !== this.options.min &&
            (t = Math.max(t, this._precisionOf(this.options.min))),
          t
        );
      },
      _precisionOf: function (t) {
        var e = "" + t,
          i = e.indexOf(".");
        return -1 === i ? 0 : e.length - i - 1;
      },
      _valueMin: function () {
        return this.options.min;
      },
      _valueMax: function () {
        return this.max;
      },
      _refreshRange: function (t) {
        "vertical" === t && this.range.css({ width: "", left: "" }),
          "horizontal" === t && this.range.css({ height: "", bottom: "" });
      },
      _refreshValue: function () {
        var e,
          i,
          s,
          n,
          o,
          a = this.options.range,
          r = this.options,
          l = this,
          h = this._animateOff ? !1 : r.animate,
          c = {};
        this._hasMultipleValues()
          ? this.handles.each(function (s) {
              (i =
                100 *
                ((l.values(s) - l._valueMin()) /
                  (l._valueMax() - l._valueMin()))),
                (c["horizontal" === l.orientation ? "left" : "bottom"] =
                  i + "%"),
                t(this).stop(1, 1)[h ? "animate" : "css"](c, r.animate),
                l.options.range === !0 &&
                  ("horizontal" === l.orientation
                    ? (0 === s &&
                        l.range
                          .stop(1, 1)
                          [h ? "animate" : "css"]({ left: i + "%" }, r.animate),
                      1 === s &&
                        l.range[h ? "animate" : "css"](
                          { width: i - e + "%" },
                          { queue: !1, duration: r.animate }
                        ))
                    : (0 === s &&
                        l.range
                          .stop(1, 1)
                          [h ? "animate" : "css"](
                            { bottom: i + "%" },
                            r.animate
                          ),
                      1 === s &&
                        l.range[h ? "animate" : "css"](
                          { height: i - e + "%" },
                          { queue: !1, duration: r.animate }
                        ))),
                (e = i);
            })
          : ((s = this.value()),
            (n = this._valueMin()),
            (o = this._valueMax()),
            (i = o !== n ? 100 * ((s - n) / (o - n)) : 0),
            (c["horizontal" === this.orientation ? "left" : "bottom"] =
              i + "%"),
            this.handle.stop(1, 1)[h ? "animate" : "css"](c, r.animate),
            "min" === a &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ width: i + "%" }, r.animate),
            "max" === a &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ width: 100 - i + "%" }, r.animate),
            "min" === a &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ height: i + "%" }, r.animate),
            "max" === a &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ height: 100 - i + "%" }, r.animate));
      },
      _handleEvents: {
        keydown: function (e) {
          var i,
            s,
            n,
            o,
            a = t(e.target).data("ui-slider-handle-index");
          switch (e.keyCode) {
            case t.ui.keyCode.HOME:
            case t.ui.keyCode.END:
            case t.ui.keyCode.PAGE_UP:
            case t.ui.keyCode.PAGE_DOWN:
            case t.ui.keyCode.UP:
            case t.ui.keyCode.RIGHT:
            case t.ui.keyCode.DOWN:
            case t.ui.keyCode.LEFT:
              if (
                (e.preventDefault(),
                !this._keySliding &&
                  ((this._keySliding = !0),
                  this._addClass(t(e.target), null, "ui-state-active"),
                  (i = this._start(e, a)),
                  i === !1))
              )
                return;
          }
          switch (
            ((o = this.options.step),
            (s = n = this._hasMultipleValues() ? this.values(a) : this.value()),
            e.keyCode)
          ) {
            case t.ui.keyCode.HOME:
              n = this._valueMin();
              break;
            case t.ui.keyCode.END:
              n = this._valueMax();
              break;
            case t.ui.keyCode.PAGE_UP:
              n = this._trimAlignValue(
                s + (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case t.ui.keyCode.PAGE_DOWN:
              n = this._trimAlignValue(
                s - (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case t.ui.keyCode.UP:
            case t.ui.keyCode.RIGHT:
              if (s === this._valueMax()) return;
              n = this._trimAlignValue(s + o);
              break;
            case t.ui.keyCode.DOWN:
            case t.ui.keyCode.LEFT:
              if (s === this._valueMin()) return;
              n = this._trimAlignValue(s - o);
          }
          this._slide(e, a, n);
        },
        keyup: function (e) {
          var i = t(e.target).data("ui-slider-handle-index");
          this._keySliding &&
            ((this._keySliding = !1),
            this._stop(e, i),
            this._change(e, i),
            this._removeClass(t(e.target), null, "ui-state-active"));
        },
      },
    });
});
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function ($) {
  // Detect touch support
  $.support.touch = "ontouchend" in document;

  // Ignore browsers without touch support
  if (!$.support.touch) {
    return;
  }

  var mouseProto = $.ui.mouse.prototype,
    _mouseInit = mouseProto._mouseInit,
    _mouseDestroy = mouseProto._mouseDestroy,
    touchHandled;

  /**
   * Simulate a mouse event based on a corresponding touch event
   * @param {Object} event A touch event
   * @param {String} simulatedType The corresponding mouse event
   */
  function simulateMouseEvent(event, simulatedType) {
    // Ignore multi-touch events
    if (event.originalEvent.touches.length > 1) {
      return;
    }

    event.preventDefault();

    var touch = event.originalEvent.changedTouches[0],
      simulatedEvent = document.createEvent("MouseEvents");

    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(
      simulatedType, // type
      true, // bubbles
      true, // cancelable
      window, // view
      1, // detail
      touch.screenX, // screenX
      touch.screenY, // screenY
      touch.clientX, // clientX
      touch.clientY, // clientY
      false, // ctrlKey
      false, // altKey
      false, // shiftKey
      false, // metaKey
      0, // button
      null // relatedTarget
    );

    // Dispatch the simulated event to the target element
    event.target.dispatchEvent(simulatedEvent);
  }

  /**
   * Handle the jQuery UI widget's touchstart events
   * @param {Object} event The widget element's touchstart event
   */
  mouseProto._touchStart = function (event) {
    var self = this;

    // Ignore the event if another widget is already being handled
    if (
      touchHandled ||
      !self._mouseCapture(event.originalEvent.changedTouches[0])
    ) {
      return;
    }

    // Set the flag to prevent other widgets from inheriting the touch event
    touchHandled = true;

    // Track movement to determine if interaction was a click
    self._touchMoved = false;

    // Simulate the mouseover event
    simulateMouseEvent(event, "mouseover");

    // Simulate the mousemove event
    simulateMouseEvent(event, "mousemove");

    // Simulate the mousedown event
    simulateMouseEvent(event, "mousedown");
  };

  /**
   * Handle the jQuery UI widget's touchmove events
   * @param {Object} event The document's touchmove event
   */
  mouseProto._touchMove = function (event) {
    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Interaction was not a click
    this._touchMoved = true;

    // Simulate the mousemove event
    simulateMouseEvent(event, "mousemove");
  };

  /**
   * Handle the jQuery UI widget's touchend events
   * @param {Object} event The document's touchend event
   */
  mouseProto._touchEnd = function (event) {
    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Simulate the mouseup event
    simulateMouseEvent(event, "mouseup");

    // Simulate the mouseout event
    simulateMouseEvent(event, "mouseout");

    // If the touch interaction did not move, it should trigger a click
    if (!this._touchMoved) {
      // Simulate the click event
      simulateMouseEvent(event, "click");
    }

    // Unset the flag to allow other widgets to inherit the touch event
    touchHandled = false;
  };

  /**
   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
   * This method extends the widget with bound touch event handlers that
   * translate touch events to mouse events and pass them to the widget's
   * original mouse event handling methods.
   */
  mouseProto._mouseInit = function () {
    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element.bind({
      touchstart: $.proxy(self, "_touchStart"),
      touchmove: $.proxy(self, "_touchMove"),
      touchend: $.proxy(self, "_touchEnd"),
    });

    // Call the original $.ui.mouse init method
    _mouseInit.call(self);
  };

  /**
   * Remove the touch event handlers
   */
  mouseProto._mouseDestroy = function () {
    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element.unbind({
      touchstart: $.proxy(self, "_touchStart"),
      touchmove: $.proxy(self, "_touchMove"),
      touchend: $.proxy(self, "_touchEnd"),
    });

    // Call the original $.ui.mouse destroy method
    _mouseDestroy.call(self);
  };
})(jQuery);
/*! selectize.js - v0.12.4 | https://github.com/selectize/selectize.js | Apache License (v2) */
!(function (a, b) {
  "function" == typeof define && define.amd
    ? define("sifter", b)
    : "object" == typeof exports
    ? (module.exports = b())
    : (a.Sifter = b());
})(this, function () {
  var a = function (a, b) {
    (this.items = a), (this.settings = b || { diacritics: !0 });
  };
  (a.prototype.tokenize = function (a) {
    if (((a = e(String(a || "").toLowerCase())), !a || !a.length)) return [];
    var b,
      c,
      d,
      g,
      i = [],
      j = a.split(/ +/);
    for (b = 0, c = j.length; b < c; b++) {
      if (((d = f(j[b])), this.settings.diacritics))
        for (g in h)
          h.hasOwnProperty(g) && (d = d.replace(new RegExp(g, "g"), h[g]));
      i.push({ string: j[b], regex: new RegExp(d, "i") });
    }
    return i;
  }),
    (a.prototype.iterator = function (a, b) {
      var c;
      (c = g(a)
        ? Array.prototype.forEach ||
          function (a) {
            for (var b = 0, c = this.length; b < c; b++) a(this[b], b, this);
          }
        : function (a) {
            for (var b in this) this.hasOwnProperty(b) && a(this[b], b, this);
          }),
        c.apply(a, [b]);
    }),
    (a.prototype.getScoreFunction = function (a, b) {
      var c, e, f, g, h;
      (c = this),
        (a = c.prepareSearch(a, b)),
        (f = a.tokens),
        (e = a.options.fields),
        (g = f.length),
        (h = a.options.nesting);
      var i = function (a, b) {
          var c, d;
          return a
            ? ((a = String(a || "")),
              (d = a.search(b.regex)),
              d === -1
                ? 0
                : ((c = b.string.length / a.length), 0 === d && (c += 0.5), c))
            : 0;
        },
        j = (function () {
          var a = e.length;
          return a
            ? 1 === a
              ? function (a, b) {
                  return i(d(b, e[0], h), a);
                }
              : function (b, c) {
                  for (var f = 0, g = 0; f < a; f++) g += i(d(c, e[f], h), b);
                  return g / a;
                }
            : function () {
                return 0;
              };
        })();
      return g
        ? 1 === g
          ? function (a) {
              return j(f[0], a);
            }
          : "and" === a.options.conjunction
          ? function (a) {
              for (var b, c = 0, d = 0; c < g; c++) {
                if (((b = j(f[c], a)), b <= 0)) return 0;
                d += b;
              }
              return d / g;
            }
          : function (a) {
              for (var b = 0, c = 0; b < g; b++) c += j(f[b], a);
              return c / g;
            }
        : function () {
            return 0;
          };
    }),
    (a.prototype.getSortFunction = function (a, c) {
      var e, f, g, h, i, j, k, l, m, n, o;
      if (
        ((g = this),
        (a = g.prepareSearch(a, c)),
        (o = (!a.query && c.sort_empty) || c.sort),
        (m = function (a, b) {
          return "$score" === a ? b.score : d(g.items[b.id], a, c.nesting);
        }),
        (i = []),
        o)
      )
        for (e = 0, f = o.length; e < f; e++)
          (a.query || "$score" !== o[e].field) && i.push(o[e]);
      if (a.query) {
        for (n = !0, e = 0, f = i.length; e < f; e++)
          if ("$score" === i[e].field) {
            n = !1;
            break;
          }
        n && i.unshift({ field: "$score", direction: "desc" });
      } else
        for (e = 0, f = i.length; e < f; e++)
          if ("$score" === i[e].field) {
            i.splice(e, 1);
            break;
          }
      for (l = [], e = 0, f = i.length; e < f; e++)
        l.push("desc" === i[e].direction ? -1 : 1);
      return (
        (j = i.length),
        j
          ? 1 === j
            ? ((h = i[0].field),
              (k = l[0]),
              function (a, c) {
                return k * b(m(h, a), m(h, c));
              })
            : function (a, c) {
                var d, e, f;
                for (d = 0; d < j; d++)
                  if (((f = i[d].field), (e = l[d] * b(m(f, a), m(f, c)))))
                    return e;
                return 0;
              }
          : null
      );
    }),
    (a.prototype.prepareSearch = function (a, b) {
      if ("object" == typeof a) return a;
      b = c({}, b);
      var d = b.fields,
        e = b.sort,
        f = b.sort_empty;
      return (
        d && !g(d) && (b.fields = [d]),
        e && !g(e) && (b.sort = [e]),
        f && !g(f) && (b.sort_empty = [f]),
        {
          options: b,
          query: String(a || "").toLowerCase(),
          tokens: this.tokenize(a),
          total: 0,
          items: [],
        }
      );
    }),
    (a.prototype.search = function (a, b) {
      var c,
        d,
        e,
        f,
        g = this;
      return (
        (d = this.prepareSearch(a, b)),
        (b = d.options),
        (a = d.query),
        (f = b.score || g.getScoreFunction(d)),
        a.length
          ? g.iterator(g.items, function (a, e) {
              (c = f(a)),
                (b.filter === !1 || c > 0) && d.items.push({ score: c, id: e });
            })
          : g.iterator(g.items, function (a, b) {
              d.items.push({ score: 1, id: b });
            }),
        (e = g.getSortFunction(d, b)),
        e && d.items.sort(e),
        (d.total = d.items.length),
        "number" == typeof b.limit && (d.items = d.items.slice(0, b.limit)),
        d
      );
    });
  var b = function (a, b) {
      return "number" == typeof a && "number" == typeof b
        ? a > b
          ? 1
          : a < b
          ? -1
          : 0
        : ((a = i(String(a || ""))),
          (b = i(String(b || ""))),
          a > b ? 1 : b > a ? -1 : 0);
    },
    c = function (a, b) {
      var c, d, e, f;
      for (c = 1, d = arguments.length; c < d; c++)
        if ((f = arguments[c]))
          for (e in f) f.hasOwnProperty(e) && (a[e] = f[e]);
      return a;
    },
    d = function (a, b, c) {
      if (a && b) {
        if (!c) return a[b];
        for (var d = b.split("."); d.length && (a = a[d.shift()]); );
        return a;
      }
    },
    e = function (a) {
      return (a + "").replace(/^\s+|\s+$|/g, "");
    },
    f = function (a) {
      return (a + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    },
    g =
      Array.isArray ||
      ("undefined" != typeof $ && $.isArray) ||
      function (a) {
        return "[object Array]" === Object.prototype.toString.call(a);
      },
    h = {
      a: "[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]",
      b: "[b␢βΒB฿𐌁ᛒ]",
      c: "[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]",
      d: "[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]",
      e: "[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]",
      f: "[fƑƒḞḟ]",
      g: "[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]",
      h: "[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]",
      i: "[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]",
      j: "[jȷĴĵɈɉʝɟʲ]",
      k: "[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]",
      l: "[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]",
      n: "[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]",
      o: "[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]",
      p: "[pṔṕṖṗⱣᵽƤƥᵱ]",
      q: "[qꝖꝗʠɊɋꝘꝙq̃]",
      r: "[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]",
      s: "[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]",
      t: "[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]",
      u: "[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]",
      v: "[vṼṽṾṿƲʋꝞꝟⱱʋ]",
      w: "[wẂẃẀẁŴŵẄẅẆẇẈẉ]",
      x: "[xẌẍẊẋχ]",
      y: "[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]",
      z: "[zŹźẐẑŽžŻżẒẓẔẕƵƶ]",
    },
    i = (function () {
      var a,
        b,
        c,
        d,
        e = "",
        f = {};
      for (c in h)
        if (h.hasOwnProperty(c))
          for (
            d = h[c].substring(2, h[c].length - 1), e += d, a = 0, b = d.length;
            a < b;
            a++
          )
            f[d.charAt(a)] = c;
      var g = new RegExp("[" + e + "]", "g");
      return function (a) {
        return a
          .replace(g, function (a) {
            return f[a];
          })
          .toLowerCase();
      };
    })();
  return a;
}),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define("microplugin", b)
      : "object" == typeof exports
      ? (module.exports = b())
      : (a.MicroPlugin = b());
  })(this, function () {
    var a = {};
    a.mixin = function (a) {
      (a.plugins = {}),
        (a.prototype.initializePlugins = function (a) {
          var c,
            d,
            e,
            f = this,
            g = [];
          if (
            ((f.plugins = {
              names: [],
              settings: {},
              requested: {},
              loaded: {},
            }),
            b.isArray(a))
          )
            for (c = 0, d = a.length; c < d; c++)
              "string" == typeof a[c]
                ? g.push(a[c])
                : ((f.plugins.settings[a[c].name] = a[c].options),
                  g.push(a[c].name));
          else if (a)
            for (e in a)
              a.hasOwnProperty(e) &&
                ((f.plugins.settings[e] = a[e]), g.push(e));
          for (; g.length; ) f.require(g.shift());
        }),
        (a.prototype.loadPlugin = function (b) {
          var c = this,
            d = c.plugins,
            e = a.plugins[b];
          if (!a.plugins.hasOwnProperty(b))
            throw new Error('Unable to find "' + b + '" plugin');
          (d.requested[b] = !0),
            (d.loaded[b] = e.fn.apply(c, [c.plugins.settings[b] || {}])),
            d.names.push(b);
        }),
        (a.prototype.require = function (a) {
          var b = this,
            c = b.plugins;
          if (!b.plugins.loaded.hasOwnProperty(a)) {
            if (c.requested[a])
              throw new Error('Plugin has circular dependency ("' + a + '")');
            b.loadPlugin(a);
          }
          return c.loaded[a];
        }),
        (a.define = function (b, c) {
          a.plugins[b] = { name: b, fn: c };
        });
    };
    var b = {
      isArray:
        Array.isArray ||
        function (a) {
          return "[object Array]" === Object.prototype.toString.call(a);
        },
    };
    return a;
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define("selectize", ["jquery", "sifter", "microplugin"], b)
      : "object" == typeof exports
      ? (module.exports = b(
          require("jquery"),
          require("sifter"),
          require("microplugin")
        ))
      : (a.Selectize = b(a.jQuery, a.Sifter, a.MicroPlugin));
  })(this, function (a, b, c) {
    "use strict";
    var d = function (a, b) {
      if ("string" != typeof b || b.length) {
        var c = "string" == typeof b ? new RegExp(b, "i") : b,
          d = function (a) {
            var b = 0;
            if (3 === a.nodeType) {
              var e = a.data.search(c);
              if (e >= 0 && a.data.length > 0) {
                var f = a.data.match(c),
                  g = document.createElement("span");
                g.className = "highlight";
                var h = a.splitText(e),
                  i = (h.splitText(f[0].length), h.cloneNode(!0));
                g.appendChild(i), h.parentNode.replaceChild(g, h), (b = 1);
              }
            } else if (
              1 === a.nodeType &&
              a.childNodes &&
              !/(script|style)/i.test(a.tagName)
            )
              for (var j = 0; j < a.childNodes.length; ++j)
                j += d(a.childNodes[j]);
            return b;
          };
        return a.each(function () {
          d(this);
        });
      }
    };
    a.fn.removeHighlight = function () {
      return this.find("span.highlight")
        .each(function () {
          this.parentNode.firstChild.nodeName;
          var a = this.parentNode;
          a.replaceChild(this.firstChild, this), a.normalize();
        })
        .end();
    };
    var e = function () {};
    (e.prototype = {
      on: function (a, b) {
        (this._events = this._events || {}),
          (this._events[a] = this._events[a] || []),
          this._events[a].push(b);
      },
      off: function (a, b) {
        var c = arguments.length;
        return 0 === c
          ? delete this._events
          : 1 === c
          ? delete this._events[a]
          : ((this._events = this._events || {}),
            void (
              a in this._events != !1 &&
              this._events[a].splice(this._events[a].indexOf(b), 1)
            ));
      },
      trigger: function (a) {
        if (((this._events = this._events || {}), a in this._events != !1))
          for (var b = 0; b < this._events[a].length; b++)
            this._events[a][b].apply(
              this,
              Array.prototype.slice.call(arguments, 1)
            );
      },
    }),
      (e.mixin = function (a) {
        for (var b = ["on", "off", "trigger"], c = 0; c < b.length; c++)
          a.prototype[b[c]] = e.prototype[b[c]];
      });
    var f = /Mac/.test(navigator.userAgent),
      g = 65,
      h = 13,
      i = 27,
      j = 37,
      k = 38,
      l = 80,
      m = 39,
      n = 40,
      o = 78,
      p = 8,
      q = 46,
      r = 16,
      s = f ? 91 : 17,
      t = f ? 18 : 17,
      u = 9,
      v = 1,
      w = 2,
      x =
        !/android/i.test(window.navigator.userAgent) &&
        !!document.createElement("input").validity,
      y = function (a) {
        return "undefined" != typeof a;
      },
      z = function (a) {
        return "undefined" == typeof a || null === a
          ? null
          : "boolean" == typeof a
          ? a
            ? "1"
            : "0"
          : a + "";
      },
      A = function (a) {
        return (a + "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      },
      B = {};
    (B.before = function (a, b, c) {
      var d = a[b];
      a[b] = function () {
        return c.apply(a, arguments), d.apply(a, arguments);
      };
    }),
      (B.after = function (a, b, c) {
        var d = a[b];
        a[b] = function () {
          var b = d.apply(a, arguments);
          return c.apply(a, arguments), b;
        };
      });
    var C = function (a) {
        var b = !1;
        return function () {
          b || ((b = !0), a.apply(this, arguments));
        };
      },
      D = function (a, b) {
        var c;
        return function () {
          var d = this,
            e = arguments;
          window.clearTimeout(c),
            (c = window.setTimeout(function () {
              a.apply(d, e);
            }, b));
        };
      },
      E = function (a, b, c) {
        var d,
          e = a.trigger,
          f = {};
        (a.trigger = function () {
          var c = arguments[0];
          return b.indexOf(c) === -1
            ? e.apply(a, arguments)
            : void (f[c] = arguments);
        }),
          c.apply(a, []),
          (a.trigger = e);
        for (d in f) f.hasOwnProperty(d) && e.apply(a, f[d]);
      },
      F = function (a, b, c, d) {
        a.on(b, c, function (b) {
          for (var c = b.target; c && c.parentNode !== a[0]; ) c = c.parentNode;
          return (b.currentTarget = c), d.apply(this, [b]);
        });
      },
      G = function (a) {
        var b = {};
        if ("selectionStart" in a)
          (b.start = a.selectionStart), (b.length = a.selectionEnd - b.start);
        else if (document.selection) {
          a.focus();
          var c = document.selection.createRange(),
            d = document.selection.createRange().text.length;
          c.moveStart("character", -a.value.length),
            (b.start = c.text.length - d),
            (b.length = d);
        }
        return b;
      },
      H = function (a, b, c) {
        var d,
          e,
          f = {};
        if (c) for (d = 0, e = c.length; d < e; d++) f[c[d]] = a.css(c[d]);
        else f = a.css();
        b.css(f);
      },
      I = function (b, c) {
        if (!b) return 0;
        var d = a("<test>")
          .css({
            position: "absolute",
            top: -99999,
            left: -99999,
            width: "auto",
            padding: 0,
            whiteSpace: "pre",
          })
          .text(b)
          .appendTo("body");
        H(c, d, [
          "letterSpacing",
          "fontSize",
          "fontFamily",
          "fontWeight",
          "textTransform",
        ]);
        var e = d.width();
        return d.remove(), e;
      },
      J = function (a) {
        var b = null,
          c = function (c, d) {
            var e, f, g, h, i, j, k, l;
            (c = c || window.event || {}),
              (d = d || {}),
              c.metaKey ||
                c.altKey ||
                ((d.force || a.data("grow") !== !1) &&
                  ((e = a.val()),
                  c.type &&
                    "keydown" === c.type.toLowerCase() &&
                    ((f = c.keyCode),
                    (g =
                      (f >= 97 && f <= 122) ||
                      (f >= 65 && f <= 90) ||
                      (f >= 48 && f <= 57) ||
                      32 === f),
                    f === q || f === p
                      ? ((l = G(a[0])),
                        l.length
                          ? (e =
                              e.substring(0, l.start) +
                              e.substring(l.start + l.length))
                          : f === p && l.start
                          ? (e =
                              e.substring(0, l.start - 1) +
                              e.substring(l.start + 1))
                          : f === q &&
                            "undefined" != typeof l.start &&
                            (e =
                              e.substring(0, l.start) +
                              e.substring(l.start + 1)))
                      : g &&
                        ((j = c.shiftKey),
                        (k = String.fromCharCode(c.keyCode)),
                        (k = j ? k.toUpperCase() : k.toLowerCase()),
                        (e += k))),
                  (h = a.attr("placeholder")),
                  !e && h && (e = h),
                  (i = I(e, a) + 4),
                  i !== b &&
                    ((b = i), a.width(i), a.triggerHandler("resize"))));
          };
        a.on("keydown keyup update blur", c), c();
      },
      K = function (a) {
        var b = document.createElement("div");
        return b.appendChild(a.cloneNode(!0)), b.innerHTML;
      },
      L = function (a, b) {
        b || (b = {});
        var c = "Selectize";
        console.error(c + ": " + a),
          b.explanation &&
            (console.group && console.group(),
            console.error(b.explanation),
            console.group && console.groupEnd());
      },
      M = function (c, d) {
        var e,
          f,
          g,
          h,
          i = this;
        (h = c[0]), (h.selectize = i);
        var j = window.getComputedStyle && window.getComputedStyle(h, null);
        if (
          ((g = j
            ? j.getPropertyValue("direction")
            : h.currentStyle && h.currentStyle.direction),
          (g = g || c.parents("[dir]:first").attr("dir") || ""),
          a.extend(i, {
            order: 0,
            settings: d,
            $input: c,
            tabIndex: c.attr("tabindex") || "",
            tagType: "select" === h.tagName.toLowerCase() ? v : w,
            rtl: /rtl/i.test(g),
            eventNS: ".selectize" + ++M.count,
            highlightedValue: null,
            isOpen: !1,
            isDisabled: !1,
            isRequired: c.is("[required]"),
            isInvalid: !1,
            isLocked: !1,
            isFocused: !1,
            isInputHidden: !1,
            isSetup: !1,
            isShiftDown: !1,
            isCmdDown: !1,
            isCtrlDown: !1,
            ignoreFocus: !1,
            ignoreBlur: !1,
            ignoreHover: !1,
            hasOptions: !1,
            currentResults: null,
            lastValue: "",
            caretPos: 0,
            loading: 0,
            loadedSearches: {},
            $activeOption: null,
            $activeItems: [],
            optgroups: {},
            options: {},
            userOptions: {},
            items: [],
            renderCache: {},
            onSearchChange:
              null === d.loadThrottle
                ? i.onSearchChange
                : D(i.onSearchChange, d.loadThrottle),
          }),
          (i.sifter = new b(this.options, { diacritics: d.diacritics })),
          i.settings.options)
        ) {
          for (e = 0, f = i.settings.options.length; e < f; e++)
            i.registerOption(i.settings.options[e]);
          delete i.settings.options;
        }
        if (i.settings.optgroups) {
          for (e = 0, f = i.settings.optgroups.length; e < f; e++)
            i.registerOptionGroup(i.settings.optgroups[e]);
          delete i.settings.optgroups;
        }
        (i.settings.mode =
          i.settings.mode || (1 === i.settings.maxItems ? "single" : "multi")),
          "boolean" != typeof i.settings.hideSelected &&
            (i.settings.hideSelected = "multi" === i.settings.mode),
          i.initializePlugins(i.settings.plugins),
          i.setupCallbacks(),
          i.setupTemplates(),
          i.setup();
      };
    return (
      e.mixin(M),
      "undefined" != typeof c
        ? c.mixin(M)
        : L("Dependency MicroPlugin is missing", {
            explanation:
              'Make sure you either: (1) are using the "standalone" version of Selectize, or (2) require MicroPlugin before you load Selectize.',
          }),
      a.extend(M.prototype, {
        setup: function () {
          var b,
            c,
            d,
            e,
            g,
            h,
            i,
            j,
            k,
            l,
            m = this,
            n = m.settings,
            o = m.eventNS,
            p = a(window),
            q = a(document),
            u = m.$input;
          if (
            ((i = m.settings.mode),
            (j = u.attr("class") || ""),
            (b = a("<div>").addClass(n.wrapperClass).addClass(j).addClass(i)),
            (c = a("<div>")
              .addClass(n.inputClass)
              .addClass("items")
              .appendTo(b)),
            (d = a('<input type="text" autocomplete="off" />')
              .appendTo(c)
              .attr("tabindex", u.is(":disabled") ? "-1" : m.tabIndex)),
            (h = a(n.dropdownParent || b)),
            (e = a("<div>")
              .addClass(n.dropdownClass)
              .addClass(i)
              .hide()
              .appendTo(h)),
            (g = a("<div>").addClass(n.dropdownContentClass).appendTo(e)),
            (l = u.attr("id")) &&
              (d.attr("id", l + "-selectized"),
              a("label[for='" + l + "']").attr("for", l + "-selectized")),
            m.settings.copyClassesToDropdown && e.addClass(j),
            b.css({ width: u[0].style.width }),
            m.plugins.names.length &&
              ((k = "plugin-" + m.plugins.names.join(" plugin-")),
              b.addClass(k),
              e.addClass(k)),
            (null === n.maxItems || n.maxItems > 1) &&
              m.tagType === v &&
              u.attr("multiple", "multiple"),
            m.settings.placeholder && d.attr("placeholder", n.placeholder),
            !m.settings.splitOn && m.settings.delimiter)
          ) {
            var w = m.settings.delimiter.replace(
              /[-\/\\^$*+?.()|[\]{}]/g,
              "\\$&"
            );
            m.settings.splitOn = new RegExp("\\s*" + w + "+\\s*");
          }
          u.attr("autocorrect") && d.attr("autocorrect", u.attr("autocorrect")),
            u.attr("autocapitalize") &&
              d.attr("autocapitalize", u.attr("autocapitalize")),
            (m.$wrapper = b),
            (m.$control = c),
            (m.$control_input = d),
            (m.$dropdown = e),
            (m.$dropdown_content = g),
            e.on("mouseenter", "[data-selectable]", function () {
              return m.onOptionHover.apply(m, arguments);
            }),
            e.on("mousedown click", "[data-selectable]", function () {
              return m.onOptionSelect.apply(m, arguments);
            }),
            F(c, "mousedown", "*:not(input)", function () {
              return m.onItemSelect.apply(m, arguments);
            }),
            J(d),
            c.on({
              mousedown: function () {
                return m.onMouseDown.apply(m, arguments);
              },
              click: function () {
                return m.onClick.apply(m, arguments);
              },
            }),
            d.on({
              mousedown: function (a) {
                a.stopPropagation();
              },
              keydown: function () {
                return m.onKeyDown.apply(m, arguments);
              },
              keyup: function () {
                return m.onKeyUp.apply(m, arguments);
              },
              keypress: function () {
                return m.onKeyPress.apply(m, arguments);
              },
              resize: function () {
                m.positionDropdown.apply(m, []);
              },
              blur: function () {
                return m.onBlur.apply(m, arguments);
              },
              focus: function () {
                return (m.ignoreBlur = !1), m.onFocus.apply(m, arguments);
              },
              paste: function () {
                return m.onPaste.apply(m, arguments);
              },
            }),
            q.on("keydown" + o, function (a) {
              (m.isCmdDown = a[f ? "metaKey" : "ctrlKey"]),
                (m.isCtrlDown = a[f ? "altKey" : "ctrlKey"]),
                (m.isShiftDown = a.shiftKey);
            }),
            q.on("keyup" + o, function (a) {
              a.keyCode === t && (m.isCtrlDown = !1),
                a.keyCode === r && (m.isShiftDown = !1),
                a.keyCode === s && (m.isCmdDown = !1);
            }),
            q.on("mousedown" + o, function (a) {
              if (m.isFocused) {
                if (
                  a.target === m.$dropdown[0] ||
                  a.target.parentNode === m.$dropdown[0]
                )
                  return !1;
                m.$control.has(a.target).length ||
                  a.target === m.$control[0] ||
                  m.blur(a.target);
              }
            }),
            p.on(["scroll" + o, "resize" + o].join(" "), function () {
              m.isOpen && m.positionDropdown.apply(m, arguments);
            }),
            p.on("mousemove" + o, function () {
              m.ignoreHover = !1;
            }),
            (this.revertSettings = {
              $children: u.children().detach(),
              tabindex: u.attr("tabindex"),
            }),
            u.attr("tabindex", -1).hide().after(m.$wrapper),
            a.isArray(n.items) && (m.setValue(n.items), delete n.items),
            x &&
              u.on("invalid" + o, function (a) {
                a.preventDefault(), (m.isInvalid = !0), m.refreshState();
              }),
            m.updateOriginalInput(),
            m.refreshItems(),
            m.refreshState(),
            m.updatePlaceholder(),
            (m.isSetup = !0),
            u.is(":disabled") && m.disable(),
            m.on("change", this.onChange),
            u.data("selectize", m),
            u.addClass("selectized"),
            m.trigger("initialize"),
            n.preload === !0 && m.onSearchChange("");
        },
        setupTemplates: function () {
          var b = this,
            c = b.settings.labelField,
            d = b.settings.optgroupLabelField,
            e = {
              optgroup: function (a) {
                return '<div class="optgroup">' + a.html + "</div>";
              },
              optgroup_header: function (a, b) {
                return '<div class="optgroup-header">' + b(a[d]) + "</div>";
              },
              option: function (a, b) {
                return '<div class="option">' + b(a[c]) + "</div>";
              },
              item: function (a, b) {
                return '<div class="item">' + b(a[c]) + "</div>";
              },
              option_create: function (a, b) {
                return (
                  '<div class="create">Add <strong>' +
                  b(a.input) +
                  "</strong>&hellip;</div>"
                );
              },
            };
          b.settings.render = a.extend({}, e, b.settings.render);
        },
        setupCallbacks: function () {
          var a,
            b,
            c = {
              initialize: "onInitialize",
              change: "onChange",
              item_add: "onItemAdd",
              item_remove: "onItemRemove",
              clear: "onClear",
              option_add: "onOptionAdd",
              option_remove: "onOptionRemove",
              option_clear: "onOptionClear",
              optgroup_add: "onOptionGroupAdd",
              optgroup_remove: "onOptionGroupRemove",
              optgroup_clear: "onOptionGroupClear",
              dropdown_open: "onDropdownOpen",
              dropdown_close: "onDropdownClose",
              type: "onType",
              load: "onLoad",
              focus: "onFocus",
              blur: "onBlur",
            };
          for (a in c)
            c.hasOwnProperty(a) &&
              ((b = this.settings[c[a]]), b && this.on(a, b));
        },
        onClick: function (a) {
          var b = this;
          b.isFocused || (b.focus(), a.preventDefault());
        },
        onMouseDown: function (b) {
          var c = this,
            d = b.isDefaultPrevented();
          a(b.target);
          if (c.isFocused) {
            if (b.target !== c.$control_input[0])
              return (
                "single" === c.settings.mode
                  ? c.isOpen
                    ? c.close()
                    : c.open()
                  : d || c.setActiveItem(null),
                !1
              );
          } else
            d ||
              window.setTimeout(function () {
                c.focus();
              }, 0);
        },
        onChange: function () {
          this.$input.trigger("change");
        },
        onPaste: function (b) {
          var c = this;
          return c.isFull() || c.isInputHidden || c.isLocked
            ? void b.preventDefault()
            : void (
                c.settings.splitOn &&
                setTimeout(function () {
                  var b = c.$control_input.val();
                  if (b.match(c.settings.splitOn))
                    for (
                      var d = a.trim(b).split(c.settings.splitOn),
                        e = 0,
                        f = d.length;
                      e < f;
                      e++
                    )
                      c.createItem(d[e]);
                }, 0)
              );
        },
        onKeyPress: function (a) {
          if (this.isLocked) return a && a.preventDefault();
          var b = String.fromCharCode(a.keyCode || a.which);
          return this.settings.create &&
            "multi" === this.settings.mode &&
            b === this.settings.delimiter
            ? (this.createItem(), a.preventDefault(), !1)
            : void 0;
        },
        onKeyDown: function (a) {
          var b = (a.target === this.$control_input[0], this);
          if (b.isLocked) return void (a.keyCode !== u && a.preventDefault());
          switch (a.keyCode) {
            case g:
              if (b.isCmdDown) return void b.selectAll();
              break;
            case i:
              return void (
                b.isOpen && (a.preventDefault(), a.stopPropagation(), b.close())
              );
            case o:
              if (!a.ctrlKey || a.altKey) break;
            case n:
              if (!b.isOpen && b.hasOptions) b.open();
              else if (b.$activeOption) {
                b.ignoreHover = !0;
                var c = b.getAdjacentOption(b.$activeOption, 1);
                c.length && b.setActiveOption(c, !0, !0);
              }
              return void a.preventDefault();
            case l:
              if (!a.ctrlKey || a.altKey) break;
            case k:
              if (b.$activeOption) {
                b.ignoreHover = !0;
                var d = b.getAdjacentOption(b.$activeOption, -1);
                d.length && b.setActiveOption(d, !0, !0);
              }
              return void a.preventDefault();
            case h:
              return void (
                b.isOpen &&
                b.$activeOption &&
                (b.onOptionSelect({ currentTarget: b.$activeOption }),
                a.preventDefault())
              );
            case j:
              return void b.advanceSelection(-1, a);
            case m:
              return void b.advanceSelection(1, a);
            case u:
              return (
                b.settings.selectOnTab &&
                  b.isOpen &&
                  b.$activeOption &&
                  (b.onOptionSelect({ currentTarget: b.$activeOption }),
                  b.isFull() || a.preventDefault()),
                void (b.settings.create && b.createItem() && a.preventDefault())
              );
            case p:
            case q:
              return void b.deleteSelection(a);
          }
          return (!b.isFull() && !b.isInputHidden) ||
            (f ? a.metaKey : a.ctrlKey)
            ? void 0
            : void a.preventDefault();
        },
        onKeyUp: function (a) {
          var b = this;
          if (b.isLocked) return a && a.preventDefault();
          var c = b.$control_input.val() || "";
          b.lastValue !== c &&
            ((b.lastValue = c),
            b.onSearchChange(c),
            b.refreshOptions(),
            b.trigger("type", c));
        },
        onSearchChange: function (a) {
          var b = this,
            c = b.settings.load;
          c &&
            (b.loadedSearches.hasOwnProperty(a) ||
              ((b.loadedSearches[a] = !0),
              b.load(function (d) {
                c.apply(b, [a, d]);
              })));
        },
        onFocus: function (a) {
          var b = this,
            c = b.isFocused;
          return b.isDisabled
            ? (b.blur(), a && a.preventDefault(), !1)
            : void (
                b.ignoreFocus ||
                ((b.isFocused = !0),
                "focus" === b.settings.preload && b.onSearchChange(""),
                c || b.trigger("focus"),
                b.$activeItems.length ||
                  (b.showInput(),
                  b.setActiveItem(null),
                  b.refreshOptions(!!b.settings.openOnFocus)),
                b.refreshState())
              );
        },
        onBlur: function (a, b) {
          var c = this;
          if (c.isFocused && ((c.isFocused = !1), !c.ignoreFocus)) {
            if (
              !c.ignoreBlur &&
              document.activeElement === c.$dropdown_content[0]
            )
              return (c.ignoreBlur = !0), void c.onFocus(a);
            var d = function () {
              c.close(),
                c.setTextboxValue(""),
                c.setActiveItem(null),
                c.setActiveOption(null),
                c.setCaret(c.items.length),
                c.refreshState(),
                b && b.focus && b.focus(),
                (c.ignoreFocus = !1),
                c.trigger("blur");
            };
            (c.ignoreFocus = !0),
              c.settings.create && c.settings.createOnBlur
                ? c.createItem(null, !1, d)
                : d();
          }
        },
        onOptionHover: function (a) {
          this.ignoreHover || this.setActiveOption(a.currentTarget, !1);
        },
        onOptionSelect: function (b) {
          var c,
            d,
            e = this;
          b.preventDefault && (b.preventDefault(), b.stopPropagation()),
            (d = a(b.currentTarget)),
            d.hasClass("create")
              ? e.createItem(null, function () {
                  e.settings.closeAfterSelect && e.close();
                })
              : ((c = d.attr("data-value")),
                "undefined" != typeof c &&
                  ((e.lastQuery = null),
                  e.setTextboxValue(""),
                  e.addItem(c),
                  e.settings.closeAfterSelect
                    ? e.close()
                    : !e.settings.hideSelected &&
                      b.type &&
                      /mouse/.test(b.type) &&
                      e.setActiveOption(e.getOption(c))));
        },
        onItemSelect: function (a) {
          var b = this;
          b.isLocked ||
            ("multi" === b.settings.mode &&
              (a.preventDefault(), b.setActiveItem(a.currentTarget, a)));
        },
        load: function (a) {
          var b = this,
            c = b.$wrapper.addClass(b.settings.loadingClass);
          b.loading++,
            a.apply(b, [
              function (a) {
                (b.loading = Math.max(b.loading - 1, 0)),
                  a &&
                    a.length &&
                    (b.addOption(a),
                    b.refreshOptions(b.isFocused && !b.isInputHidden)),
                  b.loading || c.removeClass(b.settings.loadingClass),
                  b.trigger("load", a);
              },
            ]);
        },
        setTextboxValue: function (a) {
          var b = this.$control_input,
            c = b.val() !== a;
          c && (b.val(a).triggerHandler("update"), (this.lastValue = a));
        },
        getValue: function () {
          return this.tagType === v && this.$input.attr("multiple")
            ? this.items
            : this.items.join(this.settings.delimiter);
        },
        setValue: function (a, b) {
          var c = b ? [] : ["change"];
          E(this, c, function () {
            this.clear(b), this.addItems(a, b);
          });
        },
        setActiveItem: function (b, c) {
          var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l = this;
          if ("single" !== l.settings.mode) {
            if (((b = a(b)), !b.length))
              return (
                a(l.$activeItems).removeClass("active"),
                (l.$activeItems = []),
                void (l.isFocused && l.showInput())
              );
            if (
              ((d = c && c.type.toLowerCase()),
              "mousedown" === d && l.isShiftDown && l.$activeItems.length)
            ) {
              for (
                k = l.$control.children(".active:last"),
                  g = Array.prototype.indexOf.apply(l.$control[0].childNodes, [
                    k[0],
                  ]),
                  h = Array.prototype.indexOf.apply(l.$control[0].childNodes, [
                    b[0],
                  ]),
                  g > h && ((j = g), (g = h), (h = j)),
                  e = g;
                e <= h;
                e++
              )
                (i = l.$control[0].childNodes[e]),
                  l.$activeItems.indexOf(i) === -1 &&
                    (a(i).addClass("active"), l.$activeItems.push(i));
              c.preventDefault();
            } else
              ("mousedown" === d && l.isCtrlDown) ||
              ("keydown" === d && this.isShiftDown)
                ? b.hasClass("active")
                  ? ((f = l.$activeItems.indexOf(b[0])),
                    l.$activeItems.splice(f, 1),
                    b.removeClass("active"))
                  : l.$activeItems.push(b.addClass("active")[0])
                : (a(l.$activeItems).removeClass("active"),
                  (l.$activeItems = [b.addClass("active")[0]]));
            l.hideInput(), this.isFocused || l.focus();
          }
        },
        setActiveOption: function (b, c, d) {
          var e,
            f,
            g,
            h,
            i,
            j = this;
          j.$activeOption && j.$activeOption.removeClass("active"),
            (j.$activeOption = null),
            (b = a(b)),
            b.length &&
              ((j.$activeOption = b.addClass("active")),
              (!c && y(c)) ||
                ((e = j.$dropdown_content.height()),
                (f = j.$activeOption.outerHeight(!0)),
                (c = j.$dropdown_content.scrollTop() || 0),
                (g =
                  j.$activeOption.offset().top -
                  j.$dropdown_content.offset().top +
                  c),
                (h = g),
                (i = g - e + f),
                g + f > e + c
                  ? j.$dropdown_content
                      .stop()
                      .animate(
                        { scrollTop: i },
                        d ? j.settings.scrollDuration : 0
                      )
                  : g < c &&
                    j.$dropdown_content
                      .stop()
                      .animate(
                        { scrollTop: h },
                        d ? j.settings.scrollDuration : 0
                      )));
        },
        selectAll: function () {
          var a = this;
          "single" !== a.settings.mode &&
            ((a.$activeItems = Array.prototype.slice.apply(
              a.$control.children(":not(input)").addClass("active")
            )),
            a.$activeItems.length && (a.hideInput(), a.close()),
            a.focus());
        },
        hideInput: function () {
          var a = this;
          a.setTextboxValue(""),
            a.$control_input.css({
              opacity: 0,
              position: "absolute",
              left: a.rtl ? 1e4 : -1e4,
            }),
            (a.isInputHidden = !0);
        },
        showInput: function () {
          this.$control_input.css({
            opacity: 1,
            position: "relative",
            left: 0,
          }),
            (this.isInputHidden = !1);
        },
        focus: function () {
          var a = this;
          a.isDisabled ||
            ((a.ignoreFocus = !0),
            a.$control_input[0].focus(),
            window.setTimeout(function () {
              (a.ignoreFocus = !1), a.onFocus();
            }, 0));
        },
        blur: function (a) {
          this.$control_input[0].blur(), this.onBlur(null, a);
        },
        getScoreFunction: function (a) {
          return this.sifter.getScoreFunction(a, this.getSearchOptions());
        },
        getSearchOptions: function () {
          var a = this.settings,
            b = a.sortField;
          return (
            "string" == typeof b && (b = [{ field: b }]),
            { fields: a.searchField, conjunction: a.searchConjunction, sort: b }
          );
        },
        search: function (b) {
          var c,
            d,
            e,
            f = this,
            g = f.settings,
            h = this.getSearchOptions();
          if (
            g.score &&
            ((e = f.settings.score.apply(this, [b])), "function" != typeof e)
          )
            throw new Error(
              'Selectize "score" setting must be a function that returns a function'
            );
          if (
            (b !== f.lastQuery
              ? ((f.lastQuery = b),
                (d = f.sifter.search(b, a.extend(h, { score: e }))),
                (f.currentResults = d))
              : (d = a.extend(!0, {}, f.currentResults)),
            g.hideSelected)
          )
            for (c = d.items.length - 1; c >= 0; c--)
              f.items.indexOf(z(d.items[c].id)) !== -1 && d.items.splice(c, 1);
          return d;
        },
        refreshOptions: function (b) {
          var c, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
          "undefined" == typeof b && (b = !0);
          var t = this,
            u = a.trim(t.$control_input.val()),
            v = t.search(u),
            w = t.$dropdown_content,
            x = t.$activeOption && z(t.$activeOption.attr("data-value"));
          for (
            g = v.items.length,
              "number" == typeof t.settings.maxOptions &&
                (g = Math.min(g, t.settings.maxOptions)),
              h = {},
              i = [],
              c = 0;
            c < g;
            c++
          )
            for (
              j = t.options[v.items[c].id],
                k = t.render("option", j),
                l = j[t.settings.optgroupField] || "",
                m = a.isArray(l) ? l : [l],
                e = 0,
                f = m && m.length;
              e < f;
              e++
            )
              (l = m[e]),
                t.optgroups.hasOwnProperty(l) || (l = ""),
                h.hasOwnProperty(l) ||
                  ((h[l] = document.createDocumentFragment()), i.push(l)),
                h[l].appendChild(k);
          for (
            this.settings.lockOptgroupOrder &&
              i.sort(function (a, b) {
                var c = t.optgroups[a].$order || 0,
                  d = t.optgroups[b].$order || 0;
                return c - d;
              }),
              n = document.createDocumentFragment(),
              c = 0,
              g = i.length;
            c < g;
            c++
          )
            (l = i[c]),
              t.optgroups.hasOwnProperty(l) && h[l].childNodes.length
                ? ((o = document.createDocumentFragment()),
                  o.appendChild(t.render("optgroup_header", t.optgroups[l])),
                  o.appendChild(h[l]),
                  n.appendChild(
                    t.render(
                      "optgroup",
                      a.extend({}, t.optgroups[l], { html: K(o), dom: o })
                    )
                  ))
                : n.appendChild(h[l]);
          if (
            (w.html(n),
            t.settings.highlight && v.query.length && v.tokens.length)
          )
            for (w.removeHighlight(), c = 0, g = v.tokens.length; c < g; c++)
              d(w, v.tokens[c].regex);
          if (!t.settings.hideSelected)
            for (c = 0, g = t.items.length; c < g; c++)
              t.getOption(t.items[c]).addClass("selected");
          (p = t.canCreate(u)),
            p &&
              (w.prepend(t.render("option_create", { input: u })),
              (s = a(w[0].childNodes[0]))),
            (t.hasOptions = v.items.length > 0 || p),
            t.hasOptions
              ? (v.items.length > 0
                  ? ((r = x && t.getOption(x)),
                    r && r.length
                      ? (q = r)
                      : "single" === t.settings.mode &&
                        t.items.length &&
                        (q = t.getOption(t.items[0])),
                    (q && q.length) ||
                      (q =
                        s && !t.settings.addPrecedence
                          ? t.getAdjacentOption(s, 1)
                          : w.find("[data-selectable]:first")))
                  : (q = s),
                t.setActiveOption(q),
                b && !t.isOpen && t.open())
              : (t.setActiveOption(null), b && t.isOpen && t.close());
        },
        addOption: function (b) {
          var c,
            d,
            e,
            f = this;
          if (a.isArray(b))
            for (c = 0, d = b.length; c < d; c++) f.addOption(b[c]);
          else
            (e = f.registerOption(b)) &&
              ((f.userOptions[e] = !0),
              (f.lastQuery = null),
              f.trigger("option_add", e, b));
        },
        registerOption: function (a) {
          var b = z(a[this.settings.valueField]);
          return (
            "undefined" != typeof b &&
            null !== b &&
            !this.options.hasOwnProperty(b) &&
            ((a.$order = a.$order || ++this.order), (this.options[b] = a), b)
          );
        },
        registerOptionGroup: function (a) {
          var b = z(a[this.settings.optgroupValueField]);
          return (
            !!b &&
            ((a.$order = a.$order || ++this.order), (this.optgroups[b] = a), b)
          );
        },
        addOptionGroup: function (a, b) {
          (b[this.settings.optgroupValueField] = a),
            (a = this.registerOptionGroup(b)) &&
              this.trigger("optgroup_add", a, b);
        },
        removeOptionGroup: function (a) {
          this.optgroups.hasOwnProperty(a) &&
            (delete this.optgroups[a],
            (this.renderCache = {}),
            this.trigger("optgroup_remove", a));
        },
        clearOptionGroups: function () {
          (this.optgroups = {}),
            (this.renderCache = {}),
            this.trigger("optgroup_clear");
        },
        updateOption: function (b, c) {
          var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k = this;
          if (
            ((b = z(b)),
            (f = z(c[k.settings.valueField])),
            null !== b && k.options.hasOwnProperty(b))
          ) {
            if ("string" != typeof f)
              throw new Error("Value must be set in option data");
            (j = k.options[b].$order),
              f !== b &&
                (delete k.options[b],
                (g = k.items.indexOf(b)),
                g !== -1 && k.items.splice(g, 1, f)),
              (c.$order = c.$order || j),
              (k.options[f] = c),
              (h = k.renderCache.item),
              (i = k.renderCache.option),
              h && (delete h[b], delete h[f]),
              i && (delete i[b], delete i[f]),
              k.items.indexOf(f) !== -1 &&
                ((d = k.getItem(b)),
                (e = a(k.render("item", c))),
                d.hasClass("active") && e.addClass("active"),
                d.replaceWith(e)),
              (k.lastQuery = null),
              k.isOpen && k.refreshOptions(!1);
          }
        },
        removeOption: function (a, b) {
          var c = this;
          a = z(a);
          var d = c.renderCache.item,
            e = c.renderCache.option;
          d && delete d[a],
            e && delete e[a],
            delete c.userOptions[a],
            delete c.options[a],
            (c.lastQuery = null),
            c.trigger("option_remove", a),
            c.removeItem(a, b);
        },
        clearOptions: function () {
          var a = this;
          (a.loadedSearches = {}),
            (a.userOptions = {}),
            (a.renderCache = {}),
            (a.options = a.sifter.items = {}),
            (a.lastQuery = null),
            a.trigger("option_clear"),
            a.clear();
        },
        getOption: function (a) {
          return this.getElementWithValue(
            a,
            this.$dropdown_content.find("[data-selectable]")
          );
        },
        getAdjacentOption: function (b, c) {
          var d = this.$dropdown.find("[data-selectable]"),
            e = d.index(b) + c;
          return e >= 0 && e < d.length ? d.eq(e) : a();
        },
        getElementWithValue: function (b, c) {
          if (((b = z(b)), "undefined" != typeof b && null !== b))
            for (var d = 0, e = c.length; d < e; d++)
              if (c[d].getAttribute("data-value") === b) return a(c[d]);
          return a();
        },
        getItem: function (a) {
          return this.getElementWithValue(a, this.$control.children());
        },
        addItems: function (b, c) {
          for (var d = a.isArray(b) ? b : [b], e = 0, f = d.length; e < f; e++)
            (this.isPending = e < f - 1), this.addItem(d[e], c);
        },
        addItem: function (b, c) {
          var d = c ? [] : ["change"];
          E(this, d, function () {
            var d,
              e,
              f,
              g,
              h,
              i = this,
              j = i.settings.mode;
            return (
              (b = z(b)),
              i.items.indexOf(b) !== -1
                ? void ("single" === j && i.close())
                : void (
                    i.options.hasOwnProperty(b) &&
                    ("single" === j && i.clear(c),
                    ("multi" === j && i.isFull()) ||
                      ((d = a(i.render("item", i.options[b]))),
                      (h = i.isFull()),
                      i.items.splice(i.caretPos, 0, b),
                      i.insertAtCaret(d),
                      (!i.isPending || (!h && i.isFull())) && i.refreshState(),
                      i.isSetup &&
                        ((f = i.$dropdown_content.find("[data-selectable]")),
                        i.isPending ||
                          ((e = i.getOption(b)),
                          (g = i.getAdjacentOption(e, 1).attr("data-value")),
                          i.refreshOptions(i.isFocused && "single" !== j),
                          g && i.setActiveOption(i.getOption(g))),
                        !f.length || i.isFull()
                          ? i.close()
                          : i.positionDropdown(),
                        i.updatePlaceholder(),
                        i.trigger("item_add", b, d),
                        i.updateOriginalInput({ silent: c }))))
                  )
            );
          });
        },
        removeItem: function (b, c) {
          var d,
            e,
            f,
            g = this;
          (d = b instanceof a ? b : g.getItem(b)),
            (b = z(d.attr("data-value"))),
            (e = g.items.indexOf(b)),
            e !== -1 &&
              (d.remove(),
              d.hasClass("active") &&
                ((f = g.$activeItems.indexOf(d[0])),
                g.$activeItems.splice(f, 1)),
              g.items.splice(e, 1),
              (g.lastQuery = null),
              !g.settings.persist &&
                g.userOptions.hasOwnProperty(b) &&
                g.removeOption(b, c),
              e < g.caretPos && g.setCaret(g.caretPos - 1),
              g.refreshState(),
              g.updatePlaceholder(),
              g.updateOriginalInput({ silent: c }),
              g.positionDropdown(),
              g.trigger("item_remove", b, d));
        },
        createItem: function (b, c) {
          var d = this,
            e = d.caretPos;
          b = b || a.trim(d.$control_input.val() || "");
          var f = arguments[arguments.length - 1];
          if (
            ("function" != typeof f && (f = function () {}),
            "boolean" != typeof c && (c = !0),
            !d.canCreate(b))
          )
            return f(), !1;
          d.lock();
          var g =
              "function" == typeof d.settings.create
                ? this.settings.create
                : function (a) {
                    var b = {};
                    return (
                      (b[d.settings.labelField] = a),
                      (b[d.settings.valueField] = a),
                      b
                    );
                  },
            h = C(function (a) {
              if ((d.unlock(), !a || "object" != typeof a)) return f();
              var b = z(a[d.settings.valueField]);
              return "string" != typeof b
                ? f()
                : (d.setTextboxValue(""),
                  d.addOption(a),
                  d.setCaret(e),
                  d.addItem(b),
                  d.refreshOptions(c && "single" !== d.settings.mode),
                  void f(a));
            }),
            i = g.apply(this, [b, h]);
          return "undefined" != typeof i && h(i), !0;
        },
        refreshItems: function () {
          (this.lastQuery = null),
            this.isSetup && this.addItem(this.items),
            this.refreshState(),
            this.updateOriginalInput();
        },
        refreshState: function () {
          this.refreshValidityState(), this.refreshClasses();
        },
        refreshValidityState: function () {
          if (!this.isRequired) return !1;
          var a = !this.items.length;
          (this.isInvalid = a),
            this.$control_input.prop("required", a),
            this.$input.prop("required", !a);
        },
        refreshClasses: function () {
          var b = this,
            c = b.isFull(),
            d = b.isLocked;
          b.$wrapper.toggleClass("rtl", b.rtl),
            b.$control
              .toggleClass("focus", b.isFocused)
              .toggleClass("disabled", b.isDisabled)
              .toggleClass("required", b.isRequired)
              .toggleClass("invalid", b.isInvalid)
              .toggleClass("locked", d)
              .toggleClass("full", c)
              .toggleClass("not-full", !c)
              .toggleClass("input-active", b.isFocused && !b.isInputHidden)
              .toggleClass("dropdown-active", b.isOpen)
              .toggleClass("has-options", !a.isEmptyObject(b.options))
              .toggleClass("has-items", b.items.length > 0),
            b.$control_input.data("grow", !c && !d);
        },
        isFull: function () {
          return (
            null !== this.settings.maxItems &&
            this.items.length >= this.settings.maxItems
          );
        },
        updateOriginalInput: function (a) {
          var b,
            c,
            d,
            e,
            f = this;
          if (((a = a || {}), f.tagType === v)) {
            for (d = [], b = 0, c = f.items.length; b < c; b++)
              (e = f.options[f.items[b]][f.settings.labelField] || ""),
                d.push(
                  '<option value="' +
                    A(f.items[b]) +
                    '" selected="selected">' +
                    A(e) +
                    "</option>"
                );
            d.length ||
              this.$input.attr("multiple") ||
              d.push('<option value="" selected="selected"></option>'),
              f.$input.html(d.join(""));
          } else
            f.$input.val(f.getValue()), f.$input.attr("value", f.$input.val());
          f.isSetup && (a.silent || f.trigger("change", f.$input.val()));
        },
        updatePlaceholder: function () {
          if (this.settings.placeholder) {
            var a = this.$control_input;
            this.items.length
              ? a.removeAttr("placeholder")
              : a.attr("placeholder", this.settings.placeholder),
              a.triggerHandler("update", { force: !0 });
          }
        },
        open: function () {
          var a = this;
          a.isLocked ||
            a.isOpen ||
            ("multi" === a.settings.mode && a.isFull()) ||
            (a.focus(),
            (a.isOpen = !0),
            a.refreshState(),
            a.$dropdown.css({ visibility: "hidden", display: "block" }),
            a.positionDropdown(),
            a.$dropdown.css({ visibility: "visible" }),
            a.trigger("dropdown_open", a.$dropdown));
        },
        close: function () {
          var a = this,
            b = a.isOpen;
          "single" === a.settings.mode &&
            a.items.length &&
            (a.hideInput(), a.$control_input.blur()),
            (a.isOpen = !1),
            a.$dropdown.hide(),
            a.setActiveOption(null),
            a.refreshState(),
            b && a.trigger("dropdown_close", a.$dropdown);
        },
        positionDropdown: function () {
          var a = this.$control,
            b =
              "body" === this.settings.dropdownParent
                ? a.offset()
                : a.position();
          (b.top += a.outerHeight(!0)),
            this.$dropdown.css({
              width: a.outerWidth(),
              top: b.top,
              left: b.left,
            });
        },
        clear: function (a) {
          var b = this;
          b.items.length &&
            (b.$control.children(":not(input)").remove(),
            (b.items = []),
            (b.lastQuery = null),
            b.setCaret(0),
            b.setActiveItem(null),
            b.updatePlaceholder(),
            b.updateOriginalInput({ silent: a }),
            b.refreshState(),
            b.showInput(),
            b.trigger("clear"));
        },
        insertAtCaret: function (b) {
          var c = Math.min(this.caretPos, this.items.length);
          0 === c
            ? this.$control.prepend(b)
            : a(this.$control[0].childNodes[c]).before(b),
            this.setCaret(c + 1);
        },
        deleteSelection: function (b) {
          var c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l = this;
          if (
            ((e = b && b.keyCode === p ? -1 : 1),
            (f = G(l.$control_input[0])),
            l.$activeOption &&
              !l.settings.hideSelected &&
              (i = l.getAdjacentOption(l.$activeOption, -1).attr("data-value")),
            (g = []),
            l.$activeItems.length)
          ) {
            for (
              k = l.$control.children(".active:" + (e > 0 ? "last" : "first")),
                h = l.$control.children(":not(input)").index(k),
                e > 0 && h++,
                c = 0,
                d = l.$activeItems.length;
              c < d;
              c++
            )
              g.push(a(l.$activeItems[c]).attr("data-value"));
            b && (b.preventDefault(), b.stopPropagation());
          } else
            (l.isFocused || "single" === l.settings.mode) &&
              l.items.length &&
              (e < 0 && 0 === f.start && 0 === f.length
                ? g.push(l.items[l.caretPos - 1])
                : e > 0 &&
                  f.start === l.$control_input.val().length &&
                  g.push(l.items[l.caretPos]));
          if (
            !g.length ||
            ("function" == typeof l.settings.onDelete &&
              l.settings.onDelete.apply(l, [g]) === !1)
          )
            return !1;
          for ("undefined" != typeof h && l.setCaret(h); g.length; )
            l.removeItem(g.pop());
          return (
            l.showInput(),
            l.positionDropdown(),
            l.refreshOptions(!0),
            i && ((j = l.getOption(i)), j.length && l.setActiveOption(j)),
            !0
          );
        },
        advanceSelection: function (a, b) {
          var c,
            d,
            e,
            f,
            g,
            h,
            i = this;
          0 !== a &&
            (i.rtl && (a *= -1),
            (c = a > 0 ? "last" : "first"),
            (d = G(i.$control_input[0])),
            i.isFocused && !i.isInputHidden
              ? ((f = i.$control_input.val().length),
                (g = a < 0 ? 0 === d.start && 0 === d.length : d.start === f),
                g && !f && i.advanceCaret(a, b))
              : ((h = i.$control.children(".active:" + c)),
                h.length &&
                  ((e = i.$control.children(":not(input)").index(h)),
                  i.setActiveItem(null),
                  i.setCaret(a > 0 ? e + 1 : e))));
        },
        advanceCaret: function (a, b) {
          var c,
            d,
            e = this;
          0 !== a &&
            ((c = a > 0 ? "next" : "prev"),
            e.isShiftDown
              ? ((d = e.$control_input[c]()),
                d.length &&
                  (e.hideInput(), e.setActiveItem(d), b && b.preventDefault()))
              : e.setCaret(e.caretPos + a));
        },
        setCaret: function (b) {
          var c = this;
          if (
            ((b =
              "single" === c.settings.mode
                ? c.items.length
                : Math.max(0, Math.min(c.items.length, b))),
            !c.isPending)
          ) {
            var d, e, f, g;
            for (
              f = c.$control.children(":not(input)"), d = 0, e = f.length;
              d < e;
              d++
            )
              (g = a(f[d]).detach()),
                d < b ? c.$control_input.before(g) : c.$control.append(g);
          }
          c.caretPos = b;
        },
        lock: function () {
          this.close(), (this.isLocked = !0), this.refreshState();
        },
        unlock: function () {
          (this.isLocked = !1), this.refreshState();
        },
        disable: function () {
          var a = this;
          a.$input.prop("disabled", !0),
            a.$control_input.prop("disabled", !0).prop("tabindex", -1),
            (a.isDisabled = !0),
            a.lock();
        },
        enable: function () {
          var a = this;
          a.$input.prop("disabled", !1),
            a.$control_input.prop("disabled", !1).prop("tabindex", a.tabIndex),
            (a.isDisabled = !1),
            a.unlock();
        },
        destroy: function () {
          var b = this,
            c = b.eventNS,
            d = b.revertSettings;
          b.trigger("destroy"),
            b.off(),
            b.$wrapper.remove(),
            b.$dropdown.remove(),
            b.$input
              .html("")
              .append(d.$children)
              .removeAttr("tabindex")
              .removeClass("selectized")
              .attr({ tabindex: d.tabindex })
              .show(),
            b.$control_input.removeData("grow"),
            b.$input.removeData("selectize"),
            a(window).off(c),
            a(document).off(c),
            a(document.body).off(c),
            delete b.$input[0].selectize;
        },
        render: function (b, c) {
          var d,
            e,
            f = "",
            g = !1,
            h = this;
          return (
            ("option" !== b && "item" !== b) ||
              ((d = z(c[h.settings.valueField])), (g = !!d)),
            g &&
            (y(h.renderCache[b]) || (h.renderCache[b] = {}),
            h.renderCache[b].hasOwnProperty(d))
              ? h.renderCache[b][d]
              : ((f = a(h.settings.render[b].apply(this, [c, A]))),
                "option" === b || "option_create" === b
                  ? f.attr("data-selectable", "")
                  : "optgroup" === b &&
                    ((e = c[h.settings.optgroupValueField] || ""),
                    f.attr("data-group", e)),
                ("option" !== b && "item" !== b) ||
                  f.attr("data-value", d || ""),
                g && (h.renderCache[b][d] = f[0]),
                f[0])
          );
        },
        clearCache: function (a) {
          var b = this;
          "undefined" == typeof a
            ? (b.renderCache = {})
            : delete b.renderCache[a];
        },
        canCreate: function (a) {
          var b = this;
          if (!b.settings.create) return !1;
          var c = b.settings.createFilter;
          return (
            a.length &&
            ("function" != typeof c || c.apply(b, [a])) &&
            ("string" != typeof c || new RegExp(c).test(a)) &&
            (!(c instanceof RegExp) || c.test(a))
          );
        },
      }),
      (M.count = 0),
      (M.defaults = {
        options: [],
        optgroups: [],
        plugins: [],
        delimiter: ",",
        splitOn: null,
        persist: !0,
        diacritics: !0,
        create: !1,
        createOnBlur: !1,
        createFilter: null,
        highlight: !0,
        openOnFocus: !0,
        maxOptions: 1e3,
        maxItems: null,
        hideSelected: null,
        addPrecedence: !1,
        selectOnTab: !1,
        preload: !1,
        allowEmptyOption: !1,
        closeAfterSelect: !1,
        scrollDuration: 60,
        loadThrottle: 300,
        loadingClass: "loading",
        dataAttr: "data-data",
        optgroupField: "optgroup",
        valueField: "value",
        labelField: "text",
        optgroupLabelField: "label",
        optgroupValueField: "value",
        lockOptgroupOrder: !1,
        sortField: "$order",
        searchField: ["text"],
        searchConjunction: "and",
        mode: null,
        wrapperClass: "selectize-control",
        inputClass: "selectize-input",
        dropdownClass: "selectize-dropdown",
        dropdownContentClass: "selectize-dropdown-content",
        dropdownParent: null,
        copyClassesToDropdown: !0,
        render: {},
      }),
      (a.fn.selectize = function (b) {
        var c = a.fn.selectize.defaults,
          d = a.extend({}, c, b),
          e = d.dataAttr,
          f = d.labelField,
          g = d.valueField,
          h = d.optgroupField,
          i = d.optgroupLabelField,
          j = d.optgroupValueField,
          k = function (b, c) {
            var h,
              i,
              j,
              k,
              l = b.attr(e);
            if (l)
              for (
                c.options = JSON.parse(l), h = 0, i = c.options.length;
                h < i;
                h++
              )
                c.items.push(c.options[h][g]);
            else {
              var m = a.trim(b.val() || "");
              if (!d.allowEmptyOption && !m.length) return;
              for (j = m.split(d.delimiter), h = 0, i = j.length; h < i; h++)
                (k = {}), (k[f] = j[h]), (k[g] = j[h]), c.options.push(k);
              c.items = j;
            }
          },
          l = function (b, c) {
            var k,
              l,
              m,
              n,
              o = c.options,
              p = {},
              q = function (a) {
                var b = e && a.attr(e);
                return "string" == typeof b && b.length ? JSON.parse(b) : null;
              },
              r = function (b, e) {
                b = a(b);
                var i = z(b.val());
                if (i || d.allowEmptyOption)
                  if (p.hasOwnProperty(i)) {
                    if (e) {
                      var j = p[i][h];
                      j
                        ? a.isArray(j)
                          ? j.push(e)
                          : (p[i][h] = [j, e])
                        : (p[i][h] = e);
                    }
                  } else {
                    var k = q(b) || {};
                    (k[f] = k[f] || b.text()),
                      (k[g] = k[g] || i),
                      (k[h] = k[h] || e),
                      (p[i] = k),
                      o.push(k),
                      b.is(":selected") && c.items.push(i);
                  }
              },
              s = function (b) {
                var d, e, f, g, h;
                for (
                  b = a(b),
                    f = b.attr("label"),
                    f &&
                      ((g = q(b) || {}),
                      (g[i] = f),
                      (g[j] = f),
                      c.optgroups.push(g)),
                    h = a("option", b),
                    d = 0,
                    e = h.length;
                  d < e;
                  d++
                )
                  r(h[d], f);
              };
            for (
              c.maxItems = b.attr("multiple") ? null : 1,
                n = b.children(),
                k = 0,
                l = n.length;
              k < l;
              k++
            )
              (m = n[k].tagName.toLowerCase()),
                "optgroup" === m ? s(n[k]) : "option" === m && r(n[k]);
          };
        return this.each(function () {
          if (!this.selectize) {
            var e,
              f = a(this),
              g = this.tagName.toLowerCase(),
              h = f.attr("placeholder") || f.attr("data-placeholder");
            h ||
              d.allowEmptyOption ||
              (h = f.children('option[value=""]').text());
            var i = { placeholder: h, options: [], optgroups: [], items: [] };
            "select" === g ? l(f, i) : k(f, i),
              (e = new M(f, a.extend(!0, {}, c, i, b)));
          }
        });
      }),
      (a.fn.selectize.defaults = M.defaults),
      (a.fn.selectize.support = { validity: x }),
      M.define("drag_drop", function (b) {
        if (!a.fn.sortable)
          throw new Error(
            'The "drag_drop" plugin requires jQuery UI "sortable".'
          );
        if ("multi" === this.settings.mode) {
          var c = this;
          (c.lock = (function () {
            var a = c.lock;
            return function () {
              var b = c.$control.data("sortable");
              return b && b.disable(), a.apply(c, arguments);
            };
          })()),
            (c.unlock = (function () {
              var a = c.unlock;
              return function () {
                var b = c.$control.data("sortable");
                return b && b.enable(), a.apply(c, arguments);
              };
            })()),
            (c.setup = (function () {
              var b = c.setup;
              return function () {
                b.apply(this, arguments);
                var d = c.$control.sortable({
                  items: "[data-value]",
                  forcePlaceholderSize: !0,
                  disabled: c.isLocked,
                  start: function (a, b) {
                    b.placeholder.css("width", b.helper.css("width")),
                      d.css({ overflow: "visible" });
                  },
                  stop: function () {
                    d.css({ overflow: "hidden" });
                    var b = c.$activeItems ? c.$activeItems.slice() : null,
                      e = [];
                    d.children("[data-value]").each(function () {
                      e.push(a(this).attr("data-value"));
                    }),
                      c.setValue(e),
                      c.setActiveItem(b);
                  },
                });
              };
            })());
        }
      }),
      M.define("dropdown_header", function (b) {
        var c = this;
        (b = a.extend(
          {
            title: "Untitled",
            headerClass: "selectize-dropdown-header",
            titleRowClass: "selectize-dropdown-header-title",
            labelClass: "selectize-dropdown-header-label",
            closeClass: "selectize-dropdown-header-close",
            html: function (a) {
              return (
                '<div class="' +
                a.headerClass +
                '"><div class="' +
                a.titleRowClass +
                '"><span class="' +
                a.labelClass +
                '">' +
                a.title +
                '</span><a href="javascript:void(0)" class="' +
                a.closeClass +
                '">&times;</a></div></div>'
              );
            },
          },
          b
        )),
          (c.setup = (function () {
            var d = c.setup;
            return function () {
              d.apply(c, arguments),
                (c.$dropdown_header = a(b.html(b))),
                c.$dropdown.prepend(c.$dropdown_header);
            };
          })());
      }),
      M.define("optgroup_columns", function (b) {
        var c = this;
        (b = a.extend({ equalizeWidth: !0, equalizeHeight: !0 }, b)),
          (this.getAdjacentOption = function (b, c) {
            var d = b.closest("[data-group]").find("[data-selectable]"),
              e = d.index(b) + c;
            return e >= 0 && e < d.length ? d.eq(e) : a();
          }),
          (this.onKeyDown = (function () {
            var a = c.onKeyDown;
            return function (b) {
              var d, e, f, g;
              return !this.isOpen || (b.keyCode !== j && b.keyCode !== m)
                ? a.apply(this, arguments)
                : ((c.ignoreHover = !0),
                  (g = this.$activeOption.closest("[data-group]")),
                  (d = g.find("[data-selectable]").index(this.$activeOption)),
                  (g =
                    b.keyCode === j
                      ? g.prev("[data-group]")
                      : g.next("[data-group]")),
                  (f = g.find("[data-selectable]")),
                  (e = f.eq(Math.min(f.length - 1, d))),
                  void (e.length && this.setActiveOption(e)));
            };
          })());
        var d = function () {
            var a,
              b = d.width,
              c = document;
            return (
              "undefined" == typeof b &&
                ((a = c.createElement("div")),
                (a.innerHTML =
                  '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>'),
                (a = a.firstChild),
                c.body.appendChild(a),
                (b = d.width = a.offsetWidth - a.clientWidth),
                c.body.removeChild(a)),
              b
            );
          },
          e = function () {
            var e, f, g, h, i, j, k;
            if (
              ((k = a("[data-group]", c.$dropdown_content)),
              (f = k.length),
              f && c.$dropdown_content.width())
            ) {
              if (b.equalizeHeight) {
                for (g = 0, e = 0; e < f; e++)
                  g = Math.max(g, k.eq(e).height());
                k.css({ height: g });
              }
              b.equalizeWidth &&
                ((j = c.$dropdown_content.innerWidth() - d()),
                (h = Math.round(j / f)),
                k.css({ width: h }),
                f > 1 &&
                  ((i = j - h * (f - 1)), k.eq(f - 1).css({ width: i })));
            }
          };
        (b.equalizeHeight || b.equalizeWidth) &&
          (B.after(this, "positionDropdown", e),
          B.after(this, "refreshOptions", e));
      }),
      M.define("remove_button", function (b) {
        b = a.extend(
          {
            label: "&times;",
            title: "Remove",
            className: "remove",
            append: !0,
          },
          b
        );
        var c = function (b, c) {
            c.className = "remove-single";
            var d = b,
              e =
                '<a href="javascript:void(0)" class="' +
                c.className +
                '" tabindex="-1" title="' +
                A(c.title) +
                '">' +
                c.label +
                "</a>",
              f = function (a, b) {
                return a + b;
              };
            b.setup = (function () {
              var g = d.setup;
              return function () {
                if (c.append) {
                  var h = a(d.$input.context).attr("id"),
                    i = (a("#" + h), d.settings.render.item);
                  d.settings.render.item = function (a) {
                    return f(i.apply(b, arguments), e);
                  };
                }
                g.apply(b, arguments),
                  b.$control.on("click", "." + c.className, function (a) {
                    a.preventDefault(), d.isLocked || d.clear();
                  });
              };
            })();
          },
          d = function (b, c) {
            var d = b,
              e =
                '<a href="javascript:void(0)" class="' +
                c.className +
                '" tabindex="-1" title="' +
                A(c.title) +
                '">' +
                c.label +
                "</a>",
              f = function (a, b) {
                var c = a.search(/(<\/[^>]+>\s*)$/);
                return a.substring(0, c) + b + a.substring(c);
              };
            b.setup = (function () {
              var g = d.setup;
              return function () {
                if (c.append) {
                  var h = d.settings.render.item;
                  d.settings.render.item = function (a) {
                    return f(h.apply(b, arguments), e);
                  };
                }
                g.apply(b, arguments),
                  b.$control.on("click", "." + c.className, function (b) {
                    if ((b.preventDefault(), !d.isLocked)) {
                      var c = a(b.currentTarget).parent();
                      d.setActiveItem(c),
                        d.deleteSelection() && d.setCaret(d.items.length);
                    }
                  });
              };
            })();
          };
        return "single" === this.settings.mode
          ? void c(this, b)
          : void d(this, b);
      }),
      M.define("restore_on_backspace", function (a) {
        var b = this;
        (a.text =
          a.text ||
          function (a) {
            return a[this.settings.labelField];
          }),
          (this.onKeyDown = (function () {
            var c = b.onKeyDown;
            return function (b) {
              var d, e;
              return b.keyCode === p &&
                "" === this.$control_input.val() &&
                !this.$activeItems.length &&
                ((d = this.caretPos - 1), d >= 0 && d < this.items.length)
                ? ((e = this.options[this.items[d]]),
                  this.deleteSelection(b) &&
                    (this.setTextboxValue(a.text.apply(this, [e])),
                    this.refreshOptions(!0)),
                  void b.preventDefault())
                : c.apply(this, arguments);
            };
          })());
      }),
      M
    );
  });
/*
 Sticky-kit v1.1.3 | MIT | Leaf Corcoran 2015 | http://leafo.net
*/
(function () {
  var c, f;
  c = window.jQuery;
  f = c(window);
  c.fn.stick_in_parent = function (b) {
    var A, w, J, n, B, K, p, q, L, k, E, t;
    null == b && (b = {});
    t = b.sticky_class;
    B = b.inner_scrolling;
    E = b.recalc_every;
    k = b.parent;
    q = b.offset_top;
    p = b.spacer;
    w = b.bottoming;
    null == q && (q = 0);
    null == k && (k = void 0);
    null == B && (B = !0);
    null == t && (t = "is_stuck");
    A = c(document);
    null == w && (w = !0);
    L = function (a) {
      var b;
      return window.getComputedStyle
        ? ((a = window.getComputedStyle(a[0])),
          (b =
            parseFloat(a.getPropertyValue("width")) +
            parseFloat(a.getPropertyValue("margin-left")) +
            parseFloat(a.getPropertyValue("margin-right"))),
          "border-box" !== a.getPropertyValue("box-sizing") &&
            (b +=
              parseFloat(a.getPropertyValue("border-left-width")) +
              parseFloat(a.getPropertyValue("border-right-width")) +
              parseFloat(a.getPropertyValue("padding-left")) +
              parseFloat(a.getPropertyValue("padding-right"))),
          b)
        : a.outerWidth(!0);
    };
    J = function (a, b, n, C, F, u, r, G) {
      var v, H, m, D, I, d, g, x, y, z, h, l;
      if (!a.data("sticky_kit")) {
        a.data("sticky_kit", !0);
        I = A.height();
        g = a.parent();
        null != k && (g = g.closest(k));
        if (!g.length) throw "failed to find stick parent";
        v = m = !1;
        (h = null != p ? p && a.closest(p) : c("<div />")) &&
          h.css("position", a.css("position"));
        x = function () {
          var d, f, e;
          if (
            !G &&
            ((I = A.height()),
            (d = parseInt(g.css("border-top-width"), 10)),
            (f = parseInt(g.css("padding-top"), 10)),
            (b = parseInt(g.css("padding-bottom"), 10)),
            (n = g.offset().top + d + f),
            (C = g.height()),
            m &&
              ((v = m = !1),
              null == p && (a.insertAfter(h), h.detach()),
              a
                .css({ position: "", top: "", width: "", bottom: "" })
                .removeClass(t),
              (e = !0)),
            (F = a.offset().top - (parseInt(a.css("margin-top"), 10) || 0) - q),
            (u = a.outerHeight(!0)),
            (r = a.css("float")),
            h &&
              h.css({
                width: L(a),
                height: u,
                display: a.css("display"),
                "vertical-align": a.css("vertical-align"),
                float: r,
              }),
            e)
          )
            return l();
        };
        x();
        if (u !== C)
          return (
            (D = void 0),
            (d = q),
            (z = E),
            (l = function () {
              var c, l, e, k;
              if (
                !G &&
                ((e = !1),
                null != z && (--z, 0 >= z && ((z = E), x(), (e = !0))),
                e || A.height() === I || x(),
                (e = f.scrollTop()),
                null != D && (l = e - D),
                (D = e),
                m
                  ? (w &&
                      ((k = e + u + d > C + n),
                      v &&
                        !k &&
                        ((v = !1),
                        a
                          .css({ position: "fixed", bottom: "", top: d })
                          .trigger("sticky_kit:unbottom"))),
                    e < F &&
                      ((m = !1),
                      (d = q),
                      null == p &&
                        (("left" !== r && "right" !== r) || a.insertAfter(h),
                        h.detach()),
                      (c = { position: "", width: "", top: "" }),
                      a.css(c).removeClass(t).trigger("sticky_kit:unstick")),
                    B &&
                      ((c = f.height()),
                      u + q > c &&
                        !v &&
                        ((d -= l),
                        (d = Math.max(c - u, d)),
                        (d = Math.min(q, d)),
                        m && a.css({ top: d + "px" }))))
                  : e > F &&
                    ((m = !0),
                    (c = { position: "fixed", top: d }),
                    (c.width =
                      "border-box" === a.css("box-sizing")
                        ? a.outerWidth() + "px"
                        : a.width() + "px"),
                    a.css(c).addClass(t),
                    null == p &&
                      (a.after(h),
                      ("left" !== r && "right" !== r) || h.append(a)),
                    a.trigger("sticky_kit:stick")),
                m && w && (null == k && (k = e + u + d > C + n), !v && k))
              )
                return (
                  (v = !0),
                  "static" === g.css("position") &&
                    g.css({ position: "relative" }),
                  a
                    .css({ position: "absolute", bottom: b, top: "auto" })
                    .trigger("sticky_kit:bottom")
                );
            }),
            (y = function () {
              x();
              return l();
            }),
            (H = function () {
              G = !0;
              f.off("touchmove", l);
              f.off("scroll", l);
              f.off("resize", y);
              c(document.body).off("sticky_kit:recalc", y);
              a.off("sticky_kit:detach", H);
              a.removeData("sticky_kit");
              a.css({ position: "", bottom: "", top: "", width: "" });
              g.position("position", "");
              if (m)
                return (
                  null == p &&
                    (("left" !== r && "right" !== r) || a.insertAfter(h),
                    h.remove()),
                  a.removeClass(t)
                );
            }),
            f.on("touchmove", l),
            f.on("scroll", l),
            f.on("resize", y),
            c(document.body).on("sticky_kit:recalc", y),
            a.on("sticky_kit:detach", H),
            setTimeout(l, 0)
          );
      }
    };
    n = 0;
    for (K = this.length; n < K; n++) (b = this[n]), J(c(b));
    return this;
  };
}.call(this));

$(function () {
  // старый код   каталога
  // $('.header__catalog__btn').on('click', function(event) {
  //   event.preventDefault();
  //   $(this).closest('.header__catalog').toggleClass('active');
  // });

  // $(document).mouseup(function(e) {
  //   let button = $('.header__catalog, .header__catalog *');
  //   if (!button.is(e.target)) {
  //     $('.header__catalog').removeClass('active');
  //   }
  // });

  // function home_catalog_height() {
  //   let menuHeight = $('.header__catalog__content').outerHeight(),
  //     headerHeight = $('.header').outerHeight();
  //   $('.header__catalog__submenu').css('min-height', menuHeight + "px");
  // }

  // home_catalog_height();
  // $(window).resize(home_catalog_height);

  document
    .querySelector(".header__catalog__btn")
    .addEventListener("click", function (event) {
      event.preventDefault();
      this.closest(".header__catalog").classList.toggle("active");
    });

  document.addEventListener("mouseup", function (e) {
    let button = document.querySelectorAll(
      ".header__catalog, .header__catalog *"
    );
    let isClickInside = false;

    button.forEach(function (el) {
      if (el.contains(e.target)) {
        isClickInside = true;
      }
    });

    if (!isClickInside) {
      document.querySelector(".header__catalog").classList.remove("active");
    }
  });

  //переносим каталог в зависимости от щирины экрана
  if (document.querySelector(".mainCatalog")) {
    function moveCatalog() {
      const mainCatalog = document.querySelector(".mainCatalog");
      const mobMenuCatalog = document.querySelector(".mob_menu__catalog");
      const headerCatalogMenu = document.querySelector(
        ".header__catalog__menu"
      );

      if (window.innerWidth <= 1199) {
        mobMenuCatalog.appendChild(mainCatalog);
        //логика открытия пунктов меню
        let razdels = document.querySelectorAll(".razdel a, .podrazdel");  
        razdels.forEach((element) => {  
          element.addEventListener("click", function (event) {  
            if (!event.target.href) {  
              razdels.forEach((el) =>  
              el.nextElementSibling && el.nextElementSibling.classList.remove("active")  
            );  
              this.nextElementSibling && this.nextElementSibling.classList.toggle("active");  
            }  
          });  
        });

        let toggleBtn = document.querySelectorAll(".openCatalog");
        toggleBtn.forEach((element) => {
          element.addEventListener("click", function (event) {
            event.preventDefault();
          });
        });
      } else {
        headerCatalogMenu.appendChild(mainCatalog);
      }
    }
    moveCatalog();
    window.addEventListener("resize", moveCatalog);
  }

  $(".intro__slider").slick({
    fade: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow:
      '<button type="button" aria-label="Следующее фото" class="slick-arrow slick-next"><svg width="23" height="8" viewBox="0 0 23 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.3536 4.35355C22.5488 4.15829 22.5488 3.84171 22.3536 3.64645L19.1716 0.464466C18.9763 0.269204 18.6597 0.269204 18.4645 0.464466C18.2692 0.659728 18.2692 0.976311 18.4645 1.17157L21.2929 4L18.4645 6.82843C18.2692 7.02369 18.2692 7.34027 18.4645 7.53553C18.6597 7.7308 18.9763 7.7308 19.1716 7.53553L22.3536 4.35355ZM0 4.5L22 4.5V3.5L0 3.5L0 4.5Z" fill="currentColor"/></svg></button>',
    prevArrow:
      '<button type="button" aria-label="Предыдущее фото" class="slick-arrow slick-prev"><svg width="23" height="8" viewBox="0 0 23 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 3.64644C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976309 4.7308 0.659727 4.53553 0.464464C4.34027 0.269202 4.02369 0.269202 3.82843 0.464464L0.646446 3.64644ZM23 3.5L1 3.5L1 4.5L23 4.5L23 3.5Z" fill="currentColor"/></svg></button>',
  });

  $(".shortcard__manage_btn, .card__manage_btn").on("click", function (event) {
    event.preventDefault();
    //	$(this).toggleClass('active');
  });

  $(".home_products__slider").slick({
    slidesToShow: 4,
    nextArrow:
      '<button type="button" aria-label="Следующее фото" class="slick-arrow slick-next slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6668 12.7986L1.79693 0.993561C1.40397 0.616123 0.777788 0.62696 0.398276 1.01777C0.0280368 1.39901 0.0280368 2.00338 0.398276 2.38457L11.5689 13.4941L0.398276 24.6036C0.0120982 24.9877 0.0120982 25.6105 0.398276 25.9946C0.784569 26.3787 1.41069 26.3787 1.79693 25.9946L13.6668 14.1896C14.053 13.8054 14.053 13.1827 13.6668 12.7986Z" fill="currentColor"/></svg></button>',
    prevArrow:
      '<button type="button" aria-label="Предыдущее фото" class="slick-arrow slick-prev slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.332923 12.7986L12.2028 0.993561C12.5958 0.616123 13.222 0.62696 13.6015 1.01777C13.9717 1.39901 13.9717 2.00338 13.6015 2.38457L2.4309 13.4941L13.6015 24.6036C13.9877 24.9877 13.9877 25.6105 13.6015 25.9946C13.2152 26.3787 12.5891 26.3787 12.2028 25.9946L0.332923 14.1896C-0.0532551 13.8054 -0.0532551 13.1827 0.332923 12.7986Z" fill="currentColor"/></svg></button>',
    speed: 500,
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".home_products__nav_btn").on("click", function (event) {
    event.preventDefault();
    if (!$(this).hasClass("active")) {
      $(this)
        .addClass("active")
        .siblings(".home_products__nav_btn")
        .removeClass("active");
      let tab = $(this).data("tab"),
        parent = $(this).closest(".home_products");
      parent.find(".home_products__content [data-tab]").hide();
      parent.find('.home_products__content [data-tab="' + tab + '"]').fadeIn();
      parent.find(".home_products__slider").slick("setPosition");
    }
  });

  $(".brands__slider").slick({
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow:
      '<button type="button" aria-label="Следующее фото" class="slick-arrow slick-next slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6668 12.7986L1.79693 0.993561C1.40397 0.616123 0.777788 0.62696 0.398276 1.01777C0.0280368 1.39901 0.0280368 2.00338 0.398276 2.38457L11.5689 13.4941L0.398276 24.6036C0.0120982 24.9877 0.0120982 25.6105 0.398276 25.9946C0.784569 26.3787 1.41069 26.3787 1.79693 25.9946L13.6668 14.1896C14.053 13.8054 14.053 13.1827 13.6668 12.7986Z" fill="currentColor"/></svg></button>',
    prevArrow:
      '<button type="button" aria-label="Предыдущее фото" class="slick-arrow slick-prev slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.332923 12.7986L12.2028 0.993561C12.5958 0.616123 13.222 0.62696 13.6015 1.01777C13.9717 1.39901 13.9717 2.00338 13.6015 2.38457L2.4309 13.4941L13.6015 24.6036C13.9877 24.9877 13.9877 25.6105 13.6015 25.9946C13.2152 26.3787 12.5891 26.3787 12.2028 25.9946L0.332923 14.1896C-0.0532551 13.8054 -0.0532551 13.1827 0.332923 12.7986Z" fill="currentColor"/></svg></button>',
    speed: 500,
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
    ],
  });

  $(".home_blog__list").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow:
      '<button type="button" aria-label="Следующее фото"  class="slick-arrow slick-next slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6668 12.7986L1.79693 0.993561C1.40397 0.616123 0.777788 0.62696 0.398276 1.01777C0.0280368 1.39901 0.0280368 2.00338 0.398276 2.38457L11.5689 13.4941L0.398276 24.6036C0.0120982 24.9877 0.0120982 25.6105 0.398276 25.9946C0.784569 26.3787 1.41069 26.3787 1.79693 25.9946L13.6668 14.1896C14.053 13.8054 14.053 13.1827 13.6668 12.7986Z" fill="currentColor"/></svg></button>',
    prevArrow:
      '<button type="button" aria-label="Предыдущее фото"  class="slick-arrow slick-prev slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.332923 12.7986L12.2028 0.993561C12.5958 0.616123 13.222 0.62696 13.6015 1.01777C13.9717 1.39901 13.9717 2.00338 13.6015 2.38457L2.4309 13.4941L13.6015 24.6036C13.9877 24.9877 13.9877 25.6105 13.6015 25.9946C13.2152 26.3787 12.5891 26.3787 12.2028 25.9946L0.332923 14.1896C-0.0532551 13.8054 -0.0532551 13.1827 0.332923 12.7986Z" fill="currentColor"/></svg></button>',
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(
    ".header__catalog__submenu .scroll_wrap, .header__catalog__menu_scroll_wrap, .header__search__result__content .scroll_wrap, .header__search__result__nav"
  ).mCustomScrollbar({
    scrollbarPosition: "outside",
  });

  $(
    ".catalog__filter__list, .card__reviews__list, .header__cart__list"
  ).mCustomScrollbar({
    scrollbarPosition: "outside",
  });

  $(".header__search__form__input").on("input", function (event) {
    event.preventDefault();
    if ($(this).val().length >= 3) {
      $(".header__search").addClass("active");
    } else {
      $(".header__search").removeClass("active");
    }
  });

  $(".header__search__form__input").on("focus", function (event) {
    $(".header__search").addClass("focus");
  });
  $(".header__search__form__input").on("blur", function (event) {
    $(".header__search").removeClass("focus");
  });

  $(".header__search__close_btn").on("click", function (event) {
    event.preventDefault();
    $(".header__search").removeClass("focus").removeClass("active");
    $(".header__search__form__input").val("");
  });

  $(".header__bars").on("click", function (event) {
    event.preventDefault();
    $(this).toggleClass("active");
    $(".mob_menu").toggleClass("active");
    $("body").toggleClass("is-modal");
  });

  $(".about_page__slider").slick({
    fade: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow:
      '<button type="button" aria-label="Следующее фото" class="slick-arrow slick-next"><svg width="23" height="8" viewBox="0 0 23 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.3536 4.35355C22.5488 4.15829 22.5488 3.84171 22.3536 3.64645L19.1716 0.464466C18.9763 0.269204 18.6597 0.269204 18.4645 0.464466C18.2692 0.659728 18.2692 0.976311 18.4645 1.17157L21.2929 4L18.4645 6.82843C18.2692 7.02369 18.2692 7.34027 18.4645 7.53553C18.6597 7.7308 18.9763 7.7308 19.1716 7.53553L22.3536 4.35355ZM0 4.5L22 4.5V3.5L0 3.5L0 4.5Z" fill="currentColor"/></svg></button>',
    prevArrow:
      '<button type="button" aria-label="Предыдущее фото" class="slick-arrow slick-prev"><svg width="23" height="8" viewBox="0 0 23 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 3.64644C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976309 4.7308 0.659727 4.53553 0.464464C4.34027 0.269202 4.02369 0.269202 3.82843 0.464464L0.646446 3.64644ZM23 3.5L1 3.5L1 4.5L23 4.5L23 3.5Z" fill="currentColor"/></svg></button>',
  });

  $(".form__field input, .form__field textarea")
    .on("focus", function () {
      let _this = $(this);
      _this.closest(".form__field").addClass("hasData").addClass("focus");
    })
    .on("blur", function () {
      let _this = $(this);
      _this.closest(".form__field").removeClass("focus");
      if (_this.val() == "") {
        _this.closest(".form__field").removeClass("hasData");
      } else {
        _this.closest(".form__field").addClass("hasData");
      }
    });

  $(".factory_nav__alfabet>li>a")
    .on("mouseenter", function (event) {
      event.preventDefault();
      if ($(window).innerWidth() >= 768) {
        let tab = $(this).data("tab");
        $(".factory_nav__content [data-tab]").hide();
        $('.factory_nav__content [data-tab="' + tab + '"]').fadeIn();
      }
    })
    .on("mouseleave", function (event) {
      // event.preventDefault();
      // $('.factory_nav__content [data-tab]').hide();
    })
    .on("click", function (event) {
      event.preventDefault();
      let tab = $(this).data("tab");
      $(".factory_nav__content [data-tab]").hide();
      $('.factory_nav__content [data-tab="' + tab + '"]').fadeIn();
    });

  $(".nav_toggler__itm").on("click", function (event) {
    event.preventDefault();
    if (!$(this).hasClass("active")) {
      $(this).addClass("active");
      $(this).siblings(".nav_toggler__itm").removeClass("active");
      let tab = $(this).data("tab");
      $(".catalog_short__list[data-tab], .catalog__list[data-tab]").hide();
      $(
        '.catalog_short__list[data-tab="' +
          tab +
          '"], .catalog__list[data-tab="' +
          tab +
          '"]'
      ).fadeIn();
    }
  });

  $(".catalog__filter__itm__header.toggler").on("click", function (event) {
    event.preventDefault();
    let $parent = $(this).closest(".catalog__filter__itm");
    if ($parent.hasClass("active")) {
      $parent.removeClass("active");
      $parent.find(".catalog__filter__itm__body").slideUp();
    } else {
      $parent.addClass("active");
      $parent.find(".catalog__filter__itm__body").slideDown();
    }
  });

  // http://api.jqueryui.com/slider/
  $(".slider-range").each(function (index, el) {
    let min = +($(this).data("min") + "").replace(" ", "");
    let max = +($(this).data("max") + "").replace(" ", "");
    let start = +($(this).data("start") + "").replace(" ", "");
    let end = +($(this).data("end") + "").replace(" ", "");
    if (!start) {
      start = min;
    }
    if (!end) {
      end = max;
    }
    $(this).slider({
      range: true,
      min: min,
      max: max,
      values: [start, end],
      create: function (event, ui) {
        $(el).closest(".catalog__filter__range").find(".inputFrom").val(start);
        $(el).closest(".catalog__filter__range").find(".inputTo").val(end);
      },
      stop: function (event, ui) {
        getGoodCount("input");
      },
      slide: function (event, ui) {
        $(el)
          .closest(".catalog__filter__range")
          .find(".inputFrom")
          .val(ui.values[0]);
        $(el)
          .closest(".catalog__filter__range")
          .find(".inputTo")
          .val(ui.values[1]);
      },
    });
  });

  $(".catalog__filter__range__inputs input").on("input", function (event) {
    let $parent = $(this).closest(".catalog__filter__range");
    if ($(this).hasClass("inputFrom")) {
      $parent.find(".slider-range").slider("values", 0, $(this).val());
      console.log($(this).val());
    }
    if ($(this).hasClass("inputTo")) {
      $parent.find(".slider-range").slider("values", 1, $(this).val());
    }
  });

  $("select.select").selectize({
    placeholder: $(this).data("placeholder"),
  });

  $(".catalog__filter__toggle_btn").on("click", function (event) {
    event.preventDefault();
    $(this).toggleClass("active");
    $(".catalog__filter__toggle_content").slideToggle();
  });

  $(".card__preview__slider").slick({
    fade: true,
    speed: 500,
    nextArrow:
      '<button type="button" aria-label="Следующее фото" class="slick-arrow slick-next slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6668 12.7986L1.79693 0.993561C1.40397 0.616123 0.777788 0.62696 0.398276 1.01777C0.0280368 1.39901 0.0280368 2.00338 0.398276 2.38457L11.5689 13.4941L0.398276 24.6036C0.0120982 24.9877 0.0120982 25.6105 0.398276 25.9946C0.784569 26.3787 1.41069 26.3787 1.79693 25.9946L13.6668 14.1896C14.053 13.8054 14.053 13.1827 13.6668 12.7986Z" fill="currentColor"/></svg></button>',
    prevArrow:
      '<button type="button" aria-label="Предыдущее фото" class="slick-arrow slick-prev slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.332923 12.7986L12.2028 0.993561C12.5958 0.616123 13.222 0.62696 13.6015 1.01777C13.9717 1.39901 13.9717 2.00338 13.6015 2.38457L2.4309 13.4941L13.6015 24.6036C13.9877 24.9877 13.9877 25.6105 13.6015 25.9946C13.2152 26.3787 12.5891 26.3787 12.2028 25.9946L0.332923 14.1896C-0.0532551 13.8054 -0.0532551 13.1827 0.332923 12.7986Z" fill="currentColor"/></svg></button>',
  });

  $(".card__preview__nav").each(function (index, el) {
    $(el).find(".card__preview__nav__itm").first().addClass("active");
  });

  $(".card__preview__nav").slick({
    slidesToShow: 4,
    draggable: false,
    selectOnFocus: true,
    arrows: false,
    speed: 500,
    infinite: false,
  });

  $(".card__preview__slider").on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      $(this)
        .closest(".card__preview")
        .find(
          '.card__preview__nav .slick-slide[data-slick-index="' +
            nextSlide +
            '"] .card__preview__nav__itm'
        )
        .click();
      if (nextSlide == 0 && currentSlide == slick.slideCount - 1) {
        $(".card__preview__nav").slick("slickGoTo", 0);
      }
      if (currentSlide == 0 && nextSlide == slick.slideCount - 1) {
        $(".card__preview__nav").slick(
          "slickGoTo",
          slick.slideCount - $(".card__preview__nav .slick-active").length
        );
      }
    }
  );

  $(".card__preview__nav__itm").on("click", function (event) {
    let $currenrSlickSlide = $(this).closest(".slick-slide"),
      $parent = $(this).closest(".card__preview__nav");
    $parent.find(".card__preview__nav__itm.active").removeClass("active");
    $(this).addClass("active");
    $parent
      .closest(".card__preview")
      .find(".card__preview__slider")
      .slick("slickGoTo", $currenrSlickSlide.data("slick-index"));
    if (
      $parent.find(".slick-slide.slick-active").first().is($currenrSlickSlide)
    ) {
      $parent.slick("slickPrev");
    }
    if (
      $parent.find(".slick-slide.slick-active").last().is($currenrSlickSlide)
    ) {
      $parent.slick("slickNext");
    }
  });

  $(".card_tabs__nav li a").on("click", function (event) {
    event.preventDefault();
    let tab = $(this).data("tab");
    $(".card_tabs__nav li a").removeClass("active");
    $(this).addClass("active");
    $(".card_tabs__content [data-tab]").hide();
    $('.card_tabs__content [data-tab="' + tab + '"]').fadeIn();
  });

  $('.order__man_type input[type="radio"]').on("change", function (event) {
    if ($(this).data("tab") == "yur-litso") {
      $('.order__form [data-tab="yur-litso"]').show();
    } else {
      $('.order__form [data-tab="yur-litso"]').hide();
    }
  });

  $(".partners__itm__slider").slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    nextArrow:
      '<button type="button" class="slick-arrow slick-next slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6668 12.7986L1.79693 0.993561C1.40397 0.616123 0.777788 0.62696 0.398276 1.01777C0.0280368 1.39901 0.0280368 2.00338 0.398276 2.38457L11.5689 13.4941L0.398276 24.6036C0.0120982 24.9877 0.0120982 25.6105 0.398276 25.9946C0.784569 26.3787 1.41069 26.3787 1.79693 25.9946L13.6668 14.1896C14.053 13.8054 14.053 13.1827 13.6668 12.7986Z" fill="currentColor"/></svg></button>',
    prevArrow:
      '<button type="button" class="slick-arrow slick-prev slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.332923 12.7986L12.2028 0.993561C12.5958 0.616123 13.222 0.62696 13.6015 1.01777C13.9717 1.39901 13.9717 2.00338 13.6015 2.38457L2.4309 13.4941L13.6015 24.6036C13.9877 24.9877 13.9877 25.6105 13.6015 25.9946C13.2152 26.3787 12.5891 26.3787 12.2028 25.9946L0.332923 14.1896C-0.0532551 13.8054 -0.0532551 13.1827 0.332923 12.7986Z" fill="currentColor"/></svg></button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });

  $(".faq__itm__title").on("click", function (event) {
    event.preventDefault();
    let $parent = $(this).closest(".faq__itm");
    $parent.toggleClass("active");
    $parent.find(".faq__itm__descr").slideToggle();
    $(".faq__itm").not($parent).removeClass("active");
    $(".faq__itm").not($parent).find(".faq__itm__descr").slideUp();
  });

  $(".plain_text h3").each(function (index, el) {
    $(el).html("<span>" + $(el).text() + "</span>");
  });

  $(".contacts__faq__title").on("click", function (event) {
    console.log("d");
    event.preventDefault();
    let $parent = $(this).closest(".contacts__faq__itm");
    $parent.toggleClass("active");
    $parent.find(".contacts__faq__descr").slideToggle();
    $(".contacts__faq__itm").not($parent).removeClass("active");
    $(".contacts__faq__itm")
      .not($parent)
      .find(".contacts__faq__descr")
      .slideUp();
  });

  $(".docs__slider").slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 500,
    nextArrow:
      '<button type="button" class="slick-arrow slick-next slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6668 12.7986L1.79693 0.993561C1.40397 0.616123 0.777788 0.62696 0.398276 1.01777C0.0280368 1.39901 0.0280368 2.00338 0.398276 2.38457L11.5689 13.4941L0.398276 24.6036C0.0120982 24.9877 0.0120982 25.6105 0.398276 25.9946C0.784569 26.3787 1.41069 26.3787 1.79693 25.9946L13.6668 14.1896C14.053 13.8054 14.053 13.1827 13.6668 12.7986Z" fill="currentColor"/></svg></button>',
    prevArrow:
      '<button type="button" class="slick-arrow slick-prev slider_arrow"><svg width="14" height="27" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.332923 12.7986L12.2028 0.993561C12.5958 0.616123 13.222 0.62696 13.6015 1.01777C13.9717 1.39901 13.9717 2.00338 13.6015 2.38457L2.4309 13.4941L13.6015 24.6036C13.9877 24.9877 13.9877 25.6105 13.6015 25.9946C13.2152 26.3787 12.5891 26.3787 12.2028 25.9946L0.332923 14.1896C-0.0532551 13.8054 -0.0532551 13.1827 0.332923 12.7986Z" fill="currentColor"/></svg></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });

  $(".header__cart_btn").on("click", function (event) {
    if ($(window).innerWidth() >= 768) {
      event.preventDefault();
      $(".header__cart").toggleClass("active");
      $(this).toggleClass("active");
    }
  });

  $(document).mouseup(function (e) {
    let button = $(
      ".header__cart_btn, .header__cart_btn *, .header__cart, .header__cart *"
    );
    if (!button.is(e.target)) {
      $(".header__cart_btn, .header__cart").removeClass("active");
    }
  });

  if ($(window).innerWidth() >= 992) {
    $("#stiky-sidebar").stick_in_parent({ offset_top: 150 });
  }

  $(".mob_menu__catalog .toggle_btn").on("click", function (event) {
    event.preventDefault();
    $(".mob_menu__catalog li").not($(this).closest("li")).removeClass("active");
    $(".mob_menu__catalog li")
      .not($(this).closest("li"))
      .find(".mob_menu__catalog__submenu")
      .slideUp();
    $(this).closest("li").toggleClass("active");
    $(this).closest("li").find(".mob_menu__catalog__submenu").slideToggle();
  });

  var postion = $(".footer").offset().top,
    height = $(".footer").height();
  $(document).on("scroll", function () {
    var scroll = $(document).scrollTop() + $(window).height();
    //console.log('scroll = ',scroll);
    //console.log('postion = ',postion);
    //console.log('postion + height + 1) = ', postion + height + 1);
    if (scroll > postion && scroll <= postion + height + 1) {
      $("#toTop").fadeIn();
    } else {
      $("#toTop").fadeOut();
    }
  });

  $("#toTop").click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      800
    );
  });
});
