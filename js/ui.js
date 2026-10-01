/* ============================================================================
   ARPIT'S PORTFOLIO — ui.js
   Dynamic UI Builders (Nav Pills, Socials, Tabs, Ambient Texts, Sparks & Toast)
   ============================================================================ */

import { DATA } from "./data.js";
import { cardHoverGazeOffset } from "./scene.js";
import {
  toggleAboutSection,
  toggleProjectsSection,
  toggleSkillsSection,
  toggleExperienceSection,
  toggleContactSection,
  setPillActive,
  clearPillActive,
  showBentoToast
} from "./sections.js";
import { setTab, renderSection } from "./renderers.js";

export function buildFloatingNav() {
  const nav = document.getElementById("floating-nav");
  if (!nav || !DATA.sections) return;
  nav.innerHTML = "";
  DATA.sections.forEach(sec => {
    const btn = document.createElement("button");
    btn.className = "float-pill";
    btn.setAttribute("data-section", sec.id);
    btn.id = `pill-${sec.id}`;
    btn.innerHTML = `
      <span class="pill-icon">${sec.icon || '✦'}</span>
      <span class="pill-label">${sec.label}</span>
    `;
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      spawnPop(rect.left + rect.width / 2, rect.top + rect.height / 2);
      if (sec.id === "about") {
        toggleAboutSection();
      } else if (sec.id === "projects") {
        toggleProjectsSection();
      } else if (sec.id === "skills") {
        toggleSkillsSection();
      } else if (sec.id === "experience") {
        toggleExperienceSection();
      } else if (sec.id === "contact") {
        toggleContactSection();
      }
    });
    btn.addEventListener("mouseenter", () => {
      const gazeMap = {
        about: { y: 0.14, x: 0.04 },
        projects: { y: -0.24, x: 0.05 },
        skills: { y: 0.0, x: -0.06 },
        experience: { y: 0.18, x: 0.0 },
        contact: { y: -0.14, x: 0.08 }
      };
      const g = gazeMap[sec.id] || { y: 0, x: 0 };
      gsap.to(cardHoverGazeOffset, { y: g.y, x: g.x, duration: 0.35, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(cardHoverGazeOffset, { y: 0, x: 0, duration: 0.45, ease: "power2.out" });
    });
    nav.appendChild(btn);
  });
}

export function buildSectionTabs() {
  const tabsCtr = document.getElementById("section-tabs");
  if (!tabsCtr || !DATA.sections) return;
  tabsCtr.innerHTML = "";
  DATA.sections.forEach(sec => {
    const btn = document.createElement("button");
    btn.className = "tab";
    btn.setAttribute("data-section", sec.id);
    btn.id = `tab-${sec.id}`;
    btn.textContent = `> ${sec.label.toUpperCase()}`;
    btn.addEventListener("click", () => {
      setTab(sec.id);
      renderSection(sec.id);
      setPillActive(sec.id);
    });
    tabsCtr.appendChild(btn);
  });
}

// ============================================
// FLOATING SOCIAL ICONS — auto-generated from DATA
// ============================================
export function buildFloatingSocials() {
  const ctr = document.getElementById("floating-socials");
  if (!ctr || !DATA.contact || !DATA.contact.links) return;
  ctr.innerHTML = "";
  DATA.contact.links.forEach((lk) => {
    if (lk.type === "resume") {
      // Resume button — opens an inline PDF viewer overlay
      const btn = document.createElement("button");
      btn.className = "social-float-btn social-float-resume";
      btn.setAttribute("data-label", lk.label || "Resume");
      btn.setAttribute("aria-label", lk.label || "Resume");
      btn.innerHTML = lk.icon;
      btn.addEventListener("click", () => openResumePdfViewer(lk.href));
      btn.addEventListener("mouseenter", () => {
        gsap.to(cardHoverGazeOffset, { y: 0.18, x: 0.06, duration: 0.3 });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(cardHoverGazeOffset, { y: 0, x: 0, duration: 0.4 });
      });
      ctr.appendChild(btn);
    } else {
      const a = document.createElement("a");
      a.className = "social-float-btn";
      a.href = lk.href;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("data-label", lk.label);
      a.setAttribute("aria-label", lk.label);
      a.innerHTML = lk.icon;
      a.addEventListener("mouseenter", () => {
        gsap.to(cardHoverGazeOffset, { y: 0.18, x: 0.06, duration: 0.3 });
      });
      a.addEventListener("mouseleave", () => {
        gsap.to(cardHoverGazeOffset, { y: 0, x: 0, duration: 0.4 });
      });
      ctr.appendChild(a);
    }
  });
}

// ============================================
// RESUME PDF VIEWER OVERLAY
// ============================================
export function openResumePdfViewer(pdfUrl) {
  const existing = document.getElementById("resume-viewer-overlay");
  if (existing) {
    existing.classList.add("active");
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "resume-viewer-overlay";
  overlay.className = "resume-viewer-overlay";
  overlay.innerHTML = `
    <div class="resume-viewer-modal">
      <div class="resume-viewer-header">
        <div class="resume-viewer-title">
          <span class="resume-viewer-icon">📄</span>
          <span>Arpit Kumar — Resume / CV</span>
        </div>
        <div class="resume-viewer-actions">
          <a class="resume-dl-btn" href="${pdfUrl}" download="Arpit_Kumar_Resume.pdf" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zm-14 9v2h14v-2H5z"/></svg>
            Download PDF
          </a>
          <button class="resume-close-btn" id="resume-viewer-close" aria-label="Close resume viewer">✕</button>
        </div>
      </div>
      <div class="resume-viewer-body">
        <iframe src="${pdfUrl}" class="resume-iframe" title="Resume PDF" allow="fullscreen"></iframe>
        <div class="resume-fallback">
          <p>Can't display the PDF inline?</p>
          <a href="${pdfUrl}" target="_blank" rel="noopener" class="resume-dl-btn">Open in new tab ↗</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("active"));

  overlay.querySelector("#resume-viewer-close").addEventListener("click", () => {
    overlay.classList.remove("active");
    setTimeout(() => overlay.remove(), 320);
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      setTimeout(() => overlay.remove(), 320);
    }
  });
  document.addEventListener("keydown", function escHandler(e) {
    if (e.key === "Escape") {
      overlay.classList.remove("active");
      setTimeout(() => overlay.remove(), 320);
      document.removeEventListener("keydown", escHandler);
    }
  });
}

// ============================================
// AMBIENT TEXTS & IDENTITY
// ============================================
export function updateAmbientTexts() {
  if (!DATA.ambientTexts) return;
  DATA.ambientTexts.forEach((at) => {
    const el = document.querySelector(`.${at.id}`);
    if (el) el.textContent = at.text;
  });
}

export function updateIdentity() {
  if (DATA.name) {
    const dn = document.getElementById("display-name");
    if (dn) dn.textContent = DATA.name;
  }
  if (DATA.pageTitle) {
    document.title = DATA.pageTitle;
  }
  if (DATA.nameTitleSrc) {
    const nt = document.getElementById("name-title");
    if (nt && nt.getAttribute("src") !== DATA.nameTitleSrc) {
      nt.src = DATA.nameTitleSrc;
    }
  }
}

const pContainer = document.getElementById("particle-container");
const SPARKS = ["✦", "★", "✧", "·", "✸", "✶"];
const SCOLS = ["#E8198B", "#2EC4B6", "#FFB830", "#F0EBF4"];

export function spawnSparks(x, y) {
  if (!pContainer) return;
  for (let i = 0; i < 7; i++) {
    const el = document.createElement("div");
    el.className = "spark";
    el.textContent = SPARKS[Math.floor(Math.random() * SPARKS.length)];
    const angle = (Math.random() * 360) * Math.PI / 180;
    const dist = 30 + Math.random() * 50;
    el.style.cssText = `left:${x}px;top:${y}px;font-size:${.6 + Math.random() * .9}rem;color:${SCOLS[Math.floor(Math.random() * SCOLS.length)]};--dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist}px;`;
    pContainer.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }
}

export function spawnZzz(x, y) {
  if (!pContainer) return;
  const el = document.createElement("div");
  el.className = "zzz-p";
  el.textContent = Math.random() > .5 ? "z" : "zz";
  el.style.cssText = `left:${x}px;top:${y}px;font-size:${.75 + Math.random() * .5}rem;`;
  pContainer.appendChild(el);
  setTimeout(() => el.remove(), 2900);
}

export function spawnPop(x, y) {
  if (!pContainer) return;
  const opts = ["!!", "*!*", "✦!✦", "✸!"];
  const el = document.createElement("div");
  el.className = "click-pop";
  el.textContent = opts[Math.floor(Math.random() * opts.length)];
  el.style.cssText = `left:${x}px;top:${y}px;`;
  pContainer.appendChild(el);
  setTimeout(() => el.remove(), 700);
}

export { setPillActive, clearPillActive, showBentoToast };
