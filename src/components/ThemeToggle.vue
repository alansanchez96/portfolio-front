<template>
  <button
    :aria-label="isLight ? 'Activar modo oscuro' : 'Activar modo claro'"
    class="theme-toggle"
    type="button"
    @click="toggleTheme"
  >
    <span class="theme-toggle__icon">
      <i :class="['bx', isLight ? 'bx-moon' : 'bx-sun']"></i>
    </span>
    <span class="theme-toggle__copy">
      <strong>{{ isLight ? 'Modo claro' : 'Modo oscuro' }}</strong>
      <small>{{ isLight ? 'Cambiar a dark' : 'Cambiar a light' }}</small>
    </span>
  </button>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const STORAGE_KEY = 'portfolio-theme';
const theme = ref('dark');

const isLight = computed(() => theme.value === 'light');

const applyTheme = () => {
  document.documentElement.dataset.theme = theme.value;
  localStorage.setItem(STORAGE_KEY, theme.value);
};

const toggleTheme = () => {
  theme.value = isLight.value ? 'dark' : 'light';
  applyTheme();
};

onMounted(() => {
  const storedTheme = localStorage.getItem(STORAGE_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    theme.value = storedTheme;
  }

  applyTheme();
});
</script>
