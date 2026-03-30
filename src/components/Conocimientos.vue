<template>
  <section class="section-shell" id="stack">
    <div class="container-shell">
      <div class="section-heading" v-reveal="0">
        <p class="section-kicker">Stack y capacidades</p>
        <h2 class="section-title">Tecnología al servicio de producto, performance y escalabilidad.</h2>
        <p class="section-intro">
          El stack importa, pero importa más cómo se conecta con la experiencia del usuario y con los objetivos del negocio.
        </p>
      </div>

      <div class="capability-grid">
        <article
          v-for="(capability, index) in capabilities"
          :key="capability.title"
          class="capability-card card-surface"
          v-reveal="index * 90"
        >
          <h3>{{ capability.title }}</h3>
          <p>{{ capability.description }}</p>
        </article>
      </div>

      <div class="stack-groups">
        <article
          v-for="(group, index) in stackGroups"
          :key="group.title"
          class="stack-group card-surface"
          v-reveal="index * 90 + 120"
        >
          <h3 class="mb-3">{{ group.title }}</h3>
          <div class="stack-group__items">
            <span v-for="item in group.items" :key="item" class="stack-pill">
              {{ item }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  capabilities: {
    type: Array,
    default: () => [],
  },
  stackGroups: {
    type: Array,
    default: () => [],
  },
});
</script>
