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
  },
  getRatings (state) {
    let i = 0
    for (i = 0; i < state.ratings.length; i++) {
      switch (state.ratings[i].emojiId.id) {
        case (1):
          state.statistics[0]++
          break
        case (2):
          state.statistics[1]++
          break
        case (3):
          state.statistics[2]++
          break
        case (4):
          state.statistics[3]++
          break
        case (5):
          state.statistics[4]++
          break
      }
    }
    console.log(state.statistics, 'get')
    return state.statistics
  }
}
