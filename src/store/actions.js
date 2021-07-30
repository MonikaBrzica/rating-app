export default {
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
  }
}
