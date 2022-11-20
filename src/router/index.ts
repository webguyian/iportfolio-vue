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
      path: '/phone',
      name: 'phone',
      component: () => import('../views/PhoneView.vue')
    },
    {
      path: '/safari',
      name: 'safari',
      component: () => import('../views/SafariView.vue')
    },
    {
      path: '/mail',
      name: 'mail',
      component: () => import('../views/MailView.vue')
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('../views/MessagesView.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue')
    },
    {
      path: '/clock',
      name: 'clock',
      component: () => import('../views/ClockView.vue'),
      redirect: {
        name: 'stopwatch'
      },
      children: [
        {
          path: 'stopwatch',
          name: 'stopwatch',
          component: () => import('../components/ClockStopwatch.vue')
        },
        {
          path: 'timer',
          name: 'timer',
          component: () => import('../components/ClockTimer.vue')
        }
      ]
    },
    {
      path: '/camera',
      name: 'camera',
      component: () => import('../views/CameraView.vue')
    },
    {
      path: '/photos',
      name: 'photos',
      component: () => import('../views/PhotosView.vue'),
      redirect: {
        name: 'gallery'
      },
      children: [
        {
          path: 'gallery',
          name: 'gallery',
          component: () => import('../components/PhotoGallery.vue')
        },
        {
          path: 'gallery/:id',
          name: 'photo',
          component: () => import('../components/PhotoFrame.vue')
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: () => import('../components/PhotoGallery.vue')
        }
      ]
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('../views/MusicView.vue'),
      redirect: {
        name: 'library'
      },
      children: [
        {
          path: 'library',
          name: 'library',
          component: () => import('../components/MusicLibrary.vue')
        },
        {
          path: 'player',
          name: 'player',
          component: () => import('../components/MusicPlayer.vue')
        }
      ]
    },
    {
      path: '/reminders',
      name: 'reminders',
      component: () => import('../views/RemindersView.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: AppView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: AppView
    }
  ]
});

export default router;
