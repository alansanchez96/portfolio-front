import { createRouter, createWebHistory } from 'vue-router';

import NotFound from './routes/NotFound.vue';
import Portfolio from './routes/Portfolio.vue';

const routes = [
  {
    path: '/',
    name: 'portfolio',
    component: Portfolio,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100,
      };
    }

    return { top: 0 };
  },
});

export default router;
