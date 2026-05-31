// Smooth scroll without changing URL hash
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    // If it's just "#" or empty, skip
    if (!targetId || targetId === "#") return;

    // Prevent default anchor jump & URL hash change
    e.preventDefault();

    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    const navLinksContainer = document.querySelector(".nav-links");
    if (navLinksContainer && window.innerWidth <= 640) {
      navLinksContainer.classList.remove("nav-open");
    }
  });
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Always start at top on full page load
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

const activateNavLink = (id) => {
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `#${id}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

const sections = document.querySelectorAll("main section[id]");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activateNavLink(entry.target.id);
      }
    });
  },
  { rootMargin: "-20% 0px -55% 0px", threshold: 0.1 }
);

sections.forEach((section) => navObserver.observe(section));

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -10% 0px" }
);

document.querySelectorAll(".timeline-item").forEach((item) => {
  timelineObserver.observe(item);
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// --- Theme toggle ---
const rootEl = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");
const shouldUseDark = savedTheme ? savedTheme === "dark" : true;

rootEl.classList.toggle("dark", shouldUseDark);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = rootEl.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

const navToggle = document.getElementById("nav-toggle");
const navLinksContainer = document.querySelector(".nav-links");

if (navToggle && navLinksContainer) {
  navToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("nav-open");
  });
}

const siteHeader = document.querySelector(".site-header");
let lastScrollY = window.scrollY;

window.addEventListener(
  "scroll",
  () => {
    if (!siteHeader) return;

    const currentScrollY = window.scrollY;
    const isMenuOpen = navLinksContainer?.classList.contains("nav-open");

    if (currentScrollY <= 20 || currentScrollY < lastScrollY || isMenuOpen) {
      siteHeader.classList.remove("header-hidden");
    } else if (currentScrollY > lastScrollY && currentScrollY > 90) {
      siteHeader.classList.add("header-hidden");
    }

    lastScrollY = currentScrollY;
  },
  { passive: true }
);
