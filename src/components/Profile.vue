<template>
  <section class="section-shell" id="profile">
    <div class="container-shell profile">
      <div class="profile__visual card-surface" v-reveal="0">
        <img :src="profile.image" :alt="profile.title" class="profile__photo" loading="lazy" />
        <div class="profile__badge">Disponibilidad para nuevos desafíos</div>
      </div>

      <div class="profile__content" v-reveal="120">
        <p class="section-kicker">Quién soy al trabajar</p>
        <h2 class="section-title">{{ profile.title }}</h2>
        <p class="section-intro">
          {{ profile.lead }}
        </p>

        <ul class="detail-list">
          <li v-for="item in profile.highlights" :key="item">
            {{ item }}
          </li>
        </ul>

        <div class="profile__actions">
          <a
            v-for="action in profile.actions"
            :key="action.href"
            :href="action.href"
            class="button"
            :class="action.label === 'Ver CV' ? 'button--solid' : 'button--ghost'"
            target="_blank"
            rel="noreferrer"
          >
            {{ action.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    required: true,
  },
});
</script>
