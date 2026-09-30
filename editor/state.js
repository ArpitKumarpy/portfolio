/* ============================================================================
   PORTFOLIO STUDIO — state.js
   Shared CMS Editor State & Storage Keys
   ============================================================================ */

import { STUDIO_AUTH_SALT, STUDIO_AUTH_HASHES } from "../js/config.js";

export const AUTH_SALT = typeof STUDIO_AUTH_SALT !== "undefined"
  ? STUDIO_AUTH_SALT
  : "arpit_portfolio_auth_salt_v2_987150_";

export const DEFAULT_HASHES = (typeof STUDIO_AUTH_HASHES !== "undefined" && Array.isArray(STUDIO_AUTH_HASHES))
  ? STUDIO_AUTH_HASHES
  : [
      "6903faf04900f5dd233378a9382a36ffddd2bb53a52bbdcc40faf8bb80ed717e",
      "46bab93efd35f3c2c0e649ea215ace26d98d282f845c3041bc4dec39e648cbc3"
    ];

export const STORAGE_KEY_DATA = "arpit_portfolio_data";
export const STORAGE_KEY_HASH = "arpit_portfolio_auth_hash";

export let activeData = null;
export function setActiveData(d) { activeData = d; }

export let currentActiveTab = "navigation";
export function setCurrentActiveTab(tab) { currentActiveTab = tab; }

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getCurrentData() {
  if (window.__PORTFOLIO_DATA__) {
    return clone(window.__PORTFOLIO_DATA__);
  }
  const saved = localStorage.getItem(STORAGE_KEY_DATA);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { }
  }
  return clone(window.__PORTFOLIO_DEFAULT_DATA__ || {});
}
