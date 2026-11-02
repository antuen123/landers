(() => {
  const progress = document.querySelector('.reading-progress');
  let pending = false;
  function update() {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0}%`;
    pending = false;
  }
  window.addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.sidebar nav a')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) links.forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-5% 0px -70% 0px' });
    links.forEach(link => { const target = document.querySelector(link.hash); if (target) observer.observe(target); });
  }
})();
