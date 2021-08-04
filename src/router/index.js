import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/public'
import Today from '../components/today'
import Reports from '../components/reports'
import store from '../store/index'
import Table from '../components/table'

Vue.use(VueRouter)
const routes = [
  {
    path: '/today',
    name: 'Today',
    component: Today,
    beforeEnter (to, from, next) {
      // navigation guard that checks if the user is logged in and if he isn't redirects him to login.
      if (store.state.user.token !== '') {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    beforeEnter (to, from, next) {
      // navigation guard that checks if the user is logged in and if he isn't redirects him to login.
      if (store.state.user.token !== '') {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/',
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
