/**
 * Ismail Khan Portfolio — Visual Case Study Lightbox
 * 
 * Minimal, high-performance image inspector:
 * - Next / Prev keyboard arrow navigation
 * - Touch swipe gesture support for mobile
 * - ESC key & backdrop click to close
 * - Counter indicator (e.g. 03 / 12)
 * - Zero external dependencies
 */

(function () {
  let lightboxEl = null;
  let currentImages = [];
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function initLightboxDOM() {
    if (document.getElementById('csLightbox')) {
      lightboxEl = document.getElementById('csLightbox');
      return;
    }

    const markup = `
      <div id="csLightbox" class="cs-lightbox" role="dialog" aria-modal="true" aria-label="Image Inspector">
        <div class="csl-topbar">
          <div class="csl-info">
            <span class="csl-title" id="cslTitle">Project Screen</span>
            <span class="csl-counter mono" id="cslCounter">01 / 01</span>
          </div>
          <div class="csl-controls">
            <button class="csl-btn" id="cslPrevBtn" aria-label="Previous Image">
              <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;"><path d="M15 18l-6-6 6-6"/></svg>
              <span>Prev</span>
            </button>
            <button class="csl-btn" id="cslNextBtn" aria-label="Next Image">
              <span>Next</span>
              <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <button class="csl-btn csl-btn-close" id="cslCloseBtn" aria-label="Close Inspector">
              <span>Close [ESC]</span>
            </button>
          </div>
        </div>
        <div class="csl-stage" id="cslStage">
          <button class="csl-arrow prev" id="cslArrowPrev" aria-label="Previous Image">
            <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <img id="cslImg" src="" alt="Project Visual Preview" />
          <button class="csl-arrow next" id="cslArrowNext" aria-label="Next Image">
            <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', markup);
    lightboxEl = document.getElementById('csLightbox');

    // Wire events
    document.getElementById('cslCloseBtn').addEventListener('click', closeLightbox);
    document.getElementById('cslPrevBtn').addEventListener('click', prevImage);
    document.getElementById('cslNextBtn').addEventListener('click', nextImage);
    document.getElementById('cslArrowPrev').addEventListener('click', prevImage);
    document.getElementById('cslArrowNext').addEventListener('click', nextImage);

    // Stage backdrop click to close
    document.getElementById('cslStage').addEventListener('click', function (e) {
      if (e.target === this) {
        closeLightbox();
      }
    });

    // Keyboard listener
    window.addEventListener('keydown', function (e) {
      if (!lightboxEl || !lightboxEl.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    });

    // Touch Swipe handling
    const stage = document.getElementById('cslStage');
    stage.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 50) {
      if (delta < 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  }

  function openLightbox(images, index) {
    if (!lightboxEl) initLightboxDOM();
    currentImages = images;
    currentIndex = index || 0;
    updateLightboxUI();
    lightboxEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function prevImage() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxUI();
  }

  function nextImage() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxUI();
  }

  function updateLightboxUI() {
    if (!currentImages.length || !lightboxEl) return;
    const item = currentImages[currentIndex];
    const imgEl = document.getElementById('cslImg');
    const titleEl = document.getElementById('cslTitle');
    const counterEl = document.getElementById('cslCounter');

    imgEl.src = item.src;
    imgEl.alt = item.title || 'Project Visual';
    titleEl.textContent = item.title || 'Project Screen';
    counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(currentImages.length).padStart(2, '0')}`;
  }

  // Scan and bind all inspectable screens on page or in container
  function bindInspectableImages(container) {
    initLightboxDOM();
    const root = container || document;
    const elements = root.querySelectorAll('.cs-screen-wrapper, .csv-hero-frame, .cs-process-banner');
    
    // Collect all inspectable image items
    const collected = [];
    elements.forEach((el, idx) => {
      const img = el.querySelector('img');
      if (!img) return;
      
      const label = el.querySelector('.cs-screen-num')?.textContent || '';
      const caption = el.querySelector('.cs-screen-caption')?.textContent || '';
      const title = label ? `${label} — ${caption}` : (img.alt || `Screen ${idx + 1}`);

      const item = {
        src: img.getAttribute('data-full-src') || img.src,
        title: title
      };
      collected.push(item);

      // Add click handler
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(collected, idx);
      });
    });
  }

  // Global exposure
  window.CaseStudyLightbox = {
    open: openLightbox,
    close: closeLightbox,
    bind: bindInspectableImages
  };

  // Auto-bind on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => bindInspectableImages());
  } else {
    bindInspectableImages();
  }
})();
