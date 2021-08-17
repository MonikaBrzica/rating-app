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
    // parsing date from backend. Turning it to local time and reseting minutes and seconds
    // this is done because of formating line chart data.
    data.forEach((elem) => {
      // making a Date object from string
      elem.date = new Date(elem.date)
      // setting min and sec to 0
      elem.date.setMinutes(0, 0, 0)
      // making ISO string to feed into line chart.
      elem.date = elem.date.toISOString()
    })
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
  getReports ({ dispatch }, data) {
    let start = new Date(data.dateFirst)
    start = start.toISOString()
    let end = new Date(data.dateEnd)
    end = end.toISOString()
    HTTP.post('rating/statistics',
      {
        startDate: start,
        endDate: end
      },
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => dispatch('setRatings', response.data.ratings))
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
        }
      })
  },
  checkToken ({ dispatch, state }) {
    const token = localStorage.getItem('token')
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
