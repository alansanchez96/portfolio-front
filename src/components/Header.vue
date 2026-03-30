<template>
  <section class="hero section-shell section-shell--hero">
    <div class="container-shell hero__grid">
      <div class="hero__copy" v-reveal="0">
        <p class="section-kicker">{{ hero.eyebrow }}</p>
        <h1 class="hero__title">{{ hero.title }}</h1>
        <p class="hero__lead">
          {{ hero.description }}
        </p>

        <div class="hero__actions">
          <a :href="hero.primaryAction.href" class="button button--solid">
            {{ hero.primaryAction.label }}
          </a>
          <a :href="hero.secondaryAction.href" class="button button--ghost">
            {{ hero.secondaryAction.label }}
          </a>
        </div>

        <ul class="hero__trust">
          <li v-for="item in hero.trustItems" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="hero__visual" v-reveal="120">
        <div class="hero__orb"></div>

        <article
          v-for="(card, index) in hero.signalCards"
          :key="card.title"
          :class="['signal-card', 'card-surface', `signal-card--${index + 1}`]"
        >
          <span class="signal-card__eyebrow">Valor visible</span>
          <h2>{{ card.title }}</h2>
          <p>{{ card.description }}</p>
        </article>
      </div>
    </div>

    <div class="container-shell hero__metrics">
      <article
        v-for="(stat, index) in stats"
        :key="stat.label"
        class="metric-card card-surface"
        v-reveal="index * 100"
      >
        <strong>{{ stat.value }}</strong>
        <span>{{ stat.label }}</span>
        <p>{{ stat.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  hero: {
    type: Object,
    required: true,
  },
  stats: {
    type: Array,
    default: () => [],
  },
});
</script>
