import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import RouteNames from '@/enums/route-names';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteNames.Home,
    component: () => import('../views/home.vue'),
  },
  {
    path: '/user/:id',
    props: true,
    name: RouteNames.UserDetails,
    component: () => import('../views/user-details.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
