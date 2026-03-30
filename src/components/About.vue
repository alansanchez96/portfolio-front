<template>
  <section class="section-shell" id="about">
    <div class="container-shell about">
      <div class="about__story card-surface" v-reveal="0">
        <p class="section-kicker">{{ about.kicker }}</p>
        <h2 class="section-title">{{ about.title }}</h2>
        <p class="section-intro">
          {{ about.intro }}
        </p>

        <div class="about__paragraphs">
          <p v-for="paragraph in about.paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="about__pillars">
        <article
          v-for="(pillar, index) in about.pillars"
          :key="pillar.title"
          class="value-card card-surface"
          v-reveal="index * 100 + 60"
        >
          <span class="value-card__index">0{{ index + 1 }}</span>
          <h3>{{ pillar.title }}</h3>
          <p>{{ pillar.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  about: {
    type: Object,
    required: true,
  },
});
</script>
