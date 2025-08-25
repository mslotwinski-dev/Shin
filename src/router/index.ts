import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Summary from '../views/Summary.vue'
import Data from '../views/Data.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/summary',
    name: 'Summary',
    component: Summary,
  },
  {
    path: '/data',
    name: 'Data',
    component: Data,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
