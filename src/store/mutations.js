export default {
  setSettings (state, data) {
    state.settings = data
  },
  setEmoticons (state, data) {
    state.emoticons = data
  },
  setRatings (state, data) {
    state.ratings = data
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
  }
}
