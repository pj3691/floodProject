import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import ScenesManage from '@/views/ScenesManage.vue'
import SceneDetail from '@/views/SceneDetail.vue'

/** 常驻路由 */
export const constantRoutes = [
  {
    path: '/',
    component: ScenesManage
  },
  {
    path: '/home',
    name: 'home',
    component: ScenesManage
  },
  {
    path: '/sceneDetail',
    name: 'sceneDetail',
    component: SceneDetail
  }
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes
})

export default router
