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
export async function openResumePdfViewer(pdfUrl) {
  // Remove any lingering overlay first
  const existing = document.getElementById("resume-viewer-overlay");
  if (existing) existing.remove();

  // Check if the PDF actually exists
  let pdfExists = false;
  try {
    const res = await fetch(pdfUrl, { method: "HEAD" });
    pdfExists = res.ok;
  } catch (_) {
    pdfExists = false;
  }

  const overlay = document.createElement("div");
  overlay.id = "resume-viewer-overlay";
  overlay.className = "resume-viewer-overlay";

  if (pdfExists) {
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
        </div>
      </div>
    `;
  } else {
    // Resume not uploaded yet — show a polished "updating" state
    overlay.innerHTML = `
      <div class="resume-viewer-modal resume-modal-updating">
        <div class="resume-viewer-header">
          <div class="resume-viewer-title">
            <span class="resume-viewer-icon">📄</span>
            <span>Arpit Kumar — Resume / CV</span>
          </div>
          <div class="resume-viewer-actions">
            <button class="resume-close-btn" id="resume-viewer-close" aria-label="Close resume viewer">✕</button>
          </div>
        </div>
        <div class="resume-updating-body">
          <div class="resume-updating-icon">
            <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
          </div>
          <h3 class="resume-updating-title">Resume is Currently Updating</h3>
          <p class="resume-updating-sub">A fresh version is being prepared. Check back shortly — it'll be worth the wait.</p>
          <div class="resume-updating-dots">
            <span></span><span></span><span></span>
          </div>
          <div class="resume-updating-links">
            <a href="https://www.linkedin.com/in/arpitkumar-105309262" target="_blank" rel="noopener" class="resume-dl-btn">
              View LinkedIn Profile ↗
            </a>
            <a href="https://github.com/ArpitKumarpy" target="_blank" rel="noopener" class="resume-dl-btn resume-dl-btn-ghost">
              GitHub Portfolio ↗
            </a>
          </div>
        </div>
      </div>
    `;
  }

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
