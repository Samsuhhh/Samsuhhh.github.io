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
      dates: "Mar 2024 – Present · Remote",
      bullets: [
        "Reduced 301/404 error resolution time by ~30% across 30+ client properties by identifying a systemic gap in redirect workflows and engineering a standardized debugging process adopted team-wide.",
        "Built and standardized a reusable library of HTML/CSS modules and page templates deployed across the entire client base, enforcing UI consistency and cutting duplicate build time on new sites.",
        "Improved cross-browser compatibility and QA coverage for 30+ production sites using Chrome DevTools to reproduce, isolate, and resolve failures before deployment.",
        "Made deliberate layout and design-hierarchy decisions across distinct page types, matching structure to each page's goal for readability, conversion, and performance.",
        "Collaborated with SEO and Content teams to translate campaign objectives into technical implementations across multiple concurrent client accounts."
      ]
    },
    {
      role: "AI Testing Engineer", co: "SCALE.AI", at: "Scale.ai",
      dates: "Aug 2023 – Dec 2023 · Remote",
      bullets: [
        "Improved LLM-generated JavaScript test accuracy by 40%+ against structured rubric scores by authoring complex Playwright-style automation scenarios and evaluating edge-case handling across hundreds of model outputs.",
        "Reduced recurring model failure patterns by synthesizing quality trends across 500+ responses and building a repeatable feedback framework that functioned as a technical QA pipeline, influencing model retraining cycles.",
        "Designed algorithm and system-design scenarios targeting DOM manipulation, async behavior, and CSS rendering edge cases, accelerating benchmark coverage of real-world front-end tasks."
      ]
    },
    {
      role: "Director of Warehouse Operations", co: "SNAG DELIVERY", at: "Snag Delivery",
      dates: "Dec 2020 – Dec 2022 · Santa Barbara, CA",
      bullets: [
        "Redesigned end-to-end operational procedures and led cross-functional coordination, cutting order-to-delivery time by 16% and increasing customer satisfaction scores by 45%."
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
