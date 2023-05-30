import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import storage from './storage';

import './assets/css/styles.css';

axios.defaults.baseURL = 'https://sea-turtle-app-3dk33.ondigitalocean.app/';

const token = localStorage.getItem('access_token');

if (token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

createApp(App)
    .use(VueAxios, axios)
    .use(storage)
    .use(router)
    .mount('#app')
