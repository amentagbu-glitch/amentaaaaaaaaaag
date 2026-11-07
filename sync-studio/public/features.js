/* Sync Studio v2: interactive features in plain JavaScript (no framework), so they also work in
 * static copies of the site. Data comes from <script type="application/json"> blocks rendered by
 * the server components. Features: smooth scroll, magnetic buttons, hero typing, horizontal
 * services, command menu (Ctrl/Cmd+K), visibility quiz, AI WhatsApp demo, package builder,
 * contact form prefill. Everything respects prefers-reduced-motion.
 */
(function () {
  if (window.__ssFeatures) return;
  window.__ssFeatures = true;

  var doc = document, root = doc.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var rtl = function () { return root.getAttribute("dir") === "rtl"; };
  function $(s, el) { return (el || doc).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || doc).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function fill(tpl, vars) { return String(tpl).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; }); }
  function readJSON(id) { var el = doc.getElementById(id); if (!el) return null; try { return JSON.parse(el.textContent); } catch (e) { return null; } }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  function navHref(key, fallback) { var a = $('a[data-nav="' + key + '"]'); return a ? a.getAttribute("href") : fallback; }
  function waLink(text) { var a = $("a[data-wa]"); var base = a ? a.getAttribute("href").split("?")[0] : "https://wa.me/212614686769"; return base + "?text=" + encodeURIComponent(text); }

  /* ---------- Smooth scroll (Lenis) ---------- */
  var lenis = null;
  if (window.Lenis && !reduce) {
    try {
      lenis = new window.Lenis({ lerp: 0.12, smoothWheel: true, anchors: false });
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      window.__lenis = lenis;
    } catch (e) { lenis = null; }
  }
  function scrollToEl(el) {
    if (!el) return;
    var offset = -96;
    if (lenis) lenis.scrollTo(el, { offset: offset, duration: 1.1 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduce ? "auto" : "smooth" });
  }
  // Same-page anchors (#id or a link to this page with #id)
  doc.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href*='#']");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || a.target === "_blank") return;
    var href = a.getAttribute("href"), hash = href.slice(href.indexOf("#") + 1), path = href.slice(0, href.indexOf("#"));
    var here = location.pathname.replace(/\/$/, "") || "/";
    var samePage = !path || path === location.pathname || (path.replace(/\/$/, "") || "/") === here || path === location.pathname.split("/").pop();
    var target = hash && doc.getElementById(hash);
    if (samePage && target) { e.preventDefault(); scrollToEl(target); history.replaceState(null, "", "#" + hash); }
  });

  /* ---------- Magnetic buttons ---------- */
  if (fine && !reduce) {
    doc.addEventListener("pointermove", function (e) {
      $$("[data-magnetic]").forEach(function (el) {
        var r = el.getBoundingClientRect(), pad = 40;
        var inside = e.clientX > r.left - pad && e.clientX < r.right + pad && e.clientY > r.top - pad && e.clientY < r.bottom + pad;
        if (inside) {
          var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          el.style.transform = "translate(" + (dx * 0.18).toFixed(1) + "px," + (dy * 0.28).toFixed(1) + "px)";
        } else if (el.style.transform) el.style.transform = "";
      });
    }, { passive: true });
  }

  /* ---------- Hero typing suggestions ---------- */
  $$("[data-typer]").forEach(function (el) {
    var words = []; try { words = JSON.parse(el.getAttribute("data-words") || "[]"); } catch (e) {}
    if (!words.length) return;
    if (reduce) { el.textContent = words[0]; return; }
    var w = 0, i = 0, del = false;
    (function tick() {
      var word = words[w];
      i += del ? -1 : 1;
      el.textContent = word.slice(0, i);
      var wait = del ? 28 : 55;
      if (!del && i >= word.length) { del = true; wait = 1700; }
      else if (del && i <= 0) { del = false; w = (w + 1) % words.length; wait = 350; }
      setTimeout(tick, wait);
    })();
  });

  /* ---------- Horizontal services (desktop) ---------- */
  var wide = matchMedia("(min-width: 1024px)");
  function hscroll() {
    $$("[data-hscroll]").forEach(function (sec) {
      var track = $("[data-hscroll-track]", sec);
      if (!track) return;
      if (!wide.matches || reduce) { track.style.transform = ""; sec.style.removeProperty("--hs"); return; }
      var r = sec.getBoundingClientRect(), span = r.height - window.innerHeight;
      var p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      var dist = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
      track.style.transform = "translate3d(" + ((rtl() ? 1 : -1) * p * dist).toFixed(1) + "px,0,0)";
      sec.style.setProperty("--hs", p.toFixed(3));
    });
  }
  window.addEventListener("scroll", hscroll, { passive: true });
  window.addEventListener("resize", hscroll);
  hscroll();

  /* ---------- Command menu ---------- */
  var cmdk = doc.getElementById("cmdk");
  if (cmdk) {
    var input = $("[data-cmdk-input]", cmdk), list = $("[data-cmdk-list]", cmdk), empty = $("[data-cmdk-empty]", cmdk);
    var opener = null, active = -1;
    var visible = function () { return $$("[data-cmdk-item]", cmdk).filter(function (o) { return !o.hidden; }); };
    function setActive(i) {
      var v = visible();
      if (!v.length) { active = -1; input.removeAttribute("aria-activedescendant"); return; }
      active = (i + v.length) % v.length;
      v.forEach(function (o, k) { o.setAttribute("aria-selected", k === active ? "true" : "false"); });
      input.setAttribute("aria-activedescendant", v[active].id);
      v[active].scrollIntoView({ block: "nearest" });
    }
    function filter() {
      var q = norm(input.value.trim());
      var words = q.split(/\s+/).filter(Boolean);
      $$("[data-cmdk-item]", cmdk).forEach(function (o) {
        var hay = norm(o.textContent + " " + (o.getAttribute("data-kw") || ""));
        o.hidden = !words.every(function (w) { return hay.indexOf(w) !== -1; });
      });
      $$("[data-cmdk-group]", cmdk).forEach(function (g) { g.hidden = !$$("[data-cmdk-item]", g).some(function (o) { return !o.hidden; }); });
      empty.hidden = visible().length > 0;
      // Highlight the best match: words found in the visible label beat hidden keywords
      var best = 0, bestScore = -1;
      visible().forEach(function (o, k) {
        var label = norm(o.textContent), sc = 0;
        words.forEach(function (w) {
          if (new RegExp("(^|[^a-z0-9])" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).test(label)) sc += 3;
          else if (label.indexOf(w) !== -1) sc += 2;
        });
        if (sc > bestScore) { bestScore = sc; best = k; }
      });
      setActive(words.length ? best : 0);
    }
    function open() {
      opener = doc.activeElement;
      cmdk.hidden = false;
      root.classList.add("cmdk-open");
      if (lenis) lenis.stop();
      input.value = ""; filter();
      requestAnimationFrame(function () { input.focus(); });
    }
    function close() {
      cmdk.hidden = true;
      root.classList.remove("cmdk-open");
      if (lenis) lenis.start();
      if (opener && opener.focus) opener.focus();
    }
    function run(o) {
      var act = o.getAttribute("data-action"), anchor = o.getAttribute("data-anchor");
      if (act === "theme") { var t = $("[data-theme-toggle]"); close(); if (t) t.click(); return; }
      if (act === "copy") {
        var email = o.getAttribute("data-copy"), done = o.getAttribute("data-done");
        var ok = function () { var l = $("[data-cmdk-label]", o); if (l) { var old = l.textContent; l.textContent = done; setTimeout(function () { l.textContent = old; }, 1400); } };
        try { navigator.clipboard.writeText(email).then(ok, ok); } catch (e) { ok(); }
        return;
      }
      if (act && act.indexOf("lang:") === 0) { var lk = $('a[hreflang="' + act.slice(5) + '"]'); close(); if (lk) lk.click(); return; }
      if (anchor && doc.getElementById(anchor)) { close(); scrollToEl(doc.getElementById(anchor)); return; }
      close();
      if (o.tagName === "A") { if (o.target === "_blank") window.open(o.href, "_blank", "noopener"); else location.href = o.href; }
    }
    doc.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-cmdk-open]")) { e.preventDefault(); open(); return; }
      if (cmdk.hidden) return;
      if (e.target.closest && e.target.closest("[data-cmdk-close]")) { close(); return; }
      var o = e.target.closest && e.target.closest("[data-cmdk-item]");
      if (o && cmdk.contains(o)) { e.preventDefault(); run(o); }
    });
    cmdk.addEventListener("pointermove", function (e) {
      var o = e.target.closest && e.target.closest("[data-cmdk-item]");
      if (o) { var v = visible(), k = v.indexOf(o); if (k !== -1 && k !== active) setActive(k); }
    });
    input.addEventListener("input", filter);
    doc.addEventListener("keydown", function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || "") || (e.target && e.target.isContentEditable);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); if (cmdk.hidden) open(); else close(); return; }
      if (e.key === "/" && cmdk.hidden && !typing) { e.preventDefault(); open(); return; }
      if (cmdk.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Home") { e.preventDefault(); setActive(0); }
      else if (e.key === "End") { e.preventDefault(); setActive(visible().length - 1); }
      else if (e.key === "Enter") { var v = visible(); if (v[active]) { e.preventDefault(); run(v[active]); } }
      else if (e.key === "Tab") { e.preventDefault(); input.focus(); }
    });
    // Show the right shortcut (Cmd on Mac, Ctrl elsewhere)
    var mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    $$("[data-kbd-mod]").forEach(function (k) { k.textContent = mac ? "⌘" : "Ctrl"; });
  }

  /* ---------- Visibility score quiz ---------- */
  $$("[data-quiz]").forEach(function (box) {
    var D = readJSON(box.getAttribute("data-quiz"));
    var stage = $("[data-quiz-stage]", box);
    if (!D || !stage) return;
    var answers = [], step = 0;
    var points = { yes: 2, partly: 1, no: 0 };
    function question() {
      var q = D.questions[step];
      var pct = Math.round((step / D.questions.length) * 100);
      stage.innerHTML =
        '<div class="quiz-head"><span class="label-mono">' + esc(D.question) + " " + (step + 1) + " " + esc(D.of) + " " + D.questions.length + "</span>" +
        (step > 0 ? '<button type="button" class="quiz-back" data-q-back>' + esc(D.back) + "</button>" : "") + "</div>" +
        '<div class="quiz-bar"><span style="width:' + pct + '%"></span></div>' +
        '<p class="quiz-q" tabindex="-1">' + esc(q.q) + "</p>" +
        '<div class="quiz-answers">' + ["yes", "partly", "no"].map(function (a, i) {
          return '<button type="button" class="quiz-answer" data-q-answer="' + a + '"><span class="quiz-key">' + (i + 1) + "</span>" + esc(D.answers[a]) + "</button>";
        }).join("") + "</div>";
      var qq = $(".quiz-q", stage); if (qq && step > 0) qq.focus({ preventScroll: true });
    }
    function result() {
      var total = answers.reduce(function (s, a) { return s + points[a]; }, 0);
      var score = Math.round((total / (D.questions.length * 2)) * 100);
      var level = score < 40 ? "low" : score < 70 ? "mid" : "high";
      var weak = D.questions.map(function (q, i) { return { area: q.area, a: answers[i] }; })
        .filter(function (x) { return x.a !== "yes"; })
        .sort(function (x, y) { return points[x.a] - points[y.a]; });
      var tips = weak.map(function (x) { return D.tips[x.area]; });
      var needMap = { google: "website", social: "social", whatsapp: "ai", website: "website", booking: "website", video: "video" };
      var needs = []; weak.forEach(function (x) { var n = needMap[x.area]; if (needs.indexOf(n) === -1) needs.push(n); });
      var tipText = weak.map(function (x) { return D.areaNames[x.area]; }).join(", ") || "—";
      var contact = navHref("contact", D.contactPath) + "?msg=" + encodeURIComponent(fill(D.contactMessage, { score: score, tips: tipText })) + (needs.length ? "&needs=" + needs.join(",") : "");
      var C = 2 * Math.PI * 52;
      stage.innerHTML =
        '<div class="quiz-result">' +
        '<div class="quiz-ring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="ring-bg"/><circle cx="60" cy="60" r="52" class="ring-fg ring-' + level + '" style="stroke-dasharray:' + C.toFixed(1) + ";stroke-dashoffset:" + C.toFixed(1) + '"/></svg>' +
        '<div class="quiz-score"><span data-q-count>0</span><small>/100</small></div></div>' +
        '<div class="quiz-summary"><p class="label-mono">' + esc(D.resultLabel) + '</p><h3 class="quiz-level">' + esc(D.levels[level]) + "</h3>" +
        "<p class=\"quiz-text\">" + esc(D.levelText[level]) + "</p></div></div>" +
        '<div class="quiz-tips"><p class="label-mono">' + esc(D.tipsTitle) + "</p>" +
        (tips.length ? "<ol>" + tips.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol>" : "<p>" + esc(D.allGood) + "</p>") + "</div>" +
        '<div class="quiz-ctas"><a class="btn btn-primary" href="' + esc(contact) + '">' + esc(D.ctaAudit) + "</a>" +
        '<a class="btn btn-secondary" target="_blank" rel="noopener noreferrer" href="' + esc(waLink(fill(D.waMessage, { score: score, tips: tipText }))) + '">' + esc(D.ctaWhatsapp) + "</a>" +
        '<button type="button" class="quiz-back" data-q-restart>' + esc(D.restart) + "</button></div>" +
        '<p class="quiz-note">' + esc(D.note) + "</p>";
      box.setAttribute("data-quiz-done", level);
      var fg = $(".ring-fg", stage), cnt = $("[data-q-count]", stage);
      requestAnimationFrame(function () { requestAnimationFrame(function () { fg.style.strokeDashoffset = (C * (1 - score / 100)).toFixed(1); }); });
      if (reduce) cnt.textContent = score;
      else { var t0 = performance.now(); (function up(t) { var k = Math.min(1, (t - t0) / 1100); cnt.textContent = Math.round(score * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(up); })(t0); }
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-q-start],[data-q-answer],[data-q-back],[data-q-restart]");
      if (!b) return;
      if (b.hasAttribute("data-q-start") || b.hasAttribute("data-q-restart")) { answers = []; step = 0; box.removeAttribute("data-quiz-done"); question(); return; }
      if (b.hasAttribute("data-q-back")) { step = Math.max(0, step - 1); answers.length = step; question(); return; }
      answers[step] = b.getAttribute("data-q-answer"); step++;
      if (step >= D.questions.length) result(); else question();
    });
    box.addEventListener("keydown", function (e) {
      if (!$("[data-q-answer]", box)) return;
      var map = { "1": "yes", "2": "partly", "3": "no" }[e.key];
      if (map) { var b = $('[data-q-answer="' + map + '"]', box); if (b) b.click(); }
    });
  });

  /* ---------- AI WhatsApp demo ---------- */
  $$("[data-ai]").forEach(function (box) {
    var D = readJSON(box.getAttribute("data-ai"));
    if (!D) return;
    var log = $("[data-ai-log]", box), form = $("[data-ai-form]", box), field = $("[data-ai-input]", box);
    var booking = null;
    var priority = ["book", "delivery", "menu", "location", "hours", "thanks", "greet"];
    function hasKw(text, kw) {
      if (/[\u0600-\u06FF]/.test(kw)) return text.indexOf(kw) !== -1;
      var k = norm(kw).trim();
      if (k.indexOf(" ") !== -1) return text.indexOf(k) !== -1;
      var re = k.length <= 3 ? new RegExp("(^|[^a-z0-9])" + k + "([^a-z0-9]|$)") : new RegExp("(^|[^a-z0-9])" + k);
      return re.test(text);
    }
    function detectLang(raw) {
      if (/[\u0600-\u06FF]/.test(raw)) return "ar";
      var t = " " + norm(raw) + " ";
      var score = function (list) { return list.reduce(function (s, w) { return s + (hasKw(t, w) ? 1 : 0); }, 0); };
      var dj = score(D.markers.darija) + (/[a-z][379][a-z]|(^|\s)[379][a-z]/.test(t) ? 2 : 0);
      var en = score(D.markers.en), fr = score(D.markers.fr);
      if (dj > 0 && dj >= en && dj >= fr) return "darija";
      if (en > fr) return "en";
      if (fr > en) return "fr";
      return D.locale === "en" ? "en" : D.locale === "ar" ? "ar" : "fr";
    }
    function intentOf(raw) {
      var t = " " + norm(raw) + " ";
      for (var i = 0; i < priority.length; i++) {
        var kws = D.keywords[priority[i]];
        for (var j = 0; j < kws.length; j++) if (hasKw(t, kws[j])) return priority[i];
      }
      return "fallback";
    }
    function parseBooking(raw, prev) {
      var t = norm(raw).replace(/[\u0660-\u0669]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); });
      var out = { people: prev && prev.people, time: prev && prev.time };
      var m = t.match(/(?:^|[^a-z0-9])(\d{1,2})\s*(?:h|:)\s*(\d{2})?/), hh = null, mm = "00", used = "";
      if (m) { hh = +m[1]; mm = m[2] || "00"; used = m[0]; }
      else if ((m = t.match(/(?:^|[^a-z0-9])(\d{1,2})\s*(am|pm)\b/))) { hh = +m[1] + (m[2] === "pm" && +m[1] < 12 ? 12 : 0); used = m[0]; }
      else if ((m = t.match(/(?:at|a|vers|\u0639\u0644\u0649|f|fi|m3a)\s+(\d{1,2})(?!\d)/))) { hh = +m[1]; used = m[0]; }
      if (hh !== null && hh <= 24) { if (hh >= 1 && hh <= 11 && !/\d\s*am\b/.test(t)) hh += 12; out.time = (hh < 10 ? "0" : "") + hh + ":" + mm; }
      var rest = used ? t.replace(used, " ") : t;
      var p = rest.match(/(?:^|[^a-z0-9])(\d{1,2})(?![a-z0-9])/); // standalone numbers only ("n7jz" is a word)
      if (p && +p[1] > 0 && +p[1] <= 30) out.people = +p[1];
      return out;
    }
    function bubble(side, html) {
      var li = doc.createElement("li");
      li.className = "ai-msg ai-" + side;
      var now = new Date(), hm = (now.getHours() < 10 ? "0" : "") + now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
      li.innerHTML = '<div class="ai-bubble"><p dir="auto">' + html + '</p><span class="ai-time">' + hm + (side === "out" ? ' <span class="ai-ticks">✓✓</span>' : "") + "</span></div>";
      log.appendChild(li);
      log.scrollTop = log.scrollHeight;
      return li;
    }
    function setPanel(info) {
      Object.keys(info).forEach(function (k) {
        var el = $('[data-ai-field="' + k + '"]', box);
        if (el) { el.textContent = info[k]; el.classList.remove("ai-flash"); void el.offsetWidth; el.classList.add("ai-flash"); }
      });
    }
    function respond(raw) {
      var lang = detectLang(raw), intent = intentOf(raw), R = D.replies[lang], details = "—", action = D.actions.reply, text;
      var bookingFlow = intent === "book" || (booking && /\d|[\u0660-\u0669]/.test(raw) && intent !== "menu" && intent !== "delivery");
      if (bookingFlow) {
        intent = "book";
        booking = parseBooking(raw, booking);
        var F = D.formats[lang];
        if (booking.people && booking.time) {
          text = fill(R.booked, { people: booking.people, time: booking.time });
          details = fill(F.people, { n: booking.people }) + " · " + booking.time;
          action = D.actions.booked; booking = null;
        } else {
          text = !booking.people && !booking.time ? R.bookAsk : !booking.people ? R.bookAskPeople : R.bookAskTime;
          details = [booking.people ? fill(F.people, { n: booking.people }) : "", booking.time || ""].filter(Boolean).join(" · ") || "—";
          action = D.actions.ask;
        }
      } else {
        text = R[intent];
        if (intent === "menu") action = D.actions.menu;
        if (intent === "location") action = D.actions.location;
        if (intent === "fallback") action = D.actions.handoff;
      }
      var delay = reduce ? 200 : 650 + Math.min(900, text.length * 9);
      var typing = doc.createElement("li");
      typing.className = "ai-msg ai-in ai-typing";
      typing.innerHTML = '<div class="ai-bubble"><span></span><span></span><span></span></div>';
      log.appendChild(typing); log.scrollTop = log.scrollHeight;
      setPanel({ intent: D.intents[intent], lang: D.langs[lang], details: details, action: "…", time: "…" });
      setTimeout(function () {
        typing.remove();
        var li = bubble("in", esc(text));
        if (intent === "menu") li.querySelector(".ai-bubble").insertAdjacentHTML("afterbegin", '<span class="ai-attach">🖼️ menu.jpg</span>');
        if (intent === "location") li.querySelector(".ai-bubble").insertAdjacentHTML("afterbegin", '<span class="ai-attach">📍 Café Atlas · Agadir</span>');
        setPanel({ action: action, time: (delay / 1000).toFixed(1).replace(".", D.locale === "en" ? "." : ",") + " s" });
      }, delay);
    }
    function send(text) {
      text = String(text || "").trim();
      if (!text) return;
      bubble("out", esc(text));
      field.value = "";
      respond(text);
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); send(field.value); });
    box.addEventListener("click", function (e) {
      var s = e.target.closest && e.target.closest("[data-ai-suggest]");
      if (s) { send(s.textContent); return; }
      if (e.target.closest && e.target.closest("[data-ai-reset]")) {
        $$(".ai-msg:not(.ai-welcome)", log).forEach(function (m) { m.remove(); });
        booking = null;
        setPanel({ intent: "—", lang: "—", details: "—", action: D.waiting, time: "—" });
      }
    });
  });

  /* ---------- Package builder ---------- */
  $$("[data-builder]").forEach(function (box) {
    var D = readJSON(box.getAttribute("data-builder"));
    var out = $("[data-builder-result]", box);
    if (!D || !out) return;
    var coverage = { starter: ["google", "photo", "website", "whatsapp"], growth: ["reels", "social", "google", "photo"], full: ["website", "booking", "ai", "whatsapp", "reels", "social", "photo"] };
    function selected() { return $$("[data-need][aria-pressed='true']", box).map(function (b) { return b.getAttribute("data-need"); }); }
    function plan(sel) {
      if (sel.indexOf("ai") !== -1 || sel.indexOf("booking") !== -1) return "full";
      if (sel.indexOf("reels") !== -1 || sel.indexOf("social") !== -1) return sel.indexOf("website") !== -1 ? "full" : "growth";
      return "starter";
    }
    function render() {
      var sel = selected();
      $$("[data-plan-card]").forEach(function (c) { c.removeAttribute("data-recommended"); });
      if (!sel.length) { out.innerHTML = '<p class="builder-empty">' + esc(D.empty) + "</p>"; return; }
      var p = plan(sel), P = D.plans[p];
      var inc = sel.filter(function (n) { return coverage[p].indexOf(n) !== -1; });
      var opt = sel.filter(function (n) { return coverage[p].indexOf(n) === -1; });
      var names = sel.map(function (n) { return D.needs[n]; }).join(", ");
      var card = $('[data-plan-card="' + p + '"]'); if (card) card.setAttribute("data-recommended", "");
      var contact = navHref("contact", D.contactPath) + "?msg=" + encodeURIComponent(fill(D.contactMessage, { plan: P.name, needs: names })) + "&needs=" + D.formNeeds(sel);
      out.innerHTML =
        '<p class="label-mono">' + esc(D.recommended) + "</p>" +
        '<div class="builder-plan"><h3>' + esc(P.name) + "</h3><p>" + esc(P.desc) + "</p></div>" +
        '<div class="builder-price"><span>' + esc(D.from) + "</span><strong>" + esc(P.price) + "</strong><em>" + esc(P.period) + "</em></div>" +
        '<div class="builder-lists"><div><p class="label-mono">' + esc(D.included) + "</p><ul>" + inc.map(function (n) { return '<li class="ok">' + esc(D.needs[n]) + "</li>"; }).join("") + "</ul></div>" +
        (opt.length ? '<div><p class="label-mono">' + esc(D.onQuote) + "</p><ul>" + opt.map(function (n) { return '<li class="opt">' + esc(D.needs[n]) + "</li>"; }).join("") + "</ul></div>" : "") + "</div>" +
        '<div class="builder-ctas"><a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="' + esc(waLink(fill(D.waMessage, { plan: P.name, needs: names }))) + '">' + esc(D.sendWhatsapp) + "</a>" +
        '<a class="btn btn-secondary" href="' + esc(contact) + '">' + esc(D.requestAudit) + "</a></div>" +
        '<p class="builder-note">' + esc(D.note) + "</p>";
    }
    var needToForm = { google: "website", photo: "video", whatsapp: "ai", website: "website", reels: "video", social: "social", booking: "website", ai: "ai" };
    D.formNeeds = function (sel) { var o = []; sel.forEach(function (n) { var f = needToForm[n]; if (o.indexOf(f) === -1) o.push(f); }); return o.join(","); };
    box.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-need]");
      if (!b) return;
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
      render();
    });
    render();
  });

  /* ---------- Contact form prefill (?msg=…&needs=a,b) ---------- */
  try {
    var params = new URLSearchParams(location.search);
    var msg = params.get("msg"), needs = (params.get("needs") || "").split(",").filter(Boolean);
    if (msg || needs.length) {
      var prefill = function () {
        var ta = $('textarea[name="message"]');
        if (!ta) return false;
        if (msg && !ta.value) ta.value = msg;
        needs.forEach(function (n) { var c = $('input[name="needs"][value="' + n + '"]'); if (c) c.checked = true; });
        return true;
      };
      if (!prefill()) setTimeout(prefill, 600);
    }
  } catch (e) {}
})();
