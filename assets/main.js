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
  { rootMargin: "-45% 0px -45% 0px", threshold: 0.1 }
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
