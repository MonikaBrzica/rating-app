import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/public'
import Today from '../components/today'
import Reports from '../components/reports'
import oauthSignIn from '../utils/oAuth'
Vue.use(VueRouter)
const routes = [
  {
    path: '/today',
    name: 'Today',
    component: Today
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
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
router.beforeEach(async (to, from, next) => {
  const fragmentString = location.hash.substring(1)
  const accessToken = fragmentString.slice(13, 176)
  if (accessToken) {
    localStorage.setItem('token', accessToken)
  }
  const token = localStorage.getItem('token')
  if ((token !== null && token !== '') || accessToken !== '' || to.path === '/') {
    next()
  } else {
    await oauthSignIn()
  }
})
export default router
