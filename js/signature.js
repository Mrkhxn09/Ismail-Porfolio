/**
 * Signature Intro Animation Module
 * Simulates handwriting motion using SVG path length sampling, dynamic weighting, and glowing pen tip.
 */

(function initSignatureIntro() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wrap = document.getElementById('signatureIntro');
  
  function triggerHero() {
    if (typeof window.heroIntro === 'function') {
      window.heroIntro();
    }
  }

  if (!wrap) {
    triggerHero();
    return;
  }

  gsap.set('#hero', { opacity: 0, y: 40 });

  if (reduceMotion) {
    wrap.style.display = 'none';
    gsap.set('#hero', { opacity: 1, y: 0 });
    triggerHero();
    return;
  }

  const strokeGroup = document.getElementById('sigStrokesGroup');
  const strokeEls = Array.from(document.querySelectorAll('.sig-stroke'));
  const penTip = document.getElementById('penTip');
  const penCore = document.getElementById('penCore');
  const penCenter = document.getElementById('penCenter');
  const penGlowOuter = document.getElementById('penGlowOuter');
  const penTrail1 = document.getElementById('penTrail1');
  const penTrail2 = document.getElementById('penTrail2');

  if (!strokeEls.length || !penTip) {
    wrap.style.display = 'none';
    gsap.set('#hero', { opacity: 1, y: 0 });
    triggerHero();
    return;
  }

  // Prepare every stroke: hide via dasharray/dashoffset, and build a per-stroke
  // curvature-weighted timing map for natural, uneven handwriting speed.
  function prepare(path) {
    const totalLen = path.getTotalLength();
    path.style.strokeDasharray = totalLen;
    path.style.strokeDashoffset = totalLen;
    const N = Math.max(16, Math.min(140, Math.round(totalLen / 6)));
    const sampleLens = [];
    for (let i = 0; i <= N; i++) {
      sampleLens.push((totalLen * i) / N);
    }
    const pts = sampleLens.map((len) => path.getPointAtLength(len));
    const avgStep = totalLen / N || 1;
    const weights = [1];
    for (let i = 1; i < N; i++) {
      const a = pts[i - 1], b = pts[i], c = pts[i + 1];
      const v1x = b.x - a.x, v1y = b.y - a.y, v2x = c.x - b.x, v2y = c.y - b.y;
      const len1 = Math.hypot(v1x, v1y) || 0.0001, len2 = Math.hypot(v2x, v2y) || 0.0001;
      const cosA = Math.max(-1, Math.min(1, (v1x * v2x + v1y * v2y) / (len1 * len2)));
      const angle = Math.acos(cosA); // 0 = straight, PI = sharp reversal
      const isPenLift = len1 > avgStep * 4;
      let w = 0.6 + angle * 1.7;
      if (isPenLift) w += 2.2; // brief pause at direction changes / joins
      weights.push(w);
    }
    weights.push(weights[weights.length - 1]);
    const cum = [0];
    for (let i = 1; i <= N; i++) {
      cum.push(cum[i - 1] + (weights[i - 1] + weights[i]) / 2);
    }
    const cumTotal = cum[N] || 1;
    const normCum = cum.map((v) => v / cumTotal);

    function lengthForT(t) {
      let lo = 0, hi = N;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (normCum[mid] < t) lo = mid + 1;
        else hi = mid;
      }
      const i = Math.max(1, lo);
      const t0 = normCum[i - 1], t1 = normCum[i];
      const l0 = sampleLens[i - 1], l1 = sampleLens[i];
      const localT = t1 > t0 ? (t - t0) / (t1 - t0) : 0;
      return l0 + (l1 - l0) * localT;
    }
    return { path, totalLen, lengthForT, group: path.dataset.group };
  }

  const prepared = strokeEls.map(prepare);
  const byGroup = {};
  prepared.forEach((p) => {
    (byGroup[p.group] = byGroup[p.group] || []).push(p);
  });

  // pen tip: trailing echo positions + speed-proportional motion blur
  let history = [];
  function positionPen(x, y, speedFrac) {
    penCore.setAttribute('cx', x);
    penCore.setAttribute('cy', y);
    penCenter.setAttribute('cx', x);
    penCenter.setAttribute('cy', y);
    penGlowOuter.setAttribute('cx', x);
    penGlowOuter.setAttribute('cy', y);
    history.push({ x, y });
    if (history.length > 6) history.shift();
    const t1 = history[Math.max(0, history.length - 3)] || { x, y };
    const t2 = history[Math.max(0, history.length - 5)] || { x, y };
    penTrail1.setAttribute('cx', t1.x);
    penTrail1.setAttribute('cy', t1.y);
    penTrail2.setAttribute('cx', t2.x);
    penTrail2.setAttribute('cy', t2.y);
    const blur = Math.min(2.2, speedFrac * 2.2);
    penCore.style.filter = blur > 0.15 ? `url(#penGlowFilter) blur(${blur.toFixed(2)}px)` : 'url(#penGlowFilter)';
  }

  function drawStroke(item, duration, ease) {
    return new Promise((resolve) => {
      const state = { t: 0 };
      let lastLen = 0;
      gsap.to(state, {
        t: 1,
        duration,
        ease: ease || 'none',
        onUpdate: () => {
          const dist = item.lengthForT(state.t);
          item.path.style.strokeDashoffset = item.totalLen - dist;
          const pt = item.path.getPointAtLength(dist);
          const speedFrac = Math.min(1, Math.abs(dist - lastLen) / (item.totalLen / 30 || 1));
          lastLen = dist;
          positionPen(pt.x, pt.y, speedFrac);
        },
        onComplete: resolve
      });
    });
  }

  function tweenPromise(target, vars) {
    return new Promise((resolve) => {
      gsap.to(target, { ...vars, onComplete: resolve });
    });
  }

  async function playSequence() {
    const first = byGroup.capitalI[0];
    const startPt = first.path.getPointAtLength(0);
    history = [{ x: startPt.x, y: startPt.y }];
    positionPen(startPt.x, startPt.y, 0);

    // pen tip appears and pulses once before moving
    gsap.set(penTip, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
    await tweenPromise(penTip, { opacity: 1, scale: 1.6, duration: .15, ease: 'sine.out' });
    await tweenPromise(penTip, { scale: 1, duration: .15, ease: 'sine.in' });

    // === main strokes, in natural writing order ===
    await drawStroke(first, .42, 'sine.inOut'); // capital loop

    for (const s of byGroup.smailBody || []) await drawStroke(s, .1, 'sine.inOut');

    if (byGroup.lAscender && byGroup.lAscender[0]) {
      await drawStroke(byGroup.lAscender[0], .16, 'power1.inOut');
    }

    for (const s of byGroup.khanBody || []) await drawStroke(s, .085, 'sine.inOut');

    // the underline
    if (byGroup.underline && byGroup.underline[0]) {
      await drawStroke(byGroup.underline[0], .32, 'power1.out');
    }

    // lift the pen ~10px before it fades
    await tweenPromise(penTip, { y: '-=10', duration: .18, ease: 'sine.out' });

    // === small dots and marks ===
    for (const s of byGroup.dots || []) await drawStroke(s, .06, 'power2.out');
    for (const s of byGroup.smileyFace || []) await drawStroke(s, .07, 'power2.out');

    // pen lifts away entirely
    await tweenPromise(penTip, { opacity: 0, duration: .25, ease: 'power2.out' });

    // soft warm glow breathes around the finished signature
    await new Promise((res) => {
      gsap.timeline({ delay: .5, onComplete: res })
        .to(strokeGroup, { filter: 'drop-shadow(0 0 10px rgba(232,134,46,.55))', duration: .3, ease: 'sine.out' })
        .to(strokeGroup, { filter: 'drop-shadow(0 0 0px rgba(232,134,46,0))', duration: .4, ease: 'sine.in' });
    });

    // signature dissolves while the homepage emerges
    gsap.timeline()
      .to('#signatureIntro', { opacity: 0, scale: 1.05, filter: 'blur(6px)', duration: 1, ease: 'power2.inOut' }, 0)
      .to('#hero', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 0)
      .call(() => { triggerHero(); }, null, .25)
      .set('#signatureIntro', { display: 'none' });
  }

  gsap.delayedCall(.2, playSequence);
})();
