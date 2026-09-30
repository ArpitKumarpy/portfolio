/* ============================================================================
   ARPIT'S PORTFOLIO — data.js
   Portfolio Data Store, Schema Versioning, and LocalStorage Engine
   ============================================================================ */

export const DEFAULT_DATA = {
  name: "Arpit Kumar",
  pageTitle: "Arpit Kumar — AI/ML & Computer Vision Developer",
  nameTitleSrc: "./assets/nametitle.png",
  tagline: "AI/ML & Computer Vision Developer · 3D Motion, VLMs & Multimodal Intelligence",
  sections: [
    { id: "about", label: "About", icon: "✦" },
    { id: "projects", label: "Projects", icon: "◈" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "contact", label: "Contact", icon: "✉" }
  ],
  ambientTexts: [
    { id: "ft-1", text: "*just vibes*" },
    { id: "ft-2", text: "vision models →" },
    { id: "ft-3", text: "late nights zzz" },
    { id: "ft-4", text: "✦ 3D motion ✦" },
    { id: "ft-5", text: "training epochs..." },
    { id: "ft-6", text: "still optimizing" }
  ],
  about: {
    titleMain: "ABOUT",
    titleGhost: "ME",
    intro: "Hey! I'm Arpit. I engineer computer vision pipelines, train deep learning architectures, and build interactive 3D systems that bridge machine perception with human motion.",
    bio: "AI/ML Engineer specializing in Computer Vision, 3D Motion Capture, and Multimodal Intelligence. Research published on IEEE Xplore, national patent inventor, and 7-time hackathon contender.",
    bentoCards: [
      {
        id: "bento-card-education",
        badge: "Degree & College",
        title: "B.Tech CSE (AIML) & BS Data Science",
        subtitle: "IMS Engineering College + IIT Madras",
        tag: "Dual Pursuit",
        icon: "🎓"
      },
      {
        id: "bento-card-experience",
        badge: "Work & Timeline",
        title: "Botter Solutions & DrafTineAI",
        subtitle: "Vision-Language Models, CVAT & Detectron2",
        tag: "Industry AI",
        icon: "💼"
      },
      {
        id: "bento-card-achievements",
        badge: "Patents & Research",
        title: "Scopus IEEE NMIC & Patent App",
        subtitle: "0.9989 AUC Gaze Model & 3D AI Body",
        tag: "Scopus & IPO",
        icon: "📜"
      },
      {
        id: "bento-card-creative",
        badge: "Ongoing Project",
        title: "VidVision3D: 3D MoCap",
        subtitle: "Markerless Pose Extraction from Video",
        tag: "Live Repo ↗",
        icon: "🚀",
        link: "https://github.com/ArpitKumarpy/VidVision3D1"
      }
    ],
    summaryBullets: [
      "Specialized in 3D Motion Capture, BlazePose & MediaPipe pipelines with 80% production cost reduction.",
      "Co-authored 'Synapse' research published on IEEE Xplore (NMIC 2026) for cognitive gaze estimation.",
      "Inventor on Indian Patent App No: 202211074491 ('A Virtual Body Augmented with AI Assistant').",
      "Experienced with PyTorch, TensorFlow, LayoutLMV3, QWEN3, and GPU clustering on RunPod.io."
    ],
    lines: [
      "B.Tech CSE (AI & ML) @ IMS Engineering College & BS in Data Science @ IIT Madras.",
      "Published Researcher: Co-authored 'Synapse' (Scopus IEEE Xplore NMIC 2026 — 0.9989 AUC gaze model).",
      "Patent Inventor: 'A Virtual Body Augmented with AI Assistant' (App No: 202211074491).",
      "Creator of VidVision3D: markerless 3D motion capture & stick-frame animation directly from video.",
      "Led teams across 7 national hackathons (Smart India Hackathon 2024 & Vihaan 8.0 Finalist).",
      "Late nights experimenting with VLMs, optimizing CUDA kernels, and drinking coffee."
    ],
    highlights: [
      { label: "Research", val: "Scopus IEEE Xplore NMIC 2026 Co-Author" },
      { label: "Patent", val: "Virtual Body Augmented with AI (202211074491)" },
      { label: "Degrees", val: "B.Tech CSE (AI/ML) + IIT Madras BS Data Science" },
      { label: "MoCap", val: "VidVision3D — 80% Cost Reduction MoCap Pipeline" }
    ],
    likes: [
      "Computer Vision & 3D Pose Tracking",
      "Markerless MoCap & BlazePose",
      "Fine-tuning VLMs & Document AI",
      "Interactive 3D Web & Three.js",
      "Late-night hackathons & building things that feel alive"
    ],
    dislikes: [
      "Expensive motion capture suits",
      "CUDA out-of-memory errors",
      "Data leakage across subject folds",
      "Black-box AI without interpretability"
    ]
  },
  projects: {
    titleMain: "FEATURED",
    titleGhost: "PROJECTS",
    bio: "Markerless 3D motion capture, published assistive eye tracking, multimodal emotion AI, and Vision-Language document pipelines.",
    items: [
      {
        id: "proj-row-vidvision",
        title: "VidVision3D — Markerless Motion Capture",
        badge: "Featured • CV & 3D",
        desc: "Engineered an accessible 3D motion capture system using real-time video processing. Extracts 3D landmarks (body, hands, pose) from video with MediaPipe & BlazePose. Backed by a Flask pipeline with React frontend and Unity 3D export—slashing animation production costs by 80% for indie creators.",
        tech: ["BlazePose", "MediaPipe", "Python", "Flask", "React", "Unity 3D", "OpenCV"],
        link: "https://github.com/ArpitKumarpy/VidVision3D1",
        btnText: "Explore VidVision3D ↗",
        mockupTitle: "VidVision3D",
        mockupHud: "3D MoCap · MediaPipe"
      },
      {
        id: "proj-row-synapse",
        title: "Synapse: Multimodal Assistive Reading System",
        badge: "IEEE Xplore Scopus 2026",
        desc: "Co-authored a privacy-first, serverless assistive reading platform for dyslexic users. Features a tokenized contentEditable DOM surface, dynamic typographic scaffolding, dual-mode TTS, and eye-tracking difficulty prediction using the ZuCo dataset (0.9989 AUC with GPU-accelerated XGBoost).",
        tech: ["Eye Tracking", "XGBoost", "IEEE Xplore", "ZuCo Dataset", "MediaPipe", "Python", "React"],
        link: "https://github.com/ArpitKumarpy",
        btnText: "IEEE Paper & Code ↗",
        mockupTitle: "Synapse AI",
        mockupHud: "0.9989 AUC · Eye Tracking"
      },
      {
        id: "proj-row-emotion",
        title: "Multimodal Emotion Recognition System",
        badge: "Deep Learning • Audio/Vision/NLP",
        desc: "Real-time AI system detecting human emotions by fusing voice, facial expressions, and text. Trained a custom CNN on RAVDESS with Librosa MFCC spectral features on TensorFlow 2.10 (CUDA 11.2/cuDNN 8.1), fusing Wav2Vec2, DeepFace, OpenCV, and Transformers into an ultra-low-latency pipeline.",
        tech: ["Deep Learning", "Wav2Vec2", "TensorFlow", "DeepFace", "OpenCV", "PyTorch"],
        link: "https://github.com/ArpitKumarpy",
        btnText: "Explore Project ↗",
        mockupTitle: "Emotion AI",
        mockupHud: "Voice + Vision + NLP"
      },
      {
        id: "proj-row-vlm",
        title: "AI & Vision-Language Document Intelligence",
        badge: "Industry • LLMs & VLMs",
        desc: "Fine-tuned and evaluated Vision-Language Models and document intelligence architectures (LayoutLMV3, QWEN3, CascadeTabNet, TableLLM, PaddleOCR-VL). Curated high-precision datasets on CVAT and managed cloud GPU training clusters on RunPod.io.",
        tech: ["VLMs", "LayoutLMV3", "QWEN3", "RunPod GPU", "CVAT", "PaddleOCR"],
        link: "https://github.com/ArpitKumarpy",
        btnText: "GitHub Profile ↗",
        mockupTitle: "Document AI",
        mockupHud: "LayoutLMV3 · QWEN3"
      }
    ]
  },
  skills: {
    titleMain: "TECHNICAL",
    titleGhost: "SKILLS",
    bio: "Specialized in Computer Vision, 3D Pose Estimation, Deep Learning, and Cloud GPU Workflows.",
    metrics: [
      { icon: "✦", val: "95%", lbl: "Max Proficiency" },
      { icon: "◈", val: "12+", lbl: "AI/CV Frameworks" },
      { icon: "⚡", val: "CUDA", lbl: "GPU Accelerated" }
    ],
    categories: [
      {
        id: "skill-cat-cv",
        category: "Computer Vision & Pose Estimation",
        badge: "Core Speciality",
        icon: "👁",
        items: [
          { name: "OpenCV, MediaPipe & BlazePose (3D Landmark Extraction)", level: 95 },
          { name: "Object Detection & Segmentation (YOLOv8x, Detectron2)", level: 90 },
          { name: "Dataset Annotation & Pipeline Tooling (CVAT)", level: 92 }
        ],
        tags: ["BlazePose", "MediaPipe", "OpenCV", "YOLOv8x", "Detectron2", "CVAT", "Markerless 3D MoCap"]
      },
      {
        id: "skill-cat-ml",
        category: "AI, Machine Learning & VLMs",
        badge: "Deep Learning",
        icon: "⚡",
        items: [
          { name: "Deep Learning (PyTorch, TensorFlow 2.10, Scikit-Learn)", level: 92 },
          { name: "Tree Ensembles & Tabular Modeling (XGBoost, GroupKFold)", level: 94 },
          { name: "Vision-Language Models & Fine-Tuning (LayoutLMV3, QWEN3)", level: 88 }
        ],
        tags: ["PyTorch", "TensorFlow 2.10", "XGBoost", "LayoutLMV3", "QWEN3", "GroupKFold", "ZuCo Dataset"]
      },
      {
        id: "skill-cat-fullstack",
        category: "Full-Stack, 3D & Cloud Infrastructure",
        badge: "3D & Cloud",
        icon: "🌐",
        items: [
          { name: "Interactive Web & 3D (React.js, Three.js, TypeScript)", level: 86 },
          { name: "Backend APIs & Game Engines (Flask, Node.js, Unity 3D)", level: 85 },
          { name: "Hardware & Cloud Acceleration (CUDA, cuDNN, RunPod.io)", level: 90 }
        ],
        tags: ["Three.js", "React", "Unity 3D", "TypeScript", "CUDA", "RunPod.io", "Flask", "WebGL"]
      }
    ]
  },
  experience: {
    titleMain: "WORK",
    titleGhost: "EXPERIENCE",
    bio: "Track record across AI enterprise solutions, published Scopus research, patent inventions, and hackathons.",
    items: [
      {
        id: "exp-card-botter",
        role: "AI/LLM Solutions Developer",
        company: "Botter Solutions Pvt. Ltd. — Rovabot.io",
        period: "Aug 2025 – Nov 2025",
        badge: "Industry",
        badgeClass: "exp-badge-industry",
        points: [
          "Researched OCR and classification models; fine-tuned, trained, and tested LLMs, VLMs, and vLLMs including LayoutLMV3, QWEN3, CascadeTabNet, TableLLM, and PaddleOCR-VL.",
          "Managed dataset preparation and high-quality annotations using CVAT.",
          "Utilized cloud GPUs on RunPod.io and handled cloud resource management and workflow formulation."
        ],
        tags: ["LayoutLMV3", "QWEN3", "vLLM", "RunPod.io", "CVAT"]
      },
      {
        id: "exp-card-draftine",
        role: "Data Annotation Specialist & ML Assistant",
        company: "DrafTineAI — Draftine.com",
        period: "Feb 2026 – Apr 2026",
        badge: "Industry",
        badgeClass: "exp-badge-industry",
        points: [
          "Annotated complex architectural diagrams on CVAT; interpreted ambiguous visual inputs and maintained strict labeling consistency.",
          "Assisted in research and model training using Detectron2 and YOLOv8x.",
          "Analyzed visual and contextual data to identify inconsistencies and optimize dataset structure for training."
        ],
        tags: ["Detectron2", "YOLOv8x", "CVAT", "Computer Vision"]
      },
      {
        id: "exp-card-ieee",
        role: "Published Author & Researcher (Synapse)",
        company: "Scopus IEEE Xplore NMIC 2026",
        period: "2026",
        badge: "Publication",
        badgeClass: "exp-badge-research",
        points: [
          "Co-authored 'Synapse: A Multimodal Assistive Reading System with Cognitive Difficulty Prediction'.",
          "Engineered serverless attention tracking via MediaPipe and trained XGBoost on the ZuCo dataset (0.9989 AUC via behavioral gaze features)."
        ],
        tags: ["IEEE Xplore", "ZuCo Dataset", "XGBoost", "Eye Tracking"]
      },
      {
        id: "exp-card-patent",
        role: "Patent Inventor",
        company: "Indian Patent Office",
        period: "App No: 202211074491",
        badge: "Patent",
        badgeClass: "exp-badge-patent",
        points: [
          "Invented 'A Virtual Body Augmented with AI Assistant' — bridging 3D avatars, contextual AI agents, and sensory input."
        ],
        tags: ["Patent", "3D Avatar", "AI Assistant", "Sensory AI"]
      },
      {
        id: "exp-card-honors",
        role: "Hackathons, Education & Certifications",
        company: "IMS Engineering College & IIT Madras",
        period: "2022 – 2026",
        badge: "Honors & BS",
        badgeClass: "exp-badge-honors",
        points: [
          "B.Tech CSE (AI & ML) at IMS Engineering College (CGPA: 7.04/10).",
          "Pursuing IIT Madras BS in Data Science (Passed Foundation, currently Diploma Level).",
          "Led teams in 7 Hackathons; Finalist at Smart India Hackathon (SIH 2024) and Vihaan 8.0 (DTU).",
          "British Council English C1 Advanced (577/600); Workshops at IIT Bombay (AI/ML) & IIT BHU (Python)."
        ],
        tags: ["IIT Madras", "SIH 2024", "Vihaan 8.0", "C1 Advanced"]
      }
    ]
  },
  contact: {
    titleMain: "GET IN",
    titleGhost: "TOUCH",
    bio: "Always open to discussing Computer Vision pipelines, 3D interactive graphics, and deep learning research collaborations.",
    intro: "Always open to discussing Computer Vision, 3D interactive graphics, and deep learning systems. Connect with me directly:",
    status: {
      liveText: "Open for Opportunities",
      details: "Available for AI/ML, Computer Vision & 3D Engineering roles, research fellowships, or collaborative projects. Typical response within 24 hours."
    },
    form: {
      badge: "⚡ DIRECT TRANSMISSION",
      title: "Let's Connect",
      hint: "Direct to inbox · Instant delivery",
      sub: "Send a message directly to my email without needing an email app:",
      submitBtnText: "Send Direct Message"
    },
    channels: [
      {
        id: "contact-link-email",
        label: "Email",
        val: "arpitkumar.py@gmail.com",
        href: "mailto:arpitkumar.py@gmail.com",
        iconClass: "icon-frame-pink",
        iconSvg: `<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>`
      },
      {
        id: "contact-link-linkedin",
        label: "LinkedIn",
        val: "arpitkumar-105309262",
        href: "https://www.linkedin.com/in/arpitkumar-105309262",
        iconClass: "icon-frame-teal",
        iconSvg: `<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>`
      },
      {
        id: "contact-link-github",
        label: "GitHub",
        val: "ArpitKumarpy",
        href: "https://github.com/ArpitKumarpy",
        iconClass: "icon-frame-purple",
        iconSvg: `<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>`
      },
      {
        id: "contact-link-phone",
        label: "Phone",
        val: "+91 9871501023",
        href: "tel:+919871501023",
        iconClass: "icon-frame-amber",
        iconSvg: `<path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-1-1z"/>`
      }
    ],
    links: [
      {
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
        label: "GitHub",
        value: "github.com/ArpitKumarpy",
        href: "https://github.com/ArpitKumarpy"
      },
      {
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
        label: "LinkedIn",
        value: "linkedin.com/in/arpitkumar-105309262",
        href: "https://www.linkedin.com/in/arpitkumar-105309262"
      },
      {
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
        label: "Email",
        value: "arpitkumar.py@gmail.com",
        href: "mailto:arpitkumar.py@gmail.com"
      },
      {
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-1-1z"/></svg>`,
        label: "Phone / Call",
        value: "+91 9871501023",
        href: "tel:+919871501023"
      }
    ]
  },
  customSections: {}
};

const PORTFOLIO_SCHEMA_VERSION = "4.0";

function loadPortfolioData() {
  try {
    const saved = localStorage.getItem("arpit_portfolio_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Clean up prototype test tags and link text
      const cleanProj = (p) => {
        if (!p) return;
        if (Array.isArray(p.tech)) p.tech = p.tech.filter(t => t !== "TestTag1");
        if (Array.isArray(p.tags)) p.tags = p.tags.filter(t => t !== "TestTag1");
        if (p.btnText) p.btnText = p.btnText.replace("VidVision3D1", "VidVision3D");
      };
      if (Array.isArray(parsed.projects)) {
        parsed.projects.forEach(cleanProj);
      } else if (parsed.projects && Array.isArray(parsed.projects.items)) {
        parsed.projects.items.forEach(cleanProj);
      }
      if (parsed.about) {
        if (parsed.about.titleMain === "SOFTWARE" || !parsed.about.titleMain) {
          parsed.about.titleMain = "ABOUT";
          parsed.about.titleGhost = "ME";
        }
      }
      // If schema version is outdated or absent (e.g. from prototype testing), refresh cleanly to current DEFAULT_DATA
      if (!parsed._schemaVersion || parsed._schemaVersion !== PORTFOLIO_SCHEMA_VERSION) {
        try { localStorage.removeItem("arpit_portfolio_data"); } catch (_) {}
        const fresh = JSON.parse(JSON.stringify(DEFAULT_DATA));
        fresh._schemaVersion = PORTFOLIO_SCHEMA_VERSION;
        return fresh;
      }
      return Object.assign({}, DEFAULT_DATA, parsed);
    }
  } catch (e) {
    console.warn("Could not load stored data", e);
  }
  const fresh = JSON.parse(JSON.stringify(DEFAULT_DATA));
  fresh._schemaVersion = PORTFOLIO_SCHEMA_VERSION;
  return fresh;
}

export let DATA = loadPortfolioData();
window.__PORTFOLIO_DATA__ = DATA;
window.__PORTFOLIO_DEFAULT_DATA__ = DEFAULT_DATA;


export function updateData(newData) {
  DATA = newData;
  window.__PORTFOLIO_DATA__ = DATA;
  return DATA;
}
