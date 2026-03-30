const supportsReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealElement = (el, binding) => {
  const delay = Number(binding?.value) || 0;

  el.classList.add('reveal');
  el.style.transitionDelay = `${delay}ms`;

  if (supportsReducedMotion()) {
    requestAnimationFrame(() => {
      el.classList.add('reveal--visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -40px 0px',
    },
  );

  el.__revealObserver = observer;
  observer.observe(el);
};

export default {
  mounted(el, binding) {
    revealElement(el, binding);
  },
  unmounted(el) {
    if (el.__revealObserver) {
      el.__revealObserver.disconnect();
      delete el.__revealObserver;
    }
  },
};
