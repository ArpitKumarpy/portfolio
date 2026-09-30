/* ============================================================================
   ARPIT'S PORTFOLIO — sections.js
   Section Reactivity Configurations, 3D Camera Choreography & Stream Controls
   ============================================================================ */

import * as THREE from "three";
import {
  camera,
  controls,
  character,
  charGlow,
  cardHoverGazeOffset,
  charScreenPos,
  baseScale,
  basePosY,
  ambLight,
  mLight,
  tLight,
  rimLight
} from "./scene.js";
import {
  fxSpeeds,
  aboutAura,
  projectsScanner,
  skillsOrbitals,
  experienceConstellation,
  contactBeacon
} from "./holograms.js";
import { POKE_QUOTES, spawnDialoguePop } from "./speech.js";

export let currentSection = "about";
export let isAboutSectionOpen = false;
export let isProjectsSectionOpen = false;
export let isSkillsSectionOpen = false;
export let isExperienceSectionOpen = false;
export let isContactSectionOpen = false;

export let targetBaseRotX = 0;
export let targetBaseRotY = 0;
export let targetBaseRotZ = 0;
export let currentRotX = 0;
export let currentRotY = 0;
export let currentRotZ = 0;
export function setPillActive(section) {
  document.querySelectorAll(".float-pill").forEach(p => p.classList.remove("active"));
  const el = document.querySelector(`.float-pill[data-section="${section}"]`);
  if (el) el.classList.add("active");
}

export function clearPillActive() {
  document.querySelectorAll(".float-pill").forEach(p => p.classList.remove("active"));
}

export const SECTION_CONFIGS = {
  about: {
    // Pose: Direct, warm, curious tilt looking toward user and reading panel
    rotX: -0.04,
    rotY: -0.16,
    rotZ: 0.03,
    charX: -1.95,
    posYOffset: 0.0,
    posZOffset: 0.0,
    floatSpeed: 1.0,
    floatAmp: 0.07,
    gazeFactor: 0.30,
    // Lighting: Visual Novel warm magenta + gold + mint teal
    mLightCol: "#E8198B",
    mLightInt: 2.5,
    tLightCol: "#2EC4B6",
    tLightInt: 1.8,
    rimLightCol: "#FFB830",
    rimLightInt: 2.2,
    ambLightCol: "#ffffff",
    ambLightInt: 0.55,
    glowCol: "#E8198B",
    glowOpacity: 0.06,
    // Camera
    camX: -0.9,
    camY: 0.05,
    camZ: 4.8,
    targetX: -1.2,
    targetY: 0.05,
    mobileCharY: 0.15,
    mobileCamY: -0.85,
    mobileCamZ: 4.8,
    activeFx: "about"
  },
  projects: {
    // Pose: High-tech 3/4 profile, analytical inspection stance looking across at projects
    rotX: 0.08,
    rotY: -0.42,
    rotZ: -0.02,
    charX: -1.95,
    posYOffset: 0.04,
    posZOffset: 0.08,
    floatSpeed: 0.75,
    floatAmp: 0.04,
    gazeFactor: 0.22,
    // Lighting: Cyberpunk cyan matrix + deep neon violet
    mLightCol: "#7928CA",
    mLightInt: 2.8,
    tLightCol: "#00F0FF",
    tLightInt: 3.6,
    rimLightCol: "#00F0FF",
    rimLightInt: 3.0,
    ambLightCol: "#0a192f",
    ambLightInt: 0.45,
    glowCol: "#00F0FF",
    glowOpacity: 0.10,
    // Camera
    camX: -0.95,
    camY: 0.08,
    camZ: 4.7,
    targetX: -1.2,
    targetY: 0.08,
    mobileCharY: 0.18,
    mobileCamY: -0.82,
    mobileCamZ: 4.8,
    activeFx: "projects"
  },
  skills: {
    // Pose: Upright, confident power stance with elevated levitation
    rotX: -0.12,
    rotY: -0.10,
    rotZ: 0.0,
    charX: -1.95,
    posYOffset: 0.18,
    posZOffset: 0.05,
    floatSpeed: 2.0,
    floatAmp: 0.11,
    gazeFactor: 0.24,
    // Lighting: Electric gold + arc teal surge
    mLightCol: "#FFD700",
    mLightInt: 3.6,
    tLightCol: "#2EC4B6",
    tLightInt: 3.0,
    rimLightCol: "#FFAA00",
    rimLightInt: 3.8,
    ambLightCol: "#1c1800",
    ambLightInt: 0.6,
    glowCol: "#FFD700",
    glowOpacity: 0.12,
    // Camera
    camX: -0.9,
    camY: 0.14,
    camZ: 4.8,
    targetX: -1.2,
    targetY: 0.14,
    mobileCharY: 0.22,
    mobileCamY: -0.80,
    mobileCamZ: 4.8,
    activeFx: "skills"
  },
  experience: {
    // Pose: Professional, composed, dignified research posture
    rotX: 0.03,
    rotY: -0.28,
    rotZ: 0.015,
    charX: -1.95,
    posYOffset: -0.02,
    posZOffset: 0.0,
    floatSpeed: 0.85,
    floatAmp: 0.04,
    gazeFactor: 0.22,
    // Lighting: Executive royal indigo + crystalline white + amethyst
    mLightCol: "#4A00E0",
    mLightInt: 2.6,
    tLightCol: "#E0E7FF",
    tLightInt: 2.6,
    rimLightCol: "#8E2DE2",
    rimLightInt: 2.6,
    ambLightCol: "#0e0b24",
    ambLightInt: 0.52,
    glowCol: "#8E2DE2",
    glowOpacity: 0.08,
    // Camera
    camX: -0.9,
    camY: 0.0,
    camZ: 4.8,
    targetX: -1.2,
    targetY: 0.0,
    mobileCharY: 0.15,
    mobileCamY: -0.85,
    mobileCamZ: 4.8,
    activeFx: "experience"
  },
  contact: {
    // Pose: Welcoming lean-in toward user, heightened gaze reactivity
    rotX: 0.12,
    rotY: -0.12,
    rotZ: -0.01,
    charX: -1.9,
    posYOffset: -0.04,
    posZOffset: 0.32,
    floatSpeed: 1.5,
    floatAmp: 0.07,
    gazeFactor: 0.42,
    // Lighting: Signal neon beacon (hot pink & signal emerald)
    mLightCol: "#FF2A85",
    mLightInt: 3.2,
    tLightCol: "#00F5D4",
    tLightInt: 3.0,
    rimLightCol: "#00F5D4",
    rimLightInt: 2.8,
    ambLightCol: "#120020",
    ambLightInt: 0.55,
    glowCol: "#FF2A85",
    glowOpacity: 0.10,
    // Camera
    camX: -0.85,
    camY: 0.04,
    camZ: 4.5,
    targetX: -1.15,
    targetY: 0.04,
    mobileCharY: 0.16,
    mobileCamY: -0.84,
    mobileCamZ: 4.7,
    activeFx: "contact"
  }
};

export function applySectionReaction(sectionId, isTransition = true) {
  currentSection = sectionId;
  const cfg = SECTION_CONFIGS[sectionId] || SECTION_CONFIGS.about;
  const isMobile = window.innerWidth <= 820;

  targetBaseRotX = cfg.rotX;
  targetBaseRotY = cfg.rotY;
  targetBaseRotZ = cfg.rotZ;

  // Keep the 3D model and camera centered in the hero viewport
  const defCamZ = isMobile ? Math.max(5.5, 5 / Math.min(1, window.innerWidth / 500)) : 5;
  gsap.to(camera.position, {
    x: 0,
    y: 0,
    z: defCamZ,
    duration: 0.7,
    ease: "expo.out"
  });
  gsap.to(controls.target, {
    x: 0,
    y: 0,
    z: 0,
    duration: 0.7,
    ease: "expo.out"
  });
  if (character) {
    const isStreamOpen = isAboutSectionOpen || isProjectsSectionOpen || isSkillsSectionOpen || isExperienceSectionOpen || isContactSectionOpen || ["about", "projects", "skills", "experience", "contact"].includes(sectionId);
    const targetX = (isStreamOpen && !isMobile) ? (cfg.charX || -1.95) : 0;
    gsap.to(character.position, {
      x: targetX,
      z: cfg.posZOffset || 0,
      duration: 0.7,
      ease: "expo.out"
    });
  }

  // Morph dynamic lighting smoothly with GSAP
  const dur = isTransition ? 0.65 : 0.01;
  gsap.to(mLight.color, {
    r: new THREE.Color(cfg.mLightCol).r,
    g: new THREE.Color(cfg.mLightCol).g,
    b: new THREE.Color(cfg.mLightCol).b,
    duration: dur,
    ease: "power2.out"
  });
  gsap.to(mLight, { intensity: cfg.mLightInt, duration: dur, ease: "power2.out" });

  gsap.to(tLight.color, {
    r: new THREE.Color(cfg.tLightCol).r,
    g: new THREE.Color(cfg.tLightCol).g,
    b: new THREE.Color(cfg.tLightCol).b,
    duration: dur,
    ease: "power2.out"
  });
  gsap.to(tLight, { intensity: cfg.tLightInt, duration: dur, ease: "power2.out" });

  gsap.to(rimLight.color, {
    r: new THREE.Color(cfg.rimLightCol).r,
    g: new THREE.Color(cfg.rimLightCol).g,
    b: new THREE.Color(cfg.rimLightCol).b,
    duration: dur,
    ease: "power2.out"
  });
  gsap.to(rimLight, { intensity: cfg.rimLightInt, duration: dur, ease: "power2.out" });

  gsap.to(ambLight.color, {
    r: new THREE.Color(cfg.ambLightCol).r,
    g: new THREE.Color(cfg.ambLightCol).g,
    b: new THREE.Color(cfg.ambLightCol).b,
    duration: dur,
    ease: "power2.out"
  });
  gsap.to(ambLight, { intensity: cfg.ambLightInt, duration: dur, ease: "power2.out" });

  if (charGlow) {
    gsap.to(charGlow.material.color, {
      r: new THREE.Color(cfg.glowCol).r,
      g: new THREE.Color(cfg.glowCol).g,
      b: new THREE.Color(cfg.glowCol).b,
      duration: dur
    });
    gsap.to(charGlow.material, { opacity: cfg.glowOpacity, duration: dur });
  }

  // Toggle active 3D FX (Aura, Scanner, Orbitals, Constellation, Beacon)
  [aboutAura, projectsScanner, skillsOrbitals, experienceConstellation, contactBeacon].forEach(fx => {
    if (fx) {
      if (fx.name === cfg.activeFx + "FX") {
        fx.visible = true;
        gsap.killTweensOf(fx.scale);
        gsap.fromTo(fx.scale, { x: 0.15, y: 0.15, z: 0.15 }, { x: 1, y: 1, z: 1, duration: 0.55, ease: "back.out(1.5)" });
      } else {
        fx.visible = false;
      }
    }
  });

  // Quick reactive micro-bounce or nod on character
  if (character && isTransition) {
    gsap.killTweensOf(character.scale);
    gsap.fromTo(character.scale,
      { x: baseScale * 1.07, y: baseScale * 0.93, z: baseScale * 1.07 },
      { x: baseScale, y: baseScale, z: baseScale, duration: 0.5, ease: "elastic.out(1.15, 0.4)" }
    );
  }

  // Playful thematic speech bubble
  const quotes = POKE_QUOTES[sectionId];
  if (quotes && quotes.length) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const sp = charScreenPos();
    spawnDialoguePop(sp.x + (isMobile ? 0 : 35), sp.y - 45, quote);
  }
}

export function restoreDefaultCharacterState() {
  currentSection = "idle";
  targetBaseRotX = 0;
  targetBaseRotY = 0;
  targetBaseRotZ = 0;
  cardHoverGazeOffset.x = 0;
  cardHoverGazeOffset.y = 0;
  cardHoverGazeOffset.z = 0;
  fxSpeeds.scannerSpeedMult = 1.0; fxSpeeds.orbitalsSpeedMult = 1.0; fxSpeeds.constellationSpeedMult = 1.0; fxSpeeds.beaconPulseMult = 1.0;

  clearPillActive();

  // Restore default lighting
  gsap.to(mLight.color, { r: new THREE.Color("#E8198B").r, g: new THREE.Color("#E8198B").g, b: new THREE.Color("#E8198B").b, duration: 0.6 });
  gsap.to(mLight, { intensity: 2.2, duration: 0.6 });
  gsap.to(tLight.color, { r: new THREE.Color("#2EC4B6").r, g: new THREE.Color("#2EC4B6").g, b: new THREE.Color("#2EC4B6").b, duration: 0.6 });
  gsap.to(tLight, { intensity: 1.6, duration: 0.6 });
  gsap.to(rimLight.color, { r: new THREE.Color("#FFB830").r, g: new THREE.Color("#FFB830").g, b: new THREE.Color("#FFB830").b, duration: 0.6 });
  gsap.to(rimLight, { intensity: 1.8, duration: 0.6 });
  gsap.to(ambLight.color, { r: 1, g: 1, b: 1, duration: 0.6 });
  gsap.to(ambLight, { intensity: 0.55, duration: 0.6 });

  if (charGlow) {
    gsap.to(charGlow.material.color, { r: new THREE.Color("#E8198B").r, g: new THREE.Color("#E8198B").g, b: new THREE.Color("#E8198B").b, duration: 0.6 });
    gsap.to(charGlow.material, { opacity: 0.04, duration: 0.6 });
  }

  // Hide all section FX
  [aboutAura, projectsScanner, skillsOrbitals, experienceConstellation, contactBeacon].forEach(fx => {
    if (fx) fx.visible = false;
  });

  if (character) {
    gsap.to(character.position, { x: 0, z: 0, duration: 0.6, ease: "expo.out" });
  }

  closeAllSectionStreams();
}


// ============================================
export function closeAllSectionStreams() {
  isAboutSectionOpen = false;
  isProjectsSectionOpen = false;
  isSkillsSectionOpen = false;
  isExperienceSectionOpen = false;
  isContactSectionOpen = false;

  document.body.classList.remove("about-open", "projects-open", "skills-open", "experience-open", "contact-open");

  const ac = document.getElementById("about-section-container");
  if (ac) ac.classList.remove("active");
  const pc = document.getElementById("projects-section-container");
  if (pc) pc.classList.remove("active");
  const sc = document.getElementById("skills-section-container");
  if (sc) sc.classList.remove("active");
  const ec = document.getElementById("experience-section-container");
  if (ec) ec.classList.remove("active");
  const cc = document.getElementById("contact-section-container");
  if (cc) cc.classList.remove("active");
}

let toastTimer = null;
export function showBentoToast(msg) {
  const toast = document.getElementById("bento-toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// --- About Section ---
export function openAboutSection() {
  closeAllSectionStreams();
  isAboutSectionOpen = true;
  document.body.classList.add("about-open");
  const container = document.getElementById("about-section-container");
  if (container) container.classList.add("active");
  applySectionReaction("about", true);
  setPillActive("about");
}

export function closeAboutSection() {
  closeAllSectionStreams();
  restoreDefaultCharacterState();
  clearPillActive();
}

export function toggleAboutSection() {
  if (isAboutSectionOpen) {
    closeAboutSection();
  } else {
    openAboutSection();
  }
}

// --- Projects Section ---
export function openProjectsSection() {
  closeAllSectionStreams();
  isProjectsSectionOpen = true;
  document.body.classList.add("projects-open");
  const pc = document.getElementById("projects-section-container");
  if (pc) pc.classList.add("active");
  applySectionReaction("projects", true);
  setPillActive("projects");
}

export function closeProjectsSection() {
  closeAllSectionStreams();
  restoreDefaultCharacterState();
  clearPillActive();
}

export function toggleProjectsSection() {
  if (isProjectsSectionOpen) {
    closeProjectsSection();
  } else {
    openProjectsSection();
  }
}

// --- Skills Section ---
export function openSkillsSection() {
  closeAllSectionStreams();
  isSkillsSectionOpen = true;
  document.body.classList.add("skills-open");
  const sc = document.getElementById("skills-section-container");
  if (sc) sc.classList.add("active");
  applySectionReaction("skills", true);
  setPillActive("skills");

  // Animate skill progress bars
  setTimeout(() => {
    document.querySelectorAll(".skill-fill").forEach(b => {
      const lv = b.getAttribute("data-level");
      if (lv) b.style.width = lv + "%";
    });
  }, 100);
}

export function closeSkillsSection() {
  closeAllSectionStreams();
  restoreDefaultCharacterState();
  clearPillActive();
}

export function toggleSkillsSection() {
  if (isSkillsSectionOpen) {
    closeSkillsSection();
  } else {
    openSkillsSection();
  }
}

// --- Experience Section ---
export function openExperienceSection() {
  closeAllSectionStreams();
  isExperienceSectionOpen = true;
  document.body.classList.add("experience-open");
  const ec = document.getElementById("experience-section-container");
  if (ec) ec.classList.add("active");
  applySectionReaction("experience", true);
  setPillActive("experience");
}

export function closeExperienceSection() {
  closeAllSectionStreams();
  restoreDefaultCharacterState();
  clearPillActive();
}

export function toggleExperienceSection() {
  if (isExperienceSectionOpen) {
    closeExperienceSection();
  } else {
    openExperienceSection();
  }
}

// --- Contact Section ---
export function openContactSection() {
  closeAllSectionStreams();
  isContactSectionOpen = true;
  document.body.classList.add("contact-open");
  const cc = document.getElementById("contact-section-container");
  if (cc) cc.classList.add("active");
  applySectionReaction("contact", true);
  setPillActive("contact");
}

export function closeContactSection() {
  closeAllSectionStreams();
  restoreDefaultCharacterState();
  clearPillActive();
}

export function toggleContactSection() {
  if (isContactSectionOpen) {
    closeContactSection();
  } else {
    openContactSection();
  }
}
