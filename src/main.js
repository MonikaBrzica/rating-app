import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar'

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '730238512168-bpd4qf4l9orlds327mrf0e3l9aishctf.apps.googleusercontent.com',
  scope: 'profile email openid',
  prompt: 'select_account'
}
Vue.use(VCalendar)
Vue.use(GAuth, gauthOption)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
