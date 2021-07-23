import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/Public'
import Settings from '../components/Settings'

Vue.use(VueRouter)

const routes = [
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/public',
    name: 'Public',
    component: Public
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
