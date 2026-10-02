/* ============================================================================
   ARPIT'S PORTFOLIO — renderers.js
   Dynamic Stream Section Renderers (About Bento, Projects, Skills, Exp, Contact)
   ============================================================================ */

import { DATA } from "./data.js";
import { applySectionReaction } from "./sections.js";
import {
  setupAboutBentoInteractions,
  setupProjectsStreamInteractions,
  setupSkillsStreamInteractions,
  setupExperienceStreamInteractions,
  setupContactStreamInteractions,
  attachCardReactions
} from "./interactions.js";

export function renderAboutBento() {
  const container = document.getElementById("about-section-container");
  if (!container || !DATA.about) return;
  const ab = DATA.about;
  const titleMain = container.querySelector(".about-bento-title-main");
  if (titleMain && ab.titleMain && ab.titleMain !== "SOFTWARE") titleMain.textContent = ab.titleMain;
  const titleGhost = container.querySelector(".about-bento-title-ghost");
  if (titleGhost && ab.titleGhost && ab.titleGhost !== "ENGINEER") titleGhost.textContent = ab.titleGhost;
  const bio = container.querySelector(".about-bento-bio");
  if (bio && (ab.bio || ab.intro)) bio.textContent = ab.bio || ab.intro;

  // Dynamically update card titles/subtitles without breaking cyber-glass markup
  const eduCard = document.getElementById("bento-card-education");
  if (eduCard && ab.bentoCards && ab.bentoCards[0]) {
    const c = ab.bentoCards[0];
    const t = eduCard.querySelector(".bento-card-title-white");
    if (t && c.badge) t.textContent = c.badge;
  }

  const expCard = document.getElementById("bento-card-experience");
  if (expCard && ab.bentoCards && ab.bentoCards[1]) {
    const c = ab.bentoCards[1];
    const t = expCard.querySelector(".bento-card-title-black");
    if (t && (c.badge || c.title)) t.textContent = c.badge || c.title;
  }

  const achCard = document.getElementById("bento-card-achievements");
  if (achCard && ab.bentoCards && ab.bentoCards[2]) {
    const c = ab.bentoCards[2];
    const t = achCard.querySelector(".bento-card-title-black");
    if (t && (c.badge || c.title)) t.textContent = c.badge || c.title;
  }

  const prjCard = document.getElementById("bento-card-creative");
  if (prjCard && ab.bentoCards && ab.bentoCards[3]) {
    const c = ab.bentoCards[3];
    const badgeEl = prjCard.querySelector(".bento-card-title-white");
    if (badgeEl && c.badge) badgeEl.textContent = c.badge;
    const nameEl = prjCard.querySelector(".bento-project-name");
    if (nameEl && c.title) nameEl.textContent = c.title;
    const subEl = prjCard.querySelector(".bento-project-subtitle");
    if (subEl && c.subtitle) subEl.textContent = c.subtitle;
    const linkUrl = c.link || "https://skybook-flights.onrender.com";
    prjCard.dataset.link = linkUrl;
    const labelEl = prjCard.querySelector(".bento-project-link-label");
    if (labelEl) {
      if (labelEl.tagName.toLowerCase() === "a") labelEl.href = linkUrl;
      const textSpan = labelEl.querySelector("span:last-child") || labelEl;
      if (c.tag) textSpan.textContent = c.tag;
    }
    const arrowLink = prjCard.querySelector(".bento-btn-arrow");
    if (arrowLink && arrowLink.tagName && arrowLink.tagName.toLowerCase() === "a") {
      arrowLink.href = linkUrl;
    }
  }

  const list = container.querySelector(".bento-summary-list");
  const bullets = ab.summaryBullets || ab.lines || [];
  if (list && bullets.length) {
    list.innerHTML = bullets.map(b => `
      <li>
        <span class="bento-bullet">✦</span>
        <span>${b}</span>
      </li>
    `).join("");
  }

  setupAboutBentoInteractions();
}

export function renderProjectsStream() {
  const container = document.getElementById("projects-section-container");
  if (!container || !DATA.projects) return;
  const pr = DATA.projects;
  const titleMain = container.querySelector(".projects-stream-title-main");
  if (titleMain && pr.titleMain) titleMain.textContent = pr.titleMain;
  const titleGhost = container.querySelector(".projects-stream-title-ghost");
  if (titleGhost && pr.titleGhost) titleGhost.textContent = pr.titleGhost;
  const bio = container.querySelector(".projects-stream-bio");
  if (bio && pr.bio) bio.textContent = pr.bio;

  const list = container.querySelector(".projects-stream-list");
  const items = Array.isArray(pr) ? pr : (pr.items || []);
  if (list && items.length) {
    const previews = [
      {
        theme: 'project-thumb-purple',
        dot: 'mockup-dot',
        hud: 'BlazePose · Unity',
        visual: `
          <svg viewBox="0 0 100 90" class="mockup-mocap-svg">
            <circle cx="50" cy="18" r="7" fill="none" stroke="#A855F7" stroke-width="2.5"></circle>
            <line x1="50" y1="25" x2="50" y2="52" stroke="#00F0FF" stroke-width="2.5"></line>
            <line x1="50" y1="32" x2="28" y2="44" stroke="#00F0FF" stroke-width="2.2"></line>
            <line x1="28" y1="44" x2="20" y2="30" stroke="#00F0FF" stroke-width="2"></line>
            <line x1="50" y1="32" x2="72" y2="44" stroke="#00F0FF" stroke-width="2.2"></line>
            <line x1="72" y1="44" x2="80" y2="30" stroke="#00F0FF" stroke-width="2"></line>
            <line x1="50" y1="52" x2="36" y2="76" stroke="#A855F7" stroke-width="2.2"></line>
            <line x1="50" y1="52" x2="64" y2="76" stroke="#A855F7" stroke-width="2.2"></line>
            <circle cx="20" cy="30" r="2.5" fill="#B4FF3B"></circle>
            <circle cx="80" cy="30" r="2.5" fill="#B4FF3B"></circle>
          </svg>
        `
      },
      {
        theme: 'project-thumb-teal',
        dot: 'mockup-dot dot-teal',
        hud: '0.9989 AUC Gaze Model',
        visual: `
          <div class="mockup-doc-lines">
            <span class="doc-line dl-1"></span>
            <span class="doc-line dl-2"></span>
            <span class="doc-line dl-3"></span>
          </div>
        `
      },
      {
        theme: 'project-thumb-blue',
        dot: 'mockup-dot dot-teal',
        hud: 'Flights · Seat Matrix',
        visual: `
          <div class="mockup-flight-grid" style="display:flex; flex-direction:column; gap:3px; width:52px; margin:auto;">
            <div style="display:flex; justify-content:space-between; font-size:0.48rem; color:#00F0FF; font-family:monospace; line-height:1;">
              <span>DEL</span><span>✈</span><span>BOM</span>
            </div>
            <div style="display:grid; grid-template-columns:repeat(5, 7px); gap:2px; justify-content:center;">
              <span style="width:7px; height:7px; background:rgba(0,240,255,0.4); border-radius:1px;"></span>
              <span style="width:7px; height:7px; background:rgba(0,240,255,0.85); border-radius:1px;"></span>
              <span style="width:7px; height:7px; background:rgba(255,184,48,0.85); border-radius:1px;"></span>
              <span style="width:7px; height:7px; background:rgba(0,240,255,0.85); border-radius:1px;"></span>
              <span style="width:7px; height:7px; background:rgba(0,240,255,0.4); border-radius:1px;"></span>
            </div>
          </div>
        `
      },
      {
        theme: 'project-thumb-pink',
        dot: 'mockup-dot dot-pink',
        hud: 'Voice + Vision + NLP',
        visual: `
          <div class="mockup-wave-bars">
            <span class="w-bar wb-1"></span>
            <span class="w-bar wb-2"></span>
            <span class="w-bar wb-3"></span>
            <span class="w-bar wb-4"></span>
            <span class="w-bar wb-5"></span>
          </div>
        `
      },
      {
        theme: 'project-thumb-amber',
        dot: 'mockup-dot dot-amber',
        hud: 'LayoutLMV3 · QWEN3',
        visual: `
          <div class="mockup-vlm-grid">
            <span class="vlm-box-outline"></span>
            <span class="vlm-box-highlight"></span>
          </div>
        `
      }
    ];

    const previewMap = {
      'proj-row-skybook': previews[2],
      'proj-row-synapse': previews[1],
      'proj-row-vidvision': previews[0],
      'proj-row-emotion': previews[3],
      'proj-row-vlm': previews[4]
    };

    list.innerHTML = items.map((p, idx) => {
      const cleanTitle = p.title.replace(/\s*—\s*Markerless Motion Capture/i, "");
      const rowId = p.id || (cleanTitle.toLowerCase().includes("skybook") ? 'proj-row-skybook' : (cleanTitle.toLowerCase().includes("synapse") ? 'proj-row-synapse' : (cleanTitle.toLowerCase().includes("vidvision") ? 'proj-row-vidvision' : (cleanTitle.toLowerCase().includes("emotion") ? 'proj-row-emotion' : 'proj-row-vlm'))));
      const pv = previewMap[rowId] || previews[idx % previews.length];
      const tagsList = (p.tech || p.tags || []).filter(t => t !== "TestTag1");
      const tagsHtml = tagsList.map(t => `<span class="stream-tag">${t}</span>`).join("");

      const deployedUrl = (p.deployedUrl || "").trim();
      const githubUrl = (p.githubUrl || (p.link && p.link.includes("github") ? p.link : "")).trim();
      const isLive = Boolean(deployedUrl);
      const primaryUrl = isLive ? deployedUrl : (githubUrl || p.link || "#");
      const hasGithub = Boolean(githubUrl);

      return `
        <article class="project-stream-row" id="${rowId}" data-target-url="${primaryUrl}" data-github-url="${githubUrl}" data-deployed-url="${deployedUrl}" data-is-live="${isLive ? 'true' : 'false'}" data-link="${primaryUrl}" role="button" tabindex="0" title="${cleanTitle} — ${isLive ? 'Open Live Demo' : 'Explore Project'}">
          <div class="project-thumb-frame ${pv.theme}">
            <div class="thumb-mockup-screen">
              <div class="mockup-top-bar">
                <span class="${pv.dot}"></span>
                <span class="mockup-title">${p.mockupTitle || cleanTitle}</span>
              </div>
              <div class="mockup-body">
                <div class="mockup-visual-preview">
                  ${pv.visual}
                </div>
                <div class="mockup-status-badge">${p.mockupHud || pv.hud}</div>
              </div>
            </div>
          </div>
          <div class="project-row-info">
            <div class="project-row-header">
              <div class="project-title-wrap">
                <h3 class="project-row-title">${cleanTitle}</h3>
                ${p.badge ? `<span class="project-card-badge">${p.badge}</span>` : ''}
              </div>
              <div class="project-actions-group">
                ${hasGithub ? `
                  <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="project-btn-gh" data-gh-link="${githubUrl}" title="View source repository on GitHub">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                ` : ''}
                <a href="${primaryUrl}" target="_blank" rel="noopener noreferrer" class="project-btn-explore ${isLive ? 'is-live' : 'is-preview'}" data-target-url="${primaryUrl}" title="${isLive ? 'Open live deployed web app' : 'Explore project'}">
                  ${isLive ? `<span class="live-dot"></span><span>Live Demo ↗</span>` : `<span>Explore ↗</span>`}
                </a>
              </div>
            </div>
            <p class="project-row-desc">${p.desc}</p>
            <div class="project-row-tags">
              ${tagsHtml}
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  setupProjectsStreamInteractions();
}

export function renderSkillsStream() {
  const container = document.getElementById("skills-section-container");
  if (!container || !DATA.skills) return;
  const sk = DATA.skills;
  const titleMain = container.querySelector(".skills-stream-title-main");
  if (titleMain && sk.titleMain) titleMain.textContent = sk.titleMain;
  const titleGhost = container.querySelector(".skills-stream-title-ghost");
  if (titleGhost && sk.titleGhost) titleGhost.textContent = sk.titleGhost;
  const bio = container.querySelector(".skills-stream-bio");
  if (bio && sk.bio) bio.textContent = sk.bio;

  const metricsBar = container.querySelector(".skills-metrics-bar");
  if (metricsBar && sk.metrics) {
    metricsBar.innerHTML = sk.metrics.map(m => `
      <div class="skills-metric-pill">
        <span class="metric-icon">${m.icon || '✦'}</span>
        <span class="metric-val">${m.val || ''}</span>
        <span class="metric-lbl">${m.lbl || ''}</span>
      </div>
    `).join("");
  }

  const list = container.querySelector(".skills-stream-list");
  const cats = Array.isArray(sk) ? sk : (sk.categories || []);
  if (list && cats.length) {
    list.innerHTML = cats.map(cat => {
      const itemsHtml = (cat.items || []).map(item => `
        <div class="skill-progress-item">
          <div class="skill-item-header">
            <span class="skill-name">${item.name}</span>
            <span class="skill-percent">${item.level}%</span>
          </div>
          <div class="skill-track">
            <div class="skill-fill skill-fill-gold" data-level="${item.level}" style="width: ${item.level}%;"></div>
          </div>
        </div>
      `).join("");

      const tagsList = cat.tags || [];
      const tagsHtml = tagsList.map(t => `<span class="stream-tag">${t}</span>`).join("");

      return `
        <div class="skill-category-card" id="${cat.id || ''}">
          <div class="skill-card-top">
            <div class="skill-cat-title-wrap">
              <span class="skill-cat-icon">${cat.icon || '⚡'}</span>
              <h3 class="skill-cat-heading">${cat.category}</h3>
            </div>
            <span class="skill-cat-badge">${cat.badge || 'Speciality'}</span>
          </div>
          <div class="skill-progress-list">
            ${itemsHtml}
          </div>
          ${tagsHtml ? `<div class="skill-tags-row">${tagsHtml}</div>` : ''}
        </div>
      `;
    }).join("");
  }

  setupSkillsStreamInteractions();
}

export function renderExperienceStream() {
  const container = document.getElementById("experience-section-container");
  if (!container || !DATA.experience) return;
  const exp = DATA.experience;
  const titleMain = container.querySelector(".experience-stream-title-main");
  if (titleMain && exp.titleMain) titleMain.textContent = exp.titleMain;
  const titleGhost = container.querySelector(".experience-stream-title-ghost");
  if (titleGhost && exp.titleGhost) titleGhost.textContent = exp.titleGhost;
  const bio = container.querySelector(".experience-stream-bio");
  if (bio && exp.bio) bio.textContent = exp.bio;

  const list = container.querySelector(".experience-stream-list");
  const items = Array.isArray(exp) ? exp : (exp.items || []);
  if (list && items.length) {
    list.innerHTML = items.map(e => {
      const pointsHtml = (e.points || []).map(pt => `
        <li><span class="exp-bullet">›</span> <span>${pt}</span></li>
      `).join("");

      const tagsList = e.tags || [];
      const tagsHtml = tagsList.map(t => `<span class="stream-tag">${t}</span>`).join("");

      return `
        <article class="experience-stream-card" id="${e.id || ''}">
          <div class="exp-card-header">
            <div class="exp-card-title-group">
              <h3 class="exp-card-role">${e.role}</h3>
              <h4 class="exp-card-company">${e.company}</h4>
            </div>
            <div class="exp-card-meta">
              <span class="exp-badge ${e.badgeClass || 'exp-badge-industry'}">${e.badge || 'Experience'}</span>
              <span class="exp-period">${e.period || ''}</span>
            </div>
          </div>
          <ul class="exp-points-list">
            ${pointsHtml}
          </ul>
          ${tagsHtml ? `<div class="exp-tags-row">${tagsHtml}</div>` : ''}
        </article>
      `;
    }).join("");
  }

  setupExperienceStreamInteractions();
}

export function renderContactStream() {
  const container = document.getElementById("contact-section-container");
  if (!container || !DATA.contact) return;
  const ct = DATA.contact;
  const titleMain = container.querySelector(".contact-stream-title-main");
  if (titleMain && ct.titleMain) titleMain.textContent = ct.titleMain;
  const titleGhost = container.querySelector(".contact-stream-title-ghost");
  if (titleGhost && ct.titleGhost) titleGhost.textContent = ct.titleGhost;
  const bio = container.querySelector(".contact-stream-bio");
  if (bio && ct.bio) bio.textContent = ct.bio;

  if (ct.status) {
    const liveText = container.querySelector(".status-live-text");
    if (liveText && ct.status.liveText) liveText.textContent = ct.status.liveText;
    const details = container.querySelector(".status-details");
    if (details && ct.status.details) details.textContent = ct.status.details;
  }

  if (ct.form) {
    const badge = container.querySelector(".connect-form-badge");
    if (badge && ct.form.badge) badge.textContent = ct.form.badge;
    const title = container.querySelector(".connect-form-title");
    if (title && ct.form.title) title.textContent = ct.form.title;
    const hint = container.querySelector(".connect-form-hint");
    if (hint && ct.form.hint) hint.textContent = ct.form.hint;
    const sub = container.querySelector(".connect-form-sub");
    if (sub && ct.form.sub) sub.textContent = ct.form.sub;
    const btnText = container.querySelector(".submit-btn-text");
    if (btnText && ct.form.submitBtnText) btnText.textContent = ct.form.submitBtnText;
  }

  const grid = container.querySelector(".contact-quick-grid");
  if (grid && ct.channels && ct.channels.length) {
    grid.innerHTML = ct.channels.map(ch => `
      <a class="contact-mini-card" id="${ch.id}" href="${ch.href}" target="_blank" rel="noopener">
        <div class="contact-mini-icon ${ch.iconClass || 'icon-frame-teal'}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            ${ch.iconSvg || '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>'}
          </svg>
        </div>
        <div class="contact-mini-info">
          <div class="contact-mini-top">
            <span class="contact-mini-label">${ch.label}</span>
            <span class="contact-mini-arrow">↗</span>
          </div>
          <span class="contact-mini-val">${ch.val}</span>
        </div>
      </a>
    `).join("");
  }

  setupContactStreamInteractions();
}

export function renderAllStreams() {
  renderAboutBento();
  renderProjectsStream();
  renderSkillsStream();
  renderExperienceStream();
  renderContactStream();
}

function renderSection(sec) {
  const el = document.getElementById("section-content");
  if (!el) return;
  el.innerHTML = "";
  const d = DATA;
  const delay = (i, base = 0.05, step = 0.08) => `animation-delay:${base + i * step}s`;

  if (sec === "about") {
    el.innerHTML = `
      <p class="about-intro">${d.about.intro}</p>
      
      <div class="about-highlights-grid">
        ${(d.about.highlights || []).map((h, i) => `
          <div class="highlight-card" style="${delay(i, .08, .06)}">
            <span class="highlight-label">${h.label}</span>
            <span class="highlight-val">${h.val}</span>
          </div>
        `).join("")}
      </div>

      <hr class="about-divider"/>
      ${(d.about.lines || []).map((l, i) => `
        <div class="about-prompt-line" style="${delay(i, .14)}">
          <span class="prompt">&gt;</span><span>${l}</span>
        </div>`).join("")}
      
      <hr class="about-divider"/>
      <p class="section-label" style="${delay(5, .32)}">focus &amp; passions ✦</p>
      <div class="taste-grid">
        ${(d.about.likes || []).map((l, i) => `
          <div class="about-prompt-line" style="${delay(i, .36)}">
            <span class="prompt">—</span><span>${l}</span>
          </div>`).join("")}
      </div>
    `;
  }

  else if (sec === "projects") {
    el.innerHTML = `
      <div class="projects-grid">
        ${(d.projects || []).map((p, i) => `
          <div class="project-card" style="${delay(i, .05, .1)}">
            <div class="project-header">
              <div class="project-title">${p.title}</div>
              ${p.badge ? `<span class="project-badge">${p.badge}</span>` : ""}
            </div>
            <p class="project-desc">${p.desc}</p>
            <div class="tech-tags">${(p.tech || []).map(t => `<span class="tech-tag">${t}</span>`).join("")}</div>
            ${p.link && p.link !== "#" ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">${p.btnText || "view project →"}</a>` : ""}
          </div>`).join("")}
      </div>`;
  }

  else if (sec === "skills") {
    let animIdx = 0;
    el.innerHTML = `
      <div class="skills-categories">
        ${(Array.isArray(d.skills) ? d.skills : (d.skills && d.skills.categories ? d.skills.categories : [])).map((cat) => `
          <div class="skill-category">
            <div class="skill-cat-title">&gt; ${cat.category}</div>
            <div class="skills-list">
              ${(cat.items || []).map((s) => {
      const itemHtml = `
                  <div class="skill-item" style="${delay(animIdx, .04, .06)}">
                    <div class="skill-header">
                      <span class="skill-name">${s.name}</span>
                      <span class="skill-level">${s.level}%</span>
                    </div>
                    <div class="skill-bar-bg">
                      <div class="skill-bar-fill" data-lv="${s.level}"></div>
                    </div>
                  </div>`;
      animIdx++;
      return itemHtml;
    }).join("")}
            </div>
          </div>
        `).join("")}
      </div>`;
    setTimeout(() => {
      document.querySelectorAll(".skill-bar-fill").forEach(b => { b.style.width = b.dataset.lv + "%"; });
    }, 120);
  }

  else if (sec === "experience") {
    el.innerHTML = `
      <div class="experience-list">
        ${(d.experience || []).map((e, i) => `
          <div class="experience-card" style="${delay(i, .05, .09)}">
            <div class="exp-header">
              <div>
                <div class="exp-role">${e.role}</div>
                <div class="exp-company">${e.company}</div>
              </div>
              <div class="exp-meta">
                <span class="exp-badge">${e.badge}</span>
                <span class="exp-period">${e.period}</span>
              </div>
            </div>
            <ul class="exp-points">
              ${(e.points || []).map(pt => `<li><span class="prompt">&gt;</span> <span>${pt}</span></li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>`;
  }

  else if (sec === "contact") {
    el.innerHTML = `
      <p class="contact-intro">${d.contact ? d.contact.intro : ''}</p>
      <div class="contact-links">
        ${((d.contact && d.contact.links) || []).map((lk, i) => `
          <a class="contact-link" href="${lk.href}" target="_blank" rel="noopener" style="${delay(i, .1, .09)}">
            <span class="contact-icon">${lk.icon}</span>
            <div>
              <div class="contact-label">${lk.label}</div>
              <div class="contact-value">${lk.value}</div>
            </div>
            <span class="contact-arrow">→</span>
          </a>`).join("")}
      </div>`;
  }

  else if (d.customSections && d.customSections[sec]) {
    const cs = d.customSections[sec];
    el.innerHTML = `
      <div class="custom-section-pane" style="animation: line-in .4s ease both;">
        <h3 style="font-size: 1.15rem; color: var(--teal); margin-bottom: 12px; font-weight: 600;">${cs.title || ''}</h3>
        <div style="font-size: 0.88rem; line-height: 1.65; color: var(--text-white); white-space: pre-wrap;">${cs.content || ''}</div>
      </div>
    `;
  }

  // 1. Trigger the unique 3D model reaction, pose, camera framing, lighting, and FX
  applySectionReaction(sec, true);

  // 2. Attach interactive card hover and micro-reactions
  attachCardReactions(sec);
}

function setTab(sec) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  const el = document.querySelector(`.tab[data-section="${sec}"]`);
  if (el) el.classList.add("active");
}

export { renderSection, setTab };
