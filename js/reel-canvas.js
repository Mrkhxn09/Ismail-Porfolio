/**
 * Reel Motion Study Canvas Module
 * Implements generative geometric animation, timecode calculation, and video player controls.
 */

(function initReelCanvas() {
  const canvas = document.getElementById('reelCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const tcEl = document.getElementById('reelTC');
  const barFillEl = document.getElementById('reelBarFill');
  const toggleBtn = document.getElementById('reelToggle');
  const icon = document.getElementById('reelIcon');
  let w, h, playing = true, frame = 0, raf = null, tabVisible = !document.hidden, inViewport = true;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function fmtTC(progress) {
    const totalFrames = Math.floor(progress * 24 * 60 * 4); // ~4min reel at 24fps
    const fps = 24;
    const totalSeconds = Math.floor(totalFrames / fps);
    const frames = totalFrames % fps;
    const hh = Math.floor(totalSeconds / 3600);
    const mm = Math.floor((totalSeconds % 3600) / 60);
    const ss = totalSeconds % 60;
    return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(frames)}`;
  }

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const N = 42;
  const pts = Array.from({ length: N }, (_, i) => ({
    a: (i / N) * Math.PI * 2,
    speed: 0.004 + Math.random() * 0.01,
    rad: 0.55 + Math.random() * 0.35
  }));

  function shouldRun() {
    return playing && tabVisible && inViewport;
  }

  function draw() {
    ctx.fillStyle = '#0A0B0C';
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    ctx.lineWidth = 1.4;

    pts.forEach((p, i) => {
      p.a += p.speed;
      const r = Math.min(w, h) * 0.5 * p.rad * (0.7 + 0.3 * Math.sin(p.a * 2));
      const x = cx + Math.cos(p.a) * r;
      const y = cy + Math.sin(p.a) * r * 0.55;
      const hue = i % 2 === 0 ? 'rgba(232,134,46,' : 'rgba(47,167,155,';
      ctx.beginPath();
      ctx.strokeStyle = hue + (0.15 + 0.55 * Math.abs(Math.sin(p.a))) + ')';
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#EEEAE2';
    ctx.fill();

    frame++;
    const prog = (frame % (24 * 20)) / (24 * 20);
    if (tcEl) tcEl.textContent = fmtTC(prog);
    if (barFillEl) barFillEl.style.width = (prog * 100) + '%';

    if (shouldRun()) {
      raf = requestAnimationFrame(draw);
    } else {
      raf = null;
    }
  }

  draw(); // always paint one frame

  function kick() {
    if (shouldRun() && !raf) {
      raf = requestAnimationFrame(draw);
    }
  }

  if (toggleBtn && icon) {
    toggleBtn.addEventListener('click', () => {
      playing = !playing;
      icon.innerHTML = playing
        ? '<polygon points="0,0 10,6 0,12"></polygon>'
        : '<rect x="0" y="0" width="3.5" height="12"></rect><rect x="6.5" y="0" width="3.5" height="12"></rect>';
      kick();
    });
  }

  document.addEventListener('visibilitychange', () => {
    tabVisible = !document.hidden;
    kick();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      inViewport = entries[0].isIntersecting;
      kick();
    }, { threshold: 0 }).observe(canvas);
  }
})();
