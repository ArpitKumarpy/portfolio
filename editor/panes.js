/* ============================================================================
   PORTFOLIO STUDIO — panes.js
   Dynamic Editor Panes for All Sections, Tags, Cards & Security
   ============================================================================ */

import {
  activeData,
  currentActiveTab,
  STORAGE_KEY_HASH,
  clone
} from "./state.js";
import { sha256, hashPassword } from "./auth.js";
import { showToast } from "./studio-ui.js";

  // ============================================================================
  function renderTagChipsHtml(tags, type, parentIdx) {
    const tagsArr = tags || [];
    const colorClass = type === 'projects' ? '' : type === 'skills' ? 'ped-tag-gold' : 'ped-tag-purple';
    return `
      <div class="ped-tags-wrap" data-type="${type}" data-pidx="${parentIdx}">
        ${tagsArr.map((t, tidx) => `
          <span class="ped-tag-chip ${colorClass}">
            <span>${t}</span>
            <button type="button" class="ped-tag-chip-del" data-type="${type}" data-pidx="${parentIdx}" data-tidx="${tidx}" title="Remove tag">✕</button>
          </span>
        `).join("")}
        ${tagsArr.length === 0 ? `<span style="font-size:0.7rem; color:rgba(240,235,244,0.35);">No tags added yet.</span>` : ''}
      </div>
      <div class="ped-tag-add-row">
        <input type="text" class="ped-input ped-tag-add-input" data-type="${type}" data-pidx="${parentIdx}" placeholder="Add tag (e.g. PyTorch)..." />
        <button type="button" class="ped-btn ped-btn-ghost ped-btn-sm ped-tag-add-btn" data-type="${type}" data-pidx="${parentIdx}">+ Add</button>
      </div>
    `;
  }

  function attachTagEventListeners(container, tagsGetter) {
    container.querySelectorAll(".ped-tag-chip-del").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.dataset.type;
        const pidx = parseInt(btn.dataset.pidx);
        const tidx = parseInt(btn.dataset.tidx);
        const tags = tagsGetter(type, pidx);
        if (tags && tags.length > tidx) {
          tags.splice(tidx, 1);
          renderActivePane();
        }
      });
    });

    container.querySelectorAll(".ped-tag-add-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.dataset.type;
        const pidx = parseInt(btn.dataset.pidx);
        const input = container.querySelector(`.ped-tag-add-input[data-type="${type}"][data-pidx="${pidx}"]`);
        if (input && input.value.trim()) {
          const tags = tagsGetter(type, pidx);
          if (tags) {
            const newTags = input.value.split(",").map(s => s.trim()).filter(Boolean);
            newTags.forEach(nt => {
              if (!tags.includes(nt)) tags.push(nt);
            });
            input.value = "";
            renderActivePane();
          }
        }
      });
    });

    container.querySelectorAll(".ped-tag-add-input").forEach(inp => {
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const type = inp.dataset.type;
          const pidx = parseInt(inp.dataset.pidx);
          const btn = container.querySelector(`.ped-tag-add-btn[data-type="${type}"][data-pidx="${pidx}"]`);
          if (btn) btn.click();
        }
      });
    });
  }


  function renderNavigationPane(container) {
    const sections = activeData.sections || [];
    if (!activeData.contact) activeData.contact = {};
    if (!activeData.contact.form) activeData.contact.form = {};
    if (!activeData.about) activeData.about = {};
    if (!activeData.about.bentoCards) activeData.about.bentoCards = [];

    container.innerHTML = `
      <div class="ped-pane active">
        <div class="ped-pane-header">
          <div>
            <h3>Navigation Buttons &amp; Action Labels</h3>
            <p>Customize every floating navigation pill, symbols, and interactive action buttons.</p>
          </div>
          <button class="ped-btn ped-btn-primary ped-btn-sm" id="ped-add-section-btn">+ Add Section Button</button>
        </div>

        <div class="ped-items-list" id="ped-sections-list">
          ${sections.map((sec, idx) => `
            <div class="ped-item-card" data-idx="${idx}">
              <div class="ped-item-card-header">
                <div class="ped-item-card-title">
                  <span style="color: #00F5D4; font-size: 1.1rem;">${sec.icon || '✦'}</span>
                  <span>${sec.label}</span>
                  <span style="font-size: 0.7rem; color: rgba(240,235,244,0.4); font-family: monospace;">(#${sec.id})</span>
                </div>
                <div class="ped-item-tools">
                  ${idx > 0 ? `<button class="ped-tool-btn ped-sec-up" data-idx="${idx}">↑ Up</button>` : ''}
                  ${idx < sections.length - 1 ? `<button class="ped-tool-btn ped-sec-down" data-idx="${idx}">↓ Down</button>` : ''}
                  <button class="ped-tool-btn ped-btn-danger ped-sec-del" data-idx="${idx}">✕ Delete</button>
                </div>
              </div>
              <div class="ped-form-row">
                <div class="ped-form-group">
                  <label class="ped-label">Button Title / Label</label>
                  <input type="text" class="ped-input ped-sec-label" data-idx="${idx}" value="${sec.label || ''}" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Symbol / Icon</label>
                  <input type="text" class="ped-input ped-sec-icon" data-idx="${idx}" value="${sec.icon || ''}" placeholder="e.g. ✦, ◈, ⚡, 💼, ✉" />
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="ped-pane-header" style="margin-top: 28px; padding-bottom: 6px;">
          <div>
            <h3>Global Action Button Texts</h3>
            <p>Configure action button labels across all interactive stream sections.</p>
          </div>
        </div>

        <div class="ped-form-row">
          <div class="ped-form-group">
            <label class="ped-label">Contact "Send Direct Message" Button Label</label>
            <input type="text" class="ped-input" id="ped-contact-submit-btn-text" value="${activeData.contact.form.submitBtnText || 'Send Direct Message'}" />
          </div>
          <div class="ped-form-group">
            <label class="ped-label">About Bento Project Card Action Tag</label>
            <input type="text" class="ped-input" id="ped-about-card4-tag" value="${(activeData.about.bentoCards[3] && activeData.about.bentoCards[3].tag) || 'Live Repo ↗'}" />
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll(".ped-sec-label").forEach(inp => {
      inp.addEventListener("input", (e) => sections[e.target.dataset.idx].label = e.target.value);
    });
    container.querySelectorAll(".ped-sec-icon").forEach(inp => {
      inp.addEventListener("input", (e) => sections[e.target.dataset.idx].icon = e.target.value);
    });
    container.querySelectorAll(".ped-sec-up").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        const temp = sections[i];
        sections[i] = sections[i - 1];
        sections[i - 1] = temp;
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-sec-down").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        const temp = sections[i];
        sections[i] = sections[i + 1];
        sections[i + 1] = temp;
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-sec-del").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        if (confirm(`Delete button "${sections[i].label}"?`)) {
          sections.splice(i, 1);
          renderActivePane();
        }
      });
    });
    container.querySelector("#ped-add-section-btn").addEventListener("click", () => {
      const label = prompt("Enter button label:", "New Section");
      if (!label) return;
      const id = label.toLowerCase().replace(/[^a-z0-9]/g, "-") || `sec-${Date.now()}`;
      sections.push({ id, label, icon: "✦" });
      renderActivePane();
    });

    const contactSubmitInp = document.getElementById("ped-contact-submit-btn-text");
    if (contactSubmitInp) {
      contactSubmitInp.addEventListener("input", (e) => activeData.contact.form.submitBtnText = e.target.value);
    }
    const card4TagInp = document.getElementById("ped-about-card4-tag");
    if (card4TagInp) {
      card4TagInp.addEventListener("input", (e) => {
        if (activeData.about.bentoCards[3]) activeData.about.bentoCards[3].tag = e.target.value;
      });
    }
  }

  // 2. Universal Tags Manager Pane
  function renderTagsPane(container) {
    const projList = Array.isArray(activeData.projects) ? activeData.projects : (activeData.projects?.items || []);
    const skillCats = Array.isArray(activeData.skills) ? activeData.skills : (activeData.skills?.categories || []);
    const expItems = Array.isArray(activeData.experience) ? activeData.experience : (activeData.experience?.items || []);

    container.innerHTML = `
      <div class="ped-pane active">
        <div class="ped-pane-header">
          <div>
            <h3>Universal Tags Manager</h3>
            <p>Directly manage all tech tags, skill chips, and experience tags across every card in the portfolio.</p>
          </div>
        </div>

        <div class="ped-pane-header" style="margin-top: 14px; padding-bottom: 6px;">
          <div>
            <h3 style="font-size: 0.95rem; color: #00F5D4;">🚀 Projects Tech Tags</h3>
            <p>Tags displayed on each project stream card.</p>
          </div>
        </div>

        <div class="ped-items-list">
          ${projList.map((p, idx) => `
            <div class="ped-item-card">
              <div class="ped-item-card-header">
                <div class="ped-item-card-title">
                  <span>${p.title}</span>
                  <span class="ped-badge">${p.badge || 'Project'}</span>
                </div>
              </div>
              <div class="ped-form-group">
                <label class="ped-label">Interactive Tags Chips</label>
                ${renderTagChipsHtml(p.tech || p.tags, 'projects', idx)}
              </div>
              <div class="ped-form-group" style="margin-top: 6px;">
                <label class="ped-label">Edit Raw Comma-Separated</label>
                <input type="text" class="ped-input ped-raw-tags-input" data-type="projects" data-pidx="${idx}" value="${(p.tech || p.tags || []).join(', ')}" />
              </div>
            </div>
          `).join("")}
        </div>

        <div class="ped-pane-header" style="margin-top: 24px; padding-bottom: 6px;">
          <div>
            <h3 style="font-size: 0.95rem; color: #FFB830;">📊 Skills Category Tags</h3>
            <p>Tags displayed on each technical skill category card.</p>
          </div>
        </div>

        <div class="ped-items-list">
          ${skillCats.map((cat, idx) => `
            <div class="ped-item-card">
              <div class="ped-item-card-header">
                <div class="ped-item-card-title">
                  <span style="color:#FFB830;">${cat.icon || '⚡'}</span>
                  <span>${cat.category}</span>
                </div>
              </div>
              <div class="ped-form-group">
                <label class="ped-label">Interactive Tags Chips</label>
                ${renderTagChipsHtml(cat.tags, 'skills', idx)}
              </div>
              <div class="ped-form-group" style="margin-top: 6px;">
                <label class="ped-label">Edit Raw Comma-Separated</label>
                <input type="text" class="ped-input ped-raw-tags-input" data-type="skills" data-pidx="${idx}" value="${(cat.tags || []).join(', ')}" />
              </div>
            </div>
          `).join("")}
        </div>

        <div class="ped-pane-header" style="margin-top: 24px; padding-bottom: 6px;">
          <div>
            <h3 style="font-size: 0.95rem; color: #BA68FF;">💼 Experience Tags</h3>
            <p>Tags displayed on each work experience and publication card.</p>
          </div>
        </div>

        <div class="ped-items-list">
          ${expItems.map((e, idx) => `
            <div class="ped-item-card">
              <div class="ped-item-card-header">
                <div class="ped-item-card-title">
                  <span>${e.role}</span>
                  <span style="color: #BA68FF; font-size: 0.8rem;">@ ${e.company}</span>
                </div>
              </div>
              <div class="ped-form-group">
                <label class="ped-label">Interactive Tags Chips</label>
                ${renderTagChipsHtml(e.tags, 'experience', idx)}
              </div>
              <div class="ped-form-group" style="margin-top: 6px;">
                <label class="ped-label">Edit Raw Comma-Separated</label>
                <input type="text" class="ped-input ped-raw-tags-input" data-type="experience" data-pidx="${idx}" value="${(e.tags || []).join(', ')}" />
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    const getTagsArr = (type, pidx) => {
      if (type === 'projects') {
        const item = projList[pidx];
        if (!item.tech && !item.tags) item.tech = [];
        return item.tech || item.tags;
      } else if (type === 'skills') {
        const item = skillCats[pidx];
        if (!item.tags) item.tags = [];
        return item.tags;
      } else if (type === 'experience') {
        const item = expItems[pidx];
        if (!item.tags) item.tags = [];
        return item.tags;
      }
      return null;
    };

    attachTagEventListeners(container, getTagsArr);

    container.querySelectorAll(".ped-raw-tags-input").forEach(inp => {
      inp.addEventListener("input", (e) => {
        const type = e.target.dataset.type;
        const pidx = parseInt(e.target.dataset.pidx);
        const tags = getTagsArr(type, pidx);
        if (tags) {
          const parsed = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
          tags.length = 0;
          parsed.forEach(t => tags.push(t));
        }
      });
    });
  }

  // 3. About & Bento Cards Pane
  function renderAboutPane(container) {
    const ab = activeData.about || {};
    if (!ab.bentoCards) ab.bentoCards = [];
    if (!ab.summaryBullets && !ab.lines) ab.summaryBullets = [];
    const bullets = ab.summaryBullets || ab.lines || [];

    container.innerHTML = `
      <div class="ped-pane active">
        <div class="ped-pane-header">
          <div>
            <h3>About Section &amp; Bento Cards</h3>
            <p>Customize section titles, bio, 4 interactive Bento cards, and summary points.</p>
          </div>
        </div>

        <div class="ped-form-row">
          <div class="ped-form-group">
            <label class="ped-label">Main Header (e.g. ABOUT)</label>
            <input type="text" class="ped-input" id="ped-ab-title-main" value="${ab.titleMain || 'ABOUT'}" />
          </div>
          <div class="ped-form-group">
            <label class="ped-label">Ghost Header (e.g. ME)</label>
            <input type="text" class="ped-input" id="ped-ab-title-ghost" value="${ab.titleGhost || 'ME'}" />
          </div>
        </div>

        <div class="ped-form-group">
          <label class="ped-label">Subtitle / Bio Paragraph</label>
          <textarea class="ped-textarea" id="ped-ab-bio" style="min-height: 70px;">${ab.bio || ab.intro || ''}</textarea>
        </div>

        <div class="ped-pane-header" style="margin-top: 24px; padding-bottom: 6px;">
          <div>
            <h3>4 Interactive Bento Cards</h3>
            <p>Edit title, subtitle, badge chip, tag, icon, and link for each Bento card.</p>
          </div>
        </div>

        <div class="ped-items-list">
          ${ab.bentoCards.map((c, i) => `
            <div class="ped-item-card" data-cidx="${i}">
              <div class="ped-item-card-header">
                <div class="ped-item-card-title">
                  <span style="font-size: 1.1rem;">${c.icon || '✦'}</span>
                  <span>Card #${i + 1}: ${c.title}</span>
                </div>
              </div>
              <div class="ped-form-row">
                <div class="ped-form-group">
                  <label class="ped-label">Card Title</label>
                  <input type="text" class="ped-input ped-bento-title" data-cidx="${i}" value="${c.title || ''}" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Badge Chip (e.g. Degree &amp; College)</label>
                  <input type="text" class="ped-input ped-bento-badge" data-cidx="${i}" value="${c.badge || ''}" />
                </div>
              </div>
              <div class="ped-form-row">
                <div class="ped-form-group">
                  <label class="ped-label">Subtitle / Description</label>
                  <input type="text" class="ped-input ped-bento-subtitle" data-cidx="${i}" value="${c.subtitle || ''}" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Footer Tag (e.g. Dual Pursuit, Live Repo ↗)</label>
                  <input type="text" class="ped-input ped-bento-tag" data-cidx="${i}" value="${c.tag || ''}" />
                </div>
              </div>
              <div class="ped-form-row">
                <div class="ped-form-group">
                  <label class="ped-label">Icon (Emoji or Symbol)</label>
                  <input type="text" class="ped-input ped-bento-icon" data-cidx="${i}" value="${c.icon || ''}" style="max-width: 100px;" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">External Destination Link (Optional)</label>
                  <input type="text" class="ped-input ped-bento-link" data-cidx="${i}" value="${c.link || ''}" placeholder="https://github.com/..." />
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="ped-pane-header" style="margin-top: 24px; padding-bottom: 6px;">
          <div>
            <h3>Summary Bullet Points</h3>
            <p>Key highlights rendered with ✦ bullets under the Bento grid.</p>
          </div>
          <button class="ped-btn ped-btn-ghost ped-btn-sm" id="ped-add-bullet-btn">+ Add Bullet</button>
        </div>

        <div class="ped-items-list" id="ped-bullets-list">
          ${bullets.map((b, i) => `
            <div style="display: flex; gap: 8px; margin-bottom: 8px; align-items: center;">
              <span style="color: #00F5D4; font-weight: bold;">✦</span>
              <input type="text" class="ped-input ped-bento-bullet" data-bidx="${i}" value="${b || ''}" style="flex: 1;" />
              <button class="ped-tool-btn ped-btn-danger ped-bullet-del" data-bidx="${i}">✕</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("ped-ab-title-main").addEventListener("input", (e) => ab.titleMain = e.target.value);
    document.getElementById("ped-ab-title-ghost").addEventListener("input", (e) => ab.titleGhost = e.target.value);
    document.getElementById("ped-ab-bio").addEventListener("input", (e) => {
      ab.bio = e.target.value;
      ab.intro = e.target.value;
    });

    container.querySelectorAll(".ped-bento-title").forEach(inp => {
      inp.addEventListener("input", (e) => ab.bentoCards[e.target.dataset.cidx].title = e.target.value);
    });
    container.querySelectorAll(".ped-bento-badge").forEach(inp => {
      inp.addEventListener("input", (e) => ab.bentoCards[e.target.dataset.cidx].badge = e.target.value);
    });
    container.querySelectorAll(".ped-bento-subtitle").forEach(inp => {
      inp.addEventListener("input", (e) => ab.bentoCards[e.target.dataset.cidx].subtitle = e.target.value);
    });
    container.querySelectorAll(".ped-bento-tag").forEach(inp => {
      inp.addEventListener("input", (e) => ab.bentoCards[e.target.dataset.cidx].tag = e.target.value);
    });
    container.querySelectorAll(".ped-bento-icon").forEach(inp => {
      inp.addEventListener("input", (e) => ab.bentoCards[e.target.dataset.cidx].icon = e.target.value);
    });
    container.querySelectorAll(".ped-bento-link").forEach(inp => {
      inp.addEventListener("input", (e) => ab.bentoCards[e.target.dataset.cidx].link = e.target.value);
    });

    container.querySelectorAll(".ped-bento-bullet").forEach(inp => {
      inp.addEventListener("input", (e) => bullets[e.target.dataset.bidx] = e.target.value);
    });
    container.querySelectorAll(".ped-bullet-del").forEach(btn => {
      btn.addEventListener("click", () => {
        bullets.splice(parseInt(btn.dataset.bidx), 1);
        renderActivePane();
      });
    });
    container.querySelector("#ped-add-bullet-btn").addEventListener("click", () => {
      bullets.push("New technical milestone or accomplishment detail.");
      renderActivePane();
    });
  }

  // 4. Projects & Action Buttons Pane
  function renderProjectsPane(container) {
    if (!activeData.projects) activeData.projects = { items: [] };
    const pr = activeData.projects;
    const items = Array.isArray(pr) ? pr : (pr.items || []);

    container.innerHTML = `
      <div class="ped-pane active">
        <div class="ped-pane-header">
          <div>
            <h3>Projects Management</h3>
            <p>Add, edit, reorder or subtract project cards, badge chips, tech tags, and action buttons.</p>
          </div>
          <button class="ped-btn ped-btn-primary ped-btn-sm" id="ped-add-project-btn">+ Add New Project</button>
        </div>

        <div class="ped-form-row">
          <div class="ped-form-group">
            <label class="ped-label">Main Header (e.g. FEATURED)</label>
            <input type="text" class="ped-input" id="ped-proj-title-main" value="${pr.titleMain || 'FEATURED'}" />
          </div>
          <div class="ped-form-group">
            <label class="ped-label">Ghost Header (e.g. PROJECTS)</label>
            <input type="text" class="ped-input" id="ped-proj-title-ghost" value="${pr.titleGhost || 'PROJECTS'}" />
          </div>
        </div>

        <div class="ped-form-group">
          <label class="ped-label">Section Bio Paragraph</label>
          <textarea class="ped-textarea" id="ped-proj-bio" style="min-height: 56px;">${pr.bio || ''}</textarea>
        </div>

        <div class="ped-items-list" style="margin-top: 14px;">
          ${items.map((p, idx) => `
            <div class="ped-item-card" data-idx="${idx}">
              <div class="ped-item-card-header">
                <div class="ped-item-card-title">
                  <span style="color: #00F5D4;">&gt;</span>
                  <span>${p.title || 'Untitled Project'}</span>
                  ${p.badge ? `<span class="ped-badge" style="margin-left: 8px;">${p.badge}</span>` : ''}
                </div>
                <div class="ped-item-tools">
                  ${idx > 0 ? `<button class="ped-tool-btn ped-proj-up" data-idx="${idx}">↑ Up</button>` : ''}
                  ${idx < items.length - 1 ? `<button class="ped-tool-btn ped-proj-down" data-idx="${idx}">↓ Down</button>` : ''}
                  <button class="ped-tool-btn ped-btn-danger ped-proj-del" data-idx="${idx}">✕ Delete</button>
                </div>
              </div>

              <div class="ped-form-row">
                <div class="ped-form-group">
                  <label class="ped-label">Project Title</label>
                  <input type="text" class="ped-input ped-proj-title" data-idx="${idx}" value="${p.title || ''}" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Badge Label (e.g. Featured • CV &amp; 3D)</label>
                  <input type="text" class="ped-input ped-proj-badge" data-idx="${idx}" value="${p.badge || ''}" />
                </div>
              </div>

              <div class="ped-form-group">
                <label class="ped-label">Project Description</label>
                <textarea class="ped-textarea ped-proj-desc" data-idx="${idx}">${p.desc || ''}</textarea>
              </div>

              <div class="ped-form-row">
                <div class="ped-form-group">
                  <label class="ped-label">Action Button Title (e.g. Explore VidVision3D1 ↗)</label>
                  <input type="text" class="ped-input ped-proj-btn" data-idx="${idx}" value="${p.btnText || 'Explore Project ↗'}" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Project Link URL</label>
                  <input type="text" class="ped-input ped-proj-link" data-idx="${idx}" value="${p.link || '#'}" />
                </div>
              </div>

              <div class="ped-form-row">
                <div class="ped-form-group">
                  <label class="ped-label">Mockup Screen Title</label>
                  <input type="text" class="ped-input ped-proj-mockup-title" data-idx="${idx}" value="${p.mockupTitle || ''}" placeholder="e.g. VidVision3D" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Mockup HUD Pill Text</label>
                  <input type="text" class="ped-input ped-proj-mockup-hud" data-idx="${idx}" value="${p.mockupHud || ''}" placeholder="e.g. 3D MoCap · MediaPipe" />
                </div>
              </div>

              <div class="ped-form-group">
                <label class="ped-label">Tech Tags</label>
                ${renderTagChipsHtml(p.tech || p.tags, 'projects', idx)}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("ped-proj-title-main").addEventListener("input", (e) => pr.titleMain = e.target.value);
    document.getElementById("ped-proj-title-ghost").addEventListener("input", (e) => pr.titleGhost = e.target.value);
    document.getElementById("ped-proj-bio").addEventListener("input", (e) => pr.bio = e.target.value);

    container.querySelectorAll(".ped-proj-title").forEach(inp => {
      inp.addEventListener("input", (e) => items[e.target.dataset.idx].title = e.target.value);
    });
    container.querySelectorAll(".ped-proj-badge").forEach(inp => {
      inp.addEventListener("input", (e) => items[e.target.dataset.idx].badge = e.target.value);
    });
    container.querySelectorAll(".ped-proj-desc").forEach(inp => {
      inp.addEventListener("input", (e) => items[e.target.dataset.idx].desc = e.target.value);
    });
    container.querySelectorAll(".ped-proj-btn").forEach(inp => {
      inp.addEventListener("input", (e) => items[e.target.dataset.idx].btnText = e.target.value);
    });
    container.querySelectorAll(".ped-proj-link").forEach(inp => {
      inp.addEventListener("input", (e) => items[e.target.dataset.idx].link = e.target.value);
    });
    container.querySelectorAll(".ped-proj-mockup-title").forEach(inp => {
      inp.addEventListener("input", (e) => items[e.target.dataset.idx].mockupTitle = e.target.value);
    });
    container.querySelectorAll(".ped-proj-mockup-hud").forEach(inp => {
      inp.addEventListener("input", (e) => items[e.target.dataset.idx].mockupHud = e.target.value);
    });

    container.querySelectorAll(".ped-proj-up").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        const temp = items[i];
        items[i] = items[i - 1];
        items[i - 1] = temp;
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-proj-down").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        const temp = items[i];
        items[i] = items[i + 1];
        items[i + 1] = temp;
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-proj-del").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        if (confirm(`Delete project "${items[i].title}"?`)) {
          items.splice(i, 1);
          renderActivePane();
        }
      });
    });
    container.querySelector("#ped-add-project-btn").addEventListener("click", () => {
      items.unshift({
        id: `proj-row-${Date.now()}`,
        title: "New AI Project",
        badge: "Computer Vision",
        desc: "High-performance pipeline trained on custom datasets with real-time inference.",
        tech: ["Python", "PyTorch", "OpenCV"],
        btnText: "Explore Project ↗",
        link: "https://github.com/ArpitKumarpy",
        mockupTitle: "Project Demo",
        mockupHud: "Live Inference"
      });
      renderActivePane();
    });

    attachTagEventListeners(container, (type, pidx) => {
      const item = items[pidx];
      if (!item.tech && !item.tags) item.tech = [];
      return item.tech || item.tags;
    });
  }

  // 5. Skills, Metrics & Bars Pane
  function renderSkillsPane(container) {
    if (!activeData.skills) activeData.skills = { categories: [] };
    const sk = activeData.skills;
    const cats = Array.isArray(sk) ? sk : (sk.categories || []);
    if (!sk.metrics) sk.metrics = [];

    container.innerHTML = `
      <div class="ped-pane active">
        <div class="ped-pane-header">
          <div>
            <h3>Skills &amp; Quick Metrics Bar</h3>
            <p>Customize metric pills, skill category cards, progress bars, percentages, and skill tags.</p>
          </div>
          <button class="ped-btn ped-btn-primary ped-btn-sm" id="ped-add-cat-btn">+ Add Category Card</button>
        </div>

        <div class="ped-form-row">
          <div class="ped-form-group">
            <label class="ped-label">Main Header (e.g. TECHNICAL)</label>
            <input type="text" class="ped-input" id="ped-sk-title-main" value="${sk.titleMain || 'TECHNICAL'}" />
          </div>
          <div class="ped-form-group">
            <label class="ped-label">Ghost Header (e.g. SKILLS)</label>
            <input type="text" class="ped-input" id="ped-sk-title-ghost" value="${sk.titleGhost || 'SKILLS'}" />
          </div>
        </div>

        <div class="ped-form-group">
          <label class="ped-label">Section Bio Paragraph</label>
          <textarea class="ped-textarea" id="ped-sk-bio" style="min-height: 56px;">${sk.bio || ''}</textarea>
        </div>

        <div class="ped-pane-header" style="margin-top: 18px; padding-bottom: 6px;">
          <div>
            <h3>Quick Metrics Bar Pills</h3>
            <p>The 3 prominent metric highlights above the category cards.</p>
          </div>
        </div>

        <div class="ped-form-row">
          ${sk.metrics.map((m, mi) => `
            <div class="ped-item-card" style="padding: 10px;">
              <div class="ped-form-row">
                <input type="text" class="ped-input ped-metric-val" data-midx="${mi}" value="${m.val || ''}" placeholder="95%" style="flex:1;" />
                <input type="text" class="ped-input ped-metric-icon" data-midx="${mi}" value="${m.icon || '✦'}" placeholder="Icon" style="width:50px;" />
              </div>
              <input type="text" class="ped-input ped-metric-lbl" data-midx="${mi}" value="${m.lbl || ''}" placeholder="Max Proficiency" style="margin-top:6px;" />
            </div>
          `).join("")}
        </div>

        <div class="ped-pane-header" style="margin-top: 24px; padding-bottom: 6px;">
          <div>
            <h3>Skill Categories List</h3>
            <p>Category cards with progress bars and category tags.</p>
          </div>
        </div>

        <div class="ped-items-list">
          ${cats.map((cat, cIdx) => `
            <div class="ped-item-card" data-cidx="${cIdx}" style="border-left-color: #FFB830;">
              <div class="ped-item-card-header">
                <div class="ped-item-card-title">
                  <span style="color: #FFB830; font-size: 1.1rem;">${cat.icon || '⚡'}</span>
                  <span>${cat.category || 'Category'}</span>
                  ${cat.badge ? `<span class="ped-badge">${cat.badge}</span>` : ''}
                </div>
                <div class="ped-item-tools">
                  ${cIdx > 0 ? `<button class="ped-tool-btn ped-cat-up" data-cidx="${cIdx}">↑ Up</button>` : ''}
                  ${cIdx < cats.length - 1 ? `<button class="ped-tool-btn ped-cat-down" data-cidx="${cIdx}">↓ Down</button>` : ''}
                  <button class="ped-btn ped-btn-ghost ped-btn-sm ped-add-skill-btn" data-cidx="${cIdx}">+ Add Skill</button>
                  <button class="ped-tool-btn ped-btn-danger ped-cat-del" data-cidx="${cIdx}">✕</button>
                </div>
              </div>

              <div class="ped-form-row">
                <div class="ped-form-group">
                  <label class="ped-label">Category Title</label>
                  <input type="text" class="ped-input ped-cat-title" data-cidx="${cIdx}" value="${cat.category || ''}" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Badge Label (e.g. Core Speciality)</label>
                  <input type="text" class="ped-input ped-cat-badge" data-cidx="${cIdx}" value="${cat.badge || ''}" />
                </div>
                <div class="ped-form-group" style="max-width: 90px;">
                  <label class="ped-label">Icon</label>
                  <input type="text" class="ped-input ped-cat-icon" data-cidx="${cIdx}" value="${cat.icon || '⚡'}" />
                </div>
              </div>

              <div class="ped-form-group">
                <label class="ped-label">Skill Items &amp; Percentage</label>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${(cat.items || []).map((skItem, sIdx) => `
                    <div style="display: flex; gap: 10px; align-items: center; background: rgba(0,0,0,0.25); padding: 8px 10px; border-radius: 6px;">
                      <input type="text" class="ped-input ped-sk-name" data-cidx="${cIdx}" data-sidx="${sIdx}" value="${skItem.name || ''}" style="flex: 1;" placeholder="Skill Name" />
                      <div style="display: flex; align-items: center; gap: 6px; width: 140px;">
                        <input type="range" class="ped-sk-range" data-cidx="${cIdx}" data-sidx="${sIdx}" min="10" max="100" value="${skItem.level || 85}" style="flex: 1;" />
                        <span style="font-family: monospace; font-size: 0.8rem; width: 34px; color: #FFB830;">${skItem.level || 85}%</span>
                      </div>
                      <button class="ped-tool-btn ped-btn-danger ped-sk-del" data-cidx="${cIdx}" data-sidx="${sIdx}">✕</button>
                    </div>
                  `).join("")}
                </div>
              </div>

              <div class="ped-form-group">
                <label class="ped-label">Category Tags</label>
                ${renderTagChipsHtml(cat.tags, 'skills', cIdx)}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("ped-sk-title-main").addEventListener("input", (e) => sk.titleMain = e.target.value);
    document.getElementById("ped-sk-title-ghost").addEventListener("input", (e) => sk.titleGhost = e.target.value);
    document.getElementById("ped-sk-bio").addEventListener("input", (e) => sk.bio = e.target.value);

    container.querySelectorAll(".ped-metric-val").forEach(inp => {
      inp.addEventListener("input", (e) => sk.metrics[e.target.dataset.midx].val = e.target.value);
    });
    container.querySelectorAll(".ped-metric-icon").forEach(inp => {
      inp.addEventListener("input", (e) => sk.metrics[e.target.dataset.midx].icon = e.target.value);
    });
    container.querySelectorAll(".ped-metric-lbl").forEach(inp => {
      inp.addEventListener("input", (e) => sk.metrics[e.target.dataset.midx].lbl = e.target.value);
    });

    container.querySelectorAll(".ped-cat-title").forEach(inp => {
      inp.addEventListener("input", (e) => cats[e.target.dataset.cidx].category = e.target.value);
    });
    container.querySelectorAll(".ped-cat-badge").forEach(inp => {
      inp.addEventListener("input", (e) => cats[e.target.dataset.cidx].badge = e.target.value);
    });
    container.querySelectorAll(".ped-cat-icon").forEach(inp => {
      inp.addEventListener("input", (e) => cats[e.target.dataset.cidx].icon = e.target.value);
    });

    container.querySelectorAll(".ped-sk-name").forEach(inp => {
      inp.addEventListener("input", (e) => {
        cats[e.target.dataset.cidx].items[e.target.dataset.sidx].name = e.target.value;
      });
    });
    container.querySelectorAll(".ped-sk-range").forEach(rng => {
      rng.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        cats[e.target.dataset.cidx].items[e.target.dataset.sidx].level = val;
        e.target.nextElementSibling.textContent = `${val}%`;
      });
    });
    container.querySelectorAll(".ped-sk-del").forEach(btn => {
      btn.addEventListener("click", () => {
        cats[btn.dataset.cidx].items.splice(parseInt(btn.dataset.sidx), 1);
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-add-skill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!cats[btn.dataset.cidx].items) cats[btn.dataset.cidx].items = [];
        cats[btn.dataset.cidx].items.push({ name: "New Skill", level: 90 });
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-cat-up").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.cidx);
        const temp = cats[i];
        cats[i] = cats[i - 1];
        cats[i - 1] = temp;
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-cat-down").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.cidx);
        const temp = cats[i];
        cats[i] = cats[i + 1];
        cats[i + 1] = temp;
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-cat-del").forEach(btn => {
      btn.addEventListener("click", () => {
        if (confirm("Delete this skill category?")) {
          cats.splice(parseInt(btn.dataset.cidx), 1);
          renderActivePane();
        }
      });
    });
    container.querySelector("#ped-add-cat-btn").addEventListener("click", () => {
      cats.push({
        id: `skill-cat-${Date.now()}`,
        category: "New Skill Speciality",
        badge: "Expertise",
        icon: "⚡",
        items: [{ name: "Example Skill", level: 90 }],
        tags: ["SkillTag1", "SkillTag2"]
      });
      renderActivePane();
    });

    attachTagEventListeners(container, (type, pidx) => {
      const cat = cats[pidx];
      if (!cat.tags) cat.tags = [];
      return cat.tags;
    });
  }

  // 6. Experience & Timeline Pane
  function renderExperiencePane(container) {
    if (!activeData.experience) activeData.experience = { items: [] };
    const expObj = activeData.experience;
    const exp = Array.isArray(expObj) ? expObj : (expObj.items || []);

    container.innerHTML = `
      <div class="ped-pane active">
        <div class="ped-pane-header">
          <div>
            <h3>Experience &amp; Timeline Management</h3>
            <p>Manage roles, organizations, dates, badges, bullet points, and experience tags.</p>
          </div>
          <button class="ped-btn ped-btn-primary ped-btn-sm" id="ped-add-exp-btn">+ Add Experience Card</button>
        </div>

        <div class="ped-form-row">
          <div class="ped-form-group">
            <label class="ped-label">Main Header (e.g. WORK)</label>
            <input type="text" class="ped-input" id="ped-exp-title-main" value="${expObj.titleMain || 'WORK'}" />
          </div>
          <div class="ped-form-group">
            <label class="ped-label">Ghost Header (e.g. EXPERIENCE)</label>
            <input type="text" class="ped-input" id="ped-exp-title-ghost" value="${expObj.titleGhost || 'EXPERIENCE'}" />
          </div>
        </div>

        <div class="ped-form-group">
          <label class="ped-label">Section Bio Paragraph</label>
          <textarea class="ped-textarea" id="ped-exp-bio" style="min-height: 56px;">${expObj.bio || ''}</textarea>
        </div>

        <div class="ped-items-list" style="margin-top: 14px;">
          ${exp.map((e, idx) => `
            <div class="ped-item-card" data-idx="${idx}">
              <div class="ped-item-card-header">
                <div class="ped-item-card-title">
                  <span>${e.role || 'Role'}</span>
                  <span style="color: #BA68FF; font-size: 0.8rem; font-weight: normal;">@ ${e.company || ''}</span>
                  ${e.badge ? `<span class="ped-badge">${e.badge}</span>` : ''}
                </div>
                <div class="ped-item-tools">
                  ${idx > 0 ? `<button class="ped-tool-btn ped-exp-up" data-idx="${idx}">↑ Up</button>` : ''}
                  ${idx < exp.length - 1 ? `<button class="ped-tool-btn ped-exp-down" data-idx="${idx}">↓ Down</button>` : ''}
                  <button class="ped-tool-btn ped-btn-danger ped-exp-del" data-idx="${idx}">✕ Delete</button>
                </div>
              </div>

              <div class="ped-form-row">
                <div class="ped-form-group">
                  <label class="ped-label">Role Title</label>
                  <input type="text" class="ped-input ped-exp-role" data-idx="${idx}" value="${e.role || ''}" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Company / Organization</label>
                  <input type="text" class="ped-input ped-exp-company" data-idx="${idx}" value="${e.company || ''}" />
                </div>
              </div>

              <div class="ped-form-row">
                <div class="ped-form-group">
                  <label class="ped-label">Period / Dates</label>
                  <input type="text" class="ped-input ped-exp-period" data-idx="${idx}" value="${e.period || ''}" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Badge Chip (e.g. Industry, Publication, Patent, Honors)</label>
                  <input type="text" class="ped-input ped-exp-badge" data-idx="${idx}" value="${e.badge || ''}" />
                </div>
              </div>

              <div class="ped-form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="ped-label" style="margin-bottom: 0;">Bullet Points</label>
                  <button class="ped-tool-btn ped-add-pt-btn" data-idx="${idx}">+ Add Bullet Point</button>
                </div>
                ${(e.points || []).map((pt, pIdx) => `
                  <div style="display: flex; gap: 6px; margin-bottom: 6px; align-items: center;">
                    <span style="color: #BA68FF; font-weight: bold;">›</span>
                    <input type="text" class="ped-input ped-exp-point" data-eidx="${idx}" data-pidx="${pIdx}" value="${pt || ''}" style="flex: 1;" />
                    <button class="ped-tool-btn ped-btn-danger ped-pt-del" data-eidx="${idx}" data-pidx="${pIdx}">✕</button>
                  </div>
                `).join("")}
              </div>

              <div class="ped-form-group">
                <label class="ped-label">Experience Tags</label>
                ${renderTagChipsHtml(e.tags, 'experience', idx)}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("ped-exp-title-main").addEventListener("input", (e) => expObj.titleMain = e.target.value);
    document.getElementById("ped-exp-title-ghost").addEventListener("input", (e) => expObj.titleGhost = e.target.value);
    document.getElementById("ped-exp-bio").addEventListener("input", (e) => expObj.bio = e.target.value);

    container.querySelectorAll(".ped-exp-role").forEach(inp => {
      inp.addEventListener("input", (e) => exp[e.target.dataset.idx].role = e.target.value);
    });
    container.querySelectorAll(".ped-exp-company").forEach(inp => {
      inp.addEventListener("input", (e) => exp[e.target.dataset.idx].company = e.target.value);
    });
    container.querySelectorAll(".ped-exp-period").forEach(inp => {
      inp.addEventListener("input", (e) => exp[e.target.dataset.idx].period = e.target.value);
    });
    container.querySelectorAll(".ped-exp-badge").forEach(inp => {
      inp.addEventListener("input", (e) => exp[e.target.dataset.idx].badge = e.target.value);
    });
    container.querySelectorAll(".ped-exp-point").forEach(inp => {
      inp.addEventListener("input", (e) => {
        exp[e.target.dataset.eidx].points[e.target.dataset.pidx] = e.target.value;
      });
    });

    container.querySelectorAll(".ped-add-pt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!exp[btn.dataset.idx].points) exp[btn.dataset.idx].points = [];
        exp[btn.dataset.idx].points.push("New technical outcome or responsibility milestone.");
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-pt-del").forEach(btn => {
      btn.addEventListener("click", () => {
        exp[btn.dataset.eidx].points.splice(parseInt(btn.dataset.pidx), 1);
        renderActivePane();
      });
    });

    container.querySelectorAll(".ped-exp-up").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        const temp = exp[i];
        exp[i] = exp[i - 1];
        exp[i - 1] = temp;
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-exp-down").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        const temp = exp[i];
        exp[i] = exp[i + 1];
        exp[i + 1] = temp;
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-exp-del").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        if (confirm(`Delete experience entry "${exp[i].role}"?`)) {
          exp.splice(i, 1);
          renderActivePane();
        }
      });
    });
    container.querySelector("#ped-add-exp-btn").addEventListener("click", () => {
      exp.unshift({
        id: `exp-card-${Date.now()}`,
        role: "New Role Title",
        company: "Organization Name",
        period: "2026",
        badge: "Industry",
        badgeClass: "exp-badge-industry",
        points: ["Key achievement or engineering responsibility."],
        tags: ["AI", "Computer Vision"]
      });
      renderActivePane();
    });

    attachTagEventListeners(container, (type, pidx) => {
      const item = exp[pidx];
      if (!item.tags) item.tags = [];
      return item.tags;
    });
  }

  // 7. Contact Section & Direct Form Pane
  function renderContactPane(container) {
    if (!activeData.contact) activeData.contact = {};
    const ct = activeData.contact;
    if (!ct.status) ct.status = {};
    if (!ct.form) ct.form = {};
    if (!ct.channels) ct.channels = [];

    container.innerHTML = `
      <div class="ped-pane active">
        <div class="ped-pane-header">
          <div>
            <h3>Contact Section &amp; Connect Form</h3>
            <p>Customize section titles, status availability card, direct email form card, and channels grid.</p>
          </div>
        </div>

        <div class="ped-form-row">
          <div class="ped-form-group">
            <label class="ped-label">Main Header (e.g. GET IN)</label>
            <input type="text" class="ped-input" id="ped-ct-title-main" value="${ct.titleMain || 'GET IN'}" />
          </div>
          <div class="ped-form-group">
            <label class="ped-label">Ghost Header (e.g. TOUCH)</label>
            <input type="text" class="ped-input" id="ped-ct-title-ghost" value="${ct.titleGhost || 'TOUCH'}" />
          </div>
        </div>

        <div class="ped-form-group">
          <label class="ped-label">Section Bio Paragraph</label>
          <textarea class="ped-textarea" id="ped-ct-bio" style="min-height: 56px;">${ct.bio || ct.intro || ''}</textarea>
        </div>

        <div class="ped-pane-header" style="margin-top: 20px; padding-bottom: 6px;">
          <div>
            <h3>Status Availability Card</h3>
            <p>The green pulse card indicating your job &amp; collaboration readiness.</p>
          </div>
        </div>

        <div class="ped-form-row">
          <div class="ped-form-group">
            <label class="ped-label">Live Status Text</label>
            <input type="text" class="ped-input" id="ped-ct-status-live" value="${ct.status.liveText || 'Open for Opportunities'}" />
          </div>
        </div>
        <div class="ped-form-group">
          <label class="ped-label">Availability Details</label>
          <textarea class="ped-textarea" id="ped-ct-status-details" style="min-height: 56px;">${ct.status.details || ''}</textarea>
        </div>

        <div class="ped-pane-header" style="margin-top: 24px; padding-bottom: 6px;">
          <div>
            <h3>"Let's Connect" Direct Email Form Card</h3>
            <p>Texts and button titles for the direct inbox transmission form.</p>
          </div>
        </div>

        <div class="ped-form-row">
          <div class="ped-form-group">
            <label class="ped-label">Form Badge Chip</label>
            <input type="text" class="ped-input" id="ped-ct-form-badge" value="${ct.form.badge || '⚡ DIRECT TRANSMISSION'}" />
          </div>
          <div class="ped-form-group">
            <label class="ped-label">Form Heading Title</label>
            <input type="text" class="ped-input" id="ped-ct-form-title" value="${ct.form.title || "Let's Connect"}" />
          </div>
        </div>

        <div class="ped-form-row">
          <div class="ped-form-group">
            <label class="ped-label">Form Top Hint</label>
            <input type="text" class="ped-input" id="ped-ct-form-hint" value="${ct.form.hint || 'Direct to inbox · Instant delivery'}" />
          </div>
          <div class="ped-form-group">
            <label class="ped-label">Submit Button Label</label>
            <input type="text" class="ped-input" id="ped-ct-form-btn" value="${ct.form.submitBtnText || 'Send Direct Message'}" />
          </div>
        </div>

        <div class="ped-form-group">
          <label class="ped-label">Form Subtitle Message</label>
          <input type="text" class="ped-input" id="ped-ct-form-sub" value="${ct.form.sub || 'Send a message directly to my email without needing an email app:'}" />
        </div>

        <div class="ped-pane-header" style="margin-top: 24px; padding-bottom: 6px;">
          <div>
            <h3>Direct Contact Channels Grid</h3>
            <p>The 4 mini cards (Email, LinkedIn, GitHub, Phone).</p>
          </div>
        </div>

        <div class="ped-items-list">
          ${ct.channels.map((ch, i) => `
            <div class="ped-item-card" style="padding: 12px;">
              <div class="ped-form-row">
                <div class="ped-form-group" style="max-width: 140px;">
                  <label class="ped-label">Channel Label</label>
                  <input type="text" class="ped-input ped-ch-label" data-cidx="${i}" value="${ch.label || ''}" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Handle / Value</label>
                  <input type="text" class="ped-input ped-ch-val" data-cidx="${i}" value="${ch.val || ''}" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Destination URL</label>
                  <input type="text" class="ped-input ped-ch-href" data-cidx="${i}" value="${ch.href || ''}" />
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("ped-ct-title-main").addEventListener("input", (e) => ct.titleMain = e.target.value);
    document.getElementById("ped-ct-title-ghost").addEventListener("input", (e) => ct.titleGhost = e.target.value);
    document.getElementById("ped-ct-bio").addEventListener("input", (e) => {
      ct.bio = e.target.value;
      ct.intro = e.target.value;
    });

    document.getElementById("ped-ct-status-live").addEventListener("input", (e) => ct.status.liveText = e.target.value);
    document.getElementById("ped-ct-status-details").addEventListener("input", (e) => ct.status.details = e.target.value);

    document.getElementById("ped-ct-form-badge").addEventListener("input", (e) => ct.form.badge = e.target.value);
    document.getElementById("ped-ct-form-title").addEventListener("input", (e) => ct.form.title = e.target.value);
    document.getElementById("ped-ct-form-hint").addEventListener("input", (e) => ct.form.hint = e.target.value);
    document.getElementById("ped-ct-form-sub").addEventListener("input", (e) => ct.form.sub = e.target.value);
    document.getElementById("ped-ct-form-btn").addEventListener("input", (e) => ct.form.submitBtnText = e.target.value);

    container.querySelectorAll(".ped-ch-label").forEach(inp => {
      inp.addEventListener("input", (e) => ct.channels[e.target.dataset.cidx].label = e.target.value);
    });
    container.querySelectorAll(".ped-ch-val").forEach(inp => {
      inp.addEventListener("input", (e) => ct.channels[e.target.dataset.cidx].val = e.target.value);
    });
    container.querySelectorAll(".ped-ch-href").forEach(inp => {
      inp.addEventListener("input", (e) => ct.channels[e.target.dataset.cidx].href = e.target.value);
    });
  }

  // 8. Social Dock (Floating) Pane
  function renderSocialsPane(container) {
    const ct = activeData.contact || { links: [] };
    if (!ct.links) ct.links = [];

    container.innerHTML = `
      <div class="ped-pane active">
        <div class="ped-pane-header">
          <div>
            <h3>Floating Social Dock</h3>
            <p>Customize the floating social icon buttons docked below the 3D model.</p>
          </div>
          <button class="ped-btn ped-btn-primary ped-btn-sm" id="ped-add-social-btn">+ Add Social Button</button>
        </div>

        <div class="ped-items-list">
          ${ct.links.map((lk, idx) => `
            <div class="ped-item-card" data-idx="${idx}">
              <div class="ped-item-card-header">
                <div class="ped-item-card-title">
                  <span style="color: #00F5D4;">✦</span>
                  <span>${lk.label || 'Link'}</span>
                  <span style="font-size: 0.72rem; color: #FFB830; font-family: monospace;">(${lk.value || ''})</span>
                </div>
                <div class="ped-item-tools">
                  ${idx > 0 ? `<button class="ped-tool-btn ped-soc-up" data-idx="${idx}">↑ Up</button>` : ''}
                  ${idx < ct.links.length - 1 ? `<button class="ped-tool-btn ped-soc-down" data-idx="${idx}">↓ Down</button>` : ''}
                  <button class="ped-tool-btn ped-btn-danger ped-soc-del" data-idx="${idx}">✕ Delete</button>
                </div>
              </div>

              <div class="ped-form-row">
                <div class="ped-form-group">
                  <label class="ped-label">Platform Label (Tooltip)</label>
                  <input type="text" class="ped-input ped-soc-label" data-idx="${idx}" value="${lk.label || ''}" />
                </div>
                <div class="ped-form-group">
                  <label class="ped-label">Display Handle / Text</label>
                  <input type="text" class="ped-input ped-soc-val" data-idx="${idx}" value="${lk.value || ''}" />
                </div>
              </div>

              <div class="ped-form-group">
                <label class="ped-label">Destination URL / href</label>
                <input type="text" class="ped-input ped-soc-href" data-idx="${idx}" value="${lk.href || ''}" placeholder="https://... or mailto:..." />
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    container.querySelectorAll(".ped-soc-label").forEach(inp => {
      inp.addEventListener("input", (e) => ct.links[e.target.dataset.idx].label = e.target.value);
    });
    container.querySelectorAll(".ped-soc-val").forEach(inp => {
      inp.addEventListener("input", (e) => ct.links[e.target.dataset.idx].value = e.target.value);
    });
    container.querySelectorAll(".ped-soc-href").forEach(inp => {
      inp.addEventListener("input", (e) => ct.links[e.target.dataset.idx].href = e.target.value);
    });

    container.querySelectorAll(".ped-soc-up").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        const temp = ct.links[i];
        ct.links[i] = ct.links[i - 1];
        ct.links[i - 1] = temp;
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-soc-down").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        const temp = ct.links[i];
        ct.links[i] = ct.links[i + 1];
        ct.links[i + 1] = temp;
        renderActivePane();
      });
    });
    container.querySelectorAll(".ped-soc-del").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.idx);
        if (confirm(`Remove ${ct.links[i].label} button?`)) {
          ct.links.splice(i, 1);
          renderActivePane();
        }
      });
    });
    container.querySelector("#ped-add-social-btn").addEventListener("click", () => {
      ct.links.push({
        label: "New Channel",
        value: "@handle",
        href: "https://",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>`
      });
      renderActivePane();
    });
  }

  // 9. Identity & Hero Pane
  function renderIdentityPane(container) {
    const amb = activeData.ambientTexts || [];
    container.innerHTML = `
      <div class="ped-pane active">
        <div class="ped-pane-header">
          <div>
            <h3>Hero, Name &amp; Ambient Floating Labels</h3>
            <p>Customize identity details, page title, tagline, and floating background words.</p>
          </div>
        </div>

        <div class="ped-form-row">
          <div class="ped-form-group">
            <label class="ped-label">Display Name</label>
            <input type="text" class="ped-input" id="ped-id-name" value="${activeData.name || ''}" />
          </div>
          <div class="ped-form-group">
            <label class="ped-label">Page Browser Title (&lt;title&gt;)</label>
            <input type="text" class="ped-input" id="ped-id-title" value="${activeData.pageTitle || 'Arpit Kumar — AI/ML & Computer Vision Developer'}" />
          </div>
        </div>

        <div class="ped-form-group">
          <label class="ped-label">Tagline / Subheading</label>
          <input type="text" class="ped-input" id="ped-id-tagline" value="${activeData.tagline || ''}" />
        </div>

        <div class="ped-form-group">
          <label class="ped-label">Name Title Graphic Asset URL</label>
          <input type="text" class="ped-input" id="ped-id-nametitle" value="${activeData.nameTitleSrc || './assets/nametitle.png'}" />
        </div>

        <div class="ped-pane-header" style="margin-top: 24px; padding-bottom: 6px;">
          <div>
            <h3 style="font-size: 1rem;">Ambient Floating Text Labels</h3>
            <p>The floating handwritten words drifting in the background space.</p>
          </div>
        </div>

        <div class="ped-form-row">
          ${amb.map((at, idx) => `
            <div class="ped-form-group">
              <label class="ped-label">Label #${idx + 1} (${at.id})</label>
              <input type="text" class="ped-input ped-amb-input" data-idx="${idx}" value="${at.text || ''}" />
            </div>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("ped-id-name").addEventListener("input", (e) => activeData.name = e.target.value);
    document.getElementById("ped-id-title").addEventListener("input", (e) => activeData.pageTitle = e.target.value);
    document.getElementById("ped-id-tagline").addEventListener("input", (e) => activeData.tagline = e.target.value);
    document.getElementById("ped-id-nametitle").addEventListener("input", (e) => activeData.nameTitleSrc = e.target.value);

    container.querySelectorAll(".ped-amb-input").forEach(inp => {
      inp.addEventListener("input", (e) => {
        amb[e.target.dataset.idx].text = e.target.value;
      });
    });
  }

  // 10. Security & Key Pane
  function renderSecurityPane(container) {
    container.innerHTML = `
      <div class="ped-pane active">
        <div class="ped-pane-header">
          <div>
            <h3>Studio Security &amp; Access Key</h3>
            <p>Change your private master access key. The password is hashed using irreversible SHA-256 before storing.</p>
          </div>
        </div>

        <div class="ped-item-card" style="max-width: 500px;">
          <div class="ped-form-group">
            <label class="ped-label">Enter New Access Key</label>
            <input type="password" class="ped-input" id="ped-new-pass" placeholder="New master password..." />
          </div>
          <div class="ped-form-group">
            <label class="ped-label">Confirm New Access Key</label>
            <input type="password" class="ped-input" id="ped-confirm-pass" placeholder="Confirm password..." />
          </div>
          <div style="display: flex; gap: 10px; margin-top: 14px;">
            <button class="ped-btn ped-btn-primary" id="ped-btn-save-pass">Update Security Key</button>
            <button class="ped-btn ped-btn-ghost ped-btn-sm" id="ped-btn-reset-pass">Reset to Factory Key</button>
          </div>
          <div id="ped-sec-msg" style="margin-top: 12px; font-size: 0.8rem; min-height: 18px;"></div>
        </div>
      </div>
    `;

    const msg = document.getElementById("ped-sec-msg");
    document.getElementById("ped-btn-save-pass").addEventListener("click", async () => {
      const p1 = document.getElementById("ped-new-pass").value;
      const p2 = document.getElementById("ped-confirm-pass").value;
      if (!p1 || p1.length < 4) {
        msg.style.color = "#ff5252";
        msg.textContent = "Password must be at least 4 characters.";
        return;
      }
      if (p1 !== p2) {
        msg.style.color = "#ff5252";
        msg.textContent = "Passwords do not match.";
        return;
      }
      const newHash = await hashPassword(p1.trim());
      localStorage.setItem(STORAGE_KEY_HASH, newHash);
      msg.style.color = "#00F5D4";
      msg.textContent = "✦ Security key updated & cryptographically hashed successfully!";
      document.getElementById("ped-new-pass").value = "";
      document.getElementById("ped-confirm-pass").value = "";
    });

    document.getElementById("ped-btn-reset-pass").addEventListener("click", () => {
      if (confirm("Reset to default master key?")) {
        localStorage.removeItem(STORAGE_KEY_HASH);
        msg.style.color = "#FFB830";
        msg.textContent = "✦ Restored default master key.";
      }
    });
  }

export {
  renderTagChipsHtml,
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
};
