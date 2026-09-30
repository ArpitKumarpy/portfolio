/* ============================================================================
   PORTFOLIO STUDIO — actions.js
   Save, Apply, Reset, Export Actions & Trigger Initiators
   ============================================================================ */

import {
  activeData,
  setActiveData,
  STORAGE_KEY_DATA,
  clone
} from "./state.js";
import { showToast, renderActivePane } from "./studio-ui.js";
import { showAuthModal } from "./auth.js";

export function saveAndApply() {
  try {
    activeData._schemaVersion = "4.0";
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(activeData));
    window.dispatchEvent(new CustomEvent("portfolio:update", { detail: clone(activeData) }));
    showToast("✦ Changes Saved & Applied Live!");
  } catch (e) {
    alert("Error saving data: " + e.message);
  }
}

export function resetDefaults() {
  if (confirm("Reset all customizations to default code settings? This will clear custom changes.")) {
    localStorage.removeItem(STORAGE_KEY_DATA);
    setActiveData(clone(window.__PORTFOLIO_DEFAULT_DATA__ || {}));
    activeData._schemaVersion = "4.0";
    window.dispatchEvent(new CustomEvent("portfolio:update", { detail: clone(activeData) }));
    renderActivePane();
    showToast("✦ Restored code defaults.");
  }
}

export function openExportModal() {
  const modal = document.getElementById("ped-export-modal");
  const codeArea = document.getElementById("ped-export-text");
  codeArea.value = `// Paste this into js/data.js to make your changes permanent in code:\nexport const DEFAULT_DATA = ${JSON.stringify(activeData, null, 2)};`;
  modal.classList.add("ped-visible");
}

export function addDiscreetTrigger() {
  // Studio button has been removed from bottom right corner per user request.
  // The secret star (.static-star.s3) and Ctrl+Shift+E are used instead.
  const existing = document.getElementById("ped-studio-trigger");
  if (existing) existing.remove();
}

export function initTrigger() {
  // Remove any previously rendered bottom-right studio trigger button
  const existingTrigger = document.getElementById("ped-studio-trigger");
  if (existingTrigger) {
    existingTrigger.remove();
  }

  // Secret trigger: The subtle background star .static-star.s3
  const secretStar = document.querySelector(".static-star.s3");
  if (secretStar) {
    secretStar.addEventListener("click", (e) => {
      e.stopPropagation();
      showAuthModal();
    });
  }

  // Secret shortcut: Ctrl+Shift+E or Alt+E
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") || (e.altKey && e.key.toLowerCase() === "e")) {
      e.preventDefault();
      showAuthModal();
    }
  });
}
