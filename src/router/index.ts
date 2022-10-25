import { createRouter, createWebHistory } from 'vue-router';
import AppView from '../views/AppView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'lockscreen',
      component: HomeView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: AppView
    }
  ]
});

export default router;
