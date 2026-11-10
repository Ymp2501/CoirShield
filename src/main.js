// Progressive enhancement only. The site is fully readable without this file.

/* Mobile navigation */
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      toggle.focus();
    }
  });
}

/* Tabs (For Customers). Arrow keys move between tabs; #household / #kirana deep-link. */
document.querySelectorAll('[data-tabs]').forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const select = (tab, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const move = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (move) select(tabs[(i + move + tabs.length) % tabs.length], true);
      if (e.key === 'Home') select(tabs[0], true);
      if (e.key === 'End') select(tabs[tabs.length - 1], true);
    });
  });
  const fromHash = tabs.find((t) => `#${t.id.replace('tab-', '')}` === location.hash);
  select(fromHash || tabs[0]);
});

/* Staggered scroll reveal (skipped when the visitor prefers reduced motion) */
const items = document.querySelectorAll('[data-reveal]');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce || !('IntersectionObserver' in window)) {
  items.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  items.forEach((el) => io.observe(el));
}

/* Scroll story (Home): the zone whose card is mid-screen lights up in the diagram */
document.querySelectorAll('[data-story]').forEach((root) => {
  const fig = root.querySelector('.puck-figure');
  const steps = [...root.querySelectorAll('[data-step]')];
  if (!fig || !('IntersectionObserver' in window)) return;
  const storyIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        fig.dataset.active = en.target.dataset.step;
        steps.forEach((s) => s.classList.toggle('active', s === en.target));
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
  );
  steps.forEach((s) => storyIo.observe(s));
});

/* 3D puck (Home): tilt with the pointer. Mouse only, and never when reduced motion is on. */
const tilt = document.querySelector('[data-tilt]');
if (tilt && !reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const area = tilt.closest('.hero') || tilt;
  let frame = 0;
  area.addEventListener('pointermove', (e) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const r = area.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.setProperty('--tz', `${(x * 36).toFixed(1)}deg`);
      tilt.style.setProperty('--tx', `${(-y * 14).toFixed(1)}deg`);
    });
  });
  area.addEventListener('pointerleave', () => {
    tilt.style.setProperty('--tz', '0deg');
    tilt.style.setProperty('--tx', '0deg');
  });
}
