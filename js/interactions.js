/* ============================================================================
   ARPIT'S PORTFOLIO — interactions.js
   Card Reactions, Model Poke, Dialogue Popups, Pointer & Canvas Interactions
   ============================================================================ */

import * as THREE from "three";
import {
  character,
  rawModel,
  baseScale,
  camera,
  renderer,
  mouse,
  ray,
  cardHoverGazeOffset,
  mLight,
  tLight,
  rimLight,
  charScreenPos,
  hovering,
  setHovering,
  mouseDownPos,
  isDragging,
  setIsDragging,
  DRAG_THRESHOLD,
  W,
  H
} from "./scene.js";
import {
  fxSpeeds,
  aboutAura,
  projectsScanner,
  skillsOrbitals,
  experienceConstellation
} from "./holograms.js";
import { POKE_QUOTES, spawnDialoguePop } from "./speech.js";
import { DATA } from "./data.js";
import { WEB3FORMS_ACCESS_KEY } from "./config.js";
import {
  currentSection,
  SECTION_CONFIGS,
  isAboutSectionOpen,
  isProjectsSectionOpen,
  isSkillsSectionOpen,
  isExperienceSectionOpen,
  isContactSectionOpen,
  openAboutSection,
  closeAboutSection,
  openProjectsSection,
  closeProjectsSection,
  openSkillsSection,
  closeSkillsSection,
  openExperienceSection,
  closeExperienceSection,
  openContactSection,
  closeContactSection,
  restoreDefaultCharacterState,
  showBentoToast
} from "./sections.js";

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

export function setupProjectsStreamInteractions() {
  const closeBtn = document.getElementById("projects-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeProjectsSection();
    });
  }

  // Distinct GitHub buttons: stop propagation so row click does not fire
  const ghButtons = document.querySelectorAll(".project-btn-gh");
  ghButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const rect = btn.getBoundingClientRect();
      spawnSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);
      showBentoToast("🐙 Opening GitHub repository...");
    });
  });

  // Dedicated explore buttons: trigger row navigation without double firing
  const exploreButtons = document.querySelectorAll(".project-btn-explore");
  exploreButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const row = btn.closest(".project-stream-row");
      if (row) {
        handleProjectRowClick(row);
      }
    });
  });

  // Full row click handlers
  const rows = document.querySelectorAll(".project-stream-row");
  rows.forEach((row) => {
    row.addEventListener("click", () => {
      handleProjectRowClick(row);
    });

    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleProjectRowClick(row);
      }
    });
  });

  function handleProjectRowClick(row) {
    const rowId = row.id;
    const isLive = row.dataset.isLive === "true";
    const targetUrl = row.dataset.targetUrl || row.dataset.link || (isLive ? row.dataset.deployedUrl : row.dataset.githubUrl) || "#";
    const rect = row.getBoundingClientRect();
    spawnSparks(rect.left + rect.width / 2, rect.top + 30);

    if (rowId === "proj-row-vidvision") {
      if (isLive) {
        showBentoToast("🌐 Opening VidVision3D Live Application...");
      } else {
        showBentoToast("🚀 VidVision3D: Markerless 3D Motion Capture — Opening repository...");
      }
      if (projectsScanner) {
        projectsScanner.visible = true;
        fxSpeeds.scannerSpeedMult = 3.2;
        setTimeout(() => { fxSpeeds.scannerSpeedMult = 1.0; }, 1400);
      }
      gsap.to(tLight, { intensity: 4.4, duration: 0.3, yoyo: true, repeat: 1 });
    } else if (rowId === "proj-row-synapse") {
      if (isLive) {
        showBentoToast("🌐 Opening Synapse Live Application...");
      } else {
        showBentoToast("🧠 Synapse: Assistive Reading System (IEEE Xplore Scopus 2026)");
      }
      if (experienceConstellation) {
        experienceConstellation.visible = true;
        gsap.fromTo(experienceConstellation.scale, { x: 0.2, y: 0.2, z: 0.2 }, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.5)" });
      }
      gsap.to(mLight, { intensity: 3.8, duration: 0.3, yoyo: true, repeat: 1 });
    } else if (rowId === "proj-row-skybook") {
      if (isLive) {
        showBentoToast("🌐 Opening SkyBook Flights Live Application...");
      } else {
        showBentoToast("✈️ SkyBook Flights: Airline Booking Platform — Opening repository...");
      }
      gsap.to(tLight, { intensity: 4.2, duration: 0.3, yoyo: true, repeat: 1 });
    } else if (rowId === "proj-row-emotion") {
      if (isLive) {
        showBentoToast("🌐 Opening Emotion AI Live Application...");
      } else {
        showBentoToast("🎭 Multimodal Emotion Recognition: Deep Learning CNN on TensorFlow");
      }
      gsap.to(mLight, { intensity: 4.2, duration: 0.3, yoyo: true, repeat: 1 });
    } else if (rowId === "proj-row-vlm") {
      if (isLive) {
        showBentoToast("🌐 Opening Document AI Live Application...");
      } else {
        showBentoToast("📄 AI & Vision-Language Document Intelligence: LayoutLMV3 & RunPod");
      }
      gsap.to(rimLight, { intensity: 4.0, duration: 0.3, yoyo: true, repeat: 1 });
    } else {
      showBentoToast(isLive ? "🌐 Opening live deployment..." : "🚀 Exploring project repository...");
      gsap.to(tLight, { intensity: 3.5, duration: 0.3, yoyo: true, repeat: 1 });
    }

    if (character) {
      gsap.killTweensOf(character.scale);
      gsap.fromTo(character.scale,
        { x: baseScale * 1.06, y: baseScale * 0.94, z: baseScale * 1.06 },
        { x: baseScale, y: baseScale, z: baseScale, duration: 0.45, ease: "elastic.out(1.15, 0.4)" }
      );
    }

    if (targetUrl && targetUrl !== "#") {
      setTimeout(() => {
        window.open(targetUrl, "_blank");
      }, 350);
    }
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("projects-open")) {
      closeProjectsSection();
    }
  });
}

export function setupAboutBentoInteractions() {
  const closeBtn = document.getElementById("about-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAboutSection();
    });
  }

  // Card 1: Education
  const eduCard = document.getElementById("bento-card-education");
  if (eduCard) {
    eduCard.addEventListener("click", () => {
      const rect = eduCard.getBoundingClientRect();
      spawnSparks(rect.left + rect.width / 2, rect.top + 30);
      showBentoToast("🎓 Education: B.Tech CSE (AIML) & Online BS Data Science IIT Madras. Dedicated page coming soon!");
      if (character) {
        gsap.killTweensOf(character.scale);
        gsap.fromTo(character.scale,
          { x: baseScale * 1.05, y: baseScale * 0.95, z: baseScale * 1.05 },
          { x: baseScale, y: baseScale, z: baseScale, duration: 0.45, ease: "elastic.out(1.1, 0.4)" }
        );
      }
    });
  }

  // Card 2: Experience / Interests
  const expCard = document.getElementById("bento-card-experience");
  if (expCard) {
    expCard.addEventListener("click", () => {
      const rect = expCard.getBoundingClientRect();
      spawnSparks(rect.left + rect.width / 2, rect.top + 30);
      showBentoToast("💼 Navigating to Work Experience & Research timeline...");
      openExperienceSection();
    });
  }

  // Card 3: Achievements
  const achieveCard = document.getElementById("bento-card-achievements");
  if (achieveCard) {
    achieveCard.addEventListener("click", () => {
      const rect = achieveCard.getBoundingClientRect();
      spawnPop(rect.left + rect.width / 2, rect.top + 30);
      spawnSparks(rect.left + rect.width / 2, rect.top + 30);
      showBentoToast("🏆 Achievements: Patent App 202211074491 & Scopus IEEE Xplore NMIC 2026");
      if (character) {
        gsap.killTweensOf(character.scale);
        gsap.fromTo(character.scale,
          { x: baseScale * 1.08, y: baseScale * 0.92, z: baseScale * 1.08 },
          { x: baseScale, y: baseScale, z: baseScale, duration: 0.5, ease: "elastic.out(1.2, 0.38)" }
        );
      }
    });
  }

  // Card 4: Latest Ongoing Project (SkyBook)
  const projectCard = document.getElementById("bento-card-creative");
  if (projectCard) {
    projectCard.addEventListener("click", (e) => {
      const isLinkClick = e.target.closest("a");
      const dest = projectCard.dataset.link || (DATA.about && DATA.about.bentoCards && DATA.about.bentoCards[3] && DATA.about.bentoCards[3].link) || "https://skybook-flights.onrender.com";
      const rect = projectCard.getBoundingClientRect();
      spawnSparks(rect.left + rect.width / 2, rect.top + 30);
      showBentoToast("✈️ SkyBook Flights: Airline Booking & Fleet Platform — Opening live app...");
      if (projectsScanner) {
        projectsScanner.visible = true;
        gsap.killTweensOf(projectsScanner.scale);
        gsap.fromTo(projectsScanner.scale, { x: 0.2, y: 0.2, z: 0.2 }, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.5)" });
      }
      gsap.to(tLight, { intensity: 4.2, duration: 0.35, yoyo: true, repeat: 1 });
      if (character) {
        gsap.killTweensOf(character.scale);
        gsap.fromTo(character.scale,
          { x: baseScale * 1.06, y: baseScale * 0.94, z: baseScale * 1.06 },
          { x: baseScale, y: baseScale, z: baseScale, duration: 0.45, ease: "elastic.out(1.15, 0.4)" }
        );
      }
      if (!isLinkClick) {
        setTimeout(() => {
          window.open(dest, "_blank");
        }, 450);
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("about-open")) {
      closeAboutSection();
    }
  });
}

// ============================================
// SKILLS STREAM SECTION INTERACTIONS
// ============================================
export function setupSkillsStreamInteractions() {
  const closeBtn = document.getElementById("skills-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeSkillsSection();
    });
  }

  // Interactive Category Cards in Skills
  const cats = [
    { id: "skill-cat-cv", toast: "👁 Computer Vision: OpenCV, MediaPipe, BlazePose 3D & CVAT", speed: 3.5 },
    { id: "skill-cat-ml", toast: "⚡ Deep Learning: PyTorch, TensorFlow, XGBoost & LayoutLMV3", speed: 3.2 },
    { id: "skill-cat-fullstack", toast: "🌐 3D & Cloud: Three.js, React, Unity 3D & RunPod CUDA", speed: 3.0 }
  ];

  cats.forEach(c => {
    const el = document.getElementById(c.id);
    if (el) {
      el.addEventListener("click", () => {
        const rect = el.getBoundingClientRect();
        spawnSparks(rect.left + rect.width / 2, rect.top + 30);
        showBentoToast(c.toast);
        fxSpeeds.orbitalsSpeedMult = c.speed;
        setTimeout(() => { fxSpeeds.orbitalsSpeedMult = 1.0; }, 1400);
        gsap.to(rimLight, { intensity: 4.8, duration: 0.3, yoyo: true, repeat: 1 });
        if (character) {
          gsap.killTweensOf(character.scale);
          gsap.fromTo(character.scale,
            { x: baseScale * 1.06, y: baseScale * 0.94, z: baseScale * 1.06 },
            { x: baseScale, y: baseScale, z: baseScale, duration: 0.45, ease: "elastic.out(1.2, 0.4)" }
          );
        }
      });
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("skills-open")) {
      closeSkillsSection();
    }
  });
}

// ============================================
// EXPERIENCE STREAM SECTION INTERACTIONS
// ============================================
export function setupExperienceStreamInteractions() {
  const closeBtn = document.getElementById("experience-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeExperienceSection();
    });
  }

  const items = [
    { id: "exp-card-botter", toast: "💼 Botter Solutions: LayoutLMV3, QWEN3, vLLM & Cloud GPU on RunPod.io" },
    { id: "exp-card-draftine", toast: "🏢 DrafTineAI: Complex CVAT Annotation, Detectron2 & YOLOv8x" },
    { id: "exp-card-ieee", toast: "📜 Synapse Research: IEEE NMIC 2026 Scopus (0.9989 AUC Gaze Model)" },
    { id: "exp-card-patent", toast: "💡 Patent 202211074491: A Virtual Body Augmented with AI Assistant" },
    { id: "exp-card-honors", toast: "🎓 IMS Engineering College & IIT Madras Online BS Data Science, SIH Finalist" }
  ];

  items.forEach(it => {
    const el = document.getElementById(it.id);
    if (el) {
      el.addEventListener("click", () => {
        const rect = el.getBoundingClientRect();
        spawnSparks(rect.left + rect.width / 2, rect.top + 30);
        showBentoToast(it.toast);
        fxSpeeds.constellationSpeedMult = 3.0;
        setTimeout(() => { fxSpeeds.constellationSpeedMult = 1.0; }, 1400);
        gsap.to(mLight, { intensity: 4.2, duration: 0.35, yoyo: true, repeat: 1 });
        if (experienceConstellation) {
          experienceConstellation.visible = true;
          gsap.fromTo(experienceConstellation.scale, { x: 0.7, y: 0.7, z: 0.7 }, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.5)" });
        }
      });
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("experience-open")) {
      closeExperienceSection();
    }
  });
}

// ============================================
// CONTACT STREAM SECTION INTERACTIONS
// ============================================
export function setupContactStreamInteractions() {
  const closeBtn = document.getElementById("contact-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeContactSection();
    });
  }

  const links = [
    { id: "contact-link-email", toast: "✉ Opening mailto: arpitkumar.py@gmail.com..." },
    { id: "contact-link-linkedin", toast: "🔗 Opening LinkedIn: arpitkumar-105309262..." },
    { id: "contact-link-github", toast: "💻 Opening GitHub: ArpitKumarpy..." },
    { id: "contact-link-phone", toast: "📞 Calling +91 9871501023..." }
  ];

  links.forEach(l => {
    const el = document.getElementById(l.id);
    if (el) {
      el.addEventListener("click", () => {
        const rect = el.getBoundingClientRect();
        spawnSparks(rect.left + rect.width / 2, rect.top + 30);
        showBentoToast(l.toast);
        fxSpeeds.beaconPulseMult = 3.5;
        setTimeout(() => { fxSpeeds.beaconPulseMult = 1.0; }, 1400);
        gsap.to(mLight, { intensity: 4.4, duration: 0.3, yoyo: true, repeat: 1 });
        gsap.to(tLight, { intensity: 4.2, duration: 0.3, yoyo: true, repeat: 1 });
      });
    }
  });

  // Direct Connect Transmission Form
  const form = document.getElementById("contact-direct-form");
  const submitBtn = document.getElementById("contact-form-submit-btn");
  const statusMsg = document.getElementById("contact-form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("contact-input-name");
      const emailInput = document.getElementById("contact-input-email");
      const subjectInput = document.getElementById("contact-input-subject");
      const msgInput = document.getElementById("contact-input-message");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const subject = subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : `New Message from ${name}`;
      const message = msgInput ? msgInput.value.trim() : "";

      if (!name || !email || !message) {
        if (statusMsg) {
          statusMsg.className = "form-status-msg warning";
          statusMsg.textContent = "⚠ Please fill out all required fields.";
        }
        return;
      }

      // UI pending state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <div class="submit-spinner"></div>
          <span class="submit-btn-text">Transmitting...</span>
        `;
      }
      if (statusMsg) {
        statusMsg.className = "form-status-msg pending";
        statusMsg.textContent = "Sending direct to Arpit's inbox...";
      }

      // 3D visual FX feedback
      fxSpeeds.beaconPulseMult = 4.0;
      gsap.to(tLight, { intensity: 4.8, duration: 0.35, yoyo: true, repeat: 1 });

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: name,
            email: email,
            subject: `[Portfolio Connect] ${subject}`,
            message: message,
            from_name: name || "Portfolio Connect Visitor"
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && (data.success === true || data.success === "true")) {
          if (statusMsg) {
            statusMsg.className = "form-status-msg success";
            statusMsg.textContent = "✓ Message sent successfully! Delivered straight to Arpit's inbox.";
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
              <span class="submit-btn-text">Sent! Send Another</span>
              <span class="submit-btn-icon">✓</span>
            `;
          }
          form.reset();

          if (submitBtn) {
            const rect = submitBtn.getBoundingClientRect();
            spawnSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
          showBentoToast("⚡ Direct message transmitted! Thanks for connecting.");
          gsap.to(mLight, { intensity: 4.5, duration: 0.4, yoyo: true, repeat: 2 });
          setTimeout(() => { fxSpeeds.beaconPulseMult = 1.0; }, 2000);
        } else {
          throw new Error(data.message || "Failed to transmit message via Web3Forms");
        }
      } catch (err) {
        console.warn("Web3Forms submit error, offering instant mailto fallback:", err);
        const mailtoUrl = `mailto:arpitkumar.py@gmail.com?subject=${encodeURIComponent("[Portfolio] " + subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
        
        if (statusMsg) {
          statusMsg.className = "form-status-msg warning";
          statusMsg.innerHTML = `Transmission issue: ${err.message || "Unable to send"}. <a class="form-fallback-link" href="${mailtoUrl}">Click here to send directly via mail client</a>`;
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span class="submit-btn-text">Try Again</span>
            <span class="submit-btn-icon">→</span>
          `;
        }
        setTimeout(() => { fxSpeeds.beaconPulseMult = 1.0; }, 1500);
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("contact-open")) {
      closeContactSection();
    }
  });
}


export function setupAllStreamInteractions() {
  setupAboutBentoInteractions();
  setupProjectsStreamInteractions();
  setupSkillsStreamInteractions();
  setupExperienceStreamInteractions();
  setupContactStreamInteractions();
}

export function attachCardReactions(sec) {
  const content = document.getElementById("section-content");
  if (!content) return;

  if (sec === "projects") {
    content.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(cardHoverGazeOffset, { y: -0.14, x: 0.05, duration: 0.35, ease: "power2.out" });
        fxSpeeds.scannerSpeedMult = 2.6;
        gsap.to(tLight, { intensity: 4.4, duration: 0.25 });
        if (character) {
          gsap.killTweensOf(character.scale);
          gsap.fromTo(character.scale,
            { x: baseScale * 1.035, y: baseScale * 0.965, z: baseScale * 1.035 },
            { x: baseScale, y: baseScale, z: baseScale, duration: 0.4, ease: "power2.out" }
          );
        }
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(cardHoverGazeOffset, { y: 0, x: 0, duration: 0.45, ease: "power2.out" });
        fxSpeeds.scannerSpeedMult = 1.0;
        const cfg = SECTION_CONFIGS.projects;
        gsap.to(tLight, { intensity: cfg.tLightInt, duration: 0.35 });
      });
    });
  } else if (sec === "skills") {
    content.querySelectorAll(".skill-item, .skill-category").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(cardHoverGazeOffset, { y: -0.08, x: -0.05, duration: 0.3, ease: "power2.out" });
        fxSpeeds.orbitalsSpeedMult = 3.0;
        gsap.to(rimLight, { intensity: 4.6, duration: 0.2 });
        if (skillsOrbitals) {
          gsap.to(skillsOrbitals.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 0.3, ease: "back.out(2)" });
        }
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(cardHoverGazeOffset, { y: 0, x: 0, duration: 0.4, ease: "power2.out" });
        fxSpeeds.orbitalsSpeedMult = 1.0;
        const cfg = SECTION_CONFIGS.skills;
        gsap.to(rimLight, { intensity: cfg.rimLightInt, duration: 0.35 });
        if (skillsOrbitals) {
          gsap.to(skillsOrbitals.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.35 });
        }
      });
    });
  } else if (sec === "experience") {
    content.querySelectorAll(".experience-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(cardHoverGazeOffset, { y: -0.12, x: 0.05, duration: 0.35, ease: "power2.out" });
        fxSpeeds.constellationSpeedMult = 2.4;
        gsap.to(mLight, { intensity: 3.5, duration: 0.25 });
        if (experienceConstellation) {
          gsap.to(experienceConstellation.scale, { x: 1.12, y: 1.12, z: 1.12, duration: 0.3 });
        }
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(cardHoverGazeOffset, { y: 0, x: 0, duration: 0.45, ease: "power2.out" });
        fxSpeeds.constellationSpeedMult = 1.0;
        const cfg = SECTION_CONFIGS.experience;
        gsap.to(mLight, { intensity: cfg.mLightInt, duration: 0.35 });
        if (experienceConstellation) {
          gsap.to(experienceConstellation.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.35 });
        }
      });
    });
  } else if (sec === "contact") {
    content.querySelectorAll(".contact-link").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(cardHoverGazeOffset, { y: -0.06, x: 0.08, z: 0.03, duration: 0.3, ease: "power2.out" });
        fxSpeeds.beaconPulseMult = 2.8;
        gsap.to(mLight, { intensity: 4.0, duration: 0.2 });
        gsap.to(tLight, { intensity: 3.8, duration: 0.2 });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(cardHoverGazeOffset, { y: 0, x: 0, z: 0, duration: 0.4, ease: "power2.out" });
        fxSpeeds.beaconPulseMult = 1.0;
        const cfg = SECTION_CONFIGS.contact;
        gsap.to(mLight, { intensity: cfg.mLightInt, duration: 0.3 });
        gsap.to(tLight, { intensity: cfg.tLightInt, duration: 0.3 });
      });
    });
  } else if (sec === "about") {
    content.querySelectorAll(".highlight-card, .about-prompt-line").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cardHoverGazeOffset, { y: -0.07, x: 0.03, z: 0.03, duration: 0.3, ease: "power2.out" });
        if (aboutAura) {
          gsap.to(aboutAura.scale, { x: 1.14, y: 1.14, z: 1.14, duration: 0.3 });
        }
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cardHoverGazeOffset, { y: 0, x: 0, z: 0, duration: 0.4, ease: "power2.out" });
        if (aboutAura) {
          gsap.to(aboutAura.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.35 });
        }
      });
    });
  }
}

export function triggerModelPokeReaction(cx, cy) {
  if (!character) return;

  // Elastic rubber squash & stretch bounce
  gsap.killTweensOf(character.scale);
  gsap.fromTo(character.scale,
    { x: baseScale * 1.12, y: baseScale * 0.88, z: baseScale * 1.12 },
    { x: baseScale, y: baseScale, z: baseScale, duration: 0.65, ease: "elastic.out(1.25, 0.38)" }
  );

  // Playful reactive nod / gaze wobble
  cardHoverGazeOffset.x = (Math.random() - 0.5) * 0.2;
  cardHoverGazeOffset.y = (Math.random() - 0.5) * 0.25;
  gsap.to(cardHoverGazeOffset, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });

  // Lighting specular flash
  const cfg = SECTION_CONFIGS[currentSection] || SECTION_CONFIGS.about;
  gsap.fromTo(rimLight, { intensity: 4.8 }, { intensity: cfg.rimLightInt, duration: 0.45 });

  // Floating comic speech bubble near character screen position
  const quotes = POKE_QUOTES[currentSection] || POKE_QUOTES.about;
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const sp = charScreenPos();
  const posX = cx || (sp.x + (window.innerWidth <= 820 ? 0 : 40));
  const posY = cy || (sp.y - 50);

  spawnDialoguePop(posX, posY, quote);
}

export { POKE_QUOTES, spawnDialoguePop };

export function setupCanvasInteractions() {
  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    if (!character) return;
    ray.setFromCamera(mouse, camera);
    const hits = ray.intersectObject(rawModel || character, true);
    if (hits.length && !hovering) {
      setHovering(true);
      document.body.style.cursor = "pointer";
      spawnSparks(e.clientX, e.clientY);
    } else if (!hits.length && hovering) {
      setHovering(false);
      document.body.style.cursor = "default";
    }
  });

  renderer.domElement.addEventListener("pointerdown", (e) => {
    mouseDownPos.x = e.clientX;
    mouseDownPos.y = e.clientY;
    setIsDragging(false);
  });

  renderer.domElement.addEventListener("pointermove", (e) => {
    const dx = e.clientX - mouseDownPos.x;
    const dy = e.clientY - mouseDownPos.y;
    if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
      setIsDragging(true);
    }
  });

  renderer.domElement.addEventListener("pointerup", (e) => {
    if (isDragging) return;
    if (!character) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    ray.setFromCamera(mouse, camera);
    const hits = ray.intersectObject(rawModel || character, true);
    if (hits.length > 0) {
      triggerModelPokeReaction(e.clientX, e.clientY);
      if (!isAboutSectionOpen) {
        openAboutSection();
      }
    } else {
      if (isAboutSectionOpen || isProjectsSectionOpen || isSkillsSectionOpen || isExperienceSectionOpen || isContactSectionOpen) {
        restoreDefaultCharacterState();
      }
    }
  });

  const nameTitleWrap = document.getElementById("name-title-wrap");
  if (nameTitleWrap) {
    nameTitleWrap.addEventListener("click", (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      triggerModelPokeReaction(rect.left + rect.width / 2, rect.top + rect.height / 2);
      if (!isAboutSectionOpen) {
        openAboutSection();
      }
    });
  }
}
