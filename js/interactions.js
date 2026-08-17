/**
 * Interactions & Scroll Triggers Module
 * Manages hero entrance sequencing, parallax, role rotation, clipboard copying,
 * work category filtering, and scroll-triggered animations.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Hero Entrance Animation ---------- */
window.heroIntro = function heroIntro() {
  gsap.set('header.nav', { opacity: 0 });
  gsap.set('.hero-kicker', { opacity: 0, y: 10 });
  gsap.set('.hero-super', { opacity: 0, y: 12 });
  gsap.set('.hero-bgname', { opacity: 0 });
  gsap.set('.hero-portrait-aura', { opacity: 0, scale: 0.88 });
  gsap.set('.hero-portrait', { opacity: 0, y: 16 });
  gsap.set('.hero-roles, .hero-cta, .hero-copy-email, .hero-scrollcue', { opacity: 0, y: 12 });
  gsap.set('.float-card', { opacity: 0, x: -20 });
  gsap.set('.hero-float-traits', { opacity: 0, x: 20 });

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  if (reduceMotion) {
    gsap.set('.hero-bgname', { opacity: 0.65 });
    tl.to(['header.nav', '.hero-kicker', '.hero-super', '.hero-portrait', '.hero-portrait-aura',
           '.hero-roles', '.hero-cta', '.hero-scrollcue', '.float-card', '.hero-float-traits', '.hero-copy-email'],
        { opacity: 1, y: 0, x: 0, scale: 1, duration: .5 }, 0)
      .to('.letter-reveal', {
        y: '0%', duration: .6,
        onComplete: () => {
          document.querySelectorAll('h1.hero-name .line').forEach((l) => { l.style.overflow = 'visible'; });
        }
      }, 0);
    return;
  }

  // Beat 1 — Identity & Topline
  tl.to('header.nav', { opacity: 1, duration: 1.0 }, 0)
    .to('.hero-kicker', { opacity: 1, y: 0, duration: 0.8 }, 0.1)
    .to('.hero-super', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
    // Beat 2 — Background Name & Ambient Aura
    .to('.hero-bgname', { opacity: 0.65, duration: 1.8, ease: 'power1.out' }, 0.25)
    .to('.hero-portrait-aura', { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, 0.35)
    // Beat 3 — Portrait & Name Reveal
    .to('.hero-portrait', { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' }, 0.45)
    .to('.letter-reveal', {
      y: '0%', duration: 1.0, ease: 'power2.out',
      onComplete: () => {
        document.querySelectorAll('h1.hero-name .line').forEach((l) => { l.style.overflow = 'visible'; });
      }
    }, 0.8)
    // Beat 4 — Supporting Roles & CTAs
    .to('.hero-roles', { opacity: 1, y: 0, duration: 0.7 }, 1.2)
    .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8 }, 1.35)
    .to('.hero-copy-email', { opacity: 1, y: 0, duration: 0.7 }, 1.5)
    .to('.hero-scrollcue', { opacity: 1, y: 0, duration: 0.7 }, 1.6)
    // Beat 5 — Lateral Side Cards Entrance
    .to('.float-card', { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, 1.4)
    .to('.hero-float-traits', { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, 1.5);
};

/* ---------- Hero scroll parallax ---------- */
if (!reduceMotion) {
  ScrollTrigger.create({
    trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1,
    onUpdate: (self) => {
      const p = self.progress;
      gsap.set('.hero-bgname', { y: -p * 60 });
      gsap.set('.hero-glow', { y: -p * 35 });
      gsap.set('.hero-portrait-aura', { y: -p * 20 });
      gsap.set('.hero-portrait', { y: -p * 14 });
    }
  });
}

/* ---------- Hero subtle mouse parallax ---------- */
(function initHeroMouseParallax() {
  if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;
  let tx = 0, ty = 0;
  let cx = 0, cy = 0;
  let rafId = null;

  window.addEventListener('mousemove', (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
    if (!rafId) updateParallax();
  }, { passive: true });

  function updateParallax() {
    cx += (tx - cx) * 0.05;
    cy += (ty - cy) * 0.05;

    gsap.set('.hero-portrait', { x: cx * 5, y: cy * 4 });
    gsap.set('.hero-portrait-aura', { x: cx * 7, y: cy * 5 });
    gsap.set('.hero-bgname', { x: cx * 12, y: cy * 8 });
    gsap.set('.hero-float-stats', { x: cx * 8, y: cy * 6 });
    gsap.set('.hero-float-traits', { x: cx * -8, y: cy * 6 });

    if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
      rafId = requestAnimationFrame(updateParallax);
    } else {
      rafId = null;
    }
  }
})();

/* ---------- Role ticker (hero) ---------- */
(function initRoleTicker() {
  const roles = ['UI / UX DESIGNER', 'GRAPHIC DESIGNER', 'MOTION DESIGNER'];
  const roleWindow = document.getElementById('roleWindow');
  if (!roleWindow) return;

  roles.forEach((r, i) => {
    const s = document.createElement('span');
    s.className = 'role mono';
    s.textContent = r;
    s.style.top = '0%';
    s.style.opacity = i === 0 ? '1' : '0';
    s.dataset.i = i;
    roleWindow.appendChild(s);
  });

  let roleIdx = 0;
  if (!reduceMotion) {
    setInterval(() => {
      const items = roleWindow.querySelectorAll('.role');
      const next = (roleIdx + 1) % roles.length;
      gsap.to(items[roleIdx], { opacity: 0, y: -6, duration: .9, ease: 'power2.inOut' });
      gsap.fromTo(items[next], { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .9, ease: 'power2.inOut' });
      roleIdx = next;
    }, 3600);
  }
})();

/* ---------- Copy email to clipboard ---------- */
(function initCopyEmail() {
  const btn = document.getElementById('copyEmailBtn');
  const label = document.getElementById('copyEmailLabel');
  if (!btn) return;
  let resetTimer = null;

  btn.addEventListener('click', async () => {
    const email = document.getElementById('heroEmailText').textContent.trim();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      label.textContent = 'Copied';
      btn.setAttribute('aria-label', 'Email copied to clipboard');
    } catch (err) {
      label.textContent = 'Copy failed';
    }
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      label.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy email address to clipboard');
    }, 1800);
  });
})();

/* ---------- Global Scroll Progress & Atmospheric Mist Parallax ---------- */
(function initGlobalScroll() {
  const progressEl = document.getElementById('globalScrollProgress');
  const mistEl = document.getElementById('bgMist');
  if (!progressEl && !mistEl) return;

  function onScrollUpdate() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (progressEl) progressEl.style.width = (p * 100) + '%';
    if (mistEl && !reduceMotion) {
      mistEl.style.transform = `translate3d(0, ${-p * 18}px, 0)`;
    }
  }

  window.addEventListener('scroll', onScrollUpdate, { passive: true });
  onScrollUpdate();
})();

/* ---------- Reveal on scroll ---------- */
gsap.utils.toArray('.reveal:not(.service-card)').forEach((el) => {
  gsap.fromTo(el, { opacity: 0, y: 22 }, {
    opacity: 1, y: 0, duration: .8, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

/* ---------- Discipline cards stagger reveal ---------- */
const serviceGrid = document.querySelector('.service-grid');
if (serviceGrid) {
  gsap.fromTo(serviceGrid.querySelectorAll('.service-card'),
    { opacity: 0, y: 26 },
    {
      opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: serviceGrid, start: 'top 85%' }
    }
  );
}

/* ---------- Case study card wipe reveal & internal canvas parallax ---------- */
gsap.utils.toArray('.case-media').forEach((fr) => {
  gsap.fromTo(fr, { clipPath: 'inset(0 0 0 100% round 16px)' }, {
    clipPath: 'inset(0 0 0 0% round 16px)', duration: 1.1, ease: 'power4.inOut',
    scrollTrigger: { trigger: fr, start: 'top 82%' }
  });
});

gsap.utils.toArray('.case-body').forEach((m) => {
  gsap.fromTo(m, { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: .9, ease: 'power3.out',
    scrollTrigger: { trigger: m, start: 'top 85%' }
  });
});

/* Internal Canvas Scroll Parallax on Case Cards */
if (!reduceMotion && !window.matchMedia('(pointer: coarse)').matches) {
  gsap.utils.toArray('.case-card').forEach((card, i) => {
    const canvas = card.querySelector('.case-canvas');
    if (!canvas) return;
    const speed = i % 2 === 0 ? 10 : 7;
    gsap.fromTo(canvas,
      { y: -speed },
      {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );
  });
}


/* ---------- Floating Tool Ecosystem: Scrub Scroll Story & Parallax ---------- */
(function initToolsEcosystem() {
  const eco = document.getElementById('toolsEcosystem');
  if (!eco) return;

  const nodes = eco.querySelectorAll('.tool-node');
  const filaments = eco.querySelector('.tools-filaments');

  // Hover focus effect: toggle .has-hover on container
  nodes.forEach((node) => {
    node.addEventListener('mouseenter', () => {
      eco.classList.add('has-hover');
    });
    node.addEventListener('mouseleave', () => {
      eco.classList.remove('has-hover');
    });
  });

  if (reduceMotion || window.matchMedia('(max-width: 680px)').matches) return;

  const nodeMap = {};
  nodes.forEach((n) => {
    nodeMap[n.dataset.tool] = n;
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: eco,
      start: 'top 88%',
      end: 'bottom 20%',
      scrub: 1.2
    }
  });

  // ENTER -> GATHER -> COMPOSE
  if (nodeMap.figma) {
    tl.fromTo(nodeMap.figma, { y: 60, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.35 }, 0);
  }
  if (nodeMap.framer) {
    tl.fromTo(nodeMap.framer, { x: 70, y: -45, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.4 }, 0.05);
  }
  if (nodeMap.illustrator) {
    tl.fromTo(nodeMap.illustrator, { x: -80, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.38 }, 0.04);
  }
  if (nodeMap.canva) {
    tl.fromTo(nodeMap.canva, { x: -50, y: 65, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.42 }, 0.08);
  }
  if (nodeMap.davinci) {
    tl.fromTo(nodeMap.davinci, { x: 75, y: 55, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.4 }, 0.06);
  }
  if (nodeMap.capcut) {
    tl.fromTo(nodeMap.capcut, { x: -10, y: -65, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.38 }, 0.07);
  }
  if (filaments) {
    tl.fromTo(filaments, { opacity: 0 }, { opacity: 0.75, duration: 0.3 }, 0.2);
  }

  // DRIFT -> EXIT as user scrolls past
  if (nodeMap.figma) {
    tl.to(nodeMap.figma, { y: -35, scale: 1.04, duration: 0.35 }, 0.65);
  }
  if (nodeMap.framer) {
    tl.to(nodeMap.framer, { x: 30, y: -30, opacity: 0.4, duration: 0.35 }, 0.65);
  }
  if (nodeMap.illustrator) {
    tl.to(nodeMap.illustrator, { x: -35, y: -20, opacity: 0.4, duration: 0.35 }, 0.65);
  }
  if (nodeMap.canva) {
    tl.to(nodeMap.canva, { x: -25, y: 40, opacity: 0.3, duration: 0.35 }, 0.65);
  }
  if (nodeMap.davinci) {
    tl.to(nodeMap.davinci, { x: 35, y: 35, opacity: 0.35, duration: 0.35 }, 0.65);
  }
  if (nodeMap.capcut) {
    tl.to(nodeMap.capcut, { x: -15, y: -45, opacity: 0.3, duration: 0.35 }, 0.65);
  }
  if (filaments) {
    tl.to(filaments, { opacity: 0.15, duration: 0.35 }, 0.65);
  }

  // Desktop Mouse Parallax within Ecosystem
  let mx = 0, my = 0, cx = 0, cy = 0, rafId = null;
  eco.addEventListener('mousemove', (e) => {
    const rect = eco.getBoundingClientRect();
    mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    if (!rafId) updateMouseParallax();
  });

  eco.addEventListener('mouseleave', () => {
    mx = 0;
    my = 0;
  });

  function updateMouseParallax() {
    cx += (mx - cx) * 0.06;
    cy += (my - cy) * 0.06;

    nodes.forEach((node) => {
      const depth = node.dataset.depth;
      const mult = depth === 'foreground' ? 10 : (depth === 'midground' ? 6 : 3.5);
      const inner = node.querySelector('.tool-node-inner');
      if (inner) {
        inner.style.transform = `translate(${cx * mult}px, ${cy * mult}px)`;
      }
    });

    if (Math.abs(mx - cx) > 0.001 || Math.abs(my - cy) > 0.001) {
      rafId = requestAnimationFrame(updateMouseParallax);
    } else {
      rafId = null;
    }
  }
})();

/* ---------- Featured Project: Scroll Reveal & Mockup Parallax ---------- */
(function initFeaturedMockup() {
  const featured = document.getElementById('featured');
  const mockup = document.getElementById('featuredMockup');
  if (!featured || !mockup) return;

  if (reduceMotion) {
    gsap.set(mockup, { opacity: 1, scale: 1, y: 0 });
    return;
  }

  // Scrub-based entrance scale & subtle vertical parallax
  gsap.fromTo(mockup,
    { scale: 0.94, y: 35, opacity: 0.8 },
    {
      scale: 1, y: -15, opacity: 1, ease: 'power2.out',
      scrollTrigger: {
        trigger: featured,
        start: 'top 85%',
        end: 'bottom 40%',
        scrub: 1.1
      }
    }
  );

  // Subtle interactive mouse tilt/parallax on desktop
  if (!window.matchMedia('(pointer: coarse)').matches) {
    let mx = 0, my = 0, cx = 0, cy = 0, raf = null;
    featured.addEventListener('mousemove', (e) => {
      const rect = featured.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!raf) updateMockupParallax();
    });

    featured.addEventListener('mouseleave', () => {
      mx = 0;
      my = 0;
    });

    function updateMockupParallax() {
      cx += (mx - cx) * 0.05;
      cy += (my - cy) * 0.05;

      gsap.set(mockup, {
        rotateX: -cy * 1.8,
        rotateY: cx * 2.2,
        transformPerspective: 1400
      });

      if (Math.abs(mx - cx) > 0.001 || Math.abs(my - cy) > 0.001) {
        raf = requestAnimationFrame(updateMockupParallax);
      } else {
        raf = null;
      }
    }
  }
})();

/* ---------- Process timeline scroll fill ---------- */
/* ---------- Process timeline scrub & sequential milestone activation ---------- */
(function initProcessTimeline() {
  const processSec = document.getElementById('process');
  const timeline = document.getElementById('processTimeline');
  const fill = document.getElementById('timelineFill');
  const steps = gsap.utils.toArray('.timeline-step');
  if (!processSec || !timeline || !fill || !steps.length) return;

  const isVertical = () => window.matchMedia('(max-width:900px)').matches;

  if (reduceMotion) {
    steps.forEach((step) => step.classList.add('is-active'));
    fill.style.width = '100%';
    fill.style.height = '100%';
    return;
  }

  // Thresholds across the 5 milestones:
  // Step 1: Research (0.06)
  // Step 2: Wireframe (0.28)
  // Step 3: UI Design (0.50)
  // Step 4: Prototype (0.72)
  // Step 5: Handoff (0.90)
  const thresholds = [0.06, 0.28, 0.50, 0.72, 0.90];

  ScrollTrigger.create({
    trigger: processSec,
    start: 'top 75%',
    end: 'bottom 45%',
    scrub: 1.1,
    onUpdate: (self) => {
      const p = self.progress;
      if (isVertical()) {
        fill.style.height = Math.min(100, Math.max(0, p * 105)) + '%';
        fill.style.width = '100%';
      } else {
        fill.style.width = Math.min(100, Math.max(0, p * 105)) + '%';
        fill.style.height = '100%';
      }

      // Activate milestones sequentially as the scrub line reaches each node
      steps.forEach((step, i) => {
        const threshold = thresholds[i];
        if (p >= threshold) {
          step.classList.add('is-active');
        } else {
          step.classList.remove('is-active');
        }
      });
    }
  });
})();

/* ---------- Project Category Filter ---------- */
(function initProjectFilter() {
  const bar = document.querySelector('.filter-bar');
  if (!bar) return;
  const buttons = Array.from(bar.querySelectorAll('.filter-btn'));
  const cards = Array.from(document.querySelectorAll('.case-card'));
  let animating = false;

  function applyFilter(filter) {
    if (animating) return;
    animating = true;

    const matches = (c) => filter === 'all' || c.dataset.category === filter;
    const isVisible = (c) => c.style.display !== 'none';
    const toHide = cards.filter((c) => isVisible(c) && !matches(c));
    const toReveal = cards.filter((c) => !isVisible(c) && matches(c));

    const tl = gsap.timeline({
      onComplete: () => {
        animating = false;
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      }
    });

    if (toHide.length) {
      tl.to(toHide, {
        opacity: 0, y: 14, scale: .97, duration: .35, ease: 'power2.in', stagger: .03,
        onComplete: () => { toHide.forEach((c) => c.style.display = 'none'); }
      });
    }

    if (toReveal.length) {
      tl.add(() => {
        toReveal.forEach((c) => {
          c.style.display = '';
          gsap.set(c, { opacity: 0, y: 14, scale: .97 });
        });
      });

      tl.to(toReveal, {
        opacity: 1, y: 0, scale: 1, duration: .5, ease: 'power3.out', stagger: .06
      });
    }

    if (!toHide.length && !toReveal.length) {
      animating = false;
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      buttons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      applyFilter(btn.dataset.filter);
    });
  });
})();

/* ---------- Contact Email Copy Handler ---------- */
(function initContactEmailCopy() {
  const card = document.getElementById('contactEmailCard');
  const label = document.getElementById('contactCopyLabel');
  const textEl = document.getElementById('contactEmailText');
  if (!card || !label || !textEl) return;

  let resetTimer = null;

  async function copyContactEmail() {
    const email = textEl.textContent.trim();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      card.classList.add('is-copied');
      label.textContent = 'COPIED ✓';
    } catch (err) {
      label.textContent = 'FAILED';
    }

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      card.classList.remove('is-copied');
      label.textContent = 'COPY EMAIL';
    }, 2400);
  }

  card.addEventListener('click', copyContactEmail);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyContactEmail();
    }
  });
})();

/* ---------- Contact Signature Scroll Draw ---------- */
(function initContactSignature() {
  const wrap = document.getElementById('contactSignoff');
  const svg = wrap ? wrap.querySelector('.contact-sig-svg') : null;
  const strokes = wrap ? wrap.querySelectorAll('.contact-sig-stroke') : [];
  if (!wrap || !svg || !strokes.length) return;

  strokes.forEach((p) => {
    const len = (typeof p.getTotalLength === 'function') ? p.getTotalLength() : 1200;
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
  });

  ScrollTrigger.create({
    trigger: wrap,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      svg.classList.add('is-drawn');
      gsap.to(strokes, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.out',
        stagger: 0.1
      });
    }
  });
})();

