import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import RouteNames from '@/shared/enums/route-names';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    name: RouteNames.Error,
    component: () => import('@/views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
