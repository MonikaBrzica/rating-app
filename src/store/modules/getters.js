export default {
  getSettings (state) {
    return state.settings
  },
  getEmoticons (state) {
    return state.emoticons
  },
  getEmotionsArr: (state) => (count) => {
    if (count === 5) {
      return state.emotionsArr
    }
    if (count === 4) {
      return state.emotionsArr.filter(element => {
        if (element !== 'sad.svg') {
          return element
        }
      })
    }
    if (count === 3) {
      return state.emotionsArr.filter(element => {
        if (element !== 'sad.svg' && element !== 'happy.svg') {
          return element
        }
      })
    }
  }
}
