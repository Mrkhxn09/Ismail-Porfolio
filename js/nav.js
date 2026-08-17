/**
 * Navigation Module
 * Handles smooth custom scrolling, top-to-side nav morphing on scroll, and scrollspy active indicators.
 */

/* ---------- Smooth nav scroll (custom eased) ---------- */
function easedScrollTo(targetY, duration) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const startY = window.scrollY;
  const dist = targetY - startY;

  if (reduceMotion || Math.abs(dist) < 2) {
    window.scrollTo(0, targetY);
    return;
  }

  const startTime = performance.now();
  function ease(t) {
    return 1 - Math.pow(1 - t, 3); // cubic ease-out
  }

  function step(now) {
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + dist * ease(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const dist = Math.abs(target.offsetTop - window.scrollY);
      const duration = Math.min(1400, Math.max(500, dist * 0.6));
      easedScrollTo(target.offsetTop, duration);
    }
  });
});

/* ---------- Nav transform: top nav (Home) <-> floating side nav (About onward) ---------- */
(function initNavTransform() {
  const aboutSection = document.getElementById('about');
  const topNav = document.querySelector('header.nav');
  const sideNav = document.getElementById('sideNav');
  if (!aboutSection || !topNav || !sideNav) return;

  gsap.set(sideNav, { opacity: 0, x: -14 });

  let sideActive = false;
  const NAV_DUR = 0.7; // 700ms
  const NAV_EASE = 'power3.inOut';

  function showSideNav() {
    if (sideActive) return;
    sideActive = true;
    document.body.classList.add('side-active');
    gsap.to(topNav, { opacity: 0, y: -10, duration: NAV_DUR, ease: NAV_EASE });
    gsap.to(sideNav, { opacity: 1, x: 0, duration: NAV_DUR, ease: NAV_EASE });
  }

  function showTopNav() {
    if (!sideActive) return;
    sideActive = false;
    document.body.classList.remove('side-active');
    gsap.to(topNav, { opacity: 1, y: 0, duration: NAV_DUR, ease: NAV_EASE });
    gsap.to(sideNav, { opacity: 0, x: -14, duration: NAV_DUR, ease: NAV_EASE });
  }

  // Fires when #about crosses the viewport boundary in either direction
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showSideNav();
      } else if (entry.boundingClientRect.top > 0) {
        // #about is below the viewport — on Home
        showTopNav();
      }
    });
  }, { threshold: 0 });
  navObserver.observe(aboutSection);

  // Scroll-spy: highlight the current section in the side nav
  const spySections = ['about', 'featured', 'work', 'process', 'reel', 'contact'];
  const sideItems = sideNav.querySelectorAll('.side-nav-item');

  function setActive(id) {
    const targetSection = (id === 'featured') ? 'work' : id;
    sideItems.forEach((item) => {
      item.classList.toggle('active', item.dataset.section === targetSection);
    });
  }

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  spySections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) spyObserver.observe(el);
  });

  // instant feedback on click
  sideItems.forEach((item) => {
    item.addEventListener('click', () => {
      setActive(item.dataset.section);
    });
  });
})();
