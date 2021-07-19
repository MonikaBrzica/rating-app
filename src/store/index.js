import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {},
    emoticons: []
  },
  mutations: {
    setSettings (state, data) {
      state.settings = data
    },
    setEmoticons (state, data) {
      state.emoticons = data
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getSettings (state) {
      return state.settings
    },
    getEmoticons (state) {
      return state.emoticons
    }
  }
})
