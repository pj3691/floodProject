import {  createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import HomeView from '../views/HomeView.vue'

/** 常驻路由 */
export const constantRoutes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
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
