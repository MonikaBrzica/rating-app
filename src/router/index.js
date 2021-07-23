import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/Public'
import Statistics from '../views/statistics'
import Today from '../components/today'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/public',
    name: 'Public',
    component: Public
  },
  {
    path: '/today',
    name: 'Today',
    component: Today
  },
  {
    path: '/reports',
    name: 'Today',
    component: Today
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
