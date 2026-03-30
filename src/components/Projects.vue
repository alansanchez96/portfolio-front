<template>
  <section class="section-shell" id="portfolio">
    <div class="container-shell">
      <div class="section-heading" v-reveal="0">
        <p class="section-kicker">Casos destacados</p>
        <h2 class="section-title">Backend que resuelve complejidad real y frontend que ayuda a cerrar mejor.</h2>
        <p class="section-intro">
          Estos proyectos muestran cómo traduzco requerimientos exigentes en productos más claros, confiables y listos para sostener crecimiento.
        </p>
      </div>

      <div class="project-grid">
        <article
          v-for="(project, index) in displayedProjects"
          :key="project.slug"
          class="project-card card-surface"
          v-reveal="index * 90"
        >
          <button class="project-card__media" type="button" @click="openProject(project)">
            <img :src="project.cover" :alt="project.title" class="project-card__image" loading="lazy" />
            <span class="project-card__category">{{ project.category }}</span>
          </button>

          <div class="project-card__body">
            <p class="project-card__hook">{{ project.hook }}</p>
            <h3>{{ project.title }}</h3>
            <p class="project-card__summary">{{ project.summary }}</p>

            <ul class="detail-list detail-list--compact">
              <li v-for="highlight in project.cardHighlights" :key="highlight">
                {{ highlight }}
              </li>
            </ul>

            <div class="project-card__footer">
              <div class="project-tags">
                <span v-for="item in project.stack.slice(0, 3)" :key="item" class="stack-pill">
                  {{ item }}
                </span>
              </div>

              <button class="button button--ghost button--small" type="button" @click="openProject(project)">
                Ver caso
              </button>
            </div>
          </div>
        </article>
      </div>

      <div v-if="shouldShowToggle" class="project-grid__cta" v-reveal="120">
        <button class="button button--ghost" type="button" @click="toggleProjects">
          {{ showAll ? 'Volver a la selección principal' : 'Descubrir más casos que refuerzan mi experiencia' }}
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="activeProject" class="project-modal" @click.self="closeProject">
          <div class="project-modal__dialog card-surface">
            <button class="project-modal__close" type="button" @click="closeProject">
              <span class="sr-only">Cerrar proyecto</span>
              <i class="bx bx-x"></i>
            </button>

            <div class="project-modal__gallery">
              <div class="project-modal__hero">
                <img
                  :src="activeImage"
                  :alt="`${activeProject.title} - vista ${activeImageIndex + 1}`"
                  class="project-modal__image"
                />

                <button
                  v-if="activeProject.gallery.length > 1"
                  class="project-modal__nav project-modal__nav--left"
                  type="button"
                  @click="previousImage"
                >
                  <i class="bx bx-chevron-left"></i>
                </button>

                <button
                  v-if="activeProject.gallery.length > 1"
                  class="project-modal__nav project-modal__nav--right"
                  type="button"
                  @click="nextImage"
                >
                  <i class="bx bx-chevron-right"></i>
                </button>

                <span class="project-modal__count">
                  {{ activeImageIndex + 1 }} / {{ activeProject.gallery.length }}
                </span>
              </div>

              <div class="project-modal__thumbs">
                <button
                  v-for="(image, index) in activeProject.gallery"
                  :key="image"
                  :class="[
                    'project-modal__thumb',
                    { 'project-modal__thumb--active': index === activeImageIndex },
                  ]"
                  type="button"
                  @click="activeImageIndex = index"
                >
                  <img :src="image" :alt="`${activeProject.title} thumbnail ${index + 1}`" loading="lazy" />
                </button>
              </div>
            </div>

            <div class="project-modal__content">
              <div class="project-modal__intro">
                <p class="section-kicker">{{ activeProject.category }}</p>
                <h3>{{ activeProject.title }}</h3>
                <p>{{ activeProject.summary }}</p>

                <div class="project-modal__actions">
                  <a :href="activeProject.cta.href" class="button button--solid button--small" target="_blank" rel="noreferrer">
                    {{ activeProject.cta.label }}
                  </a>
                </div>
              </div>

              <div class="project-modal__story">
                <article
                  v-for="block in activeProject.storyBlocks"
                  :key="block.title"
                  class="project-modal__block"
                >
                  <h4>{{ block.title }}</h4>
                  <ul class="detail-list">
                    <li v-for="item in block.items" :key="item">{{ item }}</li>
                  </ul>
                </article>
              </div>

              <div class="project-modal__stack">
                <span v-for="item in activeProject.stack" :key="item" class="stack-pill">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
});

const activeProject = ref(null);
const activeImageIndex = ref(0);
const showAll = ref(false);
const viewportWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1280);

const activeImage = computed(() => activeProject.value?.gallery?.[activeImageIndex.value] || '');
const visibleLimit = computed(() => (viewportWidth.value < 768 ? 3 : 4));
const displayedProjects = computed(() =>
  showAll.value ? props.projects : props.projects.slice(0, visibleLimit.value),
);
const shouldShowToggle = computed(() => props.projects.length > visibleLimit.value);

const updateViewport = () => {
  viewportWidth.value = window.innerWidth;
};

const openProject = (project) => {
  activeProject.value = project;
  activeImageIndex.value = 0;
};

const closeProject = () => {
  activeProject.value = null;
  activeImageIndex.value = 0;
};

const previousImage = () => {
  if (!activeProject.value) {
    return;
  }

  const total = activeProject.value.gallery.length;
  activeImageIndex.value = (activeImageIndex.value - 1 + total) % total;
};

const nextImage = () => {
  if (!activeProject.value) {
    return;
  }

  const total = activeProject.value.gallery.length;
  activeImageIndex.value = (activeImageIndex.value + 1) % total;
};

const toggleProjects = () => {
  showAll.value = !showAll.value;
};

const handleKeydown = (event) => {
  if (!activeProject.value) {
    return;
  }

  if (event.key === 'Escape') {
    closeProject();
  }

  if (event.key === 'ArrowLeft') {
    previousImage();
  }

  if (event.key === 'ArrowRight') {
    nextImage();
  }
};

watch(activeProject, (project) => {
  document.body.classList.toggle('modal-open', Boolean(project));
});

watch(visibleLimit, () => {
  showAll.value = false;
});

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('resize', updateViewport, { passive: true });
});

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('resize', updateViewport);
});
</script>
