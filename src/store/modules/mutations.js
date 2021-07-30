export default {
  setSettings (state, data) {
    state.settings = data
  },
  setEmoticons (state, data) {
    state.emoticons = data
  },
  loginUser (state, data) {
    state.user = data
  },
  logoutUser (state) {
    state.user = {
      fullname: '',
      email: '',
      imgSrc: '',
      loggedIn: false,
      token: ''
    }
  },
  setToken (state, data) {
    state.user.role = data.toLowerCase()
    console.log(state.user)
  }
}
