<template>
  <footer class="site-footer">
    <div class="container-shell site-footer__inner">
      <div>
        <strong>{{ footer.title }}</strong>
        <p>{{ footer.description }}</p>
      </div>

      <p class="site-footer__copyright">
        Copyright © 2026 <br>
        SAL 23:1 — El Señor es mi pastor y nada me faltará.
      </p>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  footer: {
    type: Object,
    required: true,
  },
});
</script>
