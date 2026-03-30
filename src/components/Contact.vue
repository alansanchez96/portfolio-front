<template>
  <section class="section-shell" id="contact">
    <div class="container-shell">
      <div class="section-heading" v-reveal="0">
        <p class="section-kicker">Contacto</p>
        <h2 class="section-title">{{ contact.title }}</h2>
        <p class="section-intro">
          {{ contact.intro }}
        </p>
      </div>

      <div class="contact-layout">
        <div class="contact-channels">
          <a
            v-for="(channel, index) in contact.channels"
            :key="channel.title"
            :href="channel.href"
            class="contact-card card-surface"
            target="_blank"
            rel="noreferrer"
            v-reveal="index * 90"
          >
            <i :class="['bx', channel.icon]"></i>
            <h3>{{ channel.title }}</h3>
            <p>{{ channel.description }}</p>
          </a>
        </div>

        <div class="contact-panel card-surface contact-form" v-reveal="220">
          <div class="contact-form__header">
            <h3>Cuéntame qué estás construyendo</h3>
            <p>
              Si tienes una idea, un producto en marcha o un sistema que necesita orden,
              puedes escribirme directamente desde aquí.
            </p>
          </div>

          <p v-if="!hasEmailConfig" class="form-feedback form-feedback--warning">
            Faltan variables de EmailJS para habilitar el envío desde el formulario.
          </p>

          <p v-if="statusMessage" :class="['form-feedback', statusClass]">
            {{ statusMessage }}
          </p>

          <form class="site-form" @submit.prevent="submitMessage">
            <label class="field">
              <span>Nombre</span>
              <input
                v-model.trim="form.name"
                class="field__input"
                type="text"
                placeholder="Tu nombre o empresa"
              />
              <small v-if="errors.name">{{ errors.name }}</small>
            </label>

            <label class="field">
              <span>Email</span>
              <input
                v-model.trim="form.email"
                class="field__input"
                type="email"
                placeholder="tu@email.com"
              />
              <small v-if="errors.email">{{ errors.email }}</small>
            </label>

            <label class="field">
              <span>Mensaje</span>
              <textarea
                v-model.trim="form.message"
                class="field__input field__input--textarea"
                placeholder="Cuéntame el contexto, el problema y qué resultado quieres lograr."
              ></textarea>
              <small v-if="errors.message">{{ errors.message }}</small>
            </label>

            <button
              class="button button--solid contact-form__submit"
              :disabled="isSubmitting || !canSubmit"
              type="submit"
            >
              {{ isSubmitting ? 'Enviando...' : 'Enviar mensaje' }}
            </button>
          </form>

          <div class="contact-panel__divider"></div>

          <div>
            <h3>{{ contact.availabilityTitle }}</h3>
            <ul class="detail-list">
              <li v-for="item in contact.availabilityItems" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import emailjs from '@emailjs/browser';
import { computed, reactive, ref } from 'vue';

defineProps({
  contact: {
    type: Object,
    required: true,
  },
});

const form = reactive({
  name: '',
  email: '',
  message: '',
});

const errors = reactive({
  name: '',
  email: '',
  message: '',
});

const isSubmitting = ref(false);
const statusMessage = ref('');
const statusType = ref('');

const serviceId = process.env.VUE_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.VUE_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.VUE_APP_EMAILJS_PUBLIC_KEY;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hasEmailConfig = computed(() => Boolean(serviceId && templateId && publicKey));

const validateForm = () => {
  errors.name = form.name ? '' : 'El nombre es obligatorio.';
  errors.email = !form.email
    ? 'El email es obligatorio.'
    : emailPattern.test(form.email)
      ? ''
      : 'Ingresa un email válido.';
  errors.message = form.message ? '' : 'El mensaje es obligatorio.';

  return !errors.name && !errors.email && !errors.message;
};

const canSubmit = computed(() => {
  return hasEmailConfig.value && form.name && form.email && form.message;
});

const statusClass = computed(() => {
  if (statusType.value === 'success') {
    return 'form-feedback--success';
  }

  if (statusType.value === 'error') {
    return 'form-feedback--error';
  }

  return 'form-feedback--warning';
});

const resetForm = () => {
  form.name = '';
  form.email = '';
  form.message = '';
};

const submitMessage = async () => {
  statusMessage.value = '';
  statusType.value = '';

  if (!validateForm()) {
    return;
  }

  if (!hasEmailConfig.value) {
    statusMessage.value = 'Faltan variables de configuración para habilitar el envío.';
    statusType.value = 'error';
    return;
  }

  isSubmitting.value = true;

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      publicKey,
    );

    statusMessage.value = 'Mensaje enviado. Si el proyecto encaja, te responderé a la brevedad.';
    statusType.value = 'success';
    resetForm();
  } catch (error) {
    console.error(error);
    statusMessage.value = 'Hubo un problema al enviar el mensaje. Puedes escribirme por LinkedIn mientras tanto.';
    statusType.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
