/* ============================================================================
   ARPIT'S PORTFOLIO — data.js
   Portfolio Data Store, Schema Versioning, and LocalStorage Engine
   ============================================================================ */

export const DEFAULT_DATA = {
  name: "Arpit Kumar",
  pageTitle: "Arpit Kumar — AI & Computer Vision Engineer",
  nameTitleSrc: "./assets/nametitle.png",
  tagline: "AI & Computer Vision Engineer · Interactive Systems, 3D Kinematics & Multimodal AI",
  sections: [
    { id: "about", label: "About", icon: "✦" },
    { id: "projects", label: "Projects", icon: "◈" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "contact", label: "Contact", icon: "✉" }
  ],
  ambientTexts: [
    { id: "ft-1", text: "✦ 3D motion synthesis ✦" },
    { id: "ft-2", text: "computer vision →" },
    { id: "ft-3", text: "creative technology" },
    { id: "ft-4", text: "✦ neural perception ✦" },
    { id: "ft-5", text: "interactive webgl..." },
    { id: "ft-6", text: "multimodal intelligence" }
  ],
  about: {
    titleMain: "ABOUT",
    titleGhost: "ME",
    intro: "I’m an AI and Computer Vision engineer focused on building intelligent interactive systems that connect machine learning with the physical and visual world.",
    bio: `<p class="about-bio-p">I’m an <strong class="bio-highlight bio-highlight-cyan"><span class="bio-sparkle">✦</span> AI and Computer Vision engineer</strong> focused on building intelligent interactive systems that connect machine learning with the physical and visual world.</p>\n<p class="about-bio-p">I enjoy taking problems that sit somewhere between research and real-world use and turning them into things people can actually interact with. My work has ranged from <strong class="bio-highlight bio-highlight-gradient">computer vision and markerless motion capture to multimodal AI, OCR, and vision-language models</strong>—often involving the full journey from dataset preparation and model training to the final product.</p>\n<p class="about-bio-p">What interests me most is the space where <strong class="bio-highlight bio-highlight-magenta"><span class="bio-sparkle">✦</span> AI meets creativity and human interaction</strong>. I like building systems that don't just demonstrate a model, but give that model a purpose—whether that's making reading more accessible, reducing the cost of motion capture, or exploring new ways for people to interact with technology.</p>\n<p class="about-bio-p about-bio-footer">I’m still learning, experimenting, and occasionally breaking things along the way. That’s probably the part I enjoy most.</p>`,
    bentoCards: [
      {
        id: "bento-card-education",
        badge: "EDUCATION",
        title: "B.Tech CSE (AIML) & Online BS Data Science",
        subtitle: "IMS Engineering College + IIT Madras (Online)",
        tag: "Dual Pursuit",
        icon: "🎓"
      },
      {
        id: "bento-card-experience",
        badge: "INTERESTS & EXPERIENCES",
        title: "Creative Tech & 3D Kinematics",
        subtitle: "3D Motion Synthesis, Interactive WebGL & Kinetic Rigging",
        tag: "Creative AI",
        icon: "🎨"
      },
      {
        id: "bento-card-achievements",
        badge: "ACHIEVEMENTS",
        title: "Scopus IEEE NMIC & Indian Patent",
        subtitle: "0.9989 AUC Gaze Model & AI Virtual Body App: 202211074491",
        tag: "Scopus & IPO",
        icon: "📜"
      },
      {
        id: "bento-card-creative",
        badge: "HERO FLAGSHIP",
        title: "VidVision3D",
        subtitle: "Markerless 3D Motion Capture & Kinematics Studio",
        tag: "Live MoCap ↗",
        icon: "⚡",
        link: "https://vid-vision3-d1.vercel.app/"
      }
    ],
    summaryBullets: [
      "Creative Toolchains: Architect of VidVision3D, democratizing motion capture for digital artists, animators, and game developers without proprietary hardware.",
      "Assistive Perception: Co-authored Scopus IEEE Xplore research (Synapse), fusing iris tracking and cognitive load modeling (0.9989 AUC) with adaptive typography.",
      "Applied Machine Learning: Hands-on experience fine-tuning Vision-Language Models (LayoutLMV3, QWEN3) and deploying spatial vision models (Detectron2, YOLOv8x) across GPU clusters.",
      "Engineering Leadership: Spearheaded teams across 7 national hackathons (Smart India Hackathon 2024 & Vihaan 8.0 Finalist), turning research concepts into production prototypes."
    ],
    lines: [
      "B.Tech CSE (AI & ML) @ IMS Engineering College & Online BS in Data Science @ IIT Madras.",
      "Creative Technologist building markerless 3D MoCap systems and interactive WebGL animation tools.",
      "Co-authored 'Synapse' published on Scopus IEEE Xplore NMIC 2026 (0.9989 AUC gaze estimation model).",
      "Inventor on Indian Patent App No: 202211074491 ('A Virtual Body Augmented with AI Assistant').",
      "Industry experience fine-tuning VLMs (LayoutLMV3, QWEN3) and deploying Detectron2/YOLOv8x vision models.",
      "Led teams across 7 national hackathons (Smart India Hackathon 2024 & Vihaan 8.0 DTU Finalist)."
    ],
    highlights: [
      { label: "Flagship AI", val: "VidVision3D — 80% Cost Reduction MoCap & Kinetic Studio" },
      { label: "Research", val: "Scopus IEEE Xplore NMIC 2026 Co-Author (Synapse)" },
      { label: "Patent", val: "Virtual Body Augmented with AI (App: 202211074491)" },
      { label: "Academics", val: "B.Tech CSE (AI/ML) + IIT Madras Online BS Data Science" }
    ],
    likes: [
      "3D Motion Synthesis & Interactive WebGL",
      "Markerless MoCap & Computer Vision",
      "Creative Tooling for Independent Artists",
      "Multimodal AI & Assistive Interfaces",
      "Rapid Prototyping & Hackathon Team Leadership"
    ],
    dislikes: [
      "Prohibitive hardware barriers for digital creators",
      "Uninterpretable black-box models",
      "Fragile inference pipelines with high latency",
      "Data leakage across validation folds"
    ]
  },
  projects: {
    titleMain: "FEATURED",
    titleGhost: "PROJECTS",
    bio: "Markerless 3D motion capture, assistive eye tracking, production flight platforms, multimodal emotion AI, and Vision-Language models.",
    items: [
      {
        id: "proj-row-vidvision",
        title: "VidVision3D — Markerless Motion Capture",
        badge: "Hero • 3D MoCap & Kinematics",
        desc: "<strong>Problem:</strong> Traditional MoCap demands multi-camera optical studios and costly sensor suits.<br><strong>System:</strong> Client-side platform converting monocular webcam feeds into animatable 3D skeletal armatures (.BVH export for Blender/Unity) & 2D puppet rigs.<br><strong>Contribution & Result:</strong> Built real-time BlazePose-to-Three.js kinematic retargeting and mathematical BVH joint serializer—cutting 3D animation turnaround and costs by 80% with zero cloud dependencies.",
        tech: ["Three.js", "BlazePose", "MediaPipe", "BVH Export", "React", "TypeScript", "Python", "Kinematics"],
        githubUrl: "https://github.com/ArpitKumarpy/VidVision3D1",
        deployedUrl: "https://vid-vision3-d1.vercel.app/",
        link: "https://vid-vision3-d1.vercel.app/",
        btnText: "Explore VidVision3D ↗",
        mockupTitle: "VidVision3D",
        mockupHud: "3D MoCap · Three.js"
      },
      {
        id: "proj-row-synapse",
        title: "Synapse: Multimodal Assistive Reading System",
        badge: "IEEE Xplore Scopus 2026",
        desc: "<strong>Problem:</strong> Assistive reading tools fail to detect real-time cognitive difficulty and reading fatigue in neurodivergent users.<br><strong>System:</strong> Privacy-first, browser-native assistive platform fusing gaze tracking with adaptive typographic scaffolding and TTS.<br><strong>Contribution & Result:</strong> Engineered the MediaPipe iris tracking pipeline, extracted behavioral gaze features from the ZuCo benchmark, and trained an XGBoost classifier achieving <strong>0.9989 AUC</strong> for cognitive difficulty prediction.",
        tech: ["Eye Tracking", "XGBoost", "IEEE Xplore", "MediaPipe", "ZuCo Benchmark", "React", "TypeScript"],
        githubUrl: "https://github.com/ArpitKumarpy/Dyslexia",
        deployedUrl: "https://dyslexia-alpha.vercel.app/",
        link: "https://dyslexia-alpha.vercel.app/",
        btnText: "Explore Synapse ↗",
        mockupTitle: "Synapse AI",
        mockupHud: "0.9989 AUC · Eye Tracking"
      },
      {
        id: "proj-row-skybook",
        title: "SkyBook — Airline Booking & Fleet Platform",
        badge: "Production Systems • Full-Stack",
        desc: "<strong>Problem:</strong> Airline booking platforms demand robust concurrent seating, instant ticketing, and granular fleet administration.<br><strong>System:</strong> High-performance full-stack flight operations platform with live route search, seat matrix allocation, and ticketing workflows.<br><strong>Contribution & Result:</strong> Designed end-to-end REST APIs, client transactional state management, dynamic aircraft cabin matrices, and automated PDF boarding pass generation.",
        tech: ["React", "JavaScript", "Vite", "Node.js", "REST APIs", "TailwindCSS", "State Management"],
        githubUrl: "https://github.com/ArpitKumarpy/Skybook_Flights",
        deployedUrl: "https://skybook-flights.onrender.com",
        link: "https://skybook-flights.onrender.com",
        btnText: "Explore SkyBook ↗",
        mockupTitle: "SkyBook",
        mockupHud: "Flights · Seat Matrix"
      },
      {
        id: "proj-row-smarttracker",
        title: "Smart Tracker — Personal Productivity & Wellness",
        badge: "Android • Kotlin & Jetpack Compose",
        desc: "<strong>Problem:</strong> Fragmented apps for routines, nutrition, and finance compromise user privacy with unencrypted cloud tracking.<br><strong>System:</strong> Local-first Android suite with automated schedule duration splitting, calorie & hydration logging, and double-entry accounting.<br><strong>Contribution & Result:</strong> Architected Clean Architecture MVVM layers, reactive Jetpack Compose UI, and zero-leak offline persistence via encrypted Room SQLite.",
        tech: ["Kotlin", "Jetpack Compose", "Room SQLite", "Android SDK", "Clean Architecture", "Local-First"],
        githubUrl: "https://github.com/ArpitKumarpy/Smart-Tracker",
        deployedUrl: "",
        link: "https://github.com/ArpitKumarpy/Smart-Tracker",
        btnText: "Explore Smart Tracker ↗",
        mockupTitle: "Smart Tracker",
        mockupHud: "Android · Compose M3"
      },
      {
        id: "proj-row-emotion",
        title: "Multimodal Emotion Recognition System",
        badge: "Deep Learning • Audio / Vision / NLP",
        desc: "<strong>Problem:</strong> Unimodal sentiment models fail when interpreting subtle sarcasm, voice inflections, or mixed facial expressions.<br><strong>System:</strong> Low-latency GPU inference pipeline fusing acoustic pitch, facial action units, and semantic textual embeddings.<br><strong>Contribution & Result:</strong> Trained CNNs on RAVDESS with Librosa MFCC acoustic extraction on TensorFlow/CUDA, fusing Wav2Vec2, DeepFace, and Transformers for robust multimodal inference.",
        tech: ["TensorFlow 2.10", "PyTorch", "Wav2Vec2", "DeepFace", "OpenCV", "Librosa", "CUDA"],
        githubUrl: "https://github.com/ArpitKumarpy",
        deployedUrl: "",
        link: "https://github.com/ArpitKumarpy",
        btnText: "Explore Emotion AI ↗",
        mockupTitle: "Emotion AI",
        mockupHud: "Voice + Vision + NLP"
      }
    ]
  },
  skills: {
    titleMain: "TECHNICAL",
    titleGhost: "SKILLS",
    bio: "Structured across core AI/CV depth, production engineering systems, and frontier research exploration.",
    categories: [
      {
        id: "skill-group-core",
        category: "Core AI & Computer Vision",
        items: [
          "Python",
          "Computer Vision (OpenCV)",
          "MediaPipe & BlazePose",
          "PyTorch & TensorFlow",
          "Deep Learning",
          "3D Kinematics & MoCap",
          "XGBoost",
          "ML Pipeline Architecture"
        ]
      },
      {
        id: "skill-group-systems",
        category: "Production Systems & Engineering",
        items: [
          "React & TypeScript",
          "Android (Kotlin · Jetpack Compose)",
          "FastAPI & Node.js",
          "Three.js & WebGL",
          "Room SQLite & PostgreSQL",
          "REST APIs & State Management",
          "Docker & Git"
        ]
      },
      {
        id: "skill-group-research",
        category: "Research, VLMs & Cloud GPUs",
        items: [
          "VLMs (LayoutLMv3, Qwen)",
          "Cloud GPUs (CUDA, RunPod.io)",
          "CVAT Dataset Annotation",
          "Multimodal Audio/Vision Fusion",
          "ZuCo Gaze Benchmarks",
          "LLM Fine-tuning"
        ]
      }
    ]
  },
  experience: {
    titleMain: "WORK",
    titleGhost: "EXPERIENCE",
    bio: "Track record across AI enterprise solutions, published Scopus research, patent inventions, and hackathons.",
    items: [
      {
        id: "exp-card-coforge",
        role: "Engineer — Full Stack Developer",
        company: "Coforge Ltd. — Greater Noida",
        period: "May 2026 – Present",
        badge: "Full-Time",
        badgeClass: "exp-badge-fulltime",
        points: [
          "Joined as Engineer in May 2026; completed intensive engineering training in September 2026 and transitioned to full-time Engineer.",
          "Architecting, developing, and maintaining high-performance full-stack web applications using React, Node.js, Express, and RESTful APIs.",
          "Implementing scalable database models (MySQL, MongoDB, PostgreSQL) and driving code quality standards within Agile/Scrum sprint workflows."
        ],
        tags: ["Full-Time", "React", "Node.js", "Express", "REST APIs", "MySQL", "MongoDB", "Agile / Git"]
      },
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
          "Utilized cloud GPUs on RunPod.io and handled cloud resource management and workflow formulation.",
          "Consulted and assisted in problem-solving, workflow formulation, and project management."
        ],
        tags: ["LayoutLMV3", "QWEN3", "vLLM", "RunPod.io", "CVAT", "PaddleOCR-VL"]
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
          "Analyzed visual and contextual data to identify inconsistencies and optimize dataset structure for training.",
          "Collaborated in refining dataset schemas and training pipelines for downstream spatial models."
        ],
        tags: ["Detectron2", "YOLOv8x", "CVAT", "Computer Vision", "Dataset Structuring"]
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
          "Engineered serverless attention tracking via MediaPipe and trained XGBoost on the ZuCo dataset (0.9989 AUC via behavioral gaze features).",
          "Integrated word-level scaffolding, sentence simplification, and text-to-speech within a unified React/TypeScript architecture."
        ],
        tags: ["IEEE Xplore", "ZuCo Dataset", "XGBoost", "Eye Tracking", "MediaPipe"]
      },
      {
        id: "exp-card-patent",
        role: "Patent Inventor",
        company: "Indian Patent Office",
        period: "App No: 202211074491",
        badge: "Patent",
        badgeClass: "exp-badge-patent",
        points: [
          "Invented 'A Virtual Body Augmented with AI Assistant' — investigating 3D embodiment, multi-sensor input fusion, and conversational AI agents.",
          "Designed architecture bridging spatial avatars with contextual real-time intelligence."
        ],
        tags: ["Patent", "3D Avatar", "AI Assistant", "Sensory Fusion", "Virtual Embodiment"]
      }/*,
      {
        id: "exp-card-honors",
        role: "Hackathons, Education & Certifications",
        company: "IMS Engineering College & IIT Madras (Online)",
        period: "2022 – 2026",
        badge: "Honors & BS",
        badgeClass: "exp-badge-honors",
        points: [
          "B.Tech CSE (AI & ML) at IMS Engineering College (CGPA: 7.04/10; 2022–2026).",
          "Currently pursuing BS in Data Science & Applications online from IIT Madras (Passed Foundation, currently in Diploma Level).",
          "Senior Secondary CBSE from Greenfields Public School, Delhi (84.4%, Stream: PCM CS).",
          "Led teams across 7 national hackathons; Finalist at Smart India Hackathon (SIH 2024) and Vihaan 8.0 (DTU).",
          "British Council English C1 Advanced (577/600); Placement Coordinator; Advanced training at IIT Bombay (AI/ML) & IIT BHU (Python)."
        ],
        tags: ["IIT Madras (Online)", "SIH 2024", "Vihaan 8.0", "C1 Advanced", "Placement Coordinator"]
      }*/
    ]
  },
  contact: {
    titleMain: "GET IN",
    titleGhost: "TOUCH",
    bio: "Always open to discussing Computer Vision pipelines, 3D interactive graphics, research collaborations, and engineering roles.",
    intro: "Always open to discussing Computer Vision, 3D interactive graphics, and deep learning systems. Connect with me directly:",
    resume: {
      label: "View Resume / CV",
      href: "./assets/resume.pdf",
      badge: "PDF ↗"
    },
    status: {
      liveText: "Open for Opportunities",
      details: "Available for AI & Computer Vision engineering roles, 3D interactive graphics, research collaborations, and ambitious builds. Feel free to reach out directly."
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
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-3 8H8v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8-4H8v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>`,
        label: "Resume / CV",
        value: "View & Download PDF",
        href: "./assets/resume.pdf",
        type: "resume"
      }
    ]
  },
  customSections: {}
};

const PORTFOLIO_SCHEMA_VERSION = "18.0";

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
        try { localStorage.removeItem("arpit_portfolio_data"); } catch (_) { }
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
