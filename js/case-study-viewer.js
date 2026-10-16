/**
 * Ismail Khan Portfolio — Case Study Modal Viewer Module (70% Visual / 30% Text)
 * 
 * Features:
 * - Dynamic visual-first rendering with full project screens
 * - Integrated Image Lightbox inspector with arrow navigation & touch gestures
 * - HTML5 History API integration (/work/[slug] pushState/popstate)
 * - Dynamic document title & meta updating
 * - Seamless keyboard navigation (ESC to close, Left/Right arrow navigation)
 */

(function initCaseStudyViewer() {
  const modal = document.getElementById('caseStudyViewer');
  if (!modal || typeof CASE_STUDIES_DATA === 'undefined') return;

  const closeBtn = document.getElementById('csvCloseBtn');
  const backdrop = modal.querySelector('.csv-backdrop');
  const bodyEl = document.getElementById('csvBody');
  const prevBtn = document.getElementById('csvPrevBtn');
  const nextBtn = document.getElementById('csvNextBtn');

  const projectKeys = ['portfolio-website', 'pearls-eye-photography', 'job-finder', 'flower-hero', 'red-bus', 'ecommerce-headphone'];
  let currentKey = null;
  let lastActiveElement = null;
  const originalTitle = document.title;

  function getProjectSlug(key) {
    return (CASE_STUDIES_DATA[key] && CASE_STUDIES_DATA[key].slug) || key;
  }

  function findKeyBySlug(slug) {
    if (!slug) return null;
    const clean = slug.replace(/^\/+|\/+$/g, '').toLowerCase();
    for (const key of Object.keys(CASE_STUDIES_DATA)) {
      if (key.toLowerCase() === clean || (CASE_STUDIES_DATA[key].slug && CASE_STUDIES_DATA[key].slug.toLowerCase() === clean)) {
        return key;
      }
    }
    return null;
  }

  function formatVisualBlock(block) {
    let gridClass = 'cs-grid-full';
    if (block.layout === 'duo') gridClass = 'cs-grid-duo';
    else if (block.layout === 'trio') gridClass = 'cs-grid-trio';
    else if (block.layout === 'quad') gridClass = 'cs-grid-quad';
    else if (block.layout === 'flow') gridClass = 'cs-flow-sequence';

    const imagesHtml = (block.images || []).map(img => `
      <div class="cs-screen-wrapper">
        <img src="${img.src}" alt="${img.caption || img.label || 'Project Screen'}" loading="lazy" decoding="async" />
        <div class="cs-screen-label">
          <span class="cs-screen-num">${img.label || 'SCREEN'}</span>
          <span class="cs-screen-caption">${img.caption || ''}</span>
        </div>
      </div>
    `).join('');

    return `
      <div class="cs-visual-block">
        <div class="cs-block-header">
          <span class="cs-block-tag">${block.tag || 'SHOWCASE'}</span>
          <h3 class="cs-block-title">${block.title || ''}</h3>
        </div>
        ${block.desc ? `<p class="cs-block-desc">${block.desc}</p>` : ''}
        <div class="${gridClass}" style="margin-top: 16px;">
          ${imagesHtml}
        </div>
      </div>
    `;
  }

  function formatSection(sec) {
    let extraHtml = '';

    if (sec.stats && sec.stats.length) {
      extraHtml += `<div class="csv-stats-grid">` +
        sec.stats.map(s => `
          <div class="csv-stat-card">
            <span class="csv-stat-val mono">${s.value}</span>
            <span class="csv-stat-lbl">${s.label}</span>
          </div>
        `).join('') +
        `</div>`;
    }

    if (sec.bullets && sec.bullets.length) {
      extraHtml += `<ul class="csv-bullet-list">` +
        sec.bullets.map(b => `<li>${b}</li>`).join('') +
        `</ul>`;
    }

    if (sec.diagram && sec.diagram.length) {
      extraHtml += `<div class="csv-diagram-flow">` +
        sec.diagram.map(d => `
          <div class="csv-flow-step">
            <span class="csv-flow-num mono">${d.step}</span>
            <p class="csv-flow-desc">${d.desc}</p>
          </div>
        `).join('') +
        `</div>`;
    }

    if (sec.palette && sec.palette.length) {
      extraHtml += `<div class="csv-palette-row">` +
        sec.palette.map(p => `
          <div class="csv-swatch-card">
            <span class="csv-swatch-pill" style="background:${p.hex}"></span>
            <span class="csv-swatch-name">${p.name}</span>
            <span class="csv-swatch-hex mono">${p.hex}</span>
          </div>
        `).join('') +
        `</div>`;
    }

    return `
      <section class="csv-section ${sec.type || ''}">
        <div class="csv-section-header">
          <span class="csv-sec-tag mono">${sec.tag || 'SECTION'}</span>
          <h3 class="csv-sec-title">${sec.title || ''}</h3>
        </div>
        ${sec.content ? `<p class="csv-sec-desc">${sec.content}</p>` : ''}
        ${extraHtml}
      </section>
    `;
  }

  function renderCaseStudy(key) {
    const data = CASE_STUDIES_DATA[key];
    if (!data) return;

    currentKey = key;
    const currentIndex = projectKeys.indexOf(key) !== -1 ? projectKeys.indexOf(key) : 0;

    const prevIndex = (currentIndex - 1 + projectKeys.length) % projectKeys.length;
    const nextIndex = (currentIndex + 1) % projectKeys.length;

    const prevKey = projectKeys[prevIndex];
    const nextKey = projectKeys[nextIndex];

    const prevData = CASE_STUDIES_DATA[prevKey] || {};
    const nextData = CASE_STUDIES_DATA[nextKey] || {};

    if (prevBtn) {
      prevBtn.dataset.targetKey = prevKey;
      const sub = prevBtn.querySelector('.csv-nav-sub');
      if (sub) sub.textContent = prevData.title || 'Previous Project';
    }
    if (nextBtn) {
      nextBtn.dataset.targetKey = nextKey;
      const sub = nextBtn.querySelector('.csv-nav-sub');
      if (sub) sub.textContent = nextData.title || 'Next Project';
    }

    const visualBlocksHtml = (data.visualShowcase || []).map(formatVisualBlock).join('');
    const narrativeSectionsHtml = (data.sections || []).map(formatSection).join('');

    // Build Full Case Study HTML
    bodyEl.innerHTML = `
      <article class="csv-hero">
        <div class="csv-badges-wrap">
          <span class="csv-hero-badge mono">${data.categoryCode}</span>
          ${data.status ? `<span class="csv-status-badge mono">${data.status}</span>` : ''}
        </div>
        <h1 class="csv-hero-title">${data.title}</h1>
        <p class="csv-hero-subtitle">${data.subtitle}</p>

        <div class="csv-meta-strip">
          <div class="csv-meta-col">
            <span class="csv-meta-lbl mono">ROLE</span>
            <span class="csv-meta-val">${data.meta.role || 'UI/UX Designer'}</span>
          </div>
          <div class="csv-meta-col">
            <span class="csv-meta-lbl mono">TIMELINE</span>
            <span class="csv-meta-val">${data.meta.timeline || 'Design Sprint'}</span>
          </div>
          <div class="csv-meta-col">
            <span class="csv-meta-lbl mono">DISCIPLINE</span>
            <span class="csv-meta-val">${data.meta.discipline || data.category}</span>
          </div>
          <div class="csv-meta-col">
            <span class="csv-meta-lbl mono">TOOLS</span>
            <span class="csv-meta-val">${data.meta.tools || 'Figma'}</span>
          </div>
        </div>

        <div class="cs-screen-wrapper csv-hero-frame" style="margin-top: 24px;">
          <img src="${data.heroImage}" alt="${data.title} Primary View" class="csv-hero-img" loading="eager" decoding="async">
          <div class="cs-screen-label">
            <span class="cs-screen-num">00 — HERO PREVIEW</span>
            <span class="cs-screen-caption">Click to expand high-resolution view</span>
          </div>
        </div>
      </article>

      ${data.overview ? `
        <div class="csv-overview-box" style="margin: 32px 0; padding: 24px; background: rgba(20,23,28,0.5); border-left: 2px solid var(--amber); border-radius: 0 8px 8px 0;">
          <span class="mono" style="font-size: 0.7rem; color: var(--amber); letter-spacing: 0.1em; display: block; margin-bottom: 6px;">PROJECT OVERVIEW</span>
          <p style="font-size: 1rem; line-height: 1.6; color: var(--paper); margin: 0;">${data.overview}</p>
        </div>
      ` : ''}

      <!-- Visual Showcase (70% Visual) -->
      <div class="cs-visual-showcase">
        ${visualBlocksHtml}
      </div>

      <!-- Concise Narrative & Learnings (30% Text) -->
      <div class="csv-sections-container">
        ${narrativeSectionsHtml}
      </div>
    `;

    // Scroll inner container to top smoothly
    const scrollContainer = modal.querySelector('.csv-scroll-wrapper');
    if (scrollContainer) scrollContainer.scrollTop = 0;

    // Update document title for SEO & bookmarking
    document.title = `${data.title} | Ismail Khan — UI/UX Designer`;

    // Bind Lightbox to all rendered screens
    if (window.CaseStudyLightbox && window.CaseStudyLightbox.bind) {
      window.CaseStudyLightbox.bind(bodyEl);
    }
  }

  function updateUrl(slug, isOpening) {
    try {
      if (window.location.protocol === 'file:') {
        if (isOpening) {
          window.location.hash = `work/${slug}`;
        } else if (window.location.hash.startsWith('#work/')) {
          history.replaceState(null, '', window.location.pathname);
        }
      } else {
        if (isOpening) {
          const newUrl = `/work/${slug}/`;
          if (window.location.pathname !== newUrl) {
            history.pushState({ modalOpen: true, projectKey: currentKey }, '', newUrl);
          }
        } else {
          if (window.location.pathname.startsWith('/work/')) {
            history.pushState({ modalOpen: false }, '', '/');
          }
        }
      }
    } catch (e) {}
  }

  function openCaseStudy(key, pushHistory = true) {
    if (!CASE_STUDIES_DATA[key]) return;
    if (!modal.classList.contains('is-open')) {
      lastActiveElement = document.activeElement;
    }

    renderCaseStudy(key);

    if (pushHistory) {
      updateUrl(getProjectSlug(key), true);
    }

    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.classList.add('modal-scroll-lock');

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(modal.querySelector('.csv-dialog'),
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' }
      );
    }

    if (closeBtn) closeBtn.focus();
  }

  function closeCaseStudy(pushHistory = true) {
    if (!modal.classList.contains('is-open')) return;

    if (typeof gsap !== 'undefined') {
      gsap.to(modal.querySelector('.csv-dialog'), {
        opacity: 0,
        y: 20,
        scale: 0.98,
        duration: 0.25,
        ease: 'power3.in',
        onComplete: () => {
          modal.classList.remove('is-open');
          modal.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('modal-scroll-lock');
          document.title = originalTitle;
          if (pushHistory) updateUrl('', false);
          if (lastActiveElement) lastActiveElement.focus();
        }
      });
    } else {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-scroll-lock');
      document.title = originalTitle;
      if (pushHistory) updateUrl('', false);
      if (lastActiveElement) lastActiveElement.focus();
    }
  }

  function bindTriggers() {
    document.querySelectorAll('[data-case-id]').forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const key = this.getAttribute('data-case-id');
        if (key && CASE_STUDIES_DATA[key]) {
          openCaseStudy(key, true);
        }
      });
    });
  }

  // Next / Prev button wiring in modal footer
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      const target = this.dataset.targetKey;
      if (target) openCaseStudy(target, true);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      const target = this.dataset.targetKey;
      if (target) openCaseStudy(target, true);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', () => closeCaseStudy(true));
  if (backdrop) backdrop.addEventListener('click', () => closeCaseStudy(true));

  // Global escape & arrow navigation
  window.addEventListener('keydown', function (e) {
    // If image lightbox is open, let lightbox handle it
    const lb = document.getElementById('csLightbox');
    if (lb && lb.classList.contains('is-open')) return;

    if (!modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeCaseStudy(true);
    } else if (e.key === 'ArrowLeft' && prevBtn && prevBtn.dataset.targetKey) {
      openCaseStudy(prevBtn.dataset.targetKey, true);
    } else if (e.key === 'ArrowRight' && nextBtn && nextBtn.dataset.targetKey) {
      openCaseStudy(nextBtn.dataset.targetKey, true);
    }
  });

  // History Popstate Handling
  window.addEventListener('popstate', function (e) {
    if (window.location.protocol === 'file:') {
      const hash = window.location.hash;
      if (hash.startsWith('#work/')) {
        const slug = hash.replace('#work/', '');
        const key = findKeyBySlug(slug);
        if (key) openCaseStudy(key, false);
      } else {
        closeCaseStudy(false);
      }
      return;
    }

    const path = window.location.pathname;
    if (path.startsWith('/work/')) {
      const parts = path.split('/').filter(Boolean);
      const slug = parts[1] || '';
      const key = findKeyBySlug(slug);
      if (key) {
        openCaseStudy(key, false);
      } else {
        closeCaseStudy(false);
      }
    } else {
      closeCaseStudy(false);
    }
  });

  // Check initial URL on page load
  function checkInitialRoute() {
    if (window.location.protocol === 'file:') {
      const hash = window.location.hash;
      if (hash.startsWith('#work/')) {
        const slug = hash.replace('#work/', '');
        const key = findKeyBySlug(slug);
        if (key) openCaseStudy(key, false);
      }
      return;
    }

    const path = window.location.pathname;
    if (path.startsWith('/work/')) {
      const parts = path.split('/').filter(Boolean);
      const slug = parts[1] || '';
      const key = findKeyBySlug(slug);
      if (key) {
        setTimeout(() => openCaseStudy(key, false), 100);
      }
    }
  }

  // Init
  bindTriggers();
  checkInitialRoute();

  window.openCaseStudyModal = openCaseStudy;
  window.closeCaseStudyModal = closeCaseStudy;
})();
