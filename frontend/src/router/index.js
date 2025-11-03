import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: '医院运营指挥中心' }
  },
  {
    path: '/emergency',
    name: 'Emergency',
    component: () => import('../views/Emergency.vue'),
    meta: { title: '急诊科实时看板' }
  },
  {
    path: '/outpatient',
    name: 'Outpatient',
    component: () => import('../views/Outpatient.vue'),
    meta: { title: '门诊患者服务大屏' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '医院数字化大屏'
  next()
})

export default router

