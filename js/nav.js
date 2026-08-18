/**
 * Ismail Khan Portfolio — Navigation Module
 * Handles smooth custom scrolling, desktop top-to-side nav morphing on scroll,
 * mobile drawer menu open/close, and scrollspy active indicators.
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
    const href = a.getAttribute('href');
    if (!href || href === '#' || href === '#!' || href.length <= 1) return;
    try {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const dist = Math.abs(target.offsetTop - window.scrollY);
        const duration = Math.min(1200, Math.max(400, dist * 0.5));
        easedScrollTo(target.offsetTop, duration);
      }
    } catch (err) {
      // Ignore non-standard selector targets
    }
  });
});

/* ---------- Mobile Drawer Navigation ---------- */
(function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const overlay = document.getElementById('mobileNavOverlay');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const closeBtn = document.getElementById('mobileNavClose');
  const navLinks = overlay ? overlay.querySelectorAll('.mobile-nav-link') : [];

  if (!menuBtn || !overlay) return;

  document.body.classList.remove('mobile-nav-open');

  function openMenu() {
    overlay.style.display = 'block';
    // Force reflow for smooth transition
    void overlay.offsetWidth;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-nav-open');
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-nav-open');
    setTimeout(() => {
      if (!overlay.classList.contains('is-open')) {
        overlay.style.display = 'none';
      }
    }, 350);
  }

  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (overlay.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      closeMenu();
      if (href && href.startsWith('#') && href.length > 1) {
        try {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            setTimeout(() => {
              const dist = Math.abs(target.offsetTop - window.scrollY);
              const duration = Math.min(1000, Math.max(350, dist * 0.45));
              easedScrollTo(target.offsetTop, duration);
            }, 250);
          }
        } catch (err) {}
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
})();

/* ---------- Desktop Nav transform: top nav (Home) <-> floating side nav (About onward) ---------- */
(function initNavTransform() {
  const aboutSection = document.getElementById('about');
  const topNav = document.querySelector('header.nav');
  const sideNav = document.getElementById('sideNav');
  if (!aboutSection || !topNav || !sideNav) return;

  function isDesktop() {
    return window.innerWidth > 900;
  }

  if (typeof gsap !== 'undefined' && isDesktop()) {
    gsap.set(sideNav, { opacity: 0, x: -14 });
  }

  let sideActive = false;
  const NAV_DUR = 0.6; // 600ms
  const NAV_EASE = 'power3.inOut';

  function showSideNav() {
    if (!isDesktop()) {
      topNav.style.opacity = '1';
      topNav.style.pointerEvents = 'auto';
      return;
    }
    if (sideActive) return;
    sideActive = true;
    document.body.classList.add('side-active');
    if (typeof gsap !== 'undefined') {
      gsap.to(topNav, { opacity: 0, y: -10, duration: NAV_DUR, ease: NAV_EASE });
      gsap.to(sideNav, { opacity: 1, x: 0, duration: NAV_DUR, ease: NAV_EASE });
    }
  }

  function showTopNav() {
    if (!isDesktop()) {
      topNav.style.opacity = '1';
      topNav.style.pointerEvents = 'auto';
      return;
    }
    if (!sideActive) return;
    sideActive = false;
    document.body.classList.remove('side-active');
    if (typeof gsap !== 'undefined') {
      gsap.to(topNav, { opacity: 1, y: 0, duration: NAV_DUR, ease: NAV_EASE });
      gsap.to(sideNav, { opacity: 0, x: -14, duration: NAV_DUR, ease: NAV_EASE });
    }
  }

  window.addEventListener('resize', () => {
    if (!isDesktop()) {
      topNav.style.opacity = '1';
      topNav.style.pointerEvents = 'auto';
      document.body.classList.remove('side-active');
    }
  });

  // Fires when #about crosses the viewport boundary in either direction
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showSideNav();
      } else if (entry.boundingClientRect.top > 0) {
        showTopNav();
      }
    });
  }, { threshold: 0 });
  navObserver.observe(aboutSection);

  // Scroll-spy: highlight the current section in the side nav (About, Work, Process, Contact)
  const spySections = ['about', 'featured', 'work', 'process', 'contact'];
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

  sideItems.forEach((item) => {
    item.addEventListener('click', () => {
      setActive(item.dataset.section);
    });
  });
})();
