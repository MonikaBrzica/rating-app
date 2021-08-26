import { HTTP } from '../../api/axios'
import router from '../router/index'
import axios from 'axios'
export default {

  logoutUser ({ commit, state }) {
    // sending post request to backend to revoke google token
    HTTP.post('auth/revoke', {
      accessToken: state.user.token
    }).then(() => router.push('/')) // redirecting user to public
      .then(() => localStorage.removeItem('token')) // removing token from local storage
      .then(() => commit('logoutUser')) // deleting user from store
  },
  setRatings ({ commit }, data) {
    // if there are no ratings clearing ratings from store
    if (!data.ratings) {
      commit('clearRatings')
    }
    // parsing date from backend. Turning it to local time and formating to hours/days
    // depends on the difference between days selected. If diff is bigger than 3 days date is formated to days, if not it is formatted to hours
    // this is done because of line chart.
    data.ratings.forEach((elem) => {
      // making a Date object from string
      elem.date = new Date(elem.date)

      if (data.difference > 3) {
        // setting hours to 0
        elem.date.setUTCHours(0)
      }
      // setting min and sec to 0
      elem.date.setMinutes(0, 0, 0)
      // making ISO string to feed into line chart.
      elem.date = elem.date.toISOString()
    })
    // after date formating commiting setRatings which just stores data in state.
    commit('setRatings', data.ratings)
  },
  getCurrentSettings ({ commit }) {
    // on app load getting settings from server
    HTTP.get('/rating/current-settings')
      .then(response => commit('setSettings', response.data.ratingSettings))
  },
  getEmojiArray ({ commit }) {
    // on app load getting emoji list from server
    HTTP.get('/emoji')
      .then(response => commit('setEmoticons', response.data.emojiList))
  },
  postRating ({ commit }, id) {
    // sending Post request to server with id of the emoticon user selected as payload.
    HTTP.post('/rating', {
      emojiId: id
    })
  },
  storeUser ({ commit }, data) {
    // checking with server if the token is valid and what role does the user have.
    // if user exists in database his info is stored in store.
    HTTP.post('auth', {
      accessToken: data.token
    }).then(response => {
      // if everything is alright storing user in vuex store.
      commit('storeUser', { role: response.data.role.toLowerCase(), user: data })
      // if server returns an error user will be redirected to public and token will be erased
    }).catch(() => router.push('/'))
      .then(() => localStorage.removeItem('token'))
  },
  getReports ({ dispatch }, data) {
    // sends POST request to server with two dates and should get ratings that happened between those two days
    // request needs to have token auth header
    // converting dates to Date objects
    let start = new Date(data.dateFirst)
    let end = new Date(data.dateEnd)
    // calculating difference in days
    const dayDiff = parseInt((end.getTime() - start.getTime()) / 86400000)
    start = start.toISOString()
    end = end.toISOString()
    // sending request
    HTTP.post('rating/statistics',
      {
        startDate: start,
        endDate: end
      },
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => dispatch('setRatings', { ratings: response.data.ratings, difference: dayDiff }))
  },
  checkToken ({ dispatch }) {
    // checking token with google oauth server, retreiveing user info and storing it store
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
    // sending PUT request to server, it needs to have auth token
    HTTP.put('rating/settings', updatedSettings, {
      headers: { Authorization: 'Bearer ' + state.user.token }
    })
  }
}
