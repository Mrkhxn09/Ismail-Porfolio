/**
 * Case Study Modal Viewer Module
 * Handles dynamic rendering of discipline-tailored case studies,
 * modal animation, keyboard navigation (ESC, Arrow keys), and focus management.
 */

(function initCaseStudyViewer() {
  const modal = document.getElementById('caseStudyViewer');
  if (!modal || typeof CASE_STUDIES_DATA === 'undefined') return;

  const closeBtn = document.getElementById('csvCloseBtn');
  const backdrop = modal.querySelector('.csv-backdrop');
  const bodyEl = document.getElementById('csvBody');
  const prevBtn = document.getElementById('csvPrevBtn');
  const nextBtn = document.getElementById('csvNextBtn');

  const projectKeys = Object.keys(CASE_STUDIES_DATA);
  let currentKey = null;
  let lastActiveElement = null;

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

    if (sec.deliverables && sec.deliverables.length) {
      extraHtml += `<div class="csv-deliverables-grid">` +
        sec.deliverables.map(d => `
          <div class="csv-deliv-item">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${d}</span>
          </div>
        `).join('') +
        `</div>`;
    }

    if (sec.metrics && sec.metrics.length) {
      extraHtml += `<div class="csv-metrics-grid">` +
        sec.metrics.map(m => `
          <div class="csv-metric-card">
            <span class="csv-metric-num mono">${m.num}</span>
            <p class="csv-metric-desc">${m.desc}</p>
          </div>
        `).join('') +
        `</div>`;
    }

    if (sec.notes) {
      extraHtml += `<div class="csv-note-box"><span class="mono">KEY FINDING</span><p>${sec.notes}</p></div>`;
    }

    return `
      <section class="csv-section ${sec.type}">
        <div class="csv-section-header">
          <span class="csv-sec-tag mono">${sec.tag}</span>
          <h3 class="csv-sec-title">${sec.title}</h3>
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
    const currentIndex = projectKeys.indexOf(key);

    const prevIndex = (currentIndex - 1 + projectKeys.length) % projectKeys.length;
    const nextIndex = (currentIndex + 1) % projectKeys.length;

    const prevKey = projectKeys[prevIndex];
    const nextKey = projectKeys[nextIndex];

    const prevData = CASE_STUDIES_DATA[prevKey];
    const nextData = CASE_STUDIES_DATA[nextKey];

    if (prevBtn) {
      prevBtn.dataset.targetKey = prevKey;
      prevBtn.querySelector('.csv-nav-sub').textContent = prevData.title;
    }
    if (nextBtn) {
      nextBtn.dataset.targetKey = nextKey;
      nextBtn.querySelector('.csv-nav-sub').textContent = nextData.title;
    }

    // Build Full Case Study HTML
    bodyEl.innerHTML = `
      <div class="csv-hero">
        <div class="csv-hero-badge mono">${data.categoryCode}</div>
        <h1 class="csv-hero-title">${data.title}</h1>
        <p class="csv-hero-subtitle">${data.subtitle}</p>

        <div class="csv-meta-strip">
          <div class="csv-meta-col">
            <span class="csv-meta-lbl mono">ROLE</span>
            <span class="csv-meta-val">${data.meta.role}</span>
          </div>
          <div class="csv-meta-col">
            <span class="csv-meta-lbl mono">TIMELINE</span>
            <span class="csv-meta-val">${data.meta.timeline}</span>
          </div>
          <div class="csv-meta-col">
            <span class="csv-meta-lbl mono">DISCIPLINE</span>
            <span class="csv-meta-val">${data.meta.discipline}</span>
          </div>
          <div class="csv-meta-col">
            <span class="csv-meta-lbl mono">TOOLS</span>
            <span class="csv-meta-val">${data.meta.tools}</span>
          </div>
        </div>

        <div class="csv-hero-frame">
          <img src="${data.heroImage}" alt="${data.title} Hero Visual" class="csv-hero-img" loading="eager" decoding="async">
          <div class="csv-hero-glow" style="background: radial-gradient(circle at center, ${data.accentColor}33 0%, transparent 70%);"></div>
        </div>
      </div>

      <div class="csv-sections-container">
        ${data.sections.map(formatSection).join('')}
      </div>
    `;

    // Scroll inner container to top smoothly
    const scrollContainer = modal.querySelector('.csv-scroll-wrapper');
    if (scrollContainer) scrollContainer.scrollTop = 0;
  }

  function openCaseStudy(key) {
    if (!CASE_STUDIES_DATA[key]) return;
    lastActiveElement = document.activeElement;

    renderCaseStudy(key);

    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.classList.add('modal-scroll-lock');

    gsap.fromTo(modal.querySelector('.csv-dialog'),
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
    );

    if (closeBtn) closeBtn.focus();
  }

  function closeCaseStudy() {
    if (!modal.classList.contains('is-open')) return;

    gsap.to(modal.querySelector('.csv-dialog'), {
      opacity: 0,
      y: 20,
      scale: 0.98,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-scroll-lock');
        if (lastActiveElement) lastActiveElement.focus();
      }
    });
  }

  // Event Listeners
  if (closeBtn) closeBtn.addEventListener('click', closeCaseStudy);
  if (backdrop) backdrop.addEventListener('click', closeCaseStudy);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (prevBtn.dataset.targetKey) {
        renderCaseStudy(prevBtn.dataset.targetKey);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (nextBtn.dataset.targetKey) {
        renderCaseStudy(nextBtn.dataset.targetKey);
      }
    });
  }

  // Global triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-case-id]');
    if (trigger) {
      e.preventDefault();
      const key = trigger.getAttribute('data-case-id');
      openCaseStudy(key);
    }
  });

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      closeCaseStudy();
    } else if (e.key === 'ArrowLeft' && prevBtn && prevBtn.dataset.targetKey) {
      renderCaseStudy(prevBtn.dataset.targetKey);
    } else if (e.key === 'ArrowRight' && nextBtn && nextBtn.dataset.targetKey) {
      renderCaseStudy(nextBtn.dataset.targetKey);
    }
  });

  // Expose global open method
  window.openCaseStudy = openCaseStudy;
  window.closeCaseStudy = closeCaseStudy;
})();
