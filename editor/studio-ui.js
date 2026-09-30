/* ============================================================================
   PORTFOLIO STUDIO — studio-ui.js
   Studio Modal Construction, Sidebar Tabs & Pane Orchestrator
   ============================================================================ */

import {
  activeData,
  setActiveData,
  currentActiveTab,
  setCurrentActiveTab,
  getCurrentData
} from "./state.js";
import {
  renderNavigationPane,
  renderTagsPane,
  renderAboutPane,
  renderProjectsPane,
  renderSkillsPane,
  renderExperiencePane,
  renderContactPane,
  renderSocialsPane,
  renderIdentityPane,
  renderSecurityPane
} from "./panes.js";
import { saveAndApply, resetDefaults, openExportModal } from "./actions.js";

export function showToast(msg) {
  const toast = document.getElementById("ped-toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("ped-visible");
  setTimeout(() => toast.classList.remove("ped-visible"), 2200);
}

export function openStudioModal() {
  setActiveData(getCurrentData());
  buildStudioModal();
  const modal = document.getElementById("ped-studio-modal");
  modal.classList.add("ped-visible");
  renderActivePane();
}

export function closeStudioModal() {
  const modal = document.getElementById("ped-studio-modal");
  if (modal) modal.classList.remove("ped-visible");
}

export function renderActivePane() {
  const container = document.getElementById("ped-content-area");
  if (!container || !activeData) return;

  switch (currentActiveTab) {
    case "navigation":
      renderNavigationPane(container);
      break;
    case "tags":
      renderTagsPane(container);
      break;
    case "about":
      renderAboutPane(container);
      break;
    case "projects":
      renderProjectsPane(container);
      break;
    case "skills":
      renderSkillsPane(container);
      break;
    case "experience":
      renderExperiencePane(container);
      break;
    case "contact":
      renderContactPane(container);
      break;
    case "socials":
      renderSocialsPane(container);
      break;
    case "identity":
      renderIdentityPane(container);
      break;
    case "security":
      renderSecurityPane(container);
      break;
    default:
      renderNavigationPane(container);
  }
}

export function buildStudioModal() {
  if (document.getElementById("ped-studio-modal")) return;

  const modal = document.createElement("div");
  modal.id = "ped-studio-modal";
  modal.innerHTML = `
    <div class="ped-topbar">
      <div class="ped-topbar-title">
        <h2><span>✦</span> Portfolio Studio</h2>
        <span class="ped-badge">Editorial CMS</span>
      </div>
      <div class="ped-topbar-actions">
        <button class="ped-btn ped-btn-ghost ped-btn-sm" id="ped-btn-reset" title="Reset all changes to code defaults">↺ Reset Defaults</button>
        <button class="ped-btn ped-btn-gold ped-btn-sm" id="ped-btn-export">📋 Export Code / JSON</button>
        <button class="ped-btn ped-btn-primary" id="ped-btn-save">⚡ Save &amp; Apply Live</button>
        <button class="ped-btn ped-btn-ghost ped-btn-sm" id="ped-studio-close" style="font-size: 1rem;">✕</button>
      </div>
    </div>

    <div class="ped-studio-body">
      <nav class="ped-sidebar">
        <button class="ped-nav-tab active" data-pane="navigation"><span class="ped-icon">⚡</span> Buttons &amp; Navigation</button>
        <button class="ped-nav-tab" data-pane="tags"><span class="ped-icon">🏷</span> Universal Tags Manager</button>
        <button class="ped-nav-tab" data-pane="about"><span class="ped-icon">📄</span> About &amp; Bento Cards</button>
        <button class="ped-nav-tab" data-pane="projects"><span class="ped-icon">🚀</span> Projects &amp; Cards</button>
        <button class="ped-nav-tab" data-pane="skills"><span class="ped-icon">📊</span> Skills &amp; Metrics</button>
        <button class="ped-nav-tab" data-pane="experience"><span class="ped-icon">💼</span> Experience &amp; Timeline</button>
        <button class="ped-nav-tab" data-pane="contact"><span class="ped-icon">✉</span> Contact &amp; Connect Form</button>
        <button class="ped-nav-tab" data-pane="socials"><span class="ped-icon">🌐</span> Floating Social Dock</button>
        <button class="ped-nav-tab" data-pane="identity"><span class="ped-icon">👤</span> Hero &amp; Identity</button>
        <button class="ped-nav-tab" data-pane="security"><span class="ped-icon">🔒</span> Security &amp; Key</button>
      </nav>

      <main class="ped-content-area" id="ped-content-area">
        <!-- Dynamic Form Panes Render Here -->
      </main>
    </div>

    <!-- Toast Notification -->
    <div id="ped-toast">✦ Portfolio Updated Live!</div>

    <!-- Export Modal -->
    <div id="ped-export-modal">
      <div class="ped-export-card">
        <div class="ped-pane-header" style="margin-bottom: 8px;">
          <h3>Export Portfolio Configuration</h3>
          <button class="ped-btn ped-btn-ghost ped-btn-sm" id="ped-export-close">✕</button>
        </div>
        <p style="font-size: 0.8rem; color: rgba(240, 235, 244, 0.7); margin: 0;">
          Copy this JavaScript data to update <code>DEFAULT_DATA</code> in <code>js/data.js</code> permanently, or download as JSON:
        </p>
        <textarea class="ped-export-code" id="ped-export-text" readonly></textarea>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="ped-btn ped-btn-ghost" id="ped-btn-download-json">Download .json</button>
          <button class="ped-btn ped-btn-primary" id="ped-btn-copy-code">Copy to Clipboard</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Sidebar tab switching
  modal.querySelectorAll(".ped-nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      modal.querySelectorAll(".ped-nav-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      setCurrentActiveTab(tab.dataset.pane);
      renderActivePane();
    });
  });

  // Top actions
  modal.querySelector("#ped-studio-close").addEventListener("click", closeStudioModal);
  modal.querySelector("#ped-btn-save").addEventListener("click", saveAndApply);
  modal.querySelector("#ped-btn-reset").addEventListener("click", resetDefaults);
  modal.querySelector("#ped-btn-export").addEventListener("click", openExportModal);

  // Export modal controls
  const expModal = modal.querySelector("#ped-export-modal");
  modal.querySelector("#ped-export-close").addEventListener("click", () => expModal.classList.remove("ped-visible"));
  modal.querySelector("#ped-btn-copy-code").addEventListener("click", () => {
    const code = modal.querySelector("#ped-export-text");
    code.select();
    navigator.clipboard.writeText(code.value).then(() => {
      showToast("✦ Copied code to clipboard!");
    });
  });

  modal.querySelector("#ped-btn-download-json").addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeData, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "arpit_portfolio_data.json";
    a.click();
    showToast("✦ Downloaded portfolio data JSON!");
  });
}
