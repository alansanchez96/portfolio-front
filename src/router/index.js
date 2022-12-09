import { createRouter, createWebHistory } from 'vue-router';
import PortfolioVue from './routes/Portfolio.vue';
import LoginVue from './routes/Login.vue';
import Dashboard from './routes/Dashboard.vue'

const routes = [
    {
        path: '/',
        name: 'Portfolio',
        component: PortfolioVue
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginVue
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
