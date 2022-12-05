import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import storage from './storage';

import './assets/css/styles.css';

axios.defaults.baseURL = 'https://api-portfolio-alansan.up.railway.app/';

const token = localStorage.getItem('access_token');

if (token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

createApp(App)
    .use(VueAxios, axios)
    .use(storage)
    .use(router)
    .mount('#app')
