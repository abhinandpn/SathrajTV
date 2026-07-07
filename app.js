/* ============================================================
   SathrajTV — JavaScript: Interactions, Time, Particles
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ── Live clock ────────────────────────────────────────────
  const timeEl = document.getElementById('localTime');

  function updateTime() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }

  updateTime();
  setInterval(updateTime, 1000);

  // ── Hide loading overlay after iframe loads ───────────────
  const iframe   = document.getElementById('liveFrame');
  const overlay  = document.getElementById('loadingOverlay');

  // Auto-hide after 4 seconds as fallback (cross-origin iframes may not fire load)
  const hideLoader = () => {
    overlay.classList.add('hidden');
  };

  iframe.addEventListener('load', hideLoader);
  setTimeout(hideLoader, 4000);

  // ── Animated background particles ────────────────────────
  const container = document.getElementById('bgParticles');

  const COLORS = [
    'rgba(255, 68, 68, 0.5)',
    'rgba(255, 140, 0, 0.4)',
    'rgba(255, 68, 68, 0.3)',
    'rgba(200, 50, 50, 0.4)',
  ];

  function createParticle() {
    const el = document.createElement('div');
    el.className = 'particle';

    const size     = Math.random() * 4 + 1.5;  // 1.5–5.5 px
    const startX   = Math.random() * 100;       // % across screen
    const duration = Math.random() * 18 + 12;   // 12–30 s
    const delay    = Math.random() * 10;
    const color    = COLORS[Math.floor(Math.random() * COLORS.length)];

    el.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${startX}%;
      bottom: -10px;
      background: ${color};
      box-shadow: 0 0 ${size * 2}px ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(el);

    // Remove when animation cycle ends to avoid DOM bloat
    setTimeout(() => el.remove(), (duration + delay) * 1000);
  }

  // Spawn initial batch
  for (let i = 0; i < 25; i++) createParticle();

  // Continually spawn new particles
  setInterval(() => {
    if (container.children.length < 60) createParticle();
  }, 1200);

});
