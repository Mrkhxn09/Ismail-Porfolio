/**
 * Interactions & Scroll Triggers Module
 * Manages hero entrance sequencing, parallax, role rotation, clipboard copying,
 * work category filtering, and scroll-triggered animations.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Hero Entrance Animation ---------- */
window.heroIntro = function heroIntro() {
  gsap.set('header.nav', { opacity: 0 });
  gsap.set('.hero-kicker, .hero-super', { opacity: 0, y: 14 });
  gsap.set('.hero-bgname', { opacity: 0 });
  gsap.set('.hero-portrait', { opacity: 0, y: 18 });
  gsap.set('.hero-roles, .hero-cta, .hero-scrollcue, .hero-copy-email', { opacity: 0, y: 14 });
  gsap.set('.float-card, .hero-float-traits', { opacity: 0, y: 14 });

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  if (reduceMotion) {
    gsap.set('.hero-bgname', { opacity: 1 });
    tl.to(['header.nav', '.hero-kicker', '.hero-super', '.hero-portrait', '.hero-roles', '.hero-cta',
           '.hero-scrollcue', '.float-card', '.hero-float-traits', '.hero-copy-email'],
        { opacity: 1, y: 0, duration: .5 }, 0)
      .to('.letter-reveal', {
        y: '0%', duration: .6,
        onComplete: () => {
          document.querySelectorAll('h1.hero-name .line').forEach((l) => { l.style.overflow = 'visible'; });
        }
      }, 0);
    return;
  }

  // Beat 1 — identity
  tl.to('header.nav', { opacity: 1, duration: 1.1 }, 0)
    .to('.hero-kicker', { opacity: 1, y: 0, duration: 1 }, .1)
    .to('.hero-super', { opacity: 1, y: 0, duration: 1 }, .2)
    // Beat 2 — background name
    .to('.hero-bgname', { opacity: 1, duration: 2, ease: 'power1.out' }, .3)
    // Beat 3 — portrait
    .to('.hero-portrait', { opacity: 1, y: 0, duration: 1.6, ease: 'power1.out' }, .6)
    // readable name reveals
    .to('.letter-reveal', {
      y: '0%', duration: 1.1, ease: 'power2.out',
      onComplete: () => {
        document.querySelectorAll('h1.hero-name .line').forEach((l) => { l.style.overflow = 'visible'; });
      }
    }, 1.0)
    // Beat 4 — supporting details
    .to(['.hero-roles', '.hero-cta', '.hero-scrollcue', '.hero-copy-email'],
        { opacity: 1, y: 0, duration: .9, stagger: .08 }, 1.6)
    .to('.float-card', { opacity: 1, y: 0, duration: .9, stagger: .1 }, 1.7)
    .to('.hero-float-traits', { opacity: 1, y: 0, duration: .9 }, 1.8);
};

/* ---------- Hero scroll parallax ---------- */
if (!reduceMotion) {
  ScrollTrigger.create({
    trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1,
    onUpdate: (self) => {
      const p = self.progress;
      gsap.set('.hero-bgname', { y: -p * 70 });
      gsap.set('.hero-glow', { y: -p * 40 });
      gsap.set('.hero-portrait', { y: -p * 16 });
    }
  });
}

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

/* ---------- Reveal on scroll ---------- */
gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.fromTo(el, { opacity: 0, y: 28 }, {
    opacity: 1, y: 0, duration: .9, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

/* ---------- Case study card wipe reveal ---------- */
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

/* ---------- Tool cards: animate percentage bar ---------- */
gsap.utils.toArray('.tool-card').forEach((card) => {
  const fill = card.querySelector('.tool-bar-fill');
  const pct = card.dataset.pct;
  if (!fill || !pct) return;
  ScrollTrigger.create({
    trigger: card, start: 'top 88%',
    onEnter: () => { fill.style.width = pct + '%'; }
  });
});

/* ---------- Process timeline scroll fill ---------- */
(function initProcessTimeline() {
  const timeline = document.querySelector('.timeline');
  const fill = document.getElementById('timelineFill');
  const steps = gsap.utils.toArray('.timeline-step');
  if (!timeline || !fill || !steps.length) return;

  const isVertical = () => window.matchMedia('(max-width:900px)').matches;

  ScrollTrigger.create({
    trigger: timeline, start: 'top 75%', end: 'bottom 60%', scrub: .6,
    onUpdate: (self) => {
      if (isVertical()) {
        fill.style.height = (self.progress * 100) + '%';
        fill.style.width = '100%';
      } else {
        fill.style.width = (self.progress * 100) + '%';
        fill.style.height = '100%';
      }
    }
  });

  steps.forEach((step, i) => {
    gsap.set(step.querySelector('.step-content'), { opacity: 0, y: 24 });
    ScrollTrigger.create({
      trigger: step, start: 'top 82%',
      onEnter: () => {
        step.classList.add('is-active');
        gsap.to(step.querySelector('.step-content'), {
          opacity: 1, y: 0, duration: .7, ease: 'power3.out', delay: i * .05
        });
      }
    });
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
      onComplete: () => { animating = false; }
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
