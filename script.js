/* =========================================================
   IRONYARD — script.js
   Pure vanilla JS. No frameworks, no dependencies.
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     0. Data — Trending & Featured products (affiliate placeholders)
     --------------------------------------------------------- */
  const TRENDING = [
    { name: "Pro Grip Lifting Straps", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=70", badge: "BESTSELLER", rating: 4.8, reviews: 612, price: "₹799", old: "₹1,199" },
    { name: "Whey Isolate Protein 1kg", img: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&w=500&q=70", badge: "TRENDING", rating: 4.7, reviews: 934, price: "₹2,349", old: "₹2,999" },
    { name: "Adjustable Dumbbell Set", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=70", badge: "34% OFF", rating: 4.9, reviews: 421, price: "₹6,499", old: "₹9,899" },
    { name: "Smart Fitness Band", img: "https://images.unsplash.com/photo-1575311373937-8f9b7a5b8d8c?auto=format&fit=crop&w=500&q=70", badge: "NEW", rating: 4.6, reviews: 288, price: "₹1,999", old: "₹2,799" },
    { name: "Foam Roller Recovery Kit", img: "https://images.unsplash.com/photo-1544216717-3bbf52512659?auto=format&fit=crop&w=500&q=70", badge: "TOP RATED", rating: 4.8, reviews: 356, price: "₹1,149", old: "₹1,549" },
    { name: "Breathable Training Tee", img: "https://images.unsplash.com/photo-1521805103424-d8f8430e8933?auto=format&fit=crop&w=500&q=70", badge: "TRENDING", rating: 4.5, reviews: 197, price: "₹649", old: "₹999" }
  ];

  const FEATURED = [
    {
      name: "Olympic Barbell — 20kg",
      cat: "equipment", tag: "EQUIPMENT", offer: "SAVE 18%",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=75",
      desc: "Precision-milled knurling with a 700lb load rating — built for daily heavy lifts.",
      rating: 4.9, reviews: 812, price: "₹8,999", old: "₹10,999"
    },
    {
      name: "ISO-Pure Whey Protein",
      cat: "supplements", tag: "SUPPLEMENTS", offer: "BUY 1 GET 20% OFF",
      img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=75",
      desc: "25g protein per scoop, third-party tested, zero fillers or added sugar.",
      rating: 4.7, reviews: 1204, price: "₹2,899", old: "₹3,499"
    },
    {
      name: "Compression Training Set",
      cat: "apparel", tag: "APPAREL", offer: "NEW ARRIVAL",
      img: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&q=75",
      desc: "Four-way stretch fabric that moves with heavy squats and sprint work alike.",
      rating: 4.6, reviews: 356, price: "₹1,799", old: "₹2,299"
    },
    {
      name: "Heart-Rate Training Watch",
      cat: "wearables", tag: "WEARABLES", offer: "22% OFF",
      img: "https://images.unsplash.com/photo-1575311373937-8f9b7a5b8d8c?auto=format&fit=crop&w=600&q=75",
      desc: "Continuous HR tracking, 14-day battery, built for lifting and cardio blocks.",
      rating: 4.5, reviews: 540, price: "₹4,299", old: "₹5,499"
    },
    {
      name: "Percussion Massage Gun",
      cat: "recovery", tag: "RECOVERY", offer: "TRAINER PICK",
      img: "https://images.unsplash.com/photo-1544216717-3bbf52512659?auto=format&fit=crop&w=600&q=75",
      desc: "6-speed deep tissue recovery tool with a 6-hour battery for daily use.",
      rating: 4.8, reviews: 673, price: "₹3,299", old: "₹4,199"
    },
    {
      name: "Power Rack — Home Edition",
      cat: "equipment", tag: "EQUIPMENT", offer: "LIMITED STOCK",
      img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=75",
      desc: "Bolt-together steel rack rated for heavy squats, pulls and rack work.",
      rating: 4.9, reviews: 289, price: "₹18,999", old: "₹23,499"
    },
    {
      name: "Micronised Creatine 500g",
      cat: "supplements", tag: "SUPPLEMENTS", offer: "SUBSCRIBE & SAVE",
      img: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=600&q=75",
      desc: "Unflavoured, 100% micronised monohydrate — the most-studied form on the market.",
      rating: 4.8, reviews: 998, price: "₹1,099", old: "₹1,399"
    },
    {
      name: "Cushioned Training Shoes",
      cat: "apparel", tag: "APPAREL", offer: "SAVE ₹1,200",
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=75",
      desc: "Stable heel platform for lifting days, cushioned forefoot for conditioning.",
      rating: 4.6, reviews: 445, price: "₹3,799", old: "₹4,999"
    }
  ];

  const AFFILIATE_URL = "https://example-affiliate-partner.com/track?ref=ironyard";

  /* ---------------------------------------------------------
     1. Loader
     --------------------------------------------------------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => loader && loader.classList.add("loaded"), 400);
  });

  /* ---------------------------------------------------------
     2. Scroll progress bar + sticky header hide/show
     --------------------------------------------------------- */
  const progress = document.getElementById("scrollProgress");
  const header = document.getElementById("siteHeader");
  const backToTop = document.getElementById("backToTop");
  let lastScroll = 0;

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progress) progress.style.width = pct + "%";

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 10);
      if (scrollTop > lastScroll && scrollTop > 140) {
        header.classList.add("hide");
      } else {
        header.classList.remove("hide");
      }
    }
    if (backToTop) backToTop.classList.toggle("show", scrollTop > 480);
    lastScroll = scrollTop;
  }
  document.addEventListener("scroll", onScroll, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------------------------------------------------------
     3. Mobile nav
     --------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");
  if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });
    mainNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mainNav.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------------------------------------------------------
     4. Theme toggle (dark / light) — persisted
     --------------------------------------------------------- */
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  function applyTheme(theme) {
    body.setAttribute("data-theme", theme);
    if (themeToggle) themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    try { localStorage.setItem("ironyard-theme", theme); } catch (e) {}
  }

  (function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem("ironyard-theme"); } catch (e) {}
    if (saved) { applyTheme(saved); return; }
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? "light" : "dark");
  })();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  /* ---------------------------------------------------------
     5. Star rating renderer
     --------------------------------------------------------- */
  function starString(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return "★".repeat(full) + (half ? "☆" : "") ;
  }

  /* ---------------------------------------------------------
     6. Render Trending track
     --------------------------------------------------------- */
  const trendingTrack = document.getElementById("trendingTrack");
  if (trendingTrack) {
    trendingTrack.innerHTML = TRENDING.map((p) => `
      <article class="t-card">
        <div class="t-card-img">
          <img loading="lazy" src="${p.img}" alt="${p.name}">
          <span class="t-badge">${p.badge}</span>
        </div>
        <div class="t-card-body">
          <h3>${p.name}</h3>
          <div class="t-rating">${starString(p.rating)} <span>${p.rating} (${p.reviews})</span></div>
          <div class="t-price">${p.price} <s>${p.old}</s></div>
          <a class="btn btn-outline-small" style="margin-top:12px;width:100%;text-align:center;display:block" href="${AFFILIATE_URL}" target="_blank" rel="noopener noreferrer sponsored">View Deal</a>
        </div>
      </article>
    `).join("");
  }

  /* ---------------------------------------------------------
     7. Render Featured grid (+ search / filter)
     --------------------------------------------------------- */
  const featuredGrid = document.getElementById("featuredGrid");
  const emptyState = document.getElementById("emptyState");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const chips = document.querySelectorAll(".chip");

  const ctaLabels = ["View Deal", "Buy Now", "Order Now", "Visit Website", "Open Link"];

  function cardHTML(p, i) {
    const cta = ctaLabels[i % ctaLabels.length];
    return `
      <article class="f-card" data-cat="${p.cat}" data-name="${p.name.toLowerCase()}">
        <div class="f-card-img">
          <img loading="lazy" src="${p.img}" alt="${p.name}">
          <span class="f-tag">${p.tag}</span>
          <span class="f-offer">${p.offer}</span>
        </div>
        <div class="f-card-body">
          <h3>${p.name}</h3>
          <p class="f-desc">${p.desc}</p>
          <div class="f-rating">${starString(p.rating)} <span>${p.rating} · ${p.reviews} reviews</span></div>
          <div class="f-price-row">
            <span class="f-price">${p.price}</span>
            <span class="f-price-old">${p.old}</span>
          </div>
          <div class="f-actions">
            <a class="btn btn-primary" href="${AFFILIATE_URL}" target="_blank" rel="noopener noreferrer sponsored">${cta}</a>
          </div>
        </div>
      </article>
    `;
  }

  let activeFilter = "all";
  let activeQuery = "";

  function renderFeatured() {
    if (!featuredGrid) return;
    const filtered = FEATURED.filter((p) => {
      const matchesCat = activeFilter === "all" || p.cat === activeFilter;
      const matchesQuery = !activeQuery || p.name.toLowerCase().includes(activeQuery) || p.desc.toLowerCase().includes(activeQuery);
      return matchesCat && matchesQuery;
    });
    featuredGrid.innerHTML = filtered.map(cardHTML).join("");
    if (emptyState) emptyState.classList.toggle("hidden", filtered.length > 0);
    observeReveal();
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => { c.classList.remove("active"); c.setAttribute("aria-selected", "false"); });
      chip.classList.add("active");
      chip.setAttribute("aria-selected", "true");
      activeFilter = chip.dataset.filter;
      renderFeatured();
    });
  });

  function runSearch() {
    activeQuery = (searchInput && searchInput.value || "").trim().toLowerCase();
    renderFeatured();
  }
  if (searchBtn) searchBtn.addEventListener("click", runSearch);
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") runSearch(); });
    searchInput.addEventListener("input", () => {
      if (searchInput.value.trim() === "") runSearch();
    });
  }

  // Footer category shortcuts scroll + filter
  document.querySelectorAll("[data-scroll-filter]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const filterVal = link.dataset.scrollFilter;
      const chip = document.querySelector(`.chip[data-filter="${filterVal}"]`);
      if (chip) chip.click();
    });
  });

  renderFeatured();

  /* ---------------------------------------------------------
     8. FAQ accordion
     --------------------------------------------------------- */
  document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".accordion-item");
      const panel = item.querySelector(".accordion-panel");
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".accordion-trigger").forEach((t) => {
        t.setAttribute("aria-expanded", "false");
        t.closest(".accordion-item").querySelector(".accordion-panel").style.maxHeight = null;
      });

      if (!isOpen) {
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------------------------------------------------------
     9. Animated stat counters
     --------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progressRatio = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progressRatio, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progressRatio < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-number").forEach((el) => statObserver.observe(el));

  /* ---------------------------------------------------------
     10. Scroll reveal (reveal-up + forge divider)
     --------------------------------------------------------- */
  let revealObserver;
  function observeReveal() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
    }
    document.querySelectorAll(".reveal-up:not(.in-view), .forge-divider:not(.in-view)").forEach((el) => revealObserver.observe(el));
  }
  observeReveal();

  /* ---------------------------------------------------------
     11. Newsletter form (front-end only demo)
     --------------------------------------------------------- */
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterMsg = document.getElementById("newsletterMsg");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (newsletterMsg) newsletterMsg.textContent = "You're in — welcome to the yard. 💪";
      newsletterForm.reset();
    });
  }

  /* ---------------------------------------------------------
     12. Footer year
     --------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Initial scroll-state paint */
  onScroll();
})();
