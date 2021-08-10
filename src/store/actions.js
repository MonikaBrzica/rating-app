import { HTTP } from '../../api/axios'
import router from '../router/index'
import axios from 'axios'
export default {
  
  logoutUser ({ state }) {
    localStorage.removeItem('token')
    HTTP.post('auth/revoke', {
      accessToken: state.user.token
    }).then(() => router.push('/'))
      .then(() => localStorage.removeItem('token'))
  },
   setRatings (context, data) {
    context.commit('setRatings', data)
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
  storeUser ({ commit }, data) {
    HTTP.post('auth', {
      accessToken: data.token
    }).then(response => {
      // if everything is alright storing user in vuex store.
      commit('storeUser', { role: response.data.role.toLowerCase(), user: data })
    })
  },
  checkToken ({ dispatch, state }) {
    const token = localStorage.getItem('token')
    if (token && !state.user.token) {
      axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(response => {
          dispatch('storeUser', { token: token, info: response.data })
        })
        .catch(() => {
          router.push('/')
          localStorage.removeItem('token')
        })
    }
  }
}
