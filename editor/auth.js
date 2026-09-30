/* ============================================================================
   PORTFOLIO STUDIO — auth.js
   Cryptographic SHA-256 Authentication & Access Control Modal
   ============================================================================ */

import { DEFAULT_HASHES, STORAGE_KEY_HASH, AUTH_SALT } from "./state.js";
import { openStudioModal } from "./studio-ui.js";

export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashPassword(input) {
  return sha256(AUTH_SALT + input.trim());
}

export async function verifyPassword(input) {
  if (!input) return false;
  const saltedHash = await hashPassword(input);
  const plainHash = await sha256(input.trim());
  const customHash = localStorage.getItem(STORAGE_KEY_HASH);

  if (customHash && (saltedHash === customHash || plainHash === customHash)) {
    return true;
  }
  return DEFAULT_HASHES.includes(saltedHash) || DEFAULT_HASHES.includes(plainHash);
}

  function buildAuthModal() {
    if (document.getElementById("ped-auth-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "ped-auth-overlay";
    overlay.innerHTML = `
      <div class="ped-auth-card">
        <div class="ped-auth-header">
          <div class="ped-auth-title">
            <span>✦</span> SYSTEM COMMAND // ACCESS
          </div>
          <button class="ped-btn ped-btn-ghost ped-btn-sm" id="ped-auth-close" aria-label="Close">✕</button>
        </div>
        <div class="ped-auth-desc">
          Enter cryptographic security key to initiate Portfolio Studio:
        </div>
        <div class="ped-auth-input-group">
          <input type="password" id="ped-password-input" class="ped-auth-input" placeholder="Security key..." autocomplete="off" />
          <button type="button" class="ped-auth-toggle-pwd" id="ped-toggle-pwd" title="Toggle visibility">👁</button>
        </div>
        <div class="ped-auth-msg" id="ped-auth-msg"></div>
        <div class="ped-auth-actions">
          <button class="ped-btn ped-btn-ghost" id="ped-auth-cancel">Cancel [ESC]</button>
          <button class="ped-btn ped-btn-primary" id="ped-auth-submit">Unlock Studio [↵]</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const input = overlay.querySelector("#ped-password-input");
    const msg = overlay.querySelector("#ped-auth-msg");
    const card = overlay.querySelector(".ped-auth-card");
    const toggleBtn = overlay.querySelector("#ped-toggle-pwd");

    toggleBtn.addEventListener("click", () => {
      input.type = input.type === "password" ? "text" : "password";
    });

    const submitAuth = async () => {
      const val = input.value;
      if (!val) {
        msg.textContent = "Please enter an access key.";
        return;
      }
      msg.textContent = "Verifying cryptographic digest...";
      const ok = await verifyPassword(val);
      if (ok) {
        msg.style.color = "#2EC4B6";
        msg.textContent = "ACCESS GRANTED. Initializing studio...";
        input.value = "";
        setTimeout(() => {
          hideAuthModal();
          openStudioModal();
        }, 350);
      } else {
        msg.style.color = "#ff5252";
        msg.textContent = "ACCESS DENIED // INVALID KEY";
        card.classList.remove("ped-shake");
        void card.offsetWidth;
        card.classList.add("ped-shake");
      }
    };

    overlay.querySelector("#ped-auth-submit").addEventListener("click", submitAuth);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submitAuth();
      if (e.key === "Escape") hideAuthModal();
    });

    overlay.querySelector("#ped-auth-close").addEventListener("click", hideAuthModal);
    overlay.querySelector("#ped-auth-cancel").addEventListener("click", hideAuthModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) hideAuthModal();
    });
  }

  function showAuthModal() {
    buildAuthModal();
    const overlay = document.getElementById("ped-auth-overlay");
    const input = document.getElementById("ped-password-input");
    const msg = document.getElementById("ped-auth-msg");
    if (msg) msg.textContent = "";
    if (input) input.value = "";
    overlay.classList.add("ped-visible");
    setTimeout(() => input && input.focus(), 80);
  }

  function hideAuthModal() {
    const overlay = document.getElementById("ped-auth-overlay");
    if (overlay) overlay.classList.remove("ped-visible");
  }

export { buildAuthModal, showAuthModal, hideAuthModal };
