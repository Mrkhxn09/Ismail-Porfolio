/**
 * Custom Cursor Module
 * Implements trailing physics, cursor dot/ring movement, and interactive hover states.
 */

(function initCursor() {
  const isTouch = window.matchMedia('(pointer:coarse)').matches;
  if (isTouch) return;

  const dot = document.querySelector('.cur-dot');
  const ring = document.querySelector('.cur-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  gsap.ticker.add(() => {
    // smooth trailing ease — slightly slower than the dot for a calm, weighted feel
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
  });

  function bindState(selector, stateClass) {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add(stateClass);
        dot.classList.add(stateClass);
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove(stateClass);
        dot.classList.remove(stateClass);
      });
    });
  }

  // buttons — cursor tightens, dot hides, no label
  bindState('.btn-primary, .btn-ghost, .filter-btn, .reel-btn, .copy-email-btn, .side-nav-item', 'state-btn');

  // real project / video cards with a "view" destination
  bindState('.case-media, .video-card', 'state-card');

  // everything else interactive — a gentler, moderate reaction
  bindState('.ik-letter, .service-card, .tool-card, .timeline-step, .float-card, .case-cta, .contact-socials a, header.nav nav a, .logo, .hero-scrollcue', 'state-generic');
})();
