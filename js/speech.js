/* ============================================================================
   ARPIT'S PORTFOLIO — speech.js
   Manga Speech Bubbles & Section Poke Quotes
   ============================================================================ */

export const POKE_QUOTES = {
  about: [
    "✦ hey! let's build something crazy ✦",
    "B.Tech CSE (AI/ML) + IIT Madras Online DS!",
    "✦ creative tech & multimodal AI ✦",
    "✦ 7 national hackathons & counting ✦"
  ],
  projects: [
    "VidVision3D: 80% MoCap cost reduction!",
    "Synapse: 0.9989 AUC eye tracking model!",
    "BlazePose + MediaPipe + Unity 3D!",
    "*training custom CNNs on RunPod*"
  ],
  skills: [
    "⚡ PyTorch & CUDA acceleration active ⚡",
    "⚡ 94% Computer Vision & Pose Tracking ⚡",
    "⚡ LayoutLMV3, QWEN3 & Vision-Language ⚡",
    "⚡ Three.js + WebGL rendering smoothly ⚡"
  ],
  experience: [
    "💼 Scopus IEEE Xplore NMIC 2026 Co-Author 💼",
    "💼 Patent App: Virtual Body Augmented AI 💼",
    "💼 Smart India Hackathon & Vihaan Finalist 💼",
    "💼 Leading AI & Full-Stack engineering 💼"
  ],
  contact: [
    "✉ arpitkumar.py@gmail.com — inbox open! ✉",
    "✦ Let's collaborate on AI/CV research! ✦",
    "LinkedIn / GitHub / Twitter: @ArpitKumarpy",
    "✦ Signal beacon connected! ✦"
  ]
};

export function spawnDialoguePop(x, y, text) {
  const pContainer = document.getElementById("particle-container");
  if (!pContainer) return;
  const el = document.createElement("div");
  el.className = "manga-speech-bubble";
  el.textContent = text;
  el.style.left = `${Math.max(20, Math.min(window.innerWidth - 240, x))}px`;
  el.style.top = `${Math.max(30, y - 20)}px`;
  pContainer.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}
