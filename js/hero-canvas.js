/**
 * Hero Background Canvas Module
 * Generates floating, interactive gradient blobs with cursor parallax and viewport observation.
 */

(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer:coarse)').matches;
  let w, h;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener('resize', resize);

  const blobs = [
    { x: .3, y: .35, r: .35, c: 'rgba(232,134,46,0.35)', dx: .00008, dy: .00006 },
    { x: .7, y: .6, r: .30, c: 'rgba(47,167,155,0.30)', dx: -.00006, dy: .00009 },
    { x: .55, y: .2, r: .22, c: 'rgba(199,125,255,0.14)', dx: .00005, dy: -.00007 }
  ];

  // subtle cursor-reactive parallax (desktop pointer only)
  let px = 0, py = 0, tx = 0, ty = 0;
  if (!isTouch && !reduceMotion) {
    window.addEventListener('mousemove', (e) => {
      tx = (e.clientX / window.innerWidth - .5) * 2;
      ty = (e.clientY / window.innerHeight - .5) * 2;
    });
  }

  let t = 0, raf = null, tabVisible = !document.hidden, inViewport = true;

  function shouldRun() {
    return !reduceMotion && tabVisible && inViewport;
  }

  function draw() {
    t++;
    px += (tx - px) * 0.04;
    py += (ty - py) * 0.04;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    blobs.forEach((b) => {
      const bx = (b.x + Math.sin(t * b.dx * 40) * 0.06) * w + px * 24;
      const by = (b.y + Math.cos(t * b.dy * 40) * 0.06) * h + py * 24;
      const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r * Math.max(w, h));
      grad.addColorStop(0, b.c);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    });
    if (shouldRun()) {
      raf = requestAnimationFrame(draw);
    } else {
      raf = null;
    }
  }

  if (reduceMotion) {
    // draw a single static frame instead of animating
    draw();
  } else {
    draw();
    document.addEventListener('visibilitychange', () => {
      tabVisible = !document.hidden;
      if (shouldRun() && !raf) {
        draw();
      }
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        inViewport = entries[0].isIntersecting;
        if (shouldRun() && !raf) {
          draw();
        }
      }, { threshold: 0 }).observe(canvas.closest('#hero') || canvas);
    }
  }
})();
