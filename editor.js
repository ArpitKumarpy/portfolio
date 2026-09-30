/* ============================================================================
   PORTFOLIO STUDIO — editor.js
   Master Entry Point for Arpit Kumar's Portfolio CMS & Live Customizer
   ============================================================================ */

import { initTrigger } from "./editor/actions.js";

export * from "./editor/state.js";
export * from "./editor/auth.js";
export * from "./editor/studio-ui.js";
export * from "./editor/panes.js";
export * from "./editor/actions.js";

// Self initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTrigger);
} else {
  initTrigger();
}
