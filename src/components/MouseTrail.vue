<template>
  <canvas ref="canvasRef" class="mouse-trail" aria-hidden="true"></canvas>
  <div
    ref="cursorAuraRef"
    :class="['custom-cursor custom-cursor--aura', cursorStateClass]"
    aria-hidden="true"
  ></div>
  <div
    ref="cursorCoreRef"
    :class="['custom-cursor custom-cursor--core', cursorStateClass]"
    aria-hidden="true"
  >
    <span class="custom-cursor__blade"></span>
    <span class="custom-cursor__dot"></span>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const canvasRef = ref(null);
const cursorAuraRef = ref(null);
const cursorCoreRef = ref(null);

const particles = [];
let context = null;
let animationFrame = 0;
let enabled = false;
let targetX = 0;
let targetY = 0;
let auraX = 0;
let auraY = 0;

const cursorState = ref({
  visible: false,
  interactive: false,
  pressed: false,
});

const cursorStateClass = computed(() => ({
  'custom-cursor--visible': cursorState.value.visible,
  'custom-cursor--interactive': cursorState.value.interactive,
  'custom-cursor--pressed': cursorState.value.pressed,
}));

const hasFinePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isInteractiveTarget = (target) => {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.closest(
      'a, button, input, textarea, select, label, [role="button"], .project-card, .project-modal__thumb, .stack-pill, .contact-card',
    ),
  );
};

const setCursorPosition = () => {
  if (!cursorAuraRef.value || !cursorCoreRef.value) {
    return;
  }

  auraX += (targetX - auraX) * 0.16;
  auraY += (targetY - auraY) * 0.16;

  cursorCoreRef.value.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) rotate(45deg)`;
  cursorAuraRef.value.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) rotate(18deg)`;
};

const resizeCanvas = () => {
  if (!canvasRef.value) {
    return;
  }

  const ratio = window.devicePixelRatio || 1;
  canvasRef.value.width = window.innerWidth * ratio;
  canvasRef.value.height = window.innerHeight * ratio;
  canvasRef.value.style.width = `${window.innerWidth}px`;
  canvasRef.value.style.height = `${window.innerHeight}px`;
  context = canvasRef.value.getContext('2d');
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
};

const spawnParticles = (x, y) => {
  for (let index = 0; index < 3; index += 1) {
    particles.push({
      x,
      y,
      life: 1,
      size: 14 + Math.random() * 18,
      velocityX: (Math.random() - 0.5) * 1.4,
      velocityY: (Math.random() - 0.5) * 1.4,
      hue: index % 2 === 0 ? 170 : 34,
    });
  }
};

const drawParticle = (particle) => {
  const gradient = context.createRadialGradient(
    particle.x,
    particle.y,
    0,
    particle.x,
    particle.y,
    particle.size,
  );

  const alpha = particle.life * 0.28;

  gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 74%, ${alpha})`);
  gradient.addColorStop(0.45, `hsla(${particle.hue}, 100%, 60%, ${alpha * 0.65})`);
  gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`);

  context.fillStyle = gradient;
  context.beginPath();
  context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  context.fill();
};

const render = () => {
  if (!enabled || !context || !canvasRef.value) {
    return;
  }

  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.globalCompositeOperation = 'lighter';

  for (let index = particles.length - 1; index >= 0; index -= 1) {
    const particle = particles[index];

    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
    particle.life -= 0.028;
    particle.size *= 0.985;

    if (particle.life <= 0.02) {
      particles.splice(index, 1);
      continue;
    }

    drawParticle(particle);
  }

  setCursorPosition();
  animationFrame = window.requestAnimationFrame(render);
};

const handlePointerMove = (event) => {
  targetX = event.clientX;
  targetY = event.clientY;

  if (!cursorState.value.visible) {
    auraX = targetX;
    auraY = targetY;
  }

  cursorState.value = {
    ...cursorState.value,
    visible: true,
    interactive: isInteractiveTarget(event.target),
  };

  spawnParticles(event.clientX, event.clientY);
};

const handlePointerDown = () => {
  cursorState.value = {
    ...cursorState.value,
    pressed: true,
  };
};

const handlePointerUp = () => {
  cursorState.value = {
    ...cursorState.value,
    pressed: false,
  };
};

const handlePointerLeave = () => {
  cursorState.value = {
    ...cursorState.value,
    visible: false,
    pressed: false,
  };
};

const setup = () => {
  enabled = hasFinePointer();

  if (!enabled) {
    return;
  }

  document.documentElement.classList.add('has-custom-cursor');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('pointerdown', handlePointerDown, { passive: true });
  window.addEventListener('pointerup', handlePointerUp, { passive: true });
  window.addEventListener('pointerleave', handlePointerLeave);
  animationFrame = window.requestAnimationFrame(render);
};

const cleanup = () => {
  enabled = false;
  particles.length = 0;
  document.documentElement.classList.remove('has-custom-cursor');
  window.removeEventListener('resize', resizeCanvas);
  window.removeEventListener('pointermove', handlePointerMove);
  window.removeEventListener('pointerdown', handlePointerDown);
  window.removeEventListener('pointerup', handlePointerUp);
  window.removeEventListener('pointerleave', handlePointerLeave);
  window.cancelAnimationFrame(animationFrame);
};

onMounted(() => {
  setup();
});

onBeforeUnmount(() => {
  cleanup();
});
</script>

<style>
.mouse-trail,
.custom-cursor {
  position: fixed;
  inset: 0 auto auto 0;
  pointer-events: none;
}

.mouse-trail {
  z-index: 4;
  width: 100%;
  height: 100%;
  opacity: 0.95;
}

.custom-cursor {
  top: 0;
  left: 0;
  z-index: 55;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.16s ease, width 0.22s ease, height 0.22s ease, border-color 0.22s ease, background 0.22s ease;
  will-change: transform;
}

.custom-cursor--visible {
  opacity: 1;
}

.custom-cursor--aura {
  width: 42px;
  height: 42px;
  margin-top: -21px;
  margin-left: -21px;
  border: 1px solid rgba(107, 211, 194, 0.3);
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(107, 211, 194, 0.1), rgba(255, 184, 108, 0.08));
  backdrop-filter: blur(8px);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.04),
    0 0 24px rgba(107, 211, 194, 0.1);
}

.custom-cursor--core {
  width: 22px;
  height: 22px;
  margin-top: -11px;
  margin-left: -11px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(107, 211, 194, 0.96), rgba(255, 184, 108, 0.9));
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.16),
    0 10px 26px rgba(107, 211, 194, 0.25);
}

.custom-cursor__blade {
  position: absolute;
  width: 16px;
  height: 2px;
  border-radius: 999px;
  background: rgba(7, 17, 31, 0.62);
  transform: rotate(-45deg) translateX(2px);
}

.custom-cursor__dot {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.42);
  transform: rotate(-45deg) translate(5px, -4px);
}

.custom-cursor--interactive.custom-cursor--aura {
  width: 62px;
  height: 62px;
  margin-top: -31px;
  margin-left: -31px;
  border-color: rgba(255, 184, 108, 0.42);
  background:
    linear-gradient(135deg, rgba(255, 184, 108, 0.12), rgba(107, 211, 194, 0.08));
}

.custom-cursor--interactive.custom-cursor--core {
  width: 28px;
  height: 28px;
  margin-top: -14px;
  margin-left: -14px;
  border-radius: 10px;
}

.custom-cursor--pressed.custom-cursor--aura {
  width: 34px;
  height: 34px;
  margin-top: -17px;
  margin-left: -17px;
}

.custom-cursor--pressed.custom-cursor--core {
  width: 18px;
  height: 18px;
  margin-top: -9px;
  margin-left: -9px;
}

.has-custom-cursor,
.has-custom-cursor body,
.has-custom-cursor a,
.has-custom-cursor button,
.has-custom-cursor input,
.has-custom-cursor textarea,
.has-custom-cursor select,
.has-custom-cursor label,
.has-custom-cursor [role="button"] {
  cursor: none !important;
}

@media (prefers-reduced-motion: reduce), (hover: none), (pointer: coarse) {
  .mouse-trail,
  .custom-cursor {
    display: none !important;
  }
}
</style>
