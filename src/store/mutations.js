export default {
  setSettings (state, data) {
    state.settings = data
  },
  setEmoticons (state, data) {
    state.emoticons = data
  },
  storeUser (state, data) {
    const user = {
      fullname: data.user.info.name,
      email: data.user.info.email,
      imgSrc: data.user.info.picture,
      loggedIn: true,
      token: data.user.token,
      role: data.role
    }
    state.user = user
    console.log(state.user)
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
