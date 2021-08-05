import { HTTP } from '../../api/axios'
import router from '../router/index'
export default {
  logoutUser ({ state }) {
    localStorage.removeItem('token')
    HTTP.post('auth/revoke', {
      accessToken: state.user.token
    }).then(() => router.push('/'))
  },
  getCurrentSettings ({ commit }) {
    HTTP.get('/rating/current-settings')
      .then(response => commit('setSettings', response.data.ratingSettings))
      .catch(function (error) {
        console.error(error)
      })
  },
  getEmojiArray ({ commit }) {
    HTTP.get('/emoji')
      .then(response => commit('setEmoticons', response.data.emojiList))
      .catch(function (error) {
        console.error(error)
      })
  },
  postRating ({ commit }, id) {
    HTTP.post('/rating', {
      emojiId: id
    })
      .catch(function (error) {
        console.error(error)
      })
  },
  checkToken ({ commit }, data) {
    HTTP.post('auth', {
      accessToken: data.token
    }).then(response => {
      // if everything is alright storing user in vuex store.
      commit('storeUser', { role: response.data.role.toLowerCase(), user: data })
    })
  }
}
