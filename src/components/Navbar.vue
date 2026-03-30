<template>
  <header :class="['site-nav', { 'site-nav--scrolled': isScrolled }]">
    <button
      v-if="isHomeRoute && isMenuOpen"
      class="site-nav__backdrop"
      type="button"
      aria-label="Cerrar menú"
      @click="closeMenu"
    ></button>

    <div class="container-shell site-nav__inner">
      <router-link class="site-nav__brand" :to="{ name: 'portfolio' }">
        <span class="site-nav__brand-mark">AS</span>
        <span class="site-nav__brand-copy">
          <strong>Alan Sanchez</strong>
          <small>Fullstack Developer | Laravel Backend</small>
        </span>
      </router-link>

      <button
        v-if="isHomeRoute"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
        aria-label="Abrir menú"
        class="site-nav__toggle"
        type="button"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span></span>
        <span></span>
      </button>

      <div
        :class="[
          'site-nav__panel',
          { 'site-nav__panel--open': isMenuOpen || !isHomeRoute },
        ]"
      >
        <nav v-if="isHomeRoute" class="site-nav__links" aria-label="Secciones del portfolio">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="site-nav__link"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="site-nav__actions">
          <router-link
            v-if="!isHomeRoute"
            class="button button--ghost button--small"
            :to="{ name: 'portfolio' }"
          >
            Volver al portfolio
          </router-link>

          <a
            v-if="isHomeRoute"
            :href="ctaHref"
            class="button button--ghost button--small"
            @click="closeMenu"
          >
            {{ ctaLabel }}
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
  links: {
    type: Array,
    default: () => [],
  },
  ctaHref: {
    type: String,
    default: '#contact',
  },
  ctaLabel: {
    type: String,
    default: 'Contacto',
  },
});

const route = useRoute();

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const isHomeRoute = computed(() => route.name === 'portfolio');

const handleScroll = () => {
  isScrolled.value = window.scrollY > 18;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

watch(
  () => route.fullPath,
  () => {
    closeMenu();
  },
);

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
