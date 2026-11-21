const cfg = window.PORTFOLIO_CONFIG || {};
document.getElementById("year").textContent = new Date().getFullYear();
const contactButton = document.getElementById("contactButton");
if (cfg.email) contactButton.href = `mailto:${cfg.email}`;
else {
  contactButton.href = "#contact";
  contactButton.addEventListener("click", e => {
    e.preventDefault();
    alert("Add your email address in config.js before publishing this portfolio.");
  });
}
const linkSetup = (id, url, label) => {
  const el = document.getElementById(id);
  if (url) { el.href = url; el.target = "_blank"; el.rel = "noopener noreferrer"; }
  else { el.href = "#contact"; el.addEventListener("click", e => { e.preventDefault(); alert(`Add your ${label} URL in config.js before publishing.`); }); }
};
linkSetup("linkedinLink", cfg.linkedin, "LinkedIn");
linkSetup("githubLink", cfg.github, "GitHub");
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); toggle.textContent="☰";
}));