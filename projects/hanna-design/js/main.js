// -----------------------------------------
// OSMO PAGE TRANSITION BOILERPLATE
// -----------------------------------------

gsap.registerPlugin(CustomEase);

history.scrollRestoration = "manual";

let lenis = null;
let nextPage = document;
let onceFunctionsInitialized = false;

const hasLenis = typeof window.Lenis !== "undefined";
const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

if (hasScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const rmMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
let reducedMotion = rmMQ.matches;
rmMQ.addEventListener?.("change", e => (reducedMotion = e.matches));
rmMQ.addListener?.(e => (reducedMotion = e.matches));

const has = (s) => {
  if (!nextPage) return false;
  return nextPage.matches?.(s) || !!nextPage.querySelector(s);
};

let staggerDefault = 0.05;
let durationDefault = 0.6;

CustomEase.create("osmo", "0.625, 0.05, 0, 1");
gsap.defaults({ ease: "osmo", duration: durationDefault });



// -----------------------------------------
// FUNCTION REGISTRY
// -----------------------------------------

function initOnceFunctions() {
  initLenis();

  if (onceFunctionsInitialized) return;
  onceFunctionsInitialized = true;

  initChicagoTime();

  // Runs once on first load
  // if (has("[data-something]")) initSomething();
}

function initBeforeEnterFunctions(next) {
  nextPage = next || document;

  // Prep text reveal before the page becomes visible
  prepLayoutTextReveal(nextPage);

  // Runs before the enter animation
  // if (has("[data-something]")) initSomething();
}

function initAfterEnterFunctions(next) {
  nextPage = next || document;

  // Runs after enter animation completes
  initLayoutTextReveal(nextPage);
  initChicagoTime();

  if (hasLenis && lenis) {
    lenis.resize();
  }

  if (hasScrollTrigger) {
    ScrollTrigger.refresh();
  }
}



// -----------------------------------------
// PAGE TRANSITIONS
// -----------------------------------------

function runPageOnceAnimation(next) {
  const tl = gsap.timeline();

  tl.call(() => {
    resetPage(next);
  }, null, 0);

  return tl;
}

function runPageLeaveAnimation(current, next) {
  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionDark = transitionWrap?.querySelector("[data-transition-dark]");

  const tl = gsap.timeline({
    onComplete: () => {
      current.remove();
    }
  });

  CustomEase.create("parallax", "0.7, 0.05, 0.13, 1");

  if (reducedMotion || !transitionWrap || !transitionDark) {
    return tl.set(current, { autoAlpha: 0 });
  }

  tl.set(transitionWrap, {
    zIndex: 2
  });

  tl.fromTo(
    transitionDark,
    {
      autoAlpha: 0
    },
    {
      autoAlpha: 0.8,
      duration: 1.2,
      ease: "parallax"
    },
    0
  );

  tl.fromTo(
    current,
    {
      y: "0vh"
    },
    {
      y: "-25vh",
      duration: 1.2,
      ease: "parallax"
    },
    0
  );

  tl.set(transitionDark, {
    autoAlpha: 0
  });

  return tl;
}

function runPageEnterAnimation(next) {
  const tl = gsap.timeline();

  if (reducedMotion) {
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady");
    tl.call(resetPage, [next], "pageReady");

    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }

  tl.add("startEnter", 0);

  tl.set(next, {
    zIndex: 3
  });

  tl.fromTo(
    next,
    {
      y: "100vh"
    },
    {
      y: "0vh",
      duration: 1.2,
      clearProps: "all",
      ease: "parallax"
    },
    "startEnter"
  );

  tl.add("pageReady");
  tl.call(resetPage, [next], "pageReady");

  return new Promise(resolve => {
    tl.call(resolve, null, "pageReady");
  });
}



// -----------------------------------------
// BARBA HOOKS + INIT
// -----------------------------------------

barba.hooks.beforeEnter(data => {
  // Position new container on top
  gsap.set(data.next.container, {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0
  });

  if (lenis && typeof lenis.stop === "function") {
    lenis.stop();
  }

  initBeforeEnterFunctions(data.next.container);
  applyThemeFrom(data.next.container);
});

barba.hooks.afterLeave(() => {
  if (hasScrollTrigger) {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
});

barba.hooks.enter(data => {
  initBarbaNavUpdate(data);
});

barba.hooks.afterEnter(data => {
  requestAnimationFrame(() => {
    // Reinitialize Webflow after the new page has entered
    reinitWebflowPageData(data);

    // Run page functions
    initAfterEnterFunctions(data.next.container);

    // Settle Lenis
    if (hasLenis && lenis) {
      lenis.resize();
      lenis.start();
    }

    // Refresh ScrollTrigger after layout is stable
    if (hasScrollTrigger) {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  });
});

barba.init({
  debug: true,
  timeout: 7000,
  preventRunning: true,
  transitions: [
    {
      name: "default",
      sync: true,

      // First load
      async once(data) {
        initOnceFunctions();
        initBeforeEnterFunctions(data.next.container);
        applyThemeFrom(data.next.container);

        await runPageOnceAnimation(data.next.container);

        initAfterEnterFunctions(data.next.container);
      },

      // Current page leaves
      async leave(data) {
        return runPageLeaveAnimation(data.current.container, data.next.container);
      },

      // New page enters
      async enter(data) {
        return runPageEnterAnimation(data.next.container);
      }
    }
  ]
});



// -----------------------------------------
// GENERIC + HELPERS
// -----------------------------------------

const themeConfig = {
  light: {
    nav: "dark",
    transition: "light"
  },
  dark: {
    nav: "light",
    transition: "dark"
  }
};

function applyThemeFrom(container) {
  const pageTheme = container?.dataset?.pageTheme || "light";
  const config = themeConfig[pageTheme] || themeConfig.light;

  document.body.dataset.pageTheme = pageTheme;

  const transitionEl = document.querySelector("[data-theme-transition]");
  if (transitionEl) {
    transitionEl.dataset.themeTransition = config.transition;
  }

  const nav = document.querySelector("[data-theme-nav]");
  if (nav) {
    nav.dataset.themeNav = config.nav;
  }
}

function initLenis() {
  if (lenis) return;
  if (!hasLenis) return;

  lenis = new Lenis({
    lerp: 0.165,
    wheelMultiplier: 1.25
  });

  if (hasScrollTrigger) {
    lenis.on("scroll", ScrollTrigger.update);
  }

  gsap.ticker.add(time => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

function resetPage(container) {
  window.scrollTo(0, 0);

  gsap.set(container, {
    clearProps: "position,top,left,right"
  });

  if (hasLenis && lenis) {
    lenis.resize();
    lenis.start();
  }
}

function debounceOnWidthChange(fn, ms) {
  let last = innerWidth;
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      if (innerWidth !== last) {
        last = innerWidth;
        fn.apply(this, args);
      }
    }, ms);
  };
}

function initBarbaNavUpdate(data) {
  const tpl = document.createElement("template");
  tpl.innerHTML = data.next.html.trim();

  const nextNodes = tpl.content.querySelectorAll("[data-barba-update]");
  const currentNodes = document.querySelectorAll("nav [data-barba-update]");

  currentNodes.forEach(function (curr, index) {
    const next = nextNodes[index];
    if (!next) return;

    // Aria-current sync
    const newStatus = next.getAttribute("aria-current");
    if (newStatus !== null) {
      curr.setAttribute("aria-current", newStatus);
    } else {
      curr.removeAttribute("aria-current");
    }

    // Class list sync
    const newClassList = next.getAttribute("class") || "";
    curr.setAttribute("class", newClassList);
  });
}

function reinitWebflowPageData(data) {
  if (!window.Webflow || !data?.next?.html) return;

  const nextDoc = new DOMParser().parseFromString(data.next.html, "text/html");

  const currentHtml = document.documentElement;
  const nextHtml = nextDoc.documentElement;

  ["data-wf-page", "data-wf-site"].forEach(attr => {
    const value = nextHtml.getAttribute(attr);
    if (value) currentHtml.setAttribute(attr, value);
  });

  const Webflow = window.Webflow;

  Webflow.destroy();
  Webflow.ready();

  const ix2 = Webflow.require?.("ix2");
  ix2?.destroy?.();
  ix2?.init?.();

  const tabs = Webflow.require?.("tabs");
  tabs?.redraw?.();

  const slider = Webflow.require?.("slider");
  slider?.redraw?.();
  slider?.ready?.();

  Webflow.require?.("lightbox")?.ready?.();
}



// -----------------------------------------
// YOUR FUNCTIONS GO BELOW HERE
// -----------------------------------------

function isMobile() {
  return window.innerWidth <= 767;
}

function prepLayoutTextReveal(container = document) {
  if (!window.SplitType) return;

  const textElements = container.querySelectorAll(".layout484_text");
  if (!textElements.length) return;

  textElements.forEach(text => {
    // Hide briefly while SplitType wraps the words to prevent full-opacity flash
    text.style.visibility = "hidden";

    if (!text.dataset.splitInitialized) {
      const split = new SplitType(text, {
        types: "words"
      });

      text._splitType = split;
      text.dataset.splitInitialized = "true";
    }

    const words = text._splitType?.words || text.querySelectorAll(".word");

    // Force starting state immediately
    gsap.set(words, {
      opacity: 0.25
    });

    text.style.visibility = "visible";
  });
}

function initLayoutTextReveal(container = document) {
  if (!window.SplitType || !window.ScrollTrigger) return;

  const sections = container.querySelectorAll(".section_layout484");
  if (!sections.length) return;

  sections.forEach(section => {
    const text = section.querySelector(".layout484_text");
    if (!text) return;

    // Prevent duplicate ScrollTriggers on the same page
    if (text.dataset.scrollRevealInitialized === "true") return;
    text.dataset.scrollRevealInitialized = "true";

    // Make sure the text is split and starts at 0.25
    prepLayoutTextReveal(section);

    const words = text._splitType?.words || text.querySelectorAll(".word");

    const startValue = isMobile() ? "top 45%" : "top 40%";
    const endValue = isMobile() ? "bottom 75%" : "bottom 55%";

    gsap.to(words, {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: startValue,
        end: endValue,
        scrub: 1.5,
        invalidateOnRefresh: true
        // markers: true
      }
    });
  });
}

function updateChicagoTime() {
  const timeElements = document.querySelectorAll("[data-chicago-time]");
  const tzElements = document.querySelectorAll("[data-chicago-timezone]");

  if (!timeElements.length && !tzElements.length) return;

  const now = new Date();

  const chicagoTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(now);

  const chicagoTimeZone = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    timeZoneName: "short"
  })
    .formatToParts(now)
    .find(part => part.type === "timeZoneName")?.value || "CT";

  timeElements.forEach(el => {
    el.textContent = chicagoTime;
  });

  tzElements.forEach(el => {
    el.textContent = chicagoTimeZone;
  });
}

function initChicagoTime() {
  updateChicagoTime();

  // Prevent multiple intervals from being created
  if (window.chicagoTimeInterval) return;

  window.chicagoTimeInterval = setInterval(() => {
    updateChicagoTime();
  }, 1000);
}