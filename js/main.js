/**
 * Main Application Module
 * Initializes global dependencies, clock ticker, and orchestrates modules.
 */

// Register GSAP Plugins
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Live Clock Ticker
(function initClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return;

  function tickClock() {
    const d = new Date();
    clockEl.textContent = [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map((v) => String(v).padStart(2, '0'))
      .join(':');
  }

  tickClock();
  setInterval(tickClock, 1000);
})();
