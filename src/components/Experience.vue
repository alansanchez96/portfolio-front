<template>
  <section class="section-shell" id="experience">
    <div class="container-shell">
      <div class="section-heading" v-reveal="0">
        <p class="section-kicker">{{ experience.kicker }}</p>
        <h2 class="section-title">{{ experience.title }}</h2>
        <p class="section-intro">
          {{ experience.intro }}
        </p>
      </div>

      <div class="experience-list">
        <article
          v-for="(item, index) in experience.items"
          :key="`${item.company}-${item.period}`"
          class="experience-card card-surface"
          v-reveal="index * 90"
        >
          <div class="experience-card__meta">
            <span class="experience-card__period">{{ item.period }}</span>
            <span class="experience-card__location">{{ item.location }}</span>
          </div>

          <h3>{{ item.company }}</h3>
          <p class="experience-card__role">{{ item.role }}</p>
          <p class="experience-card__summary">{{ item.summary }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  experience: {
    type: Object,
    required: true,
  },
});
</script>
