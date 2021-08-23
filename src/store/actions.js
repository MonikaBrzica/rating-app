import { HTTP } from '../../api/axios'
import router from '../router/index'
import axios from 'axios'
export default {

  logoutUser ({ commit, state }) {
    HTTP.post('auth/revoke', {
      accessToken: state.user.token
    }).then(() => router.push('/'))
      .then(() => localStorage.removeItem('token'))
      .then(() => commit('logoutUser'))
  },
  setRatings (context, data) {
    if (!data.ratings) {
      context.commit('clearRatings')
    }
    // parsing date from backend. Turning it to local time and reseting minutes and seconds
    // this is done because of formating line chart data.
    data.ratings.forEach((elem) => {
      // making a Date object from string
      elem.date = new Date(elem.date)
      if (data.difference > 3) {
        console.log(elem.date, 'elem prije')
        elem.date.setUTCHours(0)
      }
      // setting min and sec to 0
      elem.date.setMinutes(0, 0, 0)
      console.log(elem.date, 'elem poslje')
      // making ISO string to feed into line chart.
      elem.date = elem.date.toISOString()
    })
    context.commit('setRatings', data.ratings)
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
    let end = new Date(data.dateEnd)
    const dayDiff = parseInt((end.getTime() - start.getTime()) / 86400000)
    console.log(dayDiff)
    start = start.toISOString()
    end = end.toISOString()
    HTTP.post('rating/statistics',
      {
        startDate: start,
        endDate: end
      },
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => dispatch('setRatings', { ratings: response.data.ratings, difference: dayDiff }))
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
  },
  changeSettings ({ state }, updatedSettings) {
    HTTP.put('rating/settings', updatedSettings, {
      headers: { Authorization: 'Bearer ' + state.user.token }
    })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
        }
      })
  }
}
