
const cfg = window.PORTFOLIO_CONFIG || {};

// Current year
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Contact button
const contactButton = document.getElementById("contactButton");

if (contactButton) {
  if (cfg.email) {
    contactButton.href = `mailto:${cfg.email}`;
  } else {
    contactButton.href = "#contact";
    contactButton.addEventListener("click", e => {
      e.preventDefault();
      alert("Add your email address in config.js before publishing this portfolio.");
    });
  }
}

// LinkedIn and GitHub links
const linkSetup = (id, url, label) => {
  const el = document.getElementById(id);
  if (!el) return;

  if (url) {
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  } else {
    el.href = "#contact";
    el.addEventListener("click", e => {
      e.preventDefault();
      alert(`Add your ${label} URL in config.js before publishing.`);
    });
  }
};

linkSetup("linkedinLink", cfg.linkedin, "LinkedIn");
linkSetup("githubLink", cfg.github, "GitHub");

// Mobile navigation
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

// FleetSet screenshot lightbox
const galleryImages = Array.from(
  document.querySelectorAll(".project-gallery img")
);

if (galleryImages.length > 0) {
  let currentIndex = 0;

  // Create lightbox
  const lightbox = document.createElement("div");
  lightbox.id = "portfolio-lightbox";

  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close preview">&times;</button>
    <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
    <div class="lightbox-content">
      <img class="lightbox-image" src="" alt="">
      <p class="lightbox-caption"></p>
      <span class="lightbox-counter"></span>
    </div>
    <button class="lightbox-next" aria-label="Next image">&#10095;</button>
  `;

  document.body.appendChild(lightbox);

  // Lightbox styling
  const style = document.createElement("style");

  style.textContent = `
    #portfolio-lightbox {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.94);
      padding: 25px;
    }

    #portfolio-lightbox.active {
      display: flex;
    }

    .lightbox-content {
      max-width: 1100px;
      width: 100%;
      text-align: center;
    }

    .lightbox-image {
      display: block;
      max-width: 100%;
      max-height: 78vh;
      width: auto;
      height: auto;
      object-fit: contain;
      margin: auto;
      border-radius: 10px;
    }

    .lightbox-caption {
      color: white;
      margin: 15px 0 5px;
      font-size: 14px;
    }

    .lightbox-counter {
      color: #aaa;
      font-size: 12px;
    }

    .lightbox-close,
    .lightbox-prev,
    .lightbox-next {
      position: absolute;
      border: none;
      background: rgba(255,255,255,0.12);
      color: white;
      cursor: pointer;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lightbox-close {
      top: 20px;
      right: 25px;
      font-size: 32px;
    }

    .lightbox-prev {
      left: 20px;
    }

    .lightbox-next {
      right: 20px;
    }

    .lightbox-close:hover,
    .lightbox-prev:hover,
    .lightbox-next:hover {
      background: rgba(255,255,255,0.25);
    }

    .project-gallery img {
      cursor: zoom-in;
    }

    @media (max-width: 600px) {
      #portfolio-lightbox {
        padding: 15px;
      }

      .lightbox-prev {
        left: 8px;
      }

      .lightbox-next {
        right: 8px;
      }

      .lightbox-prev,
      .lightbox-next {
        width: 36px;
        height: 36px;
        font-size: 18px;
      }

      .lightbox-image {
        max-height: 70vh;
      }
    }
  `;

  document.head.appendChild(style);

  const previewImage = lightbox.querySelector(".lightbox-image");
  const caption = lightbox.querySelector(".lightbox-caption");
  const counter = lightbox.querySelector(".lightbox-counter");

  // Display selected image
  function showImage(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;

    const selected = galleryImages[currentIndex];

    previewImage.src = selected.src;
    previewImage.alt = selected.alt || "FleetSet screenshot";

    const figure = selected.closest("figure");
    const figureCaption = figure?.querySelector("figcaption");

    caption.textContent =
      figureCaption?.textContent || selected.alt || "";

    counter.textContent =
      `${currentIndex + 1} / ${galleryImages.length}`;
  }

  // Open lightbox
  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Image click events
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  // Navigation buttons
  lightbox.querySelector(".lightbox-prev")
    .addEventListener("click", () => {
      showImage(currentIndex - 1);
    });

  lightbox.querySelector(".lightbox-next")
    .addEventListener("click", () => {
      showImage(currentIndex + 1);
    });

  lightbox.querySelector(".lightbox-close")
    .addEventListener("click", closeLightbox);

  // Close when clicking the background
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard controls
  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      showImage(currentIndex + 1);
    } else if (e.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    }
  });
}
