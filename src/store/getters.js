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
    const series = [0, 0, 0, 0, 0]
    if (!state.ratings) {
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
      return series
    }
  },
  getSumRatingsLine (state) {
    const lineChart = [
      [],
      [],
      [],
      [],
      [],
      []
    ]
    if (!state.ratings) {
      return lineChart
    } else {
      // setting date array with elements
      // first getting all ratings, then replacing minutes and seconds
      // and pushing to array if the element isn't already in.
      state.ratings.forEach((elem) => {
        const remind = elem.date.slice(13)
        elem.date = elem.date.replace(remind, ':00:00Z')
        if (lineChart[5].indexOf(elem.date) === -1) {
          lineChart[5].push(elem.date)
        }
      })
      for (let i = 0; i < lineChart.length - 1; i++) {
        for (let j = 0; j < lineChart[5].length; j++) {
          lineChart[i][j] = 0
        }
      }
      state.ratings.forEach((elem) => {
        for (let i = 0; i < lineChart[5].length; i++) {
          if (elem.date === lineChart[5][i]) {
            lineChart[elem.emojiId.id - 1][i]++
          }
        }
      })
      return lineChart
    }
  }
}
