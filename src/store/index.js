import Vue from 'vue'
import Vuex from 'vuex'
<<<<<<< HEAD
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
=======
import state from './modules/state'
import mutations from './modules/mutations'
import getters from './modules/getters'
import actions from './modules/actions'

>>>>>>> pie-chart
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
  }
})
