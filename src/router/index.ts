import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import exampleRouter from './modules/example'

// const redirectUri: string | any = import.meta.env.VITE_APP_BASE_ROUTE

// 联合类型
type RouteConfig = RouteRecordRaw & { hidden?: boolean } //hidden 是可选属性

const routes: RouteConfig[] = [
  {
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/',
    meta: { title: '' },
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
  },
  ...exampleRouter,
  // 404 page must be placed at the end !!!
  // using pathMatch install of "*" in vue-router 4.0
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
