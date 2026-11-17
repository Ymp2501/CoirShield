// Drifting points of light behind the page-hero bands. Pauses off screen; one still frame under reduced motion.
export function initAmbient(canvas) {
  const ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const host = canvas.parentElement;
  let W = 0, H = 0, dpr = 1, motes = [], running = false, visible = true, last = 0, t = 0;

  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 32;
  const sg = sprite.getContext('2d');
  const gr = sg.createRadialGradient(16, 16, 0, 16, 16, 16);
  gr.addColorStop(0, 'rgba(79,195,161,1)');
  gr.addColorStop(0.3, 'rgba(79,195,161,0.45)');
  gr.addColorStop(1, 'rgba(79,195,161,0)');
  sg.fillStyle = gr;
  sg.fillRect(0, 0, 32, 32);

  function resize() {
    const r = host.getBoundingClientRect();
    W = r.width;
    H = r.height;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    const n = Math.round(Math.min(70, (W * H) / 9000));
    motes = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      v: 4 + Math.random() * 12,
      dx: (Math.random() - 0.5) * 6,
      s: 4 + Math.random() * 10,
      p: Math.random() * Math.PI * 2,
    }));
    draw(0);
  }

  function draw(dt) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (const m of motes) {
      if (dt) {
        m.y -= m.v * dt;
        m.x += m.dx * dt;
        if (m.y < -12) {
          m.y = H + 12;
          m.x = Math.random() * W;
        }
      }
      ctx.globalAlpha = 0.18 + 0.22 * (0.5 + 0.5 * Math.sin(t * 1.2 + m.p));
      ctx.drawImage(sprite, m.x - m.s / 2, m.y - m.s / 2, m.s, m.s);
    }
  }

  function loop(now) {
    if (!running) return;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    t += dt;
    draw(dt);
    requestAnimationFrame(loop);
  }
  const play = () => {
    if (running || reduce || !visible || document.hidden) return;
    running = true;
    last = 0;
    requestAnimationFrame(loop);
  };
  const pause = () => (running = false);

  new ResizeObserver(() => resize()).observe(host);
  if ('IntersectionObserver' in window)
    new IntersectionObserver((e) => {
      visible = e[0].isIntersecting;
      visible ? play() : pause();
    }).observe(host);
  document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));
  resize();
  play();
}
