import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/public'
import Today from '../components/today'
import Reports from '../components/reports'

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
  // NOTE: token is gotten from local storage and accessToken is gotten from url.
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
    // if no condition is met user is redirected to google oAuth to sign in and will be redirected back.
    window.location.replace('https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=730238512168-pgr60ctbsr1nmum9hcp8lh2jmdnhol51.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8081' + to.path + '&response_type=token&scope=openid%20profile%20email&include_granted_scopes=true&prompt=select_account&flowName=GeneralOAuthFlow')
  }
})

export default router
