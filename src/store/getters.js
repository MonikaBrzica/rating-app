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
    return state.ratings
  },
  getNav (state) {
    if (state.user.role !== 'admin') {
      return state.nav.filter((e) => {
        return e.id !== 3
      })
    } else {
      return state.nav
    }
  },
  getSumRatings (state) {
    let i = 0
    const series = [0, 0, 0, 0, 0]
    if (state.ratings !== null) {
      for (i = 0; i < state.ratings.length; i++) {
        if (state.ratings[i].emojiId.id === 1) {
          series[0]++
        }
        if (state.ratings[i].emojiId.id === 2) {
          series[1]++
        }
        if (state.ratings[i].emojiId.id === 3) {
          series[2]++
        }
        if (state.ratings[i].emojiId.id === 4) {
          series[3]++
        }
        if (state.ratings[i].emojiId.id === 5) {
          series[4]++
        }
      }
    }
    return series
  }
}
