// Portfolio behavior. Vanilla, no dependencies.
// Boot-in reveals, the hero start-menu pointer, the tabbed experience section,
// and section-header power-ons. All motion is gated behind prefers-reduced-motion.

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function boot(scope) {
    if (reduceMotion) return;
    scope.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.remove("booted");
      void el.offsetWidth;      // restart the animation
      el.classList.add("booted");
    });
  }

  /* ---- boot the hero on load, and each section header as it scrolls in ---- */

  var hero = document.getElementById("home");
  if (hero) boot(hero);

  if ("IntersectionObserver" in window && !reduceMotion) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) boot(e.target); });
    }, { rootMargin: "0px 0px -20% 0px", threshold: 0.3 });
    document.querySelectorAll(".section").forEach(function (s) { seen.observe(s); });
  }

  // re-boot a section's header when a nav / menu link jumps to it
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function () {
      var target = document.querySelector(a.getAttribute("href"));
      if (target) setTimeout(function () { boot(target); }, 60);
    });
  });

  /* ---- game menus: one blinking pointer per menu, follows hover / focus ---- */

  document.querySelectorAll(".gmenu__list").forEach(function (list) {
    var items = Array.prototype.slice.call(list.querySelectorAll(".gmenu__item"));
    if (items[0]) items[0].classList.add("is-active");
    items.forEach(function (m, i) {
      function activate() { items.forEach(function (x, j) { x.classList.toggle("is-active", j === i); }); }
      m.addEventListener("mouseenter", activate);
      m.addEventListener("focus", activate);
    });
  });

  /* ---- experience: tabbed roles ---- */

  var experience = [
    {
      role: "Junior Web Developer", co: "HONEST DIGITAL", at: "Honest Digital",
      dates: "Mar 2024 – Jun 2026 · Remote",
      bullets: [
        "Built and maintained 30+ live client properties across 7+ CMS platforms including Adobe Experience Manager, WordPress, Ansira, DealerInspire, DealerOn, Dealer.com, and Apollo, working inside established component systems and brand standards.",
        "Traced a class of silently failing redirects across the client base back to broken redirect chains, loops, and incorrect slugs. Uploads reported success, nothing errored, and no alert existed, so the only signal was organic traffic dropping weeks later. Wrote the standardized procedure and ran the trainings; bulk redirects took half the time afterward.",
        "Executed technical SEO across the portfolio: schema markup and JSON-LD, canonical tags, metadata, XML sitemaps, robots.txt and crawler directives, redirect strategy, and internal linking.",
        "Wrote custom modules and page templates in HTML, CSS, and JavaScript when a platform did not provide what a client needed, including a service-location map module rendering locations as linked cards and map pins, and contributed them to a shared library the whole client base drew from.",
        "Ran pre-release QA across devices, browsers, and screen sizes, reproducing and resolving defects that front-line reporting could not diagnose.",
        "Served as the named technical point of contact on client accounts running in parallel, including one where I was authorized to act directly on all web and technical matters.",
        "Applied WCAG accessibility standards and FTC required advertising disclosures on regulated content, and co-authored three SOPs adopted department-wide."
      ]
    },
    {
      role: "AI Testing Engineer", co: "SCALE.AI", at: "Scale.ai",
      dates: "Aug 2023 – Mar 2024 · Remote",
      bullets: [
        "Evaluated model-generated code across JavaScript, Python, Java and C++ against structured rubric criteria over hundreds of cases, improving measured accuracy by 40%+ through systematic edge-case analysis.",
        "Synthesized failure patterns across 500+ documented cases into a repeatable feedback framework used to correct model behavior upstream rather than case by case.",
        "Designed evaluation scenarios targeting DOM manipulation, async behavior, and CSS rendering edge cases, accelerating benchmark coverage of real-world front-end tasks."
      ]
    },
    {
      role: "Director of Warehouse Operations", co: "SNAG DELIVERY", at: "Snag Delivery",
      dates: "Dec 2020 – Dec 2022 · Santa Barbara, CA",
      bullets: [
        "Joined as one of the company's first drivers and was promoted to Director of Warehouse Operations within two months.",
        "Hired 20 to 25 associates, scheduled and assigned peak shift crews, and owned coaching, performance conversations, and daily throughput targets.",
        "Rebuilt the order-to-delivery workflow after tracing a routing defect in the dispatch software, cutting order-to-delivery time by 16% and running the same volume with fewer people on shift.",
        "Led the expansion into a regulated product category, building the operational and compliance controls the new line required."
      ]
    }
  ];

  var tabsEl = document.getElementById("exp-tabs");
  var panelEl = document.getElementById("exp-panel");
  var active = 0;

  function renderTabs() {
    if (!tabsEl) return;
    tabsEl.innerHTML = "";
    experience.forEach(function (e, i) {
      var b = document.createElement("button");
      b.className = "exp__tab" + (i === active ? " is-active" : "");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === active ? "true" : "false");
      b.setAttribute("tabindex", i === active ? "0" : "-1");
      b.innerHTML =
        '<span class="car" aria-hidden="true">▶</span>' +
        '<span><span class="role">' + e.role + '</span>' +
        '<span class="co">' + e.co + '</span></span>';
      b.addEventListener("click", function () { select(i); });
      b.addEventListener("keydown", onTabKey);
      tabsEl.appendChild(b);
    });
  }

  function renderPanel() {
    if (!panelEl) return;
    var e = experience[active];
    panelEl.innerHTML =
      '<p class="ptitle">' + e.role + ' <span class="at">@ ' + e.at + '</span></p>' +
      '<p class="pdates">' + e.dates + '</p>' +
      '<ul>' + e.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + '</ul>';
  }

  function select(i, focusTab) {
    active = i;
    renderTabs();
    renderPanel();
    if (focusTab) {
      var t = tabsEl.children[i];
      if (t) t.focus();
    }
  }

  function onTabKey(e) {
    var n = experience.length;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); select((active + 1) % n, true); }
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); select((active - 1 + n) % n, true); }
    else if (e.key === "Home") { e.preventDefault(); select(0, true); }
    else if (e.key === "End") { e.preventDefault(); select(n - 1, true); }
  }

  renderTabs();
  renderPanel();
})();
