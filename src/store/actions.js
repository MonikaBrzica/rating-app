import { HTTP } from '../../api/axios'

export default {
  setRatings (context, data) {
    context.commit('setRatings', data)
  },
  setSettings (context, data) {
    context.commit('setSettings', data)
  },
  setEmoticons (context, data) {
    context.commit('setEmoticons', data)
  },
  loginUser (context, data) {
    context.commit('loginUser', data)
  },
  logoutUser (context) {
    context.commit('logoutUser')
  },
  setToken (context, data) {
    context.commit('setToken', data)
  },
  getReports ({ dispatch }, data) {
    let start = new Date(data.start)
    start = start.toISOString()
    let end = new Date(data.end)
    end = end.toISOString()
    HTTP.post('rating/statistics',
      {
        startDate: start,
        endDate: end
      },
      {
        headers: { Authorization: 'Bearer ' + this.state.user.token }
      })
      .then(response => dispatch('setRatings', response.data.ratings))
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
        }
      })
  }
}
