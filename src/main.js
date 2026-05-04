import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import revealDirective from './directives/reveal';
import { notifyVisit } from './services/visitNotification';

import './assets/css/styles.css';
import './assets/css/portfolio.css';

const app = createApp(App);

app.directive('reveal', revealDirective);

app.use(router).mount('#app');

notifyVisit();
