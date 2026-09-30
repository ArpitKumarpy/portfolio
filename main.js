/* ============================================================================
   ARPIT'S PORTFOLIO — main.js
   Master Application Entry Point & Module Orchestrator
   ============================================================================ */

import * as THREE from "three";
import { DATA, DEFAULT_DATA, updateData } from "./js/data.js";
import {
  scene,
  camera,
  renderer,
  controls,
  character,
  mixer,
  clock,
  mouse,
  cardHoverGazeOffset,
  basePosY,
  mLight,
  tLight,
  charScreenPos,
  handleWindowResize,
  fxGroup,
  onModelLoaded
} from "./js/scene.js";
import { initSectionFX, updateHologramFX } from "./js/holograms.js";
import {
  currentSection,
  SECTION_CONFIGS,
  targetBaseRotX,
  targetBaseRotY,
  targetBaseRotZ,
  currentRotX,
  currentRotY,
  currentRotZ,
  setPillActive,
  applySectionReaction,
  isAboutSectionOpen,
  isProjectsSectionOpen,
  isSkillsSectionOpen,
  isExperienceSectionOpen,
  isContactSectionOpen
} from "./js/sections.js";
import { renderAllStreams, renderSection, setTab } from "./js/renderers.js";
import { setupAllStreamInteractions, setupCanvasInteractions } from "./js/interactions.js";
import { setupConsecutiveSectionNavigation } from "./js/navigation.js";
import {
  buildFloatingNav,
  buildSectionTabs,
  buildFloatingSocials,
  updateAmbientTexts,
  updateIdentity,
  spawnZzz
} from "./js/ui.js";

// Re-export all sub-modules for external consumers & devtools
export * from "./js/data.js";
export * from "./js/scene.js";
export * from "./js/holograms.js";
export * from "./js/sections.js";
export * from "./js/renderers.js";
export * from "./js/navigation.js";
export * from "./js/interactions.js";
export * from "./js/ui.js";
export * from "./js/speech.js";

// Initialize holographic FX objects when 3D character finishes loading
onModelLoaded(() => {
  initSectionFX();
  const anyOpen = isAboutSectionOpen || isProjectsSectionOpen || isSkillsSectionOpen || isExperienceSectionOpen || isContactSectionOpen;
  if (anyOpen) {
    applySectionReaction(currentSection, false);
  }
});

// Rotation state tracking for smooth camera / character gaze lerping
let rotY = currentRotY;
let rotX = currentRotX;
let rotZ = currentRotZ;

// ============================================
// ANIMATION & RENDER LOOP
// ============================================
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const stars = scene.getObjectByName("stars");
  if (stars) { stars.rotation.y = t * 0.008; stars.rotation.x = t * 0.004; }

  const isModeActive = currentSection !== "idle";
  const cfg = SECTION_CONFIGS[currentSection] || SECTION_CONFIGS.about;

  // Subtle lighting breathe in idle
  if (!isModeActive) {
    mLight.intensity = 2.0 + 0.4 * Math.sin(t * 2.1);
    tLight.intensity = 1.4 + 0.3 * Math.sin(t * 1.7 + 1);
  }

  if (character) {
    // 1. Interactive Gaze Tracking: Eyes & Head track cursor/touch
    const gaze = isModeActive ? (cfg.gazeFactor || 0.25) : 0.35;
    const targetY = (isModeActive ? targetBaseRotY : 0) + (mouse.x * gaze) + cardHoverGazeOffset.y;
    const targetX = (isModeActive ? targetBaseRotX : 0) - (mouse.y * (gaze * 0.7)) + cardHoverGazeOffset.x;
    const targetZ = isModeActive ? (targetBaseRotZ + cardHoverGazeOffset.z) : (Math.sin(t * 0.6) * 0.028);

    rotY = THREE.MathUtils.lerp(rotY, targetY, 0.06);
    rotX = THREE.MathUtils.lerp(rotX, targetX, 0.06);
    rotZ = THREE.MathUtils.lerp(rotZ, targetZ, 0.06);

    character.rotation.y = rotY;
    character.rotation.x = rotX;
    character.rotation.z = rotZ;

    // 2. Adaptive Floating Rhythm per section
    const fSpeed = isModeActive ? (cfg.floatSpeed || 1.0) : 1.0;
    const fAmp = isModeActive ? (cfg.floatAmp || 0.08) : 0.10;
    const targetBaseY = basePosY + (isModeActive ? (cfg.posYOffset || 0) : 0);

    character.position.y = targetBaseY + Math.sin(t * fSpeed) * fAmp;
  }

  // 4. Animate Active 3D Section Holographic FX
  updateHologramFX(t);

  if (Math.random() < 0.003 && character && !isModeActive) {
    const sp = charScreenPos();
    spawnZzz(sp.x + 30 + Math.random() * 25, sp.y - 30 - Math.random() * 20);
  }

  if (mixer) mixer.update(clock.getDelta() * 0.5);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// ============================================
// GLOBAL EVENT LISTENERS & RESIZE
// ============================================
window.addEventListener("resize", handleWindowResize);

// Touch detection — adapt hint text
if (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window) {
  const hintText = document.querySelector(".hint-text");
  if (hintText) hintText.textContent = "drag to rotate ✦ tap to poke";
}

// Canvas & Pointer Interactions
setupCanvasInteractions();

// ============================================
// INITIAL BUILDS & BOOTSTRAP
// ============================================
buildFloatingNav();
buildSectionTabs();
buildFloatingSocials();
updateAmbientTexts();
updateIdentity();
renderAllStreams();
setupAllStreamInteractions();
setupConsecutiveSectionNavigation();

// Initial active section
const initialSec = DATA.sections && DATA.sections.length > 0 ? DATA.sections[0].id : "about";
setTab(initialSec);

// ============================================
// LIVE UPDATE LISTENER (Driven by editor.js)
// ============================================
window.addEventListener("portfolio:update", (e) => {
  const updatedData = updateData(e.detail);
  buildFloatingNav();
  buildSectionTabs();
  buildFloatingSocials();
  updateAmbientTexts();
  updateIdentity();
  renderAllStreams();
  setupAllStreamInteractions();

  const activeTab = document.querySelector(".tab.active");
  const currentSec = activeTab ? activeTab.dataset.section : (updatedData.sections[0]?.id || "about");
  setTab(currentSec);
  renderSection(currentSec);
  setPillActive(currentSec);
});
