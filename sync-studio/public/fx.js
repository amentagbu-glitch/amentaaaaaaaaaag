/* Sync Studio: small progressive effects. Only sets attributes and CSS variables, never page text. */
(function () {
  if (window.__ssFx) return;
  window.__ssFx = true;
  var root = document.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Light / dark mode. Order: the visitor's choice on the switch, then the theme of a page
  // embedding the site (data-theme on <html>, e.g. a preview viewer), then the device setting.
  var mq = window.matchMedia ? matchMedia("(prefers-color-scheme: light)") : null;
  function saved() { try { return localStorage.getItem("ss-theme"); } catch (err) { return null; } }
  function deviceLight() {
    var h = root.getAttribute("data-theme");
    if (h === "light" || h === "dark") return h === "light";
    return mq ? mq.matches : false;
  }
  function wantLight() { var s = saved(); return s ? s === "light" : deviceLight(); }
  function setMeta(light) {
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) { m.setAttribute("content", light ? "#F4F6FA" : "#070B14"); });
  }
  function apply(light) {
    if (light) root.setAttribute("data-ss-theme", "light"); else root.removeAttribute("data-ss-theme");
    setMeta(light);
  }
  apply(wantLight());
  function follow() { if (!saved()) apply(deviceLight()); }
  if (mq) { if (mq.addEventListener) mq.addEventListener("change", follow); else if (mq.addListener) mq.addListener(follow); }
  new MutationObserver(follow).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    var light = root.getAttribute("data-ss-theme") !== "light";
    apply(light);
    try {
      // Picking the same mode as the device goes back to following the device
      if (light === deviceLight()) localStorage.removeItem("ss-theme");
      else localStorage.setItem("ss-theme", light ? "light" : "dark");
    } catch (err) {}
  });

  // Live Agadir clock: <span data-clock> shows attr(data-time) through CSS
  var fmt = null, off = "";
  try {
    fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Casablanca", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    var parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Casablanca", timeZoneName: "shortOffset" }).formatToParts(new Date());
    parts.forEach(function (p) { if (p.type === "timeZoneName") off = p.value; });
  } catch (e) {}
  function tick() {
    if (!fmt) return;
    var s = fmt.format(new Date());
    document.querySelectorAll("[data-clock]").forEach(function (el) {
      el.setAttribute("data-time", el.hasAttribute("data-short") ? s.slice(0, 5) : s + (off ? " " + off : ""));
    });
  }
  tick(); setInterval(tick, 1000);

  // Cursor spotlight on cards
  if (fine) {
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest("[data-spot]");
      document.querySelectorAll("[data-spot-on]").forEach(function (c) { if (c !== card) c.removeAttribute("data-spot-on"); });
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
      card.setAttribute("data-spot-on", "");
    }, { passive: true });
  }

  // 3D tilt of the hero mockups
  if (fine && !reduce) {
    var tx = 0, ty = 0, cx = 0, cy = 0, run = false;
    function step() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      document.querySelectorAll("[data-tilt]").forEach(function (el) {
        el.style.setProperty("--tilt-x", (-cy * 5).toFixed(2) + "deg");
        el.style.setProperty("--tilt-y", (cx * 7).toFixed(2) + "deg");
      });
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) requestAnimationFrame(step); else run = false;
    }
    window.addEventListener("pointermove", function (e) {
      tx = (e.clientX / window.innerWidth) * 2 - 1; ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!run) { run = true; requestAnimationFrame(step); }
    }, { passive: true });
  }

  // Reels: play muted while on screen (not with reduced motion); buttons for sound and play
  var reelIO = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target.querySelector("video");
      if (!v) return;
      if (e.intersectionRatio >= 0.35 && !reduce) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else if (e.intersectionRatio < 0.35) v.pause();
    });
  }, { threshold: 0.35 }) : null;
  function initReels() {
    document.querySelectorAll("[data-reel]:not([data-reel-ready])").forEach(function (el) {
      el.setAttribute("data-reel-ready", "");
      var v = el.querySelector("video");
      if (!v) return;
      v.addEventListener("play", function () { el.setAttribute("data-playing", ""); });
      v.addEventListener("pause", function () { el.removeAttribute("data-playing"); });
      if (reelIO) reelIO.observe(el);
    });
  }
  function setSound(el, on) {
    var v = el.querySelector("video"), b = el.querySelector("[data-reel-sound]");
    if (!v) return;
    v.muted = !on;
    if (on) { el.setAttribute("data-sound", ""); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    else el.removeAttribute("data-sound");
    if (b) b.setAttribute("aria-label", on ? b.getAttribute("data-label-off") : b.getAttribute("data-label-on"));
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-reel-sound], [data-reel-play]");
    if (!t) return;
    var el = t.closest("[data-reel]");
    if (!el) return;
    if (t.hasAttribute("data-reel-play")) { setSound(el, true); return; }
    setSound(el, !el.hasAttribute("data-sound"));
  });
  // Reel slideshows: one video at a time, next one when it ends, sound carries over
  function initCarousels() {
    document.querySelectorAll("[data-carousel]:not([data-carousel-ready])").forEach(function (car) {
      car.setAttribute("data-carousel-ready", "");
      var track = car.querySelector("[data-track]");
      var slides = Array.prototype.slice.call(car.querySelectorAll("[data-slide]"));
      if (!track || slides.length < 2) return;
      var active = 0;
      function mark(i) {
        if (i === active) return;
        var prevReel = slides[active].querySelector("[data-reel]"), nextReel = slides[i].querySelector("[data-reel]");
        var soundOn = prevReel && prevReel.hasAttribute("data-sound");
        active = i;
        car.querySelectorAll("[data-caption]").forEach(function (c) { if (+c.getAttribute("data-caption") === i) c.setAttribute("data-active", ""); else c.removeAttribute("data-active"); });
        car.querySelectorAll("[data-carousel-dot]").forEach(function (d) { if (+d.getAttribute("data-carousel-dot") === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
        slides.forEach(function (s, k) {
          var v = s.querySelector("video"), r = s.querySelector("[data-reel]");
          if (k !== i && v) { if (r) setSound(r, false); v.pause(); }
        });
        var nv = slides[i].querySelector("video");
        if (nv) { nv.currentTime = 0; if (soundOn && nextReel) setSound(nextReel, true); }
      }
      function go(i) {
        i = (i + slides.length) % slides.length;
        track.scrollTo({ left: slides[i].offsetLeft, behavior: reduce ? "auto" : "smooth" });
        mark(i);
      }
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.intersectionRatio >= 0.6) mark(+e.target.getAttribute("data-slide")); });
        }, { root: track, threshold: 0.6 });
        slides.forEach(function (s) { io.observe(s); });
      }
      slides.forEach(function (s, k) {
        var v = s.querySelector("video");
        if (v) v.addEventListener("ended", function () { if (k === active) go(k + 1); });
      });
      car.addEventListener("click", function (e) {
        var b = e.target.closest && e.target.closest("[data-carousel-prev], [data-carousel-next], [data-carousel-dot]");
        if (!b) return;
        if (b.hasAttribute("data-carousel-prev")) go(active - 1);
        else if (b.hasAttribute("data-carousel-next")) go(active + 1);
        else go(+b.getAttribute("data-carousel-dot"));
      });
    });
  }

  initReels();
  initCarousels();
  new MutationObserver(function () { initReels(); initCarousels(); }).observe(document.body, { childList: true, subtree: true });

  // Scroll progress and timeline fill
  function onScroll() {
    var max = root.scrollHeight - window.innerHeight;
    root.style.setProperty("--sp", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
    root.style.setProperty("--sy", String(Math.round(window.scrollY)));
    document.querySelectorAll("[data-fill]").forEach(function (el) {
      var r = el.getBoundingClientRect(), vh = window.innerHeight;
      var p = (vh * 0.75 - r.top) / Math.max(r.height, 1);
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      if (reduce) p = 1;
      el.style.setProperty("--p", p.toFixed(3));
      var steps = el.querySelectorAll("[data-step]"), n = steps.length;
      steps.forEach(function (s, i) {
        if (i === 0 || p >= (i / Math.max(n - 1, 1)) * 0.98) s.setAttribute("data-active", ""); else s.removeAttribute("data-active");
      });
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  new MutationObserver(function () { onScroll(); tick(); }).observe(document.body, { childList: true, subtree: true });
  onScroll();
})();
