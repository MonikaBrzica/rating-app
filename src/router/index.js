import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/public'
import Today from '../views/today'
import Reports from '../views/reports'

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

router.beforeEach((to, from, next) => {
  // because of how oAuth works with redirects
  // NOTE: token is taken from local storage and accessToken is gotten from url.
  // checking for access token in the current url
  // storing substring after # sign
  const fragmentString = location.hash.substring(1)
  // sliceing fragmented string to extract token
  const accessToken = fragmentString.slice(13, 176)
  // if blok that checks token and stores it
  if (accessToken) {
    localStorage.setItem('token', accessToken)
  }

  // getting token from local storage
  const token = localStorage.getItem('token')
  // navigation will continue if one of three conditions is met// NOTE: token is gotten from local storage and accessToken is gotten from url.
  // if it goes to public, if there is a token in localstorage and if there is a token in url
  if (token || accessToken !== '' || to.path === '/') {
    next()
  } else {
    // if no condition is met we are checking if the requested link is one of our two google oauth2 redirect links.
    if (to.path === '/today') {
      // if that is true user is redirected to google oAuth to sign in and will be redirected back.
      window.location.replace(process.env.VUE_APP_GOOGLE_URL_TODAY)
    } else if (to.path === '/reports') {
      window.location.replace(process.env.VUE_APP_GOOGLE_URL_REPORTS)
    } else {
      // if not navigation will be stoped and user will be redirected to public
      router.push('/')
    }
  }
})

export default router
