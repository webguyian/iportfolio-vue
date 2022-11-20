import { createApp } from 'vue';
import Vue3TouchEvents from 'vue3-touch-events';
import App from './App.vue';
import router from './router';

import './assets/styles/global.scss';

const app = createApp(App);

app.use(router).use(Vue3TouchEvents);

app.mount('#app');
