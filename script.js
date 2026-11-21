(() => {
  const cfg = window.PORTFOLIO_CONFIG || {};

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const contactButton = document.getElementById("contactButton");
  if (contactButton && cfg.email) {
    contactButton.href = `mailto:${cfg.email}?subject=${encodeURIComponent("Project enquiry")}`;
  }

  const setupLink = (id, url) => {
    const link = document.getElementById(id);
    if (!link || !url) return;
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  };
  setupLink("linkedinLink", cfg.linkedin);
  setupLink("githubLink", cfg.github);

  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const items = Array.from(document.querySelectorAll("[data-lightbox]"));
  const lightbox = document.getElementById("lightbox");
  if (!items.length || !lightbox) return;

  const image = lightbox.querySelector("img");
  const caption = lightbox.querySelector("figcaption");
  const counter = lightbox.querySelector(".lightbox-counter");
  let current = 0;
  let lastFocused = null;

  const open = index => {
    current = (index + items.length) % items.length;
    const item = items[current];
    image.src = item.dataset.src;
    image.alt = item.dataset.alt || "Project screenshot";
    caption.textContent = item.dataset.alt || "";
    counter.textContent = `${current + 1} / ${items.length}`;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    lastFocused = document.activeElement;
    lightbox.querySelector(".lightbox-close").focus();
  };

  const close = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    image.removeAttribute("src");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  };

  const move = direction => open(current + direction);

  items.forEach((item, index) => item.addEventListener("click", () => open(index)));
  lightbox.querySelector(".lightbox-close").addEventListener("click", close);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => move(-1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => move(1));
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
})();
