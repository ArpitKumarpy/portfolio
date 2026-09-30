/* ============================================================================
   ARPIT'S PORTFOLIO — navigation.js
   Consecutive Section Navigation & Scroll Engine
   ============================================================================ */

import {
  openAboutSection,
  openProjectsSection,
  openSkillsSection,
  openExperienceSection,
  openContactSection
} from "./sections.js";

const SECTION_SEQUENCE = [
  { id: "about", name: "About Me", scroller: ".about-bento-scroll", open: openAboutSection },
  { id: "projects", name: "Featured Projects", scroller: ".projects-stream-scroll", open: openProjectsSection },
  { id: "skills", name: "Technical Skills", scroller: ".skills-stream-scroll", open: openSkillsSection },
  { id: "experience", name: "Work Experience", scroller: ".experience-stream-scroll", open: openExperienceSection },
  { id: "contact", name: "Get In Touch", scroller: ".contact-stream-scroll", open: openContactSection }
];

let isConsecutiveSwitching = false;

export function navigateConsecutiveSection(targetIndex, initialScroll = "top") {
  if (isConsecutiveSwitching) return;
  if (targetIndex < 0 || targetIndex >= SECTION_SEQUENCE.length) return;

  isConsecutiveSwitching = true;
  const sec = SECTION_SEQUENCE[targetIndex];
  sec.open();

  requestAnimationFrame(() => {
    const scroller = document.querySelector(sec.scroller);
    if (scroller) {
      if (initialScroll === "bottom") {
        scroller.scrollTop = scroller.scrollHeight;
      } else {
        scroller.scrollTop = 0;
      }
    }
  });

  if (navigator.vibrate) {
    try { navigator.vibrate(30); } catch (_) {}
  }

  setTimeout(() => {
    isConsecutiveSwitching = false;
  }, 620);
}

export function setupConsecutiveSectionNavigation() {
  // Global delegated click listener for any consecutive nav button
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".consecutive-nav-btn");
    if (!btn) return;
    e.stopPropagation();
    const targetId = btn.getAttribute("data-nav-target");
    const targetIndex = SECTION_SEQUENCE.findIndex(s => s.id === targetId);
    if (targetIndex !== -1) {
      const isPrev = btn.classList.contains("prev-btn");
      navigateConsecutiveSection(targetIndex, isPrev ? "bottom" : "top");
    }
  });

  // Touch swipe & wheel overscroll handlers for each scroll container
  SECTION_SEQUENCE.forEach((sec, idx) => {
    const scroller = document.querySelector(sec.scroller);
    if (!scroller) return;

    let touchStartY = 0;
    let touchStartX = 0;
    let isTracking = false;
    let wheelAccumulator = 0;
    let wheelTimer = null;

    scroller.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      isTracking = true;
    }, { passive: true });

    scroller.addEventListener("touchmove", (e) => {
      if (!isTracking || isConsecutiveSwitching) return;
      const cy = e.touches[0].clientY;
      const cx = e.touches[0].clientX;
      const dy = cy - touchStartY;
      const dx = cx - touchStartX;

      // Ensure vertical swipe gesture
      if (Math.abs(dy) <= Math.abs(dx)) return;

      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      const atBottom = scroller.scrollTop >= maxScroll - 16;
      const atTop = scroller.scrollTop <= 16;

      // Swipe UP at bottom (finger moves upward, dy < -45) -> next section
      if (atBottom && dy < -45 && idx < SECTION_SEQUENCE.length - 1) {
        isTracking = false;
        navigateConsecutiveSection(idx + 1, "top");
      }
      // Swipe DOWN at top (finger moves downward, dy > 45) -> previous section
      else if (atTop && dy > 45 && idx > 0) {
        isTracking = false;
        navigateConsecutiveSection(idx - 1, "bottom");
      }
    }, { passive: true });

    scroller.addEventListener("touchend", () => { isTracking = false; }, { passive: true });
    scroller.addEventListener("touchcancel", () => { isTracking = false; }, { passive: true });

    // Wheel overscroll for desktop & trackpad testing
    scroller.addEventListener("wheel", (e) => {
      if (isConsecutiveSwitching) return;
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      const atBottom = scroller.scrollTop >= maxScroll - 8;
      const atTop = scroller.scrollTop <= 8;

      if (e.deltaY > 0 && atBottom && idx < SECTION_SEQUENCE.length - 1) {
        wheelAccumulator += e.deltaY;
        if (wheelAccumulator > 75) {
          wheelAccumulator = 0;
          navigateConsecutiveSection(idx + 1, "top");
        }
      } else if (e.deltaY < 0 && atTop && idx > 0) {
        wheelAccumulator += e.deltaY;
        if (wheelAccumulator < -75) {
          wheelAccumulator = 0;
          navigateConsecutiveSection(idx - 1, "bottom");
        }
      } else {
        wheelAccumulator = 0;
      }

      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelAccumulator = 0; }, 260);
    }, { passive: true });
  });
}
