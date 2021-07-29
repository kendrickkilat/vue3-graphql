import RouteNames from '@/shared/enums/route-names';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteNames.Home,
    component: () => import('@/users/views/home.vue'),
  },
  {
    path: '/user/:id',
    props: true,
    name: RouteNames.UserDetails,
    component: () => import('@/users/views/user-details.vue'),
  },
];

export default routes;
