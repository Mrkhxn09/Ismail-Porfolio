/**
 * Signature Intro Animation Module
 * Simulates luxury calligraphy handwriting for "Ismail Khan" using SVG path length sampling,
 * dynamic curvature weighting, realistic pen lifts/glides, and a glowing amber pen tip.
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
    const N = Math.max(16, Math.min(180, Math.round(totalLen / 5)));
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
      let w = 0.6 + angle * 1.8;
      if (isPenLift) w += 2.4;
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

  // Pen tip: trailing echo positions + speed-proportional motion blur
  let history = [];
  function positionPen(x, y, speedFrac) {
    penCore.setAttribute('cx', x);
    penCore.setAttribute('cy', y);
    penCenter.setAttribute('cx', x);
    penCenter.setAttribute('cy', y);
    penGlowOuter.setAttribute('cx', x);
    penGlowOuter.setAttribute('cy', y);
    history.push({ x, y });
    if (history.length > 7) history.shift();
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

  function glidePen(targetX, targetY, duration = 0.1) {
    return new Promise((resolve) => {
      const startPt = history[history.length - 1] || { x: targetX, y: targetY };
      const obj = { x: startPt.x, y: startPt.y };
      
      gsap.to([penTrail1, penTrail2], { opacity: 0, duration: 0.04 });
      gsap.to(penTip, { scale: 0.8, opacity: 0.7, duration: duration * 0.4, ease: 'power1.out' });
      
      gsap.to(obj, {
        x: targetX,
        y: targetY,
        duration: duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          positionPen(obj.x, obj.y, 0.35);
        },
        onComplete: () => {
          gsap.to(penTip, { scale: 1, opacity: 1, duration: 0.05, ease: 'sine.in' });
          gsap.to(penTrail1, { opacity: 0.22, duration: 0.05 });
          gsap.to(penTrail2, { opacity: 0.12, duration: 0.05 });
          resolve();
        }
      });
    });
  }

  function tweenPromise(target, vars) {
    return new Promise((resolve) => {
      gsap.to(target, { ...vars, onComplete: resolve });
    });
  }

  async function playSequence() {
    const capIStroke = byGroup.capI ? byGroup.capI[0] : null;
    const smailStroke = byGroup.smailBody ? byGroup.smailBody[0] : null;
    const dotIStroke = byGroup.dots ? byGroup.dots[0] : null;
    const khanStroke = byGroup.khanBody ? byGroup.khanBody[0] : null;
    const underline1Stroke = byGroup.underline1 ? byGroup.underline1[0] : null;
    const underline2Stroke = byGroup.underline2 ? byGroup.underline2[0] : null;
    const smileyEyes = byGroup.smileyEyes || [];
    const smileySmile = byGroup.smileySmile ? byGroup.smileySmile[0] : null;

    if (!capIStroke) return;

    // 1. Initial pen tip positioning at Capital I start
    const startPt = capIStroke.path.getPointAtLength(0);
    history = [{ x: startPt.x, y: startPt.y }];
    positionPen(startPt.x, startPt.y, 0);

    // Pen tip appears quickly with a luminous flash
    gsap.set(penTip, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
    await tweenPromise(penTip, { opacity: 1, scale: 1.3, duration: 0.08, ease: 'sine.out' });
    await tweenPromise(penTip, { scale: 1, duration: 0.05, ease: 'sine.in' });

    // 2. Draw Capital "I"
    await drawStroke(capIStroke, 0.28, 'sine.inOut');

    // 3. Glide pen to "s-m-a-i-l"
    if (smailStroke) {
      const smailStart = smailStroke.path.getPointAtLength(0);
      await glidePen(smailStart.x, smailStart.y, 0.04);
      await drawStroke(smailStroke, 0.42, 'sine.inOut');
    }

    // 4. Glide pen to dot the "i"
    if (dotIStroke) {
      const dotStart = dotIStroke.path.getPointAtLength(0);
      await glidePen(dotStart.x, dotStart.y, 0.035);
      await drawStroke(dotIStroke, 0.05, 'power1.out');
    }

    // 5. Glide pen to "Khan"
    if (khanStroke) {
      const khanStart = khanStroke.path.getPointAtLength(0);
      await glidePen(khanStart.x, khanStart.y, 0.04);
      await drawStroke(khanStroke, 0.44, 'sine.inOut');
    }

    // 6. Glide pen to Main Underline
    if (underline1Stroke) {
      const u1Start = underline1Stroke.path.getPointAtLength(0);
      await glidePen(u1Start.x, u1Start.y, 0.04);
      await drawStroke(underline1Stroke, 0.20, 'power1.out');
    }

    // 7. Glide pen to Secondary Underline Accent
    if (underline2Stroke) {
      const u2Start = underline2Stroke.path.getPointAtLength(0);
      await glidePen(u2Start.x, u2Start.y, 0.03);
      await drawStroke(underline2Stroke, 0.14, 'power1.out');
    }

    // 8. Glide pen to Smiley Face
    for (const eye of smileyEyes) {
      const eyeStart = eye.path.getPointAtLength(0);
      await glidePen(eyeStart.x, eyeStart.y, 0.03);
      await drawStroke(eye, 0.035, 'power2.out');
    }

    if (smileySmile) {
      const smileStart = smileySmile.path.getPointAtLength(0);
      await glidePen(smileStart.x, smileStart.y, 0.03);
      await drawStroke(smileySmile, 0.08, 'sine.out');
    }

    // 9. Pen lifts away smoothly
    tweenPromise(penTip, { y: '-=12', opacity: 0, duration: 0.12, ease: 'power2.out' });

    // 10. Immediate amber shimmer bloom (no dead pause)
    await new Promise((res) => {
      gsap.timeline({ delay: 0.05, onComplete: res })
        .to(strokeGroup, { filter: 'drop-shadow(0 0 12px rgba(232,134,46,0.6))', duration: 0.18, ease: 'sine.out' })
        .to(strokeGroup, { filter: 'drop-shadow(0 0 0px rgba(232,134,46,0))', duration: 0.22, ease: 'sine.in' });
    });

    // 11. Immediate seamless transition to Hero
    gsap.timeline()
      .to('#signatureIntro', { opacity: 0, scale: 1.03, filter: 'blur(6px)', duration: 0.65, ease: 'power2.inOut' }, 0)
      .to('#hero', { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 0)
      .call(() => { triggerHero(); }, null, 0.05)
      .set('#signatureIntro', { display: 'none' });
  }

  gsap.delayedCall(0.06, playSequence);
})();


