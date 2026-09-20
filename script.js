"use strict";

const projects = [
  {
    title: "Uncle Samir Menu",
    description: "A responsive restaurant menu project with a clean interface and JavaScript interactions.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://html-preview.github.io/?url=https://github.com/Mohamedbar11062006/Menu/blob/main/index.html"
  },
  {
    title: "Menu Project V2",
    description: "A second menu project version with the project files published in a separate GitHub repository.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://html-preview.github.io/?url=https://github.com/Mohamedbar11062006/menu-2/blob/main/index.html"
  },
  {
    title: "Temperature Converter",
    description: "A browser-based utility for converting temperature values with simple, immediate interaction.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://html-preview.github.io/?url=https://github.com/Mohamedbar11062006/temprature-converter-project/blob/main/index.html"
  },
  {
    title: "Simple Calculator",
    description: "A focused calculator project built to practice clean JavaScript logic and input handling.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://html-preview.github.io/?url=https://github.com/Mohamedbar11062006/4.3-Simple-Calculator/blob/main/index.html"
  },
  {
    title: "Even or Odd Game",
    description: "An interactive number game that turns conditional JavaScript logic into a quick user experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://html-preview.github.io/?url=https://github.com/Mohamedbar11062006/4.4-even-or-odd-game/blob/main/index.html"
  },
  {
    title: "Enhanced Even or Odd Game",
    description: "An enhanced version of the even-or-odd project with a separate, verified GitHub repository.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://html-preview.github.io/?url=https://github.com/Mohamedbar11062006/Enhanced-Even-or-Odd-Game-Project/blob/main/index.html"
  },
  {
    title: "Simple Blog Page",
    description: "A simple HTML blog page project published as its own GitHub repository.",
    tech: ["HTML"],
    url: "https://html-preview.github.io/?url=https://github.com/Mohamedbar11062006/Simple-blog-page/blob/main/index.html"
  }
];

const projectGrid = document.getElementById("projects-grid");
const projectStatus = document.getElementById("project-status");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");
const siteHeader = document.querySelector(".site-header");

function projectCard(project, index) {
  const number = String(index + 1).padStart(2, "0");
  return `
    <article class="project-card reveal">
      <div class="project-top">
        <span class="project-number">${number}</span>
        <span class="project-badge">Live web project</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-footer">
        <div class="project-tech" aria-label="Technologies">
          ${project.tech.map((item) => `<span>${item}</span>`).join("")}
        </div>
        <div class="project-links">
          <a class="project-link" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${project.title} live website">To Project <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  `;
}

function renderProjects() {
  if (!projectGrid) return;
  projectGrid.innerHTML = projects.map(projectCard).join("");
  if (projectStatus) {
    projectStatus.innerHTML = `<span class="status-pulse"></span> ${projects.length} live web project links`;
  }
  setupRevealAnimations();
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal:not([data-reveal-ready])");

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
      element.dataset.revealReady = "true";
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px" });

  revealElements.forEach((element) => {
    element.dataset.revealReady = "true";
    observer.observe(element);
  });
}

function closeMenu() {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navLinks.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

window.addEventListener("scroll", () => {
  if (siteHeader) siteHeader.classList.toggle("scrolled", window.scrollY > 14);
}, { passive: true });

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

setupRevealAnimations();
renderProjects();
