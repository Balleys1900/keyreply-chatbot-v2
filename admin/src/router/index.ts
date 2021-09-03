import checkLogin from '@/middleware/auth';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Auth.vue')
  },
  {
    path: '/dash-board',
    name: 'DashBoard',
    beforeEnter: checkLogin,
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        // when /dash-board/user is matched
        path: 'user',
        component: () => import('@/components/UserComponent.vue')
      },
      {
        // when /dash-board/chat-bot is matched
        path: 'chat-bot',
        component: () => import('@/components/ChatBot.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
