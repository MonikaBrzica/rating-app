import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/public'
import Today from '../components/today'
import Reports from '../components/reports'
import PieChart from '../components/pieChart'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Today',
    component: Today
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
  },
  {
    path: '/pie',
    name: 'PieChart',
    component: PieChart
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
